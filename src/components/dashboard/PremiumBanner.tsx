import { Crown } from "lucide-react";

export function PremiumBanner({ dark = true }: { dark?: boolean }) {
  return (
    <div className={`${dark ? "bg-gradient-to-br from-purple-900/50 to-pink-900/30" : "bg-gradient-to-br from-purple-100 to-pink-50"} rounded-2xl p-4 text-center`}>
      <Crown className="w-8 h-8 mx-auto text-amber-400" />
      <p className={`text-xs font-semibold mt-1 ${dark ? "text-gray-200" : "text-gray-700"}`}>Go Premium</p>
      <p className={`text-[10px] ${dark ? "text-gray-500" : "text-gray-400"} mb-2`}>Unlock all features</p>
      <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold py-2.5 rounded-xl hover:opacity-90 shadow-lg shadow-purple-500/25 transition-all"
        aria-label="Upgrade to premium">
        Upgrade Now
      </button>
    </div>
  );
}
