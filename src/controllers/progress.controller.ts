import { Response, NextFunction } from 'express';
import { progressService } from '../services/progress.service';
import { AuthRequest } from '../types';

export class ProgressController {
  /**
   * GET /api/progress
   */
  async getAll(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const progress = await progressService.getUserProgress(req.user!.userId);
      res.status(200).json({
        success: true,
        data: progress,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/progress/:lesson_id
   */
  async getByLesson(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const progress = await progressService.getLessonProgress(
        req.user!.userId,
        req.params.lesson_id
      );
      res.status(200).json({
        success: true,
        data: progress,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /api/progress/:lesson_id/update
   */
  async update(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const progress = await progressService.updateProgress(
        req.user!.userId,
        req.params.lesson_id,
        req.body
      );
      res.status(200).json({
        success: true,
        data: progress,
        message: 'Progress updated successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  // --- Admin endpoints ---

  /**
   * GET /api/admin/progress/users/:user_id
   */
  async getUserProgressAdmin(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const progress = await progressService.getAllProgressForUser(req.params.user_id);
      res.status(200).json({
        success: true,
        data: progress,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const progressController = new ProgressController();