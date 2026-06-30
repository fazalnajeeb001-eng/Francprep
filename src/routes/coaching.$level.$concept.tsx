import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { curriculum } from "~/lib/curriculum/index";
import type { CEFRLevel, Skill, Exercise } from "~/lib/curriculum/types";

export const Route = createFileRoute("/coaching/$level/$concept")({
  component: ConceptPage,
});

const skillIcons: Record<string, string> = {
  reading: "📖",
  writing: "✍️",
  listening: "🎧",
  speaking: "🗣️",
};

const skills: Skill[] = ["reading", "writing", "listening", "speaking"];

const exerciseTypeLabels: Record<string, string> = {
  "multiple-choice": "Multiple Choice",
  "fill-blank": "Fill in the Blank",
  "match": "Matching",
  "short-answer": "Short Answer",
  "prompt": "Writing/Speaking Prompt",
  "comprehension": "Comprehension",
  "translation": "Translation",
  "roleplay": "Role Play",
  "dictation": "Dictation",
  "correction": "Correction",
};

function ConceptPage() {
  const { level, concept: conceptId } = Route.useParams();
  const levelId = level.toUpperCase() as CEFRLevel;
  const levelData = curriculum[levelId];

  let foundConcept = null;
  let foundChapter = null;
  if (levelData) {
    for (const ch of levelData.chapters) {
      const c = ch.concepts.find(c => c.id === conceptId);
      if (c) {
        foundConcept = c;
        foundChapter = ch;
        break;
      }
    }
  }

  const [activeSkill, setActiveSkill] = useState<Skill>("reading");
  const [showAnswers, setShowAnswers] = useState<Record<string, boolean>>({});

  if (!foundConcept || !foundChapter) {
    return (
      <div className="flex min-h-[60dvh] items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Concept not found</h2>
          <Link to="/coaching" className="text-indigo-600 hover:underline">Back to coaching</Link>
        </div>
      </div>
    );
  }

  const currentSkill = foundConcept.skills[activeSkill];
  const toggleAnswer = (exerciseId: string) => {
    setShowAnswers(prev => ({ ...prev, [exerciseId]: !prev[exerciseId] }));
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="mb-6 text-sm text-gray-500">
        <Link to="/coaching" className="hover:text-indigo-600">Coaching</Link>
        <span className="mx-2">→</span>
        <Link to={"/coaching/$level" as any} params={{ level: level.toLowerCase() }} className="hover:text-indigo-600">{levelId}</Link>
        <span className="mx-2">→</span>
        <span className="text-gray-900 dark:text-gray-100">{foundChapter.title}</span>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold">{foundConcept.title}</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">{foundConcept.description}</p>
        <div className="mt-3 flex flex-wrap gap-3 text-sm">
          {foundConcept.grammarFocus && (
            <span className="rounded-full bg-indigo-100 px-3 py-1 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
              Grammar: {foundConcept.grammarFocus}
            </span>
          )}
          {foundConcept.vocabularyTheme && (
            <span className="rounded-full bg-teal-100 px-3 py-1 text-teal-700 dark:bg-teal-950 dark:text-teal-300">
              Vocab: {foundConcept.vocabularyTheme}
            </span>
          )}
        </div>
      </div>

      <div className="mb-6 flex gap-1 rounded-xl border border-gray-200 bg-gray-50 p-1 dark:border-gray-800 dark:bg-gray-900">
        {skills.map((skill) => (
          <button
            key={skill}
            data-active={activeSkill === skill}
            onClick={() => setActiveSkill(skill)}
            className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition-all border-b-2 border-transparent ${
              activeSkill === skill
                ? "bg-white shadow-sm border-indigo-500 text-indigo-700 dark:bg-gray-800 dark:text-indigo-300"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            }`}
          >
            {skillIcons[skill]} {skill.charAt(0).toUpperCase() + skill.slice(1)}
            <span className="ml-1.5 text-xs opacity-60">({currentSkill.exercises.length})</span>
          </button>
        ))}
      </div>

      <p className="mb-6 text-sm italic text-gray-500 dark:text-gray-400">
        {currentSkill.summary}
      </p>

      <div className="space-y-4">
        {currentSkill.exercises.map((exercise, idx) => (
          <ExerciseCard
            key={exercise.id}
            exercise={exercise}
            index={idx + 1}
            showAnswer={showAnswers[exercise.id] ?? false}
            onToggleAnswer={() => toggleAnswer(exercise.id)}
          />
        ))}
      </div>

      <div className="mt-10 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to={"/coaching/$level" as any}
          params={{ level: level.toLowerCase() }}
          className="text-sm text-indigo-600 hover:underline dark:text-indigo-400"
        >
          ← Back to {levelId}
        </Link>
      </div>
    </div>
  );
}

function ExerciseCard({ exercise, index, showAnswer, onToggleAnswer }: {
  exercise: Exercise;
  index: number;
  showAnswer: boolean;
  onToggleAnswer: () => void;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
      <div className="mb-1 flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
          Exercise {index} · {exerciseTypeLabels[exercise.type] ?? exercise.type}
        </span>
      </div>
      <h3 className="mb-2 font-semibold">{exercise.title}</h3>
      <p className="mb-3 text-sm text-gray-700 dark:text-gray-300">{exercise.prompt}</p>

      {exercise.options && (
        <div className="mb-3 space-y-1.5">
          {exercise.options.map((opt, i) => (
            <label key={i} className="flex items-center gap-2 rounded-lg border border-gray-100 px-3 py-2 text-sm hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800">
              <input type="radio" name={exercise.id} className="accent-indigo-600" />
              {opt}
            </label>
          ))}
        </div>
      )}

      {exercise.hint && (
        <details className="mb-3">
          <summary className="cursor-pointer text-xs text-gray-400 hover:text-gray-600">Show hint</summary>
          <p className="mt-1 text-xs text-gray-500">{exercise.hint}</p>
        </details>
      )}

      {exercise.correctAnswer && (
        <div className="mt-2">
          <button
            onClick={onToggleAnswer}
            className="text-xs font-medium text-indigo-600 hover:underline dark:text-indigo-400"
          >
            {showAnswer ? "Hide answer" : "Show answer"}
          </button>
          {showAnswer && (
            <div className="mt-1 rounded-lg bg-green-50 px-3 py-2 text-sm text-green-800 dark:bg-green-950 dark:text-green-200">
              ✓ {exercise.correctAnswer}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
