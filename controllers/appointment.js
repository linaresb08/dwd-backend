'use strict'

var validator = require('validator');
var Appointment = require('../models/appointment');

var controller = {
  // * Creates a new appointment in DB
  save: (req,res) => {
    // * Receive params from client
    let params = req.body;

    // * Validate data (With Validator)
    try {
      var validate_date = !validator.isEmpty(params.date);
      var validate_startTime = params.startTime > 8 && params.startTime < 18 ? true : false;
      var validate_email = validator.isEmail(params.email);
    } catch (err) {
      return res.status(200).send({
        status: 'error',
        message: 'Some data are missing',
      });
    }

    if(validate_date && validate_startTime && validate_email) {
      // * Create object to save
      var appointment = new Appointment();

      // * Assign values
      appointment.date = params.date;
      appointment.startTime = params.startTime;
      appointment.email = params.email;

      // * Save the appointment
      appointment.save((err, appointmentStored) => {

        if(err || !appointmentStored) {
          return res.status(404).send({
            status: 'error',
            message: 'The appointment could not be saved',
          });
        }

        // * Return an answer
        return res.status(200).send({
          status: 'success',
          appointment: appointmentStored
        });

      });

    } else {
      return res.status(200).send({
        status: 'error',
        message: 'Invalid data!',
      });
    }
  },

  // * Reads appointments in DB
  getAppointments: (req, res) => {
    let query = Appointment.find({});

    // * Receive params from client
    let date = req.params.date;

    if (date || date != undefined) {
      query.where('date').equals(date);
    }

    // * Find all appointments
    query.sort({'date': 1, 'startTime': 1}).exec((err, appointments) => {

      if(err) {
        return res.status(500).send({
          status: 'error',
          message: 'Error returning appointments',
        });
      }

      if (!appointments) {
        return res.status(404).send({
          status: 'error',
          message: 'No appointments found',
        });
      }

      return res.status(200).send({
        status: 'success',
        appointments
      });
    })
  },

  getAppointment: (req, res) => {
    // * Receive params from client
    let appointmentId = req.params.id;

    // * Check that it exists
    if(!appointmentId || appointmentId == null) {
      return res.status(404).send({
        status: 'error',
        message: 'The appointment does not exist',
      });
    }

    // * Find appointment
    Appointment.findById(appointmentId, (err, appointment) => {

      if (err || !appointment) {
        return res.status(404).send({
          status: 'error',
          message: 'The appointment does not exist',
        });
      }

      // * Return an answer as JSON
      return res.status(200).send({
        status: 'succes',
        appointment,
      });
    })
  },

  // * Updates an appointment in DB
  update: (req, res) => {
    // * Receive params from client
    let appointmentId = req.params.id;
    let params = req.body;

    // * Validate data (With Validator)
    try {
      var validate_date = !validator.isEmpty(params.date);
      var validate_startTime = params.startTime > 8 && params.startTime < 18 ? true : false;
      var validate_email = validator.isEmail(params.email);
    } catch (err) {
      return res.status(200).send({
        status: 'error',
        message: 'Missing data to send',
      });
    }

    if(validate_date && validate_startTime && validate_email) {
      // * Find and update appointment
      Appointment.findByIdAndUpdate(appointmentId, params, {new: true}, (err, appointmentUpdated) => {

        if (err) {
          return res.status(500).send({
            status: 'error',
            message: 'Failed to update',
          });
        }
        if (!appointmentUpdated) {
          return res.status(404).send({
            status: 'error',
            message: 'The appointment does not exist',
          });
        }

        // * Return an answer as JSON
        return res.status(200).send({
          status: 'success',
          appointment: appointmentUpdated,
        });
      });
    } else {
      return res.status(200).send({
        status: 'error',
        message: 'Validation is not correct',
      });
    }
  },

  // * Deletes an appointment in DB
  delete: (req, res) => {
    // * Receive id from client
    let appointmentId = req.params.id;

    // * Find and delete appointment
    Appointment.findByIdAndRemove(appointmentId, (err, appointmentRemoved) => {

      if (err) {
        return res.status(500).send({
          status: 'error',
          message: 'Failed to delete',
        });
      }
      if (!appointmentRemoved) {
        return res.status(404).send({
          status: 'error',
          message: 'The appointment has not been deleted, possibly it does not exist',
        });
      }

      // * Return an answer as JSON
      return res.status(200).send({
        status: 'success',
        appointment: appointmentRemoved,
      });
    });
  }
}; // End controller

module.exports = controller;