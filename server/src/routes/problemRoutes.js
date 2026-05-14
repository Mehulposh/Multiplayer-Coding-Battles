import express from 'express';
import {
  getProblems,
  getProblem,
  seedProblems,
  createProblem,
  updateProblem,
  deleteProblem,
  toggleProblem,
} from '../controllers/problemController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getProblems);
router.get('/seed', seedProblems); // Dev only - seed problems
router.get('/:id', protect, getProblem);

router.post('/',            protect, createProblem);   // POST   /api/problems
router.put('/:id',          protect, updateProblem);   // PUT    /api/problems/:id
router.delete('/:id',       protect, deleteProblem);   // DELETE /api/problems/:id
router.patch('/:id/toggle', protect, toggleProblem);   // PATCH  /api/problems/:id/toggle

export default router;