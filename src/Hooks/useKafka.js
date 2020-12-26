import { Kafka } from 'kafkajs';

function UseKafka() {
	const deviceUID = localStorage.getItem('device-uid');

	const kafka = new Kafka({
		clientId: deviceUID,
		brokers: [process.env.REACT_APP_KAFKA_BROKERS.split(',')],
	});
	const producer = kafka.producer();
	async function sendMessage() {
		await producer.connect();
		await producer.send({
			topic: 'topic1',
			messages: [{ value: { userId: '123456', event: 0 } }],
		});

		await producer.disconnect();
	}
	return [sendMessage];
}
export default UseKafka;
