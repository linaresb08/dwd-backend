'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AppointmentSchema = Schema({
  date: Date,
  startTime: String,
  email: String,
});

module.exports = mongoose.model('Appointment', AppointmentSchema);