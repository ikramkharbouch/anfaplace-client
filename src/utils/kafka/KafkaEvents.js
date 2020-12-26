// eslint-disable-next-line max-classes-per-file
import { sendMessage } from 'src/api/kafka';
import { mobileModel } from 'react-device-detect';

class KafkaBaseEvent {
	constructor(userId, eventType) {
		this.userId = userId;
		this.eventType = eventType;
	}

	emitEvent(topic = 'topic1') {
		sendMessage(topic, this);
		console.log('Kafka message |===>', this);
	}
}
class KafkaPhoneModel extends KafkaBaseEvent {
	constructor(userId) {
		super(userId, 'mobileModel');
		this.mobileModel = mobileModel;
	}
}
class KafkaGPSEnabled extends KafkaBaseEvent {
	constructor(userId) {
		super(userId, 'gpsEnabled');
	}
}

class KafkaSliderEvent extends KafkaBaseEvent {
	constructor(userId, eventType, imageId, time, sliderId) {
		super(userId, eventType);
		this.imageId = imageId;
		this.time = time;
		this.sliderId = sliderId;
	}
}

class KafkaAppOpenedTimeEvent extends KafkaBaseEvent {
	constructor(userId, launchDateTime) {
		super(userId, 'appLaunchDateTime');
		this.launchDateTime = launchDateTime;
	}
}
class KafkaTimeSpentOnSelectingInterest extends KafkaBaseEvent {
	constructor(userId, interestId, time) {
		super(userId, 'interestSelectionTime');
		this.interestId = interestId;
		this.time = time;
	}
}

class KafkaTimeBetweenEventsAndQuestionnaire extends KafkaBaseEvent {
	constructor(userId, time) {
		super(userId, 'timeBetweenEventsAndQuestionnaire');
		this.time = time;
	}
}

class KafkaTimeSpentOnSlide extends KafkaBaseEvent {
	constructor(userId, time, sliderId, imageId) {
		super(userId, 'timeOnSlide');
		this.time = time;
		this.sliderId = sliderId;
		this.imageId = imageId;
	}
}

class KafkaHeldSlide extends KafkaBaseEvent {
	constructor(userId, sliderId, imageId) {
		super(userId);
		this.sliderId = sliderId;
		this.imageId = imageId;
	}
}

export {
	KafkaBaseEvent,
	KafkaSliderEvent,
	KafkaAppOpenedTimeEvent,
	KafkaPhoneModel,
	KafkaGPSEnabled,
	KafkaTimeSpentOnSelectingInterest,
	KafkaTimeBetweenEventsAndQuestionnaire,
	KafkaTimeSpentOnSlide,
	KafkaHeldSlide,
};
