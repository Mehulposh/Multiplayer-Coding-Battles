import express from 'express';
import { getProblems, getProblem, seedProblems } from '../controllers/problemController.js';
import { protect } from '../middleware/authMiddleware.jss';

const router = express.Router();

router.get('/', protect, getProblems);
router.get('/seed', seedProblems); // Dev only - seed problems
router.get('/:id', protect, getProblem);

export default router;