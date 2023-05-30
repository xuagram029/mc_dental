const db = require('../database/db');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require("dotenv").config()

const getDentists = (req, res) => {
    db.query("SELECT * FROM dentists", (err, data) => {
        if(err) return res.sendStatus(500)
        return res.json(data)
    })
}

const getDentist = (req, res) => {
    const { id } = req.params
    db.query("SELECT * FROM dentists WHERE id = ?", id, (err, data) => {
        if(err) return res.sendStatus(500)
        return res.json(data)
    })
}

const regDentist = (req, res) => {
    const { name, specialty, number, username, password } = req.body
    const enc_password = bcrypt.hashSync(password, 10)

    const values = [name, specialty, number, username, enc_password]
    db.query("SELECT * FROM dentists WHERE username = ?", [username], (err, result) => {
        if(err) return res.sendStatus(500)

        if(result.length > 0){
            return res.status(409).json({ message: 'Username already taken' });
        }
        db.query("INSERT INTO dentists(`name`, `specialty`, `number`, `username`, `password`) VALUES (?)", [values], (err, data) => {
            if (err) {
              console.error("Error during patient registration:", err);
              return res.status(500).json({ error: "An error occurred during registration" });
            }
            return res.json({ message: "Registration Successful" });
          });
    })
};

const updateDentist = (req, res) => {
    const { id } = req.params
    const { name, specialty, number, username } = req.body
    
    if (!name || !specialty || !number || !username) {
        return res.status(401).json({ message: "Please enter all fields" });
    }

    db.query("UPDATE dentists SET `name` = ?, `specialty` = ?, `number` = ? WHERE id = ?", [name, specialty, number, id], (err, result) => {
        if (err) {
            return res.sendStatus(500);
        }
        return res.json({ message: "Updated successfully" });
    });
};


const login = (req, res) => {
    const { username, password } = req.body;
  
    if (!username || !password) {
      return res.status(401).json({ error: "Please enter username and password" });
    }
  
    db.query("SELECT * FROM dentists WHERE username = ?", username, (err, resp) => {
      if (err) {
        console.error("Error during login:", err);
        return res.status(500).json({ error: "An error occurred during login" });
      }
  
      if (resp.length > 0) {
        const userDb = resp[0];
  
        bcrypt.compare(password, userDb.password, (err, result) => {
          if (err) {
            console.error("Error during password comparison:", err);
            return res.status(500).json({ error: "An error occurred during login" });
          }
  
          if (result) {
            const token = jwt.sign(
              { id: userDb.id, role: userDb.role },
              process.env.ACCESS_TOKEN_SECRET
            );
  
            res.cookie("token", token, { httpOnly: true });
            return res.json({ resp });
          } else {
            return res.status(401).json({ error: "Password and username do not match" });
          }
        });
      } else {
        return res.status(401).json({ error: "No user exists" });
      }
    });
};

const logout = (req, res) => {
    res.clearCookie("token", {
        path: "/",
        domain: "localhost",
});
    res.send("Logged out successfully");
}

module.exports = {getDentists, getDentist, regDentist, updateDentist, login, logout}