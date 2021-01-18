import { createSlice } from '@reduxjs/toolkit';
import update from 'immutability-helper';

const initialState = {
	list: [],
	loadingList: true,
	userQuestionnaire: { questionnaires: null },
	loadingUserQuestionnaire: true,
	questionnaireAnswers: [],
	loadingAnswer: false,
	openCongratulation: false,
};

const questionsSlice = createSlice({
	name: 'questions',
	initialState,
	reducers: {
		setAllQuestionsSuccess: (state, action) => ({
			...state,
			list: action.payload,
			loadingList: false,
		}),
		setUserQuestionnaire: (state, action) => ({
			...state,
			userQuestionnaire: action.payload,
			loadingUserQuestionnaire: false,
		}),
		setCompleted: (state, action) => {
			const indexOfQuestion = state.userQuestionnaire.questionnaires.Questions.findIndex(
				(question) => question.question === action.payload.questionResponses.question
			);
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
		setQuestionnaireCompletelyAnswered: (state, action) => {
			const indexOfQuestionnaire = state.list.findIndex(
				(quetionnaire) => quetionnaire.index === action.payload
			);
			return update(state, { list: { [indexOfQuestionnaire]: { complet: { $set: true } } } });
		},

		resetSurvey: () => initialState,
	},
});

export const {
	setAllQuestionsSuccess,
	setCompleted,
	setUserQuestionnaire,
	openCongratulation,
	setLoadingUserQuestionnaire,
	setQuestionnaireCompletelyAnswered,
	resetSurvey,
} = questionsSlice.actions;

export default questionsSlice.reducer;
