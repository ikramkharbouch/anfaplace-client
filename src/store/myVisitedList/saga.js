import { call, put } from 'redux-saga/effects';
import { API, getUserToken } from 'src/utils/utilsFunctions';

import { addToMyListOfVisits, setLoadingVisitedList, setMyVisitedListSuccess } from './index';

export function* fetchMyVisitedList() {
	try {
		const token = yield getUserToken();
		console.log(token);
		const result = yield call(() => API({ url: 'getlistVisited', method: 'post', token }));
		console.log(result);
		yield put(setMyVisitedListSuccess(result.data.list));
	} catch (e) {
		console.log(e);
		yield put({ type: 'FETCH_FAILED' });
	}
}

export function* addBrandToVisited({ payload }) {
	try {
		yield put(setLoadingVisitedList(payload));
		const token = yield getUserToken();

		yield call(() =>
			API({ url: 'addToVisited', method: 'post', data: { marqueVisited: payload.data.nom }, token })
		);
		yield put(addToMyListOfVisits(payload));
	} catch (e) {
		console.log(e);
		yield put({ type: 'FETCH_FAILED' });
	}
}
