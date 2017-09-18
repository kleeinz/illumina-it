const express = require('express');
const router = express.Router();
// CONFIGURATION
const config = require('../configs/config');
const errorSender = require('../configs/ErrorSender');
const Responser = require('../configs/Responser');
const status = require('../configs/StatusCodes');

const jwt = require('jsonwebtoken');
const User = require('../models/users');
const bcrypt = require('bcrypt');


const app = express();
app.set('superSecret', config.secret);

router.post('/auth', (request, response) => {
    console.log(request.body);
    User.findOne({ 'username': request.body.username })
    .then(success => {
        if (!success)
            response.status(status.codes.notFound)
            .json(new Responser(success, status.codes.notFound, 'Username or password are not correct.'));
        bcrypt.compare(request.body.password, success.password, (err, callback) =>{
            if(err) throw err;
            if(!callback) {
                response.status(status.codes.notFound)
                .json(new Responser(success, status.codes.notFound, 'Password not match.'));
            }
            else {
               let token = jwt.sign({
                exp: 60,
            }, app.get('superSecret'));
               console.log("Authenticating user in the system, Username: ", success.username);
               response.status(status.codes.ok).json(new Responser([{
                  'user': success,
                  'token': token
              }], status.codes.ok, 'The user has been created.'));
           }
        });
    }).catch(err => {
        console.log({ err: err }, 'Unable to login');
        errorSender(err, response, status.codes.server);
    });

});

module.exports = router;
