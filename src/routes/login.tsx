import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useAuth } from "~/lib/AuthContext";
import { useTheme } from "~/lib/ThemeContext";
import { apiFetch } from "~/lib/apiFetch";
import { getTrackBranding, getActiveLanguageCode } from "~/lib/trackBranding";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Mail, Lock, LogIn, Eye, EyeOff, KeyRound, CheckCircle2, ArrowLeft, Sparkles, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/login")({ component: LoginPage });

function LoginPage() {
  const { dark } = useTheme();
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Forgot password modal states
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState("");
  const [resetError, setResetError] = useState("");

  const activeBranding = getTrackBranding(getActiveLanguageCode(user));

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const errParam = params.get("error");
      if (errParam === "USER_DELETED") {
        setError("This account has been deleted by an administrator.");
      } else if (errParam === "USER_BANNED") {
        setError("This account has been suspended or deactivated.");
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const loggedUser = await login({ email, password });
      const searchParams = new URLSearchParams(window.location.search);
      const redirectTarget = searchParams.get("redirect");
      if (redirectTarget && redirectTarget.startsWith("/")) {
        navigate({ to: redirectTarget as any });
      } else {
        navigate({ to: loggedUser.role === "admin" ? "/admin" : "/dashboard" });
      }
    } catch (err: any) {
      setError(err?.response?.data?.error || err?.message || "Invalid credentials. Please check your email and password.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetError("");
    setResetSuccess("");
    setResetLoading(true);

    try {
      const res = await apiFetch("/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: resetEmail })
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setResetSuccess(json.message || "Password reset link sent! Check your inbox.");
      } else {
        setResetSuccess("If an account exists with that email, password reset instructions have been sent.");
      }
    } catch (err: any) {
      setResetSuccess("If an account exists with that email, password reset instructions have been sent.");
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className={`min-h-screen ${dark ? "bg-[#070B17] text-white" : "bg-[#F8FAFC] text-slate-900"} flex items-center justify-center px-4 py-12 transition-colors duration-300 overflow-x-hidden relative`}>
      {/* Dynamic Background Glow & Ambient Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className={`absolute -top-40 -left-40 w-96 h-96 rounded-full blur-3xl opacity-20 ${dark ? "bg-purple-600" : "bg-purple-300"}`} />
        <div className={`absolute -bottom-40 -right-40 w-96 h-96 rounded-full blur-3xl opacity-20 ${dark ? "bg-pink-600" : "bg-pink-300"}`} />
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="w-full max-w-sm sm:max-w-md z-10">
        {/* Header Branding */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center justify-center gap-2 mb-4 group">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 via-indigo-500 to-pink-500 flex items-center justify-center text-white text-2xl font-bold shadow-xl shadow-purple-500/25 group-hover:scale-105 transition-all">
              {activeBranding.flag}
            </div>
          </Link>
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-purple-500/10 text-purple-400 border border-purple-500/20">
              {activeBranding.shortBrand} Portal
            </span>
          </div>
          <h1 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${dark ? "text-white" : "text-gray-900"}`}>
            Welcome Back
          </h1>
          <p className={`text-sm ${dark ? "text-gray-400" : "text-slate-600"} mt-1.5 max-w-xs mx-auto`}>
            Sign in to continue your {activeBranding.languageName} learning path
          </p>
        </div>

        {/* Card Container */}
        <div className={`${dark ? "bg-[#101828]/85 border-[#1e2a4a] shadow-2xl shadow-black/40" : "bg-white border-slate-200/90 shadow-xl shadow-slate-200/50"} backdrop-blur-xl border rounded-3xl p-6 sm:p-8 transition-all duration-300`}>
          {error && (
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="mb-5 rounded-2xl bg-red-500/10 border border-red-500/30 p-4 text-xs font-semibold text-red-400 flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className={`mb-1.5 block text-xs font-bold uppercase tracking-wider ${dark ? "text-gray-300" : "text-slate-700"}`}>
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full rounded-xl ${dark ? "bg-[#070B17] border-[#1e2a4a] text-white placeholder-gray-500" : "bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400"} border pl-10 pr-4 py-3 min-h-[44px] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all`}
                  placeholder="name@domain.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className={`text-xs font-bold uppercase tracking-wider ${dark ? "text-gray-300" : "text-slate-700"}`}>
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setResetEmail(email);
                    setResetError("");
                    setResetSuccess("");
                    setShowResetModal(true);
                  }}
                  className="text-xs font-bold text-purple-400 hover:text-purple-300 transition-colors focus:outline-none"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full rounded-xl ${dark ? "bg-[#070B17] border-[#1e2a4a] text-white placeholder-gray-500" : "bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400"} border pl-10 pr-12 py-3 min-h-[44px] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-purple-400 hover:text-purple-300 ${dark ? "hover:bg-purple-500/20" : "hover:bg-purple-100"} transition-all cursor-pointer flex items-center justify-center`}
                  title={showPassword ? "Hide password" : "Show password"}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 hover:opacity-95 text-white min-h-[48px] px-4 py-3 text-sm font-bold shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 mt-2"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn className="w-4 h-4" /> Sign In to Account
                </>
              )}
            </button>
          </form>

          {/* Footer Signup Link */}
          <div className="mt-6 text-center border-t dark:border-[#1e2a4a] border-slate-200 pt-5">
            <p className={`text-xs ${dark ? "text-gray-400" : "text-slate-600"}`}>
              Don't have a learning account?{" "}
              <Link to="/signup" className="font-bold text-purple-400 hover:text-purple-300 transition-colors ml-1 inline-flex items-center gap-1">
                Create Account →
              </Link>
            </p>
          </div>
        </div>
      </motion.div>

      {/* Forgot Password Interactive Modal */}
      <AnimatePresence>
        {showResetModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`w-full max-w-md rounded-3xl border ${dark ? "bg-[#101828] border-[#1e2a4a] text-white" : "bg-white border-slate-200 text-slate-900"} p-6 sm:p-8 shadow-2xl space-y-5 relative`}
            >
              <div className="flex items-center justify-between border-b dark:border-[#1e2a4a] border-slate-200 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                    <KeyRound className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold">Reset Your Password</h3>
                    <p className={`text-xs ${dark ? "text-gray-400" : "text-slate-500"}`}>We'll send password recovery instructions</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowResetModal(false)}
                  className={`p-2 rounded-xl text-gray-400 hover:text-white ${dark ? "hover:bg-white/10" : "hover:bg-slate-100"} transition-colors`}
                >
                  ✕
                </button>
              </div>

              {resetSuccess ? (
                <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 space-y-3 text-center">
                  <CheckCircle2 className="w-10 h-10 mx-auto text-emerald-400" />
                  <p className="text-xs font-bold leading-relaxed">{resetSuccess}</p>
                  <button
                    onClick={() => setShowResetModal(false)}
                    className="w-full py-2.5 rounded-xl bg-emerald-500 text-black text-xs font-extrabold shadow-md hover:bg-emerald-400 transition-all mt-2"
                  >
                    Back to Login
                  </button>
                </div>
              ) : (
                <form onSubmit={handleResetPasswordSubmit} className="space-y-4">
                  {resetError && (
                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold">
                      {resetError}
                    </div>
                  )}

                  <div>
                    <label className={`mb-1.5 block text-xs font-bold uppercase tracking-wider ${dark ? "text-gray-300" : "text-slate-700"}`}>
                      Registered Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
                      <input
                        type="email"
                        required
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                        className={`w-full rounded-xl ${dark ? "bg-[#070B17] border-[#1e2a4a] text-white placeholder-gray-500" : "bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400"} border pl-10 pr-4 py-3 min-h-[44px] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`}
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowResetModal(false)}
                      className={`flex-1 py-3 rounded-xl border text-xs font-bold transition-all ${dark ? "border-[#1e2a4a] text-gray-400 hover:text-white" : "border-slate-200 text-slate-700 hover:bg-slate-100"}`}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={resetLoading}
                      className="flex-1 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-extrabold shadow-lg shadow-purple-500/25 hover:opacity-90 transition-all flex items-center justify-center gap-1.5"
                    >
                      {resetLoading ? (
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        "Send Reset Link"
                      )}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
