import { motion } from "framer-motion";

export function ProgressBar({ value, className = "", dark = true }: { value: number; className?: string; dark?: boolean }) {
  return (
    <div className={`h-2 ${dark ? "bg-[#1e2a4a]" : "bg-gray-200"} rounded-full overflow-hidden ${className}`} role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}>
      <motion.div initial={{ width: 0 }} animate={{ width: `${Math.min(value, 100)}%` }} transition={{ duration: 1, ease: "easeOut" }}
        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
    </div>
  );
}
