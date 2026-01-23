// api/services/UserService.ts
import $api from '../http/api';
import type { AxiosResponse } from 'axios';
import { User, LoginCredentials } from '../../types/user';

// Это КЛАСС, который делает ВСЕ API вызовы для пользователя
// Аналогично тому, что было у вас в MobX проекте
export default class UserService {
  // Метод для логина
  static async login(credentials: LoginCredentials): Promise<AxiosResponse<{ 
    access_token: string;
    refresh_token: string;
    access_expired_at: number;
    refresh_expired_at: number;
  }>> {
    // Создаем FormData для multipart/form-data
    const formData = new FormData();
    formData.append('email', credentials.email);
    formData.append('password', credentials.password);
    
    return await $api.post('/auth/token-generate', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  // Метод для получения профиля
  static async getProfile(): Promise<AxiosResponse<User>> {
    return await $api.get<User>('/profile');
  }

  // Метод для обновления токена
  static async refreshToken(refreshToken: string): Promise<AxiosResponse<{
    access_token: string;
    refresh_token: string;
  }>> {
    const formData = new FormData();
    formData.append('refresh_token', refreshToken);
    
    return await $api.post('/auth/token-refresh', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  // Метод для логаута (очистка localStorage)
  static logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('access_expired_at');
    localStorage.removeItem('refresh_expired_at');
  }

  // Проверка, авторизован ли пользователь
  static isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    const expiredAt = localStorage.getItem('access_expired_at');
    
    if (!token || !expiredAt) return false;
    
    // Проверяем, не истек ли токен
    const expirationTime = parseInt(expiredAt, 10);
    return Date.now() < expirationTime * 1000; // expired_at в секундах
  }
}