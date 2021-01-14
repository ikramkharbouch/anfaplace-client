import { createSlice } from '@reduxjs/toolkit';
import {
	ADD_EVENT_TO_PARTICIPATED_LOADING,
	ADD_EVENT_TO_PARTICIPATED_SUCCESS,
	ADD_EVENT_TO_PARTICIPATED_FAIL,
} from './actions';

const brandSlice = createSlice({
	name: 'eventPraticipated',
	initialState: {
		success: false,
		message: '',
		totalPoints: '',
		loading: false,
		openConfirm: false,
	},
	reducers: {
		setOpenConfirm: (state, action) => ({ ...state, openConfirm: action.payload }),

		addToMyParticipatedEvents: (state, action) => {
			switch (action.payload.type) {
				case ADD_EVENT_TO_PARTICIPATED_LOADING:
					return {
						...state,
						loading: true,
					};

				case ADD_EVENT_TO_PARTICIPATED_SUCCESS:
					return {
						...state,
						success: action.payload.payload.success,
						message: action.payload.payload.message,
						totalPoints: action.payload.payload.totalPoints,
						loading: false,
					};

				case ADD_EVENT_TO_PARTICIPATED_FAIL:
					return {
						...state,
						success: false,
						message: action.payload.payload.message,
						loading: false,
					};

				default:
					return state;
			}
		},
	},
});

export const { addToMyParticipatedEvents, setOpenConfirm } = brandSlice.actions;

export default brandSlice.reducer;
