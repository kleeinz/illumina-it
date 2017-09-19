const express = require('express');
const router = express.Router();
// CONFIGURATION
const config = require('../configs/config');
const errorSender = require('../configs/ErrorSender');
const Responser = require('../configs/Responser');
const status = require('../configs/StatusCodes');
const app = express();

router.post('/save', (request, response) => {
    console.log("Uploading the image");
});

router.post('/find', (request, response) => {
    console.log("Uploading the image");
});

router.post('/delete', (request, response) => {
    console.log("Uploading the image");
});



module.exports = router;