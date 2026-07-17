import { motion } from "framer-motion";
import { ProgressRing } from "./ProgressRing";

export function MilestoneCard({ dark, completed, total }: { dark: boolean; completed: number; total: number }) {
  const remaining = Math.max(0, total - completed);
  const pct = total > 0 ? (completed / total) * 100 : 0;
  return (
    <div className={`${dark ? "bg-[#101828]/80 border-[#1e2a4a]" : "bg-white/80 border-gray-200"} backdrop-blur-lg border rounded-2xl p-5 transition-colors`}>
      <h3 className={`text-sm font-semibold mb-4 ${dark ? "text-gray-300" : "text-gray-700"}`}>🎯 Next Milestone</h3>
      <div className={`${dark ? "bg-[#070B17]" : "bg-gray-50"} rounded-xl p-4 flex items-center gap-4`}>
        <ProgressRing value={pct} size={64} strokeWidth={5} color="#7C3AED" />
        <div className="flex-1">
          <p className={`text-sm font-semibold ${dark ? "text-white" : "text-gray-900"}`}>B1 French</p>
          <p className={`text-xs ${dark ? "text-gray-400" : "text-gray-500"}`}>{remaining} lessons remaining</p>
          <motion.div className="mt-2 text-[10px] bg-purple-500/20 text-purple-400 px-2 py-1 rounded-lg inline-block">
            🏆 Unlock: B1 Certificate
          </motion.div>
        </div>
      </div>
    </div>
  );
}
