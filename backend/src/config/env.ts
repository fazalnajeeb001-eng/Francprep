import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const env = {
  port: parseInt(process.env.PORT || '5000', 10),
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/francprep',
  jwtAccessSecret: (() => {
    const secret = process.env.JWT_ACCESS_SECRET;
    if (!secret && process.env.NODE_ENV === 'production') throw new Error('JWT_ACCESS_SECRET is required in production');
    return secret || 'dev-access-secret-only';
  })(),
  jwtRefreshSecret: (() => {
    const secret = process.env.JWT_REFRESH_SECRET;
    if (!secret && process.env.NODE_ENV === 'production') throw new Error('JWT_REFRESH_SECRET is required in production');
    return secret || 'dev-refresh-secret-only';
  })(),
  jwtAccessExpiry: process.env.JWT_ACCESS_EXPIRY || '15m',
  jwtRefreshExpiry: process.env.JWT_REFRESH_EXPIRY || '7d',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
  nodeEnv: process.env.NODE_ENV || 'development',
};
