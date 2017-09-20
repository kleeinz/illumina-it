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
  console.log("id: ", request.body._id);
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
    console.log({ err: err }, 'Unexpected Error');
    return errorSender(err, response, status.codes.server);
  });
});

router.post('/save', (request, response) => {
  console.log(request.body);
  let client = new Client({
    name: request.body.name,
    phone: request.body.phone,
    married: request.body.married,
    gender: request.body.gender,
    age: request.body.age,
    profession: request.body.profession
  });
  client.save().then(data =>  {
    console.log("The client has been created.");
    return response.status(status.codes.save).json(new Responser(data, status.codes.save, 'The client has been created.'));
  }).catch(err => {
    console.log({ err: err }, 'Unexpected Error');
    return errorSender(err, response, status.codes.server);
  });
});

router.get('/find', (request, response) => {
  console.log(request.body);
  Client.find().then(clients => {
    console.log("Getting all objects from the database, ", clients);
    return response.status(status.codes.ok).json(new Responser(clients, status.codes.ok, 'The clients have been got.'));
  }).catch(err => {
    console.log({ err: err }, 'Unexpected Error');
    return errorSender(err, response, status.codes.server);
  });
});

router.post('/delete', (request, response) => {
  console.log("Cliente a eliminar: ", request.body.client);
  Client.remove({'_id': request.body.client._id}).then(client => {
      console.log("Removing object from the database, ", client);
      return response.status(status.codes.ok).json(new Responser(client, status.codes.ok, 'The client has been removed.'));
    }).catch(err => {
      console.log({ err: err }, 'Unexpected Error');
      return errorSender(err, response, status.codes.server);
    });
});

router.get('/find/:id', (request, response) => {
  Client.findOne({'username':request.params.id}).then(clients => {
    console.log("Getting object from the database, ", clients);
    return response.status(status.codes.ok).json(new Responser(clients, status.codes.ok, 'The users has been got.'));
  }).catch(err => {
    console.log({ err: err }, 'Unexpected Error');
    return errorSender(err, response, status.codes.server);
  });

});


module.exports = router;
