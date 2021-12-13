import { createSlice } from '@reduxjs/toolkit';

import { ICategoryState } from '../../types';
import { getCategoryList, setCategoryList } from './actions';

const initialState: ICategoryState = {
  isLoading: false,
  error: '',
  list: [],
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: {
    // Get Category List
    [`${getCategoryList.pending}`]: (state) => ({
      ...state,
      error: '',
      isLoading: true,
    }),
    [`${getCategoryList.fulfilled}`]: (state) => ({
      ...state,
      error: '',
      isLoading: false,
    }),
    [`${getCategoryList.rejected}`]: (state, action) => ({
      ...state,
      error: action.payload,
      isLoading: false,
    }),

    // Set Category List
    [`${setCategoryList.type}`]: (state, action) => ({
      ...state,
      list: action.payload,
    }),
  },
});
