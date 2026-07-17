import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import * as widgetsController from '../controllers/widgets.controller';

const router = Router();

router.get('/', authenticate, widgetsController.getWidgets);
router.put('/tasks', authenticate, widgetsController.updateTodayTasks);
router.put('/weekly-goal', authenticate, widgetsController.updateWeeklyGoal);
router.put('/weekly-plan', authenticate, widgetsController.updateWeeklyPlan);
router.put('/daily-challenge', authenticate, widgetsController.updateDailyChallenge);

export default router;
