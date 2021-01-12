import { call, put, select } from 'redux-saga/effects';
import { API } from 'src/utils/utilsFunctions';
import firebase from 'firebase/app';

import { setGetInterests } from './index';

// eslint-disable-next-line import/prefer-default-export
export function* fetchInterests() {
	try {
		const result = yield call(() => API({ url: 'GetAllInterets' }));
		yield put(setGetInterests(result.data.lists));
	} catch (e) {
		console.log(e);
		yield put({ type: 'FETCH_FAILED' });
	}
}

export function* setInterests() {
	try {
		const user = firebase.auth().currentUser;
		const selected = yield select((state) => state.interests.selected);
		console.log(selected);
		if (user) {
			yield call(() => API({ url: '' }));
		} else if (selected.length > 0) {
			yield localStorage.setItem('interests', JSON.stringify(selected));
		}
	} catch (e) {
		console.log(e);
	}
}
