import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "~/lib/AuthContext";
import { apiFetch } from "~/lib/apiFetch";
import { Sidebar } from "~/components/dashboard/Sidebar";
import { ProfileDropdown } from "~/components/dashboard/ProfileDropdown";
import { ThemeToggle } from "~/components/dashboard/ThemeToggle";
import { LoadingSkeleton } from "~/components/dashboard/LoadingSkeleton";
import { ErrorState } from "~/components/dashboard/ErrorState";
import { LevelProgress } from "~/components/dashboard/widgets/LevelProgress";
import { JourneyBanner } from "~/components/dashboard/widgets/JourneyBanner";
import { StatCard } from "~/components/dashboard/widgets/StatCard";
import { TodayPlan } from "~/components/dashboard/widgets/TodayPlan";
import { ContinueLearning } from "~/components/dashboard/widgets/ContinueLearning";
import { MilestoneCard } from "~/components/dashboard/widgets/MilestoneCard";
import { WeeklyGoal } from "~/components/dashboard/widgets/WeeklyGoal";
import { ActivityChart } from "~/components/dashboard/widgets/ActivityChart";
import { CalendarHeatmap } from "~/components/dashboard/widgets/CalendarHeatmap";
import { AchievementCard } from "~/components/dashboard/widgets/AchievementCard";
import { ExamCard } from "~/components/dashboard/widgets/ExamCard";
import { } from "~/components/dashboard/types";
import { Flame, Diamond, Timer, Bell, BookOpen, BookText, Languages, Target, TrendingUp, Zap, Brain, Award, BarChart3, Sparkles, Settings } from "lucide-react";
import type { DashboardData } from "~/components/dashboard/types";

export const Route = createFileRoute("/dashboard")({ component: DashboardPage });

function useTheme() {
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

function DashboardPage() {
  const { user, isLoading: authLoading } = useAuth();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { dark, toggle } = useTheme();

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

  if (authLoading || loading) return <LoadingSkeleton dark={dark} />;
  if (!data) return <ErrorState dark={dark} />;

  const b = dark ? "bg-[#070B17] text-white" : "bg-gray-50 text-gray-900";
  const txtSec = dark ? "text-gray-400" : "text-gray-500";
  const borderCls = dark ? "border-[#1e2a4a]" : "border-gray-200";

  return (
    <div className={`min-h-screen ${b} transition-colors duration-300`}>
      <div className="flex">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} dark={dark} />
        <div className="flex-1 min-h-screen">
          {/* Top Nav */}
          <header className={`sticky top-0 z-30 ${dark ? "bg-[#070B17]/80 border-[#1e2a4a]" : "bg-white/80 border-gray-200"} backdrop-blur-xl border-b transition-colors`}>
            <div className="flex items-center justify-between px-4 md:px-6 py-3">
              <div className="flex items-center gap-4">
                <button className="lg:hidden text-xl" onClick={() => setSidebarOpen(true)} aria-label="Open menu">☰</button>
                <div>
                  <h1 className={`text-lg md:text-xl font-bold ${dark ? "text-white" : "text-gray-900"}`}>
                    Bonjour, <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">{data.user.firstName}</span>!
                  </h1>
                  <p className={`text-xs ${txtSec}`}>Ready for today's lesson?</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <ThemeToggle dark={dark} onToggle={toggle} />
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
                <button className={`relative p-2 rounded-xl ${dark ? "hover:bg-white/5" : "hover:bg-gray-100"} transition-colors`} aria-label="Notifications">
                  <Bell className={`w-5 h-5 ${txtSec}`} />
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-pink-500 rounded-full text-[9px] flex items-center justify-center text-white font-bold">3</span>
                </button>
                <ProfileDropdown firstName={data.user.firstName} dark={dark} />
              </div>
            </div>
          </header>

          {/* Mobile Bottom Nav */}
          <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around px-2 py-2 border-t backdrop-blur-xl transition-colors"
            style={{ background: dark ? "rgba(7,11,23,0.95)" : "rgba(255,255,255,0.95)", borderColor: dark ? "#1e2a4a" : "#e5e7eb" }}>
            {[
              { icon: <BarChart3 className="w-5 h-5" />, label: "Dashboard" },
              { icon: <BookOpen className="w-5 h-5" />, label: "Lessons" },
              { icon: <Zap className="w-5 h-5" />, label: "Practice" },
              { icon: <Award className="w-5 h-5" />, label: "Achieve" },
              { icon: <Settings className="w-5 h-5" />, label: "More" },
            ].map((item) => (
              <button key={item.label} className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-colors ${dark ? "text-gray-400" : "text-gray-500"}`} aria-label={item.label}>
                {item.icon}
                <span className="text-[9px]">{item.label}</span>
              </button>
            ))}
          </nav>

          <main className="p-4 md:p-6 lg:p-8 space-y-6 max-w-[1440px] mx-auto pb-20 lg:pb-8">
            {/* Row 1: Hero */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <LevelProgress levels={data.levelProgress} dark={dark} overall={data.overallProgress} />
              <JourneyBanner dark={dark} firstName={data.user.firstName} streak={data.stats.streak} hearts={data.stats.hearts} />
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

            {/* Row 3: Plan + Continue + Milestone + Goal */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <TodayPlan plans={data.todayPlan} dark={dark} />
              <ContinueLearning cl={data.continueLearning} dark={dark} />
              <MilestoneCard dark={dark} completed={data.lessonsCompleted.completed} total={data.lessonsCompleted.total} />
              <WeeklyGoal dark={dark} minutes={data.stats.totalStudyTime} />
            </div>

            {/* Row 4: Charts + Achievements + Exams */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <ActivityChart activities={data.weeklyActivity} dark={dark} />
              <CalendarHeatmap calendar={data.streakCalendar} dark={dark} />
              <AchievementCard achievements={data.recentAchievements} dark={dark} />
              <ExamCard dark={dark} />
            </div>

            {/* Utility Panel */}
            <div className={`${dark ? "bg-[#101828]/80 border-[#1e2a4a]" : "bg-white/80 border-gray-200"} backdrop-blur-lg border rounded-2xl p-5 transition-colors`}>
              <h3 className={`text-sm font-semibold mb-4 ${dark ? "text-gray-300" : "text-gray-700"}`}>💡 Daily Tips</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { icon: <Brain className="w-5 h-5 text-purple-400" />, title: "Practice daily for 15min", desc: "Consistency beats cramming" },
                  { icon: <Award className="w-5 h-5 text-amber-400" />, title: "Review weak topics", desc: "Focus on grammar this week" },
                  { icon: <BarChart3 className="w-5 h-5 text-emerald-400" />, title: "Next milestone: B1", desc: `${Math.max(0, data.lessonsCompleted.total - data.lessonsCompleted.completed)} lessons remaining` },
                  { icon: <Sparkles className="w-5 h-5 text-pink-400" />, title: "Word of the day", desc: '"Aujourd\'hui" — today' },
                ].map((tip) => (
                  <div key={tip.title} className={`${dark ? "bg-[#070B17]" : "bg-gray-50"} rounded-xl p-3`}>
                    {tip.icon}
                    <p className={`text-xs font-semibold mt-1 ${dark ? "text-white" : "text-gray-900"}`}>{tip.title}</p>
                    <p className={`text-[10px] ${txtSec} mt-0.5`}>{tip.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
