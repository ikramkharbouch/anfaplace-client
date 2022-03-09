import { createSlice } from '@reduxjs/toolkit';
import update from 'immutability-helper';

const initialState = {
	list: [],
	loadingAdd: false,
	loadingList: true,
	openAddedNotif: false,
	success: false,
};

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
		setAddedSuccessNotification: (state, action) => ({ ...state, success: action.payload }),
		resetVisitedList: () => initialState,
	},
});

export const {
	setMyVisitedListSuccess,
	addToMyListOfVisits,
	setLoadingVisitedList,
	openAddedNotification,
	resetVisitedList,
	setAddedSuccessNotification,
} = brandSlice.actions;

export default brandSlice.reducer;
