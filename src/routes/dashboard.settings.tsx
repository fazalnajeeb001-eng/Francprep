import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useAuth } from "~/lib/AuthContext";
import { GlassCard } from "~/components/dashboard/ui/GlassCard";
import { Moon, Sun, Shield, Bell, Key, CreditCard } from "lucide-react";

export const Route = createFileRoute("/dashboard/settings")({ component: SettingsPage });

function SettingsPage() {
  const { user } = useAuth();
  const [dark, setDark] = useState(true);
  const [notif, setNotif] = useState({ email: true, push: true, weekly: false, achievements: true });

  useEffect(() => {
    const stored = localStorage.getItem("fp_theme");
    if (stored === "light") setDark(false);
  }, []);

  const toggleTheme = () => {
    const nd = !dark;
    setDark(nd);
    localStorage.setItem("fp_theme", nd ? "dark" : "light");
    document.documentElement.classList.toggle("dark", nd);
    (window as any).__dark = nd;
  };

  const b = dark ? "bg-[#070B17] text-white" : "bg-gray-50 text-gray-900";
  const txtSec = dark ? "text-gray-400" : "text-gray-500";
  const inputBg = dark ? "bg-[#101828] border-[#1e2a4a]" : "bg-white border-gray-200";

  return (
    <div className={`min-h-screen ${b} transition-colors duration-300`}>
      <div className="max-w-2xl mx-auto p-6 space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <Link to="/dashboard" className={`${txtSec} hover:text-purple-400 text-sm`}>← Dashboard</Link>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Settings</h1>
        </div>

        {/* Profile */}
        <GlassCard dark={dark}>
          <div className="flex items-center gap-3 mb-4"><Shield className="w-5 h-5 text-purple-400" /><h2 className={`text-lg font-semibold ${dark ? "text-white" : "text-gray-900"}`}>Profile</h2></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={`text-xs ${txtSec} block mb-1`}>First Name</label>
              <input type="text" defaultValue={user?.firstName} className={`w-full ${inputBg} rounded-xl px-3 py-2.5 text-sm ${dark ? "text-white" : "text-gray-900"} focus:outline-none focus:ring-2 focus:ring-purple-500`} />
            </div>
            <div>
              <label className={`text-xs ${txtSec} block mb-1`}>Last Name</label>
              <input type="text" defaultValue={user?.lastName} className={`w-full ${inputBg} rounded-xl px-3 py-2.5 text-sm ${dark ? "text-white" : "text-gray-900"} focus:outline-none focus:ring-2 focus:ring-purple-500`} />
            </div>
            <div className="md:col-span-2">
              <label className={`text-xs ${txtSec} block mb-1`}>Email</label>
              <input type="email" defaultValue={user?.email} readOnly className={`w-full ${inputBg} rounded-xl px-3 py-2.5 text-sm text-gray-400 cursor-not-allowed`} />
              <p className={`text-[10px] ${txtSec} mt-1`}>Email cannot be changed</p>
            </div>
          </div>
          <button className="mt-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold px-6 py-2.5 rounded-xl hover:opacity-90">Save Changes</button>
        </GlassCard>

        {/* Password */}
        <GlassCard dark={dark}>
          <div className="flex items-center gap-3 mb-4"><Key className="w-5 h-5 text-purple-400" /><h2 className={`text-lg font-semibold ${dark ? "text-white" : "text-gray-900"}`}>Password</h2></div>
          <div className="space-y-3">
            <input type="password" placeholder="Current Password" className={`w-full ${inputBg} rounded-xl px-3 py-2.5 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500`} />
            <input type="password" placeholder="New Password" className={`w-full ${inputBg} rounded-xl px-3 py-2.5 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500`} />
            <input type="password" placeholder="Confirm New Password" className={`w-full ${inputBg} rounded-xl px-3 py-2.5 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500`} />
          </div>
          <button className="mt-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold px-6 py-2.5 rounded-xl hover:opacity-90">Update Password</button>
        </GlassCard>

        {/* Notifications */}
        <GlassCard dark={dark}>
          <div className="flex items-center gap-3 mb-4"><Bell className="w-5 h-5 text-purple-400" /><h2 className={`text-lg font-semibold ${dark ? "text-white" : "text-gray-900"}`}>Notifications</h2></div>
          <div className="space-y-3">
            {Object.entries(notif).map(([key, val]) => (
              <div key={key} className="flex items-center justify-between">
                <span className={`text-sm ${dark ? "text-gray-300" : "text-gray-700"} capitalize`}>{key.replace(/([A-Z])/g, ' $1')}</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={val} onChange={() => setNotif(n => ({ ...n, [key]: !(n as any)[key] }))} className="sr-only peer" />
                  <div className={`w-10 h-5 rounded-full peer peer-checked:bg-purple-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full ${dark ? "bg-[#1e2a4a]" : "bg-gray-300"}`} />
                </label>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Theme */}
        <GlassCard dark={dark}>
          <div className="flex items-center gap-3 mb-4">
            {dark ? <Moon className="w-5 h-5 text-purple-400" /> : <Sun className="w-5 h-5 text-amber-400" />}
            <h2 className={`text-lg font-semibold ${dark ? "text-white" : "text-gray-900"}`}>Theme</h2>
          </div>
          <div className="flex gap-4">
            <button onClick={toggleTheme}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                dark ? "bg-purple-500 text-white shadow-lg shadow-purple-500/25" : `${inputBg} ${dark ? "text-white" : "text-gray-900"}`
              }`}>
              <Moon className="w-4 h-4" /> Dark
            </button>
            <button onClick={toggleTheme}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                !dark ? "bg-purple-500 text-white shadow-lg shadow-purple-500/25" : `${inputBg} ${dark ? "text-white" : "text-gray-900"}`
              }`}>
              <Sun className="w-4 h-4" /> Light
            </button>
          </div>
        </GlassCard>

        {/* Subscription */}
        <GlassCard dark={dark}>
          <div className="flex items-center gap-3 mb-4"><CreditCard className="w-5 h-5 text-purple-400" /><h2 className={`text-lg font-semibold ${dark ? "text-white" : "text-gray-900"}`}>Subscription</h2></div>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${txtSec}`}>Current Plan</p>
              <p className={`text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent capitalize`}>{user?.subscriptionTier || "Free"}</p>
            </div>
            <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold px-6 py-2.5 rounded-xl hover:opacity-90 shadow-lg shadow-purple-500/25">Upgrade</button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
