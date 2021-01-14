import { call, put } from 'redux-saga/effects';
import { API, getUserToken } from 'src/utils/utilsFunctions';

import { getUserEvents } from './index';

import { GET_USER_EVENTS_LOADING , GET_USER_EVENTS_SUCCESS , GET_USER_EVENTS_FAIL } from './actions';

export default function* getUserEvent() {
	try {
		yield put(getUserEvents({type: GET_USER_EVENTS_LOADING }));
		const token = yield getUserToken();
		const result = yield call( ()=> API({ url: 'listEventUser', method: 'get', token }))
		yield put(getUserEvents({type: GET_USER_EVENTS_SUCCESS, payload : { success: result.data.success , events: result.data.liste }}));
	 } catch (e) {
		yield put(getUserEvents({type: GET_USER_EVENTS_FAIL , payload: { message : e.message }}));
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
