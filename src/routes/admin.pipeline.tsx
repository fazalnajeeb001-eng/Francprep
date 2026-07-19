import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { apiFetch } from "~/lib/apiFetch";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "~/lib/ThemeContext";
import {
  ArrowLeft, Layers, CheckCircle2, AlertCircle, Trash2,
  RefreshCw, Eye, AlertTriangle, CheckCircle, Info, Database, Upload, Brain
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
  version: number;
  createdBy: string;
  updatedAt: string;
}

function PipelineDashboardPage() {
  const { dark } = useTheme();
  const [drafts, setDrafts] = useState<DraftItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDraft, setSelectedDraft] = useState<DraftItem | null>(null);
  const [previewDraftId, setPreviewDraftId] = useState<string | null>(null);
  
  // Modal Confirm Dialogs
  const [publishConfirmId, setPublishConfirmId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [actionStatus, setActionStatus] = useState({ loading: false, error: "", success: "" });

  // Paste Markdown Staging States
  const [showImportPanel, setShowImportPanel] = useState(false);
  const [importMarkdown, setImportMarkdown] = useState("");
  const [importLevel, setImportLevel] = useState("");
  const [importChapter, setImportChapter] = useState("");
  const [importingMarkdown, setImportingMarkdown] = useState(false);

  // AI Verification states
  const [verifyingAI, setVerifyingAI] = useState(false);
  const [aiReport, setAiReport] = useState<{ passed: boolean; errors: string[]; suggestions: string[] } | null>(null);
  const [selectedModel, setSelectedModel] = useState("gpt-4o-mini");

  const fetchDrafts = async () => {
    setLoading(true);
    try {
      const res = await apiFetch("/admin/content-pipeline/drafts?limit=50");
      const json = await res.json();
      if (json.success) {
        setDrafts(json.data || []);
      }
    } catch (e) {
      console.error('Failed to fetch drafts:', e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDrafts();
  }, []);

  const handleImportMarkdown = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!importMarkdown.trim()) return;
    setImportingMarkdown(true);
    setActionStatus({ loading: true, error: "", success: "" });
    try {
      const res = await apiFetch("/admin/content-pipeline/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          markdown: importMarkdown,
          level: importLevel || undefined,
          chapterNum: importChapter || undefined,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setActionStatus({ loading: false, error: "", success: `Successfully parsed and staged ${json.data.results?.length || 1} lesson draft(s) in queue!` });
        setImportMarkdown("");
        setShowImportPanel(false);
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

  const handleValidate = async (id: string) => {
    setActionStatus({ loading: true, error: "", success: "" });
    try {
      const res = await apiFetch(`/admin/content-pipeline/drafts/${id}/validate`, { method: "POST" });
      const json = await res.json();
      if (json.success) {
        setActionStatus({ loading: false, error: "", success: "Draft re-validated successfully!" });
        fetchDrafts();
        if (selectedDraft?._id === id) {
          setSelectedDraft(prev => prev ? { ...prev, status: json.data.status, validationErrors: json.data.errors, validationWarnings: json.data.warnings } : null);
        }
      } else {
        setActionStatus({ loading: false, error: json.error || "Validation failed", success: "" });
      }
    } catch (e: any) {
      setActionStatus({ loading: false, error: e.message || "Network error", success: "" });
    }
  };

  const handlePublish = async (id: string) => {
    setActionStatus({ loading: true, error: "", success: "" });
    try {
      const res = await apiFetch(`/admin/content-pipeline/drafts/${id}/publish`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ confirm: true }),
      });
      const json = await res.json();
      if (json.success) {
        setActionStatus({ loading: false, error: "", success: "Draft published successfully to lessons collection!" });
        setPublishConfirmId(null);
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

  const bg = dark ? "bg-[#070B17]" : "bg-gray-50";
  const card = dark ? "bg-[#101828]/80 border-[#1e2a4a]" : "bg-white/80 border-gray-200";
  const txtSec = dark ? "text-gray-400" : "text-gray-500";

  // If in preview mode, render fullscreen overlay of the student LessonPage
  if (previewDraftId) {
    return (
      <div className="fixed inset-0 z-50 bg-[#070B17] overflow-y-auto">
        <div className="sticky top-0 z-50 bg-[#101828]/90 border-b border-[#1e2a4a] px-6 py-4 flex items-center justify-between backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30">
              Admin Preview Mode
            </span>
            <span className="text-sm text-gray-400">Previewing draft version of lesson</span>
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
              <p className={`text-sm ${txtSec} mt-0.5`}>Validate and preview lesson drafts before publishing to students</p>
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
          
          {/* Drafts List (Left) */}
          <div className="lg:col-span-2 space-y-4">
            <div className={`${card} border rounded-2xl p-5 space-y-4`}>
              <div className="flex items-center justify-between border-b pb-4">
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Database className="w-4 h-4 text-purple-400" /> Active Drafts Queue ({drafts.length})
                </h2>
                <div className="flex items-center gap-2">
                  <button onClick={() => setShowImportPanel(!showImportPanel)}
                    className="px-3 py-1.5 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 border border-purple-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Paste Claude Markdown</span>
                  </button>
                  <button onClick={fetchDrafts} disabled={loading} className={`p-2 rounded-xl ${dark ? "hover:bg-white/5" : "hover:bg-gray-100"} text-gray-400`}>
                    <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                  </button>
                </div>
              </div>

              {showImportPanel && (
                <form onSubmit={handleImportMarkdown} className={`p-4 rounded-xl border ${dark ? "bg-[#070B17] border-purple-500/30" : "bg-gray-50 border-purple-400"} space-y-4`}>
                  <div className="flex items-center gap-2 text-sm font-semibold text-purple-400">
                    <Upload className="w-4 h-4" />
                    <span>Paste Raw Claude Markdown</span>
                  </div>
                  <textarea
                    required
                    value={importMarkdown}
                    onChange={(e) => setImportMarkdown(e.target.value)}
                    className={`w-full h-40 rounded-xl px-3 py-2 text-xs font-mono border ${dark ? "bg-[#0c1224] border-[#1e2a4a] text-gray-200" : "bg-white border-gray-300 text-gray-900"} focus:outline-none focus:ring-2 focus:ring-purple-500`}
                    placeholder="# LESSON 1 - Greet someone formally...&#10;**Level:** A1&#10;**Chapter:** 1&#10;**Lesson Title:** Form greetings...&#10;..."
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] text-gray-400 mb-1">Level (Optional - Auto Detects)</label>
                      <select value={importLevel} onChange={(e) => setImportLevel(e.target.value)}
                        className={`w-full rounded-lg px-2 py-1.5 text-xs border ${dark ? "bg-[#0c1224] border-[#1e2a4a] text-white" : "bg-white border-gray-300 text-gray-900"}`}>
                        <option value="">Auto Detect Level</option>
                        {["A1", "A2", "B1", "B2", "C1", "C2"].map(l => <option key={l} value={l}>{l}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] text-gray-400 mb-1">Chapter (Optional - Auto Detects)</label>
                      <input type="number" min={1} value={importChapter} onChange={(e) => setImportChapter(e.target.value)}
                        className={`w-full rounded-lg px-2 py-1.5 text-xs border ${dark ? "bg-[#0c1224] border-[#1e2a4a] text-white" : "bg-white border-gray-300 text-gray-900"}`}
                        placeholder="e.g. 1" />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button type="submit" disabled={importingMarkdown}
                      className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold transition-all disabled:opacity-50 flex items-center gap-1">
                      {importingMarkdown ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
                      <span>Stage Draft</span>
                    </button>
                    <button type="button" onClick={() => setShowImportPanel(false)}
                      className="px-4 py-2 rounded-lg bg-gray-500/10 hover:bg-gray-500/20 text-gray-300 text-xs">
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              {loading ? (
                <div className="py-12 flex justify-center">
                  <RefreshCw className="w-8 h-8 text-purple-400 animate-spin" />
                </div>
              ) : drafts.length === 0 ? (
                <div className="py-12 text-center text-gray-500 text-sm">
                  No drafts staged. Upload a lesson markdown file from the Content Generator or Import tab!
                </div>
              ) : (
                <div className="space-y-3">
                  {drafts.map((d) => {
                    const isSelected = selectedDraft?._id === d._id;
                    const errorCount = d.validationErrors.length;
                    const warningCount = d.validationWarnings.length;
                    
                    return (
                      <div key={d._id} onClick={() => { setSelectedDraft(d); setAiReport(null); }}
                        className={`p-4 rounded-xl border cursor-pointer transition-all ${
                          isSelected ? "bg-purple-500/10 border-purple-500/40" :
                          dark ? "bg-[#0c1224] border-[#1e2a4a] hover:border-purple-500/20" : "bg-white border-gray-200 hover:bg-gray-50"
                        }`}>
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-400">
                                {d.level}
                              </span>
                              <span className="text-xs text-gray-400 font-mono">{d.lessonId}</span>
                              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-gray-500/10 text-gray-400">
                                v{d.version}
                              </span>
                            </div>
                            <h3 className="text-sm font-bold text-white mt-1.5">{d.title}</h3>
                            <p className="text-xs text-gray-500 mt-1">Edited {new Date(d.updatedAt).toLocaleDateString()}</p>
                          </div>

                          <div className="flex items-center gap-2">
                            {errorCount > 0 ? (
                              <span className="px-2 py-1 rounded-lg bg-red-500/10 border border-red-500/20 text-[10px] font-bold text-red-400 flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" /> {errorCount} Error{errorCount !== 1 ? 's' : ''}
                              </span>
                            ) : (
                              <span className="px-2 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3" /> Schema Valid
                              </span>
                            )}
                            
                            {warningCount > 0 && (
                              <span className="px-2 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[10px] font-bold text-amber-400 flex items-center gap-1">
                                <AlertTriangle className="w-3 h-3" /> {warningCount} Warn{warningCount !== 1 ? 's' : ''}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Test Suite Results & Actions Panel (Right) */}
          <div className="lg:col-span-1">
            {selectedDraft ? (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className={`${card} border rounded-2xl p-5 space-y-5 sticky top-24`}>
                <div className="border-b pb-3">
                  <span className="text-xs text-gray-400 font-mono">{selectedDraft.lessonId}</span>
                  <h2 className="text-base font-bold text-white mt-1">{selectedDraft.title}</h2>
                  <div className="flex items-center gap-2 mt-2">
                    <button onClick={() => setPreviewDraftId(selectedDraft._id)}
                      className="px-3 py-1 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 text-purple-400 text-xs font-semibold rounded-lg transition-all flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" /> Preview Lesson
                    </button>
                    <button onClick={() => handleValidate(selectedDraft._id)}
                      className="px-3 py-1 bg-[#1e2a4a] hover:bg-[#283863] text-gray-300 text-xs font-semibold rounded-lg transition-all flex items-center gap-1">
                      <RefreshCw className="w-3 h-3" /> Run Tests
                    </button>
                  </div>
                </div>

                {/* Test Checks */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Test Suite Checks</h3>
                  
                  {/* Structural check */}
                  <div className={`p-3 rounded-xl border flex items-start gap-2.5 ${selectedDraft.validationErrors.length === 0 ? 'bg-emerald-500/5 border-emerald-500/10' : 'bg-red-500/5 border-red-500/10'}`}>
                    {selectedDraft.validationErrors.length === 0 ? <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" /> : <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />}
                    <div>
                      <p className="text-xs font-bold text-white">1. Structural Check (JSON Schema)</p>
                      {selectedDraft.validationErrors.length === 0 ? (
                        <p className="text-[10px] text-emerald-400/80 mt-0.5">Complies perfectly with lesson.schema.json.</p>
                      ) : (
                        <div className="space-y-1 mt-1">
                          {selectedDraft.validationErrors.slice(0, 3).map((err, i) => (
                            <p key={i} className="text-[10px] text-red-400/90 font-mono leading-relaxed">{err}</p>
                          ))}
                          {selectedDraft.validationErrors.length > 3 && <p className="text-[9px] text-red-500 italic">+{selectedDraft.validationErrors.length - 3} more errors</p>}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Rendering check */}
                  {(() => {
                    const renderingWarnings = selectedDraft.validationWarnings.filter(w => !w.includes('Ledger Warning'));
                    const passed = renderingWarnings.length === 0;
                    return (
                      <div className={`p-3 rounded-xl border flex items-start gap-2.5 ${passed ? 'bg-emerald-500/5 border-emerald-500/10' : 'bg-amber-500/5 border-amber-500/10'}`}>
                        {passed ? <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" /> : <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />}
                        <div>
                          <p className="text-xs font-bold text-white">2. Rendering Check (11 Pages)</p>
                          {passed ? (
                            <p className="text-[10px] text-emerald-400/80 mt-0.5">All 11 pages have valid content mapped.</p>
                          ) : (
                            <div className="space-y-1 mt-1">
                              {renderingWarnings.slice(0, 2).map((warn, i) => (
                                <p key={i} className="text-[10px] text-amber-400/80 leading-relaxed">{warn}</p>
                              ))}
                              {renderingWarnings.length > 2 && <p className="text-[9px] text-amber-500 italic">+{renderingWarnings.length - 2} more warnings</p>}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })()}

                  {/* Ledger consistency check */}
                  {(() => {
                    const ledgerWarnings = selectedDraft.validationWarnings.filter(w => w.includes('Ledger Warning'));
                    const passed = ledgerWarnings.length === 0;
                    return (
                      <div className={`p-3 rounded-xl border flex items-start gap-2.5 ${passed ? 'bg-emerald-500/5 border-emerald-500/10' : 'bg-amber-500/5 border-amber-500/10'}`}>
                        {passed ? <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" /> : <Info className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />}
                        <div>
                          <p className="text-xs font-bold text-white">3. Ledger Consistency</p>
                          {passed ? (
                            <p className="text-[10px] text-emerald-400/80 mt-0.5">No duplicate vocabulary or grammar rules found in other lessons.</p>
                          ) : (
                            <div className="space-y-1 mt-1">
                              {ledgerWarnings.slice(0, 2).map((warn, i) => (
                                <p key={i} className="text-[10px] text-amber-400/80 leading-relaxed">{warn}</p>
                              ))}
                              {ledgerWarnings.length > 2 && <p className="text-[9px] text-amber-500 italic">+{ledgerWarnings.length - 2} duplicates found</p>}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })()}

                  {/* AI Verification Check */}
                  <div className={`p-3 rounded-xl border space-y-2.5 ${aiReport ? (aiReport.passed ? 'bg-emerald-500/5 border-emerald-500/10' : 'bg-red-500/5 border-red-500/10') : 'bg-purple-500/5 border-purple-500/10'}`}>
                    <div className="flex items-start gap-2.5">
                      <Brain className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
                      <div className="flex-1">
                        <p className="text-xs font-bold text-white">4. AI Verification Check</p>
                        <p className="text-[10px] text-gray-400 mt-0.5">Verify curriculum structure and grammatical accuracy.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1.5 pt-1">
                      <select value={selectedModel} onChange={(e) => setSelectedModel(e.target.value)}
                        className={`text-[10px] rounded px-1.5 py-1 ${dark ? 'bg-[#0c1224] border-[#1e2a4a] text-white' : 'bg-white border-gray-300 text-gray-900'} border`}>
                        <option value="gpt-4o-mini">GPT-4o Mini (Default)</option>
                        <option value="claude-sonnet">Claude 3.5 Sonnet</option>
                        <option value="claude-haiku">Claude Haiku</option>
                        <option value="gemini-flash">Gemini 1.5 Flash (Fast)</option>
                        <option value="mistral-large">Mistral Large (FR)</option>
                        <option value="llama-70b">Llama 3.1 70B</option>
                      </select>
                      <button onClick={() => handleAIVerify(selectedDraft._id)} disabled={verifyingAI}
                        className="px-2 py-1 bg-purple-600 hover:bg-purple-500 text-white rounded text-[10px] font-bold flex items-center gap-1 disabled:opacity-50 transition-all ml-auto">
                        {verifyingAI ? <RefreshCw className="w-2.5 h-2.5 animate-spin" /> : <Brain className="w-2.5 h-2.5" />}
                        <span>{verifyingAI ? "Verifying..." : "Run AI Check"}</span>
                      </button>
                    </div>

                    {aiReport && (
                      <div className="border-t border-gray-800/60 pt-2 space-y-1.5">
                        <div className="flex items-center gap-1">
                          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${aiReport.passed ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                            {aiReport.passed ? "Passed" : "Flags Found"}
                          </span>
                        </div>
                        {aiReport.errors && aiReport.errors.length > 0 && (
                          <div className="space-y-0.5">
                            <p className="text-[9px] font-bold text-red-400">Errors:</p>
                            {aiReport.errors.map((err, idx) => <p key={idx} className="text-[9px] text-red-300/90 font-mono leading-tight">- {err}</p>)}
                          </div>
                        )}
                        {aiReport.suggestions && aiReport.suggestions.length > 0 && (
                          <div className="space-y-0.5">
                            <p className="text-[9px] font-bold text-amber-400">Suggestions:</p>
                            {aiReport.suggestions.map((sug, idx) => <p key={idx} className="text-[9px] text-gray-300 leading-tight">- {sug}</p>)}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 border-t pt-4">
                  <button onClick={() => setPublishConfirmId(selectedDraft._id)}
                    disabled={selectedDraft.validationErrors.length > 0}
                    className="flex-1 py-2.5 bg-gradient-to-r from-emerald-500 to-green-500 disabled:from-gray-700 disabled:to-gray-800 disabled:opacity-30 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-emerald-500/10">
                    Publish Lesson
                  </button>
                  <button onClick={() => setDeleteConfirmId(selectedDraft._id)}
                    className="p-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-xs rounded-xl transition-all">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ) : (
              <div className={`${card} border rounded-2xl p-6 text-center text-gray-500 text-sm`}>
                Select a staged draft from the queue to run checks, preview content, and publish.
              </div>
            )}
          </div>

        </div>

      </div>

      {/* PUBLISH CONFIRMATION DIALOG */}
      <AnimatePresence>
        {publishConfirmId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className={`${card} border rounded-2xl max-w-sm w-full p-5 space-y-4 shadow-2xl`}>
              <div className="text-center">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-2" />
                <h3 className="text-base font-bold text-white">Publish Lesson?</h3>
                <p className="text-xs text-gray-400 mt-2">
                  Are you sure you want to publish this lesson draft? If a lesson with ID "{selectedDraft?.lessonId}" is already active, it will be superseded and stored in the historical version archive.
                </p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setPublishConfirmId(null)} className="flex-1 py-2 bg-[#1e2a4a] hover:bg-[#283863] text-gray-300 text-xs font-semibold rounded-lg">
                  Cancel
                </button>
                <button onClick={() => handlePublish(publishConfirmId)} className="flex-1 py-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white text-xs font-bold rounded-lg shadow-lg">
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

    </div>
  );
}
