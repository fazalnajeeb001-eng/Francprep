import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { apiFetch } from "~/lib/apiFetch";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "~/lib/ThemeContext";
import {
  ArrowLeft, Layers, CheckCircle2, AlertCircle, Trash2,
  RefreshCw, Eye, AlertTriangle, CheckCircle, Database, Upload, Brain, Sparkles, History
} from "lucide-react";
import { LessonPage } from "~/components/content/LessonPage";

export const Route = createFileRoute("/admin/pipeline")({ component: PipelineDashboardPage });

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

function PipelineDashboardPage() {
  const { dark } = useTheme();
  const [pipelineTab, setPipelineTab] = useState<"import" | "drafts" | "integrated" | "history">("import");
  const [drafts, setDrafts] = useState<DraftItem[]>([]);
  const [selectedDraft, setSelectedDraft] = useState<DraftItem | null>(null);
  const [previewDraftId, setPreviewDraftId] = useState<string | null>(null);

  // Safety Confirmation
  const [publishConfirmId, setPublishConfirmId] = useState<string | null>(null);
  const [safetyWordInput, setSafetyWordInput] = useState("");
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [restoreConfirmId, setRestoreConfirmId] = useState<string | null>(null);
  const [actionStatus, setActionStatus] = useState({ loading: false, error: "", success: "" });

  // Paste Markdown Staging States (1.b Pipeline)
  const [importMarkdown, setImportMarkdown] = useState("");
  const [overrideForm, setOverrideForm] = useState({
    level: "",
    chapterNum: "",
    lessonNum: "",
    title: "",
    anchorSkill: ""
  });
  const [importingMarkdown, setImportingMarkdown] = useState(false);

  // AI Verification states
  const [verifyingAI, setVerifyingAI] = useState(false);
  const [aiReport, setAiReport] = useState<{ passed: boolean; errors: string[]; suggestions: string[] } | null>(null);
  const [selectedModel, setSelectedModel] = useState("gpt-4o-mini");

  // Comparison State (1.a Merged Preview)
  const [publishedLessonData, setPublishedLessonData] = useState<any | null>(null);

  const fetchDrafts = async () => {
    try {
      const res = await apiFetch("/admin/content-pipeline/drafts?limit=100");
      const json = await res.json();
      if (json.success) {
        setDrafts(json.data || []);
      }
    } catch (e) {
      console.error('Failed to fetch drafts:', e);
    }
  };

  useEffect(() => {
    fetchDrafts();
  }, []);

  // Fetch corresponding published lesson for comparison if selecting an integrated draft
  useEffect(() => {
    if (selectedDraft?.lessonId) {
      setPublishedLessonData(null);
      apiFetch(`/lessons/${selectedDraft.lessonId}`)
        .then(r => r.json())
        .then(j => {
          if (j.success && j.data) {
            setPublishedLessonData(j.data);
          }
        })
        .catch(() => {});
    }
  }, [selectedDraft]);

  const handleImportMarkdown = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!importMarkdown.trim()) return;
    setImportingMarkdown(true);
    setActionStatus({ loading: true, error: "", success: "" });
    try {
      const overridesPayload = (overrideForm.level || overrideForm.chapterNum || overrideForm.lessonNum || overrideForm.title || overrideForm.anchorSkill)
        ? {
            level: overrideForm.level || undefined,
            chapterNum: overrideForm.chapterNum ? parseInt(overrideForm.chapterNum) : undefined,
            lessonNum: overrideForm.lessonNum ? parseInt(overrideForm.lessonNum) : undefined,
            title: overrideForm.title || undefined,
            anchorSkill: overrideForm.anchorSkill || undefined,
          }
        : undefined;

      const res = await apiFetch("/admin/content-pipeline/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          markdown: importMarkdown,
          manualOverrides: overridesPayload
        }),
      });
      const json = await res.json();
      if (json.success) {
        setActionStatus({ loading: false, error: "", success: `Successfully parsed and staged ${json.data.results?.length || 1} lesson draft(s) in staging queue!` });
        setImportMarkdown("");
        setOverrideForm({ level: "", chapterNum: "", lessonNum: "", title: "", anchorSkill: "" });
        setPipelineTab("drafts");
        fetchDrafts();
      } else {
        setActionStatus({ loading: false, error: json.error || "Failed to parse markdown", success: "" });
      }
    } catch (err: any) {
      setActionStatus({ loading: false, error: err.message || "Network error", success: "" });
    }
    setImportingMarkdown(false);
  };

  const handleAIVerify = async (id: string) => {
    setVerifyingAI(true);
    setAiReport(null);
    try {
      const res = await apiFetch(`/admin/content-pipeline/drafts/${id}/ai-verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: selectedModel }),
      });
      const json = await res.json();
      if (json.success) {
        setAiReport(json.data);
      } else {
        setActionStatus({ loading: false, error: json.error || "AI Verification failed", success: "" });
      }
    } catch (err: any) {
      setActionStatus({ loading: false, error: err.message || "Network error", success: "" });
    }
    setVerifyingAI(false);
  };

  const handlePublish = async (id: string) => {
    if (safetyWordInput !== "PUBLISH") {
      setActionStatus({ loading: false, error: "Please type the word 'PUBLISH' to confirm.", success: "" });
      return;
    }

    setActionStatus({ loading: true, error: "", success: "" });
    try {
      const res = await apiFetch(`/admin/content-pipeline/drafts/${id}/publish`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ confirm: true }),
      });
      const json = await res.json();
      if (json.success) {
        setActionStatus({ loading: false, error: "", success: "Draft published successfully to production database!" });
        setPublishConfirmId(null);
        setSafetyWordInput("");
        setSelectedDraft(null);
        fetchDrafts();
      } else {
        setActionStatus({ loading: false, error: json.error || "Publishing failed", success: "" });
      }
    } catch (e: any) {
      setActionStatus({ loading: false, error: e.message || "Network error", success: "" });
    }
  };

  const handleDelete = async (id: string) => {
    setActionStatus({ loading: true, error: "", success: "" });
    try {
      const res = await apiFetch(`/admin/content-pipeline/drafts/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        setActionStatus({ loading: false, error: "", success: "Draft deleted." });
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

  const handleRestore = async (id: string) => {
    setActionStatus({ loading: true, error: "", success: "" });
    try {
      const res = await apiFetch(`/admin/content-pipeline/drafts/${id}/restore`, { method: "POST" });
      const json = await res.json();
      if (json.success) {
        setActionStatus({ loading: false, error: "", success: "Lesson version restored successfully!" });
        setRestoreConfirmId(null);
        fetchDrafts();
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

  // Render Full Live Preview
  if (previewDraftId) {
    return (
      <div className="fixed inset-0 z-50 bg-[#070B17] overflow-y-auto">
        <div className="sticky top-0 z-50 bg-[#101828]/90 border-b border-[#1e2a4a] px-6 py-3 flex items-center justify-between backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30">
              Admin Live-Edit Preview
            </span>
            <span className="text-xs text-gray-400">Click and edit any text directly to stage content updates.</span>
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

  // Filter drafts list based on current active tab
  const activeStagedDrafts = drafts.filter(d => d.status !== 'superseded' && d.status !== 'published' && d.origin !== 'ai_generator');
  const integratedDrafts = drafts.filter(d => d.status !== 'superseded' && d.status !== 'published' && d.origin === 'ai_generator');
  const supersededDrafts = drafts.filter(d => d.status === 'superseded');

  return (
    <div className={`min-h-screen ${bg} transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6 pb-20">
        
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <Link to="/admin" className={`inline-flex items-center gap-1 text-xs ${txtSec} hover:text-purple-400 transition-colors mb-2`}>
            <ArrowLeft className="w-3 h-3" /> Back to Admin
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Content Pipeline
              </h1>
              <p className={`text-sm ${txtSec} mt-0.5`}>deterministic parser queue & stage controls</p>
            </div>
          </div>
        </motion.div>

        {/* Global Notifications */}
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

        {/* Tabs Bar */}
        <div className="flex border-b border-[#1e2a4a] gap-6 text-sm">
          <button onClick={() => { setPipelineTab("import"); setSelectedDraft(null); }}
            className={`pb-3 font-semibold transition-all border-b-2 ${pipelineTab === "import" ? "border-purple-500 text-purple-400" : "border-transparent text-gray-500 hover:text-gray-300"}`}>
            📥 1.b Import Parser
          </button>
          <button onClick={() => { setPipelineTab("drafts"); setSelectedDraft(null); }}
            className={`pb-3 font-semibold transition-all border-b-2 ${pipelineTab === "drafts" ? "border-purple-500 text-purple-400" : "border-transparent text-gray-500 hover:text-gray-300"}`}>
            📂 1.c Staged Drafts ({activeStagedDrafts.length})
          </button>
          <button onClick={() => { setPipelineTab("integrated"); setSelectedDraft(null); }}
            className={`pb-3 font-semibold transition-all border-b-2 ${pipelineTab === "integrated" ? "border-purple-500 text-purple-400" : "border-transparent text-gray-500 hover:text-gray-300"}`}>
            🔄 1.a Integrated Additions ({integratedDrafts.length})
          </button>
          <button onClick={() => { setPipelineTab("history"); setSelectedDraft(null); }}
            className={`pb-3 font-semibold transition-all border-b-2 ${pipelineTab === "history" ? "border-purple-500 text-purple-400" : "border-transparent text-gray-500 hover:text-gray-300"}`}>
            📜 Version History ({supersededDrafts.length})
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* Main Left Side Area depending on Tab */}
          <div className="lg:col-span-2 space-y-4">
            
            {/* TAB 1: 1.b Import Parser */}
            {pipelineTab === "import" && (
              <form onSubmit={handleImportMarkdown} className={`${card} border rounded-2xl p-6 space-y-5`}>
                <div className="border-b border-[#1e2a4a] pb-3 flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Upload className="w-4 h-4 text-purple-400" /> Deterministic Markdown Parser
                  </h3>
                  <span className="text-[10px] text-gray-400">Zero AI involvement by default</span>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-gray-400">Paste Claude-Generated Lesson Markdown</label>
                  <textarea
                    required
                    value={importMarkdown}
                    onChange={(e) => setImportMarkdown(e.target.value)}
                    className="w-full h-72 rounded-xl px-3 py-2 text-xs font-mono border dark:bg-[#0c1224] dark:border-[#1e2a4a] text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder={`# LESSON 1 — Greet someone formally\n**Anchor Skill:** Reading\n**Lesson Objectives:** Greeting people...\n\n# Warm-up\n...`}
                  />
                </div>

                <div className="border-t border-[#1e2a4a] pt-4 space-y-4">
                  <div className="flex items-center gap-1 text-xs font-bold text-purple-400">
                    <Sparkles className="w-4 h-4" />
                    <span>Manual Overrides (Guarantees 100% Parsing Accuracy)</span>
                  </div>
                  <p className="text-[10px] text-gray-400 leading-relaxed">
                    If headers are missing or malformed in the pasted markdown, the parser will throw a strict error. Fill out these fields to bypass headers and force placement.
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[10px] text-gray-400 mb-1">CEFR Level</label>
                      <select value={overrideForm.level} onChange={(e) => setOverrideForm({...overrideForm, level: e.target.value})} className={inp}>
                        <option value="">Auto-Detect</option>
                        {["A1", "A2", "B1", "B2", "C1", "C2"].map(l => <option key={l} value={l}>{l}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] text-gray-400 mb-1">Chapter Number</label>
                      <input type="number" min={1} value={overrideForm.chapterNum} onChange={(e) => setOverrideForm({...overrideForm, chapterNum: e.target.value})} className={inp} placeholder="e.g. 1" />
                    </div>
                    <div>
                      <label className="block text-[10px] text-gray-400 mb-1">Lesson Number</label>
                      <select value={overrideForm.lessonNum} onChange={(e) => setOverrideForm({...overrideForm, lessonNum: e.target.value})} className={inp}>
                        <option value="">Auto-Detect</option>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(n => <option key={n} value={n}>{n}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] text-gray-400 mb-1">Anchor Skill / Category</label>
                      <select value={overrideForm.anchorSkill} onChange={(e) => setOverrideForm({...overrideForm, anchorSkill: e.target.value})} className={inp}>
                        <option value="">Auto-Detect</option>
                        {["reading", "writing", "listening", "speaking", "integrated", "review"].map(k => <option key={k} value={k}>{k}</option>)}
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[10px] text-gray-400 mb-1">Manual Lesson Title</label>
                      <input type="text" value={overrideForm.title} onChange={(e) => setOverrideForm({...overrideForm, title: e.target.value})} className={inp} placeholder="e.g. Talk about daily routine" />
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button type="submit" disabled={importingMarkdown}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold transition-all disabled:opacity-50 flex items-center gap-1.5 shadow-lg shadow-purple-500/25">
                    {importingMarkdown ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                    <span>Parse & Stage Draft</span>
                  </button>
                </div>
              </form>
            )}

            {/* TAB 2: Staged Drafts (1.c) */}
            {pipelineTab === "drafts" && (
              <div className={`${card} border rounded-2xl p-5 space-y-4`}>
                <h3 className="text-sm font-bold text-white border-b pb-3 flex items-center gap-2">
                  <Database className="w-4 h-4 text-purple-400" /> Staging Queue (Unlimited Drafts)
                </h3>
                {activeStagedDrafts.length === 0 ? (
                  <div className="py-12 text-center text-gray-500 text-xs">
                    Staging queue is empty. Go to the "Import Parser" tab to parse new content!
                  </div>
                ) : (
                  <div className="space-y-3">
                    {activeStagedDrafts.map((d) => {
                      const isSelected = selectedDraft?._id === d._id;
                      const errors = d.validationErrors.length;
                      return (
                        <div key={d._id} onClick={() => { setSelectedDraft(d); setAiReport(null); }}
                          className={`p-4 rounded-xl border cursor-pointer transition-all ${
                            isSelected ? "bg-purple-500/10 border-purple-500/40" : "hover:border-purple-500/20"
                          } ${dark ? "bg-[#0c1224] border-[#1e2a4a]" : "bg-white border-gray-200"}`}>
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-400">{d.level}</span>
                                <span className="text-[10px] font-mono text-gray-400">{d.lessonId}</span>
                                <span className="text-[9px] px-1.5 py-0.5 rounded bg-gray-500/10 text-gray-400">v{d.version}</span>
                              </div>
                              <h4 className="text-xs font-bold text-white mt-1.5">{d.title}</h4>
                            </div>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                              errors === 0 ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"
                            }`}>
                              {errors === 0 ? "✓ Schema Valid" : `❌ ${errors} Schema Errors`}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: Integrated Additions (1.a) */}
            {pipelineTab === "integrated" && (
              <div className={`${card} border rounded-2xl p-5 space-y-4`}>
                <h3 className="text-sm font-bold text-white border-b pb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-400" /> Integrated Additions Layer (AI-Generated additions)
                </h3>
                <p className="text-xs text-gray-400">These drafts are targeted to existing lessons and will be merged into the existing published lesson.</p>
                {integratedDrafts.length === 0 ? (
                  <div className="py-12 text-center text-gray-500 text-xs">
                    No integrated AI drafts staged in queue.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {integratedDrafts.map((d) => {
                      const isSelected = selectedDraft?._id === d._id;
                      return (
                        <div key={d._id} onClick={() => { setSelectedDraft(d); setAiReport(null); }}
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
                            </div>
                            <span className="text-[9px] px-2 py-0.5 rounded bg-purple-600/20 text-purple-300 font-bold">Merge Addition</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: Version History (Archived Superseded) */}
            {pipelineTab === "history" && (
              <div className={`${card} border rounded-2xl p-5 space-y-4`}>
                <h3 className="text-sm font-bold text-white border-b pb-3 flex items-center gap-2">
                  <History className="w-4 h-4 text-purple-400" /> Lesson Version Archives (Previously Published)
                </h3>
                <p className="text-xs text-gray-400">Previous published versions. Select a historical record to restore it as the active version.</p>
                {supersededDrafts.length === 0 ? (
                  <div className="py-12 text-center text-gray-500 text-xs">
                    No historical versions archived yet.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {supersededDrafts.map((d) => {
                      const isSelected = selectedDraft?._id === d._id;
                      return (
                        <div key={d._id} onClick={() => { setSelectedDraft(d); setAiReport(null); }}
                          className={`p-4 rounded-xl border cursor-pointer transition-all ${
                            isSelected ? "bg-purple-500/10 border-purple-500/40" : "hover:border-purple-500/20"
                          } ${dark ? "bg-[#0c1224] border-[#1e2a4a]" : "bg-white border-gray-200"}`}>
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-gray-500/20 text-gray-400">{d.level}</span>
                                <span className="text-[10px] font-mono text-gray-400">{d.lessonId}</span>
                                <span className="text-[9px] px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-300">v{d.version}</span>
                              </div>
                              <h4 className="text-xs font-bold text-white mt-1.5">{d.title}</h4>
                            </div>
                            <span className="text-[9px] text-gray-500">Archived Version</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

          </div>

          {/* Action sidebar (Right) */}
          <div className="lg:col-span-1">
            {selectedDraft ? (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className={`${card} border rounded-2xl p-5 space-y-5 sticky top-24`}>
                <div className="border-b pb-3">
                  <span className="text-xs text-gray-400 font-mono">{selectedDraft.lessonId}</span>
                  <h2 className="text-base font-bold text-white mt-1">{selectedDraft.title}</h2>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <button onClick={() => setPreviewDraftId(selectedDraft._id)}
                      className="px-3 py-1 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 text-purple-400 text-xs font-semibold rounded-lg transition-all flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" /> Preview & Edit
                    </button>
                    {pipelineTab === "history" && (
                      <button onClick={() => setRestoreConfirmId(selectedDraft._id)}
                        className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold rounded-lg transition-all flex items-center gap-1">
                        <History className="w-3.5 h-3.5" /> Restore Version
                      </button>
                    )}
                  </div>
                </div>

                {/* Integrated Merged Changes Panel (1.a Feature) */}
                {pipelineTab === "integrated" && publishedLessonData && (
                  <div className="p-3 bg-purple-500/5 border border-purple-500/10 rounded-xl space-y-2">
                    <div className="text-xs font-bold text-purple-400 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                      <span>Comparison Checklist</span>
                    </div>
                    <div className="text-[10px] text-gray-400 space-y-1">
                      <p>• Published exercises: {publishedLessonData.canonical?.practiceExercises?.questions?.length || 0}</p>
                      <p className="text-purple-300 font-semibold">• Draft exercises: {selectedDraft.parsedData?.practiceExercises?.questions?.length || 0} (will overwrite/merge)</p>
                    </div>
                  </div>
                )}

                {/* Validation checks */}
                <div className="space-y-3">
                  <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Automated Checks</h3>

                  {/* Schema validation */}
                  <div className={`p-3 rounded-xl border flex items-start gap-2.5 ${selectedDraft.validationErrors.length === 0 ? 'bg-emerald-500/5 border-emerald-500/10' : 'bg-red-500/5 border-red-500/10'}`}>
                    {selectedDraft.validationErrors.length === 0 ? <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" /> : <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />}
                    <div>
                      <p className="text-xs font-bold text-white">JSON Schema Validation</p>
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

                  {/* Optional Multi-LLM Review */}
                  <div className={`p-3 rounded-xl border space-y-2.5 ${aiReport ? (aiReport.passed ? 'bg-emerald-500/5 border-emerald-500/10' : 'bg-red-500/5 border-red-500/10') : 'bg-purple-500/5 border-purple-500/10'}`}>
                    <div className="flex items-start gap-2.5">
                      <Brain className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
                      <div className="flex-1">
                        <p className="text-xs font-bold text-white">Multi-LLM Proofreader</p>
                        <p className="text-[10px] text-gray-400 mt-0.5">Spellcheck and CEFR level verification.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1.5 pt-1">
                      <select value={selectedModel} onChange={(e) => setSelectedModel(e.target.value)}
                        className={`text-[9px] rounded px-1.5 py-1 ${dark ? 'bg-[#0c1224] border-[#1e2a4a] text-white' : 'bg-white border-gray-300 text-gray-900'} border`}>
                        <option value="gpt-4o-mini">GPT-4o Mini</option>
                        <option value="claude-sonnet">Claude 3.5 Sonnet</option>
                        <option value="gemini-flash">Gemini Flash</option>
                        <option value="llama-70b">Llama 70B</option>
                      </select>
                      <button onClick={() => handleAIVerify(selectedDraft._id)} disabled={verifyingAI}
                        className="px-2 py-1 bg-purple-600 hover:bg-purple-500 text-white rounded text-[9px] font-bold flex items-center gap-1 disabled:opacity-50 transition-all ml-auto">
                        {verifyingAI ? <RefreshCw className="w-2.5 h-2.5 animate-spin" /> : <Brain className="w-2.5 h-2.5" />}
                        <span>Review</span>
                      </button>
                    </div>

                    {aiReport && (
                      <div className="border-t border-gray-800/60 pt-2 space-y-1.5 text-[9px]">
                        <span className={`font-bold px-1.5 py-0.5 rounded ${aiReport.passed ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                          {aiReport.passed ? "Check Passed" : "Check Flagged"}
                        </span>
                        {aiReport.errors.map((e, i) => <p key={i} className="text-red-400 font-mono">- {e}</p>)}
                        {aiReport.suggestions.map((s, i) => <p key={i} className="text-gray-300">- {s}</p>)}
                      </div>
                    )}
                  </div>

                </div>

                {/* Publish actions */}
                {pipelineTab !== "history" && (
                  <div className="flex gap-2 border-t pt-4">
                    <button onClick={() => setPublishConfirmId(selectedDraft._id)}
                      disabled={selectedDraft.validationErrors.length > 0}
                      className="flex-1 py-2.5 bg-gradient-to-r from-emerald-500 to-green-500 disabled:from-gray-700 disabled:to-gray-800 disabled:opacity-30 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-emerald-500/10">
                      Publish Version
                    </button>
                    <button onClick={() => setDeleteConfirmId(selectedDraft._id)}
                      className="p-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-xs rounded-xl transition-all"
                      title="Delete Draft">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </motion.div>
            ) : (
              <div className={`${card} border rounded-2xl p-6 text-center text-gray-500 text-xs`}>
                Select an item from the queue to run validations, preview contents, or publish to catalog.
              </div>
            )}
          </div>

        </div>

      </div>

      {/* PUBLISH CONFIRMATION DIALOG (Requires safety word to prevent accident) */}
      <AnimatePresence>
        {publishConfirmId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className={`${card} border rounded-2xl max-w-sm w-full p-5 space-y-4 shadow-2xl`}>
              <div className="text-center">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-2" />
                <h3 className="text-base font-bold text-white">Confirm Production Publish</h3>
                <p className="text-xs text-gray-400 mt-2">
                  You are about to push this lesson live. If a version already exists, it will move to historical version history.
                </p>
                <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-left">
                  <label className="block text-[10px] font-bold text-red-400 mb-1.5">Type "PUBLISH" to confirm:</label>
                  <input type="text" value={safetyWordInput} onChange={(e) => setSafetyWordInput(e.target.value)}
                    className="w-full rounded-lg bg-black border border-red-500/30 px-3 py-1.5 text-xs text-white uppercase focus:outline-none" placeholder="PUBLISH" />
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => { setPublishConfirmId(null); setSafetyWordInput(""); }}
                  className="flex-1 py-2 bg-[#1e2a4a] hover:bg-[#283863] text-gray-300 text-xs font-semibold rounded-lg">
                  Cancel
                </button>
                <button onClick={() => handlePublish(publishConfirmId)} disabled={safetyWordInput !== "PUBLISH"}
                  className="flex-1 py-2 bg-gradient-to-r from-emerald-500 to-green-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold rounded-lg shadow-lg">
                  Confirm Publish
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DELETE CONFIRMATION DIALOG */}
      <AnimatePresence>
        {deleteConfirmId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className={`${card} border rounded-2xl max-w-sm w-full p-5 space-y-4 shadow-2xl`}>
              <div className="text-center">
                <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-2" />
                <h3 className="text-base font-bold text-white">Delete Draft?</h3>
                <p className="text-xs text-gray-400 mt-2">
                  Are you sure you want to delete this staging draft? This action is permanent and cannot be undone.
                </p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setDeleteConfirmId(null)} className="flex-1 py-2 bg-[#1e2a4a] hover:bg-[#283863] text-gray-300 text-xs font-semibold rounded-lg">
                  Cancel
                </button>
                <button onClick={() => handleDelete(deleteConfirmId)} className="flex-1 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-lg shadow-lg">
                  Confirm Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* RESTORE CONFIRMATION DIALOG */}
      <AnimatePresence>
        {restoreConfirmId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className={`${card} border rounded-2xl max-w-sm w-full p-5 space-y-4 shadow-2xl`}>
              <div className="text-center">
                <History className="w-12 h-12 text-purple-400 mx-auto mb-2" />
                <h3 className="text-base font-bold text-white">Restore Version?</h3>
                <p className="text-xs text-gray-400 mt-2">
                  This will set this archived version as the active published lesson. The current active version will be archived.
                </p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setRestoreConfirmId(null)} className="flex-1 py-2 bg-[#1e2a4a] hover:bg-[#283863] text-gray-300 text-xs font-semibold rounded-lg">
                  Cancel
                </button>
                <button onClick={() => handleRestore(restoreConfirmId)} className="flex-1 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-lg shadow-lg">
                  Confirm Restore
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
