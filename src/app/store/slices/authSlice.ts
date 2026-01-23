/* eslint-disable @typescript-eslint/no-explicit-any */
// store/slices/authSlice.ts
import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { authService , userService} from "../../../api/index.ts";
import type { User, TokenResponse } from "../../../types";

interface AuthState {
  user: User | null;
  isAuth: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuth: false,
  isAdmin: false,
  isLoading: false,
  error: null,
};

// Async thunks (аналоги ваших async методов в MobX)
export const login = createAsyncThunk(
  "auth/login",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await authService.login(credentials);

      // Сохраняем токены
      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("refresh_token", response.data.refresh_token);
      localStorage.setItem(
        "access_expired_at",
        response.data.access_expired_at.toString(),
      );
      localStorage.setItem(
        "refresh_expired_at",
        response.data.refresh_expired_at.toString(),
      );

      // Получаем профиль
      const profileResponse = await userService.getProfile();
      return {
        user: profileResponse.data,
        isAdmin: profileResponse.data.roles.some(
          (role: { code: string; }) => role.code === "admin",
        ),
      };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Ошибка входа");
    }
  },
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout();
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("access_expired_at");
      localStorage.removeItem("refresh_expired_at");
      return null;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Ошибка выхода");
    }
  },
);

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const isAuthenticated = authService.isAuthenticated();

      if (!isAuthenticated) {
        throw new Error("Токен истек или отсутствует");
      }

      const profileResponse = await userService.getProfile();
      return {
        user: profileResponse.data,
        isAdmin: profileResponse.data.roles.some(
          (role: { code: string; }) => role.code === "admin",
        ),
      };
    } catch (error: any) {
      return rejectWithValue(error.message || "Ошибка проверки авторизации");
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Синхронные actions (аналоги set методов в MobX)
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    setAdmin: (state, action: PayloadAction<boolean>) => {
      state.isAdmin = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuth = true;
        state.user = action.payload.user;
        state.isAdmin = action.payload.isAdmin;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuth = false;
        state.isAdmin = false;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      // CheckAuth
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuth = true;
        state.user = action.payload.user;
        state.isAdmin = action.payload.isAdmin;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuth = false;
        state.user = null;
        state.isAdmin = false;
      });
  },
});

export const { setUser, setAuth, setAdmin, setLoading, setError, clearError } =
  authSlice.actions;
export default authSlice.reducer;
