import { create } from 'zustand';
import apiClient from '../api/client';

const useContentStore = create((set) => ({
  content: null,
  loading: false,
  error: null,

  fetchContent: async (page) => {
    set({ loading: true, error: null });
    try {
      const { data } = await apiClient.get(`/content/${page}`);
      set({ content: data.data, loading: false });
      return data.data;
    } catch (err) {
      set({ error: err?.response?.data?.message || 'Failed to fetch content', loading: false });
      throw err;
    }
  },

  saveContent: async (page, contentData) => {
    set({ loading: true, error: null });
    try {
      const { data } = await apiClient.put(`/content/${page}`, { data: contentData });
      set({ content: data.data, loading: false });
      return data.data;
    } catch (err) {
      set({ error: err?.response?.data?.message || 'Failed to save content', loading: false });
      throw err;
    }
  },
}));

export default useContentStore;
