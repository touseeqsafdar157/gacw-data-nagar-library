import { api } from './api';

export interface StaffMember {
  id?: string;
  name: string;
  designation: string;
  shift: string;
  desk: string;
  phone?: string;
  email?: string;
}

export interface LibraryRule {
  title: string;
  desc: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface LibrarySettings {
  id?: string;
  finePerDay: number;
  maxBorrowDaysStudent: number;
  maxBorrowDaysTeacher: number;
  maxBooksStudent: number;
  maxBooksTeacher: number;
  timings: string;
  location: string;
  collegeName: string;
  contactPhone: string;
  contactEmail: string;
  staffMembers: StaffMember[];
  libraryRules: LibraryRule[];
  faqs: FAQ[];
}

export const settingsService = {
  async getSettings(): Promise<LibrarySettings> {
    const res = await api.get<{ success: boolean; data: LibrarySettings }>('/settings');
    return res.data;
  },

  async updateSettings(settings: Partial<LibrarySettings>): Promise<LibrarySettings> {
    const res = await api.put<{ success: boolean; message: string; data: LibrarySettings }>('/settings', settings);
    return res.data;
  },

  async addStaff(staff: StaffMember): Promise<LibrarySettings> {
    const res = await api.post<{ success: boolean; message: string; data: LibrarySettings }>('/settings/staff', staff);
    return res.data;
  },

  async deleteStaff(index: number): Promise<LibrarySettings> {
    const res = await api.delete<{ success: boolean; message: string; data: LibrarySettings }>(`/settings/staff/${index}`);
    return res.data;
  },

  async updateProfile(payload: {
    username: string;
    currentPassword?: string;
    newPassword?: string;
    name?: string;
    email?: string;
    role?: string;
  }) {
    const res = await api.put<{ success: boolean; message: string; user: any; token?: string }>('/auth/profile', payload);
    if (res.success && res.token) {
      api.setAuthToken(res.token);
      localStorage.setItem('library_current_user', JSON.stringify(res.user));
    }
    return res;
  }
};
