import { HeadContent, Outlet, Scripts, Link, createRootRoute, useNavigate, useRouterState } from "@tanstack/react-router";
import type { ReactNode, ErrorInfo } from "react";
import { useState, useEffect, Component } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { apiFetch } from "~/lib/apiFetch";
import appCss from "~/styles/app.css?url";
import { AuthProvider, useAuth } from "~/lib/AuthContext";
import { ThemeProvider } from "~/lib/ThemeContext";
import { WidgetsProvider } from "~/lib/WidgetsContext";
import { Shield } from "lucide-react";
import { getTrackBranding, getActiveLanguageCode } from "~/lib/trackBranding";

const queryClient = new QueryClient();

class ErrorBoundary extends Component<
  { children: ReactNode; fallback?: ReactNode },
  { hasError: boolean; error: Error | null }
> {
  state = { hasError: false, error: null as Error | null };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[ErrorBoundary]", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="min-h-screen dark:bg-[#070B17] bg-gray-50 flex items-center justify-center p-4">
            <div className="text-center max-w-xl mx-auto">
              <p className="text-4xl mb-4">⚠️</p>
              <h1 className="text-xl font-bold dark:text-white text-gray-900 mb-2">Something went wrong</h1>
              <p className="text-sm dark:text-gray-400 text-gray-600 mb-4">An unexpected error occurred. Please try refreshing the page.</p>
              {this.state.error && (
                <div className="text-left p-3 rounded-xl bg-red-950/80 border border-red-500/50 text-[11px] font-mono text-red-300 overflow-x-auto mb-4 whitespace-pre-wrap max-h-48">
                  <p className="font-bold">{String(this.state.error)}</p>
                  {this.state.error.stack && <p className="text-[10px] text-red-400/80 mt-1">{this.state.error.stack}</p>}
                </div>
              )}
              <button onClick={() => { this.setState({ hasError: false, error: null }); window.location.reload(); }}
                className="px-5 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-all">
                Reload Page
              </button>
            </div>
          </div>
        )
      );
    }
    return this.props.children;
  }
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, shrink-to-fit=no, viewport-fit=cover" },
      { title: "FrancPrep — #1 TCF Canada & TEF Canada Exam Simulator & NCLC 7 French Platform" },
      { name: "description", content: "Master TCF Canada & TEF Canada for Canadian Express Entry PR points. Authentic CBT exam simulators, AI interactive speaking examiner, CEFR A1-C2 curriculum, and instant NCLC 7 score prediction." },
      { name: "keywords", content: "TCF Canada exam simulator, TEF Canada prep, NCLC 7 French, Express Entry French points, DELF B2 prep, Learn French online, TCF speaking practice, TEF writing practice" },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { name: "author", content: "FrancPrep Team" },
      // OpenGraph Meta
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://francprep.com" },
      { property: "og:title", content: "FrancPrep — TCF & TEF Canada Exam Simulator & NCLC 7 Platform" },
      { property: "og:description", content: "Prepare for TCF & TEF Canada with authentic CBT exam simulators and two-way AI speaking examiner. Gain up to 62 Canadian PR Express Entry points!" },
      { property: "og:site_name", content: "FrancPrep" },
      // Twitter Card Meta
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "FrancPrep — #1 TCF/TEF Canada Exam Prep" },
      { name: "twitter:description", content: "Authentic CBT Exam Simulators & AI Examiner Roleplay for Canadian Immigration NCLC 7 PR." }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "canonical", href: "https://francprep.com" }
    ],
  }),
  notFoundComponent: () => (
    <div className="min-h-screen dark:bg-[#070B17] bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center"><p className="text-4xl mb-4">🔍</p><p className="text-sm sm:text-base dark:text-gray-400 text-gray-600">Page not found</p><Link to="/" className="text-purple-400 text-sm mt-2 inline-block hover:underline">Go home</Link></div>
    </div>
  ),
  component: RootComponent,
});

