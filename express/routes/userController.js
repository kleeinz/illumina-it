const express = require('express');

// CONFIGURATION
const config = require('../configs/config');
const errorSender = require('../configs/ErrorSender');
const Responser = require('../configs/Responser');
const status = require('../configs/StatusCodes');
const router = express.Router();

const User = require('../models/users');

router.put('/update', (request, response) => {
  User.findOne({'_id': request.body._id})
      .then(user => {
          user.name = request.body.name;
          if (request.body.isModified)
              user.password = request.body.passwords.password;
          user.userType = request.body.userType;
          user.image = request.body.image;
          user.save().then(success => {
              return response.status(status.codes.ok).json(new Responser(success, status.codes.ok, 'The user has been updated.'));
          }).catch((err) => {
            return errorSender(err, response, status.codes.server);
          });
      }).catch(err => {
          return errorSender(err, response, status.codes.server);
      });

});


router.post('/save', (request, response) => {
  let user = new User({
    username: request.body.username,
    name: request.body.name,
    password: request.body.passwords.password,
    userType: request.body.userType,
    image: request.body.image
  });
  user.save().then(success =>  {
    return response.status(status.codes.save).json(new Responser(success, status.codes.save, 'The user has been created.'));
  }).catch(err => {
    return errorSender(err, response, status.codes.server);
  });
});

router.get('/find', (request, response) => {
  User.find().then(success => {
    return response.status(status.codes.ok).json(new Responser(success, status.codes.ok, 'The users have been got.'));
  }).catch(err => {
    return errorSender(err, response, status.codes.server);
  });
});

router.get('/find/:username', (request, response) => {
  User.findOne({'username':request.params.username}).then(success => {
    return response.status(status.codes.ok).json(new Responser(success, status.codes.ok, 'The users has been got.'));
  }).catch(err => {
    return errorSender(err, response, status.codes.server);
  });

});

router.post('/delete', (request, response) => {
  User.remove({'username': request.body.user.username}).then(data => {
      return response.status(status.codes.ok).json(new Responser(data, status.codes.ok, 'The object has been removed.'));
    }).catch(err => {
      return errorSender(err, response, status.codes.server);
    });
});

module.exports = router;
