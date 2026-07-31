import crypto from 'crypto';
import axios from 'axios';
import TTSCache from '../models/TTSCache';
import { getOrCreate } from '../controllers/settings.controller';
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
    const settingsDoc = await getOrCreate();
    settings = settingsDoc && (settingsDoc as any).toJSON ? (settingsDoc as any).toJSON() : settingsDoc;
  } catch (err) {}

  const preferredEngine = settings?.preferredVoiceEngine || 'auto';
  const textHash = getHash(cleanText, gender, lang, preferredEngine);

  const elevenLabsKey = process.env.ELEVENLABS_API_KEY || settings?.elevenLabsApiKey;
  const huggingFaceToken = process.env.HUGGINGFACE_TOKEN || settings?.huggingFaceToken;
  // Note: Only direct OpenAI keys (sk-...) support OpenAI TTS-1-HD. OpenRouter keys (sk-or-v1-...) do not support binary speech API.
  const openaiKey = process.env.OPENAI_API_KEY || settings?.openaiApiKey;

  // 1. Check MongoDB Cache first — ignore legacy robotic google- entries!
  try {
    const cached = await TTSCache.findOne({ textHash, voice: { $not: /^google-/ } }).maxTimeMS(1500);
    if (cached && cached.audioBase64) {
      if (preferredEngine === 'auto' || cached.voice.toLowerCase().includes(preferredEngine)) {
        return { audioBase64: cached.audioBase64, contentType: cached.contentType || 'audio/mp3', provider: cached.voice };
      }
    }
  } catch (err) {
    console.warn('[TTSCache] Error reading cache:', err);
  }

  // 2. ElevenLabs Studio-Grade Engine (If preferred or auto)
  if ((preferredEngine === 'auto' || preferredEngine === 'elevenlabs') && elevenLabsKey) {
    const primaryVoiceId = gender === 'male' ? 'JBFqnCBsd6RMkjVDRZzb' : 'Xb7hH8MSUJpSbSDYk0k2';
    const fallbackVoiceId = gender === 'male' ? 'ErXwobaYiN019PkySvjV' : '21m00Tcm4TlvDq8ikWAM';
    const targetVoiceIds = [primaryVoiceId, fallbackVoiceId];

    for (const voiceId of targetVoiceIds) {
      try {
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
        console.warn(`[ElevenLabs] Voice ${voiceId} synthesis error:`, err?.message);
      }
    }
  }

  // 3. OpenAI TTS-1-HD Studio Voice API (Only if direct OpenAI sk- key is configured)
  if ((preferredEngine === 'auto' || preferredEngine === 'openai') && openaiKey && (openaiKey.startsWith('sk-') && !openaiKey.startsWith('sk-or-v1-'))) {
    try {
      const voiceName = gender === 'male' ? 'onyx' : 'nova';
      const response = await axios.post(
        'https://api.openai.com/v1/audio/speech',
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
      const kokoroRes = await generateKokoroAudio(cleanText, gender, lang, huggingFaceToken);
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

  return null;
}
