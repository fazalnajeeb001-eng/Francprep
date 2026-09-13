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

  const openRouterApiKey = settings?.openRouterApiKey || process.env.OPENROUTER_API_KEY;
  const openAiApiKey = process.env.OPENAI_API_KEY;

  if (!openRouterApiKey && !openAiApiKey) {
    console.error('🚨 [AI Provider Error]: Neither OpenRouter nor OpenAI API key is configured.');
    throw new Error('AI API key is not configured. Please set OPENROUTER_API_KEY or OPENAI_API_KEY in environment or admin settings.');
  }

  const normalizedTarget = normalizeOpenRouterModelSlug(targetModel);
  const modelsToTry = [
    normalizedTarget,
    'openai/gpt-4o-mini',
    'google/gemini-2.0-flash-lite',
    'meta-llama/llama-3.3-70b-instruct:free',
  ];
  const uniqueModels = Array.from(new Set(modelsToTry));

  let lastError: any = null;

  // Primary Provider Route: OpenRouter API with 45s timeout and 2 retries per model
  if (openRouterApiKey) {
    for (const m of uniqueModels) {
      for (let attempt = 1; attempt <= 2; attempt++) {
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
                'Authorization': `Bearer ${openRouterApiKey}`,
                'HTTP-Referer': settings?.frontendUrl || 'https://francprep.com',
                'X-Title': 'FrancPrep Admin Panel',
              },
              timeout: 45000, // 45s timeout to prevent mid-flight cutoff during multi-criteria CEFR analysis
            }
          );

          if (response.data?.error) {
            throw new Error(response.data.error.message || 'OpenRouter error occurred');
          }

          const content = response.data?.choices?.[0]?.message?.content;
          if (content && typeof content === 'string' && content.trim().length > 0) {
            return content;
          }
        } catch (err: any) {
          lastError = err;
          const errMsg = err?.response?.data?.error?.message || err?.message || String(err);
          const status = err?.response?.status ? `HTTP ${err.response.status}` : 'Network Error/Timeout';
          console.warn(`⚠️ [AI Provider Attempt ${attempt}/2 Failed] Model ${m} (${status}): ${errMsg}`);
          if (err?.response?.status === 402) {
            console.warn(`⚠️ [AI Provider]: OpenRouter account has insufficient credits (HTTP 402). Bailing out to secondary fallback.`);
            break;
          }
          if (attempt < 2) {
            await new Promise((resolve) => setTimeout(resolve, 1000));
          }
        }
      }
      if (lastError?.response?.status === 402) {
        break;
      }
    }
  }

  // Secondary Provider Fallback Route: Direct OpenAI API (if OPENAI_API_KEY is available)
  if (openAiApiKey) {
    console.warn('🔄 [AI Provider Fallback]: Attempting direct OpenAI API completion...');
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        const response = await axios.post(
          'https://api.openai.com/v1/chat/completions',
          {
            model: 'gpt-4o-mini',
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
              'Authorization': `Bearer ${openAiApiKey}`,
            },
            timeout: 45000,
          }
        );

        const content = response.data?.choices?.[0]?.message?.content;
        if (content && typeof content === 'string' && content.trim().length > 0) {
          console.log('✅ [AI Provider Fallback Success]: Direct OpenAI completion succeeded.');
          return content;
        }
      } catch (err: any) {
        lastError = err;
        console.error(`🚨 [AI Provider Direct OpenAI Attempt ${attempt}/2 Failed]:`, err?.response?.data?.error?.message || err?.message);
        if (attempt < 2) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      }
    }
  }

  console.error('🚨 [AI Provider Final Error]: All primary and fallback AI completion attempts exhausted.', lastError?.message);
  throw lastError || new Error('All AI completion providers and models failed.');
}
