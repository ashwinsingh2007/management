const Joi = require('@hapi/joi');
const { password } = require('./custom.validation');

const register = {
	body: Joi.object().keys({
		email: Joi.string().required().email(),
		uid: Joi.string().required(),
		accessToken: Joi.string(),
		name: Joi.string(),
		photoUrl: Joi.string(),
	}),
};

const login = {
	body: Joi.object().keys({
		email: Joi.string().required(),
	}),
};

module.exports = {
	register,
	login,
};