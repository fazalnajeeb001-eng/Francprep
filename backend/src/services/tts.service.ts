import crypto from 'crypto';
import axios from 'axios';
import TTSCache from '../models/TTSCache';
import Settings from '../models/Settings';
import { generateKokoroAudio } from './kokoro.service';

function getHash(text: string, gender: string, lang: string, provider: string, voiceId: string = '', rate: number = 1.0): string {
  return crypto.createHash('md5').update(`${text.trim().toLowerCase()}_${gender}_${lang}_${provider}_${voiceId}_${rate}_v9_speed`).digest('hex');
}

export async function generateNeuralAudio(
  text: string,
  gender: 'female' | 'male' = 'female',
  lang: string = 'fr',
  forcedProvider?: string,
  forcedVoiceId?: string,
  tempKeys?: { elevenLabsApiKey?: string; openaiApiKey?: string; huggingFaceToken?: string },
  speakingRate: number = 1.0,
  speaker?: string
): Promise<{ audioBase64: string; contentType: string; provider: string } | null> {
  const cleanText = text.trim();
  if (!cleanText) return null;

  let settings: any = null;
  try {
    settings = await Settings.findOne().lean();
  } catch (err) {}

  const activeProvider = forcedProvider || settings?.preferredVoiceEngine || settings?.activeTTSProvider || 'auto';

  // Determine active voice ID based on provider, gender, and speaker persona tag
  const lowerSpeaker = (speaker || '').toLowerCase();
  let targetVoiceId = forcedVoiceId || '';
  if (!targetVoiceId) {
    if (activeProvider === 'elevenlabs' || activeProvider === 'auto') {
      if (lowerSpeaker.includes('annonceuse')) {
        targetVoiceId = 'EXAVITQu4vr4xnSDxMaL'; // Official French Female Announcer
      } else if (lowerSpeaker.includes('annonceur') || lowerSpeaker.includes('examinateur')) {
        targetVoiceId = 'ErXwobaYiN019PkySvjV'; // Official French Male Announcer
      } else if (lowerSpeaker.includes('locuteur 2') || lowerSpeaker.includes('homme 2')) {
        targetVoiceId = 'VR6AewLTigWG4xSOukaG'; // Leo (Interlocutor Male 2)
      } else if (lowerSpeaker.includes('locutrice 2') || lowerSpeaker.includes('femme 2')) {
        targetVoiceId = '21m00Tcm4TlvDq8ikWAM'; // Rachel (Interlocutor Female 2)
      } else if (gender === 'male' || lowerSpeaker.includes('locuteur') || lowerSpeaker.includes('homme')) {
        targetVoiceId = settings?.selectedElevenLabsMaleVoice || 'ONwBz21w4p8b7X1s5kL0'; // Henri (Native French Male 1)
      } else {
        targetVoiceId = settings?.selectedElevenLabsFemaleVoice || 'XB0fDUnXU5powctDhC70'; // Charlotte (Native French Female 1)
      }
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

  const textHash = getHash(cleanText, gender, lang, activeProvider, targetVoiceId, speakingRate);

  // 1. Check MongoDB Cache first — bypass if testing forced voice/provider to guarantee distinct live voice test playback
  if (!forcedVoiceId && !forcedProvider) {
    try {
      const cached = await TTSCache.findOne({ textHash }).maxTimeMS(1500);
      if (cached && cached.audioBase64) {
        return { audioBase64: cached.audioBase64, contentType: cached.contentType || 'audio/mp3', provider: `cache-${cached.voice}` };
      }
    } catch (err) {
      console.warn('[TTSCache] Error reading cache:', err);
    }
  }

  const tryElevenLabs = async () => {
    const rawKey = (tempKeys?.elevenLabsApiKey && !tempKeys.elevenLabsApiKey.includes('...'))
      ? tempKeys.elevenLabsApiKey
      : (settings?.elevenLabsApiKey && !settings.elevenLabsApiKey.includes('...'))
      ? settings.elevenLabsApiKey
      : process.env.ELEVENLABS_API_KEY;

    if (!rawKey || rawKey.includes('...')) {
      console.warn('[ElevenLabs] No valid API key configured');
      return null;
    }

    const elevenLabsKey = rawKey.trim().replace(/^["']|["']$/g, '');

    // Multi-Speaker Passage vs Announcer Voice Contrast Engine
    const announcerMatch = cleanText.match(/\b(Annonceur|Annonceuse)\s*:\s*/i);
    if (announcerMatch && announcerMatch.index !== undefined && announcerMatch.index > 0) {
      const passagePart = cleanText.slice(0, announcerMatch.index).trim();
      const announcerPart = cleanText.slice(announcerMatch.index).trim();

      const isPassageFemale = /\b(Locutrice|Annonceuse)\b/i.test(passagePart);
      const passageVoiceId = isPassageFemale ? 'XB0fDUnXU5powctDhC70' : 'ONwBz21w4p8b7X1s5kL0'; // Charlotte (Female) or Henri (Male)
      const announcerVoiceId = 'EXAVITQu4vr4xnSDxMaL'; // Official French Announcer Voice

      const cleanPassage = passagePart.replace(/^(Locuteur|Locutrice)\s*:\s*/i, '').trim();
      let cleanAnnouncer = announcerPart.replace(/^(Annonceur|Annonceuse)\s*:\s*/i, '').trim();

      // Ensure clean 1.0s pause spacing between spoken options A, B, C, D
      cleanAnnouncer = cleanAnnouncer
        .replace(/\n\.\.\.\s*/g, ' ... ')
        .replace(/\.\.\.\s*/g, ' ... ');

      try {
        console.log(`[ElevenLabs Multi-Voice] Synthesizing Passage Voice (${passageVoiceId}) + Announcer Voice (${announcerVoiceId})...`);
        const [resPassage, resAnnouncer] = await Promise.all([
          axios.post(
            `https://api.elevenlabs.io/v1/text-to-speech/${passageVoiceId}`,
            { text: cleanPassage + ' ... ', model_id: 'eleven_multilingual_v2', voice_settings: { stability: 0.50, similarity_boost: 0.80, style: 0.15, use_speaker_boost: true, speed: speakingRate } },
            { headers: { 'xi-api-key': elevenLabsKey, 'Content-Type': 'application/json', Accept: 'audio/mpeg' }, responseType: 'arraybuffer', timeout: 30000 }
          ),
          axios.post(
            `https://api.elevenlabs.io/v1/text-to-speech/${announcerVoiceId}`,
            { text: cleanAnnouncer, model_id: 'eleven_multilingual_v2', voice_settings: { stability: 0.50, similarity_boost: 0.80, style: 0.15, use_speaker_boost: true, speed: speakingRate } },
            { headers: { 'xi-api-key': elevenLabsKey, 'Content-Type': 'application/json', Accept: 'audio/mpeg' }, responseType: 'arraybuffer', timeout: 30000 }
          )
        ]);

        if (resPassage.status === 200 && resAnnouncer.status === 200) {
          const combinedBuffer = Buffer.concat([Buffer.from(resPassage.data), Buffer.from(resAnnouncer.data)]);
          const audioBase64 = combinedBuffer.toString('base64');
          const contentType = 'audio/mp3';
          if (!forcedVoiceId) {
            TTSCache.create({ textHash, text: cleanText, voice: 'elevenlabs-multi-voice', gender, audioBase64, contentType }).catch(() => {});
          }
          return { audioBase64, contentType, provider: 'elevenlabs-multi-voice' };
        }
      } catch (err: any) {
        console.warn('[ElevenLabs Multi-Voice Error]:', err?.message);
      }
    }

    const defaultFemale = settings?.selectedElevenLabsFemaleVoice || 'XB0fDUnXU5powctDhC70';
    const defaultMale = settings?.selectedElevenLabsMaleVoice || 'ONwBz21w4p8b7X1s5kL0';
    const primaryVoiceId = forcedVoiceId || (gender === 'male' ? defaultMale : defaultFemale);

    const langNativeVoiceMap: Record<string, { female: string; male: string }> = {
      fr: { female: 'XB0fDUnXU5powctDhC70', male: 'ONwBz21w4p8b7X1s5kL0' }, // Charlotte & Henri (Native French)
      de: { female: 'ThT5KcBeYPX3keUQqHPh', male: 'txWG4y3H7G4B8P2f6a9R' }, // Sarah & Daniel (Native German)
      es: { female: 'FGY2WhA2Pvf7r5V5EKC4', male: 'N2lLkkCofhh8hG1yGkC3' }, // Laura & Brian (Native Spanish)
      it: { female: 'Xb7hH8MSwGQjB69G47wE', male: 'ErXwobaYiN019PkySvjV' }, // Alice & Antoni (Native Italian)
      en: { female: '21m00Tcm4TlvDq8ikWAM', male: 'pNInz6obpgDQGcFmaJgB' }, // Rachel & Adam (Native English)
    };

    const langCode = lang ? lang.toLowerCase().slice(0, 2) : 'fr';
    const langNative = langNativeVoiceMap[langCode];
    const langFallback = langNative ? (gender === 'male' ? langNative.male : langNative.female) : null;
    const universalFallback = gender === 'male' ? 'ONwBz21w4p8b7X1s5kL0' : 'XB0fDUnXU5powctDhC70';

    const voices = Array.from(new Set([primaryVoiceId, langFallback, universalFallback].filter(Boolean) as string[]));

    for (const voiceId of voices) {
      try {
        console.log(`[ElevenLabs] Requesting synthesis for voiceId "${voiceId}" (lang=${langCode}, gender=${gender}, text="${cleanText.slice(0, 30)}...")`);
        const voiceSettings = (function(id: string) {
          switch (id) {
            case 'EXAVITQu4vr4xnSDxMaL': return { stability: 0.35, similarity_boost: 0.85, style: 0.45, use_speaker_boost: true };
            case 'AZnzlk1XvdvUeBnXmlld': return { stability: 0.65, similarity_boost: 0.70, style: 0.10, use_speaker_boost: true };
            case 'MF3mGyEYCl7XYWbV9V6O': return { stability: 0.40, similarity_boost: 0.80, style: 0.25, use_speaker_boost: true };
            case 'piTKgubMksTfvD1fz0GJ': return { stability: 0.75, similarity_boost: 0.65, style: 0.05, use_speaker_boost: true };
            case 'ErXwobaYiN019PkySvjV': return { stability: 0.55, similarity_boost: 0.80, style: 0.20, use_speaker_boost: true };
            case 'VR6AewLTigWG4xSOukaG': return { stability: 0.70, similarity_boost: 0.75, style: 0.15, use_speaker_boost: true };
            default: return { stability: 0.50, similarity_boost: 0.75, style: 0.00, use_speaker_boost: true };
          }
        })(voiceId);

        const response = await axios.post(
          `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
          {
            text: cleanText,
            model_id: 'eleven_multilingual_v2',
            voice_settings: { ...voiceSettings, speed: speakingRate },
          },
          {
            headers: { 'xi-api-key': elevenLabsKey, 'Content-Type': 'application/json', Accept: 'audio/mpeg' },
            responseType: 'arraybuffer',
            timeout: 30000,
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
    const hfToken = (tempKeys?.huggingFaceToken && !tempKeys.huggingFaceToken.includes('...'))
      ? tempKeys.huggingFaceToken
      : (settings?.huggingFaceToken && !settings.huggingFaceToken.includes('...'))
      ? settings.huggingFaceToken
      : (settings?.huggingFaceApiKey && !settings.huggingFaceApiKey.includes('...'))
      ? settings.huggingFaceApiKey
      : (process.env.HUGGINGFACE_TOKEN || process.env.HUGGINGFACE_API_KEY);

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
    const openaiKey = (tempKeys?.openaiApiKey && !tempKeys.openaiApiKey.includes('...'))
      ? tempKeys.openaiApiKey
      : (settings?.openaiApiKey && !settings.openaiApiKey.includes('...'))
      ? settings.openaiApiKey
      : process.env.OPENAI_API_KEY;

    if (!openaiKey || openaiKey.includes('...')) return null;

    try {
      const voiceName = (activeProvider === 'openai' && forcedVoiceId)
        ? forcedVoiceId
        : (gender === 'male'
          ? (settings?.selectedOpenAIMaleVoice || 'onyx')
          : (settings?.selectedOpenAIFemaleVoice || 'nova'));

      const response = await axios.post(
        'https://api.openai.com/v1/audio/speech',
        { model: 'tts-1-hd', input: cleanText, voice: voiceName, speed: Math.min(4.0, Math.max(0.25, speakingRate)) },
        { headers: { Authorization: `Bearer ${openaiKey}`, 'Content-Type': 'application/json' }, responseType: 'arraybuffer', timeout: 30000 }
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

  // --- PROVIDER 4: GOOGLE AUDIO FALLBACK (CHUNKING & MP3 CONCATENATION FOR LONG PASSAGES) ---
  const tryGoogle = async () => {
    try {
      const targetLang = lang ? lang.toLowerCase().slice(0, 2) : 'fr';

      // Split text into chunks under 160 chars so Google TTS never rejects with HTTP 404/400
      const splitIntoChunks = (str: string, maxLen = 160): string[] => {
        if (str.length <= maxLen) return [str];
        const words = str.split(' ');
        const chunks: string[] = [];
        let currentChunk = '';

        for (const word of words) {
          if ((currentChunk + ' ' + word).trim().length <= maxLen) {
            currentChunk = (currentChunk + ' ' + word).trim();
          } else {
            if (currentChunk) chunks.push(currentChunk);
            currentChunk = word;
          }
        }
        if (currentChunk) chunks.push(currentChunk);
        return chunks;
      };

      const chunks = splitIntoChunks(cleanText, 160);
      const audioBuffers: Buffer[] = [];

      for (const chunk of chunks) {
        const encoded = encodeURIComponent(chunk);
        const googleTtsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encoded}&tl=${targetLang}&client=tw-ob`;
        const response = await axios.get(googleTtsUrl, {
          responseType: 'arraybuffer',
          headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
          timeout: 8000,
        });

        if (response.status === 200 && response.data) {
          audioBuffers.push(Buffer.from(response.data));
        }
      }

      if (audioBuffers.length > 0) {
        const fullAudioBuffer = Buffer.concat(audioBuffers);
        const audioBase64 = fullAudioBuffer.toString('base64');
        const contentType = 'audio/mp3';

        return { audioBase64, contentType, provider: 'google' };
      }
    } catch (err: any) {
      console.warn('[TTS Service] Google fallback error:', err?.message);
    }
    return null;
  };

  // EXECUTION ROUTING FOR TEST PREVIEW
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

  if (gender === 'male') {
    const maleKokoro = await generateKokoroAudio(cleanText, 'male', lang, '', 'bm_george');
    if (maleKokoro) {
      return { audioBase64: maleKokoro.audioBase64, contentType: maleKokoro.contentType, provider: 'kokoro-bm_george' };
    }
  }

  const google = await tryGoogle();
  if (google) return google;

  return null;
}
