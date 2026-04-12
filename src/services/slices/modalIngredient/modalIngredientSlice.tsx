import { createSlice } from '@reduxjs/toolkit';
import { TModalIngredient } from './types';
import { PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

const initialState: TModalIngredient = {
  modalIngredient: {
    _id: '',
    name: '',
    type: '',
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    price: 0,
    image: '',
    image_large: '',
    image_mobile: ''
  }
};

export const modalIngredientSlice = createSlice({
  name: 'modalIngredient',
  initialState,
  reducers: {
    showModal: (state, { payload }: PayloadAction<TIngredient>) => {
      state.modalIngredient = payload;
    }
  },
  selectors: {
    getIngredientModal: (state) => state
  }
});

export const { getIngredientModal } = modalIngredientSlice.selectors;
export default modalIngredientSlice.reducer;
export const { showModal } = modalIngredientSlice.actions;
