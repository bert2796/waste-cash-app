import React from 'react';
import { connect } from 'react-redux';

import { MainNavigation } from '@/navigations/MainNavigation';
import { initialize } from '@/state/app/actions';
import { isInitializeSelector, roleSelector } from '@/state/app/selectors';
import { AppDispatch, RootState } from '@/state/store';
import { isAuthSelector, userDataSelector } from '@/state/user/selectors';

const mapActionCreators = (dispatch: AppDispatch) => ({
  initialize(): void {
    dispatch(initialize());
  },
});

const mapStateToProps = (state: RootState) => ({
  isAuth: isAuthSelector(state),
  isInitialize: isInitializeSelector(state),
  role: userDataSelector(state)?.role,
});

export default connect(mapStateToProps, mapActionCreators)(MainNavigation);
