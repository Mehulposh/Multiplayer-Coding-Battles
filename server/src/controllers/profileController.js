import User from '../models/userModel.js';
import Battle from '../models/battleModel.js';
import logger from '../utils/logger.js';

const getProfile = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username })
      .select('-password -email');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const recentBattles = await Battle.find({
      'players.user': user._id,
      status: 'finished',
    })
      .populate('players.user', 'username eloRating role')
      .populate('problem', 'title difficulty')
      .populate('winner', 'username')
      .sort({ createdAt: -1 })
      .limit(10);

    // Calculate rank
    const rank = await User.countDocuments({ eloRating: { $gt: user.eloRating } }) + 1;

    res.json({
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
        eloRating: user.eloRating,
        wins: user.wins,
        losses: user.losses,
        battlesPlayed: user.battlesPlayed,
        winRate: user.winRate,
        achievements: user.achievements,
        avatar: user.avatar,
        isOnline: user.isOnline,
        lastSeen: user.lastSeen,
        createdAt: user.createdAt,
        rank,
      },
      recentBattles,
    });
  } catch (err) {
    logger.error('Get profile error:', err);
    res.status(500).json({ message: 'Failed to fetch profile' });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { avatar } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true }
    ).select('-password');

    res.json({ user });
  } catch (err) {
    logger.error('Update profile error:', err);
    res.status(500).json({ message: 'Failed to update profile' });
  }
};

export { getProfile, updateProfile };