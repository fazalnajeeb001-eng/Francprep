import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { apiFetch } from "~/lib/apiFetch";
import { motion } from "framer-motion";
import { BarChart3, Users, TrendingUp, Calendar, Crown, Zap, UserPlus } from "lucide-react";
import { useTheme } from "~/lib/ThemeContext";

export const Route = createFileRoute("/admin/analytics")({ component: AnalyticsPage });

function AnalyticsPage() {
  const { dark } = useTheme();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const bg = dark ? "bg-[#070B17]" : "bg-gray-50";
  const card = dark ? "bg-[#101828]/80 border-[#1e2a4a]" : "bg-white/80 border-gray-200";
  const txtSec = dark ? "text-gray-400" : "text-gray-500";

  useEffect(() => {
    apiFetch("/payments/admin/analytics")
      .then((r) => r.json())
      .then((j) => { if (j.success) setData(j.data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const maxDaily = data?.dailySignups?.length ? Math.max(...data.dailySignups.map((d: any) => d.count), 1) : 1;

  return (
    <div className={`min-h-screen ${bg} transition-colors duration-300`}>
      <div className="max-w-6xl mx-auto space-y-6 pb-20">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">📊 Analytics</h1>
          <p className={`text-sm ${txtSec} mt-1`}>Platform overview and user growth</p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className={`${card} rounded-2xl h-28 animate-pulse`} />
            ))}
          </div>
        ) : data && (
          <>
            {/* Stat cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Total Users", value: data.totalUsers, icon: Users, color: "text-purple-400" },
                { label: "New (30d)", value: data.newUsers30d, icon: TrendingUp, color: "text-emerald-400" },
                { label: "New (7d)", value: data.newUsers7d, icon: UserPlus, color: "text-blue-400" },
                { label: "Paid Users", value: (data.tierCounts?.premium || 0) + (data.tierCounts?.exam_prep || 0), icon: Crown, color: "text-amber-400" },
              ].map((stat) => (
                <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className={`${card} backdrop-blur-lg border rounded-2xl p-5`}>
                  <div className="flex items-center justify-between mb-3">
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                  <p className={`text-xs ${txtSec} mt-1`}>{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Tier breakdown */}
            <div className={`${card} backdrop-blur-lg border rounded-2xl p-6`}>
              <h2 className={`text-sm font-semibold ${dark ? "text-white" : "text-gray-900"} mb-4`}>Subscription Tiers</h2>
              <div className="space-y-3">
                {[
                  { key: "free", label: "Free", color: "bg-gray-400" },
                  { key: "premium", label: "Premium", color: "bg-purple-500" },
                  { key: "exam_prep", label: "Exam Prep", color: "bg-amber-500" },
                ].map((tier) => {
                  const count = data.tierCounts?.[tier.key] || 0;
                  const pct = data.totalUsers > 0 ? (count / data.totalUsers * 100) : 0;
                  return (
                    <div key={tier.key}>
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-xs font-medium ${dark ? "text-gray-300" : "text-gray-700"}`}>{tier.label}</span>
                        <span className={`text-xs ${txtSec}`}>{count} ({pct.toFixed(1)}%)</span>
                      </div>
                      <div className={`w-full h-2 rounded-full ${dark ? "bg-[#1e2a4a]" : "bg-gray-200"}`}>
                        <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.8, ease: "easeOut" }}
                          className={`h-full rounded-full ${tier.color}`} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Daily signups chart */}
            {data.dailySignups?.length > 0 && (
              <div className={`${card} backdrop-blur-lg border rounded-2xl p-6`}>
                <h2 className={`text-sm font-semibold ${dark ? "text-white" : "text-gray-900"} mb-4`}>Daily Signups (Last 30 Days)</h2>
                <div className="flex items-end gap-1 h-40">
                  {data.dailySignups.map((d: any, i: number) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1" title={`${d._id}: ${d.count}`}>
                      <span className="text-[9px] text-gray-500">{d.count}</span>
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${(d.count / maxDaily) * 100}%` }}
                        transition={{ duration: 0.5, delay: i * 0.02 }}
                        className="w-full bg-gradient-to-t from-purple-500 to-pink-500 rounded-t-sm min-h-[2px]"
                      />
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-[9px] text-gray-500">{data.dailySignups[0]?._id}</span>
                  <span className="text-[9px] text-gray-500">{data.dailySignups[data.dailySignups.length - 1]?._id}</span>
                </div>
              </div>
            )}

            {/* Subscription status */}
            {data.statusCounts && Object.keys(data.statusCounts).length > 0 && (
              <div className={`${card} backdrop-blur-lg border rounded-2xl p-6`}>
                <h2 className={`text-sm font-semibold ${dark ? "text-white" : "text-gray-900"} mb-4`}>Subscription Status</h2>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {Object.entries(data.statusCounts).map(([status, count]) => (
                    <div key={status} className="text-center">
                      <p className="text-2xl font-bold text-white">{count as number}</p>
                      <p className={`text-[10px] ${txtSec} capitalize`}>{String(status).replace("_", " ")}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
