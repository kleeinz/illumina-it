const express = require('express');

const config = require('../configs/config');
const errorSender = require('../configs/ErrorSender');
const Responser = require('../configs/Responser');
const status = require('../configs/StatusCodes');

const router = express.Router();
const mongoose = require('mongoose');

// Connect
mongoose.Promise = global.Promise;
mongoose.connect(config.database, { useMongoClient: true });

const authController = require('./authController');
const userController = require('./userController');

router.use('/userController', userController);
router.use('/authController', authController);

module.exports = router;
