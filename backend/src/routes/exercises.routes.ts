import { Router } from 'express';
import { exerciseController } from '../controllers/exercise.controller';
import { authenticate } from '../middleware/auth';
import { validate } from '../middleware/validation';
import { submitExerciseSchema } from '../utils/validators';

const router = Router();

// GET /api/exercises/:id - Get exercise by ID (public read)
router.get('/:id', authenticate, (req, res, next) =>
  exerciseController.getById(req, res, next)
);

// POST /api/exercises/:id/submit - Submit exercise answers (requires auth)
router.post('/:id/submit', authenticate, validate(submitExerciseSchema), (req, res, next) =>
  exerciseController.submit(req, res, next)
);

export default router;