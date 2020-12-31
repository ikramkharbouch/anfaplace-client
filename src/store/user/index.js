import { createSlice } from '@reduxjs/toolkit';

const brandSlice = createSlice({
	name: 'user',
	initialState: {},
	reducers: {
		setAllBrandsSuccess: (state, action) => ({ all: action.payload }),
		setBrandSuccess: () => {},
	},
});
export const { setAllBrandsSuccess } = brandSlice.actions;

export default brandSlice.reducer;
