import { Router } from 'express';
import { writingController } from '../controllers/writing.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

// POST /api/writing/feedback - Submit writing for AI feedback
router.post('/feedback', authenticate, (req, res, next) =>
  writingController.submit(req, res, next)
);

// POST /api/writing/grammar-check - Check grammar drill answer with AI
router.post('/grammar-check', authenticate, (req, res, next) =>
  writingController.grammarCheck(req, res, next)
);

// POST /api/writing/speaking-analysis - Analyze speaking transcription
router.post('/speaking-analysis', authenticate, (req, res, next) =>
  writingController.analyzeSpeaking(req, res, next)
);

// POST /api/writing/speaking-chat - Conversational tutor chat
router.post('/speaking-chat', authenticate, (req, res, next) =>
  writingController.speakingChat(req, res, next)
);

export default router;
