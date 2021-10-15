import { call, put } from 'redux-saga/effects';
import { API } from 'src/utils/utilsFunctions';

import { setAllBrandsSuccess, setBrandSuccess , setAllBrandsLoading , setAllBrandsError } from './index';

// eslint-disable-next-line import/prefer-default-export
export function* fetchAllBrandSaga() {
	try {
		yield(put(setAllBrandsLoading()))
		const result = yield call(() => API({ url: 'getListMagasins' }));
		yield put(setAllBrandsSuccess(result.data.lists));
	} catch (e) {
		console.error(e);
		yield put({ type: 'FETCH_FAILED' });
		yield(put(setAllBrandsError(e?.message || 'Erreur ')))

	}
}

export function* fetchBrandById({ id }) {
	try {
		const result = yield call(() =>
			API({ url: 'getMarqueByID', method: 'post', data: { idMarque: id } })
		);
		yield put(setBrandSuccess(result.data.data));
	} catch (e) {
		console.error(e);
		yield put({ type: 'FETCH_FAILED' });
	}
}
