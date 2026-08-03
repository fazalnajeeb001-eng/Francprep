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
  hfToken?: string,
  customVoice?: string
): Promise<KokoroAudioResult | null> {
  const cleanText = text.trim();
  if (!cleanText) return null;

  const voice = customVoice || (lang === 'en'
    ? (gender === 'male' ? 'am_adam' : 'af_bella')
    : (gender === 'male' ? 'bm_george' : 'ff_siwis'));

  const token = hfToken || process.env.HUGGINGFACE_TOKEN || process.env.HUGGINGFACE_API_KEY || process.env.HF_TOKEN || '';

  // 1. Official HuggingFace Router Endpoints (Kokoro-82M & MMS French Neural)
  const attempts = [
    { url: 'https://router.huggingface.co/hf-inference/models/hexgrad/Kokoro-82M', body: { inputs: cleanText, parameters: { voice } } },
    { url: 'https://api-inference.huggingface.co/models/hexgrad/Kokoro-82M', body: { inputs: cleanText, parameters: { voice } } },
    { url: 'https://router.huggingface.co/hf-inference/models/facebook/mms-tts-fra', body: { inputs: cleanText } },
    { url: 'https://api-inference.huggingface.co/models/facebook/mms-tts-fra', body: { inputs: cleanText } },
  ];

  for (const item of attempts) {
    try {
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token && !token.includes('...')) {
        headers['Authorization'] = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
      }

      const response = await axios.post(
        item.url,
        item.body,
        { headers, responseType: 'arraybuffer', timeout: 12000 }
      );

      if (response.status === 200 && response.data) {
        const audioBuffer = Buffer.from(response.data);
        if (audioBuffer.length > 300) {
          return {
            audioBase64: audioBuffer.toString('base64'),
            contentType: 'audio/flac',
            provider: item.url.includes('Kokoro') ? `kokoro-${voice}` : 'huggingface-mms-fra',
          };
        }
      }
    } catch (err: any) {
      let msg = err?.message;
      if (err?.response?.data) {
        try { msg = Buffer.from(err.response.data).toString('utf-8'); } catch {}
      }
      console.warn(`[Kokoro Service] ${item.url} error: ${msg?.slice(0, 120)}`);
    }
  }

  return null;
}
