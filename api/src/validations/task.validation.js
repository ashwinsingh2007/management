const Joi = require('@hapi/joi');

const createTask = {
	body: Joi.object().keys({
		title: Joi.string().required(),
		description: Joi.string(),
		status: Joi.string().required(),
	}),
};

const getTasks = {
	query: Joi.object().keys({
		limit: Joi.number().min(1),
		page: Joi.number().min(1),
	}),
};


const updateTask = {
	body: Joi.object().keys({
		title: Joi.string().required(),
		description: Joi.string().required(),
		status: Joi.string().required(),
		taskId: Joi.number().required()
	}),
};

const deleteTask = {
	query: Joi.object().keys({
		taskId: Joi.number().required()
	}),
};

module.exports = {
	createTask,
	getTasks,
	updateTask,
	deleteTask,
};