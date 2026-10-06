import { api } from './api';

export interface FeedbackPayload {
  name: string;
  rollNo?: string;
  userType: string;
  rating: number;
  category: string;
  message: string;
}

export const feedbackService = {
  async submitFeedback(payload: FeedbackPayload) {
    const res = await api.post<{ success: boolean; message: string; data: any }>('/feedback', payload);
    return res;
  },

  async getFeedbacks() {
    const res = await api.get<{ success: boolean; count: number; data: any[] }>('/feedback');
    return res.data;
  }
};
