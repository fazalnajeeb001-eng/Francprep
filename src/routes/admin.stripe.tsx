import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { apiFetch } from "~/lib/apiFetch";
import { motion } from "framer-motion";
import {
  CreditCard,
  Save,
  Loader2,
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { useTheme } from "~/lib/ThemeContext";

export const Route = createFileRoute("/admin/stripe")({ component: AdminStripePage });

export function AdminStripePage() {
  const { dark } = useTheme();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");
  const [testResult, setTestResult] = useState<{ success?: boolean; error?: string; message?: string }>({});

  const [form, setForm] = useState({
    stripeSecretKey: "",
    stripePublishableKey: "",
    stripePremiumPriceId: "",
    stripeExamPrepPriceId: "",
    stripeWebhookSecret: "",
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
            stripeSecretKey: j.data.stripeSecretKey || "",
            stripePublishableKey: j.data.stripePublishableKey || "",
            stripePremiumPriceId: j.data.stripePremiumPriceId || "",
            stripeExamPrepPriceId: j.data.stripeExamPrepPriceId || "",
            stripeWebhookSecret: j.data.stripeWebhookSecret || "",
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
      if (json.success) setSaveMsg("Stripe Credentials successfully saved!");
      else setSaveMsg(json.error || "Failed to save");
    } catch {
      setSaveMsg("Network error");
    }
    setSaving(false);
  };

  const handleTestStripe = async () => {
    setTesting(true);
    setTestResult({});
    try {
      const res = await apiFetch("/settings/test-stripe", { method: "POST" });
      const json = await res.json();
      setTestResult(json);
    } catch (e: any) {
      setTestResult({ success: false, error: e.message });
    }
    setTesting(false);
  };

  return (
    <div className={`min-h-screen ${bg} p-4 md:p-8 transition-colors duration-300`}>
      <div className="max-w-4xl mx-auto space-y-6">

        {/* ─── HEADER ─── */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-4 border-b border-gray-200 dark:border-white/10">
          <div>
            <Link to="/admin" className="text-xs text-purple-400 hover:underline flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Admin Dashboard
            </Link>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight mt-1 flex items-center gap-3">
              <CreditCard className="w-8 h-8 text-purple-400" />
              Stripe Payment Gateway Credentials
            </h1>
            <p className={`text-xs ${txtSec} mt-1`}>
              Dedicated strictly to Stripe live/test API keys, price IDs, and webhooks.
            </p>
          </div>

          <button
            onClick={handleSaveAPI}
            disabled={saving}
            className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs shadow-lg shadow-purple-600/30 flex items-center gap-2"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save Stripe Credentials
          </button>
        </div>

        {/* ─── STRIPE CARD ─── */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className={`p-6 rounded-2xl border ${card} space-y-4`}>
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-white/10 pb-3">
            <h3 className="text-base font-extrabold flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-purple-400" /> Live / Test Secret & Publishable Keys
            </h3>

            <button
              type="button"
              onClick={handleTestStripe}
              disabled={testing}
              className="px-3 py-1.5 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 border border-purple-500/20 text-xs font-bold flex items-center gap-1.5"
            >
              {testing ? <Loader2 className="w-3 h-3 animate-spin" /> : <CheckCircle2 className="w-3 h-3" />}
              Test Connection
            </button>
          </div>

          {testResult.success !== undefined && (
            <div className={`p-3 rounded-xl border text-xs font-bold flex items-center gap-2 ${testResult.success ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" : "bg-red-500/10 border-red-500/30 text-red-400"}`}>
              {testResult.success ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
              {testResult.success ? "Stripe API Connection Successful!" : `Connection Error: ${testResult.error}`}
            </div>
          )}

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
              <label className="block text-xs font-bold mb-1">Exam Prep Price ID</label>
              <input
                type="text"
                value={form.stripeExamPrepPriceId}
                onChange={(e) => setForm({ ...form, stripeExamPrepPriceId: e.target.value })}
                placeholder="price_..."
                className={inp}
              />
            </div>
          </div>

          <div className="pt-2">
            <label className="block text-xs font-bold mb-1">Stripe Webhook Secret</label>
            <input
              type="password"
              value={form.stripeWebhookSecret}
              onChange={(e) => setForm({ ...form, stripeWebhookSecret: e.target.value })}
              placeholder="whsec_..."
              className={inp}
            />
          </div>

          {saveMsg && <p className="text-xs text-emerald-400 font-bold text-right pt-2">{saveMsg}</p>}
        </motion.div>

      </div>
    </div>
  );
}
