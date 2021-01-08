import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from 'src/store/rootSaga';

import app from './app';
import user from './user';
import interests from './interests';
import brand from './brand';
import event from './event';
import articles from './articles';


const reducer = combineReducers({ app, user, brand, interests, event , articles });

const sagaMiddleware = createSagaMiddleware();

const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];

const store = configureStore({
	reducer,
	middleware,
});
sagaMiddleware.run(rootSaga);

export default store;

// eslint-disable-next-line import/prefer-default-export
