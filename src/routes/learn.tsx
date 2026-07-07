import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { apiFetch } from "~/lib/apiFetch";
import { motion } from "framer-motion";
import { BookOpen, ChevronRight, GraduationCap, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/learn")({ component: LearnPage });

const CEFR_COLORS: Record<string, string> = {
  A1: "from-emerald-500 to-teal-500", A2: "from-teal-500 to-cyan-500",
  B1: "from-blue-500 to-indigo-500", B2: "from-indigo-500 to-purple-500",
  C1: "from-purple-500 to-pink-500", C2: "from-pink-500 to-rose-500",
};

function LearnPage() {
  const [groups, setGroups] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await apiFetch("/chapters");
        const json = await res.json();
        if (json.success) setGroups(json.data);
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    })();
  }, []);

  if (loading) return (
    <div className="min-h-screen dark:bg-[#070B17] bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto space-y-4">
        {[1,2,3].map(i => <div key={i} className="h-24 dark:bg-[#101828] bg-gray-200 rounded-2xl animate-pulse" />)}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen dark:bg-[#070B17] bg-gray-50 transition-colors">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Link to="/dashboard" className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
            <ArrowLeft className="w-5 h-5 dark:text-gray-400 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold dark:text-white text-gray-900">Your Learning Path</h1>
            <p className="text-sm dark:text-gray-400 text-gray-500">Master French level by level</p>
          </div>
        </div>

        {groups.length === 0 ? (
          <div className="text-center py-16">
            <GraduationCap className="w-16 h-16 mx-auto dark:text-gray-600 text-gray-400 mb-4" />
            <p className="dark:text-gray-400 text-gray-500">No chapters available yet. New content is being added!</p>
          </div>
        ) : (
          <div className="space-y-8">
            {groups.map((group: any, gi: number) => (
              <motion.div key={group.level} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: gi * 0.1 }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${CEFR_COLORS[group.level] || "from-purple-500 to-pink-500"} flex items-center justify-center text-white font-bold text-sm`}>
                    {group.level}
                  </div>
                  <div>
                    <h2 className="text-lg font-bold dark:text-white text-gray-900">{group.title}</h2>
                    <p className="text-xs dark:text-gray-500 text-gray-400">{group.chapters.length} chapter{group.chapters.length !== 1 ? 's' : ''}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {group.chapters.map((ch: any) => (
                    <Link key={ch._id} to="/learn/$chapterId" params={{ chapterId: ch._id }}
                      className="block rounded-2xl dark:bg-[#101828]/80 bg-white/80 backdrop-blur-lg border dark:border-[#1e2a4a] border-gray-200 p-5 hover:border-purple-500/50 transition-all group">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${CEFR_COLORS[group.level] || "from-purple-500 to-pink-500"} flex items-center justify-center text-white shrink-0`}>
                          <BookOpen className="w-6 h-6" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold dark:text-white text-gray-900 group-hover:text-purple-400 transition-colors">{ch.title}</h3>
                          <p className="text-xs dark:text-gray-500 text-gray-400 mt-1">
                            {ch.lessons?.filter((l: any) => l).length || 0} lessons
                            {ch.moduleTitle ? ` · ${ch.moduleTitle}` : ''}
                          </p>
                        </div>
                        <ChevronRight className="w-5 h-5 dark:text-gray-600 text-gray-400 group-hover:text-purple-400 transition-colors" />
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
