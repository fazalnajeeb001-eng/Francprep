import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useAuth } from "~/lib/AuthContext";
import { apiFetch } from "~/lib/apiFetch";
import { Sidebar } from "~/components/dashboard/Sidebar";
import { ProgressBar } from "~/components/dashboard/ui/ProgressBar";
import { GlassCard } from "~/components/dashboard/ui/GlassCard";
import { StatCard } from "~/components/dashboard/widgets/StatCard";
import { Flame, Diamond, Timer, Bell, ChevronDown, CheckCircle2, Lock, Star, ArrowRight, Crown, BookOpen, BookText, Languages, Target, TrendingUp, Clock, Award, Brain, Send, BarChart3, Zap, Trophy, Sparkles } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

export const Route = createFileRoute("/dashboard")({ component: DashboardPage });

interface DashboardData {
  user: { firstName: string; lastName: string; email: string; subscriptionTier: string };
  stats: { streak: number; xp: number; totalStudyTime: number; hearts: number };
  levelProgress: Array<{ level: string; total: number; completed: number; status: string }>;
  overallProgress: number;
  lessonsCompleted: { completed: number; total: number };
  vocabularyLearned: number; grammarMastered: number; averageScore: number;
  weeklyActivity: Array<{ day: string; minutes: number }>;
  streakCalendar: Array<{ date: string; count: number }>;
  todayPlan: Array<{ id: string; title: string; type: string; completed: boolean }>;
  continueLearning: { unit: string; title: string; progress: number; lessonId: string } | null;
  recentAchievements: Array<{ id: string; title: string; description: string; earnedAt: string; icon: string }>;
}

