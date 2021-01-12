import { createSlice } from '@reduxjs/toolkit';

const brandSlice = createSlice({
	name: 'user',
	initialState: { currentUser: undefined, points: 0, loadingUser: true, loginIn: false },
	reducers: {
		setUser: (state, action) => ({ ...state, currentUser: action.payload }),
		setUserPoints : (state, action) => ( {...state , points: action.payload.points} );
		addBrandToVisitedList: (state, action) => ({
			...state,
			currentUser: { list_visite: action.payload },
		}),
	},
});
export const { setUser,setUserPoints,addBrandToVisitedList } = brandSlice.actions;

export default brandSlice.reducer;
