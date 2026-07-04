import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useAuth } from "~/lib/AuthContext";
import { motion } from "framer-motion";
import { GraduationCap, Mail, Lock, LogIn, Sun, Moon } from "lucide-react";

export const Route = createFileRoute("/login")({ component: LoginPage });

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [dark, setDark] = useState(true);
  useEffect(() => { const s = localStorage.getItem("fp_theme"); if (s === "light") setDark(false); }, []);
  const toggle = () => { const nd = !dark; setDark(nd); localStorage.setItem("fp_theme", nd ? "dark" : "light"); document.documentElement.classList.toggle("dark", nd); };

  const b = dark ? "bg-[#070B17]" : "bg-gray-50";
  const card = dark ? "bg-[#101828]/80 border-[#1e2a4a]" : "bg-white/80 border-gray-200";
  const inputBg = dark ? "bg-[#070B17] border-[#1e2a4a] text-white placeholder-gray-500" : "bg-white border-gray-300 text-gray-900 placeholder-gray-400";
  const txtTitle = dark ? "text-white" : "text-gray-900";
  const txtSec = dark ? "text-gray-500" : "text-gray-500";
  const txtLabel = dark ? "text-gray-300" : "text-gray-700";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); setLoading(true);
    try { await login({ email, password }); navigate({ to: "/dashboard" }); }
    catch (err: any) { setError(err?.response?.data?.error || err?.message || "Login failed"); }
    finally { setLoading(false); }
  };

  return (
    <div className={`min-h-screen ${b} flex items-center justify-center px-4 py-12 transition-colors duration-300`}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md relative">
        {/* Theme toggle */}
        <button onClick={toggle} className={`absolute -top-2 right-0 p-2 rounded-xl ${dark ? "hover:bg-white/5 text-gray-400" : "hover:bg-gray-100 text-gray-600"} transition-colors`} aria-label="Toggle theme">
          {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 mb-4 shadow-lg shadow-purple-500/25">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className={`text-2xl font-bold ${txtTitle}`}>Welcome Back</h1>
          <p className={`text-sm ${txtSec} mt-1`}>Sign in to continue your learning</p>
        </div>
        <div className={`${card} backdrop-blur-lg border rounded-2xl p-8 transition-colors`}>
          {error && (
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
              className="mb-4 rounded-xl bg-red-500/10 border border-red-500/30 px-4 py-3 text-sm text-red-400">{error}</motion.div>)}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className={`mb-1.5 block text-sm font-medium ${txtLabel}`}>Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                  className={`w-full rounded-xl border pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${inputBg}`}
                  placeholder="you@example.com" />
              </div>
            </div>
            <div>
              <label className={`mb-1.5 block text-sm font-medium ${txtLabel}`}>Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                  className={`w-full rounded-xl border pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${inputBg}`}
                  placeholder="••••••••" />
              </div>
            </div>
            <button type="submit" disabled={loading}
              className="w-full rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-all disabled:opacity-50 shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2">
              {loading ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <LogIn className="w-4 h-4" />}
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link to="/signup" className="font-medium text-purple-400 hover:text-purple-300 transition-colors">Sign up →</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
