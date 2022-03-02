import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { Product } from '@/services/index';

import { setAppError } from '../app/actions';
import { addProductOffer } from '../product/actions';
import { productDataSelector } from '../product/selectors';
import { RootState } from '../store';
import { tokenSelector } from '../user/selectors';
import { ProductOfferActions } from './constant';

export const setProductOfferError = createAction<string | null>(
  ProductOfferActions.SET_PRODUCT_OFFER_ERROR,
);

export const setProductOfferSuccess = createAction<string | null>(
  ProductOfferActions.SET_PRODUCT_OFFER_SUCCESS,
);

export const createProductOffer = createAsyncThunk(
  ProductOfferActions.CREATE_PRODUCT_OFFER,
  async (
    params: {
      price: number;
    },
    thunkAPI,
  ) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const token = tokenSelector(state);
      const productData = productDataSelector(state);

      const createdProductOffer = await Product.createProductOffer({
        price: params.price,
        productId: productData.id,
        token,
      });

      // add offer in product data
      thunkAPI.dispatch(addProductOffer(createdProductOffer.data));

      return Promise.resolve('Offer submitted succesfully.');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error?.response) {
          const axiosError = error?.response as Objects.ServiceError;
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
