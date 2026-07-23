import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, CheckCircle2, Award, Sparkles, Lock, ArrowRight, Shield } from "lucide-react";

export function CEFRRoadmap() {
  const [activeLevel, setActiveLevel] = useState<string>("A1");

  const levels = [
    {
      id: "A1",
      name: "A1 Discovery",
      subtitle: "Absolute Beginner",
      lessons: 80,
      chapters: 8,
      desc: "Build your foundation from zero. Learn essential greetings, everyday vocabulary, basic sentence structures, and initial listening patterns.",
      outcomes: [
        "Form negative & question structures (e.g. est-ce qu'il y a...)",
        "Name housing types, numbers, daily routines & greetings",
        "Understand native slow dialogues and basic reading texts",
      ],
      examGate: "A1 DELF Foundations Gate",
      badgeColor: "from-emerald-500 to-teal-600",
    },
    {
      id: "A2",
      name: "A2 Breakthrough",
      subtitle: "Elementary Fluency",
      lessons: 84,
      chapters: 9,
      desc: "Expand your conversational abilities. Express opinions, past events using Passé Composé & Imparfait, and navigate real-life French situations.",
      outcomes: [
        "Master past tense narratives and daily transactions",
        "Engage in shopping, travel, and direct social exchanges",
        "A2 DELF Certification Readiness",
      ],
      examGate: "A2 DELF Mastery Gate",
      badgeColor: "from-blue-500 to-cyan-600",
    },
    {
      id: "B1",
      name: "B1 Threshold",
      subtitle: "Independent Speaker",
      lessons: 92,
      chapters: 10,
      desc: "Develop independent communication skills. Express abstract thoughts, debate topics, write cohesive essays, and understand authentic French media.",
      outcomes: [
        "Handle spontaneous conversations with native speakers",
        "Express complex feelings, plans, and professional ideas",
        "B1 DELF & Initial TCF Canada Eligibility",
      ],
      examGate: "B1 DELF / TCF Gate",
      badgeColor: "from-indigo-500 to-purple-600",
    },
    {
      id: "B2",
      name: "B2 Vantage",
      subtitle: "Upper-Intermediate / TCF-TEF Goal",
      lessons: 96,
      chapters: 10,
      desc: "The critical milestone for TCF & TEF Canada. Master nuances, complex grammar, sub-technical topics, and rapid native speech comprehension.",
      outcomes: [
        "Achieve NCLC 7+ for MAX +50 Canada Express Entry Points",
        "Defend opinions in formal debates and complex discussions",
        "Understand standard spoken French without effort",
      ],
      examGate: "B2 DELF & TCF/TEF NCLC 7 Gate",
      badgeColor: "from-purple-600 to-pink-600",
    },
    {
      id: "C1",
      name: "C1 Effective Proficiency",
      subtitle: "Advanced Academic",
      lessons: 48,
      chapters: 6,
      desc: "Achieve fluent, flexible expression in academic, professional, and literary French without searching for expressions.",
      outcomes: [
        "Produce clear, well-structured, detailed text on complex subjects",
        "Understand a wide range of demanding, longer texts and implicit meaning",
        "C1 DALF Diploma Standard",
      ],
      examGate: "C1 DALF Advanced Gate",
      badgeColor: "from-amber-500 to-orange-600",
    },
    {
      id: "C2",
      name: "C2 Mastery",
      subtitle: "Native-Level Precision",
      lessons: 36,
      chapters: 5,
      desc: "Complete native-level mastery. Summarize information from different spoken and written sources, reconstructing arguments coherently.",
      outcomes: [
        "Express yourself spontaneously, very fluently, and precisely",
        "Differentiate finer shades of meaning even in complex situations",
        "C2 DALF Native Level Certification",
      ],
      examGate: "C2 DALF Native Mastery Gate",
      badgeColor: "from-red-500 to-rose-600",
    },
  ];

  const current = levels.find((l) => l.id === activeLevel) || levels[0];

  return (
    <div className="w-full max-w-6xl mx-auto space-y-10">
      {/* Header Info */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-300 text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Total 436 Lessons • 6 CEFR Modules</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          The 436-Lesson Academic Roadmap
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed">
          Unlike commercial apps that stop at basic vocabulary, FrancPrep takes you step-by-step from absolute beginner (A1) to native-level mastery (C2).
        </p>
      </div>

      {/* CEFR Level Selector Tabs */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-2 bg-gray-100 dark:bg-white/5 p-2 rounded-2xl border border-gray-200 dark:border-white/10">
        {levels.map((lvl) => {
          const isActive = lvl.id === activeLevel;
          return (
            <button
              key={lvl.id}
              onClick={() => setActiveLevel(lvl.id)}
              className={`py-3 px-3 rounded-xl font-bold text-xs md:text-sm transition-all flex flex-col items-center gap-1 ${
                isActive
                  ? "bg-white dark:bg-purple-600 text-purple-700 dark:text-white shadow-lg shadow-purple-500/20 scale-[1.02]"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/5"
              }`}
            >
              <span>{lvl.id}</span>
              <span className="text-[10px] font-normal opacity-80 hidden md:inline">{lvl.subtitle}</span>
            </button>
          );
        })}
      </div>

      {/* Active Level Detail Display Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeLevel}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="p-8 md:p-10 rounded-3xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-2xl relative overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <span className={`px-4 py-1.5 rounded-full text-xs font-bold text-white bg-gradient-to-r ${current.badgeColor}`}>
                  {current.name}
                </span>
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                  {current.chapters} Chapters • {current.lessons} Detailed Lessons
                </span>
              </div>

              <p className="text-sm md:text-base text-gray-700 dark:text-slate-300 leading-relaxed font-normal">
                {current.desc}
              </p>

              <div className="space-y-2">
                <p className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                  Target Outcomes & Skills:
                </p>
                <div className="space-y-2">
                  {current.outcomes.map((outcome, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-gray-700 dark:text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Exam Gate Badge Card */}
            <div className="md:col-span-5 p-6 rounded-2xl bg-gradient-to-b from-gray-50 to-gray-100 dark:from-white/5 dark:to-white/10 border border-gray-200 dark:border-white/10 space-y-4 text-center">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center mx-auto">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                  Gated Progression Exam
                </span>
                <h4 className="text-base font-bold text-gray-900 dark:text-white mt-1">
                  {current.examGate}
                </h4>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                Students must score 80%+ on the end-of-module exam to unlock the next level, ensuring genuine fluency.
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
