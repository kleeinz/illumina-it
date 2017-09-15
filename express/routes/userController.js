const express = require('express');
const config = require('../configs/config');
const jwt = require('jsonwebtoken');
const router = express.Router();
const mongoose = require('mongoose');
const app = express();
const Promise = require('bluebird');

// Configuration
app.set('superSecret', config.secret);

// Connect
mongoose.Promise = global.Promise;
mongoose.connect(config.database, { useMongoClient: true });



let User = require('../models/users');


// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};
router.post('/save', (request, response) => {
    console.log("UserType:   ::::::", request.body.userType);
    let user = new User({
        username: request.body.username,
        password: request.body.password,
        userType: request.body.userType
    });
    user.save().then(success =>  {
        console.log("The user has been created.");
        return response.status(200).json({ 'message': 'The user has been created' });
    }).catch(err => {
        console.log({ err: err }, 'Unexpected Error');
        sendError(err, response);
    });
});

router.get('/find', (request, response) => {
    User.find().then(success => {
        console.log("Getting all objects from the database, ", success);
        return response.status(200).json(success);
    }).catch(err => {
        console.log({ err: err }, 'Unexpected Error');
        sendError(err, response);
    });


});

router.get('/find/:username', (request, response) => {
    User.findOne({'username':request.params.username}).then(success => {
        console.log("Getting object from the database, ", success);
        return response.status(200).json(success);
    }).catch(err => {
        console.log({ err: err }, 'Unexpected Error');
        sendError(err, response);
    });

});

router.post('/auth', (request, response) => {
    User.findOne({'username': request.body.username, 'password': request.body.password })
        .then(success => {
            if (!success) 
                return response.status(404).json({'message': 'Username doesn´t exist in the database'});

            console.log("APP: " + app.get('superSecret'));
            let token = jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60 * 6),
                data: request.body.username
            }, app.get('superSecret'));


            console.log("Authenticating user in the system", success);
            return response.status(200).json({ 
                'message': 'Accessing to the system', 
                'username': request.body.username,
                'token': token 
            });
        }).catch(err => {
            console.log({ err: err }, 'Unable to login');
            sendError(err, response);
        });

});

module.exports = router;