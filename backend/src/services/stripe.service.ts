import Stripe from 'stripe';
import User from '../models/User';
import Subscription from '../models/Subscription';
import Settings from '../models/Settings';

let _stripe: Stripe | null = null;

async function getStripe(): Promise<Stripe> {
  if (_stripe) return _stripe;
  const settings = await Settings.findOne();
  const key = settings?.stripeSecretKey || process.env.STRIPE_SECRET_KEY || '';
  _stripe = new Stripe(key, { apiVersion: '2024-06-20' as Stripe.LatestApiVersion });
  return _stripe;
}

async function getStripeKey() {
  const settings = await Settings.findOne();
  return settings?.stripeSecretKey || process.env.STRIPE_SECRET_KEY || '';
}

export async function getPlans() {
  const settings = await Settings.findOne();
  return {
    free: { name: 'Free', price: 0, features: ['4 lessons', 'Basic flashcards', 'Daily challenge'] },
    premium: {
      name: 'Premium', price: 14.99,
      stripePriceId: settings?.stripePremiumPriceId || process.env.STRIPE_PREMIUM_PRICE_ID || '',
      features: ['All lessons', 'Spaced repetition', 'Speaking practice', 'Writing feedback', 'No ads'],
    },
    exam_prep: {
      name: 'Exam Prep', price: 24.99,
      stripePriceId: settings?.stripeExamPrepPriceId || process.env.STRIPE_EXAM_PREP_PRICE_ID || '',
      features: ['Everything in Premium', 'Mock exams', 'TCF/TEF practice', 'Priority support', 'Study plan'],
    },
  };
}

export async function getOrCreateCustomer(userId: string, email: string) {
  const stripe = await getStripe();
  const sub = await Subscription.findOne({ userId });
  if (sub?.stripeCustomerId) return sub.stripeCustomerId;

  const customer = await stripe.customers.create({ email, metadata: { userId } });
  await Subscription.create({
    userId,
    stripeCustomerId: customer.id,
    tier: 'free',
    status: 'active',
  });
  return customer.id;
}

export async function createCheckoutSession(userId: string, email: string, tier: 'premium' | 'exam_prep') {
  const stripe = await getStripe();
  const plans = await getPlans();
  const plan = plans[tier];
  if (!plan.stripePriceId) throw new Error('Stripe price ID not configured in Settings');

  const customerId = await getOrCreateCustomer(userId, email);
  const settings = await Settings.findOne();
  const frontendUrl = settings?.frontendUrl || process.env.FRONTEND_URL || 'https://francprep.com';

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [{ price: plan.stripePriceId, quantity: 1 }],
    success_url: `${frontendUrl}/dashboard/settings?upgraded=true`,
    cancel_url: `${frontendUrl}/dashboard/settings?canceled=true`,
    metadata: { userId, tier },
  });

  return { sessionId: session.id, url: session.url };
}

export async function createPortalSession(userId: string) {
  const stripe = await getStripe();
  const sub = await Subscription.findOne({ userId });
  if (!sub?.stripeCustomerId) throw new Error('No Stripe customer found');

  const settings = await Settings.findOne();
  const frontendUrl = settings?.frontendUrl || process.env.FRONTEND_URL || 'https://francprep.com';

  const session = await stripe.billingPortal.sessions.create({
    customer: sub.stripeCustomerId,
    return_url: `${frontendUrl}/dashboard/settings`,
  });

  return { url: session.url };
}

export async function handleWebhook(event: Stripe.Event) {
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      const { userId, tier } = session.metadata || {};
      if (!userId || !tier) break;

      const stripe = await getStripe();
      const subscription = await stripe.subscriptions.retrieve(session.subscription as string);

      await Subscription.findOneAndUpdate(
        { userId },
        {
          stripeSubscriptionId: subscription.id,
          stripePriceId: subscription.items.data[0]?.price.id,
          tier: tier as string,
          status: subscription.status,
          currentPeriodStart: new Date(subscription.current_period_start * 1000),
          currentPeriodEnd: new Date(subscription.current_period_end * 1000),
          cancelAtPeriodEnd: subscription.cancel_at_period_end,
        },
        { upsert: true }
      );

      await User.findByIdAndUpdate(userId, { subscriptionTier: tier });
      break;
    }

    case 'customer.subscription.updated': {
      const subscription = event.data.object as Stripe.Subscription;
      const sub = await Subscription.findOne({ stripeSubscriptionId: subscription.id });
      if (!sub) break;

      sub.status = subscription.status as any;
      sub.currentPeriodStart = new Date(subscription.current_period_start * 1000);
      sub.currentPeriodEnd = new Date(subscription.current_period_end * 1000);
      sub.cancelAtPeriodEnd = subscription.cancel_at_period_end;

      if (subscription.status === 'canceled' || subscription.status === 'unpaid') {
        sub.tier = 'free';
        await User.findByIdAndUpdate(sub.userId, { subscriptionTier: 'free' });
      }

      await sub.save();
      break;
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription;
      const sub = await Subscription.findOne({ stripeSubscriptionId: subscription.id });
      if (!sub) break;

      sub.tier = 'free';
      sub.status = 'canceled';
      sub.stripeSubscriptionId = null;
      sub.stripePriceId = null;
      await sub.save();
      await User.findByIdAndUpdate(sub.userId, { subscriptionTier: 'free' });
      break;
    }

    case 'invoice.payment_failed': {
      const invoice = event.data.object as Stripe.Invoice;
      const sub = await Subscription.findOne({ stripeCustomerId: invoice.customer as string });
      if (sub) {
        sub.status = 'past_due';
        await sub.save();
      }
      break;
    }
  }
}

export async function getSubscription(userId: string) {
  const sub = await Subscription.findOne({ userId });
  if (!sub) return { tier: 'free', status: 'active' };
  return {
    tier: sub.tier,
    status: sub.status,
    currentPeriodEnd: sub.currentPeriodEnd,
    cancelAtPeriodEnd: sub.cancelAtPeriodEnd,
  };
}

export function checkAccess(userTier: string, requiredTier: string): boolean {
  const hierarchy = ['free', 'premium', 'exam_prep'];
  return hierarchy.indexOf(userTier) >= hierarchy.indexOf(requiredTier);
}
