import { Router, Request, Response } from 'express';
import { generateNeuralAudio } from '../services/tts.service';
import TTSCache from '../models/TTSCache';

const router = Router();

router.post('/speak', async (req: Request, res: Response) => {
  try {
    const { text, gender = 'female', lang = 'fr', provider, voiceId, elevenLabsApiKey, openaiApiKey, huggingFaceToken } = req.body || {};
    if (!text || typeof text !== 'string') {
      res.status(400).json({ success: false, message: 'Text payload is required' });
      return;
    }

    const audioData = await generateNeuralAudio(text, gender, lang, provider, voiceId, { elevenLabsApiKey, openaiApiKey, huggingFaceToken });

    if (audioData) {
      const isFallback = Boolean(provider && !audioData.provider.includes(provider.toLowerCase()));
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

    res.status(500).json({ success: false, message: 'Failed to synthesize studio audio' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'TTS Error' });
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
