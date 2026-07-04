import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface BadgeProps {
  icon: ReactNode;
  value: string | number;
  label?: string;
  color?: string;
  dark?: boolean;
}

export function Badge({ icon, value, label, color = "purple", dark = true }: BadgeProps) {
  const colors: Record<string, { bg: string; text: string; border: string }> = {
    amber: { bg: dark ? "bg-amber-500/10" : "bg-amber-50", text: "text-amber-500", border: dark ? "border-amber-500/30" : "border-amber-200" },
    emerald: { bg: dark ? "bg-emerald-500/10" : "bg-emerald-50", text: "text-emerald-500", border: dark ? "border-emerald-500/30" : "border-emerald-200" },
    purple: { bg: dark ? "bg-purple-500/10" : "bg-purple-50", text: "text-purple-400", border: dark ? "border-purple-500/30" : "border-purple-200" },
  };
  const c = colors[color] || colors.purple;
  return (
    <motion.div whileHover={{ scale: 1.05 }} className={`hidden sm:flex items-center gap-1.5 ${c.bg} ${c.border} border px-3 py-1.5 rounded-full`}>
      {icon}
      <span className={`font-bold text-sm ${c.text}`}>{value}</span>
      {label && <span className="text-gray-500 text-[10px]">{label}</span>}
    </motion.div>
  );
}
