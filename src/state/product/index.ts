import { createSlice } from '@reduxjs/toolkit';

import {
  addProductOffer,
  createProduct,
  getProduct,
  getProducts,
  removeProductOffer,
  setProductSuccess,
} from './actions';

const initialState: State.Product = {
  error: '',
  isLoading: false,
  list: [],
  success: '',
};

export const productSlice = createSlice({
  extraReducers: {
    // Create Product
    [`${createProduct.pending}`]: (state) => ({
      ...state,
      isLoading: true,
    }),
    [`${createProduct.fulfilled}`]: (
      state,
      action: { payload: { data: Objects.Product } },
    ) => ({
      ...state,
      isLoading: false,
      list: [...state.list, action.payload.data],
      success: 'Product succesfully created.',
    }),
    [`${createProduct.rejected}`]: (state) => ({
      ...state,
      isLoading: false,
    }),

    // Get Product
    [`${getProduct.pending}`]: (state) => ({
      ...state,
      isLoading: true,
    }),
    [`${getProduct.fulfilled}`]: (
      state,
      action: { payload: { data: Objects.Product } },
    ) => ({
      ...state,
      data: {
        ...state.data,
        ...action.payload.data,
      },
      isLoading: false,
    }),
    [`${getProduct.rejected}`]: (state) => ({
      ...state,
      isLoading: false,
    }),

    // Get Products
    [`${getProducts.pending}`]: (state) => ({
      ...state,
      isLoading: true,
    }),
    [`${getProducts.fulfilled}`]: (
      state,
      action: { payload: { list: Objects.Product[] } },
    ) => ({
      ...state,
      isLoading: false,
      list: action.payload.list,
    }),
    [`${getProducts.rejected}`]: (state) => ({
      ...state,
      isLoading: false,
    }),

    // Add Product Offer
    [`${addProductOffer.type}`]: (
      state,
      action: { payload: Objects.ProductOffer },
    ) => {
      if (state.data?.offers.length) {
        return {
          ...state,
          data: {
            ...state.data,
            offers: [...(state.data?.offers || []), action.payload],
          },
        };
      }

      return state;
    },

    // Remove Product Offer
    [`${removeProductOffer.type}`]: (state, action: { payload: number }) => {
      if (state.data?.offers.length) {
        return {
          ...state,
          data: {
            ...state.data,
            offers: state.data?.offers.filter(
              (offer) => offer.id !== action.payload,
            ),
          },
        };
      }

      return state;
    },

    // Set Product Success
    [`${setProductSuccess.type}`]: (
      state,
      action: { payload: string | null },
    ) => ({
      ...state,
      success: !action.payload ? '' : action.payload,
    }),
  },
  initialState,
  name: 'product',
  reducers: {},
});
