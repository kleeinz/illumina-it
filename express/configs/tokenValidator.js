const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// CONFIGURATION
const config = require('../configs/config');
const errorSender = require('../configs/ErrorSender');
const status = require('../configs/StatusCodes');


router.use((request, response, next) => {
	let token = request.body.token || request.query.token || request.headers['x-access-token'];
	if(token) {
		console.log(token);
		jwt.verify(token, config.secret, (err, tokenDecoded) => {
			if (err)
				return errorSender(err, response, status.codes.notAuth);
			console.log(tokenDecoded);
			request.tokenDecoded = tokenDecoded;
			next();
		});
	} else {
		return errorSender(err, response, status.codes.forbidden);
	}
});

module.exports = router;
