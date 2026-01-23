/* eslint-disable @typescript-eslint/no-explicit-any */
// store/slices/userSlice.ts
import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import UserService from '../../../api/services/UserService';
import type { User, UserState, LoginCredentials } from '../../../types';

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

// 1. Создаем Async Thunk для логина
// Это ПРОМЕЖУТОЧНЫЙ слой между компонентом и сервисом
export const loginUser = createAsyncThunk(
  'user/login', // тип action: 'user/login'
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      // 1. Делаем запрос на сервер через UserService
      const tokenResponse = await UserService.login(credentials);
      
      // 2. Сохраняем токены в localStorage
      localStorage.setItem('access_token', tokenResponse.data.access_token);
      localStorage.setItem('refresh_token', tokenResponse.data.refresh_token);
      localStorage.setItem('access_expired_at', tokenResponse.data.access_expired_at.toString());
      localStorage.setItem('refresh_expired_at', tokenResponse.data.refresh_expired_at.toString());
      
      // 3. Получаем профиль пользователя
      const profileResponse = await UserService.getProfile();
      
      // 4. Возвращаем данные для сохранения в store
      return profileResponse.data;
    } catch (error: any) {
      // Если ошибка - возвращаем ее
      return rejectWithValue(
        error.response?.data?.message || 'Ошибка при входе'
      );
    }
  }
);

// 2. Создаем Async Thunk для получения профиля
export const fetchProfile = createAsyncThunk(
  'user/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await UserService.getProfile();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Ошибка загрузки профиля'
      );
    }
  }
);

// 3. Создаем Async Thunk для логаута
export const logoutUser = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      UserService.logout();
      return null;
    } catch (error: any) {
      return rejectWithValue('Ошибка при выходе');
    }
  }
);

// 4. Создаем слайс (slice) - это КОМБИНАЦИЯ:
// - Начальное состояние
// - Синхронные редюсеры (reducers)
// - Обработка асинхронных действий (extraReducers)
const userSlice = createSlice({
  name: 'user', // Имя слайса
  initialState, // Начальное состояние
  
  // СИНХРОННЫЕ РЕДЮСЕРЫ (аналоги @action в MobX)
  reducers: {
    // Установить пользователя
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    
    // Установить загрузку
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    
    // Установить ошибку
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    
    // Очистить ошибку
    clearError: (state) => {
      state.error = null;
    },
  },
  
  // ОБРАБОТКА АСИНХРОННЫХ ДЕЙСТВИЙ (extraReducers)
  // Здесь мы реагируем на lifecycle actions от async thunks
  extraReducers: (builder) => {
    builder
      // ========== LOGIN ==========
      // Когда loginUser.pending (начало запроса)
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      
      // Когда loginUser.fulfilled (успешный запрос)
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      
      // Когда loginUser.rejected (ошибка запроса)
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload as string;
      })
      
      // ========== FETCH PROFILE ==========
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProfile.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload as string;
      })
      
      // ========== LOGOUT ==========
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      });
  },
});

// Экспортируем СИНХРОННЫЕ actions (reducers)
export const { setUser, setLoading, setError, clearError } = userSlice.actions;

// Экспортируем reducer для store
export default userSlice.reducer;