import { FC, useEffect, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  clearConstructor,
  getConstructorSelector
} from '../../services/slices/constructorIngredientsSlice/constructorIngredientsSlice';
import {
  closeModal,
  getOrderSelector,
  orderBurger
} from '../../services/slices/orderSlice/orderSlice';
import { getUserSelector } from '../../services/slices/userSlice/userSlice';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { ingredients, bun } = useSelector(getConstructorSelector);
  const { isAuthenticated } = useSelector(getUserSelector);
  const {
    orderModalData: orderModal,
    orderRequest: request,
    order
  } = useSelector(getOrderSelector);

  const constructorItems = {
    bun: bun,
    ingredients: ingredients
  };

  const orderRequest = request;

  const orderModalData = orderModal;

  const onOrderClick = () => {
    if (isAuthenticated === false) {
      navigate('/login', { replace: true });
    } else {
      if (!constructorItems.bun || orderRequest) return;
      const orderIngredients = [
        constructorItems.bun._id,
        ...constructorItems.ingredients.map((ing) => ing._id),
        constructorItems.bun._id
      ];
      dispatch(orderBurger(orderIngredients));
    }
  };

  const closeOrderModal = () => {
    dispatch(closeModal());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
