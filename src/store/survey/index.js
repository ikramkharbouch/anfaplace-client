import { createSlice } from '@reduxjs/toolkit';

const questionsSlice = createSlice({
	name: 'questions',
	initialState: {
		list: [],
		userQuestionnaire: { questionnaires: null },
		loadingUserQuestionnaire: true,
		questionnaireAnswers: [],
	},
	reducers: {
		setAllQuestionsSuccess: (state, action) => ({ ...state, list: action.payload }),
		setUserQuestionnaire: (state, action) => ({
			...state,
			userQuestionnaire: action.payload,
			loadingUserQuestionnaire: false,
		}),
		answerQuestionnaire: (state, action) => ({
			...state,
			questionnaireAnswers: [state.questionnaireAnswers, action.payload],
		}),
	},
});

export const {
	setAllQuestionsSuccess,
	answerQuestionnaire,
	setUserQuestionnaire,
} = questionsSlice.actions;

export default questionsSlice.reducer;
