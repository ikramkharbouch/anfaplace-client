import { createSlice } from '@reduxjs/toolkit';

const brandSlice = createSlice({
	name: 'event',
	initialState: {
		list: [],
	},
	reducers: {
		getEventsSuccess: (state, action) => ({ all: action.payload }),
	},
});
export const { setAllBrandsSuccess } = brandSlice.actions;

export default brandSlice.reducer;
