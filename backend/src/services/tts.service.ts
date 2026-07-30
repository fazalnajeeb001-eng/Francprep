import crypto from 'crypto';
import axios from 'axios';
import TTSCache from '../models/TTSCache';
import Settings from '../models/Settings';

function getHash(text: string, gender: string, lang: string): string {
  return crypto.createHash('md5').update(`${text.trim().toLowerCase()}_${gender}_${lang}`).digest('hex');
}

export async function generateNeuralAudio(
  text: string,
  gender: 'female' | 'male' = 'female',
  lang: 'fr' | 'en' = 'fr'
): Promise<{ audioBase64: string; contentType: string } | null> {
  const cleanText = text.trim();
  if (!cleanText) return null;

  const textHash = getHash(cleanText, gender, lang);

  // 1. Check MongoDB Cache first
  try {
    const cached = await TTSCache.findOne({ textHash });
    if (cached && cached.audioBase64) {
      return { audioBase64: cached.audioBase64, contentType: cached.contentType || 'audio/mp3' };
    }
  } catch (err) {
    console.warn('[TTSCache] Error reading cache:', err);
  }

  // 2. Try OpenAI Neural Voice API if key is available
  try {
    const settings = await Settings.findOne();
    const apiKey = process.env.OPENAI_API_KEY || settings?.openRouterApiKey;
    
    if (apiKey) {
      const voiceName = gender === 'male' ? 'onyx' : 'nova';
      const response = await axios.post(
        'https://api.openai.com/v1/audio/speech',
        {
          model: 'tts-1',
          input: cleanText,
          voice: voiceName,
          speed: 0.95,
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          responseType: 'arraybuffer',
          timeout: 8000,
        }
      );

      if (response.status === 200 && response.data) {
        const audioBuffer = Buffer.from(response.data);
        const audioBase64 = audioBuffer.toString('base64');
        const contentType = 'audio/mp3';

        // Save to cache asynchronously
        TTSCache.create({
          textHash,
          text: cleanText,
          voice: `openai-${voiceName}`,
          gender,
          audioBase64,
          contentType,
        }).catch(() => {});

        return { audioBase64, contentType };
      }
    }
  } catch (err) {
    // Silently continue to fallback
  }

  // 3. Try Free Microsoft Edge Neural Speech API (fr-FR-DeniseNeural / fr-FR-HenriNeural)
  try {
    const voiceName = lang === 'en'
      ? (gender === 'male' ? 'en-US-GuyNeural' : 'en-US-JennyNeural')
      : (gender === 'male' ? 'fr-FR-HenriNeural' : 'fr-FR-DeniseNeural');

    // Google / Free Public Neural Speech Stream fallback
    const encodedText = encodeURIComponent(cleanText);
    const googleTtsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodedText}&tl=${lang === 'en' ? 'en' : 'fr'}&client=tw-ob`;
    
    const response = await axios.get(googleTtsUrl, {
      responseType: 'arraybuffer',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
      timeout: 5000,
    });

    if (response.status === 200 && response.data) {
      const audioBuffer = Buffer.from(response.data);
      const audioBase64 = audioBuffer.toString('base64');
      const contentType = 'audio/mp3';

      TTSCache.create({
        textHash,
        text: cleanText,
        voice: voiceName,
        gender,
        audioBase64,
        contentType,
      }).catch(() => {});

      return { audioBase64, contentType };
    }
  } catch (err) {
    console.warn('[TTS Fallback] Google TTS fallback failed:', err);
  }

  return null;
}
