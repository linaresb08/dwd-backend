'use strict'

var express = require('express');
var AppointmentController = require('../controllers/appointment');

var router = express.Router();

// * Appointments paths
router.post('/save', AppointmentController.save);
router.get('/appointments/:date?', AppointmentController.getAppointments);
router.get('/appointment/:id', AppointmentController.getAppointment);
router.put('/appointment/:id', AppointmentController.update);
router.delete('/appointment/:id', AppointmentController.delete);

module.exports = router;