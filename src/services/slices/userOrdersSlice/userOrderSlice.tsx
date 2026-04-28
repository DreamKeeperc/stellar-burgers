import { getOrderByNumberApi, getOrdersApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUserOrdersState } from './types';

export const getOrders = createAsyncThunk('orders/fetch', async () => {
  const orders = await getOrdersApi();
  return orders;
});

export const getOrderByNumber = createAsyncThunk(
  'order/fetch',
  async (number: number) => {
    const res = await getOrderByNumberApi(number);
    return res.orders[0];
  }
);

const initialState: TUserOrdersState = {
  orders: [],
  order: null,
  isLoading: false,
  error: null
};

export const userOrderSlice = createSlice({
  name: 'userOrders',
  initialState: initialState,
  reducers: {},
  selectors: {
    getUserOrdersSelector: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.error = action.error.message || null;
      })

      //byNubmer
      .addCase(getOrderByNumber.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order = action.payload;
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      });
  }
});

export const { getUserOrdersSelector } = userOrderSlice.selectors;

export default userOrderSlice.reducer;
