import mongoose from 'mongoose';
import crypto from 'crypto';
import axios from 'axios';
import TTSCache from '../models/TTSCache';
import Settings from '../models/Settings';
import { generateKokoroAudio } from './kokoro.service';
import { generateEdgeNeuralAudio } from './edgeTts.service';

function getHash(text: string, gender: string = 'female', lang: string = 'fr', rate: number = 1.0): string {
  const normText = (text || '').trim().toLowerCase().replace(/[.,!?;:\s]+/g, ' ');
  const normGender = (gender || 'female').toLowerCase();
  return crypto.createHash('md5').update(`${normText}_${normGender}`).digest('hex');
}

/**
 * Strips ID3v2 header metadata to isolate pure MPEG Audio Layer III frames.
 */
function extractMpegPayload(buf: Buffer): Buffer {
  if (!buf || buf.length < 10) return buf;
  if (buf.slice(0, 3).toString() === 'ID3') {
    const b0 = buf[6], b1 = buf[7], b2 = buf[8], b3 = buf[9];
    const tagSize = ((b0 & 0x7F) << 21) | ((b1 & 0x7F) << 14) | ((b2 & 0x7F) << 7) | (b3 & 0x7F);
    const audioStart = 10 + tagSize;
    if (audioStart < buf.length) {
      return buf.slice(audioStart);
    }
  }
  return buf;
}

/**
 * Stitches multiple MP3 audio buffers into a single 100% browser-compliant stream.
 * Retains the primary ID3 header and ensures all subsequent segments contain only continuous MPEG frames.
 */
function stitchMp3Buffers(buffers: Buffer[]): Buffer {
  if (!buffers || buffers.length === 0) return Buffer.alloc(0);
  if (buffers.length === 1) return buffers[0];

  const firstBuf = buffers[0];
  let id3Header = Buffer.alloc(0);

  if (firstBuf.slice(0, 3).toString() === 'ID3') {
    const b0 = firstBuf[6], b1 = firstBuf[7], b2 = firstBuf[8], b3 = firstBuf[9];
    const tagSize = ((b0 & 0x7F) << 21) | ((b1 & 0x7F) << 14) | ((b2 & 0x7F) << 7) | (b3 & 0x7F);
    id3Header = firstBuf.slice(0, 10 + tagSize);
  }

  const rawPayloads = buffers.map(b => extractMpegPayload(b));
  return Buffer.concat([id3Header, ...rawPayloads]);
}

/**
 * Strips speaker prefixes (e.g. "Locuteur 1:", "Locutrice 2:", "Annonceur:", "Homme:", "Femme:")
 * so that the synthesized studio voice only speaks the actual dialogue/instructions,
 * never reading aloud the speaker tag name.
 */
export function stripSpeakerLabels(text: string): string {
  if (!text) return '';
  return text
    .replace(/(?:^|\n)\s*(?:Locuteur\s*\d*|Locutrice\s*\d*|Homme\s*\d*|Femme\s*\d*|Annonceur|Annonceuse|Journaliste|Intervenant(?:e)?)\s*:\s*/gi, ' ')
    .trim();
}

/**
 * Parses transcript into sequential speaker turns and extracts clean spoken text.
 */
interface DialogueSegment {
  speakerTag: string;
  voiceId: string;
  text: string;
  isAnnouncer: boolean;
}

