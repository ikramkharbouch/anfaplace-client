import { call, put } from 'redux-saga/effects';
import { API } from 'src/utils/utilsFunctions';

import { setAllBrandsSuccess } from './index';

// eslint-disable-next-line import/prefer-default-export
export function* fetchAllBrandSaga() {
	try {
		const result = yield call(() => API({ url: 'getListMagasins' }));
		yield put(setAllBrandsSuccess(result.data.lists));
	} catch (e) {
		console.log(e);
		yield put({ type: 'TODO_FETCH_FAILED' });
	}
}
