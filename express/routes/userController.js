const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Promise = require('bluebird');

// Connect
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://admin:admin@ds133094.mlab.com:33094/illuminati', { useMongoClient: true });

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
    let user = new User({
        username: request.body.username,
        password: request.body.password,
        user_type: request.body.userType
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

module.exports = router;