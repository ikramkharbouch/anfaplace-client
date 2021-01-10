import { call, put, select } from 'redux-saga/effects';
import { API } from 'src/utils/utilsFunctions';
import firebase from '';

import { addEventToFav, setMyEventsSuccess } from './index';

// eslint-disable-next-line import/prefer-default-export
export function* fetchMyEvents() {
	try {
		const { uid } = firebase.auth().currentUser;
		const result = yield call(() =>
			API({ url: 'getlistFavories', method: 'post', data: { id: uid } })
		);
		yield put(setMyEventsSuccess(result.data.lists));
	} catch (e) {
		console.log(e);
		yield put({ type: 'TODO_FETCH_FAILED' });
	}
}

const eventSelector = (state, id) => state.event.all.find((event) => event.index === id);

export function* addToFavorite({ payload }) {
	const { uid } = firebase.auth().currentUser;

	try {
		yield call(() =>
			API({
				url: 'addToFavories',
				method: 'post',
				data: { idUser: uid, newFavorie: payload },
			})
		);
		const event = select((state) => eventSelector(state, payload));
		yield put(addEventToFav(event));
	} catch (e) {
		console.log(e);
		yield put({ type: 'TODO_FETCH_FAILED' });
	}
}
