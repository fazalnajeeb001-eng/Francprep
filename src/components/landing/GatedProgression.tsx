import React from "react";
import { ShieldCheck, Compass, Lock, Unlock, ArrowRight, Award, CheckCircle2 } from "lucide-react";

export function GatedProgression() {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-300 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Academic Rigor & Mastery Progression</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          How FrancPrep Guarantees Fluency
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed">
          No superficial badges or endless guessing. FrancPrep combines optional placement tests with gated DELF/DALF exam milestones.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Card 1: Placement Test */}
        <div className="p-8 rounded-3xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-xl space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              1. Skippable Placement Test
            </h3>
            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              New students can take a brief 5-minute placement assessment to evaluate their starting benchmark.
            </p>
            <div className="space-y-2.5 pt-2">
              <div className="flex items-start gap-2 text-xs text-gray-700 dark:text-gray-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Default starting point is A1 for maximum foundational strength.</span>
              </div>
              <div className="flex items-start gap-2 text-xs text-gray-700 dark:text-gray-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Experienced learners can request level bypass from instructors.</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-blue-500/5 border border-blue-500/20 text-xs text-blue-700 dark:text-blue-300 flex items-center justify-between">
            <span className="font-semibold">Placement Evaluation Status</span>
            <span className="px-2.5 py-1 rounded-md bg-blue-500/20 font-bold">Optional</span>
          </div>
        </div>

        {/* Card 2: Exam Gates */}
        <div className="p-8 rounded-3xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-xl space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              2. Gated Exam Milestones
            </h3>
            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              After finishing every chapter, students take a timed DELF/DALF & TCF/TEF simulator exam.
            </p>
            <div className="space-y-2.5 pt-2">
              <div className="flex items-start gap-2 text-xs text-gray-700 dark:text-gray-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Next level unlocks ONLY when the student passes the milestone exam.</span>
              </div>
              <div className="flex items-start gap-2 text-xs text-gray-700 dark:text-gray-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Real exam conditions: listening, reading comprehension & typed writing.</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-purple-500/5 border border-purple-500/20 text-xs text-purple-700 dark:text-purple-300 flex items-center justify-between">
            <span className="font-semibold">Progression Standard</span>
            <span className="px-2.5 py-1 rounded-md bg-purple-500/20 font-bold">80%+ Pass Score Required</span>
          </div>
        </div>
      </div>
    </div>
  );
}
