import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth';
import * as contentController from '../controllers/content.controller';

const router = Router();

// Utilities
router.get('/vocabulary', authenticate, authorize('admin'), contentController.getExistingVocabulary);
router.get('/prompt', authenticate, authorize('admin'), contentController.getPrompt);
router.post('/generate', authenticate, authorize('admin'), contentController.generateContent);
router.post('/validate-json', authenticate, authorize('admin'), contentController.validateJson);
router.post('/import-json', authenticate, authorize('admin'), contentController.importJson);

export default router;
