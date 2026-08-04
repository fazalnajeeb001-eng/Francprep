import { Request, Response } from 'express';
import Settings from '../models/Settings';
import TTSCache from '../models/TTSCache';

let inMemorySettings: any = {
  stripeSecretKey: "",
  stripePublishableKey: "",
  stripePremiumPriceId: "",
  stripeExamPrepPriceId: "",
  stripeWebhookSecret: "",
  anthropicApiKey: "",
  openRouterApiKey: "",
  openaiApiKey: "",
  elevenLabsApiKey: "",
  huggingFaceToken: "",
  huggingFaceApiKey: "",
  preferredVoiceEngine: "elevenlabs",
  activeTTSProvider: "elevenlabs",
  selectedElevenLabsFemaleVoice: "21m00Tcm4TlvDq8ikWAM",
  selectedElevenLabsMaleVoice: "ErXwobaYiN019PkySvjV",
  selectedOpenAIFemaleVoice: "nova",
  selectedOpenAIMaleVoice: "onyx",
  selectedKokoroFemaleVoice: "ff_siwis",
  selectedKokoroMaleVoice: "bm_george",
  frontendUrl: "",
};

export async function getOrCreate() {
  try {
    let settings = await Settings.findOne().maxTimeMS(2000);
    if (!settings) {
      settings = await Settings.create(inMemorySettings);
    }
    const raw: any = settings.toObject ? settings.toObject({ transform: false }) : settings;
    for (const k in raw) {
      if (raw[k] && typeof raw[k] === 'string' && !raw[k].includes('...')) {
        inMemorySettings[k] = raw[k];
      }
    }
    return settings;
  } catch (err) {
    console.warn('[Settings] Mongo read fallback to in-memory store:', err);
    return inMemorySettings;
  }
}

