import { createSelector } from '@reduxjs/toolkit';

import { IShopState, IUser } from '../../types';
import { RootState } from '../store';

const rootSelector = createSelector(
  (state: RootState): IShopState => state.shop,
  (shop: IShopState) => shop,
);

export const shopDataSelector = createSelector(
  rootSelector,
  (shop: IShopState): IUser => shop.data as IUser,
);

export const shopListSelector = createSelector(
  rootSelector,
  (shop: IShopState): IUser[] => shop.list,
);

export const shopSuccessSelector = createSelector(
  rootSelector,
  (shop: IShopState): string => shop.success,
);

export const shopErrorSelector = createSelector(
  rootSelector,
  (shop: IShopState): string => shop.error,
);

export const isLoadingSelector = createSelector(
  rootSelector,
  (shop: IShopState): boolean => shop.isLoading,
);
