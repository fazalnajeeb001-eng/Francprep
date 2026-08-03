import crypto from 'crypto';
import axios from 'axios';
import TTSCache from '../models/TTSCache';
import Settings from '../models/Settings';
import { generateKokoroAudio } from './kokoro.service';

function getHash(text: string, gender: string, lang: string, provider: string, voiceId: string = ''): string {
  return crypto.createHash('md5').update(`${text.trim().toLowerCase()}_${gender}_${lang}_${provider}_${voiceId}`).digest('hex');
}

export async function generateNeuralAudio(
  text: string,
  gender: 'female' | 'male' = 'female',
  lang: 'fr' | 'en' = 'fr',
  forcedProvider?: string,
  forcedVoiceId?: string
): Promise<{ audioBase64: string; contentType: string; provider: string } | null> {
  const cleanText = text.trim();
  if (!cleanText) return null;

  let settings: any = null;
  try {
    const doc = await Settings.findOne();
    if (doc) settings = doc.toJSON ? doc.toJSON() : doc;
  } catch (err) {}

  const activeProvider = forcedProvider || settings?.preferredVoiceEngine || settings?.activeTTSProvider || 'auto';

  // Determine active voice ID based on provider & gender
  let targetVoiceId = forcedVoiceId || '';
  if (!targetVoiceId) {
    if (activeProvider === 'elevenlabs') {
      targetVoiceId = gender === 'male'
        ? (settings?.selectedElevenLabsMaleVoice || 'ErXwobaYiN019PkySvjV')
        : (settings?.selectedElevenLabsFemaleVoice || '21m00Tcm4TlvDq8ikWAM');
    } else if (activeProvider === 'openai') {
      targetVoiceId = gender === 'male'
        ? (settings?.selectedOpenAIMaleVoice || 'onyx')
        : (settings?.selectedOpenAIFemaleVoice || 'nova');
    } else if (activeProvider === 'huggingface' || activeProvider === 'kokoro') {
      targetVoiceId = gender === 'male'
        ? (settings?.selectedKokoroMaleVoice || 'bm_george')
        : (settings?.selectedKokoroFemaleVoice || 'ff_siwis');
    }
  }

  const textHash = getHash(cleanText, gender, lang, activeProvider, targetVoiceId);

  // 1. Check MongoDB Cache first — ignore legacy robotic entries if valid AI key is active!
  // If forcedVoiceId is provided (e.g. Admin voice preview test), bypass cache to guarantee fresh test playback
  if (!forcedVoiceId) {
    try {
      const cached = await TTSCache.findOne({ textHash }).maxTimeMS(1500);
      if (cached && cached.audioBase64) {
        return { audioBase64: cached.audioBase64, contentType: cached.contentType || 'audio/mp3', provider: `cache-${cached.voice}` };
      }
    } catch (err) {
      console.warn('[TTSCache] Error reading cache:', err);
    }
  }

  // --- PROVIDER 1: ELEVENLABS ---
  const tryElevenLabs = async () => {
    const elevenLabsKey = process.env.ELEVENLABS_API_KEY || settings?.elevenLabsApiKey;
    if (!elevenLabsKey) {
      console.warn('[ElevenLabs] No API key configured');
      return null;
    }

    const defaultFemale = settings?.selectedElevenLabsFemaleVoice || '21m00Tcm4TlvDq8ikWAM';
    const defaultMale = settings?.selectedElevenLabsMaleVoice || 'ErXwobaYiN019PkySvjV';
    const primaryVoiceId = forcedVoiceId || (gender === 'male' ? defaultMale : defaultFemale);
    const fallbackVoiceId = gender === 'male' ? 'ErXwobaYiN019PkySvjV' : '21m00Tcm4TlvDq8ikWAM';
    const voices = Array.from(new Set([primaryVoiceId, fallbackVoiceId]));

    for (const voiceId of voices) {
      try {
        console.log(`[ElevenLabs] Requesting synthesis for voiceId "${voiceId}" (gender=${gender}, text="${cleanText.slice(0, 30)}...")`);
        const response = await axios.post(
          `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
          {
            text: cleanText,
            model_id: 'eleven_multilingual_v2',
            voice_settings: { stability: 0.50, similarity_boost: 0.75, style: 0.00, use_speaker_boost: true },
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

          if (!forcedVoiceId) {
            TTSCache.create({ textHash, text: cleanText, voice: `elevenlabs-${voiceId}`, gender, audioBase64, contentType }).catch(() => {});
          }
          return { audioBase64, contentType, provider: `elevenlabs-${voiceId}` };
        }
      } catch (err: any) {
        let errMsg = err?.message;
        if (err?.response?.data) {
          try {
            errMsg = Buffer.from(err.response.data).toString('utf-8');
          } catch {}
        }
        console.warn(`[ElevenLabs Error] Voice ${voiceId} failed: ${errMsg}`);
      }
    }
    return null;
  };

  // --- PROVIDER 2: HUGGING FACE / KOKORO ---
  const tryHuggingFaceKokoro = async () => {
    const hfToken = process.env.HUGGINGFACE_TOKEN || process.env.HUGGINGFACE_API_KEY || settings?.huggingFaceToken || settings?.huggingFaceApiKey;
    try {
      const selectedVoice = (activeProvider === 'kokoro' || activeProvider === 'huggingface') && forcedVoiceId
        ? forcedVoiceId
        : (gender === 'male'
          ? (settings?.selectedKokoroMaleVoice || 'bm_george')
          : (settings?.selectedKokoroFemaleVoice || 'ff_siwis'));

      const kokoroRes = await generateKokoroAudio(cleanText, gender, lang, hfToken, selectedVoice);
      if (kokoroRes) {
        if (!forcedVoiceId) {
          TTSCache.create({ textHash, text: cleanText, voice: `kokoro-${selectedVoice}`, gender, audioBase64: kokoroRes.audioBase64, contentType: kokoroRes.contentType }).catch(() => {});
        }
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
      const voiceName = (activeProvider === 'openai' && forcedVoiceId)
        ? forcedVoiceId
        : (gender === 'male'
          ? (settings?.selectedOpenAIMaleVoice || 'onyx')
          : (settings?.selectedOpenAIFemaleVoice || 'nova'));

      const response = await axios.post(
        'https://api.openai.com/v1/audio/speech',
        { model: 'tts-1-hd', input: cleanText, voice: voiceName, speed: 0.95 },
        { headers: { Authorization: `Bearer ${openaiKey}`, 'Content-Type': 'application/json' }, responseType: 'arraybuffer', timeout: 12000 }
      );

      if (response.status === 200 && response.data) {
        const audioBuffer = Buffer.from(response.data);
        const audioBase64 = audioBuffer.toString('base64');
        const contentType = 'audio/mp3';

        if (!forcedVoiceId) {
          TTSCache.create({ textHash, text: cleanText, voice: `openai-${voiceName}`, gender, audioBase64, contentType }).catch(() => {});
        }
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

        if (!forcedVoiceId) {
          TTSCache.create({ textHash, text: cleanText, voice: `google-${lang}`, gender, audioBase64, contentType }).catch(() => {});
        }
        return { audioBase64, contentType, provider: 'google' };
      }
    } catch (err) {}
    return null;
  };

  // EXECUTION ROUTING FOR TEST PREVIEW & ACTIVE PROVIDERS
  if (forcedProvider) {
    if (forcedProvider === 'elevenlabs') {
      const res = await tryElevenLabs();
      if (res) return res;
    } else if (forcedProvider === 'huggingface' || forcedProvider === 'kokoro') {
      const res = await tryHuggingFaceKokoro();
      if (res) return res;
    } else if (forcedProvider === 'openai') {
      const res = await tryOpenAI();
      if (res) return res;
    } else if (forcedProvider === 'google') {
      const res = await tryGoogle();
      if (res) return res;
    }
  }

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

  // AUTO FALLBACK CASCADE (ElevenLabs ➔ OpenAI HD ➔ HuggingFace Kokoro ➔ Google)
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
