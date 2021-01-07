import { createSlice } from '@reduxjs/toolkit';

const brandSlice = createSlice({
	name: 'event',
	initialState: {
		list: [],
	},
	reducers: {
		setAllEventsSuccess: (state, action) => ({ list: action.payload }),
	},
});
export const { setAllEventsSuccess } = brandSlice.actions;

export default brandSlice.reducer;
