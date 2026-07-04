import { createFileRoute, Link, Outlet, useParams, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { apiFetch } from "~/lib/apiFetch";
import { motion } from "framer-motion";
import { ArrowLeft, ChevronRight, Clock, BookOpen } from "lucide-react";

export const Route = createFileRoute("/coaching/$level")({ component: LevelPage });

const meta: Record<string, { title: string; icon: string; color: string }> = {
  a1: { title: "Beginner – Découverte", icon: "🌱", color: "from-emerald-500 to-teal-500" },
  a2: { title: "Elementary – Progrès", icon: "🌿", color: "from-teal-500 to-cyan-500" },
  b1: { title: "Intermediate – Indépendance", icon: "🌳", color: "from-blue-500 to-indigo-500" },
  b2: { title: "Upper-Intermediate – Autonomie", icon: "🔥", color: "from-indigo-500 to-purple-500" },
  c1: { title: "Advanced – Maîtrise", icon: "💎", color: "from-purple-500 to-pink-500" },
  c2: { title: "Mastery – Perfectionnement", icon: "👑", color: "from-pink-500 to-rose-500" },
};

function LevelPage() {
  const { level } = useParams({ from: "/coaching/$level" });
  const [lessons, setLessons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouterState();
  const isIndex = router.location.pathname === `/coaching/${level}`;
  if (!isIndex) return <Outlet />;
  const m = meta[level] || { title: level.toUpperCase(), icon: "📚", color: "from-purple-500 to-pink-500" };

  useEffect(() => {
    (async () => {
      try { const res = await apiFetch(`/lessons?level=${level.toUpperCase()}&limit=50`); const d = await res.json(); if (d.success) setLessons(d.data || []); }
      catch {}
      finally { setLoading(false); }
    })();
  }, [level]);

  return (
    <div className="min-h-screen dark:bg-[#070B17] bg-gray-50 transition-colors duration-300 overflow-x-hidden">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-8 sm:py-12">
        <Link to="/coaching" className="inline-flex items-center gap-1 text-sm dark:text-gray-400 text-gray-600 hover:text-purple-400 transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" /> All Levels
        </Link>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-4 mb-2">
            <span className="text-3xl">{m.icon}</span>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold dark:text-white text-gray-900">{level.toUpperCase()}</h1>
              <p className="text-sm text-purple-400">{m.title}</p>
            </div>
          </div>
          <div className={`h-1 w-full rounded-full bg-gradient-to-r ${m.color} mt-4`} />
        </motion.div>
        <div className="mt-6 sm:mt-8 space-y-3">
          {loading ? <div className="text-center py-12 dark:text-gray-500 text-gray-400">Loading lessons...</div> : lessons.length === 0 ? (
            <div className="text-center py-12 dark:text-gray-500 text-gray-400">No lessons available yet.</div>
          ) : (
            lessons.map((lesson, i) => (
              <motion.div key={lesson._id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}>
                <Link to={`/coaching/${level}/${lesson._id}`}
                  className="flex items-center gap-3 sm:gap-4 rounded-2xl dark:bg-[#101828]/80 bg-white/80 backdrop-blur-lg border dark:border-[#1e2a4a] border-gray-200 p-4 sm:p-5 hover:border-purple-500/50 hover:shadow-lg transition-all group">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${m.color} flex items-center justify-center text-white text-sm font-bold shrink-0`}>
                    {lesson.order || i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm sm:text-base font-semibold dark:text-gray-200 text-gray-800 truncate">{lesson.title}</p>
                    <div className="flex items-center gap-3 mt-1 flex-wrap">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 font-medium">{lesson.category}</span>
                      <span className="text-[10px] dark:text-gray-500 text-gray-400 flex items-center gap-1"><Clock className="w-3 h-3" /> {lesson.estimatedDuration}m</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 dark:text-gray-600 text-gray-400 group-hover:text-purple-400 group-hover:translate-x-1 transition-all shrink-0" />
                </Link>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
