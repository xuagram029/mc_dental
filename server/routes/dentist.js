const express = require('express')
const { verifyToken, verifyAdmin, verifyUser } = require('../middlewares/verifyToken')
const { regDentist, getDentists, login, logout, getDentist, updateDentist } = require('../controller/dentistController')
const router = express.Router()


router.route("/")
    .get(getDentists)
    .post(regDentist)

router.route("/login")
    .post(login)

router.route("/logout")
    .post(logout)

router.route("/:id")
    .get(getDentist)
    .put(updateDentist)

module.exports = router;