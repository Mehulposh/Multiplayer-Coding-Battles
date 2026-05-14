const Battle = require('../models/Battle');
const logger = require('../utils/logger');

export default function battleSocketHandlers(io, socket) {
  // Join a battle room
  socket.on('join-room', async ({ roomId }) => {
    try {
      const battle = await Battle.findOne({ roomId })
        .populate('players.user', 'username eloRating avatar')
        .populate('problem');

      if (!battle) {
        return socket.emit('error', { message: 'Battle room not found' });
      }

      socket.join(roomId);
      socket.currentRoom = roomId;

      logger.info(`${socket.user.username} joined room ${roomId}`);

      // Check if user is spectator or player
      const isPlayer = battle.players.some(
        (p) => p.user._id.toString() === socket.user._id.toString()
      );

      if (!isPlayer) {
        // Add as spectator
        if (!battle.spectators.includes(socket.user._id)) {
          battle.spectators.push(socket.user._id);
          await battle.save();
        }
        socket.isSpectator = true;
      }

      socket.emit('room-joined', {
        battle: {
          roomId: battle.roomId,
          status: battle.status,
          players: battle.players,
          problem: battle.problem,
          spectatorCount: battle.spectators.length,
        },
        isSpectator: socket.isSpectator,
      });

      // Notify others
      socket.to(roomId).emit('player-joined', {
        username: socket.user.username,
        userId: socket.user._id,
        isSpectator: socket.isSpectator,
        spectatorCount: battle.spectators.length,
      });

      // Auto-start if room is full
      if (battle.status === 'waiting' && battle.players.length >= 2 && !socket.isSpectator) {
        await startCountdown(io, battle, roomId);
      }
    } catch (err) {
      logger.error('join-room error:', err);
      socket.emit('error', { message: 'Failed to join room' });
    }
  });

  // Leave room
  socket.on('leave-room', async ({ roomId }) => {
    socket.leave(roomId);
    socket.to(roomId).emit('player-left', {
      username: socket.user.username,
      userId: socket.user._id,
    });
  });

  // Code change - real time sync
  socket.on('code-change', ({ roomId, code, language }) => {
    // Broadcast to others in room (including spectators)
    socket.to(roomId).emit('code-updated', {
      userId: socket.user._id,
      username: socket.user.username,
      code,
      language,
    });

    // Update battle player code in DB (debounced by throttling at client level)
    Battle.findOneAndUpdate(
      { roomId, 'players.user': socket.user._id },
      {
        $set: {
          'players.$.currentCode': code,
          'players.$.language': language,
          'players.$.lastActivity': new Date(),
        },
      }
    ).catch((err) => logger.error('Code update error:', err));
  });

  // Typing indicator
  socket.on('typing', ({ roomId, isTyping }) => {
    socket.to(roomId).emit('opponent-typing', {
      userId: socket.user._id,
      username: socket.user.username,
      isTyping,
    });
  });
};

export async function startCountdown(io, battle, roomId) {
  battle.status = 'countdown';
  await battle.save();

  io.to(roomId).emit('countdown-started', { countdown: 5 });

  let count = 5;
  const interval = setInterval(async () => {
    count--;
    io.to(roomId).emit('countdown-tick', { count });

    if (count <= 0) {
      clearInterval(interval);
      battle.status = 'active';
      battle.startedAt = new Date();
      await battle.save();

      io.to(roomId).emit('battle-started', {
        problem: battle.problem,
        startedAt: battle.startedAt,
        duration: 30 * 60, // 30 minutes
      });
    }
  }, 1000);
}

