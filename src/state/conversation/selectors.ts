import { createSelector, createSlice } from '@reduxjs/toolkit';
import { create } from 'react-test-renderer';

import {
  IConversationState,
  IConversation,
  IConversationSummary,
} from '../../types';
import { RootState } from '../store';

const rootSelector = createSelector(
  (state: RootState): IConversationState => state.conversation,
  (conversation: IConversationState) => conversation,
);

export const conversationListSelector = createSelector(
  rootSelector,
  (conversation: IConversationState): IConversationSummary[] =>
    conversation.list,
);

export const isLoadingSelector = createSelector(
  rootSelector,
  (conversation: IConversationState): boolean => conversation.isLoading,
);

export const hasUnseenConversationSelector = createSelector(
  conversationListSelector,
  (conversationList: IConversationSummary[]): boolean =>
    conversationList.some((conversation) => !conversation.message.isSeen),
);
