import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useRequireAuth } from "~/lib/useRequireAuth";
import { apiFetch } from "~/lib/apiFetch";
import { motion } from "framer-motion";
import { ChevronRight, Sun, Moon } from "lucide-react";

export const Route = createFileRoute("/coaching")({ component: CoachingHub });

interface LevelStats { level: string; lessonCount: number; }
const levelMeta = [
  { id: "A1", title: "Beginner – Découverte", desc: "Basic greetings, introductions, everyday needs", icon: "🌱", color: "from-emerald-500 to-teal-500" },
  { id: "A2", title: "Elementary – Progrès", desc: "Simple conversations, travel, past experiences", icon: "🌿", color: "from-teal-500 to-cyan-500" },
  { id: "B1", title: "Intermediate – Indépendance", desc: "Work, opinions, connected text on familiar topics", icon: "🌳", color: "from-blue-500 to-indigo-500" },
  { id: "B2", title: "Upper-Intermediate – Autonomie", desc: "Debate, formal register, literary analysis", icon: "🔥", color: "from-indigo-500 to-purple-500" },
  { id: "C1", title: "Advanced – Maîtrise", desc: "Academic discourse, nuance, specialized fields", icon: "💎", color: "from-purple-500 to-pink-500" },
  { id: "C2", title: "Mastery – Perfectionnement", desc: "Rhetoric, translation, expert-level critique", icon: "👑", color: "from-pink-500 to-rose-500" },
];

function CoachingHub() {
  const [stats, setStats] = useState<Record<string, LevelStats>>({}); const [loading, setLoading] = useState(true);
  const [dark, setDark] = useState(true);
  useEffect(() => { const s = localStorage.getItem("fp_theme"); if (s === "light") setDark(false); }, []);
  const router = useRouterState(); const { isLoading: authLoading } = useRequireAuth();
  if (authLoading) return <div className="min-h-screen bg-[#070B17] flex items-center justify-center"><div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" /></div>;
  const isIndex = router.location.pathname === "/coaching";
  if (!isIndex) return <Outlet />;

  useEffect(() => { (async () => { const results: Record<string, LevelStats> = {}; for (const level of ["A1","A2","B1","B2","C1","C2"]) { try { const res = await apiFetch(`/lessons?level=${level}&limit=1`); const d = await res.json(); results[level] = { level, lessonCount: d.success && d.pagination ? d.pagination.total : 0 }; } catch { results[level] = { level, lessonCount: 0 }; } } setStats(results); setLoading(false); })(); }, []);

  const b = dark ? "bg-[#070B17]" : "bg-gray-50";
  const card = dark ? "bg-[#101828]/80 border-[#1e2a4a]" : "bg-white/80 border-gray-200";
  const txtTitle = dark ? "text-white" : "text-gray-900";
  const txtSec = dark ? "text-gray-500" : "text-gray-500";

  return (
    <div className={`min-h-screen ${b} transition-colors duration-300`}>
      <div className="mx-auto max-w-5xl px-4 py-12">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="inline-block rounded-full bg-purple-500/10 border border-purple-500/30 px-3 py-1 text-sm font-medium text-purple-400">Coaching Section</span>
            <button onClick={() => { const nd = !dark; setDark(nd); localStorage.setItem("fp_theme", nd ? "dark" : "light"); document.documentElement.classList.toggle("dark", nd); }}
              className={`p-2 rounded-xl ${dark ? "hover:bg-white/5 text-gray-400" : "hover:bg-gray-100 text-gray-600"} transition-colors`} aria-label="Toggle theme">
              {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Choose Your Level</h1>
          <p className={`mx-auto mt-4 max-w-2xl text-lg ${txtSec}`}>FrancPrep's structured A1–C2 curriculum guides you from absolute beginner to mastery.</p>
        </motion.div>

        {loading ? <div className="text-center py-12 text-gray-500">Loading curriculum...</div> : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {levelMeta.map((level, i) => {
                const s = stats[level.id];
                return (
                  <motion.div key={level.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                    <Link to={`/coaching/${level.id.toLowerCase()}`}
                      className={`group block relative overflow-hidden rounded-2xl border ${card} backdrop-blur-lg p-6 transition-all hover:border-purple-500/50 hover:shadow-lg hover:-translate-y-1`}>
                      <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${level.color}`} />
                      <div className="mt-2">
                        <span className="text-3xl">{level.icon}</span>
                        <h2 className={`mt-3 text-2xl font-bold ${txtTitle}`}>{level.id}</h2>
                        <p className="text-sm font-medium text-purple-400">{level.title}</p>
                        <p className={`mt-2 text-xs ${txtSec}`}>{level.desc}</p>
                        <div className="mt-4 flex items-center justify-between">
                          <span className={`text-xs ${txtSec}`}>{s?.lessonCount || 0} lessons</span>
                          <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
            {/* Table */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-16">
              <h2 className={`text-2xl font-bold mb-4 text-center ${txtTitle}`}>Learning Path Overview</h2>
              <div className={`mx-auto max-w-3xl overflow-hidden rounded-2xl border ${card} backdrop-blur-lg`}>
                <table className="w-full text-left text-sm">
                  <thead className={`border-b ${dark ? "border-[#1e2a4a] bg-[#070B17]" : "border-gray-200 bg-gray-100"}`}>
                    <tr><th className={`px-4 py-3 font-semibold ${txtTitle}`}>Level</th><th className={`px-4 py-3 font-semibold ${txtTitle}`}>Title</th><th className={`px-4 py-3 font-semibold ${txtTitle}`}>CEFR Can-Do</th></tr>
                  </thead>
                  <tbody className={`divide-y ${dark ? "divide-[#1e2a4a]" : "divide-gray-200"}`}>
                    {levelMeta.map(l => (
                      <tr key={l.id} className={`${dark ? "hover:bg-white/5" : "hover:bg-gray-50"} transition-colors`}>
                        <td className={`px-4 py-3 font-bold ${txtTitle}`}>{l.id}</td>
                        <td className={`px-4 py-3 ${dark ? "text-gray-300" : "text-gray-700"}`}>{l.title}</td>
                        <td className={`px-4 py-3 ${txtSec}`}>{l.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}
