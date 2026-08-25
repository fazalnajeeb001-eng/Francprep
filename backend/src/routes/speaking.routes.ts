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
  taskTitle?: string;
  scenarioText?: string;
  examinerName?: string;
  examinerRole?: string;
  lessonLevel?: string;
  lessonTopic?: string;
}

function buildExaminerSystemPrompt(
  taskTitle?: string,
  scenarioText?: string,
  examinerName?: string,
  examinerRole?: string,
  lessonLevel?: string,
  lessonTopic?: string
): string {
  const name = examinerName || "Examiner Élodie";
  const role = examinerRole || "Examinatrice certifiée FEI — Format TCF Canada";
  const title = taskTitle || "Tâche 1";
  const scenario = scenarioText || lessonTopic || "Épreuve d'expression orale TCF Canada";
  const level = lessonLevel || "B2";

  const isTache1 = /Tâche 1|entretien dirigé/i.test(title);
  const isTache2 = /Tâche 2|interaction|exercice en interaction/i.test(title);
  const isTache3 = /Tâche 3|point de vue|débat/i.test(title);

  let taskRules = "";
  if (isTache1) {
    taskRules = `
- THIS IS TÂCHE 1 (Entretien dirigé - 2 minutes).
- You are an official FEI TCF Canada examiner named ${name} (${role}).
- Conduct a formal, progressive guided interview (target CEFR level: ${level}).
- Ask 1 relevant follow-up question based on the candidate's previous response to keep the conversation flowing naturally.
- Maintain formal register ("vous"). Keep your response concise (1-3 sentences maximum).
`;
  } else if (isTache2) {
    taskRules = `
- THIS IS TÂCHE 2 (Exercice en interaction - 3.5 minutes).
- You are the roleplay partner described in the scenario: ${role}.
- Answer the candidate's questions concisely (1-2 sentences) in realistic French.
- CRITICAL MANDATORY RULE: YOU MUST STRICTLY END EVERY SINGLE RESPONSE WITH THE EXACT QUESTION: "Avez-vous d'autres questions ?"
- Example: "Oui, nous proposons une formule famille avec 15 % de réduction. Avez-vous d'autres questions ?"
`;
  } else if (isTache3) {
    taskRules = `
- THIS IS TÂCHE 3 (Expression d'un point de vue & Débat - 4.5 minutes).
- You are an official FEI TCF Canada examiner named ${name} (${role}).
- Listen to the candidate's thesis presentation and politely introduce a C1/C2 counter-argument or nuance to test their argumentation skills.
- Start politely with: "Je comprends votre point de vue, mais..." or "C'est une perspective intéressante, cependant ne pensez-vous pas que...".
- Keep your counter-argument concise (2-3 sentences).
`;
  } else {
    taskRules = `
- You are an official FEI TCF Canada examiner named ${name} (${role}).
- Target level: ${level}. Scenario: ${scenario}.
- Respond naturally, professionally, and concisely in immaculate French (1-3 sentences).
`;
  }

  return `You are an official France Éducation International (FEI) TCF Canada oral examiner named ${name}.

SCENARIO CONTEXT: ${scenario}

EXAMINER PROTOCOL RULES:
${taskRules}
- Respond ONLY in spoken French. Do NOT output translations or FR/EN prefixes.
- Maintain a polite, professional, and encouraging test center atmosphere.
- If the candidate submits silence, gibberish, or off-topic input, politely remind them in 1 sentence: "Veuillez répondre en français à la question posée pour cette épreuve."
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

    const { messages, taskTitle, scenarioText, examinerName, examinerRole, lessonLevel, lessonTopic } = req.body as ChatRequestBody;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      res.status(400).json({
        success: false,
        error: 'Messages array is required.',
      });
      return;
    }

    const systemPrompt = buildExaminerSystemPrompt(
      taskTitle,
      scenarioText,
      examinerName,
      examinerRole,
      lessonLevel,
      lessonTopic
    );

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
        'X-Title': 'FrancPrep Official TCF Examiner',
      },
      body: JSON.stringify({
        model: 'openai/gpt-4o-mini',
        messages: apiMessages,
        temperature: 0.7,
        max_tokens: 220,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenRouter speaking chat error:', response.status, errorText);
      let msg = 'Unable to get examiner response.';
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
    console.error('Speaking examiner chat error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get examiner response. Please try again.',
    });
  }
});

export default router;
