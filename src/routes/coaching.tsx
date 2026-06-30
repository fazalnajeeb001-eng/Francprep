import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/coaching")({
  component: CoachingHub,
});

interface SyllabusData {
  level: string;
  lessonCount: number;
  exerciseCount: number;
}

const levelMeta = [
  { id: "A1", title: "Beginner – Découverte", canDo: "Basic greetings, introductions, everyday needs", icon: "🌱", color: "from-green-400 to-emerald-500" },
  { id: "A2", title: "Elementary – Progrès", canDo: "Simple conversations, travel, past experiences", icon: "🌿", color: "from-teal-400 to-cyan-500" },
  { id: "B1", title: "Intermediate – Indépendance", canDo: "Work, opinions, connected text on familiar topics", icon: "🌳", color: "from-blue-400 to-indigo-500" },
  { id: "B2", title: "Upper-Intermediate – Autonomie", canDo: "Debate, formal register, literary analysis", icon: "🔥", color: "from-indigo-400 to-violet-500" },
  { id: "C1", title: "Advanced – Maîtrise", canDo: "Academic discourse, nuance, specialized fields", icon: "💎", color: "from-violet-400 to-purple-500" },
  { id: "C2", title: "Mastery – Perfectionnement", canDo: "Rhetoric, translation, expert-level critique", icon: "👑", color: "from-purple-400 to-pink-500" },
];

function CoachingHub() {
  const [data, setData] = useState<SyllabusData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
    fetch(`${API}/admin/syllabi`)
      .then(r => r.json())
      .then(res => {
        if (res.success && Array.isArray(res.data)) {
          const mapped = res.data.map((s: any) => ({
            level: s.level,
            lessonCount: s.lessons?.length || 0,
            exerciseCount: 0,
          }));
          // Count exercises per level
          Promise.all(
            mapped.map(async (m: SyllabusData) => {
              const lr = await fetch(`${API}/lessons?level=${m.level}&limit=1`);
              const ld = await lr.json();
              return { ...m, totalLessons: ld.pagination?.total || 0 };
            })
          ).then(setData);
        } else {
          setData([]);
        }
      })
      .catch(() => setData([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="mb-12 text-center">
        <span className="inline-block rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
          Coaching Section
        </span>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Choose Your Level
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
          FrancPrep's structured A1–C2 curriculum guides you from absolute beginner to mastery.
          Each level develops reading, writing, listening, and speaking skills through
          comprehensive exercises.
        </p>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading curriculum...</div>
      ) : (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {levelMeta.map((level) => {
              const stats = data.find(d => d.level === level.id);
              return (
                <Link
                  key={level.id}
                  to="/coaching/$level"
                  params={{ level: level.id.toLowerCase() }}
                  className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-1 dark:border-gray-800 dark:bg-gray-900"
                >
                  <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${level.color}`} />
                  <div className="mt-2">
                    <span className="text-3xl">{level.icon}</span>
                    <h2 className="mt-3 text-2xl font-bold">{level.id}</h2>
                    <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">{level.title}</p>
                    <div className="mt-4 flex gap-4 text-xs text-gray-500">
                      <span>{stats?.lessonCount || 0} lessons</span>
                      <span>{stats?.exerciseCount || 0} exercises</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold mb-4">Learning Path Overview</h2>
            <div className="mx-auto max-w-3xl overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Level</th>
                    <th className="px-4 py-3 font-semibold">Title</th>
                    <th className="px-4 py-3 font-semibold">CEFR Can-Do</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                  {levelMeta.map(l => (
                    <tr key={l.id} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                      <td className="px-4 py-3 font-bold">{l.id}</td>
                      <td className="px-4 py-3">{l.title}</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{l.canDo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
