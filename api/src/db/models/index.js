/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const config = require(`${__dirname}/../../config/config`);

const basename = path.basename(module.filename);

const db = {};
console.log("config.sqlDB", config.sqlDB)
const sequelize = new Sequelize(
	config.sqlDB.database,
	config.sqlDB.user,
	config.sqlDB.password,
	{
		...config.sqlDB,
		logging: false,
	}
);
// console.log("__dirname", __dirname)
fs.readdirSync(__dirname)
	.filter(
		(file) =>
			file.indexOf('.') !== 0 &&
			file !== basename &&
			file.slice(-9) === '.model.js'
	)
	.forEach((file) => {
		const model = require(path.join(__dirname, file))(
			sequelize,
			Sequelize.DataTypes
		);
		
		db[model.name] = model;
		console.log(model.name)
	});

Object.keys(db).forEach((modelName) => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;