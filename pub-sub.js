import express from 'express';
import { publisher, subscriber } from './redis.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

subscriber.subscribe('chat:room1', (message) => {
	console.log(`Received the  message in room1 ${message}`);
});

app.get('/api/health', (req, res, _) => {
	res.send({ message: 'Health is good' });
});

app.get('/api/pub/:room/:message', async (req, res) => {
	const { room, message } = req.params;
	const publishKey = `chat:${room}`;

	const publishResponse = await publisher.publish(publishKey, message);

	console.log({ publishResponse, publishKey, room, message });

	res.send({ status: 'message published' });
});

app.listen(3000, () => console.log('Server is up on 3000 port'));
