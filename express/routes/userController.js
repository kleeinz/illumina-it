const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Connect
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://barbie:barbie@ds123534.mlab.com:23534/illuminame');

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

router.route('/save').get( function(req, res) {
    let user = new User();
    user.name = req.body;
    user.save(function(err) {
        if (err)
            res.send(err);
        res.json({ message: 'User created!' });
    });
});

module.exports = router;