function parseDialogueSegments(
  text: string,
  defaultMaleVoice: string,
  defaultFemaleVoice: string,
  defaultGender: 'female' | 'male' = 'female'
): DialogueSegment[] {
  const clean = text.trim();
  const segments: DialogueSegment[] = [];

  // Match all standard French TCF speaker prefixes
  const speakerRegex = /(?:^|\n)\s*(Locuteur\s*\d*|Locutrice\s*\d*|Homme\s*\d*|Femme\s*\d*|Annonceur|Annonceuse|Journaliste|Intervenant(?:e)?)\s*:\s*/gi;
  const matches = [...clean.matchAll(speakerRegex)];

  if (matches.length === 0) {
    const isMale = defaultGender === 'male';
    const isAnnouncer = clean.toLowerCase().startsWith('consigne') || clean.toLowerCase().startsWith('question');
    segments.push({
      speakerTag: isAnnouncer ? (isMale ? 'Annonceur' : 'Annonceuse') : (isMale ? 'Locuteur' : 'Locutrice'),
      voiceId: isMale ? defaultMaleVoice : defaultFemaleVoice,
      text: stripSpeakerLabels(clean),
      isAnnouncer
    });
    return segments;
  }

  for (let i = 0; i < matches.length; i++) {
    const currentMatch = matches[i];
    const speakerTag = currentMatch[1].trim();
    const startIndex = currentMatch.index! + currentMatch[0].length;
    const endIndex = (i + 1 < matches.length) ? matches[i + 1].index! : clean.length;
    const segmentText = stripSpeakerLabels(clean.slice(startIndex, endIndex).trim());

    if (segmentText) {
      const lowerTag = speakerTag.toLowerCase();
      const isMale = lowerTag.includes('locuteur 1') || lowerTag.includes('homme 1') || lowerTag.includes('homme') || lowerTag === 'locuteur';
      const isFemale2 = lowerTag.includes('locutrice 2') || lowerTag.includes('femme 2');
      const isMale2 = lowerTag.includes('locuteur 2') || lowerTag.includes('homme 2');
      const isAnnouncerFemale = lowerTag.includes('annonceuse');
      const isAnnouncerMale = lowerTag.includes('annonceur') || lowerTag.includes('journaliste');
      const isAnnouncer = isAnnouncerFemale || isAnnouncerMale;

      let voiceId = defaultFemaleVoice;
      if (isAnnouncerFemale) {
        voiceId = 'EXAVITQu4vr4xnSDxMaL'; // Sarah
      } else if (isAnnouncerMale) {
        voiceId = 'JBFqnCBsd6RMkjVDRZzb'; // George
      } else if (isFemale2) {
        voiceId = '21m00Tcm4TlvDq8ikWAM'; // Rachel
      } else if (isMale2) {
        voiceId = 'ErXwobaYiN019PkySvjV'; // Antoni
      } else if (isMale) {
        voiceId = defaultMaleVoice;
      } else {
        voiceId = defaultFemaleVoice;
      }

      segments.push({
        speakerTag,
        voiceId,
        text: segmentText,
        isAnnouncer
      });
    }
  }

  return segments;
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
  const rawCleanText = text.trim();
  if (!rawCleanText) return null;

  const cleanText = rawCleanText
    .replace(/^(Locuteur|Locutrice|Annonceur|Annonceuse)\s*:\s*/i, '')
    .replace(/^\s*\.\.\.\s*[A-D]\s*:\s*/i, '')
    .replace(/^\s*[A-D]\s*:\s*/i, '')
    .trim();
  if (!cleanText) return null;

  let settings: any = null;
  try {
    settings = await Settings.findOne().lean();
  } catch (err) {}

  const activeProvider = forcedProvider || settings?.preferredVoiceEngine || settings?.activeTTSProvider || 'auto';

  // Determine active voice ID based on provider, gender, and speaker persona tag
  const lowerSpeaker = (speaker || text || '').toLowerCase();
  let targetVoiceId = forcedVoiceId || '';
  if (!targetVoiceId) {
    if (activeProvider === 'elevenlabs' || activeProvider === 'auto') {
      if (lowerSpeaker.includes('annonceuse')) {
        targetVoiceId = 'EXAVITQu4vr4xnSDxMaL'; // Official French Female Announcer (Sarah)
      } else if (lowerSpeaker.includes('annonceur') || lowerSpeaker.includes('examinateur')) {
        targetVoiceId = 'onwK4e9ZLuTAKqWW03F9'; // Official French Male Announcer (Daniel)
      } else if (lowerSpeaker.includes('locuteur 2') || lowerSpeaker.includes('homme 2')) {
        targetVoiceId = 'cjVigY5qzO86Huf0OWal'; // Eric (Interlocutor Male 2)
      } else if (lowerSpeaker.includes('locutrice 2') || lowerSpeaker.includes('femme 2')) {
        targetVoiceId = 'cgSgspJ2msm6clMCkdW9'; // Jessica (Interlocutor Female 2)
      } else if (gender === 'male' || lowerSpeaker.includes('locuteur') || lowerSpeaker.includes('homme')) {
        targetVoiceId = settings?.selectedElevenLabsMaleVoice || 'JBFqnCBsd6RMkjVDRZzb'; // George (Native French Male 1)
      } else {
        targetVoiceId = settings?.selectedElevenLabsFemaleVoice || 'EXAVITQu4vr4xnSDxMaL'; // Sarah (Native French Female 1)
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

  const textHash = getHash(cleanText, gender, lang, speakingRate);
  const normGender = (gender || 'female').toLowerCase();
  const normTextRaw = cleanText.toLowerCase().replace(/[.,!?;:\s]+/g, ' ');
  const normTextTrimmed = normTextRaw.trim();
  const canonicalHash = crypto.createHash('md5').update(`${normTextRaw}_${normGender}`).digest('hex');
  const canonicalHashTrimmed = crypto.createHash('md5').update(`${normTextTrimmed}_${normGender}`).digest('hex');
  const canonicalHashWithSpace = crypto.createHash('md5').update(`${normTextTrimmed} _${normGender}`).digest('hex');

  // 1. Check MongoDB Cache first — instant hit by textHash or exact text match
  try {
    const cleanPrefix = cleanText.replace(/\s*(\.{2,}|\u2026)\s*$/, '').trim();
    const escapedText = cleanText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const escapedRaw = rawCleanText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const escapedPrefix = cleanPrefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    let cached = await TTSCache.findOne({
      $or: [
        { textHash },
        { textHash: canonicalHash },
        { textHash: canonicalHashTrimmed },
        { textHash: canonicalHashWithSpace },
        { text: cleanText, gender },
        { text: cleanText },
        { text: rawCleanText },
        { text: new RegExp('^' + escapedText + '$', 'i') },
        { text: new RegExp(escapedText, 'i') },
        { text: new RegExp(escapedRaw, 'i') },
        { text: new RegExp('^' + escapedPrefix, 'i') },
        { text: new RegExp(escapedPrefix, 'i') }
      ]
    }).maxTimeMS(2500);

    if (!cached && mongoose.connection?.db) {
      try {
        const testDb = mongoose.connection.useDb('test').db;
        if (testDb) {
          const doc = await testDb.collection('ttscaches').findOne({
            $or: [
              { textHash },
              { textHash: canonicalHash },
              { textHash: canonicalHashTrimmed },
              { textHash: canonicalHashWithSpace },
              { text: cleanText, gender },
              { text: cleanText },
              { text: rawCleanText },
              { text: new RegExp('^' + escapedText + '$', 'i') },
              { text: new RegExp(escapedText, 'i') },
              { text: new RegExp(escapedRaw, 'i') },
              { text: new RegExp('^' + escapedPrefix, 'i') },
              { text: new RegExp(escapedPrefix, 'i') }
            ]
          }, { maxTimeMS: 2500 });
          if (doc) cached = doc as any;
        }
      } catch {}
    }

    if (cached && cached.audioBase64) {
      return { audioBase64: cached.audioBase64, contentType: cached.contentType || 'audio/mp3', provider: `cache-${cached.voice}` };
    }
  } catch (err) {
    console.warn('[TTSCache] Error reading cache:', err);
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
    const defaultFemale = settings?.selectedElevenLabsFemaleVoice || 'EXAVITQu4vr4xnSDxMaL';
    const defaultMale = settings?.selectedElevenLabsMaleVoice || 'JBFqnCBsd6RMkjVDRZzb';

    // Parse multi-speaker dialogues and announcer sections
    const segments = parseDialogueSegments(cleanText, defaultMale, defaultFemale, gender);

    if (segments.length > 1) {
      try {
        console.log(`[ElevenLabs Multi-Voice] Synthesizing ${segments.length} distinct dialogue turns sequentially...`);
        const rawBuffers: Buffer[] = [];

        for (let i = 0; i < segments.length; i++) {
          const seg = segments[i];
          const pauseSuffix = (i < segments.length - 1) ? ' ... ' : '';
          const segRes = await axios.post(
            `https://api.elevenlabs.io/v1/text-to-speech/${seg.voiceId}`,
            {
              text: seg.text + pauseSuffix,
              model_id: 'eleven_multilingual_v2',
              voice_settings: {
                stability: 0.50,
                similarity_boost: 0.80,
                style: 0.15,
                use_speaker_boost: true,
                speed: Math.min(1.2, Math.max(0.7, speakingRate || 1.0))
              }
            },
            {
              headers: {
                'xi-api-key': elevenLabsKey,
                'Content-Type': 'application/json',
                Accept: 'audio/mpeg'
              },
              responseType: 'arraybuffer',
              timeout: 35000
            }
          );

          if (segRes.status === 200 && segRes.data) {
            rawBuffers.push(Buffer.from(segRes.data));
          }

          if (i < segments.length - 1) {
            await new Promise((r) => setTimeout(r, 120));
          }
        }

        if (rawBuffers.length === segments.length) {
          const stitchedBuffer = stitchMp3Buffers(rawBuffers);
          const audioBase64 = stitchedBuffer.toString('base64');
          const contentType = 'audio/mp3';

          if (!forcedVoiceId) {
            await TTSCache.findOneAndUpdate(
              { textHash },
              { textHash, text: cleanText, voice: 'elevenlabs-multi-voice', gender, audioBase64, contentType },
              { upsert: true, new: true }
            ).catch((e: any) => console.warn('[TTSCache] Multi-voice save error:', e.message));
          }

          return { audioBase64, contentType, provider: 'elevenlabs-multi-voice' };
        }
      } catch (err: any) {
        console.warn('[ElevenLabs Multi-Voice Error]:', err?.message);
      }
    }

    const primaryVoiceId = forcedVoiceId || (gender === 'male' ? defaultMale : defaultFemale);

    const langNativeVoiceMap: Record<string, { female: string; male: string }> = {
      fr: { female: 'EXAVITQu4vr4xnSDxMaL', male: 'JBFqnCBsd6RMkjVDRZzb' }, // Sarah & George (Native French)
      de: { female: 'EXAVITQu4vr4xnSDxMaL', male: 'JBFqnCBsd6RMkjVDRZzb' },
      es: { female: 'EXAVITQu4vr4xnSDxMaL', male: 'JBFqnCBsd6RMkjVDRZzb' },
      it: { female: 'EXAVITQu4vr4xnSDxMaL', male: 'ErXwobaYiN019PkySvjV' },
      en: { female: '21m00Tcm4TlvDq8ikWAM', male: 'JBFqnCBsd6RMkjVDRZzb' },
    };

    const langCode = lang ? lang.toLowerCase().slice(0, 2) : 'fr';
    const langNative = langNativeVoiceMap[langCode];
    const langFallback = langNative ? (gender === 'male' ? langNative.male : langNative.female) : null;
    const universalFallback = gender === 'male' ? 'JBFqnCBsd6RMkjVDRZzb' : 'EXAVITQu4vr4xnSDxMaL';

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

        const spokenText = stripSpeakerLabels(cleanText);
        const response = await axios.post(
          `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
          {
            text: spokenText,
            model_id: 'eleven_multilingual_v2',
            voice_settings: { ...voiceSettings, speed: Math.min(1.2, Math.max(0.7, speakingRate || 1.0)) },
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
            await TTSCache.findOneAndUpdate(
              { textHash },
              { textHash, text: cleanText, voice: `elevenlabs-${voiceId}`, gender, audioBase64, contentType },
              { upsert: true, new: true }
            ).catch((e: any) => console.warn('[TTSCache] Save error:', e.message));
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

      const spokenText = stripSpeakerLabels(cleanText);
      const kokoroRes = await generateKokoroAudio(spokenText, gender, lang, hfToken, selectedVoice);
      if (kokoroRes) {
        if (!forcedVoiceId) {
          await TTSCache.findOneAndUpdate(
            { textHash },
            { textHash, text: cleanText, voice: `kokoro-${selectedVoice}`, gender, audioBase64: kokoroRes.audioBase64, contentType: kokoroRes.contentType },
            { upsert: true, new: true }
          ).catch(() => {});
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

      const spokenText = stripSpeakerLabels(cleanText);
      const response = await axios.post(
        'https://api.openai.com/v1/audio/speech',
        { model: 'tts-1-hd', input: spokenText, voice: voiceName, speed: Math.min(4.0, Math.max(0.25, speakingRate)) },
        { headers: { Authorization: `Bearer ${openaiKey}`, 'Content-Type': 'application/json' }, responseType: 'arraybuffer', timeout: 30000 }
      );

      if (response.status === 200 && response.data) {
        const audioBuffer = Buffer.from(response.data);
        const audioBase64 = audioBuffer.toString('base64');
        const contentType = 'audio/mp3';

        if (!forcedVoiceId) {
          await TTSCache.findOneAndUpdate(
            { textHash },
            { textHash, text: cleanText, voice: `openai-${voiceName}`, gender, audioBase64, contentType },
            { upsert: true, new: true }
          ).catch(() => {});
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

      const spokenText = stripSpeakerLabels(cleanText);
      const chunks = splitIntoChunks(spokenText, 160);
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

        if (!forcedVoiceId) {
          await TTSCache.findOneAndUpdate(
            { textHash },
            { textHash, text: cleanText, voice: `google-${targetLang}-${gender}`, gender, audioBase64, contentType },
            { upsert: true, new: true }
          ).catch(() => {});
        }

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

  // 1. PRIMARY STUDIO ENGINE: Microsoft Azure Neural French 8-Voice System
  try {
    const edgeRes = await generateEdgeNeuralAudio(rawCleanText, gender, lang, speakingRate);
    if (edgeRes && edgeRes.audioBase64) {
      await TTSCache.findOneAndUpdate(
        { textHash },
        {
          textHash,
          text: rawCleanText,
          voice: edgeRes.provider,
          gender,
          audioBase64: edgeRes.audioBase64,
          contentType: 'audio/mp3',
        },
        { upsert: true, new: true }
      ).catch(() => {});

      return edgeRes;
    }
  } catch (err: any) {
    console.warn('[TTS Service] Edge Neural synthesis fallback notice:', err?.message);
  }

  // 2. FALLBACK: ElevenLabs (if key and credits available)
  const eleven = await tryElevenLabs();
  if (eleven) return eleven;

  // 3. FALLBACK: OpenAI HD (if key available)
  const openAiAudio = await tryOpenAI();
  if (openAiAudio) return openAiAudio;

  // 4. FALLBACK: HuggingFace Kokoro
  const kokoro = await tryHuggingFaceKokoro();
  if (kokoro) return kokoro;

  if (gender === 'male') {
    const maleKokoro = await generateKokoroAudio(cleanText, 'male', lang, '', 'bm_george');
    if (maleKokoro) {
      return { audioBase64: maleKokoro.audioBase64, contentType: maleKokoro.contentType, provider: 'kokoro-bm_george' };
    }
  }

  return null;
}
