import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useAuth } from "~/lib/AuthContext";
import { useTheme } from "~/lib/ThemeContext";
import { apiFetch } from "~/lib/apiFetch";
import { createCheckout, createPortal, getSubscription, type Subscription } from "~/lib/paymentsApi";
import { Moon, Sun, Shield, Key, CreditCard, Check, AlertTriangle, RefreshCw, ChevronDown, ChevronUp, Target, User, LogOut, Zap, Crown, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { GOAL_OPTIONS, type LearningGoal, setGoal as saveGoalToStorage, getGoal } from "~/components/dashboard/utils/userPrefs";

export const Route = createFileRoute("/dashboard/settings")({ component: SettingsPage });

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

  useEffect(() => { setFirstName(user?.firstName || ""); setLastName(user?.lastName || ""); }, [user]);

  useEffect(() => {
    getSubscription().then(setSubscription).catch(() => {});
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

  const b = dark ? "bg-[#070B17] text-white" : "bg-gray-50 text-gray-900";
  const txtSec = dark ? "text-gray-400" : "text-gray-500";
  const card = dark ? "bg-[#101828]/80 border-[#1e2a4a]" : "bg-white/80 border-gray-200";
  const inputBg = dark ? "bg-[#101828] border-[#1e2a4a]" : "bg-white border-gray-200";
  return (
    <div className={`min-h-screen ${b} transition-colors duration-300`}>
      <div className="max-w-2xl mx-auto p-6 space-y-6 pb-20">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-4 mb-6">
          <Link to="/dashboard" className={`${txtSec} hover:text-purple-400 text-sm transition-colors`}>← Dashboard</Link>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Settings</h1>
        </motion.div>

        {/* Learning Goal */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`${card} backdrop-blur-lg border rounded-2xl p-6 transition-colors`}>
          <div className="flex items-center gap-3 mb-4"><Target className="w-5 h-5 text-purple-400" /><h2 className={`text-lg font-semibold ${dark ? "text-white" : "text-gray-900"}`}>Learning Goal</h2></div>
          <p className={`text-xs mb-4 ${txtSec}`}>Set a target to stay motivated. This appears on your learning journey.</p>
          <div className="grid grid-cols-2 gap-2">
            {GOAL_OPTIONS.map((opt) => (
              <button key={opt.value} onClick={() => saveGoal(opt.value)} disabled={goalSaving}
                className={`flex items-center gap-2 p-3 rounded-xl text-left transition-all ${
                  currentGoal === opt.value
                    ? "bg-purple-500/20 border-2 border-purple-500 text-white"
                    : `${inputBg} border hover:border-purple-500/50 ${dark ? "text-gray-300" : "text-gray-700"}`
                }`}>
                <span className="text-lg">{opt.emoji}</span>
                <span className="text-xs font-semibold">{opt.label}</span>
                {currentGoal === opt.value && <Check className="w-3.5 h-3.5 text-purple-400 ml-auto" />}
              </button>
            ))}
          </div>
          {goalMsg && <p className="text-xs text-emerald-400 flex items-center gap-1 mt-3"><Check className="w-3 h-3" /> {goalMsg}</p>}
        </motion.div>

        {/* Avatar */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className={`${card} backdrop-blur-lg border rounded-2xl p-6 transition-colors`}>
          <div className="flex items-center gap-3 mb-4"><User className="w-5 h-5 text-purple-400" /><h2 className={`text-lg font-semibold ${dark ? "text-white" : "text-gray-900"}`}>Choose Your Avatar</h2></div>
          <p className={`text-xs mb-5 ${txtSec}`}>Pick your character for the learning journey. You can change this anytime.</p>

          <div className="grid grid-cols-2 gap-4">
            {/* Leo */}
            <button onClick={() => selectAvatar("male")} disabled={avatarSaving}
              className={`relative rounded-2xl border-2 p-4 transition-all flex flex-col items-center gap-3 ${
                avatarFeatures?.gender === "male"
                  ? "border-purple-500 bg-purple-500/10 shadow-lg shadow-purple-500/20"
                  : `${inputBg} border-transparent hover:border-purple-500/40`
              }`}>
              <div className={`w-full aspect-square rounded-xl overflow-hidden flex items-end justify-center ${dark ? "bg-[#070B17]" : "bg-gray-100"}`}>
                <img src="/models/leo-avatar.png" alt="Leo" className="w-full h-full object-contain" />
              </div>
              <div className="text-center">
                <p className={`text-sm font-bold ${dark ? "text-white" : "text-gray-900"}`}>Leo</p>
                <p className={`text-[10px] ${txtSec}`}>Explorer</p>
              </div>
              {avatarFeatures?.gender === "male" && (
                <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 text-white" />
                </div>
              )}
            </button>

            {/* Chloe */}
            <button onClick={() => selectAvatar("female")} disabled={avatarSaving}
              className={`relative rounded-2xl border-2 p-4 transition-all flex flex-col items-center gap-3 ${
                avatarFeatures?.gender === "female"
                  ? "border-purple-500 bg-purple-500/10 shadow-lg shadow-purple-500/20"
                  : `${inputBg} border-transparent hover:border-purple-500/40`
              }`}>
              <div className={`w-full aspect-square rounded-xl overflow-hidden flex items-end justify-center ${dark ? "bg-[#070B17]" : "bg-gray-100"}`}>
                <img src="/models/chloe-avatar.png" alt="Chloe" className="w-full h-full object-contain" />
              </div>
              <div className="text-center">
                <p className={`text-sm font-bold ${dark ? "text-white" : "text-gray-900"}`}>Chloe</p>
                <p className={`text-[10px] ${txtSec}`}>Adventurer</p>
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

        {/* Profile */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className={`${card} backdrop-blur-lg border rounded-2xl p-6 transition-colors`}>
          <div className="flex items-center gap-3 mb-4"><Shield className="w-5 h-5 text-purple-400" /><h2 className={`text-lg font-semibold ${dark ? "text-white" : "text-gray-900"}`}>Profile</h2></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className={`text-xs ${txtSec} block mb-1`} htmlFor="fn">First Name</label><input id="fn" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className={`w-full ${inputBg} rounded-xl px-3 py-2.5 text-sm ${dark ? "text-white" : "text-gray-900"} focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors`} /></div>
            <div><label className={`text-xs ${txtSec} block mb-1`} htmlFor="ln">Last Name</label><input id="ln" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className={`w-full ${inputBg} rounded-xl px-3 py-2.5 text-sm ${dark ? "text-white" : "text-gray-900"} focus:outline-none focus:ring-2 focus:ring-purple-500`} /></div>
            <div className="md:col-span-2"><label className={`text-xs ${txtSec} block mb-1`} htmlFor="em">Email</label><input id="em" type="email" defaultValue={user?.email} readOnly className={`w-full ${inputBg} rounded-xl px-3 py-2.5 text-sm text-gray-400 cursor-not-allowed`} /><p className={`text-[10px] ${txtSec} mt-1`}>Email cannot be changed</p></div>
          </div>
          {profileMsg && <p className="text-xs text-emerald-400 flex items-center gap-1 mt-2"><Check className="w-3 h-3" /> {profileMsg}</p>}
          {profileError && <p className="text-xs text-red-400 flex items-center gap-1 mt-2"><AlertTriangle className="w-3 h-3" /> {profileError}</p>}
          <button onClick={saveProfile} disabled={profileSaving}
            className="mt-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold px-6 py-2.5 rounded-xl hover:opacity-90 transition-all shadow-lg shadow-purple-500/25 disabled:opacity-50 flex items-center gap-2">
            {profileSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : null}
            {profileSaving ? "Saving..." : "Save Changes"}
          </button>
        </motion.div>

        {/* Password (collapsible) */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className={`${card} backdrop-blur-lg border rounded-2xl p-6 transition-colors`}>
          <button onClick={() => setPasswordOpen(!passwordOpen)} className="w-full flex items-center justify-between">
            <div className="flex items-center gap-3"><Key className="w-5 h-5 text-purple-400" /><h2 className={`text-lg font-semibold ${dark ? "text-white" : "text-gray-900"}`}>Password</h2></div>
            {passwordOpen ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
          </button>
          {passwordOpen && (
            <div className="mt-4 space-y-3">
              <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder="Current Password" aria-label="Current Password" className={`w-full ${inputBg} rounded-xl px-3 py-2.5 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors ${dark ? "text-white" : "text-gray-900"}`} />
              <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="New Password (min 8 chars)" aria-label="New Password" className={`w-full ${inputBg} rounded-xl px-3 py-2.5 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors ${dark ? "text-white" : "text-gray-900"}`} />
              <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm New Password" aria-label="Confirm New Password" className={`w-full ${inputBg} rounded-xl px-3 py-2.5 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors ${dark ? "text-white" : "text-gray-900"}`} />
              {passwordMsg && <p className="text-xs text-emerald-400 flex items-center gap-1"><Check className="w-3 h-3" /> {passwordMsg}</p>}
              {passwordError && <p className="text-xs text-red-400 flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> {passwordError}</p>}
              <button onClick={changePassword} disabled={passwordSaving}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold px-6 py-2.5 rounded-xl hover:opacity-90 transition-all shadow-lg shadow-purple-500/25 disabled:opacity-50 flex items-center gap-2">
                {passwordSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : null}
                {passwordSaving ? "Updating..." : "Update Password"}
              </button>
            </div>
          )}
        </motion.div>

        {/* Theme */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className={`${card} backdrop-blur-lg border rounded-2xl p-6 transition-colors`}>
          <div className="flex items-center gap-3 mb-4">{dark ? <Moon className="w-5 h-5 text-purple-400" /> : <Sun className="w-5 h-5 text-amber-400" />}<h2 className={`text-lg font-semibold ${dark ? "text-white" : "text-gray-900"}`}>Theme</h2></div>
          <div className="flex gap-4">
            <button onClick={toggleTheme} className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${dark ? "bg-purple-500 text-white shadow-lg shadow-purple-500/25" : `${inputBg} ${dark ? "text-white" : "text-gray-900"}`}`} aria-label="Dark mode"><Moon className="w-4 h-4" /> Dark</button>
            <button onClick={toggleTheme} className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${!dark ? "bg-purple-500 text-white shadow-lg shadow-purple-500/25" : `${inputBg} ${dark ? "text-white" : "text-gray-900"}`}`} aria-label="Light mode"><Sun className="w-4 h-4" /> Light</button>
          </div>
        </motion.div>

        {/* Subscription */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className={`${card} backdrop-blur-lg border rounded-2xl p-6 transition-colors`}>
          <div className="flex items-center gap-3 mb-4"><CreditCard className="w-5 h-5 text-purple-400" /><h2 className={`text-lg font-semibold ${dark ? "text-white" : "text-gray-900"}`}>Subscription</h2></div>

          {/* Current plan badge */}
          <div className="mb-4 p-3 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-xs ${txtSec}`}>Current Plan</p>
                <p className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent capitalize">{subscription?.tier || "Free"}</p>
              </div>
              {subscription?.tier !== "free" && (
                <button onClick={handleManageSubscription}
                  className="text-xs text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1">
                  <RefreshCw className="w-3 h-3" /> Manage
                </button>
              )}
            </div>
          </div>

          {/* Pricing cards */}
          <div className="space-y-3">
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
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold py-2.5 rounded-xl hover:opacity-90 transition-all shadow-lg shadow-purple-500/25 disabled:opacity-50">
                  {checkoutLoading ? "Loading..." : "Upgrade to Premium"}
                </button>
              )}
            </div>

            {/* Exam Prep */}
            <div className={`p-4 rounded-xl border transition-all ${
              subscription?.tier === "exam_prep" ? "border-purple-500/50 bg-purple-500/5" : `${inputBg}`
            }`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Crown className="w-4 h-4 text-amber-400" />
                  <span className={`text-sm font-semibold ${dark ? "text-white" : "text-gray-900"}`}>Exam Prep</span>
                </div>
                <span className={`text-sm font-bold ${dark ? "text-white" : "text-gray-900"}`}>$24.99<span className="text-[10px] font-normal text-gray-500">/mo</span></span>
              </div>
              <ul className="space-y-1 mb-3">
                {["Everything in Premium", "Mock exams", "TCF/TEF practice", "Priority support", "Study plan"].map((f) => (
                  <li key={f} className="flex items-center gap-1.5 text-[10px] text-gray-400"><Check className="w-3 h-3 text-amber-400" /> {f}</li>
                ))}
              </ul>
              {subscription?.tier === "exam_prep" ? (
                <p className="text-[10px] text-purple-400 font-semibold">Current plan</p>
              ) : (
                <button onClick={() => handleUpgrade("exam_prep")} disabled={checkoutLoading}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-semibold py-2.5 rounded-xl hover:opacity-90 transition-all shadow-lg shadow-amber-500/25 disabled:opacity-50">
                  {checkoutLoading ? "Loading..." : "Upgrade to Exam Prep"}
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Logout */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className={`${card} backdrop-blur-lg border rounded-2xl p-6 transition-colors`}>
          <button onClick={logout} className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all ${dark ? "bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20" : "bg-red-50 border border-red-200 text-red-600 hover:bg-red-100"}`}>
            <LogOut className="w-4 h-4" />
            Log Out
          </button>
        </motion.div>
      </div>
    </div>
  );
}
