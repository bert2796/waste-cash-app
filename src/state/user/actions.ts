import { CommonActions } from '@react-navigation/native';
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { UserRoles } from '@/constants/index';
import { Auth, User } from '@/services/index';

import { setAppError } from '../app/actions';
import { roleSelector } from '../app/selectors';
import { getConversations } from '../conversation/actions';
import navigate from '../navigation';
import { getNotifications } from '../notification/actions';
import { RootState } from '../store';
import { UserActions } from './constants';

export const setUserData = createAction<Objects.User | null>(
  UserActions.SET_USER_DATA,
);

export const setUserError = createAction<string | null>(
  UserActions.SET_USER_ERROR,
);

export const setUserToken = createAction<string | null>(
  UserActions.SET_USER_TOKEN,
);

export const setUserIsLoading = createAction<boolean | null>(
  UserActions.SET_USER_IS_LOADING,
);
export const signIn = createAsyncThunk(
  UserActions.SIGN_IN,
  async (params: { username: string; password: string }, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const appRole = roleSelector(state);
      const userLogin = await Auth.login(params);
      const userData = await User.me({ token: userLogin.data.accessToken });

      // show error for unmatch app role to user role
      if (appRole !== userData.data.role) {
        return thunkAPI.rejectWithValue('User does not exist.');
      }

      // set necessary details for user
      thunkAPI.dispatch(setUserData(userData.data));
      thunkAPI.dispatch(setUserToken(userLogin.data.accessToken));

      // retrieve notifications and conversations
      thunkAPI.dispatch(getNotifications());
      thunkAPI.dispatch(getConversations());

      // verify where to navigate the user
      let initialScreen = '';

      switch (appRole) {
        case UserRoles.BUYER:
          initialScreen = 'BuyerInitialScreen';
          break;

        case UserRoles.JUNKSHOP:
          initialScreen = 'JunkShopInitialScreen';
          break;

        case UserRoles.SELLER:
          initialScreen = 'SellerInitialScreen';
          break;
      }

      // navigate to home screen
      navigate()?.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [
            {
              name: initialScreen,
            },
          ],
        }),
      );

      return Promise.resolve();
    } catch (error) {
      let message = (error as Error)?.message;

      if (axios.isAxiosError(error)) {
        if (error?.response) {
          const axiosError = error?.response as Objects.ServiceError;
          if (axiosError?.status && axiosError.status === 400) {
            message = axiosError.data.message;
          }
        }
      }

      // set global error
      thunkAPI.dispatch(setAppError('Server is busy. Please try again later.'));

      return Promise.reject(new Error(message));
    }
  },
);

export const signOut = createAsyncThunk(
  UserActions.SIGN_OUT,
  async (_, thunkAPI) => {
    // clear user data
    // thunkAPI.dispatch(setUserData(null));

    // clear token
    // thunkAPI.dispatch(setUserToken(null));

    // navigate to role selection
    navigate()?.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: 'SelectRoleScreen' }],
      }),
    );

    return Promise.resolve();
  },
);
