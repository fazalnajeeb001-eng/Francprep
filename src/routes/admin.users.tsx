import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, useCallback } from "react";
import { apiFetch } from "~/lib/apiFetch";
import { useAuth } from "~/lib/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users, Search, ChevronLeft, ChevronRight, Shield,
  MoreVertical, UserPlus, Ban, Trash2, Key, RefreshCw,
  X, Check, AlertTriangle, Eye, EyeOff, UserCog, Mail
} from "lucide-react";

export const Route = createFileRoute("/admin/users")({ component: AdminUsersPage });

interface AdminUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "student" | "admin";
  subscriptionTier: "free" | "premium" | "exam_prep";
  isActive: boolean;
  streak: number;
  xp: number;
  createdAt: string;
  lastLoginAt?: string;
}

interface PaginatedResponse {
  success: boolean;
  data: AdminUser[];
  pagination: { page: number; limit: number; total: number; totalPages: number };
}

// ─── Modal component ────────────────────────────────────────────────────

function Modal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60" onClick={onClose} />
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-md rounded-2xl dark:bg-[#101828] bg-white border dark:border-[#1e2a4a] border-gray-200 shadow-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold dark:text-white text-gray-900">{title}</h2>
              <button onClick={onClose} className="p-1.5 rounded-xl dark:hover:bg-white/5 hover:bg-gray-100 transition-colors">
                <X className="w-5 h-5 dark:text-gray-400 text-gray-500" />
              </button>
            </div>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// ─── Confirm Modal ──────────────────────────────────────────────────────

function ConfirmModal({ open, onClose, onConfirm, title, message, confirmLabel, variant }: {
  open: boolean; onClose: () => void; onConfirm: () => void;
  title: string; message: string; confirmLabel: string; variant: "danger" | "warning";
}) {
  return (
    <Modal open={open} onClose={onClose} title={title}>
      <div className="flex items-start gap-3 mb-4">
        <div className={`p-2 rounded-full shrink-0 ${variant === "danger" ? "bg-red-500/20" : "bg-amber-500/20"}`}>
          <AlertTriangle className={`w-5 h-5 ${variant === "danger" ? "text-red-400" : "text-amber-400"}`} />
        </div>
        <p className="text-sm dark:text-gray-300 text-gray-600">{message}</p>
      </div>
      <div className="flex gap-3 justify-end">
        <button onClick={onClose} className="px-4 py-2.5 rounded-xl border dark:border-[#1e2a4a] border-gray-200 text-sm dark:text-gray-300 text-gray-600 hover:dark:bg-white/5 hover:bg-gray-100 transition-all">Cancel</button>
        <button onClick={() => { onConfirm(); onClose(); }}
          className={`px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all ${
            variant === "danger" ? "bg-red-600 hover:bg-red-700" : "bg-amber-600 hover:bg-amber-700"
          }`}>{confirmLabel}</button>
      </div>
    </Modal>
  );
}

// ─── Action Dropdown ────────────────────────────────────────────────────

function ActionDropdown({ user, currentUserId, onAction }: { user: AdminUser; currentUserId: string; onAction: (action: string, user: AdminUser) => void }) {
  const [open, setOpen] = useState(false);
  const isSelf = user._id === currentUserId;

  const actions = [
    { id: "detail", label: "View Details", icon: Eye, color: "text-blue-400", disabled: false },
    { id: "toggle-ban", label: user.isActive ? "Ban User" : "Unban User", icon: Ban, color: user.isActive ? "text-red-400" : "text-emerald-400", disabled: isSelf },
    { id: "change-role", label: `Make ${user.role === "admin" ? "Student" : "Admin"}`, icon: UserCog, color: "text-purple-400", disabled: isSelf },
    { id: "reset-password", label: "Reset Password", icon: Key, color: "text-amber-400", disabled: false },
    { id: "delete", label: "Delete User", icon: Trash2, color: "text-red-500", disabled: isSelf },
  ];

  return (
    <div className="relative">
      <button onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
        className="p-1.5 rounded-xl dark:hover:bg-white/5 hover:bg-gray-100 transition-colors">
        <MoreVertical className="w-4 h-4 dark:text-gray-400 text-gray-500" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-1 z-50 w-52 rounded-xl dark:bg-[#101828] bg-white border dark:border-[#1e2a4a] border-gray-200 shadow-xl py-1 overflow-hidden">
            {actions.map((a) => (
              <button key={a.id} onClick={() => { if (!a.disabled) { setOpen(false); onAction(a.id, user); } }}
                className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 text-sm text-left transition-colors ${
                  a.disabled
                    ? "dark:text-gray-600 text-gray-400 cursor-not-allowed"
                    : "dark:text-gray-300 text-gray-700 hover:dark:bg-white/5 hover:bg-gray-50"
                }`}>
                <a.icon className={`w-4 h-4 ${a.disabled ? "dark:text-gray-600 text-gray-400" : a.color}`} />
                <span>{a.label}</span>
                {a.disabled && <span className="ml-auto text-[9px] dark:text-gray-600 text-gray-400">(you)</span>}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ─── Create User Modal ──────────────────────────────────────────────────

function CreateUserModal({ open, onClose, onCreated }: { open: boolean; onClose: () => void; onCreated: () => void }) {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "", role: "student", subscriptionTier: "free" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPwd, setShowPwd] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setError(""); setLoading(true);
    try {
      const body: any = { firstName: form.firstName, lastName: form.lastName, email: form.email, role: form.role, subscriptionTier: form.subscriptionTier };
      if (form.password) body.password = form.password;
      const res = await apiFetch("/admin/users/create", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const json = await res.json();
      if (json.success) { onCreated(); onClose(); }
      else setError(json.error || "Failed to create user");
    } catch (e: any) { setError(e.message || "Network error"); }
    finally { setLoading(false); }
  };

  const inp = "w-full rounded-xl dark:bg-[#070B17] bg-white dark:border-[#1e2a4a] border-gray-300 border px-4 py-2.5 text-sm dark:text-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all";

  return (
    <Modal open={open} onClose={onClose} title="Create User">
      <form onSubmit={handleSubmit} className="space-y-3.5">
        {error && <div className="rounded-xl bg-red-500/10 border border-red-500/30 px-3 py-2 text-xs text-red-400">{error}</div>}
        <div className="flex gap-3">
          <div className="flex-1"><label className="block text-xs font-medium dark:text-gray-300 text-gray-600 mb-1">First Name</label><input required value={form.firstName} onChange={(e) => setForm({...form, firstName: e.target.value})} className={inp} placeholder="John" /></div>
          <div className="flex-1"><label className="block text-xs font-medium dark:text-gray-300 text-gray-600 mb-1">Last Name</label><input required value={form.lastName} onChange={(e) => setForm({...form, lastName: e.target.value})} className={inp} placeholder="Doe" /></div>
        </div>
        <div><label className="block text-xs font-medium dark:text-gray-300 text-gray-600 mb-1">Email</label><input type="email" required value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} className={inp} placeholder="user@example.com" /></div>
        <div>
          <label className="block text-xs font-medium dark:text-gray-300 text-gray-600 mb-1">Password (leave blank to auto-generate)</label>
          <div className="relative">
            <input type={showPwd ? "text" : "password"} value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} className={`${inp} pr-10`} placeholder="Auto-generated if empty" />
            <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-3 top-1/2 -translate-y-1/2 dark:text-gray-500 text-gray-400">
              {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="flex-1"><label className="block text-xs font-medium dark:text-gray-300 text-gray-600 mb-1">Role</label>
            <select value={form.role} onChange={(e) => setForm({...form, role: e.target.value})} className={inp}>
              <option value="student">Student</option><option value="admin">Admin</option>
            </select>
          </div>
          <div className="flex-1"><label className="block text-xs font-medium dark:text-gray-300 text-gray-600 mb-1">Tier</label>
            <select value={form.subscriptionTier} onChange={(e) => setForm({...form, subscriptionTier: e.target.value})} className={inp}>
              <option value="free">Free</option><option value="premium">Premium</option><option value="exam_prep">Exam Prep</option>
            </select>
          </div>
        </div>
        <button type="submit" disabled={loading}
          className="w-full rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold py-2.5 hover:opacity-90 transition-all disabled:opacity-50 shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2 mt-1">
          {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <UserPlus className="w-4 h-4" />}
          {loading ? "Creating..." : "Create User"}
        </button>
      </form>
    </Modal>
  );
}

// ─── Reset Password Modal ───────────────────────────────────────────────

function ResetPasswordModal({ open, onClose, user, onReset }: { open: boolean; onClose: () => void; user: AdminUser | null; onReset: () => void }) {
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setError(""); setLoading(true);
    try {
      const res = await apiFetch(`/admin/users/${user?._id}/reset-password`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPassword }),
      });
      const json = await res.json();
      if (json.success) { onReset(); onClose(); }
      else setError(json.error || "Failed to reset password");
    } catch (e: any) { setError(e.message || "Network error"); }
    finally { setLoading(false); }
  };

  const inp = "w-full rounded-xl dark:bg-[#070B17] bg-white dark:border-[#1e2a4a] border-gray-300 border px-4 py-2.5 text-sm dark:text-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all";

  return (
    <Modal open={open} onClose={onClose} title={`Reset Password`}>
      {user && <p className="text-xs dark:text-gray-400 text-gray-500 mb-4">Set a new password for <strong className="dark:text-gray-200 text-gray-700">{user.firstName} {user.lastName}</strong></p>}
      <form onSubmit={handleSubmit} className="space-y-3.5">
        {error && <div className="rounded-xl bg-red-500/10 border border-red-500/30 px-3 py-2 text-xs text-red-400">{error}</div>}
        <div><label className="block text-xs font-medium dark:text-gray-300 text-gray-600 mb-1">New Password</label>
          <input type="password" required minLength={8} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className={inp} placeholder="Min 8 characters, upper+lower+number" />
        </div>
        <button type="submit" disabled={loading || newPassword.length < 8}
          className="w-full rounded-xl bg-amber-600 text-white text-sm font-semibold py-2.5 hover:bg-amber-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
          {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Key className="w-4 h-4" />}
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </Modal>
  );
}

// ─── User Detail Panel ──────────────────────────────────────────────────

function UserDetailPanel({ user, onClose, onAction }: { user: AdminUser; onClose: () => void; onAction: (action: string, user: AdminUser) => void }) {
  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0, x: 300 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 300 }}
        className="fixed right-0 top-0 bottom-0 w-full max-w-sm z-[60] dark:bg-[#101828] bg-white border-l dark:border-[#1e2a4a] border-gray-200 shadow-2xl flex flex-col">
        <div className="flex items-center justify-between px-5 py-4 border-b dark:border-[#1e2a4a] border-gray-200">
          <h2 className="text-sm font-bold dark:text-white text-gray-900">User Details</h2>
          <button onClick={onClose} className="p-1.5 rounded-xl dark:hover:bg-white/5 hover:bg-gray-100 transition-colors">
            <X className="w-5 h-5 dark:text-gray-400 text-gray-500" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Avatar + name */}
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xl font-bold mx-auto shadow-lg">
              {user.firstName[0]}{user.lastName[0]}
            </div>
            <h3 className="mt-3 text-lg font-bold dark:text-white text-gray-900">{user.firstName} {user.lastName}</h3>
          </div>

          {/* Metadata */}
          <div className="space-y-3">
            {[
              { label: "Email", value: user.email, icon: Mail },
              { label: "Role", value: user.role, icon: Shield },
              { label: "Tier", value: user.subscriptionTier, icon: Users },
              { label: "Status", value: user.isActive ? "Active" : "Inactive", icon: Ban },
              { label: "Streak", value: `${user.streak} days`, icon: Users },
              { label: "XP", value: String(user.xp), icon: Users },
              { label: "Joined", value: new Date(user.createdAt).toLocaleDateString(), icon: Users },
              { label: "Last Login", value: user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleDateString() : "Never", icon: Users },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between py-1.5">
                <span className="text-xs dark:text-gray-400 text-gray-500">{item.label}</span>
                <span className="text-xs font-medium dark:text-gray-200 text-gray-800">{item.value}</span>
              </div>
            ))}
          </div>

          {/* Quick actions */}
          <div className="pt-3 space-y-2">
            <button onClick={() => { onAction("toggle-ban", user); onClose(); }}
              className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                user.isActive ? "bg-red-600/20 text-red-400 border border-red-500/30 hover:bg-red-600/30" : "bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-600/30"
              }`}>
              <Ban className="w-4 h-4" /> {user.isActive ? "Ban User" : "Unban User"}
            </button>
            <button onClick={() => { onAction("change-role", user); onClose(); }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-purple-600/20 text-purple-400 border border-purple-500/30 hover:bg-purple-600/30 transition-all">
              <UserCog className="w-4 h-4" /> Make {user.role === "admin" ? "Student" : "Admin"}
            </button>
            <button onClick={() => { onAction("reset-password", user); onClose(); }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-amber-600/20 text-amber-400 border border-amber-500/30 hover:bg-amber-600/30 transition-all">
              <Key className="w-4 h-4" /> Reset Password
            </button>
            <button onClick={() => { onAction("delete", user); onClose(); }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-red-600/20 text-red-400 border border-red-500/30 hover:bg-red-600/30 transition-all">
              <Trash2 className="w-4 h-4" /> Delete User
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Main Page ──────────────────────────────────────────────────────────

function AdminUsersPage() {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [searchTimeout, setSearchTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);

  // Modal state
  const [detailUser, setDetailUser] = useState<AdminUser | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [resetPwdUser, setResetPwdUser] = useState<AdminUser | null>(null);
  const [confirmAction, setConfirmAction] = useState<{ action: string; user: AdminUser } | null>(null);

  const fetchUsers = useCallback(async (p: number, q?: string) => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({ page: String(p), limit: "20" });
      if (q) params.set("search", q);
      const res = await apiFetch(`/admin/users?${params}`);
      const json: PaginatedResponse = await res.json();
      if (json.success) {
        setUsers(json.data);
        setPage(json.pagination.page);
        setTotalPages(json.pagination.totalPages);
        setTotal(json.pagination.total);
      } else {
        setError("Failed to load users");
      }
    } catch (e: any) {
      setError(e.message || "Network error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchUsers(page, search); }, [page, fetchUsers]);

  // Debounced search
  const handleSearch = (val: string) => {
    setSearch(val);
    if (searchTimeout) clearTimeout(searchTimeout);
    setSearchTimeout(setTimeout(() => {
      setPage(1);
      fetchUsers(1, val);
    }, 400));
  };

  // Action handlers
  const handleAction = async (action: string, user: AdminUser) => {
    switch (action) {
      case "detail":
        setDetailUser(user);
        break;
      case "toggle-ban": {
        try {
          const res = await apiFetch(`/admin/users/${user._id}`, {
            method: "PUT", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ isActive: !user.isActive }),
          });
          const json = await res.json();
          if (json.success) fetchUsers(page, search);
        } catch { /* ignore */ }
        break;
      }
      case "change-role": {
        try {
          const newRole = user.role === "admin" ? "student" : "admin";
          const res = await apiFetch(`/admin/users/${user._id}`, {
            method: "PUT", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ role: newRole }),
          });
          const json = await res.json();
          if (json.success) fetchUsers(page, search);
        } catch { /* ignore */ }
        break;
      }
      case "delete": {
        try {
          const res = await apiFetch(`/admin/users/${user._id}`, { method: "DELETE" });
          const json = await res.json();
          if (json.success) {
            if (detailUser?._id === user._id) setDetailUser(null);
            fetchUsers(page, search);
          }
        } catch { /* ignore */ }
        break;
      }
      case "reset-password":
        setResetPwdUser(user);
        break;
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold dark:text-white text-gray-900">User Management</h1>
          <p className="text-sm dark:text-gray-400 text-gray-500 mt-1">{total} total users</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-full sm:w-56">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input type="text" value={search} onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search users..."
              className="w-full rounded-xl dark:bg-[#070B17] bg-white dark:border-[#1e2a4a] border-gray-300 border pl-9 pr-4 py-2.5 text-sm dark:text-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all" />
          </div>
          <button onClick={() => setShowCreate(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold hover:opacity-90 transition-all shadow-lg shadow-purple-500/25 shrink-0">
            <UserPlus className="w-4 h-4" /> Add User
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-xl bg-red-500/10 border border-red-500/30 px-4 py-3 text-sm text-red-400">
          {error}
          <button onClick={() => fetchUsers(page, search)} className="ml-2 underline hover:no-underline">Retry</button>
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="rounded-2xl dark:bg-[#101828]/80 bg-white/80 border dark:border-[#1e2a4a] border-gray-200 p-4 animate-pulse">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full dark:bg-[#1e2a4a] bg-gray-200" />
                <div className="flex-1">
                  <div className="h-4 w-40 dark:bg-[#1e2a4a] bg-gray-200 rounded mb-2" />
                  <div className="h-3 w-60 dark:bg-[#1e2a4a] bg-gray-200 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {/* Users table */}
          <div className="rounded-2xl dark:bg-[#101828]/80 bg-white/80 backdrop-blur-lg border dark:border-[#1e2a4a] border-gray-200 overflow-hidden transition-colors">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b dark:border-[#1e2a4a] border-gray-200 dark:bg-[#070B17] bg-gray-50">
                    <th className="text-left px-5 py-3.5 font-semibold dark:text-gray-200 text-gray-700 text-xs uppercase tracking-wider">User</th>
                    <th className="text-left px-5 py-3.5 font-semibold dark:text-gray-200 text-gray-700 text-xs uppercase tracking-wider hidden md:table-cell">Email</th>
                    <th className="text-left px-5 py-3.5 font-semibold dark:text-gray-200 text-gray-700 text-xs uppercase tracking-wider hidden sm:table-cell">Role</th>
                    <th className="text-left px-5 py-3.5 font-semibold dark:text-gray-200 text-gray-700 text-xs uppercase tracking-wider hidden lg:table-cell">Tier</th>
                    <th className="text-left px-5 py-3.5 font-semibold dark:text-gray-200 text-gray-700 text-xs uppercase tracking-wider hidden lg:table-cell">Status</th>
                    <th className="text-left px-5 py-3.5 font-semibold dark:text-gray-200 text-gray-700 text-xs uppercase tracking-wider hidden sm:table-cell">Joined</th>
                    <th className="w-12" />
                  </tr>
                </thead>
                <tbody className="divide-y dark:divide-[#1e2a4a] divide-gray-200">
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-5 py-8 text-center text-sm dark:text-gray-500 text-gray-400">
                        {search ? "No users match your search." : "No users found."}
                      </td>
                    </tr>
                  ) : (
                    users.map((user) => (
                      <tr key={user._id} className="dark:hover:bg-white/5 hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => setDetailUser(user)}>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                              {user.firstName[0]}{user.lastName[0]}
                            </div>
                            <div>
                              <p className="text-sm font-medium dark:text-gray-200 text-gray-800">{user.firstName} {user.lastName}</p>
                              <p className="text-xs dark:text-gray-500 text-gray-400 sm:hidden">{user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-3.5 text-sm dark:text-gray-300 text-gray-600 hidden md:table-cell">{user.email}</td>
                        <td className="px-5 py-3.5 hidden sm:table-cell">
                          <span className={`text-[10px] font-semibold px-2 py-1 rounded-full ${
                            user.role === "admin"
                              ? "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                              : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          }`}>{user.role}</span>
                        </td>
                        <td className="px-5 py-3.5 hidden lg:table-cell">
                          <span className={`text-[10px] font-semibold px-2 py-1 rounded-full ${
                            user.subscriptionTier === "premium" ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                            : user.subscriptionTier === "exam_prep" ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                            : "dark:bg-gray-500/20 bg-gray-100 dark:text-gray-400 text-gray-500 border dark:border-gray-500/30 border-gray-200"
                          }`}>{user.subscriptionTier}</span>
                        </td>
                        <td className="px-5 py-3.5 hidden lg:table-cell">
                          <div className="flex items-center gap-1.5">
                            <div className={`w-1.5 h-1.5 rounded-full ${user.isActive ? "bg-emerald-400" : "bg-red-400"}`} />
                            <span className={`text-xs ${user.isActive ? "text-emerald-400" : "text-red-400"}`}>{user.isActive ? "Active" : "Inactive"}</span>
                          </div>
                        </td>
                        <td className="px-5 py-3.5 text-xs dark:text-gray-400 text-gray-500 hidden sm:table-cell">{new Date(user.createdAt).toLocaleDateString()}</td>
                        <td className="px-3 py-3.5" onClick={(e) => e.stopPropagation()}>
                          <ActionDropdown user={user} currentUserId={currentUser?._id || ""} onAction={handleAction} />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between">
              <p className="text-xs dark:text-gray-500 text-gray-400">Page {page} of {totalPages} ({total} users)</p>
              <div className="flex items-center gap-2">
                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page <= 1}
                  className="p-2 rounded-xl dark:bg-[#101828]/80 bg-white/80 border dark:border-[#1e2a4a] border-gray-200 dark:text-gray-400 text-gray-600 hover:text-purple-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs dark:text-gray-400 text-gray-600 font-medium">{page}</span>
                <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page >= totalPages}
                  className="p-2 rounded-xl dark:bg-[#101828]/80 bg-white/80 border dark:border-[#1e2a4a] border-gray-200 dark:text-gray-400 text-gray-600 hover:text-purple-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Modals */}
      <CreateUserModal open={showCreate} onClose={() => setShowCreate(false)} onCreated={() => fetchUsers(page, search)} />
      
      <ResetPasswordModal open={resetPwdUser !== null} onClose={() => setResetPwdUser(null)}
        user={resetPwdUser} onReset={() => fetchUsers(page, search)} />

      {detailUser && <UserDetailPanel user={detailUser} onClose={() => setDetailUser(null)} onAction={handleAction} />}
    </motion.div>
  );
}