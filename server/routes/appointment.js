const express = require('express')
const { getPatients, makeAppointment, getPatient, getAppointments, getPendingAppointments, acceptAppointment, rejectAppointment, disabledDates, getDisabledDates, getTimes, cancelAppointment, getAllAppointment } = require('../controller/appointmentController')
const router = express.Router()

router.route('/')
    .get(getPatients)
    .post(makeAppointment)

router.route('/accepted')
    .get(getAppointments)

router.route('/all')
    .get(getAllAppointment)

router.route('/pending')
    .get(getPendingAppointments);

router.route('/disabled')
    .get(getDisabledDates);

router.route('/times')
    .get(getTimes);

router.route('/cancel/:id')
    .delete(cancelAppointment);

router.route('/:id')
    .get(getPatient)
    .put(acceptAppointment)
    .delete(rejectAppointment)

module.exports = router