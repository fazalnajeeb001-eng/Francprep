import axios, { AxiosError, type AxiosInstance, type InternalAxiosRequestConfig } from "axios";

// ─── Types ────────────────────────────────────────────────────────────────

export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "student" | "admin";
  subscriptionTier: "free" | "premium" | "exam_prep";
  isActive: boolean;
  lastLoginAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  success: boolean;
  data: {
    user: User;
    accessToken: string;
    refreshToken: string;
  };
  message?: string;
}

export interface MeResponse {
  success: boolean;
  data: User;
}

export interface SignupPayload {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

// ─── Token helpers ────────────────────────────────────────────────────────

const STORAGE_KEYS = {
  ACCESS_TOKEN: "francprep_access_token",
  REFRESH_TOKEN: "francprep_refresh_token",
  USER: "francprep_user",
} as const;

export function getStoredAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
}

export function getStoredRefreshToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
}

export function getStoredUser(): User | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USER);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

export function clearAuthStorage(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.USER);
}

function storeAuthData(user: User, accessToken: string, refreshToken: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
  localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
}

// ─── Axios instance ───────────────────────────────────────────────────────

const API_BASE_URL: string =
  (typeof window !== "undefined" && (import.meta as Record<string, any>).env?.VITE_API_URL) ||
  "http://localhost:5000/api";

console.log("[auth] API base URL:", API_BASE_URL);

export const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Request interceptor: attach access token
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getStoredAccessToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor: attempt token refresh on 401
let isRefreshing = false;
let pendingQueue: Array<{
  resolve: (token: string) => void;
  reject: (err: unknown) => void;
}> = [];

function processQueue(error: unknown, token: string | null = null): void {
  pendingQueue.forEach((p) => {
    if (token) {
      p.resolve(token);
    } else {
      p.reject(error);
    }
  });
  pendingQueue = [];
}

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Only attempt refresh on 401 and if we haven't already retried
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    // Don't try to refresh if the failing request is itself a refresh/login/signup
    const url = originalRequest.url || "";
    if (
      url.includes("/auth/refresh-token") ||
      url.includes("/auth/login") ||
      url.includes("/auth/signup")
    ) {
      clearAuthStorage();
      return Promise.reject(error);
    }

    if (isRefreshing) {
      // Queue this request until the refresh completes
      return new Promise<string>((resolve, reject) => {
        pendingQueue.push({ resolve, reject });
      }).then((token) => {
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${token}`;
        }
        return api(originalRequest);
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const refreshToken = getStoredRefreshToken();
      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      const { data } = await axios.post<AuthResponse>(
        `${API_BASE_URL}/auth/refresh-token`,
        { refreshToken }
      );

      const { accessToken, refreshToken: newRefreshToken, user } = data.data;
      storeAuthData(user, accessToken, newRefreshToken);

      processQueue(null, accessToken);

      if (originalRequest.headers) {
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      }
      return api(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError, null);
      clearAuthStorage();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

// ─── Auth API functions ───────────────────────────────────────────────────

export async function login(payload: LoginPayload): Promise<{ user: User; accessToken: string; refreshToken: string }> {
  const { data } = await api.post<AuthResponse>("/auth/login", payload);
  const { user, accessToken, refreshToken } = data.data;
  storeAuthData(user, accessToken, refreshToken);
  return { user, accessToken, refreshToken };
}

export async function signup(payload: SignupPayload): Promise<{ user: User; accessToken: string; refreshToken: string }> {
  const { data } = await api.post<AuthResponse>("/auth/signup", payload);
  const { user, accessToken, refreshToken } = data.data;
  storeAuthData(user, accessToken, refreshToken);
  return { user, accessToken, refreshToken };
}

export async function logout(): Promise<void> {
  try {
    await api.post("/auth/logout");
  } catch {
    // Even if the server call fails, clear local state
  } finally {
    clearAuthStorage();
  }
}

export async function getMe(): Promise<User> {
  const { data } = await api.get<MeResponse>("/auth/me");
  return data.data;
}

export async function refreshToken(token: string): Promise<{ user: User; accessToken: string; refreshToken: string }> {
  const { data } = await api.post<AuthResponse>("/auth/refresh-token", { refreshToken: token });
  const { user, accessToken, refreshToken: newRefreshToken } = data.data;
  storeAuthData(user, accessToken, newRefreshToken);
  return { user, accessToken, refreshToken: newRefreshToken };
}