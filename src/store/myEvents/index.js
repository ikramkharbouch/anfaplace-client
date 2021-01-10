import { createSlice } from '@reduxjs/toolkit';

const brandSlice = createSlice({
	name: 'myEvents',
	initialState: {
		list: [],
		loadingList: true,
	},
	reducers: {
		setMyEventsSuccess: (state, action) => ({ ...state, list: action.payload, loading: false }),
		addEventToFav: (state, action) => ({ ...state, all: [...state.all, action.payload] }),
	},
});
export const { setMyEventsSuccess, addEventToFav } = brandSlice.actions;

export default brandSlice.reducer;
