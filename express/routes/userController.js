const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

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
    user.save(error => {
        if (error) response.status(500).send(error);
        response.status(201).json({
            message: 'User created successfully'
        });      
    });
});

module.exports = router;