import { createSlice } from '@reduxjs/toolkit';

const initialState = { list: [], loadingList: true };

const brandSlice = createSlice({
	name: 'myEvents',
	initialState,
	reducers: {
		setMyEventsSuccess: (state, action) => ({ ...state, list: action.payload, loading: false }),
		addEventToFav: (state, action) => ({ ...state, all: [...state.all, action.payload] }),
		resetMyEvents: () => initialState,
	},
});
export const { setMyEventsSuccess, addEventToFav } = brandSlice.actions;

export default brandSlice.reducer;
