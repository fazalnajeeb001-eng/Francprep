import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useMemo } from "react";
import { apiFetch } from "~/lib/apiFetch";
import { motion, AnimatePresence } from "framer-motion";
import {
  CreditCard,
  Crown,
  Gift,
  DollarSign,
  Search,
  CheckCircle2,
  XCircle,
  Save,
  Loader2,
  Sliders,
  UserCheck,
  Zap,
  Sparkles,
  ArrowLeft,
  ShieldCheck,
  Tag,
  Plus,
  Trash2,
  Edit,
  Check,
  Layers,
  Award,
  BookOpen
} from "lucide-react";
import { useTheme } from "~/lib/ThemeContext";

export const Route = createFileRoute("/admin/subscriptions")({
  component: SubscriptionsPage,
});

interface PricingPlan {
  id: string;
  title: string;
  description: string;
  price: number;
  interval: "monthly" | "annual" | "one_time";
  badge?: string;
  features: string[];
  accessScope: "all_access" | "simulator_only" | "delf_only" | "lessons_only";
  isPopular?: boolean;
  isActive: boolean;
}

interface Student {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  subscriptionTier: string;
  isVipFreeAccess?: boolean;
  customPriceOverride?: number;
  specialDiscountRate?: string;
  isExemptFromGating?: boolean;
}

const CEFR_LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"];

