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
      const rawText = req.body.text || req.body.studentText || req.body.answer || '';
      const rawTitle = req.body.lessonTitle || req.body.paperTitle || req.body.title || 'Expression Écrite Task';
      const rawExpected = req.body.expectedAnswer || req.body.taskPrompt || req.body.prompt || '';
      const { checklist, targetLanguage, taskNumber, wordCountMin, wordCountMax, taskPrompt, sampleResponse } = req.body;
      
      if (!rawText || typeof rawText !== 'string' || rawText.trim().length === 0) {
        res.status(400).json({ success: false, error: 'Please provide text to evaluate.' });
        return;
      }

      const { targetLanguage: lang, examName } = getLanguageAndExamInfo(req, targetLanguage);

      const parsedTaskNum = typeof taskNumber === 'number' ? taskNumber : (typeof taskNumber === 'string' ? parseInt(taskNumber, 10) : undefined);
      const parsedMin = typeof wordCountMin === 'number' ? wordCountMin : (typeof wordCountMin === 'string' ? parseInt(wordCountMin, 10) : undefined);
      const parsedMax = typeof wordCountMax === 'number' ? wordCountMax : (typeof wordCountMax === 'string' ? parseInt(wordCountMax, 10) : undefined);

      const result = await writingService.getFeedback(
        rawText,
        rawTitle,
        rawExpected,
        checklist,
        lang,
        examName,
        parsedTaskNum,
        parsedMin,
        parsedMax,
        taskPrompt,
        sampleResponse
      );
      
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
      const rawTranscription = req.body.transcription || req.body.transcript || '';
      const rawExpected = req.body.expectedText || req.body.scenario || req.body.prompt || req.body.lessonTitle || 'TCF Canada Oral Interaction';
      const rawTitle = req.body.lessonTitle || req.body.paperTitle || 'Expression Orale';
      const { targetLanguage, taskNumber } = req.body;

      if (!rawTranscription) {
        res.status(400).json({ success: false, error: 'Please provide speech transcription.' });
        return;
      }

      const { targetLanguage: lang } = getLanguageAndExamInfo(req, targetLanguage);
      const parsedTaskNum = typeof taskNumber === 'number' ? taskNumber : (typeof taskNumber === 'string' ? parseInt(taskNumber, 10) : undefined);

      const result = await writingService.analyzeSpeaking(rawTranscription, rawExpected, rawTitle, lang, parsedTaskNum);
      
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

