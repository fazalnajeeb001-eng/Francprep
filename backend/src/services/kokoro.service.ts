import axios from 'axios';

export interface KokoroAudioResult {
  audioBase64: string;
  contentType: string;
  provider: string;
}

/**
 * Kokoro-82M Open-Source Neural Voice Engine Service
 * Native French Female: ff_siwis (Coach Chloé)
 * Native French Male: bm_george (Coach Léo)
 */
export async function generateKokoroAudio(
  text: string,
  gender: 'female' | 'male' = 'female',
  lang: 'fr' | 'en' = 'fr',
  hfToken?: string
): Promise<KokoroAudioResult | null> {
  const cleanText = text.trim();
  if (!cleanText) return null;

  const voice = lang === 'en'
    ? (gender === 'male' ? 'am_adam' : 'af_bella')
    : (gender === 'male' ? 'bm_george' : 'ff_siwis');

  const token = hfToken || process.env.HUGGINGFACE_TOKEN || process.env.HF_TOKEN || '';

  // 1. Official HuggingFace Router Endpoint
  const endpoints = [
    'https://router.huggingface.co/hf-inference/models/hexgrad/Kokoro-82M',
    'https://api-inference.huggingface.co/models/hexgrad/Kokoro-82M'
  ];

  for (const ep of endpoints) {
    try {
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await axios.post(
        ep,
        { inputs: cleanText, parameters: { voice } },
        { headers, responseType: 'arraybuffer', timeout: 8000 }
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
      console.warn(`[Kokoro Service] ${ep} error:`, err?.message || err);
    }
  }

  return null;
}
