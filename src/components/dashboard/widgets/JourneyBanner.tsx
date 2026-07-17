import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Crown, BookOpen, BookText, Languages, Trophy, Target, Zap, Clock, Star } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { DashboardData } from "../types";
import { getGoal, CEFR_ORDER } from "../utils/userPrefs";

const CEFR_NAMES: Record<string, string> = { A1: "Découverte", A2: "Progrès", B1: "Indépendance", B2: "Autonomie", C1: "Maîtrise", C2: "Perfectionnement" };
const CEFR_DESC: Record<string, string> = { A1: "Beginner", A2: "Elementary", B1: "Intermediate", B2: "Upper Intermediate", C1: "Advanced", C2: "Mastery" };

function getActiveLevel(levels: DashboardData["levelProgress"]): string {
  const active = levels.find((l) => l.status === "active");
  if (active) return active.level;
  const last = [...levels].reverse().find((l) => l.status === "completed");
  return last ? last.level : "A1";
}

interface JourneyBannerProps {
  dark: boolean; firstName: string; streak: number; overallProgress: number;
  levels: DashboardData["levelProgress"]; lessonsCompleted: DashboardData["lessonsCompleted"];
  vocabularyLearned: number; grammarMastered: number; averageScore: number;
  stats: DashboardData["stats"]; recentAchievements: DashboardData["recentAchievements"];
  avatarUrl?: string; avatarFeatures?: DashboardData["user"]["avatarFeatures"];
}

