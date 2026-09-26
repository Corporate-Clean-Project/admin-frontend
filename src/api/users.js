import apiClient from './client';

export async function listUsers() {
  const { data } = await apiClient.get('/users');
  return data.users;
}

export async function inviteUser(payload) {
  const { data } = await apiClient.post('/users/invite', payload);
  return data.user;
}

export async function updateUser(id, payload) {
  const { data } = await apiClient.patch(`/users/${id}`, payload);
  return data.user;
}

export async function deleteUser(id) {
  const { data } = await apiClient.delete(`/users/${id}`);
  return data;
}
