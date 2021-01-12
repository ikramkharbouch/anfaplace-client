import { call, put } from 'redux-saga/effects';
import { API, getUserToken } from 'src/utils/utilsFunctions';

/* import { addToMyListOfVisits, setLoadingVisitedList, setMyVisitedListSuccess } from './index';
 */import { addToMyParticipatedEvents , setLoadingParticipatedList } from './index';

export function* fetchMyVisitedList() {
	try {
		const token = yield getUserToken();
		console.log(token);
		/* const result = yield call(() => API({ url: 'P', method: 'post', token }));
		console.log(result);
		yield put(setMyVisitedListSuccess(result.data.list)); */
	} catch (e) {
		console.log(e);
		yield put({ type: 'FETCH_FAILED' });
	}
}

export function* addEventToParticipated({ payload }) {
	try {
		yield put(setLoadingParticipatedList(payload));
		const token = yield getUserToken();
		console.log(payload)
		

		yield call(() =>
			API({ url: 'participateToEvent', method: 'post', data: { idEvent: payload.idEvent , points: payload.points }, token })
		);

		yield put(addToMyParticipatedEvents(payload));

	} catch (e) {
		console.log(e);
		yield put({ type: 'FETCH_FAILED' });
	}
}
