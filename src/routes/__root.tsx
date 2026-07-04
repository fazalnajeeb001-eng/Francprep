import { HeadContent, Outlet, Scripts, Link, createRootRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import appCss from "~/styles/app.css?url";
import { AuthProvider, useAuth } from "~/lib/AuthContext";
import { LogOut, User } from "lucide-react";

export const Route = createRootRoute({
  head: () => ({
    meta: [{ charSet: "utf-8" }, { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" }, { title: "FrancPrep - TCF/TEF Exam Prep & French Coaching" }],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  notFoundComponent: () => (
    <div className="min-h-screen dark:bg-[#070B17] bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center"><p className="text-4xl mb-4">🔍</p><p className="text-sm sm:text-base dark:text-gray-400 text-gray-600">Page not found</p><Link to="/" className="text-purple-400 text-sm mt-2 inline-block hover:underline">Go home</Link></div>
    </div>
  ),
  component: RootComponent,
});

function NavBar() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  return (
    <nav className="sticky top-0 z-50 border-b dark:border-[#1e2a4a] border-gray-200 dark:bg-[#070B17]/80 bg-white/80 backdrop-blur-xl transition-colors duration-300"
      style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}>
      <div className="mx-auto flex h-14 min-h-[44px] max-w-7xl items-center justify-between px-4">
        <div className="flex items-center gap-4 sm:gap-6">
          <Link to="/" className="flex items-center gap-2 text-lg font-bold min-h-[44px]">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold">F</div>
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent hidden sm:inline">FrancPrep</span>
          </Link>
          {isAuthenticated && (
            <div className="hidden sm:flex items-center gap-1 text-sm">
              <Link to="/dashboard" className="px-3 py-2 min-h-[44px] flex items-center dark:text-gray-400 text-gray-600 hover:text-purple-400 transition-colors rounded-xl">Dashboard</Link>
              <Link to="/coaching" className="px-3 py-2 min-h-[44px] flex items-center dark:text-gray-400 text-gray-600 hover:text-purple-400 transition-colors rounded-xl">Coaching</Link>
              <Link to="/exam" className="px-3 py-2 min-h-[44px] flex items-center dark:text-gray-400 text-gray-600 hover:text-purple-400 transition-colors rounded-xl">Exam</Link>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2 sm:gap-3 text-sm">
          {isLoading ? null : isAuthenticated && user ? (
            <div className="flex items-center gap-2 sm:gap-3">
              <Link to="/dashboard" className="flex items-center gap-2 px-3 py-2 min-h-[44px] rounded-xl dark:bg-[#101828] bg-gray-100 dark:border-[#1e2a4a] border-gray-200 border dark:text-gray-300 text-gray-700 hover:text-purple-400 transition-colors">
                <User className="w-4 h-4" /><span className="hidden sm:inline text-sm">{user.firstName}</span>
              </Link>
              <button onClick={() => logout()} className="flex items-center gap-1.5 px-3 py-2 min-h-[44px] rounded-xl border dark:border-[#1e2a4a] border-gray-200 dark:text-gray-400 text-gray-600 hover:text-red-400 transition-all">
                <LogOut className="w-4 h-4" /><span className="hidden sm:inline text-sm">Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="px-4 py-2 min-h-[44px] flex items-center rounded-xl border dark:border-[#1e2a4a] border-gray-200 dark:text-gray-400 text-gray-600 hover:text-purple-400 transition-all text-sm">Login</Link>
              <Link to="/signup" className="px-4 py-2 min-h-[44px] flex items-center rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:opacity-90 transition-all shadow-lg shadow-purple-500/25 text-sm">Sign Up</Link>
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
    <html lang="en" className="dark">
      <head><HeadContent />
        <script dangerouslySetInnerHTML={{
          __html: `(function(){try{var t=localStorage.getItem("fp_theme");if(t==="light"){document.documentElement.classList.remove("dark")}}catch(e){}})()`
        }} />
      </head>
      <body className="dark:bg-[#070B17] bg-gray-50 antialiased transition-colors duration-300 overflow-x-hidden"
        style={{ paddingTop: "env(safe-area-inset-top, 0px)", paddingBottom: "env(safe-area-inset-bottom, 0px)", paddingLeft: "env(safe-area-inset-left, 0px)", paddingRight: "env(safe-area-inset-right, 0px)" }}>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
