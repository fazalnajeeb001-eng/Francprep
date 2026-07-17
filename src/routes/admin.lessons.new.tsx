import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { apiFetch } from "~/lib/apiFetch";
import { motion } from "framer-motion";
import { ArrowLeft, Save, X } from "lucide-react";

export const Route = createFileRoute("/admin/lessons/new")({ component: LessonFormPage });

const levels = ["A0", "A1", "A2", "B1", "B2", "C1", "C2"] as const;
const skills = ["R", "W", "L", "S", "INT", "REV"] as const;
const anchorSkills = ["reading", "writing", "listening", "speaking", "integrated", "review"] as const;

const levelColors: Record<string, string> = {
  A0: "from-gray-500 to-gray-400", A1: "from-emerald-500 to-teal-500", A2: "from-teal-500 to-cyan-500",
  B1: "from-blue-500 to-indigo-500", B2: "from-indigo-500 to-purple-500",
  C1: "from-purple-500 to-pink-500", C2: "from-pink-500 to-rose-500",
};

const inp = "w-full rounded-xl dark:bg-[#070B17] bg-white dark:border-[#1e2a4a] border-gray-300 border px-4 py-2.5 text-sm dark:text-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all";
const labelCls = "block text-xs font-medium dark:text-gray-300 text-gray-600 mb-1";
const selCls = "w-full rounded-xl dark:bg-[#070B17] bg-white dark:border-[#1e2a4a] border-gray-300 border px-4 py-2.5 text-sm dark:text-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all";

