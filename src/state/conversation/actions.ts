import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Socket } from 'socket.io-client';
import axios from 'axios';

import {
  IConversation,
  IConversationSummary,
  IMessage,
  IServiceError,
} from '../../types';
import { Conversation, Message } from '@services/index';
import { RootState } from '../store';
import { ConversationActions } from './constants';
import { tokenSelector } from '../user/selectors';
import { setAppError } from '../app/actions';
import { conversationDataSelector } from './selectors';
import { createDispatchHook } from 'react-redux';

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

export const addConversationDataMessage = createAction<IMessage>(
  ConversationActions.ADD_CONVERSATION_DATA_MESSAGE,
);

export const addConversationListMessage = createAction<IMessage>(
  ConversationActions.ADD_CONVERSATION_LIST_MESSAGE,
);

export const setConversationError = createAction<string | null>(
  ConversationActions.SET_CONVERSATION_ERROR,
);

export const setConversationData = createAction<IConversation | null>(
  ConversationActions.SET_CONVERSATION_DATA,
);

export const setConversationList = createAction<IConversationSummary[]>(
  ConversationActions.SET_CONVERSATION_LIST,
);

export const sendMessage = createAsyncThunk(
  ConversationActions.SEND_MESSAGE,
  async (
    params: {
      socket: Socket;
      conversdationId?: number;
      recipientId?: number;
      content: string;
    },
    thunkAPI,
  ) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const conversationData = conversationDataSelector(state);
      const token = tokenSelector(state);
      const { socket, ...rest } = params;

      const createMessage = await Message.createMessage({ token, ...rest });

      if (!conversationData) {
        thunkAPI.dispatch(
          setConversationData({
            id: createMessage.data?.conversation?.id || 0,
            messages: [createMessage.data],
            createdAt: createMessage.data?.conversation?.createdAt || '1',
            updatedAt: createMessage.data?.conversation?.updatedAt || '1',
          }),
        );
      }
      thunkAPI.dispatch(addConversationDataMessage(createMessage.data));
      thunkAPI.dispatch(addConversationListMessage(createMessage.data));

      socket.emit('createMessage', createMessage.data);

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

export const getConversationData = createAsyncThunk(
  ConversationActions.GET_CONVERSATION_DATA,
  async (params: { conversationId?: number; shopId?: number }, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const token = tokenSelector(state);

      const conversationData = await Conversation.getConversation({
        token,
        ...params,
      });

      await wait(1000);

      thunkAPI.dispatch(setConversationData(conversationData.data));

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
