import crypto from 'crypto';
import axios from 'axios';
import TTSCache from '../models/TTSCache';
import Settings from '../models/Settings';
import { generateKokoroAudio } from './kokoro.service';

function getHash(text: string, gender: string, lang: string, engine = 'auto'): string {
  return crypto.createHash('md5').update(`${text.trim().toLowerCase()}_${gender}_${lang}_${engine}`).digest('hex');
}

export async function generateNeuralAudio(
  text: string,
  gender: 'female' | 'male' = 'female',
  lang: 'fr' | 'en' = 'fr'
): Promise<{ audioBase64: string; contentType: string; provider: string } | null> {
  const cleanText = text.trim();
  if (!cleanText) return null;

  let settings: any = null;
  try {
    settings = await Settings.findOne().maxTimeMS(1500);
  } catch (err) {}

  const preferredEngine = settings?.preferredVoiceEngine || 'auto';
  const textHash = getHash(cleanText, gender, lang, preferredEngine);

  // 1. Check MongoDB Cache first
  try {
    const cached = await TTSCache.findOne({ textHash }).maxTimeMS(1500);
    if (cached && cached.audioBase64) {
      return { audioBase64: cached.audioBase64, contentType: cached.contentType || 'audio/mp3', provider: 'cache' };
    }
  } catch (err) {
    console.warn('[TTSCache] Error reading cache:', err);
  }

  // 2. ElevenLabs Studio-Grade Engine (If preferred or auto)
  const elevenLabsKey = process.env.ELEVENLABS_API_KEY || settings?.elevenLabsApiKey;
  if ((preferredEngine === 'auto' || preferredEngine === 'elevenlabs') && elevenLabsKey) {
    try {
      const voiceId = gender === 'male' ? 'ErXwobaYiN019PkySvjV' : '21m00Tcm4TlvDq8ikWAM';
      const response = await axios.post(
        `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
        {
          text: cleanText,
          model_id: 'eleven_multilingual_v2',
          voice_settings: { stability: 0.5, similarity_boost: 0.8, style: 0.0, use_speaker_boost: true },
        },
        {
          headers: { 'xi-api-key': elevenLabsKey, 'Content-Type': 'application/json', Accept: 'audio/mpeg' },
          responseType: 'arraybuffer',
          timeout: 10000,
        }
      );

      if (response.status === 200 && response.data) {
        const audioBuffer = Buffer.from(response.data);
        const audioBase64 = audioBuffer.toString('base64');
        const contentType = 'audio/mp3';

        TTSCache.create({ textHash, text: cleanText, voice: `elevenlabs-${voiceId}`, gender, audioBase64, contentType }).catch(() => {});
        return { audioBase64, contentType, provider: 'elevenlabs' };
      }
    } catch (err: any) {
      console.error('[TTS Service] ElevenLabs error:', err?.message);
    }
  }

  // 3. OpenAI TTS-1-HD Studio Voice API
  const openaiKey = process.env.OPENAI_API_KEY || settings?.openaiApiKey || settings?.openRouterApiKey;
  if ((preferredEngine === 'auto' || preferredEngine === 'openai') && openaiKey) {
    try {
      const voiceName = gender === 'male' ? 'onyx' : 'nova';
      const isDirectOpenAI = openaiKey.startsWith('sk-');
      const url = isDirectOpenAI ? 'https://api.openai.com/v1/audio/speech' : 'https://openrouter.ai/api/v1/audio/speech';

      const response = await axios.post(
        url,
        { model: 'tts-1-hd', input: cleanText, voice: voiceName, speed: 0.95 },
        { headers: { Authorization: `Bearer ${openaiKey}`, 'Content-Type': 'application/json' }, responseType: 'arraybuffer', timeout: 10000 }
      );

      if (response.status === 200 && response.data) {
        const audioBuffer = Buffer.from(response.data);
        const audioBase64 = audioBuffer.toString('base64');
        const contentType = 'audio/mp3';

        TTSCache.create({ textHash, text: cleanText, voice: `openai-${voiceName}`, gender, audioBase64, contentType }).catch(() => {});
        return { audioBase64, contentType, provider: 'openai' };
      }
    } catch (err: any) {
      console.error('[TTS Service] OpenAI TTS error:', err?.message);
    }
  }

  // 4. Kokoro-82M Open-Source Neural Voice Engine (100% Free)
  if (preferredEngine === 'auto' || preferredEngine === 'kokoro') {
    try {
      const kokoroRes = await generateKokoroAudio(cleanText, gender, lang, settings?.huggingFaceToken);
      if (kokoroRes) {
        TTSCache.create({
          textHash,
          text: cleanText,
          voice: kokoroRes.provider,
          gender,
          audioBase64: kokoroRes.audioBase64,
          contentType: kokoroRes.contentType,
        }).catch(() => {});
        return kokoroRes;
      }
    } catch (err: any) {
      console.warn('[TTS Service] Kokoro error:', err?.message);
    }
  }

  // 5. Emergency Google Audio fallback
  try {
    const encodedText = encodeURIComponent(cleanText);
    const googleTtsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodedText}&tl=${lang === 'en' ? 'en' : 'fr'}&client=tw-ob`;

    const response = await axios.get(googleTtsUrl, {
      responseType: 'arraybuffer',
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
      timeout: 5000,
    });

    if (response.status === 200 && response.data) {
      const audioBuffer = Buffer.from(response.data);
      const audioBase64 = audioBuffer.toString('base64');
      const contentType = 'audio/mp3';

      TTSCache.create({ textHash, text: cleanText, voice: `google-${lang}`, gender, audioBase64, contentType }).catch(() => {});
      return { audioBase64, contentType, provider: 'google' };
    }
  } catch (err) {}

  return null;
}
