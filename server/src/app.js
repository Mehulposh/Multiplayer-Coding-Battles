import dotenv from 'dotenv'
import express from 'express';
import http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { Server } from 'socket.io';

import connectDB from './config/dbConfig.js';
import connectRedis from './config/redisConfig.js';
import logger from './utils/logger.js';

// Route imports
import authRoutes from './routes/authRoutes.js';
import battleRoutes from './routes/battleRoutes.js';
import problemRoutes from './routes/problemRoutes.js';
import leaderboardRoutes from './routes/leaderBoardRoutes.js';
import profileRoutes from './routes/profileRoutes.js';

// Socket handlers
import registerSocketHandlers from './socketHandler/index.js';
import { initSubmissionSubscriber} from './socketHandler/submissionSubscriber.js'

dotenv.config()
const app = express();
const server = http.createServer(app);

// Socket.IO setup
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Middleware
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined', { stream: { write: (msg) => logger.info(msg.trim()) } }));

// Attach io to req
app.use((req, _res, next) => {
  req.io = io;
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/battle', battleRoutes);
app.use('/api/problems', problemRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/profile', profileRoutes);

// Health check
app.get('/health', (_req, res) => res.json({ status: 'ok', timestamp: new Date() }));

// 404 handler
app.use((_req, res) => res.status(404).json({ message: 'Route not found' }));

// Global error handler
app.use((err, _req, res, _next) => {
  logger.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

// Socket handlers
 registerSocketHandlers(io);

// Start server
const PORT = process.env.PORT || 5000;

async function startServer() {
  await connectDB();
  await connectRedis();
  await initSubmissionSubscriber(io);
  server.listen(PORT, () => {
    logger.info(`🚀 Server running on port ${PORT}`);
    logger.info(`🌍 Environment: ${process.env.NODE_ENV}`);
  });
}

startServer().catch((err) => {
  logger.error('Failed to start server:', err);
  process.exit(1);
});

export { app, io };