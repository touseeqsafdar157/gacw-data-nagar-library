import { api } from './api';
import { ReadingRoomSeat } from '../types/library';

export interface SeatsResponse {
  success: boolean;
  total: number;
  availableCount: number;
  occupiedCount: number;
  reservedCount: number;
  data: ReadingRoomSeat[];
}

export const seatService = {
  async getSeats() {
    const res = await api.get<SeatsResponse>('/seats');
    return res;
  },

  async bookSeat(seatId: number, rollNo: string, studentName: string, bookedUntil?: string) {
    const res = await api.post<{ success: boolean; message: string; data: ReadingRoomSeat }>(`/seats/${seatId}/book`, {
      rollNo,
      studentName,
      bookedUntil
    });
    return res;
  },

  async vacateSeat(seatId: number) {
    const res = await api.post<{ success: boolean; message: string; data: ReadingRoomSeat }>(`/seats/${seatId}/vacate`);
    return res;
  }
};
