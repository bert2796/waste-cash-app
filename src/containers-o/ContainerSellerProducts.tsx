import React from 'react';
import { connect } from 'react-redux';

import { AppDispatch, RootState } from '@state/store';
import {
  isLoadingSelector,
  productListSelector,
} from '@state/product/selectors';
import { getProductList } from '@state/product/actions';
import { ScreenSellerProducts } from '@screens/ScreenSeller/ScreenSellerProducts';

const mapActionCreators = (dispatch: AppDispatch) => ({
  onGetProductList(): void {
    dispatch(getProductList());
  },
});

const mapStateToProps = (state: RootState) => {
  return {
    isLoading: isLoadingSelector(state),
    productList: productListSelector(state),
  };
};

export default connect(
  mapStateToProps,
  mapActionCreators,
)(ScreenSellerProducts);
