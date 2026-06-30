import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { c as createRouter, a as createRootRoute, b as createFileRoute, l as lazyRouteComponent, O as Outlet, H as HeadContent, S as Scripts } from "../_libs/tanstack__react-router.mjs";
import { createServerFn, TSS_SERVER_FUNCTION, getServerFnById } from "./index.mjs";
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
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
const appCss = "/assets/app-4kbLZI4f.css";
const Route$7 = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "My site" }
    ],
    links: [{ rel: "stylesheet", href: appCss }]
  }),
  notFoundComponent: () => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Page not found" }),
  component: RootComponent
});
function RootComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(RootDocument, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) });
}
function RootDocument({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
const $$splitComponentImporter$6 = () => import("./exam-BtaYz2gu.mjs");
const Route$6 = createFileRoute("/exam")({
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./coaching-DNwfmDRs.mjs");
const Route$5 = createFileRoute("/coaching")({
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var createSsrRpc = (functionId) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    return (await getServerFnById(functionId))(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const $$splitComponentImporter$4 = () => import("./index-CaTQCSpu.mjs");
const getBusinessName = createServerFn({
  method: "GET"
}).handler(createSsrRpc("ed9e0b62e19345253bb81dfb20bac27bb23001205689ad75c3f2879c99c299c4"));
const Route$4 = createFileRoute("/")({
  loader: () => getBusinessName(),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./exam.practice-D12yGd1I.mjs");
const Route$3 = createFileRoute("/exam/practice")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./exam.full-DVZ4fpTY.mjs");
const Route$2 = createFileRoute("/exam/full")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./coaching._level-BYOg28k8.mjs");
const Route$1 = createFileRoute("/coaching/$level")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./coaching._level._concept-CXFZGdGu.mjs");
const Route = createFileRoute("/coaching/$level/$concept")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const ExamRoute = Route$6.update({
  id: "/exam",
  path: "/exam",
  getParentRoute: () => Route$7
});
const CoachingRoute = Route$5.update({
  id: "/coaching",
  path: "/coaching",
  getParentRoute: () => Route$7
});
const IndexRoute = Route$4.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$7
});
const ExamPracticeRoute = Route$3.update({
  id: "/practice",
  path: "/practice",
  getParentRoute: () => ExamRoute
});
const ExamFullRoute = Route$2.update({
  id: "/full",
  path: "/full",
  getParentRoute: () => ExamRoute
});
const CoachingLevelRoute = Route$1.update({
  id: "/$level",
  path: "/$level",
  getParentRoute: () => CoachingRoute
});
const CoachingLevelConceptRoute = Route.update({
  id: "/$concept",
  path: "/$concept",
  getParentRoute: () => CoachingLevelRoute
});
const CoachingLevelRouteChildren = {
  CoachingLevelConceptRoute
};
const CoachingLevelRouteWithChildren = CoachingLevelRoute._addFileChildren(
  CoachingLevelRouteChildren
);
const CoachingRouteChildren = {
  CoachingLevelRoute: CoachingLevelRouteWithChildren
};
const CoachingRouteWithChildren = CoachingRoute._addFileChildren(
  CoachingRouteChildren
);
const ExamRouteChildren = {
  ExamFullRoute,
  ExamPracticeRoute
};
const ExamRouteWithChildren = ExamRoute._addFileChildren(ExamRouteChildren);
const rootRouteChildren = {
  IndexRoute,
  CoachingRoute: CoachingRouteWithChildren,
  ExamRoute: ExamRouteWithChildren
};
const routeTree = Route$7._addFileChildren(rootRouteChildren)._addFileTypes();
function getRouter() {
  return createRouter({
    routeTree,
    defaultPreload: "intent",
    scrollRestoration: true,
    defaultNotFoundComponent: () => /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Not found" })
  });
}
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route$4 as Route,
  Route$1,
  Route as Route$2,
  router
};
