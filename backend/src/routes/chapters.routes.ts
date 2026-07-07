import { Router } from 'express';
import { authenticate, optionalAuth } from '../middleware/auth';
import { chapterController } from '../controllers/chapter.controller';

const router = Router();

// Student routes
router.get('/:id', optionalAuth, (req, res, next) => chapterController.getById(req, res, next));
router.get('/:id/lessons', optionalAuth, (req, res, next) => chapterController.getLessons(req, res, next));
router.get('/:id/vocabulary', optionalAuth, (req, res, next) => chapterController.getVocabulary(req, res, next));
router.get('/:id/exercises', optionalAuth, (req, res, next) => chapterController.getExercises(req, res, next));

export default router;