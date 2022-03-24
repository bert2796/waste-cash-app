import React from 'react';
import { connect } from 'react-redux';

import { ScreenSellerListOffers } from '@/components/screens/ScreenSeller/ScreenSellerListOffers';
import { productPendingOfferListSelector } from '@/state/product/selectors';
import { rejectProductOffer } from '@/state/productOffer/actions';
import { AppDispatch, RootState } from '@/state/store';

const mapActionCreators = (dispatch: AppDispatch) => ({
  rejectProductOffer(offerId: number): void {
    dispatch(rejectProductOffer({ offerId }));
  },
});

const mapStateToProps = (state: RootState) => {
  return {
    productOfferList: productPendingOfferListSelector(state),
  };
};

export default connect(
  mapStateToProps,
  mapActionCreators,
)(ScreenSellerListOffers);
