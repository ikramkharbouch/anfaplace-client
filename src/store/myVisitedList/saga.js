import { call, put } from 'redux-saga/effects';
import { API, getUserToken } from 'src/utils/utilsFunctions';

import { addBrandToVisitedList } from 'src/store/user';
import {
	addToMyListOfVisits,
	openAddedNotification,
	setLoadingVisitedList,
	setMyVisitedListSuccess,
} from './index';

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
		console.log('============>', payload);
		yield put(setLoadingVisitedList(payload));
		const token = yield getUserToken();
		console.log(payload);
		yield call(() =>
			API({ url: 'addToVisited', method: 'post', data: { marqueVisited: payload.data.nom }, token })
		);
		yield put(addToMyListOfVisits(payload));
		yield put(openAddedNotification(true));
		yield put(addBrandToVisitedList(payload.data.nom));
	} catch (e) {
		console.log(e);
		yield put({ type: 'FETCH_FAILED' });
	}
}
