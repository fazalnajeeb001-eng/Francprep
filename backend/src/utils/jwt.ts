import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { IJwtPayload } from '../types';

export const generateAccessToken = (payload: IJwtPayload): string => {
  return jwt.sign(payload, env.jwtAccessSecret, {
    expiresIn: env.jwtAccessExpiry as jwt.SignOptions['expiresIn'],
  });
};

export const generateRefreshToken = (payload: IJwtPayload): string => {
  return jwt.sign(payload, env.jwtRefreshSecret, {
    expiresIn: env.jwtRefreshExpiry as jwt.SignOptions['expiresIn'],
  });
};

export const verifyAccessToken = (token: string): IJwtPayload => {
  return jwt.verify(token, env.jwtAccessSecret) as IJwtPayload;
};

export const verifyRefreshToken = (token: string): IJwtPayload => {
  return jwt.verify(token, env.jwtRefreshSecret) as IJwtPayload;
};

export const generateTokenPair = (payload: IJwtPayload) => {
  return {
    accessToken: generateAccessToken(payload),
    refreshToken: generateRefreshToken(payload),
  };
};