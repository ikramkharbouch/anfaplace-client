import { v4 as uuidv4 } from 'uuid';
import firebase from 'firebase/app';
import 'firebase/auth';
import {
	KafkaAppOpenedTimeEvent,
	// KafkaGPSEnabled,
	KafkaPhoneModel,
} from 'src/utils/kafka/KafkaEvents';
import store from 'src/store';
import { openSocialAuth } from 'src/store/app';
import { setUser } from '../store/user/index';

let deviceUID = localStorage.getItem('device-uid');

if (!deviceUID) {
	deviceUID = uuidv4();
	localStorage.setItem('device-uid', deviceUID);
}
const dateTime = new Date();
const appOpenedTimeEvent = new KafkaAppOpenedTimeEvent('123456', dateTime);
appOpenedTimeEvent.emitEvent();
const mobileModelEvent = new KafkaPhoneModel('123456');
mobileModelEvent.emitEvent();
// navigator.geolocation.getCurrentPosition((pos) => {
// 	const lat = pos.coords.latitude;
// 	if (lat == null) {
// 		console.log('GPS not activated!');
// 	} else {
// 		const gpsEnabledEvent = new KafkaGPSEnabled('12346');
// 		gpsEnabledEvent.emitEvent();
// 	}
// });

const firebaseConfig = {
	apiKey: 'AIzaSyDH4vxFy0zUwbvynu-B5DwHbShrtNhikSY',
	authDomain: 'apadev-af2f3.firebaseapp.com',
	projectId: 'apadev-af2f3',
	storageBucket: 'apadev-af2f3.appspot.com',
	messagingSenderId: '40293498630',
	appId: '1:40293498630:web:1dbad5802213c6ff022887',
	measurementId: 'G-P1ZFJLS8RV',
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged((user) => {
	if (user) {
		// User is signed in, see docs for a list of available properties
		// https://firebase.google.com/docs/reference/js/firebase.User
		// ...
		store.dispatch(
			setUser({
				displayName: user.displayName,
				isAnonymous: user.isAnonymous,
				multiFactor: { enrolledFactors: user.multiFactor.enrolledFactors },
			})
		);
		store.dispatch(openSocialAuth({ open: false, withEmail: false }));
	} else {
		// User is signed out
		// ...
		store.dispatch(setUser(user));
		store.dispatch(openSocialAuth({ open: true, withEmail: false }));
	}
});
// Initialize Firebase
// eslint-disable-next-line import/prefer-default-export
export default firebaseApp;
