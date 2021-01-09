import { createSlice } from '@reduxjs/toolkit';

const questionsSlice = createSlice({
	name: 'questions',
	initialState: {
		list: [],
	},
	reducers: {
		setAllQuestionsSuccess: (state, action) => ({ list: action.payload }),
	},
});
export const { setAllQuestionsSuccess } = questionsSlice.actions;

export default questionsSlice.reducer;
