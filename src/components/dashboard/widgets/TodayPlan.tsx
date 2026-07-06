import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowRight, CheckCircle2, Circle, Plus, Trash2 } from "lucide-react";
import type { DashboardData } from "../types";

const STORAGE_KEY = "fp_today_plan";

interface PlanItem {
  id: string;
  title: string;
  type: string;
  completed: boolean;
  custom?: boolean;
}

function loadCustomPlans(): PlanItem[] {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); }
  catch { return []; }
}

function saveCustomPlans(plans: PlanItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(plans));
}

export function TodayPlan({ plans, dark }: { plans: DashboardData["todayPlan"]; dark: boolean }) {
  const [customPlans, setCustomPlans] = useState<PlanItem[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [showInput, setShowInput] = useState(false);

  useEffect(() => { setCustomPlans(loadCustomPlans()); }, []);

  const allPlans = [...plans, ...customPlans];

  const addPlan = () => {
    const title = newTitle.trim();
    if (!title) return;
    const item: PlanItem = { id: `custom-${Date.now()}`, title, type: "custom", completed: false, custom: true };
    const updated = [...customPlans, item];
    setCustomPlans(updated);
    saveCustomPlans(updated);
    setNewTitle("");
    setShowInput(false);
  };

  const togglePlan = (id: string) => {
    const updated = customPlans.map((p) => p.id === id ? { ...p, completed: !p.completed } : p);
    setCustomPlans(updated);
    saveCustomPlans(updated);
  };

  const deletePlan = (id: string) => {
    const updated = customPlans.filter((p) => p.id !== id);
    setCustomPlans(updated);
    saveCustomPlans(updated);
  };

  return (
    <div className={`${dark ? "bg-[#101828]/80 border-[#1e2a4a]" : "bg-white/80 border-gray-200"} backdrop-blur-lg border rounded-2xl p-5 transition-colors`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className={`text-sm font-semibold ${dark ? "text-gray-300" : "text-gray-700"}`}>📋 Today's Plan</h3>
        <button onClick={() => setShowInput(!showInput)}
          className={`text-xs flex items-center gap-1 font-semibold transition-colors ${dark ? "text-purple-400 hover:text-purple-300" : "text-purple-600 hover:text-purple-700"}`}>
          <Plus className="w-3.5 h-3.5" /> Add
        </button>
      </div>

      {showInput && (
        <div className="flex gap-2 mb-3">
          <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addPlan()}
            placeholder="What do you want to study?"
            className={`flex-1 ${dark ? "bg-[#070B17] border-[#1e2a4a] text-white" : "bg-white border-gray-200 text-gray-900"} rounded-xl px-3 py-2 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 border`}
            autoFocus
          />
          <button onClick={addPlan}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold px-3 py-2 rounded-xl hover:opacity-90 transition-all">
            Add
          </button>
        </div>
      )}

      {allPlans.length === 0 ? (
        <p className={`text-sm ${dark ? "text-gray-500" : "text-gray-400"}`}>All caught up! 🎉</p>
      ) : (
        <div className="space-y-1 max-h-64 overflow-y-auto">
          {allPlans.map((p, i) => (
            <motion.div key={p.id} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
              className={`flex items-center gap-3 p-2.5 rounded-xl ${dark ? "hover:bg-white/5" : "hover:bg-gray-100"} transition-colors group`}>
              <button onClick={() => p.custom ? togglePlan(p.id) : null} className="flex-shrink-0">
                {p.completed ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <Circle className={`w-5 h-5 ${dark ? "text-gray-600" : "text-gray-300"}`} />}
              </button>
              <span className={`flex-1 text-sm ${p.completed ? "line-through text-emerald-400" : dark ? "text-white" : "text-gray-900"}`}>{p.title}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${dark ? "bg-purple-500/10 text-purple-400" : "bg-purple-100 text-purple-600"}`}>{p.type}</span>
              {p.custom && (
                <button onClick={() => deletePlan(p.id)}
                  className={`opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ${dark ? "text-gray-500 hover:text-red-400" : "text-gray-400 hover:text-red-500"}`}>
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </motion.div>
          ))}
        </div>
      )}
      <button className={`mt-3 text-xs font-semibold flex items-center gap-1 transition-colors ${dark ? "text-purple-400 hover:text-purple-300" : "text-purple-600 hover:text-purple-700"}`}>
        View Full Plan <ArrowRight className="w-3 h-3" />
      </button>
    </div>
  );
}
