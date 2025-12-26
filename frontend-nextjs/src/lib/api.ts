// src/lib/api.ts
import axios from 'axios';

// Khi chạy local thì dùng localhost, khi deploy sẽ dùng link Render
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getProjects = async () => {
  const response = await api.get('/projects');
  return response.data;
};

export const getProfile = async () => {
  const response = await api.get('/profile');
  return response.data;
};

export const getActivities = async () => {
  const response = await api.get('/activities');
  return response.data;
};

export const getCertificates = async () => {
  const response = await api.get('/certificates');
  return response.data;
};

export const getBlogPosts = async () => {
  const response = await api.get('/blog-posts');
  return response.data;
};