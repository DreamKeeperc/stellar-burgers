import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrderState } from './types';
import { orderBurgerApi } from '@api';
import { clearConstructor } from '../constructorIngredientsSlice/constructorIngredientsSlice';

export const orderBurger = createAsyncThunk(
  'order/post',
  async (ingredients: string[], { dispatch }) => {
    const data = await orderBurgerApi(ingredients);
    dispatch(clearConstructor());
    return {
      ...data.order,
      ingredients: ingredients
    };
  }
);

const initialState: TOrderState = {
  order: {
    _id: '',
    status: '',
    name: '',
    createdAt: '',
    updatedAt: '',
    number: 0,
    ingredients: []
  },
  orderModalData: null,
  orderRequest: false
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    closeModal: (state) => {
      state.orderModalData = null;
    }
  },
  selectors: {
    getOrderSelector: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.pending, (state) => {
        state.orderRequest = true;
        state.orderModalData = null;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.order = action.payload;
        state.orderModalData = action.payload;
      })
      .addCase(orderBurger.rejected, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = null;
      });
  }
});

export default orderSlice.reducer;
export const { getOrderSelector } = orderSlice.selectors;
export const { closeModal } = orderSlice.actions;
