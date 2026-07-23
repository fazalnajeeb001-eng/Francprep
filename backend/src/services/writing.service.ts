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

    const llmPrompt = `You are a warm, encouraging French language tutor evaluating a student's typed answer to an exercise/drill.

Lesson Context: "${lessonTitle || 'French Beginner Drill'}"
Exercise Prompt: "${prompt}"
Reference Model Answer: "${expectedAnswer && expectedAnswer !== 'N/A' && !expectedAnswer.toLowerCase().includes('open-ended') ? expectedAnswer : 'Evaluate based on French grammar & prompt (Open-ended)'}"
Student's Typed Answer: "${answer}"

Rules for Pedagogical AI Evaluation:
1. SCOPED STRICTLY TO LESSON & CEFR LEVEL: Keep explanations strictly aligned with what a student at this level has learned in this lesson. Do NOT use advanced grammatical jargon (e.g., subjunctive, passé simple, pluperfect, complex syntax) or advanced vocabulary outside the scope of this lesson level.
2. THE REFERENCE MODEL ANSWER IS A GUIDE ONLY. Accept ANY valid, grammatically correct French expression suited for this lesson level (e.g., accepting "Je m'appelle Marc", "Je suis Marc", "Moi, c'est Marc").
3. Accept minor capitalization, accent, or punctuation differences.
4. If no model answer exists or if it is marked open-ended, evaluate the student's answer strictly against standard French grammar and the prompt instructions.
5. If the student made a mistake, explain it simply, clearly, and gently using ONLY concepts appropriate for this lesson, pointing out the exact word or phrase to use.
6. Provide a clear, helpful 1-2 sentence AI Review in English explaining WHY it is correct or incorrect.

Respond STRICTLY with a raw JSON object:
{"correct": true or false, "feedback": "Your 1-2 sentence AI review/explanation here"}`;

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

    const systemPrompt = `You are Madame Sophie, a warm, encouraging, and patient French conversation tutor for FrancPrep.

CRITICAL RULES:
- Always respond in FRENCH first (1-2 short sentences), then optionally provide an English translation in parentheses if the student seems confused.
- If the student writes in English, gently redirect them to respond in French, but still help them.
- If the student is struggling (short responses, errors, writing in English), respond in English with encouragement and give them the French phrase to practice, then ask them to try again.
- Keep responses SHORT (1-3 sentences max). This is a speaking drill, not a novel.
- Ask follow-up questions to keep the conversation going.
- Be warm and encouraging. Use "Bravo!", "Tres bien!", "Excellent!" when they do well.
- Gently correct mistakes by rephrasing correctly.
- Adapt to their level: A1-A2 use simple present tense and basic vocabulary, B1-B2 use more complex structures, C1-C2 use idiomatic expressions.

CONTEXT:
- Student level: ${level}
- Lesson topic: ${topic}`;

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
