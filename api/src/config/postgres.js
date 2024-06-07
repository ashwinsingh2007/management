const { Client } = require('pg');
const config = require('./config');
const logger = require('./logger');

let client;

(async function name() {
	console.log("config.sqlDB::::", config.sqlDB)
	client = new Client(config.sqlDB);
	try {
		await client.connect();
		logger.info('Connect to postgress sucessfully');
		return client;
	} catch (error) {
		logger.error('Connect to postgress error');
		process.exit(1);
	}
})();

module.exports = {
	postgres: client,
};