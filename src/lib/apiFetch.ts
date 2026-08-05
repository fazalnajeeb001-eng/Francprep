/**
 * Wrapper around fetch() that automatically attaches the auth token
 * from localStorage. All API calls in the app should use this.
 */
const STORAGE_KEY = "francprep_access_token";
const API_BASE =
  (typeof window !== "undefined" &&
    (import.meta as Record<string, any>).env?.VITE_API_URL) ||
  "/api";

export async function apiFetch(
  path: string,
  options: RequestInit = {}
): Promise<Response> {
  const token = typeof window !== "undefined"
    ? localStorage.getItem(STORAGE_KEY)
    : null;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });

  if ((res.status === 401 || res.status === 403) && typeof window !== "undefined") {
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
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem("francprep_user");
        if (!window.location.pathname.startsWith("/login") && !window.location.pathname.startsWith("/signup")) {
          window.location.href = `/login?redirect=${encodeURIComponent(window.location.pathname)}`;
        }
      }
    } catch {}
  }

  return res;
}
