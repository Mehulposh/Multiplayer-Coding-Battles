import { v4 as uuidv4 } from 'uuid';
import mongoose from 'mongoose';
import Battle from '../models/battleModel.js';
import Problem from '../models/problemModel.js';
import User from '../models/userModel.js';
import { addToExecutionQueue } from '../queue/executionQueue.js';
import logger from '../utils/logger.js';

function buildBattleQuery(id) {
  if (mongoose.Types.ObjectId.isValid(id)) {
    return { $or: [{ _id: id }, { roomId: id }] };
  }
  return { roomId: id };
}

const createBattle = async (req, res) => {
  try {
    const { isPrivate = false } = req.body;

    // Get a random problem
    const count = await Problem.countDocuments({ isActive: true });
    const randomIndex = Math.floor(Math.random() * count);
    const problem = await Problem.findOne({ isActive: true }).skip(randomIndex);

    if (!problem) {
      return res.status(404).json({ message: 'No problems available' });
    }

    const battle = await Battle.create({
      roomId: uuidv4(),
      players: [{
        user: req.user._id,
        username: req.user.username,
        eloRating: req.user.eloRating,
        ready: false,
      }],
      problem: problem._id,
      status: 'waiting',
      isPrivate,
    });

    await battle.populate('problem');

    res.status(201).json({ battle });
  } catch (err) {
    logger.error('Create battle error:', err);
    res.status(500).json({ message: 'Failed to create battle' });
  }
};

const getBattle = async (req, res) => {
  try {
    console.log('STEP 1');

    let battle = await Battle.findOne(
      buildBattleQuery(req.params.id)
    );

    console.log('STEP 2');

    battle = await battle.populate(
      'players.user',
      'username eloRating avatar'
    );

    console.log('STEP 3');

    battle = await battle.populate(
      'problem'
    );

    console.log('STEP 4');

    battle = await battle.populate(
      'winner',
      'username'
    );

    console.log('STEP 5');

    if (!battle) {
      return res.status(404).json({
        message:
          'Battle not found',
      });
    }

    res.json({ battle });
  } catch (err) {
    console.error(err);

    logger.error(
      'Get battle error:',
      err
    );

    res.status(500).json({
      message:
        'Failed to fetch battle',
    });
  }
};

const joinBattle = async (req, res) => {
  try {
    const battle = await Battle.findOne(buildBattleQuery(req.params.id)).populate('problem');

    if (!battle) {
      return res.status(404).json({ message: 'Battle not found' });
    }

    if (battle.status !== 'waiting') {
      return res.status(400).json({ message: 'Battle is no longer accepting players' });
    }

    const alreadyJoined = battle.players.some(
      (p) => p.user.toString() === req.user._id.toString()
    );

    if (alreadyJoined) {
      return res.status(400).json({ message: 'Already in this battle' });
    }

    if (battle.players.length >= battle.maxPlayers) {
      return res.status(400).json({ message: 'Battle is full' });
    }

    battle.players.push({
      user: req.user._id,
      username: req.user.username,
      eloRating: req.user.eloRating,
      ready: false,
    });

    await battle.save();

    // Notify via socket
    req.io.to(battle.roomId).emit('player-joined', {
      player: {
        userId: req.user._id,
        username: req.user.username,
        eloRating: req.user.eloRating,
      },
    });

    res.json({ battle });
  } catch (err) {
    logger.error('Join battle error:', err);
    res.status(500).json({ message: 'Failed to join battle' });
  }
};

const submitCode = async (req, res) => {
  try {
    const { code, language } = req.body;
    const battle = await Battle.findById(req.params.id).populate('problem');

    if (!battle) {
      return res.status(404).json({ message: 'Battle not found' });
    }

    if (battle.status !== 'active') {
      return res.status(400).json({ message: 'Battle is not active' });
    }

    const playerInBattle = battle.players.some(
      (p) => p.user.toString() === req.user._id.toString()
    );

    if (!playerInBattle) {
      return res.status(403).json({ message: 'You are not a participant in this battle' });
    }

    // Add to execution queue
    const jobId = await addToExecutionQueue({
      battleId: battle._id.toString(),
      roomId: battle.roomId,
      userId: req.user._id.toString(),
      username: req.user.username,
      code,
      language,
      testCases: battle.problem.testCases,
      hiddenTestCases: battle.problem.hiddenTestCases,
      timeLimitMs: battle.problem.timeLimitMs,
      memoryLimitMb: battle.problem.memoryLimitMb,
    });

    res.json({ message: 'Code submitted for evaluation', jobId });
  } catch (err) {
    logger.error('Submit code error:', err);
    res.status(500).json({ message: 'Failed to submit code' });
  }
};

const getUserBattles = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const battles = await Battle.find({
      'players.user': req.user._id,
      status: 'finished',
    })
      .populate('players.user', 'username eloRating')
      .populate('problem', 'title difficulty')
      .populate('winner', 'username')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Battle.countDocuments({
      'players.user': req.user._id,
      status: 'finished',
    });

    res.json({ battles, total, page, pages: Math.ceil(total / limit) });
  } catch (err) {
    logger.error('Get user battles error:', err);
    res.status(500).json({ message: 'Failed to fetch battles' });
  }
};

export { createBattle, getBattle, joinBattle, submitCode, getUserBattles };