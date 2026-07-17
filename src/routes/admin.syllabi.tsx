import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { apiFetch } from "~/lib/apiFetch";
import { motion } from "framer-motion";
import { BookOpen, ChevronRight, Layers, FileText, Plus } from "lucide-react";

export const Route = createFileRoute("/admin/syllabi")({ component: AdminSyllabiPage });

interface Syllabus {
  _id: string;
  level: string;
  title: string;
  description: string;
  objectives: string[];
  order: number;
  isPublished: boolean;
  examType: string;
  lessons: Array<{ _id: string; title: string; order: number; category: string }>;
  units?: Array<{
    id: string;
    unit_name: string;
    unit_description: string;
    unit_order: number;
    chapters: Array<{
      id: string;
      chapter_name: string;
      chapter_description: string;
      chapter_order: number;
      lessons: Array<{ _id: string; title: string; order: number; category: string }>;
    }>;
  }>;
  createdAt: string;
}

interface PaginatedResponse {
  success: boolean;
  data: Syllabus[];
  pagination: { page: number; limit: number; total: number; totalPages: number };
}

const levelColors: Record<string, string> = {
  A1: "from-emerald-500 to-teal-500",
  A2: "from-teal-500 to-cyan-500",
  B1: "from-blue-500 to-indigo-500",
  B2: "from-indigo-500 to-purple-500",
  C1: "from-purple-500 to-pink-500",
  C2: "from-pink-500 to-rose-500",
};

