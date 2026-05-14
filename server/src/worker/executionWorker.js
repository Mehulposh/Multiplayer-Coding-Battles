import dotenv from 'dotenv'

import fs from 'fs/promises';
import path from 'path';
import os from 'os';

import { Worker } from 'bullmq';
import Docker from 'dockerode';
import { createClient } from 'redis';

import connectDB from '../config/dbConfig.js';
import Battle from '../models/battleModel.js';
import User from '../models/userModel.js';
import logger from '../utils/logger.js';

dotenv.config()
const docker = new Docker({
  socketPath: '/var/run/docker.sock',
});

// ===============================
// Language Configurations
// ===============================

const LANGUAGE_CONFIG = {
  javascript: {
    image: 'node:20-alpine',
    extension: 'js',

    command: (filename) => ['node', filename],

    wrapCode: (code, input) => `
const lines = ${JSON.stringify(input)}
  .split('\\n');

let lineIndex = 0;

const readline = () => lines[lineIndex++] || '';

${code}
`,
  },

  python: {
    image: 'python:3.11-alpine',
    extension: 'py',

    command: (filename) => ['python3', filename],

    wrapCode: (code, input) => `
import sys
from io import StringIO

sys.stdin = StringIO(${JSON.stringify(input)})

${code}
`,
  },

  java: {
    image: 'openjdk:17-alpine',
    extension: 'java',

    command: (filename) => [
      'sh',
      '-c',
      `
      cd /workspace &&
      javac ${path.basename(filename)} &&
      java Solution
      `,
    ],

    wrapCode: (code) => code,
  },

  cpp: {
    image: 'gcc:13',
    extension: 'cpp',

    command: (filename) => [
      'sh',
      '-c',
      `
      g++ -O2 -std=c++17 ${filename} -o /workspace/solution &&
      /workspace/solution
      `,
    ],

    wrapCode: (code) => code,
  },

  go: {
    image: 'golang:1.21-alpine',
    extension: 'go',

    command: (filename) => ['go', 'run', filename],

    wrapCode: (code) => code,
  },
};

// ===============================
// Utility Functions
// ===============================

function normalizeOutput(str = '') {
  return str
    .trim()
    .replace(/\r\n/g, '\n')
    .replace(/\s+$/gm, '');
}

async function createTempDirectory() {
  return fs.mkdtemp(path.join(os.tmpdir(), 'battle-'));
}

async function cleanupTempDirectory(tempDir) {
  try {
    await fs.rm(tempDir, {
      recursive: true,
      force: true,
    });
  } catch (err) {
    logger.error('Cleanup failed:', err);
  }
}

// ===============================
// Secure Code Execution
// ===============================

async function executeCode(
  code,
  language,
  input,
  timeLimitMs = 5000
) {
  const config = LANGUAGE_CONFIG[language];

  if (!config) {
    throw new Error(`Unsupported language: ${language}`);
  }

  const tempDir = await createTempDirectory();

  const filename = path.join(
    tempDir,
    `solution.${config.extension}`
  );

  const wrappedCode = config.wrapCode(code, input);

  await fs.writeFile(filename, wrappedCode);

  const container = await docker.createContainer({
    Image: config.image,

    Cmd: config.command(`/workspace/${path.basename(filename)}`),

    WorkingDir: '/workspace',

    Tty: false,

    User: '1000:1000',

    AttachStdout: true,
    AttachStderr: true,

    HostConfig: {
      AutoRemove: true,

      NetworkMode: 'none',

      Memory: 128 * 1024 * 1024,
      MemorySwap: 128 * 1024 * 1024,

      CpuPeriod: 100000,
      CpuQuota: 50000,

      PidsLimit: 64,

      ReadonlyRootfs: true,

      SecurityOpt: ['no-new-privileges'],

      CapDrop: ['ALL'],

      Binds: [`${tempDir}:/workspace:ro`],
    },
  });

  const startTime = Date.now();

  let timeout;

  try {
    const stream = await container.attach({
      stream: true,
      stdout: true,
      stderr: true,
    });

    let output = '';

    stream.on('data', (chunk) => {
      output += chunk.toString();
    });

    await container.start();

    await Promise.race([
      container.wait(),

      new Promise((_, reject) => {
        timeout = setTimeout(async () => {
          try {
            await container.kill();
          } catch (_) {}

          reject(new Error('Time Limit Exceeded'));
        }, timeLimitMs);
      }),
    ]);

    clearTimeout(timeout);

    const executionTime = Date.now() - startTime;

    const stats = await container.stats({
      stream: false,
    });

    const memoryUsage =
      stats.memory_stats?.usage || 0;

    return {
      output: output
        .replace(/[^\x20-\x7E\n\r\t]/g, '')
        .trim(),

      executionTime,

      memoryUsage,

      error: null,
    };
  } catch (err) {
    return {
      output: '',

      executionTime: Date.now() - startTime,

      memoryUsage: 0,

      error: err.message,
    };
  } finally {
    clearTimeout(timeout);

    try {
      await container.remove({ force: true });
    } catch (_) {}

    await cleanupTempDirectory(tempDir);
  }
}

