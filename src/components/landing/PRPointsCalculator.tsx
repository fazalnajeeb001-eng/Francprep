import React, { useState } from "react";
import { motion } from "framer-motion";
import { Award, Check, Sparkles, TrendingUp, Compass, ShieldCheck } from "lucide-react";

export function PRPointsCalculator() {
  const [nclcLevel, setNclcLevel] = useState<number>(7);

  const levelsData: { [key: number]: { title: string; crsBoost: number; description: string; status: string } } = {
    4: {
      title: "NCLC 4 (Initial Basic)",
      crsBoost: 6,
      description: "Basic conversational skills for everyday tasks in Canada.",
      status: "Initial Milestone",
    },
    5: {
      title: "NCLC 5 (Intermediate Baseline)",
      crsBoost: 12,
      description: "Meets basic Express Entry eligibility requirements.",
      status: "Qualifying Threshold",
    },
    6: {
      title: "NCLC 6 (Advanced Intermediate)",
      crsBoost: 25,
      description: "Unlocks secondary language points and work permit eligibility.",
      status: "Competitive Benchmark",
    },
    7: {
      title: "NCLC 7+ (B2 Targeted - Recommended)",
      crsBoost: 50,
      description: "Unlocks MAX +50 Bonus CRS Points & targeted Express Entry French Category draws!",
      status: "Maximum PR Bonus Tier",
    },
  };

  const current = levelsData[nclcLevel] || levelsData[7];

  return (
    <div className="w-full max-w-4xl mx-auto rounded-3xl border border-gray-200 dark:border-white/10 bg-gradient-to-b from-white via-purple-50/30 to-white dark:from-[#0f172a] dark:via-[#161f38] dark:to-[#0f172a] p-8 md:p-10 shadow-xl relative overflow-hidden">
      {/* Top Banner Badge */}
      <div className="flex items-center gap-2 mb-6">
        <span className="p-2 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
          <Compass className="w-5 h-5" />
        </span>
        <div>
          <h3 className="text-sm font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
            Canada PR Calculator (Express Entry CRS)
          </h3>
          <p className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
            Calculate Your French Language Bonus Points
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Slider & Level Picker Controls */}
        <div className="md:col-span-7 space-y-6">
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            Immigration, Refugees and Citizenship Canada (IRCC) awards up to <strong>+50 bonus CRS points</strong> for French proficiency on TCF or TEF Canada exams.
          </p>

          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs font-semibold text-gray-700 dark:text-gray-300">
              <span>Select Target NCLC Level:</span>
              <span className="text-purple-600 dark:text-purple-400 font-bold text-sm">
                NCLC {nclcLevel} {nclcLevel >= 7 && "(B2 Mastery)"}
              </span>
            </div>

            {/* Slider */}
            <input
              type="range"
              min="4"
              max="7"
              step="1"
              value={nclcLevel}
              onChange={(e) => setNclcLevel(Number(e.target.value))}
              className="w-full h-3 bg-gray-200 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-purple-600"
            />

            <div className="flex justify-between text-[11px] font-medium text-gray-400">
              <span>NCLC 4</span>
              <span>NCLC 5</span>
              <span>NCLC 6</span>
              <span className="font-bold text-purple-500">NCLC 7+ (Goal)</span>
            </div>
          </div>

          {/* Quick Level Pill Selection */}
          <div className="grid grid-cols-4 gap-2">
            {[4, 5, 6, 7].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setNclcLevel(lvl)}
                className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-all ${
                  nclcLevel === lvl
                    ? "border-purple-500 bg-purple-600 text-white shadow-md shadow-purple-500/20"
                    : "border-gray-200 dark:border-white/10 bg-white/60 dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:border-purple-300"
                }`}
              >
                NCLC {lvl}{lvl === 7 ? "+" : ""}
              </button>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-white/80 dark:bg-white/5 border border-gray-200/80 dark:border-white/10 space-y-1">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span className="text-xs font-bold text-gray-900 dark:text-white">
                {current.title}
              </span>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {current.description}
            </p>
          </div>
        </div>

        {/* Dynamic CRS Score Display Card */}
        <div className="md:col-span-5">
          <motion.div
            key={nclcLevel}
            initial={{ scale: 0.95, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-6 md:p-8 rounded-3xl bg-gradient-to-b from-purple-600 to-indigo-700 text-white shadow-2xl shadow-purple-600/30 text-center relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Award className="w-32 h-32" />
            </div>

            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/15 text-xs font-medium backdrop-blur-md mb-4">
              <Sparkles className="w-3.5 h-3.5" /> Express Entry Impact
            </span>

            <div className="text-5xl md:text-6xl font-extrabold tracking-tight mb-1">
              +{current.crsBoost}
            </div>
            <p className="text-sm font-semibold uppercase tracking-wider text-purple-200 mb-4">
              Bonus CRS Points
            </p>

            <div className="pt-4 border-t border-white/20 text-xs text-purple-100 space-y-2">
              <div className="flex items-center justify-between">
                <span>Category Draws:</span>
                <span className="font-bold text-white">French-Targeted</span>
              </div>
              <div className="flex items-center justify-between">
                <span>FrancPrep Pathway:</span>
                <span className="font-bold text-emerald-300">A1 ➔ B2 (NCLC 7)</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
