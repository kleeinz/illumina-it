  const express = require('express');

  // CONFIGURATION
  const config = require('../configs/config');
  const errorSender = require('../configs/ErrorSender');
  const Responser = require('../configs/Responser');
  const status = require('../configs/StatusCodes');
  const router = express.Router();

  const User = require('../models/users');

  router.post('/save', (request, response) => {
      console.log("id:   ::::::", request.body._id);
      if (request.body._id) {
          User.update({
            '_id': request.body._id,
            'username': request.body.username
          },
          {
            name: request.body.name,
            password: request.body.passwords.password,
            userType: request.body.userType
          }).then(success => {
            return response.status(status.codes.ok).json(new Responser(success, status.codes.ok, 'The user has been updated.'));
        }).catch( err => {
          console.log({ err: err }, 'Unexpected Error');
          return errorSender(err, response, status.codes.server);
        });
      } else {

          let user = new User({
              username: request.body.username,
              name: request.body.name,
              password: request.body.passwords.password,
              userType: request.body.userType
          });
          user.save().then(success =>  {
              console.log("The user has been created.");
              return response.status(status.codes.save).json(new Responser(success, status.codes.save, 'The user has been created.'));
          }).catch(err => {
              console.log({ err: err }, 'Unexpected Error');
              return errorSender(err, response, status.codes.server);
          });
      }
  });

  router.get('/find', (request, response) => {
      User.find().then(success => {
          console.log("Getting all objects from the database, ", success);
          return response.status(status.codes.ok).json(new Responser(success, status.codes.ok, 'The objects have been got.'));
      }).catch(err => {
          console.log({ err: err }, 'Unexpected Error');
          return errorSender(err, response, status.codes.server);
      });
  });

  router.get('/find/:username', (request, response) => {
      User.findOne({'username':request.params.username}).then(success => {
          console.log("Getting object from the database, ", success);
          return response.status(status.codes.ok).json(new Responser(success, status.codes.ok, 'The object has been got.'));
      }).catch(err => {
          console.log({ err: err }, 'Unexpected Error');
          return errorSender(err, response, status.codes.server);
      });

  });

  router.post('/delete', (request, response) => {
      User.remove({'username': request.body.user.username}).then(data => {
        //console.log("Removing object from the database, ", data);
        return response.status(status.codes.ok).json(new Responser(data, status.codes.ok, 'The object has been removed.'));
      }).catch(err => {
        console.log({ err: err }, 'Unexpected Error');
        return errorSender(err, response, status.codes.server);
      });

  });

  module.exports = router;
