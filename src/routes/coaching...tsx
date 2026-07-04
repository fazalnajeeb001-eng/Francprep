import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { apiFetch } from "~/lib/apiFetch";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Play, BookOpen } from "lucide-react";

export const Route = createFileRoute("/coaching/$level/$concept")({ component: ConceptPage });

function ConceptPage() {
  const { level, concept } = useParams({ from: "/coaching/$level/$concept" });
  const [lesson, setLesson] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      try { const res = await apiFetch(`/lessons/${concept}`); const d = await res.json(); if (d.success) setLesson(d.data); }
      catch {}
      finally { setLoading(false); }
    })();
  }, [concept]);

  return (
    <div className="min-h-screen dark:bg-[#070B17] bg-gray-50 transition-colors duration-300 overflow-x-hidden">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-8 sm:py-12">
        <Link to={`/coaching/${level}`} className="inline-flex items-center gap-1 text-sm dark:text-gray-400 text-gray-600 hover:text-purple-400 transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to {level.toUpperCase()}
        </Link>
        {loading ? (
          <div className="text-center py-12"><div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto" /></div>
        ) : !lesson ? (
          <div className="text-center py-12 dark:text-gray-500 text-gray-400">Lesson not found.</div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="dark:bg-[#101828]/80 bg-white/80 backdrop-blur-lg border dark:border-[#1e2a4a] border-gray-200 rounded-2xl p-6 sm:p-8 transition-colors duration-300">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 font-medium">{lesson.category}</span>
                <span className="text-[10px] dark:text-gray-500 text-gray-400">{lesson.level}</span>
              </div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold dark:text-white text-gray-900 mt-2">{lesson.title}</h1>
              <p className="text-sm sm:text-base dark:text-gray-400 text-gray-600 mt-2 leading-relaxed">{lesson.description}</p>
              <div className="flex items-center gap-3 mt-4 text-xs dark:text-gray-500 text-gray-400">
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {lesson.estimatedDuration} min</span>
                <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" /> {lesson.category}</span>
              </div>
              <div className="mt-6 p-4 sm:p-5 rounded-xl dark:bg-[#070B17] bg-gray-50 border dark:border-[#1e2a4a] border-gray-200">
                <p className="text-sm sm:text-base dark:text-gray-300 text-gray-700 leading-relaxed whitespace-pre-wrap">{lesson.content}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <button className="flex-1 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold py-2.5 hover:opacity-90 transition-all shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2">
                  <Play className="w-4 h-4" /> Start Lesson
                </button>
                <button className="px-5 py-2.5 rounded-xl border dark:border-[#1e2a4a] border-gray-200 dark:text-gray-300 text-gray-700 text-sm font-semibold dark:hover:bg-white/5 hover:bg-gray-100 transition-all">
                  Mark Complete
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
