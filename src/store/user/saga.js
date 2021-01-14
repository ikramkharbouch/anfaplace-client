import { put, call, take } from 'redux-saga/effects';
import firebaseApp from 'src/utils/initApp';
import { openPhoneAuth, setNotification } from 'src/store/app';
import { eventChannel } from 'redux-saga';
import { API, getUserToken } from 'src/utils/utilsFunctions';
import { setUser, setUserPoints } from 'src/store/user/index';
import surveyAction from 'src/store/survey/actions';

const getAuthChannel = () =>
	eventChannel((emit) =>
		firebaseApp.auth().onAuthStateChanged((user) => {
			emit(user || 'null');
		})
	);

export function* watchForFirebaseAuth() {
	console.log('userWatcher');

	// This is where you wait for a callback from firebase
	const channel = yield call(getAuthChannel);
	while (true) {
		try {
			const user = yield take(channel);
			if (user !== 'null') {
				const token = yield getUserToken();
				if (JSON.parse(localStorage.getItem('isNewUser'))) {
					const apiUser = yield call(() =>
						API({
							url: 'user/register',
							method: 'post',
							data: {
								phoneNumber: user.phoneNumber,
								interests: JSON.parse(localStorage.getItem('interests')) || [],
								validateBySms: true,
							},
							token,
						})
					);
					yield put(setUserPoints(apiUser.data.points_user));
					yield put(setNotification({ show: true, type: 'wonPoints' }));
					yield put(openPhoneAuth(false));
					localStorage.setItem('isNewUser', 'false');
				}
				const userAPi = yield call(() => API({ url: '/getUser', method: 'post', data: {}, token }));

				yield put(
					setUser({
						displayName: user.displayName,
						isAnonymous: user.isAnonymous,
						points: userAPi.data.user.points,
						list_visite: userAPi.data.user.list_visite,
						mes_events: userAPi.data.user.mes_events,
						multiFactor: { enrolledFactors: user.multiFactor.enrolledFactors },
					})
				);
			} else {
				yield put(setUser(null));
				yield put(openPhoneAuth({ open: true }));
			}

			yield put({ type: surveyAction.FETCH_ALL_QUESTIONNAIRES });
		} catch (error) {
			console.error(error);
			yield put(setNotification({ show: true, type: 'error', message: 'une erreur est survenue' }));
		}
	}

	// result is what you pass to the emit function. In this case, it's an object like { user: { name: 'xyz' } }
}

// eslint-disable-next-line import/prefer-default-export
export function* logInWithProvider({ payload: authProvider }) {
	try {
		if (authProvider) {
			let provider;
			if (authProvider === 'facebook') {
				provider = new firebaseApp.auth.FacebookAuthProvider();
			}
			if (authProvider === 'google') {
				provider = new firebaseApp.auth.GoogleAuthProvider();
			}
			firebaseApp
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
			firebaseApp
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
		yield put({ type: 'FETCH_FAILED' });
	}
}

export function* updateUserPoints({ points }) {
	yield put(setUserPoints({ points }));
}
