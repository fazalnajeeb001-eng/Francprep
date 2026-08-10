import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useAuth } from "~/lib/AuthContext";
import { useTheme } from "~/lib/ThemeContext";
import { apiFetch } from "~/lib/apiFetch";
import { createCheckout, createPortal, getSubscription, type Subscription } from "~/lib/paymentsApi";
import { Moon, Sun, Shield, Key, CreditCard, Check, AlertTriangle, RefreshCw, ChevronDown, ChevronUp, Target, User, LogOut, Zap, Crown, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { GOAL_OPTIONS, getGoalOptionsForLanguage, type LearningGoal, setGoal as saveGoalToStorage, getGoal, getDailyStudyGoal, setDailyStudyGoal } from "~/components/dashboard/utils/userPrefs";
import { getActiveLanguageCode } from "~/lib/trackBranding";
import { SmartAvatar } from "~/components/dashboard/widgets/SmartAvatar";

export const Route = createFileRoute("/dashboard/settings")({ component: SettingsPage });

interface DynamicPlan {
  id: string;
  title: string;
  description: string;
  price: number;
  interval: 'monthly' | 'annual' | 'one_time';
  badge?: string;
  features: string[];
  accessScope: string;
  isPopular?: boolean;
}

function SettingsPage() {
  const { user, updateUser, logout } = useAuth();
  const { dark, toggle: toggleTheme } = useTheme();
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileSaving, setProfileSaving] = useState(false);
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [profileMsg, setProfileMsg] = useState("");
  const [passwordMsg, setPasswordMsg] = useState("");
  const [profileError, setProfileError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordOpen, setPasswordOpen] = useState(false);

  const [currentGoal, setCurrentGoal] = useState<string>("none");
  const [goalSaving, setGoalSaving] = useState(false);
  const [goalMsg, setGoalMsg] = useState("");

  const [avatarFeatures, setAvatarFeatures] = useState<any>(null);
  const [avatarSaving, setAvatarSaving] = useState(false);

  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [dynamicPlans, setDynamicPlans] = useState<DynamicPlan[]>([]);

  const [settingsTab, setSettingsTab] = useState<"language" | "profile" | "billing" | "security">("language");
  const [availableLanguages, setAvailableLanguages] = useState<any[]>([
    { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', examName: 'DELF / TCF' },
    { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', examName: 'Goethe / TestDaF' },
    { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', examName: 'DELE / SIELE' }
  ]);
  const [activeLang, setActiveLang] = useState<string>(() => getActiveLanguageCode(user));
  const [langSaving, setLangSaving] = useState(false);
  const [langMsg, setLangMsg] = useState("");

  useEffect(() => { 
    setFirstName(user?.firstName || ""); 
    setLastName(user?.lastName || ""); 
    setActiveLang(getActiveLanguageCode(user)); 
  }, [user]);

  useEffect(() => {
    const syncLang = () => setActiveLang(getActiveLanguageCode(user));
    window.addEventListener("active-language-changed", syncLang);
    return () => window.removeEventListener("active-language-changed", syncLang);
  }, [user]);

  useEffect(() => {
    apiFetch("/languages")
      .then(r => r.json())
      .then(res => {
        if (res.data && Array.isArray(res.data) && res.data.length > 0) {
          setAvailableLanguages(res.data);
          // If candidate's current activeLang is an unpublished track (disabled in Admin), auto-fallback to first active published track
          const publishedCodes = res.data.map((l: any) => (l.code || '').toLowerCase().trim());
          const currentCode = (activeLang || 'fr').toLowerCase().trim();
          if (!publishedCodes.includes(currentCode)) {
            const fallbackCode = res.data[0].code || 'fr';
            handleSwitchLanguage(fallbackCode);
          }
        }
      })
      .catch(() => {});
  }, [activeLang]);

  const handleSwitchLanguage = async (code: string) => {
    setLangSaving(true);
    setLangMsg("");
    try {
      const res = await apiFetch("/auth/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ activeLanguage: code }),
      });
      const json = await res.json();
      if (json.success) {
        setActiveLang(code);
        if (typeof window !== "undefined") {
          localStorage.setItem("fp_active_language", code);
          window.dispatchEvent(new Event("active-language-changed"));
        }
        if (json.data) updateUser(json.data);
        setLangMsg("Target language updated!");
        setTimeout(() => setLangMsg(""), 2500);
      }
    } catch (err) {}
    setLangSaving(false);
  };

  useEffect(() => {
    getSubscription().then(setSubscription).catch(() => {});
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const res = await apiFetch("/subscriptions/plans");
        const json = await res.json();
        if (json.success && json.data?.plans) {
          setDynamicPlans(json.data.plans);
        }
      } catch {}
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const res = await apiFetch("/user/profile");
        const json = await res.json();
        if (json.success) {
          setCurrentGoal(json.data.learningGoal || "none");
          if (json.data.learningGoal && json.data.learningGoal !== "none") {
            const existing = getGoal();
            if (!existing || existing.goal !== json.data.learningGoal) {
              saveGoalToStorage(json.data.learningGoal as LearningGoal);
            }
          }
          if (json.data.avatarFeatures) {
            setAvatarFeatures(json.data.avatarFeatures);
            localStorage.setItem("fp_avatar_features", JSON.stringify(json.data.avatarFeatures));
            window.dispatchEvent(new Event("avatar-changed"));
          }
        }
      } catch {}
    })();
  }, []);

  const saveProfile = async () => {
    setProfileSaving(true); setProfileMsg(""); setProfileError("");
    try {
      const res = await apiFetch("/auth/profile", {
        method: "PUT", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName }),
      });
      const json = await res.json();
      if (json.success) {
        setProfileMsg("Profile updated successfully");
        if (json.data) updateUser(json.data);
      } else setProfileError(json.error || "Failed to update profile");
    } catch (e: any) { setProfileError(e.message || "Network error"); }
    finally { setProfileSaving(false); }
  };

  const changePassword = async () => {
    if (newPassword !== confirmPassword) { setPasswordError("Passwords do not match"); return; }
    if (newPassword.length < 8) { setPasswordError("New password must be at least 8 characters"); return; }
    setPasswordSaving(true); setPasswordMsg(""); setPasswordError("");
    try {
      const res = await apiFetch("/auth/password", {
        method: "PUT", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const json = await res.json();
      if (json.success) { setPasswordMsg("Password changed successfully"); setCurrentPassword(""); setNewPassword(""); setConfirmPassword(""); }
      else setPasswordError(json.error || "Failed to change password");
    } catch (e: any) { setPasswordError(e.message || "Network error"); }
    finally { setPasswordSaving(false); }
  };

  const saveGoal = async (goal: LearningGoal) => {
    setGoalSaving(true); setGoalMsg("");
    try {
      await apiFetch("/user/profile/goal", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ goal }) });
      saveGoalToStorage(goal);
      setCurrentGoal(goal);
      setGoalMsg("Goal updated!");
      setTimeout(() => setGoalMsg(""), 2000);
    } catch {}
    setGoalSaving(false);
  };

  const selectAvatar = async (gender: "male" | "female") => {
    setAvatarSaving(true);
    try {
      const features = { gender, skinTone: "medium", hairStyle: gender === "male" ? "short" : "long", hairColor: "#2C1810", outfitStyle: "hoodie", outfitColor: "#6A1B9A", accessory: "none", faceShape: "oval", eyeSize: "medium" };
      await apiFetch("/user/profile/avatar", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ avatarFeatures: features }) });
      setAvatarFeatures(features);
      localStorage.setItem("fp_avatar_features", JSON.stringify(features));
      window.dispatchEvent(new Event("avatar-changed"));
    } catch {}
    setAvatarSaving(false);
  };

  const handleUpgrade = async (tier: "premium" | "exam_prep") => {
    setCheckoutLoading(true);
    try {
      const result = await createCheckout(tier);
      if (result.url) window.location.href = result.url;
    } catch (err: any) {
      alert(err.message || "Failed to start checkout");
    }
    setCheckoutLoading(false);
  };

  const handleManageSubscription = async () => {
    try {
      const result = await createPortal();
      if (result.url) window.location.href = result.url;
    } catch (err: any) {
      alert(err.message || "Failed to open billing portal");
    }
  };

  const b = dark ? "bg-[#070B17] text-white" : "bg-[#F8FAFC] text-slate-900";
  const txtSec = dark ? "text-gray-400" : "text-slate-600";
  const card = dark ? "bg-[#101828]/80 border-[#1e2a4a]" : "bg-white border-slate-200 shadow-sm shadow-slate-200/50";
  const inputBg = dark ? "bg-[#101828] border-[#1e2a4a]" : "bg-slate-50 border-slate-300 text-slate-900";
  return (
    <div className={`min-h-screen ${b} transition-colors duration-300`}>
      <div className="max-w-2xl mx-auto p-4 sm:p-6 space-y-6 pb-20">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between gap-4 mb-2">
          <div className="flex items-center gap-3">
            <Link to="/dashboard" className={`${txtSec} hover:text-purple-600 text-xs sm:text-sm font-semibold transition-colors`}>← Dashboard</Link>
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Student Settings</h1>
          </div>
        </motion.div>

        {user?.role === "admin" && (
          <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
            className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-purple-900/40 via-indigo-900/40 to-pink-900/40 border border-purple-500/30 shadow-xl space-y-3 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-amber-400 shrink-0" />
                <h3 className="text-xs sm:text-sm font-bold text-white">Administrator Access Detected</h3>
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 w-fit">Admin Role</span>
            </div>
            <p className="text-xs text-gray-300">
              You are viewing Student Preferences. As an Administrator, system configurations, API keys, AI voices, and content pipelines are managed in the Admin Studio.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
              <Link to="/admin/ai-config" className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/40 text-[11px] sm:text-xs font-semibold text-purple-200 transition-all text-center">
                <Zap className="w-3.5 h-3.5 text-pink-400 shrink-0" /> AI Voices & Keys
              </Link>
              <Link to="/admin/lessons" className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/40 text-[11px] sm:text-xs font-semibold text-purple-200 transition-all text-center">
                <Target className="w-3.5 h-3.5 text-purple-400 shrink-0" /> Syllabus Content
              </Link>
              <Link to="/admin/users" className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/40 text-[11px] sm:text-xs font-semibold text-purple-200 transition-all text-center">
                <User className="w-3.5 h-3.5 text-blue-400 shrink-0" /> User Roster
              </Link>
              <Link to="/admin/pipeline/drafts" className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/40 text-[11px] sm:text-xs font-semibold text-purple-200 transition-all text-center">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" /> Content Studio
              </Link>
            </div>
          </motion.div>
        )}

        {/* ─── SEGMENTED NAVIGATION TABS ─── */}
        <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-white/5 border border-white/10 overflow-x-auto scrollbar-none mb-6">
          {[
            { id: "language", label: "Target & Goals", icon: Target },
            { id: "profile", label: "Profile & Coach", icon: User },
            { id: "billing", label: "Plans & Billing", icon: CreditCard },
            { id: "security", label: "Security & Theme", icon: Shield },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = settingsTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSettingsTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-[11px] sm:text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  isSelected
                    ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30"
                    : dark ? "text-gray-400 hover:text-white hover:bg-white/5" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ─── TAB 1: TARGET LANGUAGE & GOALS ─── */}
        {settingsTab === "language" && (
          <div className="space-y-6">
            {/* Active Target Language Selector */}
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className={`${card} backdrop-blur-lg border rounded-2xl p-6 transition-colors`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-xl">🌐</span>
                  <div>
                    <h2 className={`text-base font-bold ${dark ? "text-white" : "text-slate-900"}`}>Active Target Language</h2>
                    <p className={`text-xs ${txtSec}`}>Switching updates your dashboard, curriculum, placement drills, and AI coach instantly.</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                {availableLanguages.map((lang) => {
                  const isSelected = activeLang.toLowerCase() === lang.code.toLowerCase();
                  return (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => handleSwitchLanguage(lang.code)}
                      disabled={langSaving}
                      className={`p-4 rounded-2xl border text-left transition-all relative flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? "bg-purple-500/20 border-purple-500 shadow-md shadow-purple-500/20 text-white font-bold"
                          : `${inputBg} hover:border-purple-500/40`
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{lang.flag || '🌐'}</span>
                        <div>
                          <p className={`text-xs font-bold ${dark ? "text-white" : "text-slate-900"}`}>{lang.name} ({lang.nativeName || lang.name})</p>
                          <p className="text-[10px] text-purple-400 font-medium">{lang.examName || 'CEFR Track'}</p>
                        </div>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-purple-400 font-bold" />}
                    </button>
                  );
                })}
              </div>
              {langMsg && <p className="text-xs text-emerald-400 flex items-center gap-1 mt-3 font-bold"><Check className="w-3.5 h-3.5" /> {langMsg}</p>}
            </motion.div>

            {/* Learning Goal */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`${card} backdrop-blur-lg border rounded-2xl p-6 transition-colors`}>
              <div className="flex items-center gap-3 mb-4"><Target className="w-5 h-5 text-purple-400" /><h2 className={`text-lg font-semibold ${dark ? "text-white" : "text-slate-900"}`}>Learning Goal & Exam Target</h2></div>
              <p className={`text-xs mb-4 ${txtSec}`}>Set your target exam or CEFR level. You can change this anytime.</p>
              <div className="grid grid-cols-2 gap-2">
                {getGoalOptionsForLanguage(activeLang).map((opt) => (
                  <button key={opt.value} onClick={() => saveGoal(opt.value)} disabled={goalSaving}
                    className={`flex items-center gap-2 p-3 rounded-xl text-left transition-all cursor-pointer ${
                      currentGoal === opt.value
                        ? "bg-purple-500/20 border-2 border-purple-500 text-purple-900 dark:text-white font-bold shadow-md"
                        : `${inputBg} border hover:border-purple-500/50 ${dark ? "text-gray-300" : "text-slate-800"}`
                    }`}>
                    <span className="text-lg">{opt.emoji}</span>
                    <span className="text-xs font-semibold">{opt.label}</span>
                    {currentGoal === opt.value && <Check className="w-3.5 h-3.5 text-purple-500 ml-auto" />}
                  </button>
                ))}
              </div>
              {goalMsg && <p className="text-xs text-emerald-400 flex items-center gap-1 mt-3"><Check className="w-3 h-3" /> {goalMsg}</p>}

              <div className="mt-6 pt-5 border-t border-gray-200 dark:border-white/10">
                <h3 className={`text-sm font-semibold mb-1 ${dark ? "text-white" : "text-gray-900"}`}>Daily Study Pace Goal</h3>
                <p className={`text-xs mb-3 ${txtSec}`}>Select how many minutes per day you commit to studying.</p>
                <div className="grid grid-cols-4 gap-2">
                  {[15, 30, 45, 60].map((mins) => (
                    <button
                      key={mins}
                      onClick={() => {
                        setDailyStudyGoal(mins);
                        setGoalMsg(`Daily goal set to ${mins} mins/day!`);
                        setTimeout(() => setGoalMsg(""), 2000);
                      }}
                      className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                        getDailyStudyGoal() === mins
                          ? "bg-purple-500/20 border-purple-500 text-purple-400"
                          : `${inputBg} hover:border-purple-500/40 ${dark ? "text-gray-300" : "text-gray-700"}`
                      }`}
                    >
                      {mins} mins
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* ─── TAB 2: PROFILE & AI COACH ─── */}
        {settingsTab === "profile" && (
          <div className="space-y-6">
            {/* Avatar */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`${card} backdrop-blur-lg border rounded-2xl p-6 transition-colors`}>
              <div className="flex items-center gap-3 mb-4"><User className="w-5 h-5 text-purple-400" /><h2 className={`text-lg font-semibold ${dark ? "text-white" : "text-gray-900"}`}>Choose Your AI Companion Coach</h2></div>
              <p className={`text-xs mb-5 ${txtSec}`}>Pick your companion character for the learning journey.</p>

              <div className="grid grid-cols-2 gap-4">
                {/* Leo */}
                <button onClick={() => selectAvatar("male")} disabled={avatarSaving}
                  className={`relative rounded-2xl border-2 p-4 transition-all flex flex-col items-center gap-3 cursor-pointer ${
                    avatarFeatures?.gender === "male"
                      ? "border-purple-500 bg-purple-500/10 shadow-lg shadow-purple-500/20"
                      : `${inputBg} border-transparent hover:border-purple-500/40`
                  }`}>
                  <div className={`w-full aspect-square rounded-xl overflow-hidden flex items-center justify-center py-2 ${dark ? "bg-[#070B17]" : "bg-gray-100"}`}>
                    <SmartAvatar gender="male" size={88} animate="idle" showThoughts={false} />
                  </div>
                  <div className="text-center">
                    <p className={`text-sm font-bold ${dark ? "text-white" : "text-gray-900"}`}>Coach Leo</p>
                    <p className={`text-[10px] ${txtSec}`}>3D Male AI Companion</p>
                  </div>
                  {avatarFeatures?.gender === "male" && (
                    <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 text-white" />
                    </div>
                  )}
                </button>

                {/* Chloe */}
                <button onClick={() => selectAvatar("female")} disabled={avatarSaving}
                  className={`relative rounded-2xl border-2 p-4 transition-all flex flex-col items-center gap-3 cursor-pointer ${
                    avatarFeatures?.gender === "female"
                      ? "border-purple-500 bg-purple-500/10 shadow-lg shadow-purple-500/20"
                      : `${inputBg} border-transparent hover:border-purple-500/40`
                  }`}>
                  <div className={`w-full aspect-square rounded-xl overflow-hidden flex items-center justify-center py-2 ${dark ? "bg-[#070B17]" : "bg-gray-100"}`}>
                    <SmartAvatar gender="female" size={88} animate="idle" showThoughts={false} />
                  </div>
                  <div className="text-center">
                    <p className={`text-sm font-bold ${dark ? "text-white" : "text-gray-900"}`}>Coach Chloe</p>
                    <p className={`text-[10px] ${txtSec}`}>3D Female AI Companion</p>
                  </div>
                  {avatarFeatures?.gender === "female" && (
                    <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 text-white" />
                    </div>
                  )}
                </button>
              </div>

              {avatarSaving && <p className="text-xs text-purple-400 text-center mt-3">Saving...</p>}
            </motion.div>

            {/* Profile Details */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`${card} backdrop-blur-lg border rounded-2xl p-6 transition-colors`}>
              <div className="flex items-center gap-3 mb-4"><Shield className="w-5 h-5 text-purple-400" /><h2 className={`text-lg font-semibold ${dark ? "text-white" : "text-gray-900"}`}>Student Profile Information</h2></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className={`text-xs ${txtSec} block mb-1`} htmlFor="fn">First Name</label><input id="fn" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className={`w-full ${inputBg} rounded-xl px-3 py-2.5 text-sm ${dark ? "text-white" : "text-gray-900"} focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors`} /></div>
                <div><label className={`text-xs ${txtSec} block mb-1`} htmlFor="ln">Last Name</label><input id="ln" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className={`w-full ${inputBg} rounded-xl px-3 py-2.5 text-sm ${dark ? "text-white" : "text-gray-900"} focus:outline-none focus:ring-2 focus:ring-purple-500`} /></div>
                <div className="md:col-span-2"><label className={`text-xs ${txtSec} block mb-1`} htmlFor="em">Email Address</label><input id="em" type="email" defaultValue={user?.email} readOnly className={`w-full ${inputBg} rounded-xl px-3 py-2.5 text-sm text-gray-400 cursor-not-allowed`} /><p className={`text-[10px] ${txtSec} mt-1`}>Registered account email</p></div>
              </div>
              {profileMsg && <p className="text-xs text-emerald-400 flex items-center gap-1 mt-2"><Check className="w-3 h-3" /> {profileMsg}</p>}
              {profileError && <p className="text-xs text-red-400 flex items-center gap-1 mt-2"><AlertTriangle className="w-3 h-3" /> {profileError}</p>}
              <button onClick={saveProfile} disabled={profileSaving}
                className="mt-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold px-6 py-2.5 rounded-xl hover:opacity-90 transition-all shadow-lg shadow-purple-500/25 disabled:opacity-50 flex items-center gap-2 cursor-pointer">
                {profileSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : null}
                {profileSaving ? "Saving..." : "Save Profile Details"}
              </button>
            </motion.div>
          </div>
        )}

        {/* ─── TAB 3: PLANS & BILLING ─── */}
        {settingsTab === "billing" && (
          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`${card} backdrop-blur-lg border rounded-2xl p-6 transition-colors`}>
              <div className="flex items-center gap-3 mb-4"><CreditCard className="w-5 h-5 text-purple-400" /><h2 className={`text-lg font-semibold ${dark ? "text-white" : "text-gray-900"}`}>Subscription & Billing</h2></div>

              {/* Current plan badge */}
              <div className="mb-4 p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-xs ${txtSec}`}>Current Active Plan</p>
                    <p className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent capitalize">{subscription?.tier || "Free"}</p>
                  </div>
                  {subscription?.tier !== "free" && (
                    <button onClick={handleManageSubscription}
                      className="text-xs text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1 cursor-pointer">
                      <RefreshCw className="w-3.5 h-3.5" /> Manage Portal
                    </button>
                  )}
                </div>
              </div>

              {/* Pricing cards */}
              <div className="space-y-3">
                {dynamicPlans.length > 0 ? (
                  dynamicPlans.map((plan) => (
                    <div key={plan.id} className={`p-4 rounded-xl border transition-all ${
                      subscription?.tier === plan.id ? "border-purple-500/50 bg-purple-500/5" : `${inputBg}`
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Zap className="w-4 h-4 text-purple-400" />
                          <span className={`text-sm font-semibold ${dark ? "text-white" : "text-gray-900"}`}>{plan.title}</span>
                          {plan.badge && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30">{plan.badge}</span>}
                        </div>
                        <span className={`text-sm font-bold ${dark ? "text-white" : "text-gray-900"}`}>${plan.price}<span className="text-[10px] font-normal text-gray-500">/{plan.interval === 'monthly' ? 'mo' : plan.interval === 'annual' ? 'yr' : 'one-time'}</span></span>
                      </div>
                      <p className="text-xs text-gray-400 mb-2">{plan.description}</p>
                      <ul className="space-y-1 mb-3">
                        {plan.features.map((f, i) => (
                          <li key={i} className="flex items-center gap-1.5 text-[10px] text-gray-400"><Check className="w-3 h-3 text-purple-400" /> {f}</li>
                        ))}
                      </ul>
                      {subscription?.tier === plan.id ? (
                        <p className="text-[10px] text-purple-400 font-semibold">Current plan</p>
                      ) : (
                        <button onClick={() => handleUpgrade(plan.id as any)} disabled={checkoutLoading}
                          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold py-2.5 rounded-xl hover:opacity-90 transition-all shadow-lg shadow-purple-500/25 disabled:opacity-50 cursor-pointer">
                          {checkoutLoading ? "Loading..." : `Subscribe to ${plan.title}`}
                        </button>
                      )}
                    </div>
                  ))
                ) : (
                  <>
                    {/* Free */}
                    <div className={`p-4 rounded-xl border transition-all ${
                      subscription?.tier === "free" ? "border-purple-500/50 bg-purple-500/5" : `${inputBg}`
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-gray-400" />
                          <span className={`text-sm font-semibold ${dark ? "text-white" : "text-gray-900"}`}>Free</span>
                        </div>
                        <span className={`text-sm font-bold ${dark ? "text-white" : "text-gray-900"}`}>$0</span>
                      </div>
                      <ul className="space-y-1">
                        {["4 lessons", "Basic flashcards", "Daily challenge"].map((f) => (
                          <li key={f} className="flex items-center gap-1.5 text-[10px] text-gray-400"><Check className="w-3 h-3 text-gray-500" /> {f}</li>
                        ))}
                      </ul>
                      {subscription?.tier === "free" && <p className="text-[10px] text-purple-400 mt-2 font-semibold">Current plan</p>}
                    </div>

                    {/* Premium */}
                    <div className={`p-4 rounded-xl border transition-all ${
                      subscription?.tier === "premium" ? "border-purple-500/50 bg-purple-500/5" : `${inputBg}`
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Zap className="w-4 h-4 text-purple-400" />
                          <span className={`text-sm font-semibold ${dark ? "text-white" : "text-gray-900"}`}>Premium</span>
                        </div>
                        <span className={`text-sm font-bold ${dark ? "text-white" : "text-gray-900"}`}>$14.99<span className="text-[10px] font-normal text-gray-500">/mo</span></span>
                      </div>
                      <ul className="space-y-1 mb-3">
                        {["All lessons", "Spaced repetition", "Speaking practice", "Writing feedback", "No ads"].map((f) => (
                          <li key={f} className="flex items-center gap-1.5 text-[10px] text-gray-400"><Check className="w-3 h-3 text-purple-400" /> {f}</li>
                        ))}
                      </ul>
                      {subscription?.tier === "premium" ? (
                        <p className="text-[10px] text-purple-400 font-semibold">Current plan</p>
                      ) : (
                        <button onClick={() => handleUpgrade("premium")} disabled={checkoutLoading}
                          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold py-2.5 rounded-xl hover:opacity-90 transition-all shadow-lg shadow-purple-500/25 disabled:opacity-50 cursor-pointer">
                          {checkoutLoading ? "Loading..." : "Upgrade to Premium"}
                        </button>
                      )}
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}

        {/* ─── TAB 4: SECURITY & THEME ─── */}
        {settingsTab === "security" && (
          <div className="space-y-6">
            {/* Password */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`${card} backdrop-blur-lg border rounded-2xl p-6 transition-colors`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3"><Key className="w-5 h-5 text-purple-400" /><h2 className={`text-lg font-semibold ${dark ? "text-white" : "text-gray-900"}`}>Change Password</h2></div>
              </div>
              <div className="space-y-3">
                <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder="Current Password" aria-label="Current Password" className={`w-full ${inputBg} rounded-xl px-3 py-2.5 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors ${dark ? "text-white" : "text-gray-900"}`} />
                <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="New Password (min 8 chars)" aria-label="New Password" className={`w-full ${inputBg} rounded-xl px-3 py-2.5 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors ${dark ? "text-white" : "text-gray-900"}`} />
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm New Password" aria-label="Confirm New Password" className={`w-full ${inputBg} rounded-xl px-3 py-2.5 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors ${dark ? "text-white" : "text-gray-900"}`} />
                {passwordMsg && <p className="text-xs text-emerald-400 flex items-center gap-1"><Check className="w-3 h-3" /> {passwordMsg}</p>}
                {passwordError && <p className="text-xs text-red-400 flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> {passwordError}</p>}
                <button onClick={changePassword} disabled={passwordSaving}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold px-6 py-2.5 rounded-xl hover:opacity-90 transition-all shadow-lg shadow-purple-500/25 disabled:opacity-50 flex items-center gap-2 cursor-pointer">
                  {passwordSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : null}
                  {passwordSaving ? "Updating..." : "Update Password"}
                </button>
              </div>
            </motion.div>

            {/* Theme */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`${card} backdrop-blur-lg border rounded-2xl p-6 transition-colors`}>
              <div className="flex items-center gap-3 mb-4">{dark ? <Moon className="w-5 h-5 text-purple-400" /> : <Sun className="w-5 h-5 text-amber-400" />}<h2 className={`text-lg font-semibold ${dark ? "text-white" : "text-gray-900"}`}>Appearance Theme</h2></div>
              <div className="flex gap-4">
                <button onClick={toggleTheme} className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${dark ? "bg-purple-500 text-white shadow-lg shadow-purple-500/25" : `${inputBg} ${dark ? "text-white" : "text-gray-900"}`}`} aria-label="Dark mode"><Moon className="w-4 h-4" /> Dark Mode</button>
                <button onClick={toggleTheme} className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${!dark ? "bg-purple-500 text-white shadow-lg shadow-purple-500/25" : `${inputBg} ${dark ? "text-white" : "text-gray-900"}`}`} aria-label="Light mode"><Sun className="w-4 h-4" /> Light Mode</button>
              </div>
            </motion.div>

            {/* Logout */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`${card} backdrop-blur-lg border rounded-2xl p-6 transition-colors`}>
              <button onClick={logout} className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${dark ? "bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20" : "bg-red-50 border border-red-200 text-red-600 hover:bg-red-100"}`}>
                <LogOut className="w-4 h-4" />
                Log Out
              </button>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
