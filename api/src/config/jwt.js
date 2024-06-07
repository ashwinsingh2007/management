const expressJwt = require('express-jwt');
console.log(expressJwt)
const config = require('./config.js');

async function isRevoked(_req, _payload, done) {
	_req.currentUserId = _payload.payload.userId
	// done();
}

function jwt() {
	const { secret } = config.jwt;
	return expressJwt.expressjwt({
		secret,
		getToken: function fromHeaderOrQuerystring(req) {
			const token = req.headers.authorization
				? req.headers.authorization.split(' ')[1]
				: req.query.token;
			if (token) return token;
			return null;
		},
		algorithms: ['HS256'],
		isRevoked,
	}).unless({
		path: [
			// public routes that don't require authentication
			/\/v[1-9](\d)*\/(auth|docs)\/.*/,
		],
	});
}

module.exports = jwt;