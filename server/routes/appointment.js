const express = require('express')
const { getPatients, makeAppointment, getPatient, getAppointments, getPendingAppointments, acceptAppointment, rejectAppointment, disabledDates, getDisabledDates, getTimes, cancelAppointment, getAllAppointment, addRemark, updateMax, appointmentLimit, makeAvailable, makeNotAvailable } = require('../controller/appointmentController')
const router = express.Router()

router.route('/')
    .get(getPatients)
    .post(makeAppointment)
    .put(updateMax)

router.route('/accepted')
    .get(getAppointments)

router.route('/all')
    .get(getAllAppointment)

router.route('/pending')
    .get(getPendingAppointments)

router.route('/pending/:id')
    .put(addRemark);

router.route('/disabled')
    .get(getDisabledDates);

router.route('/times')
    .get(getTimes)
    .put(makeAvailable)

router.route('/times/:id')
    .put(makeNotAvailable)

router.route('/limit')
    .get(appointmentLimit);

router.route('/cancel/:id')
    .delete(cancelAppointment);

router.route('/:id')
    .get(getPatient)
    .put(acceptAppointment)
    .delete(rejectAppointment)

module.exports = router