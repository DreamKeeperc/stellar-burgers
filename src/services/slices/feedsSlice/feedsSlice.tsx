import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TFeedsState } from './types';
import { TOrder } from '@utils-types';

export const fetchFeeds = createAsyncThunk('feeds/fetch', async () => {
  const res = await getFeedsApi();
  return res;
});

const initialState: TFeedsState = {
  feeds: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  isLoading: false,
  error: null
};

export const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  selectors: {
    getFeedsSelector: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.feeds = action.payload;
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      });
  }
});

export const { getFeedsSelector } = feedsSlice.selectors;

export default feedsSlice.reducer;
