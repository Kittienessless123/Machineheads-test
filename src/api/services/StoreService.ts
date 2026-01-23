// services/storeService.ts
import { store } from '../../app/store';
import { 
  login, 
  logout, 
  checkAuth, 
  setUser, 
  setAuth, 
  setAdmin,
  setLoading,
  setError,
  clearError
} from '../../app/store/slices/authSlice';
import {
  fetchAuthors,
  fetchAuthorDetail,
  addAuthor,
  editAuthor,
  removeAuthor,
  setAuthors,
  setCurrentAuthor,
  clearCurrentAuthor,
} from '../../app/store/slices/authorsSlice';
// ... импорты для других слайсов

// Главный сервис для работы со стором (аналог вашего MobX Store класса)
class StoreService {
  // Auth методы (аналоги вашего MobX стора)
  async login(email: string, password: string) {
    try {
      const result = await store.dispatch(login({ email, password }));
      if (login.fulfilled.match(result)) {
        return { success: true, user: result.payload.user };
      } else {
        return { success: false, error: result.payload as string };
      }
    } catch (error) {
      return { success: false, error: 'Ошибка сети' };
    }
  }

  async logout() {
    try {
      const result = await store.dispatch(logout());
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Ошибка выхода' };
    }
  }

  async checkAuth() {
    try {
      store.dispatch(setLoading(true));
      const result = await store.dispatch(checkAuth());
      store.dispatch(setLoading(false));
      
      if (checkAuth.fulfilled.match(result)) {
        return { 
          success: true, 
          isAuth: true, 
          user: result.payload.user,
          isAdmin: result.payload.isAdmin,
        };
      } else {
        return { 
          success: false, 
          isAuth: false, 
          error: result.payload as string 
        };
      }
    } catch (error) {
      store.dispatch(setLoading(false));
      return { success: false, error: 'Ошибка сети' };
    }
  }

  setUser(user: unknown) {
    store.dispatch(setUser(user));
  }

  setAuth(isAuth: boolean) {
    store.dispatch(setAuth(isAuth));
  }

  setAdmin(isAdmin: boolean) {
    store.dispatch(setAdmin(isAdmin));
  }

  setLoading(loading: boolean) {
    store.dispatch(setLoading(loading));
  }

  // Authors методы (аналоги ваших language методов)
  async fetchAuthors() {
    try {
      const result = await store.dispatch(fetchAuthors());
      if (fetchAuthors.fulfilled.match(result)) {
        return { success: true, authors: result.payload };
      } else {
        return { success: false, error: result.payload as string };
      }
    } catch (error) {
      return { success: false, error: 'Ошибка сети' };
    }
  }

  async fetchAuthorDetail(id: number) {
    try {
      const result = await store.dispatch(fetchAuthorDetail(id));
      if (fetchAuthorDetail.fulfilled.match(result)) {
        return { success: true, author: result.payload };
      } else {
        return { success: false, error: result.payload as string };
      }
    } catch (error) {
      return { success: false, error: 'Ошибка сети' };
    }
  }

  async addAuthor(data: unknown) {
    try {
      const result = await store.dispatch(addAuthor(data));
      if (addAuthor.fulfilled.match(result)) {
        // После добавления перезагружаем список
        await this.fetchAuthors();
        return { success: true };
      } else {
        return { success: false, error: result.payload as string };
      }
    } catch (error) {
      return { success: false, error: 'Ошибка сети' };
    }
  }

  // ... остальные методы аналогично
  
  // Геттеры для получения состояния
  getState() {
    return store.getState();
  }

  getAuthState() {
    return store.getState().auth;
  }

  getAuthorsState() {
    return store.getState().authors;
  }

  getPostsState() {
    return store.getState().posts;
  }
  
  // Синхронные сеттеры
  setAuthors(authors: unknown[]) {
    store.dispatch(setAuthors(authors));
  }

  setCurrentAuthor(author: unknown | null) {
    store.dispatch(setCurrentAuthor(author));
  }

  clearCurrentAuthor() {
    store.dispatch(clearCurrentAuthor());
  }
}

export const storeService = new StoreService();
export default storeService;