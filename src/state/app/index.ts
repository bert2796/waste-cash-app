import { createSlice } from '@reduxjs/toolkit';

import { IAppState, UserRoles } from '../../types';
import { initialize, setAppError } from './actions';

const initialState: IAppState = {
  error: '',
  isInitialize: false,
  role: '' as UserRoles,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setRole: (state, action) => ({
      ...state,
      role: action.payload.role,
    }),
  },
  extraReducers: {
    // Initialize
    [`${initialize.pending}`]: (state) => {
      return {
        ...state,
        isInitialize: false,
      };
    },
    [`${initialize.fulfilled}`]: (state) => {
      return {
        ...state,
        isInitialize: true,
      };
    },
    [`${initialize.rejected}`]: (state) => {
      return {
        ...state,
        isInitialize: true,
      };
    },

    // Set App Error
    [`${setAppError.type}`]: (state, action) => {
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
  },
});
