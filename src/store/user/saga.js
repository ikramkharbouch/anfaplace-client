import { put } from 'redux-saga/effects';
import firebase from 'firebase';
import { setNotification } from 'src/store/app';

// eslint-disable-next-line import/prefer-default-export
export function* logInWithProvider({ payload: authProvider }) {
	try {
		if (authProvider) {
			let provider;
			if (authProvider === 'facebook') {
				provider = new firebase.auth.FacebookAuthProvider();
			}
			if (authProvider === 'google') {
				provider = new firebase.auth.GoogleAuthProvider();
			}

			firebase
				.auth()
				.signInWithPopup(provider)
				.then((result) => {
					if (result.additionalUserInfo.isNewUser) {
						put(setNotification({ show: true, type: 'wonPoints' }));
					}
				})
				.catch((authError) => {
					put(setNotification({ show: true, type: 'error', message: authError.message }));
				});
		} else {
			firebase
				.auth()
				.signInAnonymously()
				.then(() => {
					put(setNotification({ show: true, type: 'didNotWinPoints' }));
				})
				.catch((error) => {
					put(setNotification({ show: true, type: 'error', message: error.message }));
				});
		}
	} catch (e) {
		console.log(e);
		yield put({ type: 'TODO_FETCH_FAILED' });
	}
}
