import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { apiFetch } from "~/lib/apiFetch";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Users,
  Activity,
  DollarSign,
  Clock,
  Globe,
  Calendar,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  CheckCircle2,
  XCircle,
  Crown,
  BookOpen,
  PieChart,
  BarChart3,
  Award,
  Sparkles,
  Search,
  ArrowLeft
} from "lucide-react";
import { useTheme } from "~/lib/ThemeContext";

export const Route = createFileRoute("/admin/analytics")({
  component: AnalyticsPage,
});

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
    studyHours: number;
    targetExam: string;
  }>;
}

export function AnalyticsPage() {
  const { dark } = useTheme();
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState("all_time");
  const [data, setData] = useState<AnalyticsOverview | null>(null);
  const [studentSearch, setStudentSearch] = useState("");

  const bg = dark ? "bg-[#070B17] text-white" : "bg-[#F8FAFC] text-slate-900";
  const card = dark ? "bg-[#101828]/90 border-white/10" : "bg-white border-slate-200 shadow-sm";
  const txtSec = dark ? "text-gray-400" : "text-slate-600";

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const res = await apiFetch("/admin/analytics/saas-overview");
      const json = await res.json();
      if (json.success && json.data) {
        setData(json.data);
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const filteredStudents = (data?.students || []).filter((s) => {
    if (!studentSearch.trim()) return true;
    const tokens = studentSearch.trim().toLowerCase().split(/\s+/);
    const fullName = `${s.firstName || ""} ${s.lastName || ""}`.toLowerCase();
    const email = (s.email || "").toLowerCase();
    return tokens.every((t) => fullName.includes(t) || email.includes(t));
  });

  return (
    <div className={`min-h-screen ${bg} p-4 md:p-8 space-y-6 transition-colors duration-300`}>
      <div className="max-w-6xl mx-auto space-y-6">

        {/* ─── HEADER ─── */}
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
              Real-time online student presence, subscriber breakdown, MRR/ARR financial health, and study habit telemetry.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-bold text-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{data?.onlineCount || 0} Students Online Now</span>
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

        {/* ─── TOP METRICS GRID ─── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className={`p-5 rounded-2xl border ${card} space-y-2`}>
            <div className="flex items-center justify-between text-xs text-gray-400 font-bold">
              <span>Total Students</span>
              <Users className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl font-black">{data?.totalStudents || 0}</div>
            <p className="text-[11px] text-emerald-400 flex items-center gap-1 font-bold">
              <ArrowUpRight className="w-3.5 h-3.5" /> +14% this month
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
            <p className="text-[11px] text-gray-400 font-mono">Free Trial: {data?.freeCount || 0}</p>
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

        {/* ─── PLAN DISTRIBUTION & STUDY HABITS ─── */}
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

        {/* ─── LIVE ONLINE PRESENCE & STUDENT ROSTER ─── */}
        <div className={`p-6 rounded-2xl border ${card} space-y-5`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-200 dark:border-white/10 pb-3">
            <div>
              <h3 className="text-base font-extrabold flex items-center gap-2">
                <Activity className="w-5 h-5 text-emerald-400" /> Real-Time Student Activity Telemetry
              </h3>
              <p className={`text-xs ${txtSec} mt-0.5`}>Live presence, total study hours logged, and active plan details.</p>
            </div>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search active students by full name or email..."
              value={studentSearch}
              onChange={(e) => setStudentSearch(e.target.value)}
              className="w-full rounded-xl p-2.5 pl-10 text-xs font-mono border dark:bg-[#070B17] dark:border-white/10 text-white outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-gray-200 dark:border-white/10 text-gray-400 uppercase font-mono text-[10px]">
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3">Student Name</th>
                  <th className="py-2.5 px-3">Email</th>
                  <th className="py-2.5 px-3">Plan Tier</th>
                  <th className="py-2.5 px-3">Study Hours</th>
                  <th className="py-2.5 px-3">Target Exam</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-white/10">
                {filteredStudents.map((s) => (
                  <tr key={s._id} className="hover:bg-white/5 transition-all">
                    <td className="py-3 px-3">
                      {s.isOnline ? (
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" /> Online
                        </span>
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
                    <td className="py-3 px-3 font-mono text-blue-400 font-bold">{s.studyHours} hrs</td>
                    <td className="py-3 px-3 text-amber-400 font-bold">{s.targetExam}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
