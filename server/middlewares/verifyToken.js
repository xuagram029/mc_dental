const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "You are not authenticated" });
  }

  try {
    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Token not valid" });
  }
};

const verifyUser = (req, res, next) => {
  try {
    verifyToken(req, res, () => {
      if (
        req.user.id === parseInt(req.params.id) ||
        req.user.role === "admin"
      ) {
        if (req.user.role === "user") {
          console.log("I am a user");
        } else if (req.user.role === "admin") {
          console.log("I am an admin");
        }
        next();
      } else {
        return res.status(403).json({ message: "You are not authorized" });
      }
    });
  } catch (error) {
    console.error("Error during user verification:", error);
    return res.status(500).json({ error: "An error occurred during user verification" });
  }
};

const verifyAdmin = (req, res, next) => {
  try {
    verifyToken(req, res, () => {
      if (req.user.role === "admin") {
        next();
      } else {
        return res.status(403).json({ message: "You are not authorized" });
      }
    });
  } catch (error) {
    console.error("Error during admin verification:", error);
    return res.status(500).json({ error: "An error occurred during admin verification" });
  }
};

module.exports = { verifyToken, verifyUser, verifyAdmin };
