import { createSelector } from '@reduxjs/toolkit';

import {
  IProductOfferState,
  IProduct,
  IProductOffer,
  IUser,
} from '../../types';
import { productDataSelector } from '../product/selectors';
import { userDataSelector } from '../user/selectors';
import { RootState } from '../store';

const rootSelector = createSelector(
  (state: RootState): IProductOfferState => state.productOffer,
  (productOffer: IProductOfferState) => productOffer,
);

export const productOfferListSelector = createSelector(
  productDataSelector,
  (productData: IProduct): IProductOffer[] => productData?.offers,
);

export const offerSelector = createSelector(
  [productOfferListSelector, userDataSelector],
  (offers: IProductOffer[], userData: IUser): IProductOffer | undefined =>
    offers?.find((offer) => offer.user.id === userData.id),
);

export const productOfferSuccessSelector = createSelector(
  rootSelector,
  (productOffer: IProductOfferState): string => productOffer.success,
);

export const productOfferErrorSelector = createSelector(
  rootSelector,
  (productOffer: IProductOfferState): string => productOffer.error,
);

export const isLoadingSelector = createSelector(
  rootSelector,
  (productOffer: IProductOfferState): boolean => productOffer.isLoading,
);
