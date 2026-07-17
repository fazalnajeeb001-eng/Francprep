import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { apiFetch } from "~/lib/apiFetch";
import { motion, AnimatePresence } from "framer-motion";
import { Megaphone, Plus, Trash2, Edit3, Check, X, AlertTriangle, Info, AlertCircle, BookOpen, Clock, Filter } from "lucide-react";
import { useTheme } from "~/lib/ThemeContext";

export const Route = createFileRoute("/admin/announcements")({ component: AnnouncementsPage });

const types = [
  { value: "info", label: "Info", icon: Info, color: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
  { value: "warning", label: "Warning", icon: AlertCircle, color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
  { value: "update", label: "Update", icon: BookOpen, color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
  { value: "exam_tip", label: "Exam Tip", icon: AlertTriangle, color: "text-purple-400 bg-purple-500/10 border-purple-500/20" },
];
const priorities = ["low", "medium", "high"];

function AnnouncementsPage() {
  const { dark } = useTheme();
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [filterType, setFilterType] = useState("");
  const [form, setForm] = useState({ title: "", content: "", type: "info", priority: "medium", isActive: true, expiresAt: "" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const bg = dark ? "bg-[#070B17]" : "bg-gray-50";
  const card = dark ? "bg-[#101828]/80 border-[#1e2a4a]" : "bg-white/80 border-gray-200";
  const inp = `w-full rounded-xl ${dark ? "bg-[#070B17] border-[#1e2a4a] text-white" : "bg-white border-gray-300 text-gray-900"} border px-4 py-2.5 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`;
  const txtSec = dark ? "text-gray-400" : "text-gray-500";

  const fetchAnnouncements = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), limit: "15" });
      if (filterType) params.set("type", filterType);
      const res = await apiFetch(`/announcements?${params}`);
      const json = await res.json();
      if (json.success) {
        setAnnouncements(json.data);
        setTotalPages(json.pagination.pages);
      }
    } catch {}
    setLoading(false);
  };

  useEffect(() => { fetchAnnouncements(); }, [page, filterType]);

  const handleSubmit = async () => {
    if (!form.title.trim() || !form.content.trim()) { setError("Title and content are required"); return; }
    setSaving(true); setError("");
    try {
      const body = { ...form, expiresAt: form.expiresAt || undefined };
      const url = editing ? `/announcements/${editing}` : "/announcements";
      const method = editing ? "PUT" : "POST";
      const res = await apiFetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const json = await res.json();
      if (json.success) {
        setShowForm(false); setEditing(null);
        setForm({ title: "", content: "", type: "info", priority: "medium", isActive: true, expiresAt: "" });
        fetchAnnouncements();
      } else { setError(json.error || "Failed to save"); }
    } catch { setError("Network error"); }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this announcement?")) return;
    try {
      const res = await apiFetch(`/announcements/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) fetchAnnouncements();
    } catch {}
  };

  const handleEdit = (a: any) => {
    setForm({ title: a.title, content: a.content, type: a.type, priority: a.priority, isActive: a.isActive, expiresAt: a.expiresAt ? new Date(a.expiresAt).toISOString().split("T")[0] : "" });
    setEditing(a._id); setShowForm(true);
  };

  return (
    <div className={`min-h-screen ${bg} transition-colors duration-300`}>
      <div className="max-w-5xl mx-auto space-y-6 pb-20">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">📢 Announcements</h1>
            <p className={`text-sm ${txtSec} mt-1`}>Manage announcements shown to all users</p>
          </div>
          <button onClick={() => { setShowForm(!showForm); setEditing(null); setForm({ title: "", content: "", type: "info", priority: "medium", isActive: true, expiresAt: "" }); }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold hover:opacity-90 transition-all shadow-lg shadow-purple-500/25">
            <Plus className="w-4 h-4" /> New
          </button>
        </motion.div>

        {/* Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
              <div className={`${card} backdrop-blur-lg border rounded-2xl p-6 space-y-4`}>
                <h2 className={`text-lg font-semibold ${dark ? "text-white" : "text-gray-900"}`}>{editing ? "Edit" : "New"} Announcement</h2>
                {error && <div className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2">{error}</div>}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><label className={`text-xs ${txtSec} block mb-1`}>Title</label><input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inp} placeholder="Announcement title" /></div>
                  <div><label className={`text-xs ${txtSec} block mb-1`}>Expires At</label><input type="date" value={form.expiresAt} onChange={(e) => setForm({ ...form, expiresAt: e.target.value })} className={inp} /></div>
                </div>
                <div><label className={`text-xs ${txtSec} block mb-1`}>Content</label><textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className={`${inp} min-h-[100px] resize-y`} placeholder="Announcement content..." /></div>
                <div className="grid grid-cols-3 gap-4">
                  <div><label className={`text-xs ${txtSec} block mb-1`}>Type</label>
                    <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className={inp}>
                      {types.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                    </select>
                  </div>
                  <div><label className={`text-xs ${txtSec} block mb-1`}>Priority</label>
                    <select value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })} className={inp}>
                      {priorities.map((p) => <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>)}
                    </select>
                  </div>
                  <div className="flex items-end"><label className="flex items-center gap-2 cursor-pointer pb-2.5">
                    <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} className="w-4 h-4 rounded border-gray-300 text-purple-500 focus:ring-purple-500" />
                    <span className={`text-sm ${dark ? "text-gray-300" : "text-gray-700"}`}>Active</span>
                  </label></div>
                </div>
                <div className="flex gap-3">
                  <button onClick={handleSubmit} disabled={saving} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold hover:opacity-90 transition-all disabled:opacity-50">
                    {saving ? "Saving..." : editing ? "Update" : "Create"}
                  </button>
                  <button onClick={() => { setShowForm(false); setEditing(null); }} className={`px-4 py-2.5 rounded-xl border ${dark ? "border-[#1e2a4a] text-gray-400 hover:bg-white/5" : "border-gray-200 text-gray-600 hover:bg-gray-100"} text-sm transition-all`}>Cancel</button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-gray-400" />
          <button onClick={() => setFilterType("")} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${!filterType ? "bg-purple-500/20 text-purple-400 border border-purple-500/30" : dark ? "text-gray-400 hover:bg-white/5" : "text-gray-500 hover:bg-gray-100"}`}>All</button>
          {types.map((t) => (
            <button key={t.value} onClick={() => setFilterType(t.value)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filterType === t.value ? "bg-purple-500/20 text-purple-400 border border-purple-500/30" : dark ? "text-gray-400 hover:bg-white/5" : "text-gray-500 hover:bg-gray-100"}`}>{t.label}</button>
          ))}
        </div>

        {/* List */}
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className={`${card} rounded-2xl h-24 animate-pulse`} />
            ))}
          </div>
        ) : announcements.length === 0 ? (
          <div className={`${card} backdrop-blur-lg border rounded-2xl p-12 text-center`}>
            <Megaphone className="w-12 h-12 mx-auto text-gray-600 mb-3" />
            <p className={`text-sm ${txtSec}`}>No announcements yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {announcements.map((a) => {
              const typeInfo = types.find((t) => t.value === a.type) || types[0];
              const TypeIcon = typeInfo.icon;
              return (
                <motion.div key={a._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className={`${card} backdrop-blur-lg border rounded-2xl p-5`}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${typeInfo.color}`}>
                          <TypeIcon className="w-3 h-3" /> {typeInfo.label}
                        </span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${a.priority === "high" ? "bg-red-500/10 text-red-400" : a.priority === "medium" ? "bg-amber-500/10 text-amber-400" : "bg-gray-500/10 text-gray-400"}`}>
                          {a.priority}
                        </span>
                        {!a.isActive && <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-gray-500/10 text-gray-500">inactive</span>}
                      </div>
                      <h3 className={`text-sm font-semibold ${dark ? "text-white" : "text-gray-900"} mb-1`}>{a.title}</h3>
                      <p className={`text-xs ${txtSec} line-clamp-2`}>{a.content}</p>
                      <div className="flex items-center gap-3 mt-2 text-[10px] text-gray-500">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {new Date(a.createdAt).toLocaleDateString()}</span>
                        {a.expiresAt && <span>Expires {new Date(a.expiresAt).toLocaleDateString()}</span>}
                        {a.createdBy && <span>by {a.createdBy.firstName} {a.createdBy.lastName}</span>}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button onClick={() => handleEdit(a)} className="p-2 rounded-lg hover:bg-white/5 transition-colors"><Edit3 className="w-3.5 h-3.5 text-gray-400" /></button>
                      <button onClick={() => handleDelete(a._id)} className="p-2 rounded-lg hover:bg-red-500/10 transition-colors"><Trash2 className="w-3.5 h-3.5 text-red-400" /></button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} className={`px-3 py-1.5 rounded-lg text-xs ${dark ? "bg-[#1e2a4a] text-gray-400 hover:bg-white/10" : "bg-gray-200 text-gray-600 hover:bg-gray-300"} transition-all disabled:opacity-50`}>Prev</button>
            <span className={`text-xs ${txtSec}`}>Page {page} of {totalPages}</span>
            <button onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages} className={`px-3 py-1.5 rounded-lg text-xs ${dark ? "bg-[#1e2a4a] text-gray-400 hover:bg-white/10" : "bg-gray-200 text-gray-600 hover:bg-gray-300"} transition-all disabled:opacity-50`}>Next</button>
          </div>
        )}
      </div>
    </div>
  );
}
