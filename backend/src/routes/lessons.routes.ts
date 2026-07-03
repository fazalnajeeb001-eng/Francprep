import { Router } from 'express';
import { lessonController } from '../controllers/lesson.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

// GET /api/lessons - Get all published lessons
router.get('/', authenticate, (req, res, next) =>
  lessonController.getAll(req, res, next)
);

// GET /api/lessons/:id - Get lesson by ID
router.get('/:id', authenticate, (req, res, next) =>
  lessonController.getById(req, res, next)
);

// GET /api/lessons/:id/exercises - Get exercises for a lesson
router.get('/:id/exercises', authenticate, (req, res, next) =>
  lessonController.getExercises(req, res, next)
);

export default router;