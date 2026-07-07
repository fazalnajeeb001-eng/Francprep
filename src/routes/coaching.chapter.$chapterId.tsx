import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ChevronRight, Clock, Award, ArrowLeft } from "lucide-react";
import { useTheme } from "~/lib/ThemeContext";
import { chapterA1 } from "~/lib/lessons/a1-greetings";

export const Route = createFileRoute("/coaching/chapter/$chapterId")({ component: ChapterPage });

const chapters: Record<string, typeof chapterA1> = { "a1-1-1-1": chapterA1 };

function ChapterPage() {
  const { chapterId } = Route.useParams();
  const { dark } = useTheme();
  const chapter = chapters[chapterId];
  if (!chapter) {
    return (
      <div className="min-h-screen dark:bg-[#070B17] bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-4xl mb-4">📚</p>
          <p className="text-sm dark:text-gray-400 text-gray-600">Chapter not found</p>
          <Link to="/coaching" className="text-purple-400 text-sm mt-2 inline-block hover:underline">Back to Coaching</Link>
        </div>
      </div>
    );
  }
  const txtSec = dark ? "text-gray-400" : "text-gray-500";
  const card = dark ? "bg-[#101828]/80 border-[#1e2a4a]" : "bg-white/80 border-gray-200";
  return (
    <div className="min-h-screen dark:bg-[#070B17] bg-gray-50 transition-colors duration-300">
      <div className="mx-auto max-w-3xl px-4 py-8">
        <Link to="/coaching" className={`flex items-center gap-1 text-sm ${txtSec} hover:text-purple-400 transition-colors mb-6`}>
          <ArrowLeft className="w-4 h-4" /> Coaching
        </Link>
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-purple-400">{chapter.module}</span>
          <h1 className="text-2xl sm:text-3xl font-bold mt-1 dark:text-white text-gray-900">{chapter.title}</h1>
          <p className={`text-sm mt-2 ${txtSec}`}>{chapter.objective}</p>
          <div className="flex items-center gap-4 mt-3">
            <span className="flex items-center gap-1 text-xs text-purple-400"><Award className="w-3.5 h-3.5" /> CEFR {chapter.level}</span>
            <span className="flex items-center gap-1 text-xs text-amber-400"><Clock className="w-3.5 h-3.5" /> {chapter.estTime}</span>
          </div>
        </motion.div>
        <div className="mt-8 space-y-2">
          <h2 className={`text-sm font-semibold mb-3 ${dark ? "text-gray-300" : "text-gray-700"}`}>Lessons</h2>
          {chapter.lessons.map((lesson, i) => (
            <motion.div key={lesson.number} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Link to={`/coaching/chapter/${chapterId}/lesson/${lesson.id}`}
                className={`flex items-center gap-4 ${card} backdrop-blur-lg border rounded-2xl p-4 transition-all hover:border-purple-500/50 hover:shadow-lg group`}>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">{lesson.number}</div>
                <div className="flex-1 min-w-0">
                  <h3 className={`text-sm font-semibold ${dark ? "text-white" : "text-gray-900"}`}>{lesson.title}</h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-[10px] text-purple-400">{lesson.skill}</span>
                    <span className="text-[10px] text-gray-500">{lesson.time}</span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all flex-shrink-0" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
