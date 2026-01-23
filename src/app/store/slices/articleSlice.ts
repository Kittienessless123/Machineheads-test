import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { articlesService } from '../../../api';
import type { ArticlePreview, ArticleDetail} from '../../../types/index';

interface  ArticleState {
  articles: ArticlePreview[];
  currentArticle: ArticleDetail | null;
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
}

const initialState:  ArticleState = {
  articles: [],
  currentArticle: null,
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
};

export const fetchArticles = createAsyncThunk(
  'posts/fetchAll',
  async (page: number, { rejectWithValue }) => {
    try {
      const response = await articlesService.getArticles(page);
      return { articles: response.data, page: page || 1 };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка загрузки статей');
    }
  }
);

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    setArticles: (state, action: PayloadAction<ArticlePreview[]>) => {
      state.articles = action.payload;
    },
    setCurrentPost: (state, action: PayloadAction<ArticleDetail | null>) => {
      state.currentPost = action.payload;
    },
    clearCurrentPost: (state) => {
      state.currentPost = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    // ... обработка async thunks
  },
});

export const { 
  setArticles, 
  setCurrentPost, 
  clearCurrentPost, 
  setLoading, 
  setError,
  setPage 
} = articlesSlice.actions;
export default articlesSlice.reducer;