import { motion } from "framer-motion";

export function ProgressBar({ value, className = "", color = "from-purple-500 to-pink-500" }: { value: number; className?: string; color?: string }) {
  return (
    <div className={`h-2 bg-gray-800 rounded-full overflow-hidden ${className}`}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${Math.min(value, 100)}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
        className={`h-full bg-gradient-to-r ${color} rounded-full`}
      />
    </div>
  );
}