function AdminSyllabiPage() {
  const [syllabi, setSyllabi] = useState<Syllabus[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [expandedUnit, setExpandedUnit] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await apiFetch("/admin/syllabi?limit=50");
        const json: PaginatedResponse = await res.json();
        if (json.success) setSyllabi(json.data);
        else setError("Failed to load syllabi");
      } catch (e: any) {
        setError(e.message || "Network error");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const toggleExpand = (id: string) => setExpanded(expanded === id ? null : id);
  const toggleUnit = (id: string) => setExpandedUnit(expandedUnit === id ? null : id);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold dark:text-white text-gray-900">Syllabus Structure</h1>
          <p className="text-sm dark:text-gray-400 text-gray-500 mt-1">Manage CEFR levels and curriculum layout</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold hover:opacity-90 transition-all shadow-lg shadow-purple-500/25">
          <Plus className="w-4 h-4" /> New Syllabus
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-xl bg-red-500/10 border border-red-500/30 px-4 py-3 text-sm text-red-400">{error}</div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="rounded-2xl dark:bg-[#101828]/80 bg-white/80 border dark:border-[#1e2a4a] border-gray-200 p-5 animate-pulse">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl dark:bg-[#1e2a4a] bg-gray-200" />
                <div className="flex-1">
                  <div className="h-4 w-48 dark:bg-[#1e2a4a] bg-gray-200 rounded mb-2" />
                  <div className="h-3 w-32 dark:bg-[#1e2a4a] bg-gray-200 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : syllabi.length === 0 ? (
        <div className="rounded-2xl dark:bg-[#101828]/80 bg-white/80 border dark:border-[#1e2a4a] border-gray-200 p-8 text-center">
          <BookOpen className="w-12 h-12 mx-auto dark:text-gray-600 text-gray-400 mb-3" />
          <p className="text-sm dark:text-gray-400 text-gray-500">No syllabi found. Create one to get started.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {syllabi.map((syl) => (
            <div key={syl._id} className="rounded-2xl dark:bg-[#101828]/80 bg-white/80 backdrop-blur-lg border dark:border-[#1e2a4a] border-gray-200 overflow-hidden transition-all hover:shadow-lg">
              {/* Header row */}
              <button onClick={() => toggleExpand(syl._id)}
                className="w-full flex items-center justify-between p-5 text-left hover:dark:bg-white/5 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${levelColors[syl.level] || "from-purple-500 to-pink-500"} flex items-center justify-center text-white text-sm font-bold shadow-lg shrink-0`}>
                    {syl.level}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold dark:text-gray-200 text-gray-800">{syl.title}</h3>
                    <p className="text-xs dark:text-gray-500 text-gray-400 mt-0.5">
                      {syl.examType} • Order {syl.order} • {syl.lessons?.length || 0} lessons
                      {syl.units?.length ? ` • ${syl.units.length} units` : ""}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-[10px] font-semibold px-2 py-1 rounded-full ${
                    syl.isPublished
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                  }`}>
                    {syl.isPublished ? "Published" : "Draft"}
                  </span>
                  <ChevronRight className={`w-4 h-4 dark:text-gray-500 text-gray-400 transition-transform ${expanded === syl._id ? "rotate-90" : ""}`} />
                </div>
              </button>

              {/* Expanded content */}
              {expanded === syl._id && (
                <div className="px-5 pb-5 border-t dark:border-[#1e2a4a] border-gray-200 pt-4 space-y-4">
                  {/* Objectives */}
                  <div>
                    <p className="text-xs font-semibold dark:text-gray-400 text-gray-500 uppercase tracking-wider mb-2">Objectives</p>
                    <ul className="space-y-1">
                      {syl.objectives.map((obj, i) => (
                        <li key={i} className="text-xs dark:text-gray-300 text-gray-600 flex items-start gap-2">
                          <span className="text-purple-400 mt-0.5">•</span> {obj}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Units (hierarchical) or flat lessons */}
                  {syl.units && syl.units.length > 0 ? (
                    <div>
                      <p className="text-xs font-semibold dark:text-gray-400 text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Layers className="w-3 h-3" /> Units & Chapters
                      </p>
                      <div className="space-y-2">
                        {syl.units.map((unit) => (
                          <div key={unit.id} className="rounded-xl dark:bg-[#070B17] bg-gray-50 border dark:border-[#1e2a4a] border-gray-200 overflow-hidden">
                            <button onClick={() => toggleUnit(unit.id)}
                              className="w-full flex items-center justify-between px-4 py-2.5 text-left hover:dark:bg-white/5 hover:bg-gray-100 transition-colors">
                              <div className="flex items-center gap-2">
                                <Layers className="w-3.5 h-3.5 text-purple-400" />
                                <span className="text-sm font-medium dark:text-gray-200 text-gray-700">{unit.unit_name}</span>
                                <span className="text-[10px] dark:text-gray-500 text-gray-400">({unit.chapters?.length || 0} chapters)</span>
                              </div>
                              <ChevronRight className={`w-3 h-3 dark:text-gray-500 text-gray-400 transition-transform ${expandedUnit === unit.id ? "rotate-90" : ""}`} />
                            </button>
                            {expandedUnit === unit.id && unit.chapters && (
                              <div className="px-4 pb-3 space-y-1.5">
                                {unit.chapters.map((ch) => (
                                  <div key={ch.id} className="pl-6 border-l-2 dark:border-[#1e2a4a] border-gray-200 ml-2 py-1">
                                    <p className="text-xs font-medium dark:text-gray-300 text-gray-700">{ch.chapter_name}</p>
                                    {ch.lessons && ch.lessons.length > 0 && (
                                      <div className="mt-1 space-y-0.5">
                                        {ch.lessons.map((l) => (
                                          <div key={l._id} className="flex items-center gap-1.5 text-[10px] dark:text-gray-400 text-gray-500 ml-2">
                                            <FileText className="w-2.5 h-2.5" />
                                            {l.title}
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p className="text-xs font-semibold dark:text-gray-400 text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <FileText className="w-3 h-3" /> Lessons (flat)
                      </p>
                      {syl.lessons && syl.lessons.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {syl.lessons.map((l) => (
                            <span key={l._id} className="text-[10px] px-2.5 py-1 rounded-full dark:bg-[#070B17] bg-gray-50 dark:text-gray-300 text-gray-600 border dark:border-[#1e2a4a] border-gray-200">
                              {l.title}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs dark:text-gray-500 text-gray-400 italic">No lessons assigned</p>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}