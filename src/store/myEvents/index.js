import { createSlice } from '@reduxjs/toolkit';

const brandSlice = createSlice({
	name: 'myEvents',
	initialState: {
		all: [],
	},
	reducers: {
		setMyEventsSuccess: (state, action) => ({ all: action.payload }),
		addEventToFav: (state, action) => ({ ...state, all: [...state.all, action.payload] }),
	},
});
export const { setMyEventsSuccess, addEventToFav } = brandSlice.actions;

export default brandSlice.reducer;
