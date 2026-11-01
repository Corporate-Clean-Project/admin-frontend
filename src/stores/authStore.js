import { create } from 'zustand';
import apiClient from '../api/client';

const useAuthStore = create((set) => ({
  user: null,
  loading: true,

  initialize: async () => {
    const token = localStorage.getItem('tp_admin_access_token');
    if (!token) {
      set({ loading: false });
      return;
    }
    try {
      const { data } = await apiClient.get('/auth/me');
      set({ user: data.user, loading: false });
    } catch {
      localStorage.removeItem('tp_admin_access_token');
      localStorage.removeItem('tp_admin_refresh_token');
      set({ user: null, loading: false });
    }
  },

  login: async (email, password) => {
    const { data } = await apiClient.post('/auth/login', { email, password });
    localStorage.setItem('tp_admin_access_token', data.accessToken);
    localStorage.setItem('tp_admin_refresh_token', data.refreshToken);
    set({ user: data.user });
    return data.user;
  },

  logout: () => {
    localStorage.removeItem('tp_admin_access_token');
    localStorage.removeItem('tp_admin_refresh_token');
    set({ user: null });
  },

  forgotPassword: async (email) => {
    const { data } = await apiClient.post('/auth/forgot-password', { email });
    return data;
  },

  resetPassword: async (payload) => {
    const { data } = await apiClient.post('/auth/reset-password', payload);
    return data;
  },

  acceptInvite: async (payload) => {
    const { data } = await apiClient.post('/auth/accept-invite', payload);
    return data;
  },
}));

export default useAuthStore;
