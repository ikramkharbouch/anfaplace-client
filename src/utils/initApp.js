import { v4 as uuidv4 } from 'uuid';
import firebase from 'firebase/app';
import 'firebase/auth';
import {
	KafkaAppOpenedTimeEvent,
	// KafkaGPSEnabled,
	KafkaPhoneModel,
} from 'src/utils/kafka/KafkaEvents';

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
	apiKey: 'AIzaSyDuxd1hmi9IqMb4dT8XN1LZ4QYfmHEq7gg',
	authDomain: 'apa-hosting.firebaseapp.com',
	projectId: 'apa-hosting',
	storageBucket: 'apa-hosting.appspot.com',
	messagingSenderId: '283349645922',
	appId: '1:283349645922:web:dc55fe5fb4996f22fa2f3b',
};

// Initialize Firebase
// eslint-disable-next-line import/prefer-default-export
export const firebaseApp = firebase.initializeApp(firebaseConfig);
