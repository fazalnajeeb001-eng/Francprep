import { Router } from 'express';
import { dashboardController } from '../controllers/dashboard.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

// GET /api/dashboard - Get full dashboard data
router.get('/', authenticate, (req, res, next) =>
  dashboardController.getDashboard(req, res, next)
);

export default router;
