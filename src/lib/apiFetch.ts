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

  return fetch(`${API_BASE}${path}`, { ...options, headers });
}
