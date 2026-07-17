import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { apiFetch } from "~/lib/apiFetch";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Upload, Check, AlertTriangle, FileText, Sparkles,
  Loader2, Copy, Wand2, Code, Clipboard,
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
  const [promptCopied, setPromptCopied] = useState(false);

  const [chapters, setChapters] = useState<any[]>([]);
  const [promptText, setPromptText] = useState("");
  const [showJSONExample, setShowJSONExample] = useState(false);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    apiFetch("/chapters").then((r) => r.json()).then((j) => {
      if (j.success) setChapters(j.data || []);
    }).catch(() => {});
  }, []);

  const bg = dark ? "bg-[#070B17]" : "bg-gray-50";
  const card = dark ? "bg-[#101828]/80 border-[#1e2a4a]" : "bg-white/80 border-gray-200";
  const inp = `w-full rounded-xl ${dark ? "bg-[#070B17] border-[#1e2a4a] text-white" : "bg-white border-gray-300 text-gray-900"} border px-4 py-2.5 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`;
  const txtSec = dark ? "text-gray-400" : "text-gray-500";

  const generatePrompt = async () => {
    try {
      const params = new URLSearchParams({ level, category, topic: topic || "French basics", vocabCount: String(vocabCount), exerciseCount: String(exerciseCount) });
      const res = await apiFetch(`/content/prompt?${params}`);
      const json = await res.json();
      if (json.success) setPromptText(json.data.prompt);
    } catch {}
  };

  useEffect(() => { if (step === "prompt") generatePrompt(); }, [step, level, category, topic, vocabCount, exerciseCount]);

  const copyPrompt = () => {
    navigator.clipboard.writeText(promptText);
    setPromptCopied(true);
    setTimeout(() => setPromptCopied(false), 2000);
  };

  const handleGenerateWithAI = async () => {
    if (!topic.trim()) { setApiError("Please enter a topic first"); return; }
    setGenerating(true); setApiError("");
    try {
      const res = await apiFetch("/content/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ level, category, topic, vocabCount, exerciseCount }),
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
                <h2 className={`text-lg font-semibold ${dark ? "text-white" : "text-gray-900"}`}>Configure Your Lesson</h2>
              </div>

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
                <label className={`block text-xs font-medium ${txtSec} mb-1`}>Topic</label>
                <input value={topic} onChange={(e) => setTopic(e.target.value)} className={inp} placeholder="e.g. French greetings, Present tense, Colors and shapes..." />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-xs font-medium ${txtSec} mb-1`}>Vocabulary Words</label>
                  <input type="number" min={5} max={50} value={vocabCount} onChange={(e) => setVocabCount(parseInt(e.target.value) || 10)} className={inp} />
                </div>
                <div>
                  <label className={`block text-xs font-medium ${txtSec} mb-1`}>Exercise Count</label>
                  <input type="number" min={1} max={10} value={exerciseCount} onChange={(e) => setExerciseCount(parseInt(e.target.value) || 3)} className={inp} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-xs font-medium ${txtSec} mb-1`}>Chapter (optional)</label>
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
                  className={`relative w-10 h-5 rounded-full transition-all ${isPublished ? "bg-emerald-500" : dark ? "bg-[#1e2a4a]" : "bg-gray-300"}`}>
                  <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${isPublished ? "left-5" : "left-0.5"}`} />
                </button>
                <span className={`text-xs ${txtSec}`}>{isPublished ? "Published" : "Draft"}</span>
              </div>
            </div>

            {/* Two action buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button onClick={handleGenerateWithAI} disabled={!topic.trim() || generating}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold hover:opacity-90 transition-all disabled:opacity-50 shadow-lg shadow-purple-500/25">
                {generating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Brain className="w-4 h-4" />}
                {generating ? "Generating with Claude..." : "Generate with AI"}
              </button>

              <button onClick={() => { setStep("paste"); }} disabled={!topic.trim()}
                className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl border ${dark ? "border-[#1e2a4a] text-gray-300 hover:bg-white/5" : "border-gray-200 text-gray-700 hover:bg-gray-100"} text-sm transition-all disabled:opacity-50`}>
                <Clipboard className="w-4 h-4" /> Paste JSON Manually
              </button>
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
