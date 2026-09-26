import apiClient from './client';

export async function listInquiries(params = {}) {
  const { data } = await apiClient.get('/inquiries', { params });
  return data;
}

export async function getInquiry(id) {
  const { data } = await apiClient.get(`/inquiries/${id}`);
  return data.inquiry;
}

export async function updateInquiryStatus(id, status) {
  const { data } = await apiClient.patch(`/inquiries/${id}`, { status });
  return data.inquiry;
}

export async function replyToInquiry(id, message) {
  const { data } = await apiClient.post(`/inquiries/${id}/reply`, { message });
  return data.inquiry;
}

export async function deleteInquiry(id) {
  const { data } = await apiClient.delete(`/inquiries/${id}`);
  return data;
}
