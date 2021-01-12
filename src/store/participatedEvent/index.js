import { createSlice } from '@reduxjs/toolkit';

const brandSlice = createSlice({
	name: 'eventPraticipated',
	initialState: {
		list: [],
		loadingAdd: false,
		loadingList: true,
	},
	reducers: {
		setEventPraticipatedSuccess: (state, action) => ({
			...state,
			list: action.payload,
			loadingList: false,
		}),
		setLoadingParticipatedList: (state) => ({ ...state, loadingAdd: true }),
		addToMyParticipatedEvents: (state, action) => ({
			...state,
			list: [...state.list, action.payload],
			loadingAdd: false,
		}),
	},
});

export const {
	setEventPraticipatedSuccess,
	addToMyParticipatedEvents,
	setLoadingParticipatedList,
} = brandSlice.actions;

export default brandSlice.reducer;
