import { Router, Request, Response } from 'express';
import { generateNeuralAudio } from '../services/tts.service';
import TTSCache from '../models/TTSCache';

const router = Router();

async function getFallbackGoogleAudio(text: string): Promise<string | null> {
  try {
    const encodedText = encodeURIComponent(text.slice(0, 200));
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodedText}&tl=fr&client=tw-ob`;
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    if (res.ok) {
      const buffer = await res.arrayBuffer();
      return Buffer.from(buffer).toString('base64');
    }
  } catch (err: any) {
    console.warn('[Google TTS Fallback Error]:', err?.message || err);
  }
  return null;
}

router.post('/speak', async (req: Request, res: Response) => {
  try {
    const { text, gender = 'female', speaker, lang = 'fr', provider, voiceId, speakingRate, rate, elevenLabsApiKey, openaiApiKey, huggingFaceToken } = req.body || {};
    if (!text || typeof text !== 'string') {
      res.status(400).json({ success: false, message: 'Text payload is required' });
      return;
    }

    const finalRate = parseFloat(speakingRate || rate || 1.0) || 1.0;
    let audioData = await generateNeuralAudio(text, gender, lang, provider, voiceId, { elevenLabsApiKey, openaiApiKey, huggingFaceToken }, finalRate, speaker);

    if (!audioData || !audioData.audioBase64) {
      // Ultimate safety net fallback using Google TTS audio stream
      const fallbackBase64 = await getFallbackGoogleAudio(text);
      if (fallbackBase64) {
        audioData = {
          audioBase64: fallbackBase64,
          contentType: 'audio/mp3',
          provider: 'google-tts-fallback'
        };
      }
    }

    if (audioData && audioData.audioBase64) {
      const isFallback = Boolean(provider && audioData.provider.startsWith('google'));
      res.status(200).json({
        success: true,
        data: {
          audioUrl: `data:${audioData.contentType};base64,${audioData.audioBase64}`,
          contentType: audioData.contentType,
          provider: audioData.provider,
          requestedProvider: provider,
          fallbackActive: isFallback,
        },
      });
      return;
    }

    res.status(200).json({
      success: false,
      fallbackActive: true,
      message: 'Failed to synthesize studio audio, using direct client stream fallback',
    });
  } catch (error: any) {
    console.error('[TTS Route Error]:', error?.message || error);
    // Ultimate safety net error recovery
    try {
      const fallbackBase64 = await getFallbackGoogleAudio(req.body?.text || 'Bonjour');
      if (fallbackBase64) {
        res.status(200).json({
          success: true,
          data: {
            audioUrl: `data:audio/mp3;base64,${fallbackBase64}`,
            contentType: 'audio/mp3',
            provider: 'google-tts-error-fallback',
            fallbackActive: true,
          },
        });
        return;
      }
    } catch {}

    res.status(200).json({
      success: false,
      fallbackActive: true,
      message: error.message || 'TTS Error, using direct client stream fallback',
    });
  }
});

// Clear TTS Audio Cache Endpoint
router.post('/clear-cache', async (_req: Request, res: Response) => {
  try {
    const result = await TTSCache.deleteMany({});
    res.json({ success: true, message: `Cleared ${result.deletedCount} cached audio files.` });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
