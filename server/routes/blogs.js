const express = require("express");
const {
  getBlogs,
  addBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
} = require("../controller/blogController");
const router = express.Router();

router.route("/").get(getBlogs).post(addBlogs);

router.route("/:id")
  .get(getSingleBlog)
  .put(updateBlog)
  .delete(deleteBlog)

module.exports = router;
