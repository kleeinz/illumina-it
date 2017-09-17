const express = require('express');
const router = express.Router();
// CONFIGURATION
const config = require('../configs/config');
const errorSender = require('../configs/ErrorSender');
const Responser = require('../configs/Responser');
const status = require('../configs/StatusCodes');

const jwt = require('jsonwebtoken');
const User = require('../models/users');

const app = express();
app.set('superSecret', config.secret);

router.post('/auth', (request, response) => {
    console.log(request.body);
    User.findOne({'username': request.body.username, 'password': request.body.password })
        .then(success => {
            if (!success)
                return response.status(status.codes.notFound).json(new Responser(success, status.codes.notFound, 'Username or password are not correct.'));
            let token = jwt.sign({
                exp: 60,
            }, app.get('superSecret'));
            console.log("Authenticating user in the system, Username: ", success.username);
            return response.status(status.codes.ok).json(new Responser([{
              'user': success,
              'token': token
            }], status.codes.ok, 'The user has been created.'));
        }).catch(err => {
            console.log({ err: err }, 'Unable to login');
            return errorSender(err, response, status.codes.server);
        });

});

module.exports = router;
