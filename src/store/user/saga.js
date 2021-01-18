import { put, call, take } from 'redux-saga/effects';
import firebaseApp from 'src/utils/initApp';
import { openPhoneAuth, setNotification } from 'src/store/app';
import { eventChannel } from 'redux-saga';
import { API, getUserToken } from 'src/utils/utilsFunctions';
import {
	setConfirmPinLoading,
	setQrcode,
	setUser,
	setUserInfo,
	setUserPoints,
} from 'src/store/user/index';
import surveyAction from 'src/store/survey/actions';
import { resetSurvey } from 'src/store/survey';
import { resetVisitedList } from 'src/store/myVisitedList';

const getAuthChannel = () =>
	eventChannel((emit) =>
		firebaseApp.auth().onAuthStateChanged((user) => {
			emit(user || 'null');
		})
	);

export function* watchForFirebaseAuth() {
	// This is where you wait for a callback from firebase
	const channel = yield call(getAuthChannel);
	while (true) {
		try {
			const user = yield take(channel);
			if (user !== 'null') {
				const token = yield getUserToken();
				const isNewUser = JSON.parse(localStorage.getItem('isNewUser'));
				if (isNewUser) {
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
					yield call(() => API({ url: 'QRCodeUser', method: 'post', token }));

					yield put(setUserPoints(apiUser.data.points_user));
					yield put(setNotification({ show: true, type: 'wonPoints' }));
					yield put(openPhoneAuth(false));
					yield localStorage.setItem('isNewUser', 'false');
					yield localStorage.removeItem('interests');
				}
				const interests = yield localStorage.getItem('interests') || null;
				if (interests) {
					yield call(() =>
						API({ url: 'AffecterInterets', method: 'post', data: { listInterets: interests }, token })
					);
					yield localStorage.removeItem('interests');
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
						qrCode: userAPi.data.user.qrcode,
					})
				);
				if (!isNewUser) {
					yield put(setUserInfo({ nom: userAPi.data.user.nom, email: userAPi.data.user.email }));
				}
				yield put(setConfirmPinLoading(false));
			} else {
				yield put(resetVisitedList());
				yield put(resetSurvey());
				yield put(setUser(null));
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
		console.error(e);
		yield put({ type: 'FETCH_FAILED' });
	}
}

export function* updateUserPoints({ points }) {
	yield put(setUserPoints({ points }));
}

export function* getQrcode() {
	try {
		const token = yield getUserToken();

		const result = yield call(() => API({ url: '/getQRCode', method: 'post', token }));
		yield put(setQrcode(result.data));
	} catch (e) {
		console.error(e);
	}
}
