import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, AlertTriangle, Play } from "lucide-react";

export const Route = createFileRoute("/exam/full")({ component: FullExamPage });

function FullExamPage() {
  return (
    <div className="min-h-screen bg-[#070B17]">
      <div className="mx-auto max-w-3xl px-4 py-12">
        <Link to="/exam" className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-purple-400 transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Exams
        </Link>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Full Exam Simulator</h1>
          <p className="text-gray-500 mt-2">Complete a full-length exam under timed conditions.</p>
          <div className="mt-8 rounded-2xl border border-[#1e2a4a] bg-[#101828]/80 backdrop-blur-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-5 h-5 text-amber-400" />
              <span className="text-sm text-gray-300">~3 hours total</span>
            </div>
            <div className="space-y-3">
              {[
                { section: "Listening", time: "40 min", questions: 40 },
                { section: "Reading", time: "60 min", questions: 50 },
                { section: "Grammar", time: "30 min", questions: 30 },
                { section: "Vocabulary", time: "20 min", questions: 20 },
                { section: "Writing", time: "30 min", questions: 2 },
                { section: "Speaking", time: "15 min", questions: 3 },
              ].map((s) => (
                <div key={s.section} className="flex items-center justify-between py-2 border-b border-[#1e2a4a] last:border-0">
                  <span className="text-sm text-white">{s.section}</span>
                  <span className="text-xs text-gray-500">{s.time} • {s.questions} questions</span>
                </div>
              ))}
            </div>
            <div className="mt-6 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
              <p className="text-xs text-amber-300">Find a quiet space. You cannot pause once started.</p>
            </div>
            <button className="mt-6 w-full rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold py-3 hover:opacity-90 transition-all shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2">
              <Play className="w-4 h-4" /> Start Full Exam
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
