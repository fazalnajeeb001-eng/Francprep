import { Router, Request, Response } from 'express';
import { env } from '../config/env';
import { authenticate } from '../middleware/auth';

const router = Router();

// Health check for speaking routes
router.get('/health', (_req: Request, res: Response) => {
  res.json({ success: true, message: 'Speaking routes loaded' });
});

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface ChatRequestBody {
  messages: ChatMessage[];
  lessonLevel?: string;
  lessonTopic?: string;
}

function buildSystemPrompt(lessonLevel?: string, lessonTopic?: string): string {
  const level = lessonLevel || 'A1';
  const topic = lessonTopic || 'general conversation';

  return `You are Madame Sophie, a warm, encouraging, and patient French conversation tutor for FrancPrep.

CRITICAL RULES:
- Always respond in FRENCH first (1-2 short sentences), then optionally provide an English translation in parentheses if the student seems confused.
- If the student writes in English, gently redirect them to respond in French, but still help them.
- If the student is struggling (short responses, errors, writing in English), respond in English with encouragement and give them the French phrase to practice, then ask them to try again.
- Keep responses SHORT (1-3 sentences max). This is a speaking drill, not a novel.
- Ask follow-up questions to keep the conversation going.
- Be warm and encouraging. Use "Bravo!", "Très bien!", "Excellent!" when they do well.
- Gently correct mistakes by rephrasing correctly.
- Adapt to their level: A1-A2 use simple present tense and basic vocabulary, B1-B2 use more complex structures, C1-C2 use idiomatic expressions.

CONTEXT:
- Student level: ${level}
- Lesson topic: ${topic}

Example conversation flow:
Tutor: "Bonjour ! Comment tu t'appelles ?"
Student: "Je m'appelle Marie."
Tutor: "Enchantée, Marie ! Tu es d'où ?"`;
}

router.post('/chat', authenticate, async (req: Request, res: Response) => {
  try {
    const apiKey = env.openRouterKey;
    if (!apiKey) {
      res.status(500).json({
        success: false,
        error: 'AI service not configured. Please set OPENROUTER_API_KEY.',
      });
      return;
    }

    const { messages, lessonLevel, lessonTopic } = req.body as ChatRequestBody;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      res.status(400).json({
        success: false,
        error: 'Messages array is required.',
      });
      return;
    }

    const systemPrompt = buildSystemPrompt(lessonLevel, lessonTopic);

    const apiMessages: ChatMessage[] = [
      { role: 'system', content: systemPrompt },
      ...messages,
    ];

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': env.frontendUrl,
        'X-Title': 'FrancPrep Speaking Tutor',
      },
      body: JSON.stringify({
        model: 'openai/gpt-4o-mini',
        messages: apiMessages,
        temperature: 0.7,
        max_tokens: 200,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenRouter speaking chat error:', response.status, errorText);
      let msg = 'Unable to get tutor response.';
      try {
        const err = JSON.parse(errorText);
        if (err.error?.message) msg += ' ' + err.error.message;
      } catch {}
      res.status(502).json({ success: false, error: msg });
      return;
    }

    const data = await response.json() as any;
    const content = data.choices?.[0]?.message?.content || '';

    res.json({
      success: true,
      data: {
        reply: content,
        model: 'openai/gpt-4o-mini',
      },
    });
  } catch (error) {
    console.error('Speaking chat error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get tutor response. Please try again.',
    });
  }
});

export default router;
