import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface StatCardProps {
  icon: ReactNode;
  label: string;
  value: string | number;
  sublabel?: string;
  color?: string;
  progress?: number;
  dark?: boolean;
}

export function StatCard({ icon, label, value, sublabel, color = "from-purple-500 to-pink-500", progress, dark = true }: StatCardProps) {
  return (
    <motion.div whileHover={{ y: -2, transition: { duration: 0.2 } }} className={`${dark ? "bg-[#101828]/80 border-[#1e2a4a]" : "bg-white/80 border-gray-200"} backdrop-blur-lg border rounded-2xl p-4 transition-colors duration-300`}>
      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-3 shadow-lg`}>
        {icon}
      </div>
      <p className={`text-xs ${dark ? "text-gray-400" : "text-gray-500"}`}>{label}</p>
      <p className={`text-2xl font-bold mt-0.5 ${dark ? "text-white" : "text-gray-900"}`}>{value}</p>
      {sublabel && <p className={`text-[10px] ${dark ? "text-gray-500" : "text-gray-400"} mt-0.5`}>{sublabel}</p>}
      {progress !== undefined && (
        <div className="mt-2 h-1 bg-gray-800 rounded-full overflow-hidden">
          <motion.div initial={{ width: 0 }} animate={{ width: `${Math.min(progress, 100)}%` }} transition={{ duration: 1, ease: "easeOut" }}
            className={`h-full bg-gradient-to-r ${color} rounded-full`} />
        </div>
      )}
    </motion.div>
  );
}
