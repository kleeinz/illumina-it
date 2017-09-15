const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../configs/config');
const errorSender = require('../configs/ErrorSender');


router.use((req, res, next) => {
	let token = req.body.token || req.query.token || req.headers['x-access-token'];
	if(token) {
		jwt.verify(token, config.secret, (err, decoded) => {
			if (err) return '';
			req.decoded = decoded;
			next();

		});
	} else {
		console.log("No token provided");
	}


});

module.exports = router;