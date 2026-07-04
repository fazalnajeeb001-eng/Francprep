import dotenv from 'dotenv';
import path from 'path';
import crypto from 'crypto';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// Generate a random secret at startup if not provided — ensures the server
// always starts, even if env vars are missing. Set JWT_ACCESS_SECRET and
// JWT_REFRESH_SECRET in production for consistent sessions across restarts.
const generateSecret = () => crypto.randomBytes(32).toString('hex');

export const env = {
  port: parseInt(process.env.PORT || '5000', 10),
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/francprep',
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET || generateSecret(),
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || generateSecret(),
  jwtAccessExpiry: process.env.JWT_ACCESS_EXPIRY || '15m',
  jwtRefreshExpiry: process.env.JWT_REFRESH_EXPIRY || '7d',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
  nodeEnv: process.env.NODE_ENV || 'development',
};
