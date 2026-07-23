import cors from 'cors';
import { env } from '../config/env';

/**
 * CORS configuration - allows frontend domains
 */
const corsOptions: cors.CorsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (server-to-server, mobile apps, curl)
    if (!origin) {
      callback(null, true);
      return;
    }
    // Allow vercel.app subdomains and the exact frontend URL
    const allowedOrigins = [
      env.frontendUrl,
      'https://francprep.vercel.app',
      'https://d1ddeb40d7bda5af877310b51d376d7f.ctonew.app',
    ];
    if (
      allowedOrigins.includes(origin) ||
      origin.endsWith('.vercel.app') ||
      origin.endsWith('.netlify.app') ||
      origin.endsWith('.ctonew.app') ||
      env.nodeEnv === 'development'
    ) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept',
    'Origin',
  ],
  exposedHeaders: ['Set-Cookie'],
  maxAge: 86400, // 24 hours
};

export const corsConfig = cors(corsOptions);