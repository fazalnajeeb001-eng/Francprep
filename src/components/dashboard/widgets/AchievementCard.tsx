import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import type { DashboardData } from "../types";

export function AchievementCard({ achievements, dark }: { achievements: DashboardData["recentAchievements"]; dark: boolean }) {
  return (
    <div className={`${dark ? "bg-[#101828]/80 border-[#1e2a4a]" : "bg-white/80 border-gray-200"} backdrop-blur-lg border rounded-2xl p-5 transition-colors`}>
      <h3 className={`text-sm font-semibold mb-4 ${dark ? "text-gray-300" : "text-gray-700"}`}>🏆 Achievements</h3>
      {achievements.length === 0 ? (
        <p className={`text-xs ${dark ? "text-gray-500" : "text-gray-400"}`}>Complete lessons to earn achievements!</p>
      ) : (
        <div className="space-y-2">
          {achievements.slice(0, 4).map((a, i) => (
            <motion.div key={a.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
              className={`flex items-center gap-3 p-2.5 rounded-xl ${dark ? "bg-[#070B17]" : "bg-gray-50"}`}>
              <span className="text-xl">{a.icon}</span>
              <div className="flex-1 min-w-0">
                <p className={`text-xs font-semibold ${dark ? "text-white" : "text-gray-900"}`}>{a.title}</p>
                <p className={`text-[10px] ${dark ? "text-gray-500" : "text-gray-400"} truncate`}>{a.description}</p>
              </div>
              <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
