import { Response, NextFunction } from 'express';
import { writingService } from '../services/writing.service';
import { AuthRequest } from '../types';

export class WritingController {
  async submit(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { text, lessonTitle, expectedAnswer, checklist } = req.body;
      
      if (!text || typeof text !== 'string' || text.trim().length === 0) {
        res.status(400).json({ success: false, error: 'Please provide text to evaluate.' });
        return;
      }

      const result = await writingService.getFeedback(text, lessonTitle, expectedAnswer, checklist);
      
      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async grammarCheck(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { prompt, answer, expectedAnswer } = req.body;
      
      if (!prompt || !answer) {
        res.status(400).json({ success: false, error: 'Please provide prompt and answer.' });
        return;
      }

      const result = await writingService.checkGrammar(prompt, answer, expectedAnswer);
      
      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async analyzeSpeaking(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { transcription, expectedText, lessonTitle } = req.body;
      
      if (!transcription || !expectedText) {
        res.status(400).json({ success: false, error: 'Please provide transcription and expected text.' });
        return;
      }

      const result = await writingService.analyzeSpeaking(transcription, expectedText, lessonTitle);
      
      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async speakingChat(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { messages, lessonLevel, lessonTopic } = req.body;
      
      if (!messages || !Array.isArray(messages) || messages.length === 0) {
        res.status(400).json({ success: false, error: 'Messages array is required.' });
        return;
      }

      const result = await writingService.chatWithTutor(messages, lessonLevel, lessonTopic);
      
      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const writingController = new WritingController();
