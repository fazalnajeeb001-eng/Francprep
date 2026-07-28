import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  FileText,
  Plus,
  Trash2,
  Edit,
  Eye,
  CheckCircle2,
  Clock,
  Sparkles,
  Volume2,
  BookOpen,
  PenTool,
  Mic,
  ArrowLeft
} from "lucide-react";
import { useTheme } from "~/lib/ThemeContext";
import { getExamRegistry, type ExamPaper } from "~/lib/examSchema";
import { OFFICIAL_DELF_DALF_PAPERS } from "~/lib/delfExamSchema";

export const Route = createFileRoute("/admin/exams")({
  component: AdminExamsPage,
});

export function AdminExamsPage() {
  const { dark } = useTheme();
  const [examTypeFilter, setExamTypeFilter] = useState<"ALL" | "TCF_CANADA" | "TEF_CANADA" | "DELF_DALF">("ALL");
  const [selectedPaper, setSelectedPaper] = useState<any | null>(null);

  const tcfTefPapers = getExamRegistry();
  const delfPapers = OFFICIAL_DELF_DALF_PAPERS;

  const allPapers = [
    ...tcfTefPapers.map(p => ({ ...p, category: p.type })),
    ...delfPapers.map(p => ({ ...p, category: "DELF_DALF", published: true }))
  ];

  const filteredPapers = examTypeFilter === "ALL"
    ? allPapers
    : allPapers.filter(p => p.category === examTypeFilter || (examTypeFilter === "DELF_DALF" && p.category === "DELF_DALF"));

  const bg = dark ? "bg-[#070B17] text-white" : "bg-[#F8FAFC] text-slate-900";
  const card = dark ? "bg-[#101828]/90 border-white/10" : "bg-white border-slate-200 shadow-sm";

  return (
    <div className={`min-h-screen ${bg} p-4 md:p-8 space-y-6`}>
      <div className="max-w-6xl mx-auto space-y-6">

        {/* ─── HEADER ─── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-b border-gray-200 dark:border-white/10">
          <div>
            <Link to="/admin" className="text-xs text-purple-400 hover:underline flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Admin Dashboard
            </Link>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight mt-1 flex items-center gap-3">
              <GraduationCap className="w-8 h-8 text-purple-400" />
              Exam Papers & Simulator Content Manager
            </h1>
            <p className={`text-xs ${dark ? "text-gray-400" : "text-slate-600"} mt-1`}>
              Manage and edit all TCF Canada, TEF Canada, DELF A1-B2, and DALF C1-C2 diagnostic test papers.
            </p>
          </div>
        </div>

        {/* ─── EXAM TYPE FILTER TABS ─── */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-gray-200 dark:border-white/10">
          {[
            { id: "ALL", label: "All Exam Papers" },
            { id: "TCF_CANADA", label: "TCF Canada Papers" },
            { id: "TEF_CANADA", label: "TEF Canada Papers" },
            { id: "DELF_DALF", label: "DELF / DALF Milestones" },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setExamTypeFilter(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                examTypeFilter === tab.id
                  ? "bg-purple-600 text-white border-purple-500 shadow-md"
                  : dark
                  ? "bg-[#101828] border-white/10 text-gray-400 hover:border-purple-500/40"
                  : "bg-white border-slate-200 text-slate-700 hover:border-purple-400"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ─── PAPERS GRID ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredPapers.map(paper => (
            <motion.div
              key={paper.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-6 rounded-2xl border ${card} space-y-4 flex flex-col justify-between`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-black bg-purple-500/10 text-purple-400 border border-purple-500/20">
                    {paper.category} {paper.level ? `(${paper.level})` : ""}
                  </span>
                  <span className="text-xs text-gray-400 font-mono flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-purple-400" /> {paper.totalDurationMinutes || 80} mins
                  </span>
                </div>

                <h3 className="text-base font-bold leading-snug">{paper.title}</h3>

                <div className="grid grid-cols-2 gap-2 text-xs text-gray-400">
                  <div className="flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-emerald-400" /> {paper.sections?.length || 4} Skill Sections
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" /> AI Rubric Evaluation
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-200 dark:border-white/10 flex items-center justify-between gap-2">
                <button
                  onClick={() => setSelectedPaper(paper)}
                  className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow flex items-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" /> Inspect Paper
                </button>
                <Link
                  to={paper.category === "DELF_DALF" ? `/exam/delf/${paper.id}` : `/exam/${paper.id}`}
                  className="px-3.5 py-2 rounded-xl border border-white/10 hover:bg-white/5 text-gray-300 font-bold text-xs flex items-center gap-1.5"
                >
                  ▶ Preview Simulator
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ─── INSPECT MODAL ─── */}
        {selectedPaper && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className={`max-w-2xl w-full p-6 rounded-2xl border ${card} space-y-4 max-h-[85vh] overflow-y-auto`}>
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="text-lg font-bold">{selectedPaper.title}</h3>
                <button onClick={() => setSelectedPaper(null)} className="text-xs text-gray-400 hover:text-white font-bold">
                  ✕ Close
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <span className="font-bold text-purple-400 block mb-1">Exam Type & Target:</span>
                  <p className="text-gray-300">{selectedPaper.category} — {selectedPaper.totalDurationMinutes} Minutes Duration</p>
                </div>

                <div>
                  <span className="font-bold text-purple-400 block mb-2">Sections & Tasks:</span>
                  <div className="space-y-2">
                    {selectedPaper.sections?.map((sec: any) => (
                      <div key={sec.id || sec.type} className="p-3 rounded-xl border border-white/10 bg-white/5 space-y-1">
                        <p className="font-bold text-white">{sec.title}</p>
                        <p className="text-[11px] text-gray-400">{sec.instructions}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
