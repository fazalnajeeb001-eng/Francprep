import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { apiFetch } from "~/lib/apiFetch";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "~/lib/ThemeContext";
import {
  ArrowLeft, Wand2, CheckCircle2, AlertCircle, Trash2,
  RefreshCw, Eye, AlertTriangle, Database, Search, Sparkles
} from "lucide-react";
import { LessonPage } from "~/components/content/LessonPage";

export const Route = createFileRoute("/admin/pipeline/integrated")({ component: IntegratedDraftsSubSectionPage });

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

function IntegratedDraftsSubSectionPage() {
  const { dark } = useTheme();
  const [drafts, setDrafts] = useState<DraftItem[]>([]);
  const [selectedDraft, setSelectedDraft] = useState<DraftItem | null>(null);
  const [previewDraftId, setPreviewDraftId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [mergeLoading, setMergeLoading] = useState(false);
  const [actionStatus, setActionStatus] = useState({ loading: false, error: "", success: "" });

  const fetchDrafts = async () => {
    setLoading(true);
    try {
      const res = await apiFetch("/admin/content-pipeline/drafts?limit=500");
      const json = await res.json();
      if (json.success) {
        setDrafts(json.data || []);
      }
    } catch (e) {
      console.error('Failed to fetch integrated drafts:', e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDrafts();
  }, []);

  const integratedDrafts = drafts.filter(
    (d) => d.status !== "superseded" && d.status !== "published" && d.origin === "ai_generator"
  );

  const filteredDrafts = integratedDrafts.filter(d => 
    (d.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (d.lessonId || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (d.level || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleMerge = async (id: string) => {
    setMergeLoading(true);
    setActionStatus({ loading: true, error: "", success: "" });
    try {
      const res = await apiFetch(`/admin/content-pipeline/drafts/${id}/merge`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      const json = await res.json();
      if (json.success) {
        setActionStatus({ loading: false, error: "", success: "Integrated AI additions merged cleanly into lesson template!" });
        fetchDrafts();
      } else {
        setActionStatus({ loading: false, error: json.error || "Merge failed", success: "" });
      }
    } catch (e: any) {
      setActionStatus({ loading: false, error: e.message || "Network error", success: "" });
    }
    setMergeLoading(false);
  };

  const handleDelete = async (id: string) => {
    setActionStatus({ loading: true, error: "", success: "" });
    try {
      const res = await apiFetch(`/admin/content-pipeline/drafts/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        setActionStatus({ loading: false, error: "", success: "Integrated draft deleted." });
        setDeleteConfirmId(null);
        setSelectedDraft(null);
        fetchDrafts();
      } else {
        setActionStatus({ loading: false, error: json.error || "Delete failed", success: "" });
      }
    } catch (e: any) {
      setActionStatus({ loading: false, error: e.message || "Network error", success: "" });
    }
  };

  const bg = dark ? "bg-[#070B17]" : "bg-gray-50";
  const card = dark ? "bg-[#101828]/80 border-[#1e2a4a]" : "bg-white/80 border-gray-200";
  const txtSec = dark ? "text-gray-400" : "text-gray-500";
  const inp = `w-full rounded-xl ${dark ? "bg-[#070B17] border-[#1e2a4a] text-white" : "bg-white border-gray-300 text-gray-900"} border px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`;

  if (previewDraftId) {
    return (
      <div className="fixed inset-0 z-50 bg-[#070B17] overflow-y-auto">
        <div className="sticky top-0 z-50 bg-[#101828]/90 border-b border-[#1e2a4a] px-6 py-3 flex items-center justify-between backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30">
              Integrated Draft Preview
            </span>
            <span className="text-xs text-gray-400">Preview AI addition content before merging.</span>
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
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Wand2 className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Integrated Drafts Sub-Section
              </h1>
              <p className={`text-sm ${txtSec} mt-0.5`}>AI-generated additions and exercise expansion drafts</p>
            </div>
          </div>
        </motion.div>

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
              <div className="flex items-center justify-between border-b pb-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Database className="w-4 h-4 text-purple-400" /> Integrated AI Records ({filteredDrafts.length})
                </h3>
                <div className="relative w-48 sm:w-64">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-gray-500" />
                  <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search AI additions..." className={`${inp} pl-8 py-1.5`} />
                </div>
              </div>

              {loading ? (
                <div className="py-12 text-center text-gray-500 text-xs flex items-center justify-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin text-purple-400" /> Loading integrated AI additions archive...
                </div>
              ) : filteredDrafts.length === 0 ? (
                <div className="py-12 text-center text-gray-500 text-xs">
                  No integrated AI drafts found matching query.
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredDrafts.map((d) => {
                    const isSelected = selectedDraft?._id === d._id;
                    return (
                      <div key={d._id} onClick={() => setSelectedDraft(d)}
                        className={`p-4 rounded-xl border cursor-pointer transition-all ${
                          isSelected ? "bg-purple-500/10 border-purple-500/40" : "hover:border-purple-500/20"
                        } ${dark ? "bg-[#0c1224] border-[#1e2a4a]" : "bg-white border-gray-200"}`}>
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-400">{d.level}</span>
                              <span className="text-[10px] font-mono text-gray-400">{d.lessonId}</span>
                            </div>
                            <h4 className="text-xs font-bold text-white mt-1.5">{d.title}</h4>
                            <p className="text-[10px] text-gray-500 mt-1">Generated {new Date(d.updatedAt).toLocaleString()}</p>
                          </div>
                          <span className="text-[9px] px-2 py-0.5 rounded bg-purple-600/20 text-purple-300 font-bold">AI Addition</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            {selectedDraft ? (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className={`${card} border rounded-2xl p-5 space-y-5 sticky top-24`}>
                <div className="border-b pb-3">
                  <span className="text-xs text-gray-400 font-mono">{selectedDraft.lessonId}</span>
                  <h2 className="text-base font-bold text-white mt-1">{selectedDraft.title}</h2>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <button onClick={() => setPreviewDraftId(selectedDraft._id)}
                      className="px-3 py-1 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 text-purple-400 text-xs font-semibold rounded-lg transition-all flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" /> Preview Addition
                    </button>
                  </div>
                </div>

                <div className="p-3 bg-purple-500/5 border border-purple-500/10 rounded-xl space-y-2">
                  <div className="text-xs font-bold text-purple-400 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Template Merge Logic</span>
                  </div>
                  <p className="text-[10px] text-gray-400 leading-relaxed">
                    Clicking "Merge with Lesson Template" appends new non-duplicate exercises and vocabulary to the canonical lesson shape without altering structure.
                  </p>
                </div>

                <div className="flex gap-2 border-t pt-4">
                  <button onClick={() => handleMerge(selectedDraft._id)} disabled={mergeLoading}
                    className="flex-1 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-1">
                    {mergeLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                    <span>Merge into Template</span>
                  </button>
                  <button onClick={() => setDeleteConfirmId(selectedDraft._id)}
                    className="p-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-xs rounded-xl transition-all"
                    title="Delete Draft">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ) : (
              <div className={`${card} border rounded-2xl p-6 text-center text-gray-500 text-xs`}>
                Select an integrated draft record to view merge options.
              </div>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {deleteConfirmId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className={`${card} border rounded-2xl max-w-sm w-full p-5 space-y-4 shadow-2xl`}>
              <div className="text-center">
                <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-2" />
                <h3 className="text-base font-bold text-white">Delete Integrated Draft?</h3>
                <p className="text-xs text-gray-400 mt-2">This action is permanent and cannot be undone.</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setDeleteConfirmId(null)} className="flex-1 py-2 bg-[#1e2a4a] text-gray-300 text-xs font-semibold rounded-lg">Cancel</button>
                <button onClick={() => handleDelete(deleteConfirmId)} className="flex-1 py-2 bg-red-600 text-white text-xs font-bold rounded-lg">Confirm Delete</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
