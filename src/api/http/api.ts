// api/http.ts
import axios, { type AxiosInstance } from 'axios';
import  { BASE_URL } from "../../types/index";

// Создаем экземпляр axios с настройками
const $api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor для добавления токена к каждому запросу
$api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});

// Interceptor для обработки ошибок
$api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Если 401 - токен истек
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default $api;