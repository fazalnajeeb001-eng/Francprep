import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { apiFetch } from "~/lib/apiFetch";
import { motion } from "framer-motion";
import {
  CreditCard,
  Brain,
  Save,
  Loader2,
  ArrowLeft,
  Zap,
  Key,
  ShieldCheck,
  Globe,
  Users
} from "lucide-react";
import { useTheme } from "~/lib/ThemeContext";

export const Route = createFileRoute("/admin/settings")({ component: AdminSettingsPage });

export function AdminSettingsPage() {
  const { dark } = useTheme();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");

  const [isSocialHubEnabled, setIsSocialHubEnabled] = useState(false);
  const [togglingSocial, setTogglingSocial] = useState(false);

  const [form, setForm] = useState({
    stripeSecretKey: "",
    stripePublishableKey: "",
    stripePremiumPriceId: "",
    stripeExamPrepPriceId: "",
    stripeWebhookSecret: "",
    anthropicApiKey: "",
    openRouterApiKey: "",
    openaiApiKey: "",
    elevenLabsApiKey: "",
    huggingFaceApiKey: "",
    activeTTSProvider: "auto",
    frontendUrl: "",
  });

  const bg = dark ? "bg-[#070B17] text-white" : "bg-[#F8FAFC] text-slate-900";
  const card = dark ? "bg-[#101828]/90 border-white/10" : "bg-white border-slate-200 shadow-sm";
  const inp = `w-full rounded-xl ${dark ? "bg-[#070B17] border-white/10 text-white" : "bg-white border-slate-300 text-slate-900"} border px-4 py-2.5 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all font-mono`;
  const txtSec = dark ? "text-gray-400" : "text-slate-600";

  useEffect(() => {
    apiFetch("/subscriptions/plans")
      .then((r) => r.json())
      .then((j) => {
        if (j.data?.isSocialHubEnabled === true) {
          setIsSocialHubEnabled(true);
        }
      })
      .catch(() => {});

    apiFetch("/settings")
      .then((r) => r.json())
      .then((j) => {
        if (j.success && j.data) {
          setForm({
            stripeSecretKey: j.data.stripeSecretKey || "",
            stripePublishableKey: j.data.stripePublishableKey || "",
            stripePremiumPriceId: j.data.stripePremiumPriceId || "",
            stripeExamPrepPriceId: j.data.stripeExamPrepPriceId || "",
            stripeWebhookSecret: j.data.stripeWebhookSecret || "",
            anthropicApiKey: j.data.anthropicApiKey || "",
            openRouterApiKey: j.data.openRouterApiKey || "",
            openaiApiKey: j.data.openaiApiKey || "",
            elevenLabsApiKey: j.data.elevenLabsApiKey || "",
            huggingFaceApiKey: j.data.huggingFaceApiKey || "",
            activeTTSProvider: j.data.activeTTSProvider || "auto",
            frontendUrl: j.data.frontendUrl || "",
          });
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleToggleSocialHub = async () => {
    setTogglingSocial(true);
    try {
      const nextState = !isSocialHubEnabled;
      const res = await apiFetch("/admin/subscriptions/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isSocialHubEnabled: nextState }),
      });
      const json = await res.json();
      if (json.success) {
        setIsSocialHubEnabled(nextState);
      }
    } catch {}
    setTogglingSocial(false);
  };

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
      if (json.success) setSaveMsg("API Keys & Payment Settings successfully saved!");
      else setSaveMsg(json.error || "Failed to save");
    } catch {
      setSaveMsg("Network error");
    }
    setSaving(false);
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
              <Key className="w-8 h-8 text-purple-400" />
              API Keys & Integration Settings
            </h1>
            <p className={`text-xs ${txtSec} mt-1`}>
              Manage Stripe payment gateway secrets, Anthropic Claude 3.5 Sonnet keys, and OpenRouter AI evaluator keys.
            </p>
          </div>

          <button
            onClick={handleSaveAPI}
            disabled={saving}
            className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs shadow-lg shadow-purple-600/30 flex items-center gap-2"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save API Settings
          </button>
        </div>

        {/* ─── STRIPE PAYMENT GATEWAY CARD ─── */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className={`p-6 rounded-2xl border ${card} space-y-4`}>
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-white/10 pb-3">
            <h3 className="text-base font-extrabold flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-purple-400" /> Stripe Payment Gateway Credentials
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold mb-1">Stripe Secret Key</label>
              <input
                type="password"
                value={form.stripeSecretKey}
                onChange={(e) => setForm({ ...form, stripeSecretKey: e.target.value })}
                placeholder="sk_live_..."
                className={inp}
              />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">Stripe Publishable Key</label>
              <input
                type="text"
                value={form.stripePublishableKey}
                onChange={(e) => setForm({ ...form, stripePublishableKey: e.target.value })}
                placeholder="pk_live_..."
                className={inp}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-bold mb-1">Premium Price ID</label>
              <input
                type="text"
                value={form.stripePremiumPriceId}
                onChange={(e) => setForm({ ...form, stripePremiumPriceId: e.target.value })}
                placeholder="price_..."
                className={inp}
              />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">Stripe Webhook Secret</label>
              <input
                type="password"
                value={form.stripeWebhookSecret}
                onChange={(e) => setForm({ ...form, stripeWebhookSecret: e.target.value })}
                placeholder="whsec_..."
                className={inp}
              />
            </div>
          </div>
        </motion.div>

        {/* ─── AI LLM EVALUATOR KEYS CARD ─── */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className={`p-6 rounded-2xl border ${card} space-y-4`}>
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-white/10 pb-3">
            <h3 className="text-base font-extrabold flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-400" /> Anthropic Claude & OpenRouter AI API Keys
            </h3>
          </div>

          <div className="space-y-4">
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

            <div>
              <label className="block text-xs font-bold mb-1 text-pink-400">ElevenLabs API Key (100% Studio Real Human Voice Engine)</label>
              <input
                type="password"
                value={form.elevenLabsApiKey}
                onChange={(e) => setForm({ ...form, elevenLabsApiKey: e.target.value })}
                placeholder="xi-api-key-..."
                className={inp}
              />
              <p className={`text-[10px] ${txtSec} mt-1`}>Generates 48kHz native French human voices (Rachel & Antoni) with 0 robotic sound. Free tier available at elevenlabs.io!</p>
            </div>

            <div>
              <label className="block text-xs font-bold mb-1 text-cyan-400">HuggingFace API Key (Kokoro-82M Open-Source Neural TTS)</label>
              <input
                type="password"
                value={form.huggingFaceApiKey}
                onChange={(e) => setForm({ ...form, huggingFaceApiKey: e.target.value })}
                placeholder="hf_..."
                className={inp}
              />
              <p className={`text-[10px] ${txtSec} mt-1`}>Powers Kokoro-82M neural model on HuggingFace Inference API.</p>
            </div>

            <div>
              <label className="block text-xs font-bold mb-1 text-emerald-400">OpenAI API Key (Neural Audio tts-1-hd & GPT-4o Evaluator)</label>
              <input
                type="password"
                value={form.openaiApiKey}
                onChange={(e) => setForm({ ...form, openaiApiKey: e.target.value })}
                placeholder="sk-..."
                className={inp}
              />
              <p className={`text-[10px] ${txtSec} mt-1`}>Powers OpenAI tts-1-hd studio voices (nova & onyx) and TCF/TEF rubric scoring.</p>
            </div>

            <div className="pt-3 border-t border-gray-200 dark:border-white/10 space-y-3">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <label className="block text-xs font-extrabold text-purple-300">Active Audio Engine Provider</label>
                  <p className={`text-[10px] ${txtSec}`}>Switch between AI voice providers. Platform auto-shifts instantly.</p>
                </div>
                <select
                  value={form.activeTTSProvider}
                  onChange={(e) => setForm({ ...form, activeTTSProvider: e.target.value })}
                  className={`px-3 py-2 rounded-xl text-xs font-bold border outline-none ${dark ? "bg-[#070B17] border-purple-500/40 text-purple-300" : "bg-white border-purple-300 text-purple-900"}`}
                >
                  <option value="auto">✨ Auto Cascade (ElevenLabs ➔ OpenAI ➔ Kokoro ➔ Google)</option>
                  <option value="elevenlabs">🎙️ ElevenLabs Multilingual v2 (Studio Ultra-Human)</option>
                  <option value="openai">🤖 OpenAI tts-1-hd (Nova & Onyx Neural)</option>
                  <option value="huggingface">🤗 HuggingFace Kokoro-82M</option>
                  <option value="google">🌐 Google HD Speech Fallback</option>
                </select>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      const res = await apiFetch("/tts/clear-cache", { method: "POST" });
                      const json = await res.json();
                      alert(json.message || "TTS Audio Cache cleared successfully!");
                    } catch {
                      alert("Cleared local cache!");
                    }
                  }}
                  className="px-3.5 py-1.5 bg-red-500/20 text-red-300 border border-red-500/30 hover:bg-red-500/30 text-xs font-bold rounded-xl transition-all flex items-center gap-1 cursor-pointer"
                >
                  🗑️ Purge Audio Cache
                </button>
              </div>
            </div>
          </div>

          {saveMsg && <p className="text-xs text-emerald-400 font-bold text-right pt-2">{saveMsg}</p>}
        </motion.div>

        {/* ─── CANDIDATE FORUM & STEALTH TOGGLE CARD ─── */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className={`p-6 rounded-2xl border ${card} space-y-4`}>
          <div className="flex items-center gap-3 border-b border-gray-200 dark:border-white/10 pb-3">
            <Users className="w-5 h-5 text-purple-400" />
            <div>
              <h3 className="text-base font-extrabold">Candidate Forum Visibility & Release Switch</h3>
              <p className={`text-xs ${txtSec} mt-0.5`}>Control platform-wide visibility of the Candidate Forum for enrolled students.</p>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-purple-500/30 bg-purple-500/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-extrabold text-purple-300">👥 Candidate Forum Access</span>
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {isSocialHubEnabled ? "LIVE FOR ALL STUDENTS" : "STEALTH MODE (ADMIN ONLY)"}
                </span>
              </div>
              <p className="text-xs text-gray-300">
                When toggled <strong>OFF</strong>, the Candidate Forum is hidden from regular students so you can test threads privately as Admin!
              </p>
            </div>

            <button
              type="button"
              disabled={togglingSocial}
              onClick={handleToggleSocialHub}
              className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all shrink-0 flex items-center gap-2 shadow-lg cursor-pointer ${
                isSocialHubEnabled
                  ? "bg-emerald-500 text-slate-950 hover:bg-emerald-400"
                  : "bg-amber-500 text-slate-950 hover:bg-amber-400"
              }`}
            >
              {isSocialHubEnabled ? "🟢 FORUM PUBLIC (STUDENTS CAN ACCESS)" : "🔒 STEALTH MODE (HIDDEN FROM STUDENTS)"}
            </button>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
