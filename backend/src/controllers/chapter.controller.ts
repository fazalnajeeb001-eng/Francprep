import { Response, NextFunction } from 'express';
import { chapterService } from '../services/chapter.service';
import { AuthRequest } from '../types';

export class ChapterController {
  async getById(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const chapter = await chapterService.getChapterById(req.params.id);
      res.status(200).json({ success: true, data: chapter });
    } catch (error) {
      next(error);
    }
  }

  async getLessons(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const lessons = await chapterService.getChapterLessons(req.params.id);
      res.status(200).json({ success: true, data: lessons });
    } catch (error) {
      next(error);
    }
  }

  async getVocabulary(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const vocabulary = await chapterService.getChapterVocabulary(req.params.id);
      res.status(200).json({ success: true, data: vocabulary });
    } catch (error) {
      next(error);
    }
  }

  async getExercises(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const exercises = await chapterService.getChapterExercises(req.params.id);
      res.status(200).json({ success: true, data: exercises });
    } catch (error) {
      next(error);
    }
  }

  // Admin
  async getAll(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const result = await chapterService.getAllChapters(req.query);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async create(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const chapter = await chapterService.createChapter(req.body);
      res.status(201).json({ success: true, data: chapter, message: 'Chapter created' });
    } catch (error) {
      next(error);
    }
  }

  async update(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const chapter = await chapterService.updateChapter(req.params.id, req.body);
      res.status(200).json({ success: true, data: chapter, message: 'Chapter updated' });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const result = await chapterService.deleteChapter(req.params.id);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

export const chapterController = new ChapterController();