const db = require("../database/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const getPatients = (req, res) => {
  db.query("SELECT * FROM patients", (err, data) => {
    if (err) return res.sendStatus(500);
    return res.json(data);
  });
};

const getPatient = (req, res) => {
  const {id} = req.params;
  db.query("SELECT * FROM patients WHERE id = ?", id, (err, data) => {
    if (err) return res.sendStatus(500);

    return res.json(data);
  });
};

const regPatient = (req, res) => {
  const {
    firstname,
    middlename,
    lastname,
    gender,
    civil_status,
    birthdate,
    age,
    religion,
    nationality,
    address,
    mobile,
    occupation,
    email,
    referred_by,
    username,
    password,
  } = req.body;
  const enc_password = bcrypt.hashSync(password, 10);

  const values = [
    firstname,
    middlename,
    lastname,
    gender,
    civil_status,
    birthdate,
    age,
    religion,
    nationality,
    address,
    mobile,
    occupation,
    email,
    referred_by,
    username,
    enc_password,
  ];

  if (
    !firstname ||
    !middlename ||
    !lastname ||
    !gender ||
    !civil_status ||
    !birthdate ||
    !age ||
    !religion ||
    !nationality ||
    !address ||
    !mobile ||
    !occupation ||
    !email ||
    !referred_by ||
    !username ||
    !enc_password
  ) {
    return res.status(401).json({message: "Please Fill all the fields"});
  }

  db.query(
    "SELECT * FROM patients WHERE username = ?",
    [username],
    (err, result) => {
      if (err) return res.sendStatus(500);

      if (result.length > 0) {
        return res.status(409).json({message: "Username already taken"});
      }
      db.query(
        "INSERT INTO patients(firstname, middlename, lastname, gender, civil_status, birthdate, age, religion, nationality, address, mobile, occupation, email, referred_by, username, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [...values],
        (err, data) => {
          if (err) {
            console.error("Error during patient registration:", err);
            return res
              .status(500)
              .json({error: "An error occurred during registration"});
          }
          return res.json({message: "Registration Successful"});
        }
      );
    }
  );
};

const updateProfile = (req, res) => {
  const {id} = req.params;
  const {
    firstname,
    middlename,
    lastname,
    age,
    mobile,
    address,
    birthdate,
    email,
  } = req.body;
  if (
    !firstname ||
    !middlename ||
    !lastname ||
    !age ||
    !mobile ||
    !address ||
    !birthdate ||
    !email
  ) {
    return res.status(401).json({message: "Please fill all the fields"});
  }
  db.query(
    "UPDATE patients SET `firstname` = ?, `middlename` = ?, `lastname` = ?, `age` = ?, `mobile` = ?, `address` = ?, `birthdate` = ?, `email` = ? WHERE id = ?",
    [
      firstname,
      middlename,
      lastname,
      age,
      mobile,
      address,
      birthdate,
      email,
      id,
    ],
    (err, data) => {
      if (err) return res.status(401).json(err);
      return res.json({message: "Profile Updated"});
    }
  );
};

// const { firstname, middlename, lastname, gender, civil_status, birthdate, age, religion, nationality, address, mobile, occupation, email, reffered_by, username, guardian, good_health, m_treat, c_treated, illness, op_details, hozpitalized, hozpitalized_details, medication, meds, tobacco, alcohol, allergies, pregnant, nursing, birth_control, b_type, b_pressure, condition, bleeding_time, clotting_time } = req.body
const updatePatient = (req, res) => {
  const {id} = req.params;
  const {storedPass, password} = req.body;

  if (!storedPass || !password) {
    return res.status(401).json({message: "Please enter all fields"});
  }

  db.query("SELECT * FROM patients WHERE id = ?", id, async (err, result) => {
    if (err) {
      return res.status(500).json({message: "Database error", error: err});
    }

    if (result.length > 0) {
      const patient = result[0];
      try {
        const match = await bcrypt.compare(storedPass, patient.password);

        if (match) {
          const newEncryptedPassword = bcrypt.hashSync(password, 10);

          db.query(
            "UPDATE patients SET `password` = ? WHERE id = ?",
            [newEncryptedPassword, id],
            (err, resp) => {
              if (err) {
                return res
                  .status(500)
                  .json({message: "Database error", error: err});
              }
              return res.json({message: "Password updated successfully"});
            }
          );
        } else {
          return res
            .status(401)
            .json({message: "Current password does not match"});
        }
      } catch (error) {
        return res.status(500).json({message: "Bcrypt error", error});
      }
    } else {
      return res.status(404).json({message: "Patient not found"});
    }
  });
};

const getAppointment = (req, res) => {
  const {id} = req.params;
  db.query(
    "SELECT a.id, a.date, a.service, a.status, a.time FROM appointments AS a INNER JOIN patients AS p ON a.patient_id = p.id WHERE p.id = ?",
    id,
    (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json(data);
    }
  );
};

const login = (req, res) => {
  const {username, password} = req.body;

  if (!username || !password) {
    return res.status(401).json({error: "Please enter username and password"});
  }

  db.query(
    "SELECT * FROM patients WHERE username = ?",
    username,
    (err, resp) => {
      if (err) {
        console.error("Error during login:", err);
        return res.status(500).json({error: "An error occurred during login"});
      }

      if (resp.length > 0) {
        const userDb = resp[0];

        bcrypt.compare(password, userDb.password, (err, result) => {
          if (err) {
            console.error("Error during password comparison:", err);
            return res
              .status(500)
              .json({error: "An error occurred during login"});
          }

          if (result) {
            const token = jwt.sign(
              {id: userDb.id, role: userDb.role},
              process.env.ACCESS_TOKEN_SECRET
            );

            res.cookie("token", token, {httpOnly: true});
            return res.json({resp});
          } else {
            return res
              .status(401)
              .json({error: "Password and username do not match"});
          }
        });
      } else {
        return res.status(401).json({error: "No user exists"});
      }
    }
  );
};

const logout = (req, res) => {
  res.clearCookie("token", {
    path: "/",
    domain: "localhost",
  });

  res.send("Logged out successfully");
};

module.exports = {
  regPatient,
  getPatient,
  getPatients,
  updatePatient,
  login,
  logout,
  getAppointment,
  updateProfile,
};
