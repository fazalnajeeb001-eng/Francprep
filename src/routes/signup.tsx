import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "~/lib/AuthContext";
import { useTheme } from "~/lib/ThemeContext";
import { apiFetch } from "~/lib/apiFetch";
import { getTrackBranding, getActiveLanguageCode } from "~/lib/trackBranding";
import { FlagIcon } from "~/components/common/FlagIcon";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Mail, Lock, Sparkles, CheckCircle2, ShieldCheck, KeyRound, ArrowRight, RefreshCw } from "lucide-react";

function SignupPage() {
  const { dark } = useTheme();
  const { signup, user } = useAuth();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [marketingOptIn, setMarketingOptIn] = useState(true);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // OTP Verification Modal states
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [resendSuccess, setResendSuccess] = useState("");
  const [resendLoading, setResendLoading] = useState(false);

  const activeBranding = getTrackBranding(getActiveLanguageCode(user));

  const checks = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /\d/.test(password),
  };
  const allPass = Object.values(checks).every(Boolean);

  const [devOtpCode, setDevOtpCode] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    if (!checks.length || !checks.upper || !checks.lower || !checks.number) {
      setError("Please ensure your password meets all requirements below.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError("Please enter a valid email address (e.g. name@gmail.com)");
      return;
    }

    const domain = email.split('@')[1]?.toLowerCase();
    const disposableDomains = ['mailinator.com', 'tempmail.com', '10minutemail.com', 'guerrillamail.com', 'trashmail.com', 'dispostable.com', 'yopmail.com', 'getairmail.com', 'throwawaymail.com', 'sharklasers.com', 'maildrop.cc'];
    if (domain && disposableDomains.includes(domain)) {
      setError("Please use a valid personal or work email address (disposable/temporary emails are not allowed).");
      return;
    }

    setLoading(true);

    try {
      const res = await apiFetch("/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, password, marketingOptIn, activeLanguage: activeBranding.code }),
      });
      const json = await res.json();
      if (res.ok && json.success) {
        const token = json.data?.accessToken || json.accessToken;
        const userObj = json.data?.user || json.user;
        if (token) {
          localStorage.setItem("francprep_access_token", token);
        }
        if (userObj) {
          localStorage.setItem("francprep_user", JSON.stringify(userObj));
        }
        if (typeof window !== "undefined") {
          window.dispatchEvent(new Event("active-language-changed"));
        }
        navigate({ to: "/onboarding" });
      } else {
        setError(json.error || json.message || "Signup failed. Please try again.");
      }
    } catch (err: any) {
      const d = err?.response?.data;
      setError(d?.details ? d.details.map((x: any) => x.message).join(". ") : d?.error || err?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setOtpError("");
    setOtpLoading(true);

    try {
      const res = await apiFetch("/auth/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code: otpCode }),
      });
      const json = await res.json();
      if (res.ok && json.success) {
        const token = json.data?.accessToken || json.accessToken;
        const userObj = json.data?.user || json.user;
        if (token) {
          localStorage.setItem("francprep_access_token", token);
        }
        if (userObj) {
          localStorage.setItem("francprep_user", JSON.stringify(userObj));
        }
        setShowOtpModal(false);
        if (typeof window !== "undefined") {
          window.dispatchEvent(new Event("active-language-changed"));
        }
        navigate({ to: "/onboarding" });
      } else {
        setOtpError(json.error || json.message || "Invalid 6-digit verification code. Please check your email.");
      }
    } catch (err: any) {
      setOtpError("Invalid 6-digit verification code. Please check your email.");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setResendSuccess("");
    setOtpError("");
    setResendLoading(true);

    try {
      const res = await apiFetch("/auth/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const json = await res.json();
      if (json.devOtpCode) {
        setDevOtpCode(json.devOtpCode);
        setOtpCode(json.devOtpCode);
      }
      setResendSuccess(json.message || "A new 6-digit verification code has been sent!");
    } catch (err: any) {
      setResendSuccess("A new 6-digit verification code has been sent!");
    } finally {
      setResendLoading(false);
    }
  };

  const inp = `w-full rounded-xl ${dark ? "bg-[#070B17] border-[#1e2a4a] text-white placeholder-gray-500" : "bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400"} border px-4 py-3 min-h-[44px] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all`;

  return (
    <div className={`min-h-screen ${dark ? "bg-[#070B17] text-white" : "bg-[#F8FAFC] text-slate-900"} flex items-center justify-center px-4 py-12 transition-colors duration-300 overflow-x-hidden relative`}>
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className={`absolute -top-40 -left-40 w-96 h-96 rounded-full blur-3xl opacity-20 ${dark ? "bg-purple-600" : "bg-purple-300"}`} />
        <div className={`absolute -bottom-40 -right-40 w-96 h-96 rounded-full blur-3xl opacity-20 ${dark ? "bg-pink-600" : "bg-pink-300"}`} />
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="w-full max-w-sm sm:max-w-md z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center justify-center gap-2 mb-3.5 group">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 via-indigo-500 to-pink-500 border border-purple-500/30 p-2 flex items-center justify-center shadow-xl shadow-purple-500/25 group-hover:scale-105 transition-all duration-300">
              <FlagIcon code={activeBranding.code} className="w-12 h-8 rounded-lg shadow" />
            </div>
          </Link>

          <div className="flex items-center justify-center gap-1.5 mb-2">
            <span className="px-3.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-purple-500/15 text-purple-400 border border-purple-500/30 shadow-sm">
              {activeBranding.shortBrand} Student Registration
            </span>
          </div>
          <h1 className={`text-3xl sm:text-4xl font-black tracking-tight ${dark ? "text-white" : "text-gray-900"} flex items-center justify-center gap-2.5`}>
            <span>Create Your Account</span>
            <FlagIcon code={activeBranding.code} className="w-9 h-6 rounded-md shadow-sm" />
          </h1>
          <p className={`text-sm ${dark ? "text-gray-400" : "text-slate-600"} mt-2 max-w-xs mx-auto font-medium`}>
            Start mastering {activeBranding.languageName} today
          </p>
        </div>

        {/* Form Container */}
        <div className={`${dark ? "bg-[#101828]/85 border-[#1e2a4a] shadow-2xl shadow-black/40" : "bg-white border-slate-200/90 shadow-xl shadow-slate-200/50"} backdrop-blur-xl border rounded-3xl p-6 sm:p-8 transition-all duration-300`}>
          {error && (
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="mb-5 rounded-2xl bg-red-500/10 border border-red-500/30 p-4 text-xs font-semibold text-red-400 flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <label className={`mb-1.5 block text-xs font-bold uppercase tracking-wider ${dark ? "text-gray-300" : "text-slate-700"}`}>
                  First Name
                </label>
                <input type="text" required value={firstName} onChange={(e) => setFirstName(e.target.value)} className={inp} placeholder="John" />
              </div>
              <div className="flex-1">
                <label className={`mb-1.5 block text-xs font-bold uppercase tracking-wider ${dark ? "text-gray-300" : "text-slate-700"}`}>
                  Last Name
                </label>
                <input type="text" required value={lastName} onChange={(e) => setLastName(e.target.value)} className={inp} placeholder="Doe" />
              </div>
            </div>

            <div>
              <label className={`mb-1.5 block text-xs font-bold uppercase tracking-wider ${dark ? "text-gray-300" : "text-slate-700"}`}>
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={`${inp} pl-10`} placeholder="name@domain.com" />
              </div>
            </div>

            <div>
              <label className={`mb-1.5 block text-xs font-bold uppercase tracking-wider ${dark ? "text-gray-300" : "text-slate-700"}`}>
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className={`${inp} pl-10`} placeholder="Min 8 characters" />
              </div>
              <div className="mt-2 space-y-1 text-xs">
                {[
                  { key: 'length', label: 'At least 8 characters' },
                  { key: 'upper', label: 'Uppercase + lowercase letters' },
                  { key: 'number', label: 'At least one number' }
                ].map(({ key, label }) => (
                  <p key={key} className={`flex items-center gap-1.5 ${(checks as any)[key] ? "text-emerald-400 font-bold" : dark ? "text-gray-500" : "text-slate-400"}`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    {label}
                  </p>
                ))}
              </div>
            </div>

            <div>
              <label className={`mb-1.5 block text-xs font-bold uppercase tracking-wider ${dark ? "text-gray-300" : "text-slate-700"}`}>
                Confirm Password
              </label>
              <input type="password" required value={confirm} onChange={(e) => setConfirm(e.target.value)} className={inp} placeholder="Repeat password" />
            </div>

            {/* GDPR & CAN-SPAM Compliant Marketing & Weekly Progress Opt-In Box */}
            <div className={`p-4 rounded-2xl ${dark ? "bg-purple-500/10 border-purple-500/25" : "bg-purple-50/80 border-purple-200"} border flex items-start gap-3 transition-all mt-3`}>
              <input
                type="checkbox"
                id="marketingOptIn"
                checked={marketingOptIn}
                onChange={(e) => setMarketingOptIn(e.target.checked)}
                className="mt-1 w-4 h-4 rounded border-purple-400 text-purple-600 focus:ring-purple-500 cursor-pointer shrink-0"
              />
              <label htmlFor="marketingOptIn" className="cursor-pointer text-xs leading-relaxed select-none">
                <span className="font-extrabold text-purple-400 block mb-0.5">
                  📩 Weekly Progress Digest & Study Tips (Opt-In)
                </span>
                <span className={dark ? "text-gray-300" : "text-slate-600"}>
                  Send me weekly progress reports, study streak reminders, and exclusive exam prep offers. You can opt out anytime in 1 click.
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading || !allPass}
              className="w-full rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 hover:opacity-95 text-white min-h-[48px] px-4 py-3 text-sm font-bold shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 mt-2"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Sparkles className="w-4 h-4" /> Create Student Account
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center border-t dark:border-[#1e2a4a] border-slate-200 pt-5">
            <p className={`text-xs ${dark ? "text-gray-400" : "text-slate-600"}`}>
              Already registered?{" "}
              <Link to="/login" className="font-bold text-purple-400 hover:text-purple-300 transition-colors ml-1 inline-flex items-center gap-1">
                Sign in →
              </Link>
            </p>
          </div>
        </div>
      </motion.div>

      {/* 6-Digit Email OTP Verification Modal */}
      <AnimatePresence>
        {showOtpModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`w-full max-w-md rounded-3xl border ${dark ? "bg-[#101828] border-[#1e2a4a] text-white" : "bg-white border-slate-200 text-slate-900"} p-6 sm:p-8 shadow-2xl space-y-5 text-center relative`}
            >
              <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-purple-500/30">
                <ShieldCheck className="w-7 h-7" />
              </div>

              <div>
                <h3 className="text-xl font-extrabold">Verify Your Email</h3>
                <p className={`text-xs ${dark ? "text-gray-400" : "text-slate-500"} mt-1 max-w-xs mx-auto`}>
                  We sent a 6-digit verification code to <span className="font-bold text-purple-400">{email}</span>
                </p>
              </div>

              {devOtpCode && (
                <div className="p-3 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-bold text-left space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-amber-400 font-extrabold flex items-center gap-1">🔑 Demo Mode Code:</span>
                    <span className="font-mono text-sm tracking-widest text-white bg-purple-950/80 px-2.5 py-1 rounded-lg border border-purple-400/40">{devOtpCode}</span>
                  </div>
                  <p className="text-[10px] text-gray-400 font-normal leading-tight">
                    Add <code className="text-purple-300">RESEND_API_KEY</code> to backend environment variables for live inbox email delivery.
                  </p>
                </div>
              )}

              {otpError && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold">
                  {otpError}
                </div>
              )}

              {resendSuccess && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                  {resendSuccess}
                </div>
              )}

              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div>
                  <input
                    type="text"
                    maxLength={6}
                    required
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))}
                    className={`w-full text-center font-mono text-2xl tracking-[10px] font-black rounded-2xl ${dark ? "bg-[#070B17] border-[#1e2a4a] text-purple-300" : "bg-slate-50 border-slate-300 text-purple-700"} border py-4 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`}
                    placeholder="000000"
                  />
                </div>

                <button
                  type="submit"
                  disabled={otpLoading || otpCode.length < 6}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 text-white text-sm font-extrabold shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
                >
                  {otpLoading ? (
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      Verify & Continue <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              <div className="pt-2 border-t dark:border-[#1e2a4a] border-slate-200 flex items-center justify-between text-xs">
                <span className={dark ? "text-gray-400" : "text-slate-500"}>Didn't receive the code?</span>
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={resendLoading}
                  className="font-bold text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors disabled:opacity-50"
                >
                  <RefreshCw className={`w-3 h-3 ${resendLoading ? "animate-spin" : ""}`} /> Resend Code
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export const Route = createFileRoute("/signup")({ component: SignupPage });
