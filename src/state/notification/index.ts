import { createSlice } from '@reduxjs/toolkit';

import { INotificationState } from '../../types';
import {
  getNotificationList,
  seenNotification,
  setNotificationError,
  setNotificationSuccess,
  setNotificationList,
} from './actions';

const initialState: INotificationState = {
  isLoading: false,
  success: '',
  error: '',
  data: null,
  list: [],
};

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {},
  extraReducers: {
    // Get Notification List
    [`${getNotificationList.pending}`]: (state) => ({
      ...state,
      isLoading: true,
    }),

    [`${getNotificationList.fulfilled}`]: (state) => ({
      ...state,
      isLoading: false,
    }),

    [`${getNotificationList.rejected}`]: (state, action) => ({
      ...state,
      error: action.payload,
      isLoading: false,
    }),

    // Seen Notification
    [`${seenNotification.pending}`]: (state) => ({
      ...state,
    }),

    [`${seenNotification.fulfilled}`]: (state, action) => ({
      ...state,
      list: [
        ...state.list.map((notification) => {
          if (notification.id === action.payload.id) {
            return {
              ...notification,
              isSeen: true,
            };
          }
          return notification;
        }),
      ],
    }),

    [`${seenNotification.rejected}`]: (state, action) => ({
      ...state,
      error: action.payload,
    }),

    // Set Notification List
    [`${setNotificationList.type}`]: (state, action) => ({
      ...state,
      list: action.payload,
    }),

    // Set Notification Error
    [`${setNotificationError.type}`]: (state, action) => ({
      ...state,
      error: action.payload || '',
    }),

    // Set Notification Success
    [`${setNotificationSuccess.type}`]: (state, action) => ({
      ...state,
      success: action.payload || '',
    }),
  },
});
