import { createSlice } from '@reduxjs/toolkit';

import { ICounterState } from '../../types';

const initialState: ICounterState = {
	value: 0,
};

export const counterSlice = createSlice({
	name: 'counter',
	initialState,
	reducers: {
		increment: state => ({
			...state,
			value: state.value++,
		}),
		decrement: state => ({
			...state,
			value: state.value--,
		}),
	},
});
