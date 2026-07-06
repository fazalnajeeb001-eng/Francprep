import { createFileRoute, Outlet, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "~/lib/AuthContext";
import { useTheme } from "~/lib/ThemeContext";
import { apiFetch } from "~/lib/apiFetch";
import { Sidebar } from "~/components/dashboard/Sidebar";
import { LoadingSkeleton } from "~/components/dashboard/LoadingSkeleton";
import { ErrorState } from "~/components/dashboard/ErrorState";
import { LevelProgress } from "~/components/dashboard/widgets/LevelProgress";
import { JourneyBanner } from "~/components/dashboard/widgets/JourneyBanner";
import { StatCard } from "~/components/dashboard/widgets/StatCard";
import { TodayPlan } from "~/components/dashboard/widgets/TodayPlan";
import { DailyChallenge } from "~/components/dashboard/widgets/DailyChallenge";
import { ActivityChart } from "~/components/dashboard/widgets/ActivityChart";
import { CalendarHeatmap } from "~/components/dashboard/widgets/CalendarHeatmap";
import { ExamCard } from "~/components/dashboard/widgets/ExamCard";
import { Flame, Diamond, Timer, BookOpen, BookText, Languages, Target, TrendingUp } from "lucide-react";
import type { DashboardData } from "~/components/dashboard/types";

export const Route = createFileRoute("/dashboard")({ component: DashboardPage });

function DashboardPage() {
  const { user, isLoading: authLoading } = useAuth();
  const { dark } = useTheme();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouterState();
  const isIndex = router.location.pathname === "/dashboard";

  useEffect(() => {
    if (authLoading || !user) return;
    (async () => {
      try { const res = await apiFetch("/dashboard"); const json = await res.json(); if (json.success) setData(json.data); }
      catch (e) { console.error(e); }
      finally { setLoading(false); }
    })();
  }, [user, authLoading]);

  if (authLoading) return <LoadingSkeleton dark={dark} />;

  // For child routes (settings, calendar), render sidebar + header + Outlet
  if (!isIndex) {
    return (
      <div className={`min-h-screen ${dark ? "bg-[#070B17] text-white" : "bg-gray-50 text-gray-900"} transition-colors duration-300`}>
        <div className="flex">
          <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} dark={dark} />
          <div className="flex-1 min-h-screen">
            <Outlet />
          </div>
        </div>
      </div>
    );
  }

  if (loading) return <LoadingSkeleton dark={dark} />;
  if (!data) return <ErrorState dark={dark} />;

  const b = dark ? "bg-[#070B17] text-white" : "bg-gray-50 text-gray-900";
  const txtSec = dark ? "text-gray-400" : "text-gray-500";

  return (
    <div className={`min-h-screen ${b} transition-colors duration-300`}>
      <div className="flex">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} dark={dark} />
        <div className="flex-1 min-h-screen">
          <header className={`sticky top-0 z-30 ${dark ? "bg-[#070B17]/80 border-[#1e2a4a]" : "bg-white/80 border-gray-200"} backdrop-blur-xl border-b transition-colors`}>
            <div className="flex items-center justify-between px-4 md:px-6 py-3">
              <div className="flex items-center gap-4">
                <button className="lg:hidden text-xl" onClick={() => setSidebarOpen(true)} aria-label="Open menu">☰</button>
                <div>
                  <h1 className={`text-lg md:text-xl font-bold ${dark ? "text-white" : "text-gray-900"}`}>
                    Dashboard
                  </h1>
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
                <div className={`hidden md:flex items-center gap-1.5 ${dark ? "bg-purple-500/10 border-purple-500/30" : "bg-purple-50 border-purple-200"} border px-3 py-1.5 rounded-full`}>
                  <Timer className="w-3.5 h-3.5 text-purple-400" />
                  <span className="text-purple-400 font-bold text-sm">{Math.floor(data.stats.totalStudyTime / 60)}h</span>
                </div>
              </div>
            </div>
          </header>

          <main className="p-4 md:p-6 lg:p-8 space-y-6 max-w-[1440px] mx-auto pb-20 lg:pb-8">
            {/* Row 1: Hero */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <LevelProgress levels={data.levelProgress} dark={dark} overall={data.overallProgress} />
              <JourneyBanner dark={dark} firstName={data.user.firstName} streak={data.stats.streak} overallProgress={data.overallProgress} />
            </div>

            {/* Row 2: 6 Stat Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <StatCard dark={dark} index={0} color="from-purple-500 to-pink-500" icon={<Target className="w-5 h-5 text-white" />} label="Overall Progress" value={`${data.overallProgress}%`} progress={data.overallProgress} />
              <StatCard dark={dark} index={1} color="from-emerald-500 to-teal-500" icon={<BookOpen className="w-5 h-5 text-white" />} label="Lessons" value={`${data.lessonsCompleted.completed}/${data.lessonsCompleted.total}`} progress={(data.lessonsCompleted.completed / Math.max(data.lessonsCompleted.total, 1)) * 100} />
              <StatCard dark={dark} index={2} color="from-blue-500 to-cyan-500" icon={<BookText className="w-5 h-5 text-white" />} label="Vocabulary" value={data.vocabularyLearned} sublabel="words learned" />
              <StatCard dark={dark} index={3} color="from-pink-500 to-rose-500" icon={<Languages className="w-5 h-5 text-white" />} label="Grammar" value={data.grammarMastered} sublabel="topics mastered" />
              <StatCard dark={dark} index={4} color="from-amber-500 to-orange-500" icon={<Timer className="w-5 h-5 text-white" />} label="Study Time" value={`${Math.floor(data.stats.totalStudyTime / 60)}h ${data.stats.totalStudyTime % 60}m`} />
              <StatCard dark={dark} index={5} color="from-indigo-500 to-purple-500" icon={<TrendingUp className="w-5 h-5 text-white" />} label="Avg Score" value={`${data.averageScore}%`} progress={data.averageScore} />
            </div>

            {/* Row 3: Plan + Daily Challenge */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TodayPlan plans={data.todayPlan} dark={dark} />
              <DailyChallenge dark={dark} />
            </div>

            {/* Row 4: Charts + Exams */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ActivityChart activities={data.weeklyActivity} dark={dark} />
              <CalendarHeatmap calendar={data.streakCalendar} dark={dark} />
              <ExamCard dark={dark} />
            </div>

            {/* Achievements — shown only when real data exists */}
            {data.recentAchievements && data.recentAchievements.length > 0 && (
              <div className={`${dark ? "bg-[#101828]/80 border-[#1e2a4a]" : "bg-white/80 border-gray-200"} backdrop-blur-lg border rounded-2xl p-5 transition-colors`}>
                <h3 className={`text-sm font-semibold mb-4 ${dark ? "text-gray-300" : "text-gray-700"}`}>🏆 Recent Achievements</h3>
                <div className="space-y-3">
                  {data.recentAchievements.map((ach) => (
                    <div key={ach.id} className="flex items-center gap-3">
                      <span className="text-lg">{ach.icon}</span>
                      <div>
                        <p className={`text-sm font-semibold ${dark ? "text-gray-200" : "text-gray-800"}`}>{ach.title}</p>
                        <p className={`text-xs ${dark ? "text-gray-500" : "text-gray-400"}`}>{ach.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
