const express = require('express')
const { getBlogs, addBlogs, getSingleBlog } = require('../controller/blogController')
const router = express.Router()

router.route('/')
    .get(getBlogs)
    .post(addBlogs)
    
router.route('/:id')
    .get(getSingleBlog)


module.exports = router;    