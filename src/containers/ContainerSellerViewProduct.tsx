import React from 'react';
import { connect } from 'react-redux';

import { ScreenSellerViewProduct } from '@/components/screens/ScreenSeller/ScreenSellerViewProduct';
import { getProduct } from '@/state/product/actions';
import {
  isLoadingSelector,
  productDataSelector,
} from '@/state/product/selectors';
import { AppDispatch, RootState } from '@/state/store';

const mapActionCreators = (dispatch: AppDispatch) => ({
  getProduct(id: number): void {
    dispatch(getProduct(id));
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
