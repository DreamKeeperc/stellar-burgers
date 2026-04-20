import { TOrder } from '@utils-types';

export type TUserOrdersState = {
  orders: TOrder[];
  order: TOrder | null;
  isLoading: boolean;
  error: string | null;
};
