import { createSlice } from '@reduxjs/toolkit';

const articlesSlice = createSlice({
	name: 'articles',
	initialState: {
		list: [],
		loading: false,
	},
	reducers: {
		articlesLoading: (state , ) => ({ ...state , loading : true }),
		setAllArticlesSuccess: (state, action) => ({ list: action.payload , loading : false }),
	},
});
export const { setAllArticlesSuccess , articlesLoading } = articlesSlice.actions;

export default articlesSlice.reducer;
