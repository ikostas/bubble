import { configureStore } from '@reduxjs/toolkit';
import newsReducer from './components/newsSlice';
import topNewsReducer from './components/topSlice';

export const store = configureStore({
  reducer: {
    news: newsReducer,
    topNews: topNewsReducer,
  },
});
