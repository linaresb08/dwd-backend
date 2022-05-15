'use strict'

// * Load modules to create server
var express = require('express');
var bodyParser = require('body-parser');

// * Execute express (http)
var app = express();

// * Load path files
var appointment_routes = require('./routes/appointment');
const { application } = require('express');

// * Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// * Activate CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
})

// * Add prefixes to routes / Load routes
app.use('/api', appointment_routes);

// * Export module (current file)
module.exports = app;