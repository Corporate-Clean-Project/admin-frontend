import apiClient from './client';

export async function login(email, password) {
  const { data } = await apiClient.post('/auth/login', { email, password });
  return data;
}

export async function fetchMe() {
  const { data } = await apiClient.get('/auth/me');
  return data.user;
}

export async function forgotPassword(email) {
  const { data } = await apiClient.post('/auth/forgot-password', { email });
  return data;
}

export async function resetPassword(payload) {
  const { data } = await apiClient.post('/auth/reset-password', payload);
  return data;
}

export async function acceptInvite(payload) {
  const { data } = await apiClient.post('/auth/accept-invite', payload);
  return data;
}
