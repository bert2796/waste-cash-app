import { createSlice } from '@reduxjs/toolkit';

import {
  IConversationState,
  IConversationSummary,
  IMessage,
} from '../../types';
import {
  addMessage,
  getConversationList,
  setConversationList,
  setConversationError,
} from './actions';

const initialState: IConversationState = {
  isLoading: false,
  error: '',
  list: [],
  messages: [],
};

export const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {},
  extraReducers: {
    // Add Message
    [`${addMessage.type}`]: (state, action: { payload: IMessage }) => {
      const conversdationIndex = state.list.findIndex(
        (conversation) => conversation.id === action.payload.conversation.id,
      );

      const {
        payload: {
          id,
          content,
          isSeen,
          createdAt,
          conversation,
          recipient,
          sender,
        },
      } = action;
      const newConversation: IConversationSummary = {
        id: conversation.id,
        message: {
          id,
          content,
          isSeen,
          createdAt,
        },
        recipient: {
          id: recipient.id,
          firstName: recipient.firstName,
          lastName: recipient.lastName,
        },
        sender: {
          id: sender.id,
          firstName: sender.firstName,
          lastName: sender.lastName,
        },
      };

      if (conversdationIndex > -1) {
        let conversationSummary = [...state.list];
        conversationSummary = conversationSummary.splice(conversdationIndex, 0);

        return {
          ...state,
          list: [newConversation, ...conversationSummary],
        };
      } else {
        return {
          ...state,
          list: [newConversation, ...state.list],
        };
      }
    },

    // Get Conversation List
    [`${getConversationList.pending}`]: (state) => ({
      ...state,
      isLoading: true,
    }),

    [`${getConversationList.fulfilled}`]: (state) => ({
      ...state,
      isLoading: false,
    }),

    [`${getConversationList.rejected}`]: (state, action) => ({
      ...state,
      error: action.payload,
      isLoading: false,
    }),

    // Set Conversation List
    [`${setConversationList.type}`]: (state, action) => ({
      ...state,
      list: action.payload,
    }),
  },
});
