import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from 'src/store';
import './utils/initApp';
import 'semantic-ui-less/semantic.less';
import './utils/disable-context-menu';
import './index.css';
import brandAction from 'src/store/brand/actions';
import eventAction from 'src/store/event/actions';
import acticlesAction from 'src/store/articles/actions';

import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

store.dispatch({ type: brandAction.FETCH_ALL_BRANDS });
store.dispatch({ type: eventAction.FETCH_ALL_EVENTS });
store.dispatch({ type: acticlesAction.FETCH_ALL_ARTICLES });

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
