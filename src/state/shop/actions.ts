import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { IUser, IServiceError } from '../../types';
import { Shop } from '@services/index';
import { ShopActions } from './constants';
import { setAppError } from '../app/actions';

const wait = (waitingTime = 3000) =>
  new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Wait for ${waitingTime} ms: Done!`);

      resolve(true);
    }, waitingTime);
  });

export const setShopError = createAction<string | null>(
  ShopActions.SET_SHOP_ERROR,
);

export const setShopSuccess = createAction<string | null>(
  ShopActions.SET_SHOP_SUCCESS,
);

export const setShopList = createAction<IUser[]>(ShopActions.SET_SHOP_LIST);

export const getShopList = createAsyncThunk(
  ShopActions.GET_SHOP_LIST,
  async (_, thunkAPI) => {
    try {
      const shops = await Shop.getShops();

      await wait(1000);

      thunkAPI.dispatch(setShopList(shops.data));

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
