import React from 'react';
import { connect } from 'react-redux';

import { AppDispatch, RootState } from '@state/store';
import {
  isLoadingSelector as isLoadingProductSelector,
  productDataSelector,
} from '@state/product/selectors';
import {
  isLoadingSelector as isLoadingProductOfferSelector,
  offerSelector,
  productOfferSuccessSelector,
} from '@state/productOffer/selectors';
import { getProductData, setProductData } from '@state/product/actions';
import {
  createProductOffer,
  setProductOfferSuccess,
} from '@state/productOffer/actions';
import { WithSocket as withSocket } from '@atoms/WithSocket/WithSocket';
import { ScreenBuyerViewProduct } from '@screens/ScreenBuyer/ScreenBuyerViewProduct';

const mapActionCreators = (dispatch: AppDispatch) => ({
  onCreateProductOffer(params: { price: number }): void {
    dispatch(createProductOffer(params));
  },
  onGetProductData(params: { productId: number }): void {
    dispatch(getProductData(params));
  },
  onSetProductData(productData: null): void {
    dispatch(setProductData(productData));
  },
  onSetProductOfferSuccess(message: string | null): void {
    dispatch(setProductOfferSuccess(message));
  },
});

const mapStateToProps = (state: RootState) => {
  const offer = offerSelector(state);

  return {
    isLoadingProduct: isLoadingProductSelector(state),
    isLoadingProductOffer: isLoadingProductOfferSelector(state),
    hasOfferedAlready: Boolean(offer),
    productOfferSuccess: productOfferSuccessSelector(state),
    productData: productDataSelector(state),
    offer,
  };
};

export default connect(
  mapStateToProps,
  mapActionCreators,
)(withSocket(ScreenBuyerViewProduct));
