import express, { request, response } from 'express';
import redisClient from './redis.js';

const app = express();

app.use(async (req, res, next) => {
	const ipSplit = req.ip.split(':');
	const ip = ipSplit[ipSplit.length - 1] ?? req.ip;
	const windowSize = 5;
	const windowDuration = 30; // in seconds;
	const rateLimitKey = `tateLimit:${ip}`;
	const totalRequest = await redisClient.INCR(rateLimitKey);
	console.log({ totalRequest, ip, rateLimitKey });
	if (totalRequest === 1)
		await redisClient.expire(rateLimitKey, windowDuration);
	if (totalRequest > windowSize)
		return res.status(429).send('Too many request');
	next();
});

app.get('/api/health', (req, res, _) => {
	res.send({ message: 'Hello from rate limmit test' });
});

app.listen(3000, () => console.log('Server is up on 3000 port'));