function LessonFormPage() {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [objectiveInput, setObjectiveInput] = useState("");

  const [form, setForm] = useState({
    title: "",
    level: "A1",
    skill: "INT",
    anchorSkill: "integrated",
    order: 1,
    durationMinutes: 20,
    isPublished: false,
    grammarFocus: "",
    vocabularyFocus: "",
    objectives: [] as string[],
    warmUpContent: "",
    explanationContent: "",
    miniReviewContent: "",
    selfAssessment: [] as string[],
  });

  const update = (field: string, value: any) => setForm({ ...form, [field]: value });

  const addObjective = () => {
    const t = objectiveInput.trim();
    if (t && !form.objectives.includes(t)) {
      update("objectives", [...form.objectives, t]);
      setObjectiveInput("");
    }
  };
  const removeObjective = (obj: string) => update("objectives", form.objectives.filter((o) => o !== obj));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const body: any = {
        title: form.title,
        level: form.level,
        skill: form.skill,
        anchorSkill: form.anchorSkill,
        order: form.order,
        durationMinutes: form.durationMinutes,
        isPublished: form.isPublished,
        grammarFocus: form.grammarFocus,
        vocabularyFocus: form.vocabularyFocus,
        objectives: form.objectives,
        category: "grammar",
        description: form.title,
        content: "",
        estimatedDuration: form.durationMinutes,
      };
      if (form.warmUpContent) body.warmUp = { content: form.warmUpContent };
      if (form.explanationContent) body.explanation = { content: form.explanationContent };
      if (form.miniReviewContent) body.miniReview = { content: form.miniReviewContent };
      if (form.selfAssessment.length > 0) body.selfAssessment = form.selfAssessment;

      const res = await apiFetch("/admin/lessons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      if (json.success) {
        navigate({ to: "/admin/lessons" });
      } else {
        setError(json.error || json.message || "Failed to create lesson");
      }
    } catch (e: any) {
      setError(e.message || "Network error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Link to="/admin/lessons" className="inline-flex items-center gap-1 text-xs dark:text-gray-400 text-gray-500 hover:text-purple-400 transition-colors mb-2">
            <ArrowLeft className="w-3 h-3" /> Back to Lessons
          </Link>
          <h1 className="text-2xl font-bold dark:text-white text-gray-900">Create Lesson</h1>
          <p className="text-sm dark:text-gray-400 text-gray-500 mt-1">Build a new lesson for the curriculum</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="rounded-2xl dark:bg-[#101828]/80 bg-white/80 backdrop-blur-lg border dark:border-[#1e2a4a] border-gray-200 p-6 space-y-5">
        {error && (
          <div className="rounded-xl bg-red-500/10 border border-red-500/30 px-4 py-3 text-sm text-red-400">{error}</div>
        )}

        <div>
          <label className={labelCls}>Title <span className="text-red-400">*</span></label>
          <input required value={form.title} onChange={(e) => update("title", e.target.value)} className={inp} placeholder="e.g. Greetings and First Contact" />
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
            <label className={labelCls}>Skill Code</label>
            <select value={form.skill} onChange={(e) => update("skill", e.target.value)} className={selCls}>
              {skills.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Anchor Skill</label>
            <select value={form.anchorSkill} onChange={(e) => update("anchorSkill", e.target.value)} className={selCls}>
              {anchorSkills.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className={labelCls}>Order</label>
            <input type="number" min={1} value={form.order} onChange={(e) => update("order", parseInt(e.target.value) || 1)} className={inp} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Duration (minutes)</label>
            <input type="number" min={1} value={form.durationMinutes} onChange={(e) => update("durationMinutes", parseInt(e.target.value) || 20)} className={inp} />
          </div>
          <div className="flex items-end pb-1">
            <button type="button" onClick={() => update("isPublished", !form.isPublished)}
              className={`relative w-10 h-5 rounded-full transition-all ${form.isPublished ? "bg-emerald-500" : "dark:bg-[#1e2a4a] bg-gray-300"}`}>
              <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${form.isPublished ? "left-5" : "left-0.5"}`} />
            </button>
            <span className="ml-2 text-xs dark:text-gray-300 text-gray-600">{form.isPublished ? "Published" : "Draft"}</span>
          </div>
        </div>

        <div>
          <label className={labelCls}>Grammar Focus</label>
          <input value={form.grammarFocus} onChange={(e) => update("grammarFocus", e.target.value)} className={inp} placeholder="e.g. Formal greetings, subject pronouns" />
        </div>

        <div>
          <label className={labelCls}>Vocabulary Focus</label>
          <input value={form.vocabularyFocus} onChange={(e) => update("vocabularyFocus", e.target.value)} className={inp} placeholder="e.g. Greetings, introductions, polite expressions" />
        </div>

        <div>
          <label className={labelCls}>Objectives</label>
          <div className="flex gap-2 mb-2">
            <input value={objectiveInput} onChange={(e) => setObjectiveInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addObjective(); } }}
              className={inp} placeholder="Type an objective and press Enter" />
            <button type="button" onClick={addObjective} className="px-3 py-2 rounded-xl bg-purple-600/20 text-purple-400 text-xs font-semibold hover:bg-purple-600/30 transition-all shrink-0">Add</button>
          </div>
          {form.objectives.length > 0 && (
            <div className="space-y-1">
              {form.objectives.map((obj, i) => (
                <div key={i} className="flex items-center gap-2 text-xs dark:text-gray-300 text-gray-600">
                  <span className="text-purple-400">•</span>{obj}
                  <button type="button" onClick={() => removeObjective(obj)} className="ml-auto hover:text-red-400 transition-colors"><X className="w-3 h-3" /></button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <label className={labelCls}>Warm-Up Content</label>
          <textarea value={form.warmUpContent} onChange={(e) => update("warmUpContent", e.target.value)}
            className={`${inp} min-h-[80px] resize-y`} placeholder="Opening question or activity to engage students..." />
        </div>

        <div>
          <label className={labelCls}>Lesson Explanation</label>
          <textarea value={form.explanationContent} onChange={(e) => update("explanationContent", e.target.value)}
            className={`${inp} min-h-[120px] resize-y`} placeholder="Main lesson content..." />
        </div>

        <div>
          <label className={labelCls}>Mini Review</label>
          <textarea value={form.miniReviewContent} onChange={(e) => update("miniReviewContent", e.target.value)}
            className={`${inp} min-h-[80px] resize-y`} placeholder="Quick review of key points..." />
        </div>

        <div className="flex items-center gap-3 pt-2 border-t dark:border-[#1e2a4a] border-gray-200">
          <button type="submit" disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold hover:opacity-90 transition-all disabled:opacity-50 shadow-lg shadow-purple-500/25">
            {saving ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? "Saving..." : "Create Lesson"}
          </button>
          <Link to="/admin/lessons" className="px-4 py-2.5 rounded-xl border dark:border-[#1e2a4a] border-gray-200 text-sm dark:text-gray-300 text-gray-600 hover:dark:bg-white/5 hover:bg-gray-100 transition-all">Cancel</Link>
        </div>
      </form>
    </motion.div>
  );
}
