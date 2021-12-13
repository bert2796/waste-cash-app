import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { ICategory, IServiceError } from '../../types';
import { Category } from '@services/index';
import { CategoryActions } from './constants';
import { setAppError } from '../app/actions';

const wait = (waitingTime = 3000) =>
  new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Wait for ${waitingTime} ms: Done!`);

      resolve(true);
    }, waitingTime);
  });

export const setCategoryList = createAction<ICategory[]>(
  CategoryActions.SET_CATEGORY_LIST,
);

export const getCategoryList = createAsyncThunk(
  CategoryActions.GET_CATEGORY_LIST,
  async (_, thunkAPI) => {
    try {
      const categoryList = await Category.getCategories();

      await wait(1000);

      thunkAPI.dispatch(setCategoryList(categoryList.data));

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
