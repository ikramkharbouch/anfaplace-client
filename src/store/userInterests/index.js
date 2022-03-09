import { createSlice } from '@reduxjs/toolkit';
import {
	ADD_USER_INTERESTS_SUCCESS,
	ADD_USER_INTERESTS_LOADING,
	ADD_USER_INTERESTS_FAIL,
} from './actions';

const brandSlice = createSlice({
	name: 'userInterestAdded',
	initialState: {
		added: false,
		loading: false,
		message: '',
	},
	reducers: {
		addUserInterests: (state, action) => {
			switch (action.payload.type) {
				case ADD_USER_INTERESTS_LOADING:
					return {
						...state,
						loading: true,
					};

				case ADD_USER_INTERESTS_SUCCESS:
					return {
						...state,
						added: action.payload.payload.added,
						loading: false,
					};

				case ADD_USER_INTERESTS_FAIL:
					return {
						...state,
						loading: false,
						added: action.payload.payload.added,
					};

				default:
					return state;
			}
		},
	},
});

export const { addUserInterests } = brandSlice.actions;

export default brandSlice.reducer;
