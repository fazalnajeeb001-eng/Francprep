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
  lang: string = 'fr',
  hfToken?: string,
  customVoice?: string
): Promise<KokoroAudioResult | null> {
  const cleanText = text.trim();
  if (!cleanText) return null;

  const voice = customVoice || (lang === 'en'
    ? (gender === 'male' ? 'am_adam' : 'af_bella')
    : (gender === 'male' ? 'bm_george' : 'ff_siwis'));

  const token = hfToken || process.env.HUGGINGFACE_TOKEN || process.env.HUGGINGFACE_API_KEY || process.env.HF_TOKEN || '';
  const langCode = lang ? lang.toLowerCase().slice(0, 2) : 'fr';
  const mmsModel = langCode === 'de'
    ? 'facebook/mms-tts-deu'
    : langCode === 'es'
    ? 'facebook/mms-tts-spa'
    : langCode === 'it'
    ? 'facebook/mms-tts-ita'
    : langCode === 'en'
    ? 'facebook/mms-tts-eng'
    : 'facebook/mms-tts-fra';

  // 1. Official HuggingFace Router Endpoints (Kokoro-82M & Meta MMS Neural)
  const attempts = [
    { url: 'https://router.huggingface.co/hf-inference/models/hexgrad/Kokoro-82M', body: { inputs: cleanText, parameters: { voice } } },
    { url: 'https://api-inference.huggingface.co/models/hexgrad/Kokoro-82M', body: { inputs: cleanText, parameters: { voice } } },
    { url: `https://router.huggingface.co/hf-inference/models/${mmsModel}`, body: { inputs: cleanText } },
    { url: `https://api-inference.huggingface.co/models/${mmsModel}`, body: { inputs: cleanText } },
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
        { headers, responseType: 'arraybuffer', timeout: 15000 }
      );

      if (response.status === 200 && response.data) {
        const audioBuffer = Buffer.from(response.data);
        if (audioBuffer.length > 300) {
          return {
            audioBase64: audioBuffer.toString('base64'),
            contentType: 'audio/mp3',
            provider: item.url.includes('Kokoro') ? `kokoro-${voice}` : `huggingface-${mmsModel}`,
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
