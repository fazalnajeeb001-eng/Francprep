import { env } from '../config/env';

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
  async getFeedback(text: string, lessonTitle?: string, expectedAnswer?: string, checklist?: string[]): Promise<FeedbackResult> {
    const apiKey = env.openRouterKey;
    if (!apiKey) {
      return {
        feedback: 'AI feedback is not configured. Please set up OpenRouter.',
        score: 0,
        corrections: [],
        tips: ['Set OPENROUTER_API_KEY in your environment to enable AI feedback.'],
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
        const errorText = await response.text();
        console.error('OpenRouter API error:', response.status, errorText);
        let msg = 'Unable to get AI feedback at this time.';
        try {
          const err = JSON.parse(errorText);
          if (err.error?.message) msg += ' ' + err.error.message;
        } catch {}
        return {
          feedback: msg,
          score: 0,
          corrections: [],
          tips: ['Check your OpenRouter key or try again later.'],
        };
      }

      const data = await response.json() as any;
      const content = data.choices?.[0]?.message?.content || '';
      
      // Parse JSON from the response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]) as FeedbackResult;
      }

      // Fallback if JSON parsing fails
      return {
        feedback: content.slice(0, 200),
        score: 0,
        corrections: [],
        tips: [],
      };
    } catch (error) {
      console.error('OpenRouter request failed:', error);
      return {
        feedback: 'Unable to connect to AI service. Please try again later.',
        score: 0,
        corrections: [],
        tips: ['Check your internet connection and try again.'],
      };
    }
  }

  async checkGrammar(prompt: string, answer: string, expectedAnswer?: string): Promise<GrammarCheckResult> {
    const apiKey = env.openRouterKey;
    if (!apiKey) {
      const isCorrect = expectedAnswer ? answer.trim().toLowerCase() === expectedAnswer.trim().toLowerCase() : false;
      return { correct: isCorrect, feedback: 'AI not configured. Falling back to exact match.', expectedAnswer };
    }

    const llmPrompt = `You are a French language tutor checking a student's answer to a grammar drill.

The drill prompt is: "${prompt}"
The expected answer is: "${expectedAnswer || 'N/A'}"
The student answered: "${answer}"

Is the student's answer correct? Consider:
- Accept minor spelling/capitalization differences
- Accept equivalent correct forms (e.g. "je suis" and "Je suis" are the same)
- Accept the answer even if it includes the blank placeholder text
- Be lenient — if the meaning and grammar are correct, it's correct

Respond with ONLY a JSON object:
{"correct": true/false, "feedback": "brief explanation"}`;

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
          messages: [{ role: 'user', content: llmPrompt }],
          temperature: 0.1,
          max_tokens: 200,
        }),
      });

      if (!response.ok) {
        const isCorrect = expectedAnswer ? answer.trim().toLowerCase() === expectedAnswer.trim().toLowerCase() : false;
        return { correct: isCorrect, feedback: 'AI check failed, using exact match.', expectedAnswer };
      }

      const data = await response.json() as any;
      const content = data.choices?.[0]?.message?.content || '';
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return { correct: !!parsed.correct, feedback: parsed.feedback || '', expectedAnswer };
      }

      const isCorrect = expectedAnswer ? answer.trim().toLowerCase() === expectedAnswer.trim().toLowerCase() : false;
      return { correct: isCorrect, feedback: content.slice(0, 100), expectedAnswer };
    } catch (error) {
      const isCorrect = expectedAnswer ? answer.trim().toLowerCase() === expectedAnswer.trim().toLowerCase() : false;
      return { correct: isCorrect, feedback: 'AI unavailable, using exact match.', expectedAnswer };
    }
  }

  async analyzeSpeaking(transcription: string, expectedText: string, lessonTitle?: string): Promise<SpeakingResult> {
    const apiKey = env.openRouterKey;
    if (!apiKey) {
      return {
        transcription,
        feedback: 'AI feedback is not configured.',
        score: 0,
        accuracy: 0,
        fluency: 0,
        corrections: [],
        tips: ['Set OPENROUTER_API_KEY to enable AI feedback.'],
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
    const apiKey = env.openRouterKey;
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
