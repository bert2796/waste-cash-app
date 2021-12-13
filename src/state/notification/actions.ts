import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { INotification, IServiceError } from '../../types';
import { Notification } from '@services/index';
import { RootState } from '../store';
import { NotificationActions } from './constants';
import { tokenSelector } from '../user/selectors';
import { setAppError } from '../app/actions';

export const setNotificationError = createAction<string | null>(
  NotificationActions.SET_NOTIFICATION_ERROR,
);

export const setNotificationSuccess = createAction<string | null>(
  NotificationActions.SET_NOTIFICATION_SUCCESS,
);

export const setNotificationList = createAction<INotification[]>(
  NotificationActions.SET_NOTIFICATION_LIST,
);

const wait = (waitingTime = 3000) =>
  new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Wait for ${waitingTime} ms: Done!`);

      resolve(true);
    }, waitingTime);
  });

export const getNotificationList = createAsyncThunk(
  NotificationActions.GET_NOTIFICATION_LIST,
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const token = tokenSelector(state);

      const notificationList = await Notification.getNotifications({ token });
      await wait(1000);

      if (notificationList) {
        thunkAPI.dispatch(setNotificationList(notificationList.data));
      }

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

export const seenNotification = createAsyncThunk(
  NotificationActions.SEEN_NOTIFICATION,
  async (params: { notificationId: number }, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const token = tokenSelector(state);

      await Notification.updateNotification({
        isSeen: true,
        notificationId: params.notificationId,
        token,
      });
      await wait(1000);

      return Promise.resolve({ id: params.notificationId });
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
