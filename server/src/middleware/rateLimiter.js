import rateLimit from 'express-rate-limit';

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  message: { message: 'Too many attempts, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100,
  message: { message: 'Rate limit exceeded, slow down.' },
  standardHeaders: true,
  legacyHeaders: false,
});

const submissionLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: { message: 'Too many submissions, please wait.' },
  standardHeaders: true,
  legacyHeaders: false,
});

export { authLimiter, apiLimiter, submissionLimiter };