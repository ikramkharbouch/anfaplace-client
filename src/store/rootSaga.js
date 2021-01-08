import { takeEvery, all } from 'redux-saga/effects';
import userActions from 'src/store/user/actions';
import brandActions from 'src/store/brand/actions';
import eventActions from 'src/store/event/actions';
import interestsAction from 'src/store/interests/actions';
import { fetchAllBrandSaga } from 'src/store/brand/saga';
import { logInWithProvider } from 'src/store/user/saga';
import { fetchAllEvent } from 'src/store/event/saga';
import { fetchInterests } from 'src/store/interests/saga';

function* rootSaga() {
	yield all([
		takeEvery(brandActions.FETCH_ALL_BRANDS, fetchAllBrandSaga),
		takeEvery(userActions.LOG_IN_WITH_PROVIDER, logInWithProvider),
		takeEvery(eventActions.FETCH_ALL_EVENTS, fetchAllEvent),
		takeEvery(interestsAction.FETCH_INTERESTS, fetchInterests),
	]);
}

export default rootSaga;
