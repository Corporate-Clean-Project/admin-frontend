import apiClient from './client';

export async function getContent(page) {
  const { data } = await apiClient.get(`/content/${page}`);
  return data.data;
}

export async function saveContent(page, contentData) {
  const { data } = await apiClient.put(`/content/${page}`, { data: contentData });
  return data.data;
}
