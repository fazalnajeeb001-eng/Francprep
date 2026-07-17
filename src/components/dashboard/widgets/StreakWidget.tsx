import { motion } from "framer-motion";
import { Flame } from "lucide-react";
import type { DashboardData } from "../types";

export function StreakWidget({ calendar, streak, dark }: { calendar: DashboardData["streakCalendar"]; streak: number; dark: boolean }) {
  // Get the last 7 days from the calendar (most recent first)
  const sorted = [...calendar].sort((a, b) => b.date.localeCompare(a.date));
  const last7 = sorted.slice(0, 7).reverse();
  const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className={`${dark ? "bg-[#101828]/80 border-[#1e2a4a]" : "bg-white/80 border-gray-200"} backdrop-blur-lg border rounded-2xl p-5 transition-colors`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className={`text-sm font-semibold ${dark ? "text-gray-300" : "text-gray-700"}`}>🔥 7-Day Streak</h3>
        <div className="flex items-center gap-1.5">
          <Flame className="w-4 h-4 text-amber-400" />
          <span className="text-amber-500 font-bold text-sm">{streak}</span>
        </div>
      </div>
      <div className="flex items-center justify-center gap-3">
        {last7.map((d, i) => {
          const dateObj = new Date(d.date + "T12:00:00");
          const dayName = dayLabels[dateObj.getDay() === 0 ? 6 : dateObj.getDay() - 1];
          const isActive = d.count > 0;
          return (
            <motion.div
              key={d.date}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex flex-col items-center gap-1.5"
            >
              <span className={`text-[10px] font-medium ${dark ? "text-gray-500" : "text-gray-400"}`}>{dayName}</span>
              <motion.div
                animate={isActive ? { scale: [1, 1.15, 1] } : {}}
                transition={{ duration: 0.5, delay: i * 0.05 + 0.3 }}
                className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg transition-all ${
                  isActive
                    ? "bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-amber-500/30"
                    : dark
                    ? "bg-[#1e2a4a]"
                    : "bg-gray-100"
                }`}
              >
                {isActive ? "🔥" : "·"}
              </motion.div>
            </motion.div>
          );
        })}
      </div>
      <div className="flex items-center justify-center gap-2 mt-3">
        {[1, 2, 3, 4, 5].map((n) => (
          <div key={n} className={`h-0.5 rounded-full transition-all duration-500 ${n <= streak ? "bg-gradient-to-r from-amber-400 to-orange-500" : dark ? "bg-[#1e2a4a]" : "bg-gray-200"}`}
            style={{ width: `${8 + n * 4}px` }} />
        ))}
      </div>
      <p className={`text-[10px] text-center mt-2 ${dark ? "text-gray-500" : "text-gray-400"}`}>
        {streak >= 7 ? "🎯 Perfect week!" : streak >= 4 ? "🔥 On fire!" : streak >= 2 ? "💪 Good momentum!" : streak >= 1 ? "👍 Great start!" : "Start your streak!"}
      </p>
    </div>
  );
}