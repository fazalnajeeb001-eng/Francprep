import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Zap, Play } from "lucide-react";
import type { DashboardData } from "../types";

export function ContinueLearning({ cl, dark }: { cl: DashboardData["continueLearning"]; dark: boolean }) {
  return (
    <div className={`${
      dark
        ? "bg-[#101828]/90 border-[#1e2a4a] shadow-xl shadow-black/10 text-white"
        : "bg-white border border-slate-200/90 shadow-xl shadow-slate-200/50 text-slate-900"
    } backdrop-blur-xl rounded-3xl p-6 transition-all duration-300`}>
      <h3 className={`text-base font-extrabold mb-4 ${dark ? "text-gray-200" : "text-slate-900"}`}>▶️ Continue Learning</h3>
      {cl ? (
        <div className={`${
          dark
            ? "bg-gradient-to-br from-purple-900/30 to-pink-900/20 border-purple-500/20"
            : "bg-gradient-to-br from-purple-50 via-indigo-50/60 to-pink-50 border-purple-200/80 shadow-md"
        } rounded-2xl p-5 border`}>
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-amber-500" />
            <span className={`text-xs font-bold uppercase tracking-wider ${dark ? "text-purple-300" : "text-purple-700"}`}>{cl.unit}</span>
          </div>
          <p className={`text-base font-bold ${dark ? "text-white" : "text-slate-900"}`}>{cl.title}</p>
          <div className="flex items-center gap-3 mt-4">
            <div className={`flex-1 h-2 ${dark ? "bg-slate-800" : "bg-slate-200"} rounded-full overflow-hidden`} role="progressbar" aria-valuenow={cl.progress} aria-valuemin={0} aria-valuemax={100}>
              <motion.div initial={{ width: 0 }} animate={{ width: `${cl.progress}%` }}
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
            </div>
            <span className="text-purple-600 dark:text-purple-400 text-xs font-extrabold">{cl.progress}%</span>
          </div>
          <Link to={`/lessons/${cl.lessonId}` as any} className="mt-5 w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold py-3 rounded-xl hover:opacity-90 transition-all shadow-lg shadow-purple-600/25 flex items-center justify-center gap-2">
            <Play className="w-4 h-4 fill-white" /> Resume Lesson
          </Link>
        </div>
      ) : (
        <div className="text-center py-6">
          <p className={`text-sm ${dark ? "text-gray-400" : "text-slate-600"} mb-3 font-medium`}>No lessons in progress yet</p>
          <Link to="/learn" className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold px-6 py-3 rounded-xl hover:opacity-90 transition-all shadow-lg shadow-purple-600/25">
            <Play className="w-4 h-4 fill-white" /> Start Learning
          </Link>
        </div>
      )}
    </div>
  );
}
