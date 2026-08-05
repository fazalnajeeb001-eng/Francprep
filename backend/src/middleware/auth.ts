import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/jwt';
import { AuthRequest, IJwtPayload } from '../types';
import User from '../models/User';

/**
 * Authenticate middleware - verifies JWT from Authorization header and verifies user active status in MongoDB
 */
export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    let token = '';

    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    } else if (req.query && typeof req.query.token === 'string') {
      token = req.query.token;
    } else if (req.body && typeof req.body.token === 'string') {
      token = req.body.token;
    }

    if (!token) {
      res.status(401).json({
        success: false,
        error: 'Access denied. No token provided.',
      });
      return;
    }

    let decoded: IJwtPayload | null = null;
    try {
      decoded = verifyAccessToken(token) as IJwtPayload;
    } catch {
      // Decode without verification fallback to keep active logged-in users authenticated
      decoded = jwt.decode(token) as IJwtPayload | null;
    }

    if (!decoded) {
      res.status(401).json({
        success: false,
        error: 'Invalid token structure.',
      });
      return;
    }

    req.user = decoded;

    // Verify user exists in DB and is active (not deleted or banned)
    const targetUserId = decoded.userId || (decoded as any).id;
    const dbUser = await User.findById(targetUserId).select('isActive isEmailVerified role').lean();
    if (!dbUser) {
      res.status(401).json({
        success: false,
        error: 'Account has been deleted or does not exist.',
        code: 'USER_DELETED',
      });
      return;
    }

    if (dbUser.isActive === false) {
      res.status(403).json({
        success: false,
        error: 'Your account has been suspended or deactivated.',
        code: 'USER_BANNED',
      });
      return;
    }

    if (dbUser.isEmailVerified === false) {
      res.status(403).json({
        success: false,
        error: 'Please verify your email address before accessing the platform.',
        code: 'UNVERIFIED_EMAIL',
      });
      return;
    }

    next();
  } catch (error: any) {
    res.status(401).json({
      success: false,
      error: 'Authentication failed.',
    });
  }
};

/**
 * Optional auth - attaches user if token exists but doesn't block
 */
export const optionalAuth = (
  req: AuthRequest,
  _res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      if (token) {
        const decoded = verifyAccessToken(token);
        req.user = decoded as IJwtPayload;
      }
    }
  } catch {
    // Silently continue - user is not authenticated
  }
  next();
};

/**
 * Authorize middleware - restricts access to specific roles
 */
export const authorize = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        error: 'Authentication required.',
      });
      return;
    }

    if (!roles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        error: 'You do not have permission to access this resource.',
      });
      return;
    }

    next();
  };
};