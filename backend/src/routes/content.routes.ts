import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth';
import * as contentController from '../controllers/content.controller';

const router = Router();

// Utilities
router.get('/vocabulary', authenticate, authorize('admin'), contentController.getExistingVocabulary);

export default router;
