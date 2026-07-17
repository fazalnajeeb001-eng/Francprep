import { useState } from "react";
import { motion } from "framer-motion";
import { Target, Plus, X, Check } from "lucide-react";
import { useWidgets } from "~/lib/WidgetsContext";

const PRESET_GOALS = [
  "Complete 3 lessons",
  "Study 2 hours total",
  "Learn 20 new words",
  "Master 2 grammar topics",
  "Score 80%+ on exercises",
];

export function WeeklyGoal({ dark }: { dark: boolean }) {
  const { widgets, updateWeeklyGoal } = useWidgets();
  const goal = widgets?.weeklyGoal || null;
  const [showSetup, setShowSetup] = useState(false);
  const [customText, setCustomText] = useState("");

  const setPresetGoal = (text: string) => {
    updateWeeklyGoal({ text, current: 0, target: 1, completed: false });
    setShowSetup(false);
  };

  const setCustomGoal = () => {
    if (!customText.trim()) return;
    setPresetGoal(customText.trim());
    setCustomText("");
  };

  const incrementProgress = () => {
    if (!goal) return;
    const updated = { ...goal, current: goal.current + 1, completed: goal.current + 1 >= goal.target };
    updateWeeklyGoal(updated);
  };

  const resetGoal = () => {
    updateWeeklyGoal(null);
    setShowSetup(false);
  };

  const pct = goal ? Math.min(100, (goal.current / goal.target) * 100) : 0;

  return (
    <div className={`${dark ? "bg-[#101828]/80 border-[#1e2a4a]" : "bg-white/80 border-gray-200"} backdrop-blur-lg border rounded-2xl p-5 transition-colors`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-purple-400" />
          <h3 className={`text-sm font-semibold ${dark ? "text-gray-300" : "text-gray-700"}`}>Weekly Goal</h3>
        </div>
        {goal && !goal.completed && (
          <button onClick={resetGoal} className={`text-[10px] ${dark ? "text-gray-500 hover:text-red-400" : "text-gray-400 hover:text-red-500"} transition-colors`}>
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {!goal && !showSetup && (
        <button onClick={() => setShowSetup(true)}
          className={`w-full ${dark ? "bg-[#070B17] border-[#1e2a4a] hover:border-purple-500/50" : "bg-gray-50 border-gray-200 hover:border-purple-300"} border rounded-xl p-6 text-center transition-all`}>
          <Plus className="w-6 h-6 mx-auto text-purple-400 mb-2" />
          <p className={`text-xs font-semibold ${dark ? "text-gray-300" : "text-gray-700"}`}>Set a goal for this week</p>
        </button>
      )}

      {showSetup && (
        <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
          className={`${dark ? "bg-[#070B17] border-[#1e2a4a]" : "bg-gray-50 border-gray-200"} rounded-xl p-4 border`}>
          <p className={`text-xs font-semibold mb-3 ${dark ? "text-gray-300" : "text-gray-700"}`}>Choose a goal:</p>
          <div className="space-y-1.5 mb-3">
            {PRESET_GOALS.map((g) => (
              <button key={g} onClick={() => setPresetGoal(g)}
                className={`w-full text-left text-xs px-3 py-2 rounded-lg transition-colors ${dark ? "hover:bg-white/5 text-gray-400 hover:text-white" : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"}`}>
                {g}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <input type="text" value={customText} onChange={(e) => setCustomText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && setCustomGoal()}
              placeholder="Or type your own..."
              className={`flex-1 ${dark ? "bg-[#101828] border-[#1e2a4a] text-white" : "bg-white border-gray-200 text-gray-900"} rounded-lg px-3 py-2 text-xs placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 border`} />
            <button onClick={setCustomGoal}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold px-3 py-2 rounded-lg hover:opacity-90 transition-all">
              Set
            </button>
          </div>
          <button onClick={() => setShowSetup(false)}
            className={`mt-2 text-[10px] ${dark ? "text-gray-500 hover:text-gray-300" : "text-gray-400 hover:text-gray-600"} transition-colors`}>
            Cancel
          </button>
        </motion.div>
      )}

      {goal && (
        <div className={`${dark ? "bg-[#070B17] border-[#1e2a4a]" : "bg-gray-50 border-gray-200"} rounded-xl p-4 border`}>
          <div className="flex items-center justify-between mb-2">
            <p className={`text-xs font-medium ${dark ? "text-gray-300" : "text-gray-700"}`}>{goal.text}</p>
            {goal.completed && <Check className="w-4 h-4 text-emerald-400" />}
          </div>
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden mb-2">
            <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.8, ease: "easeOut" }}
              className={`h-full rounded-full ${goal.completed ? "bg-gradient-to-r from-emerald-500 to-teal-500" : "bg-gradient-to-r from-purple-500 to-pink-500"}`} />
          </div>
          <div className="flex items-center justify-between">
            <span className={`text-[10px] ${dark ? "text-gray-500" : "text-gray-400"}`}>
              {goal.current}/{goal.target} {goal.completed ? "— Goal reached!" : ""}
            </span>
            {!goal.completed && (
              <button onClick={incrementProgress}
                className="text-[10px] text-purple-400 hover:text-purple-300 font-semibold transition-colors">
                +1 progress
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
