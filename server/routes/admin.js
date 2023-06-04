const express = require('express')
const { regAdmin, getPatient, login, logout, getDentists, getDentist, updateDentist, deleteDentist, sendMessage, getPatientRecords, getAllPatient, updatePatient } = require('../controller/adminController')
const router = express.Router()

router.route('/')
    .get(getPatientRecords)
    .post(login)

router.route('/logout')
    .get(logout)

router.route('/message')
    .post(sendMessage)

router.route('/patients')
    .get(getAllPatient)

router.route('/patient/:id')
    .get(getPatient)
    .put(updatePatient)

router.route('/dentist')
    .get(getDentists)

router.route('/dentist/:id')
    .get(getDentist)
    .put(updateDentist)
    .delete(deleteDentist)

module.exports = router