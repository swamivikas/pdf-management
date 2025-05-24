import axios from 'axios';
import { getToken } from './utils/auth.js';

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://pdf-management-backend.onrender.com'
  : '/api'; // proxied to backend in development

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api; 