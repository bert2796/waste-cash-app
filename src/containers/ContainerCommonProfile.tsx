import React from 'react';
import { connect } from 'react-redux';

import { ScreenProfile } from '@/components/screens/ScreenCommon/ScreenProfile';
import { AppDispatch, RootState } from '@/state/store';
import { signOut } from '@/state/user/actions';
import { isLoadingSelector, userDataSelector } from '@/state/user/selectors';

const mapActionCreators = (dispatch: AppDispatch) => ({
  signOut(): void {
    dispatch(signOut());
  },
});

const mapStateToProps = (state: RootState) => ({
  isLoading: isLoadingSelector(state),
  userData: userDataSelector(state),
});

export default connect(mapStateToProps, mapActionCreators)(ScreenProfile);
