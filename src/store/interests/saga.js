import { call, put } from 'redux-saga/effects';
import { fetchDataFromAPI } from 'src/utils/utilsFunctions';

import { setGetInterests } from './index';

// eslint-disable-next-line import/prefer-default-export
export function* fetchInterests() {
	try {
		const result = yield call(() => fetchDataFromAPI({ url: 'GetAllInterets' }));
		yield put(setGetInterests(result.data.lists));
	} catch (e) {
		console.log(e);
		yield put({ type: 'TODO_FETCH_FAILED' });
	}
}
