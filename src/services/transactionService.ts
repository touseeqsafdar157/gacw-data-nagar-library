import { api } from './api';
import { BorrowTransaction } from '../types/library';

export const transactionService = {
  async getTransactions(params?: { status?: string; memberRollNo?: string; bookId?: string; search?: string }) {
    const res = await api.get<{ success: boolean; count: number; data: BorrowTransaction[] }>('/transactions', params);
    return res.data;
  },

  async issueBook(data: {
    bookId: string;
    memberRollNo: string;
    dueDate?: string;
    issuedByStaff?: string;
  }) {
    const res = await api.post<{ success: boolean; message: string; data: BorrowTransaction }>('/transactions/issue', data);
    return res;
  },

  async returnBook(transactionId: string) {
    const res = await api.post<{ success: boolean; message: string; data: BorrowTransaction }>(`/transactions/${transactionId}/return`);
    return res;
  },

  async renewBook(transactionId: string) {
    const res = await api.post<{ success: boolean; message: string; data: BorrowTransaction }>(`/transactions/${transactionId}/renew`);
    return res;
  },

  async collectFine(transactionId: string) {
    const res = await api.post<{ success: boolean; message: string; data: BorrowTransaction }>(`/transactions/${transactionId}/collect-fine`);
    return res;
  },

  async waiveFine(transactionId: string) {
    const res = await api.post<{ success: boolean; message: string; data: BorrowTransaction }>(`/transactions/${transactionId}/waive-fine`);
    return res;
  }
};
