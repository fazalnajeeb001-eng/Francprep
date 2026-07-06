import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Plus, Clock } from "lucide-react";

const STORAGE_KEY = "fp_weekly_plan";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

interface DayPlan {
  day: string;
  minutes: number;
  completed: boolean;
  tasks: string[];
}

function loadWeek(): DayPlan[] {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (stored && stored.week === getWeekKey()) return stored.plans;
  } catch {}
  return DAYS.map((d) => ({ day: d, minutes: 30, completed: false, tasks: [] }));
}

function getWeekKey(): string {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const diff = now.getTime() - start.getTime();
  const week = Math.ceil((diff / 86400000 + start.getDay() + 1) / 7);
  return `${now.getFullYear()}-W${week}`;
}

function saveWeek(plans: DayPlan[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ week: getWeekKey(), plans }));
}

export function WeeklyPlanner({ dark }: { dark: boolean }) {
  const [plans, setPlans] = useState<DayPlan[]>([]);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  useEffect(() => {
    setPlans(loadWeek());
  }, []);

  const updateDay = (idx: number, updates: Partial<DayPlan>) => {
    const updated = plans.map((p, i) => i === idx ? { ...p, ...updates } : p);
    setPlans(updated);
    saveWeek(updated);
  };

  const addTask = (idx: number) => {
    const task = prompt("Add a task for this day:");
    if (task && task.trim()) {
      updateDay(idx, { tasks: [...plans[idx].tasks, task.trim()] });
    }
  };

  const removeTask = (dayIdx: number, taskIdx: number) => {
    const updated = { tasks: plans[dayIdx].tasks.filter((_, i) => i !== taskIdx) };
    updateDay(dayIdx, updated);
  };

  return (
    <div className={`${dark ? "bg-[#101828]/80 border-[#1e2a4a]" : "bg-white/80 border-gray-200"} backdrop-blur-lg border rounded-2xl p-5 transition-colors`}>
      <h3 className={`text-sm font-semibold mb-4 ${dark ? "text-gray-300" : "text-gray-700"}`}>📅 Weekly Study Planner</h3>

      <div className="grid grid-cols-7 gap-1.5 mb-4">
        {plans.map((p, i) => (
          <button key={p.day} onClick={() => setSelectedDay(selectedDay === i ? null : i)}
            className={`rounded-xl p-2 text-center transition-all ${
              selectedDay === i
                ? "ring-2 ring-purple-500 bg-purple-500/10"
                : dark ? "hover:bg-white/5" : "hover:bg-gray-100"
            } ${p.completed ? "opacity-60" : ""}`}
          >
            <span className={`text-[10px] font-medium ${dark ? "text-gray-500" : "text-gray-400"}`}>{p.day}</span>
            <div className="mt-1">
              <div className="h-1.5 rounded-full bg-gray-700 overflow-hidden">
                <div className="h-full rounded-full transition-all bg-gradient-to-r from-purple-500 to-pink-500"
                  style={{ width: `${Math.min(100, (p.minutes / 60) * 100)}%` }} />
              </div>
            </div>
            <span className={`text-[10px] mt-1 block font-semibold ${p.completed ? "text-emerald-400" : dark ? "text-gray-400" : "text-gray-500"}`}>
              {p.completed ? "✅" : `${p.minutes}m`}
            </span>
          </button>
        ))}
      </div>

      {selectedDay !== null && (
        <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
          className={`${dark ? "bg-[#070B17] border-[#1e2a4a]" : "bg-gray-50 border-gray-200"} rounded-xl p-4 border`}>
          <div className="flex items-center justify-between mb-3">
            <span className={`text-sm font-semibold ${dark ? "text-white" : "text-gray-900"}`}>{plans[selectedDay].day}</span>
            <div className="flex items-center gap-2">
              <button onClick={() => updateDay(selectedDay, { completed: !plans[selectedDay].completed })}
                className={`text-xs flex items-center gap-1 px-2.5 py-1.5 rounded-lg transition-all ${
                  plans[selectedDay].completed
                    ? "bg-emerald-500/20 text-emerald-400"
                    : dark ? "bg-white/5 text-gray-400 hover:text-white" : "bg-gray-200 text-gray-600 hover:text-gray-900"
                }`}>
                <CheckCircle2 className="w-3 h-3" /> {plans[selectedDay].completed ? "Done" : "Mark Done"}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 mb-3">
            <Clock className="w-4 h-4 text-purple-400" />
            <input type="range" min={15} max={180} step={15} value={plans[selectedDay].minutes}
              onChange={(e) => updateDay(selectedDay, { minutes: parseInt(e.target.value) })}
              className="flex-1 accent-purple-500 h-1.5" />
            <span className="text-sm font-semibold text-purple-400 w-12 text-right">{plans[selectedDay].minutes}m</span>
          </div>

          <div className="space-y-1">
            {plans[selectedDay].tasks.map((task, ti) => (
              <div key={ti} className="flex items-center gap-2 group">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 flex-shrink-0" />
                <span className={`text-xs flex-1 ${dark ? "text-gray-300" : "text-gray-700"}`}>{task}</span>
                <button onClick={() => removeTask(selectedDay, ti)}
                  className="text-[10px] text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all">✕</button>
              </div>
            ))}
            <button onClick={() => addTask(selectedDay)}
              className="flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300 mt-2 transition-colors">
              <Plus className="w-3 h-3" /> Add task
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
