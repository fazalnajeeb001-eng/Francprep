import { createFileRoute, Link } from "@tanstack/react-router";
import { curriculum, getLevelSummary } from "~/lib/curriculum/index";
import type { CEFRLevel } from "~/lib/curriculum/types";

export const Route = createFileRoute("/coaching/$level")({
  component: LevelPage,
});

const skillIcons: Record<string, string> = {
  reading: "📖",
  writing: "✍️",
  listening: "🎧",
  speaking: "🗣️",
};

function LevelPage() {
  const { level } = Route.useParams();
  const levelId = level.toUpperCase() as CEFRLevel;
  const levelData = curriculum[levelId];

  if (!levelData) {
    return (
      <div className="flex min-h-[60dvh] items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Level not found</h2>
          <Link to="/coaching" className="text-indigo-600 hover:underline">Back to levels</Link>
        </div>
      </div>
    );
  }

  const summary = getLevelSummary(levelId, curriculum);

  const allConcepts = levelData.chapters.flatMap(ch => ch.concepts);
  const readingCount = allConcepts.reduce((s, c) => s + c.skills.reading.exercises.length, 0);
  const writingCount = allConcepts.reduce((s, c) => s + c.skills.writing.exercises.length, 0);
  const listeningCount = allConcepts.reduce((s, c) => s + c.skills.listening.exercises.length, 0);
  const speakingCount = allConcepts.reduce((s, c) => s + c.skills.speaking.exercises.length, 0);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <Link to="/coaching" className="mb-6 inline-flex items-center text-sm text-indigo-600 hover:underline dark:text-indigo-400">
        ← All Levels
      </Link>

      <div className="mb-8">
        <h1 className="text-4xl font-bold">{levelId}: {levelData.title}</h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">{levelData.description}</p>
        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          <span className="rounded-full bg-indigo-100 px-3 py-1 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
            {summary?.chapterCount} Chapters
          </span>
          <span className="rounded-full bg-green-100 px-3 py-1 text-green-700 dark:bg-green-950 dark:text-green-300">
            {summary?.conceptCount} Concepts
          </span>
          <span className="rounded-full bg-amber-100 px-3 py-1 text-amber-700 dark:bg-amber-950 dark:text-amber-300">
            {summary?.exerciseCount} Exercises
          </span>
        </div>
        <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-500">
          <span>{skillIcons.reading} {readingCount} reading</span>
          <span>{skillIcons.writing} {writingCount} writing</span>
          <span>{skillIcons.listening} {listeningCount} listening</span>
          <span>{skillIcons.speaking} {speakingCount} speaking</span>
        </div>
      </div>

      <div className="space-y-8">
        {levelData.chapters.map((chapter) => (
          <div key={chapter.id} className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
            <h2 className="text-xl font-bold">{chapter.title}</h2>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{chapter.description}</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {chapter.concepts.map((concept) => {
                const totalEx = Object.values(concept.skills).reduce((s, sk) => s + sk.exercises.length, 0);
                return (
                  <Link
                    key={concept.id}
                    to="/coaching/$level/$concept"
                    params={{ level: level.toLowerCase(), concept: concept.id }}
                    className="rounded-xl border border-gray-100 bg-gray-50 p-4 transition hover:border-indigo-200 hover:bg-white hover:shadow-sm dark:border-gray-800 dark:bg-gray-800 dark:hover:border-indigo-800 dark:hover:bg-gray-800"
                  >
                    <h3 className="font-semibold">{concept.title}</h3>
                    <p className="mt-1 text-xs text-gray-500">{concept.description}</p>
                    {concept.grammarFocus && (
                      <p className="mt-1 text-xs text-indigo-600 dark:text-indigo-400">Grammar: {concept.grammarFocus}</p>
                    )}
                    <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                      <span>{totalEx} exercises</span>
                      <span>·</span>
                      <span>📖{concept.skills.reading.exercises.length}</span>
                      <span>✍️{concept.skills.writing.exercises.length}</span>
                      <span>🎧{concept.skills.listening.exercises.length}</span>
                      <span>🗣️{concept.skills.speaking.exercises.length}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
