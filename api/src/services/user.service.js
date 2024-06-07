const httpStatus = require('http-status');
const { getOffset } = require('../utils/query');
const ApiError = require('../utils/ApiError');
const { encryptData } = require('../utils/auth');
const config = require('../config/config.js');
const db = require('../db/models');
const taskService = require('./task.service');

async function getUserByEmail(email) {
	console.log("db:::::", db.Users)
	const user = await db.Users.findOne({
		where: { email },
	});
	return user;
}

async function getUserById(id) {
	const user = await db.Users.findOne({
		where: { id },
	});

	return user;
}

async function createUser(req) {
	const { 
		email,
		accessToken,
		name,
		photoUrl,
		uid,
	} = req.body;
	console.log("44444")
	const user = await getUserByEmail(email);
	console.log("55555")
	if (user) {
		return user
		// throw new ApiError(httpStatus.CONFLICT, 'This email already exits');

	}

	const createdUser = await db.Users
		.create({
			email,
			accessToken,
			name,
			photoUrl,
			uid,
		})
		.then((resultEntity) => resultEntity.get({ plain: true }));

	return createdUser;
}

async function getUsers(req) {
	console.log("req.currentUserIdLL:", req.currentUserId)
	const user = await db.Users.findOne({
		where: {id: req.currentUserId}
	});
	return user;
}

async function deleteUserById(userId) {
	const deletedUser = await db.Users.destroy({
		where: { id: userId },
	});

	if (!deletedUser) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Users not found');
	}

	return deletedUser;
}

async function updateUser(req) {
	const { password, email } = req.body;

	if (password) {
		const hashedPassword = await encryptData(password);

		if (!hashedPassword) {
			throw new ApiError(
				httpStatus.INTERNAL_SERVER_ERROR,
				'Internal Server Error'
			);
		}

		req.body.password = hashedPassword;
	}

	if (email) {
		const existedUser = await getUserByEmail(email);

		if (existedUser) {
			throw new ApiError(
				httpStatus.CONFLICT,
				'This email is already exist'
			);
		}
	}

	const updatedUser = await db.Users
		.update(
			{ ...req.body },
			{
				where: { id: req.params.userId || req.body.id },
				returning: true,
				plain: true,
				raw: true,
			}
		)
		.then((data) => data[1]);

	return updatedUser;
}

module.exports = {
	getUserByEmail,
	getUserById,
	createUser,
	updateUser,
	getUsers,
	deleteUserById,
};