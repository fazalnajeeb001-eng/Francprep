import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useRequireAuth } from "~/lib/useRequireAuth";
import { motion } from "framer-motion";
import { Target, BookOpen, ChevronRight, Sparkles, Clock, Award } from "lucide-react";

export const Route = createFileRoute("/exam")({ component: ExamHub });

const examTypes = [
  { id: "tcf", name: "TCF Canada", flag: "🇨🇦", desc: "Test de Connaissance du Français — comprehensive assessment for Canadian immigration", color: "from-purple-500 to-pink-500", icon: "🎯" },
  { id: "tef", name: "TEF Canada", flag: "🇨🇦", desc: "Test d'Évaluation de Français — accepted for citizenship and permanent residency", color: "from-blue-500 to-indigo-500", icon: "📋" },
];

function ExamHub() {
  const { isLoading: authLoading } = useRequireAuth();
  const router = useRouterState();
  if (authLoading) return <div className="min-h-screen bg-[#070B17] flex items-center justify-center"><div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" /></div>;

  const isIndex = router.location.pathname === "/exam";
  if (!isIndex) return <Outlet />;

  return (
    <div className="min-h-screen bg-[#070B17]">
      <div className="mx-auto max-w-5xl px-4 py-12">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <span className="inline-block rounded-full bg-purple-500/10 border border-purple-500/30 px-3 py-1 text-sm font-medium text-purple-400">
            Exam Simulator
          </span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Practice Exams
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">
            Full-length mock exams for TCF Canada and TEF Canada with real-time scoring.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {examTypes.map((ex, i) => (
            <motion.div key={ex.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <div className="relative overflow-hidden rounded-2xl border border-[#1e2a4a] bg-[#101828]/80 backdrop-blur-lg p-6 transition-all hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10">
                <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${ex.color}`} />
                <div className="flex items-start gap-4 mt-1">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${ex.color} flex items-center justify-center text-2xl shadow-lg`}>
                    {ex.icon}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-white">{ex.flag} {ex.name}</h2>
                    <p className="text-sm text-gray-500 mt-1">{ex.desc}</p>
                    <div className="flex items-center gap-4 mt-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> ~3 hours</span>
                      <span className="flex items-center gap-1"><Award className="w-3 h-3" /> 6 sections</span>
                    </div>
                    <div className="flex gap-3 mt-4">
                      <Link to="/exam/full" className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold hover:opacity-90 shadow-lg shadow-purple-500/25 transition-all">
                        Full Exam
                      </Link>
                      <Link to="/exam/practice" className="px-4 py-2 rounded-xl border border-[#1e2a4a] text-gray-300 text-xs font-semibold hover:bg-white/5 transition-all">
                        Practice
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Stats */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          className="mt-12 rounded-2xl border border-[#1e2a4a] bg-[#101828]/80 backdrop-blur-lg p-6">
          <h2 className="text-lg font-semibold text-white mb-4">📊 Your Exam Stats</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Exams Taken", value: "0", icon: <Target className="w-4 h-4 text-purple-400" /> },
              { label: "Avg Score", value: "—", icon: <Award className="w-4 h-4 text-amber-400" /> },
              { label: "Best Score", value: "—", icon: <Sparkles className="w-4 h-4 text-emerald-400" /> },
              { label: "Study Time", value: "0h", icon: <Clock className="w-4 h-4 text-blue-400" /> },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-3 rounded-xl bg-[#070B17]">
                <div className="flex justify-center mb-1">{stat.icon}</div>
                <p className="text-lg font-bold text-white">{stat.value}</p>
                <p className="text-[10px] text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
