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
		addToMyListOfVisits: (state, action) => ({ ...state, all: [...state.all, action.payload] }),
	},
});

export const { setMyVisitedListSuccess, addToMyListOfVisits } = brandSlice.actions;

export default brandSlice.reducer;
