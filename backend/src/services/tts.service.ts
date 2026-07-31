import crypto from 'crypto';
import axios from 'axios';
import TTSCache from '../models/TTSCache';
import Settings from '../models/Settings';

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
    settings = await Settings.findOne().maxTimeMS(1500);
  } catch (err) {}

  const activeProvider = forcedProvider || settings?.activeTTSProvider || 'auto';
  const textHash = getHash(cleanText, gender, lang, activeProvider);

  // 1. Check MongoDB Cache first
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

    try {
      // High quality native French voices (Female: Rachel / Charlotte, Male: Antoni / Henri)
      const voiceId = gender === 'male' ? 'ErXwobaYiN019PkySvjV' : '21m00Tcm4TlvDq8ikWAM';
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
      console.error('[TTS Service] ElevenLabs error:', err?.response?.data ? String(err.response.data) : err?.message);
    }
    return null;
  };

  // --- PROVIDER 2: HUGGING FACE / KOKORO ---
  const tryHuggingFaceKokoro = async () => {
    const hfKey = process.env.HUGGINGFACE_API_KEY || settings?.huggingFaceApiKey;
    try {
      const hfUrl = 'https://api-inference.huggingface.co/models/hexgrad/Kokoro-82M';
      const headers: any = { 'Content-Type': 'application/json' };
      if (hfKey) headers['Authorization'] = `Bearer ${hfKey}`;

      const response = await axios.post(
        hfUrl,
        { inputs: cleanText },
        { headers, responseType: 'arraybuffer', timeout: 12000 }
      );

      if (response.status === 200 && response.data) {
        const audioBuffer = Buffer.from(response.data);
        const audioBase64 = audioBuffer.toString('base64');
        const contentType = 'audio/flac';

        TTSCache.create({ textHash, text: cleanText, voice: 'kokoro-82m', gender, audioBase64, contentType }).catch(() => {});
        return { audioBase64, contentType, provider: 'huggingface' };
      }
    } catch (err: any) {
      console.error('[TTS Service] HuggingFace Kokoro error:', err?.message);
    }
    return null;
  };

  // --- PROVIDER 3: OPENAI TTS-1-HD ---
  const tryOpenAI = async () => {
    const openaiKey = process.env.OPENAI_API_KEY || settings?.openaiApiKey || settings?.openRouterApiKey;
    if (!openaiKey) return null;

    try {
      const voiceName = gender === 'male' ? 'onyx' : 'nova';
      const isDirectOpenAI = openaiKey.startsWith('sk-');
      const url = isDirectOpenAI ? 'https://api.openai.com/v1/audio/speech' : 'https://openrouter.ai/api/v1/audio/speech';

      const response = await axios.post(
        url,
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

  // --- PROVIDER 4: GOOGLE FREE AUDIO ---
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
  } else if (activeProvider === 'huggingface') {
    const res = await tryHuggingFaceKokoro();
    if (res) return res;
  } else if (activeProvider === 'openai') {
    const res = await tryOpenAI();
    if (res) return res;
  } else if (activeProvider === 'google') {
    const res = await tryGoogle();
    if (res) return res;
  }

  // AUTO FALLBACK CASCADE (ElevenLabs -> OpenAI -> HuggingFace -> Google)
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
