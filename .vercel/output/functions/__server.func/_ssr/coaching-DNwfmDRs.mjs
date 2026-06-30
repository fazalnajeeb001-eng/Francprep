import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { c as cefrLevels, a as curriculum } from "./index-BzP3469o.mjs";
import { g as getLevelSummary } from "./utils-BuLaOZhb.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
const levelColors = {
  A1: "from-green-400 to-emerald-500",
  A2: "from-teal-400 to-cyan-500",
  B1: "from-blue-400 to-indigo-500",
  B2: "from-indigo-400 to-violet-500",
  C1: "from-violet-400 to-purple-500",
  C2: "from-purple-400 to-pink-500"
};
const levelIcons = {
  A1: "🌱",
  A2: "🌿",
  B1: "🌳",
  B2: "🔥",
  C1: "💎",
  C2: "👑"
};
function CoachingHub() {
  const summaries = cefrLevels.map((id) => ({
    ...getLevelSummary(id, curriculum),
    levelId: id
  }));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-5xl px-4 py-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-12 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300", children: "Coaching Section" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-4 text-4xl font-bold tracking-tight sm:text-5xl", children: "Choose Your Level" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-400", children: "FrancPrep's structured A1–C2 curriculum guides you from absolute beginner to mastery. Each level develops reading, writing, listening, and speaking skills through comprehensive exercises." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3", children: cefrLevels.map((levelId) => {
      const summary = summaries.find((s) => s.levelId === levelId);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/coaching/$level", params: {
        level: levelId.toLowerCase()
      }, className: "group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-1 dark:border-gray-800 dark:bg-gray-900", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${levelColors[levelId]}` }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl", children: levelIcons[levelId] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-3 text-2xl font-bold", children: levelId }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-indigo-600 dark:text-indigo-400", children: summary?.title?.split("–")[0]?.trim() }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-gray-600 line-clamp-2 dark:text-gray-400", children: summary?.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex gap-4 text-xs text-gray-500", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              summary?.chapterCount,
              " chapters"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              summary?.conceptCount,
              " concepts"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              summary?.exerciseCount,
              " exercises"
            ] })
          ] })
        ] })
      ] }, levelId);
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-16 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold mb-4", children: "Learning Path Overview" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-3xl overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-left text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "border-b border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 font-semibold", children: "Level" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 font-semibold", children: "Title" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 font-semibold", children: "CEFR Can-Do" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { className: "divide-y divide-gray-200 dark:divide-gray-800", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-gray-50 dark:hover:bg-gray-900", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-bold", children: "A1" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: "Beginner – Découverte" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-gray-600 dark:text-gray-400", children: "Basic greetings, introductions, everyday needs" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-gray-50 dark:hover:bg-gray-900", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-bold", children: "A2" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: "Elementary – Progrès" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-gray-600 dark:text-gray-400", children: "Simple conversations, travel, past experiences" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-gray-50 dark:hover:bg-gray-900", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-bold", children: "B1" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: "Intermediate – Indépendance" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-gray-600 dark:text-gray-400", children: "Work, opinions, connected text on familiar topics" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-gray-50 dark:hover:bg-gray-900", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-bold", children: "B2" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: "Upper-Intermediate – Autonomie" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-gray-600 dark:text-gray-400", children: "Debate, formal register, literary analysis" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-gray-50 dark:hover:bg-gray-900", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-bold", children: "C1" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: "Advanced – Maîtrise" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-gray-600 dark:text-gray-400", children: "Academic discourse, nuance, specialized fields" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-gray-50 dark:hover:bg-gray-900", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-bold", children: "C2" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: "Mastery – Perfectionnement" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-gray-600 dark:text-gray-400", children: "Rhetoric, translation, expert-level critique" })
          ] })
        ] })
      ] }) })
    ] })
  ] });
}
export {
  CoachingHub as component
};
