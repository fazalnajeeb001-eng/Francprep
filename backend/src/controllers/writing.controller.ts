import { Response, NextFunction } from 'express';
import { writingService } from '../services/writing.service';
import { AuthRequest } from '../types';

function getLanguageAndExamInfo(req: AuthRequest, bodyLang?: string) {
  const langCode = String(bodyLang || (req.user as any)?.activeLanguage || 'fr').toLowerCase().trim();
  if (langCode === 'de' || langCode === 'german') {
    return { targetLanguage: 'German', examName: 'Goethe-Zertifikat / TestDaF / telc' };
  }
  if (langCode === 'es' || langCode === 'spanish') {
    return { targetLanguage: 'Spanish', examName: 'DELE / SIELE' };
  }
  if (langCode === 'it' || langCode === 'italian') {
    return { targetLanguage: 'Italian', examName: 'CILS / CELI' };
  }
  return { targetLanguage: 'French', examName: 'DELF / DALF / TCF Canada / TEF Canada' };
}

export class WritingController {
  async submit(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { text, lessonTitle, expectedAnswer, checklist, targetLanguage } = req.body;
      
      if (!text || typeof text !== 'string' || text.trim().length === 0) {
        res.status(400).json({ success: false, error: 'Please provide text to evaluate.' });
        return;
      }

      const { targetLanguage: lang, examName } = getLanguageAndExamInfo(req, targetLanguage);

      const result = await writingService.getFeedback(text, lessonTitle, expectedAnswer, checklist, lang, examName);
      
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
      const { prompt, answer, expectedAnswer, lessonTitle, targetLanguage } = req.body;
      
      if (!prompt || !answer) {
        res.status(400).json({ success: false, error: 'Please provide prompt and answer.' });
        return;
      }

      const { targetLanguage: lang } = getLanguageAndExamInfo(req, targetLanguage);

      const result = await writingService.checkGrammar(prompt, answer, expectedAnswer, lessonTitle, lang);
      
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
      const { transcription, expectedText, lessonTitle, targetLanguage } = req.body;
      
      if (!transcription || !expectedText) {
        res.status(400).json({ success: false, error: 'Please provide transcription and expected text.' });
        return;
      }

      const { targetLanguage: lang } = getLanguageAndExamInfo(req, targetLanguage);

      const result = await writingService.analyzeSpeaking(transcription, expectedText, lessonTitle, lang);
      
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
      const { messages, lessonLevel, lessonTopic, targetLanguage } = req.body;
      
      if (!messages || !Array.isArray(messages) || messages.length === 0) {
        res.status(400).json({ success: false, error: 'Messages array is required.' });
        return;
      }

      const { targetLanguage: lang } = getLanguageAndExamInfo(req, targetLanguage);

      const result = await writingService.chatWithTutor(messages, lessonLevel, lessonTopic, lang);
      
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

