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
  clearAuthStorage,
} from "./auth";

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
}

const AuthContext = createContext<AuthContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // On initial mount, try to restore the session from stored token
  useEffect(() => {
    const init = async () => {
      const token = getStoredAccessToken();
      if (!token) {
        setIsLoading(false);
        return;
      }
      try {
        const currentUser = await apiGetMe();
        setUser(currentUser);
      } catch {
        // Token invalid or expired — clear everything
        clearAuthStorage();
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    init();
  }, []);

  const login = useCallback(async (payload: LoginPayload): Promise<User> => {
    const result = await apiLogin(payload);
    setUser(result.user);
    return result.user;
  }, []);

  const signup = useCallback(async (payload: SignupPayload): Promise<User> => {
    const result = await apiSignup(payload);
    setUser(result.user);
    return result.user;
  }, []);

  const logout = useCallback(async (): Promise<void> => {
    await apiLogout();
    setUser(null);
  }, []);

  const value: AuthContextValue = {
    user,
    isAuthenticated: user !== null,
    isLoading,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ─── Hook ─────────────────────────────────────────────────────────────────

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an <AuthProvider>");
  }
  return ctx;
}

export default AuthContext;