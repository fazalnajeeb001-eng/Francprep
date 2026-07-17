import { Request, Response } from 'express';
import * as widgetService from '../services/widgets.service';

export async function getWidgets(req: Request, res: Response) {
  try {
    const userId = (req as any).userId;
    const widget = await widgetService.getWidgets(userId);
    res.json({ success: true, data: widget });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
}

export async function updateTodayTasks(req: Request, res: Response) {
  try {
    const userId = (req as any).userId;
    const { tasks } = req.body;
    const widget = await widgetService.updateTodayTasks(userId, tasks);
    res.json({ success: true, data: widget });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
}

export async function updateWeeklyGoal(req: Request, res: Response) {
  try {
    const userId = (req as any).userId;
    const { goal } = req.body;
    const widget = await widgetService.updateWeeklyGoal(userId, goal);
    res.json({ success: true, data: widget });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
}

export async function updateWeeklyPlan(req: Request, res: Response) {
  try {
    const userId = (req as any).userId;
    const { plan } = req.body;
    const widget = await widgetService.updateWeeklyPlan(userId, plan);
    res.json({ success: true, data: widget });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
}

export async function updateDailyChallenge(req: Request, res: Response) {
  try {
    const userId = (req as any).userId;
    const { date, index } = req.body;
    const widget = await widgetService.updateDailyChallenge(userId, date, index);
    res.json({ success: true, data: widget });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
}
