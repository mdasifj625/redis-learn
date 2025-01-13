import express from 'express';
import redisClient from './redis.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/health', (req, res, _) => {
	res.send({ message: 'Hello from rate limmit test' });
});

app.get('/api/user/:id/:score', async (req, res) => {
	const { id, score } = req.params;
	const leaderboardKey = `leaderboard`;
	await redisClient.ZADD(leaderboardKey, {
		score,
		value: id,
	});

	const leaderboardList = await redisClient.zRangeWithScores(
		leaderboardKey,
		0,
		50000,
		{
			REV: true,
		}
	);
	console.log({ id, score, leaderboardList });

	res.send(leaderboardList);
});

app.listen(3000, () => console.log('Server is up on 3000 port'));
