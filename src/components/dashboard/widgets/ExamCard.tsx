import { motion } from "framer-motion";
import { Target, Trophy, TrendingUp } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useCountUp } from "../hooks/useCountUp";

export function ExamCard({ averageScore, dark }: { averageScore: number; dark: boolean }) {
  const hasData = averageScore > 0;
  const predicted = hasData ? Math.min(100, Math.round(averageScore * 1.05)) : 0;
  const animatedScore = useCountUp(predicted, 1200, 200);

  const band = predicted >= 80 ? "B2" : predicted >= 65 ? "B1" : predicted >= 50 ? "A2" : "A1";
  const bandColor = predicted >= 80 ? "text-emerald-400" : predicted >= 65 ? "text-blue-400" : predicted >= 50 ? "text-amber-400" : "text-gray-400";
  const bandBg = predicted >= 80 ? "from-emerald-500 to-teal-500" : predicted >= 65 ? "from-blue-500 to-cyan-500" : predicted >= 50 ? "from-amber-500 to-orange-500" : "from-gray-500 to-gray-600";

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
      className={`${
        dark
          ? "bg-[#101828]/90 border-[#1e2a4a] shadow-xl shadow-black/10 text-white"
          : "bg-white border border-slate-200/90 shadow-xl shadow-slate-200/50 text-slate-900"
      } backdrop-blur-xl rounded-3xl p-6 transition-all duration-300`}>
      <div className="flex items-center gap-2 mb-4">
        <Target className="w-4 h-4 text-purple-400" />
        <h3 className={`text-base font-extrabold ${dark ? "text-gray-200" : "text-slate-900"}`}>Exam Simulator</h3>
      </div>

      {hasData ? (
        <div className={`${dark ? "bg-[#070B17]" : "bg-gray-50"} rounded-2xl p-5 text-center`}>
          <div className={`w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br ${bandBg} flex items-center justify-center mb-3 shadow-lg`}>
            <Trophy className="w-7 h-7 text-white" />
          </div>
          <p className={`text-xs ${dark ? "text-gray-500" : "text-gray-400"} mb-1`}>Predicted Level</p>
          <p className={`text-3xl font-bold ${bandColor}`}>{band}</p>
          <p className={`text-xs ${dark ? "text-gray-500" : "text-gray-400"} mt-1 mb-3`}>
            Based on your <span className={`font-semibold ${dark ? "text-gray-300" : "text-gray-700"}`}>{averageScore}%</span> avg score
          </p>
          <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden mb-4">
            <motion.div initial={{ width: 0 }} animate={{ width: `${predicted}%` }} transition={{ duration: 1, ease: "easeOut" }}
              className={`h-full bg-gradient-to-r ${bandBg} rounded-full`} />
          </div>
          <div className="flex items-center justify-center gap-1.5 mb-3">
            <TrendingUp className="w-3.5 h-3.5 text-purple-400" />
            <span className={`text-xs ${dark ? "text-gray-400" : "text-gray-500"}`}>Estimated TCF/TEF: <span className="font-bold text-purple-400">{animatedScore}/100</span></span>
          </div>
          <Link to="/exam"
            className="w-full block bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold py-2.5 rounded-xl hover:opacity-90 transition-all shadow-lg shadow-purple-500/25 text-center">
            Take a Mock Exam
          </Link>
        </div>
      ) : (
        <div className={`${dark ? "bg-[#070B17]" : "bg-gray-50"} rounded-2xl p-8 text-center`}>
          <Target className="w-10 h-10 mx-auto dark:text-gray-600 text-gray-400 mb-3" />
          <p className={`text-sm font-semibold ${dark ? "text-gray-300" : "text-gray-700"}`}>No exams taken yet</p>
          <p className={`text-xs ${dark ? "text-gray-500" : "text-gray-400"} mt-1 mb-4`}>
            Practice with TCF or TEF full-length mock exams
          </p>
          <Link to="/exam"
            className="w-full block bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold py-2.5 rounded-xl hover:opacity-90 transition-all shadow-lg shadow-purple-500/25 text-center">
            Start Simulator
          </Link>
        </div>
      )}
    </motion.div>
  );
}
