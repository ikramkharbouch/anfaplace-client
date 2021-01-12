import { call, put } from 'redux-saga/effects';
import { API, getUserToken } from 'src/utils/utilsFunctions';

import { addToMyParticipatedEvents } from './index';

import { ADD_EVENT_TO_PARTICIPATED_SUCCESS , ADD_EVENT_TO_PARTICIPATED_FAIL , ADD_EVENT_TO_PARTICIPATED_LOADING } from './actions';

export default function* addEventToParticiapted({ payload }) {
	try {
		yield put(addToMyParticipatedEvents({type: ADD_EVENT_TO_PARTICIPATED_LOADING }));
		const token = yield getUserToken();
		const result = yield call( ()=> API({ url: 'participeToEvent', method: 'post', data: { idEvent: payload.idEvent}, token }))
		yield put(addToMyParticipatedEvents({type: ADD_EVENT_TO_PARTICIPATED_SUCCESS, payload : { success: result.data.success , message: result.data.message , totalPoints:  result.data.total_points_gagne  }}));
	 } catch (e) {
		yield put(addToMyParticipatedEvents({type: ADD_EVENT_TO_PARTICIPATED_FAIL , payload: { message : e.message , success: false }}));
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
