import { api } from './api';
import { LibraryAnnouncement } from '../types/library';

export const announcementService = {
  async getAnnouncements() {
    const res = await api.get<{ success: boolean; count: number; data: LibraryAnnouncement[] }>('/announcements');
    return res.data;
  },

  async createAnnouncement(ann: Partial<LibraryAnnouncement>) {
    const res = await api.post<{ success: boolean; message: string; data: LibraryAnnouncement }>('/announcements', ann);
    return res.data;
  },

  async deleteAnnouncement(id: string) {
    const res = await api.delete<{ success: boolean; message: string }>(`/announcements/${id}`);
    return res;
  }
};
