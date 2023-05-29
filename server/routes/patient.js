const express = require('express')
const { regPatient, login, logout } = require('../controller/patientController')
const { verifyToken, verifyAdmin, verifyUser } = require('../middlewares/verifyToken')
const router = express.Router()

// router.get('/checkAuth', verifyToken, (req, res, next) => {
//     res.send("hello u are auth")
// })
// router.get('/checkAdmin', verifyAdmin, (req, res, next) => {
//     res.send("hello u are admin")
// })
// router.get('/checkUser', verifyUser, (req, res, next) => {
//     res.send("hello u are auth")
// })

router.route("/")
    .post(regPatient)

router.route("/login")
    .post(login)

router.route("/logout")
    .post(logout)

module.exports = router;