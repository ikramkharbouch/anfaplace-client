import { createSlice } from '@reduxjs/toolkit';

const brandSlice = createSlice({
	name: 'app',
	initialState: {},
	reducers: {},
});
export const { setAllBrandsSuccess } = brandSlice.actions;

export default brandSlice.reducer;
