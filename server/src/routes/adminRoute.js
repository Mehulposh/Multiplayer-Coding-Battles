import express from 'express';
import {
  getStats,
  getUsers,
  toggleUserRole,
  deleteUser,
  getBattles,
} from '../controllers/adminController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// All admin routes require login + admin role
router.use(protect, isAdmin);

router.get('/stats',                 getStats);       // GET   /api/admin/stats
router.get('/users',                 getUsers);       // GET   /api/admin/users
router.patch('/users/:id/role',      toggleUserRole); // PATCH /api/admin/users/:id/role
router.delete('/users/:id',          deleteUser);     // DELETE /api/admin/users/:id
router.get('/battles',               getBattles);     // GET   /api/admin/battles

module.exports = router;