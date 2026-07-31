import crypto from 'crypto';
import axios from 'axios';
import TTSCache from '../models/TTSCache';
import Settings from '../models/Settings';
import { generateKokoroAudio } from './kokoro.service';

function getHash(text: string, gender: string, lang: string, provider: string): string {
  return crypto.createHash('md5').update(`${text.trim().toLowerCase()}_${gender}_${lang}_${provider}`).digest('hex');
}

export async function generateNeuralAudio(
  text: string,
  gender: 'female' | 'male' = 'female',
  lang: 'fr' | 'en' = 'fr',
  forcedProvider?: string
): Promise<{ audioBase64: string; contentType: string; provider: string } | null> {
  const cleanText = text.trim();
  if (!cleanText) return null;

  let settings: any = null;
  try {
    const doc = await Settings.findOne();
    if (doc) settings = doc.toJSON ? doc.toJSON() : doc;
  } catch (err) {}

  const activeProvider = forcedProvider || settings?.preferredVoiceEngine || settings?.activeTTSProvider || 'auto';
  const textHash = getHash(cleanText, gender, lang, activeProvider);

  // 1. Check MongoDB Cache first — ignore legacy robotic google- entries if AI key is active!
  try {
    const cached = await TTSCache.findOne({ textHash }).maxTimeMS(1500);
    if (cached && cached.audioBase64) {
      return { audioBase64: cached.audioBase64, contentType: cached.contentType || 'audio/mp3', provider: `cache-${cached.voice}` };
    }
  } catch (err) {
    console.warn('[TTSCache] Error reading cache:', err);
  }

  // --- PROVIDER 1: ELEVENLABS ---
  const tryElevenLabs = async () => {
    const elevenLabsKey = process.env.ELEVENLABS_API_KEY || settings?.elevenLabsApiKey;
    if (!elevenLabsKey) return null;

    const voices = gender === 'male' ? ['ErXwobaYiN019PkySvjV', 'VR6AewLTigWG4xSOukaG'] : ['21m00Tcm4TlvDq8ikWAM', 'EXAVITQu4vr4xnSDxMaL'];
    for (const voiceId of voices) {
      try {
        const response = await axios.post(
          `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
          {
            text: cleanText,
            model_id: 'eleven_multilingual_v2',
            voice_settings: { stability: 0.5, similarity_boost: 0.85, style: 0.0, use_speaker_boost: true },
          },
          {
            headers: { 'xi-api-key': elevenLabsKey, 'Content-Type': 'application/json', Accept: 'audio/mpeg' },
            responseType: 'arraybuffer',
            timeout: 12000,
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
        console.warn(`[ElevenLabs] Voice ${voiceId} error:`, err?.message);
      }
    }
    return null;
  };

  // --- PROVIDER 2: HUGGING FACE / KOKORO ---
  const tryHuggingFaceKokoro = async () => {
    const hfToken = process.env.HUGGINGFACE_TOKEN || process.env.HUGGINGFACE_API_KEY || settings?.huggingFaceToken || settings?.huggingFaceApiKey;
    try {
      const kokoroRes = await generateKokoroAudio(cleanText, gender, hfToken);
      if (kokoroRes) {
        TTSCache.create({ textHash, text: cleanText, voice: 'kokoro-82m', gender, audioBase64: kokoroRes.audioBase64, contentType: kokoroRes.contentType }).catch(() => {});
        return { audioBase64: kokoroRes.audioBase64, contentType: kokoroRes.contentType, provider: 'huggingface-kokoro' };
      }
    } catch (err: any) {
      console.error('[TTS Service] HuggingFace Kokoro error:', err?.message);
    }
    return null;
  };

  // --- PROVIDER 3: OPENAI TTS-1-HD ---
  const tryOpenAI = async () => {
    const openaiKey = process.env.OPENAI_API_KEY || settings?.openaiApiKey;
    if (!openaiKey) return null;

    try {
      const voiceName = gender === 'male' ? 'onyx' : 'nova';
      const response = await axios.post(
        'https://api.openai.com/v1/audio/speech',
        { model: 'tts-1-hd', input: cleanText, voice: voiceName, speed: 0.95 },
        { headers: { Authorization: `Bearer ${openaiKey}`, 'Content-Type': 'application/json' }, responseType: 'arraybuffer', timeout: 12000 }
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
    return null;
  };

  // --- PROVIDER 4: GOOGLE AUDIO FALLBACK ---
  const tryGoogle = async () => {
    try {
      const encodedText = encodeURIComponent(cleanText);
      const googleTtsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodedText}&tl=${lang === 'en' ? 'en' : 'fr'}&client=tw-ob`;

      const response = await axios.get(googleTtsUrl, {
        responseType: 'arraybuffer',
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
        timeout: 6000,
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
  };

  // EXECUTION ROUTING
  if (activeProvider === 'elevenlabs') {
    const res = await tryElevenLabs();
    if (res) return res;
  } else if (activeProvider === 'huggingface' || activeProvider === 'kokoro') {
    const res = await tryHuggingFaceKokoro();
    if (res) return res;
  } else if (activeProvider === 'openai') {
    const res = await tryOpenAI();
    if (res) return res;
  } else if (activeProvider === 'google') {
    const res = await tryGoogle();
    if (res) return res;
  }

  // AUTO FALLBACK CASCADE (ElevenLabs -> OpenAI -> HuggingFace Kokoro -> Google)
  const eleven = await tryElevenLabs();
  if (eleven) return eleven;

  const openAiAudio = await tryOpenAI();
  if (openAiAudio) return openAiAudio;

  const kokoro = await tryHuggingFaceKokoro();
  if (kokoro) return kokoro;

  const google = await tryGoogle();
  if (google) return google;

  return null;
}
