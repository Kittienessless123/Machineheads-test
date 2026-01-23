// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import authorsSlice from './slices/authorsSlice';
import articlesReducer from './slices/articleSlice';
import authSlice from './slices/authSlice';

// Создаем Redux store
export const store = configureStore({
  reducer: {
    user: userReducer, 
    articles: articlesReducer,
    authors: authorsSlice,
    auth: authSlice
  },
  
  // Middleware по умолчанию (уже включает redux-thunk)
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Игнорируем определенные пути (например, для File объектов)
        ignoredActions: ['user/login'], // если в payload есть File
      },
    }),
});

// Типы для TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;