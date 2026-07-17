import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { apiFetch } from "~/lib/apiFetch";
import { motion } from "framer-motion";
import { CreditCard, Crown, Zap, AlertTriangle, Check, X, Users, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { useTheme } from "~/lib/ThemeContext";

export const Route = createFileRoute("/admin/subscriptions")({ component: SubscriptionsPage });

const tierColors: Record<string, string> = {
  free: "bg-gray-500/10 text-gray-400 border-gray-500/20",
  premium: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  exam_prep: "bg-amber-500/10 text-amber-400 border-amber-500/20",
};
const tierIcons: Record<string, any> = { free: Users, premium: Crown, exam_prep: Zap };
const statusColors: Record<string, string> = {
  active: "text-emerald-400", canceled: "text-gray-400", past_due: "text-red-400", trialing: "text-blue-400", incomplete: "text-amber-400",
};

function SubscriptionsPage() {
  const { dark } = useTheme();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [filterTier, setFilterTier] = useState("");
  const [page, setPage] = useState(1);

  const bg = dark ? "bg-[#070B17]" : "bg-gray-50";
  const card = dark ? "bg-[#101828]/80 border-[#1e2a4a]" : "bg-white/80 border-gray-200";
  const txtSec = dark ? "text-gray-400" : "text-gray-500";

  const fetchData = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), limit: "20" });
      if (filterTier) params.set("tier", filterTier);
      const res = await apiFetch(`/payments/admin/subscriptions?${params}`);
      const json = await res.json();
      if (json.success) setData(json.data);
    } catch {}
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, [page, filterTier]);

  const totalSubs = data?.subscriptions?.length || 0;
  const tierCounts = data?.tierCounts || {};

  return (
    <div className={`min-h-screen ${bg} transition-colors duration-300`}>
      <div className="max-w-6xl mx-auto space-y-6 pb-20">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">💳 Subscriptions</h1>
          <p className={`text-sm ${txtSec} mt-1`}>View all user subscriptions and tier distribution</p>
        </motion.div>

        {/* Tier summary cards */}
        <div className="grid grid-cols-3 gap-4">
          {["free", "premium", "exam_prep"].map((tier) => {
            const Icon = tierIcons[tier];
            const count = tierCounts[tier] || 0;
            return (
              <motion.div key={tier} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className={`${card} backdrop-blur-lg border rounded-2xl p-5`}>
                <div className="flex items-center justify-between mb-3">
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${tierColors[tier]}`}>
                    <Icon className="w-3 h-3" /> {tier === "exam_prep" ? "Exam Prep" : tier.charAt(0).toUpperCase() + tier.slice(1)}
                  </span>
                </div>
                <p className="text-3xl font-bold text-white">{count}</p>
                <p className={`text-xs ${txtSec} mt-1`}>subscribers</p>
              </motion.div>
            );
          })}
        </div>

        {/* Filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-gray-400" />
          {["", "free", "premium", "exam_prep"].map((tier) => (
            <button key={tier} onClick={() => { setFilterTier(tier); setPage(1); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filterTier === tier ? "bg-purple-500/20 text-purple-400 border border-purple-500/30" : dark ? "text-gray-400 hover:bg-white/5" : "text-gray-500 hover:bg-gray-100"}`}>
              {tier ? (tier === "exam_prep" ? "Exam Prep" : tier.charAt(0).toUpperCase() + tier.slice(1)) : "All"}
            </button>
          ))}
        </div>

        {/* Table */}
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className={`${card} rounded-2xl h-16 animate-pulse`} />
            ))}
          </div>
        ) : !data?.subscriptions?.length ? (
          <div className={`${card} backdrop-blur-lg border rounded-2xl p-12 text-center`}>
            <CreditCard className="w-12 h-12 mx-auto text-gray-600 mb-3" />
            <p className={`text-sm ${txtSec}`}>No subscriptions found</p>
          </div>
        ) : (
          <div className={`${card} backdrop-blur-lg border rounded-2xl overflow-hidden`}>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className={`border-b ${dark ? "border-[#1e2a4a]" : "border-gray-200"}`}>
                    <th className={`px-5 py-3 text-[10px] font-semibold uppercase tracking-wider ${txtSec}`}>User</th>
                    <th className={`px-5 py-3 text-[10px] font-semibold uppercase tracking-wider ${txtSec}`}>Tier</th>
                    <th className={`px-5 py-3 text-[10px] font-semibold uppercase tracking-wider ${txtSec}`}>Status</th>
                    <th className={`px-5 py-3 text-[10px] font-semibold uppercase tracking-wider ${txtSec}`}>Period Start</th>
                    <th className={`px-5 py-3 text-[10px] font-semibold uppercase tracking-wider ${txtSec}`}>Period End</th>
                    <th className={`px-5 py-3 text-[10px] font-semibold uppercase tracking-wider ${txtSec}`}>Cancel at End</th>
                  </tr>
                </thead>
                <tbody>
                  {data.subscriptions.map((sub: any) => (
                    <tr key={sub._id} className={`border-b ${dark ? "border-[#1e2a4a]/50 hover:bg-white/[0.02]" : "border-gray-100 hover:bg-gray-50"} transition-colors`}>
                      <td className="px-5 py-3">
                        <div>
                          <p className={`text-sm font-medium ${dark ? "text-white" : "text-gray-900"}`}>
                            {sub.userId?.firstName} {sub.userId?.lastName}
                          </p>
                          <p className="text-[10px] text-gray-500">{sub.userId?.email}</p>
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${tierColors[sub.tier]}`}>
                          {sub.tier === "exam_prep" ? "Exam Prep" : sub.tier.charAt(0).toUpperCase() + sub.tier.slice(1)}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <span className={`text-xs font-medium ${statusColors[sub.status] || "text-gray-400"}`}>{sub.status}</span>
                      </td>
                      <td className="px-5 py-3 text-xs text-gray-400">{sub.currentPeriodStart ? new Date(sub.currentPeriodStart).toLocaleDateString() : "—"}</td>
                      <td className="px-5 py-3 text-xs text-gray-400">{sub.currentPeriodEnd ? new Date(sub.currentPeriodEnd).toLocaleDateString() : "—"}</td>
                      <td className="px-5 py-3">
                        {sub.cancelAtPeriodEnd ? <AlertTriangle className="w-3.5 h-3.5 text-amber-400" /> : <Check className="w-3.5 h-3.5 text-emerald-400" />}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Pagination */}
        {data?.pagination?.pages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1}
              className={`p-2 rounded-lg ${dark ? "bg-[#1e2a4a] text-gray-400 hover:bg-white/10" : "bg-gray-200 text-gray-600 hover:bg-gray-300"} transition-all disabled:opacity-50`}>
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className={`text-xs ${txtSec}`}>Page {page} of {data.pagination.pages}</span>
            <button onClick={() => setPage(Math.min(data.pagination.pages, page + 1))} disabled={page === data.pagination.pages}
              className={`p-2 rounded-lg ${dark ? "bg-[#1e2a4a] text-gray-400 hover:bg-white/10" : "bg-gray-200 text-gray-600 hover:bg-gray-300"} transition-all disabled:opacity-50`}>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
