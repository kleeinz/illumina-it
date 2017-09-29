const express = require('express');
const router = express.Router();
/* Configuration properties, ErrorSender and HTTP Codes */
const config = require('../configs/config');
const errorSender = require('../configs/ErrorSender');
const status = require('../configs/StatusCodes');
/* Custom Response */
const Responser = require('../configs/Responser');
/* library JSON WEB TOKEN */
const jwt = require('jsonwebtoken');
/* User Schema */
const User = require('../models/users');
/* Library to encrypt password and comparate a password encrypted */
const bcrypt = require('bcrypt');


const app = express();
app.set('superSecret', config.secret);

/* auth web service to login
* This method find a user in MongoDB through username, if the user exists
* the method compare the plain password given in the login view with the encrypted password stored 
* at database if everything is correct create a new token to the user and the user gets access at app
* if not return that the Password doesn't correct.
*/
router.post('/auth', (request, response) => {
    User.findOne({ 'username': request.body.username })
    .then(success => {
        if (!success)
            response.status(status.codes.notFound)
            .json(new Responser(success, status.codes.notFound, "Username doesn't exist."));
        bcrypt.compare(request.body.password, success.password, (err, callback) => {
            if(err) throw err;
            if(!callback) {
                response.status(status.codes.notFound)
                .json(new Responser(success, status.codes.notFound, 'Password does not correct.'));
            }
            else {
               let token = jwt.sign({
                exp: 60*60*24,
            }, app.get('superSecret'));
              // The response sends the user and token information, this will be stored in a local storage.
               response.status(status.codes.ok).json(new Responser([{
                  'user': success,
                  'token': token
              }], status.codes.ok, 'The user has been logged.'));
           }
        });
    }).catch(err => {
        errorSender(err, response, status.codes.server);
    });

});

/* Exporting this web service */
module.exports = router;
