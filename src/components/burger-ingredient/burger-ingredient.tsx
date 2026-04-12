import { FC, memo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from '../../services/store';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import {
  addIngredient,
  getConstructorSelector
} from '../../services/slices/constructorIngredientsSlice/constructorIngredientsSlice';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const { bun } = useSelector(getConstructorSelector);

    // взять данные из стора

    const handleAdd = () => {
      dispatch(addIngredient(ingredient));
      if (ingredient.type === bun?.type) {
        dispatch(addIngredient(bun));
      }
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
