import React from 'react';
import { connect } from 'react-redux';

import { AppDispatch, RootState } from '@state/store';
import { categoryListSelector } from '@state/category/selectors';
import {
  isLoadingSelector,
  productListSelector,
} from '@state/product/selectors';
import { getCategoryList } from '@state/category/actions';
import { getProductList } from '@state/product/actions';
import { ScreenBuyerProducts } from '@screens/ScreenBuyer/ScreenBuyerProducts';

const mapActionCreators = (dispatch: AppDispatch) => ({
  onGetCategoryList(): void {
    dispatch(getCategoryList());
  },
  onGetProductList(): void {
    dispatch(getProductList());
  },
});

const mapStateToProps = (state: RootState) => {
  return {
    isLoading: isLoadingSelector(state),
    categoryList: categoryListSelector(state),
    productList: productListSelector(state),
  };
};

export default connect(mapStateToProps, mapActionCreators)(ScreenBuyerProducts);
