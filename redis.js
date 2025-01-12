import { createClient } from 'redis';

const client = await createClient().connect();
client.on('error', (err) => console.log('Redis Client Error', err));
export default client;
