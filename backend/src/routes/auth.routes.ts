import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { authenticate } from '../middleware/auth';
import { validate } from '../middleware/validation';
import { loginSchema, refreshTokenSchema, signupSchema } from '../utils/validators';
import rateLimit from 'express-rate-limit';

const router = Router();

// Rate limiting for auth routes (5 attempts per 15 minutes)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: {
    success: false,
    error: 'Too many attempts. Please try again after 15 minutes.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// POST /api/auth/signup
router.post('/signup', authLimiter, validate(signupSchema), (req, res, next) =>
  authController.signup(req, res, next)
);

// POST /api/auth/login
router.post('/login', authLimiter, validate(loginSchema), (req, res, next) =>
  authController.login(req, res, next)
);

// POST /api/auth/logout
router.post('/logout', authenticate, (req, res, next) =>
  authController.logout(req, res, next)
);

// GET /api/auth/me
router.get('/me', authenticate, (req, res, next) =>
  authController.getMe(req, res, next)
);

// POST /api/auth/refresh-token
router.post('/refresh-token', validate(refreshTokenSchema), (req, res, next) =>
  authController.refreshToken(req, res, next)
);

export default router;