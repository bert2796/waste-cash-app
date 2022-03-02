import React from 'react';
import { connect } from 'react-redux';

import { ScreenSignIn } from '@/components/screens/ScreenLO';
import { UserRoles } from '@/constants/index';
import { AppDispatch, RootState } from '@/state/store';
import { setUserIsLoading, signIn } from '@/state/user/actions';
import { isLoadingSelector, userErrorSelector } from '@/state/user/selectors';

const mapActionCreators = (dispatch: AppDispatch) => ({
  setLoading(isLoading: boolean): void {
    dispatch(setUserIsLoading(isLoading));
  },
  signIn(params: { username: string; password: string }): void {
    dispatch(signIn(params));
  },
});

const mapStateToProps = (state: RootState) => ({
  error: userErrorSelector(state),
  isLoading: isLoadingSelector(state),
});

export default connect(mapStateToProps, mapActionCreators)(ScreenSignIn);
