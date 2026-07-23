import axios from 'axios';
import Settings from '../models/Settings';

export interface AICompletionOptions {
  model: string;
  prompt: string;
  systemPrompt?: string;
  temperature?: number;
  maxTokens?: number;
}

export async function generateAICompletion({
  model,
  prompt,
  systemPrompt = "You are a professional CEFR French curriculum assistant.",
  temperature = 0.2,
  maxTokens = 4000,
}: AICompletionOptions): Promise<string> {
  const settings = await Settings.findOne();
  
  // Model resolution mapping
  let apiProvider = 'openrouter';
  let targetModel = model;

  if (model === 'claude-native' || model === 'claude-3-5-sonnet') {
    if (settings?.anthropicApiKey) {
      apiProvider = 'anthropic';
      targetModel = 'claude-3-5-sonnet-20241022';
    } else {
      // Fallback to OpenRouter Claude
      apiProvider = 'openrouter';
      targetModel = 'anthropic/claude-3.5-sonnet';
    }
  } else {
    // OpenRouter models map
    const modelMap: Record<string, string> = {
      'claude-sonnet': 'anthropic/claude-3.5-sonnet',
      'claude-haiku': 'anthropic/claude-3.5-haiku',
      'gpt-4o': 'openai/gpt-4o',
      'gpt-4o-mini': 'openai/gpt-4o-mini',
      'gemini-flash': 'google/gemini-flash-1.5',
      'gemini-pro': 'google/gemini-pro-1.5',
      'mistral-large': 'mistralai/mistral-large',
      'llama-70b': 'meta-llama/llama-3.1-70b-instruct',
    };
    targetModel = modelMap[model] || model;
  }

  if (apiProvider === 'anthropic') {
    const apiKey = settings?.anthropicApiKey || process.env.ANTHROPIC_API_KEY;
    if (!apiKey) throw new Error('Anthropic API key is not configured');

    const response = await axios.post(
      'https://api.anthropic.com/v1/messages',
      {
        model: targetModel,
        max_tokens: maxTokens,
        system: systemPrompt,
        messages: [{ role: 'user', content: prompt }],
        temperature,
      },
      {
        headers: {
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json',
        },
      }
    );
    return response.data?.content?.[0]?.text || '';
  } else {
    // OpenRouter API
    const apiKey = settings?.openRouterApiKey || process.env.OPENROUTER_API_KEY;
    if (!apiKey) throw new Error('OpenRouter API key is not configured. Add it in API Settings.');

    const modelsToTry = [
      targetModel,
      'google/gemini-2.0-flash-lite-preview-02-05:free',
      'meta-llama/llama-3.3-70b-instruct:free',
      'qwen/qwen-2.5-72b-instruct:free',
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
}
