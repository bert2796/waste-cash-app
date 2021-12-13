import React from 'react';
import { connect } from 'react-redux';

import { AppDispatch, RootState } from '@state/store';
import {
  isLoadingSelector,
  productDataSelector,
} from '@state/product/selectors';
import { getProductData, setProductData } from '@state/product/actions';
import { ScreenSellerViewProduct } from '@screens/ScreenSeller/ScreenSellerViewProduct';

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
    isLoading: isLoadingSelector(state),
    productData: productDataSelector(state),
  };
};

export default connect(
  mapStateToProps,
  mapActionCreators,
)(ScreenSellerViewProduct);
