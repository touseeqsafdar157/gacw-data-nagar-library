import { api } from './api';

export interface DashboardData {
  books: {
    totalTitles: number;
    totalCopies: number;
    availableCopies: number;
    issuedCopies: number;
  };
  members: {
    total: number;
    active: number;
    blocked: number;
    students: number;
    teachers: number;
  };
  circulation: {
    totalTransactions: number;
    activeIssues: number;
    overdueIssues: number;
    returnedIssues: number;
    pendingFines: number;
    collectedFines: number;
  };
  seats: {
    total: number;
    occupied: number;
    available: number;
    occupancyRate: number;
  };
  almarisCount: number;
  pendingSuggestions: number;
  departmentDistribution: Record<string, number>;
  recentTransactions: any[];
}

export const dashboardService = {
  async getStats(): Promise<DashboardData> {
    const res = await api.get<{ success: boolean; data: DashboardData }>('/dashboard/stats');
    return res.data;
  }
};
