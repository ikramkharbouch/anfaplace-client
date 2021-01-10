import { call, put } from 'redux-saga/effects';
import { API } from 'src/utils/utilsFunctions';

import { setAllBrandsSuccess, addToMyListOfVisits } from './index';

// eslint-disable-next-line import/prefer-default-export
export function* fetchMyVisitedList() {
	try {
		const result = yield call(() => API({ url: 'getlistVisited' }));
		yield put(setAllBrandsSuccess(result.data.lists));
	} catch (e) {
		console.log(e);
		yield put({ type: 'TODO_FETCH_FAILED' });
	}
}
export function* addBrandToVisited({ payload }) {
	try {
		yield call(() => API({ url: 'addToVisited', method: 'post', data: { payload } }));
		yield put(addToMyListOfVisits(payload));
	} catch (e) {
		console.log(e);
		yield put({ type: 'TODO_FETCH_FAILED' });
	}
}
