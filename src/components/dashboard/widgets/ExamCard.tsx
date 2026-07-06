import { motion } from "framer-motion";
import { Target } from "lucide-react";

export function ExamCard({ dark }: { dark: boolean }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
      className={`${dark ? "bg-[#101828]/80 border-[#1e2a4a]" : "bg-white/80 border-gray-200"} backdrop-blur-lg border rounded-2xl p-5 transition-colors`}>
      <h3 className={`text-sm font-semibold mb-4 ${dark ? "text-gray-300" : "text-gray-700"}`}>🎯 Exam Simulator</h3>
      <div className={`${dark ? "bg-[#070B17]" : "bg-gray-50"} rounded-2xl p-8 text-center`}>
        <Target className="w-10 h-10 mx-auto dark:text-gray-600 text-gray-400 mb-3" />
        <p className={`text-sm font-semibold ${dark ? "text-gray-300" : "text-gray-700"}`}>No exams taken yet</p>
        <p className={`text-xs ${dark ? "text-gray-500" : "text-gray-400"} mt-1 mb-4`}>
          Practice with TCF or TEF full-length mock exams
        </p>
        <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold py-2.5 rounded-xl hover:opacity-90 transition-all shadow-lg shadow-purple-500/25">
          Start Simulator
        </button>
      </div>
    </motion.div>
  );
}