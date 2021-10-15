import { call, put } from 'redux-saga/effects';
import { API, getUserToken } from 'src/utils/utilsFunctions';

import { addBrandToVisitedList } from 'src/store/user';
import {
	addToMyListOfVisits,
	openAddedNotification,
	setLoadingVisitedList,
	setMyVisitedListSuccess,
	setAddedSuccessNotification
} from './index';

export function* fetchMyVisitedList() {
	try {
		const token = yield getUserToken();
		const result = yield call(() => API({ url: 'getlistVisited', method: 'post', token }));
		yield put(setMyVisitedListSuccess(result.data.list));
	} catch (e) {
		console.error(e);
		yield put({ type: 'FETCH_FAILED' });
	}
}

export function* addBrandToVisited({ payload }) {
	try {
		yield put(setLoadingVisitedList(true));
		const token = yield getUserToken();
		yield call(() =>
			API({ url: 'addToVisited', method: 'post', data: { marqueVisited: payload.data.nom }, token })
		);
		yield put(addToMyListOfVisits(payload));
		yield put(addBrandToVisitedList(payload.data.nom));
		yield put(setLoadingVisitedList(false));
		yield put(openAddedNotification(false));
		yield(put(setAddedSuccessNotification(true)));
	} catch (e) {
		console.error(e);
		yield put({ type: 'FETCH_FAILED' });
	}
}

export function* updateAddedSuccessNotification({ payload }){
	// console.log(status)
	yield put(setAddedSuccessNotification(payload));
}
