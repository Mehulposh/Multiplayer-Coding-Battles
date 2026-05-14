import { v4 as uuidv4 } from 'uuid';
import Battle from '../models/battleModel.js';
import Problem from '../models/problemModel.js';
import { getRedis } from '../config/redisConfig.js';
import logger from '../utils/logger.js';

const MATCHMAKING_QUEUE = 'matchmaking:queue';
const ELO_TOLERANCE_START = 100;
const ELO_TOLERANCE_INCREASE = 50;
const MATCH_CHECK_INTERVAL = 2000;

export default function matchmakingSocketHandlers(io, socket) {
  socket.on('start-matchmaking', async () => {
    try {
      const redis = getRedis();
      const userElo = socket.user.eloRating;

      const playerEntry = JSON.stringify({
        userId: socket.user._id.toString(),
        username: socket.user.username,
        eloRating: userElo,
        socketId: socket.id,
        joinedAt: Date.now(),
      });

      // Add to queue
      await redis.zadd(MATCHMAKING_QUEUE, userElo, playerEntry);
      socket.emit('matchmaking-started', { message: 'Looking for opponent...' });

      logger.info(`${socket.user.username} (ELO: ${userElo}) entered matchmaking`);

      // Start checking for matches
      socket.matchmakingInterval = setInterval(
        () => checkForMatch(io, socket, redis),
        MATCH_CHECK_INTERVAL
      );
    } catch (err) {
      logger.error('Matchmaking start error:', err);
      socket.emit('error', { message: 'Failed to enter matchmaking' });
    }
  });

  socket.on('stop-matchmaking', async () => {
    clearMatchmakingInterval(socket);
    try {
      const redis = getRedis();
      const members = await redis.zrange(MATCHMAKING_QUEUE, 0, -1);
      for (const member of members) {
        const entry = JSON.parse(member);
        if (entry.socketId === socket.id) {
          await redis.zrem(MATCHMAKING_QUEUE, member);
          break;
        }
      }
    } catch (err) {
      logger.error('Stop matchmaking error:', err);
    }
    socket.emit('matchmaking-cancelled');
  });
};

async function checkForMatch(io, socket, redis) {
  try {
    const members = await redis.zrangebyscore(MATCHMAKING_QUEUE, '-inf', '+inf', 'WITHSCORES');
    if (members.length < 4) return; // Need at least 2 players (member + score pairs)

    const players = [];
    for (let i = 0; i < members.length; i += 2) {
      players.push({ data: JSON.parse(members[i]), score: parseFloat(members[i + 1]) });
    }

    const myEntry = players.find((p) => p.data.socketId === socket.id);
    if (!myEntry) {
      clearMatchmakingInterval(socket);
      return;
    }

    const waitTime = (Date.now() - myEntry.data.joinedAt) / 1000;
    const tolerance = ELO_TOLERANCE_START + Math.floor(waitTime / 10) * ELO_TOLERANCE_INCREASE;

    // Find opponent within ELO tolerance
    const opponent = players.find(
      (p) =>
        p.data.socketId !== socket.id &&
        Math.abs(p.score - myEntry.score) <= tolerance
    );

    if (!opponent) {
      socket.emit('matchmaking-update', {
        waitTime: Math.floor(waitTime),
        tolerance,
        playersSearching: players.length,
      });
      return;
    }

    // Match found! Remove both from queue
    await redis.zrem(MATCHMAKING_QUEUE, JSON.stringify(myEntry.data));
    await redis.zrem(MATCHMAKING_QUEUE, JSON.stringify(opponent.data));

    clearMatchmakingInterval(socket);

    // Get opponent socket and clear their interval
    const opponentSocket = io.sockets.sockets.get(opponent.data.socketId);
    if (opponentSocket) {
      clearMatchmakingInterval(opponentSocket);
    }

    // Create battle room
    const count = await Problem.countDocuments({ isActive: true });
    const randomIndex = Math.floor(Math.random() * count);
    const problem = await Problem.findOne({ isActive: true }).skip(randomIndex);

    const battle = await Battle.create({
      roomId: uuidv4(),
      players: [
        { user: myEntry.data.userId, username: myEntry.data.username, eloRating: myEntry.data.eloRating },
        { user: opponent.data.userId, username: opponent.data.username, eloRating: opponent.data.eloRating },
      ],
      problem: problem._id,
      status: 'waiting',
    });

    logger.info(`Match found: ${myEntry.data.username} vs ${opponent.data.username} in room ${battle.roomId}`);

    // Notify both players
    const matchData = {
      roomId: battle.roomId,
      battleId: battle._id,
      opponent: {
        username: opponent.data.username,
        eloRating: opponent.data.eloRating,
      },
    };

    socket.emit('match-found', matchData);

    if (opponentSocket) {
      opponentSocket.emit('match-found', {
        roomId: battle.roomId,
        battleId: battle._id,
        opponent: {
          username: myEntry.data.username,
          eloRating: myEntry.data.eloRating,
        },
      });
    }
  } catch (err) {
    logger.error('Check for match error:', err);
  }
}

function clearMatchmakingInterval(socket) {
  if (socket.matchmakingInterval) {
    clearInterval(socket.matchmakingInterval);
    socket.matchmakingInterval = null;
  }
}