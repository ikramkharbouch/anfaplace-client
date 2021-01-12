import { createSlice } from '@reduxjs/toolkit';

const brandSlice = createSlice({
	name: 'brand',
	initialState: {
		brand: null,
		isLoadingBrand: true,
		all: [],
	},
	reducers: {
		setAllBrandsSuccess: (state, action) => ({ ...state, all: action.payload }),
		setBrandSuccess: (state, action) => ({ ...state, brand: action.payload, isLoadingBrand: false }),
	},
});
export const { setAllBrandsSuccess, setBrandSuccess } = brandSlice.actions;

export default brandSlice.reducer;
