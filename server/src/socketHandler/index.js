import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import logger from '../utils/logger.js';
import battleSocketHandlers from './battleSocket.js';
import matchmakingSocketHandlers from './matchmakingSocket.js';
import chatSocketHandlers from './chatSocket.js';


 function registerSocketHandlers(io) {
  
  // Auth middleware for sockets
  io.use(async (socket, next) => {
    const token = socket.handshake.auth?.token;

    if (!token) {
      return next(new Error('Authentication required'));
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select('-password');
      if (!user) return next(new Error('User not found'));

      socket.user = user;
      next();
    } catch (err) {
      next(new Error('Invalid token'));
    }
  });

  io.on('connection', async (socket) => {
    logger.info(`Socket connected: ${socket.user.username} (${socket.id})`);

    // Mark user online
    await User.findByIdAndUpdate(socket.user._id, { isOnline: true });

    // Register feature handlers
    battleSocketHandlers(io, socket);
    matchmakingSocketHandlers(io, socket);
    chatSocketHandlers(io, socket);

    socket.on('disconnect', async () => {
      logger.info(`Socket disconnected: ${socket.user.username}`);
      await User.findByIdAndUpdate(socket.user._id, {
        isOnline: false,
        lastSeen: new Date(),
      });

      // Notify matchmaking to remove from queue
      socket.emit('stop-matchmaking');
    });
  });
}

export default registerSocketHandlers;