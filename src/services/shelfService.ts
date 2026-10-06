import { api } from './api';
import { Almari } from '../types/library';

export const shelfService = {
  async getAlmaris() {
    const res = await api.get<{ success: boolean; count: number; data: Almari[] }>('/almaris');
    return res.data;
  },

  async createAlmari(almari: Partial<Almari>) {
    const res = await api.post<{ success: boolean; message: string; data: Almari }>('/almaris', almari);
    return res.data;
  },

  async updateAlmari(id: string, almari: Partial<Almari>) {
    const res = await api.put<{ success: boolean; message: string; data: Almari }>(`/almaris/${id}`, almari);
    return res.data;
  },

  async deleteAlmari(id: string) {
    const res = await api.delete<{ success: boolean; message: string }>(`/almaris/${id}`);
    return res;
  }
};
