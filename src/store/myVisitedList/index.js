import { createSlice } from '@reduxjs/toolkit';
import update from 'immutability-helper';

const initialState = { list: [], loadingAdd: false, loadingList: true, openAddedNotif: false };

const brandSlice = createSlice({
	name: 'myVisitedList',
	initialState,
	reducers: {
		setMyVisitedListSuccess: (state, action) => ({
			...state,
			list: action.payload,
			loadingList: false,
		}),
		setLoadingVisitedList: (state, action) => ({ ...state, loadingList: action.payload }),
		addToMyListOfVisits: (state, action) =>
			update(state, { loading: { $set: false }, list: { $push: [action.payload] } }),
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
