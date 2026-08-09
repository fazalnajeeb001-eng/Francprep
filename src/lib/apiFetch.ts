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

    if (!isServer && (res.status === 401 || res.status === 403) && !isBackgroundPath) {
      const clone = res.clone();
      try {
        const data = await clone.json();
        if (data?.code === 'USER_DELETED' || data?.code === 'USER_BANNED') {
          localStorage.removeItem(STORAGE_KEY);
          localStorage.removeItem("francprep_user");
          if (!window.location.pathname.startsWith("/login") && !window.location.pathname.startsWith("/signup")) {
            window.location.href = `/login?error=${data.code}`;
          }
        } else if (res.status === 401) {
          if (path.includes("/auth/me") || path.includes("/admin/")) {
            localStorage.removeItem(STORAGE_KEY);
            localStorage.removeItem("francprep_user");
            if (!window.location.pathname.startsWith("/login") && !window.location.pathname.startsWith("/signup")) {
              window.location.href = `/login?redirect=${encodeURIComponent(window.location.pathname)}`;
            }
          }
        }
      } catch {}
    }

    // SSR Guard: Prevent SSR loaders from throwing unhandled HTTPError when API is unavailable or non-2xx
    if (isServer && !res.ok) {
      return new Response(JSON.stringify({ success: false, fallback: true, error: `SSR Status ${res.status}` }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    return res;
  } catch (err: any) {
    console.warn("[apiFetch Fallback]", err?.message || err);
    return new Response(JSON.stringify({ success: false, fallback: true, error: err?.message || "Service unavailable" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
}

