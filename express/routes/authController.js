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
* the method compare the plain password with the encrypted password in the database
* if everything is correct create a new token to the user, if not return that
*
*/
router.post('/auth', (request, response) => {
    console.log(request.body);
    User.findOne({ 'username': request.body.username })
    .then(success => {
        if (!success)
            response.status(status.codes.notFound)
            .json(new Responser(success, status.codes.notFound, 'Username or password are not correct.'));
        bcrypt.compare(request.body.password, success.password, (err, callback) => {
            if(err) throw err;
            if(!callback) {
                response.status(status.codes.notFound)
                .json(new Responser(success, status.codes.notFound, 'Password not match.'));
            }
            else {
               let token = jwt.sign({
                exp: 60*60*24,
            }, app.get('superSecret'));
               console.log("Authenticating user in the system, Username: ", success.username);
               response.status(status.codes.ok).json(new Responser([{
                  'user': success,
                  'token': token
              }], status.codes.ok, 'The user has been logged.'));
           }
        });
    }).catch(err => {
        console.log({ err: err }, 'Unable to login');
        errorSender(err, response, status.codes.server);
    });

});

module.exports = router;
