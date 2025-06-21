import { rateLimit } from 'express-rate-limit';

// Configure rate limiting middleware to prevent abuse
const limiter = rateLimit({
  windowMs: 60000, // 1 minute time window for request limiting
  limit: 60, // Limit each IP to 60 requests per windowMs
  standardHeaders: 'draft-8', // Use latest standard headers for rate limiting
  legacyHeaders: false, // Disable legacy headers to avoid confusion
  message: {
    status: 429,
    error: 'Too many requests, please try again later.',
  },
});

export default limiter;
