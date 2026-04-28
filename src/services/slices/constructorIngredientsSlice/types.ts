import { TConstructorIngredient, TIngredient } from '@utils-types';

export type TIngredientsState = {
  bun: TConstructorIngredient | null;
  ingredients: Array<TConstructorIngredient>;
};
