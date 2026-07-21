import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { apiFetch } from "~/lib/apiFetch";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "~/lib/ThemeContext";
import {
  ArrowLeft, Crown, CheckCircle2, AlertCircle,
  RefreshCw, Eye, AlertTriangle, Database, Search, ShieldCheck, Edit3
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

function PublishedContentSubSectionPage() {
  const { dark } = useTheme();
  const [publishedLessons, setPublishedLessons] = useState<LessonItem[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<LessonItem | null>(null);
  const [previewLessonId, setPreviewLessonId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [republishConfirmId, setRepublishConfirmId] = useState<string | null>(null);
  const [actionStatus, setActionStatus] = useState({ loading: false, error: "", success: "" });

  const fetchPublishedLessons = async () => {
    setLoading(true);
    try {
      const res = await apiFetch("/lessons?limit=500");
      const json = await res.json();
      if (json.success) {
        setPublishedLessons(json.data || []);
      }
    } catch (e) {
      console.error('Failed to fetch published lessons:', e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPublishedLessons();
  }, []);

  const filteredLessons = publishedLessons.filter(l => 
    (l.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (l.lessonId || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (l.level || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRepublish = async (lesson: LessonItem) => {
    setActionStatus({ loading: true, error: "", success: "" });
    try {
      const res = await apiFetch(`/admin/lessons/${lesson._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPublished: true, canonical: lesson.canonical }),
      });
      const json = await res.json();
      if (json.success) {
        setActionStatus({ loading: false, error: "", success: `Lesson ${lesson.lessonId} re-published successfully to production catalog!` });
        setRepublishConfirmId(null);
        fetchPublishedLessons();
      } else {
        setActionStatus({ loading: false, error: json.error || "Re-publish failed", success: "" });
      }
    } catch (e: any) {
      setActionStatus({ loading: false, error: e.message || "Network error", success: "" });
    }
  };

  const bg = dark ? "bg-[#070B17]" : "bg-gray-50";
  const card = dark ? "bg-[#101828]/80 border-[#1e2a4a]" : "bg-white/80 border-gray-200";
  const txtSec = dark ? "text-gray-400" : "text-gray-500";
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
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Crown className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent">
                Published Content Sub-Section
              </h1>
              <p className={`text-sm ${txtSec} mt-0.5`}>Protected production database lessons catalog</p>
            </div>
          </div>
        </motion.div>

        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 shrink-0" />
          <span>Protected Records: Deletion is permanently disabled for published content to guarantee student progress stability.</span>
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
              <div className="flex items-center justify-between border-b pb-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Database className="w-4 h-4 text-amber-400" /> Live Catalog Records ({filteredLessons.length})
                </h3>
                <div className="relative w-48 sm:w-64">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-gray-500" />
                  <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search published catalog..." className={`${inp} pl-8 py-1.5`} />
                </div>
              </div>

              {loading ? (
                <div className="py-12 text-center text-gray-500 text-xs flex items-center justify-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin text-amber-400" /> Loading published lessons catalog...
                </div>
              ) : filteredLessons.length === 0 ? (
                <div className="py-12 text-center text-gray-500 text-xs">
                  No published catalog records found matching query.
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredLessons.map((l) => {
                    const isSelected = selectedLesson?._id === l._id;
                    return (
                      <div key={l._id} onClick={() => setSelectedLesson(l)}
                        className={`p-4 rounded-xl border cursor-pointer transition-all ${
                          isSelected ? "bg-amber-500/10 border-amber-500/40" : "hover:border-amber-500/20"
                        } ${dark ? "bg-[#0c1224] border-[#1e2a4a]" : "bg-white border-gray-200"}`}>
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400">{l.level}</span>
                              <span className="text-[10px] font-mono text-gray-400">{l.lessonId}</span>
                            </div>
                            <h4 className="text-xs font-bold text-white mt-1.5">{l.title}</h4>
                            <p className="text-[10px] text-gray-500 mt-1">Last published {new Date(l.updatedAt).toLocaleString()}</p>
                          </div>
                          <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-emerald-500/10 text-emerald-400">
                            Live Catalog
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
            {selectedLesson ? (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className={`${card} border rounded-2xl p-5 space-y-5 sticky top-24`}>
                <div className="border-b pb-3">
                  <span className="text-xs text-gray-400 font-mono">{selectedLesson.lessonId}</span>
                  <h2 className="text-base font-bold text-white mt-1">{selectedLesson.title}</h2>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <button onClick={() => setPreviewLessonId(selectedLesson.lessonId)}
                      className="px-3 py-1 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 text-amber-400 text-xs font-semibold rounded-lg transition-all flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" /> Preview & Edit Live
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Production Status</h3>
                  <div className="p-3 rounded-xl border bg-emerald-500/5 border-emerald-500/10 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-white">Active in Student Catalog</p>
                      <p className="text-[10px] text-emerald-400/80 mt-0.5">Lesson is published and accessible to registered students.</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 border-t pt-4">
                  <button onClick={() => setRepublishConfirmId(selectedLesson._id)}
                    className="flex-1 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-1">
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Re-Publish Updates</span>
                  </button>
                </div>
              </motion.div>
            ) : (
              <div className={`${card} border rounded-2xl p-6 text-center text-gray-500 text-xs`}>
                Select a published lesson record to view actions.
              </div>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {republishConfirmId && selectedLesson && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className={`${card} border rounded-2xl max-w-sm w-full p-5 space-y-4 shadow-2xl`}>
              <div className="text-center">
                <Crown className="w-12 h-12 text-amber-400 mx-auto mb-2" />
                <h3 className="text-base font-bold text-white">Confirm Catalog Re-Publish</h3>
                <p className="text-xs text-gray-400 mt-2">Re-publishing will update the live catalog version accessible to students.</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setRepublishConfirmId(null)} className="flex-1 py-2 bg-[#1e2a4a] text-gray-300 text-xs font-semibold rounded-lg">Cancel</button>
                <button onClick={() => handleRepublish(selectedLesson)} className="flex-1 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-xs font-bold rounded-lg">Confirm Re-Publish</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
