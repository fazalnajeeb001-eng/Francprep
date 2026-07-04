import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface Props {
  icon: ReactNode; label: string; value: string | number; sublabel?: string;
  color?: string; progress?: number; dark?: boolean; index?: number;
}

export function StatCard({ icon, label, value, sublabel, color = "from-purple-500 to-pink-500", progress, dark = true, index = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className={`${dark ? "bg-[#101828]/80 border-[#1e2a4a]" : "bg-white/80 border-gray-200"} backdrop-blur-lg border rounded-2xl p-4 transition-all duration-300`}
    >
      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-3 shadow-lg`}>
        {icon}
      </div>
      <p className={`text-xs ${dark ? "text-gray-400" : "text-gray-500"}`} id={`stat-label-${label}`}>{label}</p>
      <p className={`text-2xl font-bold mt-0.5 ${dark ? "text-white" : "text-gray-900"}`} aria-labelledby={`stat-label-${label}`}>{value}</p>
      {sublabel && <p className={`text-[10px] ${dark ? "text-gray-500" : "text-gray-400"} mt-0.5`}>{sublabel}</p>}
      {progress !== undefined && (
        <div className="mt-2 h-1.5 bg-gray-800 rounded-full overflow-hidden" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
          <motion.div initial={{ width: 0 }} animate={{ width: `${Math.min(progress, 100)}%` }} transition={{ duration: 1, ease: "easeOut", delay: index * 0.1 }}
            className={`h-full bg-gradient-to-r ${color} rounded-full`} />
        </div>
      )}
    </motion.div>
  );
}
