import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../services/store';
import { getIngredientModal } from '../../services/slices/modalIngredient/modalIngredientSlice';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  const { modalIngredient } = useSelector(getIngredientModal);
  const ingredientData = modalIngredient;

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
