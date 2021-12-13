import React from 'react';
import { connect } from 'react-redux';

import { AppDispatch, RootState } from '@state/store';
import { setAppError } from '@state/app/actions';
import { roleSelector } from 'state/app/selectors';
import { ScreenSignUp } from '@screens/ScreenSignUp/ScreenSignUp';

const mapActionCreators = (dispatch: AppDispatch) => ({
  onSetAppError(error: string): void {
    dispatch(setAppError(error));
  },
});

const mapStateToProps = (state: RootState) => {
  return {
    role: roleSelector(state),
  };
};

export default connect(mapStateToProps, mapActionCreators)(ScreenSignUp);
