import axios from 'axios';
import { TMDB_BASE_URL } from '../constants/tmdb';
import { secureStorage } from '../utils/secureStorage';

// Create axios instance with default config
const api = axios.create({
  baseURL: TMDB_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  params: {
    api_key: 'YOUR_TMDB_API_KEY', // Replace with your actual TMDB API key
  },
  timeout: 10000, // 10 seconds
});

// Add request interceptor to inject token
api.interceptors.request.use(
  async (config) => {
    const token = await secureStorage.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response) {
      // Handle specific error status codes
      switch (error.response.status) {
        case 401:
          // Token expired or invalid
          await secureStorage.deleteToken();
          break;
        case 429:
          // Rate limit exceeded
          console.warn('Rate limit exceeded');
          break;
        default:
          console.error('API Error:', error.response.data);
      }
    }
    return Promise.reject(error);
  }
);

export default api; 