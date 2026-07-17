import { Router } from 'express';
import express from 'express';
import { authenticate, authorize } from '../middleware/auth';
import * as paymentController from '../controllers/payment.controller';

const router = Router();

// Webhook needs raw body, not JSON parsed
router.post('/webhook', express.raw({ type: 'application/json' }), paymentController.webhook);

router.get('/plans', paymentController.getPlans);
router.post('/checkout', authenticate, paymentController.createCheckout);
router.post('/portal', authenticate, paymentController.createPortal);
router.get('/subscription', authenticate, paymentController.getSubscription);

// Admin endpoints
router.get('/admin/subscriptions', authenticate, authorize('admin'), paymentController.adminGetAllSubscriptions);
router.get('/admin/analytics', authenticate, authorize('admin'), paymentController.adminGetAnalytics);

export default router;
