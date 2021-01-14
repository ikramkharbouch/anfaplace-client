import { createSlice } from '@reduxjs/toolkit';

const initialState = { list: [], loadingAdd: false, loadingList: false, openAddedNotif: false };

const brandSlice = createSlice({
	name: 'myVisitedList',
	initialState,
	reducers: {
		setMyVisitedListSuccess: (state, action) => ({
			...state,
			list: action.payload,
			loadingList: false,
		}),
		setLoadingVisitedList: (state) => ({ ...state, loadingAdd: true }),
		addToMyListOfVisits: (state, action) => ({
			...state,
			list: [...state.list, action.payload],
			loadingAdd: false,
		}),
		openAddedNotification: (state, action) => ({ ...state, openAddedNotif: action.payload }),
		resetVisitedList: () => initialState,
	},
});

export const {
	setMyVisitedListSuccess,
	addToMyListOfVisits,
	setLoadingVisitedList,
	openAddedNotification,
	resetVisitedList,
} = brandSlice.actions;

export default brandSlice.reducer;
