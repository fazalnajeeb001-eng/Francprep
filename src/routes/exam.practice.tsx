import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, BookOpen, Sparkles } from "lucide-react";

export const Route = createFileRoute("/exam/practice")({ component: PracticePage });

function PracticePage() {
  return (
    <div className="min-h-screen bg-[#070B17]">
      <div className="mx-auto max-w-3xl px-4 py-12">
        <Link to="/exam" className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-purple-400 transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Exams
        </Link>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Practice Mode</h1>
          <p className="text-gray-500 mt-2">Practice individual sections with instant feedback.</p>
          <div className="grid gap-4 mt-8">
            {["Listening", "Reading", "Grammar", "Vocabulary", "Writing", "Speaking"].map((section, i) => (
              <motion.div key={section} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                className="rounded-2xl border border-[#1e2a4a] bg-[#101828]/80 backdrop-blur-lg p-5 flex items-center justify-between hover:border-purple-500/50 transition-all cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-bold">{section[0]}</div>
                  <div>
                    <p className="text-sm font-semibold text-white">{section}</p>
                    <p className="text-xs text-gray-500">10 questions • 15 min</p>
                  </div>
                </div>
                <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold hover:opacity-90 shadow-lg shadow-purple-500/25">Start</button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
