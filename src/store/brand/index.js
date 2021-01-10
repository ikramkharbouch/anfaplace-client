import { createSlice } from '@reduxjs/toolkit';

const brandSlice = createSlice({
	name: 'brand',
	initialState: {
		brand: {},
		isLoading: true,
		all: [],
	},
	reducers: {
		setAllBrandsSuccess: (state, action) => ({ all: action.payload }),
		setBrandSuccess: (state, action) => ({ ...state, brand: action.payload }),
	},
});
export const { setAllBrandsSuccess, setBrandSuccess } = brandSlice.actions;

export default brandSlice.reducer;
