const express = require('express')
const { getBlogs, addBlogs } = require('../controller/blogController')
const router = express.Router()

router.route('/')
    .get(getBlogs)
    .post(addBlogs)


module.exports = router;    