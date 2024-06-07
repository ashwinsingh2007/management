const Joi = require('@hapi/joi');
const { password } = require('./custom.validation');

const createUser = {
	body: Joi.object().keys({
		email: Joi.string().required().email(),
		uid: Joi.string().required(),
	}),
};


module.exports = {
	createUser,
};