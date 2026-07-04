import { motion } from "framer-motion";
import { CheckCircle2, Lock, Star, ArrowRight } from "lucide-react";
import type { DashboardData } from "../types";

const CEFR_LABELS: Record<string, string> = { A1: "Découverte", A2: "Progrès", B1: "Indépendance", B2: "Autonomie", C1: "Maîtrise", C2: "Perfectionnement" };

export function LevelProgress({ levels, dark, overall }: { levels: DashboardData["levelProgress"]; dark: boolean; overall: number }) {
  const active = levels.find(l => l.status === "active") || levels[0];
  return (
    <div className={`${dark ? "bg-[#101828]/80 border-[#1e2a4a]" : "bg-white/80 border-gray-200"} backdrop-blur-lg border rounded-2xl p-5 transition-colors`}>
      <div className="flex items-center justify-between mb-5">
        <h3 className={`text-sm font-semibold ${dark ? "text-gray-300" : "text-gray-700"}`}>CEFR Level Progress</h3>
        <span className="text-purple-400 text-sm font-bold">{overall}%</span>
      </div>
      <div className="flex items-center justify-between mb-6">
        {levels.map((l, i) => (
          <motion.div key={l.level} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.08, type: "spring" }} className="flex flex-col items-center gap-1">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
              l.status === "completed" ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30" :
              l.status === "active" ? "bg-purple-500 text-white shadow-lg shadow-purple-500/30 animate-pulse" :
              dark ? "bg-[#1e2a4a] text-gray-600" : "bg-gray-200 text-gray-400"
            }`}>
              {l.status === "completed" ? <CheckCircle2 className="w-5 h-5" /> : l.status === "active" ? <Star className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
            </div>
            <span className={`text-[10px] font-medium ${l.status === "completed" ? "text-emerald-400" : l.status === "active" ? "text-purple-400" : "text-gray-600"}`}>{l.level}</span>
          </motion.div>
        ))}
      </div>
      <div className={`${dark ? "bg-[#070B17]" : "bg-gray-50"} rounded-xl p-4`}>
        <div className="flex items-center justify-between mb-2">
          <div>
            <span className={`text-[10px] font-semibold uppercase ${dark ? "text-purple-400" : "text-purple-600"}`}>Currently in {active.level}</span>
            <p className={`text-sm font-semibold mt-0.5 ${dark ? "text-white" : "text-gray-900"}`}>{CEFR_LABELS[active.level]} — {active.completed}/{active.total} lessons</p>
          </div>
        </div>
        <div className="h-2 rounded-full overflow-hidden" role="progressbar" aria-valuenow={overall} aria-valuemin={0} aria-valuemax={100}>
          <motion.div initial={{ width: 0 }} animate={{ width: `${Math.min(overall, 100)}%` }} transition={{ duration: 1.5, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
        </div>
        <button className="mt-3 text-xs font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors">
          View Details <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
