import User from '../models/userModel.js';
import { getRedis } from '../config/redisConfig.js';
import logger from '../utils/logger.js';

const CACHE_TTL = 60; // 60 seconds

const getGlobalLeaderboard = async (req, res) => {
  try {
    const redis = getRedis();
    const cacheKey = 'leaderboard:global';

    const cached = await redis.get(cacheKey);
    if (cached) {
      return res.json(JSON.parse(cached));
    }

    const users = await User.find({})
      .select('username eloRating wins losses battlesPlayed avatar')
      .sort({ eloRating: -1 })
      .limit(100);

    const leaderboard = users.map((user, index) => ({
      rank: index + 1,
      id: user._id,
      username: user.username,
      eloRating: user.eloRating,
      wins: user.wins,
      losses: user.losses,
      battlesPlayed: user.battlesPlayed,
      winRate: user.battlesPlayed > 0 ? Math.round((user.wins / user.battlesPlayed) * 100) : 0,
      avatar: user.avatar,
    }));

    const result = { leaderboard, updatedAt: new Date() };
    await redis.setex(cacheKey, CACHE_TTL, JSON.stringify(result));

    res.json(result);
  } catch (err) {
    logger.error('Leaderboard error:', err);
    res.status(500).json({ message: 'Failed to fetch leaderboard' });
  }
};

const getWeeklyLeaderboard = async (req, res) => {
  try {
    const redis = getRedis();
    const cacheKey = 'leaderboard:weekly';

    const cached = await redis.get(cacheKey);
    if (cached) {
      return res.json(JSON.parse(cached));
    }

    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    const Battle = require('../models/Battle');
    const weeklyStats = await Battle.aggregate([
      { $match: { status: 'finished', endedAt: { $gte: oneWeekAgo } } },
      { $unwind: '$players' },
      {
        $group: {
          _id: '$players.user',
          wins: {
            $sum: {
              $cond: [{ $eq: ['$winner', '$players.user'] }, 1, 0],
            },
          },
          played: { $sum: 1 },
        },
      },
      { $sort: { wins: -1 } },
      { $limit: 50 },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'user',
        },
      },
      { $unwind: '$user' },
      {
        $project: {
          username: '$user.username',
          avatar: '$user.avatar',
          eloRating: '$user.eloRating',
          wins: 1,
          played: 1,
        },
      },
    ]);

    const leaderboard = weeklyStats.map((entry, index) => ({
      rank: index + 1,
      ...entry,
      winRate: entry.played > 0 ? Math.round((entry.wins / entry.played) * 100) : 0,
    }));

    const result = { leaderboard, updatedAt: new Date() };
    await redis.setex(cacheKey, CACHE_TTL * 5, JSON.stringify(result));

    res.json(result);
  } catch (err) {
    logger.error('Weekly leaderboard error:', err);
    res.status(500).json({ message: 'Failed to fetch weekly leaderboard' });
  }
};

export { getGlobalLeaderboard, getWeeklyLeaderboard };