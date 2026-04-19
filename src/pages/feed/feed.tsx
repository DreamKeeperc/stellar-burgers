import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  fetchFeeds,
  getFeedsSelector,
  refreshFeeds
} from '../../services/slices/feedsSlice/feedsSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const { feeds } = useSelector(getFeedsSelector);

  useEffect(() => {
    dispatch(fetchFeeds());
  }, [dispatch]);

  const orders: TOrder[] = feeds.orders;

  const handleGetFeeds = () => {
    dispatch(refreshFeeds());
    dispatch(fetchFeeds());
  };

  if (!orders.length) {
    return <Preloader />;
  } else {
    return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
  }
};
