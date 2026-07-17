import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Zap, Play } from "lucide-react";
import type { DashboardData } from "../types";

export function ContinueLearning({ cl, dark }: { cl: DashboardData["continueLearning"]; dark: boolean }) {
  return (
    <div className={`${dark ? "bg-[#101828]/80 border-[#1e2a4a]" : "bg-white/80 border-gray-200"} backdrop-blur-lg border rounded-2xl p-5 transition-colors`}>
      <h3 className={`text-sm font-semibold mb-4 ${dark ? "text-gray-300" : "text-gray-700"}`}>▶️ Continue Learning</h3>
      {cl ? (
        <div className={`${dark ? "bg-gradient-to-br from-purple-900/30 to-pink-900/20 border-purple-500/20" : "bg-gradient-to-br from-purple-100 to-pink-50 border-purple-200"} rounded-2xl p-5 border`}>
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-amber-400" />
            <span className={`text-[10px] font-semibold uppercase ${dark ? "text-purple-400" : "text-purple-600"}`}>{cl.unit}</span>
          </div>
          <p className={`text-sm font-semibold ${dark ? "text-white" : "text-gray-900"}`}>{cl.title}</p>
          <div className="flex items-center gap-3 mt-3">
            <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden" role="progressbar" aria-valuenow={cl.progress} aria-valuemin={0} aria-valuemax={100}>
              <motion.div initial={{ width: 0 }} animate={{ width: `${cl.progress}%` }}
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
            </div>
            <span className="text-purple-400 text-xs font-bold">{cl.progress}%</span>
          </div>
          <Link to={`/lessons/${cl.lessonId}`} className="mt-4 w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold py-2.5 rounded-xl hover:opacity-90 transition-all shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2">
            <Play className="w-4 h-4" /> Resume Lesson
          </Link>
        </div>
      ) : (
        <div className="text-center py-6">
          <p className={`text-sm ${dark ? "text-gray-500" : "text-gray-400"} mb-3`}>No lessons in progress yet</p>
          <Link to="/learn" className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:opacity-90 transition-all shadow-lg shadow-purple-500/25">
            <Play className="w-4 h-4" /> Start Learning
          </Link>
        </div>
      )}
    </div>
  );
}
