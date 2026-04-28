import { TOrder } from '@utils-types';

export type TOrderState = {
  order: TOrder;
  orderModalData: TOrder | null;
  orderRequest: boolean;
};
