import { create } from 'zustand';
import apiClient from '../api/client';

const useDashboardStore = create((set) => ({
  stats: null,
  recentInquiries: [],
  inquiriesRequiringAction: [],
  loading: false,
  error: null,

  fetchStats: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await apiClient.get('/dashboard/stats');
      set({
        stats: data.stats,
        recentInquiries: data.recentInquiries,
        inquiriesRequiringAction: data.inquiriesRequiringAction,
        loading: false,
      });
      return data;
    } catch (err) {
      set({ error: err?.response?.data?.message || 'Failed to fetch stats', loading: false });
      throw err;
    }
  },
}));

export default useDashboardStore;
