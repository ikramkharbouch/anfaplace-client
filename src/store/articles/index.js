import { createSlice } from '@reduxjs/toolkit';

const articlesSlice = createSlice({
	name: 'articles',
	initialState: {
		list: [],
	},
	reducers: {
		setAllArticlesSuccess: (state, action) => ({ list: action.payload }),
	},
});
export const { setAllArticlesSuccess } = articlesSlice.actions;

export default articlesSlice.reducer;
