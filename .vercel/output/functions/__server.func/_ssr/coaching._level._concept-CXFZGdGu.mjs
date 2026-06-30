import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { a as curriculum } from "./index-BzP3469o.mjs";
import { Route$2 as Route } from "./router-BlbYgGpR.mjs";
import "./index.mjs";
import "../_libs/seroval.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
const skillIcons = {
  reading: "📖",
  writing: "✍️",
  listening: "🎧",
  speaking: "🗣️"
};
const skills = ["reading", "writing", "listening", "speaking"];
const exerciseTypeLabels = {
  "multiple-choice": "Multiple Choice",
  "fill-blank": "Fill in the Blank",
  "match": "Matching",
  "short-answer": "Short Answer",
  "prompt": "Writing/Speaking Prompt",
  "comprehension": "Comprehension",
  "translation": "Translation",
  "roleplay": "Role Play",
  "dictation": "Dictation",
  "correction": "Correction"
};
function ConceptPage() {
  const {
    level,
    concept: conceptId
  } = Route.useParams();
  const levelId = level.toUpperCase();
  const levelData = curriculum[levelId];
  let foundConcept = null;
  let foundChapter = null;
  if (levelData) {
    for (const ch of levelData.chapters) {
      const c = ch.concepts.find((c2) => c2.id === conceptId);
      if (c) {
        foundConcept = c;
        foundChapter = ch;
        break;
      }
    }
  }
  const [activeSkill, setActiveSkill] = reactExports.useState("reading");
  const [showAnswers, setShowAnswers] = reactExports.useState({});
  if (!foundConcept || !foundChapter) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-[60dvh] items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold mb-2", children: "Concept not found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/coaching", className: "text-indigo-600 hover:underline", children: "Back to coaching" })
    ] }) });
  }
  const currentSkill = foundConcept.skills[activeSkill];
  const toggleAnswer = (exerciseId) => {
    setShowAnswers((prev) => ({
      ...prev,
      [exerciseId]: !prev[exerciseId]
    }));
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-4xl px-4 py-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 text-sm text-gray-500", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/coaching", className: "hover:text-indigo-600", children: "Coaching" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-2", children: "→" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/coaching/$level", params: {
        level: level.toLowerCase()
      }, className: "hover:text-indigo-600", children: levelId }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-2", children: "→" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-900 dark:text-gray-100", children: foundChapter.title })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold", children: foundConcept.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-gray-600 dark:text-gray-400", children: foundConcept.description }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex flex-wrap gap-3 text-sm", children: [
        foundConcept.grammarFocus && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded-full bg-indigo-100 px-3 py-1 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300", children: [
          "Grammar: ",
          foundConcept.grammarFocus
        ] }),
        foundConcept.vocabularyTheme && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded-full bg-teal-100 px-3 py-1 text-teal-700 dark:bg-teal-950 dark:text-teal-300", children: [
          "Vocab: ",
          foundConcept.vocabularyTheme
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6 flex gap-1 rounded-xl border border-gray-200 bg-gray-50 p-1 dark:border-gray-800 dark:bg-gray-900", children: skills.map((skill) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { "data-active": activeSkill === skill, onClick: () => setActiveSkill(skill), className: `flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition-all border-b-2 border-transparent ${activeSkill === skill ? "bg-white shadow-sm border-indigo-500 text-indigo-700 dark:bg-gray-800 dark:text-indigo-300" : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"}`, children: [
      skillIcons[skill],
      " ",
      skill.charAt(0).toUpperCase() + skill.slice(1),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-1.5 text-xs opacity-60", children: [
        "(",
        currentSkill.exercises.length,
        ")"
      ] })
    ] }, skill)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-6 text-sm italic text-gray-500 dark:text-gray-400", children: currentSkill.summary }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: currentSkill.exercises.map((exercise, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(ExerciseCard, { exercise, index: idx + 1, showAnswer: showAnswers[exercise.id] ?? false, onToggleAnswer: () => toggleAnswer(exercise.id) }, exercise.id)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/coaching/$level", params: {
      level: level.toLowerCase()
    }, className: "text-sm text-indigo-600 hover:underline dark:text-indigo-400", children: [
      "← Back to ",
      levelId
    ] }) })
  ] });
}
function ExerciseCard({
  exercise,
  index,
  showAnswer,
  onToggleAnswer
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-1 flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-medium uppercase tracking-wide text-gray-400", children: [
      "Exercise ",
      index,
      " · ",
      exerciseTypeLabels[exercise.type] ?? exercise.type
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-2 font-semibold", children: exercise.title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-3 text-sm text-gray-700 dark:text-gray-300", children: exercise.prompt }),
    exercise.options && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-3 space-y-1.5", children: exercise.options.map((opt, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 rounded-lg border border-gray-100 px-3 py-2 text-sm hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "radio", name: exercise.id, className: "accent-indigo-600" }),
      opt
    ] }, i)) }),
    exercise.hint && /* @__PURE__ */ jsxRuntimeExports.jsxs("details", { className: "mb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("summary", { className: "cursor-pointer text-xs text-gray-400 hover:text-gray-600", children: "Show hint" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-gray-500", children: exercise.hint })
    ] }),
    exercise.correctAnswer && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onToggleAnswer, className: "text-xs font-medium text-indigo-600 hover:underline dark:text-indigo-400", children: showAnswer ? "Hide answer" : "Show answer" }),
      showAnswer && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 rounded-lg bg-green-50 px-3 py-2 text-sm text-green-800 dark:bg-green-950 dark:text-green-200", children: [
        "✓ ",
        exercise.correctAnswer
      ] })
    ] })
  ] });
}
export {
  ConceptPage as component
};
