import { HeadContent, Outlet, Scripts, Link, createRootRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import appCss from "~/styles/app.css?url";
import { AuthProvider, useAuth } from "~/lib/AuthContext";
import { motion } from "framer-motion";
import { GraduationCap, LogOut, User } from "lucide-react";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "FrancPrep - TCF/TEF Exam Prep & French Coaching" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  notFoundComponent: () => (
    <div className="min-h-screen bg-[#070B17] flex items-center justify-center">
      <div className="text-gray-400 text-center">
        <p className="text-4xl mb-4">🔍</p>
        <p className="text-lg">Page not found</p>
        <Link to="/" className="text-purple-400 hover:text-purple-300 text-sm mt-2 inline-block">Go home</Link>
      </div>
    </div>
  ),
  component: RootComponent,
});

function NavBar() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-50 border-b border-[#1e2a4a] bg-[#070B17]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 text-lg font-bold">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold">F</div>
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">FrancPrep</span>
          </Link>
          {isAuthenticated && (
            <div className="hidden sm:flex items-center gap-4 text-sm">
              <Link to="/dashboard" className="text-gray-400 hover:text-white transition-colors">Dashboard</Link>
              <Link to="/coaching" className="text-gray-400 hover:text-white transition-colors">Coaching</Link>
              <Link to="/exam" className="text-gray-400 hover:text-white transition-colors">Exam</Link>
            </div>
          )}
        </div>
        <div className="flex items-center gap-3 text-sm">
          {isLoading ? null : isAuthenticated && user ? (
            <div className="flex items-center gap-3">
              <Link to="/dashboard" className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#101828] border border-[#1e2a4a] text-gray-300 hover:text-white transition-colors">
                <User className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{user.firstName}</span>
              </Link>
              <button onClick={() => logout()}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#1e2a4a] text-gray-400 hover:text-red-400 hover:border-red-500/30 transition-all">
                <LogOut className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="px-4 py-1.5 rounded-xl border border-[#1e2a4a] text-gray-400 hover:text-white hover:border-purple-500/30 transition-all">
                Login
              </Link>
              <Link to="/signup" className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:opacity-90 transition-all shadow-lg shadow-purple-500/25">
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
    <html lang="en" className="dark">
      <head>
        <HeadContent />
        <script dangerouslySetInnerHTML={{
          __html: `(function(){try{var t=localStorage.getItem("fp_theme");if(t==="light")document.documentElement.classList.remove("dark")}catch(e){}})()`
        }} />
      </head>
      <body className="bg-[#070B17] text-white antialiased">
        {children}
        <Scripts />
      </body>
    </html>
  );
}
