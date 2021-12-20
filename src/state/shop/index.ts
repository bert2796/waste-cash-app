import { createSlice } from '@reduxjs/toolkit';

import { IShopState, UserRoles } from '../../types';
import {
  getShopList,
  setShopList,
  setShopError,
  setShopSuccess,
} from './actions';

const initialState: IShopState = {
  isLoading: false,
  error: '',
  success: '',
  data: {
    id: 0,
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zip: 0,
    mobile: 0,
    email: '',
    username: '',
    role: '' as UserRoles,
  },
  list: [],
};

export const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {},
  extraReducers: {
    // Get Product List
    [`${getShopList.pending}`]: (state) => ({
      ...state,
      isLoading: true,
    }),

    [`${getShopList.fulfilled}`]: (state) => ({
      ...state,
      isLoading: false,
    }),

    [`${getShopList.rejected}`]: (state, action) => ({
      ...state,
      error: action.payload,
      isLoading: false,
    }),

    // Set Product List
    [`${setShopList.type}`]: (state, action) => ({
      ...state,
      list: action.payload,
    }),

    // Set Product Error
    [`${setShopError.type}`]: (state, action) => ({
      ...state,
      error: action.payload || '',
    }),

    // Set Product Success
    [`${setShopSuccess.type}`]: (state, action) => ({
      ...state,
      success: action.payload || '',
    }),
  },
});
