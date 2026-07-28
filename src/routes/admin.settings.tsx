import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useMemo } from "react";
import { apiFetch } from "~/lib/apiFetch";
import { motion, AnimatePresence } from "framer-motion";
import {
  Settings,
  CreditCard,
  Brain,
  Save,
  CheckCircle2,
  XCircle,
  Loader2,
  Eye,
  EyeOff,
  ArrowLeft,
  Zap,
  Lock,
  Search,
  UserCheck,
  Users,
  ShieldAlert,
  GraduationCap,
  Sliders,
  Layers,
  Check,
  RotateCcw
} from "lucide-react";
import { useTheme } from "~/lib/ThemeContext";

export const Route = createFileRoute("/admin/settings")({ component: AdminSettingsPage });

interface StudentUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  isExemptFromGating?: boolean;
}

function AdminSettingsPage() {
  const { dark } = useTheme();
  const [activeTab, setActiveTab] = useState<"GATING" | "INTEGRATIONS">("GATING");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});

  // Student Search & Selection State
  const [students, setStudents] = useState<StudentUser[]>([]);
  const [studentSearch, setStudentSearch] = useState("");
  const [selectedStudentIds, setSelectedStudentIds] = useState<string[]>([]);

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
    lockScope: "module",
    passingScorePercentage: 70,
    lockedChapterIds: [] as string[],
    targetUserIds: [] as string[],
  });
  const [savingGating, setSavingGating] = useState(false);
  const [gatingMsg, setGatingMsg] = useState("");

  const bg = dark ? "bg-[#070B17] text-white" : "bg-[#F8FAFC] text-slate-900";
  const card = dark ? "bg-[#101828]/90 border-white/10" : "bg-white border-slate-200 shadow-sm";
  const inp = `w-full rounded-xl ${dark ? "bg-[#070B17] border-white/10 text-white" : "bg-white border-slate-300 text-slate-900"} border px-4 py-2.5 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all font-mono`;
  const txtSec = dark ? "text-gray-400" : "text-slate-600";

  useEffect(() => {
    // Fetch Global API Settings
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

    // Fetch Module Gate Settings
    apiFetch("/admin/settings/gating").then((r) => r.json()).then((j) => {
      if (j.success && j.data) {
        setGatingSettings(j.data);
        if (j.data.targetUserIds) setSelectedStudentIds(j.data.targetUserIds);
      }
    }).catch(() => {});

    // Fetch Registered Students
    apiFetch("/admin/users").then((r) => r.json()).then((j) => {
      if (j.success && Array.isArray(j.data)) {
        setStudents(j.data.filter((u: any) => u.role !== 'admin'));
      }
    }).catch(() => {});
  }, []);

  const handleSaveGating = async () => {
    setSavingGating(true);
    setGatingMsg("");
    try {
      const payload = {
        ...gatingSettings,
        targetUserIds: selectedStudentIds,
      };
      const res = await apiFetch("/admin/settings/gating", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (json.success) setGatingMsg("Module Gate Rules Successfully Saved!");
      else setGatingMsg(json.error || "Failed to save");
    } catch {
      setGatingMsg("Network error");
    }
    setSavingGating(false);
  };

  const handleSaveAPI = async () => {
    setSaving(true); setSaveMsg("");
    try {
      const res = await apiFetch("/settings", {
        method: "PUT", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (json.success) setSaveMsg("API Settings saved!");
      else setSaveMsg(json.error || "Failed to save");
    } catch { setSaveMsg("Network error"); }
    setSaving(false);
  };

  const filteredStudents = useMemo(() => {
    if (!studentSearch.trim()) return students;
    const q = studentSearch.toLowerCase();
    return students.filter(
      (s) =>
        s.firstName?.toLowerCase().includes(q) ||
        s.lastName?.toLowerCase().includes(q) ||
        s.email?.toLowerCase().includes(q)
    );
  }, [students, studentSearch]);

  const toggleStudentSelection = (id: string) => {
    setSelectedStudentIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const selectAllStudents = () => setSelectedStudentIds(students.map(s => s._id));
  const deselectAllStudents = () => setSelectedStudentIds([]);

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
              <Sliders className="w-8 h-8 text-purple-400" />
              Platform Settings & Module Controls
            </h1>
            <p className={`text-xs ${txtSec} mt-1`}>
              Configure Module Gating rules, student lock exemptions, and platform API integrations.
            </p>
          </div>
        </div>

        {/* ─── WORKSPACE NAVIGATION TABS ─── */}
        <div className="flex items-center gap-3 border-b border-gray-200 dark:border-white/10 pb-3">
          <button
            onClick={() => setActiveTab("GATING")}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === "GATING"
                ? "bg-amber-500 text-black shadow-lg shadow-amber-500/20 scale-105"
                : dark
                ? "bg-[#101828] border border-white/10 text-gray-400 hover:border-amber-500/40"
                : "bg-white border border-slate-200 text-slate-700 hover:border-amber-400"
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>🔒 Module Progression & Gates</span>
          </button>

          <button
            onClick={() => setActiveTab("INTEGRATIONS")}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === "INTEGRATIONS"
                ? "bg-purple-600 text-white shadow-lg shadow-purple-600/20 scale-105"
                : dark
                ? "bg-[#101828] border border-white/10 text-gray-400 hover:border-purple-500/40"
                : "bg-white border border-slate-200 text-slate-700 hover:border-purple-400"
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>🔌 API Keys & Integrations</span>
          </button>
        </div>

        {/* ─── TAB 1: MODULE PROGRESSION & GATES WORKSPACE ─── */}
        {activeTab === "GATING" && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">

            {/* 1 DELF EXAM PER MODULE INFO BANNER */}
            <div className="p-4 rounded-2xl border bg-amber-500/10 border-amber-500/20 text-xs space-y-2">
              <span className="font-bold text-amber-400 flex items-center gap-1.5 text-sm">
                <GraduationCap className="w-4 h-4" />
                <span>1 Official DELF / DALF Diagnostic Exam per CEFR Module</span>
              </span>
              <p className="text-amber-200/90 leading-relaxed">
                Students have <strong>100% Free Roam access</strong> to all chapters and lessons inside an unlocked module. Progression gating triggers <strong>only when advancing to the next module</strong> (e.g. Module A1 ➔ Module A2 requires passing DELF A1 Exam with 70%+ score).
              </p>
              <div className="flex flex-wrap gap-2 pt-1 font-mono text-[11px]">
                {["A1 ➔ DELF A1", "A2 ➔ DELF A2", "B1 ➔ DELF B1", "B2 ➔ DELF B2", "C1 ➔ DALF C1", "C2 ➔ DALF C2"].map((pair, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                    {pair}
                  </span>
                ))}
              </div>
            </div>

            {/* GLOBAL GATE MODE & SCOPE */}
            <div className={`p-6 rounded-2xl border ${card} space-y-6`}>
              <div>
                <h3 className="text-base font-extrabold flex items-center gap-2">
                  <Lock className="w-5 h-5 text-amber-400" /> Global Module Gate Mode
                </h3>
                <p className={`text-xs ${txtSec} mt-0.5`}>Choose platform-wide progression rules for all enrolled students.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setGatingSettings({ ...gatingSettings, gatingMode: "all_locked" })}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    gatingSettings.gatingMode === "all_locked"
                      ? "bg-purple-600/20 border-purple-500 text-white font-bold shadow-md"
                      : "bg-white/5 border-white/10 text-gray-400 hover:border-purple-500/30"
                  }`}
                >
                  <div className="text-xs font-black flex items-center gap-1.5">🔒 Strict Gated Progression</div>
                  <p className="text-[10px] opacity-80 mt-1">All modules locked by default. Students MUST pass previous DELF exam to unlock next level.</p>
                </button>

                <button
                  type="button"
                  onClick={() => setGatingSettings({ ...gatingSettings, gatingMode: "selective_locked" })}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    gatingSettings.gatingMode === "selective_locked"
                      ? "bg-amber-500/20 border-amber-500 text-white font-bold shadow-md"
                      : "bg-white/5 border-white/10 text-gray-400 hover:border-amber-500/30"
                  }`}
                >
                  <div className="text-xs font-black flex items-center gap-1.5">🎛️ Selective Level Locking</div>
                  <p className="text-[10px] opacity-80 mt-1">Select specific modules to lock while keeping others open.</p>
                </button>

                <button
                  type="button"
                  onClick={() => setGatingSettings({ ...gatingSettings, gatingMode: "all_unlocked" })}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    gatingSettings.gatingMode === "all_unlocked"
                      ? "bg-emerald-500/20 border-emerald-500 text-white font-bold shadow-md"
                      : "bg-white/5 border-white/10 text-gray-400 hover:border-emerald-500/30"
                  }`}
                >
                  <div className="text-xs font-black flex items-center gap-1.5">🔓 Free Roam Mode</div>
                  <p className="text-[10px] opacity-80 mt-1">Unlocks all modules platform-wide for all students without restrictions.</p>
                </button>
              </div>

              {/* LOCK SCOPE SELECTOR */}
              <div className="pt-3 border-t border-gray-200 dark:border-white/10 space-y-2">
                <label className="block text-xs font-bold">Lock Granularity Scope</label>
                <div className="flex items-center gap-3">
                  {[
                    { id: "module", label: "Module Level (Recommended)" },
                    { id: "chapter", label: "Chapter Level" },
                    { id: "lesson", label: "Lesson Level" },
                  ].map(s => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setGatingSettings({ ...gatingSettings, lockScope: s.id as any })}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                        gatingSettings.lockScope === s.id
                          ? "bg-purple-600 text-white border-purple-500"
                          : "bg-white/5 border-white/10 text-gray-400 hover:border-purple-400"
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* PASS THRESHOLD SLIDER */}
              <div className="pt-3 border-t border-gray-200 dark:border-white/10 space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span>DELF Exam Pass Requirement Score:</span>
                  <span className="text-amber-400 font-mono text-sm">{gatingSettings.passingScorePercentage}%</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="95"
                  step="5"
                  value={gatingSettings.passingScorePercentage}
                  onChange={(e) => setGatingSettings({ ...gatingSettings, passingScorePercentage: Number(e.target.value) })}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>
            </div>

            {/* STUDENT PICKER BY NAME */}
            <div className={`p-6 rounded-2xl border ${card} space-y-5`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-extrabold flex items-center gap-2">
                    <UserCheck className="w-5 h-5 text-purple-400" /> Target Selected Students by Name
                  </h3>
                  <p className={`text-xs ${txtSec} mt-0.5`}>
                    Apply gating rules specifically to selected students (or leave unselected to apply globally).
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={selectAllStudents}
                    className="px-3 py-1.5 rounded-lg border border-purple-500/30 bg-purple-500/10 text-purple-400 text-xs font-bold hover:bg-purple-500/20"
                  >
                    Select All ({students.length})
                  </button>
                  <button
                    type="button"
                    onClick={deselectAllStudents}
                    className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-gray-400 text-xs font-bold hover:bg-white/10"
                  >
                    Clear Selection
                  </button>
                </div>
              </div>

              {/* SEARCH INPUT */}
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Search students by name or email..."
                  value={studentSearch}
                  onChange={(e) => setStudentSearch(e.target.value)}
                  className="w-full rounded-xl p-2.5 pl-10 text-xs font-mono border dark:bg-[#070B17] dark:border-white/10 text-white outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* STUDENT LIST CHECKBOXES */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-60 overflow-y-auto p-1">
                {filteredStudents.map((s) => {
                  const isChecked = selectedStudentIds.includes(s._id);
                  return (
                    <label
                      key={s._id}
                      onClick={() => toggleStudentSelection(s._id)}
                      className={`flex items-center justify-between p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                        isChecked
                          ? "bg-purple-600/20 border-purple-500 text-white font-bold"
                          : "bg-white/5 border-white/10 text-gray-400 hover:border-purple-500/30"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="accent-purple-500"
                        />
                        <div>
                          <span className="font-bold block">{s.firstName} {s.lastName}</span>
                          <span className="text-[10px] text-gray-400 font-mono">{s.email}</span>
                        </div>
                      </div>
                      {isChecked && <Check className="w-4 h-4 text-purple-400" />}
                    </label>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-gray-200 dark:border-white/10 flex items-center justify-between">
                <span className="text-xs text-purple-400 font-bold">
                  {selectedStudentIds.length} student(s) targeted for custom rules
                </span>
                <button
                  onClick={handleSaveGating}
                  disabled={savingGating}
                  className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs shadow-lg shadow-amber-500/20 flex items-center gap-2 transition-all"
                >
                  {savingGating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Save Module Gate Settings
                </button>
              </div>
              {gatingMsg && <p className="text-xs text-emerald-400 font-bold text-right">{gatingMsg}</p>}
            </div>

          </motion.div>
        )}

        {/* ─── TAB 2: API KEYS & INTEGRATIONS WORKSPACE ─── */}
        {activeTab === "INTEGRATIONS" && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">

            {/* STRIPE CARD */}
            <div className={`p-6 rounded-2xl border ${card} space-y-4`}>
              <div className="flex items-center justify-between border-b border-gray-200 dark:border-white/10 pb-3">
                <h3 className="text-base font-extrabold flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-purple-400" /> Stripe Payment Gateway
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
                  <label className="block text-xs font-bold mb-1">Publishable Key</label>
                  <input
                    type="text"
                    value={form.stripePublishableKey}
                    onChange={(e) => setForm({ ...form, stripePublishableKey: e.target.value })}
                    placeholder="pk_live_..."
                    className={inp}
                  />
                </div>
              </div>
            </div>

            {/* AI KEYS CARD */}
            <div className={`p-6 rounded-2xl border ${card} space-y-4`}>
              <div className="flex items-center justify-between border-b border-gray-200 dark:border-white/10 pb-3">
                <h3 className="text-base font-extrabold flex items-center gap-2">
                  <Brain className="w-5 h-5 text-purple-400" /> Claude & OpenRouter AI LLM Keys
                </h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold mb-1">Anthropic API Key (Claude 3.5 Sonnet)</label>
                  <input
                    type="password"
                    value={form.anthropicApiKey}
                    onChange={(e) => setForm({ ...form, anthropicApiKey: e.target.value })}
                    placeholder="sk-ant-api03-..."
                    className={inp}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1">OpenRouter API Key (Multi-LLM Evaluator)</label>
                  <input
                    type="password"
                    value={form.openRouterApiKey}
                    onChange={(e) => setForm({ ...form, openRouterApiKey: e.target.value })}
                    placeholder="sk-or-v1-..."
                    className={inp}
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200 dark:border-white/10 flex items-center justify-between">
                <button
                  onClick={handleSaveAPI}
                  disabled={saving}
                  className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs shadow-lg shadow-purple-600/30 flex items-center gap-2"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Save API Keys
                </button>
                {saveMsg && <span className="text-xs text-emerald-400 font-bold">{saveMsg}</span>}
              </div>
            </div>

          </motion.div>
        )}

      </div>
    </div>
  );
}
