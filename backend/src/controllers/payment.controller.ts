import { Request, Response } from 'express';
import Stripe from 'stripe';
import * as stripeService from '../services/stripe.service';
import User from '../models/User';
import Subscription from '../models/Subscription';
import Settings from '../models/Settings';

export async function getPlans(_req: Request, res: Response) {
  const plans = await stripeService.getPlans();
  res.json({ success: true, data: plans });
}

export async function createCheckout(req: Request, res: Response) {
  try {
    const userId = (req as any).userId;
    const { tier } = req.body;
    if (tier !== 'premium' && tier !== 'exam_prep') {
      return res.status(400).json({ success: false, error: 'Invalid tier' });
    }
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, error: 'User not found' });

    const result = await stripeService.createCheckoutSession(userId, user.email, tier);
    res.json({ success: true, data: result });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
}

export async function createPortal(req: Request, res: Response) {
  try {
    const userId = (req as any).userId;
    const result = await stripeService.createPortalSession(userId);
    res.json({ success: true, data: result });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
}

export async function getSubscription(req: Request, res: Response) {
  try {
    const userId = (req as any).userId;
    const sub = await stripeService.getSubscription(userId);
    res.json({ success: true, data: sub });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
}

export async function webhook(req: Request, res: Response) {
  try {
    const sig = req.headers['stripe-signature'] as string;
    const settings = await Settings.findOne();
    const webhookSecret = settings?.stripeWebhookSecret || process.env.STRIPE_WEBHOOK_SECRET || '';
    const event = (Stripe as any).Webhooks.constructEvent(req.body, sig, webhookSecret);
    await stripeService.handleWebhook(event);
    res.json({ received: true });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export async function adminGetAllSubscriptions(req: Request, res: Response) {
  try {
    const { page = 1, limit = 20, tier, status } = req.query;
    const filter: any = {};
    if (tier) filter.tier = tier;
    if (status) filter.status = status;

    const [subscriptions, total] = await Promise.all([
      Subscription.find(filter)
        .populate('userId', 'firstName lastName email')
        .sort({ createdAt: -1 })
        .skip((Number(page) - 1) * Number(limit))
        .limit(Number(limit))
        .lean(),
      Subscription.countDocuments(filter),
    ]);

    const tierCounts = await Subscription.aggregate([
      { $group: { _id: '$tier', count: { $sum: 1 } } },
    ]);

    res.json({
      success: true,
      data: {
        subscriptions,
        tierCounts: tierCounts.reduce((acc: any, t: any) => { acc[t._id] = t.count; return acc; }, {}),
        pagination: { page: Number(page), limit: Number(limit), total, pages: Math.ceil(total / Number(limit)) },
      },
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
}

export async function adminGetAnalytics(_req: Request, res: Response) {
  try {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const [totalUsers, newUsers30d, newUsers7d, tierCounts, statusCounts] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ createdAt: { $gte: thirtyDaysAgo } }),
      User.countDocuments({ createdAt: { $gte: sevenDaysAgo } }),
      Subscription.aggregate([{ $group: { _id: '$tier', count: { $sum: 1 } } }]),
      Subscription.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
    ]);

    const dailySignups = await User.aggregate([
      { $match: { createdAt: { $gte: thirtyDaysAgo } } },
      { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }, count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);

    res.json({
      success: true,
      data: {
        totalUsers,
        newUsers30d,
        newUsers7d,
        tierCounts: tierCounts.reduce((acc: any, t: any) => { acc[t._id] = t.count; return acc; }, {}),
        statusCounts: statusCounts.reduce((acc: any, s: any) => { acc[s._id] = s.count; return acc; }, {}),
        dailySignups,
      },
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
}
