const express = require('express');
const router = express.Router();
// CONFIGURATION
const moment = require('moment');
const _ = require('lodash');
const fs = require('fs');
const config = require('../configs/config');
const errorSender = require('../configs/ErrorSender');
const Responser = require('../configs/Responser');
const status = require('../configs/StatusCodes');
const app = express();
const multer = require('multer');
const uploadImage = multer({ dest: config.img }).single('image');

router.use('/upload', uploadImage);

router.post('/upload', (request, response) => {
	uploadImage(request, response, function (err) {
		if (err) {
			sendError(err, response);
		}
		let extension = _.last(request.file.originalname.split('.'));
		let oldName = request.file.filename;
		let newName = moment()+ '.' + extension;
		let filePath = `http://localhost:3000/images/${newName}`;
		fs.rename(`${config.img}${oldName}`, `${config.img}${newName}`, (err) => {
			if (err)
				return errorSender(err, response, status.codes.server);
			return response.status(status.codes.ok)
			.json(new Responser({'filePath':filePath, 'filename': newName}, status.codes.ok, 'The image has been upload.'));
		});
	});
});

router.delete('/deleteImg/:imgName', (request, response) => {
	fs.unlink(`${config.img}${request.params.imgName}`, (err) => {
			if(err)
				return errorSender(err, response, status.codes.server);
			return response.status(status.codes.ok)
			.json(new Responser(request.params.imgName, status.codes.ok, 'The image has been removed.'));
	});
});



module.exports = router;
