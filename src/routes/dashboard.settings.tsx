import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useAuth } from "~/lib/AuthContext";
import { Moon, Sun, Shield, Bell, Key, CreditCard } from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/dashboard/settings")({ component: SettingsPage });

function SettingsPage() {
  const { user } = useAuth();
  const [dark, setDark] = useState(true);
  const [notif, setNotif] = useState({ email: true, push: true, weekly: false, achievement: true });

  useEffect(() => {
    const stored = localStorage.getItem("fp_theme");
    if (stored === "light") setDark(false);
  }, []);

  const toggleTheme = () => {
    const nd = !dark;
    setDark(nd);
    localStorage.setItem("fp_theme", nd ? "dark" : "light");
    document.documentElement.classList.toggle("dark", nd);
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

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`${card} backdrop-blur-lg border rounded-2xl p-6 transition-colors`}>
          <div className="flex items-center gap-3 mb-4"><Shield className="w-5 h-5 text-purple-400" /><h2 className={`text-lg font-semibold ${dark ? "text-white" : "text-gray-900"}`}>Profile</h2></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={`text-xs ${txtSec} block mb-1`} htmlFor="fn">First Name</label>
              <input id="fn" type="text" defaultValue={user?.firstName} className={`w-full ${inputBg} rounded-xl px-3 py-2.5 text-sm ${dark ? "text-white" : "text-gray-900"} focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors`} />
            </div>
            <div>
              <label className={`text-xs ${txtSec} block mb-1`} htmlFor="ln">Last Name</label>
              <input id="ln" type="text" defaultValue={user?.lastName} className={`w-full ${inputBg} rounded-xl px-3 py-2.5 text-sm ${dark ? "text-white" : "text-gray-900"} focus:outline-none focus:ring-2 focus:ring-purple-500`} />
            </div>
            <div className="md:col-span-2">
              <label className={`text-xs ${txtSec} block mb-1`} htmlFor="em">Email</label>
              <input id="em" type="email" defaultValue={user?.email} readOnly className={`w-full ${inputBg} rounded-xl px-3 py-2.5 text-sm text-gray-400 cursor-not-allowed`} />
              <p className={`text-[10px] ${txtSec} mt-1`}>Email cannot be changed</p>
            </div>
          </div>
          <button className="mt-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold px-6 py-2.5 rounded-xl hover:opacity-90 transition-all shadow-lg shadow-purple-500/25">Save Changes</button>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className={`${card} backdrop-blur-lg border rounded-2xl p-6 transition-colors`}>
          <div className="flex items-center gap-3 mb-4"><Key className="w-5 h-5 text-purple-400" /><h2 className={`text-lg font-semibold ${dark ? "text-white" : "text-gray-900"}`}>Password</h2></div>
          <div className="space-y-3">
            {["Current Password", "New Password", "Confirm New Password"].map((p) => (
              <input key={p} type="password" placeholder={p} aria-label={p}
                className={`w-full ${inputBg} rounded-xl px-3 py-2.5 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors ${dark ? "text-white" : "text-gray-900"}`} />
            ))}
          </div>
          <button className="mt-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold px-6 py-2.5 rounded-xl hover:opacity-90 shadow-lg shadow-purple-500/25">Update Password</button>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className={`${card} backdrop-blur-lg border rounded-2xl p-6 transition-colors`}>
          <div className="flex items-center gap-3 mb-4"><Bell className="w-5 h-5 text-purple-400" /><h2 className={`text-lg font-semibold ${dark ? "text-white" : "text-gray-900"}`}>Notifications</h2></div>
          <div className="space-y-3">
            {Object.entries(notif).map(([key, val]) => (
              <div key={key} className="flex items-center justify-between">
                <span className={`text-sm ${dark ? "text-gray-300" : "text-gray-700"} capitalize`}>{key.replace(/([A-Z])/g, ' $1')}</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={val} onChange={() => setNotif(n => ({ ...n, [key]: !(n as any)[key] }))} className="sr-only peer" aria-label={`Toggle ${key}`} />
                  <div className={`w-10 h-5 rounded-full peer peer-checked:bg-purple-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full ${dark ? "bg-[#1e2a4a]" : "bg-gray-300"}`} />
                </label>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className={`${card} backdrop-blur-lg border rounded-2xl p-6 transition-colors`}>
          <div className="flex items-center gap-3 mb-4">
            {dark ? <Moon className="w-5 h-5 text-purple-400" /> : <Sun className="w-5 h-5 text-amber-400" />}
            <h2 className={`text-lg font-semibold ${dark ? "text-white" : "text-gray-900"}`}>Theme</h2>
          </div>
          <div className="flex gap-4">
            <button onClick={toggleTheme}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                dark ? "bg-purple-500 text-white shadow-lg shadow-purple-500/25" : `${inputBg} ${dark ? "text-white" : "text-gray-900"}`
              }`} aria-label="Dark mode">
              <Moon className="w-4 h-4" /> Dark
            </button>
            <button onClick={toggleTheme}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                !dark ? "bg-purple-500 text-white shadow-lg shadow-purple-500/25" : `${inputBg} ${dark ? "text-white" : "text-gray-900"}`
              }`} aria-label="Light mode">
              <Sun className="w-4 h-4" /> Light
            </button>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className={`${card} backdrop-blur-lg border rounded-2xl p-6 transition-colors`}>
          <div className="flex items-center gap-3 mb-4"><CreditCard className="w-5 h-5 text-purple-400" /><h2 className={`text-lg font-semibold ${dark ? "text-white" : "text-gray-900"}`}>Subscription</h2></div>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${txtSec}`}>Current Plan</p>
              <p className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent capitalize">{user?.subscriptionTier || "Free"}</p>
            </div>
            <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold px-6 py-2.5 rounded-xl hover:opacity-90 shadow-lg shadow-purple-500/25">Upgrade</button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
