const db = require('../database/db');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require("dotenv").config()


const regPatient = (req, res) => {
    const { firstname, lastname, birthday, username, password, address, occupation, mobile, nationality, civil_status, age, sex, religion, email, guardian, good_health, m_treat, c_treated, illness, op_details, hozpitalized, hozpitalized_details, medication, meds, tobacco, alcohol, allergies, pregnant, nursing, birth_control, b_type, b_pressure, condition, bleeding_time, clotting_time } = req.body
    const enc_password = bcrypt.hashSync(password, 10)

    const values = [firstname, lastname, birthday, username, enc_password, address, occupation, mobile, nationality, civil_status, age, sex, religion, email, guardian, good_health, m_treat, c_treated, illness, op_details, hozpitalized, hozpitalized_details, medication, meds, tobacco, alcohol, allergies, pregnant, nursing, birth_control, b_type, b_pressure, condition, bleeding_time, clotting_time]
    db.query("SELECT * FROM patients WHERE username = ?", [username], (err, result) => {
        if(err) return res.sendStatus(500)

        if(result.length > 0){
            return res.status(409).json({ message: 'Username already taken' });
        }
        db.query("INSERT INTO patients(`firstname`, `lastname`, `birthday`, `username`, `password`, `address`, `occupation`, `mobile`, `nationality`, `civil_status`, `age`, `sex`, `religion`, `email`, `guardian`, good_health, m_treat, c_treated, `illness`, `op_details`, `hozpitalized`, `hozpitalized_details`, `medication`, `meds`, `tobacco`, `alcohol`, `allergies`, `pregnant`, `nursing`, `birth_control`, `b_type`, `b_pressure`, `condition`, `bleeding_time`, `clotting_time`) VALUES (?)", [values], (err, data) => {
            if (err) {
              console.error("Error during patient registration:", err);
              return res.status(500).json({ error: "An error occurred during registration" });
            }
            return res.json({ message: "Registration Successful" });
          });
    })
};

const login = (req, res) => {
    const { username, password } = req.body;
  
    if (!username || !password) {
      return res.status(401).json({ error: "Please enter username and password" });
    }
  
    db.query("SELECT * FROM patients WHERE username = ?", username, (err, resp) => {
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
};

module.exports = { regPatient, login, logout }

// const regPatient = (req, res) => {
//     const {
//       firstname,
//       lastname,
//       birthday,
//       username,
//       password,
//       address,
//       occupation,
//       mobile,
//       nationality,
//       civil_status,
//       age,
//       sex,
//       religion,
//       email,
//       guardian,
//       m_treat,
//       c_treated,
//       illness,
//       op_details,
//       hozpitalized,
//       hozpitalized_details,
//       medication,
//       tobacco,
//       alcohol,
//       allergies,
//       pregnant,
//       nursing,
//       birth_control,
//       b_type,
//       b_pressure,
//       condition,
//       bleeding_time,
//       clotting_time
//     } = req.body;
  
//     const values = [
//       firstname,
//       lastname,
//       birthday,
//       username,
//       password,
//       address,
//       occupation,
//       mobile,
//       nationality,
//       civil_status,
//       age,
//       sex,
//       religion,
//       email,
//       guardian,
//       m_treat,
//       c_treated,
//       illness,
//       op_details,
//       hozpitalized,
//       hozpitalized_details,
//       medication,
//       tobacco,
//       alcohol,
//       allergies,
//       pregnant,
//       nursing,
//       birth_control,
//       b_type,
//       b_pressure,
//       condition,
//       bleeding_time,
//       clotting_time
//     ];
  
//     db.query("INSERT INTO patients VALUES (?)", [values], (err, data) => {
//       if (err) {
//         console.error("Error during patient registration:", err);
//         return res.status(500).json({ error: "An error occurred during registration" });
//       }
//       return res.json({ message: "Registration Successful" });
//     });
//   };
  