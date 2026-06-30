import { Response, NextFunction } from 'express';
import { exerciseService } from '../services/exercise.service';
import { AuthRequest } from '../types';
import { createExerciseSchema, updateExerciseSchema } from '../utils/validators';

export class ExerciseController {
  /**
   * GET /api/exercises/:id
   */
  async getById(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const isAdmin = req.user?.role === 'admin';
      const exercise = await exerciseService.getExerciseById(req.params.id, isAdmin);

      res.status(200).json({
        success: true,
        data: exercise,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /api/exercises/:id/submit
   */
  async submit(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { answers } = req.body;
      const result = await exerciseService.submitExercise(
        req.params.id,
        req.user!.userId,
        answers
      );

      res.status(200).json({
        success: true,
        data: result,
        message: result.passed ? 'Exercise completed successfully!' : 'Keep practicing!',
      });
    } catch (error) {
      next(error);
    }
  }

  // --- Admin endpoints ---

  /**
   * POST /api/admin/exercises
   */
  async create(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const validatedData = createExerciseSchema.parse(req.body);
      const exercise = await exerciseService.createExercise(validatedData);

      res.status(201).json({
        success: true,
        data: exercise,
        message: 'Exercise created successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * PUT /api/admin/exercises/:id
   */
  async update(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const validatedData = updateExerciseSchema.parse(req.body);
      const exercise = await exerciseService.updateExercise(req.params.id, validatedData);

      res.status(200).json({
        success: true,
        data: exercise,
        message: 'Exercise updated successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * DELETE /api/admin/exercises/:id
   */
  async delete(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const result = await exerciseService.deleteExercise(req.params.id);
      res.status(200).json({
        success: true,
        message: result.message,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const exerciseController = new ExerciseController();