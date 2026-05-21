import { Queue } from 'bullmq';

let executionQueue;

function getExecutionQueue() {
  if (!executionQueue) {
    executionQueue = new Queue('code-execution', {
      connection: {
        host: process.env.REDIS_HOST || 'localhost',
        port: process.env.REDIS_PORT || 6379,
      },
      defaultJobOptions: {
        removeOnComplete: 100,
        removeOnFail: 200,
        attempts: 1,
        timeout: 30000,
      },
    });
  }
  return executionQueue;
}

async function addToExecutionQueue(jobData) {
  const queue = getExecutionQueue();
  const job = await queue.add('execute', jobData, {
    priority: 1,
  });
  return job.id;
}

export { getExecutionQueue, addToExecutionQueue };