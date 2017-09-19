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
const upload = multer({ dest: config.UPLOAD_DIR }).single('image');

router.post('/upload', (request, response) => {
    console.log("Uploading the image");
});


module.exports = router;