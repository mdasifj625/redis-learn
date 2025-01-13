// import { createClient } from 'redis';

// const client = await createClient().connect();
// client.on('error', (err) => console.log('Redis Client Error', err));
// export default client;

import { createClient } from 'redis';

const publisher = await createClient().connect();
const subscriber = await createClient().connect();
export { publisher, subscriber };
