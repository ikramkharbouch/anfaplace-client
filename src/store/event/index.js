import { createSlice } from '@reduxjs/toolkit';

const brandSlice = createSlice({
	name: 'event',
	initialState: {
		list: [],
		loadingEvents: true,
	},
	reducers: {
		setAllEventsSuccess: (state, action) => ({
			...state,
			list: action.payload,
			loadingEvents: false,
		}),
	},
});
export const { setAllEventsSuccess } = brandSlice.actions;

export default brandSlice.reducer;
