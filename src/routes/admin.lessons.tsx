import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { apiFetch } from "~/lib/apiFetch";
import { motion } from "framer-motion";
import {
  Search, Filter, Plus, ChevronLeft, ChevronRight, Clock, BookOpen,
  Lock, Unlock, EyeOff, AlertTriangle, CheckCircle, ShieldCheck, RefreshCw, Trash2
} from "lucide-react";

export const Route = createFileRoute("/admin/lessons")({ component: AdminLessonsPage });

interface Lesson {
  _id: string;
  lessonId: string;
  title: string;
  description: string;
  level: string;
  category: string;
  order: number;
  isPublished: boolean;
  estimatedDuration: number;
  tags: string[];
  createdAt: string;
}

interface PaginatedResponse {
  success: boolean;
  data: Lesson[];
  pagination: { page: number; limit: number; total: number; totalPages: number };
}

const levelColors: Record<string, string> = {
  A1: "from-emerald-500 to-teal-500", A2: "from-teal-500 to-cyan-500",
  B1: "from-blue-500 to-indigo-500", B2: "from-indigo-500 to-purple-500",
  C1: "from-purple-500 to-pink-500", C2: "from-pink-500 to-rose-500",
};

const categoryIcons: Record<string, string> = {
  grammar: "📝", vocabulary: "📖", listening: "🎧", reading: "📚", writing: "✍️", speaking: "🎤",
};

const levels = ["A1", "A2", "B1", "B2", "C1", "C2"];

