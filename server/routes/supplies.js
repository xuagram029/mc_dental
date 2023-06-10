const express = require('express')
const { getSupplies, addSuplies, editSupply, getSupply, deleteSupply } = require('../controller/suppliesController')
const router = express.Router()

router.route('/')
    .get(getSupplies)
    .post(addSuplies)


router.route('/:id')
    .get(getSupply)
    .put(editSupply)
    .delete(deleteSupply)
//     .put(acceptAppointment)
//     .delete(rejectAppointment)

module.exports = router