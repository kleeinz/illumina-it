const express = require('express');
const router = express.Router();
/* library JSON WEB TOKEN */
const jwt = require('jsonwebtoken');

/* Configuration properties, ErrorSender and HTTP Codes */
const config = require('../configs/config');
const errorSender = require('../configs/ErrorSender');
const status = require('../configs/StatusCodes');

/** 
 * This method is a small middleware to give security in the backend. Practically the method verifies
 * if the token is correct to get access, in the case that the token doesn't be correct, then the application
 * denegate the access to the API. Although if the token doesn't exist then the application will ask a token.
 * @param request is the information received from the frontend
 * @param response is the response sent by the server
 * @param next is the next request.
*/
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
