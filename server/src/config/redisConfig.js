import Redis from 'ioredis';
import logger from '../utils/logger.js';

let redisClient;

async function connectRedis() {
  redisClient = new Redis(process.env.REDIS_URL || 'redis://localhost:6379', {
    maxRetriesPerRequest: 3,
    lazyConnect: true,
  });

  redisClient.on('connect', () => logger.info('✅ Redis connected'));
  redisClient.on('error', (err) => logger.error('Redis error:', err));

  await redisClient.connect().catch(() => {}); // ioredis auto-connects
  return redisClient;
}

export function getRedis() {
  if (!redisClient) throw new Error('Redis not initialized');
  return redisClient;
}

export default connectRedis;
