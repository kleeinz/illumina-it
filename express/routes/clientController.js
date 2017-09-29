const express = require('express');
const router = express.Router();
// CONFIGURATION
const config = require('../configs/config');
const errorSender = require('../configs/ErrorSender');
const Responser = require('../configs/Responser');
const status = require('../configs/StatusCodes');
const app = express();
const Client = require('../models/clients');

router.put('/update', (request, response) => {
  Client.update({
    '_id': request.body._id,
    'name': request.body.name
  },
  {
    phone: request.body.phone,
    married: request.body.married,
    gender: request.body.gender,
    age: request.body.age,
    profession: request.body.profession
  }).then(success => {
    return response.status(status.codes.ok).json(new Responser(success, status.codes.ok, 'The client has been updated.'));
  }).catch( err => {
    return errorSender(err, response, status.codes.server);
  });
});

router.post('/save', (request, response) => {
  let client = new Client({
    name: request.body.name,
    phone: request.body.phone,
    married: request.body.married,
    gender: request.body.gender,
    age: request.body.age,
    profession: request.body.profession
  });
  client.save().then(data =>  {
    return response.status(status.codes.save).json(new Responser(data, status.codes.save, 'The client has been created.'));
  }).catch(err => {
    return errorSender(err, response, status.codes.server);
  });
});

router.get('/find', (request, response) => {
  Client.find().then(clients => {
    return response.status(status.codes.ok).json(new Responser(clients, status.codes.ok, 'The clients have been got.'));
  }).catch(err => {
    return errorSender(err, response, status.codes.server);
  });
});

router.post('/delete', (request, response) => {
  Client.remove({'_id': request.body.client._id}).then(client => {
      return response.status(status.codes.ok).json(new Responser(client, status.codes.ok, 'The client has been removed.'));
    }).catch(err => {
      return errorSender(err, response, status.codes.server);
    });
});

router.get('/find/:id', (request, response) => {
  Client.findOne({'username':request.params.id}).then(clients => {
    return response.status(status.codes.ok).json(new Responser(clients, status.codes.ok, 'The users has been got.'));
  }).catch(err => {
    return errorSender(err, response, status.codes.server);
  });

});


module.exports = router;
