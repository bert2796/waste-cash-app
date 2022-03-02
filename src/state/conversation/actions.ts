import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Socket } from 'socket.io-client';

import { Conversation } from '@/services/index';

import { setAppError } from '../app/actions';
import { RootState } from '../store';
import { tokenSelector } from '../user/selectors';
import { ConversationActions } from './constants';

// export const addConversationDataMessage = createAction<IMessage>(
//   ConversationActions.ADD_CONVERSATION_DATA_MESSAGE,
// );

// export const addConversationListMessage = createAction<IMessage>(
//   ConversationActions.ADD_CONVERSATION_LIST_MESSAGE,
// );

// export const setConversationError = createAction<string | null>(
//   ConversationActions.SET_CONVERSATION_ERROR,
// );


// export const sendMessage = createAsyncThunk(
//   ConversationActions.SEND_MESSAGE,
//   async (
//     params: {
//       socket: Socket;
//       conversdationId?: number;
//       recipientId?: number;
//       content: string;
//     },
//     thunkAPI,
//   ) => {
//     try {
//       const state = thunkAPI.getState() as RootState;
//       const conversationData = conversationDataSelector(state);
//       const token = tokenSelector(state);
//       const { socket, ...rest } = params;

//       const createMessage = await Message.createMessage({ token, ...rest });

//       if (!conversationData) {
//         thunkAPI.dispatch(
//           setConversationData({
//             createdAt: createMessage.data?.conversation?.createdAt || '1',
//             id: createMessage.data?.conversation?.id || 0,
//             messages: [createMessage.data],
//             updatedAt: createMessage.data?.conversation?.updatedAt || '1',
//           }),
//         );
//       }

//       // add the message in conversation data
//       thunkAPI.dispatch(addConversationDataMessage(createMessage.data));

//       // add the message in the list
//       thunkAPI.dispatch(addConversationListMessage(createMessage.data));

//       socket.emit('createMessage', createMessage.data);
//       socket.emit('directMessage', createMessage.data);

//       return Promise.resolve();
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         if (error?.response) {
//           const axiosError = error?.response as IServiceError;
//           if (axiosError?.status && axiosError.status === 400) {
//             return thunkAPI.rejectWithValue(axiosError.data.message);
//           }
//         }
//       }

//       // set global error
//       thunkAPI.dispatch(setAppError('Server is busy. Please try again later.'));

//       return Promise.resolve();
//     }
//   },
// );

// export const getConversationData = createAsyncThunk(
//   ConversationActions.GET_CONVERSATION_DATA,
//   async (params: { conversationId?: number; shopId?: number }, thunkAPI) => {
//     try {
//       const state = thunkAPI.getState() as RootState;
//       const token = tokenSelector(state);

//       const conversationData = await Conversation.getConversation({
//         token,
//         ...params,
//       });

//       thunkAPI.dispatch(setConversationData(conversationData.data));

//       return Promise.resolve();
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         if (error?.response) {
//           const axiosError = error?.response as IServiceError;
//           if (axiosError?.status && axiosError.status === 400) {
//             return thunkAPI.rejectWithValue(axiosError.data.message);
//           }
//         }
//       }

//       // set global error
//       thunkAPI.dispatch(setAppError('Server is busy. Please try again later.'));

//       return Promise.resolve();
//     }
//   },
// );

// export const getConversationList = createAsyncThunk(
//   ConversationActions.GET_CONVERSATION_LIST,
//   async (_, thunkAPI) => {
//     try {
//       const state = thunkAPI.getState() as RootState;
//       const token = tokenSelector(state);

//       const conversationList = await Conversation.getConversations({ token });

//       thunkAPI.dispatch(setConversationList(conversationList.data));

//       return Promise.resolve();
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         if (error?.response) {
//           const axiosError = error?.response as IServiceError;
//           if (axiosError?.status && axiosError.status === 400) {
//             return thunkAPI.rejectWithValue(axiosError.data.message);
//           }
//         }
//       }

//       // set global error
//       thunkAPI.dispatch(setAppError('Server is busy. Please try again later.'));

//       return Promise.resolve();
//     }
//   },
// );

export const getConversations = createAsyncThunk(
  ConversationActions.GET_CONVERSATION_LIST,
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const token = tokenSelector(state);

      const getConversationsRes = await Conversation.getConversations({
        token,
      });
      const conversations: Objects.ConversationSummary[] =
        getConversationsRes.data;

      return Promise.resolve({ list: conversations });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error?.response) {
          const axiosError: Objects.ServiceError = error?.response;
          if (axiosError?.status && axiosError.status === 400) {
            return thunkAPI.rejectWithValue(axiosError.data.message);
          }
        }
      }

      // set global error
      thunkAPI.dispatch(setAppError('Server is busy. Please try again later.'));

      return Promise.reject();
    }
  },
);
