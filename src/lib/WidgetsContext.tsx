import { createContext, useContext, useState, useEffect, useCallback, useRef, type ReactNode } from "react";
import {
  fetchWidgets,
  saveTodayTasks,
  saveWeeklyGoal,
  saveWeeklyPlan,
  saveDailyChallenge,
  type TodayTask,
  type WeeklyGoal,
  type DayPlan,
  type UserWidgets,
} from "./widgetsApi";

interface WidgetsContextType {
  widgets: UserWidgets | null;
  loading: boolean;
  updateTodayTasks: (tasks: TodayTask[]) => void;
  updateWeeklyGoal: (goal: WeeklyGoal | null) => void;
  updateWeeklyPlan: (plan: DayPlan[]) => void;
  updateDailyChallenge: (date: string, index: number) => void;
}

const WidgetsContext = createContext<WidgetsContextType | null>(null);

function getWeekKey(): string {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const diff = now.getTime() - start.getTime();
  const week = Math.ceil((diff / 86400000 + start.getDay() + 1) / 7);
  return `${now.getFullYear()}-W${week}`;
}

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const defaultWidgets: UserWidgets = {
  todayTasks: [],
  weeklyGoal: null,
  weeklyGoalWeek: getWeekKey(),
  weeklyPlan: DAYS.map((d) => ({ day: d, minutes: 30, completed: false, tasks: [] })),
  weeklyPlanWeek: getWeekKey(),
  dailyChallengeDate: "",
  dailyChallengeIndex: 0,
};

export function WidgetsProvider({ children }: { children: ReactNode }) {
  const [widgets, setWidgets] = useState<UserWidgets | null>(null);
  const [loading, setLoading] = useState(true);
  const saveTimers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  useEffect(() => {
    let cancelled = false;
    fetchWidgets()
      .then((data) => {
        if (!cancelled) {
          setWidgets(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setWidgets(defaultWidgets);
          setLoading(false);
        }
      });
    return () => { cancelled = true; };
  }, []);

  const debouncedSave = useCallback((key: string, fn: () => Promise<void>) => {
    if (saveTimers.current[key]) clearTimeout(saveTimers.current[key]);
    saveTimers.current[key] = setTimeout(() => { fn(); }, 500);
  }, []);

  const updateTodayTasks = useCallback((tasks: TodayTask[]) => {
    setWidgets((prev) => (prev ? { ...prev, todayTasks: tasks } : prev));
    debouncedSave("tasks", () => saveTodayTasks(tasks));
  }, [debouncedSave]);

  const updateWeeklyGoal = useCallback((goal: WeeklyGoal | null) => {
    setWidgets((prev) => (prev ? { ...prev, weeklyGoal: goal } : prev));
    debouncedSave("goal", () => saveWeeklyGoal(goal));
  }, [debouncedSave]);

  const updateWeeklyPlan = useCallback((plan: DayPlan[]) => {
    setWidgets((prev) => (prev ? { ...prev, weeklyPlan: plan } : prev));
    debouncedSave("plan", () => saveWeeklyPlan(plan));
  }, [debouncedSave]);

  const updateDailyChallenge = useCallback((date: string, index: number) => {
    setWidgets((prev) => (prev ? { ...prev, dailyChallengeDate: date, dailyChallengeIndex: index } : prev));
    debouncedSave("challenge", () => saveDailyChallenge(date, index));
  }, [debouncedSave]);

  return (
    <WidgetsContext.Provider value={{ widgets, loading, updateTodayTasks, updateWeeklyGoal, updateWeeklyPlan, updateDailyChallenge }}>
      {children}
    </WidgetsContext.Provider>
  );
}

export function useWidgets() {
  const ctx = useContext(WidgetsContext);
  if (!ctx) throw new Error("useWidgets must be used within WidgetsProvider");
  return ctx;
}
