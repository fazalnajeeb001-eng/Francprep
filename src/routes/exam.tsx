import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target,
  Trophy,
  Clock,
  Play,
  Sparkles,
  HelpCircle,
  FileText,
  CheckCircle2,
  Lock,
  Volume2,
  BookOpen,
  PenTool,
  Mic,
  ShieldCheck,
  Zap,
  ArrowRight,
  Flame
} from "lucide-react";
import { useTheme } from "~/lib/ThemeContext";
import { getExamRegistry, type ExamPaper, type ExamMode, type ExamType } from "~/lib/examSchema";

export const Route = createFileRoute("/exam")({ component: ExamHubPage });

export function ExamHubPage() {
  const navigate = useNavigate();
  const { dark } = useTheme();

  const [selectedType, setSelectedType] = useState<ExamType>("TCF_CANADA");
  const [selectedMode, setSelectedMode] = useState<ExamMode>("PRACTICE");

  const registry = getExamRegistry();
  const filteredPapers = registry.filter((p) => p.type === selectedType && p.published);

  const handleLaunchPaper = (paperId: string) => {
    navigate({
      to: "/exam/$paperId",
      params: { paperId },
      search: { mode: selectedMode },
    });
  };

  const bg = dark ? "bg-[#070B17] text-white" : "bg-gray-50 text-gray-900";
  const cardBg = dark ? "bg-[#101828]/90 border-[#1e2a4a]" : "bg-white/90 border-gray-200";
  const txtSec = dark ? "text-gray-400" : "text-gray-500";

  return (
    <div className={`min-h-screen ${bg} p-4 md:p-8 transition-colors duration-300`}>
      <div className="max-w-6xl mx-auto space-y-8 pb-20">

        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-4 border-b border-gray-200 dark:border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 text-xs font-bold mb-2">
              <Trophy className="w-3.5 h-3.5" />
              <span>Official Canadian Immigration Standard</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              TCF & TEF Canada Exam Simulators
            </h1>
            <p className={`text-sm ${txtSec} mt-1`}>
              Practice under real official exam conditions or guided practice mode to achieve your target NCLC 7+ B2 score.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              ✓ NCLC 7+ Benchmark Ready
            </span>
          </div>
        </div>

        {/* Exam Type Selector (TCF vs TEF) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* TCF Canada Card */}
          <div
            onClick={() => setSelectedType("TCF_CANADA")}
            className={`p-6 md:p-8 rounded-3xl border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between space-y-6 ${
              selectedType === "TCF_CANADA"
                ? "border-purple-500 bg-purple-500/10 ring-2 ring-purple-500/30 shadow-2xl"
                : `${cardBg} hover:border-purple-300`
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-purple-600 text-white text-xs font-extrabold tracking-wider uppercase">
                  FEI / France Éducation International
                </span>
                {selectedType === "TCF_CANADA" && <CheckCircle2 className="w-6 h-6 text-purple-500" />}
              </div>
              <h2 className="text-2xl font-extrabold">TCF Canada Simulator</h2>
              <p className={`text-xs md:text-sm ${txtSec} leading-relaxed`}>
                Test de connaissance du français pour le Canada. Evaluates 4 skills: Listening (39q • 35m), Reading (39q • 60m), Writing (3 tasks • 60m), and Speaking (3 tasks • 12m).
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-semibold pt-2">
              <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-300 flex items-center gap-2">
                <Volume2 className="w-4 h-4" />
                <span>39 Listening Qs</span>
              </div>
              <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-300 flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                <span>39 Reading Qs</span>
              </div>
              <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-300 flex items-center gap-2">
                <PenTool className="w-4 h-4" />
                <span>3 Writing Tasks</span>
              </div>
              <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-300 flex items-center gap-2">
                <Mic className="w-4 h-4" />
                <span>3 Speaking Tasks</span>
              </div>
            </div>
          </div>

          {/* TEF Canada Card */}
          <div
            onClick={() => setSelectedType("TEF_CANADA")}
            className={`p-6 md:p-8 rounded-3xl border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between space-y-6 ${
              selectedType === "TEF_CANADA"
                ? "border-indigo-500 bg-indigo-500/10 ring-2 ring-indigo-500/30 shadow-2xl"
                : `${cardBg} hover:border-indigo-300`
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-indigo-600 text-white text-xs font-extrabold tracking-wider uppercase">
                  CCI Paris Île-de-France
                </span>
                {selectedType === "TEF_CANADA" && <CheckCircle2 className="w-6 h-6 text-indigo-500" />}
              </div>
              <h2 className="text-2xl font-extrabold">TEF Canada Simulator</h2>
              <p className={`text-xs md:text-sm ${txtSec} leading-relaxed`}>
                Test d'évaluation de français pour le Canada. Evaluates 4 skills: Listening (40q • 40m), Reading (40q • 60m), Writing (2 tasks • 60m), and Speaking (2 tasks • 15m).
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-semibold pt-2">
              <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 flex items-center gap-2">
                <Volume2 className="w-4 h-4" />
                <span>40 Listening Qs</span>
              </div>
              <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                <span>40 Reading Qs</span>
              </div>
              <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 flex items-center gap-2">
                <PenTool className="w-4 h-4" />
                <span>2 Writing Tasks</span>
              </div>
              <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 flex items-center gap-2">
                <Mic className="w-4 h-4" />
                <span>2 Speaking Tasks</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mode Selector Panel (Practice vs Real Exam) */}
        <div className={`p-6 md:p-8 rounded-3xl border ${cardBg} space-y-6 shadow-xl`}>
          <div className="text-center space-y-2">
            <h3 className="text-xl font-extrabold">Select Exam Execution Mode</h3>
            <p className={`text-xs md:text-sm ${txtSec}`}>
              Choose how you want to attempt this simulator paper.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Practice Mode */}
            <div
              onClick={() => setSelectedMode("PRACTICE")}
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
                selectedMode === "PRACTICE"
                  ? "border-emerald-500 bg-emerald-500/15 ring-2 ring-emerald-500/30 text-emerald-900 dark:text-emerald-100"
                  : `${dark ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"}`
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-emerald-500" />
                  <span className="font-bold text-base">Guided Practice Mode</span>
                </div>
                {selectedMode === "PRACTICE" && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
              </div>

              <ul className="text-xs space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-center gap-2">✓ <strong>Pausable Timer</strong> (study at your own pace)</li>
                <li className="flex items-center gap-2">✓ <strong>Hints Toggle</strong> for tricky grammar & vocabulary</li>
                <li className="flex items-center gap-2">✓ <strong>Audio Transcripts & EN Translations</strong> on demand</li>
                <li className="flex items-center gap-2">✓ <strong>Guided Writing Tips & Vocabulary Starters</strong></li>
                <li className="flex items-center gap-2">✓ <strong>Interactive AI Speaking Coach Suggestions</strong></li>
              </ul>

              <span className="text-[10px] font-extrabold uppercase text-emerald-600 dark:text-emerald-400">
                Recommended for Initial Preparation
              </span>
            </div>

            {/* Real Exam Mode */}
            <div
              onClick={() => setSelectedMode("EXAM")}
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
                selectedMode === "EXAM"
                  ? "border-rose-500 bg-rose-500/15 ring-2 ring-rose-500/30 text-rose-900 dark:text-rose-100"
                  : `${dark ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"}`
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Lock className="w-5 h-5 text-rose-500" />
                  <span className="font-bold text-base">Official Real Exam Mode</span>
                </div>
                {selectedMode === "EXAM" && <CheckCircle2 className="w-5 h-5 text-rose-500" />}
              </div>

              <ul className="text-xs space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-center gap-2">⚡ <strong>Strict Countdown Timer</strong> (Unpausable)</li>
                <li className="flex items-center gap-2">🔒 <strong>Zero Hints or Translations</strong></li>
                <li className="flex items-center gap-2">🔒 <strong>Official Test-Center Screen Environment</strong></li>
                <li className="flex items-center gap-2">📊 <strong>Instant Automated Grading & NCLC Score Report</strong></li>
                <li className="flex items-center gap-2">🏆 <strong>Express Entry CRS Point Evaluation</strong></li>
              </ul>

              <span className="text-[10px] font-extrabold uppercase text-rose-600 dark:text-rose-400">
                Simulates Actual Test-Center Day
              </span>
            </div>
          </div>
        </div>

        {/* Papers List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">
              Available {selectedType === "TCF_CANADA" ? "TCF Canada" : "TEF Canada"} Mock Exam Papers
            </h3>
            <span className={`text-xs ${txtSec}`}>
              {filteredPapers.length} Published Paper(s)
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {filteredPapers.map((paper) => (
              <div
                key={paper.id}
                className={`p-6 rounded-3xl border ${cardBg} flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-purple-400 transition-all shadow-md`}
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-600 dark:text-purple-300 text-[10px] font-mono font-bold">
                      {paper.code}
                    </span>
                    {paper.isSamplePaper && (
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 text-[10px] font-bold">
                        Official Practice Sample
                      </span>
                    )}
                  </div>
                  <h4 className="text-xl font-bold">{paper.title}</h4>
                  <p className={`text-xs ${txtSec}`}>{paper.description}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 pt-1 font-semibold">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {paper.totalDurationMins} Minutes Total
                    </span>
                    <span className="flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5" />
                      {paper.sections.length} Tested Sections
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleLaunchPaper(paper.id)}
                  className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-xl shadow-purple-600/25 flex items-center justify-center gap-2 shrink-0"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Launch in {selectedMode === "EXAM" ? "Exam Mode" : "Practice Mode"}</span>
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
