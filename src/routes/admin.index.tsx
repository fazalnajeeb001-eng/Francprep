import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { apiFetch } from "~/lib/apiFetch";
import { motion } from "framer-motion";
import {
  Users, BookOpen, FileText, CheckCircle, TrendingUp, Clock,
  UserCheck, Activity, ArrowUp, ArrowDown
} from "lucide-react";

export const Route = createFileRoute("/admin/")({ component: AdminDashboardPage });

interface AdminStats {
  totalUsers: number;
  totalLessons: number;
  totalExercises: number;
  totalCompletedLessons: number;
}

interface AdminDashboard {
  stats: AdminStats;
  recentUsers: Array<{
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    createdAt: string;
  }>;
}

function AdminDashboardPage() {
  const [data, setData] = useState<AdminDashboard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await apiFetch("/admin/dashboard");
        const json = await res.json();
        if (json.success) setData(json.data);
        else setError(json.error || "Failed to load dashboard");
      } catch (e: any) {
        setError(e.message || "Network error");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <AdminLoading />;
  if (error) return <AdminError error={error} />;
  if (!data) return <AdminError error="No data available" />;

  const stats = [
    { label: "Total Users", value: data.stats.totalUsers, icon: Users, color: "from-purple-500 to-pink-500", change: "+12%", up: true },
    { label: "Lessons", value: data.stats.totalLessons, icon: BookOpen, color: "from-emerald-500 to-teal-500", change: "+3", up: true },
    { label: "Exercises", value: data.stats.totalExercises, icon: FileText, color: "from-blue-500 to-cyan-500", change: "+8", up: true },
    { label: "Completed", value: data.stats.totalCompletedLessons, icon: CheckCircle, color: "from-amber-500 to-orange-500", change: "24%", up: true },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold dark:text-white text-gray-900">Admin Dashboard</h1>
        <p className="text-sm dark:text-gray-400 text-gray-500 mt-1">Overview of your FrancPrep platform</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="relative overflow-hidden rounded-2xl dark:bg-[#101828]/80 bg-white/80 backdrop-blur-lg border dark:border-[#1e2a4a] border-gray-200 p-5 transition-all hover:shadow-lg">
            <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${stat.color}`} />
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs dark:text-gray-400 text-gray-500 font-medium">{stat.label}</p>
                <p className="text-2xl sm:text-3xl font-bold dark:text-white text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg shrink-0`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-3">
              {stat.up ? <ArrowUp className="w-3 h-3 text-emerald-400" /> : <ArrowDown className="w-3 h-3 text-red-400" />}
              <span className={`text-xs font-medium ${stat.up ? "text-emerald-400" : "text-red-400"}`}>{stat.change}</span>
              <span className="text-xs dark:text-gray-500 text-gray-400 ml-1">vs last month</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent users */}
      <div className="rounded-2xl dark:bg-[#101828]/80 bg-white/80 backdrop-blur-lg border dark:border-[#1e2a4a] border-gray-200 transition-colors">
        <div className="px-5 py-4 border-b dark:border-[#1e2a4a] border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-purple-400" />
            <h2 className="text-sm font-semibold dark:text-gray-200 text-gray-800">Recent Users</h2>
          </div>
          <span className="text-xs dark:text-gray-500 text-gray-400">Last 5 registered</span>
        </div>
        <div className="divide-y dark:divide-[#1e2a4a] divide-gray-200">
          {data.recentUsers.map((user) => (
            <div key={user._id} className="px-5 py-3.5 flex items-center justify-between hover:dark:bg-white/5 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold">
                  {user.firstName[0]}{user.lastName[0]}
                </div>
                <div>
                  <p className="text-sm font-medium dark:text-gray-200 text-gray-800">{user.firstName} {user.lastName}</p>
                  <p className="text-xs dark:text-gray-500 text-gray-400">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-[10px] font-semibold px-2 py-1 rounded-full ${
                  user.role === "admin"
                    ? "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                    : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                }`}>
                  {user.role}
                </span>
                <span className="text-[10px] dark:text-gray-500 text-gray-400">
                  {new Date(user.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick actions / info cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { icon: Activity, title: "Platform Health", desc: "All systems operational", color: "emerald" },
          { icon: TrendingUp, title: "Engagement Rate", desc: "68% active this week", color: "blue" },
          { icon: Clock, title: "Last Updated", desc: "Content team active today", color: "purple" },
        ].map((item) => (
          <div key={item.title} className="rounded-2xl dark:bg-[#101828]/80 bg-white/80 backdrop-blur-lg border dark:border-[#1e2a4a] border-gray-200 p-4 transition-all hover:shadow-lg">
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-xl bg-${item.color}-500/20 border border-${item.color}-500/30 flex items-center justify-center`}>
                <item.icon className={`w-4 h-4 text-${item.color}-400`} />
              </div>
              <div>
                <p className="text-sm font-semibold dark:text-gray-200 text-gray-800">{item.title}</p>
                <p className="text-xs dark:text-gray-500 text-gray-400">{item.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function AdminLoading() {
  return (
    <div className="space-y-6">
      <div className="h-8 w-48 dark:bg-[#1e2a4a] bg-gray-200 rounded animate-pulse" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="rounded-2xl dark:bg-[#101828]/80 bg-white/80 border dark:border-[#1e2a4a] border-gray-200 p-5 animate-pulse">
            <div className="h-3 w-20 dark:bg-[#1e2a4a] bg-gray-200 rounded mb-3" />
            <div className="h-8 w-16 dark:bg-[#1e2a4a] bg-gray-200 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminError({ error }: { error: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4">
      <span className="text-4xl">⚠️</span>
      <p className="text-sm dark:text-gray-400 text-gray-600">{error}</p>
      <button onClick={() => window.location.reload()}
        className="px-5 py-2.5 bg-purple-600 text-white rounded-xl text-sm font-semibold hover:bg-purple-700 transition-colors shadow-lg shadow-purple-500/25">
        Retry
      </button>
    </div>
  );
}