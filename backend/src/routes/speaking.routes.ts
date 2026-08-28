import { Router, Request, Response } from 'express';
import { env } from '../config/env';
import { optionalAuth } from '../middleware/auth';
import Settings from '../models/Settings';
import { generateNeuralAudio } from '../services/tts.service';
import { getSpeakingIntroAudioBase64 } from '../data/speakingIntroAudioBank';

const router = Router();

// Health check for speaking routes
router.get('/health', (_req: Request, res: Response) => {
  res.json({ success: true, message: 'Speaking 2-Way AI Examiner routes active' });
});

// Direct Base64 intro audio route for instant task preamble playback
router.get('/intro-audio', async (req: Request, res: Response) => {
  try {
    const taskIdx = parseInt(req.query.taskIdx as string || '0', 10) || 0;
    const gender = (req.query.gender as string || 'female') === 'male' ? 'male' : 'female';
    const audioBase64 = await getSpeakingIntroAudioBase64(taskIdx, gender);
    res.json({
      success: true,
      audioBase64,
      contentType: 'audio/mp3',
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err?.message });
  }
});

// Direct MP3 Stream Endpoint for 100% Unified Neural Edge TTS (DeniseNeural / HenriNeural)
router.get('/stream', async (req: Request, res: Response) => {
  try {
    const text = (req.query.text as string || '').trim();
    const gender = (req.query.gender as string || 'female') === 'male' ? 'male' : 'female';

    if (!text) {
      res.status(400).send('Text parameter is required.');
      return;
    }

    const edgeRes = await generateEdgeNeuralAudio(text, gender, 'fr', 1.0);
    if (edgeRes && edgeRes.audioBase64) {
      const buffer = Buffer.from(edgeRes.audioBase64, 'base64');
      res.setHeader('Content-Type', 'audio/mpeg');
      res.setHeader('Content-Length', buffer.length.toString());
      res.setHeader('Cache-Control', 'public, max-age=86400');
      res.send(buffer);
      return;
    }

    res.status(500).send('TTS synthesis returned empty buffer.');
  } catch (err: any) {
    res.status(500).send(err?.message || 'Error generating TTS stream.');
  }
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
  examinerVoice?: string;
  gender?: 'female' | 'male';
  lessonLevel?: string;
  lessonTopic?: string;
}

async function getOpenRouterApiKey(): Promise<string> {
  try {
    const settings = await Settings.findOne();
    if (settings?.openRouterApiKey) return settings.openRouterApiKey;
  } catch (e) {
    console.warn('[Speaking Routes] Could not read Settings model:', e);
  }
  return env.openRouterKey || process.env.OPENROUTER_API_KEY || '';
}

function buildExaminerSystemPrompt(
  taskTitle?: string,
  scenarioText?: string,
  examinerName?: string,
  examinerRole?: string,
  lessonLevel?: string,
  lessonTopic?: string
): string {
  const name = examinerName || "Examinateur Henri";
  const role = examinerRole || "Examinateur certifié FEI — Format TCF Canada";
  const title = taskTitle || "Tâche 1";
  const scenario = scenarioText || lessonTopic || "Épreuve d'expression orale TCF Canada";
  const level = lessonLevel || "B2";

  const isTache1 = /Tâche 1|entretien dirigé|entretien/i.test(title);
  const isTache2 = /Tâche 2|interaction|exercice en interaction|rôle/i.test(title);
  const isTache3 = /Tâche 3|point de vue|débat|argumentation/i.test(title);

  let taskRules = "";
  if (isTache1) {
    taskRules = `
- THIS IS TÂCHE 1 (Entretien dirigé - 2 minutes).
- You are an official France Éducation International (FEI) TCF Canada oral examiner named ${name} (${role}).
- Conduct a formal, progressive guided interview (target CEFR level: ${level}).
- Listen carefully to the candidate's response, extract key contextual details (e.g. their profession, city, hobbies, or plans), and ask 1 dynamic, natural follow-up question.
- Always use formal register ("vous"). Keep your response concise, polite, and encouraging (1-2 sentences maximum).
`;
  } else if (isTache2) {
    taskRules = `
- THIS IS TÂCHE 2 (Exercice en interaction / Roleplay - 3.5 minutes).
- You are the roleplay partner described in the scenario: ${role}.
- Answer the candidate's specific questions concisely (1-2 sentences) in natural, realistic French.
- STRICT MANDATORY TURN RULE: YOU MUST ALWAYS END EVERY SINGLE RESPONSE WITH THE EXACT QUESTION: "Avez-vous d'autres questions ?"
- Example: "Oui, nous avons deux disponibilités ce samedi après-midi à 14h et 16h. Avez-vous d'autres questions ?"
`;
  } else if (isTache3) {
    taskRules = `
- THIS IS TÂCHE 3 (Expression d'un point de vue & Débat - 4.5 minutes).
- You are an official FEI TCF Canada oral examiner named ${name} (${role}).
- Listen to the candidate's thesis statement and introduce a polite C1/C2 counter-argument or nuance to test their argumentation skills under debate pressure.
- Start politely with: "Je comprends votre point de vue, cependant ne pensez-vous pas que..." or "C'est un argument intéressant, mais...".
- Use formal logical connectors ("néanmoins", "en revanche", "or"). Keep your counter-argument concise (2 sentences maximum).
`;
  } else {
    taskRules = `
- You are an official FEI TCF Canada examiner named ${name} (${role}).
- Target level: ${level}. Scenario: ${scenario}.
- Respond naturally, professionally, and concisely in immaculate French (1-2 sentences).
`;
  }

  return `You are an official France Éducation International (FEI) TCF Canada oral examiner named ${name}.

SCENARIO CONTEXT: ${scenario}

EXAMINER PROTOCOL RULES:
${taskRules}
- Respond ONLY in spoken French. Do NOT output translations, meta-notes, or FR/EN text prefixes.
- Maintain a polite, professional, and encouraging test center atmosphere.
- If the candidate submits silence, gibberish, or off-topic input, politely remind them in 1 sentence: "Veuillez répondre en français à la question posée pour cette épreuve."
`;
}

function generateDynamicFallbackReply(
  taskTitle: string,
  userText: string,
  userTurnCount: number
): string {
  const isTache1 = /tâche\s*1|entretien|dirigé|présentation/i.test(taskTitle);
  const isTache2 = /tâche\s*2|interaction|questions|document|rôle|roleplay/i.test(taskTitle);

  if (isTache1) {
    if (userTurnCount <= 1) {
      if (/\b(travail|travaille|emploi|métier|profession|ingénieur|professeur|étudiant|informatique|domaine)\b/i.test(userText)) {
        return "C'est un parcours très intéressant ! Depuis combien de temps exercez-vous dans ce domaine, et dans quelle ville du Canada souhaitez-vous travailler ?";
      }
      if (/\b(habite|vis|ville|pays|canada|montréal|quebec|toronto|victoria|vancouver)\b/i.test(userText)) {
        return "Merci pour cette présentation ! Qu'est-ce qui vous plaît le plus dans votre ville actuelle, et pourquoi souhaitez-vous vous installer au Canada ?";
      }
      return "Bonjour ! C'est un plaisir de faire votre connaissance. Pouvez-vous me décrire votre métier actuel et me parler de vos loisirs préférés ?";
    }
    if (userTurnCount === 2) {
      return "Merci pour ces précisions ! Qu'est-ce qui vous motive le plus dans votre projet d'immigration canadienne ?";
    }
    return "Merci beaucoup. Nous avons fait le tour des questions pour cette première tâche. L'entretien est terminé, nous pouvons passer à la suite.";
  }

  if (isTache2) {
    if (userTurnCount >= 4) {
      return "Merci beaucoup, nous avons répondu à l'ensemble de vos questions. Cet exercice est terminé.";
    }
    if (/\b(prix|tarif|coût|combien|payant|gratuit)\b/i.test(userText)) {
      return "Les tarifs varient selon la formule choisie, à partir de cinquante dollars par session. Avez-vous d'autres questions ?";
    }
    if (/\b(horaire|heure|quand|ouvert|fermé|date|samedi|dimanche)\b/i.test(userText)) {
      return "Nous sommes ouverts du lundi au samedi, de 9 heures à 18 heures. Avez-vous d'autres questions ?";
    }
    return "Tout à fait, nous proposons plusieurs options adaptées à vos disponibilités. Avez-vous d'autres questions ?";
  }

  return "Je comprends tout à fait votre point de vue, néanmoins ne pensez-vous pas que cette démarche présente aussi des défis importants à surmonter ?";
}

// Multi-Model Fail-Safe Array
const CANDIDATE_LLM_MODELS = [
  'google/gemini-2.0-flash-exp:free',
  'openai/gpt-4o-mini',
  'meta-llama/llama-3.3-70b-instruct:free',
  'qwen/qwen-2.5-72b-instruct:free',
  'deepseek/deepseek-chat'
];

export async function processSpeakingChatRequest(body: ChatRequestBody): Promise<{
  reply: string;
  audioBase64: string;
  model: string;
  voice: string;
}> {
  const { messages, taskTitle, scenarioText, examinerName, examinerRole, examinerVoice, gender, lessonLevel, lessonTopic } = body;

  const apiKey = await getOpenRouterApiKey();
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
    ...(messages || []),
  ];

  let content = '';
  let usedModel = 'dynamic-context-fallback';

  if (apiKey) {
    for (const model of CANDIDATE_LLM_MODELS) {
      try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
            'HTTP-Referer': env.frontendUrl || 'https://francprep.com',
            'X-Title': 'FrancPrep Official TCF Examiner',
          },
          body: JSON.stringify({
            model,
            messages: apiMessages,
            temperature: 0.7,
            max_tokens: 220,
          }),
        });

        if (response.ok) {
          const data = await response.json() as any;
          content = data.choices?.[0]?.message?.content || '';
          if (content && content.trim().length > 0) {
            usedModel = model;
            break;
          }
        }
      } catch (err: any) {
        console.warn(`[Speaking LLM Failover] Model ${model} failed:`, err?.message || err);
      }
    }
  }

  const userTurnCount = (messages || []).filter((m) => m.role === 'user' || (m as any).sender === 'candidate').length;
  const lastUserText = messages && messages.length > 0 ? messages[messages.length - 1].content || '' : '';

  if (!content || content.trim().length === 0) {
    content = generateDynamicFallbackReply(taskTitle || '', lastUserText, userTurnCount);
  }

  const chosenGender = gender || (examinerName && /Henri|Jean|Gérard|Rémy/i.test(examinerName) ? 'male' : 'female');
  const chosenVoice = examinerVoice || (chosenGender === 'male' ? 'fr-FR-HenriNeural' : 'fr-FR-DeniseNeural');
  let audioBase64 = '';

  try {
    // PASS undefined for forcedProvider so it uses the primary engine properly!
    const audioRes = await generateNeuralAudio(content, chosenGender, 'fr', undefined, undefined, undefined, 1.0);
    if (audioRes && audioRes.audioBase64) {
      audioBase64 = audioRes.audioBase64;
    }
  } catch (audioErr: any) {
    console.warn('[Speaking Audio Synthesis Warning]:', audioErr?.message || audioErr);
  }

  return {
    reply: content,
    model: usedModel,
    audioBase64,
    voice: chosenVoice,
  };
}

router.post('/chat', optionalAuth, async (req: Request, res: Response) => {
  try {
    const { messages } = req.body as ChatRequestBody;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      res.status(400).json({
        success: false,
        error: 'Messages array is required.',
      });
      return;
    }

    const result = await processSpeakingChatRequest(req.body as ChatRequestBody);

    res.json({
      success: true,
      data: {
        reply: result.reply,
        model: result.model,
        audioBase64: result.audioBase64,
        contentType: 'audio/mp3',
        voice: result.voice,
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
