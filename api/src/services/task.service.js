const httpStatus = require('http-status');
const { getOffset } = require('../utils/query');
const ApiError = require('../utils/ApiError');
const config = require('../config/config.js');
const db = require('../db/models');

async function getTasks(req) {
	const { page: defaultPage, limit: defaultLimit } = config.pagination;
	const { page = defaultPage, limit = defaultLimit } = req.query;

	const offset = getOffset(page, limit);

	const roles = await db.Tasks.findAndCountAll({
		where: {userId: req.currentUserId},
	});

	return roles;
}

async function createTask(req) {
	console.log(req.currentUserId)
	const { title, description = '', status } = req.body;

	const createdTask = await db.Tasks
		.create({
			title,
			description,
			status,
			userId: req.currentUserId
		})
		.then((resultEntity) => resultEntity.get({ plain: true }));

	return createdTask;
}

async function updateTask(req) {
	const task = await db.Tasks.findOne({ where: {id: req.body.taskId }})
	if(!task) {
		throw new ApiError(httpStatus.NOT_FOUND, "This task doesn't exits");
	}
	const updatedTask = await db.Tasks
		.update(
			{ ...req.body },
			{
				where: { id: req.body.taskId },
				returning: true,
				plain: true,
				raw: true,
			}
		)
		.then((data) => data[1]);

	return updatedTask;
}

async function deleteTask(req) {
	console.log(req.params)
	console.log(req.query)
	await db.Tasks
		.destroy(
			{
				where: { id: req.query.taskId },
			}
		)

	return {ok: true};
}

module.exports = {
	createTask,
	getTasks,
	updateTask,
	deleteTask
};