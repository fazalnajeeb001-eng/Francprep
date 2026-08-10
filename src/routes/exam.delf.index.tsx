import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Award,
  BookOpen,
  CheckCircle2,
  Clock,
  ArrowLeft,
  Sparkles,
  FileCheck,
  ShieldCheck,
  Zap,
  Play
} from "lucide-react";
import { useTheme } from "~/lib/ThemeContext";
import { OFFICIAL_DELF_DALF_PAPERS } from "~/lib/delfExamSchema";

export function DELFExamHubPage() {
  const { dark } = useTheme();
  const [selectedLevel, setSelectedLevel] = useState<string>("ALL");

  const filteredPapers = selectedLevel === "ALL"
    ? OFFICIAL_DELF_DALF_PAPERS
    : OFFICIAL_DELF_DALF_PAPERS.filter(p => p.level === selectedLevel);

  return (
    <div className={`min-h-screen ${dark ? "bg-[#070B17] text-white" : "bg-[#F8FAFC] text-slate-900"} p-4 md:p-8`}>
      <div className="max-w-6xl mx-auto space-y-6">

        {/* ─── TOP NAVIGATION HEADER ─── */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-4 border-b border-gray-200 dark:border-white/10">
          <div>
            <Link to="/learn" className="text-xs text-purple-400 hover:underline flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Learning Roadmap
            </Link>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight mt-1 flex items-center gap-3">
              <Award className="w-8 h-8 text-amber-400" />
              DELF / DALF Official Milestone Diagnostic Exams
            </h1>
            <p className={`text-xs ${dark ? "text-gray-400" : "text-slate-600"} mt-1 max-w-2xl`}>
              Authentic France Éducation International (FEI) style diploma diagnostic exams for DELF A1–B2 and DALF C1–C2 with AI examiner rubric grading.
            </p>
          </div>
        </div>

        {/* ─── OFFICIAL COMPLIANCE BANNER ─── */}
        <div className="p-4 rounded-2xl border bg-amber-500/10 border-amber-500/20 text-xs space-y-1">
          <div className="flex items-center gap-2 font-bold text-amber-400">
            <ShieldCheck className="w-4 h-4" />
            <span>100% Official DELF / DALF Format Alignment & Module Gate Evaluation</span>
          </div>
          <p className="text-amber-200/90 text-[11px] leading-relaxed">
            All papers strictly follow the 4 official FEI skill sections (Listening, Reading, Writing & Speaking). 
            <em> Disclaimer: FrancPrep provides official format diagnostic evaluations to unlock module progression. Official DELF/DALF diplomas are awarded by France Éducation International.</em>
          </p>
        </div>

        {/* ─── LEVEL FILTER PILLS ─── */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {["ALL", "A1", "A2", "B1", "B2", "C1", "C2"].map((level) => (
            <button
              key={level}
              onClick={() => setSelectedLevel(level)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                selectedLevel === level
                  ? "bg-amber-500 text-black border-amber-400 shadow-lg shadow-amber-500/20"
                  : dark
                  ? "bg-[#101828] border-white/10 text-gray-300 hover:border-amber-400/50"
                  : "bg-white border-slate-200 text-slate-700 hover:border-amber-400"
              }`}
            >
              {level === "ALL" ? "All Diplomas" : `${level} Milestone`}
            </button>
          ))}
        </div>

        {/* ─── EXAM PAPERS GRID ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredPapers.map((paper) => (
            <motion.div
              key={paper.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-6 rounded-2xl border flex flex-col justify-between space-y-5 transition-all ${
                dark ? "bg-[#101828] border-white/10 hover:border-amber-500/40" : "bg-white border-slate-200 shadow-sm hover:border-amber-400"
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-500/10 text-amber-400 border border-amber-500/30">
                    {paper.diplomaType} {paper.level}
                  </span>
                  <span className="text-xs text-gray-400 font-mono flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-400" /> {paper.totalDurationMinutes} mins
                  </span>
                </div>

                <h3 className="text-base font-bold leading-snug">{paper.title}</h3>

                <div className="grid grid-cols-2 gap-2 pt-1 text-xs text-gray-400">
                  <div className="flex items-center gap-1.5">
                    <FileCheck className="w-3.5 h-3.5 text-emerald-400" /> 4 Skill Sections
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-purple-400" /> AI Rubric Grading
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-200 dark:border-white/10 flex items-center justify-between">
                <span className="text-[11px] text-emerald-400 font-bold">
                  {paper.passingScorePercentage}% Pass Required to Unlock Next Chapter
                </span>
                <Link
                  to={`/exam/delf/${paper.id}`}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-extrabold text-xs shadow-md shadow-amber-500/20 flex items-center gap-1.5 transition-all"
                >
                  <Play className="w-3.5 h-3.5 fill-current" /> Start Exam
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}

export const Route = createFileRoute("/exam/delf/")({
  component: DELFExamHubPage,
});
