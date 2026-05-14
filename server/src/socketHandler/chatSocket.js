import xss from 'xss'
import Battle from '../models/battleModel.js';
import logger from '../utils/logger.js';

const MESSAGE_RATE_LIMIT = 1000; // 1 message per second
const lastMessageTime = new Map();

export default function chatSocketHandlers(io, socket) {
  socket.on('send-message', async ({ roomId, message }) => {
    if (!message || !roomId) return;

    // Rate limit
    const now = Date.now();
    const lastTime = lastMessageTime.get(socket.id) || 0;
    if (now - lastTime < MESSAGE_RATE_LIMIT) {
      return socket.emit('error', { message: 'Sending messages too fast' });
    }
    lastMessageTime.set(socket.id, now);

    // Sanitize
    const sanitizedMessage = xss(message.trim()).substring(0, 500);
    if (!sanitizedMessage) return;

    const chatMsg = {
      user: socket.user._id,
      username: socket.user.username,
      message: sanitizedMessage,
      timestamp: new Date(),
    };

    // Broadcast to room
    io.to(roomId).emit('new-message', chatMsg);

    // Save to DB
    Battle.findOneAndUpdate(
      { roomId },
      { $push: { chatMessages: chatMsg } }
    ).catch((err) => logger.error('Chat save error:', err));
  });
};