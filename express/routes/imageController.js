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

// router.post('/upload', (request, response) => {
// 	console.log("Executing the image: ", request.file);
// 	uploadImage((request, response) =>  {
// 		let extension = _.last(request.file.originalname.split('.'));
// 		let oldFile = request.file.filename;
// 		let newFile = moment()+'.'+extension;
// 		fs.rename((oldFile, newFile) => {
// 			return response.status(status.codes.ok)
// 			.json(new Responser("http://localhost:3000/api/" + newFile, status.codes.ok, 'The image has been upload.'));
// 		}).catch((err) => {
// 			console.log(err);
// 			return errorSender(err, response, status.codes.server);
// 		});
// 	}).catch((err) => {
// 		console.log(err);
// 		return errorSender(err, response, status.codes.server);
// 	});
// });

router.post('/upload', (request, response) => {
	console.log("Executing the image: ", request.file);
	uploadImage(request, response, function (err) {
		if (err) {
			sendError(err, response);
		}
		let extension = _.last(request.file.originalname.split('.'));
		let oldName = request.file.filename;
		let newName = moment()+ '.' + extension;
		let filePath = `http://localhost:3000/images/${newName}`;
		fs.rename(`${config.img}${oldName}`, `${config.img}${newName}`, function (err) {
			if (err)
				throw err;
			return response.status(status.codes.ok)
			.json(new Responser(filePath, status.codes.ok, 'The image has been upload.'));
		});
	});
});



module.exports = router;
