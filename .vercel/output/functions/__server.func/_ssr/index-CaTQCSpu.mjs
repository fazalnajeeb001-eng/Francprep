import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { Route as Route$4 } from "./router-BlbYgGpR.mjs";
import "./index.mjs";
import "../_libs/seroval.mjs";
import "../_libs/tanstack__react-router.mjs";
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
function Home() {
  const businessName = Route$4.useLoaderData();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "flex min-h-dvh flex-col items-center justify-center gap-6 px-6 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300", children: "Coming soon" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl", children: businessName || "Something new is on the way" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-md text-lg text-gray-600 dark:text-gray-400", children: businessName ? `${businessName} is building something. Check back soon.` : "We're building something. Check back soon." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "absolute bottom-6 text-sm text-gray-400 dark:text-gray-600", children: [
      "Built with",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://cto.new", className: "underline hover:text-gray-600 dark:hover:text-gray-400", children: "cto.new" })
    ] })
  ] });
}
export {
  Home as component
};
