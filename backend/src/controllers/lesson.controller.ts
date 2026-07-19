import { Response, NextFunction } from 'express';
import { lessonService } from '../services/lesson.service';
import { AuthRequest } from '../types';
import { createLessonSchema, updateLessonSchema } from '../utils/validators';

export class LessonController {
  /**
   * GET /api/lessons
   */
  async getAll(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { level, category, page, limit, sort } = req.query as any;
      const result = await lessonService.getAllLessons({
        level,
        category,
        page: page ? parseInt(page) : 1,
        limit: limit ? parseInt(limit) : 20,
        sort,
      });

      res.status(200).json({
        success: true,
        ...result,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/lessons/:id
   */
  async getById(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const lesson = await lessonService.getLessonById(req.params.id);
      res.status(200).json({
        success: true,
        data: lesson,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/lessons/:id/exercises
   */
  async getExercises(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { exerciseService } = await import('../services/exercise.service');
      const Lesson = (await import('../models/Lesson')).default;
      let lesson = await Lesson.findOne({ lessonId: req.params.id });
      if (!lesson) lesson = await Lesson.findById(req.params.id);
      const exercises = await exerciseService.getExercisesByLesson(
        lesson?._id?.toString() || req.params.id,
        req.user?.role === 'admin'
      );

      res.status(200).json({
        success: true,
        data: exercises,
      });
    } catch (error) {
      next(error);
    }
  }

  // --- Admin endpoints ---

  /**
   * POST /api/admin/lessons
   */
  async create(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const validatedData = createLessonSchema.parse(req.body);
      const lesson = await lessonService.createLesson(validatedData);

      res.status(201).json({
        success: true,
        data: lesson,
        message: 'Lesson created successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * PUT /api/admin/lessons/:id
   */
  async update(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const validatedData = updateLessonSchema.parse(req.body);
      const lesson = await lessonService.updateLesson(req.params.id, validatedData);

      res.status(200).json({
        success: true,
        data: lesson,
        message: 'Lesson updated successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * DELETE /api/admin/lessons/:id
   */
  async delete(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const result = await lessonService.deleteLesson(req.params.id);
      res.status(200).json({
        success: true,
        message: result.message,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /api/lessons/:id/submit-block
   */
  async submitBlock(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { blockType, answers } = req.body;
      if (!blockType || !answers) {
        res.status(400).json({ success: false, error: 'Missing required fields: blockType, answers' });
        return;
      }
      const gradingResult = await lessonService.submitBlock(req.params.id, blockType, answers);
      res.status(200).json({
        success: true,
        data: gradingResult,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const lessonController = new LessonController();
