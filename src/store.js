import { configureStore } from '@reduxjs/toolkit';
import newsReducer from './components/newsSlice';

export const store = configureStore({
  reducer: {
    news: newsReducer,
  },
});
