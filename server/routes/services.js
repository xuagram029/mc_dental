const express = require('express')
const { getServices, addService, editService, getService, deleteService } = require('../controller/servicesController')
const router = express.Router()

router.route('/')
    .get(getServices)
    .post(addService)

router.route('/:id')
    .get(getService)
    .put(editService)
    .delete(deleteService)

module.exports = router;