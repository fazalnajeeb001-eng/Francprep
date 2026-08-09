import { Router } from 'express';
import authRoutes from './auth.routes';
import lessonRoutes from './lessons.routes';
import exerciseRoutes from './exercises.routes';
import progressRoutes from './progress.routes';
import chapterRoutes from './chapters.routes';
import adminRoutes from './admin.routes';
import dashboardRoutes from './dashboard.routes';
import writingRoutes from './writing.routes';
import userRoutes from './user.routes';
import widgetsRoutes from './widgets.routes';
import flashcardRoutes from './flashcards.routes';
import paymentRoutes from './payment.routes';
import contentRoutes from './content.routes';
import announcementRoutes from './announcement.routes';
import settingsRoutes from './settings.routes';
import speakingRoutes from './speaking.routes';
import ttsRoutes from './tts.routes';
import podsRoutes from './pods.routes';
import languageRoutes from './language.routes';

import { SystemSettings } from '../models/SystemSettings';

const SERVER_BUILD_TIME = new Date().toISOString();

const router = Router();
router.get('/health', (_req, res) => {
  res.status(200).json({ success: true, version: '1.0.v99', buildTime: SERVER_BUILD_TIME, message: 'FrancPrep API is running', timestamp: new Date().toISOString() });
});

router.get('/version', (_req, res) => {
  res.status(200).json({ success: true, version: '1.0.v99', buildTime: SERVER_BUILD_TIME });
});

router.get('/subscriptions/plans', async (_req, res) => {
  try {
    let settings = await SystemSettings.findOne();
    if (!settings) {
      settings = await SystemSettings.create({});
    }
    const activePlans = (settings.customPricingPlans || []).filter((p) => p.isActive);
    res.json({
      success: true,
      data: {
        plans: activePlans,
        freePreviewScope: settings.freePreviewScope || 'first_chapter_a1',
        paywallEnforced: settings.paywallEnforced !== false,
        isSocialHubEnabled: settings.isSocialHubEnabled === true,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to load subscription plans' });
  }
});

router.use('/auth', authRoutes);
router.use('/lessons', lessonRoutes);
router.use('/chapters', chapterRoutes);
router.use('/exercises', exerciseRoutes);
router.use('/progress', progressRoutes);
router.use('/admin', adminRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/writing', writingRoutes);
router.use('/user', userRoutes);
router.use('/users', userRoutes);
router.use('/widgets', widgetsRoutes);
router.use('/flashcards', flashcardRoutes);
router.use('/payments', paymentRoutes);
router.use('/content', contentRoutes);
router.use('/announcements', announcementRoutes);
router.use('/settings', settingsRoutes);
router.use('/speaking', speakingRoutes);
router.use('/tts', ttsRoutes);
router.use('/pods', podsRoutes);
router.use('/languages', languageRoutes);
export default router;
