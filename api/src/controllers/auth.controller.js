const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const {
	authService,
	userService,
	// emailService,
	tokenService,
} = require('../services');
const { verifyToken } = require('../utils/auth');

const register = catchAsync(async (req, res) => {
	console.log("11111")
	const user = await userService.createUser(req);
	console.log("22222")
	const tokens = await tokenService.generateAuthTokens({
		userId: user.id,
	});
	console.log("33333")
	res.status(httpStatus.CREATED).send({ user, tokens });
});

const login = catchAsync(async (req, res) => {
	const user = await authService.loginUserWithEmailAndPassword(req);
	const tokens = await tokenService.generateAuthTokens({
		userId: user.id,
	});
	res.send({ user, tokens });
});

module.exports = {
	register,
	login,
};