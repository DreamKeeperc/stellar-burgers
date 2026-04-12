import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { getFeedsSelector } from '../../services/slices/feedsSlice/feedsSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const { feeds } = useSelector(getFeedsSelector);

  const orders: TOrder[] = feeds.orders;
  return <ProfileOrdersUI orders={orders} />;
};
