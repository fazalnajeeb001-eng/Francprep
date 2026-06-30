import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/exam")({
  component: ExamPage,
});

const versions = [
  { id: "v1", name: "Version 1", subtitle: "First Steps", desc: "Greetings, introductions, numbers, alphabet" },
  { id: "v2", name: "Version 2", subtitle: "Daily Life", desc: "Family, routine, shopping, directions" },
  { id: "v3", name: "Version 3", subtitle: "Social & Travel", desc: "Hobbies, weather, city, transport" },
  { id: "v4", name: "Version 4", subtitle: "Professional & Health", desc: "Body, health, work, invitations" },
];

function ExamPage() {
  const [practiceMode, setPracticeMode] = useState<"practice" | "full" | null>(null);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          TCF/TEF Exam Simulator
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Prepare for the official French proficiency exams with realistic practice and timed full exams.
        </p>
      </div>

      {/* Practice Mode */}
      <section className="mb-10 rounded-xl border border-indigo-200 bg-indigo-50 p-6 dark:border-indigo-800 dark:bg-indigo-950/30">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-indigo-700 dark:text-indigo-300">Practice Mode</h2>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Quick 12-question warm-up with instant feedback. No timer, no pressure.
            </p>
          </div>
          <Link
            to="/exam/practice"
            className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
          >
            Start Practice
          </Link>
        </div>
      </section>

      {/* Full Exam Mode */}
      <section className="mb-10 rounded-xl border border-amber-200 bg-amber-50 p-6 dark:border-amber-800 dark:bg-amber-950/30">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-amber-700 dark:text-amber-300">Full Exam Mode</h2>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Timed, 100-point exam covering Listening, Reading, Writing, and Speaking. 
              Pass with 50/100 to unlock the next level!
            </p>
          </div>
          <Link
            to="/exam/full"
            className="rounded-lg bg-amber-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-amber-700 transition-colors"
          >
            Start Full Exam
          </Link>
        </div>
      </section>

      {/* Exam Versions */}
      <section>
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Available Exam Versions</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {versions.map((v) => (
            <div key={v.id} className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
              <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">{v.name}</div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white">{v.subtitle}</h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{v.desc}</p>
              <div className="mt-3 flex gap-2">
                <Link to="/exam/practice" className="text-xs font-medium text-indigo-600 hover:underline dark:text-indigo-400">Practice</Link>
                <span className="text-gray-300 dark:text-gray-600">|</span>
                <Link to="/exam/full" className="text-xs font-medium text-amber-600 hover:underline dark:text-amber-400">Full Exam</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Gatekeeper Info */}
      <section className="mt-10 rounded-lg border border-gray-200 bg-gray-50 p-5 dark:border-gray-700 dark:bg-gray-900">
        <h2 className="font-bold text-gray-900 dark:text-white">How Progression Works</h2>
        <ul className="mt-2 space-y-1 text-sm text-gray-600 dark:text-gray-400">
          <li>\u2022 Complete all chapters in a level through Coaching</li>
          <li>\u2022 Take the Full Exam to prove your mastery</li>
          <li>\u2022 Score <strong>50/100</strong> total AND <strong>5/25</strong> in each section to pass</li>
          <li>\u2022 Passing unlocks the next CEFR level</li>
        </ul>
      </section>
    </div>
  );
}