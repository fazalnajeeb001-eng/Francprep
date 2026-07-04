import { motion } from "framer-motion";
import { ProgressBar } from "../ui/ProgressBar";

export function ExamCard({ dark }: { dark: boolean }) {
  const exams = [
    { name: "TCF Canada", flag: "🇨🇦", progress: 67, completed: 3, score: 72 },
    { name: "TEF Canada", flag: "🇨🇦", progress: 45, completed: 1, score: 65 },
  ];
  return (
    <div className={`${dark ? "bg-[#101828]/80 border-[#1e2a4a]" : "bg-white/80 border-gray-200"} backdrop-blur-lg border rounded-2xl p-5 transition-colors`}>
      <h3 className={`text-sm font-semibold mb-4 ${dark ? "text-gray-300" : "text-gray-700"}`}>🎯 Exam Simulator</h3>
      <div className="space-y-3">
        {exams.map((ex) => (
          <div key={ex.name} className={`${dark ? "bg-[#070B17]" : "bg-gray-50"} rounded-xl p-4`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-lg">{ex.flag}</span>
                <span className={`text-sm font-semibold ${dark ? "text-white" : "text-gray-900"}`}>{ex.name}</span>
              </div>
              <span className="text-purple-400 text-xs font-bold">{ex.progress}%</span>
            </div>
            <ProgressBar value={ex.progress} dark={dark} />
            <div className="flex justify-between mt-1">
              <p className={`text-[10px] ${dark ? "text-gray-500" : "text-gray-400"}`}>{ex.completed} mock exams completed</p>
              <p className={`text-[10px] ${dark ? "text-gray-500" : "text-gray-400"}`}>Avg: {ex.score}%</p>
            </div>
          </div>
        ))}
        <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold py-2.5 rounded-xl hover:opacity-90 transition-all shadow-lg shadow-purple-500/25">
          Start Simulator
        </button>
      </div>
    </div>
  );
}
