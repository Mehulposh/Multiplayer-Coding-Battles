import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { submissionLimiter } from '../middleware/rateLimiter.js';
import {
  createBattle, getBattle, joinBattle, submitCode, getUserBattles
} from '../controllers/battleController.js';

const router = express.Router();

router.use(protect);

router.post('/create', createBattle);
router.get('/my', getUserBattles);
router.get('/:id', getBattle);
router.post('/:id/join', joinBattle);
router.post('/:id/submit', submissionLimiter, submitCode);

export default router;