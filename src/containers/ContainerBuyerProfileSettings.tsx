import React from 'react';
import { connect } from 'react-redux';

import { AppDispatch, RootState } from '@state/store';
import { signOut } from '@state/user/actions';
import { isLoadingSelector } from '@state/user/selectors';
import { ScreenBuyerProfileSettings } from '@screens/ScreenBuyer/ScreenBuyerProfileSettings';

const mapActionCreators = (dispatch: AppDispatch) => ({
  onSignOut(): void {
    dispatch(signOut());
  },
});

const mapStateToProps = (state: RootState) => {
  return {
    isLoading: isLoadingSelector(state),
  };
};

export default connect(
  mapStateToProps,
  mapActionCreators,
)(ScreenBuyerProfileSettings);