function AdminLessonsPage() {
  const [activeTab, setActiveTab] = useState<"list" | "access" | "audit">("list");
  
  // Lesson List States
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [levelFilter, setLevelFilter] = useState<string>("");
  const [search, setSearch] = useState("");
  const [searchTimeout, setSearchTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);

  // Access Control States
  const [overrides, setOverrides] = useState<any[]>([]);
  const [cohorts, setCohorts] = useState<string[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [showOverrideModal, setShowOverrideModal] = useState(false);
  const [newOverride, setNewOverride] = useState({
    scope: "global",
    targetType: "level",
    targetId: "A2",
    studentId: "",
    cohortId: "",
    state: "locked"
  });

  // Curriculum Audit States
  const [auditData, setAuditData] = useState<any>(null);
  const [auditing, setAuditing] = useState(false);

  const fetchLessons = async (p: number, q?: string) => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({ page: String(p), limit: "20" });
      if (levelFilter) params.set("level", levelFilter);
      if (q) params.set("search", q);
      const res = await apiFetch(`/admin/lessons?${params}`);
      const json: PaginatedResponse = await res.json();
      if (json.success) {
        setLessons(json.data);
        setPage(json.pagination.page);
        setTotalPages(json.pagination.totalPages);
        setTotal(json.pagination.total);
      } else {
        setError("Failed to load lessons");
      }
    } catch (e: any) {
      setError(e.message || "Network error");
    } finally {
      setLoading(false);
    }
  };

  const fetchOverrides = async () => {
    try {
      const res = await apiFetch("/admin/student-access");
      const json = await res.json();
      if (json.success) setOverrides(json.data || []);
      
      const cohortsRes = await apiFetch("/admin/cohorts");
      const cohortsJson = await cohortsRes.json();
      if (cohortsJson.success) setCohorts(cohortsJson.data || []);

      const usersRes = await apiFetch("/admin/users?limit=100");
      const usersJson = await usersRes.json();
      if (usersJson.success) setStudents(usersJson.data || []);
    } catch {}
  };

  const handleSaveOverride = async () => {
    try {
      const res = await apiFetch("/admin/student-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newOverride),
      });
      const json = await res.json();
      if (json.success) {
        setShowOverrideModal(false);
        fetchOverrides();
      }
    } catch {}
  };

  const handleDeleteOverride = async (id: string) => {
    try {
      const res = await apiFetch(`/admin/student-access/${id}`, {
        method: "DELETE"
      });
      const json = await res.json();
      if (json.success) fetchOverrides();
    } catch {}
  };

  const runAudit = async () => {
    setAuditing(true);
    try {
      const res = await apiFetch("/admin/curriculum/audit");
      const json = await res.json();
      if (json.success) setAuditData(json.data);
    } catch {}
    setAuditing(false);
  };

  useEffect(() => {
    if (activeTab === "list") {
      fetchLessons(page, search);
    } else if (activeTab === "access") {
      fetchOverrides();
    }
  }, [page, levelFilter, activeTab]);

  const handleSearch = (val: string) => {
    setSearch(val);
    if (searchTimeout) clearTimeout(searchTimeout);
    setSearchTimeout(setTimeout(() => {
      setPage(1);
      fetchLessons(1, val);
    }, 400));
  };

  const dark = true;
  const cardBg = dark ? "bg-[#101828]/80 border-[#1e2a4a]" : "bg-white/80 border-gray-200";
  const inp = `w-full rounded-xl ${dark ? "bg-[#070B17] border-[#1e2a4a] text-white" : "bg-white border-gray-300 text-gray-900"} border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all`;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold dark:text-white text-gray-900">In-House Content & Access</h1>
          <p className="text-sm dark:text-gray-400 text-gray-500 mt-1">Manage platform syllabus, locking overrides, and catalog health.</p>
        </div>
        {activeTab === "list" && (
          <Link to="/admin/lessons/new" className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold hover:opacity-90 transition-all shadow-lg shadow-purple-500/25">
            <Plus className="w-4 h-4" /> New Lesson
          </Link>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#1e2a4a] gap-6 text-sm">
        <button onClick={() => setActiveTab("list")}
          className={`pb-3 font-semibold transition-all border-b-2 ${activeTab === "list" ? "border-purple-500 text-purple-400" : "border-transparent text-gray-500 hover:text-gray-300"}`}>
          📚 Published Lessons
        </button>
        <button onClick={() => setActiveTab("access")}
          className={`pb-3 font-semibold transition-all border-b-2 ${activeTab === "access" ? "border-purple-500 text-purple-400" : "border-transparent text-gray-500 hover:text-gray-300"}`}>
          🔒 Access Overrides
        </button>
        <button onClick={() => setActiveTab("audit")}
          className={`pb-3 font-semibold transition-all border-b-2 ${activeTab === "audit" ? "border-purple-500 text-purple-400" : "border-transparent text-gray-500 hover:text-gray-300"}`}>
          🛡️ Curriculum Audit
        </button>
      </div>

      {/* ─── TAB 1: Lessons List ─── */}
      {activeTab === "list" && (
        <>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input type="text" value={search} onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search lessons..."
                className="w-full rounded-xl dark:bg-[#070B17] bg-white dark:border-[#1e2a4a] border-gray-300 border pl-9 pr-4 py-2.5 text-sm dark:text-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all" />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1">
              <button onClick={() => { setLevelFilter(""); setPage(1); }}
                className={`px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                  !levelFilter
                    ? "dark:bg-purple-500/20 dark:text-purple-400 bg-purple-100 text-purple-700 border border-purple-500/30"
                    : "dark:bg-[#101828]/80 bg-white/80 border dark:border-[#1e2a4a] border-gray-200 dark:text-gray-400 text-gray-600 hover:dark:bg-white/5 hover:bg-gray-100"
                }`}>
                <Filter className="w-3 h-3 inline mr-1" /> All
              </button>
              {levels.map(l => (
                <button key={l} onClick={() => { setLevelFilter(l); setPage(1); }}
                  className={`px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                    levelFilter === l
                      ? "dark:bg-purple-500/20 dark:text-purple-400 bg-purple-100 text-purple-700 border border-purple-500/30"
                      : "dark:bg-[#101828]/80 bg-white/80 border dark:border-[#1e2a4a] border-gray-200 dark:text-gray-400 text-gray-600 hover:dark:bg-white/5 hover:bg-gray-100"
                  }`}>
                  {l}
                </button>
              ))}
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-xl bg-red-500/10 border border-red-500/30 px-4 py-3 text-sm text-red-400">
              {error}
              <button onClick={() => fetchLessons(page)} className="ml-2 underline hover:no-underline">Retry</button>
            </div>
          )}

          {/* Loading */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="rounded-2xl dark:bg-[#101828]/80 bg-white/80 border dark:border-[#1e2a4a] border-gray-200 p-5 animate-pulse">
                  <div className="h-4 w-8 dark:bg-[#1e2a4a] bg-gray-200 rounded mb-3" />
                  <div className="h-5 w-48 dark:bg-[#1e2a4a] bg-gray-200 rounded mb-2" />
                  <div className="h-3 w-32 dark:bg-[#1e2a4a] bg-gray-200 rounded" />
                </div>
              ))}
            </div>
          ) : (
            <>
              {/* Lesson cards */}
              {lessons.length === 0 ? (
                <div className="rounded-2xl dark:bg-[#101828]/80 bg-white/80 border dark:border-[#1e2a4a] border-gray-200 p-8 text-center">
                  <BookOpen className="w-12 h-12 mx-auto dark:text-gray-600 text-gray-400 mb-3" />
                  <p className="text-sm dark:text-gray-400 text-gray-500">
                    {search ? "No lessons match your search." : "No lessons found for this level."}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {lessons.map((lesson, i) => (
                    <motion.div key={lesson._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
                      <Link to="/admin/lessons/$id/edit" params={{ id: lesson._id }}
                        className="relative overflow-hidden rounded-2xl dark:bg-[#101828]/80 bg-white/80 backdrop-blur-lg border dark:border-[#1e2a4a] border-gray-200 p-5 transition-all hover:border-purple-500/50 hover:shadow-lg group block">
                      <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${levelColors[lesson.level] || "from-purple-500 to-pink-500"}`} />
                      <div className="flex items-start justify-between mt-1">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full bg-gradient-to-r ${levelColors[lesson.level] || "from-purple-500 to-pink-500"} text-white`}>
                              {lesson.level}
                            </span>
                            <span className="text-xs dark:text-gray-500 text-gray-400">
                              {categoryIcons[lesson.category] || "📄"} {lesson.category}
                            </span>
                          </div>
                          <h3 className="text-sm font-semibold dark:text-gray-200 text-gray-800 truncate group-hover:text-purple-400 transition-colors">
                            {lesson.title}
                          </h3>
                          <p className="text-xs dark:text-gray-500 text-gray-400 mt-1 line-clamp-2">{lesson.description}</p>
                          <div className="flex items-center gap-3 mt-3">
                            <span className="flex items-center gap-1 text-[10px] dark:text-gray-500 text-gray-400">
                              <Clock className="w-3 h-3" /> {lesson.estimatedDuration} min
                            </span>
                            <span className="flex items-center gap-1 text-[10px] dark:text-gray-500 text-gray-400">
                              #Order {lesson.order}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2 shrink-0 ml-3">
                          <span className={`text-[10px] font-semibold px-2 py-1 rounded-full ${
                            lesson.isPublished
                              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                              : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                          }`}>
                            {lesson.isPublished ? "Live" : "Draft"}
                          </span>
                        </div>
                      </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-4">
                  <p className="text-xs dark:text-gray-500 text-gray-400">
                    Page {page} of {totalPages} ({total} lessons)
                  </p>
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
        </>
      )}

      {/* ─── TAB 2: Access Overrides ─── */}
      {activeTab === "access" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold">Lock & Visibility Overrides</h3>
            <button onClick={() => setShowOverrideModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-xl text-sm font-semibold hover:bg-purple-700 transition-all">
              <Plus className="w-4 h-4" /> Add Lock Override
            </button>
          </div>

          <div className={`${cardBg} rounded-2xl overflow-hidden border`}>
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-[#1e2a4a] bg-black/20 text-gray-400 font-semibold text-xs">
                  <th className="p-4">Scope</th>
                  <th className="p-4">Target (Level/Id)</th>
                  <th className="p-4">Cohort/Student</th>
                  <th className="p-4">Access State</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1e2a4a]">
                {overrides.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-gray-500">
                      No custom locks configured. Levels default to A1 unlocked, others locked.
                    </td>
                  </tr>
                ) : (
                  overrides.map((override) => (
                    <tr key={override._id} className="hover:bg-white/5 transition-all">
                      <td className="p-4 capitalize font-semibold text-purple-400">{override.scope}</td>
                      <td className="p-4 font-mono text-xs">{override.targetId} ({override.targetType})</td>
                      <td className="p-4">
                        {override.scope === "student" && override.studentId
                          ? `${override.studentId.firstName} ${override.studentId.lastName} (${override.studentId.email})`
                          : override.scope === "cohort"
                          ? `Cohort: ${override.cohortId}`
                          : "Global"}
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                          override.state === "unlocked"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : override.state === "locked"
                            ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                            : "bg-red-500/10 text-red-400 border border-red-500/20"
                        }`}>
                          {override.state === "unlocked" && <Unlock className="w-3 h-3" />}
                          {override.state === "locked" && <Lock className="w-3 h-3" />}
                          {override.state === "hidden" && <EyeOff className="w-3 h-3" />}
                          {override.state}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button onClick={() => handleDeleteOverride(override._id)}
                          className="p-1.5 rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all"
                          title="Revert to Default">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Modal */}
          {showOverrideModal && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className={`${cardBg} max-w-md w-full rounded-3xl p-6 border shadow-2xl space-y-4`}>
                <h4 className="text-base font-bold">Configure Access Override</h4>
                
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Override Scope</label>
                  <select value={newOverride.scope} onChange={(e) => setNewOverride({...newOverride, scope: e.target.value})} className={inp}>
                    <option value="global">Global (All Students)</option>
                    <option value="cohort">Cohort Specific</option>
                    <option value="student">Individual Student</option>
                  </select>
                </div>

                {newOverride.scope === "cohort" && (
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1">Select Cohort</label>
                    <select value={newOverride.cohortId} onChange={(e) => setNewOverride({...newOverride, cohortId: e.target.value})} className={inp}>
                      <option value="">-- Choose Cohort --</option>
                      {cohorts.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                )}

                {newOverride.scope === "student" && (
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1">Select Student</label>
                    <select value={newOverride.studentId} onChange={(e) => setNewOverride({...newOverride, studentId: e.target.value})} className={inp}>
                      <option value="">-- Choose Student --</option>
                      {students.map(s => <option key={s._id} value={s._id}>{s.firstName} {s.lastName} ({s.email})</option>)}
                    </select>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1">Target Type</label>
                    <select value={newOverride.targetType} onChange={(e) => setNewOverride({...newOverride, targetType: e.target.value as any})} className={inp}>
                      <option value="level">Level</option>
                      <option value="lesson">Lesson ID</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1">Target ID</label>
                    {newOverride.targetType === "level" ? (
                      <select value={newOverride.targetId} onChange={(e) => setNewOverride({...newOverride, targetId: e.target.value})} className={inp}>
                        {levels.map(l => <option key={l} value={l}>{l}</option>)}
                      </select>
                    ) : (
                      <input type="text" placeholder="e.g. a1-ch1-l7" value={newOverride.targetId} onChange={(e) => setNewOverride({...newOverride, targetId: e.target.value})} className={inp} />
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Access State</label>
                  <select value={newOverride.state} onChange={(e) => setNewOverride({...newOverride, state: e.target.value})} className={inp}>
                    <option value="unlocked">🔓 Unlocked / Active</option>
                    <option value="locked">🔒 Locked (Visible but locked)</option>
                    <option value="hidden">👁️‍🗨️ Hidden (Fully hidden)</option>
                  </select>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button onClick={() => setShowOverrideModal(false)}
                    className="px-4 py-2 border border-[#1e2a4a] rounded-xl text-xs font-semibold hover:bg-white/5 transition-all">
                    Cancel
                  </button>
                  <button onClick={handleSaveOverride}
                    className="px-5 py-2 bg-purple-600 text-white rounded-xl text-xs font-semibold hover:bg-purple-700 transition-all">
                    Save Override
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ─── TAB 3: Curriculum Audit ─── */}
      {activeTab === "audit" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold">Curriculum Structure & Integrity Audit</h3>
              <p className="text-xs text-gray-400 mt-1">Audit the entire catalog structure against schemas and check for duplicate vocabulary items.</p>
            </div>
            <button onClick={runAudit} disabled={auditing}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold rounded-xl hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg">
              {auditing ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
              {auditing ? "Auditing Library..." : "Execute Full Audit"}
            </button>
          </div>

          {auditData && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className={`${cardBg} rounded-2xl p-5 border text-center`}>
                  <ShieldCheck className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{auditData.totalLessonsChecked}</div>
                  <div className="text-xs text-gray-500">Published Lessons Audited</div>
                </div>
                <div className={`${cardBg} rounded-2xl p-5 border text-center`}>
                  <AlertTriangle className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold">
                    {auditData.lessons.filter((l: any) => l.errors.length > 0).length}
                  </div>
                  <div className="text-xs text-gray-500">Lessons with Schema Errors</div>
                </div>
                <div className={`${cardBg} rounded-2xl p-5 border text-center`}>
                  <AlertTriangle className="w-8 h-8 text-rose-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{auditData.duplicates.length}</div>
                  <div className="text-xs text-gray-500">Duplicate Vocabulary Words</div>
                </div>
              </div>

              {/* Duplicates list */}
              {auditData.duplicates.length > 0 && (
                <div className={`${cardBg} rounded-2xl p-5 border`}>
                  <h4 className="text-sm font-bold text-rose-400 flex items-center gap-2 mb-3">
                    <AlertTriangle className="w-4 h-4" /> Duplicate Vocabulary Flagged
                  </h4>
                  <p className="text-xs text-gray-500 mb-4">The following vocabulary words are repeated across different lessons. Consider deduplicating them.</p>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {auditData.duplicates.map((dup: any, idx: number) => (
                      <div key={idx} className="flex justify-between items-center text-xs p-2.5 rounded-xl bg-red-500/5 border border-red-500/10">
                        <span className="font-bold text-gray-200">{dup.word}</span>
                        <span className="text-[10px] text-gray-400 font-mono">Appears in: {dup.lessons.join(", ")}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Warnings and errors per lesson */}
              <div className={`${cardBg} rounded-2xl p-5 border`}>
                <h4 className="text-sm font-bold flex items-center gap-2 mb-4">
                  <CheckCircle className="w-4 h-4 text-purple-400" /> Lesson Validation Status
                </h4>
                <div className="space-y-3">
                  {auditData.lessons.map((l: any) => {
                    const hasIssues = l.errors.length > 0 || l.warnings.length > 0;
                    return (
                      <div key={l.lessonId} className={`p-4 rounded-xl border transition-all ${
                        l.errors.length > 0
                          ? "bg-red-500/5 border-red-500/20"
                          : l.warnings.length > 0
                          ? "bg-amber-500/5 border-amber-500/20"
                          : "bg-emerald-500/5 border-emerald-500/10"
                      }`}>
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-gray-800 text-gray-400 font-mono mr-2">{l.level}</span>
                            <span className="text-xs font-bold text-gray-200">{l.title}</span>
                            <span className="text-[10px] text-gray-500 ml-2 font-mono">({l.lessonId})</span>
                          </div>
                          <Link to="/admin/lessons/$id/edit" params={{ id: l.lessonId }}
                            className="text-[10px] font-semibold text-purple-400 hover:text-purple-300">
                            Edit Draft →
                          </Link>
                        </div>
                        {hasIssues ? (
                          <div className="mt-2.5 space-y-1 pl-4 border-l border-gray-700">
                            {l.errors.map((e: string, idx: number) => (
                              <p key={idx} className="text-[10px] text-red-400 flex items-center gap-1.5">
                                ❌ {e}
                              </p>
                            ))}
                            {l.warnings.map((w: string, idx: number) => (
                              <p key={idx} className="text-[10px] text-amber-400 flex items-center gap-1.5">
                                ⚠️ {w}
                              </p>
                            ))}
                          </div>
                        ) : (
                          <p className="text-[10px] text-emerald-400 mt-1 flex items-center gap-1">
                            ✓ Structure matches AJV schema perfectly
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      )}
    </motion.div>
  );
}

function Loader2({ className }: { className?: string }) {
  return <RefreshCw className={`${className} animate-spin`} />;
}