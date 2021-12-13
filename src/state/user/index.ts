import { createSlice } from '@reduxjs/toolkit';

import { IUserState, UserRoles } from '../../types';
import {
  setUserData,
  setUserError,
  setUserToken,
  signIn,
  signOut,
} from './actions';

const initialState: IUserState = {
  isLoading: false,
  error: '',
  token: '',
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
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    // Sign In
    [`${signIn.pending}`]: (state) => ({
      ...state,
      error: '',
      isLoading: true,
    }),
    [`${signIn.fulfilled}`]: (state) => ({
      ...state,
      error: '',
      isLoading: false,
    }),
    [`${signIn.rejected}`]: (state, action) => ({
      ...state,
      error: action.payload,
      isLoading: false,
    }),

    // Sign Out
    [`${signOut.pending}`]: (state) => ({
      ...state,
      isLoading: true,
    }),
    [`${signOut.fulfilled}`]: (state) => ({
      ...state,
      isLoading: false,
    }),
    [`${signOut.rejected}`]: (state) => ({
      ...state,
      isLoading: false,
    }),

    // Set User Data
    [`${setUserData.type}`]: (state, action) => {
      if (!action.payload) {
        return {
          ...state,
          data: {
            ...state.data,
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
        };
      }

      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload,
        },
      };
    },

    // Set User Error
    [`${setUserError.type}`]: (state, action) => {
      if (!action.payload) {
        return {
          ...state,
          error: '',
        };
      }

      return {
        ...state,
        error: action.payload,
      };
    },

    // Set User Token
    [`${setUserToken.type}`]: (state, action) => {
      if (!action.payload) {
        return {
          ...state,
          token: '',
        };
      }

      return {
        ...state,
        token: action.payload,
      };
    },
  },
});
