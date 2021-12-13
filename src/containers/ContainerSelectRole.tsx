import React from 'react';
import { connect } from 'react-redux';

import { UserRoles } from '../types';
import { AppDispatch, RootState } from '@state/store';
import { appSlice } from '@state/app';
import { ScreenSelectRole } from '@screens/ScreenSelectRole/ScreenSelectRole';

const actions = appSlice.actions;

const mapActionCreators = (dispatch: AppDispatch) => {
  return {
    onSetRole(role: UserRoles): void {
      dispatch(actions.setRole({ role }));
    },
  };
};

const mapStateToProps = (state: RootState) => {
  return {
    role: state.app.role,
  };
};

export default connect(mapStateToProps, mapActionCreators)(ScreenSelectRole);
