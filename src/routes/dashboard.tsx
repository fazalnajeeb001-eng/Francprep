import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useAuth } from "~/lib/AuthContext";
import { apiFetch } from "~/lib/apiFetch";

export const Route = createFileRoute("/dashboard")({
  component: DashboardPage,
});

// ─── Types ──────────────────────────────────────────────────────────────────
interface DashboardData {
  user: { firstName: string; lastName: string; email: string; subscriptionTier: string };
  stats: { streak: number; xp: number; totalStudyTime: number; hearts: number };
  levelProgress: Array<{ level: string; total: number; completed: number; status: string }>;
  overallProgress: number;
  lessonsCompleted: { completed: number; total: number };
  vocabularyLearned: number;
  grammarMastered: number;
  averageScore: number;
  weeklyActivity: Array<{ day: string; minutes: number }>;
  streakCalendar: Array<{ date: string; count: number }>;
  todayPlan: Array<{ id: string; title: string; type: string; completed: boolean }>;
  continueLearning: { unit: string; title: string; progress: number; lessonId: string } | null;
  recentAchievements: Array<{ id: string; title: string; description: string; earnedAt: string; icon: string }>;
}

const CEFR_LEVELS = [
  { level: "A1", icon: "🌱", label: "Beginner" },
  { level: "A2", icon: "🌿", label: "Elementary" },
  { level: "B1", icon: "🌳", label: "Intermediate" },
  { level: "B2", icon: "🔥", label: "Upper-Int" },
  { level: "C1", icon: "💎", label: "Advanced" },
  { level: "C2", icon: "👑", label: "Mastery" },
];

