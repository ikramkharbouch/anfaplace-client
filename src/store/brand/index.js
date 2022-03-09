import { createSlice } from '@reduxjs/toolkit';

const brandSlice = createSlice({
	name: 'brand',
	initialState: {
		brand: null,
		isLoadingBrand: true,
		loading: false,
		error: '',
		all: [],
	},
	reducers: {
		setAllBrandsLoading: (state) => ({ ...state, loading: true }),
		setAllBrandsError: (state, action) => ({ ...state, loading: false, error: action.payload }),
		setAllBrandsSuccess: (state, action) => ({ ...state, all: action.payload, loading: false }),
		setBrandSuccess: (state, action) => ({ ...state, brand: action.payload, isLoadingBrand: false }),
	},
});
export const { setAllBrandsSuccess, setBrandSuccess, setAllBrandsLoading, setAllBrandsError } =
	brandSlice.actions;

export default brandSlice.reducer;
