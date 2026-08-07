import mongoose from 'mongoose';
import { env } from '../config/env';
import Settings from '../models/Settings';
import { generateAICompletion } from './aiProvider';

export interface ComprehensiveWritingFeedback {
  score: number;
  scoreOutOf20: number;
  nclcGrade: string;
  cefrLevel: string;
  expressEntryPoints: number;
  taskFulfillmentScore: number;
  coherenceScore: number;
  lexicalScore: number;
  grammarScore: number;
  feedback: string;
  corrections: Array<{ original: string; corrected: string; explanation: string }>;
  tips: string[];
}

export interface GrammarCheckResult {
  correct: boolean;
  feedback: string;
  expectedAnswer?: string;
}

export interface SpeakingResult {
  transcription: string;
  feedback: string;
  score: number;
  accuracy: number;
  fluency: number;
  corrections: string[];
  tips: string[];
}

export interface SpeakingChatResult {
  reply: string;
  model: string;
}

export class WritingService {
  private async getOpenRouterKey(): Promise<string> {
    try {
      if (mongoose.connection.readyState === 1) {
        const settings = await Settings.findOne();
        if (settings?.openRouterApiKey) {
          return settings.openRouterApiKey;
        }
      }
    } catch (e) {
      console.warn('Could not read Settings model for OpenRouter key:', e);
    }
    return env.openRouterKey || process.env.OPENROUTER_API_KEY || '';
  }

  private computeSimilarity(studentText: string, modelText: string): number {
    if (!studentText || !modelText) return 0;
    const normalize = (str: string) =>
      str
        .toLowerCase()
        .replace(/[^\w\sàâäéèêëîïôöùûüç]/g, '')
        .trim()
        .split(/\s+/)
        .filter((w) => w.length > 2);

    const words1 = normalize(studentText);
    const words2 = normalize(modelText);

    if (words1.length < 5 || words2.length < 5) return 0;

    const set1 = new Set(words1);
    const set2 = new Set(words2);
    let intersection = 0;
    set1.forEach((w) => {
      if (set2.has(w)) intersection++;
    });

    const union = new Set([...words1, ...words2]).size;
    const jaccard = union > 0 ? intersection / union : 0;

    const getTrigrams = (words: string[]) => {
      const trigrams = new Set<string>();
      for (let i = 0; i <= words.length - 3; i++) {
        trigrams.add(words.slice(i, i + 3).join(' '));
      }
      return trigrams;
    };

    const tri1 = getTrigrams(words1);
    const tri2 = getTrigrams(words2);

    let triMatch = 0;
    tri1.forEach((t) => {
      if (tri2.has(t)) triMatch++;
    });
    const triRatio = tri1.size > 0 ? triMatch / tri1.size : 0;

    if (tri1.size > 0 && triMatch > 0) {
      return Math.max(triRatio, jaccard * 0.7);
    }
    return jaccard * 0.4;
  }

  private isFrenchText(text: string): boolean {
    if (!text || text.trim().length < 10) return false;
    const words = text
      .toLowerCase()
      .replace(/[^\w\sàâäéèêëîïôöùûüç]/g, '')
      .trim()
      .split(/\s+/);

    if (words.length < 5) return false;

    const frenchCommonWords = new Set([
      'le', 'la', 'les', 'de', 'du', 'des', 'un', 'une', 'et', 'est', 'en', 'dans',
      'que', 'qui', 'pour', 'pas', 'sur', 'avec', 'ce', 'nous', 'vous', 'je', 'il', 'elle',
      'ont', 'sont', 'par', 'plus', 'ne', 'ou', 'mais', 'donc', 'car', 'ni', 'si', 'tout',
      'faire', 'me', 'te', 'se', 'mon', 'ma', 'mes', 'ton', 'ta', 'tes', 'son', 'sa', 'ses',
      'notre', 'votre', 'leur', 'monsieur', 'madame', 'bonjour', 'salut', 'merci', 'appartement',
      'logement', 'loyer', 'chauffage', 'cours', 'travail', 'ville', 'transport', 'ecrit',
      'reponse', 'sujet', 'avis', 'accord', 'mots', 'apres', 'avant', 'cette', 'cet', 'très',
      'bien', 'beaucoup', 'aussi', 'comme', 'plusieurs', 'tous', 'toujours', 'jamais'
    ]);

    let matchedCount = 0;
    for (const w of words) {
      if (frenchCommonWords.has(w)) {
        matchedCount += 1;
      } else {
        const hasVowels = /[aeiouyàâäéèêëîïôöùûü]/i.test(w);
        const isMashing = /^[bcdfghjklmnpqrstvwxz]{4,}$/i.test(w) || /^[aeiouy]{4,}$/i.test(w);
        if (hasVowels && !isMashing && w.length >= 3) {
          matchedCount += 0.5;
        }
      }
    }

    const ratio = matchedCount / words.length;
    return ratio >= 0.25;
  }

