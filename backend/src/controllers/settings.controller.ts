import { Request, Response } from 'express';
import Settings from '../models/Settings';

async function getOrCreate() {
  let settings = await Settings.findOne();
  if (!settings) settings = await Settings.create({});
  return settings;
}

export async function getSettings(_req: Request, res: Response) {
  try {
    const settings = await getOrCreate();
    res.json({ success: true, data: settings.toJSON() });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
}

export async function updateSettings(req: Request, res: Response) {
  try {
    const allowed = ['stripeSecretKey', 'stripePublishableKey', 'stripePremiumPriceId', 'stripeExamPrepPriceId', 'stripeWebhookSecret', 'anthropicApiKey', 'openRouterApiKey', 'frontendUrl'];
    const updates: any = {};
    for (const key of allowed) {
      if (req.body[key] !== undefined) updates[key] = req.body[key];
    }

    const settings = await Settings.findOneAndUpdate({}, { $set: updates }, { new: true, upsert: true });
    res.json({ success: true, data: settings.toJSON() });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
}

export async function testStripe(_req: Request, res: Response) {
  try {
    const settings = await getOrCreate();
    if (!settings.stripeSecretKey) {
      return res.json({ success: false, error: "Stripe secret key not configured" });
    }
    const stripe = require('stripe')(settings.stripeSecretKey);
    const balance = await stripe.balance.retrieve();
    res.json({ success: true, data: { available: balance.available?.[0]?.amount || 0, currency: balance.available?.[0]?.currency || 'usd' } });
  } catch (err: any) {
    res.json({ success: false, error: err.message });
  }
}

export async function testAnthropic(_req: Request, res: Response) {
  try {
    const settings = await getOrCreate();
    if (!settings.anthropicApiKey) {
      return res.json({ success: false, error: "Anthropic API key not configured" });
    }
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": settings.anthropicApiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 50,
        messages: [{ role: "user", content: "Say 'API connection successful' in exactly 3 words." }],
      }),
    });
    if (response.ok) {
      const data: any = await response.json();
      res.json({ success: true, data: { response: data.content?.[0]?.text || "OK" } });
    } else {
      const err = await response.text();
      res.json({ success: false, error: `API returned ${response.status}: ${err.slice(0, 200)}` });
    }
  } catch (err: any) {
    res.json({ success: false, error: err.message });
  }
}

export async function testOpenRouter(_req: Request, res: Response) {
  try {
    const settings = await getOrCreate();
    const apiKey = settings.openRouterApiKey || process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return res.json({ success: false, error: "OpenRouter API key not configured" });
    }
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "google/gemini-flash-1.5-8b",
        messages: [{ role: "user", content: "Say 'OpenRouter connection successful' in exactly 3 words." }],
        max_tokens: 20,
      }),
    });
    if (response.ok) {
      const data: any = await response.json();
      res.json({ success: true, data: { response: data.choices?.[0]?.message?.content || "OK" } });
    } else {
      const err = await response.text();
      res.json({ success: false, error: `OpenRouter returned ${response.status}: ${err.slice(0, 200)}` });
    }
  } catch (err: any) {
    res.json({ success: false, error: err.message });
  }
}

export async function getStripeKeys(_req: Request, res: Response) {
  try {
    const settings = await getOrCreate();
    res.json({
      success: true,
      data: {
        publishableKey: settings.stripePublishableKey || "",
        hasSecretKey: !!settings.stripeSecretKey,
        hasWebhookSecret: !!settings.stripeWebhookSecret,
      },
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
}
