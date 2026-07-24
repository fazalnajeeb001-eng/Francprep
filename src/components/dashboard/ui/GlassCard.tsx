import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  dark?: boolean;
}

export function GlassCard({ children, className = "", dark = true }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`${
        dark
          ? "bg-[#101828]/90 border-[#1e2a4a] shadow-xl shadow-black/20 text-white"
          : "bg-white/95 border border-slate-200/90 shadow-xl shadow-slate-200/60 text-slate-900"
      } backdrop-blur-xl rounded-3xl p-6 transition-all duration-300 ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function useIsDark() {
  if (typeof window === "undefined") return true;
  return document.documentElement.classList.contains("dark");
}
