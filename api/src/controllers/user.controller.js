const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');
const { userService } = require('../services');

const getUsers = catchAsync(async (req, res) => {
	console.log("REACHED HERE :::")
	const user = await userService.getUsers(req);
	res.send({ user });
});

const createUser = catchAsync(async (req, res) => {
	const user = await userService.createUser(req.params.email);

	if (!user) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Users not found');
	}

	res.send({ user });
});

const deleteUser = catchAsync(async (req, res) => {
	await userService.deleteUserById(req.params.userId);
	res.send({ success: true });
});

const updateUser = catchAsync(async (req, res) => {
	const user = await userService.updateUser(req);

	if (!user) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Users not found');
	}

	delete user.password;
	res.send({ user });
});

module.exports = {
	getUsers,
	createUser,
	updateUser,
	deleteUser,
};