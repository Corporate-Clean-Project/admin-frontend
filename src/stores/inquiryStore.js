import { create } from 'zustand';
import apiClient from '../api/client';

const useInquiryStore = create((set, get) => ({
  inquiries: [],
  selectedInquiry: null,
  total: 0,
  page: 1,
  limit: 20,
  loading: false,
  error: null,
  filters: { status: '', type: '', q: '' },

  setFilters: (filters) => set({ filters: { ...get().filters, ...filters } }),

  fetchInquiries: async (params = {}) => {
    set({ loading: true, error: null });
    try {
      const mergedParams = { ...get().filters, page: get().page, limit: get().limit, ...params };
      Object.keys(mergedParams).forEach((key) => {
        if (!mergedParams[key]) delete mergedParams[key];
      });
      const { data } = await apiClient.get('/inquiries', { params: mergedParams });
      set({
        inquiries: data.inquiries,
        total: data.total,
        page: data.page,
        limit: data.limit,
        loading: false,
      });
      return data;
    } catch (err) {
      set({ error: err?.response?.data?.message || 'Failed to fetch inquiries', loading: false });
      throw err;
    }
  },

  fetchInquiry: async (id) => {
    set({ loading: true, error: null });
    try {
      const { data } = await apiClient.get(`/inquiries/${id}`);
      set({ selectedInquiry: data.inquiry, loading: false });
      return data.inquiry;
    } catch (err) {
      set({ error: err?.response?.data?.message || 'Failed to fetch inquiry', loading: false });
      throw err;
    }
  },

  updateStatus: async (id, status) => {
    try {
      const { data } = await apiClient.patch(`/inquiries/${id}`, { status });
      const updated = data.inquiry;
      set((state) => ({
        inquiries: state.inquiries.map((i) => (i._id === id ? updated : i)),
        selectedInquiry: state.selectedInquiry?._id === id ? updated : state.selectedInquiry,
      }));
      return updated;
    } catch (err) {
      set({ error: err?.response?.data?.message || 'Failed to update status' });
      throw err;
    }
  },

  replyToInquiry: async (id, message) => {
    try {
      const { data } = await apiClient.post(`/inquiries/${id}/reply`, { message });
      const updated = data.inquiry;
      set((state) => ({
        inquiries: state.inquiries.map((i) => (i._id === id ? updated : i)),
        selectedInquiry: state.selectedInquiry?._id === id ? updated : state.selectedInquiry,
      }));
      return updated;
    } catch (err) {
      set({ error: err?.response?.data?.message || 'Failed to reply' });
      throw err;
    }
  },

  deleteInquiry: async (id) => {
    try {
      await apiClient.delete(`/inquiries/${id}`);
      set((state) => ({
        inquiries: state.inquiries.filter((i) => i._id !== id),
        selectedInquiry: state.selectedInquiry?._id === id ? null : state.selectedInquiry,
      }));
    } catch (err) {
      set({ error: err?.response?.data?.message || 'Failed to delete inquiry' });
      throw err;
    }
  },

  selectInquiry: (inquiry) => set({ selectedInquiry: inquiry }),
}));

export default useInquiryStore;
