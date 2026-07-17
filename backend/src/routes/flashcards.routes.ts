import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import * as flashcardController from '../controllers/flashcard.controller';

const router = Router();

router.get('/due', authenticate, flashcardController.getDueCards);
router.get('/progress', authenticate, flashcardController.getAllProgress);
router.get('/stats', authenticate, flashcardController.getStats);
router.post('/review', authenticate, flashcardController.reviewCards);

export default router;
