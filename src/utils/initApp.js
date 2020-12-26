import { v4 as uuidv4 } from 'uuid';
import {
	KafkaAppOpenedTimeEvent,
	KafkaGPSEnabled,
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
navigator.geolocation.getCurrentPosition((pos) => {
	const lat = pos.coords.latitude;
	if (lat == null) {
		console.log('GPS not activated!');
	} else {
		const gpsEnabledEvent = new KafkaGPSEnabled('12346');
		gpsEnabledEvent.emitEvent();
	}
});
