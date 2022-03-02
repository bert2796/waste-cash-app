import React from 'react';
import { connect } from 'react-redux';

import { AppDispatch, RootState } from '@state/store';
import { productOfferListSelector } from '@state/productOffer/selectors';
import { getProductData, setProductData } from '@state/product/actions';
import { ScreenSellerViewOffers } from '@screens/ScreenSeller/ScreenSellerViewOffers';

const mapActionCreators = (dispatch: AppDispatch) => ({
  onGetProductData(params: { productId: number }): void {
    dispatch(getProductData(params));
  },
  onSetProductData(productData: null): void {
    dispatch(setProductData(productData));
  },
});

const mapStateToProps = (state: RootState) => {
  return {
    offerList: productOfferListSelector(state),
  };
};

export default connect(
  mapStateToProps,
  mapActionCreators,
)(ScreenSellerViewOffers);
