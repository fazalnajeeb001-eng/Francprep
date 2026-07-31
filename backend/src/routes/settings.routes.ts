import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth';
import * as settingsController from '../controllers/settings.controller';

const router = Router();

router.get('/', settingsController.getSettings);
router.put('/', settingsController.updateSettings);
router.post('/test-stripe', settingsController.testStripe);
router.post('/test-anthropic', settingsController.testAnthropic);
router.post('/test-openrouter', settingsController.testOpenRouter);
router.post('/test-elevenlabs', settingsController.testElevenLabs);
router.post('/test-kokoro', settingsController.testKokoro);
router.post('/test-openai', settingsController.testOpenAI);
router.get('/stripe-keys', settingsController.getStripeKeys);
router.post('/clear-audio-cache', settingsController.clearAudioCache);

export default router;
