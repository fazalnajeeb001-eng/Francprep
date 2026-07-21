import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { apiFetch } from "~/lib/apiFetch";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "~/lib/ThemeContext";
import {
  ArrowLeft, Shield, CheckCircle2, AlertCircle, Trash2,
  RefreshCw, Eye, AlertTriangle, Database, Search, Sparkles, Wrench
} from "lucide-react";
import { LessonPage } from "~/components/content/LessonPage";

export const Route = createFileRoute("/admin/pipeline/audit")({ component: AuditsAndQualityPage });

interface AuditReportItem {
  lessonId: string;
  title: string;
  level: string;
  status: 'pass' | 'fail';
  schemaErrors: string[];
  qualityWarnings: string[];
}

function AuditsAndQualityPage() {
  const { dark } = useTheme();
  const [selectedLevel, setSelectedLevel] = useState("A1");
  const [auditing, setAuditing] = useState(false);
  const [fixing, setFixing] = useState(false);
  const [reports, setReports] = useState<AuditReportItem[]>([]);
  const [passedCount, setPassedCount] = useState(0);
  const [failedCount, setFailedCount] = useState(0);
  const [totalAudited, setTotalAudited] = useState(0);
  const [selectedReport, setSelectedReport] = useState<AuditReportItem | null>(null);
  const [previewLessonId, setPreviewLessonId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedModel, setSelectedModel] = useState("claude-sonnet");
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([
    { role: 'assistant', content: 'Bonjour! I am your FrancPrep Curriculum Coordinator. Ask me anything about audit results or content quality fixes!' }
  ]);
  const [sendingChat, setSendingChat] = useState(false);
  const [actionStatus, setActionStatus] = useState({ loading: false, error: "", success: "" });

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
        body: JSON.stringify({ message: userMsg, lessonId: selectedReport?.lessonId })
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

  const runAudit = async (level: string) => {
    setAuditing(true);
    setActionStatus({ loading: true, error: "", success: "" });
    try {
      const res = await apiFetch(`/admin/content-pipeline/audit-all?level=${level}`);
      const json = await res.json();
      if (json.success) {
        setReports(json.reports || []);
        setPassedCount(json.passed || 0);
        setFailedCount(json.failed || 0);
        setTotalAudited(json.totalAudited || 0);
        setActionStatus({
          loading: false,
          error: "",
          success: `Audit complete: ${json.passed}/${json.totalAudited} lessons passed quality & schema checks!`,
        });
      } else {
        setActionStatus({ loading: false, error: json.error || "Audit failed", success: "" });
      }
    } catch (e: any) {
      setActionStatus({ loading: false, error: e.message || "Network error", success: "" });
    }
    setAuditing(false);
  };

  useEffect(() => {
    runAudit(selectedLevel);
  }, [selectedLevel]);

  const handleAutoFix = async (mode: 'ai' | 'quick' = 'ai') => {
    setFixing(true);
    setActionStatus({ loading: true, error: "", success: "" });
    try {
      const failedIds = reports.filter(r => r.status === 'fail').map(r => r.lessonId);
      const res = await apiFetch("/admin/content-pipeline/auto-fix", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lessonIds: failedIds, mode, model: "claude-sonnet" }),
      });
      const json = await res.json();
      if (json.success) {
        setActionStatus({
          loading: false,
          error: "",
          success: `Auto-repair complete using ${mode === 'ai' ? 'AI Smart-Repair (Claude 3.5 Sonnet)' : 'Quick Clean'}! ${json.repairedCount} lesson records repaired cleanly.`,
        });
        runAudit(selectedLevel);
      } else {
        setActionStatus({ loading: false, error: json.error || "Auto-fix failed", success: "" });
      }
    } catch (e: any) {
      setActionStatus({ loading: false, error: e.message || "Network error", success: "" });
    }
    setFixing(false);
  };

  const filteredReports = reports.filter(
    (r) =>
      (r.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (r.lessonId || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (r.level || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  const bg = dark ? "bg-[#070B17]" : "bg-gray-50";
  const card = dark ? "bg-[#101828]/80 border-[#1e2a4a]" : "bg-white/80 border-gray-200";
  const txtSec = dark ? "text-gray-400" : "text-gray-500";
  const inp = `w-full rounded-xl ${dark ? "bg-[#070B17] border-[#1e2a4a] text-white" : "bg-white border-gray-300 text-gray-900"} border px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`;

  if (previewLessonId) {
    return (
      <div className="fixed inset-0 z-50 bg-[#070B17] overflow-y-auto">
        <div className="sticky top-0 z-50 bg-[#101828]/90 border-b border-[#1e2a4a] px-6 py-3 flex items-center justify-between backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30">
              Lesson Quality Live Preview
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

  return (
    <div className={`min-h-screen ${bg} transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6 pb-20">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <Link to="/admin/pipeline" className={`inline-flex items-center gap-1 text-xs ${txtSec} hover:text-purple-400 transition-colors mb-2`}>
            <ArrowLeft className="w-3 h-3" /> Back to Main Pipeline Workspace
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Audits & Quality Check
                </h1>
                <p className={`text-sm ${txtSec} mt-0.5`}>Deep quality audit engine: Schema validation + pedagogical completeness</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <select value={selectedLevel} onChange={(e) => setSelectedLevel(e.target.value)} className={inp}>
                <option value="A1">Level A1 (80 Lessons)</option>
                <option value="A2">Level A2</option>
                <option value="B1">Level B1</option>
                <option value="B2">Level B2</option>
                <option value="C1">Level C1</option>
                <option value="C2">Level C2</option>
                <option value="ALL">All Levels</option>
              </select>
              <button onClick={() => runAudit(selectedLevel)} disabled={auditing}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 disabled:opacity-50">
                {auditing ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />}
                <span>Re-Audit</span>
              </button>
              <button onClick={() => setChatOpen(!chatOpen)}
                className="px-3 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Curriculum Assistant</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Audit Metric Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className={`${card} border rounded-2xl p-4 flex items-center justify-between`}>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase">Total Lessons Audited</p>
              <h3 className="text-xl font-extrabold text-white mt-1">{totalAudited}</h3>
            </div>
            <Database className="w-8 h-8 text-purple-400 opacity-40" />
          </div>

          <div className={`${card} border rounded-2xl p-4 flex items-center justify-between`}>
            <div>
              <p className="text-[10px] font-bold text-emerald-400 uppercase">100% Passed Clean</p>
              <h3 className="text-xl font-extrabold text-emerald-400 mt-1">{passedCount}</h3>
            </div>
            <CheckCircle2 className="w-8 h-8 text-emerald-400 opacity-40" />
          </div>

          <div className={`${card} border rounded-2xl p-4 flex items-center justify-between`}>
            <div>
              <p className="text-[10px] font-bold text-red-400 uppercase">Flagged Issues</p>
              <h3 className="text-xl font-extrabold text-red-400 mt-1">{failedCount}</h3>
            </div>
            {failedCount > 0 ? (
              <div className="flex flex-col gap-1.5">
                <button onClick={() => handleAutoFix('ai')} disabled={fixing}
                  className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 text-white text-[10px] font-bold rounded-xl shadow-md flex items-center gap-1">
                  {fixing ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                  <span>🤖 AI Smart-Repair</span>
                </button>
                <button onClick={() => handleAutoFix('quick')} disabled={fixing}
                  className="px-3 py-1 bg-gray-500/10 hover:bg-gray-500/20 text-gray-300 text-[9px] font-bold rounded-xl border border-gray-500/20 flex items-center justify-center gap-1">
                  <Wrench className="w-2.5 h-2.5" />
                  <span>⚡ Quick Clean</span>
                </button>
              </div>
            ) : (
              <Shield className="w-8 h-8 text-emerald-400 opacity-40" />
            )}
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
              <div className="flex items-center justify-between border-b pb-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Shield className="w-4 h-4 text-purple-400" /> Audit Results Breakdown ({filteredReports.length})
                </h3>
                <div className="relative w-48 sm:w-64">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-gray-500" />
                  <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Filter by title or lessonId..." className={`${inp} pl-8 py-1.5`} />
                </div>
              </div>

              {auditing ? (
                <div className="py-12 text-center text-gray-500 text-xs flex items-center justify-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin text-purple-400" /> Running deep audit checks...
                </div>
              ) : filteredReports.length === 0 ? (
                <div className="py-12 text-center text-gray-500 text-xs">
                  No lesson audit records found matching query.
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredReports.map((r) => {
                    const isSelected = selectedReport?.lessonId === r.lessonId;
                    const isPass = r.status === 'pass';
                    return (
                      <div key={r.lessonId} onClick={() => setSelectedReport(r)}
                        className={`p-4 rounded-xl border cursor-pointer transition-all ${
                          isSelected ? "bg-purple-500/10 border-purple-500/40" : "hover:border-purple-500/20"
                        } ${dark ? "bg-[#0c1224] border-[#1e2a4a]" : "bg-white border-gray-200"}`}>
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-400">{r.level}</span>
                              <span className="text-[10px] font-mono text-gray-400">{r.lessonId}</span>
                            </div>
                            <h4 className="text-xs font-bold text-white mt-1.5">{r.title}</h4>
                          </div>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                            isPass ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"
                          }`}>
                            {isPass ? "✓ 100% Passed" : `❌ ${r.schemaErrors.length + r.qualityWarnings.length} Issues Flagged`}
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
            {selectedReport ? (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className={`${card} border rounded-2xl p-5 space-y-5 sticky top-24`}>
                <div className="border-b pb-3">
                  <span className="text-xs text-gray-400 font-mono">{selectedReport.lessonId}</span>
                  <h2 className="text-base font-bold text-white mt-1">{selectedReport.title}</h2>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <button onClick={() => setPreviewLessonId(selectedReport.lessonId)}
                      className="px-3 py-1 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 text-purple-400 text-xs font-semibold rounded-lg transition-all flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" /> Preview & Edit Lesson
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Detailed Audit Findings</h3>

                  {selectedReport.schemaErrors.length > 0 && (
                    <div className="p-3 rounded-xl bg-red-500/5 border border-red-500/10 space-y-1.5">
                      <p className="text-xs font-bold text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> Schema Validation Errors ({selectedReport.schemaErrors.length})
                      </p>
                      {selectedReport.schemaErrors.map((err, i) => (
                        <p key={i} className="text-[10px] text-red-300 font-mono leading-relaxed">• {err}</p>
                      ))}
                    </div>
                  )}

                  {selectedReport.qualityWarnings.length > 0 && (
                    <div className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/10 space-y-1.5">
                      <p className="text-xs font-bold text-amber-400 flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" /> Quality & Completeness Warnings ({selectedReport.qualityWarnings.length})
                      </p>
                      {selectedReport.qualityWarnings.map((warn, i) => (
                        <p key={i} className="text-[10px] text-amber-300 font-mono leading-relaxed">• {warn}</p>
                      ))}
                    </div>
                  )}

                  {selectedReport.schemaErrors.length === 0 && selectedReport.qualityWarnings.length === 0 && (
                    <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10 text-emerald-400 text-xs flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" /> This lesson passed all schema rules and pedagogical completeness checks!
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              <div className={`${card} border rounded-2xl p-6 text-center text-gray-500 text-xs`}>
                Select a lesson from the audit list to inspect findings.
              </div>
            )}
          </div>
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
                "🔍 Explain flagged issues",
                "🤖 Run AI Smart-Repair",
                "📝 Verify CEFR level fit",
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
              <input type="text" value={chatInput} onChange={e => setChatInput(e.target.value)} placeholder="Ask about audit or repairs..." className={inp} />
              <button type="submit" disabled={sendingChat} className="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-xl disabled:opacity-50">
                {sendingChat ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : "Send"}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
