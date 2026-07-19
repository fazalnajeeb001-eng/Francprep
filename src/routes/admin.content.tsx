import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { apiFetch } from "~/lib/apiFetch";
import { motion } from "framer-motion";
import {
  ArrowLeft, Upload, Check, AlertTriangle, FileText, Sparkles,
  Loader2, Wand2, Code, Clipboard,
  CheckCircle2, XCircle, AlertCircle, Info, Brain
} from "lucide-react";
import { useTheme } from "~/lib/ThemeContext";

export const Route = createFileRoute("/admin/content")({ component: ContentGeneratorPage });

const levels = ["A1", "A2", "B1", "B2", "C1", "C2"];
const categories = ["grammar", "vocabulary", "listening", "reading", "writing", "speaking"];

type Step = "prompt" | "paste" | "validate" | "done";

interface ValidationError {
  path: string;
  message: string;
  severity: "error" | "warning";
}

function ContentGeneratorPage() {
  const { dark } = useTheme();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [step, setStep] = useState<Step>("prompt");
  const [rawJSON, setRawJSON] = useState("");
  const [level, setLevel] = useState("A1");
  const [category, setCategory] = useState("vocabulary");
  const [topic, setTopic] = useState("");
  const [vocabCount, setVocabCount] = useState(10);
  const [exerciseCount, setExerciseCount] = useState(3);
  const [chapterId, setChapterId] = useState("");
  const [order, setOrder] = useState(1);
  const [isPublished, setIsPublished] = useState(false);

  const [validating, setValidating] = useState(false);
  const [importing, setImporting] = useState(false);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [warnings, setWarnings] = useState<ValidationError[]>([]);
  const [importResult, setImportResult] = useState<any>(null);
  const [apiError, setApiError] = useState("");

  const [chapters, setChapters] = useState<any[]>([]);
  const [showJSONExample, setShowJSONExample] = useState(false);
  const [generating, setGenerating] = useState(false);

  // AI Generator Upgrades
  const [lessons, setLessons] = useState<any[]>([]);
  const [selectedLessonId, setSelectedLessonId] = useState("");
  const [extendInstruction, setExtendInstruction] = useState("");
  const [generatorType, setGeneratorType] = useState<"new" | "extend" | "placement" | "settings">("new");
  const [selectedModel, setSelectedModel] = useState("gpt-4o-mini");

  // Inline AI settings configuration states
  const [stripeForm, setStripeForm] = useState<any>({});
  const [anthropicKey, setAnthropicKey] = useState("");
  const [openRouterKey, setOpenRouterKey] = useState("");
  const [saveSettingsSuccess, setSaveSettingsSuccess] = useState("");
  const [testClaudeLoading, setTestClaudeLoading] = useState(false);
  const [testClaudeResult, setTestClaudeResult] = useState("");
  const [testORLoading, setTestORLoading] = useState(false);
  const [testORResult, setTestORResult] = useState("");

  useEffect(() => {
    apiFetch("/chapters").then((r) => r.json()).then((j) => {
      if (j.success) setChapters(j.data || []);
    }).catch(() => {});

    apiFetch("/lessons?limit=100").then((r) => r.json()).then((j) => {
      if (j.success) setLessons(j.data || []);
    }).catch(() => {});

    apiFetch("/settings").then((r) => r.json()).then((j) => {
      if (j.success && j.data) {
        setStripeForm(j.data);
        setAnthropicKey(j.data.anthropicApiKey || "");
        setOpenRouterKey(j.data.openRouterApiKey || "");
      }
    }).catch(() => {});
  }, []);

  const bg = dark ? "bg-[#070B17]" : "bg-gray-50";
  const card = dark ? "bg-[#101828]/80 border-[#1e2a4a]" : "bg-white/80 border-gray-200";
  const inp = `w-full rounded-xl ${dark ? "bg-[#070B17] border-[#1e2a4a] text-white" : "bg-white border-gray-300 text-gray-900"} border px-4 py-2.5 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`;
  const txtSec = dark ? "text-gray-400" : "text-gray-500";

  const handleGenerateWithAI = async () => {
    if (!topic.trim()) { setApiError("Please enter a topic first"); return; }
    setGenerating(true); setApiError("");
    try {
      const res = await apiFetch("/content/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ level, category, topic, vocabCount, exerciseCount, model: selectedModel }),
      });
      const json = await res.json();
      if (json.success && json.data) {
        setRawJSON(json.data.json);
        if (json.data.validation && !json.data.validation.valid) {
          setErrors(json.data.validation.errors.filter((e: any) => e.severity === "error"));
          setWarnings(json.data.validation.errors.filter((e: any) => e.severity === "warning"));
        }
        setStep("paste");
      } else {
        setApiError(json.error || "Generation failed. Check your API key in Settings.");
      }
    } catch (e: any) {
      setApiError(e.message || "Network error");
    }
    setGenerating(false);
  };

  const handleExtendLesson = async () => {
    if (!selectedLessonId || !extendInstruction.trim()) {
      setApiError("Please select a lesson and enter instructions.");
      return;
    }
    setGenerating(true); setApiError("");
    try {
      const res = await apiFetch("/content/extend-lesson", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lessonId: selectedLessonId, instruction: extendInstruction, model: selectedModel }),
      });
      const json = await res.json();
      if (json.success) {
        setImportResult(json.data);
        setStep("done");
      } else {
        setApiError(json.error || "Extension failed");
      }
    } catch (e: any) {
      setApiError(e.message || "Network error");
    }
    setGenerating(false);
  };

  const handleGeneratePlacement = async () => {
    setGenerating(true); setApiError("");
    try {
      const res = await apiFetch("/content/generate-placement", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: selectedModel }),
      });
      const json = await res.json();
      if (json.success) {
        setImportResult(json.data);
        setStep("done");
      } else {
        setApiError(json.error || "Placement test generation failed");
      }
    } catch (e: any) {
      setApiError(e.message || "Network error");
    }
    setGenerating(false);
  };

  const handleSaveAISettings = async () => {
    setSaveSettingsSuccess("");
    try {
      const res = await apiFetch("/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...stripeForm,
          anthropicApiKey: anthropicKey,
          openRouterApiKey: openRouterKey,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setSaveSettingsSuccess("AI API Keys updated successfully!");
        setTimeout(() => setSaveSettingsSuccess(""), 4000);
      } else {
        setApiError(json.error || "Failed to update API keys");
      }
    } catch (err: any) {
      setApiError(err.message || "Network error");
    }
  };

  const handleTestClaude = async () => {
    setTestClaudeLoading(true); setTestClaudeResult("");
    try {
      const res = await apiFetch("/settings/test-anthropic", { method: "POST" });
      const json = await res.json();
      setTestClaudeResult(json.success ? "Connection Successful!" : json.error);
    } catch { setTestClaudeResult("Network error"); }
    setTestClaudeLoading(false);
  };

  const handleTestOpenRouter = async () => {
    setTestORLoading(true); setTestORResult("");
    try {
      const res = await apiFetch("/settings/test-openrouter", { method: "POST" });
      const json = await res.json();
      setTestORResult(json.success ? "Connection Successful!" : json.error);
    } catch { setTestORResult("Network error"); }
    setTestORLoading(false);
  };

  const handleValidate = async () => {
    if (!rawJSON.trim()) return;
    setValidating(true); setApiError(""); setErrors([]); setWarnings([]);
    try {
      const res = await apiFetch("/content/validate-json", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ json: rawJSON }),
      });
      const json = await res.json();
      if (json.success) {
        const data = json.data;
        setErrors(data.errors.filter((e: any) => e.severity === "error"));
        setWarnings(data.errors.filter((e: any) => e.severity === "warning"));
        setStep("validate");
      } else {
        setApiError(json.error || "Validation failed");
      }
    } catch (e: any) {
      setApiError(e.message || "Network error");
    }
    setValidating(false);
  };

  const handleImport = async () => {
    setImporting(true); setApiError("");
    try {
      const res = await apiFetch("/content/import-json", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ json: rawJSON, chapterId: chapterId || null, order, isPublished }),
      });
      const json = await res.json();
      if (json.success) {
        setImportResult(json.data);
        setStep("done");
      } else {
        setApiError(json.error || "Import failed");
      }
    } catch (e: any) {
      setApiError(e.message || "Network error");
    }
    setImporting(false);
  };

  const steps = [
    { key: "prompt", label: "Configure", icon: Wand2 },
    { key: "paste", label: "Review", icon: Code },
    { key: "validate", label: "Validate", icon: CheckCircle2 },
    { key: "done", label: "Done", icon: Sparkles },
  ];

  return (
    <div className={`min-h-screen ${bg} transition-colors duration-300`}>
      <div className="max-w-5xl mx-auto p-6 space-y-6 pb-20">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <Link to="/admin" className={`inline-flex items-center gap-1 text-xs ${txtSec} hover:text-purple-400 transition-colors mb-2`}>
            <ArrowLeft className="w-3 h-3" /> Back to Admin
          </Link>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            🪄 AI Content Generator
          </h1>
          <p className={`text-sm ${txtSec} mt-1`}>Configure topic → AI generates lesson → review → upload</p>
        </motion.div>

        <div className="flex items-center gap-2">
          {steps.map((s, i) => {
            const currentIdx = steps.findIndex((x) => x.key === step);
            const thisIdx = steps.findIndex((x) => x.key === s.key);
            const isComplete = thisIdx < currentIdx;
            const isCurrent = s.key === step;
            return (
              <div key={s.key} className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  isCurrent ? "bg-purple-500 text-white shadow-lg shadow-purple-500/30" :
                  isComplete ? "bg-emerald-500 text-white" :
                  dark ? "bg-[#1e2a4a] text-gray-500" : "bg-gray-200 text-gray-400"
                }`}>
                  {isComplete ? <Check className="w-3.5 h-3.5" /> : <s.icon className="w-3.5 h-3.5" />}
                </div>
                <span className={`text-xs font-medium hidden sm:inline ${isCurrent ? "text-purple-400" : txtSec}`}>{s.label}</span>
                {i < steps.length - 1 && <div className={`w-8 h-0.5 ${isComplete ? "bg-emerald-500" : dark ? "bg-[#1e2a4a]" : "bg-gray-200"}`} />}
              </div>
            );
          })}
        </div>

        {apiError && (
          <div className="rounded-xl bg-red-500/10 border border-red-500/30 px-4 py-3 text-sm text-red-400 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" /> {apiError}
          </div>
        )}

        {/* STEP 1: Configure & Generate */}
        {step === "prompt" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div className={`${card} backdrop-blur-lg border rounded-2xl p-6 space-y-4`}>
              <div className="flex items-center gap-2 mb-2">
                <Wand2 className="w-5 h-5 text-purple-400" />
                <h2 className={`text-lg font-semibold ${dark ? "text-white" : "text-gray-900"}`}>AI Generator Suite</h2>
              </div>

              {/* Generator Sub-Tabs */}
              <div className="flex border-b border-gray-800 pb-3 gap-4 overflow-x-auto whitespace-nowrap">
                <button type="button" onClick={() => setGeneratorType("new")}
                  className={`text-sm font-semibold transition-all pb-1.5 ${generatorType === "new" ? "text-purple-400 border-b-2 border-purple-400" : "text-gray-400 hover:text-white"}`}>
                  Create New Lesson
                </button>
                <button type="button" onClick={() => setGeneratorType("extend")}
                  className={`text-sm font-semibold transition-all pb-1.5 ${generatorType === "extend" ? "text-purple-400 border-b-2 border-purple-400" : "text-gray-400 hover:text-white"}`}>
                  Extend Existing Lesson
                </button>
                <button type="button" onClick={() => setGeneratorType("placement")}
                  className={`text-sm font-semibold transition-all pb-1.5 ${generatorType === "placement" ? "text-purple-400 border-b-2 border-purple-400" : "text-gray-400 hover:text-white"}`}>
                  Placement Test
                </button>
                <button type="button" onClick={() => setGeneratorType("settings")}
                  className={`text-sm font-semibold transition-all pb-1.5 ${generatorType === "settings" ? "text-purple-400 border-b-2 border-purple-400" : "text-gray-400 hover:text-white"}`}>
                  ⚙️ AI Settings
                </button>
              </div>

              {/* Engine Selection */}
              {generatorType !== "settings" && (
                <div>
                  <label className={`block text-xs font-medium ${txtSec} mb-1`}>AI Model / LLM Engine</label>
                  <select value={selectedModel} onChange={(e) => setSelectedModel(e.target.value)} className={inp}>
                    <option value="gpt-4o-mini">GPT-4o Mini (Default - Fast & Economic)</option>
                    <option value="claude-sonnet">Claude 3.5 Sonnet (Premium Curriculum structuring)</option>
                    <option value="claude-haiku">Claude Haiku (Fast & Accurate)</option>
                    <option value="gemini-flash">Gemini 1.5 Flash (Google Free/Low-cost Tier)</option>
                    <option value="gemini-pro">Gemini 1.5 Pro (Deep logical checks)</option>
                    <option value="mistral-large">Mistral Large (French Native nuances)</option>
                    <option value="llama-70b">Llama 3.1 70B (Open-Source Model)</option>
                  </select>
                </div>
              )}

              {/* RENDER MODE: New Lesson */}
              {generatorType === "new" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-xs font-medium ${txtSec} mb-1`}>Level</label>
                      <select value={level} onChange={(e) => setLevel(e.target.value)} className={inp}>
                        {levels.map((l) => <option key={l} value={l}>{l}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className={`block text-xs font-medium ${txtSec} mb-1`}>Category</label>
                      <select value={category} onChange={(e) => setCategory(e.target.value)} className={inp}>
                        {categories.map((c) => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className={`block text-xs font-medium ${txtSec} mb-1`}>Topic / Syllabus Objective</label>
                    <input value={topic} onChange={(e) => setTopic(e.target.value)} className={inp} placeholder="e.g. Present tense verbs, Greeting a business client..." />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-xs font-medium ${txtSec} mb-1`}>Vocabulary Words Count</label>
                      <input type="number" min={5} max={50} value={vocabCount} onChange={(e) => setVocabCount(parseInt(e.target.value) || 10)} className={inp} />
                    </div>
                    <div>
                      <label className={`block text-xs font-medium ${txtSec} mb-1`}>Drills / Questions Per Section</label>
                      <input type="number" min={1} max={10} value={exerciseCount} onChange={(e) => setExerciseCount(parseInt(e.target.value) || 3)} className={inp} />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-xs font-medium ${txtSec} mb-1`}>Chapter Target (optional)</label>
                      <select value={chapterId} onChange={(e) => setChapterId(e.target.value)} className={inp}>
                        <option value="">No chapter</option>
                        {chapters.map((ch: any) => <option key={ch._id} value={ch._id}>{ch.title}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className={`block text-xs font-medium ${txtSec} mb-1`}>Order</label>
                      <input type="number" min={1} value={order} onChange={(e) => setOrder(parseInt(e.target.value) || 1)} className={inp} />
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button type="button" onClick={() => setIsPublished(!isPublished)}
                      className={`relative w-10 h-5 rounded-full transition-all ${isPublished ? "bg-emerald-500" : dark ? "bg-gray-800" : "bg-gray-300"}`}>
                      <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${isPublished ? "left-5" : "left-0.5"}`} />
                    </button>
                    <span className={`text-xs ${txtSec}`}>{isPublished ? "Published" : "Stage as Draft"}</span>
                  </div>
                </div>
              )}

              {/* RENDER MODE: Extend Lesson */}
              {generatorType === "extend" && (
                <div className="space-y-4">
                  <div>
                    <label className={`block text-xs font-medium ${txtSec} mb-1`}>Target Lesson to Extend</label>
                    <select value={selectedLessonId} onChange={(e) => setSelectedLessonId(e.target.value)} className={inp}>
                      <option value="">-- Select Active Lesson --</option>
                      {lessons.map((l: any) => (
                        <option key={l._id} value={l._id}>[{l.level}] {l.title} ({l.lessonId})</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={`block text-xs font-medium ${txtSec} mb-1`}>What to add or modify? (AI Prompt)</label>
                    <textarea value={extendInstruction} onChange={(e) => setExtendInstruction(e.target.value)}
                      className="w-full h-24 rounded-xl border border-gray-800 bg-[#070B17] px-4 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono"
                      placeholder="e.g. Add 2 reading multiple choice questions testing French greeting verbs. Or add translation exercise." />
                  </div>
                </div>
              )}

              {/* RENDER MODE: Placement Test */}
              {generatorType === "placement" && (
                <div className="space-y-2 py-4">
                  <p className="text-xs text-amber-400 flex items-center gap-1.5">
                    <Info className="w-4 h-4 shrink-0" />
                    <span>This generates a structured skippable onboarding test (15 questions from A1 up to C1 levels).</span>
                  </p>
                  <p className="text-[10px] text-gray-500 leading-relaxed">
                    Once generated and published, students logging in for the first time will be prompted to take this test to assess their current standing, though they will still start learning journey at level A1.
                  </p>
                </div>
              )}

              {/* RENDER MODE: AI Settings */}
              {generatorType === "settings" && (
                <div className="space-y-4 pt-2">
                  {saveSettingsSuccess && (
                    <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/20 px-3 py-2 text-xs text-emerald-400">
                      {saveSettingsSuccess}
                    </div>
                  )}

                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-xs font-semibold text-gray-300">Anthropic API Key (Claude)</label>
                        <button type="button" onClick={handleTestClaude} disabled={testClaudeLoading}
                          className="text-[10px] text-purple-400 hover:underline disabled:opacity-50 flex items-center gap-1">
                          {testClaudeLoading && <Loader2 className="w-2.5 h-2.5 animate-spin" />}
                          <span>{testClaudeLoading ? "Testing..." : "Test Connection"}</span>
                        </button>
                      </div>
                      <input type="password" value={anthropicKey} onChange={(e) => setAnthropicKey(e.target.value)}
                        className={inp} placeholder="sk-ant-..." />
                      {testClaudeResult && (
                        <p className={`text-[10px] mt-1 ${testClaudeResult.includes("Successful") ? "text-emerald-400" : "text-red-400"}`}>
                          {testClaudeResult}
                        </p>
                      )}
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-xs font-semibold text-gray-300">OpenRouter API Key (GPT, Gemini, Mistral, Llama)</label>
                        <button type="button" onClick={handleTestOpenRouter} disabled={testORLoading}
                          className="text-[10px] text-purple-400 hover:underline disabled:opacity-50 flex items-center gap-1">
                          {testORLoading && <Loader2 className="w-2.5 h-2.5 animate-spin" />}
                          <span>{testORLoading ? "Testing..." : "Test Connection"}</span>
                        </button>
                      </div>
                      <input type="password" value={openRouterKey} onChange={(e) => setOpenRouterKey(e.target.value)}
                        className={inp} placeholder="sk-or-v1-..." />
                      {testORResult && (
                        <p className={`text-[10px] mt-1 ${testORResult.includes("Successful") ? "text-emerald-400" : "text-red-400"}`}>
                          {testORResult}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="pt-2 flex items-center gap-3">
                    <button type="button" onClick={handleSaveAISettings}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold transition-all shadow-lg shadow-purple-500/20">
                      Save AI Settings
                    </button>
                    <p className="text-[10px] text-gray-500 leading-tight flex-1">
                      💡 These API keys are used securely to power all generator scripts and student grader prompts.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* AI Action trigger buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              {generatorType === "new" && (
                <>
                  <button onClick={handleGenerateWithAI} disabled={!topic.trim() || generating}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold hover:opacity-90 transition-all disabled:opacity-50 shadow-lg shadow-purple-500/25">
                    {generating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Brain className="w-4 h-4" />}
                    <span>{generating ? "Generating..." : "Generate Lesson with AI"}</span>
                  </button>
                  <button onClick={() => { setStep("paste"); }} disabled={!topic.trim()}
                    className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl border ${dark ? "border-[#1e2a4a] text-gray-300 hover:bg-white/5" : "border-gray-200 text-gray-700 hover:bg-gray-100"} text-sm transition-all disabled:opacity-50`}>
                    <Clipboard className="w-4 h-4" /> Paste JSON Manually
                  </button>
                </>
              )}

              {generatorType === "extend" && (
                <button onClick={handleExtendLesson} disabled={!selectedLessonId || !extendInstruction.trim() || generating}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold hover:opacity-90 transition-all disabled:opacity-50 shadow-lg shadow-purple-500/25">
                  {generating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
                  <span>{generating ? "Extending Lesson..." : "Extend Lesson (Save Draft)"}</span>
                </button>
              )}

              {generatorType === "placement" && (
                <button onClick={handleGeneratePlacement} disabled={generating}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold hover:opacity-90 transition-all disabled:opacity-50 shadow-lg shadow-purple-500/25">
                  {generating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                  <span>{generating ? "Generating Placement Test..." : "Generate & Stage Placement Test Draft"}</span>
                </button>
              )}
            </div>

            {generating && (
              <div className={`${card} backdrop-blur-lg border rounded-2xl p-4 text-center`}>
                <Loader2 className="w-6 h-6 text-purple-400 animate-spin mx-auto mb-2" />
                <p className={`text-xs ${txtSec}`}>Claude is generating your lesson... This may take 15-30 seconds.</p>
              </div>
            )}
          </motion.div>
        )}

        {/* STEP 2: Review JSON */}
        {step === "paste" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div className={`${card} backdrop-blur-lg border rounded-2xl p-6 space-y-4`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Code className="w-5 h-5 text-purple-400" />
                  <h2 className={`text-lg font-semibold ${dark ? "text-white" : "text-gray-900"}`}>Review JSON</h2>
                </div>
                <button onClick={() => setShowJSONExample(!showJSONExample)}
                  className="flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300 transition-colors">
                  <Info className="w-3.5 h-3.5" /> Example
                </button>
              </div>

              {showJSONExample && (
                <div className={`rounded-xl ${dark ? "bg-purple-500/5 border border-purple-500/20" : "bg-purple-50 border border-purple-200"} p-4`}>
                  <p className={`text-xs font-semibold ${dark ? "text-purple-300" : "text-purple-700"} mb-2`}>Expected format:</p>
                  <pre className="text-[10px] text-gray-400 overflow-x-auto max-h-[200px] overflow-y-auto font-mono whitespace-pre-wrap">{`{
  "title": "French Greetings",
  "description": "Learn basic French greetings",
  "level": "A1",
  "category": "vocabulary",
  "objectives": ["Learn 10 greetings"],
  "estimatedDuration": 15,
  "vocabulary": [
    {
      "french": "Bonjour",
      "english": "Hello",
      "pronunciation": "bohn-ZHOOR",
      "difficulty": "easy"
    }
  ],
  "exercises": [
    {
      "title": "Translation Quiz",
      "type": "multiple_choice",
      "instructions": "Choose the correct translation",
      "questions": [{
        "id": "q1",
        "text": "How do you say 'hello'?",
        "type": "multiple_choice",
        "options": ["Bonjour", "Au revoir", "Merci"],
        "correctAnswer": "Bonjour",
        "explanation": "Bonjour means hello",
        "points": 10
      }],
      "points": 10,
      "order": 1
    }
  ],
  "grammar": []
}`}</pre>
                </div>
              )}

              <textarea
                ref={textareaRef}
                value={rawJSON}
                onChange={(e) => setRawJSON(e.target.value)}
                className={`${inp} min-h-[400px] resize-y font-mono text-xs leading-relaxed`}
                placeholder="Paste Claude's JSON output here..."
              />

              {rawJSON && (
                <div className="flex items-center gap-3 text-xs">
                  <span className={txtSec}>{rawJSON.length} chars</span>
                  {rawJSON.trim().startsWith("{") ? (
                    <span className="text-emerald-400 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Valid JSON start</span>
                  ) : (
                    <span className="text-red-400 flex items-center gap-1"><XCircle className="w-3 h-3" /> Not JSON</span>
                  )}
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep("prompt")} className={`px-4 py-2.5 rounded-xl border ${dark ? "border-[#1e2a4a] text-gray-400 hover:bg-white/5" : "border-gray-200 text-gray-600 hover:bg-gray-100"} text-sm transition-all`}>
                ← Back
              </button>
              <button onClick={handleValidate} disabled={!rawJSON.trim() || validating}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold hover:opacity-90 transition-all disabled:opacity-50 shadow-lg shadow-purple-500/25">
                {validating ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                {validating ? "Validating..." : "Validate JSON"}
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 3: Validate */}
        {step === "validate" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div className={`${card} backdrop-blur-lg border rounded-2xl p-6`}>
              <div className="flex items-center justify-between mb-4">
                <h2 className={`text-lg font-semibold ${dark ? "text-white" : "text-gray-900"}`}>Validation Results</h2>
                <div className="flex items-center gap-3">
                  {errors.length > 0 && (
                    <span className="flex items-center gap-1 text-xs text-red-400 font-semibold">
                      <XCircle className="w-3.5 h-3.5" /> {errors.length} error{errors.length > 1 ? "s" : ""}
                    </span>
                  )}
                  {warnings.length > 0 && (
                    <span className="flex items-center gap-1 text-xs text-amber-400 font-semibold">
                      <AlertCircle className="w-3.5 h-3.5" /> {warnings.length} warning{warnings.length > 1 ? "s" : ""}
                    </span>
                  )}
                  {errors.length === 0 && (
                    <span className="flex items-center gap-1 text-xs text-emerald-400 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" /> All checks passed
                    </span>
                  )}
                </div>
              </div>

              {errors.length > 0 && (
                <div className="space-y-1.5 mb-4">
                  {errors.map((err, i) => (
                    <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                      <XCircle className="w-3.5 h-3.5 text-red-400 mt-0.5 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] text-red-300 font-mono">{err.path}</span>
                        <p className="text-xs text-red-400">{err.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {warnings.length > 0 && (
                <div className="space-y-1.5 mb-4">
                  {warnings.map((warn, i) => (
                    <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] text-amber-300 font-mono">{warn.path}</span>
                        <p className="text-xs text-amber-400">{warn.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {errors.length === 0 && (
                <div className="text-center py-4">
                  <CheckCircle2 className="w-12 h-12 mx-auto text-emerald-400 mb-2" />
                  <p className={`text-sm font-semibold ${dark ? "text-white" : "text-gray-900"}`}>JSON is valid!</p>
                  <p className={`text-xs ${txtSec}`}>Ready to import into database</p>
                </div>
              )}
            </div>

            {errors.length === 0 && (
              <div className="flex gap-3">
                <button onClick={() => setStep("paste")} className={`px-4 py-2.5 rounded-xl border ${dark ? "border-[#1e2a4a] text-gray-400 hover:bg-white/5" : "border-gray-200 text-gray-600 hover:bg-gray-100"} text-sm transition-all`}>
                  ← Edit JSON
                </button>
                <button onClick={handleImport} disabled={importing}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold hover:opacity-90 transition-all disabled:opacity-50 shadow-lg shadow-purple-500/25">
                  {importing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                  {importing ? "Importing..." : "Upload to Database"}
                </button>
              </div>
            )}

            {errors.length > 0 && (
              <button onClick={() => setStep("paste")} className={`px-4 py-2.5 rounded-xl border ${dark ? "border-[#1e2a4a] text-gray-400 hover:bg-white/5" : "border-gray-200 text-gray-600 hover:bg-gray-100"} text-sm transition-all`}>
                ← Fix JSON
              </button>
            )}
          </motion.div>
        )}

        {/* STEP 4: Done */}
        {step === "done" && importResult && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className={`${card} backdrop-blur-lg border rounded-2xl p-8 text-center`}>
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-emerald-400" />
            </div>
            <h2 className={`text-xl font-bold mb-2 ${dark ? "text-white" : "text-gray-900"}`}>Content Uploaded!</h2>
            <p className={`text-sm ${txtSec} mb-6`}>Your lesson is in the database.</p>

            <div className={`inline-flex items-center gap-6 p-4 rounded-xl ${dark ? "bg-[#070B17] border border-[#1e2a4a]" : "bg-gray-50 border border-gray-200"} text-sm`}>
              <div className="text-center">
                <p className="text-lg font-bold text-purple-400">{importResult.vocabularyCount}</p>
                <p className={`text-[10px] ${txtSec}`}>Vocabulary</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-purple-400">{importResult.exerciseCount}</p>
                <p className={`text-[10px] ${txtSec}`}>Exercises</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-purple-400">{importResult.questionCount}</p>
                <p className={`text-[10px] ${txtSec}`}>Questions</p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 mt-6">
              <button onClick={() => { setStep("prompt"); setRawJSON(""); setErrors([]); setWarnings([]); setImportResult(null); setTopic(""); }}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold hover:opacity-90 transition-all shadow-lg shadow-purple-500/25">
                <FileText className="w-4 h-4" /> Create Another
              </button>
              <Link to="/admin/lessons" className={`px-4 py-2.5 rounded-xl border ${dark ? "border-[#1e2a4a] text-gray-400 hover:bg-white/5" : "border-gray-200 text-gray-600 hover:bg-gray-100"} text-sm transition-all`}>
                View Lessons
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
