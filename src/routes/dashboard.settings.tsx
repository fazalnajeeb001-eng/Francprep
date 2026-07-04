import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "~/lib/AuthContext";

export const Route = createFileRoute("/dashboard/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const { user } = useAuth();
  const [theme, setTheme] = useState("dark");

  return (
    <div className="min-h-screen bg-[#0F0C1B] text-white">
      <div className="max-w-3xl mx-auto p-6 space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <Link to="/dashboard" className="text-gray-400 hover:text-white">← Back to Dashboard</Link>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-[#8A2BE2] to-[#FF007F] bg-clip-text text-transparent">Settings</h1>
        </div>

        {/* Profile */}
        <div className="bg-[#1a1533]/80 backdrop-blur-sm rounded-2xl p-6 border border-purple-900/30">
          <h2 className="text-lg font-semibold mb-4">Profile</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-500 block mb-1">First Name</label>
              <input type="text" defaultValue={user?.firstName} className="w-full bg-white/5 border border-purple-900/30 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#8A2BE2]" />
            </div>
            <div>
              <label className="text-xs text-gray-500 block mb-1">Last Name</label>
              <input type="text" defaultValue={user?.lastName} className="w-full bg-white/5 border border-purple-900/30 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#8A2BE2]" />
            </div>
            <div className="md:col-span-2">
              <label className="text-xs text-gray-500 block mb-1">Email</label>
              <input type="email" defaultValue={user?.email} readOnly className="w-full bg-white/5 border border-purple-900/30 rounded-lg px-3 py-2 text-sm text-gray-400 cursor-not-allowed" />
              <p className="text-[10px] text-gray-600 mt-1">Email cannot be changed</p>
            </div>
          </div>
          <button className="mt-4 bg-gradient-to-r from-[#8A2BE2] to-[#FF007F] text-white text-sm font-semibold px-6 py-2 rounded-lg hover:opacity-90">Save Changes</button>
        </div>

        {/* Password */}
        <div className="bg-[#1a1533]/80 backdrop-blur-sm rounded-2xl p-6 border border-purple-900/30">
          <h2 className="text-lg font-semibold mb-4">Change Password</h2>
          <div className="space-y-3">
            <input type="password" placeholder="Current Password" className="w-full bg-white/5 border border-purple-900/30 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#8A2BE2]" />
            <input type="password" placeholder="New Password" className="w-full bg-white/5 border border-purple-900/30 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#8A2BE2]" />
            <input type="password" placeholder="Confirm New Password" className="w-full bg-white/5 border border-purple-900/30 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#8A2BE2]" />
          </div>
          <button className="mt-4 bg-gradient-to-r from-[#8A2BE2] to-[#FF007F] text-white text-sm font-semibold px-6 py-2 rounded-lg hover:opacity-90">Update Password</button>
        </div>

        {/* Notifications */}
        <div className="bg-[#1a1533]/80 backdrop-blur-sm rounded-2xl p-6 border border-purple-900/30">
          <h2 className="text-lg font-semibold mb-4">Notifications</h2>
          <div className="space-y-3">
            {["Email Reminders", "Push Notifications", "Weekly Report", "Achievement Alerts"].map((n) => (
              <div key={n} className="flex items-center justify-between">
                <span className="text-sm text-gray-300">{n}</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-9 h-5 bg-gray-700 rounded-full peer peer-checked:bg-[#8A2BE2] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full" />
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Subscription */}
        <div className="bg-[#1a1533]/80 backdrop-blur-sm rounded-2xl p-6 border border-purple-900/30">
          <h2 className="text-lg font-semibold mb-4">Subscription</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-300">Current Plan</p>
              <p className="text-xl font-bold bg-gradient-to-r from-[#39FF14] to-[#8A2BE2] bg-clip-text text-transparent capitalize">{user?.subscriptionTier || "Free"}</p>
            </div>
            <button className="bg-gradient-to-r from-[#8A2BE2] to-[#FF007F] text-white text-sm font-semibold px-6 py-2 rounded-lg hover:opacity-90">Upgrade</button>
          </div>
        </div>

        {/* Theme */}
        <div className="bg-[#1a1533]/80 backdrop-blur-sm rounded-2xl p-6 border border-purple-900/30">
          <h2 className="text-lg font-semibold mb-4">Theme</h2>
          <div className="flex gap-4">
            {["dark", "light"].map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all ${
                  theme === t
                    ? "bg-[#8A2BE2] text-white"
                    : "bg-white/5 text-gray-400 hover:text-white"
                }`}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
