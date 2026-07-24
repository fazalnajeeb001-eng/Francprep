import { Crown } from "lucide-react";

export function PremiumBanner({ dark = true }: { dark?: boolean }) {
  return (
    <div className={`${
      dark
        ? "bg-gradient-to-br from-purple-900/50 to-pink-900/30 border border-purple-500/20"
        : "bg-gradient-to-br from-purple-50 via-indigo-50/60 to-pink-50 border border-purple-200/80 shadow-md text-slate-900"
    } rounded-3xl p-5 text-center`}>
      <Crown className="w-8 h-8 mx-auto text-amber-500" />
      <p className={`text-xs font-bold mt-1.5 ${dark ? "text-gray-200" : "text-slate-900"}`}>Go Premium</p>
      <p className={`text-[11px] font-medium ${dark ? "text-gray-400" : "text-slate-600"} mb-3`}>Unlock all CEFR features & simulators</p>
      <button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold py-2.5 rounded-xl hover:opacity-90 shadow-lg shadow-purple-600/25 transition-all"
        aria-label="Upgrade to premium">
        Upgrade Now
      </button>
    </div>
  );
}
