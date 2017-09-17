const express = require('express');

// CONFIGURATION
const config = require('../configs/config');
const errorSender = require('../configs/ErrorSender');
const Responser = require('../configs/Responser');
const status = require('../configs/StatusCodes');
const router = express.Router();

//const jwt = require('jsonwebtoken');

// const mongoose = require('mongoose');
// const app = express();

const User = require('../models/users');

router.post('/save', (request, response) => {
    console.log("UserType:   ::::::", request.body.userType);
    let user = new User({
        username: request.body.username,
        password: request.body.password,
        userType: request.body.userType
    });
    user.save().then(success =>  {
        console.log("The user has been created.");
        return response.status(status.codes.save).json(new Responser(success, status.codes.save, 'The user has been created.'));
    }).catch(err => {
        console.log({ err: err }, 'Unexpected Error');
        return errorSender(err, response, status.codes.server);
    });
});

router.get('/find', (request, response) => {
    User.find().then(success => {
        console.log("Getting all objects from the database, ", success);
        return response.status(status.codes.ok).json(new Responser(success, status.codes.ok, 'Getting all objects from the database.'));
    }).catch(err => {
        console.log({ err: err }, 'Unexpected Error');
        return errorSender(err, response, status.codes.server);
    });
});

router.get('/find/:username', (request, response) => {
    User.findOne({'username':request.params.username}).then(success => {
        console.log("Getting object from the database, ", success);
        return response.status(status.codes.ok).json(new Responser(success, status.codes.ok, 'Getting object from the database.'));
    }).catch(err => {
        console.log({ err: err }, 'Unexpected Error');
        return errorSender(err, response, status.codes.server);
    });

});

// router.post('/auth', (request, response) => {
//     User.findOne({'username': request.body.username, 'password': request.body.password })
//         .then(success => {
//             if (!success)
//                 return response.status(status.codes.notFound).json(new Responser(success, status.codes.notFound, 'Username doesn´t exist in the database.'));
//             console.log("APP: " + app.get('superSecret'));
//             let token = jwt.sign({
//                 exp: 60,
//                 data: request.body.username
//             }, app.get('superSecret'));
//
//
//             console.log("Authenticating user in the system", success);
//             return response.status(200).json({
//                 'message': 'Accessing to the system',
//                 'username': request.body.username,
//                 'token': token
//             });
//         }).catch(err => {
//             console.log({ err: err }, 'Unable to login');
//             sendError(err, response);
//         });
//
// });

module.exports = router;
