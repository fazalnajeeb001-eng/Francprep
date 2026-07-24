import { createFileRoute, Outlet, useRouterState, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "~/lib/AuthContext";
import { useTheme } from "~/lib/ThemeContext";
import { apiFetch } from "~/lib/apiFetch";
import { Sidebar } from "~/components/dashboard/Sidebar";
import { LoadingSkeleton } from "~/components/dashboard/LoadingSkeleton";
import { ErrorState } from "~/components/dashboard/ErrorState";
import { LevelProgress } from "~/components/dashboard/widgets/LevelProgress";
import { JourneyBanner } from "~/components/dashboard/widgets/JourneyBanner";
import { TodayPlan } from "~/components/dashboard/widgets/TodayPlan";
import { DailyChallenge } from "~/components/dashboard/widgets/DailyChallenge";
import { WeeklyPlanner } from "~/components/dashboard/widgets/WeeklyPlanner";
import { CalendarHeatmap } from "~/components/dashboard/widgets/CalendarHeatmap";
import { ExamCard } from "~/components/dashboard/widgets/ExamCard";
import { WeakAreas } from "~/components/dashboard/widgets/WeakAreas";
import { WeeklyGoal } from "~/components/dashboard/widgets/WeeklyGoal";
import { fireConfetti } from "~/components/dashboard/utils/confetti";
import { getGreeting, getGoal, GOAL_OPTIONS, setGoal as saveGoalToStorage, type LearningGoal } from "~/components/dashboard/utils/userPrefs";
import { Flame, Diamond, Timer, Compass } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { DashboardData } from "~/components/dashboard/types";

export const Route = createFileRoute("/dashboard")({ component: DashboardPage });

function GoalModal({ dark, onClose }: { dark: boolean; onClose: (goal: LearningGoal) => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
        className={`${dark ? "bg-[#101828] border-[#1e2a4a]" : "bg-white border-gray-200"} border rounded-2xl p-6 w-full max-w-md shadow-2xl`}>
        <h2 className={`text-lg font-bold mb-1 ${dark ? "text-white" : "text-gray-900"}`}>Set Your Learning Goal</h2>
        <p className={`text-xs mb-5 ${dark ? "text-gray-400" : "text-gray-500"}`}>Optional — you can change this later in Settings.</p>
        <div className="grid grid-cols-2 gap-2">
          {GOAL_OPTIONS.map((opt) => (
            <button key={opt.value} onClick={() => onClose(opt.value)}
              className={`flex items-center gap-2 p-3 rounded-xl text-left transition-all ${dark ? "bg-[#070B17] border border-[#1e2a4a] hover:border-purple-500/50 text-gray-300" : "bg-gray-50 border border-gray-200 hover:border-purple-300 text-gray-700"}`}>
              <span className="text-lg">{opt.emoji}</span>
              <span className="text-xs font-semibold">{opt.label}</span>
            </button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

function DashboardPage() {
  const { user, isLoading: authLoading } = useAuth();
  const { dark } = useTheme();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showGoalModal, setShowGoalModal] = useState(false);
  const router = useRouterState();
  const isIndex = router.location.pathname === "/dashboard";

  useEffect(() => {
    if (authLoading || !user) return;
    (async () => {
      try {
        const res = await apiFetch("/dashboard");
        const json = await res.json();
          if (json.success) {
            setData(json.data);
            if (json.data.user.avatarFeatures) {
              localStorage.setItem("fp_avatar_features", JSON.stringify(json.data.user.avatarFeatures));
            }
            if (json.data.user.learningGoal && json.data.user.learningGoal !== "none") {
              const existing = getGoal();
              if (!existing || existing.goal !== json.data.user.learningGoal) {
                saveGoalToStorage(json.data.user.learningGoal as LearningGoal);
              }
            }
            if (!json.data.user.onboardingComplete) setShowGoalModal(true);
            if (json.data.overallProgress >= 100 || (json.data.lessonsCompleted.completed >= json.data.lessonsCompleted.total && json.data.lessonsCompleted.total > 0)) {
            setTimeout(() => fireConfetti(), 600);
          }
        }
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    })();
  }, [user, authLoading]);

  if (authLoading) return <LoadingSkeleton dark={dark} />;

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

  const b = dark ? "bg-[#070B17] text-white" : "bg-[#F8FAFC] text-slate-900";
  const txtSec = dark ? "text-gray-400" : "text-slate-600";
  const { emoji, greeting, motivational } = getGreeting();

  return (
    <div className={`min-h-screen ${b} transition-colors duration-300`}>
      <div className="flex">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} dark={dark} />
        <div className="flex-1 min-h-screen">
          <header className={`sticky top-0 z-30 ${dark ? "bg-[#070B17]/80 border-[#1e2a4a]" : "bg-white/90 border-slate-200 shadow-sm shadow-slate-200/50"} backdrop-blur-xl border-b transition-colors`}>
            <div className="flex items-center justify-between px-4 md:px-6 py-3">
              <div className="flex items-center gap-4">
                <button className="lg:hidden text-xl" onClick={() => setSidebarOpen(true)} aria-label="Open menu">☰</button>
                <div>
                  <h1 className={`text-lg md:text-xl font-bold ${dark ? "text-white" : "text-gray-900"}`}>
                    {emoji} {greeting}, <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">{data.user.firstName}</span>!
                  </h1>
                  <p className={`text-xs ${txtSec}`}>{motivational}</p>
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
                <Link
                  to="/onboarding"
                  className={`flex items-center gap-1.5 ${dark ? "bg-indigo-500/10 border-indigo-500/30 hover:bg-indigo-500/20 text-indigo-300" : "bg-indigo-50 border-indigo-200 hover:bg-indigo-100 text-indigo-700"} border px-3.5 py-1.5 rounded-full transition-all text-xs font-bold shadow-sm`}
                >
                  <Compass className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Placement Test</span>
                </Link>
              </div>
            </div>
          </header>

          <main className="p-4 md:p-6 lg:p-8 space-y-6 max-w-[1440px] mx-auto pb-20 lg:pb-8">
            {/* Row 1: Hero */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <LevelProgress levels={data.levelProgress} dark={dark} overall={data.overallProgress} avatarFeatures={data.user.avatarFeatures} avatarUrl={data.user.avatarUrl} />
              <JourneyBanner
                dark={dark} firstName={data.user.firstName} streak={data.stats.streak}
                overallProgress={data.overallProgress} levels={data.levelProgress}
                lessonsCompleted={data.lessonsCompleted} vocabularyLearned={data.vocabularyLearned}
                grammarMastered={data.grammarMastered} averageScore={data.averageScore}
                stats={data.stats} recentAchievements={data.recentAchievements}
                avatarUrl={data.user.avatarUrl} avatarFeatures={data.user.avatarFeatures}
              />
            </div>

            {/* Row 2: Plan + Daily Challenge + Weak Areas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <TodayPlan dark={dark} />
              <DailyChallenge dark={dark} />
              <WeakAreas levels={data.levelProgress} dark={dark} />
            </div>

            {/* Row 3: Weekly Goal + Planner + Calendar + Exam */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <WeeklyGoal dark={dark} />
              <WeeklyPlanner dark={dark} />
              <CalendarHeatmap calendar={data.streakCalendar} dark={dark} />
              <ExamCard averageScore={data.averageScore} dark={dark} />
            </div>

            {/* Achievements */}
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

      {/* Modals */}
      <AnimatePresence>
        {showGoalModal && (
          <GoalModal dark={dark} onClose={async (goal) => {
            try { await apiFetch("/user/profile/goal", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ goal }) }); } catch {}
            saveGoalToStorage(goal);
            setShowGoalModal(false);
            try { await apiFetch("/user/profile/complete-onboarding", { method: "PUT" }); } catch {}
            setData(prev => prev ? { ...prev, user: { ...prev.user, learningGoal: goal, onboardingComplete: true } } : prev);
          }} />
        )}
      </AnimatePresence>
    </div>
  );
}
