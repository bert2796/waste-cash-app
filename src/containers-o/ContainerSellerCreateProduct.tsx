import React from 'react';
import { connect } from 'react-redux';

import { ProductStatus } from '../types';
import { AppDispatch, RootState } from '@state/store';
import { getCategoryList } from '@state/category/actions';
import {
  categoryListSelector,
  isLoadingSelector as isCategoryLoadingSelector,
} from '@state/category/selectors';
import {
  isLoadingSelector as isProductLoadingSelector,
  productErrorSelector,
  productSuccessSelector,
} from 'state/product/selectors';
import { createProduct, setProductSuccess } from '@state/product/actions';
import { ScreenSellerCreateProduct } from '@screens/ScreenSeller/ScreenSellerCreateProduct';

const mapActionCreators = (dispatch: AppDispatch) => ({
  onGetCategoryList(): void {
    dispatch(getCategoryList());
  },
  onCreateProduct(params: {
    photo: any;
    name: string;
    category: string;
    description: string;
    price: number;
    status: ProductStatus;
  }): void {
    dispatch(createProduct(params));
  },
  onSetProductSuccess(success: string | null): void {
    dispatch(setProductSuccess(success));
  },
});

const mapStateToProps = (state: RootState) => {
  return {
    categoryList: categoryListSelector(state),
    productError: productErrorSelector(state),
    productSuccess: productSuccessSelector(state),
    isCategoryLoading: isCategoryLoadingSelector(state),
    isProductLoading: isProductLoadingSelector(state),
  };
};

export default connect(
  mapStateToProps,
  mapActionCreators,
)(ScreenSellerCreateProduct);
