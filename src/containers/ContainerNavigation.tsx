import React from 'react';
import { connect } from 'react-redux';

import { AppDispatch, RootState } from '@state/store';
import { initialize, setAppError } from '@state/app/actions';
import { isInitializeSelector, appErrorSelector } from '@state/app/selectors';
import { hasUnseenNotificationSelector } from '@state/notification/selectors';
import { isAuthSelector, userDataSelector } from '@state/user/selectors';
import { Navigation } from '@navigations/Navigation';

const mapActionCreators = (dispatch: AppDispatch) => ({
  onAppInitialize(): void {
    dispatch(initialize());
  },
  onSetAppError(error: string | null): void {
    dispatch(setAppError(error));
  },
});

const mapStateToProps = (state: RootState) => {
  const isAuth = isAuthSelector(state);
  const userData = userDataSelector(state);

  return {
    error: appErrorSelector(state),
    isAuth,
    isConnected: state.network.isConnected,
    isInitialize: isInitializeSelector(state),
    hasUnseenNotification: hasUnseenNotificationSelector(state),
    role: userData.role,
  };
};

export default connect(mapStateToProps, mapActionCreators)(Navigation);
