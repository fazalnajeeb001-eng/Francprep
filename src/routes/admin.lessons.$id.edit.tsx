import { createFileRoute, Link, useNavigate, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { apiFetch } from "~/lib/apiFetch";
import { motion } from "framer-motion";
import { ArrowLeft, Save, Trash2, X, Plus } from "lucide-react";

export const Route = createFileRoute("/admin/lessons/$id/edit")({ component: LessonEditPage });

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

type Tab = "basic" | "sections" | "vocab";

function LessonEditPage() {
  const navigate = useNavigate();
  const { id } = useParams({ from: Route.id });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("basic");
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

  const [vocabItems, setVocabItems] = useState<any[]>([]);

  const update = (field: string, value: any) => setForm({ ...form, [field]: value });

  useEffect(() => {
    (async () => {
      try {
        const res = await apiFetch(`/admin/lessons/${id}`);
        const json = await res.json();
        if (json.success && json.data) {
          const d = json.data;
          setForm({
            title: d.title || "",
            level: d.level || "A1",
            skill: d.skill || "INT",
            anchorSkill: d.anchorSkill || "integrated",
            order: d.order || 1,
            durationMinutes: d.durationMinutes || d.estimatedDuration || 20,
            isPublished: d.isPublished || false,
            grammarFocus: d.grammarFocus || "",
            vocabularyFocus: d.vocabularyFocus || "",
            objectives: d.objectives || [],
            warmUpContent: d.warmUp?.content || "",
            explanationContent: d.explanation?.content || "",
            miniReviewContent: d.miniReview?.content || "",
            selfAssessment: d.selfAssessment || [],
          });
          if (d.vocabItems?.length > 0) setVocabItems(d.vocabItems);
        } else setError("Lesson not found");
      } catch (e: any) { setError(e.message || "Failed to load"); }
      finally { setLoading(false); }
    })();
  }, [id]);

  const addObjective = () => {
    const t = objectiveInput.trim();
    if (t && !form.objectives.includes(t)) {
      update("objectives", [...form.objectives, t]);
      setObjectiveInput("");
    }
  };
  const removeObjective = (obj: string) => update("objectives", form.objectives.filter((o) => o !== obj));

  const updateVocab = (idx: number, field: string, value: any) => {
    const next = [...vocabItems]; next[idx] = { ...next[idx], [field]: value }; setVocabItems(next);
  };
  const addVocab = () => setVocabItems([...vocabItems, { french: "", english: "", pronunciation: "", example: "" }]);
  const removeVocab = (idx: number) => setVocabItems(vocabItems.filter((_, i) => i !== idx));

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); setSaving(true);
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
        description: form.title,
        estimatedDuration: form.durationMinutes,
      };
      if (form.warmUpContent) body.warmUp = { content: form.warmUpContent };
      else body.warmUp = undefined;
      if (form.explanationContent) body.explanation = { content: form.explanationContent };
      else body.explanation = undefined;
      if (form.miniReviewContent) body.miniReview = { content: form.miniReviewContent };
      else body.miniReview = undefined;
      body.selfAssessment = form.selfAssessment;
      if (vocabItems.length > 0) body.vocabItems = vocabItems;

      const res = await apiFetch(`/admin/lessons/${id}`, {
        method: "PUT", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      if (!json.success) setError(json.error || json.message || "Failed to update");
      else {
        setSuccessMsg(json.message || "Changes saved as a staging draft revision!");
        setTimeout(() => setSuccessMsg(""), 5000);
      }
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

  const tabs: { key: Tab; label: string; count?: number }[] = [
    { key: "basic", label: "Basic Info" },
    { key: "sections", label: "Sections" },
    { key: "vocab", label: "Vocabulary", count: vocabItems.length },
  ];

  if (loading) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto space-y-6">
        <div className="h-6 w-48 dark:bg-[#1e2a4a] bg-gray-200 rounded animate-pulse" />
        <div className="rounded-2xl dark:bg-[#101828]/80 bg-white/80 border dark:border-[#1e2a4a] border-gray-200 p-6 space-y-5 animate-pulse">
          {[1, 2, 3].map((i) => <div key={i} className="h-10 w-full dark:bg-[#1e2a4a] bg-gray-200 rounded" />)}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Link to="/admin/lessons" className="inline-flex items-center gap-1 text-xs dark:text-gray-400 text-gray-500 hover:text-purple-400 transition-colors mb-2">
            <ArrowLeft className="w-3 h-3" /> Back to Lessons
          </Link>
          <h1 className="text-2xl font-bold dark:text-white text-gray-900">Edit Lesson</h1>
          <p className="text-sm dark:text-gray-400 text-gray-500 mt-1">{form.title || "Untitled"}</p>
        </div>
      </div>

      {error && <div className="rounded-xl bg-red-500/10 border border-red-500/30 px-4 py-3 text-sm text-red-400">{error}</div>}
      {successMsg && (
        <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/30 px-4 py-3 text-sm text-emerald-400 flex items-center gap-2">
          <span className="font-bold">✓</span> {successMsg}
        </div>
      )}

      <div className="flex gap-1 dark:bg-[#101828]/80 bg-white/80 backdrop-blur-lg border dark:border-[#1e2a4a] border-gray-200 rounded-2xl p-1.5">
        {tabs.map((t) => (
          <button key={t.key} onClick={() => setActiveTab(t.key)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === t.key ? "bg-purple-500/20 text-purple-400 border border-purple-500/30" : "dark:text-gray-400 text-gray-500 hover:text-purple-400"
            }`}>
            {t.label}
            {t.count !== undefined && <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-purple-500/10">{t.count}</span>}
          </button>
        ))}
      </div>

      {activeTab === "basic" && (
        <form onSubmit={handleSave} className="rounded-2xl dark:bg-[#101828]/80 bg-white/80 backdrop-blur-lg border dark:border-[#1e2a4a] border-gray-200 p-6 space-y-5">
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
            <input value={form.grammarFocus} onChange={(e) => update("grammarFocus", e.target.value)} className={inp} />
          </div>
          <div>
            <label className={labelCls}>Vocabulary Focus</label>
            <input value={form.vocabularyFocus} onChange={(e) => update("vocabularyFocus", e.target.value)} className={inp} />
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
          <div className="flex items-center justify-between pt-2 border-t dark:border-[#1e2a4a] border-gray-200">
            <button type="submit" disabled={saving}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold hover:opacity-90 transition-all disabled:opacity-50 shadow-lg shadow-purple-500/25">
              {saving ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
              {saving ? "Saving..." : "Save Changes"}
            </button>
            <button type="button" onClick={handleDelete}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600/20 text-red-400 border border-red-500/30 text-sm font-semibold hover:bg-red-600/30 transition-all">
              <Trash2 className="w-4 h-4" /> Delete
            </button>
          </div>
        </form>
      )}

      {activeTab === "sections" && (
        <form onSubmit={handleSave} className="rounded-2xl dark:bg-[#101828]/80 bg-white/80 backdrop-blur-lg border dark:border-[#1e2a4a] border-gray-200 p-6 space-y-5">
          <div>
            <label className={labelCls}>Warm-Up Content</label>
            <textarea value={form.warmUpContent} onChange={(e) => update("warmUpContent", e.target.value)}
              className={`${inp} min-h-[80px] resize-y`} placeholder="Opening question or activity..." />
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
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      )}

      {activeTab === "vocab" && (
        <div className="rounded-2xl dark:bg-[#101828]/80 bg-white/80 backdrop-blur-lg border dark:border-[#1e2a4a] border-gray-200 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold dark:text-white text-gray-900">Vocabulary ({vocabItems.length})</h2>
            <button onClick={addVocab} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-purple-500/20 text-purple-400 text-xs font-semibold hover:bg-purple-500/30 transition-all">
              <Plus className="w-3 h-3" /> Add Word
            </button>
          </div>
          {vocabItems.length === 0 && <p className="text-xs dark:text-gray-400 text-gray-500 text-center py-4">No vocabulary words yet.</p>}
          <div className="space-y-3">
            {vocabItems.map((v, i) => (
              <div key={i} className="flex items-start gap-2 p-3 rounded-xl dark:bg-[#070B17] bg-gray-50 dark:border-[#1e2a4a] border-gray-200 border">
                <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <input value={v.french} onChange={(e) => updateVocab(i, "french", e.target.value)} className={inp} placeholder="French" />
                  <input value={v.english} onChange={(e) => updateVocab(i, "english", e.target.value)} className={inp} placeholder="English" />
                  <input value={v.pronunciation} onChange={(e) => updateVocab(i, "pronunciation", e.target.value)} className={inp} placeholder="Pronunciation" />
                  <input value={v.example} onChange={(e) => updateVocab(i, "example", e.target.value)} className={inp} placeholder="Example sentence" />
                </div>
                <button onClick={() => removeVocab(i)} className="p-2 rounded-lg hover:bg-red-500/10 transition-colors shrink-0"><Trash2 className="w-3.5 h-3.5 text-red-400" /></button>
              </div>
            ))}
          </div>
          {vocabItems.length > 0 && (
            <div className="flex items-center gap-3 pt-2 border-t dark:border-[#1e2a4a] border-gray-200">
              <button type="button" onClick={handleSave} disabled={saving}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold hover:opacity-90 transition-all disabled:opacity-50 shadow-lg shadow-purple-500/25">
                {saving ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
                {saving ? "Saving..." : "Save Vocabulary"}
              </button>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}
