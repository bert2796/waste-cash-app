import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { CommonActions } from '@react-navigation/native';
import axios from 'axios';

import { IUser, IServiceError, UserRoles } from '../../types';
import { Auth, User } from '@services/index';
import { RootState } from '../store';
import { getNotificationList } from '../notification/actions';
import { UserActions } from './constants';
import { setAppError } from '../app/actions';
import { roleSelector } from '../app/selectors';
import navigate from '../navigation';

const wait = (waitingTime = 3000) =>
  new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Wait for ${waitingTime} ms: Done!`);

      resolve(true);
    }, waitingTime);
  });

export const setUserData = createAction<IUser | null>(
  UserActions.SET_USER_DATA,
);

export const setUserError = createAction<string | null>(
  UserActions.SET_USER_ERROR,
);

export const setUserToken = createAction<string | null>(
  UserActions.SET_USER_TOKEN,
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

      thunkAPI.dispatch(setUserData(userData.data));
      thunkAPI.dispatch(setUserToken(userLogin.data.accessToken));
      thunkAPI.dispatch(getNotificationList());

      await wait(1000);
      // navigate()?.dispatch(StackActions.replace('SellerHome'));

      // remove logged out screens
      navigate()?.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [
            {
              name:
                appRole === UserRoles.BUYER
                  ? 'BuyerHome'
                  : appRole === UserRoles.SELLER
                  ? 'SellerHome'
                  : appRole === UserRoles.JUNKSHOP
                  ? 'ShopHome'
                  : '',
            },
          ],
        }),
      );

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

export const signOut = createAsyncThunk(
  UserActions.SIGN_OUT,
  async (_, thunkAPI) => {
    // clear user data
    thunkAPI.dispatch(setUserData(null));

    // clear token
    thunkAPI.dispatch(setUserToken(null));

    // remove logged out screens
    navigate()?.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: 'SelectRole' }],
      }),
    );

    return Promise.resolve();
  },
);
