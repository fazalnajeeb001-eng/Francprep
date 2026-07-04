import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "~/lib/AuthContext";
import { motion } from "framer-motion";
import { GraduationCap, Mail, Lock, User, Sparkles, CheckCircle2 } from "lucide-react";

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

  const passwordChecks = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /\d/.test(password),
  };
  const allPass = Object.values(passwordChecks).every(Boolean);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password !== confirm) { setError("Passwords do not match"); return; }
    if (!allPass) { setError("Password must be 8+ characters with uppercase, lowercase, and a number"); return; }
    setLoading(true);
    try {
      await signup({ firstName, lastName, email, password });
      navigate({ to: "/dashboard" });
    } catch (err: any) {
      const msg = err?.response?.data?.error || err?.message || "Signup failed";
      const details = err?.response?.data?.details;
      setError(details ? details.map((d: any) => d.message).join(". ") : msg);
    } finally { setLoading(false); }
  };

  const inputClass = "w-full rounded-xl bg-[#070B17] border border-[#1e2a4a] px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all";

  return (
    <div className="min-h-screen bg-[#070B17] flex items-center justify-center px-4 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 mb-4 shadow-lg shadow-purple-500/25">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">Create Your Account</h1>
          <p className="text-sm text-gray-500 mt-1">Start mastering French today</p>
        </div>
        <div className="bg-[#101828]/80 backdrop-blur-lg border border-[#1e2a4a] rounded-2xl p-8">
          {error && (
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
              className="mb-4 rounded-xl bg-red-500/10 border border-red-500/30 px-4 py-3 text-sm text-red-400">{error}</motion.div>)}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="mb-1.5 block text-sm font-medium text-gray-300">First Name</label>
                <input type="text" required value={firstName} onChange={(e) => setFirstName(e.target.value)} className={inputClass} placeholder="John" />
              </div>
              <div className="flex-1">
                <label className="mb-1.5 block text-sm font-medium text-gray-300">Last Name</label>
                <input type="text" required value={lastName} onChange={(e) => setLastName(e.target.value)} className={inputClass} placeholder="Doe" />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-300">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={`${inputClass} pl-10`} placeholder="you@example.com" />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-300">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className={`${inputClass} pl-10`} placeholder="Min 8 characters" />
              </div>
              <div className="mt-1.5 space-y-1 text-xs">
                {[
                  { key: 'length', label: 'At least 8 characters' },
                  { key: 'upper', label: 'Uppercase + lowercase letters' },
                  { key: 'number', label: 'At least one number' },
                ].map(({ key, label }) => (
                  <p key={key} className={(passwordChecks as any)[key] ? "text-emerald-400" : "text-gray-500"}>
                    <CheckCircle2 className={`w-3 h-3 inline mr-1 ${(passwordChecks as any)[key] ? "text-emerald-400" : "text-gray-600"}`} />
                    {label}
                  </p>
                ))}
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-300">Confirm Password</label>
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
