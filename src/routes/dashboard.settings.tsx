import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useAuth } from "~/lib/AuthContext";
import { useTheme } from "~/lib/ThemeContext";
import { apiFetch } from "~/lib/apiFetch";
import { Moon, Sun, Shield, Key, CreditCard, Check, AlertTriangle, RefreshCw, ChevronDown, ChevronUp } from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/dashboard/settings")({ component: SettingsPage });

function SettingsPage() {
  const { user, updateUser } = useAuth();
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

  useEffect(() => { setFirstName(user?.firstName || ""); setLastName(user?.lastName || ""); }, [user]);

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
        {/* Profile */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`${card} backdrop-blur-lg border rounded-2xl p-6 transition-colors`}>
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
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className={`${card} backdrop-blur-lg border rounded-2xl p-6 transition-colors`}>
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
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className={`${card} backdrop-blur-lg border rounded-2xl p-6 transition-colors`}>
          <div className="flex items-center gap-3 mb-4">{dark ? <Moon className="w-5 h-5 text-purple-400" /> : <Sun className="w-5 h-5 text-amber-400" />}<h2 className={`text-lg font-semibold ${dark ? "text-white" : "text-gray-900"}`}>Theme</h2></div>
          <div className="flex gap-4">
            <button onClick={toggleTheme} className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${dark ? "bg-purple-500 text-white shadow-lg shadow-purple-500/25" : `${inputBg} ${dark ? "text-white" : "text-gray-900"}`}`} aria-label="Dark mode"><Moon className="w-4 h-4" /> Dark</button>
            <button onClick={toggleTheme} className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${!dark ? "bg-purple-500 text-white shadow-lg shadow-purple-500/25" : `${inputBg} ${dark ? "text-white" : "text-gray-900"}`}`} aria-label="Light mode"><Sun className="w-4 h-4" /> Light</button>
          </div>
        </motion.div>
        {/* Subscription */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className={`${card} backdrop-blur-lg border rounded-2xl p-6 transition-colors`}>
          <div className="flex items-center gap-3 mb-4"><CreditCard className="w-5 h-5 text-purple-400" /><h2 className={`text-lg font-semibold ${dark ? "text-white" : "text-gray-900"}`}>Subscription</h2></div>
          <div className="flex items-center justify-between">
            <div><p className={`text-sm ${txtSec}`}>Current Plan</p><p className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent capitalize">{user?.subscriptionTier || "Free"}</p></div>
            <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold px-6 py-2.5 rounded-xl hover:opacity-90 shadow-lg shadow-purple-500/25">Upgrade</button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
