import { motion } from "framer-motion";
import { Crown, Heart } from "lucide-react";

export function JourneyBanner({ dark, firstName, streak, hearts }: { dark: boolean; firstName: string; streak: number; hearts: number }) {
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
        <div className="flex gap-0.5">
          {[1, 2, 3].map(i => (
            <Heart key={i} className={`w-5 h-5 ${i <= hearts ? "text-red-500 fill-red-500 drop-shadow-[0_0_6px_rgba(239,68,68,0.5)]" : "text-gray-700"}`} />
          ))}
        </div>
      </div>
      <div className={`${dark ? "bg-gradient-to-br from-purple-900/30 to-pink-900/20" : "bg-gradient-to-br from-purple-100 to-pink-50"} rounded-2xl p-6 mb-4 text-center`}>
        <Crown className="w-10 h-10 mx-auto text-amber-400" />
        <p className={`text-sm font-semibold mt-2 ${dark ? "text-gray-200" : "text-gray-700"}`}>B2 French — 67% Complete</p>
      </div>
      <div className={`${dark ? "bg-[#070B17]" : "bg-gray-50"} rounded-xl p-4`}>
        <div className="flex items-center justify-between mb-2">
          <span className={`text-xs ${dark ? "text-gray-400" : "text-gray-600"}`}>Journey Progress</span>
          <span className="text-purple-400 text-sm font-bold">67%</span>
        </div>
        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
          <motion.div initial={{ width: 0 }} animate={{ width: "67%" }} transition={{ duration: 1.5, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
        </div>
      </div>
      <div className="flex gap-3 mt-4">
        <button className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold py-2.5 rounded-xl hover:opacity-90 transition-all shadow-lg shadow-purple-500/25">
          Continue Learning
        </button>
        <button className={`flex-1 border ${dark ? "border-[#1e2a4a] text-gray-300 hover:bg-white/5" : "border-gray-200 text-gray-700 hover:bg-gray-100"} py-2.5 rounded-xl text-sm font-semibold transition-colors`}>
          View Progress
        </button>
      </div>
    </motion.div>
  );
}
