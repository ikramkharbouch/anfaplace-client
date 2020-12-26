import axios from 'axios';

const deviceUID = localStorage.getItem('device-uid');

console.log(process.env.REACT_APP_KAFKA_REST_API);

// eslint-disable-next-line import/prefer-default-export
export const sendMessage = async (topic, value) => {
	axios
		.post(
			`${process.env.REACT_APP_KAFKA_REST_API}/topics/${topic}`,
			{ records: [{ key: deviceUID, value }] },
			{ headers: { 'Content-Type': 'application/vnd.kafka.json.v2+json' } }
		)
		.catch((error) => console.error(error));
	// await producer.connect();
	// await producer.send({
	// 	topic,
	// 	messages: [{ value: JSON.stringify(value) }],
	// });
	//
	// await producer.disconnect();
	console.log(value);
};
