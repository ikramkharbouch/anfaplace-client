import { call, put } from 'redux-saga/effects';
import { fetchDataFromAPI } from 'src/utils/utilsFunctions';

import { setAllEventsSuccess } from './index';

// eslint-disable-next-line import/prefer-default-export
export function* fetchAllEvent() {
	try {
		const result = yield call(() => fetchDataFromAPI({ url: 'getAllEvents' }));
		yield put(setAllEventsSuccess(result.data.lists));
	} catch (e) {
		console.log(e);
		yield put({ type: 'TODO_FETCH_FAILED' });
	}
}