import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {execQuery} from './execQuery';

function oneMonthAgo() {
  // on free plan we can search only 1 month deep with 24h delay, so it's excessive
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  currentDate.setMonth(currentMonth - 1);
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export const searchNews = createAsyncThunk(
  'news/searchNews', 
  async (query, { rejectWithValue }) => {
    const url = 'https://newsapi.org/v2/everything';
    const searchParams = new URLSearchParams();
    searchParams.append('q', query);
    searchParams.append('searchIn', 'title');
    searchParams.append('language', 'en');
    searchParams.append('sortBy', 'relevancy');
    searchParams.append('pageSize', '10');
    searchParams.append('page', '1');
    searchParams.append('from', oneMonthAgo());
    const searchUrl = url + '?' + searchParams.toString();
    return execQuery(searchUrl);
  });

const newsSlice = createSlice({
  name: 'news',
  initialState: {
    searchQuery: '',
    searchResults: [],
    isLoading: false,
    isError: false
  },
  reducers: {
    setSearchQuery: (state, action) => {
    state.searchQuery = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchNews.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.searchResults = [];
      })
      .addCase(searchNews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.searchResults = action.payload;
      })
      .addCase(searchNews.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.searchResults = [];
      });
  },
});

export const { setSearchQuery } = newsSlice.actions;
export default newsSlice.reducer;
