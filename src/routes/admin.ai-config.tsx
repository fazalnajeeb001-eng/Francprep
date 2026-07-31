import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { apiFetch } from "~/lib/apiFetch";
import { motion } from "framer-motion";
import {
  Brain,
  Save,
  Loader2,
  ArrowLeft,
  Zap,
  Volume2,
  Trash2,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Eye,
  EyeOff
} from "lucide-react";
import { useTheme } from "~/lib/ThemeContext";

export const Route = createFileRoute("/admin/ai-config")({ component: AdminAIConfigPage });

export function AdminAIConfigPage() {
  const { dark } = useTheme();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [clearing, setClearing] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");
  const [clearMsg, setClearMsg] = useState("");
  const [showKeys, setShowKeys] = useState<{ [key: string]: boolean }>({});

  const [form, setForm] = useState({
    anthropicApiKey: "",
    openRouterApiKey: "",
    openaiApiKey: "",
    elevenLabsApiKey: "",
    huggingFaceToken: "",
    preferredVoiceEngine: "auto",
  });

  const bg = dark ? "bg-[#070B17] text-white" : "bg-[#F8FAFC] text-slate-900";
  const card = dark ? "bg-[#101828]/90 border-white/10" : "bg-white border-slate-200 shadow-sm";
  const inp = `w-full rounded-xl ${dark ? "bg-[#070B17] border-white/10 text-white" : "bg-white border-slate-300 text-slate-900"} border px-4 py-2.5 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all font-mono`;
  const txtSec = dark ? "text-gray-400" : "text-slate-600";

  const [testingKey, setTestingKey] = useState<string | null>(null);
  const [testResult, setTestResult] = useState<{ [key: string]: { success: boolean; msg: string } }>({});

  useEffect(() => {
    const savedLocal = typeof window !== "undefined" ? localStorage.getItem("francprep_ai_config") : null;
    let localForm: any = {};
    if (savedLocal) {
      try {
        localForm = JSON.parse(savedLocal);
        setForm((prev) => ({ ...prev, ...localForm }));
      } catch {}
    }

    apiFetch("/settings")
      .then((r) => r.json())
      .then((j) => {
        if (j.success && j.data) {
          setForm((prev) => {
            const updated = {
              anthropicApiKey: j.data.anthropicApiKey || prev.anthropicApiKey || localForm.anthropicApiKey || "",
              openRouterApiKey: j.data.openRouterApiKey || prev.openRouterApiKey || localForm.openRouterApiKey || "",
              openaiApiKey: j.data.openaiApiKey || prev.openaiApiKey || localForm.openaiApiKey || "",
              elevenLabsApiKey: j.data.elevenLabsApiKey || prev.elevenLabsApiKey || localForm.elevenLabsApiKey || "",
              huggingFaceToken: j.data.huggingFaceToken || prev.huggingFaceToken || localForm.huggingFaceToken || "",
              preferredVoiceEngine: j.data.preferredVoiceEngine || prev.preferredVoiceEngine || localForm.preferredVoiceEngine || "auto",
            };
            if (typeof window !== "undefined") {
              localStorage.setItem("francprep_ai_config", JSON.stringify(updated));
            }
            return updated;
          });
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleTestKey = async (type: "elevenlabs" | "kokoro" | "anthropic" | "openrouter") => {
    setTestingKey(type);
    setTestResult((prev) => ({ ...prev, [type]: { success: false, msg: "Testing live connection..." } }));

    let endpoint = "/settings/test-elevenlabs";
    let body: any = {};
    if (type === "elevenlabs") {
      endpoint = "/settings/test-elevenlabs";
      body = { elevenLabsApiKey: form.elevenLabsApiKey };
    } else if (type === "kokoro") {
      endpoint = "/settings/test-kokoro";
      body = { huggingFaceToken: form.huggingFaceToken };
    } else if (type === "anthropic") {
      endpoint = "/settings/test-anthropic";
      body = { anthropicApiKey: form.anthropicApiKey };
    } else if (type === "openrouter") {
      endpoint = "/settings/test-openrouter";
      body = { openRouterApiKey: form.openRouterApiKey };
    }

    try {
      const res = await apiFetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      if (json.success) {
        setTestResult((prev) => ({
          ...prev,
          [type]: { success: true, msg: json.message || "Connection Successful & Validated!" },
        }));
      } else {
        setTestResult((prev) => ({
          ...prev,
          [type]: { success: false, msg: json.error || "Connection Failed" },
        }));
      }
    } catch {
      setTestResult((prev) => ({
        ...prev,
        [type]: { success: false, msg: "Network error testing connection" },
      }));
    }
    setTestingKey(null);
  };

  const handleSaveAPI = async () => {
    setSaving(true);
    setSaveMsg("");
    if (typeof window !== "undefined") {
      localStorage.setItem("francprep_ai_config", JSON.stringify(form));
    }
    try {
      const res = await apiFetch("/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (json.success) setSaveMsg("AI & Voice Engine Settings successfully saved!");
      else setSaveMsg(json.error || "Failed to save");
    } catch {
      setSaveMsg("Saved locally! (Backend Network Syncing)");
    }
    setSaving(false);
  };

  const handleClearCache = async (engine: string = "all") => {
    const label = engine === "all" ? "ALL cached audio entries" : `cached ${engine.toUpperCase()} audio entries`;
    if (!confirm(`Are you sure you want to clear ${label} from MongoDB? Future requests will be generated fresh.`)) return;
    setClearing(true);
    setClearMsg("");
    try {
      const res = await apiFetch("/settings/clear-audio-cache", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ engine })
      });
      const json = await res.json();
      if (json.success) setClearMsg(json.message || "Audio cache cleared!");
      else setClearMsg(json.error || "Failed to clear cache");
    } catch {
      setClearMsg("Network error clearing cache");
    }
    setClearing(false);
  };

  return (
    <div className={`min-h-screen ${bg} p-4 md:p-8 transition-colors duration-300`}>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* ─── HEADER ─── */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-4 border-b border-gray-200 dark:border-white/10">
          <div>
            <Link to="/admin" className="text-xs text-purple-400 hover:underline flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Admin Dashboard
            </Link>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight mt-1 flex items-center gap-3">
              <Brain className="w-8 h-8 text-purple-400" />
              AI Voice & Neural Engine Configuration
            </h1>
            <p className={`text-xs ${txtSec} mt-1`}>
              Configure Kokoro-82M (Free), ElevenLabs Studio Voices, OpenAI Audio, and AI Evaluation Rubrics.
            </p>
          </div>

          <button
            onClick={handleSaveAPI}
            disabled={saving}
            className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs shadow-lg shadow-purple-600/30 flex items-center gap-2"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save Voice & AI Settings
          </button>
        </div>

        {/* ─── LIVE ACTIVE ENGINE STATUS BANNER ─── */}
        {(() => {
          const pref = form.preferredVoiceEngine || "auto";
          let activeTitle = "✨ AUTO SMART ROUTING ACTIVE";
          let activeDesc = "System automatically routes audio to ElevenLabs → OpenAI HD → Kokoro-82M based on available API keys.";
          let badgeColor = "bg-purple-500/10 border-purple-500/30 text-purple-300";

          if (pref === "kokoro") {
            activeTitle = "🌿 KOKORO-82M FREE NEURAL ENGINE FORCED ACTIVE";
            activeDesc = "System is strictly locked to Kokoro-82M neural voices (ff_siwis female / bm_george male).";
            badgeColor = "bg-emerald-500/10 border-emerald-500/30 text-emerald-400";
          } else if (pref === "elevenlabs") {
            activeTitle = "🌸 ELEVENLABS STUDIO VOICES FORCED ACTIVE";
            activeDesc = "System is strictly locked to ElevenLabs studio human voices (Rachel female / Antoni male).";
            badgeColor = "bg-pink-500/10 border-pink-500/30 text-pink-400";
          } else if (pref === "openai") {
            activeTitle = "⚡ OPENAI HD VOICES FORCED ACTIVE";
            activeDesc = "System is strictly locked to OpenAI tts-1-hd voices (Nova female / Onyx male).";
            badgeColor = "bg-cyan-500/10 border-cyan-500/30 text-cyan-400";
          }

          return (
            <div className={`p-4 rounded-2xl border ${badgeColor} flex items-center justify-between gap-4 font-mono shadow-sm`}>
              <div className="space-y-0.5">
                <div className="text-xs font-black tracking-wide flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-current animate-pulse" />
                  {activeTitle}
                </div>
                <p className="text-[11px] opacity-80">{activeDesc}</p>
              </div>
              <span className="text-[11px] font-extrabold uppercase px-3 py-1 rounded bg-black/20 border border-current">
                ENGINE: {pref.toUpperCase()}
              </span>
            </div>
          );
        })()}

        {/* ─── PREFERRED VOICE ENGINE SELECTOR CARD ─── */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className={`p-6 rounded-2xl border ${card} space-y-4`}>
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-white/10 pb-3">
            <h3 className="text-base font-extrabold flex items-center gap-2">
              <Volume2 className="w-5 h-5 text-purple-400" /> Preferred Voice Engine
            </h3>
            <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 font-semibold">
              Current: {form.preferredVoiceEngine.toUpperCase()}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <button
              type="button"
              onClick={() => setForm({ ...form, preferredVoiceEngine: "auto" })}
              className={`p-4 rounded-xl border text-left transition-all ${form.preferredVoiceEngine === "auto" ? "border-purple-500 bg-purple-500/10 ring-2 ring-purple-500/30" : "border-gray-200 dark:border-white/10 hover:border-purple-500/50"}`}
            >
              <div className="font-extrabold text-sm flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-purple-400" /> Auto (Smart)
              </div>
              <p className="text-[11px] text-gray-400 mt-1">ElevenLabs → OpenAI → Kokoro (Fallback)</p>
            </button>

            <button
              type="button"
              onClick={() => setForm({ ...form, preferredVoiceEngine: "kokoro" })}
              className={`p-4 rounded-xl border text-left transition-all ${form.preferredVoiceEngine === "kokoro" ? "border-emerald-500 bg-emerald-500/10 ring-2 ring-emerald-500/30" : "border-gray-200 dark:border-white/10 hover:border-emerald-500/50"}`}
            >
              <div className="font-extrabold text-sm flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="w-4 h-4" /> Kokoro-82M
              </div>
              <p className="text-[11px] text-gray-400 mt-1">100% Free Open-Source Neural Engine</p>
            </button>

            <button
              type="button"
              onClick={() => setForm({ ...form, preferredVoiceEngine: "elevenlabs" })}
              className={`p-4 rounded-xl border text-left transition-all ${form.preferredVoiceEngine === "elevenlabs" ? "border-pink-500 bg-pink-500/10 ring-2 ring-pink-500/30" : "border-gray-200 dark:border-white/10 hover:border-pink-500/50"}`}
            >
              <div className="font-extrabold text-sm flex items-center gap-1.5 text-pink-400">
                <Zap className="w-4 h-4" /> ElevenLabs
              </div>
              <p className="text-[11px] text-gray-400 mt-1">Studio French Voices (Rachel & Antoni)</p>
            </button>

            <button
              type="button"
              onClick={() => setForm({ ...form, preferredVoiceEngine: "openai" })}
              className={`p-4 rounded-xl border text-left transition-all ${form.preferredVoiceEngine === "openai" ? "border-cyan-500 bg-cyan-500/10 ring-2 ring-cyan-500/30" : "border-gray-200 dark:border-white/10 hover:border-cyan-500/50"}`}
            >
              <div className="font-extrabold text-sm flex items-center gap-1.5 text-cyan-400">
                <Brain className="w-4 h-4" /> OpenAI HD
              </div>
              <p className="text-[11px] text-gray-400 mt-1">OpenAI tts-1-hd Voices (Nova & Onyx)</p>
            </button>
          </div>
        </motion.div>

        {/* ─── API KEYS CARD ─── */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className={`p-6 rounded-2xl border ${card} space-y-4`}>
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-white/10 pb-3">
            <h3 className="text-base font-extrabold flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-purple-400" /> Voice & Evaluation API Keys
            </h3>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-emerald-400">HuggingFace Token (Powers Free Kokoro-82M Neural Speech Engine)</label>
                <button
                  type="button"
                  onClick={() => handleTestKey("kokoro")}
                  disabled={testingKey === "kokoro"}
                  className="text-[10px] text-emerald-400 hover:underline flex items-center gap-1 font-bold disabled:opacity-50"
                >
                  {testingKey === "kokoro" ? <Loader2 className="w-3 h-3 animate-spin" /> : <Zap className="w-3 h-3" />}
                  <span>{testingKey === "kokoro" ? "Testing..." : "Test Connection"}</span>
                </button>
              </div>
              <div className="relative flex items-center">
                <input
                  type={showKeys.huggingFaceToken ? "text" : "password"}
                  value={form.huggingFaceToken}
                  onChange={(e) => setForm({ ...form, huggingFaceToken: e.target.value })}
                  placeholder="hf_..."
                  className={`${inp} pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setShowKeys((prev) => ({ ...prev, huggingFaceToken: !prev.huggingFaceToken }))}
                  className="absolute right-3 text-gray-400 hover:text-white transition-colors"
                >
                  {showKeys.huggingFaceToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {testResult.kokoro && (
                <p className={`text-[10px] font-bold mt-1 ${testResult.kokoro.success ? "text-emerald-400" : "text-red-400"}`}>
                  {testResult.kokoro.success ? "🟢 " : "🔴 "}{testResult.kokoro.msg}
                </p>
              )}
              <p className={`text-[10px] ${txtSec} mt-1`}>
                100% Free User Token available at <a href="https://huggingface.co/settings/tokens" target="_blank" rel="noreferrer" className="text-emerald-400 underline">huggingface.co/settings/tokens</a> to power Kokoro-82M neural voices!
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-pink-400">ElevenLabs API Key (100% Studio Real Human Voice Engine)</label>
                <button
                  type="button"
                  onClick={() => handleTestKey("elevenlabs")}
                  disabled={testingKey === "elevenlabs"}
                  className="text-[10px] text-pink-400 hover:underline flex items-center gap-1 font-bold disabled:opacity-50"
                >
                  {testingKey === "elevenlabs" ? <Loader2 className="w-3 h-3 animate-spin" /> : <Zap className="w-3 h-3" />}
                  <span>{testingKey === "elevenlabs" ? "Testing..." : "Test Connection"}</span>
                </button>
              </div>
              <div className="relative flex items-center">
                <input
                  type={showKeys.elevenLabsApiKey ? "text" : "password"}
                  value={form.elevenLabsApiKey}
                  onChange={(e) => setForm({ ...form, elevenLabsApiKey: e.target.value })}
                  placeholder="xi-api-key-..."
                  className={`${inp} pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setShowKeys((prev) => ({ ...prev, elevenLabsApiKey: !prev.elevenLabsApiKey }))}
                  className="absolute right-3 text-gray-400 hover:text-white transition-colors"
                >
                  {showKeys.elevenLabsApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {testResult.elevenlabs && (
                <p className={`text-[10px] font-bold mt-1 ${testResult.elevenlabs.success ? "text-emerald-400" : "text-red-400"}`}>
                  {testResult.elevenlabs.success ? "🟢 " : "🔴 "}{testResult.elevenlabs.msg}
                </p>
              )}
              <p className={`text-[10px] ${txtSec} mt-1`}>Generates 48kHz native French human voices (Rachel & Antoni) with 0 robotic sound.</p>
            </div>

            <div>
              <label className="block text-xs font-bold mb-1 text-cyan-400">OpenAI API Key (Neural Audio tts-1-hd & GPT-4o Evaluator)</label>
              <div className="relative flex items-center">
                <input
                  type={showKeys.openaiApiKey ? "text" : "password"}
                  value={form.openaiApiKey}
                  onChange={(e) => setForm({ ...form, openaiApiKey: e.target.value })}
                  placeholder="sk-..."
                  className={`${inp} pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setShowKeys((prev) => ({ ...prev, openaiApiKey: !prev.openaiApiKey }))}
                  className="absolute right-3 text-gray-400 hover:text-white transition-colors"
                >
                  {showKeys.openaiApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className={`text-[10px] ${txtSec} mt-1`}>Powers OpenAI tts-1-hd studio voices (nova & onyx) and TCF/TEF rubric scoring.</p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold">Anthropic API Key (Claude 3.5 Sonnet Content & Evaluation Engine)</label>
                <button
                  type="button"
                  onClick={() => handleTestKey("anthropic")}
                  disabled={testingKey === "anthropic"}
                  className="text-[10px] text-purple-400 hover:underline flex items-center gap-1 font-bold disabled:opacity-50"
                >
                  {testingKey === "anthropic" ? <Loader2 className="w-3 h-3 animate-spin" /> : <Zap className="w-3 h-3" />}
                  <span>{testingKey === "anthropic" ? "Testing..." : "Test Connection"}</span>
                </button>
              </div>
              <div className="relative flex items-center">
                <input
                  type={showKeys.anthropicApiKey ? "text" : "password"}
                  value={form.anthropicApiKey}
                  onChange={(e) => setForm({ ...form, anthropicApiKey: e.target.value })}
                  placeholder="sk-ant-api03-..."
                  className={`${inp} pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setShowKeys((prev) => ({ ...prev, anthropicApiKey: !prev.anthropicApiKey }))}
                  className="absolute right-3 text-gray-400 hover:text-white transition-colors"
                >
                  {showKeys.anthropicApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {testResult.anthropic && (
                <p className={`text-[10px] font-bold mt-1 ${testResult.anthropic.success ? "text-emerald-400" : "text-red-400"}`}>
                  {testResult.anthropic.success ? "🟢 " : "🔴 "}{testResult.anthropic.msg}
                </p>
              )}
              <p className={`text-[10px] ${txtSec} mt-1`}>Used by Content Generator and Speaking/Writing Rubric Grading System.</p>
            </div>

            <div>
              <label className="block text-xs font-bold mb-1">OpenRouter API Key (Multi-LLM Evaluator & Reviewer)</label>
              <input
                type="password"
                value={form.openRouterApiKey}
                onChange={(e) => setForm({ ...form, openRouterApiKey: e.target.value })}
                placeholder="sk-or-v1-..."
                className={inp}
              />
              <p className={`text-[10px] ${txtSec} mt-1`}>Used for multi-LLM lesson validation and automated quality checks.</p>
            </div>
          </div>

          {saveMsg && <p className="text-xs text-emerald-400 font-bold text-right pt-2">{saveMsg}</p>}
        </motion.div>

        {/* ─── CACHE MANAGEMENT CARD ─── */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className={`p-6 rounded-2xl border ${card} space-y-4`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-200 dark:border-white/10 pb-3 gap-3">
            <h3 className="text-base font-extrabold flex items-center gap-2 text-amber-400">
              <Trash2 className="w-5 h-5" /> MongoDB Audio Cache Management
            </h3>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => handleClearCache("kokoro")}
                disabled={clearing}
                className="px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold transition-all"
              >
                Clear Kokoro Cache
              </button>

              <button
                type="button"
                onClick={() => handleClearCache("elevenlabs")}
                disabled={clearing}
                className="px-3 py-1.5 rounded-lg bg-pink-500/10 hover:bg-pink-500/20 text-pink-400 border border-pink-500/30 text-xs font-bold transition-all"
              >
                Clear ElevenLabs Cache
              </button>

              <button
                type="button"
                onClick={() => handleClearCache("openai")}
                disabled={clearing}
                className="px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-xs font-bold transition-all"
              >
                Clear OpenAI Cache
              </button>

              <button
                type="button"
                onClick={() => handleClearCache("all")}
                disabled={clearing}
                className="px-3.5 py-1.5 rounded-lg bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-500/30 text-xs font-extrabold flex items-center gap-1 transition-all"
              >
                {clearing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                Clear All Cache
              </button>
            </div>
          </div>

          <p className={`text-xs ${txtSec}`}>
            Audio generated by each voice engine is stored separately in your MongoDB database (`TTSCache`). You can delete <strong>only Kokoro audio</strong>, <strong>only ElevenLabs audio</strong>, or <strong>all audio</strong> with 1 click without affecting the other engine caches!
          </p>

          {clearMsg && <p className="text-xs text-amber-400 font-bold pt-1">{clearMsg}</p>}
        </motion.div>

      </div>
    </div>
  );
}
