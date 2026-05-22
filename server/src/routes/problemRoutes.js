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
import { protect , isAdmin} from '../middleware/authMiddleware.js';

const router = express.Router();

// Public / Dev
router.get('/seed', seedProblems);

// Any logged-in user - read only
router.get('/',    protect, getProblems);
router.get('/:id', protect, getProblem);

// Admin only - write operations
router.post('/',            protect,isAdmin, createProblem);   // POST   /api/problems
router.put('/:id',          protect,isAdmin, updateProblem);   // PUT    /api/problems/:id
router.delete('/:id',       protect,isAdmin, deleteProblem);   // DELETE /api/problems/:id
router.patch('/:id/toggle', protect,isAdmin, toggleProblem);   // PATCH  /api/problems/:id/toggle

export default router;