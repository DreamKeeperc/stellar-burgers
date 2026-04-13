import { FC, memo, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { OrderCardProps } from './type';
import { TIngredient } from '@utils-types';
import { OrderCardUI } from '../ui/order-card';
import { getIngredientsSelector } from '../../services/slices/ingredientsSlice/ingredientsSlice';

import { useDispatch, useSelector } from '../../services/store';
import { getOrderSelector } from '../../services/slices/orderSlice/orderSlice';
import { getFeedsSelector } from '../../services/slices/feedsSlice/feedsSlice';

const maxIngredients = 6;

export const OrderCard: FC<OrderCardProps> = memo(({ order }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { ingredients: ingredientsFromConstructor } = useSelector(
    getIngredientsSelector
  );

  /** TODO: взять переменную из стора */
  const ingredients: TIngredient[] = ingredientsFromConstructor;

  const orderInfo = useMemo(() => {
    if (!ingredients.length) return null;

    const ingredientsInfo = order.ingredients.reduce(
      (acc: TIngredient[], item: string) => {
        const ingredient = ingredients.find((ing) => ing._id === item);
        if (ingredient) return [...acc, ingredient];
        return acc;
      },
      []
    );

    const total = ingredientsInfo.reduce((acc, item) => acc + item.price, 0);

    const ingredientsToShow = ingredientsInfo.slice(0, maxIngredients);

    const remains =
      ingredientsInfo.length > maxIngredients
        ? ingredientsInfo.length - maxIngredients
        : 0;

    const date = new Date(order.createdAt);
    return {
      ...order,
      ingredientsInfo,
      ingredientsToShow,
      remains,
      total,
      date
    };
  }, [order, ingredients]);

  if (!orderInfo) return null;

  const handleClick = () => {
    const basePath =
      location.pathname === '/feed' ? '/feed' : '/profile/orders';
    navigate(`${basePath}/${order.number}`, {
      state: { background: location }
    });
  };

  return (
    <OrderCardUI
      orderInfo={orderInfo}
      maxIngredients={maxIngredients}
      locationState={{ background: location }}
      handleClick={handleClick}
    />
  );
});
