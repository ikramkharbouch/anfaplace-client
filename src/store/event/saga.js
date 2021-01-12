import { call, put } from 'redux-saga/effects';
import { API } from 'src/utils/utilsFunctions';

import { setAllEventsSuccess } from './index';

// eslint-disable-next-line import/prefer-default-export
export function* fetchAllEvent() {
	try {
		const result = yield call(() => API({ url: 'getAllEvents' }));
		yield put(setAllEventsSuccess(result.data.lists));
	} catch (e) {
		console.log(e);
		yield put({ type: 'FETCH_FAILED' });
	}
}
