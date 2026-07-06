import { createFileRoute, Link, useNavigate, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { apiFetch } from "~/lib/apiFetch";
import { motion } from "framer-motion";
import { ArrowLeft, Save, Trash2, X } from "lucide-react";

export const Route = createFileRoute("/admin/lessons/$id/edit")({ component: LessonEditPage });

const levels = ["A1", "A2", "B1", "B2", "C1", "C2"] as const;
const categories = ["grammar", "vocabulary", "listening", "reading", "writing", "speaking"] as const;

const levelColors: Record<string, string> = {
  A1: "from-emerald-500 to-teal-500", A2: "from-teal-500 to-cyan-500",
  B1: "from-blue-500 to-indigo-500", B2: "from-indigo-500 to-purple-500",
  C1: "from-purple-500 to-pink-500", C2: "from-pink-500 to-rose-500",
};

const inp = "w-full rounded-xl dark:bg-[#070B17] bg-white dark:border-[#1e2a4a] border-gray-300 border px-4 py-2.5 text-sm dark:text-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all";
const labelCls = "block text-xs font-medium dark:text-gray-300 text-gray-600 mb-1";
const selCls = "w-full rounded-xl dark:bg-[#070B17] bg-white dark:border-[#1e2a4a] border-gray-300 border px-4 py-2.5 text-sm dark:text-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all";

function LessonEditPage() {
  const navigate = useNavigate();
  const { id } = useParams({ from: Route.id });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [tagInput, setTagInput] = useState("");

  const [form, setForm] = useState({
    title: "", description: "", level: "A1", category: "grammar", content: "",
    order: 1, estimatedDuration: 15, isPublished: false,
    tags: [] as string[], prerequisites: [] as string[],
  });

  const update = (field: string, value: any) => setForm({ ...form, [field]: value });

  useEffect(() => {
    (async () => {
      try {
        const res = await apiFetch(`/admin/lessons/${id}`);
        const json = await res.json();
        if (json.success && json.data) {
          const d = json.data;
          setForm({
            title: d.title || "", description: d.description || "", level: d.level || "A1",
            category: d.category || "grammar", content: d.content || "", order: d.order || 1,
            estimatedDuration: d.estimatedDuration || 15, isPublished: d.isPublished || false,
            tags: d.tags || [], prerequisites: d.prerequisites || [],
          });
        } else setError("Lesson not found");
      } catch (e: any) { setError(e.message || "Failed to load"); }
      finally { setLoading(false); }
    })();
  }, [id]);

  const addTag = () => { const t = tagInput.trim(); if (t && !form.tags.includes(t)) { update("tags", [...form.tags, t]); setTagInput(""); } };
  const removeTag = (tag: string) => update("tags", form.tags.filter((t) => t !== tag));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); setSaving(true);
    try {
      const res = await apiFetch(`/admin/lessons/${id}`, {
        method: "PUT", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (json.success) navigate({ to: "/admin/lessons" });
      else setError(json.error || json.message || "Failed to update");
    } catch (e: any) { setError(e.message || "Network error"); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this lesson? Cannot be undone.")) return;
    setSaving(true);
    try {
      const res = await apiFetch(`/admin/lessons/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) navigate({ to: "/admin/lessons" });
      else setError(json.error || "Failed to delete");
    } catch (e: any) { setError(e.message || "Network error"); }
    finally { setSaving(false); }
  };

  if (loading) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl mx-auto space-y-6">
        <div className="h-6 w-48 dark:bg-[#1e2a4a] bg-gray-200 rounded animate-pulse" />
        <div className="rounded-2xl dark:bg-[#101828]/80 bg-white/80 border dark:border-[#1e2a4a] border-gray-200 p-6 space-y-5 animate-pulse">
          {[1, 2, 3, 4].map((i) => (
            <div key={i}>
              <div className="h-3 w-20 dark:bg-[#1e2a4a] bg-gray-200 rounded mb-2" />
              <div className={`h-10 w-full dark:bg-[#1e2a4a] bg-gray-200 rounded ${i === 3 ? "h-32" : ""} ${i === 4 ? "h-48" : ""}`} />
            </div>
          ))}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Link to="/admin/lessons" className="inline-flex items-center gap-1 text-xs dark:text-gray-400 text-gray-500 hover:text-purple-400 transition-colors mb-2">
            <ArrowLeft className="w-3 h-3" /> Back to Lessons
          </Link>
          <h1 className="text-2xl font-bold dark:text-white text-gray-900">Edit Lesson</h1>
          <p className="text-sm dark:text-gray-400 text-gray-500 mt-1">Update lesson content and settings</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="rounded-2xl dark:bg-[#101828]/80 bg-white/80 backdrop-blur-lg border dark:border-[#1e2a4a] border-gray-200 p-6 space-y-5">
        {error && <div className="rounded-xl bg-red-500/10 border border-red-500/30 px-4 py-3 text-sm text-red-400">{error}</div>}

        <div>
          <label className={labelCls}>Title <span className="text-red-400">*</span></label>
          <input required value={form.title} onChange={(e) => update("title", e.target.value)} className={inp} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Level <span className="text-red-400">*</span></label>
            <select value={form.level} onChange={(e) => update("level", e.target.value)} className={selCls}>
              {levels.map((l) => <option key={l} value={l}>{l}</option>)}
            </select>
            <div className={`mt-2 h-1 rounded-full bg-gradient-to-r ${levelColors[form.level] || ""}`} />
          </div>
          <div>
            <label className={labelCls}>Category <span className="text-red-400">*</span></label>
            <select value={form.category} onChange={(e) => update("category", e.target.value)} className={selCls}>
              {categories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className={labelCls}>Description <span className="text-red-400">*</span></label>
          <textarea required value={form.description} onChange={(e) => update("description", e.target.value)}
            className={`${inp} min-h-[80px] resize-y`} />
        </div>

        <div>
          <label className={labelCls}>Content <span className="text-red-400">*</span></label>
          <textarea required value={form.content} onChange={(e) => update("content", e.target.value)}
            className={`${inp} min-h-[200px] resize-y font-mono text-xs leading-relaxed`} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Order <span className="text-red-400">*</span></label>
            <input type="number" min={1} required value={form.order} onChange={(e) => update("order", parseInt(e.target.value) || 1)} className={inp} />
          </div>
          <div>
            <label className={labelCls}>Duration (minutes) <span className="text-red-400">*</span></label>
            <input type="number" min={1} required value={form.estimatedDuration} onChange={(e) => update("estimatedDuration", parseInt(e.target.value) || 15)} className={inp} />
          </div>
        </div>

        <div>
          <label className={labelCls}>Tags</label>
          <div className="flex gap-2 mb-2">
            <input value={tagInput} onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }}
              className={inp} placeholder="Type a tag and press Enter" />
            <button type="button" onClick={addTag} className="px-3 py-2 rounded-xl bg-purple-600/20 text-purple-400 text-xs font-semibold hover:bg-purple-600/30 transition-all shrink-0">Add</button>
          </div>
          {form.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {form.tags.map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30 text-[10px] font-medium">
                  {tag}
                  <button type="button" onClick={() => removeTag(tag)} className="hover:text-red-400 transition-colors"><X className="w-3 h-3" /></button>
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button type="button" onClick={() => update("isPublished", !form.isPublished)}
            className={`relative w-10 h-5 rounded-full transition-all ${form.isPublished ? "bg-emerald-500" : "dark:bg-[#1e2a4a] bg-gray-300"}`}>
            <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${form.isPublished ? "left-5" : "left-0.5"}`} />
          </button>
          <span className="text-xs dark:text-gray-300 text-gray-600">{form.isPublished ? "Published" : "Draft"}</span>
        </div>

        <div className="flex items-center justify-between pt-2 border-t dark:border-[#1e2a4a] border-gray-200">
          <div className="flex items-center gap-3">
            <button type="submit" disabled={saving}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold hover:opacity-90 transition-all disabled:opacity-50 shadow-lg shadow-purple-500/25">
              {saving ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
              {saving ? "Saving..." : "Save Changes"}
            </button>
            <Link to="/admin/lessons" className="px-4 py-2.5 rounded-xl border dark:border-[#1e2a4a] border-gray-200 text-sm dark:text-gray-300 text-gray-600 hover:dark:bg-white/5 hover:bg-gray-100 transition-all">Cancel</Link>
          </div>
          <button type="button" onClick={handleDelete}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600/20 text-red-400 border border-red-500/30 text-sm font-semibold hover:bg-red-600/30 transition-all">
            <Trash2 className="w-4 h-4" /> Delete
          </button>
        </div>
      </form>
    </motion.div>
  );
}