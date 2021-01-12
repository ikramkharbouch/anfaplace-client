import { createSlice } from '@reduxjs/toolkit';

const brandSlice = createSlice({
	name: 'user',
	initialState: { currentUser: undefined, points: 0, loadingUser: true, loginIn: false },
	reducers: {
		setUser: (state, action) => ({ ...state, currentUser: action.payload }),
		addBrandToVisitedList: (state, action) => ({
			...state,
			currentUser: { list_visite: action.payload },
		}),
	},
});
export const { setUser, addBrandToVisitedList } = brandSlice.actions;

export default brandSlice.reducer;
