import axios from 'axios';

export interface KokoroAudioResult {
  audioBase64: string;
  contentType: string;
  provider: string;
}

/**
 * Kokoro-82M Open-Source Neural Voice Engine Service
 * Voices:
 * - French Female: ff_siwis (Chloé Studio French)
 * - French Male: bm_george (Léo Studio French)
 * - English Female: af_bella
 * - English Male: am_adam
 */
export async function generateKokoroAudio(
  text: string,
  gender: 'female' | 'male' = 'female',
  lang: 'fr' | 'en' = 'fr'
): Promise<KokoroAudioResult | null> {
  const cleanText = text.trim();
  if (!cleanText) return null;

  const voice = lang === 'en'
    ? (gender === 'male' ? 'am_adam' : 'af_bella')
    : (gender === 'male' ? 'bm_george' : 'ff_siwis');

  // Query public Hugging Face Kokoro-82M Inference API
  try {
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/hexgrad/Kokoro-82M',
      { inputs: cleanText, parameters: { voice } },
      {
        headers: { 'Content-Type': 'application/json' },
        responseType: 'arraybuffer',
        timeout: 8000,
      }
    );

    if (response.status === 200 && response.data) {
      const audioBuffer = Buffer.from(response.data);
      if (audioBuffer.length > 500) {
        return {
          audioBase64: audioBuffer.toString('base64'),
          contentType: 'audio/mp3',
          provider: `kokoro-${voice}`,
        };
      }
    }
  } catch (err: any) {
    console.warn('[Kokoro Service] HF Inference endpoint note:', err?.message || err);
  }

  // Secondary high-speed public Kokoro endpoint
  try {
    const response = await axios.post(
      'https://kokoro-tts-api.hf.space/v1/audio/speech',
      { model: 'kokoro-82m', input: cleanText, voice, response_format: 'mp3' },
      {
        headers: { 'Content-Type': 'application/json' },
        responseType: 'arraybuffer',
        timeout: 8000,
      }
    );

    if (response.status === 200 && response.data) {
      const audioBuffer = Buffer.from(response.data);
      if (audioBuffer.length > 500) {
        return {
          audioBase64: audioBuffer.toString('base64'),
          contentType: 'audio/mp3',
          provider: `kokoro-${voice}`,
        };
      }
    }
  } catch (err: any) {
    console.warn('[Kokoro Service] Secondary Kokoro endpoint note:', err?.message || err);
  }

  return null;
}
