import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth';
import * as settingsController from '../controllers/settings.controller';

const router = Router();

router.get('/', authenticate, authorize('admin'), settingsController.getSettings);
router.put('/', authenticate, authorize('admin'), settingsController.updateSettings);
router.post('/test-stripe', authenticate, authorize('admin'), settingsController.testStripe);
router.post('/test-anthropic', authenticate, authorize('admin'), settingsController.testAnthropic);
router.post('/test-openrouter', authenticate, authorize('admin'), settingsController.testOpenRouter);
router.get('/stripe-keys', authenticate, authorize('admin'), settingsController.getStripeKeys);

export default router;
