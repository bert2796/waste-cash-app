import { createSelector } from '@reduxjs/toolkit';

import {
  IConversationState,
  IConversation,
  IConversationSummary,
  IUser,
} from '../../types';
import { RootState } from '../store';
import { userDataSelector } from '../user/selectors';

const rootSelector = createSelector(
  (state: RootState): IConversationState => state.conversation,
  (conversation: IConversationState) => conversation,
);

export const conversationDataSelector = createSelector(
  rootSelector,
  (conversation: IConversationState): IConversation =>
    conversation.data as IConversation,
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
  userDataSelector,
  (conversationList: IConversationSummary[], userData: IUser): boolean =>
    conversationList.some(
      (conversation) =>
        !conversation.message.isSeen &&
        conversation.recipient.id !== userData.id,
    ),
);

export const hasUnseenMessageDataSelector = createSelector(
  conversationDataSelector,
  userDataSelector,
  (conversationData: IConversation, userData: IUser): boolean =>
    conversationData.messages.some(
      (message) => !message.isSeen && message.recipient.id !== userData.id,
    ),
);
