import { env } from '../config/env';
import Settings from '../models/Settings';
import { generateAICompletion } from './aiProvider';

export interface ComprehensiveWritingFeedback {
  score: number;
  nclcGrade: string;
  cefrLevel: string;
  taskCompletionScore: number;
  grammarScore: number;
  vocabularyScore: number;
  cohesionScore: number;
  feedback: string;
  corrections: Array<{ original: string; corrected: string; explanation: string } | string>;
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
      const settings = await Settings.findOne();
      if (settings?.openRouterApiKey) {
        return settings.openRouterApiKey;
      }
    } catch (e) {
      console.warn('Could not read Settings model for OpenRouter key:', e);
    }
    return env.openRouterKey || process.env.OPENROUTER_API_KEY || '';
  }

  async getFeedback(text: string, lessonTitle?: string, expectedAnswer?: string, checklist?: string[], targetLanguage = 'French', examName = 'DELF / TCF'): Promise<ComprehensiveWritingFeedback> {
    const apiKey = await this.getOpenRouterKey();
    if (!apiKey) {
      return {
        score: 0,
        nclcGrade: 'N/A',
        cefrLevel: 'N/A',
        taskCompletionScore: 0,
        grammarScore: 0,
        vocabularyScore: 0,
        cohesionScore: 0,
        feedback: 'AI feedback is not configured. Please set up OpenRouter API Key in Admin Settings or Environment variables.',
        corrections: [],
        tips: ['Set OPENROUTER_API_KEY in your environment or Admin Settings to enable AI feedback.'],
      };
    }

    const prompt = `You are a certified senior official examiner for ${examName} evaluating ${targetLanguage} writing proficiency.
You are conducting a strict, diagnostic evaluation of a student's ${targetLanguage} writing response.

CRITICAL EVALUATION RULE 1 - PROMPT ADHERENCE & RELEVANCE (50% WEIGHT):
- Verify whether the student directly, accurately, and fully answers the specific topic, questions, and requirements in the prompt / checklist.
- IF THE RESPONSE IS OFF-TOPIC, RANDOM TEXT (e.g. "asdf", "hello"), OR FAILS TO ANSWER THE PROMPT QUESTIONS, HEAVILY PENALIZE THE TASK COMPLETION SCORE (0-20 OUT OF 100).
- Official ${examName} exams award 0 points for Task Completion if the candidate strays off-topic or submits irrelevant text.

CRITICAL EVALUATION RULE 2 - CEFR LEVEL ACCURACY (50% WEIGHT):
- Evaluate the language grammar, vocabulary depth, sentence complexity, and register against CEFR standards (A1, A2, B1, B2, C1, C2) for ${targetLanguage}.
- Map score to CEFR level (A1, A2, B1, B2, C1, C2) and NCLC (NCLC 4 to NCLC 10+ for French/Canada, or equivalent CEFR band).
- Example: 85-100% -> B2/C1 (NCLC 8-9), 70-84% -> B2 (NCLC 7), 55-69% -> B1 (NCLC 5-6), <55% -> A1/A2.

Context / Task Prompt:
Task / Topic: "${lessonTitle || `${targetLanguage} Writing Examination`}"
${expectedAnswer ? `Task Prompt & Model Expectations:\n"""\n${expectedAnswer}\n"""` : ''}
${checklist && checklist.length > 0 ? `Required Checklist Elements:\n${checklist.map((item, i) => `${i + 1}. ${item}`).join('\n')}` : ''}

Student's Typed Writing Submission (${targetLanguage}):
"""
${text}
"""

Evaluate strictly according to official ${examName} examiner criteria for ${targetLanguage}. Respond ONLY with a valid JSON object:
{
  "score": 82,
  "nclcGrade": "CEFR B2 / NCLC 7",
  "cefrLevel": "B2",
  "taskCompletionScore": 85,
  "grammarScore": 80,
  "vocabularyScore": 82,
  "cohesionScore": 80,
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
        systemPrompt: `You are an official ${examName} examiner for ${targetLanguage} providing strict, diagnostic CEFR feedback.`,
        temperature: 0.2,
        maxTokens: 1000,
      });

      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return {
          score: typeof parsed.score === 'number' ? parsed.score : 75,
          nclcGrade: parsed.nclcGrade || `CEFR ${parsed.cefrLevel || 'B2'}`,
          cefrLevel: parsed.cefrLevel || 'B2',
          taskCompletionScore: typeof parsed.taskCompletionScore === 'number' ? parsed.taskCompletionScore : (parsed.score || 75),
          grammarScore: typeof parsed.grammarScore === 'number' ? parsed.grammarScore : 75,
          vocabularyScore: typeof parsed.vocabularyScore === 'number' ? parsed.vocabularyScore : 75,
          cohesionScore: typeof parsed.cohesionScore === 'number' ? parsed.cohesionScore : 75,
          feedback: parsed.feedback || 'Good effort on this writing task.',
          corrections: Array.isArray(parsed.corrections) ? parsed.corrections : [],
          tips: Array.isArray(parsed.tips) ? parsed.tips : [],
        };
      }

      return {
        score: 70,
        nclcGrade: 'CEFR B1 / NCLC 6',
        cefrLevel: 'B1',
        taskCompletionScore: 70,
        grammarScore: 70,
        vocabularyScore: 70,
        cohesionScore: 70,
        feedback: content.slice(0, 250),
        corrections: [],
        tips: ['Ensure all parts of the prompt are answered directly.'],
      };
    } catch (error) {
      console.error('AI feedback request failed:', error);
      return {
        score: 0,
        nclcGrade: 'N/A',
        cefrLevel: 'N/A',
        taskCompletionScore: 0,
        grammarScore: 0,
        vocabularyScore: 0,
        cohesionScore: 0,
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