function DashboardPage() {
  const { user, isLoading: authLoading } = useAuth();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (authLoading || !user) return;
    const fetchData = async () => {
      try {
        const res = await apiFetch("/dashboard");
        const json = await res.json();
        if (json.success) setData(json.data);
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    };
    fetchData();
  }, [user, authLoading]);

  if (authLoading || loading) return (
    <div className="min-h-screen bg-[#0F0C1B] flex items-center justify-center">
      <div className="text-[#39FF14] text-xl animate-pulse">Loading...</div>
    </div>
  );

  if (!data) return (
    <div className="min-h-screen bg-[#0F0C1B] flex items-center justify-center">
      <div className="text-white text-xl">Failed to load dashboard</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0F0C1B] text-white">
      <div className="flex">
        {/* Sidebar */}
        <Sidebar firstName={data.user.firstName} subscriptionTier={data.user.subscriptionTier} open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Main */}
        <div className="flex-1 min-h-screen">
          {/* Top Header */}
          <Header data={data} onMenuClick={() => setSidebarOpen(true)} />

          {/* Main Content */}
          <main className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
            {/* Row 1: Level Progress + Journey Banner */}
            <LevelProgressBar levels={data.levelProgress} overall={data.overallProgress} />
            <JourneyBanner firstName={data.user.firstName} streak={data.stats.streak} />

            {/* Row 2: 5-Column Metrics */}
            <MetricsRow data={data} />

            {/* Row 3: Today's Plan + Continue Learning */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TodayPlanCard plans={data.todayPlan} />
              <ContinueLearningCard cl={data.continueLearning} />
            </div>

            {/* Row 4: Weekly Activity + Streak Calendar + Achievements + AI Tutor */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
              <WeeklyActivityChart activities={data.weeklyActivity} />
              <StreakCalendar calendar={data.streakCalendar} />
              <AchievementsList achievements={data.recentAchievements} />
              <AITutorWidget />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

// ─── Sidebar ─────────────────────────────────────────────────────────────────
function Sidebar({ firstName, subscriptionTier, open, onClose }: { firstName: string; subscriptionTier: string; open: boolean; onClose: () => void }) {
  const navItems = {
    SCHOOL: [
      { label: "Dashboard", href: "/dashboard", active: true },
      { label: "My Level", href: "#" },
      { label: "Lessons", href: "/coaching" },
      { label: "Vocabulary", href: "#" },
      { label: "Grammar", href: "#" },
      { label: "Reading", href: "#" },
      { label: "Listening", href: "#" },
      { label: "Speaking", href: "#" },
      { label: "Writing", href: "#" },
    ],
    PRACTICE: [
      { label: "Flashcards", href: "#" },
      { label: "Exercises", href: "#" },
    ],
    "EXAM SIMULATOR": [
      { label: "TCF Canada", href: "/exam" },
      { label: "TEF Canada", href: "/exam" },
    ],
    UTILITIES: [
      { label: "Achievements", href: "#" },
      { label: "Calendar", href: "#" },
      { label: "Certificates", href: "#" },
      { label: "Settings", href: "/dashboard/settings" },
      { label: "Help & Support", href: "#" },
    ],
  };

  return (
    <>
      {open && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />}
      <aside className={`fixed lg:sticky top-0 z-50 lg:z-0 h-screen w-64 bg-[#0F0C1B]/95 backdrop-blur-xl border-r border-purple-900/30 flex flex-col transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        {/* Logo */}
        <div className="p-5 border-b border-purple-900/30">
          <div className="flex items-center gap-3">
            <span className="text-2xl">⚜️</span>
            <span className="text-xl font-bold bg-gradient-to-r from-[#8A2BE2] to-[#FF007F] bg-clip-text text-transparent">FrancPrep</span>
          </div>
        </div>

        {/* Nav sections */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 text-sm">
          {Object.entries(navItems).map(([section, items]) => (
            <div key={section}>
              <p className="text-[#8A2BE2] text-xs font-semibold tracking-wider mb-2">{section}</p>
              <div className="space-y-1">
                {items.map((item) => (
                  <Link
                    key={item.label}
                    to={item.href as any}
                    className={`block px-3 py-2 rounded-lg transition-all ${
                      item.active
                        ? "bg-[#8A2BE2]/20 text-white border-l-2 border-[#8A2BE2]"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Premium Card */}
        <div className="p-4 border-t border-purple-900/30">
          <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/30 rounded-xl p-4 text-center backdrop-blur-sm">
            <span className="text-2xl">👑</span>
            <p className="text-xs text-gray-300 mt-1">Go Premium</p>
            <p className="text-[10px] text-gray-500 mb-2">Unlock All Features</p>
            <button className="w-full bg-gradient-to-r from-[#8A2BE2] to-[#FF007F] text-white text-xs font-semibold py-2 rounded-lg hover:opacity-90 transition-opacity">
              Upgrade Now
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

// ─── Header ──────────────────────────────────────────────────────────────────
function Header({ data, onMenuClick }: { data: DashboardData; onMenuClick: () => void }) {
  return (
    <header className="sticky top-0 z-30 bg-[#0F0C1B]/80 backdrop-blur-xl border-b border-purple-900/20 px-4 md:px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="lg:hidden text-white text-xl" onClick={onMenuClick}>☰</button>
          <h1 className="text-lg md:text-xl font-bold">
            Bonjour, <span className="bg-gradient-to-r from-[#39FF14] to-[#8A2BE2] bg-clip-text text-transparent">{data.user.firstName}</span>!
          </h1>
        </div>
        <div className="flex items-center gap-4">
          {/* Streak */}
          <div className="flex items-center gap-1.5 bg-[#1a1533] px-3 py-1.5 rounded-full border border-amber-500/30">
            <span>🔥</span>
            <span className="text-amber-400 font-bold text-sm">{data.stats.streak}</span>
            <span className="text-gray-500 text-xs">day</span>
          </div>
          {/* XP */}
          <div className="flex items-center gap-1.5 bg-[#1a1533] px-3 py-1.5 rounded-full border border-[#39FF14]/30">
            <span>💎</span>
            <span className="text-[#39FF14] font-bold text-sm">{data.stats.xp}</span>
            <span className="text-gray-500 text-xs">XP</span>
          </div>
          {/* Study Time */}
          <div className="hidden sm:flex items-center gap-1.5 bg-[#1a1533] px-3 py-1.5 rounded-full border border-[#8A2BE2]/30">
            <span>⏱️</span>
            <span className="text-[#8A2BE2] font-bold text-sm">{Math.floor(data.stats.totalStudyTime / 60)}h {data.stats.totalStudyTime % 60}m</span>
          </div>
          {/* Hearts */}
          <div className="flex items-center gap-1">
            {[1,2,3].map(i => (
              <span key={i} className={`text-sm ${i <= data.stats.hearts ? 'text-red-500' : 'text-gray-700'}`}>♥</span>
            ))}
          </div>
          {/* Notifications */}
          <button className="relative">
            <span className="text-xl">🔔</span>
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#FF007F] rounded-full text-[10px] flex items-center justify-center font-bold">2</span>
          </button>
          {/* Avatar */}
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#8A2BE2] to-[#FF007F] flex items-center justify-center text-sm font-bold">
            {data.user.firstName[0]}
          </div>
        </div>
      </div>
    </header>
  );
}

// ─── Level Progress Bar ──────────────────────────────────────────────────────
function LevelProgressBar({ levels, overall }: { levels: DashboardData["levelProgress"]; overall: number }) {
  return (
    <div className="bg-[#1a1533]/80 backdrop-blur-sm rounded-2xl p-5 border border-purple-900/30">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-gray-300">CEFR Level Progress</h2>
        <span className="text-[#39FF14] text-sm font-bold">{overall}% Complete</span>
      </div>
      <div className="flex items-center gap-0">
        {levels.map((l, i) => (
          <div key={l.level} className="flex-1 relative">
            <div className={`h-2 ${i === 0 ? "rounded-l-full" : ""} ${i === levels.length-1 ? "rounded-r-full" : ""} ${
              l.status === "completed" ? "bg-[#39FF14]" :
              l.status === "active" ? "bg-[#8A2BE2]" : "bg-gray-800"
            }`} style={{ width: `${l.total > 0 ? (l.completed / l.total) * 100 : 0}%` }} />
            <div className="text-center mt-1">
              <span className={`text-[10px] ${l.status === "locked" ? "text-gray-600" : "text-gray-300"}`}>{l.level}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Journey Banner ──────────────────────────────────────────────────────────
function JourneyBanner({ firstName, streak }: { firstName: string; streak: number }) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#8A2BE2]/30 via-purple-900/20 to-[#FF007F]/20 border border-purple-500/20 p-6 backdrop-blur-sm">
      <div className="absolute top-0 right-0 w-48 h-48 bg-[#39FF14]/5 rounded-full blur-3xl" />
      <div className="relative z-10">
        <h2 className="text-xl font-bold">Your Journey to Fluency 🌟</h2>
        <p className="text-gray-400 text-sm mt-1">Keep going, {firstName}! You're on a <span className="text-amber-400 font-bold">{streak}-day streak</span>.</p>
        <div className="mt-3 flex gap-2">
          <span className="text-xs bg-white/10 px-3 py-1 rounded-full">🎯 TCF Canada</span>
          <span className="text-xs bg-white/10 px-3 py-1 rounded-full">🏆 TEF Canada</span>
        </div>
      </div>
    </div>
  );
}

// ─── Metrics Row ─────────────────────────────────────────────────────────────
function MetricsRow({ data }: { data: DashboardData }) {
  const metrics = [
    { label: "Overall Progress", value: `${data.overallProgress}%`, icon: "📊", color: "from-[#39FF14] to-emerald-500" },
    { label: "Lessons Done", value: `${data.lessonsCompleted.completed}/${data.lessonsCompleted.total}`, icon: "📖", color: "from-[#8A2BE2] to-purple-500" },
    { label: "Vocabulary", value: `${data.vocabularyLearned}`, icon: "📚", color: "from-blue-500 to-cyan-500" },
    { label: "Grammar", value: `${data.grammarMastered}`, icon: "✍️", color: "from-pink-500 to-rose-500" },
    { label: "Avg Score", value: `${data.averageScore}%`, icon: "🎯", color: "from-amber-500 to-orange-500" },
  ];
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {metrics.map((m) => (
        <div key={m.label} className="bg-[#1a1533]/80 backdrop-blur-sm rounded-xl p-4 border border-purple-900/30 hover:border-purple-500/50 transition-all">
          <div className="flex items-center gap-2">
            <span className="text-lg">{m.icon}</span>
            <p className="text-gray-500 text-xs">{m.label}</p>
          </div>
          <p className={`text-2xl font-bold mt-2 bg-gradient-to-r ${m.color} bg-clip-text text-transparent`}>{m.value}</p>
          <div className="mt-2 h-1 bg-gray-800 rounded-full overflow-hidden">
            <div className={`h-full bg-gradient-to-r ${m.color} rounded-full transition-all duration-500`}
              style={{ width: m.label === "Overall Progress" ? `${data.overallProgress}%` : "70%" }} />
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Today's Plan ────────────────────────────────────────────────────────────
function TodayPlanCard({ plans }: { plans: DashboardData["todayPlan"] }) {
  const icons: Record<string, string> = { lesson: "📖", vocabulary: "📚", listening: "🎧", grammar: "✍️", speaking: "🗣️" };
  return (
    <div className="bg-[#1a1533]/80 backdrop-blur-sm rounded-2xl p-5 border border-purple-900/30">
      <h3 className="text-sm font-semibold text-gray-300 mb-4">📋 Today's Plan</h3>
      {plans.length === 0 ? (
        <p className="text-gray-500 text-sm">All caught up! 🎉</p>
      ) : (
        <div className="space-y-2">
          {plans.map((p) => (
            <div key={p.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors">
              <span>{icons[p.type] || "📖"}</span>
              <span className="flex-1 text-sm text-gray-300">{p.title}</span>
              <button className="w-5 h-5 rounded border border-purple-500/50 flex items-center justify-center hover:bg-[#39FF14]/20 transition-colors">
                {p.completed ? <span className="text-[#39FF14] text-xs">✓</span> : null}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Continue Learning ───────────────────────────────────────────────────────
function ContinueLearningCard({ cl }: { cl: DashboardData["continueLearning"] }) {
  if (!cl) return null;
  return (
    <div className="bg-[#1a1533]/80 backdrop-blur-sm rounded-2xl p-5 border border-purple-900/30">
      <h3 className="text-sm font-semibold text-gray-300 mb-4">▶️ Continue Learning</h3>
      <div className="bg-gradient-to-br from-[#8A2BE2]/20 to-[#FF007F]/10 rounded-xl p-4 border border-purple-500/20">
        <p className="text-[10px] text-[#8A2BE2] font-semibold uppercase">{cl.unit}</p>
        <p className="text-sm font-semibold mt-1">{cl.title}</p>
        <div className="mt-3 flex items-center gap-3">
          <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#39FF14] to-[#8A2BE2] rounded-full transition-all" style={{ width: `${cl.progress}%` }} />
          </div>
          <span className="text-[#39FF14] text-xs font-bold">{cl.progress}%</span>
        </div>
        <button className="mt-3 w-full bg-gradient-to-r from-[#8A2BE2] to-[#FF007F] text-white text-xs font-semibold py-2 rounded-lg hover:opacity-90 transition-opacity">
          Continue
        </button>
      </div>
    </div>
  );
}

// ─── Weekly Activity ─────────────────────────────────────────────────────────
function WeeklyActivityChart({ activities }: { activities: DashboardData["weeklyActivity"] }) {
  const max = Math.max(...activities.map(a => a.minutes), 1);
  return (
    <div className="bg-[#1a1533]/80 backdrop-blur-sm rounded-2xl p-5 border border-purple-900/30">
      <h3 className="text-sm font-semibold text-gray-300 mb-4">📈 Weekly Activity</h3>
      <div className="flex items-end gap-2 h-24">
        {activities.map((a) => (
          <div key={a.day} className="flex-1 flex flex-col items-center gap-1">
            <div className="w-full bg-gradient-to-t from-[#8A2BE2] to-[#39FF14] rounded-t-lg transition-all duration-500"
              style={{ height: `${(a.minutes / max) * 100}%`, minHeight: a.minutes > 0 ? '4px' : '2px' }} />
            <span className="text-[10px] text-gray-500">{a.day}</span>
            <span className="text-[9px] text-gray-600">{a.minutes}m</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Streak Calendar ─────────────────────────────────────────────────────────
function StreakCalendar({ calendar }: { calendar: DashboardData["streakCalendar"] }) {
  const weeks: DashboardData["streakCalendar"][] = [];
  for (let i = 0; i < calendar.length; i += 7) weeks.push(calendar.slice(i, i + 7));

  return (
    <div className="bg-[#1a1533]/80 backdrop-blur-sm rounded-2xl p-5 border border-purple-900/30">
      <h3 className="text-sm font-semibold text-gray-300 mb-4">📅 Streak Calendar</h3>
      <div className="flex gap-1">
        {weeks.slice(0, 4).map((week, wi) => (
          <div key={wi} className="flex flex-col gap-1">
            {week.map((d) => (
              <div key={d.date} className={`w-5 h-5 rounded-sm ${
                d.count === 0 ? 'bg-gray-800' :
                d.count <= 2 ? 'bg-[#8A2BE2]/40' :
                d.count <= 4 ? 'bg-[#8A2BE2]/70' : 'bg-[#39FF14]'
              }`} title={`${d.date}: ${d.count} activities`} />
            ))}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 mt-3 text-[10px] text-gray-500">
        <span>Less</span>
        <div className="w-3 h-3 rounded-sm bg-gray-800" />
        <div className="w-3 h-3 rounded-sm bg-[#8A2BE2]/40" />
        <div className="w-3 h-3 rounded-sm bg-[#8A2BE2]/70" />
        <div className="w-3 h-3 rounded-sm bg-[#39FF14]" />
        <span>More</span>
      </div>
    </div>
  );
}

// ─── Achievements ────────────────────────────────────────────────────────────
function AchievementsList({ achievements }: { achievements: DashboardData["recentAchievements"] }) {
  return (
    <div className="bg-[#1a1533]/80 backdrop-blur-sm rounded-2xl p-5 border border-purple-900/30">
      <h3 className="text-sm font-semibold text-gray-300 mb-4">🏆 Achievements</h3>
      <div className="space-y-2">
        {achievements.map((a) => (
          <div key={a.id} className="flex items-center gap-3 p-2 rounded-lg bg-white/5">
            <span className="text-lg">{a.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold">{a.title}</p>
              <p className="text-[10px] text-gray-500 truncate">{a.description}</p>
            </div>
          </div>
        ))}
        {achievements.length === 0 && <p className="text-gray-500 text-xs">Complete lessons to earn achievements!</p>}
      </div>
    </div>
  );
}

// ─── AI Tutor Widget ─────────────────────────────────────────────────────────
function AITutorWidget() {
  return (
    <div className="bg-[#1a1533]/80 backdrop-blur-sm rounded-2xl p-5 border border-purple-900/30">
      <h3 className="text-sm font-semibold text-gray-300 mb-4">🤖 AI Tutor</h3>
      <div className="bg-gradient-to-br from-[#FF007F]/10 to-[#8A2BE2]/10 rounded-xl p-4 border border-pink-500/20 text-center">
        <span className="text-3xl">🧠</span>
        <p className="text-xs text-gray-400 mt-2">Ask me anything about French grammar or exam prep!</p>
        <div className="mt-3 flex gap-2">
          <input type="text" placeholder="Type a question..." className="flex-1 bg-white/5 border border-purple-500/30 rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#8A2BE2]" />
          <button className="bg-gradient-to-r from-[#8A2BE2] to-[#FF007F] text-white text-xs px-3 py-2 rounded-lg hover:opacity-90">Send</button>
        </div>
      </div>
    </div>
  );
}
