import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { apiFetch } from "~/lib/apiFetch";
import { motion } from "framer-motion";
import { FileText, Search, Filter, Plus, ChevronLeft, ChevronRight, Clock, BookOpen } from "lucide-react";

export const Route = createFileRoute("/admin/lessons")({ component: AdminLessonsPage });

interface Lesson {
  _id: string;
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
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [levelFilter, setLevelFilter] = useState<string>("");
  const [search, setSearch] = useState("");
  const [searchTimeout, setSearchTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);

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

  useEffect(() => { fetchLessons(page, search); }, [page, levelFilter]);

  const handleSearch = (val: string) => {
    setSearch(val);
    if (searchTimeout) clearTimeout(searchTimeout);
    setSearchTimeout(setTimeout(() => {
      setPage(1);
      fetchLessons(1, val);
    }, 400));
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold dark:text-white text-gray-900">Lesson Management</h1>
          <p className="text-sm dark:text-gray-400 text-gray-500 mt-1">{total} total lessons</p>
        </div>
        <Link to="/admin/lessons/new" className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold hover:opacity-90 transition-all shadow-lg shadow-purple-500/25">
          <Plus className="w-4 h-4" /> New Lesson
        </Link>
      </div>

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
            <div className="flex items-center justify-between">
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
    </motion.div>
  );
}