function NavBarInner() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const routerState = useRouterState();
  const isOnboarding = routerState.location.pathname === "/onboarding";
  const [avatarGender, setAvatarGender] = useState<string | null>(null);
  const [isAdminPreview, setIsAdminPreview] = useState(false);

  useEffect(() => {
    const val = localStorage.getItem("fp_admin_preview") === "true";
    setIsAdminPreview(val);
    if (val) {
      document.documentElement.classList.add("admin-preview-active");
    } else {
      document.documentElement.classList.remove("admin-preview-active");
    }
  }, []);

  const togglePreview = (checked: boolean) => {
    setIsAdminPreview(checked);
    localStorage.setItem("fp_admin_preview", checked ? "true" : "false");
    if (checked) {
      document.documentElement.classList.add("admin-preview-active");
    } else {
      document.documentElement.classList.remove("admin-preview-active");
    }
    window.dispatchEvent(new Event("admin-preview-changed"));
  };

  useEffect(() => {
    try {
      const stored = localStorage.getItem("fp_avatar_features");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.gender) setAvatarGender(parsed.gender);
      }
    } catch {}
    const onAvatarChange = () => {
      try {
        const stored = localStorage.getItem("fp_avatar_features");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed.gender) setAvatarGender(parsed.gender);
        }
      } catch {}
    };
    window.addEventListener("avatar-changed", onAvatarChange);
    return () => window.removeEventListener("avatar-changed", onAvatarChange);
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;

    const sendHeartbeat = () => {
      if (document.visibilityState === 'visible') {
        const currentPage = window.location.pathname;
        apiFetch("/users/heartbeat", {
          method: "POST",
          body: JSON.stringify({ currentPage }),
        }).catch(() => {});
      }
    };

    const sendOfflineBeacon = () => {
      try {
        const token = localStorage.getItem('fp_access_token') || '';
        const blob = new Blob([JSON.stringify({ token })], { type: 'application/json' });
        const url = `/api/users/presence-off?token=${encodeURIComponent(token)}`;
        if (navigator.sendBeacon) {
          navigator.sendBeacon(url, blob);
        } else {
          apiFetch(url, { method: "POST" }).catch(() => {});
        }
      } catch (e) {}
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        sendOfflineBeacon();
      } else {
        sendHeartbeat();
      }
    };

    sendHeartbeat();
    const interval = setInterval(sendHeartbeat, 15000);

    // Silent background version checker for seamless zero-downtime deployment sync
    let lastBuildTime: string | null = null;
    const checkVersion = () => {
      apiFetch("/version")
        .then((r) => r.json())
        .then((res) => {
          if (res.buildTime) {
            if (lastBuildTime && lastBuildTime !== res.buildTime) {
              queryClient.invalidateQueries();
              window.dispatchEvent(new Event("active-language-changed"));
            }
            lastBuildTime = res.buildTime;
          }
        })
        .catch(() => {});
    };

    checkVersion();
    const versionInterval = setInterval(checkVersion, 60000);

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pagehide", sendOfflineBeacon);
    window.addEventListener("beforeunload", sendOfflineBeacon);

    return () => {
      clearInterval(interval);
      clearInterval(versionInterval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pagehide", sendOfflineBeacon);
      window.removeEventListener("beforeunload", sendOfflineBeacon);
    };
  }, [isAuthenticated]);

  return (
    <>
      {isAuthenticated && user?.role === "admin" && (
        <div className="bg-gradient-to-r from-purple-950 to-indigo-950 border-b border-purple-800 text-white px-4 py-2 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="bg-purple-600 px-1.5 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider animate-pulse">Preview Mode</span>
            <span>Browse as student, click and edit any content in place to stage drafts.</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-purple-300">Edit-in-Place Controls:</span>
            <button type="button" onClick={() => togglePreview(!isAdminPreview)}
              className="relative w-8 h-4.5 rounded-full transition-all bg-gray-600"
              style={{ backgroundColor: isAdminPreview ? "#10b981" : "#4b5563" }}>
              <div className={`absolute top-0.5 w-3.5 h-3.5 rounded-full bg-white shadow transition-all ${isAdminPreview ? "left-4" : "left-0.5"}`} />
            </button>
            <span className="font-semibold">{isAdminPreview ? "Active" : "Inactive"}</span>
          </div>
        </div>
      )}
      <nav className="sticky top-0 z-50 border-b dark:border-[#1e2a4a] border-gray-200 dark:bg-[#070B17]/80 bg-white/80 backdrop-blur-xl transition-colors duration-300"
        style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}>
      <div className="mx-auto flex h-14 min-h-[44px] max-w-7xl items-center justify-between px-4">
        <div className="flex items-center gap-4 sm:gap-6">
          {(() => {
            const activeLang = getActiveLanguageCode(user);
            const branding = getTrackBranding(activeLang);
            return (
              <Link to={isAuthenticated ? "/dashboard" : "/"} className="flex items-center gap-2 text-lg font-bold min-h-[44px]">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold">
                  {isAuthenticated ? branding.flag : "L"}
                </div>
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent hidden sm:inline">
                  {isAuthenticated ? branding.shortBrand : "LingoPrep"}
                </span>
              </Link>
            );
          })()}
          {isAuthenticated && user?.role === "admin" && (
            <div className="flex items-center gap-1 text-sm">
              <Link to="/admin" className="px-3 py-1.5 sm:py-2 min-h-[44px] sm:min-h-0 flex items-center gap-1.5 text-purple-400 hover:text-purple-300 bg-purple-500/10 border border-purple-500/30 rounded-xl transition-all text-xs sm:text-sm">
                <Shield className="w-3.5 h-3.5" /> Admin
              </Link>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2 sm:gap-3 text-sm">
          {isLoading ? null : isAuthenticated && user ? (
            <div className="flex items-center gap-2">
              {!isOnboarding && (
                <>
                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-extrabold shadow-sm" title="Daily Streak">
                    <span className="text-sm animate-pulse">🔥</span> {(user as any).stats?.streak ?? (user as any).streak ?? 0} Days
                  </div>
                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-extrabold shadow-sm hidden sm:flex" title="Total XP">
                    <span className="text-xs">⚡</span> {(user as any).stats?.xp ?? (user as any).xp ?? 0} XP
                  </div>
                </>
              )}
              <button
                onClick={() => navigate({ to: "/dashboard/settings" })}
                className="w-9 h-9 rounded-full overflow-hidden shadow-lg hover:opacity-90 hover:scale-110 transition-all border border-purple-500/30"
                aria-label="Settings"
              >
                <img
                  src={avatarGender === "male" ? "/models/leo-avatar.png" : "/models/chloe-avatar.png"}
                  alt="Avatar"
                  className="w-full h-full object-cover object-top"
                  style={{ objectPosition: "50% 15%" }}
                />
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
    </>
  );
}

function RootComponent() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <AuthProvider>
            <WidgetsProvider>
              <RootDocument>
                <NavBarInner />
                <Outlet />
              </RootDocument>
            </WidgetsProvider>
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
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
