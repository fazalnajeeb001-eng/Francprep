import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useMemo } from "react";
import { apiFetch } from "~/lib/apiFetch";
import { motion } from "framer-motion";
import {
  Lock,
  Search,
  UserCheck,
  GraduationCap,
  Sliders,
  Save,
  Loader2,
  ArrowLeft,
  Check,
  CheckCircle2,
  FolderTree,
  BookOpen,
  Layers
} from "lucide-react";
import { useTheme } from "~/lib/ThemeContext";

interface StudentUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  isExemptFromGating?: boolean;
  unlockedChapters?: string[];
}

const ALL_MODULE_LEVELS = [
  { code: "A1", label: "Module A1 — Discovery" },
  { code: "A2", label: "Module A2 — Elementary" },
  { code: "B1", label: "Module B1 — Intermediate" },
  { code: "B2", label: "Module B2 — Upper-Intermediate" },
  { code: "C1", label: "Module C1 — Advanced" },
  { code: "C2", label: "Module C2 — Mastery" },
];

export function AdminGatingPage() {
  const { dark } = useTheme();
  const [loading, setLoading] = useState(true);
  const [savingGlobal, setSavingGlobal] = useState(false);
  const [savingStudent, setSavingStudent] = useState(false);
  const [globalMsg, setGlobalMsg] = useState("");
  const [studentMsg, setStudentMsg] = useState("");

  // Global Settings State
  const [gatingSettings, setGatingSettings] = useState({
    gatingMode: "all_locked",
    lockScope: "module",
    passingScorePercentage: 70,
    lockedChapterIds: [] as string[],
  });

  // Students & Search State
  const [students, setStudents] = useState<StudentUser[]>([]);
  const [studentSearch, setStudentSearch] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<StudentUser | null>(null);

  // Per-Student Custom Override State
  const [studentExempt, setStudentExempt] = useState(false);
  const [studentUnlockedChapters, setStudentUnlockedChapters] = useState<string[]>([]);

  const bg = dark ? "bg-[#070B17] text-white" : "bg-[#F8FAFC] text-slate-900";
  const card = dark ? "bg-[#101828]/90 border-white/10" : "bg-white border-slate-200 shadow-sm";
  const txtSec = dark ? "text-gray-400" : "text-slate-600";

  useEffect(() => {
    // Fetch Global Gating Settings
    apiFetch("/admin/settings/gating")
      .then((r) => r.json())
      .then((j) => {
        if (j.success && j.data) {
          setGatingSettings(j.data);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));

    // Fetch Registered Students
    apiFetch("/admin/users")
      .then((r) => r.json())
      .then((j) => {
        if (j.success && Array.isArray(j.data)) {
          setStudents(j.data.filter((u: any) => u.role !== "admin"));
        }
      })
      .catch(() => {});
  }, []);

  // SPACE-AWARE MULTI-TOKEN STUDENT SEARCH
  const filteredStudents = useMemo(() => {
    if (!studentSearch.trim()) return students;
    const tokens = studentSearch.trim().toLowerCase().split(/\s+/);
    return students.filter((s) => {
      const fullName = `${s.firstName || ""} ${s.lastName || ""}`.toLowerCase();
      const email = (s.email || "").toLowerCase();
      return tokens.every((token) => fullName.includes(token) || email.includes(token));
    });
  }, [students, studentSearch]);

  const handleSaveGlobalGating = async () => {
    setSavingGlobal(true);
    setGlobalMsg("");
    try {
      const res = await apiFetch("/admin/settings/gating", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(gatingSettings),
      });
      const json = await res.json();
      if (json.success) setGlobalMsg("Global Module Gate Rules Saved!");
      else setGlobalMsg(json.error || "Failed to save");
    } catch {
      setGlobalMsg("Network error");
    }
    setSavingGlobal(false);
  };

  const handleSelectStudentForEditing = (student: StudentUser) => {
    setSelectedStudent(student);
    setStudentExempt(Boolean(student.isExemptFromGating));
    setStudentUnlockedChapters(student.unlockedChapters || []);
    setStudentMsg("");
  };

  const handleSaveStudentOverride = async () => {
    if (!selectedStudent) return;
    setSavingStudent(true);
    setStudentMsg("");
    try {
      const res = await apiFetch(`/admin/users/${selectedStudent._id}/gating-override`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          isExemptFromGating: studentExempt,
          unlockedChapters: studentUnlockedChapters,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setStudentMsg(`Custom Gate Overrides Saved for ${selectedStudent.firstName}!`);
        setStudents((prev) =>
          prev.map((s) =>
            s._id === selectedStudent._id
              ? { ...s, isExemptFromGating: studentExempt, unlockedChapters: studentUnlockedChapters }
              : s
          )
        );
      } else {
        setStudentMsg(json.error || "Failed to save");
      }
    } catch {
      setStudentMsg("Network error");
    }
    setSavingStudent(false);
  };

  const toggleGlobalLevelLock = (code: string) => {
    setGatingSettings((prev) => {
      const exists = prev.lockedChapterIds.includes(code);
      return {
        ...prev,
        lockedChapterIds: exists
          ? prev.lockedChapterIds.filter((c) => c !== code)
          : [...prev.lockedChapterIds, code],
      };
    });
  };

  const toggleStudentLevelUnlock = (code: string) => {
    setStudentUnlockedChapters((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
    );
  };

  return (
    <div className={`min-h-screen ${bg} p-4 md:p-8 space-y-6 transition-colors duration-300`}>
      <div className="max-w-6xl mx-auto space-y-6">

        {/* ─── HEADER ─── */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-4 border-b border-gray-200 dark:border-white/10">
          <div>
            <Link to="/admin" className="text-xs text-purple-400 hover:underline flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Admin Dashboard
            </Link>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight mt-1 flex items-center gap-3">
              <Sliders className="w-8 h-8 text-amber-400" />
              Module Progression & Gating Control Center
            </h1>
            <p className={`text-xs ${txtSec} mt-1`}>
              Configure global module progression rules, select exact levels/chapters to lock, and create custom per-student overrides.
            </p>
          </div>
        </div>

        {/* 1 DELF EXAM PER MODULE INFO BANNER */}
        <div className="p-4 rounded-2xl border bg-amber-500/10 border-amber-500/20 text-xs space-y-2">
          <span className="font-bold text-amber-400 flex items-center gap-1.5 text-sm">
            <GraduationCap className="w-4 h-4" />
            <span>1 Official DELF / DALF Diagnostic Exam per CEFR Module</span>
          </span>
          <p className="text-amber-200/90 leading-relaxed">
            Students enjoy <strong>100% Free Roam access</strong> to all chapters and lessons inside an unlocked module. Progression gating triggers <strong>only when advancing to the next module</strong> (e.g. A1 ➔ A2 requires passing DELF A1 Exam with 70%+ score).
          </p>
        </div>

        {/* ─── SECTION 1: GLOBAL BASE PROGRESSION RULES ─── */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className={`p-6 rounded-2xl border ${card} space-y-6`}>
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-white/10 pb-3">
            <div>
              <h3 className="text-base font-extrabold flex items-center gap-2">
                <Globe className="w-5 h-5 text-purple-400" /> SECTION 1: Global Base Rules (For All Registered Students)
              </h3>
              <p className={`text-xs ${txtSec} mt-0.5`}>These default rules apply platform-wide to all students unless a custom student override is set below.</p>
            </div>
            <button
              onClick={handleSaveGlobalGating}
              disabled={savingGlobal}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs shadow-lg shadow-amber-500/20 flex items-center gap-1.5 transition-all"
            >
              {savingGlobal ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save Global Rules
            </button>
          </div>

          {/* GLOBAL GATE MODE SELECTOR */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => setGatingSettings({ ...gatingSettings, gatingMode: "all_locked" })}
              className={`p-4 rounded-2xl border text-left transition-all ${
                gatingSettings.gatingMode === "all_locked"
                  ? "bg-purple-600/20 border-purple-500 text-white font-bold shadow-md"
                  : "bg-white/5 border-white/10 text-gray-400 hover:border-purple-500/30"
              }`}
            >
              <div className="text-xs font-black flex items-center gap-1.5">🔒 Strict Gated Progression</div>
              <p className="text-[10px] opacity-80 mt-1">All modules locked by default. Students MUST pass DELF exam to unlock next level.</p>
            </button>

            <button
              type="button"
              onClick={() => setGatingSettings({ ...gatingSettings, gatingMode: "selective_locked" })}
              className={`p-4 rounded-2xl border text-left transition-all ${
                gatingSettings.gatingMode === "selective_locked"
                  ? "bg-amber-500/20 border-amber-500 text-white font-bold shadow-md"
                  : "bg-white/5 border-white/10 text-gray-400 hover:border-amber-500/30"
              }`}
            >
              <div className="text-xs font-black flex items-center gap-1.5">🎛️ Selective Level Locking</div>
              <p className="text-[10px] opacity-80 mt-1">Select specific modules below to lock while keeping others open.</p>
            </button>

            <button
              type="button"
              onClick={() => setGatingSettings({ ...gatingSettings, gatingMode: "all_unlocked" })}
              className={`p-4 rounded-2xl border text-left transition-all ${
                gatingSettings.gatingMode === "all_unlocked"
                  ? "bg-emerald-500/20 border-emerald-500 text-white font-bold shadow-md"
                  : "bg-white/5 border-white/10 text-gray-400 hover:border-emerald-500/30"
              }`}
            >
              <div className="text-xs font-black flex items-center gap-1.5">🔓 Free Roam Mode</div>
              <p className="text-[10px] opacity-80 mt-1">Unlocks all modules platform-wide for all students without restrictions.</p>
            </button>
          </div>

          {/* SELECTIVE LEVEL LOCK CHECKLIST */}
          {gatingSettings.gatingMode === "selective_locked" && (
            <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 space-y-3">
              <label className="block text-xs font-bold text-amber-400">Select Specific CEFR Modules to Lock Globally:</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {ALL_MODULE_LEVELS.map((mod) => {
                  const isLocked = gatingSettings.lockedChapterIds.includes(mod.code);
                  return (
                    <button
                      key={mod.code}
                      type="button"
                      onClick={() => toggleGlobalLevelLock(mod.code)}
                      className={`p-2.5 rounded-xl border text-xs font-bold transition-all flex items-center justify-between ${
                        isLocked
                          ? "bg-purple-600/20 border-purple-500 text-white"
                          : "bg-white/5 border-white/10 text-gray-400 hover:border-purple-400"
                      }`}
                    >
                      <span>{mod.label}</span>
                      {isLocked ? <Lock className="w-3.5 h-3.5 text-purple-400" /> : <span className="text-[10px] text-gray-500">Unlocked</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* PASS SCORE THRESHOLD */}
          <div className="pt-3 border-t border-gray-200 dark:border-white/10 space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <span>DELF Exam Pass Requirement Score:</span>
              <span className="text-amber-400 font-mono text-sm">{gatingSettings.passingScorePercentage}%</span>
            </div>
            <input
              type="range"
              min="50"
              max="95"
              step="5"
              value={gatingSettings.passingScorePercentage}
              onChange={(e) => setGatingSettings({ ...gatingSettings, passingScorePercentage: Number(e.target.value) })}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>

          {globalMsg && <p className="text-xs text-emerald-400 font-bold text-right">{globalMsg}</p>}
        </motion.div>

        {/* ─── SECTION 2: PER-STUDENT CUSTOM OVERRIDES ─── */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className={`p-6 rounded-2xl border ${card} space-y-6`}>
          <div className="border-b border-gray-200 dark:border-white/10 pb-3">
            <h3 className="text-base font-extrabold flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-emerald-400" /> SECTION 2: Per-Student Custom Overrides (For Specific Individuals)
            </h3>
            <p className={`text-xs ${txtSec} mt-0.5`}>Search any student by full name (supports spaces) or email to customize their exact access rules.</p>
          </div>

          {/* SEARCH INPUT */}
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search student by name (e.g. 'Fazal Najeeb') or email..."
              value={studentSearch}
              onChange={(e) => setStudentSearch(e.target.value)}
              className="w-full rounded-xl p-2.5 pl-10 text-xs font-mono border dark:bg-[#070B17] dark:border-white/10 text-white outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* STUDENTS LIST TABLE */}
          <div className="max-h-60 overflow-y-auto border border-gray-200 dark:border-white/10 rounded-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-white/5 border-b border-white/10 text-gray-400 uppercase font-mono text-[10px]">
                <tr>
                  <th className="py-2.5 px-3">Student Name</th>
                  <th className="py-2.5 px-3">Email</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-white/10">
                {filteredStudents.map((s) => (
                  <tr
                    key={s._id}
                    className={`hover:bg-white/5 transition-all ${selectedStudent?._id === s._id ? "bg-purple-600/10 font-bold" : ""}`}
                  >
                    <td className="py-2.5 px-3 font-bold">{s.firstName} {s.lastName}</td>
                    <td className="py-2.5 px-3 font-mono text-gray-400">{s.email}</td>
                    <td className="py-2.5 px-3">
                      {s.isExemptFromGating ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          🔓 FULLY EXEMPT
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20">
                          Standard Gated
                        </span>
                      )}
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <button
                        type="button"
                        onClick={() => handleSelectStudentForEditing(s)}
                        className="px-3 py-1 rounded-lg bg-purple-600/20 text-purple-400 font-bold hover:bg-purple-600/30 text-[11px]"
                      >
                        Edit Student Rules
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* EDIT SELECTED STUDENT OVERRIDE PANEL */}
          {selectedStudent && (
            <div className="p-5 rounded-2xl border border-purple-500/30 bg-purple-500/5 space-y-4">
              <div className="flex items-center justify-between border-b border-purple-500/20 pb-3">
                <h4 className="text-sm font-bold text-purple-300">
                  Editing Rules for: {selectedStudent.firstName} {selectedStudent.lastName} ({selectedStudent.email})
                </h4>
                <button
                  type="button"
                  onClick={handleSaveStudentOverride}
                  disabled={savingStudent}
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs shadow"
                >
                  {savingStudent ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : "Save Overrides"}
                </button>
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={studentExempt}
                    onChange={(e) => setStudentExempt(e.target.checked)}
                    className="accent-emerald-500 w-4 h-4"
                  />
                  <span className="text-xs font-bold text-emerald-400">
                    Grant 100% Full Access Exemption (Bypass all module locks for this student)
                  </span>
                </label>

                {!studentExempt && (
                  <div className="pt-3 border-t border-white/10 space-y-2">
                    <label className="block text-xs font-bold text-gray-300">
                      Specifically Unlocked Modules for {selectedStudent.firstName}:
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {ALL_MODULE_LEVELS.map((mod) => {
                        const isUnlocked = studentUnlockedChapters.includes(mod.code);
                        return (
                          <button
                            key={mod.code}
                            type="button"
                            onClick={() => toggleStudentLevelUnlock(mod.code)}
                            className={`p-2 rounded-xl border text-xs font-bold flex items-center justify-between ${
                              isUnlocked
                                ? "bg-emerald-500/20 border-emerald-500 text-emerald-400"
                                : "bg-white/5 border-white/10 text-gray-400"
                            }`}
                          >
                            <span>{mod.code}</span>
                            {isUnlocked ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <span className="text-[10px] text-gray-500">Locked</span>}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {studentMsg && <p className="text-xs text-emerald-400 font-bold text-right">{studentMsg}</p>}
            </div>
          )}
        </motion.div>

      </div>
    </div>
  );
}

function Globe(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  );
}

export const Route = createFileRoute("/admin/gating")({ component: AdminGatingPage });
