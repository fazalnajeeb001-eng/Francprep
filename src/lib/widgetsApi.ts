import { apiFetch } from "~/lib/apiFetch";

export interface TodayTask {
  id: string;
  text: string;
  done: boolean;
  createdAt: number;
}

export interface WeeklyGoal {
  text: string;
  current: number;
  target: number;
  completed: boolean;
}

export interface DayPlan {
  day: string;
  minutes: number;
  completed: boolean;
  tasks: string[];
}

export interface UserWidgets {
  todayTasks: TodayTask[];
  weeklyGoal: WeeklyGoal | null;
  weeklyGoalWeek: string;
  weeklyPlan: DayPlan[];
  weeklyPlanWeek: string;
  dailyChallengeDate: string;
  dailyChallengeIndex: number;
}

export async function fetchWidgets(): Promise<UserWidgets> {
  const res = await apiFetch("/widgets");
  if (!res.ok) throw new Error("Failed to fetch widgets");
  const json = await res.json();
  return json.data;
}

export async function saveTodayTasks(tasks: TodayTask[]): Promise<void> {
  await apiFetch("/widgets/tasks", {
    method: "PUT",
    body: JSON.stringify({ tasks }),
  });
}

export async function saveWeeklyGoal(goal: WeeklyGoal | null): Promise<void> {
  await apiFetch("/widgets/weekly-goal", {
    method: "PUT",
    body: JSON.stringify({ goal }),
  });
}

export async function saveWeeklyPlan(plan: DayPlan[]): Promise<void> {
  await apiFetch("/widgets/weekly-plan", {
    method: "PUT",
    body: JSON.stringify({ plan }),
  });
}

export async function saveDailyChallenge(date: string, index: number): Promise<void> {
  await apiFetch("/widgets/daily-challenge", {
    method: "PUT",
    body: JSON.stringify({ date, index }),
  });
}
