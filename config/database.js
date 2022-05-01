const { TEST } = require("./nodeEnvironments");

if (process.env.NODE_ENV !== TEST) {
	require("dotenv").config();
}

module.exports = {
	dialect: process.env.DB_CONNECTION,
	database: process.env.DB_DATABASE,
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	migrationStorageTableName: "sequelizeMeta",
	logging: false,
	benchmark: true,
	pool: {
		max: 40,
		min: 5,
		idle: 10000,
		acquire: 60000,
		evict: 1000
	}
};