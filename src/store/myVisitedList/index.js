import { createSlice } from '@reduxjs/toolkit';

const brandSlice = createSlice({
	name: 'myVisitedList',
	initialState: {
		list: [],
		loadingAdd: false,
		loadingList: false,
		openAddedNotif: false,
	},
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
	},
});

export const {
	setMyVisitedListSuccess,
	addToMyListOfVisits,
	setLoadingVisitedList,
	openAddedNotification,
} = brandSlice.actions;

export default brandSlice.reducer;
