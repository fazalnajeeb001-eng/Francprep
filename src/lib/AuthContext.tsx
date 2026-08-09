import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";

import {
  type User,
  type LoginPayload,
  type SignupPayload,
  login as apiLogin,
  signup as apiSignup,
  logout as apiLogout,
  getMe as apiGetMe,
  getStoredAccessToken,
  getStoredUser,
  clearAuthStorage,
} from "./auth";
import { apiFetch } from "./apiFetch";

// ─── Context type ─────────────────────────────────────────────────────────

export interface AuthContextValue {
  /** The currently authenticated user, or null if not logged in. */
  user: User | null;
  /** True if we have a valid user session. */
  isAuthenticated: boolean;
  /** True while we are checking the session on initial load. */
  isLoading: boolean;
  /** Login with email + password. Returns the user on success. */
  login: (payload: LoginPayload) => Promise<User>;
  /** Register a new account. Returns the user on success. */
  signup: (payload: SignupPayload) => Promise<User>;
  /** Log out and clear all stored tokens. */
  logout: () => Promise<void>;
  /** Update the current user object in context (e.g. after profile save). */
  updateUser: (updated: User) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => getStoredUser());
  const [isLoading, setIsLoading] = useState(true);

  // On initial mount, restore session from localStorage immediately & revalidate in background
  useEffect(() => {
    const init = async () => {
      const storedUser = getStoredUser();
      const token = getStoredAccessToken();

      if (!storedUser && !token) {
        setUser(null);
        setIsLoading(false);
        return;
      }

      // Instant local session restoration — zero wait, zero flashing
      if (storedUser) {
        setUser(storedUser);
      }

      try {
        const currentUser = await apiGetMe();
        setUser(currentUser);
        localStorage.setItem("francprep_user", JSON.stringify(currentUser));
        if ((currentUser as any).activeLanguage) {
          localStorage.setItem("fp_active_language", (currentUser as any).activeLanguage);
        }
      } catch (err: any) {
        const code = err?.response?.data?.code || err?.code;
        if (code === "USER_DELETED" || code === "USER_BANNED") {
          clearAuthStorage();
          setUser(null);
        } else {
          // Maintain active session using stored local user cache — NEVER force logout on 401 or network glitch
          if (storedUser) {
            setUser(storedUser);
          }
        }
      } finally {
        setIsLoading(false);
      }
    };
    init();
  }, []);

  // Instant & High-Frequency presence tracking (heartbeat every 15s + instant visibilitychange/pagehide/blur presence-off)
  useEffect(() => {
    if (!user) return;

    const sendHeartbeat = () => {
      if (document.visibilityState === "hidden") return;
      const currentPath = typeof window !== "undefined" ? window.location.pathname : "";
      apiFetch("/users/heartbeat", {
        method: "POST",
        body: JSON.stringify({ currentPage: currentPath }),
      }).catch(() => {});
    };

    const sendOfflineSignal = () => {
      try {
        const token = getStoredAccessToken();
        if (token && typeof navigator !== "undefined" && navigator.sendBeacon) {
          const blob = new Blob([JSON.stringify({ token })], { type: "application/json" });
          navigator.sendBeacon("/api/users/presence-off", blob);
        } else {
          apiFetch("/users/presence-off", { method: "POST" }).catch(() => {});
        }
      } catch {}
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        sendOfflineSignal();
      } else {
        sendHeartbeat();
      }
    };

    const handleWindowBlur = () => {
      sendOfflineSignal();
    };

    const handleWindowFocus = () => {
      sendHeartbeat();
    };

    // Initial heartbeat on mount
    sendHeartbeat();

    // High frequency interval (15s) while active
    const interval = setInterval(sendHeartbeat, 15000);

    window.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pagehide", sendOfflineSignal);
    window.addEventListener("beforeunload", sendOfflineSignal);
    window.addEventListener("blur", handleWindowBlur);
    window.addEventListener("focus", handleWindowFocus);

    return () => {
      clearInterval(interval);
      window.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pagehide", sendOfflineSignal);
      window.removeEventListener("beforeunload", sendOfflineSignal);
      window.removeEventListener("blur", handleWindowBlur);
      window.removeEventListener("focus", handleWindowFocus);
    };
  }, [user]);

  const login = useCallback(async (payload: LoginPayload): Promise<User> => {
    const result = await apiLogin(payload);
    setUser(result.user);
    if (typeof window !== "undefined" && (result.user as any).activeLanguage) {
      localStorage.setItem("fp_active_language", (result.user as any).activeLanguage);
    }
    return result.user;
  }, []);

  const signup = useCallback(async (payload: SignupPayload): Promise<User> => {
    const result = await apiSignup(payload);
    setUser(result.user);
    return result.user;
  }, []);

  const logout = useCallback(async (): Promise<void> => {
    clearAuthStorage();
    setUser(null);
    try {
      await apiLogout();
    } catch {
      // ignore network errors
    } finally {
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
  }, []);

  const updateUser = useCallback((updated: User) => {
    setUser(updated);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updated));
        if ((updated as any).activeLanguage) {
          localStorage.setItem("fp_active_language", (updated as any).activeLanguage);
          window.dispatchEvent(new Event("active-language-changed"));
        }
      } catch {}
    }
  }, []);

  const value: AuthContextValue = {
    user,
    isAuthenticated: user !== null,
    isLoading,
    login,
    signup,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ─── Hook ─────────────────────────────────────────────────────────────────

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    return {
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      login: async () => {},
      signup: async () => {},
      logout: () => {},
      updateUser: () => {},
    };
  }
  return ctx;
}

export default AuthContext;