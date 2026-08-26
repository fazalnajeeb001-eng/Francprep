import axios from 'axios';
import mongoose from 'mongoose';
import Settings from '../models/Settings';

export interface AICompletionOptions {
  model: string;
  prompt: string;
  systemPrompt?: string;
  temperature?: number;
  maxTokens?: number;
}

function normalizeOpenRouterModelSlug(rawModel: string): string {
  if (!rawModel) return 'openai/gpt-4o-mini';
  const clean = rawModel.trim();
  if (clean === 'gpt-4o-mini' || clean === 'gpt-4o-mini:free') return 'openai/gpt-4o-mini';
  if (clean === 'gpt-4o') return 'openai/gpt-4o';
  if (clean === 'claude-3-5-sonnet') return 'anthropic/claude-3.5-sonnet';
  if (clean.includes('/')) return clean;
  return `openai/${clean}`;
}

export async function generateAICompletion({
  model,
  prompt,
  systemPrompt = "You are a professional CEFR French curriculum assistant.",
  temperature = 0.2,
  maxTokens = 4000,
}: AICompletionOptions): Promise<string> {
  let settings: any = null;
  if (mongoose.connection.readyState === 1) {
    try {
      settings = await Settings.findOne();
    } catch (e) {
      console.warn('Could not read Settings in generateAICompletion:', e);
    }
  }

  let targetModel = model || 'openai/gpt-4o-mini';
  if (settings?.activeAIModel) {
    targetModel = settings.activeAIModel;
  }

  // OpenRouter API
  const apiKey = settings?.openRouterApiKey || process.env.OPENROUTER_API_KEY;
  if (!apiKey) throw new Error('OpenRouter API key is not configured. Add it in API Settings.');

  const normalizedTarget = normalizeOpenRouterModelSlug(targetModel);
  const modelsToTry = [
    normalizedTarget,
    'openai/gpt-4o-mini',
    'google/gemini-2.0-flash-lite',
    'meta-llama/llama-3.3-70b-instruct:free',
  ];

  // Remove duplicates
  const uniqueModels = Array.from(new Set(modelsToTry));

  let lastError: any = null;
  for (const m of uniqueModels) {
    try {
      const response = await axios.post(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          model: m,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: prompt }
          ],
          temperature,
          max_tokens: maxTokens,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
            'HTTP-Referer': settings?.frontendUrl || 'https://francprep.com',
            'X-Title': 'FrancPrep Admin Panel',
          },
          timeout: 15000,
        }
      );

      if (response.data?.error) {
        throw new Error(response.data.error.message || 'OpenRouter error occurred');
      }

      const content = response.data?.choices?.[0]?.message?.content;
      if (content) return content;
    } catch (err: any) {
      lastError = err;
      console.warn(`OpenRouter model ${m} failed:`, err?.response?.data?.error?.message || err?.message || err);
    }
  }

  throw lastError || new Error('All OpenRouter models failed');
}
