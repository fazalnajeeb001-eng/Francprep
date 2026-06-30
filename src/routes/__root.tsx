import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
  Link,
} from "@tanstack/react-router";
import type { ReactNode } from "react";

import appCss from "~/styles/app.css?url";
import { TrainingWheelsProvider, useTrainingWheels } from "~/lib/training-wheels";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "FrancPrep \u2013 Master French from A1 to C2" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  notFoundComponent: () => (
    <div className="flex min-h-dvh items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Page not found</h2>
        <Link to="/" className="text-indigo-600 hover:underline">Go home</Link>
      </div>
    </div>
  ),
  component: RootComponent,
});

function RootComponent() {
  return (
    <TrainingWheelsProvider>
      <RootDocument>
        <Outlet />
      </RootDocument>
    </TrainingWheelsProvider>
  );
}

function NavToggle() {
  const { mode, toggle } = useTrainingWheels();
  return (
    <button
      onClick={toggle}
      className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors ${
        mode === "visible"
          ? "bg-indigo-100 text-indigo-700 hover:bg-indigo-200 dark:bg-indigo-900/50 dark:text-indigo-300"
          : "bg-gray-100 text-gray-500 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400"
      }`}
      title={mode === "visible" ? "Hide translations for immersion practice" : "Show translations"}
    >
      <span className="text-sm">{mode === "visible" ? "\ud83d\ude8c" : "\ud83d\udee4\ufe0f"}</span>
      <span>Training Wheels {mode === "visible" ? "ON" : "OFF"}</span>
    </button>
  );
}

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur dark:border-gray-800 dark:bg-gray-950/80">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <Link to="/" className="text-lg font-bold tracking-tight text-indigo-600 dark:text-indigo-400">
              FrancPrep
            </Link>
            <div className="flex items-center gap-6 text-sm font-medium">
              <Link to="/coaching" className="text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400">
                Coaching
              </Link>
              <Link to="/exam" className="text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400">
                Exam Simulator
              </Link>
              <NavToggle />
            </div>
          </div>
        </nav>
        <main>{children}</main>
        <Scripts />
      </body>
    </html>
  );
}