import { motion } from "framer-motion";
import { Crown, BookOpen } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function JourneyBanner({ dark, firstName, streak, overallProgress }: { dark: boolean; firstName: string; streak: number; overallProgress: number }) {
  const hasProgress = overallProgress > 0;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
      className={`${dark ? "bg-[#101828]/80 border-[#1e2a4a]" : "bg-white/80 border-gray-200"} backdrop-blur-lg border rounded-2xl p-5 transition-colors`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className={`text-lg font-bold ${dark ? "text-white" : "text-gray-900"}`}>Your French Journey 🇫🇷</h3>
          <p className={`text-sm ${dark ? "text-gray-400" : "text-gray-600"} mt-1`}>
            Keep going, <strong>{firstName}</strong>! {streak > 0 ? `${streak}-day streak! 🔥` : "Start your streak today!"}
          </p>
        </div>
      </div>

      {hasProgress ? (
        <>
          <div className={`${dark ? "bg-gradient-to-br from-purple-900/30 to-pink-900/20" : "bg-gradient-to-br from-purple-100 to-pink-50"} rounded-2xl p-6 mb-4 text-center`}>
            <Crown className="w-10 h-10 mx-auto text-amber-400" />
            <p className={`text-sm font-semibold mt-2 ${dark ? "text-gray-200" : "text-gray-700"}`}>Curriculum Progress</p>
            <p className={`text-xs ${dark ? "text-gray-400" : "text-gray-500"} mt-1`}>{overallProgress}% complete</p>
          </div>
          <div className={`${dark ? "bg-[#070B17]" : "bg-gray-50"} rounded-xl p-4`}>
            <div className="flex items-center justify-between mb-2">
              <span className={`text-xs ${dark ? "text-gray-400" : "text-gray-600"}`}>Overall Progress</span>
              <span className="text-purple-400 text-sm font-bold">{overallProgress}%</span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: `${overallProgress}%` }} transition={{ duration: 1.5, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
            </div>
          </div>
        </>
      ) : (
        <div className={`${dark ? "bg-[#070B17]" : "bg-gray-50"} rounded-2xl p-8 text-center`}>
          <BookOpen className="w-10 h-10 mx-auto dark:text-gray-600 text-gray-400 mb-3" />
          <p className={`text-sm font-semibold ${dark ? "text-gray-300" : "text-gray-700"}`}>Start your first lesson</p>
          <p className={`text-xs ${dark ? "text-gray-500" : "text-gray-400"} mt-1`}>Your progress will appear here once you begin learning</p>
        </div>
      )}

      <div className="flex gap-3 mt-4">
        <Link to="/learn" className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold py-2.5 rounded-xl hover:opacity-90 transition-all shadow-lg shadow-purple-500/25 text-center">
          Continue Learning
        </Link>
        <Link to="/dashboard" className={`flex-1 border ${dark ? "border-[#1e2a4a] text-gray-300 hover:bg-white/5" : "border-gray-200 text-gray-700 hover:bg-gray-100"} py-2.5 rounded-xl text-sm font-semibold transition-colors text-center`}>
          View Progress
        </Link>
      </div>
    </motion.div>
  );
}