import { createSlice } from '@reduxjs/toolkit';

const brandSlice = createSlice({
	name: 'user',
	initialState: { currentUser: undefined, points: 0, loadingUser: true, loginIn: false },
	reducers: {
		setUser: (state, action) => ({ ...state, currentUser: action.payload }),
		setUserPoints : (state, action) => ( {...state , points: action.payload.points} )
	},
});
export const { setUser , setUserPoints } = brandSlice.actions;

export default brandSlice.reducer;
