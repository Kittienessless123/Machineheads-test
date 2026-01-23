/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { authorService } from '../../../api';
import type { Author, AuthorDetail, CreateAuthorRequest, UpdateAuthorRequest } from '../../../types';

interface AuthorsState {
  authors: Author[];
  currentAuthor: AuthorDetail | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthorsState = {
  authors: [],
  currentAuthor: null,
  loading: false,
  error: null,
};

// Async thunks
export const fetchAuthors = createAsyncThunk(
  'authors/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authorService.getAuthors();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка загрузки авторов');
    }
  }
);

export const fetchAuthorDetail = createAsyncThunk(
  'authors/fetchDetail',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await authorService.getAuthorDetail(id);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка загрузки автора');
    }
  }
);

export const addAuthor = createAsyncThunk(
  'authors/add',
  async (data: CreateAuthorRequest, { rejectWithValue }) => {
    try {
      await authorService.addAuthor(data);
      return true;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка добавления автора');
    }
  }
);

export const editAuthor = createAsyncThunk(
  'authors/edit',
  async (data: UpdateAuthorRequest, { rejectWithValue }) => {
    try {
      await authorService.editAuthor(data);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка редактирования автора');
    }
  }
);

export const removeAuthor = createAsyncThunk(
  'authors/remove',
  async (id: number, { rejectWithValue }) => {
    try {
      await authorService.removeAuthor(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка удаления автора');
    }
  }
);

const authorsSlice = createSlice({
  name: 'authors',
  initialState,
  reducers: {
    setAuthors: (state, action: PayloadAction<Author[]>) => {
      state.authors = action.payload;
    },
    setCurrentAuthor: (state, action: PayloadAction<AuthorDetail | null>) => {
      state.currentAuthor = action.payload;
    },
    clearCurrentAuthor: (state) => {
      state.currentAuthor = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAuthors.fulfilled, (state, action) => {
        state.loading = false;
        state.authors = action.payload;
      })
      .addCase(fetchAuthors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
     .addCase(fetchAuthorDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAuthorDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.currentAuthor = action.payload;
      })
      .addCase(fetchAuthorDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Add Author
      .addCase(addAuthor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addAuthor.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addAuthor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Edit Author
      .addCase(editAuthor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editAuthor.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.authors.findIndex(a => a.id === action.payload.id);
        if (index !== -1) {
          state.authors[index] = {
            ...state.authors[index],
            ...action.payload,
          };
        }
      })
      .addCase(editAuthor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Remove Author
      .addCase(removeAuthor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeAuthor.fulfilled, (state, action) => {
        state.loading = false;
        state.authors = state.authors.filter(a => a.id !== action.payload);
        if (state.currentAuthor?.id === action.payload) {
          state.currentAuthor = null;
        }
      })
      .addCase(removeAuthor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { 
  setAuthors, 
  setCurrentAuthor, 
  clearCurrentAuthor, 
  setLoading, 
  setError 
} = authorsSlice.actions;
export default authorsSlice.reducer;