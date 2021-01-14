/* eslint-disable no-unused-vars */
import { takeEvery, all, fork } from 'redux-saga/effects';
import userActions from 'src/store/user/actions';
import brandActions from 'src/store/brand/actions';
import eventActions from 'src/store/event/actions';
import interestsAction from 'src/store/interests/actions';
import articlesActions from 'src/store/articles/actions';
import surveyAction from 'src/store/survey/actions';
import myVisitedListActions from 'src/store/myVisitedList/actions';
import myEventsActions from 'src/store/myEvents/actions';

import { fetchAllBrandSaga, fetchBrandById } from 'src/store/brand/saga';
import { logInWithProvider, watchForFirebaseAuth, updateUserPoints } from 'src/store/user/saga';
import { fetchAllEvent } from 'src/store/event/saga';
import { fetchInterests, setInterests } from 'src/store/interests/saga';
import { fetchAllArticles } from 'src/store/articles/saga';
// import { fetchAllQuestions } from 'src/store/survey/saga';

import { setInterestsConfirmed } from 'src/store/interests';
import {
	fetchQuestionnaire,
	answerQuestionnaire,
	fetchUserQuestionnaire,
	participateToQuestionnaire,
} from 'src/store/survey/saga';
import { fetchMyVisitedList, addBrandToVisited } from 'src/store/myVisitedList/saga';
import { fetchMyEvents } from 'src/store/myEvents/saga';

import { addEventToParticiapted , resetEventToParticipateState } from './participatedEvent/saga';
import getUserEvent from './userEvents/saga';
import addUserInterests from './userInterests/saga';
import { ADD_EVENT_TO_PARTICIPATED , RESET_EVENT_TO_PARTICIPATED_STATE } from './participatedEvent/actions';
import { GET_USER_EVENTS } from './userEvents/actions';
import { ADD_USER_INTERESTS } from './userInterests/actions';

const devMode = process.env.NODE_ENV === 'development';
// eslint-disable-next-line import/no-mutable-exports
let rootSaga;
if (!devMode) {
	rootSaga = function* () {
		yield all([
			fork(watchForFirebaseAuth),
			// takeEvery(brandActions.FETCH_ALL_BRANDS, fetchAllBrandSaga),
			// takeEvery(brandActions.FETCH_BRAND_BY_ID, fetchBrandById),
			// takeEvery(myVisitedListActions.FETCH_MY_VISITED_LIST, fetchMyVisitedList),

			// takeEvery(userActions.LOG_IN_WITH_PROVIDER, logInWithProvider),
			// takeEvery(userActions.UPDATE_USER_POINTS, updateUserPoints),
			// takeEvery(setInterestsConfirmed, setInterests),
			takeEvery(eventActions.FETCH_ALL_EVENTS, fetchAllEvent),
			// takeEvery(articlesActions.FETCH_ALL_ARTICLES, fetchAllArticles),
			// takeEvery(interestsAction.FETCH_INTERESTS, fetchInterests),

			takeEvery(surveyAction.FETCH_ALL_QUESTIONNAIRES, fetchQuestionnaire),
			takeEvery(surveyAction.ANSWER_QUESTION, answerQuestionnaire),
			takeEvery(surveyAction.PARTICIPATE_TO_QUESTIONNAIRE, participateToQuestionnaire),
			takeEvery(surveyAction.FETCH_USER_QUESTIONNAIRE, fetchUserQuestionnaire),

			takeEvery(myEventsActions.FETCH_MY_EVENTS, fetchMyEvents),
			// takeEvery(myVisitedListActions.ADD_BRAND_TO_VISITED, addBrandToVisited),
			takeEvery(ADD_EVENT_TO_PARTICIPATED, addEventToParticiapted),
			takeEvery(GET_USER_EVENTS, getUserEvent),
			takeEvery(ADD_USER_INTERESTS, addUserInterests),
		]);
	};
} else {
	rootSaga = function* () {
		yield all([
			fork(watchForFirebaseAuth),
			takeEvery(brandActions.FETCH_ALL_BRANDS, fetchAllBrandSaga),
			takeEvery(brandActions.FETCH_BRAND_BY_ID, fetchBrandById),
			takeEvery(myVisitedListActions.FETCH_MY_VISITED_LIST, fetchMyVisitedList),
			takeEvery(userActions.LOG_IN_WITH_PROVIDER, logInWithProvider),
			takeEvery(userActions.UPDATE_USER_POINTS, updateUserPoints),
			takeEvery(setInterestsConfirmed, setInterests),
			takeEvery(eventActions.FETCH_ALL_EVENTS, fetchAllEvent),
			takeEvery(articlesActions.FETCH_ALL_ARTICLES, fetchAllArticles),
			takeEvery(interestsAction.FETCH_INTERESTS, fetchInterests),
			takeEvery(surveyAction.FETCH_ALL_QUESTIONNAIRES, fetchQuestionnaire),
			takeEvery(surveyAction.ANSWER_QUESTION, answerQuestionnaire),
			takeEvery(surveyAction.PARTICIPATE_TO_QUESTIONNAIRE, participateToQuestionnaire),
			takeEvery(myEventsActions.FETCH_MY_EVENTS, fetchMyEvents),
			takeEvery(myVisitedListActions.ADD_BRAND_TO_VISITED, addBrandToVisited),
			takeEvery(surveyAction.FETCH_USER_QUESTIONNAIRE, fetchUserQuestionnaire),
			takeEvery(ADD_EVENT_TO_PARTICIPATED, addEventToParticiapted),
			takeEvery(RESET_EVENT_TO_PARTICIPATED_STATE, resetEventToParticipateState),
			takeEvery(GET_USER_EVENTS, getUserEvent),
			takeEvery(ADD_USER_INTERESTS, addUserInterests),
		]);
	};
}

export default rootSaga;
