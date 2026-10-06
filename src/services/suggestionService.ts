import { api } from './api';
import { BookSuggestion } from '../types/library';

export const suggestionService = {
  async getSuggestions(params?: { status?: string }) {
    const res = await api.get<{ success: boolean; count: number; data: BookSuggestion[] }>('/suggestions', params);
    return res.data;
  },

  async createSuggestion(suggestion: Partial<BookSuggestion>) {
    const res = await api.post<{ success: boolean; message: string; data: BookSuggestion }>('/suggestions', suggestion);
    return res.data;
  },

  async updateStatus(id: string, status: 'Pending' | 'Approved' | 'Procured' | 'Rejected') {
    const res = await api.patch<{ success: boolean; message: string; data: BookSuggestion }>(`/suggestions/${id}/status`, { status });
    return res.data;
  },

  async deleteSuggestion(id: string) {
    const res = await api.delete<{ success: boolean; message: string }>(`/suggestions/${id}`);
    return res;
  }
};
