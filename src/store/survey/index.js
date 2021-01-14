import { createSlice } from '@reduxjs/toolkit';
import update from 'immutability-helper';

const questionsSlice = createSlice({
	name: 'questions',
	initialState: {
		list: [],
		userQuestionnaire: { questionnaires: null },
		loadingUserQuestionnaire: true,
		questionnaireAnswers: [],
		loadingAnswer: false,
		openCongratulation: false,
	},
	reducers: {
		setAllQuestionsSuccess: (state, action) => ({ ...state, list: action.payload }),
		setUserQuestionnaire: (state, action) => ({
			...state,
			userQuestionnaire: action.payload,
			loadingUserQuestionnaire: false,
		}),
		setCompleted: (state, action) => {
			const indexOfQuestion = state.userQuestionnaire.questionnaires.Questions.findIndex(
				(question) => {
					console.log(question);
					console.log(action.payload);
					return question.question === action.payload.questionResponses.question;
				}
			);
			console.log('------>', indexOfQuestion);
			return update(state, {
				userQuestionnaire: {
					questionnaires: {
						Questions: { [indexOfQuestion]: { status: { $set: 'complet' } } },
					},
				},
			});
		},
		openCongratulation: (state, action) => ({ ...state, openCongratulation: action.payload }),
		setLoadingUserQuestionnaire: (state, action) => ({
			...state,
			loadingUserQuestionnaire: action.payload,
		}),
	},
});

export const {
	setAllQuestionsSuccess,
	setCompleted,
	setUserQuestionnaire,
	openCongratulation,
	setLoadingUserQuestionnaire,
} = questionsSlice.actions;

export default questionsSlice.reducer;
