import UserWidget, { IUserWidget } from '../models/UserWidget';

function getWeekKey(): string {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const diff = now.getTime() - start.getTime();
  const week = Math.ceil((diff / 86400000 + start.getDay() + 1) / 7);
  return `${now.getFullYear()}-W${week}`;
}

export async function getWidgets(userId: string) {
  let widget = await UserWidget.findOne({ userId });
  if (!widget) {
    widget = await UserWidget.create({ userId });
  }

  const weekKey = getWeekKey();

  // Auto-reset weekly goal if it's a new week
  if (widget.weeklyGoalWeek !== weekKey) {
    widget.weeklyGoal = null;
    widget.weeklyGoalWeek = weekKey;
  }

  // Auto-reset weekly plan if it's a new week
  if (widget.weeklyPlanWeek !== weekKey) {
    widget.weeklyPlan = [];
    widget.weeklyPlanWeek = weekKey;
  }

  await widget.save();
  return widget;
}

export async function updateTodayTasks(userId: string, tasks: IUserWidget['todayTasks']) {
  const widget = await UserWidget.findOneAndUpdate(
    { userId },
    { todayTasks: tasks },
    { upsert: true, new: true }
  );
  return widget;
}

export async function updateWeeklyGoal(
  userId: string,
  goal: IUserWidget['weeklyGoal']
) {
  const weekKey = getWeekKey();
  const widget = await UserWidget.findOneAndUpdate(
    { userId },
    { weeklyGoal: goal, weeklyGoalWeek: weekKey },
    { upsert: true, new: true }
  );
  return widget;
}

export async function updateWeeklyPlan(
  userId: string,
  plan: IUserWidget['weeklyPlan']
) {
  const weekKey = getWeekKey();
  const widget = await UserWidget.findOneAndUpdate(
    { userId },
    { weeklyPlan: plan, weeklyPlanWeek: weekKey },
    { upsert: true, new: true }
  );
  return widget;
}

export async function updateDailyChallenge(
  userId: string,
  date: string,
  index: number
) {
  const widget = await UserWidget.findOneAndUpdate(
    { userId },
    { dailyChallengeDate: date, dailyChallengeIndex: index },
    { upsert: true, new: true }
  );
  return widget;
}
