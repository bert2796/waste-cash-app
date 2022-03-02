import React from 'react';
import { Socket } from 'socket.io-client';
import { connect } from 'react-redux';

import { IMessage } from '../types';
import { AppDispatch, RootState } from '@state/store';
import {
  addConversationDataMessage,
  getConversationData,
  sendMessage,
} from '@state/conversation/actions';
import {
  conversationDataSelector,
  isLoadingSelector,
} from '@state/conversation/selectors';
import { userDataSelector } from '@state/user/selectors';
import { WithSocket as withSocket } from '@atoms/WithSocket/WithSocket';
import { ScreenShopChat } from '@screens/ScreenShop/ScreenShopChat';

const mapActionCreators = (dispatch: AppDispatch) => ({
  onAddConversationDataMessage(params: IMessage): void {
    dispatch(addConversationDataMessage(params));
  },
  onGetConversationData(conversationId: number): void {
    dispatch(getConversationData({ conversationId }));
  },
  onSendMessage(params: {
    socket: Socket;
    conversdationId?: number;
    recipientId?: number;
    content: string;
  }): void {
    dispatch(sendMessage(params));
  },
});

const mapStateToProps = (state: RootState) => {
  return {
    conversationData: conversationDataSelector(state),
    me: userDataSelector(state),
    isLoading: isLoadingSelector(state),
  };
};

export default connect(
  mapStateToProps,
  mapActionCreators,
)(withSocket(ScreenShopChat));