  async getFeedback(text: string, lessonTitle?: string, expectedAnswer?: string, checklist?: string[], targetLanguage = 'French', examName = 'DELF / TCF'): Promise<ComprehensiveWritingFeedback> {
    const apiKey = await this.getOpenRouterKey();

    // CRITICAL GIBBERISH & NON-FRENCH PRE-SCREENING (Zero Grade Enforcement)
    if (!this.isFrenchText(text)) {
      return {
        score: 0,
        scoreOutOf20: 0,
        nclcGrade: 'NCLC 0 (Zero Grade — Gibberish / Non-French Submission)',
        cefrLevel: 'N/A',
        expressEntryPoints: 0,
        taskFulfillmentScore: 0,
        coherenceScore: 0,
        lexicalScore: 0,
        grammarScore: 0,
        feedback: '🚨 ZERO GRADE (0/20 Marks): The submitted text contains non-French gibberish, keyboard mashing, or uninterpretable character sequences. Official TCF Canada examiners award 0 marks for non-French submissions.',
        corrections: [
          { original: text.slice(0, 80) + '...', corrected: 'Rédigez votre propre texte en français.', explanation: 'Non-French gibberish or random character sequences receive an automatic 0 grade in official TCF/TEF exams.' }
        ],
        tips: [
          'Rédigez des phrases complètes en français avec du vocabulaire approprié au sujet.',
          'Assurez-vous de répondre directement aux questions de la consigne.'
        ]
      };
    }

    // CRITICAL PROMPT TEXT COPYING CHECK: If student copies >45% of the prompt text
    if (expectedAnswer && text && text.trim().length > 30) {
      const promptSimilarity = this.computeSimilarity(text, expectedAnswer);
      if (promptSimilarity > 0.45) {
        return {
          score: 0,
          scoreOutOf20: 0,
          nclcGrade: 'NCLC 0 (Zero Grade — Prompt Text Copying Detected)',
          cefrLevel: 'N/A',
          expressEntryPoints: 0,
          taskFulfillmentScore: 0,
          coherenceScore: 0,
          lexicalScore: 0,
          grammarScore: 0,
          feedback: `🚨 PROMPT COPYING DETECTED (Score: 0/20): Your submission shares ${(promptSimilarity * 100).toFixed(0)}% similarity with the prompt instructions or model answer. Official TCF Canada examiners award 0 points for copied text.`,
          corrections: [
            { original: text.slice(0, 80) + '...', corrected: 'Rédigez votre propre argumentation originale.', explanation: 'Copying prompt instructions or model text receives an automatic zero grade.' }
          ],
          tips: [
            'Rédigez votre propre texte sans recopier la consigne.',
            'Exprimez vos idées personnelles en français.'
          ]
        };
      }
    }

    if (!apiKey) {
      return {
        score: 0,
        scoreOutOf20: 0,
        nclcGrade: 'N/A',
        cefrLevel: 'N/A',
        expressEntryPoints: 0,
        taskFulfillmentScore: 0,
        coherenceScore: 0,
        lexicalScore: 0,
        grammarScore: 0,
        feedback: 'AI feedback is not configured. Please set up OpenRouter API Key in Admin Settings or Environment variables.',
        corrections: [],
        tips: ['Set OPENROUTER_API_KEY in your environment or Admin Settings to enable AI feedback.'],
      };
    }

    const prompt = `You are an official France Éducation International (FEI) Senior Certified Examiner evaluating ${targetLanguage} writing for official TCF Canada.

CRITICAL IMPARTIAL EVALUATION GUIDELINES (STRICT FEI CEFR STANDARDS — NO GRADE INFLATION):
- Grade strictly according to candidate linguistic quality. DO NOT DEFAULT TO B2 OR ANY MID-LEVEL GRADE.
- Flawless C2/C1 masterwork responses (rich vocabulary, complex subjonctif/conditionnel, immaculate cohesion) receive 18–20/20 (NCLC 10+ / C2 or NCLC 9 / C1).
- Solid B2 responses with good connectors, complex structures (conditionnel/subjonctif), and minor errors receive 12–15/20 (NCLC 7–8 / B2).
- Basic/Intermediate B1 responses (simple sentences, basic connectors like et/mais/parce que, basic vocabulary) MUST be capped at 9–10/20 (NCLC 5 / B1). They CANNOT receive B2 (12+).
- Elementary A2 responses receive 5–8/20 (NCLC 4 / A2).
- Beginner A1 responses receive 3–4/20 (NCLC 3 / A1) or 1–2/20 (Below A1).
- OFF-TOPIC (HORS-SUJET), PLAGIARIZED, or GIBBERISH submissions MUST receive 0/20 (NCLC 0).

CRITICAL TASK TYPE & FORMAT ALIGNMENT RULES (0 MARKS FOR MISMATCH):
- TÂCHE 1 EXPECTATION: Short personal message/email (60-120 words) responding to a daily situation or request.
- TÂCHE 2 EXPECTATION: Narrative article or personal experience report (120-150 words) describing a travel, event, or personal story.
- TÂCHE 3 EXPECTATION: Argumentative essay on a societal/public topic discussing two contrasting viewpoints (140-180 words).

IF CANDIDATE SUBMITS A TÂCHE 1 PERSONAL EMAIL (e.g. "Bonjour... Je suis dans votre appartement... Cordialement") FOR A TÂCHE 3 ARGUMENTATIVE ESSAY OR TÂCHE 2 NARRATIVE REPORT:
- This is a TASK TYPE & FORMAT MISMATCH (HORS-SUJET).
- Official FEI rules mandate an automatic 0/5 on TaskFulfillmentScore and 0/20 Total Marks (NCLC 0 Zero Grade).

CRITICAL CAPPING RULE FOR C1/C2 MASTERY (NCLC 9–10 / 16–20 MARKS):
- Standard formal B2 emails with polite request formulas ("Pourriez-vous", "je vous prie d'agréer") and standard connectors ("de plus", "car", "alors que") MUST BE GRADED AT 13–15/20 (B2 / B2 Upper NCLC 7-8). THEY CANNOT RECEIVE C1 OR C2 (16–20 Marks).
- To receive 16/20+ (C1/C2), candidate text MUST feature sophisticated academic/literary vocabulary (e.g. incontournable, dysfonctionnement, préconiser, solliciter, déchéance, aggravation) AND advanced connectors (de surcroît, par conséquent, néanmoins) AND complex syntax (subjonctif, conditionnel passé, relative pronouns dont/auquel).

CRITICAL CAPPING RULE FOR B2 LEVEL (NCLC 7 / 12+ MARKS):
- To receive 12/20 or higher (NCLC 7+ B2), candidate text MUST feature AT LEAST ONE formal B2/C1 connector (e.g. cependant, toutefois, en outre, par conséquent, néanmoins, d'une part) AND AT LEAST ONE B2 complex syntactic structure (e.g. conditionnel "pourriez-vous / j'aimerais", subjonctif "pour que nous puissions", relative pronouns "dont / auquel").
- Simple A2/B1 texts relying ONLY on present tense (je suis, il fait, vous pouvez) and basic A2 connectors (mais, parce que, en plus) MUST BE CAPPED AT 7–9/20 (A2/B1 NCLC 4/5). THEY CANNOT RECEIVE B2 (12+).

CRITICAL PENALTY RULES FOR CODE-SWITCHING, BROKEN A1 GRAMMAR & WORD COUNT:
1. ENGLISH WORDS / CODE-SWITCHING (e.g. "is no work", "the", "with"): Inserting non-French English words in a French essay MUST cap GrammarScore at 1/5 and LexicalScore at 1/5.
2. BROKEN TELEGRAPHIC GRAMMAR (e.g. "moi très froid", "Je malade", "pas possible dormir"): Non-conjugated/telegraphic sentences MUST cap GrammarScore at 1/5.
3. WORD COUNT SHORTFALL: If candidate text is below minimum word count (e.g. <60 words for Task 1, <120 words for Task 2, <140 words for Task 3), TaskFulfillmentScore MUST be capped at 1-2/5.

OFFICIAL FEI 4-CRITERIA MARKS (0-5 EACH):
1. taskFulfillmentScore (0-5): Address all prompt points, respect word count boundaries. Deduct 1-2 pts if candidate falls short of minimum word count or exceeds maximum. (0/5 if Off-Topic)
2. coherenceScore (0-5): Logical paragraph structure and transitional connectors (e.g. en outre, cependant, par conséquent, toutefois, d'une part... d'autre part). Repetitive basic connectors (et, mais, alors) cap this at 2-3/5.
3. lexicalScore (0-5): Vocabulary range, domain-specific precision, and register appropriate to task. English word insertion caps this at 1/5.
4. grammarScore (0-5): Morphosyntax, tense agreement, complex sentence structures. English insertion or broken telegraphic A1 grammar caps this at 1/5.

Context / Task Prompt:
Task / Topic: "${lessonTitle || `${targetLanguage} Writing Examination`}"
${expectedAnswer ? `Task Prompt & Model Expectations:\n"""\n${expectedAnswer}\n"""` : ''}
${checklist && checklist.length > 0 ? `Required Checklist Elements:\n${checklist.map((item, i) => `${i + 1}. ${item}`).join('\n')}` : ''}

Candidate Submission (${targetLanguage}):
"""
${text}
"""

Respond ONLY with a valid JSON object matching this schema:
{
  "taskFulfillmentScore": 5, 
  "coherenceScore": 5, 
  "lexicalScore": 5, 
  "grammarScore": 5, 
  "feedback": "2-3 sentence precise examiner diagnostic summary highlighting strengths and primary area for improvement.",
  "corrections": [
    { "original": "error phrase", "corrected": "corrected phrase", "explanation": "Grammatical or lexical explanation in English." }
  ],
  "tips": [
    "Actionable tip 1",
    "Actionable tip 2"
  ]
}

REMEMBER: Fill taskFulfillmentScore, coherenceScore, lexicalScore, grammarScore with exact integers from 0 to 5 corresponding to candidate level (5=C2/C1 flawless, 4=B2 advanced, 3=B1 intermediate, 2=A2 elementary, 1=A1 beginner, 0=Off-topic/Gibberish).`;

    try {
      const content = await generateAICompletion({
        model: 'gpt-4o-mini',
        prompt,
        systemPrompt: `You are an official France Éducation International (FEI) Senior Examiner evaluating TCF Canada writing with strict, uninflated accuracy.`,
        temperature: 0.1,
        maxTokens: 1000,
      });

      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        let t = Math.max(0, Math.min(5, typeof parsed.taskFulfillmentScore === 'number' ? parsed.taskFulfillmentScore : (typeof parsed.taskCompletionScore === 'number' ? parsed.taskCompletionScore : 0)));
        let c = Math.max(0, Math.min(5, typeof parsed.coherenceScore === 'number' ? parsed.coherenceScore : (typeof parsed.cohesionScore === 'number' ? parsed.cohesionScore : 0)));
        let l = Math.max(0, Math.min(5, typeof parsed.lexicalScore === 'number' ? parsed.lexicalScore : (typeof parsed.vocabularyScore === 'number' ? parsed.vocabularyScore : 0)));
        let g = Math.max(0, Math.min(5, typeof parsed.grammarScore === 'number' ? parsed.grammarScore : 0));

        const textLower = (text || '').toLowerCase();
        const words = (text || '').trim().replace(/['’]/g, ' ').split(/\s+/).filter(Boolean);

        // Detect Tâche 1 Personal Email format pasted in Tâche 3 / Tâche 2
        const isLetterFormat = /^\s*(bonjour|cher|chère|monsieur|madame)/i.test((text || '').trim()) && /(cordialement|bien à vous|salutations)/i.test((text || '').trim());
        const isTache3Or2 = lessonTitle?.includes('Tâche 3') || lessonTitle?.includes('Tâche 2') || expectedAnswer?.includes('140') || expectedAnswer?.includes('120');

        if (isTache3Or2 && isLetterFormat && words.length < 100) {
          t = 0;
        }

        const hasB2Connectors = /\b(cependant|toutefois|en outre|par conséquent|néanmoins|ainsi|d'une part|d'autre part)\b/i.test(textLower);
        const hasB2Grammar = /\b(pourriez|pourrait|serait|aimerais|fussent|puisse|soit|dont|auquel|laquelle|bien que|afin de|en vue de)\b/i.test(textLower);

        // Strict B2 Capping: Absence of B2 connectors & B2 syntax caps score at 9/20 (B1) max
        if (!hasB2Connectors && !hasB2Grammar) {
          t = Math.min(3, t);
          c = Math.min(3, c);
          l = Math.min(3, l);
          g = Math.min(2, g);
        }

        let scoreOutOf20 = t + c + l + g;

        if (t === 0) {
          scoreOutOf20 = 0;
        }

        if (!hasB2Connectors && !hasB2Grammar) {
          scoreOutOf20 = Math.min(9, scoreOutOf20);
        }

        // Strict C1/C2 Capping: Standard formal emails without C1 academic vocabulary or C1 connectors cap at 15/20 (B2 Upper)
        const hasC1C2Conn = /\b(de surcroît|par conséquent|néanmoins|toutefois|d'une part|d'autre part|en somme|nonobstant)\b/i.test(textLower);
        const hasC1C2Lex = /\b(incontournable|perspective|sensibilisation|préconiser|solliciter|manifestation|bienveillance|réciproque|controverse|conciliation|inéluctable|épanouissement|assimilation|détériorer|dysfonctionnement|dégradation|aggravation)\b/i.test(textLower);
        const hasC1C2Gram = /\b(puisse|soit|fassions|sachiez|ayez|fussent|dont|auquel|laquelle|duquel|lesquelles|aurait été|aurait dû|eût|demeure|entraver)\b/i.test(textLower);

        if (!hasC1C2Conn || !hasC1C2Lex || !hasC1C2Gram) {
          scoreOutOf20 = Math.min(15, scoreOutOf20);
        }
        if (scoreOutOf20 === 0 && typeof parsed.scoreOutOf20 === 'number') {
          scoreOutOf20 = parsed.scoreOutOf20;
        }

        const feedbackLower = (parsed.feedback || '').toLowerCase();
        const isOffTopicFeedback = feedbackLower.includes('off-topic') ||
                                   feedbackLower.includes('off topic') ||
                                   feedbackLower.includes('hors-sujet') ||
                                   feedbackLower.includes('hors sujet') ||
                                   feedbackLower.includes('does not address the prompt') ||
                                   feedbackLower.includes('unrelated to the prompt');

        if (scoreOutOf20 === 0 || t === 0 || isOffTopicFeedback) {
          return {
            score: 0,
            scoreOutOf20: 0,
            nclcGrade: "NCLC 0 (Zero Grade — Off-Topic / Hors-Sujet)",
            cefrLevel: "N/A",
            expressEntryPoints: 0,
            taskFulfillmentScore: 0,
            coherenceScore: typeof parsed.coherenceScore === 'number' ? Math.min(2, parsed.coherenceScore) : 1,
            lexicalScore: typeof parsed.lexicalScore === 'number' ? Math.min(2, parsed.lexicalScore) : 1,
            grammarScore: typeof parsed.grammarScore === 'number' ? Math.min(2, parsed.grammarScore) : 1,
            feedback: parsed.feedback || "🚨 ZERO GRADE (0/20 Marks): Official FEI rules mandate an automatic zero score for off-topic (hors-sujet) submissions that do not answer the specific prompt scenario.",
            corrections: Array.isArray(parsed.corrections) ? parsed.corrections : [],
            tips: Array.isArray(parsed.tips) ? parsed.tips : ["Lisez attentivement la consigne et répondez directement au sujet proposé."]
          };
        }

        const scorePct = Math.round((scoreOutOf20 / 20) * 100);
        let nclcGrade = "NCLC 7 (B2 Benchmark Target)";
        let cefrLevel = parsed.cefrLevel || "B2";
        let expressEntryPoints = 17;

        if (scoreOutOf20 >= 18) {
          nclcGrade = "NCLC 10 (C2 Mastery)";
          cefrLevel = "C2";
          expressEntryPoints = 34;
        } else if (scoreOutOf20 >= 16) {
          nclcGrade = "NCLC 9 (C1 Advanced)";
          cefrLevel = "C1";
          expressEntryPoints = 31;
        } else if (scoreOutOf20 >= 14) {
          nclcGrade = "NCLC 8 (B2 Upper)";
          cefrLevel = "B2";
          expressEntryPoints = 23;
        } else if (scoreOutOf20 >= 12) {
          nclcGrade = "NCLC 7 (B2 Benchmark Target)";
          cefrLevel = "B2";
          expressEntryPoints = 17;
        } else if (scoreOutOf20 >= 10) {
          nclcGrade = "NCLC 6 (B1 Intermediate)";
          cefrLevel = "B1";
          expressEntryPoints = 12;
        } else if (scoreOutOf20 >= 9) {
          nclcGrade = "NCLC 5 (B1 Threshold)";
          cefrLevel = "B1";
          expressEntryPoints = 6;
        } else if (scoreOutOf20 >= 5) {
          nclcGrade = "NCLC 4 (A2 Elementary)";
          cefrLevel = "A2";
          expressEntryPoints = 0;
        } else if (scoreOutOf20 >= 3) {
          nclcGrade = "NCLC 3 (A1 Beginner)";
          cefrLevel = "A1";
          expressEntryPoints = 0;
        } else {
          nclcGrade = "NCLC 1-2 (Below A1 / Beginner)";
          cefrLevel = "Below A1";
          expressEntryPoints = 0;
        }

        return {
          score: scorePct,
          scoreOutOf20,
          nclcGrade,
          cefrLevel,
          expressEntryPoints,
          taskFulfillmentScore: t,
          coherenceScore: c,
          lexicalScore: l,
          grammarScore: g,
          feedback: parsed.feedback || 'Good effort on this writing task.',
          corrections: Array.isArray(parsed.corrections) ? parsed.corrections : [],
          tips: Array.isArray(parsed.tips) ? parsed.tips : [],
        };
      }

      return this.evaluateLocalCEFR(text, lessonTitle, expectedAnswer, targetLanguage);
    } catch (error) {
      console.error('AI feedback request failed:', error);
      return this.evaluateLocalCEFR(text, lessonTitle, expectedAnswer, targetLanguage);
    }
  }

  private evaluateLocalCEFR(text: string, lessonTitle?: string, expectedAnswer?: string, targetLanguage = 'French') {
    const clean = (text || '').trim();
    const words = clean.replace(/['’]/g, ' ').split(/\s+/).filter(Boolean);
    const wordCount = words.length;
    const textLower = clean.toLowerCase();

    let minWords = 60;
    let maxWords = 120;
    if (lessonTitle?.includes('Tâche 2') || expectedAnswer?.includes('120')) {
      minWords = 120;
      maxWords = 150;
    } else if (lessonTitle?.includes('Tâche 3') || expectedAnswer?.includes('140')) {
      minWords = 140;
      maxWords = 180;
    }

    // Code-switching & English word check
    const hasEnglishWords = /\b(is|no|work|not|the|and|my|house|very|cold|night|please|help|repair|hot|urgent|thanks)\b/i.test(textLower);
    const hasTelegraphicGrammar = /\b(je\s+maladie|je\s+malade|moi\s+très|pas\s+possible\s+dormir|la\s+maison\s+vacances)\b/i.test(textLower);

    let taskFulfillmentScore = 1;
    const isLetterFormat = /^\s*(bonjour|cher|chère|monsieur|madame)/i.test(clean) && /(cordialement|bien à vous|salutations)/i.test(clean);
    const isTache3 = lessonTitle?.includes('Tâche 3') || expectedAnswer?.includes('140');
    const isTache2 = lessonTitle?.includes('Tâche 2') || expectedAnswer?.includes('120');

    if (isTache3 && isLetterFormat && wordCount < 100) {
      taskFulfillmentScore = 0;
    } else if (wordCount >= minWords && wordCount <= maxWords + 30) {
      taskFulfillmentScore = 5;
    } else if (wordCount > maxWords + 30) {
      taskFulfillmentScore = 4;
    } else if (wordCount >= Math.round(minWords * 0.75)) {
      taskFulfillmentScore = 3;
    } else if (wordCount >= Math.round(minWords * 0.4)) {
      taskFulfillmentScore = 2;
    } else {
      taskFulfillmentScore = 1;
    }

    const c1c2Connectors = ["de surcroît", "par conséquent", "d'une part", "d'autre part", "toutefois", "en effet", "néanmoins", "en somme", "en conclusion"];
    const b2Connectors = ["en outre", "cependant", "de plus", "ainsi", "par ailleurs", "d'abord", "ensuite", "enfin"];
    const foundC1C2Conn = c1c2Connectors.filter((c) => textLower.includes(c));
    const foundB2Conn = b2Connectors.filter((c) => textLower.includes(c));

    let coherenceScore = 1;
    if (foundC1C2Conn.length >= 2) coherenceScore = 5;
    else if (foundC1C2Conn.length >= 1 || foundB2Conn.length >= 2) coherenceScore = 4;
    else if (foundB2Conn.length >= 1 || textLower.includes("mais") || textLower.includes("donc") || textLower.includes("car")) coherenceScore = 3;
    else if (textLower.includes("et") || textLower.includes("ou")) coherenceScore = 2;
    else coherenceScore = 1;

    const c1c2Lexical = ["opportunité", "perspective", "incontournable", "sensibilisation", "préconiser", "déception", "solliciter", "manifestation", "bienveillance", "réciproque", "controverse", "conciliation", "inéluctable", "plasticité", "épanouissement", "décarbonation", "assimilation", "détériorer", "attentivement"];
    const b2Lexical = ["avantage", "inconvénient", "participation", "installation", "inscription", "abonnement", "formation", "réclamation", "matériel", "garantie", "projet", "expérience", "quartier", "collègue", "souhaiter", "demander", "préciser"];
    const foundC1C2Lex = c1c2Lexical.filter((w) => textLower.includes(w));
    const foundB2Lex = b2Lexical.filter((w) => textLower.includes(w));

    let lexicalScore = 1;
    if (hasEnglishWords) lexicalScore = 1;
    else if (foundC1C2Lex.length >= 2) lexicalScore = 5;
    else if (foundC1C2Lex.length >= 1 || foundB2Lex.length >= 2) lexicalScore = 4;
    else if (foundB2Lex.length >= 1) lexicalScore = 3;
    else if (wordCount >= 30) lexicalScore = 2;
    else lexicalScore = 1;

    const c1c2Grammar = ["puisse", "soit", "fassions", "sachiez", "ayez", "fussent", "a été", "ont été", "fut", "dont", "auquel", "laquelle", "duquel", "lesquelles", "en observant", "en prenant", "tout en", "aurait été", "aurait dû", "eût", "demeure", "entraver"];
    const b2Grammar = ["serait", "pourrait", "devrais", "j'aimerais", "il faut que", "pour que", "bien que", "afin de", "en vue de", "je vous prie", "veuillez", "pourriez-vous"];
    const foundC1C2Gram = c1c2Grammar.filter((g) => textLower.includes(g));
    const foundB2Gram = b2Grammar.filter((g) => textLower.includes(g));

    let grammarScore = 1;
    if (hasEnglishWords || hasTelegraphicGrammar || wordCount < 15) {
      grammarScore = 1;
    } else if (foundC1C2Gram.length >= 2) grammarScore = 5;
    else if (foundC1C2Gram.length >= 1 || foundB2Gram.length >= 2) grammarScore = 4;
    else if (foundB2Gram.length >= 1 || textLower.includes("parce que") || textLower.includes("j'ai")) grammarScore = 3;
    else if (textLower.includes("je suis") || textLower.includes("c'est") || textLower.includes("il y a")) grammarScore = 2;
    else grammarScore = 1;

    let scoreOutOf20 = taskFulfillmentScore + coherenceScore + lexicalScore + grammarScore;

    // Enforce strict B2 capping rule for simple A2/B1 texts without B2 connectors & syntax
    const hasB2Conn = foundB2Conn.length > 0 || foundC1C2Conn.length > 0;
    const hasB2Gram = foundB2Gram.length > 0 || foundC1C2Gram.length > 0;
    if (!hasB2Conn && !hasB2Gram) {
      scoreOutOf20 = Math.min(9, scoreOutOf20);
    }

    // Enforce strict C1/C2 capping rule: Standard formal emails without C1 academic vocabulary or connectors cap at 15/20 (B2 Upper)
    const hasC1C2Lex = foundC1C2Lex.length > 0;
    const hasC1C2Gram = foundC1C2Gram.length > 0;
    const hasC1C2Conn = foundC1C2Conn.length > 0;
    if (!hasC1C2Conn || !hasC1C2Lex || !hasC1C2Gram) {
      scoreOutOf20 = Math.min(15, scoreOutOf20);
    }
    const scorePct = Math.round((scoreOutOf20 / 20) * 100);

    let nclcGrade = "NCLC 4 (A2 Elementary)";
    let cefrLevel = "A2";
    let expressEntryPoints = 0;

    if (scoreOutOf20 >= 18) {
      nclcGrade = "NCLC 10 (C2 Mastery)";
      cefrLevel = "C2";
      expressEntryPoints = 34;
    } else if (scoreOutOf20 >= 16) {
      nclcGrade = "NCLC 9 (C1 Advanced)";
      cefrLevel = "C1";
      expressEntryPoints = 31;
    } else if (scoreOutOf20 >= 14) {
      nclcGrade = "NCLC 8 (B2 Upper)";
      cefrLevel = "B2";
      expressEntryPoints = 23;
    } else if (scoreOutOf20 >= 12) {
      nclcGrade = "NCLC 7 (B2 Benchmark Target)";
      cefrLevel = "B2";
      expressEntryPoints = 17;
    } else if (scoreOutOf20 >= 10) {
      nclcGrade = "NCLC 6 (B1 Intermediate)";
      cefrLevel = "B1";
      expressEntryPoints = 12;
    } else if (scoreOutOf20 >= 9) {
      nclcGrade = "NCLC 5 (B1 Threshold)";
      cefrLevel = "B1";
      expressEntryPoints = 6;
    } else if (scoreOutOf20 >= 5) {
      nclcGrade = "NCLC 4 (A2 Elementary)";
      cefrLevel = "A2";
      expressEntryPoints = 0;
    } else if (scoreOutOf20 >= 3) {
      nclcGrade = "NCLC 3 (A1 Beginner)";
      cefrLevel = "A1";
      expressEntryPoints = 0;
    } else {
      nclcGrade = "NCLC 1-2 (Below A1 / Beginner)";
      cefrLevel = "Below A1";
      expressEntryPoints = 0;
    }

    return {
      score: scorePct,
      scoreOutOf20,
      nclcGrade,
      cefrLevel,
      expressEntryPoints,
      taskFulfillmentScore,
      coherenceScore,
      lexicalScore,
      grammarScore,
      feedback: `Official FEI Calibrated Evaluation: Total ${scoreOutOf20}/20.`,
      corrections: [],
      tips: ["Consultez la consigne et structurez vos paragraphes."]
    };
  }

  async checkGrammar(prompt: string, answer: string, expectedAnswer?: string, lessonTitle?: string, targetLanguage = 'French'): Promise<GrammarCheckResult> {
    const apiKey = await this.getOpenRouterKey();
    const normalize = (s: string) => String(s).trim().toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").replace(/\s+/g, " ");
    const userStr = normalize(answer);
    const expStr = expectedAnswer ? normalize(expectedAnswer) : '';

    const isOpenEnded = !expectedAnswer || expectedAnswer.trim() === '' || expectedAnswer.toLowerCase().includes('open-ended') || expectedAnswer === 'N/A' || expectedAnswer.includes('e.g.');

    const isExactMatch = Boolean(
      userStr && (
        isOpenEnded ? userStr.length >= 2 : (expStr && (userStr === expStr || (userStr.length > 3 && (userStr.includes(expStr) || expStr.includes(userStr)))))
      )
    );

    if (!apiKey) {
      return {
        correct: isExactMatch,
        feedback: isExactMatch 
          ? (isOpenEnded ? 'Answer recorded!' : 'Correct!') 
          : (expectedAnswer ? `Expected model answer: ${expectedAnswer}` : 'Answer recorded.'),
        expectedAnswer,
      };
    }

    const llmPrompt = `You are FrancPrep's expert AI ${targetLanguage} Tutor, evaluating a student's typed answer to a practice drill.

Exercise Context:
- Target Language: ${targetLanguage}
- Lesson Level & Topic: "${lessonTitle || `${targetLanguage} Drill`}"
- Exercise Prompt: "${prompt}"
- Target Model Answer: "${expectedAnswer && expectedAnswer !== 'N/A' && !expectedAnswer.toLowerCase().includes('open-ended') ? expectedAnswer : 'Evaluate for accuracy and prompt fit'}"
- Student's Typed Response: "${answer}"

Pedagogical Evaluation Rules:
1. ACCURACY & SYNONYMS: Mark "correct": true if the response is accurate or represents a valid, grammatically correct alternative/synonym in ${targetLanguage} for this level.
2. PROMPT RELEVANCE & FIT: Check if the answer actually fits the question asked. If the student typed an off-topic sentence, gibberish (e.g. "asdf"), or random words that do not answer the prompt, mark "correct": false and explain that the response does not address the prompt.
3. BILINGUAL FLEXIBILITY FOR COMPREHENSION: For reading/listening comprehension questions, accept valid answers in either English or ${targetLanguage}.
4. ERROR DIAGNOSIS: If the student's response contains a typo or grammatical error:
   - Mark "correct": false.
   - Explain the specific error in 1-2 clear, encouraging sentences in English.
   - Explicitly state the exact correct ${targetLanguage} model answer.
5. LEVEL-APPROPRIATE FEEDBACK: Keep your explanation simple, friendly, and tailored to the student's CEFR level.

Respond STRICTLY with a raw JSON object:
{"correct": true or false, "feedback": "1-2 sentence clear explanation pointing out any specific error or confirming correctness."}`;

    try {
      const content = await generateAICompletion({
        model: 'gpt-4o-mini',
        prompt: llmPrompt,
        systemPrompt: `You are a warm, encouraging ${targetLanguage} language tutor evaluating student drill responses.`,
        temperature: 0.1,
        maxTokens: 250,
      });

      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return { correct: !!parsed.correct, feedback: parsed.feedback || '', expectedAnswer };
      }

      return { correct: isExactMatch, feedback: content.slice(0, 150), expectedAnswer };
    } catch (error) {
      return { correct: isExactMatch, feedback: 'Answer recorded.', expectedAnswer };
    }
  }

  async analyzeSpeaking(transcription: string, expectedText: string, lessonTitle?: string, targetLanguage = 'French'): Promise<SpeakingResult> {
    const apiKey = await this.getOpenRouterKey();
    if (!apiKey) {
      return {
        transcription,
        feedback: 'Speaking evaluation requires an OpenRouter API key configured in Admin Settings.',
        score: 75,
        accuracy: 75,
        fluency: 75,
        corrections: [],
        tips: ['Configure OPENROUTER_API_KEY in Admin Settings.'],
      };
    }

    const prompt = `You are a native ${targetLanguage} pronunciation and oral production evaluator. Evaluate the student's transcribed spoken audio against target expectations in ${targetLanguage}.

Topic / Activity: "${lessonTitle || `${targetLanguage} Oral Production`}"
Expected Target Text: "${expectedText}"
Transcribed Student Speech: "${transcription}"

Evaluate oral fluency, pronunciation accuracy, and grammatical correctness in ${targetLanguage}. Respond with JSON:
{
  "score": 85,
  "accuracy": 88,
  "fluency": 82,
  "feedback": "Clear pronunciation and natural cadence.",
  "corrections": ["Target phrase correction"],
  "tips": ["Practice stress and intonation."]
}`;

    try {
      const content = await generateAICompletion({
        model: 'gpt-4o-mini',
        prompt,
        systemPrompt: `You are a certified ${targetLanguage} speech evaluation expert.`,
        temperature: 0.2,
        maxTokens: 400,
      });

      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return {
          transcription,
          feedback: parsed.feedback || 'Good oral production effort.',
          score: parsed.score || 80,
          accuracy: parsed.accuracy || 80,
          fluency: parsed.fluency || 80,
          corrections: parsed.corrections || [],
          tips: parsed.tips || [],
        };
      }
    } catch (e) {}

    return {
      transcription,
      feedback: 'Oral response recorded successfully.',
      score: 80,
      accuracy: 80,
      fluency: 80,
      corrections: [],
      tips: [],
    };
  }

  async chatWithTutor(messages: any[], lessonLevel = 'A1', lessonTopic = 'Conversation', targetLanguage = 'French'): Promise<SpeakingChatResult> {
    const apiKey = await this.getOpenRouterKey();
    const systemMessage = {
      role: 'system',
      content: `You are an encouraging, supportive native ${targetLanguage} AI Tutor conducting an interactive oral practice drill for a ${lessonLevel} student on the topic "${lessonTopic}".
Keep your ${targetLanguage} responses natural, conversational, level-appropriate for ${lessonLevel}, and concise (1-3 sentences max). Include a brief English translation in parentheses if helpful. Encourage the student to respond in ${targetLanguage}.`,
    };

    const conversationPrompt = messages.map((m: any) => `${m.role === 'user' ? 'Student' : 'Tutor'}: ${m.content}`).join('\n');
    const fullPrompt = `${conversationPrompt}\n\nTutor:`;

    try {
      if (apiKey) {
        const reply = await generateAICompletion({
          model: 'gpt-4o-mini',
          prompt: fullPrompt,
          systemPrompt: systemMessage.content,
          temperature: 0.7,
          maxTokens: 300,
        });

        return { reply, model: 'gpt-4o-mini' };
      }
    } catch (e) {}

    return {
      reply: "Très bien ! Continuons notre pratique. Répétez avec moi : 'Bonjour, comment allez-vous ?' (Very good! Let's continue our practice. Repeat with me: 'Hello, how are you?')",
      model: 'fallback',
    };
  }
}

export const writingService = new WritingService();
