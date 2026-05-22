import User from '../models/userModel.js';
import Battle from '../models/battleModel.js';
import Problem from '../models/problemModel.js';
import logger from '../utils/logger.js';


// ─── GET STATS ────────────────────────────────────────────
const getStats = async (req, res) => {
  try {
    const [
      totalUsers,
      totalBattles,
      activeBattles,
      finishedBattles,
      totalProblems,
      activeProblems,
      onlineUsers,
      recentUsers,
      recentBattles,
    ] = await Promise.all([
      User.countDocuments(),
      Battle.countDocuments(),
      Battle.countDocuments({ status: 'active' }),
      Battle.countDocuments({ status: 'finished' }),
      Problem.countDocuments(),
      Problem.countDocuments({ isActive: true }),
      User.countDocuments({ isOnline: true }),
      User.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select('username email eloRating role createdAt isOnline'),
      Battle.find({ status: 'finished' })
        .sort({ endedAt: -1 })
        .limit(5)
        .populate('players.user', 'username')
        .populate('problem', 'title difficulty')
        .populate('winner', 'username'),
    ]);

    // Battles per day — last 7 days
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const battlesPerDay = await Battle.aggregate([
      { $match: { createdAt: { $gte: sevenDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Users registered per day — last 7 days
    const usersPerDay = await User.aggregate([
      { $match: { createdAt: { $gte: sevenDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // ELO distribution
    const eloDistribution = await User.aggregate([
      {
        $bucket: {
          groupBy: '$eloRating',
          boundaries: [0, 800, 1000, 1200, 1400, 1600, 2000, 9999],
          default: 'Other',
          output: { count: { $sum: 1 } },
        },
      },
    ]);

    // Problem difficulty breakdown
    const problemsByDifficulty = await Problem.aggregate([
      { $group: { _id: '$difficulty', count: { $sum: 1 }, active: { $sum: { $cond: ['$isActive', 1, 0] } } } },
    ]);

    // Top 5 players by ELO
    const topPlayers = await User.find()
      .sort({ eloRating: -1 })
      .limit(5)
      .select('username eloRating wins losses battlesPlayed');

    res.json({
      stats: {
        totalUsers,
        onlineUsers,
        totalBattles,
        activeBattles,
        finishedBattles,
        totalProblems,
        activeProblems,
      },
      recentUsers,
      recentBattles,
      battlesPerDay,
      usersPerDay,
      eloDistribution,
      problemsByDifficulty,
      topPlayers,
    });
  } catch (err) {
    logger.error('Admin stats error:', err);
    res.status(500).json({ message: 'Failed to fetch admin stats' });
  }
};

// ─── GET ALL USERS ────────────────────────────────────────
const getUsers = async (req, res) => {
  try {
    const { page = 1, limit = 15, search, role } = req.query;
    const filter = {};

    if (search) {
      filter.$or = [
        { username: new RegExp(search, 'i') },
        { email: new RegExp(search, 'i') },
      ];
    }
    if (role && role !== 'all') filter.role = role;

    const [users, total] = await Promise.all([
      User.find(filter)
        .select('-password')
        .sort({ createdAt: -1 })
        .skip((parseInt(page) - 1) * parseInt(limit))
        .limit(parseInt(limit)),
      User.countDocuments(filter),
    ]);

    res.json({
      users,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
    });
  } catch (err) {
    logger.error('Get users error:', err);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};

// ─── TOGGLE USER ROLE ─────────────────────────────────────
const toggleUserRole = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Prevent self-demotion
    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: 'Cannot change your own role' });
    }

    user.role = user.role === 'admin' ? 'user' : 'admin';
    await user.save();

    res.json({
      message: `${user.username} is now ${user.role}`,
      role: user.role,
    });
  } catch (err) {
    logger.error('Toggle role error:', err);
    res.status(500).json({ message: 'Failed to update role' });
  }
};

// ─── DELETE USER ──────────────────────────────────────────
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: 'Cannot delete your own account' });
    }

    await User.findByIdAndDelete(req.params.id);
    res.json({ message: `User "${user.username}" deleted` });
  } catch (err) {
    logger.error('Delete user error:', err);
    res.status(500).json({ message: 'Failed to delete user' });
  }
};

// ─── GET ALL BATTLES ──────────────────────────────────────
const getBattles = async (req, res) => {
  try {
    const { page = 1, limit = 15, status } = req.query;
    const filter = {};
    if (status && status !== 'all') filter.status = status;

    const [battles, total] = await Promise.all([
      Battle.find(filter)
        .populate('players.user', 'username eloRating')
        .populate('problem', 'title difficulty')
        .populate('winner', 'username')
        .sort({ createdAt: -1 })
        .skip((parseInt(page) - 1) * parseInt(limit))
        .limit(parseInt(limit)),
      Battle.countDocuments(filter),
    ]);

    res.json({
      battles,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
    });
  } catch (err) {
    logger.error('Get battles error:', err);
    res.status(500).json({ message: 'Failed to fetch battles' });
  }
};

export { getStats, getUsers, toggleUserRole, deleteUser, getBattles };