import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useRequireAuth } from "~/lib/useRequireAuth";
import { apiFetch } from "~/lib/apiFetch";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Sparkles, ChevronRight } from "lucide-react";

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
  const [stats, setStats] = useState<Record<string, LevelStats>>({});
  const [loading, setLoading] = useState(true);
  const router = useRouterState();
  const { isLoading: authLoading } = useRequireAuth();
  if (authLoading) return <div className="min-h-screen bg-[#070B17] flex items-center justify-center"><div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" /></div>;

  const isIndex = router.location.pathname === "/coaching";
  if (!isIndex) return <Outlet />;

  useEffect(() => {
    (async () => {
      const results: Record<string, LevelStats> = {};
      for (const level of ["A1", "A2", "B1", "B2", "C1", "C2"]) {
        try {
          const res = await apiFetch(`/lessons?level=${level}&limit=1`);
          const data = await res.json();
          results[level] = { level, lessonCount: data.success && data.pagination ? data.pagination.total : 0 };
        } catch { results[level] = { level, lessonCount: 0 }; }
      }
      setStats(results);
      setLoading(false);
    })();
  }, []);

  return (
    <div className="min-h-screen bg-[#070B17]">
      <div className="mx-auto max-w-5xl px-4 py-12">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <span className="inline-block rounded-full bg-purple-500/10 border border-purple-500/30 px-3 py-1 text-sm font-medium text-purple-400">
            Coaching Section
          </span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Choose Your Level
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">
            FrancPrep's structured A1–C2 curriculum guides you from absolute beginner to mastery.
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading curriculum...</div>
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {levelMeta.map((level, i) => {
                const s = stats[level.id];
                return (
                  <motion.div key={level.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                    <Link to="/coaching/$level" params={{ level: level.id.toLowerCase() }}
                      className="group block relative overflow-hidden rounded-2xl border border-[#1e2a4a] bg-[#101828]/80 backdrop-blur-lg p-6 transition-all hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10 hover:-translate-y-1">
                      <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${level.color}`} />
                      <div className="mt-2">
                        <span className="text-3xl">{level.icon}</span>
                        <h2 className="mt-3 text-2xl font-bold text-white">{level.id}</h2>
                        <p className="text-sm font-medium text-purple-400">{level.title}</p>
                        <p className="mt-2 text-xs text-gray-500">{level.desc}</p>
                        <div className="mt-4 flex items-center justify-between">
                          <span className="text-xs text-gray-500">{s?.lessonCount || 0} lessons</span>
                          <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Learning Path Table */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-16">
              <h2 className="text-2xl font-bold mb-4 text-white text-center">Learning Path Overview</h2>
              <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-[#1e2a4a] bg-[#101828]/80 backdrop-blur-lg">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-[#1e2a4a] bg-[#070B17]">
                    <tr>
                      <th className="px-4 py-3 font-semibold text-gray-300">Level</th>
                      <th className="px-4 py-3 font-semibold text-gray-300">Title</th>
                      <th className="px-4 py-3 font-semibold text-gray-300">CEFR Can-Do</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1e2a4a]">
                    {levelMeta.map(l => (
                      <tr key={l.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-4 py-3 font-bold text-white">{l.id}</td>
                        <td className="px-4 py-3 text-gray-300">{l.title}</td>
                        <td className="px-4 py-3 text-gray-500">{l.desc}</td>
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
