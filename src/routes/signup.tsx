import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useAuth } from "~/lib/AuthContext";
import { motion } from "framer-motion";
import { GraduationCap, Mail, Lock, User, Sparkles, CheckCircle2, Sun, Moon } from "lucide-react";

export const Route = createFileRoute("/signup")({ component: SignupPage });

function SignupPage() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [dark, setDark] = useState(true);
  useEffect(() => { const s = localStorage.getItem("fp_theme"); if (s === "light") setDark(false); }, []);
  const toggle = () => { const nd = !dark; setDark(nd); localStorage.setItem("fp_theme", nd ? "dark" : "light"); document.documentElement.classList.toggle("dark", nd); };

  const passwordChecks = { length: password.length >= 8, upper: /[A-Z]/.test(password), lower: /[a-z]/.test(password), number: /\d/.test(password) };
  const allPass = Object.values(passwordChecks).every(Boolean);

  const b = dark ? "bg-[#070B17]" : "bg-gray-50";
  const card = dark ? "bg-[#101828]/80 border-[#1e2a4a]" : "bg-white/80 border-gray-200";
  const inputBase = dark ? "bg-[#070B17] border-[#1e2a4a] text-white placeholder-gray-500" : "bg-white border-gray-300 text-gray-900 placeholder-gray-400";
  const inputClass = `w-full rounded-xl border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${inputBase}`;
  const txtTitle = dark ? "text-white" : "text-gray-900";
  const txtSec = dark ? "text-gray-500" : "text-gray-500";
  const txtLabel = dark ? "text-gray-300" : "text-gray-700";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setError("");
    if (password !== confirm) { setError("Passwords do not match"); return; }
    if (!allPass) { setError("Password must meet requirements"); return; }
    setLoading(true);
    try { await signup({ firstName, lastName, email, password }); navigate({ to: "/dashboard" }); }
    catch (err: any) { setError(err?.response?.data?.error || err?.message || "Signup failed"); }
    finally { setLoading(false); }
  };

  return (
    <div className={`min-h-screen ${b} flex items-center justify-center px-4 py-12 transition-colors duration-300`}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md relative">
        <button onClick={toggle} className={`absolute -top-2 right-0 p-2 rounded-xl ${dark ? "hover:bg-white/5 text-gray-400" : "hover:bg-gray-100 text-gray-600"} transition-colors`} aria-label="Toggle theme">
          {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 mb-4 shadow-lg shadow-purple-500/25">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className={`text-2xl font-bold ${txtTitle}`}>Create Your Account</h1>
          <p className={`text-sm ${txtSec} mt-1`}>Start mastering French today</p>
        </div>
        <div className={`${card} backdrop-blur-lg border rounded-2xl p-8 transition-colors`}>
          {error && (<motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="mb-4 rounded-xl bg-red-500/10 border border-red-500/30 px-4 py-3 text-sm text-red-400">{error}</motion.div>)}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-3">
              <div className="flex-1"><label className={`mb-1.5 block text-sm font-medium ${txtLabel}`}>First Name</label><input type="text" required value={firstName} onChange={(e) => setFirstName(e.target.value)} className={inputClass} placeholder="John" /></div>
              <div className="flex-1"><label className={`mb-1.5 block text-sm font-medium ${txtLabel}`}>Last Name</label><input type="text" required value={lastName} onChange={(e) => setLastName(e.target.value)} className={inputClass} placeholder="Doe" /></div>
            </div>
            <div>
              <label className={`mb-1.5 block text-sm font-medium ${txtLabel}`}>Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={`${inputClass} pl-10`} placeholder="you@example.com" />
              </div>
            </div>
            <div>
              <label className={`mb-1.5 block text-sm font-medium ${txtLabel}`}>Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className={`${inputClass} pl-10`} placeholder="Min 8 characters" />
              </div>
              <div className="mt-1.5 space-y-1 text-xs">
                {[{ key: 'length', label: 'At least 8 characters' }, { key: 'upper', label: 'Uppercase + lowercase letters' }, { key: 'number', label: 'At least one number' }].map(({ key, label }) => (
                  <p key={key} className={(passwordChecks as any)[key] ? "text-emerald-400" : "text-gray-500"}>
                    <CheckCircle2 className={`w-3 h-3 inline mr-1 ${(passwordChecks as any)[key] ? "text-emerald-400" : "text-gray-600"}`} />{label}
                  </p>
                ))}
              </div>
            </div>
            <div>
              <label className={`mb-1.5 block text-sm font-medium ${txtLabel}`}>Confirm Password</label>
              <input type="password" required value={confirm} onChange={(e) => setConfirm(e.target.value)} className={inputClass} placeholder="Repeat password" />
            </div>
            <button type="submit" disabled={loading || !allPass}
              className="w-full rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-all disabled:opacity-50 shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2">
              {loading ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Sparkles className="w-4 h-4" />}
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-purple-400 hover:text-purple-300 transition-colors">Sign in →</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
