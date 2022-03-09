import { call, put } from 'redux-saga/effects';
import { API, getUserToken } from 'src/utils/utilsFunctions';

import { addUserInterests } from './index';

import {
	ADD_USER_INTERESTS_SUCCESS,
	ADD_USER_INTERESTS_LOADING,
	ADD_USER_INTERESTS_FAIL,
} from './actions';

export default function* getUserEvent() {
	try {
		yield put(addUserInterests({ type: ADD_USER_INTERESTS_LOADING }));
		const token = yield getUserToken();
		if (token && localStorage.getItem('interests')) {
			const result = yield call(() =>
				API({
					url: 'AffecterInterets',
					method: 'post',
					data: { listInterets: localStorage.getItem('interests') },
					token,
				})
			);
			localStorage.removeItem('interests');
			yield put(
				addUserInterests({ type: ADD_USER_INTERESTS_SUCCESS, payload: { added: result.data.success } })
			);
		}

		if (token && !localStorage.getItem('interests')) {
			yield put(addUserInterests({ type: ADD_USER_INTERESTS_SUCCESS, payload: { added: true } }));
		}
	} catch (e) {
		yield put(addUserInterests({ type: ADD_USER_INTERESTS_FAIL, payload: { message: e.message } }));
	}
}

// export function* fetchMyVisitedList() {
// 	try {
// 		const token = yield getUserToken();
// 		console.log(token);
// 		/* const result = yield call(() => API({ url: 'P', method: 'post', token }));
// 		console.log(result);
// 		yield put(setMyVisitedListSuccess(result.data.list)); */
// 	} catch (e) {
// 		console.log(e);
// 		yield put({ type: 'FETCH_FAILED' });
// 	}
// }

// export function* addEventToParticipated({ payload }) {
// 	try {
// 		yield put(setLoadingParticipatedList(payload));
// 		const token = yield getUserToken();
// 		console.log(payload)

// 		const result = yield call(() =>
// 			API({ url: 'participateToEvent', method: 'post', data: { idEvent: payload.idEvent , points: payload.points }, token })
// 		);

// 		yield put(addToMyParticipatedEvents(result));

// 	} catch (e) {
// 		console.log(e);
// 		yield put({ type: 'FETCH_FAILED' });
// 	}
// }
