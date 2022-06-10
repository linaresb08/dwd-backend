'use strict'

// * Import local enviroment variables
require('dotenv').config({path: 'variables.env'});

var mongoose = require('mongoose');
var app = require('./app');

// * Read variables and port from localhost
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3900;


mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('MongoDB database connected successfully!')

    // * Create server and listen to HTTP requests
    app.listen(port, host, () => {
      console.log(`Server is running on port ${port}`);
    });
  });