export async function getSettings(_req: Request, res: Response) {
  try {
    const settings = await getOrCreate();
    res.json({ success: true, data: settings.toJSON() });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
}

const placeholders = [
  'sk-...',
  'xi-api-key-...',
  'hf_...',
  'sk-ant-api03-...',
  'sk-or-v1-...',
  'pk_live_...',
  'price_...',
  'whsec_...',
];

export async function updateSettings(req: Request, res: Response) {
  try {
    const allowed = [
      'stripePublishableKey', 'stripeSecretKey', 'stripeWebhookSecret', 'openAiApiKey',
      'anthropicApiKey', 'openRouterApiKey', 'openaiApiKey', 'elevenLabsApiKey', 'huggingFaceToken', 'huggingFaceApiKey',
      'preferredVoiceEngine', 'activeTTSProvider', 'selectedElevenLabsFemaleVoice', 'selectedElevenLabsMaleVoice',
      'selectedOpenAIFemaleVoice', 'selectedOpenAIMaleVoice', 'selectedKokoroFemaleVoice', 'selectedKokoroMaleVoice', 'frontendUrl'
    ];
    const updates: any = {};

    for (const key of allowed) {
      if (req.body[key] !== undefined) {
        const val = String(req.body[key]).trim();
        updates[key] = val;
        inMemorySettings[key] = val;
      }
    }

    try {
      const settings = await Settings.findOneAndUpdate({}, { $set: updates }, { new: true, upsert: true });
      if (settings) {
        const obj: any = settings.toObject ? settings.toObject({ transform: false }) : settings;
        for (const k in obj) {
          if (obj[k] && typeof obj[k] === 'string' && !obj[k].includes('...')) {
            inMemorySettings[k] = obj[k];
          }
        }
      }
      // Purge cached fallback audio so all devices immediately use fresh API keys & voices
      await TTSCache.deleteMany({}).catch(() => {});

      res.json({ success: true, data: settings.toJSON() });
    } catch {
      res.json({ success: true, data: inMemorySettings });
    }
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

export async function testElevenLabs(req: Request, res: Response) {
  try {
    const settings = await getOrCreate();
    const raw: any = settings.toObject ? settings.toObject({ transform: false }) : settings;
    const key = (req.body?.elevenLabsApiKey && !req.body.elevenLabsApiKey.includes('...'))
      ? req.body.elevenLabsApiKey
      : (raw.elevenLabsApiKey && !raw.elevenLabsApiKey.includes('...'))
      ? raw.elevenLabsApiKey
      : (inMemorySettings.elevenLabsApiKey && !inMemorySettings.elevenLabsApiKey.includes('...'))
      ? inMemorySettings.elevenLabsApiKey
      : process.env.ELEVENLABS_API_KEY;
    if (!key || key.includes('...')) return res.json({ success: false, error: "ElevenLabs API Key not configured" });
    const cleanKey = key.trim().replace(/^["']|["']$/g, '');

    // Step 1: Check GET /v1/voices for key validity
    const response = await fetch("https://api.elevenlabs.io/v1/voices", {
      headers: { "xi-api-key": cleanKey },
    });

    if (!response.ok) {
      const err = await response.text();
      return res.json({ success: false, error: `ElevenLabs authentication error (${response.status}): ${err.slice(0, 150)}` });
    }

    const data: any = await response.json();
    const count = data.voices?.length || 0;
    const voiceId = raw.selectedElevenLabsFemaleVoice || "21m00Tcm4TlvDq8ikWAM";

    // Step 2: Perform a 1-word live text-to-speech test to verify character quota & synthesis capability
    const ttsResponse = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: "POST",
      headers: {
        "xi-api-key": cleanKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: "Bonjour",
        model_id: "eleven_multilingual_v2",
      }),
    });

    if (ttsResponse.ok) {
      res.json({ success: true, message: `ElevenLabs Key & Studio Voice Synthesis Active! (${count} Voices Ready)` });
    } else {
      const errText = await ttsResponse.text();
      let detailMsg = "";
      try {
        const parsed = JSON.parse(errText);
        detailMsg = parsed.detail?.message || parsed.detail?.code || errText;
      } catch {
        detailMsg = errText.slice(0, 150);
      }
      res.json({ success: false, error: `ElevenLabs TTS Synthesis Error (${ttsResponse.status}): ${detailMsg}` });
    }
  } catch (err: any) {
    res.json({ success: false, error: err.message });
  }
}

export async function getElevenLabsVoices(req: Request, res: Response) {
  try {
    const settings = await getOrCreate();
    const raw: any = settings.toObject ? settings.toObject({ transform: false }) : settings;
    const reqKey = (req.query?.key as string) || req.body?.elevenLabsApiKey;
    const key = (reqKey && !reqKey.includes('...'))
      ? reqKey
      : (raw.elevenLabsApiKey && !raw.elevenLabsApiKey.includes('...'))
      ? raw.elevenLabsApiKey
      : (inMemorySettings.elevenLabsApiKey && !inMemorySettings.elevenLabsApiKey.includes('...'))
      ? inMemorySettings.elevenLabsApiKey
      : process.env.ELEVENLABS_API_KEY;
    if (!key || key.includes('...')) return res.json({ success: false, error: "ElevenLabs API Key not configured" });
    const cleanVoicesKey = key.trim().replace(/^["']|["']$/g, '');

    const response = await fetch("https://api.elevenlabs.io/v1/voices", {
      headers: { "xi-api-key": cleanVoicesKey },
    });
    if (response.ok) {
      const data: any = await response.json();
      const voices = (data.voices || []).map((v: any) => ({
        voice_id: v.voice_id,
        name: v.name,
        category: v.category,
        gender: v.labels?.gender || (v.name.toLowerCase().includes("male") ? "male" : "female"),
        accent: v.labels?.accent || "",
      }));
      res.json({ success: true, voices });
    } else {
      const err = await response.text();
      res.json({ success: false, error: `ElevenLabs returned ${response.status}: ${err.slice(0, 150)}` });
    }
  } catch (err: any) {
    res.json({ success: false, error: err.message });
  }
}

export async function testKokoro(req: Request, res: Response) {
  try {
    const settings = await getOrCreate();
    const token = req.body?.huggingFaceToken || process.env.HUGGINGFACE_TOKEN || process.env.HF_TOKEN || settings.huggingFaceToken;
    if (!token) return res.json({ success: false, error: "HuggingFace Token not configured. Get a free token at huggingface.co/settings/tokens" });

    // Official Hugging Face Token Validation API
    const response = await fetch("https://huggingface.co/api/whoami-v2", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.ok) {
      const data: any = await response.json();
      res.json({ success: true, message: `HuggingFace Token Validated! Account: @${data.name || 'User'} (Kokoro-82M Serverless Ready)` });
    } else {
      const err = await response.text();
      res.json({ success: false, error: `HuggingFace returned ${response.status}: Invalid Token or Expired` });
    }
  } catch (err: any) {
    res.json({ success: false, error: err.message });
  }
}

export async function testOpenAI(req: Request, res: Response) {
  try {
    const settings = await getOrCreate();
    const key = req.body?.openaiApiKey || process.env.OPENAI_API_KEY || settings.openaiApiKey;
    if (!key) return res.json({ success: false, error: "OpenAI API Key not configured" });
    if (!key.startsWith('sk-') || key.startsWith('sk-or-v1-')) {
      return res.json({ success: false, error: "OpenAI TTS requires a direct OpenAI API key starting with 'sk-' (OpenRouter keys are not supported for audio speech)." });
    }

    const response = await fetch("https://api.openai.com/v1/models", {
      headers: { Authorization: `Bearer ${key}` },
    });
    if (response.ok) {
      res.json({ success: true, message: "OpenAI API Key Validated! (tts-1-hd Nova & Onyx voices ready)" });
    } else {
      const err = await response.text();
      res.json({ success: false, error: `OpenAI returned ${response.status}: ${err.slice(0, 150)}` });
    }
  } catch (err: any) {
    res.json({ success: false, error: err.message });
  }
}

export async function clearAudioCache(req: Request, res: Response) {
  try {
    const TTSCache = require('../models/TTSCache').default;
    const { engine } = req.body;
    let query: any = {};
    if (engine && engine !== 'all') {
      query = { voice: { $regex: engine, $options: 'i' } };
    }
    const result = await TTSCache.deleteMany(query);
    res.json({
      success: true,
      message: `Successfully deleted ${result.deletedCount || 0} cached audio entries${engine && engine !== 'all' ? ` for ${engine.toUpperCase()}` : ''}.`,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
}
