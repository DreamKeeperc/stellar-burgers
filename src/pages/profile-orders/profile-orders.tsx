import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  getOrders,
  getUserOrdersSelector
} from '../../services/slices/userOrdersSlice/userOrderSlice';

export const ProfileOrders: FC = () => {
  const { orders: userOrders } = useSelector(getUserOrdersSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const orders: TOrder[] = userOrders;
  return <ProfileOrdersUI orders={orders} />;
};
