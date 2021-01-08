import { createSlice } from '@reduxjs/toolkit';

const brandSlice = createSlice({
	name: 'myVisitedList',
	initialState: {
		all: [],
	},
	reducers: {
		setMyVisitedListSuccess: (state, action) => ({ all: action.payload }),
		addToMyListOfVisits: (state, action) => ({ ...state, all: [...state.all, action.payload] }),
	},
});
export const { setAllBrandsSuccess } = brandSlice.actions;

export default brandSlice.reducer;
