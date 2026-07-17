import { Response, NextFunction } from 'express';
import { dashboardService } from '../services/dashboard.service';
import { AuthRequest } from '../types';

export class DashboardController {
  /**
   * GET /api/dashboard
   */
  async getDashboard(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const data = await dashboardService.getDashboard(req.user!.userId);
      res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const dashboardController = new DashboardController();
