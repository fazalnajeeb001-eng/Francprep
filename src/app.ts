import express from 'express';
import helmet from 'helmet';
import { corsConfig } from './middleware/corsConfig';
import { errorHandler } from './middleware/errorHandler';
import routes from './routes/index';
import { env } from './config/env';

const app = express();

// Security middleware
app.use(helmet());
app.use(corsConfig);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

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