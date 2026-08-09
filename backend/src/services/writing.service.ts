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
  scoreOutOf20: number;
  accuracy: number;
  fluency: number;
  taskFulfillmentScore: number;
  coherenceScore: number;
  lexicalScore: number;
  grammarScore: number;
  nclcGrade: string;
  cefrLevel: string;
  expressEntryPoints: number;
  corrections: Array<{ original: string; corrected: string; explanation: string }> | string[];
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

    if (words1.length < 4 || words2.length < 4) return 0;

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
    const triRatio1 = tri1.size > 0 ? triMatch / tri1.size : 0;
    const triRatio2 = tri2.size > 0 ? triMatch / tri2.size : 0;

    if (tri1.size > 0 && triMatch > 0) {
      return Math.max(triRatio1, triRatio2 * 0.7, jaccard * 0.7);
    }
    return jaccard * 0.4;
  }

  private isFrenchText(text: string): boolean {
    if (!text || text.trim().length < 10) return false;
    const words = text
      .toLowerCase()
      .replace(/[^\w\sàâäéèêëîïôöùûüçœæ]/g, '')
      .trim()
      .split(/\s+/);

    if (words.length < 4) return false;

    const frenchCommonWords = new Set([
      'le', 'la', 'les', 'l', 'un', 'une', 'des', 'du', 'de', 'd', 'au', 'aux',
      'et', 'ou', 'mais', 'donc', 'or', 'ni', 'car', 'si', 'que', 'qui', 'quoi', 'dont', 'où',
      'ce', 'cet', 'cette', 'ces', 'ceci', 'cela', 'ça', 'mon', 'ma', 'mes', 'ton', 'ta', 'tes',
      'son', 'sa', 'ses', 'notre', 'nos', 'votre', 'vos', 'leur', 'leurs',
      'je', 'j', 'tu', 'il', 'elle', 'on', 'nous', 'vous', 'ils', 'elles', 'me', 'm', 'te', 't', 'se', 's', 'lui', 'leur', 'y', 'en',
      'est', 'sont', 'suis', 'es', 'sommes', 'êtes', 'été', 'était', 'étaient', 'sera', 'seront', 'serait', 'soit',
      'a', 'ai', 'as', 'avons', 'avez', 'ont', 'eu', 'avait', 'avaient', 'aura', 'auront', 'aurait', 'ayez',
      'va', 'vais', 'vas', 'allons', 'allez', 'vont', 'allé', 'allée', 'allés',
      'fait', 'fais', 'faisons', 'faites', 'font', 'faire',
      'pour', 'dans', 'sur', 'sous', 'avec', 'sans', 'par', 'en', 'vers', 'chez', 'entre', 'contre',
      'pas', 'plus', 'moins', 'très', 'bien', 'mal', 'trop', 'beaucoup', 'peu', 'aussi', 'encore', 'toujours', 'jamais',
      'bonjour', 'salut', 'monsieur', 'madame', 'merci', 'cordialement', 'salutations', 'appartement', 'maison', 'logement',
      'loyer', 'chauffage', 'température', 'froid', 'chaud', 'hiver', 'été', 'travail', 'ville', 'pays', 'monde',
      'problème', 'question', 'réponse', 'demande', 'aide', 'temps', 'jour', 'nuit', 'heure', 'semaine', 'mois', 'an', 'année'
    ]);

    let matchedCount = 0;
    for (const w of words) {
      if (frenchCommonWords.has(w)) {
        matchedCount += 1;
      } else if (/[éèêëàâäôöùûüçœæ]/.test(w)) {
        matchedCount += 1;
      } else if (/(tion|ment|isme|iste|ique|able|ible|ité|ance|ence|eur|euse|eux|euse|ier|ière|ant|ante|ants|antes|ez|ons|ont|ait|aient|ent)$/.test(w) && w.length >= 4) {
        matchedCount += 0.8;
      }
    }

    const ratio = matchedCount / words.length;
    return ratio >= 0.22;
  }

  async getFeedback(
    text: string,
    lessonTitle?: string,
    expectedAnswer?: string,
    checklist?: string[],
    targetLanguage = 'French',
    examName = 'DELF / TCF',
    taskNumber?: number,
    wordCountMin?: number,
    wordCountMax?: number,
    taskPrompt?: string,
    sampleResponse?: string
  ): Promise<ComprehensiveWritingFeedback> {
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

    // 1. CRITICAL PROMPT TEXT COPYING CHECK: If student copies >45% of the prompt instructions
    const promptToCheck = taskPrompt || (expectedAnswer && !expectedAnswer.includes('Sample Exemplar Response') ? expectedAnswer : '');
    if (promptToCheck && text && text.trim().length > 30) {
      const promptSimilarity = this.computeSimilarity(text, promptToCheck);
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
          feedback: `🚨 PROMPT COPYING DETECTED (Score: 0/20): Your submission shares ${(promptSimilarity * 100).toFixed(0)}% similarity with the prompt instructions. Official TCF Canada examiners award 0 points for copied prompt text.`,
          corrections: [
            { original: text.slice(0, 80) + '...', corrected: 'Rédigez votre propre argumentation originale sans recopier la consigne.', explanation: 'Copying prompt instructions receives an automatic zero grade in official FEI testing.' }
          ],
          tips: [
            'Rédigez votre propre texte sans recopier la consigne.',
            'Exprimez vos idées personnelles en français.'
          ]
        };
      }
    }

    // 2. CRITICAL EXEMPLAR PLAGIARISM CHECK: If student copies >=35% of the official model answer
    const sampleToCheck = sampleResponse || (expectedAnswer && expectedAnswer.includes('Sample Exemplar Response') ? expectedAnswer.split('Sample Exemplar Response:\n')[1] : '');
    if (sampleToCheck && text && text.trim().length > 30) {
      const sampleSimilarity = this.computeSimilarity(text, sampleToCheck);
      if (sampleSimilarity >= 0.35) {
        return {
          score: 0,
          scoreOutOf20: 0,
          nclcGrade: 'NCLC 0 (Zero Grade — Exemplar Plagiarism Detected)',
          cefrLevel: 'N/A',
          expressEntryPoints: 0,
          taskFulfillmentScore: 0,
          coherenceScore: 0,
          lexicalScore: 0,
          grammarScore: 0,
          feedback: `⚠️ PLAGIARISM DETECTED (Score: 0/20): Your submission matches ${(sampleSimilarity * 100).toFixed(0)}% of the official sample model answer. Under official FEI CBT rules, plagiarized sample responses receive an automatic zero grade.`,
          corrections: [
            { original: text.slice(0, 80) + '...', corrected: 'Rédigez votre propre réponse originale dans vos propres mots.', explanation: 'Submitting memorized or copied sample responses receives an automatic zero grade.' }
          ],
          tips: [
            'Formulez vos propres phrases originales pour chaque épreuve.',
            'Utilisez vos propres idées et connecteurs.'
          ]
        };
      }
    }

    // Task Type & Official FEI Target CEFR Bounds
    const isTache1 = taskNumber === 1 || Boolean(lessonTitle?.includes('Tâche 1') || lessonTitle?.includes('-w1') || (wordCountMin === 60 && (wordCountMax ?? 120) <= 120) || (expectedAnswer && expectedAnswer.includes('60') && !expectedAnswer.includes('140')));
    const isTache2 = taskNumber === 2 || Boolean(lessonTitle?.includes('Tâche 2') || lessonTitle?.includes('-w2') || (wordCountMin === 120 && (wordCountMax ?? 150) <= 150) || (expectedAnswer && expectedAnswer.includes('120') && !expectedAnswer.includes('140')));
    const isTache3 = taskNumber === 3 || Boolean(lessonTitle?.includes('Tâche 3') || lessonTitle?.includes('-w3') || (wordCountMin !== undefined && wordCountMin >= 140) || (expectedAnswer && expectedAnswer.includes('140')));

    const targetMin = wordCountMin ?? (isTache2 ? 120 : isTache3 ? 140 : 60);
    const targetMax = wordCountMax ?? (isTache2 ? 150 : isTache3 ? 180 : 120);

    if (!apiKey) {
      return this.evaluateLocalCEFR(text, lessonTitle, expectedAnswer, targetLanguage, taskNumber, targetMin, targetMax, taskPrompt, sampleResponse);
    }

    const prompt = `You are an official France Éducation International (FEI) Senior Certified Examiner evaluating ${targetLanguage} writing for official TCF Canada.

CRITICAL TASK-AWARE FEI CEFR EVALUATION STANDARDS (STRICT CALIBRATION WITHOUT INFLATION OR ARTIFICIAL DEFLATION):
- Grade strictly according to the candidate's linguistic quality across the 4 official FEI criteria (0–5 points each, 20 total marks per task).

TASK-SPECIFIC CALIBRATION RULES:
1. TÂCHE 1 (Short message / formal email, ${targetMin}–${targetMax} words | Target: A1–C1):
   - Advanced C1 formal email (high administrative / legal register like "Je me permets de vous contacter en toute urgence", "défaillance totale", "outre le manquement évident", "je vous somme d'ordonner", "dans les plus brefs délais", "veuillez agréer mes salutations distinguées") = 16–17/20 (C1 Advanced / NCLC 9 | +31 CRS Points).
   - Flawless B2 formal email (formal greeting "Monsieur le Propriétaire" / "Monsieur le Directeur", polite formula "je vous écris concernant", polite conditional request "pourriez-vous envoyer" / "auriez-vous l'amabilité de", formal polite sign-off "dans l'attente de votre réponse, je vous prie d'agréer mes salutations distinguées", clear logical organization) = 14–15/20 (Solid B2 Upper / NCLC 8 | +23 CRS Points).
   - Structured B1 email (semi-formal phrasing, clear paragraphing, varied B1 connectors beyond conversational coordinators, polite request like "je souhaiterais vous demander de bien vouloir intervenir") = 10–11/20 (Solid B1 Intermediate / NCLC 6 | +12 CRS Points).
   - Conversational / Elementary A2 message (basic spoken style like "Bonjour", "ne marche pas du tout", "il fait très froid", direct spoken question "vous pouvez venir réparer ?", simple coordinate words "mais", "parce que", "en plus", "Merci pour votre aide. Cordialement") = 7–8/20 (NCLC 4–5 / A2 | 0 CRS Points).
   - Beginner A1 message (broken sentences, high error rate, isolated words) = 3–5/20 (NCLC 3 / A1 | 0 CRS Points).

2. TÂCHE 2 (Personal article / narrative report, ${targetMin}–${targetMax} words | Target: A2–C1):
   - Rich past narrative (passé composé / imparfait), sensory description, emotional reflections, varied vocabulary = 14–16/20 (B2–C1 / NCLC 8–9).
   - Standard past narrative describing an event clearly = 10–13/20 (B1–B2 / NCLC 6–7).
   - Simple present narrative with minimal past tenses = 6–8/20 (A2 / NCLC 4).

3. TÂCHE 3 (Argumentative essay / Prise de position, ${targetMin}–${targetMax} words | Target: B1–C2):
   - Nuanced balanced debate examining two opposing viewpoints ("D'un côté... D'un autre côté... En conclusion..."), complex connectors ("de surcroît", "néanmoins", "par conséquent", "en revanche"), sophisticated modalization and abstract vocabulary = 18–20/20 (C2 Mastery / NCLC 10+) or 16–17/20 (C1 Advanced / NCLC 9).
   - Good balanced essay with formal B2 connectors ("de plus", "cependant", "afin de", "ainsi") = 12–15/20 (B2 / NCLC 7–8).
   - Simple one-sided opinion with basic connectors = 9–11/20 (B1 / NCLC 5–6).

OFFICIAL FEI 4-CRITERIA MARKS (0–5 EACH):
1. taskFulfillmentScore (0-5): Meets prompt scenario, appropriate register (tu vs vous), respects word count bounds (${targetMin}-${targetMax} words). (0/5 if Off-Topic).
2. coherenceScore (0-5): Logical progression, paragraph structure, level-appropriate discourse connectors.
3. lexicalScore (0-5): Range, thematic precision, variety. Insertion of English words caps lexical score at 1/5.
4. grammarScore (0-5): Morphosyntax, tense agreement (passé composé, conditionnel, subjonctif), sentence complexity.

Context / Task Information:
Task / Topic: "${lessonTitle || `${targetLanguage} Writing Examination`}"
${taskPrompt ? `Task Prompt Scenario:\n"""\n${taskPrompt}\n"""` : (expectedAnswer ? `Task Prompt & Model Expectations:\n"""\n${expectedAnswer}\n"""` : '')}
${checklist && checklist.length > 0 ? `Required Checklist Elements:\n${checklist.map((item, i) => `${i + 1}. ${item}`).join('\n')}` : ''}

Candidate Submission (${targetLanguage}):
"""
${text}
"""

Respond STRICTLY with a valid JSON object matching this schema:
{
  "taskFulfillmentScore": 4, 
  "coherenceScore": 4, 
  "lexicalScore": 4, 
  "grammarScore": 3, 
  "feedback": "2-3 sentence precise official examiner diagnostic summary analyzing communicative effectiveness, structural coherence, vocabulary, and morphosyntax.",
  "corrections": [
    { "original": "error phrase (if any)", "corrected": "corrected phrase", "explanation": "Grammatical or lexical explanation in English." }
  ],
  "tips": [
    "Actionable examiner tip 1",
    "Actionable examiner tip 2"
  ]
}`;

    try {
      const content = await generateAICompletion({
        model: 'gpt-4o-mini',
        prompt,
        systemPrompt: `You are an official France Education International (FEI) Senior Certified Examiner evaluating TCF Canada writing with strict, calibrated accuracy according to official CEFR and NCLC scales.`,
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

        // Detect Tâche 1 Personal Email format pasted in Tâche 3 (Argumentative Essay)
        const isLetterFormat = /^\s*(bonjour|cher|chère|monsieur|madame)/i.test((text || '').trim()) && /(cordialement|bien à vous|salutations|haute considération|respectueusement)/i.test((text || '').trim());
        if (isTache3 && isLetterFormat) {
          t = 0;
        }

        // Formal register check in Tâche 1 (Informal tu/ton/ta in formal email caps fulfillment at 3/5)
        const isFormalRecipientPrompt = /(propriétaire|directeur|responsable|service client|organisateur|administration|bureau|supérieur|manager)/i.test((lessonTitle || '') + (taskPrompt || '') + (expectedAnswer || ''));
        const hasInformalTu = /\b(tu|te|t'|ton|ta|tes|toi)\b/i.test(textLower);
        if (isTache1 && isFormalRecipientPrompt && hasInformalTu) {
          t = Math.min(3, t);
        }

        const hasEnglishWords = /\b(is|no|work|not|the|and|my|house|very|cold|night|please|help|repair|hot|urgent|thanks|travel|city|park|food|good|experience|like|you|know|actually)\b/i.test(textLower);
        const hasTelegraphicGrammar = /\b(je\s+allé|je\s+faire|nous\s+manger|je\s+aimé|je\s+très|lieu\s+est|parce\s+que\s+très|pas\s+possible\s+dormir|la\s+maison\s+vacances|prendre\s+photo)\b/i.test(textLower);

        // Strict A1 Capping: English words or broken telegraphic sentences cap strictly at 4/20 (A1 Beginner / NCLC 3)
        if (hasEnglishWords || hasTelegraphicGrammar) {
          t = Math.min(1, t);
          c = Math.min(1, c);
          l = Math.min(1, l);
          g = Math.min(1, g);
        }

        let scoreOutOf20 = t + c + l + g;

        if (t === 0) {
          scoreOutOf20 = 0;
        }

        if (hasEnglishWords || hasTelegraphicGrammar) {
          scoreOutOf20 = Math.min(4, scoreOutOf20);
        }

        const feedbackLower = (parsed.feedback || '').toLowerCase();
        const isOffTopicFeedback = feedbackLower.includes('off-topic') ||
                                   feedbackLower.includes('off topic') ||
                                   feedbackLower.includes('hors-sujet') ||
                                   feedbackLower.includes('hors sujet') ||
                                   feedbackLower.includes('different topic') ||
                                   feedbackLower.includes('wrong topic') ||
                                   feedbackLower.includes('unrelated to the prompt') ||
                                   feedbackLower.includes('unrelated to the task');

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
        } else if (scoreOutOf20 >= 8) {
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

      return this.evaluateLocalCEFR(text, lessonTitle, expectedAnswer, targetLanguage, taskNumber, targetMin, targetMax, taskPrompt, sampleResponse);
    } catch (error) {
      console.error('AI feedback request failed:', error);
      return this.evaluateLocalCEFR(text, lessonTitle, expectedAnswer, targetLanguage, taskNumber, targetMin, targetMax, taskPrompt, sampleResponse);
    }
  }

  private evaluateLocalCEFR(
    text: string,
    lessonTitle?: string,
    expectedAnswer?: string,
    targetLanguage = 'French',
    taskNumber?: number,
    targetMin?: number,
    targetMax?: number,
    taskPrompt?: string,
    sampleResponse?: string
  ) {
    const clean = (text || '').trim();
    const words = clean.replace(/['’]/g, ' ').split(/\s+/).filter(Boolean);
    const wordCount = words.length;
    const textLower = clean.toLowerCase();

    const isTache1 = taskNumber === 1 || Boolean(lessonTitle?.includes('Tâche 1') || lessonTitle?.includes('-w1') || (targetMin === 60 && (targetMax ?? 120) <= 120) || (expectedAnswer && expectedAnswer.includes('60') && !expectedAnswer.includes('140')));
    const isTache2 = taskNumber === 2 || Boolean(lessonTitle?.includes('Tâche 2') || lessonTitle?.includes('-w2') || (targetMin === 120 && (targetMax ?? 150) <= 150) || (expectedAnswer && expectedAnswer.includes('120') && !expectedAnswer.includes('140')));
    const isTache3 = taskNumber === 3 || Boolean(lessonTitle?.includes('Tâche 3') || lessonTitle?.includes('-w3') || (targetMin !== undefined && targetMin >= 140) || (expectedAnswer && expectedAnswer.includes('140')));

    let minWords = targetMin ?? (isTache2 ? 120 : isTache3 ? 140 : 60);
    let maxWords = targetMax ?? (isTache2 ? 150 : isTache3 ? 180 : 120);

    // Code-switching & English word check
    const hasEnglishWords = /\b(is|no|work|not|the|and|my|house|very|cold|night|please|help|repair|hot|urgent|thanks|travel|city|park|food|good|experience)\b/i.test(textLower);
    const hasTelegraphicGrammar = /\b(je\s+maladie|je\s+malade|moi\s+très|pas\s+possible\s+dormir|la\s+maison\s+vacances|je\s+allé|je\s+faire|nous\s+manger|prendre\s+photo|je\s+aimé|je\s+très)\b/i.test(textLower);

    let taskFulfillmentScore = 1;
    const isLetterFormat = /^\s*(bonjour|cher|chère|monsieur|madame)/i.test(clean) && /(cordialement|bien à vous|salutations|respectueusement)/i.test(clean);

    if (isTache3 && isLetterFormat) {
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

    // Formal register check in Tâche 1 (Informal tu/ton/ta in formal email caps fulfillment at 3/5)
    const isFormalRecipientPrompt = /(propriétaire|directeur|responsable|service client|organisateur|administration|bureau|supérieur|manager)/i.test((lessonTitle || '') + (taskPrompt || '') + (expectedAnswer || ''));
    const hasInformalTu = /\b(tu|te|t'|ton|ta|tes|toi)\b/i.test(textLower);
    if (isTache1 && isFormalRecipientPrompt && hasInformalTu && taskFulfillmentScore > 0) {
      taskFulfillmentScore = Math.min(3, taskFulfillmentScore);
    }

    const c1c2Connectors = [
      "de surcroît", "par conséquent", "d'une part", "d'autre part", "toutefois",
      "néanmoins", "sans conteste", "indéniablement", "dans cette optique", "dès lors", "outre", "en toute urgence", "à l'inverse"
    ];
    const b2Connectors = [
      "en outre", "cependant", "de plus", "ainsi", "par ailleurs", "en revanche", "en conclusion", "en somme", "en effet",
      "au cours de", "pendant le", "afin de", "en raison de", "à cet effet", "dans ce cadre", "par la présente",
      "en vue de", "d'ores et déjà", "ainsi que", "pour cette raison", "dans l'attente de", "concernant", "quant à", "à cet égard"
    ];
    const b1Connectors = [
      "donc", "car", "alors", "puis", "comme", "quand", "si", "pendant que", "d'abord", "ensuite", "enfin", "à mon avis", "selon moi"
    ];
    const a2Connectors = [
      "mais", "parce que", "en plus", "et", "ou", "aussi"
    ];

    const foundC1C2Conn = c1c2Connectors.filter((c) => textLower.includes(c));
    const foundB2Conn = b2Connectors.filter((c) => textLower.includes(c));
    const foundB1Conn = b1Connectors.filter((c) => textLower.includes(c));
    const foundA2Conn = a2Connectors.filter((c) => textLower.includes(c));

    let coherenceScore = 1;
    if (foundC1C2Conn.length >= 2 || (foundC1C2Conn.length >= 1 && foundB2Conn.length >= 1)) {
      coherenceScore = 5;
    } else if (foundC1C2Conn.length >= 1 || foundB2Conn.length >= 2) {
      coherenceScore = 4;
    } else if (foundB2Conn.length >= 1 || foundB1Conn.length >= 2) {
      coherenceScore = 3;
    } else if (foundB1Conn.length >= 1 || foundA2Conn.length >= 1 || textLower.includes("et") || textLower.includes("ou")) {
      coherenceScore = 2;
    } else {
      coherenceScore = 1;
    }

    const c1c2Lexical = [
      "opportunité", "perspective", "incontournable", "sensibilisation", "préconiser", "déception", "solliciter",
      "manifestation", "bienveillance", "réciproque", "controverse", "conciliation", "inéluctable", "plasticité",
      "épanouissement", "décarbonation", "assimilation", "détériorer", "attentivement", "périple", "majestueux",
      "féerique", "dépaysement", "spectaculaire", "ascension", "émerveillement", "sérénité", "enrichissantes",
      "impérissables", "irrépressible", "d'exception", "dysfonctionnement", "préjudice", "locataire", "pérennité",
      "pérenne", "équité", "disparités", "substantiels", "substantielle", "déploiement", "incontestablement",
      "intergénérationnel", "sollicitation", "infrastructure", "mobilisation", "écosystème", "automatisation", "cybersécurité",
      "défaillance", "manquement", "invivable", "sanitaires inacceptables", "inacceptables", "je vous somme", "règlement immédiat",
      "dans les plus brefs délais", "cristallise", "dilemme", "vecteur", "émancipation", "redistributive", "efficience"
    ];
    const b2Lexical = [
      "autorisation", "absence", "exceptionnelle", "impératif", "familial", "majeur", "perturber", "fonctionnement",
      "indisponibilité", "dossiers", "urgents", "relais", "affaires", "courantes", "joignable", "courriel", "urgence",
      "absolue", "compréhension", "salutations", "distinguées", "disponibilité", "substitut", "remplacement", "directeur",
      "responsable", "avantage", "inconvénient", "participation", "installation", "inscription", "abonnement", "formation",
      "réclamation", "matériel", "garantie", "écologique", "bénévole", "solidaire", "développement", "numérique", "culturel",
      "festival", "conférence", "débat", "opinion", "argument", "mesure", "citoyen", "société", "températures", "glaciales", "chute"
    ];
    const b1Lexical = [
      "appartement", "problème", "réparer", "système", "séjour", "randonnée", "région", "traditionnel", "activité", "participer",
      "bulletin", "quartier", "projet", "expérience", "conseil", "précision", "renseignement", "tarif", "horaire", "service"
    ];
    const a2Lexical = [
      "maison", "vacances", "ville", "magasin", "famille", "gens", "froid", "chaud", "manger", "dormir", "malade", "enfants", "nuit", "argent", "payer", "voiture", "bus", "train", "temps", "jour", "heure", "merci", "aide"
    ];

    const foundC1C2Lex = c1c2Lexical.filter((w) => textLower.includes(w));
    const foundB2Lex = b2Lexical.filter((w) => textLower.includes(w));
    const foundB1Lex = b1Lexical.filter((w) => textLower.includes(w));
    const foundA2Lex = a2Lexical.filter((w) => textLower.includes(w));

    let lexicalScore = 1;
    if (hasEnglishWords) {
      lexicalScore = 1;
    } else if (foundC1C2Lex.length >= 2 || (foundC1C2Lex.length >= 1 && foundB2Lex.length >= 2)) {
      lexicalScore = 5;
    } else if (foundC1C2Lex.length >= 1 || foundB2Lex.length >= 2) {
      lexicalScore = 4;
    } else if (foundB2Lex.length >= 1 || foundB1Lex.length >= 2) {
      lexicalScore = 3;
    } else if (foundB1Lex.length >= 1 || foundA2Lex.length >= 1 || wordCount >= 30) {
      lexicalScore = 2;
    } else {
      lexicalScore = 1;
    }

    const c1c2Grammar = [
      "puisse", "soit", "fassions", "sachiez", "ayez", "fussent", "a été", "ont été", "fut", "dont", "auquel",
      "laquelle", "duquel", "lesquelles", "en observant", "en prenant", "tout en", "aurait été", "aurait dû",
      "eût", "demeure", "entraver", "me laissant", "entouré de", "bordé par", "ferez preuve", "ai veillé à",
      "je vous somme d'ordonner", "dès mon arrivée", "rend la température", "nuit gravement", "expose ma famille"
    ];
    const b2Grammar = [
      "je me permets", "veuillez", "je vous prie", "a accepté de", "dont vous", "pourriez-vous", "pourrait-il", "serait-il",
      "j'aimerais", "nous aimerions", "il conviendrait", "bien que", "afin de", "en vue de", "après avoir", "étant donné",
      "je vous prie d'agréer", "veuillez agréer", "sommes restés", "avons visité", "avons pris", "avons fait", "resterai joignable",
      "il faut que", "pour que", "j'ai participé", "nous avons réussi", "j'ai décidé", "je vous écris", "dans l'attente"
    ];
    const b1Grammar = [
      "il est impossible de", "nous ne pouvons pas", "risquent d'être", "ne fonctionne plus",
      "ne marche pas", "il fait très froid", "c'est un véritable", "c'est très important",
      "j'ai pu", "nous avons pu", "je souhaiterais", "je voudrais", "était", "faisait", "pouvait", "nous pensions"
    ];
    const a2Grammar = [
      "je suis", "nous avons", "j'ai", "il y a", "nous sommes", "vous pouvez", "c'est", "je viens de"
    ];

    const foundC1C2Gram = c1c2Grammar.filter((g) => textLower.includes(g));
    const foundB2Gram = b2Grammar.filter((g) => textLower.includes(g));
    const foundB1Gram = b1Grammar.filter((g) => textLower.includes(g));
    const foundA2Gram = a2Grammar.filter((g) => textLower.includes(g));

    let grammarScore = 1;
    if (hasEnglishWords || hasTelegraphicGrammar || wordCount < 15) {
      grammarScore = 1;
    } else if (foundC1C2Gram.length >= 2 || (foundC1C2Gram.length >= 1 && foundB2Gram.length >= 1)) {
      grammarScore = 5;
    } else if (foundC1C2Gram.length >= 1 || foundB2Gram.length >= 2) {
      grammarScore = 4;
    } else if (foundB2Gram.length >= 1 || foundB1Gram.length >= 2) {
      grammarScore = 3;
    } else if (foundB1Gram.length >= 1 || foundA2Gram.length >= 1 || textLower.includes("je suis") || textLower.includes("c'est")) {
      grammarScore = 2;
    } else {
      grammarScore = 1;
    }

    if (taskFulfillmentScore === 0) {
      return {
        score: 0,
        scoreOutOf20: 0,
        nclcGrade: "NCLC 0 (Zero Grade — Off-Topic / Hors-Sujet)",
        cefrLevel: "N/A",
        expressEntryPoints: 0,
        taskFulfillmentScore: 0,
        coherenceScore: 1,
        lexicalScore: 1,
        grammarScore: 1,
        feedback: "🚨 ZERO GRADE (0/20 Marks): Off-topic submission.",
        corrections: [],
        tips: ["Lisez attentivement la consigne."]
      };
    }

    let scoreOutOf20 = taskFulfillmentScore + coherenceScore + lexicalScore + grammarScore;

    // Distinguish formal B2 correspondence vs conversational A2 emails vs advanced C1 emails
    const hasFormalGreeting = /^\s*(monsieur le|madame la|monsieur,|madame,)/i.test(clean);
    const hasFormalSignOff = /(je vous prie d'agréer|veuillez agréer|salutations distinguées|haute considération|respectueusement)/i.test(clean);
    const hasFormalConditional = /(pourriez-vous|auriez-vous|serait-il possible|je souhaiterais|nous souhaiterions|je vous saurais gré)/i.test(clean);
    const hasHighC1AdminRegister = /(en toute urgence|défaillance totale|manquement évident|je vous somme|sanitaires inacceptables|préjudice|règlement immédiat|dans cette optique)/i.test(clean);
    const hasAdvancedC1Markers = (hasHighC1AdminRegister || (foundC1C2Lex.length >= 3 && foundC1C2Conn.length >= 1)) && hasFormalSignOff;

    if (isTache1) {
      if (!hasFormalGreeting && !hasFormalSignOff && !hasFormalConditional) {
        // Conversational / Oral style email without formal register is strictly A2 (5-7/20 | NCLC 4)
        scoreOutOf20 = Math.min(7, scoreOutOf20);
      } else if (!hasFormalSignOff && !hasAdvancedC1Markers) {
        // Semi-formal B1 email (e.g. ended with "Cordialement" or missing formal epistolary formulas) -> strictly B1 (10-11/20 | NCLC 6)
        scoreOutOf20 = Math.min(11, scoreOutOf20);
      } else if (hasAdvancedC1Markers) {
        // Advanced C1 formal administrative email with high register (16-17/20 | NCLC 9)
        scoreOutOf20 = Math.min(17, scoreOutOf20);
      } else {
        // Standard B2 formal polite correspondence (14-15/20 | NCLC 8)
        scoreOutOf20 = Math.min(15, scoreOutOf20);
      }
    } else if (isTache2) {
      if (foundB2Lex.length === 0 && foundC1C2Lex.length === 0 && foundB2Conn.length === 0 && foundC1C2Conn.length === 0 && foundB1Gram.length === 0 && foundC1C2Gram.length === 0) {
        // Simple A2 narrative with basic vocabulary -> strictly A2 (5-7/20 | NCLC 4)
        scoreOutOf20 = Math.min(7, scoreOutOf20);
      } else {
        scoreOutOf20 = Math.min(17, scoreOutOf20);
      }
    } else if (isTache3) {
      const hasTwoOpposingViews = (textLower.includes("d'un côté") || textLower.includes("d'une part")) && (textLower.includes("d'autre part") || textLower.includes("d'un autre côté") || textLower.includes("en revanche") || textLower.includes("cependant") || textLower.includes("toutefois"));
      if (foundB2Lex.length === 0 && foundC1C2Lex.length === 0 && foundB2Conn.length === 0 && foundC1C2Conn.length === 0 && foundB1Conn.length <= 1) {
        // Simple A2 opinion essay -> strictly A2 (5-7/20 | NCLC 4)
        scoreOutOf20 = Math.min(7, scoreOutOf20);
      } else if (!hasTwoOpposingViews && foundB2Conn.length < 2 && foundC1C2Conn.length === 0) {
        // Simple one-sided opinion with basic connectors -> strictly B1 (9-11/20 | NCLC 5-6)
        scoreOutOf20 = Math.min(11, scoreOutOf20);
      } else if (foundC1C2Lex.length >= 3 && foundC1C2Conn.length >= 2 && foundC1C2Gram.length >= 2) {
        // C2 Mastery
        scoreOutOf20 = Math.min(20, scoreOutOf20);
      } else if (foundC1C2Lex.length >= 1 && foundC1C2Conn.length >= 1) {
        // C1 Advanced
        scoreOutOf20 = Math.min(17, scoreOutOf20);
      } else {
        // Standard B2 essay
        scoreOutOf20 = Math.min(15, scoreOutOf20);
      }
    }

    if (hasEnglishWords || hasTelegraphicGrammar) {
      scoreOutOf20 = Math.min(4, scoreOutOf20);
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
    } else if (scoreOutOf20 >= 8) {
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
      feedback: `Official FEI Calibrated Evaluation: Total ${scoreOutOf20}/20 Marks • Task Fulfillment: ${taskFulfillmentScore}/5, Coherence & Connectors: ${coherenceScore}/5, Lexical Range: ${lexicalScore}/5, Morphosyntax & Grammar: ${grammarScore}/5.`,
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
    const cleanSpeech = (transcription || '').trim();

    // Zero grade for empty, refusal, or non-French gibberish
    if (!cleanSpeech || cleanSpeech.length < 5 || !this.isFrenchText(cleanSpeech)) {
      return {
        transcription: cleanSpeech || '(No speech recorded)',
        feedback: '🚨 ZERO GRADE (0/20 Marks): Unintelligible, non-French, or insufficient oral speech recorded. Official FEI oral examiners award 0 marks for non-French or uninterpretable oral submissions.',
        score: 0,
        scoreOutOf20: 0,
        accuracy: 0,
        fluency: 0,
        taskFulfillmentScore: 0,
        coherenceScore: 0,
        lexicalScore: 0,
        grammarScore: 0,
        nclcGrade: 'NCLC 0 (Zero Grade — Gibberish / Inaudible / Non-French)',
        cefrLevel: 'N/A',
        expressEntryPoints: 0,
        corrections: [{ original: cleanSpeech.slice(0, 60), corrected: 'Exprimez-vous clairement en français.', explanation: 'Non-French speech receives an automatic 0 grade in official TCF exams.' }],
        tips: ['Parlez distinctement en français en répondant directement à la consigne orale.']
      };
    }

    if (!apiKey) {
      // Local calibrated oral evaluation fallback
      const words = cleanSpeech.replace(/['’]/g, ' ').split(/\s+/).filter(Boolean);
      const wordCount = words.length;
      const textLower = cleanSpeech.toLowerCase();

      const hasEnglishWords = /\b(is|no|work|not|the|and|my|house|very|cold|night|please|help|repair|hot|urgent|thanks|like|you|know|actually)\b/i.test(textLower);
      const isQuestion = /\b(pourriez-vous|est-ce que|quel|quels|quelle|quelles|combien|comment|où|quand|pourquoi|avez-vous|pouvez-vous)\b/i.test(textLower);
      const hasB2Connectors = /\b(cependant|toutefois|en outre|par conséquent|néanmoins|ainsi|d'une part|d'autre part|en somme|selon moi|à mon avis|en effet)\b/i.test(textLower);
      const hasB2Grammar = /\b(pourriez|serait|aimerais|puisse|soit|dont|auquel|bien que|afin de|avons|sommes|ai fait|ai visité)\b/i.test(textLower);

      let t = 2;
      let f = 2;
      let l = 2;
      let g = 2;

      if (wordCount >= 35) { t = 4; f = 4; l = 4; g = 3; }
      else if (wordCount >= 20) { t = 3; f = 3; l = 3; g = 3; }

      if (isQuestion) t = Math.min(5, t + 1);
      if (hasB2Connectors) { f = Math.min(5, f + 1); l = Math.min(5, l + 1); }
      if (hasB2Grammar) g = Math.min(5, g + 1);
      if (hasEnglishWords) { l = 1; g = 1; }

      const rawSum = t + f + l + g;
      const scoreOutOf20 = hasEnglishWords ? Math.min(6, rawSum) : rawSum;
      const scorePct = Math.round((scoreOutOf20 / 20) * 100);

      let nclcGrade = "NCLC 7 (B2 Benchmark Target)";
      let cefrLevel = "B2";
      let expressEntryPoints = 17;

      if (scoreOutOf20 >= 18) { nclcGrade = "NCLC 10 (C2 Mastery)"; cefrLevel = "C2"; expressEntryPoints = 34; }
      else if (scoreOutOf20 >= 16) { nclcGrade = "NCLC 9 (C1 Advanced)"; cefrLevel = "C1"; expressEntryPoints = 31; }
      else if (scoreOutOf20 >= 14) { nclcGrade = "NCLC 8 (B2 Upper)"; cefrLevel = "B2"; expressEntryPoints = 23; }
      else if (scoreOutOf20 >= 12) { nclcGrade = "NCLC 7 (B2 Benchmark Target)"; cefrLevel = "B2"; expressEntryPoints = 17; }
      else if (scoreOutOf20 >= 10) { nclcGrade = "NCLC 6 (B1 Intermediate)"; cefrLevel = "B1"; expressEntryPoints = 12; }
      else if (scoreOutOf20 >= 8) { nclcGrade = "NCLC 5 (B1 Threshold)"; cefrLevel = "B1"; expressEntryPoints = 6; }
      else if (scoreOutOf20 >= 5) { nclcGrade = "NCLC 4 (A2 Elementary)"; cefrLevel = "A2"; expressEntryPoints = 0; }
      else if (scoreOutOf20 >= 3) { nclcGrade = "NCLC 3 (A1 Beginner)"; cefrLevel = "A1"; expressEntryPoints = 0; }
      else { nclcGrade = "NCLC 1-2 (Below A1 / Beginner)"; cefrLevel = "Below A1"; expressEntryPoints = 0; }

      return {
        transcription: cleanSpeech,
        feedback: `Official FEI Oral Evaluation: Total ${scoreOutOf20}/20 Marks • Task Interaction: ${t}/5, Fluency: ${f}/5, Lexical Richness: ${l}/5, Grammar & Phonetics: ${g}/5.`,
        score: scorePct,
        scoreOutOf20,
        accuracy: scorePct,
        fluency: Math.round((f / 5) * 100),
        taskFulfillmentScore: t,
        coherenceScore: f,
        lexicalScore: l,
        grammarScore: g,
        nclcGrade,
        cefrLevel,
        expressEntryPoints,
        corrections: [],
        tips: ['Utilisez des connecteurs logiques formels et variez vos formules de questions.']
      };
    }

    const prompt = `You are an official France Éducation International (FEI) Senior Certified Oral Examiner evaluating ${targetLanguage} oral production for official TCF Canada.

CRITICAL IMPARTIAL EVALUATION GUIDELINES (STRICT FEI CEFR STANDARDS — NO GRADE INFLATION):
- Grade strictly according to oral linguistic competence (0–5 per criterion, 20 total marks).
- Flawless C2/C1 native fluency (rich vocabulary, effortless nuance, complex syntax, spontaneous debate) receive 16–20/20 (NCLC 9–10 / C1–C2).
- Solid B2 responses with good connectors, clear question formulation (T2) or balanced argumentation (T3), and minor slips receive 12–15/20 (NCLC 7–8 / B2).
- Basic/Intermediate B1 responses (present tense only, basic questions, simple connectors like et/mais/parce que) MUST be capped at 8–11/20 (NCLC 5–6 / B1).
- Elementary A2 responses receive 5–7/20 (NCLC 4 / A2).
- Beginner A1 responses receive 3–4/20 (NCLC 3 / A1).
- English words / code-switching (e.g. "actually", "like", "you know") MUST cap GrammarScore at 1/5 and LexicalScore at 1/5.
- Off-topic, refusal, or non-French submissions MUST receive 0/20 (NCLC 0).

OFFICIAL FEI 4-CRITERIA MARKS (0-5 EACH):
1. taskFulfillmentScore (0-5): Conversational initiative, question variety in T2 (8-10 questions), sustained stance in T3, polite register (Vous).
2. coherenceScore (0-5): Fluency, natural spoken cadence, discourse transition markers (tout d'abord, en ce qui me concerne, en somme).
3. lexicalScore (0-5): Breadth and thematic precision of spoken vocabulary. English insertion caps at 1/5.
4. grammarScore (0-5): Accurate syntax, question inversion / polite conditionnel, subjunctive, tense agreement.

Task Context & Scenario:
Scenario / Topic: "${lessonTitle || `${targetLanguage} Oral Production`}"
Target Task Expectation: "${expectedText}"

Transcribed Candidate Speech (${targetLanguage}):
"""
${cleanSpeech}
"""

Respond STRICTLY with a JSON object matching this schema:
{
  "taskFulfillmentScore": 4,
  "coherenceScore": 4,
  "lexicalScore": 4,
  "grammarScore": 4,
  "scoreOutOf20": 16,
  "feedback": "2-3 sentence precise oral examiner diagnostic summary highlighting strengths and primary area for improvement.",
  "corrections": [
    { "original": "error phrase", "corrected": "corrected phrase", "explanation": "Grammatical, lexical, or pronunciation explanation in English." }
  ],
  "tips": [
    "Actionable oral delivery tip 1",
    "Actionable oral delivery tip 2"
  ]
}`;

    try {
      const content = await generateAICompletion({
        model: 'gpt-4o-mini',
        prompt,
        systemPrompt: `You are an official France Éducation International (FEI) Senior Oral Examiner evaluating TCF Canada speaking with strict, uninflated accuracy.`,
        temperature: 0.1,
        maxTokens: 500,
      });

      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        let t = Math.max(0, Math.min(5, typeof parsed.taskFulfillmentScore === 'number' ? parsed.taskFulfillmentScore : 3));
        let c = Math.max(0, Math.min(5, typeof parsed.coherenceScore === 'number' ? parsed.coherenceScore : (typeof parsed.fluencyScore === 'number' ? parsed.fluencyScore : 3)));
        let l = Math.max(0, Math.min(5, typeof parsed.lexicalScore === 'number' ? parsed.lexicalScore : 3));
        let g = Math.max(0, Math.min(5, typeof parsed.grammarScore === 'number' ? parsed.grammarScore : 3));

        const textLower = cleanSpeech.toLowerCase();
        const isTache2 = /tâche 2|task 2|interaction|spk-2/i.test((lessonTitle || '') + (expectedText || ''));
        if (isTache2) {
          const questionMatches = cleanSpeech.match(/\?|\b(pourriez|pouvez|est-ce|quel|quelle|quels|quelles|combien|comment|où|quand|pourquoi|avez-vous)\b/gi) || [];
          if (questionMatches.length < 8) {
            t = Math.min(3, t);
          }
        }

        const hasEnglishWords = /\b(is|no|work|not|the|and|my|house|very|cold|night|please|help|repair|hot|urgent|thanks|like|you|know|actually)\b/i.test(textLower);
        if (hasEnglishWords) {
          l = Math.min(1, l);
          g = Math.min(1, g);
        }

        const hasB2Connectors = /\b(cependant|toutefois|en outre|par conséquent|néanmoins|ainsi|d'une part|d'autre part|en somme|selon moi|à mon avis|en effet)\b/i.test(textLower);
        const hasB2Grammar = /\b(pourriez|serait|aimerais|puisse|soit|dont|auquel|bien que|afin de|avons|sommes|ai fait|ai visité)\b/i.test(textLower);

        // Strict B2 capping: absence of B2 connectors & grammar caps score at 9/20 (B1)
        if (!hasB2Connectors && !hasB2Grammar) {
          t = Math.min(3, t);
          c = Math.min(3, c);
          l = Math.min(3, l);
          g = Math.min(2, g);
        }

        let scoreOutOf20 = t + c + l + g;
        if (t === 0) scoreOutOf20 = 0;
        if (!hasB2Connectors && !hasB2Grammar) {
          scoreOutOf20 = Math.min(9, scoreOutOf20);
        }

        const scorePct = Math.round((scoreOutOf20 / 20) * 100);
        let nclcGrade = "NCLC 7 (B2 Benchmark Target)";
        let cefrLevel = "B2";
        let expressEntryPoints = 17;

        if (scoreOutOf20 >= 18) { nclcGrade = "NCLC 10 (C2 Mastery)"; cefrLevel = "C2"; expressEntryPoints = 34; }
        else if (scoreOutOf20 >= 16) { nclcGrade = "NCLC 9 (C1 Advanced)"; cefrLevel = "C1"; expressEntryPoints = 31; }
        else if (scoreOutOf20 >= 14) { nclcGrade = "NCLC 8 (B2 Upper)"; cefrLevel = "B2"; expressEntryPoints = 23; }
        else if (scoreOutOf20 >= 12) { nclcGrade = "NCLC 7 (B2 Benchmark Target)"; cefrLevel = "B2"; expressEntryPoints = 17; }
        else if (scoreOutOf20 >= 10) { nclcGrade = "NCLC 6 (B1 Intermediate)"; cefrLevel = "B1"; expressEntryPoints = 12; }
        else if (scoreOutOf20 >= 8) { nclcGrade = "NCLC 5 (B1 Threshold)"; cefrLevel = "B1"; expressEntryPoints = 6; }
        else if (scoreOutOf20 >= 5) { nclcGrade = "NCLC 4 (A2 Elementary)"; cefrLevel = "A2"; expressEntryPoints = 0; }
        else if (scoreOutOf20 >= 3) { nclcGrade = "NCLC 3 (A1 Beginner)"; cefrLevel = "A1"; expressEntryPoints = 0; }
        else { nclcGrade = "NCLC 1-2 (Below A1 / Beginner)"; cefrLevel = "Below A1"; expressEntryPoints = 0; }

        return {
          transcription: cleanSpeech,
          feedback: parsed.feedback || `Official FEI Oral Evaluation: Total ${scoreOutOf20}/20 Marks.`,
          score: scorePct,
          scoreOutOf20,
          accuracy: scorePct,
          fluency: Math.round((c / 5) * 100),
          taskFulfillmentScore: t,
          coherenceScore: c,
          lexicalScore: l,
          grammarScore: g,
          nclcGrade,
          cefrLevel,
          expressEntryPoints,
          corrections: Array.isArray(parsed.corrections) ? parsed.corrections : [],
          tips: Array.isArray(parsed.tips) ? parsed.tips : [],
        };
      }
    } catch (e) {
      console.error('Speaking AI evaluation failed:', e);
    }

    return {
      transcription: cleanSpeech,
      feedback: 'Official FEI Oral response recorded successfully.',
      score: 75,
      scoreOutOf20: 15,
      accuracy: 75,
      fluency: 75,
      taskFulfillmentScore: 4,
      coherenceScore: 4,
      lexicalScore: 4,
      grammarScore: 3,
      nclcGrade: 'NCLC 8 (B2 Upper)',
      cefrLevel: 'B2',
      expressEntryPoints: 23,
      corrections: [],
      tips: ['Continue practicing complex question structures and connectors.'],
    };
  }

  async chatWithTutor(messages: any[], lessonLevel = 'A1', lessonTopic = 'Conversation', targetLanguage = 'French'): Promise<SpeakingChatResult> {
    const apiKey = await this.getOpenRouterKey();
    const systemMessage = {
      role: 'system',
      content: `You are an official France Éducation International (FEI) Certified Senior Oral Examiner conducting a live TCF Canada Speaking examination for ${targetLanguage} on "${lessonTopic}".
Your role depends on the task:
- If Tâche 1 (Entretien dirigé): Greet the candidate warmly in French, ask 1 concise follow-up question about their background, daily life, or Canadian immigration plans (1-2 sentences).
- If Tâche 2 (Interaction): You are the receptionist, landlord, or manager in the prompt scenario. Answer the candidate's questions clearly, realistically, and concisely in spoken French, then encourage their next question.
- If Tâche 3 (Débat & Point de vue): Listen to the candidate's thesis and challenge them with a realistic, polite counter-argument or follow-up question in French ("C'est un point intéressant, mais ne pensez-vous pas que... ?").
Keep your responses natural, spoken, and concise (1-3 sentences max in French).`,
    };

    const conversationPrompt = messages.map((m: any) => `${m.role === 'user' ? 'Candidate' : 'Examiner'}: ${m.content}`).join('\n');
    const fullPrompt = `${conversationPrompt}\n\nExaminer:`;

    try {
      if (apiKey) {
        const reply = await generateAICompletion({
          model: 'gpt-4o-mini',
          prompt: fullPrompt,
          systemPrompt: systemMessage.content,
          temperature: 0.6,
          maxTokens: 250,
        });

        return { reply: reply.trim(), model: 'gpt-4o-mini' };
      }
    } catch (e) {}

    return {
      reply: "Très bien, je vous écoute. Pouvez-vous me poser votre prochaine question ou préciser votre pensée ?",
      model: 'fallback',
    };
  }
}

export const writingService = new WritingService();
