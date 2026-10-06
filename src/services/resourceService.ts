import { api } from './api';
import { DigitalResource } from '../types/library';

export const resourceService = {
  async getResources(params?: { search?: string; type?: string; classGrade?: string }) {
    const res = await api.get<{ success: boolean; count: number; data: DigitalResource[] }>('/resources', params);
    return res.data;
  },

  async createResource(resource: Partial<DigitalResource>) {
    const res = await api.post<{ success: boolean; message: string; data: DigitalResource }>('/resources', resource);
    return res.data;
  },

  async incrementViews(id: string) {
    const res = await api.post<{ success: boolean; data: DigitalResource }>(`/resources/${id}/view`);
    return res.data;
  },

  async deleteResource(id: string) {
    const res = await api.delete<{ success: boolean; message: string }>(`/resources/${id}`);
    return res;
  }
};
