import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { a as curriculum } from "./index-BzP3469o.mjs";
import { Route$1 } from "./router-BlbYgGpR.mjs";
import { g as getLevelSummary } from "./utils-BuLaOZhb.mjs";
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
function LevelPage() {
  const {
    level
  } = Route$1.useParams();
  const levelId = level.toUpperCase();
  const levelData = curriculum[levelId];
  if (!levelData) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-[60dvh] items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold mb-2", children: "Level not found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/coaching", className: "text-indigo-600 hover:underline", children: "Back to levels" })
    ] }) });
  }
  const summary = getLevelSummary(levelId, curriculum);
  const allConcepts = levelData.chapters.flatMap((ch) => ch.concepts);
  const readingCount = allConcepts.reduce((s, c) => s + c.skills.reading.exercises.length, 0);
  const writingCount = allConcepts.reduce((s, c) => s + c.skills.writing.exercises.length, 0);
  const listeningCount = allConcepts.reduce((s, c) => s + c.skills.listening.exercises.length, 0);
  const speakingCount = allConcepts.reduce((s, c) => s + c.skills.speaking.exercises.length, 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-4xl px-4 py-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/coaching", className: "mb-6 inline-flex items-center text-sm text-indigo-600 hover:underline dark:text-indigo-400", children: "← All Levels" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-4xl font-bold", children: [
        levelId,
        ": ",
        levelData.title
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-lg text-gray-600 dark:text-gray-400", children: levelData.description }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex flex-wrap gap-3 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded-full bg-indigo-100 px-3 py-1 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300", children: [
          summary?.chapterCount,
          " Chapters"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded-full bg-green-100 px-3 py-1 text-green-700 dark:bg-green-950 dark:text-green-300", children: [
          summary?.conceptCount,
          " Concepts"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded-full bg-amber-100 px-3 py-1 text-amber-700 dark:bg-amber-950 dark:text-amber-300", children: [
          summary?.exerciseCount,
          " Exercises"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex flex-wrap gap-4 text-sm text-gray-500", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          skillIcons.reading,
          " ",
          readingCount,
          " reading"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          skillIcons.writing,
          " ",
          writingCount,
          " writing"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          skillIcons.listening,
          " ",
          listeningCount,
          " listening"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          skillIcons.speaking,
          " ",
          speakingCount,
          " speaking"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-8", children: levelData.chapters.map((chapter) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold", children: chapter.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-gray-600 dark:text-gray-400", children: chapter.description }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 grid gap-3 sm:grid-cols-2", children: chapter.concepts.map((concept) => {
        const totalEx = Object.values(concept.skills).reduce((s, sk) => s + sk.exercises.length, 0);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/coaching/$level/$concept", params: {
          level: level.toLowerCase(),
          concept: concept.id
        }, className: "rounded-xl border border-gray-100 bg-gray-50 p-4 transition hover:border-indigo-200 hover:bg-white hover:shadow-sm dark:border-gray-800 dark:bg-gray-800 dark:hover:border-indigo-800 dark:hover:bg-gray-800", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold", children: concept.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-gray-500", children: concept.description }),
          concept.grammarFocus && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-xs text-indigo-600 dark:text-indigo-400", children: [
            "Grammar: ",
            concept.grammarFocus
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-center gap-2 text-xs text-gray-500", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              totalEx,
              " exercises"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "·" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "📖",
              concept.skills.reading.exercises.length
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "✍️",
              concept.skills.writing.exercises.length
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "🎧",
              concept.skills.listening.exercises.length
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "🗣️",
              concept.skills.speaking.exercises.length
            ] })
          ] })
        ] }, concept.id);
      }) })
    ] }, chapter.id)) })
  ] });
}
export {
  LevelPage as component
};
