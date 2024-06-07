const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { taskService } = require('../services');

const createTask = catchAsync(async (req, res) => {
	const task = await taskService.createTask(req);
	res.send({ task });
});

const getTasks = catchAsync(async (req, res) => {
	const tasks = await taskService.getTasks(req);
	res.send({ tasks });
});


const deleteTask = catchAsync(async (req, res) => {
	await taskService.deleteTask(req);
	res.send({ success: true });
});

const updateTask = catchAsync(async (req, res) => {
	const task = await taskService.updateTask(req);
	res.send({ task });
});

module.exports = {
	createTask,
	getTasks,
	deleteTask,
	updateTask,
};