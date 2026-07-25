import { env } from '../config/env';
import Settings from '../models/Settings';
import { generateAICompletion } from './aiProvider';

interface FeedbackResult {
  feedback: string;
  score: number;
  corrections: string[];
  tips: string[];
}

interface GrammarCheckResult {
  correct: boolean;
  feedback: string;
  expectedAnswer?: string;
}

interface SpeakingResult {
  transcription: string;
  feedback: string;
  score: number;
  accuracy: number;
  fluency: number;
  corrections: string[];
  tips: string[];
}

interface SpeakingChatResult {
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

  async getFeedback(text: string, lessonTitle?: string, expectedAnswer?: string, checklist?: string[]): Promise<FeedbackResult> {
    const apiKey = await this.getOpenRouterKey();
    if (!apiKey) {
      return {
        feedback: 'AI feedback is not configured. Please set up OpenRouter API Key in Admin Settings or Environment variables.',
        score: 0,
        corrections: [],
        tips: ['Set OPENROUTER_API_KEY in your environment or Admin Settings to enable AI feedback.'],
      };
    }

    const prompt = `You are a French language tutor evaluating a student's writing exercise.

Context: This is for a French learning lesson about "${lessonTitle || 'French basics'}".

Student's writing in French:
"""
${text}
"""
${expectedAnswer ? `
Model answer (for comparison):
"""
${expectedAnswer}
"""` : ''}
${checklist && checklist.length > 0 ? `
Checklist items the student should address:
${checklist.map((item, i) => `${i + 1}. ${item}`).join('\n')}` : ''}

Please evaluate this writing and provide:
1. A brief overall feedback (1-2 sentences in English)
2. A score from 0-100 based on:
   ${expectedAnswer ? '- How well it matches the model answer (grammar, vocabulary, structure)' : '- Correctness, grammar, and vocabulary use'}
   ${checklist ? '- How many checklist items were addressed' : ''}
3. Specific corrections if there are errors (list each as a separate string)
4. Tips for improvement (list each as a separate string)

Respond in JSON format:
{
  "feedback": "overall feedback here",
  "score": 85,
  "corrections": ["correction 1", "correction 2"],
  "tips": ["tip 1", "tip 2"]
}`;

    try {
      const content = await generateAICompletion({
        model: 'gpt-4o-mini',
        prompt,
        systemPrompt: "You are a French language tutor evaluating a student's writing exercise.",
        temperature: 0.3,
        maxTokens: 800,
      });

      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]) as FeedbackResult;
      }

      return {
        feedback: content.slice(0, 200),
        score: 0,
        corrections: [],
        tips: [],
      };
    } catch (error) {
      console.error('AI feedback request failed:', error);
      return {
        feedback: 'Unable to connect to AI service. Please check API Key in Admin Settings.',
        score: 0,
        corrections: [],
        tips: ['Ensure OPENROUTER_API_KEY is configured in Admin Settings.'],
      };
    }
  }

  async checkGrammar(prompt: string, answer: string, expectedAnswer?: string, lessonTitle?: string): Promise<GrammarCheckResult> {
    const apiKey = await this.getOpenRouterKey();
    const normalize = (s: string) => String(s).trim().toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").replace(/\s+/g, " ");
    const userStr = normalize(answer);
    const expStr = expectedAnswer ? normalize(expectedAnswer) : '';
    
    // Determine if expectedAnswer is open-ended or generic
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

    const llmPrompt = `You are FrancPrep's expert AI French Tutor, evaluating a student's typed answer to a practice drill.

Exercise Context:
- Lesson Level & Topic: "${lessonTitle || 'French Grammar & Vocabulary Drill'}"
- Exercise Prompt: "${prompt}"
- Target Model Answer: "${expectedAnswer && expectedAnswer !== 'N/A' && !expectedAnswer.toLowerCase().includes('open-ended') ? expectedAnswer : 'Evaluate for grammatical accuracy'}"
- Student's Typed Response: "${answer}"

Pedagogical Evaluation Rules:
1. ACCURACY & SYNONYMS: Mark "correct": true if the response is accurate or represents a valid, grammatically correct alternative/synonym for this level.
2. BILINGUAL FLEXIBILITY FOR COMPREHENSION (A1/A2): For reading/listening comprehension questions, accept valid answers in either English or French.
3. ERROR DIAGNOSIS (TYPOS & SPELLING): If the student's response contains a typo or grammatical error (e.g. typing "qui'l" instead of "qu'il", or wrong article/verb form):
   - Mark "correct": false.
   - Explain the specific error in 1-2 clear, encouraging sentences in English.
   - Explicitly state the exact correct French model answer.
4. LEVEL-APPROPRIATE FEEDBACK: Keep your explanation simple, friendly, and tailored to the student's CEFR level.

Respond STRICTLY with a raw JSON object:
{"correct": true or false, "feedback": "1-2 sentence clear explanation pointing out any specific error or confirming correctness."}`;

    try {
      const content = await generateAICompletion({
        model: 'gpt-4o-mini',
        prompt: llmPrompt,
        systemPrompt: 'You are a warm, encouraging French language tutor evaluating student drill responses.',
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
      console.warn('AI check error, using exact match fallback:', error);
      return {
        correct: isExactMatch,
        feedback: isExactMatch ? 'Correct!' : (expectedAnswer ? `Expected: ${expectedAnswer}` : 'Incorrect.'),
        expectedAnswer,
      };
    }
  }

  async analyzeSpeaking(transcription: string, expectedText: string, lessonTitle?: string): Promise<SpeakingResult> {
    const apiKey = await this.getOpenRouterKey();
    if (!apiKey) {
      return {
        transcription,
        feedback: 'AI feedback is not configured.',
        score: 0,
        accuracy: 0,
        fluency: 0,
        corrections: [],
        tips: ['Set OPENROUTER_API_KEY in environment or Admin Settings to enable AI feedback.'],
      };
    }

    const prompt = `You are a French language tutor evaluating a student's speaking exercise.

Context: This is for a French learning lesson about "${lessonTitle || 'French basics'}".

Expected dialogue/text:
"""
${expectedText}
"""

What the student said (transcribed from audio):
"""
${transcription}
"""

Evaluate the student's speaking and provide:
1. Overall feedback (1-2 sentences in English)
2. Score from 0-100 based on accuracy (how close to expected text)
3. Accuracy score (0-100): how many words/phrases matched
4. Fluency score (0-100): how natural and flowing the speech was
5. Specific corrections for mispronounced or incorrect words
6. Tips for improvement

Respond in JSON format:
{
  "feedback": "overall feedback here",
  "score": 85,
  "accuracy": 80,
  "fluency": 90,
  "corrections": ["correction 1", "correction 2"],
  "tips": ["tip 1", "tip 2"]
}`;

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          'HTTP-Referer': env.frontendUrl,
          'X-Title': 'FrancPrep',
        },
        body: JSON.stringify({
          model: 'openai/gpt-4o-mini',
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.3,
          max_tokens: 800,
        }),
      });

      if (!response.ok) {
        return {
          transcription,
          feedback: 'AI feedback unavailable.',
          score: 0,
          accuracy: 0,
          fluency: 0,
          corrections: [],
          tips: [],
        };
      }

      const data = await response.json() as any;
      const content = data.choices?.[0]?.message?.content || '';
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return {
          transcription,
          feedback: parsed.feedback || '',
          score: parsed.score || 0,
          accuracy: parsed.accuracy || 0,
          fluency: parsed.fluency || 0,
          corrections: parsed.corrections || [],
          tips: parsed.tips || [],
        };
      }

      return {
        transcription,
        feedback: content.slice(0, 200),
        score: 0,
        accuracy: 0,
        fluency: 0,
        corrections: [],
        tips: [],
      };
    } catch (error) {
      console.error('Speaking analysis failed:', error);
      return {
        transcription,
        feedback: 'Unable to analyze speaking. Please try again.',
        score: 0,
        accuracy: 0,
        fluency: 0,
        corrections: [],
        tips: [],
      };
    }
  }

  async chatWithTutor(messages: { role: string; content: string }[], lessonLevel?: string, lessonTopic?: string): Promise<SpeakingChatResult> {
    const apiKey = await this.getOpenRouterKey();
    if (!apiKey) {
      return { reply: 'AI service not configured. Please set OPENROUTER_API_KEY.', model: '' };
    }

    const level = lessonLevel || 'A1';
    const topic = lessonTopic || 'general conversation';

    const systemPrompt = `You are Madame Sophie, a warm, encouraging, and highly intelligent AI French conversation tutor for FrancPrep.

CRITICAL RULES FOR SPEAKING EVALUATION & CONVERSATION:
1. GRAMMAR & PRONUNCIATION CORRECTION: If the student's message contains a grammatical error, spelling typo, or wrong article/gender (e.g. "Je a un balcon" instead of "J'ai un balcon"), ALWAYS include a 1-line gentle correction callout at the top of your reply:
   e.g. "💡 Note: Say 'J'ai un balcon' (using j'ai for I have)."
2. OFF-TOPIC & FLEXIBLE DIALOGUE: Students are encouraged to answer the lesson exercise prompts (Guided Activity / Roleplay) AND feel free to speak off-topic or ask general questions in French. If the student speaks off-topic, engage naturally in French, answer their thoughts, gently correct any language errors, and keep the conversation flowing!
3. LEVEL-APPROPRIATE RESPONSES: Always respond in clear FRENCH (1-2 sentences), followed by an English translation in parentheses for A1/A2 learners.
4. Keep responses short, warm, and engaging (1-3 sentences max). Ask a follow-up question to encourage speaking.

CONTEXT:
- Student Level: ${level}
- Lesson Topic: ${topic}`;

    const apiMessages = [
      { role: 'system', content: systemPrompt },
      ...messages,
    ];

    try {
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
        return { reply: 'Unable to get tutor response. Please try again.', model: '' };
      }

      const data = await response.json() as any;
      const content = data.choices?.[0]?.message?.content || '';
      return { reply: content, model: 'openai/gpt-4o-mini' };
    } catch (error) {
      console.error('Speaking chat error:', error);
      return { reply: 'Failed to connect to tutor. Please try again.', model: '' };
    }
  }
}

export const writingService = new WritingService();
