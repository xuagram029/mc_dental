const db = require("../database/db");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({storage: storage});

const getBlogs = (req, res) => {
  db.query("SELECT * FROM blogs", (err, data) => {
    if (err) return res.status(500).json({message: "Error fetching blogs"});
    return res.json(data);
  });
};

const getSingleBlog = (req, res) => {
  const {id} = req.params;
  db.query("SELECT * FROM blogs WHERE id = ?", [id], (err, data) => {
    if (err) return res.status(500).json({message: "Error fetching blogs"});
    return res.json(data);
  });
};

const addBlogs = (req, res) => {
  upload.fields([
    {name: "image1"},
    {name: "image2"},
    {name: "image3"},
    {name: "image4"},
    {name: "image5"},
  ])(req, res, (err) => {
    if (err) return res.status(500).json({message: "Error uploading files"});
    const {title, description} = req.body;
    const photo1 =
      req.files && req.files.image1 ? req.files.image1[0].filename : null;
    const photo2 =
      req.files && req.files.image2 ? req.files.image2[0].filename : null;
    const photo3 =
      req.files && req.files.image3 ? req.files.image3[0].filename : null;
    const photo4 =
      req.files && req.files.image4 ? req.files.image4[0].filename : null;
    const photo5 =
      req.files && req.files.image5 ? req.files.image5[0].filename : null;
    if (!title || !description) {
      return res
        .status(401)
        .json({message: "Please enter blog title and blog description"});
    }
    db.query(
      "INSERT INTO blogs(`title`, `description`, photo_1, photo_2, photo_3, photo_4, photo_5) VALUES(?, ?, ?, ?, ?, ?, ?)",
      [title, description, photo1, photo2, photo3, photo4, photo5],
      (err, data) => {
        if (err)
          return res.status(500).json({message: "Error uploading photos"});
        return res.json({message: "Upload Complete"});
      }
    );
  });
};

const updateBlog = (req, res) => {
  const { id } = req.params
  const { title, description } = req.body;

  // upload.fields([
  //   { name: "image1" },
  //   { name: "image2" },
  //   { name: "image3" },
  //   { name: "image4" },
  //   { name: "image5" },
  // ])(req, res, (err) => {
  //   if (err) {
  //     return res.status(500).json({ message: "Error uploading files" });
  //   }

  //   const photo1 =
  //     req.files && req.files.image1 ? req.files.image1[0].filename : null;
  //   const photo2 =
  //     req.files && req.files.image2 ? req.files.image2[0].filename : null;
  //   const photo3 =
  //     req.files && req.files.image3 ? req.files.image3[0].filename : null;
  //   const photo4 =
  //     req.files && req.files.image4 ? req.files.image4[0].filename : null;
  //   const photo5 =
  //     req.files && req.files.image5 ? req.files.image5[0].filename : null;

  //     console.log(photo1, photo2, photo3, photo4, photo5);
    if (!title || !description) {
      return res
        .status(401)
        .json({ message: "Please enter blog title and blog description" });
    }
    db.query(
      "UPDATE blogs SET `title` = ?, `description` = ? WHERE id = ?",
      [title, description, id],
      (err, data) => {
        if (err) {
          return res.status(500).json({ message: "Error updating the blog" });
        }
        return res.json({ message: "Blog updated successfully" });
      }
    );
  // });
};


const deleteBlog = (req, res) => {
  const {id} = req.params
  db.query("DELETE FROM blogs WHERE id = ?", [id], (err, resp) => {
    if(err) return res.status(500).json({message: "Error deleting blog"})
    return res.json({message: "successfully deleted the blog"})
  })
}

module.exports = {getBlogs, addBlogs, getSingleBlog, updateBlog, deleteBlog};
