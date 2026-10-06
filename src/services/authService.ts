import { api } from './api';
import { UserRole } from '../types/library';

export interface AuthResponse {
  success: boolean;
  token: string;
  user: {
    id: string;
    username: string;
    name: string;
    role: UserRole;
    email?: string;
  };
  message?: string;
}

export const authService = {
  async login(username: string, password: string, role?: UserRole): Promise<AuthResponse> {
    const res = await api.post<AuthResponse>('/auth/login', { username, password, role });
    if (res.success && res.token) {
      api.setAuthToken(res.token);
      localStorage.setItem('library_current_user', JSON.stringify(res.user));
    }
    return res;
  },

  async getCurrentUser() {
    return api.get<{ success: boolean; user: any }>('/auth/me');
  },

  logout() {
    api.clearAuthToken();
    localStorage.removeItem('library_current_user');
  },

  getStoredUser() {
    const raw = localStorage.getItem('library_current_user');
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }
};
