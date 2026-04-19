import { createSlice } from '@reduxjs/toolkit';
import { TIngredientsState } from './types';
import { TConstructorIngredient, TIngredient } from '../../../utils/types';
import { PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';

const initialState: TIngredientsState = {
  bun: null,
  ingredients: []
};

export const constructorIngredientsSlice = createSlice({
  name: 'constructorIngredients',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, { payload }: PayloadAction<TConstructorIngredient>) => {
        if (payload.type === 'bun') {
          state.bun = payload;
        } else {
          state.ingredients.push(payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: uuid() }
      })
    },
    removeIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload.id
      );
    },
    clearConstructor: (state) => {
      (state.bun = null), (state.ingredients = []);
    }
  },
  selectors: {
    getConstructorSelector: (state) => state
  }
});

export default constructorIngredientsSlice.reducer;
export const { getConstructorSelector } = constructorIngredientsSlice.selectors;
export const { addIngredient, removeIngredient, clearConstructor } =
  constructorIngredientsSlice.actions;
