import { createClient }
  from 'redis';

import logger from '../utils/logger.js';

let subscriber;

export async function initSubmissionSubscriber(
  io
) {
  subscriber = createClient({
    url: process.env.REDIS_URL,
  });

  subscriber.on('error', (err) =>
    logger.error(
      'Redis subscriber error:',
      err
    )
  );

  await subscriber.connect();

  logger.info(
    '✅ Submission subscriber connected'
  );

  await subscriber.subscribe(
    'submission-results',

    async (message) => {
      try {
        const data =
          JSON.parse(message);

        logger.info(
          `Received submission result for room ${data.roomId}`
        );

        io.to(data.roomId).emit(
          data.type,
          data
        );

        logger.info(
          `Emitted ${data.type} to room ${data.roomId}`
        );
      } catch (err) {
        logger.error(
          'Submission subscriber error:',
          err
        );
      }
    }
  );
}