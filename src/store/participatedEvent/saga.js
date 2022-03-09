import { call, put, select } from 'redux-saga/effects';
import { API, getUserToken } from 'src/utils/utilsFunctions';
import { setParticipatedEvent, setUserInfo, setUserPoints } from 'src/store/user';

import {
	addToMyParticipatedEvents,
	resetAddEventToParticipateState,
	setOpenConfirm,
	setParticipatedSuccess,
} from './index';

import {
	ADD_EVENT_TO_PARTICIPATED_FAIL,
	ADD_EVENT_TO_PARTICIPATED_LOADING,
	RESET_EVENT_TO_PARTICIPATED_STATE,
} from './actions';

export function* addEventToParticiapted({ payload }) {
	console.log(payload);
	try {
		yield put(addToMyParticipatedEvents({ type: ADD_EVENT_TO_PARTICIPATED_LOADING }));
		const token = yield getUserToken();
		const userInfos = yield select((state) => state.user.userInfo);
		let userInfoToBeSent;
		console.log(userInfos);
		if (!userInfos.nom && !userInfos.email) {
			userInfoToBeSent = JSON.parse(localStorage.getItem('user-info')) || {};
			localStorage.removeItem('user-info');
		} else {
			userInfoToBeSent = userInfos;
		}
		const result = yield call(() =>
			API({
				url: 'participeToEvent',
				method: 'post',
				data: { idEvent: payload.idEvent, ...userInfoToBeSent },
				token,
			})
		);
		yield put(
			setParticipatedSuccess({
				success: result.data.success,
				message: result.data.message,
				totalPoints: result.data.total_points_gagne,
			})
		);
		yield put(setUserPoints(result.data.total_points_gagne));
		yield put(setParticipatedEvent(payload.idEvent));
		yield put(setUserInfo(userInfoToBeSent));
		yield put(setOpenConfirm(false));
	} catch (e) {
		yield put(
			addToMyParticipatedEvents({
				type: ADD_EVENT_TO_PARTICIPATED_FAIL,
				payload: { message: e.message, success: false },
			})
		);
	}
}

export function* resetEventToParticipateState() {
	yield put(resetAddEventToParticipateState({ type: RESET_EVENT_TO_PARTICIPATED_STATE }));
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
