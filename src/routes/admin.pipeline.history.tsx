import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { apiFetch } from "~/lib/apiFetch";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "~/lib/ThemeContext";
import {
  ArrowLeft, History, CheckCircle2, RefreshCw, Eye, AlertTriangle, Database, Search, Edit3
} from "lucide-react";
import { LessonPage } from "~/components/content/LessonPage";

export const Route = createFileRoute("/admin/pipeline/history")({ component: PublishedHistorySubSectionPage });

interface HistoryDraftItem {
  _id: string;
  lessonId: string;
  chapterId?: string;
  level: string;
  title: string;
  parsedData?: any;
  status: string;
  version: number;
  createdBy: string;
  updatedAt: string;
}

function PublishedHistorySubSectionPage() {
  const { dark } = useTheme();
  const [historyDrafts, setHistoryDrafts] = useState<HistoryDraftItem[]>([]);
  const [selectedHistory, setSelectedHistory] = useState<HistoryDraftItem | null>(null);
  const [previewDraftId, setPreviewDraftId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [restoreConfirmId, setRestoreConfirmId] = useState<string | null>(null);
  const [actionStatus, setActionStatus] = useState({ loading: false, error: "", success: "" });

  const fetchHistoryDrafts = async () => {
    setLoading(true);
    try {
      const res = await apiFetch("/admin/content-pipeline/drafts");
      const json = await res.json();
      if (json.success) {
        // Includes past published and superseded versions
        const historyList = (json.data || []).filter(
          (d: HistoryDraftItem) => d.status === 'superseded' || d.status === 'published'
        );
        setHistoryDrafts(historyList);
      }
    } catch (e) {
      console.error('Failed to fetch history drafts:', e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchHistoryDrafts();
  }, []);

  const filteredHistory = historyDrafts.filter(h =>
    (h.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (h.lessonId || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (h.level || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRestore = async (id: string) => {
    setActionStatus({ loading: true, error: "", success: "" });
    try {
      const res = await apiFetch(`/admin/content-pipeline/drafts/${id}/restore`, { method: "POST" });
      const json = await res.json();
      if (json.success) {
        setActionStatus({ loading: false, error: "", success: `Lesson version restored & re-published to live catalog!` });
        setRestoreConfirmId(null);
        fetchHistoryDrafts();
      } else {
        setActionStatus({ loading: false, error: json.error || "Restore failed", success: "" });
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
              Published Version Interactive Editor & Preview
            </span>
            <span className="text-xs text-gray-400">Click and edit any text directly before re-publishing.</span>
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
              <History className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Published History Sub-Section
              </h1>
              <p className={`text-sm ${txtSec} mt-0.5`}>All historical versions with preview, inline editing, and re-publishing controls</p>
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
                  <Database className="w-4 h-4 text-purple-400" /> Historical Lesson Versions ({filteredHistory.length})
                </h3>
                <div className="relative w-48 sm:w-64">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-gray-500" />
                  <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search history..." className={`${inp} pl-8 py-1.5`} />
                </div>
              </div>

              {loading ? (
                <div className="py-12 text-center text-gray-500 text-xs flex items-center justify-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin text-purple-400" /> Loading publication history...
                </div>
              ) : filteredHistory.length === 0 ? (
                <div className="py-12 text-center text-gray-500 text-xs">
                  No publication history records found matching query.
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredHistory.map((h) => {
                    const isSelected = selectedHistory?._id === h._id;
                    const isLive = h.status === 'published';
                    return (
                      <div key={h._id} onClick={() => setSelectedHistory(h)}
                        className={`p-4 rounded-xl border cursor-pointer transition-all ${
                          isSelected ? "bg-purple-500/10 border-purple-500/40" : "hover:border-purple-500/20"
                        } ${dark ? "bg-[#0c1224] border-[#1e2a4a]" : "bg-white border-gray-200"}`}>
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-400">{h.level}</span>
                              <span className="text-[10px] font-mono text-gray-400">{h.lessonId} (v{h.version})</span>
                            </div>
                            <h4 className="text-xs font-bold text-white mt-1.5">{h.title}</h4>
                            <p className="text-[10px] text-gray-500 mt-1">Saved {new Date(h.updatedAt).toLocaleString()}</p>
                          </div>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                            isLive ? "bg-emerald-500/10 text-emerald-400" : "bg-purple-500/10 text-purple-300"
                          }`}>
                            {isLive ? "Currently Active" : `Superseded v${h.version}`}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            {selectedHistory ? (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className={`${card} border rounded-2xl p-5 space-y-5 sticky top-24`}>
                <div className="border-b pb-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400 font-mono">{selectedHistory.lessonId}</span>
                    <span className="text-[10px] font-bold text-purple-400 px-2 py-0.5 rounded-full bg-purple-500/10">v{selectedHistory.version}</span>
                  </div>
                  <h2 className="text-base font-bold text-white mt-1">{selectedHistory.title}</h2>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <button onClick={() => setPreviewDraftId(selectedHistory._id)}
                      className="px-3 py-1 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 text-purple-400 text-xs font-semibold rounded-lg transition-all flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" /> Preview & Edit Text
                    </button>
                  </div>
                </div>

                <div className="flex gap-2 border-t pt-4">
                  <button onClick={() => setRestoreConfirmId(selectedHistory._id)}
                    className="flex-1 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-1">
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Re-Publish Version</span>
                  </button>
                </div>
              </motion.div>
            ) : (
              <div className={`${card} border rounded-2xl p-6 text-center text-gray-500 text-xs`}>
                Select a history record to view version actions.
              </div>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {restoreConfirmId && selectedHistory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className={`${card} border rounded-2xl max-w-sm w-full p-5 space-y-4 shadow-2xl`}>
              <div className="text-center">
                <History className="w-12 h-12 text-purple-400 mx-auto mb-2" />
                <h3 className="text-base font-bold text-white">Re-Publish This Version?</h3>
                <p className="text-xs text-gray-400 mt-2">This will make version v{selectedHistory.version} the active published lesson in the student catalog.</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setRestoreConfirmId(null)} className="flex-1 py-2 bg-[#1e2a4a] text-gray-300 text-xs font-semibold rounded-lg">Cancel</button>
                <button onClick={() => handleRestore(selectedHistory._id)} className="flex-1 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold rounded-lg">Confirm Re-Publish</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
