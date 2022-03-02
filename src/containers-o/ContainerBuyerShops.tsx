import React from 'react';
import { connect } from 'react-redux';

import { AppDispatch, RootState } from '@state/store';
import { isLoadingSelector, shopListSelector } from '@state/shop/selectors';
import { getShopList } from '@state/shop/actions';
import { ScreenBuyerShops } from '@screens/ScreenBuyer/ScreenBuyerShops';

const mapActionCreators = (dispatch: AppDispatch) => ({
  onGetShopList(): void {
    dispatch(getShopList());
  },
});

const mapStateToProps = (state: RootState) => {
  return {
    isLoading: isLoadingSelector(state),
    shopList: shopListSelector(state),
  };
};

export default connect(mapStateToProps, mapActionCreators)(ScreenBuyerShops);
