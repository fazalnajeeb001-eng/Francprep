import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useRequireAuth } from "~/lib/useRequireAuth";
import { apiFetch } from "~/lib/apiFetch";
import { motion } from "framer-motion";
import { ChevronRight, BookOpen } from "lucide-react";

export const Route = createFileRoute("/coaching")({ component: CoachingHub });

const levelMeta = [
  { id: "A1", title: "Beginner – Découverte", desc: "Basic greetings, introductions, everyday needs", icon: "🌱", color: "from-emerald-500 to-teal-500", less: "emerald" },
  { id: "A2", title: "Elementary – Progrès", desc: "Simple conversations, travel, past experiences", icon: "🌿", color: "from-teal-500 to-cyan-500", less: "teal" },
  { id: "B1", title: "Intermediate – Indépendance", desc: "Work, opinions, connected text on familiar topics", icon: "🌳", color: "from-blue-500 to-indigo-500", less: "blue" },
  { id: "B2", title: "Upper-Intermediate – Autonomie", desc: "Debate, formal register, literary analysis", icon: "🔥", color: "from-indigo-500 to-purple-500", less: "purple" },
  { id: "C1", title: "Advanced – Maîtrise", desc: "Academic discourse, nuance, specialized fields", icon: "💎", color: "from-purple-500 to-pink-500", less: "pink" },
  { id: "C2", title: "Mastery – Perfectionnement", desc: "Rhetoric, translation, expert-level critique", icon: "👑", color: "from-pink-500 to-rose-500", less: "rose" },
];

function CoachingHub() {
  const [stats, setStats] = useState<Record<string, { level: string; lessonCount: number }>>({});
  const [loading, setLoading] = useState(true);
  const router = useRouterState(); const { isLoading: authLoading } = useRequireAuth();
  if (authLoading) return <div className="min-h-screen dark:bg-[#070B17] bg-gray-50 flex items-center justify-center"><div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" /></div>;
  const isIndex = router.location.pathname === "/coaching";
  if (!isIndex) return <Outlet />;

  useEffect(() => { (async () => { const r: Record<string, any> = {}; for (const l of ["A1","A2","B1","B2","C1","C2"]) { try { const res = await apiFetch(`/lessons?level=${l}&limit=1`); const d = await res.json(); r[l] = { level: l, lessonCount: d.success && d.pagination ? d.pagination.total : 0 }; } catch { r[l] = { level: l, lessonCount: 0 }; } } setStats(r); setLoading(false); })(); }, []);

  return (
    <div className="min-h-screen dark:bg-[#070B17] bg-gray-50 transition-colors duration-300 overflow-x-hidden">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 sm:py-12">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8 sm:mb-12">
          <span className="inline-block rounded-full bg-purple-500/10 border border-purple-500/30 px-3 py-1 text-sm font-medium text-purple-400">Coaching</span>
          <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Choose Your Level</h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm sm:text-base dark:text-gray-400 text-gray-600 leading-relaxed">
            FrancPrep's structured A1–C2 curriculum guides you from absolute beginner to mastery.
          </p>
        </motion.div>

        {loading ? <div className="text-center py-12 dark:text-gray-500 text-gray-400">Loading curriculum...</div> : (
          <>
            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {levelMeta.map((level, i) => {
                const s = stats[level.id];
                return (
                  <motion.div key={level.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                    <Link to={`/coaching/${level.id.toLowerCase()}`}
                      className="group block relative overflow-hidden rounded-2xl dark:bg-[#101828]/80 bg-white/80 backdrop-blur-lg border dark:border-[#1e2a4a] border-gray-200 p-5 sm:p-6 transition-all hover:border-purple-500/50 hover:shadow-lg hover:-translate-y-1">
                      <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${level.color}`} />
                      <div className="mt-1">
                        <span className="text-2xl sm:text-3xl">{level.icon}</span>
                        <h2 className="mt-2 text-xl sm:text-2xl font-bold dark:text-white text-gray-900">{level.id}</h2>
                        <p className="text-sm font-medium text-purple-400 mt-0.5">{level.title}</p>
                        <p className="mt-2 text-xs sm:text-sm dark:text-gray-400 text-gray-600 leading-relaxed">{level.desc}</p>
                        <div className="mt-4 flex items-center justify-between">
                          <span className="text-xs dark:text-gray-500 text-gray-500">{s?.lessonCount || 0} lessons</span>
                          <ChevronRight className="w-4 h-4 dark:text-gray-600 text-gray-400 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-12 sm:mt-16">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center dark:text-white text-gray-900">Learning Path</h2>
              <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl dark:bg-[#101828]/80 bg-white/80 backdrop-blur-lg border dark:border-[#1e2a4a] border-gray-200">
                <table className="w-full text-left text-sm">
                  <thead className="border-b dark:border-[#1e2a4a] border-gray-200 dark:bg-[#070B17] bg-gray-50">
                    <tr><th className="px-4 py-3 font-semibold dark:text-gray-200 text-gray-700">Level</th><th className="px-4 py-3 font-semibold dark:text-gray-200 text-gray-700">Title</th><th className="px-4 py-3 font-semibold dark:text-gray-200 text-gray-700 hidden sm:table-cell">CEFR Can-Do</th></tr>
                  </thead>
                  <tbody className="divide-y dark:divide-[#1e2a4a] divide-gray-200">
                    {levelMeta.map(l => (
                      <tr key={l.id} className="dark:hover:bg-white/5 hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 font-bold dark:text-white text-gray-900">{l.id}</td>
                        <td className="px-4 py-3 dark:text-gray-300 text-gray-700">{l.title}</td>
                        <td className="px-4 py-3 dark:text-gray-400 text-gray-500 hidden sm:table-cell">{l.desc}</td>
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
