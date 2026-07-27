import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { apiFetch } from "~/lib/apiFetch";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "~/lib/ThemeContext";
import {
  ArrowLeft, Layers, CheckCircle2, Trash2,
  RefreshCw, Eye, AlertTriangle, CheckCircle, Upload, Sparkles
} from "lucide-react";
import { LessonPage } from "~/components/content/LessonPage";

export const Route = createFileRoute("/admin/pipeline/")({ component: PipelineDashboardPage });

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
  const [pipelineTab, setPipelineTab] = useState<"import" | "drafts" | "integrated" | "published">("import");
  
  const [drafts, setDrafts] = useState<DraftItem[]>([]);
  const [publishedLessons, setPublishedLessons] = useState<any[]>([]);
  const [selectedDraft, setSelectedDraft] = useState<DraftItem | null>(null);
  const [selectedPublished, setSelectedPublished] = useState<any | null>(null);
  const [previewDraftId, setPreviewDraftId] = useState<string | null>(null);
  const [previewLessonId, setPreviewLessonId] = useState<string | null>(null);

  // Safety Confirmation
  const [actionStatus, setActionStatus] = useState({ loading: false, error: "", success: "" });
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [restoreConfirmId, setRestoreConfirmId] = useState<string | null>(null);

  // Bulk Selection & Deletion Mode States
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedDraftIds, setSelectedDraftIds] = useState<string[]>([]);
  const [bulkDeleteModalOpen, setBulkDeleteModalOpen] = useState(false);
  const [bulkDeleteConfirmInput, setBulkDeleteConfirmInput] = useState("");
  const [deletingBulk, setDeletingBulk] = useState(false);

  // Import Parser States
  const [importFormat, setImportFormat] = useState<"markdown" | "json">("markdown");
  const [importMarkdown, setImportMarkdown] = useState("");
  const [importOverrides, setImportOverrides] = useState({
    level: "A1",
    chapterId: "",
    lessonId: "",
    anchorSkill: ""
  });
  const [importingMarkdown, setImportingMarkdown] = useState(false);

  // AI Verification states
  const [verifyingAI, setVerifyingAI] = useState(false);
  const [aiReport, setAiReport] = useState<{ passed: boolean; errors: string[]; suggestions: string[] } | null>(null);
  const [selectedModel, setSelectedModel] = useState("gpt-4o-mini");

  // Assistant Chatbot states
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([
    { role: 'assistant', content: 'Bonjour! I am your FrancPrep Curriculum Coordinator. Ask me anything about lesson parsing, CEFR standards, or content completeness!' }
  ]);
  const [sendingChat, setSendingChat] = useState(false);

  // Edit Draft Modal States
  const [editingDraft, setEditingDraft] = useState<any | null>(null);
  const [editFields, setEditFields] = useState({ title: "", level: "A1", lessonId: "", content: "" });
  const [savingEdit, setSavingEdit] = useState(false);

  const handleOpenEditModal = (draft: any) => {
    setEditingDraft(draft);
    setEditFields({
      title: draft.title || "",
      level: draft.level || "A1",
      lessonId: draft.lessonId || "",
      content: draft.content || (draft.parsedData ? JSON.stringify(draft.parsedData, null, 2) : "")
    });
  };

  const handleSaveDraftEdit = async () => {
    if (!editingDraft) return;
    setSavingEdit(true);
    try {
      let parsedData = editingDraft.parsedData;
      if (editFields.content && editFields.content.trim().startsWith('{')) {
        try {
          parsedData = JSON.parse(editFields.content);
        } catch (e) {}
      }

      const res = await apiFetch(`/admin/content-pipeline/drafts/${editingDraft._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: editFields.title,
          level: editFields.level,
          lessonId: editFields.lessonId,
          content: editFields.content,
          parsedData
        })
      });
      const json = await res.json();
      if (json.success) {
        setActionStatus({ loading: false, error: "", success: `Draft ${editFields.lessonId} updated and re-validated!` });
        fetchDrafts();
        setEditingDraft(null);
      } else {
        setActionStatus({ loading: false, error: json.error || "Failed to save draft edits", success: "" });
      }
    } catch (e: any) {
      setActionStatus({ loading: false, error: e.message || "Network error", success: "" });
    }
    setSavingEdit(false);
  };

  const fetchDrafts = async () => {
    try {
      const res = await apiFetch("/admin/content-pipeline/drafts");
      const json = await res.json();
      if (json.success) {
        setDrafts(json.data || []);
      }
      const pubRes = await apiFetch("/lessons?limit=10");
      const pubJson = await pubRes.json();
      if (pubJson.success) {
        setPublishedLessons(pubJson.data || []);
      }
    } catch (e) {
      console.error(e);
    }
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
          format: importFormat,
          manualOverrides: importOverrides
        })
      });
      const json = await res.json();
      if (json.success) {
        const totalCount = json.data?.totalParsed || 1;
        const stagedResult = json.data?.results?.[0];
        setActionStatus({
          loading: false,
          error: "",
          success: `Successfully parsed & staged ${totalCount} lesson(s) into Content Pipeline!`,
        });
        setImportMarkdown("");
        
        // Fetch latest drafts and select the newly staged draft
        const freshRes = await apiFetch("/admin/content-pipeline/drafts");
        const freshJson = await freshRes.json();
        if (freshJson.success && freshJson.data) {
          setDrafts(freshJson.data);
          if (stagedResult?.draftId) {
            const found = freshJson.data.find((d: any) => d._id === stagedResult.draftId);
            if (found) setSelectedDraft(found);
          } else if (freshJson.data.length > 0) {
            setSelectedDraft(freshJson.data[0]);
          }
        }
        
        setPipelineTab("drafts");
      } else {
        setActionStatus({ loading: false, error: json.error || "Parsing failed", success: "" });
      }
    } catch (e: any) {
      setActionStatus({ loading: false, error: e.message || "Network error", success: "" });
    }
    setImportingMarkdown(false);
  };

  const handleVerifyAI = async (draftId: string) => {
    setVerifyingAI(true);
    setAiReport(null);
    try {
      const res = await apiFetch(`/admin/content-pipeline/drafts/${draftId}/ai-verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: selectedModel })
      });
      const json = await res.json();
      if (json.success) {
        setAiReport(json.data || json.report);
      }
    } catch (e: any) {
      console.error(e);
    }
    setVerifyingAI(false);
  };

  const handlePublish = async (draftId: string) => {
    setActionStatus({ loading: true, error: "", success: "" });
    try {
      const res = await apiFetch(`/admin/content-pipeline/drafts/${draftId}/publish`, { method: "POST" });
      const json = await res.json();
      if (json.success) {
        setActionStatus({ loading: false, error: "", success: `Lesson ${json.data.lessonId} published to live catalog!` });
        fetchDrafts();
        setSelectedDraft(null);
      } else {
        setActionStatus({ loading: false, error: json.error || "Publish failed", success: "" });
      }
    } catch (e: any) {
      setActionStatus({ loading: false, error: e.message || "Network error", success: "" });
    }
  };

  const handleMergeDraft = async (draftId: string) => {
    setActionStatus({ loading: true, error: "", success: "" });
    try {
      const res = await apiFetch(`/admin/content-pipeline/drafts/${draftId}/merge`, { method: "POST" });
      const json = await res.json();
      if (json.success) {
        setActionStatus({ loading: false, error: "", success: json.message || "Integrated additions merged successfully into template!" });
        fetchDrafts();
        setSelectedDraft(null);
      } else {
        setActionStatus({ loading: false, error: json.error || "Merge failed", success: "" });
      }
    } catch (e: any) {
      setActionStatus({ loading: false, error: e.message || "Network error", success: "" });
    }
  };

  const handleDelete = async (id: string) => {
    setActionStatus({ loading: true, error: "", success: "" });
    try {
      const res = await apiFetch(`/admin/content-pipeline/drafts/${id}/trash`, { method: "POST" });
      const json = await res.json();
      if (json.success) {
        setActionStatus({ loading: false, error: "", success: "Draft moved to 60-Day Recycle Bin" });
        setDeleteConfirmId(null);
        if (selectedDraft?._id === id) setSelectedDraft(null);
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

  const handleSendChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || sendingChat) return;
    const userMsg = chatInput.trim();
    setChatInput("");
    setChatMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setSendingChat(true);

    try {
      const res = await apiFetch('/admin/content-pipeline/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg, lessonId: selectedDraft?.lessonId })
      });
      const json = await res.json();
      if (json.success) {
        setChatMessages(prev => [...prev, { role: 'assistant', content: json.reply }]);
      } else {
        setChatMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I couldn't process that request right now." }]);
      }
    } catch (err) {
      setChatMessages(prev => [...prev, { role: 'assistant', content: "Error communicating with Curriculum Coordinator assistant." }]);
    }
    setSendingChat(false);
  };

  // Deduplicate activeStagedDrafts to show only the single latest draft per lessonId in main pipeline workspace (case-insensitive)
  const activeStagedDrafts = Object.values(
    drafts
      .filter(d => (d.status === 'draft' || d.status === 'validated' || d.status === 'review') && d.origin !== 'ai_generator')
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
  const integratedDrafts = drafts.filter(d => d.origin === 'ai_generator' || d.origin === 'ai_polish');
  const supersededDrafts = drafts.filter(d => d.status === 'superseded');

  const handleToggleSelectAll = () => {
    if (selectedDraftIds.length === activeStagedDrafts.length) {
      setSelectedDraftIds([]);
    } else {
      setSelectedDraftIds(activeStagedDrafts.map(d => d._id));
    }
  };

  const handleToggleSelectDraft = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedDraftIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleExecuteBulkDelete = async () => {
    if (bulkDeleteConfirmInput !== "DELETE") return;
    setDeletingBulk(true);
    setActionStatus({ loading: true, error: "", success: "" });

    try {
      let count = 0;
      for (const id of selectedDraftIds) {
        const res = await apiFetch(`/admin/content-pipeline/drafts/${id}/trash`, { method: "POST" });
        const json = await res.json();
        if (json.success) count++;
      }

      setActionStatus({
        loading: false,
        error: "",
        success: `Successfully moved ${count} draft(s) to 60-Day Recycle Bin.`,
      });
      setSelectedDraftIds([]);
      setSelectedDraft(null);
      setBulkDeleteModalOpen(false);
      setBulkDeleteConfirmInput("");
      fetchDrafts();
    } catch (e: any) {
      setActionStatus({
        loading: false,
        error: e.message || "Network error during bulk draft deletion",
        success: "",
      });
    } finally {
      setDeletingBulk(false);
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
              Published Lesson Read-Only Preview
            </span>
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

  return (
    <div className={`min-h-screen ${bg} transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6 pb-20">
        
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <Link to="/admin" className={`inline-flex items-center gap-1 text-xs ${txtSec} hover:text-purple-400 transition-colors mb-2`}>
            <ArrowLeft className="w-3 h-3" /> Back to Admin
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Import Parser & Content Pipeline
                </h1>
                <p className={`text-sm ${txtSec} mt-0.5`}>Deterministic parsing queue & lesson staging workspace</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button onClick={() => setChatOpen(!chatOpen)}
                className="px-3 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Curriculum Assistant</span>
              </button>
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
          <button onClick={() => { setPipelineTab("import"); setSelectedDraft(null); setSelectedPublished(null); }}
            className={`pb-3 font-semibold transition-all border-b-2 ${pipelineTab === "import" ? "border-purple-500 text-purple-400" : "border-transparent text-gray-500 hover:text-gray-300"}`}>
            📥 Import Parser Workspace
          </button>
          <button onClick={() => { setPipelineTab("drafts"); setSelectedDraft(null); setSelectedPublished(null); }}
            className={`pb-3 font-semibold transition-all border-b-2 ${pipelineTab === "drafts" ? "border-purple-500 text-purple-400" : "border-transparent text-gray-500 hover:text-gray-300"}`}>
            📂 Latest Staged Drafts ({activeStagedDrafts.length})
          </button>
          <button onClick={() => { setPipelineTab("integrated"); setSelectedDraft(null); setSelectedPublished(null); }}
            className={`pb-3 font-semibold transition-all border-b-2 ${pipelineTab === "integrated" ? "border-purple-500 text-purple-400" : "border-transparent text-gray-500 hover:text-gray-300"}`}>
            🔄 Latest Integrated Drafts ({integratedDrafts.slice(0, 1).length})
          </button>
          <button onClick={() => { setPipelineTab("published"); setSelectedDraft(null); setSelectedPublished(null); }}
            className={`pb-3 font-semibold transition-all border-b-2 ${pipelineTab === "published" ? "border-purple-500 text-purple-400" : "border-transparent text-gray-500 hover:text-gray-300"}`}>
            👑 Latest Published Content ({publishedLessons.slice(0, 1).length})
          </button>
          <Link to="/admin/pipeline/trash"
            className="pb-3 font-semibold transition-all border-b-2 border-transparent text-gray-500 hover:text-red-400 flex items-center gap-1.5 ml-auto">
            <Trash2 className="w-4 h-4 text-red-500" />
            <span>🗑️ Recycle Bin (Trash)</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* Main Left Side Area depending on Tab */}
          <div className="lg:col-span-2 space-y-4">
            
            {/* TAB 1: 1.b Import Parser */}
            {pipelineTab === "import" && (
              <form onSubmit={handleImportMarkdown} className={`${card} border rounded-2xl p-6 space-y-5`}>
                <div className="border-b border-[#1e2a4a] pb-3 flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Upload className="w-4 h-4 text-purple-400" /> Deterministic Markdown / JSON Parser
                  </h3>
                  <span className="text-[10px] text-gray-400">Zero AI involvement by default</span>
                </div>

                <div className="space-y-3">
                  <label className="block text-xs font-semibold text-gray-400">Select Input Format</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 text-xs text-white cursor-pointer">
                      <input type="radio" name="importFormat" checked={importFormat === "markdown"} onChange={() => setImportFormat("markdown")} className="accent-purple-500" />
                      Plain English Markdown
                    </label>
                    <label className="flex items-center gap-2 text-xs text-white cursor-pointer">
                      <input type="radio" name="importFormat" checked={importFormat === "json"} onChange={() => setImportFormat("json")} className="accent-purple-500" />
                      Pre-Parsed JSON Document
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-semibold text-gray-400">
                      {importFormat === "markdown" ? "Paste or Drop Claude Lesson File (.md / .json)" : "Paste or Drop Schema-Compliant Lesson JSON"}
                    </label>
                    <label className="text-[10px] text-purple-400 cursor-pointer hover:underline flex items-center gap-1">
                      <Upload className="w-3 h-3" /> Drag & Drop File
                      <input type="file" accept=".md,.json,.txt" className="hidden" onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const reader = new FileReader();
                        reader.onload = (evt) => {
                          const text = evt.target?.result as string;
                          if (text) {
                            setImportMarkdown(text);
                            if (file.name.endsWith('.json')) setImportFormat('json');
                            else setImportFormat('markdown');
                          }
                        };
                        reader.readAsText(file);
                      }} />
                    </label>
                  </div>
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
                    <span>Optional Metadata Overrides</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div>
                      <label className="block text-[10px] text-gray-400 mb-1">CEFR Level</label>
                      <select value={importOverrides.level} onChange={(e) => setImportOverrides({ ...importOverrides, level: e.target.value })} className={inp}>
                        <option value="A1">A1</option>
                        <option value="A2">A2</option>
                        <option value="B1">B1</option>
                        <option value="B2">B2</option>
                        <option value="C1">C1</option>
                        <option value="C2">C2</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] text-gray-400 mb-1">Chapter ID (e.g. a1-ch1)</label>
                      <input type="text" value={importOverrides.chapterId} onChange={(e) => setImportOverrides({ ...importOverrides, chapterId: e.target.value })} placeholder="Auto-detect" className={inp} />
                    </div>
                    <div>
                      <label className="block text-[10px] text-gray-400 mb-1">Lesson ID (e.g. a1-ch1-l1)</label>
                      <input type="text" value={importOverrides.lessonId} onChange={(e) => setImportOverrides({ ...importOverrides, lessonId: e.target.value })} placeholder="Auto-detect" className={inp} />
                    </div>
                    <div>
                      <label className="block text-[10px] text-gray-400 mb-1">Anchor Skill</label>
                      <select value={importOverrides.anchorSkill} onChange={(e) => setImportOverrides({ ...importOverrides, anchorSkill: e.target.value })} className={inp}>
                        <option value="">Auto-detect</option>
                        <option value="reading">Reading</option>
                        <option value="writing">Writing</option>
                        <option value="listening">Listening</option>
                        <option value="speaking">Speaking</option>
                        <option value="integrated">Integrated</option>
                        <option value="review">Review</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button type="submit" disabled={importingMarkdown} className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-xs font-bold rounded-xl shadow-lg transition-all flex items-center gap-2 disabled:opacity-50">
                    {importingMarkdown ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                    <span>Parse & Stage Draft</span>
                  </button>
                </div>
              </form>
            )}

            {/* TAB 2, 3, & 4: Staged, Integrated, & Published Latest List */}
            {pipelineTab !== "import" && (
              <div className={`${card} border rounded-2xl p-5 space-y-4`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1e2a4a] pb-3">
                  <h3 className="text-sm font-bold text-white capitalize">
                    Latest {pipelineTab} Push
                  </h3>

                  {pipelineTab === "drafts" && (
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => {
                          setIsSelectMode(!isSelectMode);
                          if (isSelectMode) setSelectedDraftIds([]);
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 border ${
                          isSelectMode
                            ? "bg-purple-600 text-white border-purple-500 shadow"
                            : "bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700"
                        }`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>{isSelectMode ? "Exit Select Mode" : "Select / Bulk Delete 🗑️"}</span>
                      </button>

                      {isSelectMode && (
                        <>
                          <button
                            onClick={handleToggleSelectAll}
                            className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700"
                          >
                            {selectedDraftIds.length === activeStagedDrafts.length ? "Deselect All" : "Select All"}
                          </button>

                          <button
                            onClick={() => {
                              if (selectedDraftIds.length > 0) {
                                setBulkDeleteModalOpen(true);
                                setBulkDeleteConfirmInput("");
                              }
                            }}
                            disabled={selectedDraftIds.length === 0}
                            className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-all disabled:opacity-40 flex items-center gap-1 shadow-md shadow-red-600/20"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete Selected ({selectedDraftIds.length})</span>
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>

                {pipelineTab === "published" ? (
                  publishedLessons.slice(0, 1).length === 0 ? (
                    <div className="py-12 text-center text-gray-500 text-xs">
                      No published lesson records found in database.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {publishedLessons.slice(0, 1).map((l) => (
                        <div key={l._id} onClick={() => { setSelectedPublished(l); setSelectedDraft(null); }}
                          className={`p-4 rounded-xl border cursor-pointer transition-all ${
                            selectedPublished?._id === l._id ? "bg-amber-500/10 border-amber-500/40" : "hover:border-amber-500/20"
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
                      ))}
                    </div>
                  )
                ) : (
                  (pipelineTab === "drafts" ? activeStagedDrafts : integratedDrafts).length === 0 ? (
                    <div className="py-12 text-center text-gray-500 text-xs">
                      No active {pipelineTab} pushed yet. Use the Import Parser to create one.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {(pipelineTab === "drafts" ? activeStagedDrafts : integratedDrafts).map((d) => {
                        const isSelected = selectedDraft?._id === d._id;
                        const isChecked = selectedDraftIds.includes(d._id);
                        const hasErrors = d.validationErrors && d.validationErrors.length > 0;
                        const lessonNum = d.lessonId?.match(/-l(\d+)$/)?.[1] || '';
                        return (
                          <div key={d._id} onClick={(e) => {
                              if (isSelectMode) {
                                handleToggleSelectDraft(d._id, e);
                              } else {
                                setSelectedDraft(d);
                                setSelectedPublished(null);
                              }
                            }}
                            className={`p-4 rounded-xl border cursor-pointer transition-all ${
                              isChecked
                                ? "bg-purple-500/20 border-purple-500 shadow-md"
                                : isSelected
                                ? "bg-purple-500/10 border-purple-500/40"
                                : "hover:border-purple-500/20"
                            } ${dark ? "bg-[#0c1224] border-[#1e2a4a]" : "bg-white border-gray-200"}`}>
                            <div className="flex items-start gap-3 justify-between">
                              <div className="flex items-start gap-3">
                                {isSelectMode && (
                                  <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={(e) => handleToggleSelectDraft(d._id, e as any)}
                                    onClick={(e) => e.stopPropagation()}
                                    className="w-5 h-5 mt-0.5 accent-purple-500 cursor-pointer rounded shrink-0"
                                  />
                                )}
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-400">{d.level}</span>
                                    <span className="text-[10px] font-mono text-gray-400">{d.lessonId}</span>
                                    {lessonNum && <span className="text-[10px] font-bold text-gray-500">L{lessonNum}</span>}
                                  </div>
                                  <h4 className="text-xs font-bold text-white mt-1.5">{d.title}</h4>
                                </div>
                              </div>
                              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold shrink-0 ${
                                hasErrors ? "bg-red-500/10 text-red-400" : "bg-emerald-500/10 text-emerald-400"
                              }`}>
                                {hasErrors ? `❌ ${d.validationErrors.length} Errors` : "✓ Valid"}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )
                )}
              </div>
            )}
          </div>

          {/* Right Inspector Panel */}
          <div className="lg:col-span-1">
            {selectedPublished ? (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className={`${card} border rounded-2xl p-5 space-y-5 sticky top-24`}>
                <div className="border-b border-[#1e2a4a] pb-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400 font-mono">{selectedPublished.lessonId}</span>
                    <span className="text-[10px] font-bold text-amber-400 px-2 py-0.5 rounded-full bg-amber-500/10">Live Published</span>
                  </div>
                  <h2 className="text-base font-bold text-white mt-1">{selectedPublished.title}</h2>
                  
                  <div className="flex flex-wrap gap-2 mt-3">
                    <button onClick={() => setPreviewLessonId(selectedPublished.lessonId)} className="px-3 py-1 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 text-amber-400 text-xs font-semibold rounded-lg transition-all flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" /> Read-Only Preview
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : selectedDraft ? (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className={`${card} border rounded-2xl p-5 space-y-5 sticky top-24`}>
                <div className="border-b border-[#1e2a4a] pb-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400 font-mono">{selectedDraft.lessonId}</span>
                    <span className="text-[10px] font-bold text-purple-400 px-2 py-0.5 rounded-full bg-purple-500/10">v{selectedDraft.version}</span>
                  </div>
                  <h2 className="text-base font-bold text-white mt-1">{selectedDraft.title}</h2>
                  
                  <div className="flex flex-wrap gap-2 mt-3">
                    <button onClick={() => handleOpenEditModal(selectedDraft)} className="px-3 py-1 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 text-amber-400 text-xs font-bold rounded-lg transition-all flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" /> ✏️ Edit Draft
                    </button>
                    <button onClick={() => setPreviewDraftId(selectedDraft._id)} className="px-3 py-1 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 text-purple-400 text-xs font-semibold rounded-lg transition-all flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" /> Live Preview
                    </button>
                    {pipelineTab === "integrated" ? (
                      <button onClick={() => handleMergeDraft(selectedDraft._id)} className="px-3 py-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold rounded-lg shadow-md transition-all flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5" /> Merge into Template
                      </button>
                    ) : (
                      <button onClick={() => handlePublish(selectedDraft._id)} className="px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-xs font-bold rounded-lg shadow-md transition-all flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5" /> Publish to Live
                      </button>
                    )}
                    <button onClick={() => setDeleteConfirmId(selectedDraft._id)} className="px-2 py-1 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 text-xs font-semibold rounded-lg transition-all">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className={`${card} border rounded-2xl p-6 text-center text-gray-500 text-xs`}>
                Select an item from the list to view details & actions.
              </div>
            )}
          </div>
        </div>

        {/* CURRICULUM ASSISTANT CHATBOT DRAWER */}
        <AnimatePresence>
          {chatOpen && (
            <motion.div initial={{ opacity: 0, x: 300 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 300 }}
              className={`fixed right-0 top-0 bottom-0 w-80 sm:w-96 z-50 ${card} border-l shadow-2xl flex flex-col backdrop-blur-xl`}>
              <div className="p-4 border-b border-[#1e2a4a] space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    <h3 className="text-sm font-bold text-white">Curriculum Coordinator</h3>
                  </div>
                  <button onClick={() => setChatOpen(false)} className="text-xs text-gray-400 hover:text-white">✕</button>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] text-gray-400">Select LLM Provider:</span>
                  <select value={selectedModel} onChange={e => setSelectedModel(e.target.value)}
                    className={`text-[10px] rounded px-2 py-0.5 ${dark ? 'bg-[#0c1224] border-[#1e2a4a] text-white' : 'bg-white border-gray-300 text-gray-900'} border`}>
                    <option value="claude-sonnet">Claude 3.5 Sonnet</option>
                    <option value="gpt-4o-mini">GPT-4o Mini</option>
                    <option value="gemini-flash">Gemini Flash</option>
                    <option value="llama-70b">Llama 70B</option>
                  </select>
                </div>
              </div>

              <div className="p-2 border-b border-[#1e2a4a] bg-purple-500/5 flex flex-wrap gap-1.5">
                {[
                  "🔍 Audit selected draft",
                  "📝 Verify CEFR level fit",
                  "💡 Suggest 3 extra exercises",
                  "📚 Check vocabulary ledger"
                ].map((chip, idx) => (
                  <button key={idx} onClick={() => {
                    setChatInput(chip);
                  }} className="text-[9px] px-2 py-1 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/20 transition-all">
                    {chip}
                  </button>
                ))}
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {chatMessages.map((m, idx) => (
                  <div key={idx} className={`p-3 rounded-xl text-xs ${m.role === 'user' ? 'bg-purple-600/20 text-purple-200 border border-purple-500/30 ml-6' : 'bg-[#0c1224] text-gray-200 border border-[#1e2a4a] mr-6'}`}>
                    {m.content}
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendChat} className="p-3 border-t border-[#1e2a4a] flex gap-2">
                <input type="text" value={chatInput} onChange={e => setChatInput(e.target.value)} placeholder="Ask about curriculum..." className={inp} />
                <button type="submit" disabled={sendingChat} className="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-xl disabled:opacity-50">
                  {sendingChat ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : "Send"}
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Delete Confirmation Modal */}
        {deleteConfirmId && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className={`max-w-md w-full rounded-2xl p-6 border shadow-2xl ${dark ? "bg-[#101828] border-[#1e2a4a] text-white" : "bg-white border-gray-200 text-gray-900"}`}>
              <div className="flex items-center gap-3 text-red-500 mb-3">
                <Trash2 className="w-6 h-6" />
                <h3 className="text-base font-bold">Delete Staged Draft?</h3>
              </div>
              <p className={`text-xs ${dark ? "text-gray-300" : "text-gray-600"} leading-relaxed mb-5`}>
                Are you sure you want to delete this staged draft? It will be moved to the 60-Day Recycle Bin where you can restore it anytime.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setDeleteConfirmId(null)}
                  className={`px-4 py-2 text-xs font-semibold rounded-xl border ${dark ? "border-[#1e2a4a] text-gray-400 hover:bg-white/5" : "border-gray-200 text-gray-600 hover:bg-gray-100"}`}
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirmId)}
                  disabled={actionStatus.loading}
                  className="px-4 py-2 text-xs font-bold rounded-xl bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-500/20 transition-all flex items-center gap-1.5"
                >
                  {actionStatus.loading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : "Move to Recycle Bin"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* INTERACTIVE DRAFT EDITOR MODAL */}
        {editingDraft && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
            <div className={`max-w-3xl w-full rounded-2xl p-6 border shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto ${dark ? "bg-[#101828] border-[#1e2a4a] text-white" : "bg-white border-slate-300 text-slate-900"}`}>
              <div className="flex items-center justify-between border-b border-[#1e2a4a] pb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-400" />
                  <h3 className="text-base font-bold">Edit Staged Draft ({editingDraft.lessonId})</h3>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setPreviewDraftId(editingDraft._id);
                      setEditingDraft(null);
                    }}
                    className="px-3 py-1 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-bold rounded-lg flex items-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" /> Open Visual Live-Edit Preview
                  </button>
                  <button onClick={() => setEditingDraft(null)} className="text-gray-400 hover:text-white text-xs">✕</button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[10px] text-gray-400 mb-1">Title</label>
                  <input
                    type="text"
                    value={editFields.title}
                    onChange={(e) => setEditFields({ ...editFields, title: e.target.value })}
                    className={inp}
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-gray-400 mb-1">Lesson ID</label>
                  <input
                    type="text"
                    value={editFields.lessonId}
                    onChange={(e) => setEditFields({ ...editFields, lessonId: e.target.value })}
                    className={inp}
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-gray-400 mb-1">CEFR Level</label>
                  <select
                    value={editFields.level}
                    onChange={(e) => setEditFields({ ...editFields, level: e.target.value })}
                    className={inp}
                  >
                    <option value="A1">A1</option>
                    <option value="A2">A2</option>
                    <option value="B1">B1</option>
                    <option value="B2">B2</option>
                    <option value="C1">C1</option>
                    <option value="C2">C2</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] text-gray-400 mb-1">Raw Markdown / JSON Content Payload</label>
                <textarea
                  rows={14}
                  value={editFields.content}
                  onChange={(e) => setEditFields({ ...editFields, content: e.target.value })}
                  className="w-full rounded-xl px-3 py-2 text-xs font-mono border dark:bg-[#0c1224] dark:border-[#1e2a4a] text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#1e2a4a]">
                <span className="text-[10px] text-gray-400">Saving will update draft payload and re-run validation checks.</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingDraft(null)}
                    className="px-4 py-2 text-xs font-semibold rounded-xl border dark:border-[#1e2a4a] text-gray-400 hover:bg-white/5"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveDraftEdit}
                    disabled={savingEdit}
                    className="px-5 py-2 text-xs font-bold rounded-xl bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-600/30 flex items-center gap-1.5"
                  >
                    {savingEdit ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : "💾 Save Draft Changes"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bulk Delete Confirmation Modal */}
        {bulkDeleteModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
            <div className={`max-w-md w-full rounded-2xl p-6 border shadow-2xl space-y-4 ${dark ? "bg-[#101828] border-[#1e2a4a] text-white" : "bg-white border-slate-200 text-slate-900"}`}>
              <div className="flex items-center gap-3 text-red-500">
                <Trash2 className="w-6 h-6" />
                <h3 className="text-base font-bold">Bulk Delete Staged Drafts?</h3>
              </div>
              <p className={`text-xs ${dark ? "text-gray-300" : "text-slate-600"} leading-relaxed`}>
                You are about to permanently delete <strong>{selectedDraftIds.length}</strong> staged draft record(s). This action cannot be undone.
              </p>
              <div className="space-y-2 pt-2">
                <label className="block text-[11px] font-bold text-red-400 uppercase tracking-wider">
                  Type "DELETE" to confirm:
                </label>
                <input
                  type="text"
                  value={bulkDeleteConfirmInput}
                  onChange={(e) => setBulkDeleteConfirmInput(e.target.value)}
                  placeholder="DELETE"
                  className={inp}
                />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => { setBulkDeleteModalOpen(false); setBulkDeleteConfirmInput(""); }}
                  className={`px-4 py-2 text-xs font-semibold rounded-xl border ${dark ? "border-[#1e2a4a] text-gray-400 hover:bg-white/5" : "border-slate-200 text-slate-600 hover:bg-slate-100"}`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleExecuteBulkDelete}
                  disabled={bulkDeleteConfirmInput !== "DELETE" || deletingBulk}
                  className="px-4 py-2 text-xs font-bold rounded-xl bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-500/20 transition-all disabled:opacity-40 flex items-center gap-1.5"
                >
                  {deletingBulk ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : "Delete Selected Drafts"}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
