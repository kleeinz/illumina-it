const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app = express();
// const jwt = require('jsonwebtoken');
// const config = ('./express/configs/config');
// API file for interacting with MongoDB
const api = require('./express/routes/userController');

// Configuration
// app.set('superSecret', config.secret);

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));

// API location
app.use('/userController', api);

// Send all other requests to the Angular app
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'dist/index.html'));
});

//Set Port
const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));