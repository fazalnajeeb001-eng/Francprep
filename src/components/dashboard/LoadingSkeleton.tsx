import { motion } from "framer-motion";

export function LoadingSkeleton({ dark = true }: { dark?: boolean }) {
  const b = dark ? "bg-[#101828]" : "bg-gray-100";
  return (
    <div className="min-h-screen bg-[#070B17] flex items-center justify-center">
      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        className="w-10 h-10 border-2 border-purple-500 border-t-transparent rounded-full" />
    </div>
  );
}

export function CardSkeleton({ dark = true }: { dark?: boolean }) {
  const b = dark ? "bg-[#1e2a4a]" : "bg-gray-200";
  return (
    <div className={`${dark ? "bg-[#101828]/80" : "bg-white/80"} rounded-2xl p-5 animate-pulse`}>
      <div className={`h-4 ${b} rounded w-1/3 mb-4`} />
      <div className={`h-8 ${b} rounded w-2/3 mb-2`} />
      <div className={`h-3 ${b} rounded w-1/2`} />
    </div>
  );
}
