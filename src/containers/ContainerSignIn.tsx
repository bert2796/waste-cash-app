import React from 'react';
import { connect } from 'react-redux';

import { AppDispatch, RootState } from '@state/store';
import { setUserError, signIn } from '@state/user/actions';
import { userErrorSelector, isLoadingSelector } from '@state/user/selectors';
import { ScreenSignIn } from '@screens/ScreenSignIn/ScreenSignIn';

const mapActionCreators = (dispatch: AppDispatch) => ({
  onSetUserError(error: string | null): void {
    dispatch(setUserError(error));
  },
  onSignIn(username: string, password: string): void {
    dispatch(signIn({ username, password }));
  },
});

const mapStateToProps = (state: RootState) => {
  return {
    error: userErrorSelector(state),
    isLoading: isLoadingSelector(state),
  };
};

export default connect(mapStateToProps, mapActionCreators)(ScreenSignIn);
