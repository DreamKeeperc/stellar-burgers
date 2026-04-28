import { TOrdersData } from '@utils-types';

export type TFeedsState = {
  feeds: TOrdersData;
  isLoading: boolean;
  error: string | null;
};
