import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useMemo } from "react";
import { apiFetch } from "~/lib/apiFetch";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "~/lib/ThemeContext";
import {
  ArrowLeft, Crown, CheckCircle2, AlertCircle,
  RefreshCw, Eye, AlertTriangle, Database, Search, ShieldCheck, Trash2, CheckSquare, Square, Edit3
} from "lucide-react";
import { LessonPage } from "~/components/content/LessonPage";

export const Route = createFileRoute("/admin/pipeline/published")({ component: PublishedContentSubSectionPage });

interface LessonItem {
  _id: string;
  lessonId: string;
  chapterId?: string;
  level: string;
  title: string;
  canonical?: any;
  isPublished: boolean;
  updatedAt: string;
}

const MODULE_LEVELS = ["ALL", "A1", "A2", "B1", "B2", "C1", "C2"];

function PublishedContentSubSectionPage() {
  const { dark } = useTheme();
  const [publishedLessons, setPublishedLessons] = useState<LessonItem[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<LessonItem | null>(null);
  const [previewLessonId, setPreviewLessonId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedModule, setSelectedModule] = useState<string>("ALL");
  
  // Selection State for Bulk Delete
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  
  // Delete Protection Modal State
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemsToDelete, setItemsToDelete] = useState<LessonItem[]>([]);
  const [deleteConfirmInput, setDeleteConfirmInput] = useState("");
  const [deleting, setDeleting] = useState(false);

  const [actionStatus, setActionStatus] = useState({ loading: false, error: "", success: "" });

  const [selectedLang, setSelectedLang] = useState(() => {
    return typeof window !== "undefined" ? localStorage.getItem("fp_admin_lang") || "fr" : "fr";
  });
  const [availableLanguages, setAvailableLanguages] = useState<any[]>([
    { code: 'fr', name: 'French', flag: '🇫🇷' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸' },
    { code: 'de', name: 'German', flag: '🇩🇪' }
  ]);

  useEffect(() => {
    apiFetch("/languages")
      .then(r => r.json())
      .then(res => {
        if (res.data && Array.isArray(res.data)) setAvailableLanguages(res.data);
      })
      .catch(() => {});
  }, []);

  const handleLangChange = (code: string) => {
    setSelectedLang(code);
    if (typeof window !== "undefined") localStorage.setItem("fp_admin_lang", code);
  };

  const fetchPublishedLessons = async () => {
    setLoading(true);
    try {
      const res = await apiFetch(`/lessons?language=${selectedLang}&limit=1000`);
      const json = await res.json();
      if (json.success) {
        setPublishedLessons(json.data || []);
      }
    } catch (e) {
      console.error("Failed to fetch published lessons:", e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPublishedLessons();
  }, [selectedLang]);

  // Filter lessons by search query AND active module level
  const filteredLessons = useMemo(() => {
    const list = publishedLessons.filter((l) => {
      const matchSearch =
        (l.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (l.lessonId || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (l.level || "").toLowerCase().includes(searchQuery.toLowerCase());

      const matchModule =
        selectedModule === "ALL" ||
        (l.level || "").toUpperCase().startsWith(selectedModule);

      return matchSearch && matchModule;
    });

    const getSortKey = (id: string, levelStr: string) => {
      const lvlMap: Record<string, number> = { A1: 1, A2: 2, B1: 3, B2: 4, C1: 5, C2: 6 };
      const lvlRank = lvlMap[(levelStr || '').toUpperCase()] || 99;
      const safeId = id || '';
      const chMatch = safeId.match(/ch(\d+)/i);
      const lMatch = safeId.match(/l(\d+)/i);
      const chNum = chMatch ? parseInt(chMatch[1], 10) : 999;
      const lNum = lMatch ? parseInt(lMatch[1], 10) : 999;
      return { lvlRank, chNum, lNum };
    };

    return list.sort((a, b) => {
      const keyA = getSortKey(a.lessonId || a._id, a.level);
      const keyB = getSortKey(b.lessonId || b._id, b.level);
      if (keyA.lvlRank !== keyB.lvlRank) return keyA.lvlRank - keyB.lvlRank;
      if (keyA.chNum !== keyB.chNum) return keyA.chNum - keyB.chNum;
      if (keyA.lNum !== keyB.lNum) return keyA.lNum - keyB.lNum;
      return (a.lessonId || '').localeCompare(b.lessonId || '');
    });
  }, [publishedLessons, searchQuery, selectedModule]);

  // Counts by Module Level
  const levelCounts = useMemo(() => {
    const counts: Record<string, number> = { ALL: publishedLessons.length };
    MODULE_LEVELS.forEach((m) => {
      if (m !== "ALL") {
        counts[m] = publishedLessons.filter((l) =>
          (l.level || "").toUpperCase().startsWith(m)
        ).length;
      }
    });
    return counts;
  }, [publishedLessons]);

  // Selection Logic
  const handleToggleSelectAll = () => {
    if (selectedIds.length === filteredLessons.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredLessons.map((l) => l._id));
    }
  };

  const handleToggleSelectOne = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Open Delete Confirmation Modal for Single Item
  const handlePromptDeleteSingle = (lesson: LessonItem, e: React.MouseEvent) => {
    e.stopPropagation();
    setItemsToDelete([lesson]);
    setDeleteConfirmInput("");
    setDeleteModalOpen(true);
  };

  // Open Delete Confirmation Modal for Bulk Selection
  const handlePromptDeleteSelected = () => {
    const items = publishedLessons.filter((l) => selectedIds.includes(l._id));
    setItemsToDelete(items);
    setDeleteConfirmInput("");
    setDeleteModalOpen(true);
  };

  // Execute Confirmed Delete
  const handleExecuteDelete = async () => {
    if (deleteConfirmInput !== "DELETE") return;
    setDeleting(true);
    setActionStatus({ loading: true, error: "", success: "" });

    try {
      const ids = itemsToDelete.map((item) => item._id);
      const res = await apiFetch("/admin/lessons/bulk-delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lessonIds: ids }),
      });
      const json = await res.json();

      if (json.success) {
        setActionStatus({
          loading: false,
          error: "",
          success: `Successfully deleted ${json.deletedCount || ids.length} published catalog lesson(s).`,
        });
        setSelectedIds([]);
        setSelectedLesson(null);
        setDeleteModalOpen(false);
        fetchPublishedLessons();
      } else {
        setActionStatus({
          loading: false,
          error: json.error || "Failed to delete lessons",
          success: "",
        });
      }
    } catch (e: any) {
      setActionStatus({
        loading: false,
        error: e.message || "Network error during deletion",
        success: "",
      });
    } finally {
      setDeleting(false);
    }
  };

  const bg = dark ? "bg-[#070B17]" : "bg-slate-50";
  const card = dark ? "bg-[#101828]/80 border-[#1e2a4a]" : "bg-white border-slate-200 shadow-sm shadow-slate-200/50";
  const txtSec = dark ? "text-gray-400" : "text-slate-700 font-semibold";
  const inp = `w-full rounded-xl ${dark ? "bg-[#070B17] border-[#1e2a4a] text-white" : "bg-white border-gray-300 text-gray-900"} border px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`;

  if (previewLessonId) {
    return (
      <div className="fixed inset-0 z-50 bg-[#070B17] overflow-y-auto">
        <div className="sticky top-0 z-50 bg-[#101828]/90 border-b border-[#1e2a4a] px-6 py-3 flex items-center justify-between backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
              Published Content Interactive Editor
            </span>
            <span className="text-xs text-gray-400">Click and edit any text directly to make live adjustments.</span>
          </div>
          <button onClick={() => setPreviewLessonId(null)} className="px-4 py-1.5 bg-[#1e2a4a] hover:bg-[#283863] text-white text-xs font-semibold rounded-lg transition-colors">
            Close Preview
          </button>
        </div>
        <div className="p-4 md:p-8">
          <LessonPage lessonId={previewLessonId} onBack={() => setPreviewLessonId(null)} />
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${bg} transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6 pb-20">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <Link to="/admin/pipeline" className={`inline-flex items-center gap-1 text-xs ${txtSec} hover:text-purple-400 transition-colors mb-2`}>
            <ArrowLeft className="w-3 h-3" /> Back to Main Pipeline Workspace
          </Link>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Crown className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent">
                  Published Content Workspace
                </h1>
                <p className={`text-sm ${txtSec} mt-0.5`}>Organized by Module (A1–C2) with protected multi-select management</p>
              </div>
            </div>

            {selectedIds.length > 0 && (
              <button
                onClick={handlePromptDeleteSelected}
                className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-red-600/20 flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete Selected ({selectedIds.length})</span>
              </button>
            )}
          </div>
        </motion.div>

        {/* ─── MODULE LEVEL FILTER TABS ─── */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {MODULE_LEVELS.map((lvl) => {
            const count = levelCounts[lvl] || 0;
            const isSelected = selectedModule === lvl;

            return (
              <button
                key={lvl}
                onClick={() => setSelectedModule(lvl)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-2 border ${
                  isSelected
                    ? "bg-purple-600 text-white border-purple-500 shadow-md shadow-purple-600/20"
                    : dark
                    ? "bg-[#101828]/80 border-[#1e2a4a] text-gray-300 hover:border-purple-500/40"
                    : "bg-white border-slate-200 text-slate-700 hover:border-purple-300"
                }`}
              >
                <span>{lvl === "ALL" ? "All Modules" : `Module ${lvl}`}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                  isSelected ? "bg-white/20 text-white" : dark ? "bg-white/5 text-gray-400" : "bg-slate-100 text-slate-600"
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {actionStatus.success && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> {actionStatus.success}
          </div>
        )}
        {actionStatus.error && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" /> {actionStatus.error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-2 space-y-4">
            <div className={`${card} border rounded-2xl p-5 space-y-4`}>
              {/* Header & Search */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-3">
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleToggleSelectAll}
                    className={`flex items-center gap-1.5 text-xs font-semibold ${dark ? "text-gray-300 hover:text-white" : "text-slate-700 hover:text-slate-900"}`}
                  >
                    {selectedIds.length > 0 && selectedIds.length === filteredLessons.length ? (
                      <CheckSquare className="w-4 h-4 text-purple-500" />
                    ) : (
                      <Square className="w-4 h-4 text-gray-400" />
                    )}
                    <span>Select All ({filteredLessons.length})</span>
                  </button>
                  <span className="text-xs text-gray-500">|</span>
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    {selectedModule === "ALL" ? "All Lessons" : `Module ${selectedModule}`} ({filteredLessons.length})
                  </h3>
                </div>

                <div className="relative w-full sm:w-64">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-gray-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search published catalog..."
                    className={`${inp} pl-8 py-1.5`}
                  />
                </div>
              </div>

              {/* Catalog Item List */}
              {loading ? (
                <div className="py-12 text-center text-gray-500 text-xs flex items-center justify-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin text-amber-400" /> Loading published lessons catalog...
                </div>
              ) : filteredLessons.length === 0 ? (
                <div className="py-12 text-center text-gray-500 text-xs">
                  No published catalog records found for this module filter.
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredLessons.map((l) => {
                    const isSelected = selectedLesson?._id === l._id;
                    const isChecked = selectedIds.includes(l._id);

                    return (
                      <div
                        key={l._id}
                        onClick={() => setSelectedLesson(l)}
                        className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                          isSelected
                            ? "bg-amber-500/10 border-amber-500/40"
                            : "hover:border-amber-500/20"
                        } ${dark ? "bg-[#0c1224] border-[#1e2a4a]" : "bg-white border-gray-200"}`}
                      >
                        {/* Checkbox */}
                        <button
                          onClick={(e) => handleToggleSelectOne(l._id, e)}
                          className="mt-1 flex-shrink-0 text-gray-400 hover:text-purple-400"
                        >
                          {isChecked ? (
                            <CheckSquare className="w-4 h-4 text-purple-500" />
                          ) : (
                            <Square className="w-4 h-4 text-gray-400" />
                          )}
                        </button>

                        <div className="flex-grow flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-400 border border-purple-500/30">
                                {l.level}
                              </span>
                              <span className="text-[10px] font-mono text-gray-400">{l.lessonId}</span>
                            </div>
                            <h4 className="text-xs font-bold text-white mt-1.5">{l.title}</h4>
                            <p className="text-[10px] text-gray-500 mt-1">
                              Last published {(() => {
                                if (!l.updatedAt) return "Live Catalog";
                                const d = new Date(l.updatedAt);
                                return isNaN(d.getTime()) ? "Live Catalog" : d.toLocaleString();
                              })()}
                            </p>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={(e) => handlePromptDeleteSingle(l, e)}
                              className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-all text-xs flex items-center gap-1"
                              title="Delete Published Lesson"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                            <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-emerald-500/10 text-emerald-400">
                              Live Catalog
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Selected Lesson Metadata Drawer */}
          <div className="lg:col-span-1">
            {selectedLesson ? (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className={`${card} border rounded-2xl p-5 space-y-5 sticky top-24`}>
                <div className="border-b pb-3">
                  <span className="text-xs text-gray-400 font-mono">{selectedLesson.lessonId}</span>
                  <h2 className="text-base font-bold text-white mt-1">{selectedLesson.title}</h2>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <button
                      onClick={() => setPreviewLessonId(selectedLesson.lessonId)}
                      className="px-3 py-1 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 text-amber-400 text-xs font-semibold rounded-lg transition-all flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" /> Preview & Interactive View
                    </button>
                    <Link
                      to="/admin/lessons/$id/edit"
                      params={{ id: selectedLesson._id }}
                      className="px-3 py-1 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 text-purple-400 text-xs font-semibold rounded-lg transition-all flex items-center gap-1"
                    >
                      <Edit3 className="w-3.5 h-3.5" /> Edit Full Lesson & Vocab
                    </Link>
                    <button
                      onClick={(e) => handlePromptDeleteSingle(selectedLesson, e as any)}
                      className="px-3 py-1 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 text-xs font-semibold rounded-lg transition-all flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Delete
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Production Status</h3>
                  <div className="p-3 rounded-xl border bg-emerald-500/5 border-emerald-500/10 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-white">Active Production Catalog Record</p>
                      <p className="text-[10px] text-emerald-400/80 mt-0.5">This lesson is live and published. Delete requires typing "DELETE" to confirm.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className={`${card} border rounded-2xl p-6 text-center text-gray-500 text-xs`}>
                Select a live published lesson record to view details or delete.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ─── PROTECTED DELETE CONFIRMATION MODAL ─── */}
      <AnimatePresence>
        {deleteModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`w-full max-w-md p-6 rounded-2xl border ${
                dark ? "bg-[#101828] border-red-500/40 text-white" : "bg-white border-red-300 text-slate-900"
              } shadow-2xl space-y-5`}
            >
              <div className="flex items-center gap-3 text-red-500 border-b border-red-500/20 pb-3">
                <AlertTriangle className="w-6 h-6 shrink-0" />
                <h3 className="text-lg font-bold">Confirm Permanent Deletion</h3>
              </div>

              <div className="space-y-2 text-xs text-gray-400">
                <p>
                  You are about to permanently delete <strong>{itemsToDelete.length}</strong> published catalog lesson(s):
                </p>
                <div className="max-h-32 overflow-y-auto p-2.5 rounded-lg bg-black/30 border border-white/10 space-y-1 font-mono text-[11px]">
                  {itemsToDelete.map((item) => (
                    <div key={item._id} className="text-red-400">
                      • {item.lessonId} — {item.title}
                    </div>
                  ))}
                </div>
                <p className="text-red-400 font-semibold">
                  ⚠️ This action cannot be undone. To prevent accidental deletion, type the word <span className="font-extrabold underline text-white">DELETE</span> in the field below to activate the delete button:
                </p>
              </div>

              <div>
                <input
                  type="text"
                  value={deleteConfirmInput}
                  onChange={(e) => setDeleteConfirmInput(e.target.value)}
                  placeholder="Type DELETE to confirm"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-red-500/10 border border-red-500/40 text-white font-mono font-bold text-center text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2 border-t border-white/10">
                <button
                  onClick={() => setDeleteModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-gray-700 text-white hover:bg-gray-600 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleExecuteDelete}
                  disabled={deleteConfirmInput !== "DELETE" || deleting}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-500 text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-lg shadow-red-600/30 flex items-center gap-2"
                >
                  {deleting ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-3.5 h-3.5" /> Confirm Permanent Delete
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
