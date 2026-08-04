import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useMemo } from "react";
import { apiFetch } from "~/lib/apiFetch";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "~/lib/ThemeContext";
import {
  ArrowLeft, FileText, CheckCircle2, AlertCircle, Trash2,
  RefreshCw, Eye, AlertTriangle, CheckCircle, Database, Search, Edit3, CheckSquare, Square, Save, X
} from "lucide-react";
import { LessonPage } from "~/components/content/LessonPage";

export const Route = createFileRoute("/admin/pipeline/drafts")({ component: DraftsSubSectionPage });

interface DraftItem {
  _id: string;
  lessonId: string;
  chapterId?: string;
  level: string;
  title: string;
  content: string;
  parsedData?: any;
  validationErrors: string[];
  validationWarnings: string[];
  status: 'draft' | 'review' | 'validated' | 'imported' | 'published' | 'rejected' | 'superseded';
  origin: 'structural' | 'ai_polish' | 'paste_import' | 'ai_generator';
  version: number;
  createdBy: string;
  updatedAt: string;
}

const MODULE_LEVELS = ["ALL", "A1", "A2", "B1", "B2", "C1", "C2"];

function DraftsSubSectionPage() {
  const { dark } = useTheme();
  const [drafts, setDrafts] = useState<DraftItem[]>([]);
  const [selectedDraft, setSelectedDraft] = useState<DraftItem | null>(null);
  const [previewDraftId, setPreviewDraftId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedModule, setSelectedModule] = useState<string>("ALL");

  // Selection & Modal States
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [publishConfirmId, setPublishConfirmId] = useState<string | null>(null);
  const [publishWordInput, setPublishWordInput] = useState("");
  
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemsToDelete, setItemsToDelete] = useState<DraftItem[]>([]);
  const [deleteConfirmInput, setDeleteConfirmInput] = useState("");
  const [deleting, setDeleting] = useState(false);

  // Edit Modal State
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editDraftForm, setEditDraftForm] = useState({
    id: "",
    lessonId: "",
    title: "",
    level: "A1",
    content: "",
  });
  const [savingDraft, setSavingDraft] = useState(false);

  // Safety Confirmation
  const [actionStatus, setActionStatus] = useState({ loading: false, error: "", success: "" });
  const [isSelectMode, setIsSelectMode] = useState(false);

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

  const fetchDrafts = async () => {
    setLoading(true);
    try {
      const res = await apiFetch(`/admin/content-pipeline/drafts?language=${selectedLang}&limit=1000`);
      const json = await res.json();
      if (json.success) {
        setDrafts(json.data || []);
      }
    } catch (e) {
      console.error("Failed to fetch drafts:", e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDrafts();
  }, [selectedLang]);

  // Group active staged drafts by lessonId
  const stagedDrafts = useMemo(() => {
    return Object.values(
      drafts
        .filter((d) => d.status !== "superseded" && d.status !== "published" && d.origin !== "ai_generator")
        .reduce((acc, current) => {
          const lessonId = current.lessonId || current.parsedData?.lessonId;
          const key = lessonId && String(lessonId).trim()
            ? String(lessonId).trim().toLowerCase()
            : (current.title ? `${current.level || 'A1'}-${current.title}` : current._id).toString().toLowerCase();
          const existing = acc[key];
          if (!existing || new Date(current.updatedAt).getTime() > new Date(existing.updatedAt).getTime()) {
            acc[key] = current;
          }
          return acc;
        }, {} as Record<string, typeof drafts[0]>)
    );
  }, [drafts]);

  // Filter drafts by search query AND active module level
  const filteredDrafts = useMemo(() => {
    const list = stagedDrafts.filter((d) => {
      const matchSearch =
        (d.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (d.lessonId || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (d.level || "").toLowerCase().includes(searchQuery.toLowerCase());

      const matchModule =
        selectedModule === "ALL" ||
        (d.level || "").toUpperCase().startsWith(selectedModule);

      return matchSearch && matchModule;
    });

    const getSortKey = (id: string, levelStr: string) => {
      const lvlMap: Record<string, number> = { A1: 1, A2: 2, B1: 3, B2: 4, C1: 5, C2: 6 };
      const lvlRank = lvlMap[(levelStr || '').toUpperCase()] || 99;
      const chMatch = (id || '').match(/ch(\d+)/i);
      const lMatch = (id || '').match(/l(\d+)/i);
      const chNum = chMatch ? parseInt(chMatch[1], 10) : 999;
      const lNum = lMatch ? parseInt(lMatch[1], 10) : 999;
      return { lvlRank, chNum, lNum };
    };

    return list.sort((a, b) => {
      const keyA = getSortKey(a.lessonId, a.level);
      const keyB = getSortKey(b.lessonId, b.level);
      if (keyA.lvlRank !== keyB.lvlRank) return keyA.lvlRank - keyB.lvlRank;
      if (keyA.chNum !== keyB.chNum) return keyA.chNum - keyB.chNum;
      if (keyA.lNum !== keyB.lNum) return keyA.lNum - keyB.lNum;
      return (a.lessonId || '').localeCompare(b.lessonId || '');
    });
  }, [stagedDrafts, searchQuery, selectedModule]);

  // Level counts
  const levelCounts = useMemo(() => {
    const counts: Record<string, number> = { ALL: stagedDrafts.length };
    MODULE_LEVELS.forEach((m) => {
      if (m !== "ALL") {
        counts[m] = stagedDrafts.filter((d) =>
          (d.level || "").toUpperCase().startsWith(m)
        ).length;
      }
    });
    return counts;
  }, [stagedDrafts]);

  // Selection Logic
  const handleToggleSelectAll = () => {
    if (selectedIds.length === filteredDrafts.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredDrafts.map((d) => d._id));
    }
  };

  const handleToggleSelectOne = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Open Edit Draft Modal
  const handleOpenEditModal = (draft: DraftItem, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setEditDraftForm({
      id: draft._id,
      lessonId: draft.lessonId || "",
      title: draft.title || "",
      level: draft.level || "A1",
      content: draft.content || (draft.parsedData ? JSON.stringify(draft.parsedData, null, 2) : ""),
    });
    setEditModalOpen(true);
  };

  // Save Draft Modifications
  const handleSaveDraftEdit = async () => {
    setSavingDraft(true);
    setActionStatus({ loading: true, error: "", success: "" });

    try {
      let parsedJson: any = null;
      try {
        parsedJson = JSON.parse(editDraftForm.content);
      } catch (err) {
        // Content is markdown or non-JSON text
      }

      const res = await apiFetch(`/admin/content-pipeline/drafts/${editDraftForm.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: editDraftForm.title,
          level: editDraftForm.level,
          lessonId: editDraftForm.lessonId,
          content: editDraftForm.content,
          parsedData: parsedJson || undefined,
        }),
      });

      const json = await res.json();
      if (json.success) {
        setActionStatus({
          loading: false,
          error: "",
          success: `Draft ${editDraftForm.lessonId} saved successfully! Schema errors: ${json.data?.validationErrors?.length || 0}.`,
        });
        setEditModalOpen(false);
        if (selectedDraft?._id === editDraftForm.id) {
          setSelectedDraft(json.data);
        }
        fetchDrafts();
      } else {
        setActionStatus({
          loading: false,
          error: json.error || "Failed to update draft",
          success: "",
        });
      }
    } catch (e: any) {
      setActionStatus({
        loading: false,
        error: e.message || "Network error while saving draft",
        success: "",
      });
    } finally {
      setSavingDraft(false);
    }
  };

  // Single Delete Prompt
  const handlePromptDeleteSingle = (draft: DraftItem, e: React.MouseEvent) => {
    e.stopPropagation();
    setItemsToDelete([draft]);
    setDeleteConfirmInput("");
    setDeleteModalOpen(true);
  };

  // Bulk Delete Prompt
  const handlePromptDeleteSelected = () => {
    const items = stagedDrafts.filter((d) => selectedIds.includes(d._id));
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
      let count = 0;
      for (const item of itemsToDelete) {
        const res = await apiFetch(`/admin/content-pipeline/drafts/${item._id}`, { method: "DELETE" });
        const json = await res.json();
        if (json.success) count++;
      }

      setActionStatus({
        loading: false,
        error: "",
        success: `Successfully deleted ${count} draft record(s).`,
      });
      setSelectedIds([]);
      setSelectedDraft(null);
      setDeleteModalOpen(false);
      fetchDrafts();
    } catch (e: any) {
      setActionStatus({
        loading: false,
        error: e.message || "Network error during draft deletion",
        success: "",
      });
    } finally {
      setDeleting(false);
    }
  };

  // Published Confirmation & Verification States
  const [publishConfirmItem, setPublishConfirmItem] = useState<{
    type: 'single' | 'chapter';
    draftId?: string;
    chapterId?: string;
    title: string;
    lessonId?: string;
    draftIds?: string[];
  } | null>(null);

  const [publishedSuccessItem, setPublishedSuccessItem] = useState<{
    lessonId: string;
    title: string;
    publishedAt: string;
  } | null>(null);

  // Execute Publish (Single Lesson or Full Chapter)
  const handlePublishExecute = async () => {
    if (!publishConfirmItem && !publishConfirmId) return;
    setActionStatus({ loading: true, error: "", success: "" });
    try {
      if (publishConfirmItem?.type === "chapter" && publishConfirmItem.draftIds?.length) {
        const res = await apiFetch("/admin/content-pipeline/drafts/publish-bulk", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ids: publishConfirmItem.draftIds }),
        });
        const json = await res.json();
        if (json.success) {
          const firstItem = json.publishedLessons?.[0];
          setPublishedSuccessItem({
            lessonId: firstItem?.lessonId || publishConfirmItem.lessonId || "a1-ch1-l1",
            title: `Entire Chapter (${json.count} Lessons Published)`,
            publishedAt: new Date().toLocaleTimeString(),
          });
          setActionStatus({ loading: false, error: "", success: `All ${json.count} lessons of chapter published successfully!` });
          setPublishConfirmItem(null);
          setPublishConfirmId(null);
          setPublishWordInput("");
          setSelectedDraft(null);
          fetchDrafts();
        } else {
          setActionStatus({ loading: false, error: json.error || "Chapter publish failed", success: "" });
        }
      } else {
        const targetId = publishConfirmItem?.draftId || publishConfirmId;
        const res = await apiFetch(`/admin/content-pipeline/drafts/${targetId}/publish`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ confirm: true }),
        });
        const json = await res.json();
        if (json.success) {
          setPublishedSuccessItem({
            lessonId: json.data?.lessonId || publishConfirmItem?.lessonId || selectedDraft?.lessonId || targetId || "",
            title: json.data?.title || publishConfirmItem?.title || selectedDraft?.title || "Lesson",
            publishedAt: new Date().toLocaleTimeString(),
          });
          setActionStatus({ loading: false, error: "", success: `Draft ${json.data?.lessonId || targetId} published successfully!` });
          setPublishConfirmItem(null);
          setPublishConfirmId(null);
          setPublishWordInput("");
          setSelectedDraft(null);
          fetchDrafts();
        } else {
          setActionStatus({ loading: false, error: json.error || "Publishing failed", success: "" });
        }
      }
    } catch (e: any) {
      setActionStatus({ loading: false, error: e.message || "Network error", success: "" });
    }
  };

  const bg = dark ? "bg-[#070B17]" : "bg-slate-50";
  const card = dark ? "bg-[#101828]/80 border-[#1e2a4a]" : "bg-white border-slate-200 shadow-sm shadow-slate-200/50";
  const txtSec = dark ? "text-gray-400" : "text-slate-700 font-semibold";
  const inp = `w-full rounded-xl ${dark ? "bg-[#070B17] border-[#1e2a4a] text-white" : "bg-white border-gray-300 text-gray-900"} border px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`;

  if (previewDraftId) {
    return (
      <div className="fixed inset-0 z-50 bg-[#070B17] overflow-y-auto">
        <div className="sticky top-0 z-50 bg-[#101828]/90 border-b border-[#1e2a4a] px-6 py-3 flex items-center justify-between backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30">
              Draft Interactive View
            </span>
            <span className="text-xs text-gray-400">Previewing draft content.</span>
          </div>
          <button onClick={() => setPreviewDraftId(null)} className="px-4 py-1.5 bg-[#1e2a4a] hover:bg-[#283863] text-white text-xs font-semibold rounded-lg transition-colors">
            Close Preview
          </button>
        </div>
        <div className="p-4 md:p-8">
          <LessonPage draftId={previewDraftId} onBack={() => setPreviewDraftId(null)} />
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
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Staged Drafts Workspace
                </h1>
                <p className={`text-sm ${txtSec} mt-0.5`}>Organized by Module (A1–C2) with live editing & protected management</p>
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

        {/* ─── MODULE LEVEL & TARGET LANGUAGE FILTER TABS ─── */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-1">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
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

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-purple-400">Target Language:</span>
            <select
              value={selectedLang}
              onChange={(e) => handleLangChange(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-purple-500/40 bg-[#101828] text-purple-300 text-xs font-bold outline-none cursor-pointer hover:border-purple-400"
            >
              {availableLanguages.map((l) => (
                <option key={l.code} value={l.code} className="bg-[#101828] text-white">
                  {l.flag || '🌐'} {l.name} ({l.code.toUpperCase()})
                </option>
              ))}
            </select>
          </div>
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
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => {
                      setIsSelectMode(!isSelectMode);
                      if (isSelectMode) setSelectedIds([]);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 border ${
                      isSelectMode
                        ? "bg-purple-600 text-white border-purple-500 shadow"
                        : dark ? "bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700" : "bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200"
                    }`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>{isSelectMode ? "Exit Select Mode" : "Select / Bulk Delete 🗑️"}</span>
                  </button>

                  {isSelectMode && (
                    <button
                      onClick={handleToggleSelectAll}
                      className={`flex items-center gap-1.5 text-xs font-semibold ${dark ? "text-gray-300 hover:text-white" : "text-slate-700 hover:text-slate-900"}`}
                    >
                      {selectedIds.length > 0 && selectedIds.length === filteredDrafts.length ? (
                        <CheckSquare className="w-4 h-4 text-purple-500" />
                      ) : (
                        <Square className="w-4 h-4 text-gray-400" />
                      )}
                      <span>Select All ({filteredDrafts.length})</span>
                    </button>
                  )}

                  <span className="text-xs text-gray-500">|</span>
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    {selectedModule === "ALL" ? "All Drafts" : `Module ${selectedModule}`} ({filteredDrafts.length})
                  </h3>
                </div>

                <div className="relative w-full sm:w-64">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-gray-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search drafts..."
                    className={`${inp} pl-8 py-1.5`}
                  />
                </div>
              </div>

              {/* Draft List */}
              {loading ? (
                <div className="py-12 text-center text-gray-500 text-xs flex items-center justify-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin text-purple-400" /> Loading drafts archive...
                </div>
              ) : filteredDrafts.length === 0 ? (
                <div className="py-12 text-center text-gray-500 text-xs">
                  No staged drafts found for this module filter.
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredDrafts.map((d) => {
                    const isSelected = selectedDraft?._id === d._id;
                    const isChecked = selectedIds.includes(d._id);
                    const errors = d.validationErrors?.length || 0;

                    return (
                      <div
                        key={d._id}
                        onClick={(e) => {
                          if (isSelectMode) {
                            handleToggleSelectOne(d._id, e);
                          } else {
                            setSelectedDraft(d);
                          }
                        }}
                        className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                          isChecked
                            ? "bg-purple-500/20 border-purple-500 shadow-md"
                            : isSelected
                            ? "bg-purple-500/10 border-purple-500/40"
                            : "hover:border-purple-500/20"
                        } ${dark ? "bg-[#0c1224] border-[#1e2a4a]" : "bg-white border-gray-200"}`}
                      >
                        {/* Checkbox (Only visible in Select Mode) */}
                        {isSelectMode && (
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={(e) => handleToggleSelectOne(d._id, e as any)}
                            onClick={(e) => e.stopPropagation()}
                            className="w-5 h-5 mt-0.5 accent-purple-500 cursor-pointer rounded shrink-0"
                          />
                        )}

                        <div className="flex-grow flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-400 border border-purple-500/30">
                                {d.level}
                              </span>
                              <span className="text-[10px] font-mono text-gray-400">{d.lessonId}</span>
                              <span className="text-[9px] px-1.5 py-0.5 rounded bg-gray-500/10 text-gray-400">v{d.version}</span>
                            </div>
                            <h4 className="text-xs font-bold text-white mt-1.5">{d.title}</h4>
                            <p className="text-[10px] text-gray-500 mt-1">
                              Updated {(() => {
                                if (!d.updatedAt) return "Recently";
                                const dt = new Date(d.updatedAt);
                                return isNaN(dt.getTime()) ? "Recently" : dt.toLocaleString();
                              })()}
                            </p>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={(e) => handleOpenEditModal(d, e)}
                              className="p-1.5 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 border border-purple-500/20 transition-all text-xs flex items-center gap-1"
                              title="Edit Draft Content"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={(e) => handlePromptDeleteSingle(d, e)}
                              className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-all text-xs flex items-center gap-1"
                              title="Delete Staged Draft"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                              errors === 0 ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"
                            }`}>
                              {errors === 0 ? "✓ Valid Schema" : `❌ ${errors} Errors`}
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

          {/* Selected Draft Details Drawer */}
          {(() => {
            const siblingDrafts = selectedDraft
              ? drafts.filter((d) => d.status !== "superseded" && d.status !== "published" && d.lessonId.startsWith(selectedDraft.lessonId.replace(/-l\d+$/i, "")))
              : [];

            return (
              <div className="lg:col-span-1">
                {selectedDraft ? (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className={`${card} border rounded-2xl p-5 space-y-5 sticky top-24`}>
                <div className="border-b pb-3">
                  <span className="text-xs text-gray-400 font-mono">{selectedDraft.lessonId}</span>
                  <h2 className="text-base font-bold text-white mt-1">{selectedDraft.title}</h2>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <button
                      onClick={() => handleOpenEditModal(selectedDraft)}
                      className="px-3 py-1 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 text-purple-400 text-xs font-semibold rounded-lg transition-all flex items-center gap-1"
                    >
                      <Edit3 className="w-3.5 h-3.5" /> Edit Draft Content
                    </button>
                    <button
                      onClick={() => setPreviewDraftId(selectedDraft._id)}
                      className="px-3 py-1 bg-gray-500/10 hover:bg-gray-500/20 border border-gray-500/20 text-gray-300 text-xs font-semibold rounded-lg transition-all flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" /> Preview
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Validation Status</h3>
                  <div className={`p-3 rounded-xl border flex items-start gap-2.5 ${selectedDraft.validationErrors.length === 0 ? 'bg-emerald-500/5 border-emerald-500/10' : 'bg-red-500/5 border-red-500/10'}`}>
                    {selectedDraft.validationErrors.length === 0 ? <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" /> : <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />}
                    <div>
                      <p className="text-xs font-bold text-white">Schema Compliance</p>
                      {selectedDraft.validationErrors.length === 0 ? (
                        <p className="text-[10px] text-emerald-400/80 mt-0.5">Complies perfectly with lesson schema rules.</p>
                      ) : (
                        <div className="space-y-1 mt-1">
                          {selectedDraft.validationErrors.slice(0, 3).map((err, i) => (
                            <p key={i} className="text-[9px] text-red-400/90 font-mono leading-relaxed">{err}</p>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-2 border-t pt-4">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button
                      onClick={() => setPublishConfirmItem({
                        type: 'single',
                        draftId: selectedDraft._id,
                        title: selectedDraft.title,
                        lessonId: selectedDraft.lessonId,
                      })}
                      disabled={selectedDraft.validationErrors.length > 0}
                      className="flex-1 py-2.5 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-400 hover:to-green-400 disabled:opacity-30 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-emerald-500/10 flex items-center justify-center gap-1.5"
                    >
                      <CheckCircle className="w-4 h-4" /> Publish Lesson Only
                    </button>

                    {siblingDrafts.length > 1 && (
                      <button
                        onClick={() => setPublishConfirmItem({
                          type: 'chapter',
                          title: `Entire Chapter (${siblingDrafts.length} Lessons)`,
                          lessonId: selectedDraft.lessonId,
                          draftIds: siblingDrafts.map((d: any) => d._id),
                        })}
                        className="flex-1 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-extrabold rounded-xl transition-all shadow-md shadow-purple-500/20 flex items-center justify-center gap-1.5"
                      >
                        <Database className="w-4 h-4 text-purple-300" /> Publish Entire Chapter ({siblingDrafts.length} Lessons)
                      </button>
                    )}

                    <button
                      onClick={(e) => handlePromptDeleteSingle(selectedDraft, e as any)}
                      className="p-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-xs rounded-xl transition-all flex items-center justify-center"
                      title="Delete Draft"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className={`${card} border rounded-2xl p-6 text-center text-gray-500 text-xs`}>
                Select a draft record to view metadata, edit, publish, or delete.
              </div>
            )}
            </div>
          );
        })()}
        </div>
      </div>

      {/* ─── LIVE DRAFT EDITOR MODAL ─── */}
      <AnimatePresence>
        {editModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className={`w-full max-w-3xl p-6 rounded-2xl border ${
                dark ? "bg-[#101828] border-purple-500/40 text-white" : "bg-white border-purple-300 text-slate-900"
              } shadow-2xl space-y-4`}
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <Edit3 className="w-5 h-5 text-purple-400" />
                  <h3 className="text-lg font-bold">Edit Staged Draft Content & Data</h3>
                </div>
                <button
                  onClick={() => setEditModalOpen(false)}
                  className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-1">Lesson ID</label>
                  <input
                    type="text"
                    value={editDraftForm.lessonId}
                    onChange={(e) => setEditDraftForm({ ...editDraftForm, lessonId: e.target.value })}
                    className={inp}
                    placeholder="e.g. a1-ch1-l1"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-1">Title</label>
                  <input
                    type="text"
                    value={editDraftForm.title}
                    onChange={(e) => setEditDraftForm({ ...editDraftForm, title: e.target.value })}
                    className={inp}
                    placeholder="Lesson Title"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-1">Module Level</label>
                  <select
                    value={editDraftForm.level}
                    onChange={(e) => setEditDraftForm({ ...editDraftForm, level: e.target.value })}
                    className={inp}
                  >
                    {MODULE_LEVELS.filter((m) => m !== "ALL").map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 mb-1">
                  Draft Content (Markdown / JSON)
                </label>
                <textarea
                  rows={14}
                  value={editDraftForm.content}
                  onChange={(e) => setEditDraftForm({ ...editDraftForm, content: e.target.value })}
                  className={`${inp} font-mono text-xs leading-relaxed`}
                  placeholder="Paste or edit raw draft markdown / JSON content..."
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2 border-t border-white/10">
                <button
                  onClick={() => setEditModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-gray-700 text-white hover:bg-gray-600 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveDraftEdit}
                  disabled={savingDraft}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white transition-all shadow-lg shadow-purple-600/30 flex items-center gap-2 disabled:opacity-40"
                >
                  {savingDraft ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-3.5 h-3.5" /> Save Draft Changes
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ─── PROTECTED PUBLISH CONFIRMATION MODAL ─── */}
      <AnimatePresence>
        {(publishConfirmItem || publishConfirmId) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className={`${card} border border-emerald-500/40 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl`}>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-base font-extrabold text-white">
                  {publishConfirmItem?.type === "chapter" ? "Confirm Full Chapter Publish" : "Confirm Single Lesson Publish"}
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  {publishConfirmItem?.type === "chapter"
                    ? `You are about to publish all ${publishConfirmItem.draftIds?.length} lessons of this chapter directly to live production.`
                    : "You are about to publish this lesson draft directly to the live student catalog."}
                </p>

                <div className="mt-3 p-3 bg-black/40 border border-white/10 rounded-xl text-left font-mono text-xs space-y-1">
                  {publishConfirmItem?.type === "chapter" ? (
                    <>
                      <p className="text-purple-400 font-bold">• Mode: Full Chapter Batch Publish</p>
                      <p className="text-emerald-400 font-bold">• Total Lessons: {publishConfirmItem.draftIds?.length} Lessons</p>
                      <p className="text-gray-300">• Target: Live Production DB</p>
                    </>
                  ) : (
                    <>
                      <p className="text-emerald-400 font-bold">• Target Lesson ID: {publishConfirmItem?.lessonId || selectedDraft?.lessonId || publishConfirmId}</p>
                      <p className="text-gray-300">• Title: "{publishConfirmItem?.title || selectedDraft?.title || 'Lesson'}"</p>
                      <p className="text-amber-400 font-semibold">• Target Catalog: Live Production DB</p>
                    </>
                  )}
                </div>

                <div className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-left">
                  <label className="block text-[11px] font-extrabold text-emerald-400 mb-1.5 text-center">
                    Type <span className="underline text-white">PUBLISH</span> in all caps to unlock publish button:
                  </label>
                  <input
                    type="text"
                    value={publishWordInput}
                    onChange={(e) => setPublishWordInput(e.target.value)}
                    className="w-full rounded-xl bg-black border border-emerald-500/50 px-3 py-2 text-sm text-white uppercase focus:outline-none font-mono text-center font-extrabold tracking-widest focus:ring-2 focus:ring-emerald-500"
                    placeholder="PUBLISH"
                  />
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <button onClick={() => { setPublishConfirmItem(null); setPublishConfirmId(null); setPublishWordInput(""); }} className="flex-1 py-2.5 bg-[#1e2a4a] hover:bg-[#283863] text-gray-300 text-xs font-semibold rounded-xl transition-all">Cancel</button>
                <button onClick={handlePublishExecute} disabled={publishWordInput !== "PUBLISH"} className="flex-1 py-2.5 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-400 hover:to-green-400 disabled:opacity-30 disabled:cursor-not-allowed text-white text-xs font-extrabold rounded-xl shadow-lg shadow-emerald-500/20 transition-all">Confirm & Deploy Live</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ─── LIVE PRODUCTION SUCCESS VERIFICATION MODAL ─── */}
      <AnimatePresence>
        {publishedSuccessItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className={`${card} border border-emerald-500/50 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl text-center`}>
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                <CheckCircle2 className="w-8 h-8 text-emerald-400" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 uppercase tracking-wider">
                  🟢 Live Production Update Successful
                </span>
                <h3 className="text-base font-extrabold text-white mt-2">Lesson is Now Live for Students!</h3>
                <p className="text-xs text-gray-400 mt-1">
                  The lesson draft has been compiled, validated, and deployed to live production.
                </p>
              </div>

              <div className="p-3.5 bg-black/50 border border-emerald-500/30 rounded-xl text-left font-mono text-xs space-y-1">
                <p className="text-emerald-400 font-bold">• Lesson ID: {publishedSuccessItem.lessonId}</p>
                <p className="text-white font-semibold">• Title: "{publishedSuccessItem.title}"</p>
                <p className="text-gray-400">• Live Status: 🟢 Active in Student Catalog</p>
                <p className="text-gray-400">• Published At: {publishedSuccessItem.publishedAt}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <Link
                  to={`/lessons/${publishedSuccessItem.lessonId}`}
                  target="_blank"
                  className="flex-1 py-2.5 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white text-xs font-extrabold rounded-xl shadow-lg shadow-purple-500/25 flex items-center justify-center gap-1.5 transition-all"
                >
                  <Eye className="w-4 h-4 text-purple-300" /> 👁️ View Live Lesson in Production
                </Link>
                <button
                  onClick={() => setPublishedSuccessItem(null)}
                  className="px-5 py-2.5 bg-[#1e2a4a] hover:bg-[#283863] text-white text-xs font-bold rounded-xl transition-all"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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
                  You are about to permanently delete <strong>{itemsToDelete.length}</strong> staged draft record(s):
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
