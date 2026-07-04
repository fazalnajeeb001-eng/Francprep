import axios from 'axios';

// In production (Vercel), set VITE_API_URL to your Railway backend URL
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Attach JWT token from localStorage if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('francprep_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 by clearing token
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('francprep_token');
    }
    return Promise.reject(error);
  }
);

// === Auth API ===
export const authApi = {
  signup: (data: { email: string; password: string; firstName: string; lastName: string }) =>
    api.post('/auth/signup', data),
  login: (data: { email: string; password: string }) =>
    api.post('/auth/login', data),
  logout: () => api.post('/auth/logout'),
  me: () => api.get('/auth/me'),
  refreshToken: (refreshToken: string) =>
    api.post('/auth/refresh-token', { refreshToken }),
};

// === Lessons API ===
export const lessonsApi = {
  getAll: (params?: { level?: string; category?: string; page?: number; limit?: number }) =>
    api.get('/lessons', { params }),
  getById: (id: string) => api.get(`/lessons/${id}`),
  getExercises: (id: string) => api.get(`/lessons/${id}/exercises`),
};

// === Exercises API ===
export const exercisesApi = {
  getById: (id: string) => api.get(`/exercises/${id}`),
  submit: (id: string, answers: { questionId: string; answer: string | string[] }[]) =>
    api.post(`/exercises/${id}/submit`, { answers }),
};

// === Progress API ===
export const progressApi = {
  getAll: () => api.get('/progress'),
  getByLesson: (lessonId: string) => api.get(`/progress/${lessonId}`),
  update: (lessonId: string, data: {
    status?: 'not_started' | 'in_progress' | 'completed';
    score?: number;
    timeSpent?: number;
  }) => api.post(`/progress/${lessonId}/update`, data),
};

// === Admin API ===
export const adminApi = {
  getDashboard: () => api.get('/admin/dashboard'),
  getUsers: (params?: { page?: number; limit?: number }) =>
    api.get('/admin/users', { params }),
  getLessons: (params?: { level?: string; page?: number; limit?: number }) =>
    api.get('/admin/lessons', { params }),
  getExercises: (params?: { lessonId?: string; page?: number; limit?: number }) =>
    api.get('/admin/exercises', { params }),
};

export default api;
