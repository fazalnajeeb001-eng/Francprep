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
  Tag
} from "lucide-react";
import { useTheme } from "~/lib/ThemeContext";

export const Route = createFileRoute("/admin/subscriptions")({
  component: SubscriptionsPage,
});

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

export function SubscriptionsPage() {
  const { dark } = useTheme();
  const [loading, setLoading] = useState(true);
  const [savingPrice, setSavingPrice] = useState(false);
  const [priceMsg, setPriceMsg] = useState("");

  // Pricing & Trial Settings State
  const [pricingSettings, setPricingSettings] = useState({
    monthlyPrice: 29,
    annualPrice: 199,
    lifetimePrice: 299,
    freePreviewScope: "first_chapter_a1",
    paywallEnforced: true,
  });

  // Students List & Search State
  const [students, setStudents] = useState<Student[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Modal States for Custom Grants
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

  const handleSavePricing = async () => {
    setSavingPrice(true);
    setPriceMsg("");
    try {
      const res = await apiFetch("/admin/subscriptions/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pricingSettings),
      });
      const json = await res.json();
      if (json.success) setPriceMsg("Monetization & Pricing Settings Saved!");
      else setPriceMsg(json.error || "Failed to save");
    } catch {
      setPriceMsg("Network error");
    }
    setSavingPrice(false);
  };

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

  const filteredStudents = useMemo(() => {
    if (!searchQuery.trim()) return students;
    const q = searchQuery.toLowerCase();
    return students.filter(
      (s) =>
        s.firstName?.toLowerCase().includes(q) ||
        s.lastName?.toLowerCase().includes(q) ||
        s.email?.toLowerCase().includes(q)
    );
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
              Subscriptions, Monetization & Student Pricing Hub
            </h1>
            <p className={`text-xs ${txtSec} mt-1`}>
              Manage subscription pricing tiers, configure free trial preview rules, and grant per-student custom prices or 100% free VIP access.
            </p>
          </div>
        </div>

        {/* ─── PRICING TIERS & PAYWALL CONTROL CARD ─── */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className={`p-6 rounded-2xl border ${card} space-y-6`}>
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-white/10 pb-3">
            <div>
              <h3 className="text-base font-extrabold flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-emerald-400" /> Subscription Pricing Tiers & Free Preview Engine
              </h3>
              <p className={`text-xs ${txtSec} mt-0.5`}>Set global pricing rates and decide what content new students receive for free.</p>
            </div>
            <button
              onClick={handleSavePricing}
              disabled={savingPrice}
              className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs shadow-lg shadow-emerald-500/20 flex items-center gap-1.5 transition-all"
            >
              {savingPrice ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save Pricing Rules
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl border dark:border-white/10 bg-white/5 space-y-2">
              <label className="block text-xs font-bold text-emerald-400">Monthly All-Access Rate ($)</label>
              <input
                type="number"
                value={pricingSettings.monthlyPrice}
                onChange={(e) => setPricingSettings({ ...pricingSettings, monthlyPrice: Number(e.target.value) })}
                className={inp}
              />
              <p className="text-[10px] text-gray-400">Standard monthly subscription billed to students.</p>
            </div>

            <div className="p-4 rounded-xl border dark:border-white/10 bg-white/5 space-y-2">
              <label className="block text-xs font-bold text-purple-400">Annual VIP Pass Rate ($)</label>
              <input
                type="number"
                value={pricingSettings.annualPrice}
                onChange={(e) => setPricingSettings({ ...pricingSettings, annualPrice: Number(e.target.value) })}
                className={inp}
              />
              <p className="text-[10px] text-gray-400">12-month annual pass rate (Recommended: $199/yr).</p>
            </div>

            <div className="p-4 rounded-xl border dark:border-white/10 bg-white/5 space-y-2">
              <label className="block text-xs font-bold text-amber-400">Lifetime Pass Rate ($)</label>
              <input
                type="number"
                value={pricingSettings.lifetimePrice}
                onChange={(e) => setPricingSettings({ ...pricingSettings, lifetimePrice: Number(e.target.value) })}
                className={inp}
              />
              <p className="text-[10px] text-gray-400">One-time lifetime access pass rate.</p>
            </div>
          </div>

          {/* FREE PREVIEW & PAYWALL CONFIG */}
          <div className="pt-3 border-t border-gray-200 dark:border-white/10 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold mb-1.5">Free Trial Preview Scope for New Students</label>
              <select
                value={pricingSettings.freePreviewScope}
                onChange={(e) => setPricingSettings({ ...pricingSettings, freePreviewScope: e.target.value as any })}
                className="w-full rounded-xl p-2.5 text-xs font-bold border dark:bg-[#070B17] dark:border-white/10 text-white outline-none"
              >
                <option value="first_chapter_a1">Chapter 1 of Module A1 Free (Recommended)</option>
                <option value="first_two_chapters_a1">First 2 Chapters of Module A1 Free</option>
                <option value="entire_module_a1">Entire Module A1 Free</option>
                <option value="custom">Custom Admin Selected Scope</option>
              </select>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-xl border dark:border-white/10 bg-white/5">
              <div>
                <span className="text-xs font-bold block">Enforce Platform Paywall</span>
                <span className="text-[10px] text-gray-400">Require subscription payment after free trial scope.</span>
              </div>
              <button
                type="button"
                onClick={() => setPricingSettings({ ...pricingSettings, paywallEnforced: !pricingSettings.paywallEnforced })}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                  pricingSettings.paywallEnforced ? "bg-emerald-500 text-black" : "bg-gray-600 text-white"
                }`}
              >
                {pricingSettings.paywallEnforced ? "🔒 Paywall Active" : "🔓 Free Mode"}
              </button>
            </div>
          </div>

          {priceMsg && <p className="text-xs text-emerald-400 font-bold text-right">{priceMsg}</p>}
        </motion.div>

        {/* ─── STUDENT SEARCH & PER-STUDENT CUSTOM PRICING CARD ─── */}
        <div className={`p-6 rounded-2xl border ${card} space-y-5`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-200 dark:border-white/10 pb-3">
            <div>
              <h3 className="text-base font-extrabold flex items-center gap-2">
                <Search className="w-5 h-5 text-purple-400" /> Student Search & Per-Student Custom Pricing
              </h3>
              <p className={`text-xs ${txtSec} mt-0.5`}>Search any student by name or Gmail address to grant free VIP access or custom prices.</p>
            </div>
          </div>

          {/* SEARCH INPUT */}
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search student by name or Gmail address..."
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
                        className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold hover:bg-emerald-500/30 transition-all text-[11px]"
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
                        className="px-3 py-1.5 rounded-lg bg-purple-600/20 text-purple-400 font-bold hover:bg-purple-600/30 transition-all text-[11px]"
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
