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
/* Adding middleware multer to the router */
router.use('/upload', uploadImage);

/* This web service upload an image to the server folder called images */
router.post('/upload', (request, response) => {
	uploadImage(request, response, function (err) {
		if (err) {
			sendError(err, response);
		}
		/* Here the image name is extracted with lodash to get its extension and rename the image with
		   a timestamp value got with moment.
		 */
		let extension = _.last(request.file.originalname.split('.'));
		let oldName = request.file.filename;
		let newName = moment()+ '.' + extension;
		let filePath = `http://localhost:3000/images/${newName}`;
		/* Using the file system library of NodeJs to put the file in the correct path */
		fs.rename(`${config.img}${oldName}`, `${config.img}${newName}`, (err) => {
			if (err)
				return errorSender(err, response, status.codes.server);
			return response.status(status.codes.ok)
			.json(new Responser({'filePath':filePath, 'filename': newName}, status.codes.ok, 'The image has been upload.'));
		});
	});
});

/* This web service remove an image from the server folder called images */
router.delete('/deleteImg/:imgName', (request, response) => {
	fs.unlink(`${config.img}${request.params.imgName}`, (err) => {
			if(err)
				return errorSender(err, response, status.codes.server);
			return response.status(status.codes.ok)
			.json(new Responser(request.params.imgName, status.codes.ok, 'The image has been removed.'));
	});
});


/* Exporting the imageControler to the router */
module.exports = router;
