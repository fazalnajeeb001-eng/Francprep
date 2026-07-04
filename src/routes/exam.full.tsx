import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, AlertTriangle, Play, BookOpen } from "lucide-react";

export const Route = createFileRoute("/exam/full")({ component: FullExamPage });

const sections = [
  { section: "Listening", time: "40 min", questions: 40 },
  { section: "Reading", time: "60 min", questions: 50 },
  { section: "Grammar", time: "30 min", questions: 30 },
  { section: "Vocabulary", time: "20 min", questions: 20 },
  { section: "Writing", time: "30 min", questions: 2 },
  { section: "Speaking", time: "15 min", questions: 3 },
];

function FullExamPage() {
  return (
    <div className="min-h-screen dark:bg-[#070B17] bg-gray-50 transition-colors duration-300 overflow-x-hidden">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-8 sm:py-12">
        <Link to="/exam" className="inline-flex items-center gap-1 text-sm dark:text-gray-400 text-gray-600 hover:text-purple-400 transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Exams
        </Link>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Full Exam Simulator</h1>
          <p className="dark:text-gray-400 text-gray-600 mt-2 text-sm">Complete a full-length exam under timed conditions.</p>
          <div className="mt-6 sm:mt-8 rounded-2xl dark:bg-[#101828]/80 bg-white/80 backdrop-blur-lg border dark:border-[#1e2a4a] border-gray-200 p-5 sm:p-6 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-5 h-5 text-amber-400" />
              <span className="text-sm dark:text-gray-300 text-gray-700">~3 hours total</span>
            </div>
            <div className="space-y-2">
              {sections.map((s) => (
                <div key={s.section} className="flex items-center justify-between py-2.5 border-b dark:border-[#1e2a4a] border-gray-200 last:border-0">
                  <span className="text-sm dark:text-gray-200 text-gray-800">{s.section}</span>
                  <span className="text-xs dark:text-gray-500 text-gray-400">{s.time} • {s.questions} questions</span>
                </div>
              ))}
            </div>
            <div className="mt-5 p-3 sm:p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
              <p className="text-xs text-amber-300">Find a quiet space. You cannot pause once started.</p>
            </div>
            <button className="mt-5 w-full rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold py-3 min-h-[44px] hover:opacity-90 transition-all shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2">
              <Play className="w-4 h-4" /> Start Full Exam
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