function useThemeState() {
  const [dark, setDark] = useState(true);
  const toggle = () => setDark(d => !d);
  useEffect(() => {
    const stored = localStorage.getItem("fp_theme");
    if (stored === "light") setDark(false);
  }, []);
  useEffect(() => {
    localStorage.setItem("fp_theme", dark ? "dark" : "light");
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);
  return { dark, toggle };
}
(window as any).__toggleTheme = () => { localStorage.setItem("fp_theme", (window as any).__dark ? "light" : "dark"); (window as any).__dark = !(window as any).__dark; window.location.reload(); };

const CEFR = [
  { level: "A1", label: "Beginner", color: "#22C55E" },
  { level: "A2", label: "Elementary", color: "#10B981" },
  { level: "B1", label: "Intermediate", color: "#7C3AED" },
  { level: "B2", label: "Upper-Int", color: "#A855F7" },
  { level: "C1", label: "Advanced", color: "#EC4899" },
  { level: "C2", label: "Mastery", color: "#F59E0B" },
];

function DashboardPage() {
  const { user, isLoading: authLoading } = useAuth();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { dark, toggle } = useThemeState();
  (window as any).__dark = dark;

  useEffect(() => {
    if (authLoading || !user) return;
    (async () => {
      try {
        const res = await apiFetch("/dashboard");
        const json = await res.json();
        if (json.success) setData(json.data);
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    })();
  }, [user, authLoading]);

  if (authLoading || loading) return (
    <div className="min-h-screen bg-[#070B17] flex items-center justify-center">
      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-10 h-10 border-2 border-purple-500 border-t-transparent rounded-full" />
    </div>
  );
  if (!data) return <div className="min-h-screen bg-[#070B17] flex items-center justify-center text-gray-400">Failed to load</div>;

  const b = dark ? "bg-[#070B17] text-white" : "bg-gray-50 text-gray-900";
  const card = dark ? "bg-[#101828]/80 border-[#1e2a4a]" : "bg-white/80 border-gray-200";
  const txtSec = dark ? "text-gray-400" : "text-gray-500";
  const txtPri = dark ? "text-white" : "text-gray-900";

  return (
    <div className={`min-h-screen ${b} transition-colors duration-300`}>
      <div className="flex">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} dark={dark} />
        <div className="flex-1 min-h-screen">
          {/* Top Nav */}
          <header className={`sticky top-0 z-30 ${dark ? "bg-[#070B17]/80 border-[#1e2a4a]" : "bg-white/80 border-gray-200"} backdrop-blur-xl border-b`}>
            <div className="flex items-center justify-between px-4 md:px-6 py-3">
              <div className="flex items-center gap-4">
                <button className="lg:hidden text-xl" onClick={() => setSidebarOpen(true)}>☰</button>
                <div>
                  <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`text-lg md:text-xl font-bold ${txtPri}`}>
                    Bonjour, <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">{data.user.firstName}</span>!
                  </motion.h1>
                  <p className={`text-xs ${txtSec}`}>Ready for today's lesson?</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className={`hidden sm:flex items-center gap-1.5 ${dark ? "bg-amber-500/10 border-amber-500/30" : "bg-amber-50 border-amber-200"} border px-3 py-1.5 rounded-full`}>
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-amber-500 font-bold text-sm">{data.stats.streak}</span>
                </div>
                <div className={`hidden sm:flex items-center gap-1.5 ${dark ? "bg-emerald-500/10 border-emerald-500/30" : "bg-emerald-50 border-emerald-200"} border px-3 py-1.5 rounded-full`}>
                  <Diamond className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-500 font-bold text-sm">{data.stats.xp}</span>
                </div>
                <div className={`hidden sm:flex items-center gap-1.5 ${dark ? "bg-purple-500/10 border-purple-500/30" : "bg-purple-50 border-purple-200"} border px-3 py-1.5 rounded-full`}>
                  <Timer className="w-3.5 h-3.5 text-purple-400" />
                  <span className="text-purple-400 font-bold text-sm">{Math.floor(data.stats.totalStudyTime / 60)}h</span>
                </div>
                <button className={`relative p-2 rounded-xl ${dark ? "hover:bg-white/5" : "hover:bg-gray-100"}`}>
                  <Bell className={`w-5 h-5 ${txtSec}`} />
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-pink-500 rounded-full text-[9px] flex items-center justify-center text-white font-bold">3</span>
                </button>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-sm font-bold text-white shadow-lg shadow-purple-500/25">
                  {data.user.firstName[0]}
                </div>
              </div>
            </div>
          </header>

          <main className="p-4 md:p-6 lg:p-8 space-y-6 max-w-[1440px] mx-auto">
            {/* Row 1: Hero */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Level Progress */}
              <GlassCard dark={dark}>
                <div className="flex items-center justify-between mb-5">
                  <h3 className={`text-sm font-semibold ${txtSec}`}>CEFR Level Progress</h3>
                  <span className="text-purple-400 text-sm font-bold">{data.overallProgress}%</span>
                </div>
                <div className="flex items-center justify-between mb-6">
                  {data.levelProgress.map((l, i) => (
                    <div key={l.level} className="flex flex-col items-center gap-1">
                      <motion.div
                        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.08 }}
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                          l.status === "completed" ? "bg-green-500 text-white shadow-lg shadow-green-500/30" :
                          l.status === "active" ? "bg-purple-500 text-white shadow-lg shadow-purple-500/30 animate-pulse" :
                          dark ? "bg-[#1e2a4a] text-gray-600" : "bg-gray-200 text-gray-400"
                        }`}
                      >{l.status === "completed" ? "✓" : l.status === "active" ? l.level : "🔒"}</div>
                      <span className={`text-[10px] ${l.status === "completed" ? "text-green-400" : l.status === "active" ? "text-purple-400" : "text-gray-600"}`}>{l.level}</span>
                    </div>
                  ))}
                </div>
                <div className={`${dark ? "bg-[#070B17]" : "bg-gray-50"} rounded-xl p-4`}>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="text-[10px] font-semibold uppercase text-purple-400">Currently in {data.levelProgress.find(l => l.status === "active")?.level || "A1"}</span>
                      <p className={`text-sm font-semibold mt-0.5 ${txtPri}`}>{data.lessonsCompleted.completed} / {data.lessonsCompleted.total} lessons</p>
                    </div>
                  </div>
                  <ProgressBar value={data.overallProgress} />
                  <button className="mt-3 text-xs font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1">View Details <ArrowRight className="w-3 h-3" /></button>
                </div>
              </GlassCard>

              {/* Journey Card */}
              <GlassCard dark={dark}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className={`text-lg font-bold ${txtPri}`}>Your French Journey 🇫🇷</h3>
                    <p className={`text-sm ${txtSec} mt-1`}>Keep going, <strong>{data.user.firstName}</strong>! {data.stats.streak > 0 ? `${data.stats.streak}-day streak!` : "Start today!"}</p>
                  </div>
                  <div className="flex gap-0.5">
                    {[1,2,3].map(i => <span key={i} className={`text-lg ${i <= data.stats.hearts ? "text-red-500 drop-shadow-glow-red" : "text-gray-700"}`}>♥</span>)}
                  </div>
                </div>
                <div className={`${dark ? "bg-gradient-to-br from-purple-900/30 to-pink-900/20" : "bg-gradient-to-br from-purple-100 to-pink-50"} rounded-2xl p-6 mb-4 text-center`}>
                  <Crown className="w-10 h-10 mx-auto text-amber-400" />
                  <p className={`text-sm font-semibold mt-2 ${dark ? "text-gray-200" : "text-gray-700"}`}>B2 French — {data.overallProgress}% Complete</p>
                </div>
                <div className={`${dark ? "bg-[#070B17]" : "bg-gray-50"} rounded-xl p-4`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs ${txtSec}`}>Journey Progress</span>
                    <span className="text-purple-400 text-sm font-bold">{data.overallProgress}%</span>
                  </div>
                  <ProgressBar value={data.overallProgress} />
                </div>
                <div className="flex gap-3 mt-4">
                  <button className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold py-2.5 rounded-xl hover:opacity-90 shadow-lg shadow-purple-500/25">Continue Learning</button>
                  <button className={`flex-1 border ${dark ? "border-[#1e2a4a] text-gray-300 hover:bg-white/5" : "border-gray-200 text-gray-700 hover:bg-gray-100"} py-2.5 rounded-xl text-sm font-semibold`}>View Progress</button>
                </div>
              </GlassCard>
            </div>

            {/* Row 2: Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <StatCard dark={dark} color="from-purple-500 to-pink-500" icon={<Target className="w-5 h-5 text-white" />} label="Overall Progress" value={`${data.overallProgress}%`} progress={data.overallProgress} />
              <StatCard dark={dark} color="from-emerald-500 to-teal-500" icon={<BookOpen className="w-5 h-5 text-white" />} label="Lessons" value={`${data.lessonsCompleted.completed}/${data.lessonsCompleted.total}`} progress={(data.lessonsCompleted.completed / Math.max(data.lessonsCompleted.total, 1)) * 100} />
              <StatCard dark={dark} color="from-blue-500 to-cyan-500" icon={<BookText className="w-5 h-5 text-white" />} label="Vocabulary" value={data.vocabularyLearned} sublabel="words learned" />
              <StatCard dark={dark} color="from-pink-500 to-rose-500" icon={<Languages className="w-5 h-5 text-white" />} label="Grammar" value={data.grammarMastered} sublabel="topics mastered" />
              <StatCard dark={dark} color="from-amber-500 to-orange-500" icon={<Timer className="w-5 h-5 text-white" />} label="Study Time" value={`${Math.floor(data.stats.totalStudyTime / 60)}h ${data.stats.totalStudyTime % 60}m`} />
              <StatCard dark={dark} color="from-indigo-500 to-purple-500" icon={<TrendingUp className="w-5 h-5 text-white" />} label="Avg Score" value={`${data.averageScore}%`} progress={data.averageScore} />
            </div>

            {/* Row 3: Plan + Continue + Goal */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Today's Plan */}
              <GlassCard dark={dark}>
                <h3 className={`text-sm font-semibold mb-4 ${txtSec}`}>📋 Today's Plan</h3>
                {data.todayPlan.length === 0 ? (
                  <p className={`text-sm ${txtSec}`}>All caught up! 🎉</p>
                ) : (
                  <div className="space-y-2">
                    {data.todayPlan.map((p, i) => (
                      <motion.div key={p.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                        className={`flex items-center gap-3 p-2.5 rounded-xl ${dark ? "hover:bg-white/5" : "hover:bg-gray-100"} transition-colors`}
                      >
                        <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs ${p.completed ? "bg-green-500/20 text-green-400" : dark ? "bg-[#1e2a4a] text-gray-400" : "bg-gray-200 text-gray-500"}`}>
                          {p.completed ? "✓" : i + 1}
                        </div>
                        <span className={`flex-1 text-sm ${p.completed ? "line-through text-green-400" : txtPri}`}>{p.title}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${dark ? "bg-purple-500/10 text-purple-400" : "bg-purple-100 text-purple-600"}`}>{p.type}</span>
                      </motion.div>
                    ))}
                  </div>
                )}
                <button className={`mt-3 text-xs font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1`}>View Full Plan <ArrowRight className="w-3 h-3" /></button>
              </GlassCard>

              {/* Continue Learning */}
              <GlassCard dark={dark}>
                <h3 className={`text-sm font-semibold mb-4 ${txtSec}`}>▶️ Continue Learning</h3>
                {data.continueLearning ? (
                  <div className={`${dark ? "bg-gradient-to-br from-purple-900/30 to-pink-900/20" : "bg-gradient-to-br from-purple-100 to-pink-50"} rounded-2xl p-5 border ${dark ? "border-purple-500/20" : "border-purple-200"} h-full`}>
                    <div className="flex items-center gap-2 mb-3">
                      <Zap className="w-4 h-4 text-amber-400" />
                      <span className="text-[10px] font-semibold uppercase text-purple-400">{data.continueLearning.unit}</span>
                    </div>
                    <p className={`text-sm font-semibold ${txtPri}`}>{data.continueLearning.title}</p>
                    <div className="flex items-center gap-3 mt-3">
                      <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${data.continueLearning.progress}%` }}
                          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
                      </div>
                      <span className="text-purple-400 text-xs font-bold">{data.continueLearning.progress}%</span>
                    </div>
                    <button className="mt-4 w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold py-2.5 rounded-xl hover:opacity-90 shadow-lg shadow-purple-500/25">Resume Lesson</button>
                  </div>
                ) : (
                  <p className={`text-sm ${txtSec}`}>No lessons in progress</p>
                )}
              </GlassCard>

              {/* Weekly Goal */}
              <GlassCard dark={dark}>
                <h3 className={`text-sm font-semibold mb-4 ${txtSec}`}>🎯 Weekly Goal</h3>
                <div className="flex flex-col items-center py-4">
                  <div className="relative w-24 h-24 mb-3">
                    <svg className="w-24 h-24 -rotate-90" viewBox="0 0 96 96">
                      <circle cx="48" cy="48" r="40" fill="none" stroke={dark ? "#1e2a4a" : "#e5e7eb"} strokeWidth="8" />
                      <motion.circle cx="48" cy="48" r="40" fill="none" stroke="#7C3AED" strokeWidth="8" strokeLinecap="round"
                        initial={{ strokeDasharray: 251.2, strokeDashoffset: 251.2 }}
                        animate={{ strokeDashoffset: 251.2 * (1 - Math.min(data.stats.totalStudyTime / 600, 1)) }}
                        transition={{ duration: 1.5, ease: "easeOut" }} />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-bold text-purple-400">{Math.min(Math.round((data.stats.totalStudyTime / 600) * 100), 100)}%</span>
                    </div>
                  </div>
                  <p className={`text-sm font-semibold ${txtPri}`}>{Math.floor(data.stats.totalStudyTime / 60)}h {data.stats.totalStudyTime % 60}m</p>
                  <p className={`text-xs ${txtSec}`}>of 10h goal</p>
                  <p className={`text-xs ${txtSec} mt-2`}>Keep going, you're doing great! 🎉</p>
                </div>
              </GlassCard>
            </div>

            {/* Row 4: Activity + Heatmap + Achievements + Exams */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
              {/* Weekly Chart */}
              <GlassCard dark={dark}>
                <h3 className={`text-sm font-semibold mb-4 ${txtSec}`}>📈 Weekly Activity</h3>
                <ResponsiveContainer width="100%" height={120}>
                  <BarChart data={data.weeklyActivity}>
                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: dark ? "#6B7280" : "#9CA3AF" }} />
                    <Tooltip contentStyle={{ background: dark ? "#101828" : "#fff", border: "none", borderRadius: 12, color: dark ? "#fff" : "#000", fontSize: 12 }} />
                    <Bar dataKey="minutes" radius={[4, 4, 0, 0]} maxBarSize={24}>
                      {data.weeklyActivity.map((_, i) => (
                        <Cell key={i} fill={i === data.weeklyActivity.length - 1 ? "#7C3AED" : dark ? "#1e2a4a" : "#d1d5db"} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </GlassCard>

              {/* Streak Calendar */}
              <GlassCard dark={dark}>
                <h3 className={`text-sm font-semibold mb-4 ${txtSec}`}>📅 Streak Calendar</h3>
                <div className="flex gap-1">
                  {(() => {
                    const weeks: typeof data.streakCalendar = [];
                    for (let i = 0; i < data.streakCalendar.length; i += 7) weeks.push(data.streakCalendar.slice(i, i + 7));
                    return weeks.slice(0, 4).map((week, wi) => (
                      <div key={wi} className="flex flex-col gap-1">
                        {week.map((d) => (
                          <div key={d.date} className={`w-5 h-5 rounded-sm ${
                            d.count === 0 ? (dark ? "bg-[#1e2a4a]" : "bg-gray-200") :
                            d.count <= 2 ? "bg-purple-500/30" :
                            d.count <= 4 ? "bg-purple-500/60" : "bg-purple-500"
                          }`} title={`${d.date}: ${d.count} activities`} />
                        ))}
                      </div>
                    ));
                  })()}
                </div>
                <div className="flex items-center gap-2 mt-3 text-[10px] text-gray-500">
                  Less <div className={`w-3 h-3 rounded-sm ${dark ? "bg-[#1e2a4a]" : "bg-gray-200"}`} />
                  <div className="w-3 h-3 rounded-sm bg-purple-500/30" />
                  <div className="w-3 h-3 rounded-sm bg-purple-500/60" />
                  <div className="w-3 h-3 rounded-sm bg-purple-500" /> More
                </div>
              </GlassCard>

              {/* Achievements */}
              <GlassCard dark={dark}>
                <h3 className={`text-sm font-semibold mb-4 ${txtSec}`}>🏆 Achievements</h3>
                {data.recentAchievements.length === 0 ? (
                  <p className={`text-xs ${txtSec}`}>Complete lessons to earn achievements!</p>
                ) : (
                  <div className="space-y-2">
                    {data.recentAchievements.slice(0, 4).map((a, i) => (
                      <motion.div key={a.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                        className={`flex items-center gap-3 p-2.5 rounded-xl ${dark ? "bg-[#070B17]" : "bg-gray-50"}`}
                      >
                        <span className="text-xl">{a.icon}</span>
                        <div className="flex-1 min-w-0">
                          <p className={`text-xs font-semibold ${txtPri}`}>{a.title}</p>
                          <p className={`text-[10px] ${txtSec} truncate`}>{a.description}</p>
                        </div>
                        <Sparkles className="w-3 h-3 text-amber-400" />
                      </motion.div>
                    ))}
                  </div>
                )}
              </GlassCard>

              {/* Exam Simulator */}
              <GlassCard dark={dark}>
                <h3 className={`text-sm font-semibold mb-4 ${txtSec}`}>🎯 Exam Simulator</h3>
                <div className="space-y-3">
                  <div className={`${dark ? "bg-[#070B17]" : "bg-gray-50"} rounded-xl p-4`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">🇨🇦</span>
                        <span className={`text-sm font-semibold ${txtPri}`}>TCF Canada</span>
                      </div>
                      <span className="text-purple-400 text-xs font-bold">67%</span>
                    </div>
                    <ProgressBar value={67} />
                    <p className={`text-[10px] ${txtSec} mt-1`}>3 mock exams completed</p>
                  </div>
                  <div className={`${dark ? "bg-[#070B17]" : "bg-gray-50"} rounded-xl p-4`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">🇨🇦</span>
                        <span className={`text-sm font-semibold ${txtPri}`}>TEF Canada</span>
                      </div>
                      <span className="text-purple-400 text-xs font-bold">45%</span>
                    </div>
                    <ProgressBar value={45} />
                    <p className={`text-[10px] ${txtSec} mt-1`}>1 mock exam completed</p>
                  </div>
                  <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold py-2.5 rounded-xl hover:opacity-90 shadow-lg shadow-purple-500/25">Start Simulator</button>
                </div>
              </GlassCard>
            </div>

            {/* Right Utility Panel */}
            <GlassCard dark={dark}>
              <h3 className={`text-sm font-semibold mb-4 ${txtSec}`}>💡 Daily Tips</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className={`${dark ? "bg-[#070B17]" : "bg-gray-50"} rounded-xl p-3`}>
                  <Brain className="w-5 h-5 text-purple-400 mb-1" />
                  <p className={`text-xs font-semibold ${txtPri}`}>Practice daily for 15min</p>
                  <p className={`text-[10px] ${txtSec}`}>Consistency beats cramming</p>
                </div>
                <div className={`${dark ? "bg-[#070B17]" : "bg-gray-50"} rounded-xl p-3`}>
                  <Award className="w-5 h-5 text-amber-400 mb-1" />
                  <p className={`text-xs font-semibold ${txtPri}`}>Review weak topics</p>
                  <p className={`text-[10px] ${txtSec}`}>Focus on grammar this week</p>
                </div>
                <div className={`${dark ? "bg-[#070B17]" : "bg-gray-50"} rounded-xl p-3`}>
                  <BarChart3 className="w-5 h-5 text-emerald-400 mb-1" />
                  <p className={`text-xs font-semibold ${txtPri}`}>Next milestone: B1</p>
                  <p className={`text-[10px] ${txtSec}`}>12 lessons remaining</p>
                </div>
                <div className={`${dark ? "bg-[#070B17]" : "bg-gray-50"} rounded-xl p-3`}>
                  <Sparkles className="w-5 h-5 text-pink-400 mb-1" />
                  <p className={`text-xs font-semibold ${txtPri}`}>Word of the day</p>
                  <p className={`text-[10px] ${txtSec}`}>"Aujourd'hui" — today</p>
                </div>
              </div>
            </GlassCard>
          </main>
        </div>
      </div>
    </div>
  );
}
