import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { corsConfig } from './middleware/corsConfig';
import { errorHandler } from './middleware/errorHandler';
import routes from './routes/index';
import { env } from './config/env';

const app = express();

// Trust proxy (required for express-rate-limit behind Railway/nginx)
app.set('trust proxy', 1);

// Global rate limiter — 100 requests per 15 minutes per IP
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: 'Too many requests, please try again later.' },
});

// Security middleware
app.use(helmet());
app.use(corsConfig);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Apply global rate limiter to all API routes
app.use('/api', apiLimiter);

// API routes
app.use('/api', routes);

// 404 handler
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
  });
});

// Global error handler
app.use(errorHandler);

export default app;