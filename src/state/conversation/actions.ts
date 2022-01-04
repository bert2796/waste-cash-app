import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import {
  IConversation,
  IConversationSummary,
  IMessage,
  IServiceError,
} from '../../types';
import { Conversation } from '@services/index';
import { RootState } from '../store';
import { ConversationActions } from './constants';
import { tokenSelector, userDataSelector } from '../user/selectors';
import { setAppError } from '../app/actions';

const wait = (waitingTime = 3000) =>
  new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Wait for ${waitingTime} ms: Done!`);

      resolve(true);
    }, waitingTime);
  });

export const addMessage = createAction<IMessage>(
  ConversationActions.ADD_MESSAGE,
);

export const setConversationError = createAction<string | null>(
  ConversationActions.SET_CONVERSATION_ERROR,
);

export const setConversationList = createAction<IConversationSummary[]>(
  ConversationActions.SET_CONVERSATION_LIST,
);

export const getConversationList = createAsyncThunk(
  ConversationActions.GET_CONVERSATION_LIST,
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const token = tokenSelector(state);

      const conversationList = await Conversation.getConversations({ token });

      await wait(1000);

      thunkAPI.dispatch(setConversationList(conversationList.data));

      return Promise.resolve();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error?.response) {
          const axiosError = error?.response as IServiceError;
          if (axiosError?.status && axiosError.status === 400) {
            return thunkAPI.rejectWithValue(axiosError.data.message);
          }
        }
      }

      // set global error
      thunkAPI.dispatch(setAppError('Server is busy. Please try again later.'));

      return Promise.resolve();
    }
  },
);
