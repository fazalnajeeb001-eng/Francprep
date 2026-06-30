import { createFileRoute, Link } from "@tanstack/react-router";
import { cefrLevels, curriculum, getLevelSummary } from "~/lib/curriculum/index";
import type { CEFRLevel } from "~/lib/curriculum/types";

export const Route = createFileRoute("/coaching")({
  component: CoachingHub,
});

const levelColors: Record<string, string> = {
  A1: "from-green-400 to-emerald-500",
  A2: "from-teal-400 to-cyan-500",
  B1: "from-blue-400 to-indigo-500",
  B2: "from-indigo-400 to-violet-500",
  C1: "from-violet-400 to-purple-500",
  C2: "from-purple-400 to-pink-500",
};

const levelIcons: Record<string, string> = {
  A1: "🌱",
  A2: "🌿",
  B1: "🌳",
  B2: "🔥",
  C1: "💎",
  C2: "👑",
};

function CoachingHub() {
  const summaries = cefrLevels.map(id => ({
    ...getLevelSummary(id as CEFRLevel, curriculum),
    levelId: id,
  }));

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

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cefrLevels.map((levelId) => {
          const summary = summaries.find(s => s.levelId === levelId)!;
          return (
            <Link
              key={levelId}
              to="/coaching/$level"
              params={{ level: levelId.toLowerCase() }}
              className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-1 dark:border-gray-800 dark:bg-gray-900"
            >
              <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${levelColors[levelId]}`} />
              <div className="mt-2">
                <span className="text-3xl">{levelIcons[levelId]}</span>
                <h2 className="mt-3 text-2xl font-bold">{levelId}</h2>
                <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">{summary?.title?.split("–")[0]?.trim()}</p>
                <p className="mt-3 text-sm text-gray-600 line-clamp-2 dark:text-gray-400">
                  {summary?.description}
                </p>
                <div className="mt-4 flex gap-4 text-xs text-gray-500">
                  <span>{summary?.chapterCount} chapters</span>
                  <span>{summary?.conceptCount} concepts</span>
                  <span>{summary?.exerciseCount} exercises</span>
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
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-900"><td className="px-4 py-3 font-bold">A1</td><td className="px-4 py-3">Beginner – Découverte</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Basic greetings, introductions, everyday needs</td></tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-900"><td className="px-4 py-3 font-bold">A2</td><td className="px-4 py-3">Elementary – Progrès</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Simple conversations, travel, past experiences</td></tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-900"><td className="px-4 py-3 font-bold">B1</td><td className="px-4 py-3">Intermediate – Indépendance</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Work, opinions, connected text on familiar topics</td></tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-900"><td className="px-4 py-3 font-bold">B2</td><td className="px-4 py-3">Upper-Intermediate – Autonomie</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Debate, formal register, literary analysis</td></tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-900"><td className="px-4 py-3 font-bold">C1</td><td className="px-4 py-3">Advanced – Maîtrise</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Academic discourse, nuance, specialized fields</td></tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-900"><td className="px-4 py-3 font-bold">C2</td><td className="px-4 py-3">Mastery – Perfectionnement</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Rhetoric, translation, expert-level critique</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}