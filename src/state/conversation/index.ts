import { createSlice } from '@reduxjs/toolkit';

import { getConversations } from './actions';

const initialState: State.Conversation = {
  error: '',
  isLoading: false,
  list: [],
};

export const conversationSlice = createSlice({
  extraReducers: {
    // Get Conversations
    [`${getConversations.pending}`]: (state) => ({
      ...state,
      isLoading: true,
    }),
    [`${getConversations.fulfilled}`]: (
      state,
      action: { payload: { list: Objects.ConversationSummary[] } },
    ) => ({
      ...state,
      isLoading: false,
      list: action.payload.list,
    }),
    [`${getConversations.rejected}`]: (state) => ({
      ...state,
      isLoading: false,
    }),
  },
  initialState,
  name: 'conversation',
  reducers: {},
});
