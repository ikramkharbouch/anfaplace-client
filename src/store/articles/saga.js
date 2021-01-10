import { call, put } from 'redux-saga/effects';
import { API, arrayBufferToBase64 } from 'src/utils/utilsFunctions';

import { setAllArticlesSuccess } from './index';

// eslint-disable-next-line import/prefer-default-export
export function* fetchAllArticles() {
	try {

		const result = yield call(() => API({ url: 'getAllArticles' }));

		/* yield put(setAllArticlesSuccess(result.data.lists.map(x => ({
			id: x.id,
			...x.data,
			banniere: arrayBufferToBase64(x.data.banniere.data) === 'data:image/jpeg;base64,' ? x.data.banniere : arrayBufferToBase64(x.data.banniere.data)
		})))); */



		// const result = yield call(() => API({ url: 'getAllArticles' }));

		yield put(
			setAllArticlesSuccess(
				result.data.lists.map((x) => ({
					id: x.id,
					...x.data,
					banniere: arrayBufferToBase64(x.data.banniere.data) === 'data:image/jpeg;base64,' ? x.data.banniere : arrayBufferToBase64(x.data.banniere.data)
				}))
			)
		);
	} catch (e) {
		yield put({ type: 'TODO_FETCH_FAILED' });
	}
}

/* // eslint-disable-next-line import/prefer-default-export
export async function fetchAllArticles() {
	try {
		const result = await API({ url: 'getAllArticles' })


		const array = result.data.lists.map(x => ({
			id: x.id,
			...x.data,
			banniere: arrayBufferToBase64(x.data.banniere.data)
		}))


		const promisesArray = array.map(x =>
			fetch(x.banniere)
				.then(response => response.blob())
				.then(blob => ({
					...x,
					banniere: window.URL.createObjectURL(blob, { type: 'mimeType' })
				}))
		);

		Promise.all(promisesArray).then(values => {
			put(setAllArticlesSuccess(values));
		})


	} catch (e) {
		await put({ type: 'TODO_FETCH_FAILED' });
	}
} */
