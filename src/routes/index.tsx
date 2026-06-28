import { createFileRoute, Link } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { readFile } from "node:fs/promises";

// Read the business name at request time
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

const levels = [
  { id: "a1", name: "A1 – Beginner", desc: "Start from zero: greetings, daily life, essential needs" },
  { id: "a2", name: "A2 – Elementary", desc: "Travel, health, hobbies, past experiences" },
  { id: "b1", name: "B1 – Intermediate", desc: "Work, media, expressing opinions with confidence" },
  { id: "b2", name: "B2 – Upper Intermediate", desc: "Debate, formal register, literary analysis" },
  { id: "c1", name: "C1 – Advanced", desc: "Academic discourse, nuance, specialized fields" },
  { id: "c2", name: "C2 – Mastery", desc: "Rhetoric, translation, expert-level critique" },
];

function Home() {
  const businessName = Route.useLoaderData();
  return (
    <div>
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-4 py-20 text-center">
        <span className="inline-block rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
          Coming Soon
        </span>
        <h1 className="mt-6 text-5xl font-bold tracking-tight sm:text-7xl">
          {businessName || "FrancPrep"}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
          Your structured path from absolute beginner to C2 mastery.
          Comprehensive A1–C2 curriculum with reading, writing, listening, and speaking
          exercises — plus a dedicated TCF/TEF exam simulator.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/coaching"
            className="rounded-xl bg-indigo-600 px-6 py-3 font-medium text-white shadow-sm transition hover:bg-indigo-700"
          >
            Start Learning
          </Link>
          <Link
            to="/coaching"
            className="rounded-xl border border-gray-300 px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            View Curriculum
          </Link>
        </div>
      </section>

      {/* Curriculum Overview */}
      <section className="border-t border-gray-200 bg-gray-50 py-20 dark:border-gray-800 dark:bg-gray-900">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-center text-3xl font-bold">The Complete A1–C2 Path</h2>
          <p className="mx-auto mt-2 max-w-2xl text-center text-gray-600 dark:text-gray-400">
            Every level covers four essential skills with deep-dive chapters and
            concept-based exercises designed for real progress.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {levels.map((lvl) => (
              <Link
                key={lvl.id}
                to="/coaching/$level"
                params={{ level: lvl.id }}
                className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md hover:-translate-y-0.5 dark:border-gray-700 dark:bg-gray-800"
              >
                <h3 className="font-bold text-indigo-600 dark:text-indigo-400">{lvl.name}</h3>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{lvl.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Feature */}
      <section className="mx-auto max-w-5xl px-4 py-20">
        <h2 className="text-center text-3xl font-bold">Four Skills, One Platform</h2>
        <p className="mx-auto mt-2 max-w-2xl text-center text-gray-600 dark:text-gray-400">
          Every concept includes exercises across all four language skills.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {[
            { icon: "📖", title: "Reading", desc: "Comprehension passages, real-world documents, literary extracts graded to your level." },
            { icon: "✍️", title: "Writing", desc: "Guided prompts, fill-in-the-blank, short answers, and creative writing tasks." },
            { icon: "🎧", title: "Listening", desc: "Dictation exercises, comprehension questions, and audio-based activities." },
            { icon: "🗣️", title: "Speaking", desc: "Roleplay scenarios, pronunciation prompts, and structured conversation practice." },
          ].map((skill) => (
            <div key={skill.title} className="rounded-xl border border-gray-200 p-5 dark:border-gray-800">
              <span className="text-2xl">{skill.icon}</span>
              <h3 className="mt-2 font-bold">{skill.title}</h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{skill.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-gray-200 py-16 text-center dark:border-gray-800">
        <div className="mx-auto max-w-2xl px-4">
          <h2 className="text-3xl font-bold">Ready to begin your French journey?</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Start at any level — whether you're a complete beginner or polishing your
            mastery, FrancPrep has the structure you need.
          </p>
          <Link
            to="/coaching"
            className="mt-6 inline-block rounded-xl bg-indigo-600 px-8 py-3 font-medium text-white shadow-sm transition hover:bg-indigo-700"
          >
            Explore the Curriculum
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8 text-center text-sm text-gray-400 dark:border-gray-800 dark:text-gray-600">
        Built with{" "}
        <a href="https://cto.new" className="underline hover:text-gray-600 dark:hover:text-gray-400">
          cto.new
        </a>
      </footer>
    </div>
  );
}