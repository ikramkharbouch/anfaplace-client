import { call, put } from 'redux-saga/effects';
import { API } from 'src/utils/utilsFunctions';

import { setAllQuestionsSuccess } from './index';

// eslint-disable-next-line import/prefer-default-export
export function* fetchQuestionnaire() {
	try {
		const result = yield call(() => API({ url: 'getListQuestionnaire' }));

		yield put(setAllQuestionsSuccess(result.data.lists));
	} catch (e) {
		console.log(e);
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

		console.log('array' , array)

		const promisesArray = array.map(x =>
			fetch(x.banniere)
				.then(response => response.blob())
				.then(blob => ({
					...x,
					banniere: window.URL.createObjectURL(blob, { type: 'mimeType' })
				}))
		);

		Promise.all(promisesArray).then(values => {
			console.log(values)
			put(setAllArticlesSuccess(values));
		})


	} catch (e) {
		console.log(e);
		await put({ type: 'TODO_FETCH_FAILED' });
	}
} */
