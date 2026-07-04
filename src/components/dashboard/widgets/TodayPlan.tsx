import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Circle } from "lucide-react";
import type { DashboardData } from "../types";

export function TodayPlan({ plans, dark }: { plans: DashboardData["todayPlan"]; dark: boolean }) {
  return (
    <div className={`${dark ? "bg-[#101828]/80 border-[#1e2a4a]" : "bg-white/80 border-gray-200"} backdrop-blur-lg border rounded-2xl p-5 transition-colors`}>
      <h3 className={`text-sm font-semibold mb-4 ${dark ? "text-gray-300" : "text-gray-700"}`}>📋 Today's Plan</h3>
      {plans.length === 0 ? (
        <p className={`text-sm ${dark ? "text-gray-500" : "text-gray-400"}`}>All caught up! 🎉</p>
      ) : (
        <div className="space-y-2">
          {plans.map((p, i) => (
            <motion.div key={p.id} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
              className={`flex items-center gap-3 p-2.5 rounded-xl ${dark ? "hover:bg-white/5" : "hover:bg-gray-100"} transition-colors`}>
              {p.completed ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <Circle className={`w-5 h-5 ${dark ? "text-gray-600" : "text-gray-300"}`} />}
              <span className={`flex-1 text-sm ${p.completed ? "line-through text-emerald-400" : dark ? "text-white" : "text-gray-900"}`}>{p.title}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${dark ? "bg-purple-500/10 text-purple-400" : "bg-purple-100 text-purple-600"}`}>{p.type}</span>
            </motion.div>
          ))}
        </div>
      )}
      <button className={`mt-3 text-xs font-semibold flex items-center gap-1 transition-colors ${dark ? "text-purple-400 hover:text-purple-300" : "text-purple-600 hover:text-purple-700"}`}>
        View Full Plan <ArrowRight className="w-3 h-3" />
      </button>
    </div>
  );
}
