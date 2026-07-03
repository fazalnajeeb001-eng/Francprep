import {
  HeadContent,
  Outlet,
  Scripts,
  Link,
  createRootRoute,
} from "@tanstack/react-router";
import type { ReactNode } from "react";

import appCss from "~/styles/app.css?url";
import { AuthProvider, useAuth } from "~/lib/AuthContext";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "FrancPrep" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  notFoundComponent: () => <div>Page not found</div>,
  component: RootComponent,
});

function NavBar() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-950/80">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link to="/" className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
            FrancPrep
          </Link>
          {isAuthenticated && (
            <div className="hidden sm:flex items-center gap-4 text-sm">
              <Link to="/coaching" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                Coaching
              </Link>
              <Link to="/exam" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                Exam
              </Link>
            </div>
          )}
        </div>
        <div className="flex items-center gap-3 text-sm">
          {isLoading ? null : isAuthenticated && user ? (
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline text-gray-600 dark:text-gray-400">
                {user.firstName}
              </span>
              <button
                onClick={() => logout()}
                className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

function RootComponent() {
  return (
    <AuthProvider>
      <RootDocument>
        <NavBar />
        <Outlet />
      </RootDocument>
    </AuthProvider>
  );
}

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
