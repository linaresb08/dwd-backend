'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3900;

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/api-death-appointments', { useNewUrlParser: true })
  .then(() => {
    console.log('MongoDB database connected successfully!')

    // * Create server and listen to HTTP requests
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  });