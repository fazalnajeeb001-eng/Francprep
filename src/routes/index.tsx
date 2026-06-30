import { createFileRoute, Link } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { readFile } from "node:fs/promises";

const getBusinessName = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const cfg = JSON.parse(await readFile("site.json", "utf8")) as {
      businessName?: string;
    };
    return cfg.businessName?.trim() ?? "";
  } catch {
    return "";
  }
});

export const Route = createFileRoute("/")({
  loader: () => getBusinessName(),
  component: Home,
});

function Home() {
  const businessName = Route.useLoaderData();

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      {/* Hero */}
      <div className="mb-16 text-center">
        <span className="inline-block rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
          {businessName || "FrancPrep"}
        </span>
        <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl">
          Master French, Pass Your Exam
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
          Prepare for TCF/TEF Canada with realistic exam simulators and a structured
          A1 to C2 coaching curriculum.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid gap-8 sm:grid-cols-2">
        {/* Exam Simulator */}
        <Link
          to="/exam"
          className="group rounded-2xl border border-indigo-200 bg-white p-8 shadow-sm transition-all hover:shadow-md hover:-translate-y-1 dark:border-indigo-800 dark:bg-gray-900"
        >
          <div className="mb-4 text-4xl">📝</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            TCF/TEF Exam Simulator
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Practice with realistic questions or take a timed full exam. Track your
            progress across Listening, Reading, Writing, and Speaking sections.
          </p>
          <div className="mt-4 flex gap-3">
            <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300">
              Practice Mode
            </span>
            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700 dark:bg-amber-900 dark:text-amber-300">
              Full Exam
            </span>
          </div>
        </Link>

        {/* Coaching Curriculum */}
        <Link
          to="/coaching"
          className="group rounded-2xl border border-emerald-200 bg-white p-8 shadow-sm transition-all hover:shadow-md hover:-translate-y-1 dark:border-emerald-800 dark:bg-gray-900"
        >
          <div className="mb-4 text-4xl">📚</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Coaching Curriculum
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Follow a structured A1 to C2 learning path. Master grammar, vocabulary,
            and cultural knowledge with comprehensive exercises.
          </p>
          <div className="mt-4 flex gap-3">
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
              A1 Beginner
            </span>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
              A2 → C2
            </span>
          </div>
        </Link>
      </div>

      {/* How It Works */}
      <div className="mt-16">
        <h2 className="mb-8 text-center text-2xl font-bold text-gray-900 dark:text-white">
          How It Works
        </h2>
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 text-center dark:border-gray-700 dark:bg-gray-900">
            <div className="mb-3 text-3xl">1️⃣</div>
            <h3 className="font-bold text-gray-900 dark:text-white">Learn</h3>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Study through structured A1-C2 coaching chapters
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 text-center dark:border-gray-700 dark:bg-gray-900">
            <div className="mb-3 text-3xl">2️⃣</div>
            <h3 className="font-bold text-gray-900 dark:text-white">Practice</h3>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Take practice exams with instant feedback
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 text-center dark:border-gray-700 dark:bg-gray-900">
            <div className="mb-3 text-3xl">3️⃣</div>
            <h3 className="font-bold text-gray-900 dark:text-white">Pass</h3>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Master the TCF/TEF with timed full exams
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}