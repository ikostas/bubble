import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {execQuery} from './execQuery';

export const getNews = createAsyncThunk(
  'topNews/getNews', 
  async (query, { rejectWithValue }) => {
    const url = 'https://newsapi.org/v2/top-headlines';
    const searchParams = new URLSearchParams();
    searchParams.append('country', 'us');
    searchParams.append('category', 'technology');
    // searchParams.append('pageSize', '20');
   //  searchParams.append('language', 'en');
    // searchParams.append('page', '1');
    const searchUrl = url + '?' + searchParams.toString();
    try {
      const articles = await execQuery(searchUrl);
      return articles;
    } catch (err) {
      console.error('Error in getNews thunk:', err);
      return rejectWithValue(err.message || 'Failed to fetch news.');
    }
  });

const topSlice = createSlice({
  name: 'topNews',
  initialState: {
    topNews: [],
    isLoading: false,
    isError: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNews.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.topNews = [];
        state.error = null;
      })
      .addCase(getNews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.topNews = action.payload;
        state.error = null;
      })
      .addCase(getNews.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.topNews = [];
        state.error = action.payload;
      });
  },
});

export default topSlice.reducer;
