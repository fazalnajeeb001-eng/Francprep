import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { AlertTriangle, ArrowRight } from "lucide-react";
import type { DashboardData } from "../types";

const SECTION_META: Record<string, { icon: string; color: string }> = {
  Listening: { icon: "🎧", color: "from-blue-500 to-cyan-500" },
  Reading: { icon: "📖", color: "from-emerald-500 to-teal-500" },
  Grammar: { icon: "✏️", color: "from-pink-500 to-rose-500" },
  Vocabulary: { icon: "📚", color: "from-purple-500 to-indigo-500" },
  Writing: { icon: "✍️", color: "from-amber-500 to-orange-500" },
  Speaking: { icon: "🗣️", color: "from-red-500 to-rose-500" },
};

export function WeakAreas({ levels, dark }: { levels: DashboardData["levelProgress"]; dark: boolean }) {
  const sections = levels
    .map((l) => {
      const pct = l.total > 0 ? Math.round((l.completed / l.total) * 100) : 0;
      return { name: l.level, total: l.total, completed: l.completed, pct };
    })
    .filter((s) => s.total > 0 && s.pct < 80)
    .sort((a, b) => a.pct - b.pct)
    .slice(0, 4);

  if (sections.length === 0) return null;

  return (
    <div className={`${
      dark
        ? "bg-[#101828]/90 border-[#1e2a4a] shadow-xl shadow-black/10 text-white"
        : "bg-white border border-slate-200/90 shadow-xl shadow-slate-200/50 text-slate-900"
    } backdrop-blur-xl rounded-3xl p-6 transition-all duration-300`}>
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="w-4 h-4 text-amber-500" />
        <h3 className={`text-base font-extrabold ${dark ? "text-gray-200" : "text-slate-900"}`}>Needs Practice</h3>
      </div>
      <div className="space-y-3">
        {sections.map((s, i) => {
          const meta = SECTION_META[s.name] || { icon: "📝", color: "from-gray-500 to-gray-600" };
          return (
            <motion.div key={s.name} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-sm">{meta.icon}</span>
                  <span className={`text-xs font-medium ${dark ? "text-gray-300" : "text-gray-700"}`}>{s.name}</span>
                </div>
                <span className={`text-xs font-bold ${s.pct < 30 ? "text-red-400" : s.pct < 60 ? "text-amber-400" : "text-emerald-400"}`}>{s.pct}%</span>
              </div>
              <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${s.pct}%` }} transition={{ duration: 0.8, ease: "easeOut", delay: i * 0.1 }}
                  className={`h-full bg-gradient-to-r ${meta.color} rounded-full`} />
              </div>
              <p className={`text-[10px] ${dark ? "text-gray-500" : "text-gray-400"} mt-0.5`}>{s.completed}/{s.total} completed</p>
            </motion.div>
          );
        })}
      </div>
      <Link to="/learn" className={`mt-4 text-xs font-semibold flex items-center gap-1 transition-colors ${dark ? "text-purple-400 hover:text-purple-300" : "text-purple-600 hover:text-purple-700"}`}>
        Start practicing <ArrowRight className="w-3 h-3" />
      </Link>
    </div>
  );
}
