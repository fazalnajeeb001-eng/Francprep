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

    return Math.max(jaccard, triRatio);
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

    const prompt = `You are an official Senior Certified Examiner for France Éducation International (FEI) evaluating ${targetLanguage} writing for official TCF Canada Express Entry.

CRITICAL FEI HORS-SUJET (OFF-TOPIC) RULE:
- Check if the student's submission directly answers the specific topic, scenario, and questions in the prompt.
- IF THE SUBMISSION IS COMPLETELY OFF-TOPIC (HORS-SUJET) — e.g. discussing a cooking workshop when asked about a car ban or apartment heating issue — YOU MUST AWARD 0 MARKS FOR TASK FULFILLMENT (0/5) AND 0 MARKS TOTAL (0/20, NCLC 0).
- Official FEI rules mandate an automatic 0 grade (Hors-sujet Total = 0 Marks) for off-topic submissions regardless of grammar.

OFFICIAL FEI TCF EVALUATION GRID (4 CRITERIA - TOTAL 20 MARKS):
1. Task Fulfillment & Word Count (0-5 pts): Respecting prompt instructions and word count range. (0/5 if Off-Topic!)
2. Coherence & Connectors (0-5 pts): Paragraph structure and transition markers (e.g. en outre, cependant, par conséquent).
3. Lexical Variety & Richness (0-5 pts): Precise topic vocabulary range without repetition.
4. Morphosyntax & Grammar (0-5 pts): Tense agreement, adjective agreement, complex structures (subjunctive, conditional).

OFFICIAL NCLC SCALING (Based on Total Marks out of 20):
- 17-20 / 20 = NCLC 9 (C1 Advanced) (+31 CRS Points)
- 14-16 / 20 = NCLC 8 (B2 Upper) (+23 CRS Points)
- 12-13 / 20 = NCLC 7 (B2 Benchmark Target) (+17 CRS Points)
- 10-11 / 20 = NCLC 6 (B1 Intermediate) (+12 CRS Points)
- 8-9 / 20 = NCLC 5 (B1 Threshold) (+6 CRS Points)
- < 8 / 20 = NCLC 1-4 (A1-A2) (0 CRS Points)
- 0 / 20 = NCLC 0 (Zero Grade — Off-Topic / Hors-Sujet) (0 CRS Points)

Context / Task Prompt:
Task / Topic: "${lessonTitle || `${targetLanguage} Writing Examination`}"
${expectedAnswer ? `Task Prompt & Model Expectations:\n"""\n${expectedAnswer}\n"""` : ''}
${checklist && checklist.length > 0 ? `Required Checklist Elements:\n${checklist.map((item, i) => `${i + 1}. ${item}`).join('\n')}` : ''}

Student's Typed Writing Submission (${targetLanguage}):
"""
${text}
"""

Evaluate strictly according to official FEI TCF Canada examiner criteria. Respond ONLY with a valid JSON object:
{
  "scoreOutOf20": 15,
  "nclcGrade": "NCLC 8 (B2 Upper)",
  "cefrLevel": "B2",
  "expressEntryPoints": 23,
  "taskFulfillmentScore": 4,
  "coherenceScore": 4,
  "lexicalScore": 4,
  "grammarScore": 3,
  "feedback": "2-3 sentence precise examiner diagnostic summary highlighting strengths and primary area for improvement.",
  "corrections": [
    { "original": "student error text", "corrected": "corrected text", "explanation": "Grammatical or lexical explanation in English." }
  ],
  "tips": [
    "Actionable tip 1 to raise CEFR score.",
    "Actionable tip 2 for task adherence."
  ]
}`;

    try {
      const content = await generateAICompletion({
        model: 'gpt-4o-mini',
        prompt,
        systemPrompt: `You are an official France Éducation International (FEI) Senior Examiner evaluating TCF Canada writing.`,
        temperature: 0.2,
        maxTokens: 1000,
      });

      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        let scoreOutOf20 = typeof parsed.scoreOutOf20 === 'number' ? parsed.scoreOutOf20 : 12;

        const feedbackLower = (parsed.feedback || '').toLowerCase();
        const isOffTopicFeedback = feedbackLower.includes('off-topic') ||
                                   feedbackLower.includes('off topic') ||
                                   feedbackLower.includes('hors-sujet') ||
                                   feedbackLower.includes('hors sujet') ||
                                   feedbackLower.includes('does not address the prompt') ||
                                   feedbackLower.includes('unrelated to the prompt');

        if (scoreOutOf20 === 0 || parsed.taskFulfillmentScore === 0 || isOffTopicFeedback) {
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
          nclcGrade = "NCLC 10+ (C2 Mastery)";
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
          nclcGrade = "NCLC 3 (A1 Break-Through)";
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
          taskFulfillmentScore: typeof parsed.taskFulfillmentScore === 'number' ? parsed.taskFulfillmentScore : Math.min(5, Math.ceil(scoreOutOf20 / 4)),
          coherenceScore: typeof parsed.coherenceScore === 'number' ? parsed.coherenceScore : Math.min(5, Math.ceil(scoreOutOf20 / 4)),
          lexicalScore: typeof parsed.lexicalScore === 'number' ? parsed.lexicalScore : Math.min(5, Math.ceil(scoreOutOf20 / 4)),
          grammarScore: typeof parsed.grammarScore === 'number' ? parsed.grammarScore : Math.min(5, Math.ceil(scoreOutOf20 / 4)),
          feedback: parsed.feedback || 'Good effort on this writing task.',
          corrections: Array.isArray(parsed.corrections) ? parsed.corrections : [],
          tips: Array.isArray(parsed.tips) ? parsed.tips : [],
        };
      }

      return {
        score: 60,
        scoreOutOf20: 12,
        nclcGrade: 'NCLC 7 (B2 Benchmark Target)',
        cefrLevel: 'B2',
        expressEntryPoints: 17,
        taskFulfillmentScore: 3,
        coherenceScore: 3,
        lexicalScore: 3,
        grammarScore: 3,
        feedback: content.slice(0, 250),
        corrections: [],
        tips: ['Ensure all parts of the prompt are answered directly.'],
      };
    } catch (error) {
      console.error('AI feedback request failed:', error);
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
        feedback: 'Unable to connect to AI evaluation service. Please check API Key in Admin Settings.',
        corrections: [],
        tips: ['Ensure OPENROUTER_API_KEY is configured in Admin Settings.'],
      };
    }
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
