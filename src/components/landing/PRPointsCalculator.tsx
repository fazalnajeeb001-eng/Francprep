import React, { useState } from "react";
import { motion } from "framer-motion";
import { Award, Compass, ShieldCheck, Sparkles, Clock, Calendar } from "lucide-react";

export function PRPointsCalculator() {
  const [targetLevel, setTargetLevel] = useState<number>(7);
  const [studyHoursPerWeek, setStudyHoursPerWeek] = useState<number>(10);

  // Level stats map
  const levelDetails: { [key: number]: { title: string; totalHours: number; crsBoost: number; desc: string } } = {
    4: {
      title: "NCLC 4 (A2 Basic)",
      totalHours: 120,
      crsBoost: 6,
      desc: "Initial conversational understanding for everyday survival French in Canada.",
    },
    5: {
      title: "NCLC 5 (B1 Baseline)",
      totalHours: 240,
      crsBoost: 12,
      desc: "Meets basic Express Entry eligibility thresholds for secondary language skills.",
    },
    6: {
      title: "NCLC 6 (B1 High)",
      totalHours: 360,
      crsBoost: 25,
      desc: "Unlocks substantial additional CRS points and work permit eligibility.",
    },
    7: {
      title: "NCLC 7+ (B2 Targeted - Recommended)",
      totalHours: 480,
      crsBoost: 50,
      desc: "Unlocks MAX +50 Bonus CRS Points & targeted Express Entry French Category draws!",
    },
  };

  const current = levelDetails[targetLevel] || levelDetails[7];
  const estimatedWeeks = Math.ceil(current.totalHours / studyHoursPerWeek);

  return (
    <div className="w-full max-w-5xl mx-auto rounded-3xl border border-gray-200 dark:border-white/10 bg-gradient-to-b from-white via-purple-50/20 to-white dark:from-[#0f172a] dark:via-[#161f38] dark:to-[#0f172a] p-8 md:p-10 shadow-2xl relative overflow-hidden">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
          <Compass className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
            Canada PR & Fluency Estimator
          </h3>
          <p className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Calculate Your Timeline & Express Entry Bonus Points
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Input Controls */}
        <div className="lg:col-span-7 space-y-6">
          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            Select your target NCLC French level and your weekly study pace to estimate your completion timeline and Canada Express Entry CRS point boost.
          </p>

          {/* Level selector slider */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs font-bold text-gray-800 dark:text-gray-200">
              <span>Target French Proficiency:</span>
              <span className="text-purple-600 dark:text-purple-400 font-extrabold text-sm">
                {current.title}
              </span>
            </div>

            <input
              type="range"
              min="4"
              max="7"
              step="1"
              value={targetLevel}
              onChange={(e) => setTargetLevel(Number(e.target.value))}
              className="w-full h-3 bg-gray-200 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-purple-600"
            />

            <div className="grid grid-cols-4 gap-2 pt-1">
              {[4, 5, 6, 7].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setTargetLevel(lvl)}
                  className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                    targetLevel === lvl
                      ? "border-purple-500 bg-purple-600 text-white shadow-md"
                      : "border-gray-200 dark:border-white/10 bg-white/60 dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:border-purple-300"
                  }`}
                >
                  NCLC {lvl}{lvl === 7 ? "+" : ""}
                </button>
              ))}
            </div>
          </div>

          {/* Weekly study hours slider */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs font-bold text-gray-800 dark:text-gray-200">
              <span>Weekly Study Commitment:</span>
              <span className="text-purple-600 dark:text-purple-400 font-extrabold text-sm">
                {studyHoursPerWeek} Hours / Week
              </span>
            </div>

            <input
              type="range"
              min="5"
              max="25"
              step="5"
              value={studyHoursPerWeek}
              onChange={(e) => setStudyHoursPerWeek(Number(e.target.value))}
              className="w-full h-2.5 bg-gray-200 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-purple-600"
            />
          </div>

          <div className="p-4 rounded-2xl bg-white/80 dark:bg-white/5 border border-gray-200/80 dark:border-white/10 space-y-1">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span className="text-xs font-bold text-gray-900 dark:text-white">
                {current.title}
              </span>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {current.desc}
            </p>
          </div>
        </div>

        {/* Dynamic Card Display */}
        <div className="lg:col-span-5">
          <motion.div
            key={`${targetLevel}-${studyHoursPerWeek}`}
            initial={{ scale: 0.95, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-6 md:p-8 rounded-3xl bg-gradient-to-b from-purple-600 to-indigo-700 text-white shadow-2xl shadow-purple-600/30 text-center relative overflow-hidden space-y-4"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Award className="w-32 h-32" />
            </div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-xs font-semibold backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5" /> Estimated Output
            </span>

            <div>
              <div className="text-5xl font-extrabold tracking-tight mb-0.5">
                +{current.crsBoost}
              </div>
              <p className="text-xs font-bold uppercase tracking-wider text-purple-200">
                Bonus CRS Points
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/20 text-xs">
              <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md text-left">
                <div className="flex items-center gap-1.5 text-purple-200 mb-1">
                  <Clock className="w-3.5 h-3.5 text-emerald-300" />
                  <span className="text-[11px] font-bold">Total Study</span>
                </div>
                <span className="text-base font-extrabold text-white">{current.totalHours} Hours</span>
              </div>

              <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md text-left">
                <div className="flex items-center gap-1.5 text-purple-200 mb-1">
                  <Calendar className="w-3.5 h-3.5 text-emerald-300" />
                  <span className="text-[11px] font-bold">Timeline</span>
                </div>
                <span className="text-base font-extrabold text-white">~{estimatedWeeks} Weeks</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
