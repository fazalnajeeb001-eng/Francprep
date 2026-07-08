import { Router } from 'express';
import { progressController } from '../controllers/progress.controller';
import { authenticate } from '../middleware/auth';
import { validate } from '../middleware/validation';
import { updateProgressSchema } from '../utils/validators';

const router = Router();

// GET /api/progress/levels - Get progress grouped by CEFR level
router.get('/levels', authenticate, (req, res, next) =>
  progressController.getLevelsProgress(req, res, next)
);

// GET /api/progress - Get overall user progress
router.get('/', authenticate, (req, res, next) =>
  progressController.getAll(req, res, next)
);

// GET /api/progress/:lesson_id - Get progress for a specific lesson
router.get('/:lesson_id', authenticate, (req, res, next) =>
  progressController.getByLesson(req, res, next)
);

// POST /api/progress/:lesson_id/update - Update progress for a lesson
router.post(
  '/:lesson_id/update',
  authenticate,
  validate(updateProgressSchema),
  (req, res, next) => progressController.update(req, res, next)
);

export default router;