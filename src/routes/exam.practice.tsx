import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Clock } from "lucide-react";

export const Route = createFileRoute("/exam/practice")({ component: PracticePage });

const sections = ["Listening", "Reading", "Grammar", "Vocabulary", "Writing", "Speaking"];

function PracticePage() {
  return (
    <div className="min-h-screen dark:bg-[#070B17] bg-gray-50 transition-colors duration-300 overflow-x-hidden">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-8 sm:py-12">
        <Link to="/exam" className="inline-flex items-center gap-1 text-sm dark:text-gray-400 text-gray-600 hover:text-purple-400 transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Exams
        </Link>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Practice Mode</h1>
          <p className="dark:text-gray-400 text-gray-600 mt-2 text-sm">Practice individual sections with instant feedback.</p>
          <div className="grid gap-3 sm:gap-4 mt-6 sm:mt-8 grid-cols-1 sm:grid-cols-2">
            {sections.map((section, i) => (
              <motion.div key={section} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                className="rounded-2xl touch-manipulation dark:bg-[#101828]/80 bg-white/80 backdrop-blur-lg border dark:border-[#1e2a4a] border-gray-200 p-4 sm:p-5 flex items-center justify-between hover:border-purple-500/50 transition-all cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-bold shrink-0">{section[0]}</div>
                  <div>
                    <p className="text-sm font-semibold dark:text-gray-200 text-gray-800">{section}</p>
                    <p className="text-xs dark:text-gray-500 text-gray-400">10 questions • 15 min</p>
                  </div>
                </div>
                <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold hover:opacity-90 shadow-lg shadow-purple-500/25 transition-all shrink-0">Start</button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
