/**
 * Wrapper around fetch() that automatically attaches the auth token
 * from localStorage. All API calls in the app should use this.
 */
const STORAGE_KEY = "francprep_access_token";

function getApiBaseUrl(): string {
  if (typeof window !== "undefined") {
    return (import.meta as Record<string, any>).env?.VITE_API_URL || "/api";
  }
  const envUrl = (typeof process !== "undefined" && (process.env.VITE_API_URL || process.env.API_URL)) || "";
  if (envUrl) return envUrl.endsWith("/api") ? envUrl : `${envUrl}/api`;
  if (typeof process !== "undefined" && process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}/api`;
  }
  return "http://localhost:5000/api";
}

export async function apiFetch(
  path: string,
  options: RequestInit = {}
): Promise<Response> {
  const isServer = typeof window === "undefined";
  const baseUrl = getApiBaseUrl();
  const targetUrl = path.startsWith("http") ? path : `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;

  try {
    const token = !isServer ? localStorage.getItem(STORAGE_KEY) : null;

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(options.headers as Record<string, string>),
    };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const res = await fetch(targetUrl, { ...options, headers });

    const isBackgroundPath = path.includes("/heartbeat") || path.includes("/presence") || path.includes("/analytics") || path.includes("/speaking");

    if (!isServer && !isBackgroundPath) {
      const clone = res.clone();
      try {
        const data = await clone.json();
        const effectiveStatus = data?.statusCode || res.status;
        if (effectiveStatus === 401 || effectiveStatus === 403) {
          if (data?.code === 'USER_DELETED' || data?.code === 'USER_BANNED') {
            localStorage.removeItem(STORAGE_KEY);
            localStorage.removeItem("francprep_user");
            if (!window.location.pathname.startsWith("/login") && !window.location.pathname.startsWith("/signup")) {
              window.location.href = `/login?error=${data.code}`;
            }
          } else if (effectiveStatus === 401) {
            if (path.includes("/auth/me") || path.includes("/admin/")) {
              localStorage.removeItem(STORAGE_KEY);
              localStorage.removeItem("francprep_user");
              if (!window.location.pathname.startsWith("/login") && !window.location.pathname.startsWith("/signup")) {
                window.location.href = `/login?redirect=${encodeURIComponent(window.location.pathname)}`;
              }
            }
          }
        }
      } catch {}
    }

    // Catch 5xx backend proxy failures (e.g. 502 Bad Gateway from Railway or 503 Service Unavailable)
    // to prevent TanStack Start / Nitro SSR loaders from crashing with unhandled HTTPError!
    if (res.status >= 500 || (isServer && !res.ok)) {
      console.warn(`[apiFetch Proxy Guard] Intercepted HTTP ${res.status} for ${path}. Returning graceful JSON fallback.`);
      return new Response(JSON.stringify({ success: false, fallback: true, status: res.status, error: `Backend Status ${res.status}` }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    return res;
  } catch (err: any) {
    console.warn("[apiFetch Fallback]", err?.message || err);
    return new Response(JSON.stringify({ success: false, fallback: true, status: 500, error: err?.message || "Service unavailable" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
}

