import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from 'src/store/rootSaga';

import app from './app';
import user from './user';
import interests from './interests';
import brand from './brand';
import event from './event';
import articles from './articles';
import questionnaires from './survey';
import myVisitedList from './myVisitedList';
import myEventsList from './myEvents';
import participateToEvent from './participatedEvent';
import userEventsList from './userEvents';
import userInterests from './userInterests';

const devMode = process.env.NODE_ENV === 'development';

const reducer = combineReducers({
	app,
	user,
	brand,
	interests,
	event,
	articles,
	questionnaires,
	myVisitedList,
	myEventsList,
	participateToEvent,
	userEventsList,
	userInterests
});

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

if (devMode) {
	middleware.push(logger);
}

const store = configureStore({
	reducer,
	devTools: devMode,
	middleware,
});
sagaMiddleware.run(rootSaga);

export default store;

// eslint-disable-next-line import/prefer-default-export