// ===============================
// Submission Processing
// ===============================

async function processSubmission(jobData) {
  const {
    battleId,
    roomId,
    userId,
    username,
    code,
    language,
    testCases = [],
    hiddenTestCases = [],
    timeLimitMs,
  } = jobData;

  const allTests = [
    ...testCases,
    ...hiddenTestCases,
  ];

  let passedCount = 0;

  let totalExecutionTime = 0;

  let peakMemoryUsage = 0;

  let errorMessage = '';

  for (const tc of allTests) {
    const result = await executeCode(
      code,
      language,
      tc.input,
      timeLimitMs
    );

    totalExecutionTime += result.executionTime;

    peakMemoryUsage = Math.max(
      peakMemoryUsage,
      result.memoryUsage
    );

    if (result.error) {
      errorMessage = result.error;
      break;
    }

    const expected = normalizeOutput(tc.expected);

    const actual = normalizeOutput(result.output);

    if (expected === actual) {
      passedCount++;
    }
  }

  const passed =
    passedCount === allTests.length;

  const submission = {
    user: userId,

    language,

    code,

    executionTime:
      Math.round(
        totalExecutionTime / allTests.length
      ) || 0,

    memoryUsage: peakMemoryUsage,

    passed,

    passedCount,

    totalTests: allTests.length,

    error: errorMessage,
  };

  const battle =
    await Battle.findByIdAndUpdate(
      battleId,
      {
        $push: {
          submissions: submission,
        },
      },
      { new: true }
    ).populate('players.user');

  if (!battle) {
    return null;
  }

  // ===============================
  // Finish Battle
  // ===============================

  if (passed && battle.status === 'active') {
    battle.status = 'finished';

    battle.winner = userId;

    battle.endedAt = new Date();

    battle.duration = Math.round(
      (battle.endedAt - battle.startedAt) / 1000
    );

    await battle.save();

    const winner =
      battle.players.find(
        (p) =>
          p.user._id.toString() === userId
      );

    const loser =
      battle.players.find(
        (p) =>
          p.user._id.toString() !== userId
      );

    if (winner && loser) {
      const winnerUser =
        await User.findById(winner.user._id);

      const loserUser =
        await User.findById(loser.user._id);

      if (winnerUser && loserUser) {
        const winnerOldRating =
          winnerUser.eloRating;

        const loserOldRating =
          loserUser.eloRating;

        winnerUser.updateElo(
          loserOldRating,
          true
        );

        loserUser.updateElo(
          winnerOldRating,
          false
        );

        await Promise.all([
          winnerUser.save(),
          loserUser.save(),
        ]);
      }
    }

    return {
      type: 'battle-ended',

      roomId,

      winnerId: userId,

      winnerUsername: username,

      submission,

      passedCount,

      totalTests: allTests.length,
    };
  }

  return {
    type: 'submission-result',

    roomId,

    userId,

    username,

    submission,

    passedCount,

    totalTests: allTests.length,
  };
}

// ===============================
// Worker Startup
// ===============================

async function startWorker() {
  await connectDB();

  const publisher = createClient({
    url:
      process.env.REDIS_URL ||
      'redis://localhost:6379',
  });

  await publisher.connect();

  const worker = new Worker(
    'code-execution',

    async (job) => {
      logger.info(
        `Processing job ${job.id}`
      );

      try {
        const result =
          await processSubmission(job.data);

        if (result) {
          await publisher.publish(
            'submission-results',
            JSON.stringify(result)
          );
        }

        logger.info(
          `Job ${job.id} completed`
        );

        return result;
      } catch (err) {
        logger.error(
          `Job ${job.id} failed`,
          err
        );

        throw err;
      }
    },

    {
      concurrency: 5,

      connection: {
        host:
          process.env.REDIS_HOST ||
          'localhost',

        port:
          parseInt(
            process.env.REDIS_PORT
          ) || 6379,
      },
    }
  );

  worker.on('completed', (job) => {
    logger.info(
      `Worker completed job ${job.id}`
    );
  });

  worker.on('failed', (job, err) => {
    logger.error(
      `Worker failed job ${job?.id}`,
      err
    );
  });

  logger.info(
    '🚀 Secure execution worker started'
  );
}

// ===============================
// Bootstrap
// ===============================

startWorker().catch((err) => {
  logger.error(
    'Worker startup failed',
    err
  );

  process.exit(1);
});