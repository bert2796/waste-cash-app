import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { IProductOffer, IProduct, IServiceError } from '../../types';
import { Product } from '@services/index';
import { RootState } from '../store';
import { ProductOfferActions } from './constant';
import { tokenSelector } from '../user/selectors';
import { productDataSelector } from '../product/selectors';
import { setAppError } from '../app/actions';
import { addProductOffer } from '../product/actions';

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
        token,
        productId: productData.id,
        price: params.price,
      });

      thunkAPI.dispatch(addProductOffer(createdProductOffer.data));
      thunkAPI.dispatch(setProductOfferSuccess('Offer submitted succesfully.'));
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
