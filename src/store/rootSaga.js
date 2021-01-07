import { takeEvery, all } from 'redux-saga/effects';
import userActions from 'src/store/user/actions';
import brandActions from 'src/store/brand/actions';
import eventActions from 'src/store/event/actions';
import { fetchAllBrandSaga } from 'src/store/brand/saga';
import { logInWithProvider } from 'src/store/user/saga';
import { fetchAllEvent } from 'src/store/event/saga';

function* rootSaga() {
	yield all([
		takeEvery(brandActions.FETCH_ALL_BRANDS, fetchAllBrandSaga),
		takeEvery(userActions.LOG_IN_WITH_PROVIDER, logInWithProvider),
		takeEvery(eventActions.FETCH_ALL_EVENTS, fetchAllEvent),
	]);
}

export default rootSaga;
