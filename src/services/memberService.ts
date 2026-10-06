import { api } from './api';
import { Member } from '../types/library';

export const memberService = {
  async getMembers(params?: { search?: string; role?: string; status?: string; department?: string }) {
    const res = await api.get<{ success: boolean; count: number; data: Member[] }>('/members', params);
    return res.data;
  },

  async getMemberById(id: string) {
    const res = await api.get<{ success: boolean; data: Member }>(`/members/${id}`);
    return res.data;
  },

  async createMember(member: Partial<Member>) {
    const res = await api.post<{ success: boolean; message: string; data: Member }>('/members', member);
    return res.data;
  },

  async updateMember(id: string, member: Partial<Member>) {
    const res = await api.put<{ success: boolean; message: string; data: Member }>(`/members/${id}`, member);
    return res.data;
  },

  async toggleStatus(id: string) {
    const res = await api.patch<{ success: boolean; message: string; data: Member }>(`/members/${id}/toggle-status`);
    return res.data;
  },

  async deleteMember(id: string) {
    const res = await api.delete<{ success: boolean; message: string }>(`/members/${id}`);
    return res;
  }
};
