import express from 'express';
import { getGlobalLeaderboard, getWeeklyLeaderboard } from '../controllers/leaderBoardController';

const router = express.Router();
router.get('/global', getGlobalLeaderboard);
router.get('/weekly', getWeeklyLeaderboard);

export default router;