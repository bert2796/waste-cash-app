import React from 'react';
import { connect } from 'react-redux';

import { IMessage } from '../types';
import { AppDispatch, RootState } from '@state/store';
import { initialize, setAppError } from '@state/app/actions';
import {
  addConversationDataMessage,
  addConversationListMessage,
} from '@state/conversation/actions';
import { isInitializeSelector, appErrorSelector } from '@state/app/selectors';
import { hasUnseenConversationSelector } from '@state/conversation/selectors';
import { hasUnseenNotificationSelector } from '@state/notification/selectors';
import { isAuthSelector, userDataSelector } from '@state/user/selectors';
import { WithSocket as withSocket } from '@atoms/WithSocket/WithSocket';
import { Navigation } from '@navigations/Navigation';

const mapActionCreators = (dispatch: AppDispatch) => ({
  onAddConversationDataMessage(params: IMessage): void {
    dispatch(addConversationDataMessage(params));
  },
  onAddConversationListMessage(params: IMessage): void {
    dispatch(addConversationListMessage(params));
  },
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
    hasUnseenConversation: hasUnseenConversationSelector(state),
    hasUnseenNotification: hasUnseenNotificationSelector(state),
    me: userData,
    role: userData.role,
  };
};

export default connect(
  mapStateToProps,
  mapActionCreators,
)(withSocket(Navigation));
