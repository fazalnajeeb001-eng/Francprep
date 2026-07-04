import { motion } from "framer-motion";
import { ProgressRing } from "./ProgressRing";

export function WeeklyGoal({ dark, minutes }: { dark: boolean; minutes: number }) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  const target = 600; // 10h in minutes
  const pct = Math.min((minutes / target) * 100, 100);
  return (
    <div className={`${dark ? "bg-[#101828]/80 border-[#1e2a4a]" : "bg-white/80 border-gray-200"} backdrop-blur-lg border rounded-2xl p-5 transition-colors`}>
      <h3 className={`text-sm font-semibold mb-4 ${dark ? "text-gray-300" : "text-gray-700"}`}>🎯 Weekly Goal</h3>
      <div className="flex flex-col items-center py-4">
        <ProgressRing value={pct} size={96} strokeWidth={7} color="#7C3AED" />
        <p className={`text-sm font-semibold mt-3 ${dark ? "text-white" : "text-gray-900"}`}>{hours}h {mins}m</p>
        <p className={`text-xs ${dark ? "text-gray-400" : "text-gray-500"}`}>of 10h goal</p>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
          className={`text-xs ${dark ? "text-gray-500" : "text-gray-400"} mt-2`}>
          {pct >= 100 ? "Goal reached! 🎉" : `${Math.round(10 - minutes / 60)}h more to go!`}
        </motion.p>
      </div>
    </div>
  );
}
