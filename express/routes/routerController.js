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
const clientController = require('./clientController');
const imageController = require('./imageController');

router.use('/userController', userController);
router.use('/authController', authController);
router.use('/clientController', clientController);
router.use('/imageController', imageController);

module.exports = router;
