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
  CheckCircle2
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

  const [form, setForm] = useState({
    anthropicApiKey: "",
    openRouterApiKey: "",
    openaiApiKey: "",
    elevenLabsApiKey: "",
    preferredVoiceEngine: "auto",
  });

  const bg = dark ? "bg-[#070B17] text-white" : "bg-[#F8FAFC] text-slate-900";
  const card = dark ? "bg-[#101828]/90 border-white/10" : "bg-white border-slate-200 shadow-sm";
  const inp = `w-full rounded-xl ${dark ? "bg-[#070B17] border-white/10 text-white" : "bg-white border-slate-300 text-slate-900"} border px-4 py-2.5 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all font-mono`;
  const txtSec = dark ? "text-gray-400" : "text-slate-600";

  useEffect(() => {
    apiFetch("/settings")
      .then((r) => r.json())
      .then((j) => {
        if (j.success && j.data) {
          setForm({
            anthropicApiKey: j.data.anthropicApiKey || "",
            openRouterApiKey: j.data.openRouterApiKey || "",
            openaiApiKey: j.data.openaiApiKey || "",
            elevenLabsApiKey: j.data.elevenLabsApiKey || "",
            preferredVoiceEngine: j.data.preferredVoiceEngine || "auto",
          });
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSaveAPI = async () => {
    setSaving(true);
    setSaveMsg("");
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
      setSaveMsg("Network error");
    }
    setSaving(false);
  };

  const handleClearCache = async () => {
    if (!confirm("Are you sure you want to clear all cached audio entries from MongoDB? Future audio requests will be generated fresh.")) return;
    setClearing(true);
    setClearMsg("");
    try {
      const res = await apiFetch("/settings/clear-audio-cache", { method: "POST" });
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
              <label className="block text-xs font-bold mb-1 text-pink-400">ElevenLabs API Key (100% Studio Real Human Voice Engine)</label>
              <input
                type="password"
                value={form.elevenLabsApiKey}
                onChange={(e) => setForm({ ...form, elevenLabsApiKey: e.target.value })}
                placeholder="xi-api-key-..."
                className={inp}
              />
              <p className={`text-[10px] ${txtSec} mt-1`}>Generates 48kHz native French human voices (Rachel & Antoni) with 0 robotic sound.</p>
            </div>

            <div>
              <label className="block text-xs font-bold mb-1 text-cyan-400">OpenAI API Key (Neural Audio tts-1-hd & GPT-4o Evaluator)</label>
              <input
                type="password"
                value={form.openaiApiKey}
                onChange={(e) => setForm({ ...form, openaiApiKey: e.target.value })}
                placeholder="sk-..."
                className={inp}
              />
              <p className={`text-[10px] ${txtSec} mt-1`}>Powers OpenAI tts-1-hd studio voices (nova & onyx) and TCF/TEF rubric scoring.</p>
            </div>

            <div>
              <label className="block text-xs font-bold mb-1">Anthropic API Key (Claude 3.5 Sonnet Content & Evaluation Engine)</label>
              <input
                type="password"
                value={form.anthropicApiKey}
                onChange={(e) => setForm({ ...form, anthropicApiKey: e.target.value })}
                placeholder="sk-ant-api03-..."
                className={inp}
              />
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
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-white/10 pb-3">
            <h3 className="text-base font-extrabold flex items-center gap-2 text-amber-400">
              <Trash2 className="w-5 h-5" /> MongoDB Audio Cache Management
            </h3>

            <button
              type="button"
              onClick={handleClearCache}
              disabled={clearing}
              className="px-4 py-2 rounded-xl bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-500/30 text-xs font-extrabold flex items-center gap-1.5 transition-all"
            >
              {clearing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
              Clear Audio Cache
            </button>
          </div>

          <p className={`text-xs ${txtSec}`}>
            Audio files generated by Kokoro-82M, ElevenLabs, or OpenAI are cached in MongoDB (`TTSCache`) for instant (under 50ms) playback for future students. Use <strong>Clear Audio Cache</strong> if you want to wipe cached audio and re-generate fresh audio using a newly selected engine.
          </p>

          {clearMsg && <p className="text-xs text-amber-400 font-bold pt-1">{clearMsg}</p>}
        </motion.div>

      </div>
    </div>
  );
}
