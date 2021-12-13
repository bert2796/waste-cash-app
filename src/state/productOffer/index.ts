import { createSlice } from '@reduxjs/toolkit';

import { IProductOfferState } from '../../types';
import {
  createProductOffer,
  setProductOfferError,
  setProductOfferSuccess,
} from './actions';

const initialState: IProductOfferState = {
  isLoading: false,
  success: '',
  error: '',
};

export const productOfferSlice = createSlice({
  name: 'productOffer',
  initialState,
  reducers: {},
  extraReducers: {
    // Create Product Offer
    [`${createProductOffer.pending}`]: (state) => ({
      ...state,
      isLoading: true,
    }),

    [`${createProductOffer.fulfilled}`]: (state) => ({
      ...state,
      isLoading: false,
    }),

    [`${createProductOffer.rejected}`]: (state, action) => ({
      ...state,
      error: action.payload,
      isLoading: false,
    }),

    // Set Product Offer Error
    [`${setProductOfferError.type}`]: (state, action) => ({
      ...state,
      error: action.payload || '',
    }),

    // Set Product Offer Success
    [`${setProductOfferSuccess.type}`]: (state, action) => ({
      ...state,
      success: action.payload || '',
    }),
  },
});
