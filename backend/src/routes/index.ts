import { Router } from 'express';
import authRoutes from './auth.routes';
import lessonRoutes from './lessons.routes';
import exerciseRoutes from './exercises.routes';
import progressRoutes from './progress.routes';
import adminRoutes from './admin.routes';

const router = Router();

// Health check
router.get('/health', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'FrancPrep API is running',
    timestamp: new Date().toISOString(),
  });
});

// Mount routes
router.use('/auth', authRoutes);
router.use('/lessons', lessonRoutes);
router.use('/exercises', exerciseRoutes);
router.use('/progress', progressRoutes);
router.use('/admin', adminRoutes);

export default router;