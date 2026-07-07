import { HeadContent, Outlet, Scripts, Link, createRootRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useRef, useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import appCss from "~/styles/app.css?url";
import { AuthProvider, useAuth } from "~/lib/AuthContext";
import { ThemeProvider } from "~/lib/ThemeContext";
import { LogOut, Shield, Settings } from "lucide-react";

const queryClient = new QueryClient();

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

function NavBarInner() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <nav className="sticky top-0 z-50 border-b dark:border-[#1e2a4a] border-gray-200 dark:bg-[#070B17]/80 bg-white/80 backdrop-blur-xl transition-colors duration-300"
      style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}>
      <div className="mx-auto flex h-14 min-h-[44px] max-w-7xl items-center justify-between px-4">
        <div className="flex items-center gap-4 sm:gap-6">
          <Link to="/" className="flex items-center gap-2 text-lg font-bold min-h-[44px]">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold">F</div>
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent hidden sm:inline">FrancPrep</span>
          </Link>
          {isAuthenticated && user?.role === "admin" && (
            <div className="hidden sm:flex items-center gap-1 text-sm">
              <Link to="/admin" className="px-3 py-2 min-h-[44px] flex items-center gap-1.5 text-purple-400 hover:text-purple-300 bg-purple-500/10 border border-purple-500/30 rounded-xl transition-all">
                <Shield className="w-3.5 h-3.5" /> Admin
              </Link>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2 sm:gap-3 text-sm">
          {isLoading ? null : isAuthenticated && user ? (
            <div className="relative" ref={menuRef}>
              <button onClick={() => setMenuOpen(!menuOpen)}
                className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold shadow-lg hover:opacity-90 transition-all"
                aria-label="User menu"
              >
                {user.firstName[0]}{user.lastName[0]}
              </button>
              {menuOpen && (
                <div className="absolute right-0 top-full mt-2 z-50 w-44 rounded-xl dark:bg-[#101828] bg-white border dark:border-[#1e2a4a] border-gray-200 shadow-xl py-1 overflow-hidden">
                  <Link to="/dashboard/settings" onClick={() => setMenuOpen(false)}
                    className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-sm dark:text-gray-300 text-gray-700 hover:dark:bg-white/5 hover:bg-gray-50 transition-colors text-left">
                    <Settings className="w-4 h-4" /> Settings
                  </Link>
                  <hr className="dark:border-[#1e2a4a] border-gray-200" />
                  <button onClick={() => { setMenuOpen(false); logout(); }}
                    className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-sm dark:text-gray-300 text-gray-700 hover:dark:bg-white/5 hover:bg-gray-50 transition-colors text-left">
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </div>
              )}
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
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <RootDocument>
            <NavBarInner />
            <Outlet />
          </RootDocument>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
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
