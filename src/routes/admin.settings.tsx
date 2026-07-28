import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { apiFetch } from "~/lib/apiFetch";
import { motion } from "framer-motion";
import { Settings, CreditCard, Brain, Save, CheckCircle2, XCircle, Loader2, Eye, EyeOff, ArrowLeft, Zap, Lock } from "lucide-react";
import { useTheme } from "~/lib/ThemeContext";

export const Route = createFileRoute("/admin/settings")({ component: AdminSettingsPage });

function AdminSettingsPage() {
  const { dark } = useTheme();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [stripeTesting, setStripeTesting] = useState(false);
  const [anthropicTesting, setAnthropicTesting] = useState(false);
  const [openRouterTesting, setOpenRouterTesting] = useState(false);
  const [stripeResult, setStripeResult] = useState<{ ok: boolean; msg: string } | null>(null);
  const [anthropicResult, setAnthropicResult] = useState<{ ok: boolean; msg: string } | null>(null);
  const [openRouterResult, setOpenRouterResult] = useState<{ ok: boolean; msg: string } | null>(null);
  const [saveMsg, setSaveMsg] = useState("");
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});

  const [form, setForm] = useState({
    stripeSecretKey: "",
    stripePublishableKey: "",
    stripePremiumPriceId: "",
    stripeExamPrepPriceId: "",
    stripeWebhookSecret: "",
    anthropicApiKey: "",
    openRouterApiKey: "",
    frontendUrl: "",
  });

  const [gatingSettings, setGatingSettings] = useState({
    gatingMode: "all_locked",
    passingScorePercentage: 70,
    lockedChapterIds: [] as string[],
  });
  const [savingGating, setSavingGating] = useState(false);
  const [gatingMsg, setGatingMsg] = useState("");

  const bg = dark ? "bg-[#070B17]" : "bg-gray-50";
  const card = dark ? "bg-[#101828]/80 border-[#1e2a4a]" : "bg-white/80 border-gray-200";
  const inp = `w-full rounded-xl ${dark ? "bg-[#070B17] border-[#1e2a4a] text-white" : "bg-white border-gray-300 text-gray-900"} border px-4 py-2.5 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all font-mono`;
  const txtSec = dark ? "text-gray-400" : "text-gray-500";

  useEffect(() => {
    apiFetch("/settings").then((r) => r.json()).then((j) => {
      if (j.success && j.data) {
        setForm({
          stripeSecretKey: j.data.stripeSecretKey || "",
          stripePublishableKey: j.data.stripePublishableKey || "",
          stripePremiumPriceId: j.data.stripePremiumPriceId || "",
          stripeExamPrepPriceId: j.data.stripeExamPrepPriceId || "",
          stripeWebhookSecret: j.data.stripeWebhookSecret || "",
          anthropicApiKey: j.data.anthropicApiKey || "",
          openRouterApiKey: j.data.openRouterApiKey || "",
          frontendUrl: j.data.frontendUrl || "",
        });
      }
    }).catch(() => {}).finally(() => setLoading(false));

    apiFetch("/admin/settings/gating").then((r) => r.json()).then((j) => {
      if (j.success && j.data) {
        setGatingSettings(j.data);
      }
    }).catch(() => {});
  }, []);

  const handleSaveGating = async () => {
    setSavingGating(true);
    setGatingMsg("");
    try {
      const res = await apiFetch("/admin/settings/gating", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(gatingSettings),
      });
      const json = await res.json();
      if (json.success) setGatingMsg("Module Gate Settings Saved!");
      else setGatingMsg(json.error || "Failed to save");
    } catch {
      setGatingMsg("Network error");
    }
    setSavingGating(false);
  };

  const handleSave = async () => {
    setSaving(true); setSaveMsg("");
    try {
      const res = await apiFetch("/settings", {
        method: "PUT", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (json.success) setSaveMsg("Settings saved!");
      else setSaveMsg(json.error || "Failed to save");
    } catch { setSaveMsg("Network error"); }
    setSaving(false);
  };

  const testStripe = async () => {
    setStripeTesting(true); setStripeResult(null);
    try {
      const res = await apiFetch("/settings/test-stripe", { method: "POST" });
      const json = await res.json();
      setStripeResult(json.success ? { ok: true, msg: `Connected! Balance: $${(json.data.available / 100).toFixed(2)} ${json.data.currency.toUpperCase()}` } : { ok: false, msg: json.error });
    } catch { setStripeResult({ ok: false, msg: "Network error" }); }
    setStripeTesting(false);
  };

  const testAnthropic = async () => {
    setAnthropicTesting(true); setAnthropicResult(null);
    try {
      const res = await apiFetch("/settings/test-anthropic", { method: "POST" });
      const json = await res.json();
      setAnthropicResult(json.success ? { ok: true, msg: `Connected! Response: "${json.data.response}"` } : { ok: false, msg: json.error });
    } catch { setAnthropicResult({ ok: false, msg: "Network error" }); }
    setAnthropicTesting(false);
  };

  const testOpenRouter = async () => {
    setOpenRouterTesting(true); setOpenRouterResult(null);
    try {
      const res = await apiFetch("/settings/test-openrouter", { method: "POST" });
      const json = await res.json();
      setOpenRouterResult(json.success ? { ok: true, msg: `Connected! Response: "${json.data.response}"` } : { ok: false, msg: json.error });
    } catch { setOpenRouterResult({ ok: false, msg: "Network error" }); }
    setOpenRouterTesting(false);
  };

  const toggleShow = (key: string) => setShowKeys({ ...showKeys, [key]: !showKeys[key] });

  const KeyInput = ({ label, field, placeholder }: { label: string; field: string; placeholder: string }) => (
    <div>
      <label className={`text-xs font-medium ${txtSec} mb-1 block`}>{label}</label>
      <div className="relative">
        <input
          type={showKeys[field] ? "text" : "password"}
          value={(form as any)[field]}
          onChange={(e) => setForm({ ...form, [field]: e.target.value })}
          className={`${inp} pr-10`}
          placeholder={placeholder}
        />
        <button type="button" onClick={() => toggleShow(field)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors">
          {showKeys[field] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className={`min-h-screen ${bg} flex items-center justify-center`}>
        <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${bg} transition-colors duration-300`}>
      <div className="max-w-3xl mx-auto p-6 space-y-6 pb-20">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <Link to="/admin" className={`inline-flex items-center gap-1 text-xs ${txtSec} hover:text-purple-400 transition-colors mb-2`}>
            <ArrowLeft className="w-3 h-3" /> Back to Admin
          </Link>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">⚙️ API Settings</h1>
          <p className={`text-sm ${txtSec} mt-1`}>Configure Stripe payments and Claude AI for content generation</p>
        </motion.div>

        {/* Stripe Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`${card} backdrop-blur-lg border rounded-2xl p-6 space-y-4`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-purple-400" />
              <h2 className={`text-lg font-semibold ${dark ? "text-white" : "text-gray-900"}`}>Stripe</h2>
            </div>
            <button onClick={testStripe} disabled={stripeTesting}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-500/20 text-purple-400 text-xs font-semibold hover:bg-purple-500/30 transition-all disabled:opacity-50">
              {stripeTesting ? <Loader2 className="w-3 h-3 animate-spin" /> : <Zap className="w-3 h-3" />}
              Test Connection
            </button>
          </div>
          {stripeResult && (
            <div className={`flex items-center gap-2 text-xs px-3 py-2 rounded-xl ${stripeResult.ok ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"}`}>
              {stripeResult.ok ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
              {stripeResult.msg}
            </div>
          )}

          <KeyInput label="Secret Key" field="stripeSecretKey" placeholder="sk_live_..." />
          <KeyInput label="Publishable Key" field="stripePublishableKey" placeholder="pk_live_..." />
          <KeyInput label="Premium Price ID" field="stripePremiumPriceId" placeholder="price_..." />
          <KeyInput label="Exam Prep Price ID" field="stripeExamPrepPriceId" placeholder="price_..." />
          <KeyInput label="Webhook Secret" field="stripeWebhookSecret" placeholder="whsec_..." />
          <div>
            <label className={`text-xs font-medium ${txtSec} mb-1 block`}>Frontend URL</label>
            <input value={form.frontendUrl} onChange={(e) => setForm({ ...form, frontendUrl: e.target.value })}
              className={inp} placeholder="https://francprep.com" />
          </div>
        </motion.div>

        {/* Anthropic Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className={`${card} backdrop-blur-lg border rounded-2xl p-6 space-y-4`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-400" />
              <h2 className={`text-lg font-semibold ${dark ? "text-white" : "text-gray-900"}`}>Claude AI</h2>
            </div>
            <button onClick={testAnthropic} disabled={anthropicTesting}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-500/20 text-purple-400 text-xs font-semibold hover:bg-purple-500/30 transition-all disabled:opacity-50">
              {anthropicTesting ? <Loader2 className="w-3 h-3 animate-spin" /> : <Zap className="w-3 h-3" />}
              Test Connection
            </button>
          </div>
          {anthropicResult && (
            <div className={`flex items-center gap-2 text-xs px-3 py-2 rounded-xl ${anthropicResult.ok ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"}`}>
              {anthropicResult.ok ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
              {anthropicResult.msg}
            </div>
          )}
          <KeyInput label="Anthropic API Key" field="anthropicApiKey" placeholder="sk-ant-..." />
          <p className={`text-[10px] ${txtSec}`}>Used by the Content Generator to create lessons directly from the admin panel.</p>
        </motion.div>

        {/* OpenRouter Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className={`${card} backdrop-blur-lg border rounded-2xl p-6 space-y-4`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-purple-400" />
              <h2 className={`text-lg font-semibold ${dark ? "text-white" : "text-gray-900"}`}>OpenRouter AI (Free & Premium Models)</h2>
            </div>
            <button onClick={testOpenRouter} disabled={openRouterTesting}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-500/20 text-purple-400 text-xs font-semibold hover:bg-purple-500/30 transition-all disabled:opacity-50">
              {openRouterTesting ? <Loader2 className="w-3 h-3 animate-spin" /> : <Zap className="w-3 h-3" />}
              Test Connection
            </button>
          </div>
          {openRouterResult && (
            <div className={`flex items-center gap-2 text-xs px-3 py-2 rounded-xl ${openRouterResult.ok ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"}`}>
              {openRouterResult.ok ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
              {openRouterResult.msg}
            </div>
          )}
          <KeyInput label="OpenRouter API Key" field="openRouterApiKey" placeholder="sk-or-v1-..." />
          <p className={`text-[10px] ${txtSec}`}>Used for multi-LLM lesson validation, automated reviews, and written exercise grading.</p>
        </motion.div>

        {/* Module Gating & DELF Milestone Rules */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className={`${card} backdrop-blur-lg border rounded-2xl p-6 space-y-5`}>
          <div className="flex items-center justify-between border-b border-[#1e2a4a] pb-3">
            <div className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-amber-400" />
              <div>
                <h2 className={`text-lg font-semibold ${dark ? "text-white" : "text-gray-900"}`}>
                  Module Gating & DELF Milestone Rules
                </h2>
                <p className={`text-xs ${txtSec}`}>Control how students unlock next modules via DELF/DALF diagnostic milestone exams</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold mb-2">Global Module Gate Mode</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setGatingSettings({ ...gatingSettings, gatingMode: "all_locked" })}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    gatingSettings.gatingMode === "all_locked"
                      ? "bg-purple-600/20 border-purple-500 text-white font-bold"
                      : "bg-[#0c1224] border-[#1e2a4a] text-gray-400 hover:border-purple-500/30"
                  }`}
                >
                  <div className="text-xs font-extrabold flex items-center gap-1.5">🔒 Strict Gated Progression</div>
                  <p className="text-[10px] opacity-80 mt-1">All modules locked by default. Students MUST pass DELF exam to unlock next chapter.</p>
                </button>

                <button
                  type="button"
                  onClick={() => setGatingSettings({ ...gatingSettings, gatingMode: "selective_locked" })}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    gatingSettings.gatingMode === "selective_locked"
                      ? "bg-amber-500/20 border-amber-500 text-white font-bold"
                      : "bg-[#0c1224] border-[#1e2a4a] text-gray-400 hover:border-amber-500/30"
                  }`}
                >
                  <div className="text-xs font-extrabold flex items-center gap-1.5">🎛️ Selective Chapter Gating</div>
                  <p className="text-[10px] opacity-80 mt-1">Only lock specific chapters selected below. Rest remain unlocked.</p>
                </button>

                <button
                  type="button"
                  onClick={() => setGatingSettings({ ...gatingSettings, gatingMode: "all_unlocked" })}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    gatingSettings.gatingMode === "all_unlocked"
                      ? "bg-emerald-500/20 border-emerald-500 text-white font-bold"
                      : "bg-[#0c1224] border-[#1e2a4a] text-gray-400 hover:border-emerald-500/30"
                  }`}
                >
                  <div className="text-xs font-extrabold flex items-center gap-1.5">🔓 Free Roam Mode</div>
                  <p className="text-[10px] opacity-80 mt-1">All modules open to all registered students without restrictions.</p>
                </button>
              </div>
            </div>

            <div className="pt-2">
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>DELF Exam Passing Score Threshold:</span>
                <span className="text-purple-400 font-mono text-sm">{gatingSettings.passingScorePercentage}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="90"
                step="5"
                value={gatingSettings.passingScorePercentage}
                onChange={(e) => setGatingSettings({ ...gatingSettings, passingScorePercentage: Number(e.target.value) })}
                className="w-full accent-purple-500 cursor-pointer"
              />
              <p className="text-[10px] text-gray-400 mt-1">Students achieving this percentage or higher on milestone exams instantly unlock the next chapter.</p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleSaveGating}
                disabled={savingGating}
                className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs shadow flex items-center gap-1.5 transition-all"
              >
                {savingGating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                Save Module Gate Settings
              </button>
              {gatingMsg && <span className="text-xs text-emerald-400 font-semibold">{gatingMsg}</span>}
            </div>
          </div>
        </motion.div>

        {/* Save Global */}
        <div className="flex items-center gap-3">
          <button onClick={handleSave} disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold hover:opacity-90 transition-all disabled:opacity-50 shadow-lg shadow-purple-500/25">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? "Saving..." : "Save Settings"}
          </button>
          {saveMsg && <span className="text-xs text-emerald-400 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> {saveMsg}</span>}
        </div>
      </div>
    </div>
  );
}
