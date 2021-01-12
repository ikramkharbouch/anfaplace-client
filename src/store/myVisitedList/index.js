import { createSlice } from '@reduxjs/toolkit';

const brandSlice = createSlice({
	name: 'myVisitedList',
	initialState: {
		list: [],
		loadingAdd: false,
		loadingList: true,
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
	},
});

export const {
	setMyVisitedListSuccess,
	addToMyListOfVisits,
	setLoadingVisitedList,
} = brandSlice.actions;

export default brandSlice.reducer;
