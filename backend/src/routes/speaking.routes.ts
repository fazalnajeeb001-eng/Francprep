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

  return `You are Madame Sophie, a warm, encouraging, native French conversation coach for FrancPrep.

CRITICAL VOICE & RESPONSE FORMAT RULES:
- You speak immaculate, natural, native Parisian French with perfect grammar and authentic conversational phrasing.
- ALWAYS structure your response strictly into two lines:
  FR: [Your French sentence here in 100% natural, native French]
  EN: ([Your English translation here])
- Keep the French response concise (1-2 clear, natural sentences).
- If the student makes a grammatical error or speaks in English, gently rephrase their intent into natural French in your FR line, and provide encouragement in the EN line.
- Always encourage the student ("Très bien !", "Magnifique !", "Bravo !") and ask a direct, friendly follow-up question to prompt their next spoken response.
- Target level: ${level} (use simple present and clear vocabulary for A1/A2, and natural native sentence flow throughout).
- Lesson activity context: ${topic}
`;
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