export function JourneyBanner({ dark, firstName, streak, overallProgress, levels, lessonsCompleted, vocabularyLearned, grammarMastered, averageScore, stats, recentAchievements, avatarUrl, avatarFeatures }: JourneyBannerProps) {
  const [, setTick] = useState(0);
  const activeLevel = getActiveLevel(levels);
  const activeData = levels.find((l) => l.level === activeLevel);
  const goalData = getGoal();

  // Re-read goal on mount + custom event from Settings/GoalModal
  useEffect(() => {
    const onGoalChange = () => setTick((t) => t + 1);
    window.addEventListener("goal-changed", onGoalChange);
    return () => window.removeEventListener("goal-changed", onGoalChange);
  }, []);

  const statsList = [
    { icon: <Target className="w-3 h-3" />, label: "Level", value: `${activeLevel} — ${CEFR_NAMES[activeLevel]}`, color: "text-purple-400" },
    { icon: <BookOpen className="w-3 h-3" />, label: "Lessons", value: `${lessonsCompleted.completed}/${lessonsCompleted.total}`, color: "text-emerald-400" },
    { icon: <BookText className="w-3 h-3" />, label: "Vocabulary", value: `${vocabularyLearned} words`, color: "text-blue-400" },
    { icon: <Languages className="w-3 h-3" />, label: "Grammar", value: `${grammarMastered} topics`, color: "text-pink-400" },
    { icon: <Zap className="w-3 h-3" />, label: "XP Earned", value: `${stats.xp}`, color: "text-amber-400" },
    { icon: <Clock className="w-3 h-3" />, label: "Study Time", value: `${Math.floor(stats.totalStudyTime / 60)}h ${stats.totalStudyTime % 60}m`, color: "text-indigo-400" },
    { icon: <Trophy className="w-3 h-3" />, label: "Avg Score", value: `${averageScore}%`, color: "text-rose-400" },
    { icon: <Star className="w-3 h-3" />, label: "Streak", value: `${streak} days`, color: "text-amber-400" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className={`relative overflow-hidden rounded-[24px] border transition-colors ${
        dark ? "border-[#1e2a4a]" : "border-gray-200"
      } h-full flex flex-col`}
    >

      {/* === FULL BACKGROUND === */}
      <div className="absolute inset-0">
        {/* Sky gradient */}
        <div className="absolute inset-0" style={{
          background: dark
            ? "linear-gradient(180deg, #070B1A 0%, #0F1433 15%, #1A1047 35%, #1A1047 50%, #0F1433 75%, #070B1A 100%)"
            : "linear-gradient(180deg, #E8E0F0 0%, #D0C0E8 25%, #B8A8D8 50%, #C8B8E8 75%, #E0D8F0 100%)",
        }} />

        {/* Mountain silhouettes */}
        <svg className="absolute left-0 w-full" style={{ top: "20%", height: "60%" }} viewBox="0 0 500 200" preserveAspectRatio="none">
          <path d="M0,200 L0,80 Q80,40 160,70 Q240,20 320,60 Q400,30 500,50 L500,200 Z"
            fill={dark ? "#0a0e24" : "#9080b8"} opacity={0.35} />
          <path d="M0,200 L0,120 Q100,80 200,110 Q300,65 400,95 Q450,75 500,90 L500,200 Z"
            fill={dark ? "#0d1230" : "#7868a8"} opacity={0.3} />
        </svg>

        {/* Purple mist */}
        <div className="absolute left-0 right-0" style={{
          top: "55%",
          height: "25%",
          background: dark
            ? "linear-gradient(180deg, transparent 0%, rgba(139,92,246,0.08) 40%, rgba(139,92,246,0.15) 70%, rgba(139,92,246,0.05) 100%)"
            : "linear-gradient(180deg, transparent 0%, rgba(139,92,246,0.06) 100%)",
        }} />

        {/* Floating particles */}
        {dark && Array.from({ length: 8 }).map((_, i) => (
          <motion.div key={i} className="absolute rounded-full"
            style={{
              width: 2 + (i % 2),
              height: 2 + (i % 2),
              left: `${8 + (i * 12) % 85}%`,
              top: `${10 + (i * 11) % 60}%`,
              background: i % 3 === 0 ? "rgba(139,92,246,0.6)" : i % 3 === 1 ? "rgba(236,72,153,0.4)" : "rgba(56,189,248,0.35)",
            }}
            animate={{ y: [0, -12, 0], opacity: [0.15, 0.6, 0.15] }}
            transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.4 }}
          />
        ))}

        {/* Subtle vignette */}
        <div className="absolute inset-0" style={{
          background: dark
            ? "radial-gradient(ellipse at center, transparent 40%, rgba(7,11,26,0.6) 100%)"
            : "radial-gradient(ellipse at center, transparent 40%, rgba(255,255,255,0.3) 100%)",
        }} />
      </div>

      {/* === CONTENT === */}
      <div className="relative z-10 p-5 pt-6 flex-1 flex flex-col space-y-3">

        {/* Header: Title + Avatar */}
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-11 h-11 rounded-full overflow-hidden">
            <img
              src={avatarFeatures?.gender === "male" ? "/models/leo-avatar.png" : "/models/chloe-avatar.png"}
              alt="Avatar"
              className="w-full h-full object-cover object-top"
              style={{ objectPosition: "50% 15%" }}
            />
          </div>
          <div>
            <h3 className={`text-sm font-bold ${dark ? "text-white" : "text-gray-900"} drop-shadow-lg`}>Your French Journey</h3>
            <p className={`text-[10px] ${dark ? "text-gray-300" : "text-gray-600"} drop-shadow`}>
              {firstName}'s adventure through France
            </p>
          </div>
        </div>

        {/* CEFR Level Card */}
        <div className={`p-4 rounded-2xl backdrop-blur-xl border ${
          dark ? "bg-[#0F1433]/70 border-[#1e2a4a]/50" : "bg-white/50 border-gray-200/50"
        }`}>
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  dark ? "bg-purple-500/20 text-purple-300" : "bg-purple-100 text-purple-700"
                }`}>
                  CEFR Level
                </span>
              </div>
              <p className={`text-base font-bold ${dark ? "text-white" : "text-gray-900"}`}>
                {activeLevel} — {CEFR_DESC[activeLevel]}
              </p>
              <p className={`text-[11px] ${dark ? "text-gray-400" : "text-gray-500"}`}>
                {activeData?.completed || 0} of {activeData?.total || 0} lessons completed
              </p>
            </div>
            <div className="text-right">
              <div className={`text-2xl font-bold ${dark ? "text-white" : "text-gray-900"}`}>
                {overallProgress}%
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-2 bg-gray-800/50 rounded-full overflow-hidden" role="progressbar" aria-valuenow={overallProgress} aria-valuemin={0} aria-valuemax={100}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(overallProgress, 100)}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 rounded-full relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
            </motion.div>
          </div>

          {/* Per-level mini track */}
          <div className="flex items-center gap-1.5 mt-3">
            {levels.map((l) => (
              <div key={l.level} className="flex-1 flex flex-col items-center gap-1">
                <div className={`w-full h-1.5 rounded-full ${
                  l.status === "completed" ? "bg-emerald-400" : l.status === "active" ? "bg-purple-400" : dark ? "bg-gray-800" : "bg-gray-200"
                }`} />
                <span className={`text-[8px] font-semibold ${
                  l.status === "completed" ? "text-emerald-400" : l.status === "active" ? "text-purple-400" : dark ? "text-gray-600" : "text-gray-400"
                }`}>
                  {l.level}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-2">
          {statsList.map((stat) => (
            <div key={stat.label} className={`${dark ? "bg-[#070B17]/60 border-[#1e2a4a]" : "bg-white/50 border-gray-200"} backdrop-blur-sm rounded-xl p-2.5 border text-center`}>
              <div className={`flex items-center justify-center mb-1 ${stat.color}`}>
                {stat.icon}
              </div>
              <p className={`text-[10px] font-bold ${dark ? "text-white" : "text-gray-900"} leading-tight`}>{stat.value}</p>
              <p className={`text-[8px] ${dark ? "text-gray-500" : "text-gray-400"} leading-tight mt-0.5`}>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Goal Card — always visible */}
        <div className={`${dark ? "bg-[#070B17]/60 border-[#1e2a4a]" : "bg-white/50 border-gray-200"} backdrop-blur-sm rounded-xl p-3 border`}>
          {goalData && goalData.goal !== "none" ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Crown className="w-3.5 h-3.5 text-amber-400" />
                <span className={`text-[11px] font-semibold ${dark ? "text-gray-300" : "text-gray-700"}`}>{goalData.label}</span>
              </div>
              <span className={`text-[10px] ${dark ? "text-gray-500" : "text-gray-400"}`}>
                {overallProgress < 100 ? `${overallProgress}%` : "Achieved!"}
              </span>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Crown className="w-3.5 h-3.5 text-amber-400/50" />
                <span className={`text-[11px] font-semibold ${dark ? "text-gray-400" : "text-gray-500"}`}>Set your learning goal</span>
              </div>
              <span className={`text-[10px] ${dark ? "text-gray-600" : "text-gray-400"}`}>TCF, TEF & more</span>
            </div>
          )}
        </div>

        {/* Recent Achievements */}
        {recentAchievements && recentAchievements.length > 0 && (
          <div className="flex gap-1.5 flex-wrap">
            {recentAchievements.slice(0, 3).map((ach) => (
              <div key={ach.id} className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[9px] backdrop-blur-sm ${dark ? "bg-[#070B17]/60 border border-[#1e2a4a] text-gray-400" : "bg-white/50 text-gray-500"}`}>
                <span>{ach.icon}</span><span>{ach.title}</span>
              </div>
            ))}
          </div>
        )}

        <Link to="/learn" className="block bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold py-2.5 rounded-xl hover:opacity-90 transition-all shadow-lg shadow-purple-500/25 text-center">
          Continue Learning
        </Link>
      </div>
    </motion.div>
  );
}
