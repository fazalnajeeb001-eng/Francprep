import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, Component, ReactNode, ErrorInfo } from "react";
import { apiFetch } from "~/lib/apiFetch";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Users,
  Activity,
  DollarSign,
  Clock,
  Crown,
  PieChart,
  BarChart3,
  Search,
  ArrowLeft,
  ArrowUpRight,
  AlertTriangle,
  Flame,
  CheckCircle2,
  SlidersHorizontal,
  ExternalLink,
  BookOpen
} from "lucide-react";
import { useTheme } from "~/lib/ThemeContext";

class AnalyticsSectionBoundary extends Component<{ children: ReactNode; title?: string }, { hasError: boolean; error: string }> {
  state = { hasError: false, error: "" };
  static getDerivedStateFromError(err: Error) {
    return { hasError: true, error: err.message || "Component render exception" };
  }
  componentDidCatch(err: Error, info: ErrorInfo) {
    console.error("[AnalyticsSectionBoundary]", err, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{this.props.title || "Section"} telemetry metric notice: {this.state.error}</span>
          </div>
          <button
            onClick={() => this.setState({ hasError: false, error: "" })}
            className="px-3 py-1 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 font-bold transition-all text-amber-200"
          >
            Retry Widget
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

interface AnalyticsOverview {
  totalStudents: number;
  onlineCount: number;
  freeCount: number;
  payingCount: number;
  vipFreeCount: number;
  mrr: number;
  arr: number;
  arpu: number;
  ltv: number;
  conversionRate?: number;
  activeRetentionRate?: number;
  planCounts: {
    monthly: number;
    annual: number;
    lifetime: number;
    vipFree: number;
    free: number;
  };
  telemetry?: {
    topExamGoal: string;
    examBreakdown: Record<string, number>;
    totalStudyHours: number;
    avgSessionMinutes: string;
    activeStudentsCount: number;
  };
  students: Array<{
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    subscriptionTier: string;
    isVipFreeAccess?: boolean;
    customPriceOverride?: number;
    isOnline: boolean;
    lastActive: string;
    currentPage?: string;
    studyHours: number;
    completedLessons?: number;
    streakDays?: number;
    xp?: number;
    joinedAt?: string;
    targetExam: string;
  }>;
}

export function AnalyticsPage() {
  const { dark } = useTheme();
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState("all_time");
  const [data, setData] = useState<AnalyticsOverview | null>(null);
  
  // Interactive Filters & Sort
  const [studentSearch, setStudentSearch] = useState("");
  const [filterTab, setFilterTab] = useState<"all" | "online" | "paid" | "free" | "vip">("all");
  const [sortBy, setSortBy] = useState<"recent" | "hours" | "lessons" | "xp" | "name">("recent");

  const bg = dark ? "bg-[#070B17] text-white" : "bg-[#F8FAFC] text-slate-900";
  const card = dark ? "bg-[#101828]/90 border-white/10" : "bg-white border-slate-200 shadow-sm";
  const txtSec = dark ? "text-gray-400" : "text-slate-600";

  const [isLiveUpdating, setIsLiveUpdating] = useState(false);

  const fetchAnalytics = async (silent = false) => {
    if (!silent) setLoading(true);
    else setIsLiveUpdating(true);
    try {
      const res = await apiFetch("/admin/analytics/saas-overview");
      const json = await res.json();
      if (json.success && json.data) {
        setData(json.data);
      }
    } catch (e) {
      console.error(e);
    }
    if (!silent) setLoading(false);
    else setTimeout(() => setIsLiveUpdating(false), 800);
  };

  useEffect(() => {
    fetchAnalytics();
    const interval = setInterval(() => {
      fetchAnalytics(true);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const filteredStudents = (data?.students || [])
    .filter((s) => {
      if (filterTab === "online" && !s.isOnline) return false;
      if (filterTab === "paid" && s.subscriptionTier === "free" && !s.isVipFreeAccess) return false;
      if (filterTab === "free" && (s.subscriptionTier !== "free" || s.isVipFreeAccess)) return false;
      if (filterTab === "vip" && !s.isVipFreeAccess) return false;

      if (!studentSearch.trim()) return true;
      const tokens = studentSearch.trim().toLowerCase().split(/\s+/);
      const fullName = `${s.firstName || ""} ${s.lastName || ""}`.toLowerCase();
      const email = (s.email || "").toLowerCase();
      const page = (s.currentPage || "").toLowerCase();
      return tokens.every((t) => fullName.includes(t) || email.includes(t) || page.includes(t));
    })
    .sort((a, b) => {
      if (sortBy === "hours") return b.studyHours - a.studyHours;
      if (sortBy === "lessons") return (b.completedLessons || 0) - (a.completedLessons || 0);
      if (sortBy === "xp") return (b.xp || 0) - (a.xp || 0);
      if (sortBy === "name") return `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`);
      return new Date(b.lastActive || 0).getTime() - new Date(a.lastActive || 0).getTime();
    });

  const formatRoute = (path?: string) => {
    if (!path) return "Main Platform";
    if (path === "/" || path === "/dashboard") return "Dashboard";
    if (path.startsWith("/learn")) return "Curriculum Map";
    if (path.startsWith("/lessons/")) return `Lesson ${path.replace("/lessons/", "")}`;
    if (path.startsWith("/flashcards")) return "Flashcards Studio";
    if (path.startsWith("/exam")) return "DELF Exam Simulator";
    return path;
  };

  return (
    <div className={`min-h-screen ${bg} p-4 md:p-8 space-y-6 transition-colors duration-300`}>
      <div className="max-w-6xl mx-auto space-y-6">

        {/* ─── HEADER ─── */}
        <AnalyticsSectionBoundary title="Header">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-4 border-b border-gray-200 dark:border-white/10">
            <div>
              <Link to="/admin" className="text-xs text-purple-400 hover:underline flex items-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Admin Dashboard
              </Link>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight mt-1 flex items-center gap-3">
                <BarChart3 className="w-8 h-8 text-purple-400" />
                SaaS Executive Analytics & Telemetry Center
              </h1>
              <p className={`text-xs ${txtSec} mt-1`}>
                Real-time student behavior tracking, live presence, subscriber metrics, MRR/ARR financial health, and study habit telemetry.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-bold text-xs">
                <span className={`w-2.5 h-2.5 rounded-full bg-emerald-400 ${isLiveUpdating ? "scale-125 bg-emerald-300" : "animate-pulse"}`} />
                <span>{data?.onlineCount || 0} Students Online Now</span>
              </div>
              <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping" />
                <span>Live Sync (5s)</span>
              </div>

              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="rounded-xl p-2 text-xs font-bold border dark:bg-[#070B17] dark:border-white/10 text-white outline-none"
              >
                <option value="all_time">📅 All Time (Launch to Present)</option>
                <option value="2026-07">July 2026</option>
                <option value="2026-06">June 2026</option>
                <option value="2026-05">May 2026</option>
              </select>
            </div>
          </div>
        </AnalyticsSectionBoundary>

        {/* ─── TOP METRICS GRID ─── */}
        <AnalyticsSectionBoundary title="SaaS Metrics Overview">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className={`p-5 rounded-2xl border ${card} space-y-2`}>
              <div className="flex items-center justify-between text-xs text-gray-400 font-bold">
                <span>Total Students</span>
                <Users className="w-4 h-4 text-purple-400" />
              </div>
              <div className="text-2xl font-black">{data?.totalStudents || 0}</div>
              <p className="text-[11px] text-emerald-400 flex items-center gap-1 font-bold">
                <ArrowUpRight className="w-3.5 h-3.5" /> Retention: {data?.activeRetentionRate || 0}% active
              </p>
            </div>

            <div className={`p-5 rounded-2xl border ${card} space-y-2`}>
              <div className="flex items-center justify-between text-xs text-gray-400 font-bold">
                <span>Monthly Recurring (MRR)</span>
                <DollarSign className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl font-black text-emerald-400">${data?.mrr || 0}</div>
              <p className="text-[11px] text-gray-400 font-mono">ARR: ${(data?.arr || 0).toLocaleString()}</p>
            </div>

            <div className={`p-5 rounded-2xl border ${card} space-y-2`}>
              <div className="flex items-center justify-between text-xs text-gray-400 font-bold">
                <span>Paying Subscribers</span>
                <Crown className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl font-black text-amber-400">{data?.payingCount || 0}</div>
              <p className="text-[11px] text-gray-400 font-mono">Free Conversion: {data?.conversionRate || 0}%</p>
            </div>

            <div className={`p-5 rounded-2xl border ${card} space-y-2`}>
              <div className="flex items-center justify-between text-xs text-gray-400 font-bold">
                <span>Customer LTV</span>
                <TrendingUp className="w-4 h-4 text-blue-400" />
              </div>
              <div className="text-2xl font-black text-blue-400">${data?.ltv || 0}</div>
              <p className="text-[11px] text-gray-400 font-mono">ARPU: ${data?.arpu || 0}/mo</p>
            </div>
          </div>
        </AnalyticsSectionBoundary>

        {/* ─── PLAN DISTRIBUTION & STUDY HABITS ─── */}
        <AnalyticsSectionBoundary title="Demographics & Habits">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={`p-6 rounded-2xl border ${card} space-y-4`}>
              <h3 className="text-base font-extrabold flex items-center gap-2">
                <PieChart className="w-5 h-5 text-purple-400" /> Subscription Plan Breakdown
              </h3>
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold">Monthly Pass ($29/mo)</span>
                  <span className="font-mono text-purple-400 font-bold">{data?.planCounts?.monthly || 0} subscribers</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${Math.min(100, ((data?.planCounts?.monthly || 0) / Math.max(1, data?.totalStudents || 1)) * 100)}%` }} />
                </div>

                <div className="flex items-center justify-between text-xs pt-2">
                  <span className="font-bold">Annual VIP Pass ($199/yr)</span>
                  <span className="font-mono text-amber-400 font-bold">{data?.planCounts?.annual || 0} subscribers</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div className="bg-amber-400 h-2 rounded-full" style={{ width: `${Math.min(100, ((data?.planCounts?.annual || 0) / Math.max(1, data?.totalStudents || 1)) * 100)}%` }} />
                </div>

                <div className="flex items-center justify-between text-xs pt-2">
                  <span className="font-bold">100% Free VIP Grants</span>
                  <span className="font-mono text-emerald-400 font-bold">{data?.planCounts?.vipFree || 0} students</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div className="bg-emerald-400 h-2 rounded-full" style={{ width: `${Math.min(100, ((data?.planCounts?.vipFree || 0) / Math.max(1, data?.totalStudents || 1)) * 100)}%` }} />
                </div>
              </div>
            </div>

            <div className={`p-6 rounded-2xl border ${card} space-y-4`}>
              <h3 className="text-base font-extrabold flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-400" /> Student Habits & Target Exam Demographics
              </h3>
              <div className="grid grid-cols-2 gap-4 text-xs pt-2">
                <div className="p-3 rounded-xl border border-white/10 bg-white/5 space-y-1">
                  <span className="text-gray-400">Total Study Hours</span>
                  <span className="text-base font-black block text-blue-400">{data?.telemetry?.totalStudyHours || 0} Hours</span>
                  <span className="text-[10px] text-gray-500">Across all registered students</span>
                </div>
                <div className="p-3 rounded-xl border border-white/10 bg-white/5 space-y-1">
                  <span className="text-gray-400">Avg. Daily Session</span>
                  <span className="text-base font-black block text-purple-400">{data?.telemetry?.avgSessionMinutes || "0 Minutes"}</span>
                  <span className="text-[10px] text-gray-500">Per active student account</span>
                </div>
                <div className="p-3 rounded-xl border border-white/10 bg-white/5 space-y-1">
                  <span className="text-gray-400">Top Exam Goal</span>
                  <span className="text-base font-black block text-amber-400">{data?.telemetry?.topExamGoal || "No goal set yet"}</span>
                  <span className="text-[10px] text-gray-500">Live student preference tally</span>
                </div>
                <div className="p-3 rounded-xl border border-white/10 bg-white/5 space-y-1">
                  <span className="text-gray-400">Active Platform Roster</span>
                  <span className="text-base font-black block text-emerald-400">{data?.totalStudents || 0} Registered Users</span>
                  <span className="text-[10px] text-gray-500">{data?.onlineCount || 0} currently active right now</span>
                </div>
              </div>
            </div>
          </div>
        </AnalyticsSectionBoundary>

        {/* ─── LIVE ONLINE PRESENCE & STUDENT ROSTER ─── */}
        <AnalyticsSectionBoundary title="Real-Time Telemetry Roster">
          <div className={`p-6 rounded-2xl border ${card} space-y-5`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-200 dark:border-white/10 pb-3">
              <div>
                <h3 className="text-base font-extrabold flex items-center gap-2">
                  <Activity className="w-5 h-5 text-emerald-400" /> Real-Time Student Activity Telemetry
                </h3>
                <p className={`text-xs ${txtSec} mt-0.5`}>
                  Live active route context, total study hours logged, completed lessons, and plan details.
                </p>
              </div>

              {/* Status Filter Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide flex-nowrap text-xs font-bold">
                <button
                  onClick={() => setFilterTab("all")}
                  className={`px-3 py-1.5 rounded-xl transition-all ${filterTab === "all" ? "bg-purple-500 text-white" : "bg-white/5 text-gray-400 hover:text-white"}`}
                >
                  All ({data?.students?.length || 0})
                </button>
                <button
                  onClick={() => setFilterTab("online")}
                  className={`px-3 py-1.5 rounded-xl transition-all ${filterTab === "online" ? "bg-emerald-500 text-white" : "bg-white/5 text-gray-400 hover:text-white"}`}
                >
                  🟢 Online ({data?.onlineCount || 0})
                </button>
                <button
                  onClick={() => setFilterTab("paid")}
                  className={`px-3 py-1.5 rounded-xl transition-all ${filterTab === "paid" ? "bg-amber-500 text-white" : "bg-white/5 text-gray-400 hover:text-white"}`}
                >
                  👑 Paid ({data?.payingCount || 0})
                </button>
                <button
                  onClick={() => setFilterTab("vip")}
                  className={`px-3 py-1.5 rounded-xl transition-all ${filterTab === "vip" ? "bg-emerald-600 text-white" : "bg-white/5 text-gray-400 hover:text-white"}`}
                >
                  🎁 VIP ({data?.vipFreeCount || 0})
                </button>
              </div>
            </div>

            {/* Controls: Search & Sort */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Search by student name, email, or active lesson page..."
                  value={studentSearch}
                  onChange={(e) => setStudentSearch(e.target.value)}
                  className="w-full rounded-xl p-2.5 pl-10 text-xs font-mono border dark:bg-[#070B17] dark:border-white/10 text-white outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-gray-400 shrink-0" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="rounded-xl p-2.5 text-xs font-bold border dark:bg-[#070B17] dark:border-white/10 text-white outline-none"
                >
                  <option value="recent">Sort: Recently Active</option>
                  <option value="hours">Sort: Most Study Hours</option>
                  <option value="lessons">Sort: Most Completed Lessons</option>
                  <option value="xp">Sort: Highest XP</option>
                  <option value="name">Sort: Name (A-Z)</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto min-w-0">
              <table className="w-full text-left text-xs min-w-[700px]">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-white/10 text-gray-400 uppercase font-mono text-[10px]">
                    <th className="py-2.5 px-3">Status & Active Context</th>
                    <th className="py-2.5 px-3">Student Name</th>
                    <th className="py-2.5 px-3">Email</th>
                    <th className="py-2.5 px-3">Plan Tier</th>
                    <th className="py-2.5 px-3">Lessons Done</th>
                    <th className="py-2.5 px-3">Total Study Time</th>
                    <th className="py-2.5 px-3">Target Exam</th>
                    <th className="py-2.5 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-white/10">
                  {filteredStudents.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-8 text-center text-gray-400 text-xs">
                        No student activity records match the current filter or search term.
                      </td>
                    </tr>
                  ) : (
                    filteredStudents.map((s) => (
                      <tr key={s._id} className="hover:bg-white/5 transition-all">
                        <td className="py-3 px-3">
                          {s.isOnline ? (
                            <div className="space-y-1">
                              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" /> Online Now
                              </span>
                              {s.currentPage && (
                                <p className="text-[10px] text-purple-300 font-mono flex items-center gap-1">
                                  📍 {formatRoute(s.currentPage)}
                                </p>
                              )}
                            </div>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-gray-500/10 text-gray-400">
                              ⚪ Offline
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-3 font-bold">{s.firstName} {s.lastName}</td>
                        <td className="py-3 px-3 font-mono text-gray-400">{s.email}</td>
                        <td className="py-3 px-3">
                          {s.isVipFreeAccess ? (
                            <span className="px-2 py-0.5 rounded text-[10px] font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                              🎁 FREE VIP
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20">
                              {s.subscriptionTier.toUpperCase()}
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-3 font-mono text-emerald-400 font-bold">
                          {s.completedLessons || 0} lessons
                        </td>
                        <td className="py-3 px-3 font-mono text-blue-400 font-bold">
                          <div className="flex items-center gap-1.5">
                            <span>{s.studyHours} hrs</span>
                            {(s.streakDays || 0) > 0 && (
                              <span className="text-[10px] text-amber-400 font-bold flex items-center gap-0.5">
                                <Flame className="w-3 h-3" /> {s.streakDays}d
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-3 text-amber-400 font-bold">{s.targetExam}</td>
                        <td className="py-3 px-3 text-right">
                          <Link
                            to="/admin/users"
                            className="px-2.5 py-1 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-400 text-[11px] font-semibold inline-flex items-center gap-1 transition-all"
                          >
                            <span>Manage</span>
                            <ExternalLink className="w-3 h-3" />
                          </Link>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </AnalyticsSectionBoundary>

      </div>
    </div>
  );
}

export const Route = createFileRoute("/admin/analytics")({
  component: AnalyticsPage,
});
