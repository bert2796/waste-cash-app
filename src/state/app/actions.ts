import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import { User } from '@/services/index';

import { getConversationList } from '../conversation/actions';
import { getNotificationList } from '../notification/actions';
import { RootState } from '../store';
import { setUserData, setUserError, setUserToken } from '../user/actions';
import { tokenSelector } from '../user/selectors';
import { AppActions } from './constants';

export const setAppError = createAction<string | null>(
  AppActions.SET_APP_ERROR,
);

export const initialize = createAsyncThunk(
  AppActions.INIT,
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const token = tokenSelector(state);

      // clear some data before initialization
      thunkAPI.dispatch(setUserError(null));
      thunkAPI.dispatch(setAppError(null));

      // end initialization if no token
      if (!token) {
        return Promise.resolve();
      }

      // try to retrieve user data using token
      try {
        const userData = await User.me({ token });

        // set user data
        thunkAPI.dispatch(setUserData(userData.data));

        // get notifications
        thunkAPI.dispatch(getNotificationList());

        // get messages
        thunkAPI.dispatch(getConversationList());
      } catch (error) {
        // clear user token
        thunkAPI.dispatch(setUserToken(null));
        return Promise.resolve();
      }

      return Promise.resolve();
    } catch (error) {
      return thunkAPI.rejectWithValue('Done');
    }
  },
);
