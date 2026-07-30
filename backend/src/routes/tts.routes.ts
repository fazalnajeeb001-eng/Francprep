import { Router, Request, Response } from 'express';
import { generateNeuralAudio } from '../services/tts.service';

const router = Router();

router.post('/speak', async (req: Request, res: Response) => {
  try {
    const { text, gender = 'female', lang = 'fr' } = req.body || {};
    if (!text || typeof text !== 'string') {
      res.status(400).json({ success: false, message: 'Text payload is required' });
      return;
    }

    const audioData = await generateNeuralAudio(text, gender, lang);

    if (audioData) {
      res.status(200).json({
        success: true,
        data: {
          audioUrl: `data:${audioData.contentType};base64,${audioData.audioBase64}`,
          contentType: audioData.contentType,
        },
      });
      return;
    }

    res.status(500).json({ success: false, message: 'Failed to synthesize audio' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'TTS Error' });
  }
});

export default router;
