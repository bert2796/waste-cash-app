import React from 'react';
import { connect } from 'react-redux';

import { ScreenSellerListOffers } from '@/components/screens/ScreenSeller/ScreenSellerListOffers';
import { productOfferListSelector } from '@/state/product/selectors';
import { AppDispatch, RootState } from '@/state/store';

const mapActionCreators = (dispatch: AppDispatch) => ({});

const mapStateToProps = (state: RootState) => {
  return {
    productOfferList: productOfferListSelector(state),
  };
};

export default connect(
  mapStateToProps,
  mapActionCreators,
)(ScreenSellerListOffers);
