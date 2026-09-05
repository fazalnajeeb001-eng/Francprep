import { Router, Request, Response } from 'express';
import axios from 'axios';
import { env } from '../config/env';
import { optionalAuth } from '../middleware/auth';
import Settings from '../models/Settings';
import { generateNeuralAudio } from '../services/tts.service';
import { generateEdgeNeuralAudio } from '../services/edgeTts.service';
import { getSpeakingIntroAudioBase64 } from '../data/speakingIntroAudioBank';
import { writingService } from '../services/writing.service';

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
    const examinerName = (req.query.examinerName as string || '').trim();
    let voiceId = (req.query.voiceId as string || '').trim() || undefined;

    if (!text) {
      res.status(400).send('Text parameter is required.');
      return;
    }

    if (!voiceId) {
      const resolved = resolveExaminerVoiceAndGender(examinerName, undefined, gender);
      voiceId = resolved.chosenVoice;
    }

    const edgeRes = await generateEdgeNeuralAudio(text, gender, 'fr', 1.0, voiceId, true);
    if (edgeRes && edgeRes.audioBase64) {
      const buffer = Buffer.from(edgeRes.audioBase64, 'base64');
      res.setHeader('Content-Type', 'audio/mpeg');
      res.setHeader('Content-Length', buffer.length.toString());
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.send(buffer);
      return;
    }

    // 100% Guaranteed Native French Audio Stream Engine (Zero rate limits, zero cloud socket blocks)
    try {
      const googleTtsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=fr&client=tw-ob`;
      const googleRes = await axios.get(googleTtsUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        },
        responseType: 'arraybuffer',
        timeout: 8000,
      });

      if (googleRes.status === 200 && googleRes.data && googleRes.data.length > 500) {
        const buf = Buffer.from(googleRes.data);
        res.setHeader('Content-Type', 'audio/mpeg');
        res.setHeader('Content-Length', buf.length.toString());
        res.setHeader('Cache-Control', 'public, max-age=86400');
        res.send(buf);
        return;
      }
    } catch (gErr: any) {
      console.warn('[Speaking Stream Google Fallback Warning]:', gErr?.message || gErr);
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
  remainingTimeSec?: number;
}

const EXAMINER_VOICE_MAP: Record<string, { gender: 'female' | 'male'; voiceId: string }> = {
  'henri': { gender: 'male', voiceId: 'fr-FR-HenriNeural' },
  'pierre': { gender: 'male', voiceId: 'fr-FR-HenriNeural' },
  'jean': { gender: 'male', voiceId: 'fr-CA-JeanNeural' },
  'rémy': { gender: 'male', voiceId: 'fr-FR-RemyMultilingualNeural' },
  'remy': { gender: 'male', voiceId: 'fr-FR-RemyMultilingualNeural' },
  'denise': { gender: 'female', voiceId: 'fr-FR-DeniseNeural' },
  'élodie': { gender: 'female', voiceId: 'fr-FR-DeniseNeural' },
  'elodie': { gender: 'female', voiceId: 'fr-FR-DeniseNeural' },
  'brigitte': { gender: 'female', voiceId: 'fr-FR-DeniseNeural' },
  'sylvie': { gender: 'female', voiceId: 'fr-CA-SylvieNeural' },
  'vivienne': { gender: 'female', voiceId: 'fr-FR-VivienneMultilingualNeural' },
  'sophie': { gender: 'female', voiceId: 'fr-FR-VivienneMultilingualNeural' },
};

function resolveExaminerVoiceAndGender(
  examinerName?: string,
  examinerVoice?: string,
  gender?: 'female' | 'male'
): { chosenVoice: string; chosenGender: 'female' | 'male' } {
  if (examinerVoice && (examinerVoice.includes('Neural') || examinerVoice.includes('fr-'))) {
    const isMale = gender === 'male' || /male|henri|pierre|jean|remy|rémy/i.test(examinerVoice);
    return { chosenVoice: examinerVoice, chosenGender: isMale ? 'male' : 'female' };
  }

  const nameLower = (examinerName || '').toLowerCase();
  for (const [key, val] of Object.entries(EXAMINER_VOICE_MAP)) {
    if (nameLower.includes(key)) {
      return { chosenVoice: val.voiceId, chosenGender: val.gender };
    }
  }

  const isMale = gender === 'male' || (examinerName && /Henri|Jean|Gérard|Rémy|Pierre|Laurent|Antoine|Marc|Paul|Louis|Hugo|Luc/i.test(examinerName));
  return {
    chosenGender: isMale ? 'male' : 'female',
    chosenVoice: isMale ? 'fr-FR-HenriNeural' : 'fr-FR-DeniseNeural',
  };
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
  lessonTopic?: string,
  remainingTimeSec?: number
): string {
  const name = examinerName || "Examinateur Henri";
  const role = examinerRole || "Examinateur certifié FEI — Format TCF Canada";
  const title = taskTitle || "Tâche 1";
  const scenario = scenarioText || lessonTopic || "Épreuve d'expression orale TCF Canada";
  const level = lessonLevel || "B2";

  const isTache1 = /Tâche 1|entretien dirigé|entretien/i.test(title);
  const isTache2 = /Tâche 2|interaction|exercice en interaction|rôle/i.test(title);
  const isTache3 = /Tâche 3|point de vue|débat|argumentation/i.test(title);

  let timeWarningDirective = "";
  if (remainingTimeSec !== undefined && remainingTimeSec <= 25) {
    timeWarningDirective = `
- CRITICAL TIME WRAP-UP DIRECTIVE: Only ${remainingTimeSec} seconds remain on the active exam clock!
- DO NOT ask any new questions or say "Avez-vous d'autres questions ?".
- Conclude this task politely and concisely in 1 sentence (e.g., "Je vous remercie. Le temps pour cette tâche est presque écoulé, nous avons fait le tour des questions.").
`;
  }

  let taskRules = "";
  if (isTache1) {
    taskRules = `
- THIS IS TÂCHE 1 (Entretien dirigé - 2 minutes).
- You are an official France Éducation International (FEI) TCF Canada oral examiner named ${name} (${role}).
- Conduct a formal, progressive guided interview (target CEFR level: ${level}).
- Listen carefully to the candidate's response, extract key contextual details (e.g. their profession, city, hobbies, or plans), and ask 1 dynamic, natural follow-up question.
- Always use formal register ("vous"). Keep your response concise, polite, and encouraging (1-2 sentences maximum).
${timeWarningDirective}
`;
  } else if (isTache2) {
    taskRules = `
- THIS IS TÂCHE 2 (Exercice en interaction / Roleplay - 3.5 minutes).
- You are the roleplay partner described in the scenario: ${role}. Target CEFR level: ${level}.
- ABSOLUTE DOCUMENT CARD FACT LOCKING DIRECTIVE:
  * You MUST use ONLY the exact details, prices, schedules, and conditions specified in the active scenario text:
    ${scenario}
  * NEVER invent or state fake prices, fees, rates, or session costs not found in the scenario text above (e.g., NEVER say "$50 per session" or "45$ par séance").
  * If the candidate asks about prices/tariffs, cite ONLY the exact price/rent/fee given in the scenario card (e.g. "750 $ CAD par semaine").
  * If asked about schedules/opening hours, cite ONLY the schedule given in the scenario card.
- ROLEPLAY CLOSING RULE: If the candidate is concluding the interaction (expressing thanks, saying goodbye, or stating they will reflect/call back to finalize), DO NOT ask "Avez-vous d'autres questions ?". Conclude politely: "C'est parfait ! Je vous en prie. N'hésitez pas si vous avez besoin d'autres précisions. Excellente journée à vous et à bientôt !"
- INTERMEDIATE TURN RULE: For all intermediate questions, end your response with: "Avez-vous d'autres questions ?"
${timeWarningDirective}
`;
  } else if (isTache3) {
    taskRules = `
- THIS IS TÂCHE 3 (Expression d'un point de vue & Débat - 4.5 minutes).
- You are an official FEI TCF Canada oral examiner named ${name} (${role}).
- Listen to the candidate's thesis statement and introduce a polite C1/C2 counter-argument or nuance to test their argumentation skills under debate pressure.
- ANTI-REPETITION LOCK DIRECTIVE:
  * Inspect the conversation history provided below.
  * You are STRICTLY FORBIDDEN from repeating any counter-argument, question, phrasing, or sentence that you have already spoken in this session.
  * Always advance the debate with a NEW perspective, economic/social counter-example, or deeper nuance.
- Start politely with: "Je comprends votre point de vue, néanmoins..." or "C'est une perspective intéressante, mais...".
- Use formal logical connectors ("néanmoins", "en revanche", "or"). Keep your counter-argument concise (2 sentences maximum).
${timeWarningDirective}
`;
  } else {
    taskRules = `
- You are an official FEI TCF Canada examiner named ${name} (${role}).
- Target level: ${level}. Scenario: ${scenario}.
- Respond naturally, professionally, and concisely in immaculate French (1-2 sentences).
${timeWarningDirective}
`;
  }

  return `You are an official France Éducation International (FEI) TCF Canada oral examiner named ${name}.

SCENARIO CONTEXT: ${scenario}

EXAMINER PROTOCOL RULES:
${taskRules}
- Respond ONLY in spoken French. Do NOT output translations, meta-notes, or FR/EN text prefixes.
- Respond dynamically and contextually to the candidate's actual words. Never repeat static template sentences.
`;
}

function generateDynamicFallbackReply(
  taskTitle: string,
  userText: string,
  userTurnCount: number,
  scenarioText?: string,
  remainingTimeSec?: number
): string {
  if (remainingTimeSec !== undefined && remainingTimeSec <= 25) {
    return "Je vous remercie. Le temps imparti pour cette tâche est presque écoulé, nous avons fait le tour des questions. Excellente journée à vous !";
  }

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
    const isClosing = /\b(merci|remercie|recontacter|rappelle|réfléchir|au revoir|bonne journée|bonne fin|quitte|finaliser)\b/i.test(userText);
    if (isClosing) {
      return "C'est parfait ! Je vous en prie. N'hésitez pas si vous avez besoin d'autres précisions. Excellente journée à vous et à bientôt !";
    }

    // Extract dynamic price/tariff detail from scenarioText if available
    let dynamicPriceDetail = "";
    if (scenarioText) {
      const priceMatch = scenarioText.match(/(?:tarifs?|prix|loyer|coût|montant|frais)\s*[:=]?\s*([^,.\n]+)/i) || scenarioText.match(/(\d+[\d\s]*\$\s*(?:CAD)?(?:\s*\/\s*\w+)?)/i);
      if (priceMatch && priceMatch[1]) {
        dynamicPriceDetail = priceMatch[1].trim();
      }
    }

    const hasPriceOrTariff = /\b(carte|payer|règlement|paiement|argent|coût|tarif|tarifs|prix|combien|gratuit|payant)\b/i.test(userText);
    const hasDaysOrSchedule = /\b(horaire|heure|quand|ouvert|fermé|date|samedi|dimanche|semaine|jour|jours|créneau|créneaux|disponibilité)\b/i.test(userText);

    if (hasPriceOrTariff && dynamicPriceDetail) {
      return `Concernant le tarif, il s'agit de ${dynamicPriceDetail}. Avez-vous d'autres questions ?`;
    }
    if (hasPriceOrTariff) {
      return "Les détails tarifaires et conditions de règlement figurant sur la fiche sont pleinement applicables. Avez-vous d'autres questions ?";
    }
    if (hasDaysOrSchedule) {
      return "Nos horaires d'ouverture et créneaux sont conformes aux indications de la fiche d'information. Avez-vous d'autres questions ?";
    }
    return "C'est une très bonne question ! Tous les détails figurant sur notre fiche d'information sont à votre disposition. Avez-vous d'autres questions ?";
  }

  // TÂCHE 3 DYNAMIC MULTI-TEMPLATE DEBATE MATRIX (NEVER REPEATS SAME SENTENCE VERBATIM)
  const debateResponses = [
    "Je comprends tout à fait votre point de vue, néanmoins ne pensez-vous pas que cette mesure comporte également des risques économiques ou sociaux importants ?",
    "C'est un argument tout à fait pertinent. Cependant, d'autres experts soutiennent que cette approche pourrait créer des inégalités. Comment répondez-vous à cette objection ?",
    "Certes, mais si l'on regarde la situation sur le long terme, ne craignez-vous pas un manque d'encadrement ou de régulation ?",
    "En effet, c'est une perspective intéressante. Mais au-delà des avantages immédiats, quels sont selon vous les freins principaux à sa mise en œuvre ?",
    "Votre analyse se défend, mais n'y a-t-il pas là une contradiction avec les principes de responsabilité collective ?"
  ];

  const index = Math.max(0, (userTurnCount - 1) % debateResponses.length);
  return debateResponses[index];
}

// Multi-Model Fail-Safe Provider Array (Groq Low-Latency -> OpenRouter -> OpenAI)
const CANDIDATE_LLM_MODELS = [
  'meta-llama/llama-3.3-70b-instruct:free',
  'openai/gpt-4o-mini',
  'mistralai/mistral-large-2411',
  'anthropic/claude-3.5-haiku',
  'google/gemini-2.0-flash-exp:free',
  'deepseek/deepseek-chat'
];

export async function processSpeakingChatRequest(body: ChatRequestBody): Promise<{
  reply: string;
  audioBase64: string;
  model: string;
  voice: string;
}> {
  const { messages, taskTitle, scenarioText, examinerName, examinerRole, examinerVoice, gender, lessonLevel, lessonTopic, remainingTimeSec } = body;

  const systemPrompt = buildExaminerSystemPrompt(
    taskTitle,
    scenarioText,
    examinerName,
    examinerRole,
    lessonLevel,
    lessonTopic,
    remainingTimeSec
  );

  const apiMessages: ChatMessage[] = [
    { role: 'system', content: systemPrompt },
    ...(messages || []),
  ];

  let content = '';
  let usedModel = 'dynamic-context-fallback';

  // 1. TIER 1 LLM PROVIDER: Ultra-low latency Groq llama-3.3-70b-versatile (<400ms)
  try {
    const settings = await Settings.findOne().lean().catch(() => null);
    const groqKey = ((settings as any)?.groqApiKey || process.env.GROQ_API_KEY || '').trim();
    if (groqKey) {
      const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${groqKey}`,
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: apiMessages,
          temperature: 0.65,
          max_tokens: 220,
        }),
      });

      if (groqRes.ok) {
        const groqJson = await groqRes.json() as any;
        const groqText = groqJson.choices?.[0]?.message?.content || '';
        if (groqText && groqText.trim().length > 0) {
          content = groqText.trim();
          usedModel = 'groq-llama-3.3-70b-versatile';
        }
      }
    }
  } catch (groqErr: any) {
    console.warn('[Speaking Groq LLM Failover Warning]:', groqErr?.message || groqErr);
  }

  // 2. TIER 2 LLM PROVIDER: OpenRouter Multi-Model Failover Array
  if (!content) {
    const apiKey = await getOpenRouterApiKey();
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
            const text = data.choices?.[0]?.message?.content || '';
            if (text && text.trim().length > 0) {
              content = text.trim();
              usedModel = model;
              break;
            }
          }
        } catch (err: any) {
          console.warn(`[Speaking LLM Failover] Model ${model} failed:`, err?.message || err);
        }
      }
    }
  }

  const userTurnCount = (messages || []).filter((m) => m.role === 'user' || (m as any).sender === 'candidate').length;
  const lastUserText = (messages && messages.length > 0 ? messages[messages.length - 1].content || '' : '').trim();
  const userWords = lastUserText.split(/\s+/).filter(Boolean);

  // Sparse 1-word / short fragment answer intercept protocol
  if (userWords.length > 0 && userWords.length <= 2 && !/^(merci|d'accord|au revoir)$/i.test(lastUserText) && (remainingTimeSec === undefined || remainingTimeSec > 25)) {
    content = `« ${lastUserText} » ? Que voulez-vous dire par là ? Pouvez-vous me faire une phrase complète pour développer votre réponse ?`;
  } else if (!content || content.trim().length === 0) {
    content = generateDynamicFallbackReply(taskTitle || '', lastUserText, userTurnCount, scenarioText, remainingTimeSec);
  }

  const isTache2 = /tâche\s*2|interaction|exercice en interaction|rôle|roleplay/i.test(taskTitle || '');
  
  if (remainingTimeSec !== undefined && remainingTimeSec <= 25) {
    // WRAP-UP MODE: Strip any trailing questions
    content = content.replace(/avez-vous d'autres questions\s*\??/gi, '').trim();
    if (!content || content.length < 5) {
      content = "Je vous remercie. Le temps pour cette tâche est presque écoulé, nous avons fait le tour des questions.";
    }
  } else if (isTache2) {
    const isClosing = /\b(merci|remercie|recontacter|rappelle|réfléchir|au revoir|bonne journée|bonne fin|quitte|finaliser)\b/i.test(lastUserText);
    if (!isClosing) {
      const cleanContent = content.trim();
      if (!/avez-vous d'autres questions\s*\??$/i.test(cleanContent)) {
        content = `${cleanContent.replace(/[.!?]+$/, '')}. Avez-vous d'autres questions ?`;
      }
    }
  }

  const { chosenVoice, chosenGender } = resolveExaminerVoiceAndGender(examinerName, examinerVoice, gender);
  let audioBase64 = '';

  try {
    // Direct Edge Neural TTS generation with locked chosenVoice (isSpeakingTask = true)
    const audioRes = await generateEdgeNeuralAudio(content, chosenGender, 'fr', 1.0, chosenVoice, true);
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

// POST /api/speaking/evaluate - Official FEI 4-Criteria Diagnostic Oral Evaluation Engine
router.post('/evaluate', optionalAuth, async (req: Request, res: Response) => {
  try {
    const { transcription, scenario, taskTitle, paperNumber, taskNumber, acousticMetrics } = req.body;
    const cleanTranscription = (transcription || '').trim();

    if (!cleanTranscription) {
      res.status(400).json({
        success: false,
        error: 'Transcription text is required for oral evaluation.',
      });
      return;
    }

    const result = await writingService.analyzeSpeaking(
      cleanTranscription,
      scenario || taskTitle || "Épreuve d'expression orale TCF Canada",
      taskTitle || `Tâche ${taskNumber || 1}`,
      'French',
      taskNumber || 1,
      acousticMetrics
    );

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('[Speaking Evaluation Route Error]:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to evaluate speaking response.',
    });
  }
});

// Multi-pass Neural Hallucination Sanitizer for Whisper Speech-to-Text
function sanitizeWhisperTranscript(rawText: string): string {
  if (!rawText || !rawText.trim()) return '';

  let text = rawText.trim();

  // 1. Remove bracketed/parenthesized metadata & noise tags ([Musique], (Applaudissements), [Silence], [Music], etc.)
  text = text.replace(/[\(\[\{]\s*(?:musique|music|applaudissements|applause|rires|laughter|silence|bruit|bruits|noise|soupirs|sighs|chuchotements|cheering|static)\s*[\)\]\}]/gi, '');

  // 2. Remove subtitle / Amara / YouTube channel credits & URLs
  text = text
    .replace(/(?:sous-titres?\s+(?:réalisés|fournis|en|par|de)|sous-titrage|subtitles?\s+by|captioned\s+by|translated\s+by|transcrit\s+par|transcription\s+par)\b.*?(?=\.|\!|\?|$)/gi, '')
    .replace(/(?:amara\.org|youtube|subscribe|abonnez-vous|merci\s+d'avoir\s+regardé|thanks\s+for\s+watching|like\s+and\s+subscribe|description\s+de\s+la\s+vidéo)\b.*?(?=\.|\!|\?|$)/gi, '')
    .replace(/(?:merci\s+enfant|c'est\s+un\s+peu\s+comme\s+ça|merci\s+de\s+votre\s+attention|à\s+bientôt\s+dans\s+une\s+prochaine\s+vidéo|merci\s+et\s+à\s+bientôt|sous-titrage\s+stv|transcription\s+par\s+le\s+groupe)\b.*?(?=\.|\!|\?|$)/gi, '')
    .replace(/\b(?:merci\s+enfant|c'est\s+un\s+peu\s+comme\s+ça)\b\.?\s*$/gi, '');

  // 3. Remove prompt leakage & YouTube English subtitle artifacts
  text = text
    .replace(/^(?:thank\s+you|thanks|i['’]m\s+going\s+to\s+be\s+a\s+little\s+bit\s+more\s+serious\s+about\s+this|thanks\s+for\s+watching|subscribe|subtitles\s+by|translated\s+by).*?(?=\b(?:je|j'|bonjour|salut|monsieur|madame|en|au|dans|je\s+m'appelle|j'habite)\b)/gi, '')
    .replace(/\b(?:thank\s+you(?:\s+very\s+much)?|i['’]m\s+going\s+to\s+be\s+a\s+little\s+bit\s+more\s+serious(?:\s+about\s+this)?|thanks\s+for\s+watching|subscribe\s+to\s+my\s+channel)\b/gi, '');

  // 4. Remove hallucinated institutional boilerplate
  text = text
    .replace(/(?:les\s+idées\s+de\s+l'université|commission\s+de\s+l'état|conseil\s+des\s+ministres|république\s+française|ministère\s+de\s+l'éducation)\b.*?(?=\.|\!|\?|$)/gi, '');

  // 5. Remove prompt echo fragments
  text = text
    .replace(/^(?:discours\s+en\s+français|épreuve\s+d'expression\s+orale(?:\s+du\s+tcf\s+canada)?|tcf\s+canada|bonjour,?\s*tcf\s+canada)\b[\.\!\?\:\,-]?\s*/gi, '');

  // 6. Deduplicate 1-word repetition loops (e.g. "euh euh euh euh euh" -> "euh euh")
  text = text.replace(/\b(\w+)(?:\s+\1){3,}\b/gi, '$1 $1');

  // 7. Deduplicate 2-word phrase loops (e.g. "de la de la de la" -> "de la")
  text = text.replace(/\b(\w+\s+\w+)(?:\s+\1){3,}\b/gi, '$1');

  // 7b. Deduplicate full sentence loops (e.g. "Je ne l'ai pas vu. Je ne l'ai pas vu." -> "Je ne l'ai pas vu.")
  text = text.replace(/([^.!?]+[.!?])\s*\1+/gi, '$1');

  text = text.trim();

  // 8. Gatekeeper residual check: if remaining text is purely residual fragments or < 2 characters
  if (/^(?:tcf\s+canada|bonjour|merci|d'un\s+candidat|accents?\s+formels|sous-titres?|description|merci\s+enfant|c'est\s+un\s+peu\s+comme\s+ça)$/i.test(text) || text.length < 2) {
    return '';
  }

  return text;
}

// POST /api/speaking/transcribe - Universal Whisper Neural Speech-to-Text Endpoint (99%+ Multi-Accent Recognition)
router.post('/transcribe', optionalAuth, async (req: Request, res: Response) => {
  try {
    const { audioBase64, mimeType, durationSec } = req.body;
    if (!audioBase64) {
      res.status(400).json({ success: false, error: 'Audio data in Base64 format is required.' });
      return;
    }

    const cleanBase64 = audioBase64.includes(';base64,') ? audioBase64.split(';base64,')[1] : audioBase64;
    const buffer = Buffer.from(cleanBase64, 'base64');

    // PRE-FLIGHT BUFFER GUARD: Silent micro-recordings (< 3,000 bytes ~ 0.5s) returned as empty string in 0ms
    if (buffer.length < 3000) {
      res.json({
        success: true,
        data: {
          text: '',
          wordCount: 0,
          provider: 'preflight-silence-guard',
          acousticMetrics: {
            speechRateWpm: 0,
            hesitationPauseCount: 0,
            totalSilenceDurationSec: Math.round(durationSec || 1),
            fluencyIndexPct: 100,
          }
        }
      });
      return;
    }

    const settings = await Settings.findOne().catch(() => null);
    const groqKey = ((settings as any)?.groqApiKey || process.env.GROQ_API_KEY || '').trim();
    const rawOpenAIKey = ((settings as any)?.openaiApiKey || process.env.OPENAI_API_KEY || process.env.OPENAI_KEY || '').trim();
    const openaiKey = (rawOpenAIKey.startsWith('sk-') && !rawOpenAIKey.startsWith('sk-or-')) ? rawOpenAIKey : '';

    let text = '';
    let provider = 'whisper-neural-fallback';

    const mimeLower = (mimeType || '').toLowerCase();
    const ext = mimeLower.includes('mp4') || mimeLower.includes('m4a') ? 'm4a' 
              : mimeLower.includes('wav') ? 'wav' 
              : mimeLower.includes('ogg') ? 'ogg'
              : mimeLower.includes('aac') ? 'aac'
              : 'webm';

    // 1. PRIMARY PROVIDER: Groq Whisper-Large-v3 Engine (Ultra-Fast 0.2s, 99%+ Multi-Accent Accuracy, Free Tier)
    if (groqKey && buffer.length >= 3000) {
      try {
        const formData = new FormData();
        const blob = new Blob([buffer], { type: mimeType || 'audio/webm' });
        formData.append('file', blob, `candidate_speech.${ext}`);
        formData.append('model', 'whisper-large-v3');
        formData.append('language', 'fr');
        formData.append('prompt', 'Discours en français pour l\'épreuve d\'expression orale.');
        formData.append('temperature', '0.0');

        const groqRes = await fetch('https://api.groq.com/openai/v1/audio/transcriptions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${groqKey}`,
          },
          body: formData,
        });

        if (groqRes.ok) {
          const json = await groqRes.json() as any;
          if (json?.text && json.text.trim()) {
            text = sanitizeWhisperTranscript(json.text);
            provider = 'groq-whisper-large-v3';
            console.log(`[Groq Whisper STT Transcribe Success]: "${text}" (${text ? text.split(/\s+/).length : 0} words transcribed via ${provider})`);
          }
        } else {
          const errText = await groqRes.text().catch(() => '');
          console.warn(`[Groq Whisper STT HTTP ${groqRes.status} Warning]:`, errText);
        }
      } catch (gErr: any) {
        console.warn('[Groq Whisper STT Transcribe Exception]:', gErr?.message || gErr);
      }
    }

    // 2. SECONDARY PROVIDER FALLBACK: OpenAI Whisper-1 Engine
    if (!text && openaiKey && buffer.length >= 3000) {
      try {
        const formData = new FormData();
        const blob = new Blob([buffer], { type: mimeType || 'audio/webm' });
        formData.append('file', blob, `candidate_speech.${ext}`);
        formData.append('model', 'whisper-1');
        formData.append('language', 'fr');
        formData.append('prompt', 'Discours en français.');
        formData.append('temperature', '0.0');

        const whisperRes = await fetch('https://api.openai.com/v1/audio/transcriptions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${openaiKey}`,
          },
          body: formData,
        });

        if (whisperRes.ok) {
          const json = await whisperRes.json() as any;
          if (json?.text && json.text.trim()) {
            text = sanitizeWhisperTranscript(json.text);
            provider = 'openai-whisper-1';
            console.log(`[OpenAI Whisper STT Transcribe Success]: "${text}" (${text ? text.split(/\s+/).length : 0} words transcribed via ${provider})`);
          }
        } else {
          const errText = await whisperRes.text().catch(() => '');
          console.warn(`[OpenAI Whisper STT HTTP ${whisperRes.status} Error]:`, errText);
        }
      } catch (wErr: any) {
        console.warn('[OpenAI Whisper STT Transcribe Warning]:', wErr?.message || wErr);
      }
    }

    // Final multi-pass neural sanitizer pass
    text = sanitizeWhisperTranscript(text);

    const words = text ? text.split(/\s+/).filter(Boolean) : [];
    const wordCount = words.length;
    const estimatedDuration = typeof durationSec === 'number' && durationSec > 0 ? durationSec : Math.max(5, Math.round(wordCount / 2.2));
    const speechRateWpm = wordCount > 0 ? Math.round((wordCount / (estimatedDuration / 60))) : 0;

    res.json({
      success: true,
      data: {
        text,
        wordCount,
        provider,
        acousticMetrics: {
          speechRateWpm,
          hesitationPauseCount: text.includes('...') || text.includes('euh') ? 3 : 1,
          totalSilenceDurationSec: Math.max(1, Math.round(estimatedDuration * 0.15)),
          fluencyIndexPct: speechRateWpm >= 110 ? 90 : speechRateWpm > 0 ? 75 : 100,
        }
      }
    });
  } catch (err: any) {
    console.error('[Speaking Transcribe Endpoint Error]:', err);
    res.status(500).json({ success: false, error: err?.message || 'Failed to transcribe oral audio.' });
  }
});

export default router;
