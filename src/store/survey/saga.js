import { call, put, select } from 'redux-saga/effects';
import { API, getUserToken } from 'src/utils/utilsFunctions';

import { setUserPoints } from 'src/store/user';

import {
	openCongratulation,
	setAllQuestionsSuccess,
	setCompleted,
	setQuestionnaireCompletelyAnswered,
	setUserQuestionnaire,
} from './index';

// eslint-disable-next-line import/prefer-default-export
export function* fetchQuestionnaire() {
	try {
		let result;
		const user = yield select((state) => state.user.currentUser);
		if (user) {
			const token = yield getUserToken();
			result = yield call(() => API({ url: 'getListQuestionnaireForUser', token }));
			yield put(setAllQuestionsSuccess(result.data.lists));
		} else {
			result = yield call(() => API({ url: 'getListQuestionnaireInApp' }));
			yield put(setAllQuestionsSuccess(result.data.questionnaires));
		}
	} catch (e) {
		console.error(e);
		yield put({ type: 'FETCH_FAILED' });
	}
}

export function* fetchUserQuestionnaire({ payload }) {
	try {
		const token = yield getUserToken();
		if (!payload.participe) {
			yield call(() =>
				API({
					url: 'participateToQuestionnaire',
					method: 'post',
					data: { idQuestionnaire: payload.id },
					token,
				})
			);
		}
		const result = yield call(() =>
			API({
				url: 'getQuestionnaireByUser',
				method: 'post',
				data: { idQuestionnaire: payload.id },
				token,
			})
		);

		yield put(setUserQuestionnaire(result.data));
	} catch (e) {
		console.error(e);
		yield put({ type: 'FETCH_FAILED' });
	}
}

export function* answerQuestionnaire({ payload }) {
	try {
		const token = yield getUserToken();
		const result = yield call(() =>
			API({ url: 'answerQuestion', method: 'post', data: { ...payload }, token })
		);
		if (!payload.isLast) {
			yield put(setCompleted(payload));
		}
		if (payload.isLast) {
			yield put(setQuestionnaireCompletelyAnswered(payload.id));
			yield put(setUserPoints(result.data.points_user));
			yield put(openCongratulation(true));
		}
	} catch (e) {
		console.error(e);
		yield put({ type: 'FETCH_FAILED' });
	}
}

export function* participateToQuestionnaire({ payload }) {
	try {
		const token = yield getUserToken();
		yield call(() =>
			API({
				url: 'participateToQuestionnaire',
				method: 'post',
				data: { idQuestionnaire: payload },
				token,
			})
		);
	} catch (e) {
		console.error(e);
		yield put({ type: 'FETCH_FAILED' });
	}
}
