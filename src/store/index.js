import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { takeEvery } from 'redux-saga/effects';
import { actions } from 'src/store/brand/actions';
import app from './app';
import interests from './interests';
import brand from './brand';
import { fetchAllBrandSaga } from './brand/saga';

const devMode = process.env.NODE_ENV === 'development';
function* saga() {
	yield takeEvery(actions.FETCH_ALL_BRANDS, fetchAllBrandSaga);
}
const reducer = combineReducers({ brand, app, interests });

const sagaMiddleware = createSagaMiddleware();

const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];

if (devMode) {
	middleware.push(logger);
}

const store = configureStore({
	reducer,
	devTools: devMode,
	middleware,
});
sagaMiddleware.run(saga);

export default store;

// eslint-disable-next-line import/prefer-default-export