export function SubscriptionsPage() {
  const { dark } = useTheme();
  const [loading, setLoading] = useState(true);
  const [savingPrice, setSavingPrice] = useState(false);
  const [priceMsg, setPriceMsg] = useState("");

  // Pricing & Free Preview Settings State
  const [pricingSettings, setPricingSettings] = useState({
    monthlyPrice: 29,
    annualPrice: 199,
    lifetimePrice: 299,
    freePreviewScope: "first_chapter_a1",
    customFreeChapterIds: [] as string[],
    customPricingPlans: [] as PricingPlan[],
    paywallEnforced: true,
    isSocialHubEnabled: false,
  });

  // Dynamic Plan Modal State
  const [planModalOpen, setPlanModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<PricingPlan | null>(null);
  const [planForm, setPlanForm] = useState<PricingPlan>({
    id: "",
    title: "",
    description: "",
    price: 29,
    interval: "monthly",
    badge: "",
    features: [""],
    accessScope: "all_access",
    isPopular: false,
    isActive: true,
  });

  // Students List & Search State
  const [students, setStudents] = useState<Student[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Per-Student Modal States
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [grantModalOpen, setGrantModalOpen] = useState(false);
  const [customPriceModalOpen, setCustomPriceModalOpen] = useState(false);
  const [customPriceVal, setCustomPriceVal] = useState<number | "">("");
  const [discountNoteVal, setDiscountNoteVal] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  const bg = dark ? "bg-[#070B17] text-white" : "bg-[#F8FAFC] text-slate-900";
  const card = dark ? "bg-[#101828]/90 border-white/10" : "bg-white border-slate-200 shadow-sm";
  const inp = `w-full rounded-xl ${dark ? "bg-[#070B17] border-white/10 text-white" : "bg-white border-slate-300 text-slate-900"} border px-4 py-2.5 text-xs font-mono placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`;
  const txtSec = dark ? "text-gray-400" : "text-slate-600";

  const fetchSettingsAndStudents = async () => {
    setLoading(true);
    try {
      const [sRes, uRes] = await Promise.all([
        apiFetch("/admin/subscriptions/settings"),
        apiFetch("/admin/users"),
      ]);
      const sJson = await sRes.json();
      const uJson = await uRes.json();

      if (sJson.success && sJson.data) {
        setPricingSettings(sJson.data);
      }
      if (uJson.success && Array.isArray(uJson.data)) {
        setStudents(uJson.data.filter((u: any) => u.role !== "admin"));
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSettingsAndStudents();
  }, []);

  const handleSavePricingSettings = async (updatedSettings = pricingSettings) => {
    setSavingPrice(true);
    setPriceMsg("");
    try {
      const res = await apiFetch("/admin/subscriptions/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedSettings),
      });
      const json = await res.json();
      if (json.success) {
        setPriceMsg("Monetization & Pricing Packages Saved!");
        setPricingSettings(json.data);
      } else setPriceMsg(json.error || "Failed to save");
    } catch {
      setPriceMsg("Network error");
    }
    setSavingPrice(false);
  };

  // DYNAMIC PLAN HANDLERS
  const handleOpenNewPlanModal = () => {
    setEditingPlan(null);
    setPlanForm({
      id: `plan_${Date.now()}`,
      title: "",
      description: "",
      price: 29,
      interval: "monthly",
      badge: "",
      features: [""],
      accessScope: "all_access",
      isPopular: false,
      isActive: true,
    });
    setPlanModalOpen(true);
  };

  const handleOpenEditPlanModal = (plan: PricingPlan) => {
    setEditingPlan(plan);
    setPlanForm({ ...plan });
    setPlanModalOpen(true);
  };

  const handleSavePlanForm = () => {
    let updatedPlans = [...(pricingSettings.customPricingPlans || [])];
    if (editingPlan) {
      updatedPlans = updatedPlans.map((p) => (p.id === editingPlan.id ? planForm : p));
    } else {
      updatedPlans.push(planForm);
    }
    const newSettings = { ...pricingSettings, customPricingPlans: updatedPlans };
    setPricingSettings(newSettings);
    handleSavePricingSettings(newSettings);
    setPlanModalOpen(false);
  };

  const handleDeletePlan = (planId: string) => {
    const updatedPlans = (pricingSettings.customPricingPlans || []).filter((p) => p.id !== planId);
    const newSettings = { ...pricingSettings, customPricingPlans: updatedPlans };
    setPricingSettings(newSettings);
    handleSavePricingSettings(newSettings);
  };

  const toggleFreeChapterSelection = (chapterCode: string) => {
    const prev = pricingSettings.customFreeChapterIds || [];
    const exists = prev.includes(chapterCode);
    const updated = exists ? prev.filter((c) => c !== chapterCode) : [...prev, chapterCode];
    setPricingSettings({ ...pricingSettings, customFreeChapterIds: updated });
  };

  // PER-STUDENT CUSTOM GRANTS HANDLERS
  const handleGrantFreeVIP = async (studentId: string, grant: boolean) => {
    setActionLoading(true);
    try {
      const res = await apiFetch(`/admin/users/${studentId}/grant-free-access`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isVipFreeAccess: grant, subscriptionTier: grant ? "premium" : "free" }),
      });
      const json = await res.json();
      if (json.success) {
        fetchSettingsAndStudents();
        setGrantModalOpen(false);
      }
    } catch (e) {}
    setActionLoading(false);
  };

  const handleApplyCustomPrice = async (studentId: string) => {
    setActionLoading(true);
    try {
      const res = await apiFetch(`/admin/users/${studentId}/custom-price`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customPriceOverride: customPriceVal === "" ? null : Number(customPriceVal),
          specialDiscountRate: discountNoteVal,
        }),
      });
      const json = await res.json();
      if (json.success) {
        fetchSettingsAndStudents();
        setCustomPriceModalOpen(false);
      }
    } catch (e) {}
    setActionLoading(false);
  };

  // SPACE-AWARE MULTI-TOKEN SEARCH
  const filteredStudents = useMemo(() => {
    if (!searchQuery.trim()) return students;
    const tokens = searchQuery.trim().toLowerCase().split(/\s+/);
    return students.filter((s) => {
      const fullName = `${s.firstName || ""} ${s.lastName || ""}`.toLowerCase();
      const email = (s.email || "").toLowerCase();
      return tokens.every((token) => fullName.includes(token) || email.includes(token));
    });
  }, [students, searchQuery]);

  return (
    <div className={`min-h-screen ${bg} p-4 md:p-8 space-y-6 transition-colors duration-300`}>
      <div className="max-w-6xl mx-auto space-y-6">

        {/* ─── HEADER ─── */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-4 border-b border-gray-200 dark:border-white/10">
          <div>
            <Link to="/admin" className="text-xs text-purple-400 hover:underline flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Admin Dashboard
            </Link>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight mt-1 flex items-center gap-3">
              <Crown className="w-8 h-8 text-amber-400" />
              Subscriptions, Dynamic Packages & Free Content Engine
            </h1>
            <p className={`text-xs ${txtSec} mt-1`}>
              Add, edit, or delete dynamic pricing packages, configure granular free content rules, and grant per-student custom prices or 100% free VIP access.
            </p>
          </div>
        </div>

        {/* ─── WORKSPACE 1: DYNAMIC PRICING PACKAGES MANAGER ─── */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className={`p-6 rounded-2xl border ${card} space-y-6`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-200 dark:border-white/10 pb-3">
            <div>
              <h3 className="text-base font-extrabold flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-emerald-400" /> Dynamic Pricing Package Manager (Add / Edit / Delete Packages)
              </h3>
              <p className={`text-xs ${txtSec} mt-0.5`}>Create dynamic offers like Simulator Only Pass, DELF Exam Pass, or VIP All-Access.</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleOpenNewPlanModal}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs shadow flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> Add New Package
              </button>

              <button
                onClick={() => handleSavePricingSettings()}
                disabled={savingPrice}
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs shadow flex items-center gap-1.5"
              >
                {savingPrice ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Save Packages
              </button>
            </div>
          </div>

          {/* DYNAMIC PACKAGES GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(pricingSettings.customPricingPlans || []).map((plan) => (
              <div
                key={plan.id}
                className={`p-5 rounded-2xl border flex flex-col justify-between space-y-4 relative ${
                  plan.isPopular ? "border-purple-500 bg-purple-500/5" : "border-white/10 bg-white/5"
                }`}
              >
                {plan.badge && (
                  <span className="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow">
                    {plan.badge}
                  </span>
                )}

                <div className="space-y-2">
                  <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase bg-white/10 text-gray-300">
                    Scope: {plan.accessScope.replace("_", " ")}
                  </span>
                  <h4 className="text-base font-extrabold">{plan.title}</h4>
                  <p className="text-xs text-gray-400">{plan.description}</p>
                  <div className="text-2xl font-black text-emerald-400 font-mono">
                    ${plan.price}
                    <span className="text-xs font-normal text-gray-400">/{plan.interval}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                  <button
                    onClick={() => handleOpenEditPlanModal(plan)}
                    className="px-3 py-1.5 rounded-xl border border-white/10 hover:bg-white/10 text-xs font-bold text-gray-300 flex items-center gap-1"
                  >
                    <Edit className="w-3.5 h-3.5 text-purple-400" /> Edit
                  </button>
                  <button
                    onClick={() => handleDeletePlan(plan.id)}
                    className="px-3 py-1.5 rounded-xl border border-red-500/30 hover:bg-red-500/20 text-xs font-bold text-red-400 flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {priceMsg && <p className="text-xs text-emerald-400 font-bold text-right">{priceMsg}</p>}
        </motion.div>

        {/* ─── WORKSPACE 2: ENHANCED FREE CONTENT DETERMINATION ENGINE ─── */}
        <div className={`p-6 rounded-2xl border ${card} space-y-6`}>
          <div>
            <h3 className="text-base font-extrabold flex items-center gap-2">
              <Gift className="w-5 h-5 text-amber-400" /> Granular Free Content Determination Engine
            </h3>
            <p className={`text-xs ${txtSec} mt-0.5`}>Determine exactly what course content new registered students get for free before paywall.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold mb-2">Select Global Free Preview Rule:</label>
              <select
                value={pricingSettings.freePreviewScope}
                onChange={(e) => {
                  const updated = { ...pricingSettings, freePreviewScope: e.target.value as any };
                  setPricingSettings(updated);
                  handleSavePricingSettings(updated);
                }}
                className="w-full rounded-xl p-3 text-xs font-bold border dark:bg-[#070B17] dark:border-white/10 text-white outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="first_chapter_a1">🎯 Chapter 1 of Module A1 Free (Recommended Default)</option>
                <option value="first_two_chapters_a1">📖 First 2 Chapters of Module A1 Free</option>
                <option value="entire_module_a1">🏆 Entire Module A1 Free</option>
                <option value="first_chapter_all_levels">🌟 First Chapter of EVERY Level (A1, A2, B1, B2, C1, C2) Free (Top Growth Strategy)</option>
                <option value="cbt_demo_free">🎓 Free CBT Diagnostic Test & Simulator Demo</option>
                <option value="custom">🎛️ Custom Selected Free Chapters List</option>
              </select>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl border dark:border-white/10 bg-white/5">
              <div>
                <span className="text-xs font-bold block">Enforce Platform Paywall</span>
                <span className="text-[10px] text-gray-400">Require subscription payment after free trial scope.</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  const updated = { ...pricingSettings, paywallEnforced: !pricingSettings.paywallEnforced };
                  setPricingSettings(updated);
                  handleSavePricingSettings(updated);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                  pricingSettings.paywallEnforced ? "bg-emerald-500 text-black" : "bg-gray-600 text-white"
                }`}
              >
                {pricingSettings.paywallEnforced ? "PAYWALL ACTIVE" : "PAYWALL INACTIVE"}
              </button>
            </div>
          </div>

          {/* Master Social Hub Stealth Switch */}
          <div className="p-4 rounded-2xl border border-purple-500/30 bg-purple-500/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-extrabold text-purple-300">💬 Community Social Hub & Le Bot FrancPrep (Stealth Toggle)</span>
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {pricingSettings.isSocialHubEnabled ? "LIVE FOR ALL STUDENTS" : "STEALTH MODE (ADMIN ONLY)"}
                </span>
              </div>
              <p className="text-xs text-gray-300">
                When toggled <strong>OFF</strong>, the Community Lounge, Le Bot FrancPrep, and WhatsApp/Discord Study Circles are hidden from regular students while you test and refine them!
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                const updated = { ...pricingSettings, isSocialHubEnabled: !pricingSettings.isSocialHubEnabled };
                setPricingSettings(updated);
                handleSavePricingSettings(updated);
              }}
              className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all shrink-0 flex items-center gap-2 shadow-lg ${
                pricingSettings.isSocialHubEnabled
                  ? "bg-emerald-500 text-slate-950 hover:bg-emerald-400"
                  : "bg-amber-500 text-slate-950 hover:bg-amber-400"
              }`}
            >
              {pricingSettings.isSocialHubEnabled ? "🟢 SOCIAL HUB ENABLED (PUBLIC)" : "🔒 STEALTH MODE (OFF FOR STUDENTS)"}
            </button>
          </div>

          {/* CUSTOM FREE CHAPTER PICKER */}
          {pricingSettings.freePreviewScope === "custom" && (
            <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 space-y-3">
              <label className="block text-xs font-bold text-amber-400">Pick Exact CEFR Levels to Make 100% Free:</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {CEFR_LEVELS.map((code) => {
                  const isFree = (pricingSettings.customFreeChapterIds || []).includes(code);
                  return (
                    <button
                      key={code}
                      type="button"
                      onClick={() => toggleFreeChapterSelection(code)}
                      className={`p-2.5 rounded-xl border text-xs font-bold transition-all flex items-center justify-between ${
                        isFree
                          ? "bg-emerald-500/20 border-emerald-500 text-emerald-400"
                          : "bg-white/5 border-white/10 text-gray-400"
                      }`}
                    >
                      <span>Module {code}</span>
                      {isFree ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <span className="text-[10px] text-gray-500 font-mono">Paid</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* ─── WORKSPACE 3: STUDENT SEARCH & PER-STUDENT CUSTOM PRICING ─── */}
        <div className={`p-6 rounded-2xl border ${card} space-y-5`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-200 dark:border-white/10 pb-3">
            <div>
              <h3 className="text-base font-extrabold flex items-center gap-2">
                <Search className="w-5 h-5 text-purple-400" /> Student Search & Per-Student Custom Pricing
              </h3>
              <p className={`text-xs ${txtSec} mt-0.5`}>Search any student by full name (supports spaces) or Gmail address to grant free access or custom rates.</p>
            </div>
          </div>

          {/* SEARCH INPUT */}
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search student by full name (e.g. 'Fazal Najeeb') or Gmail address..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl p-2.5 pl-10 text-xs font-mono border dark:bg-[#070B17] dark:border-white/10 text-white outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* STUDENTS TABLE */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-gray-200 dark:border-white/10 text-gray-400 uppercase font-mono text-[10px]">
                  <th className="py-2.5 px-3">Student Name</th>
                  <th className="py-2.5 px-3">Gmail / Email</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3">Custom Rate</th>
                  <th className="py-2.5 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-white/10">
                {filteredStudents.map((student) => (
                  <tr key={student._id} className="hover:bg-white/5 transition-all">
                    <td className="py-3 px-3 font-bold">{student.firstName} {student.lastName}</td>
                    <td className="py-3 px-3 font-mono text-gray-400">{student.email}</td>
                    <td className="py-3 px-3">
                      {student.isVipFreeAccess ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          🎁 100% FREE VIP
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20">
                          {student.subscriptionTier.toUpperCase()}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-3 font-mono text-amber-400">
                      {student.customPriceOverride !== undefined && student.customPriceOverride !== null
                        ? `$${student.customPriceOverride} (${student.specialDiscountRate || "Custom"})`
                        : "Standard"}
                    </td>
                    <td className="py-3 px-3 text-right space-x-2">
                      <button
                        onClick={() => {
                          setSelectedStudent(student);
                          setGrantModalOpen(true);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold hover:bg-emerald-500/30 text-[11px]"
                      >
                        🎁 Grant Free VIP
                      </button>

                      <button
                        onClick={() => {
                          setSelectedStudent(student);
                          setCustomPriceVal(student.customPriceOverride || "");
                          setDiscountNoteVal(student.specialDiscountRate || "");
                          setCustomPriceModalOpen(true);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-purple-600/20 text-purple-400 font-bold hover:bg-purple-600/30 text-[11px]"
                      >
                        🏷️ Custom Price
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ─── ADD / EDIT PRICING PLAN MODAL ─── */}
        {planModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className={`max-w-md w-full p-6 rounded-2xl border ${card} space-y-4 shadow-2xl`}>
              <h3 className="text-lg font-bold">{editingPlan ? "Edit Pricing Package" : "Create New Pricing Package"}</h3>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold mb-1">Package Title</label>
                  <input
                    type="text"
                    value={planForm.title}
                    onChange={(e) => setPlanForm({ ...planForm, title: e.target.value })}
                    placeholder="e.g. Simulator Only Pass"
                    className={inp}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1">Price ($)</label>
                  <input
                    type="number"
                    value={planForm.price}
                    onChange={(e) => setPlanForm({ ...planForm, price: Number(e.target.value) })}
                    className={inp}
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold mb-1">Billing Interval</label>
                    <select
                      value={planForm.interval}
                      onChange={(e) => setPlanForm({ ...planForm, interval: e.target.value as any })}
                      className="w-full rounded-xl p-2.5 text-xs font-bold border dark:bg-[#070B17] dark:border-white/10 text-white outline-none"
                    >
                      <option value="monthly">Monthly</option>
                      <option value="annual">Annual</option>
                      <option value="one_time">One-Time Flat</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold mb-1">Access Scope</label>
                    <select
                      value={planForm.accessScope}
                      onChange={(e) => setPlanForm({ ...planForm, accessScope: e.target.value as any })}
                      className="w-full rounded-xl p-2.5 text-xs font-bold border dark:bg-[#070B17] dark:border-white/10 text-white outline-none"
                    >
                      <option value="all_access">All-Access</option>
                      <option value="simulator_only">Simulator Only</option>
                      <option value="delf_only">DELF/DALF Only</option>
                      <option value="lessons_only">Lessons Only</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1">Badge Text (Optional)</label>
                  <input
                    type="text"
                    value={planForm.badge || ""}
                    onChange={(e) => setPlanForm({ ...planForm, badge: e.target.value })}
                    placeholder="e.g. Best Value or Most Popular"
                    className={inp}
                  />
                </div>

                <button
                  onClick={handleSavePlanForm}
                  className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs shadow-lg"
                >
                  Save Package
                </button>
              </div>

              <button onClick={() => setPlanModalOpen(false)} className="w-full text-center text-xs text-gray-500 hover:underline pt-2">
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* ─── GRANT FREE VIP MODAL ─── */}
        {grantModalOpen && selectedStudent && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className={`max-w-md w-full p-6 rounded-2xl border ${card} space-y-4 shadow-2xl`}>
              <h3 className="text-lg font-bold">Grant 100% Free VIP Access</h3>
              <p className="text-xs text-gray-400">
                Grant free premium access to <strong>{selectedStudent.firstName} {selectedStudent.lastName}</strong> ({selectedStudent.email}).
              </p>

              <div className="space-y-3 pt-2">
                <button
                  disabled={actionLoading}
                  onClick={() => handleGrantFreeVIP(selectedStudent._id, true)}
                  className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs shadow-lg"
                >
                  {actionLoading ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : "🎁 Enable 100% Free VIP Access"}
                </button>

                <button
                  disabled={actionLoading}
                  onClick={() => handleGrantFreeVIP(selectedStudent._id, false)}
                  className="w-full py-2.5 rounded-xl border border-white/10 text-gray-400 text-xs font-bold hover:bg-white/5"
                >
                  Revoke VIP Access
                </button>
              </div>

              <button onClick={() => setGrantModalOpen(false)} className="w-full text-center text-xs text-gray-500 hover:underline pt-2">
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* ─── CUSTOM PRICE MODAL ─── */}
        {customPriceModalOpen && selectedStudent && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className={`max-w-md w-full p-6 rounded-2xl border ${card} space-y-4 shadow-2xl`}>
              <h3 className="text-lg font-bold">Set Custom Price for {selectedStudent.firstName}</h3>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold mb-1">Custom Rate ($)</label>
                  <input
                    type="number"
                    value={customPriceVal}
                    onChange={(e) => setCustomPriceVal(e.target.value === "" ? "" : Number(e.target.value))}
                    placeholder="e.g. 15"
                    className={inp}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1">Discount Note / Promo Reason</label>
                  <input
                    type="text"
                    value={discountNoteVal}
                    onChange={(e) => setDiscountNoteVal(e.target.value)}
                    placeholder="e.g. Student Ambassador Rate"
                    className={inp}
                  />
                </div>

                <button
                  disabled={actionLoading}
                  onClick={() => handleApplyCustomPrice(selectedStudent._id)}
                  className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs shadow-lg"
                >
                  {actionLoading ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : "Save Custom Rate"}
                </button>
              </div>

              <button onClick={() => setCustomPriceModalOpen(false)} className="w-full text-center text-xs text-gray-500 hover:underline pt-2">
                Cancel
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
