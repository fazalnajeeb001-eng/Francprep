import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
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
const versions = [{
  id: "v1",
  name: "Version 1",
  subtitle: "First Steps",
  desc: "Greetings, introductions, numbers, alphabet"
}, {
  id: "v2",
  name: "Version 2",
  subtitle: "Daily Life",
  desc: "Family, routine, shopping, directions"
}, {
  id: "v3",
  name: "Version 3",
  subtitle: "Social & Travel",
  desc: "Hobbies, weather, city, transport"
}, {
  id: "v4",
  name: "Version 4",
  subtitle: "Professional & Health",
  desc: "Body, health, work, invitations"
}];
function ExamPage() {
  const [practiceMode, setPracticeMode] = reactExports.useState(null);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-4xl px-4 py-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold tracking-tight text-gray-900 dark:text-white", children: "TCF/TEF Exam Simulator" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-gray-600 dark:text-gray-400", children: "Prepare for the official French proficiency exams with realistic practice and timed full exams." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mb-10 rounded-xl border border-indigo-200 bg-indigo-50 p-6 dark:border-indigo-800 dark:bg-indigo-950/30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-indigo-700 dark:text-indigo-300", children: "Practice Mode" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-gray-600 dark:text-gray-400", children: "Quick 12-question warm-up with instant feedback. No timer, no pressure." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/exam/practice", className: "rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 transition-colors", children: "Start Practice" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mb-10 rounded-xl border border-amber-200 bg-amber-50 p-6 dark:border-amber-800 dark:bg-amber-950/30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-amber-700 dark:text-amber-300", children: "Full Exam Mode" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-gray-600 dark:text-gray-400", children: "Timed, 100-point exam covering Listening, Reading, Writing, and Speaking. Pass with 50/100 to unlock the next level!" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/exam/full", className: "rounded-lg bg-amber-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-amber-700 transition-colors", children: "Start Full Exam" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-4 text-xl font-bold text-gray-900 dark:text-white", children: "Available Exam Versions" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-2", children: versions.map((v) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-1 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400", children: v.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-bold text-gray-900 dark:text-white", children: v.subtitle }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-gray-600 dark:text-gray-400", children: v.desc }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/exam/practice", className: "text-xs font-medium text-indigo-600 hover:underline dark:text-indigo-400", children: "Practice" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-300 dark:text-gray-600", children: "|" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/exam/full", className: "text-xs font-medium text-amber-600 hover:underline dark:text-amber-400", children: "Full Exam" })
        ] })
      ] }, v.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-10 rounded-lg border border-gray-200 bg-gray-50 p-5 dark:border-gray-700 dark:bg-gray-900", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold text-gray-900 dark:text-white", children: "How Progression Works" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-2 space-y-1 text-sm text-gray-600 dark:text-gray-400", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "\\u2022 Complete all chapters in a level through Coaching" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "\\u2022 Take the Full Exam to prove your mastery" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "\\u2022 Score ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "50/100" }),
          " total AND ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "5/25" }),
          " in each section to pass"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "\\u2022 Passing unlocks the next CEFR level" })
      ] })
    ] })
  ] });
}
export {
  ExamPage as component
};
