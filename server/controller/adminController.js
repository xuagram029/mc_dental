const db = require("../database/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const {Vonage} = require("@vonage/server-sdk");

const vonage = new Vonage({
  apiKey: "5a66a2ad",
  apiSecret: "cZ2IytlT4jEevb1T",
});

const getPatientRecords = (req, res) => {
  db.query(
    "SELECT p.firstname, p.lastname, a.service, a.time, a.remarks, a.date FROM appointments AS a INNER JOIN patients AS p ON a.patient_id = p.id",
    (err, data) => {
      if (err) return res.sendStatus(500);
      return res.json(data);
    }
  );
};

const getAllPatient = (req, res) => {
  const {id} = req.params;
  db.query("SELECT * FROM patients", id, (err, data) => {
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

const updatePatient = (req, res) => {
  const {id} = req.params;
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
    guardian,
    good_health,
    m_treat,
    c_treated,
    illness,
    op_details,
    hozpitalized,
    hozpitalized_details,
    medication,
    meds,
    tobacco,
    alcohol,
    allergies,
    pregnant,
    nursing,
    birth_control,
    b_type,
    b_pressure,
    condition,
    bleeding_time,
    clotting_time,
  } = req.body;

  db.query(
    "UPDATE patients SET `firstname` = ?, `middlename` = ?, `lastname` = ?, `gender` = ?, `civil_status` = ?, `birthdate` = ?, `age` = ?, `religion` = ?, `nationality` = ?, `address` = ?, `mobile` = ?, `occupation` = ?, `email` = ?, `referred_by` = ?, `username` = ?, `guardian` = ?, `good_health` = ?, `m_treat` = ?, `c_treated` = ?, `illness` = ?, `op_details` = ?, `hozpitalized` = ?, `hozpitalized_details` = ?, `medication` = ?, `meds` = ?, `tobacco` = ?, `alcohol` = ?, `allergies` = ?, `pregnant` = ?, `nursing` = ?, `birth_control` = ?, `b_type` = ?, `b_pressure` = ?, `condition` = ?, `bleeding_time` = ?, `clotting_time` = ? WHERE id = ?",
    [
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
      guardian,
      good_health,
      m_treat,
      c_treated,
      illness,
      op_details,
      hozpitalized,
      hozpitalized_details,
      medication,
      meds,
      tobacco,
      alcohol,
      allergies,
      pregnant,
      nursing,
      birth_control,
      b_type,
      b_pressure,
      condition,
      bleeding_time,
      clotting_time,
      id,
    ],
    async (err, result) => {
      if (err) {
        return res.status(500).json({message: "Database error", error: err});
      }
      return res.json({message: "Update Success"});
    }
  );
};

const getDentists = (req, res) => {
  db.query("SELECT * FROM dentists", (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
};

const getDentist = (req, res) => {
  const {id} = req.params;
  db.query("SELECT * FROM dentists WHERE id = ?", id, (err, data) => {
    if (err) return res.sendStatus(500);
    return res.json(data);
  });
};

const updateDentist = (req, res) => {
  const {id} = req.params;
  const {name, specialty, number, username} = req.body;
  db.query(
    "UPDATE dentists SET `name` = ?, `specialty` = ?, `number` = ?, `username` = ? WHERE id = ? ",
    [name, specialty, number, username, id],
    (err, data) => {
      if (!name || !specialty || !number || !username) {
        return res.status(401).json({message: "Please Enter All the fields"});
      }
      if (err) return res.status(500).json(err);
      return res.json({message: "Update Success"});
    }
  );
};

const deleteDentist = (req, res) => {
  const {id} = req.params;
  db.query("DELETE FROM dentists WHERE id = ?", id, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json({message: "Deleted successfully"});
  });
};

const regAdmin = (req, res) => {
  const {username, password} = req.body;
  const enc_password = bcrypt.hashSync(password, 10);

  const values = [username, enc_password];

  if (!username || !enc_password) {
    return res.status(401).json({message: "Please Fill all the fields"});
  }

  db.query(
    "SELECT * FROM admins WHERE username = ?",
    [username],
    (err, result) => {
      if (err) return res.sendStatus(500);

      if (result.length > 0) {
        return res.status(409).json({message: "Username already taken"});
      }
      db.query(
        "INSERT INTO admins( username, password ) VALUES ( ?, ? )",
        [...values],
        (err, data) => {
          if (err) {
            console.error("Error during admin registration:", err);
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

// const { firstname, lastname, birthday, username, password, address, occupation, mobile, nationality, civil_status, age, sex, religion, email, guardian, good_health, m_treat, c_treated, illness, op_details, hozpitalized, hozpitalized_details, medication, meds, tobacco, alcohol, allergies, pregnant, nursing, birth_control, b_type, b_pressure, condition, bleeding_time, clotting_time } = req.body

const getAppointment = (req, res) => {
  const {id} = req.params;
  db.query(
    "SELECT * FROM appointments AS a INNER JOIN patients AS p ON a.patient_id = p.id WHERE p.id = ?",
    id,
    (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json(data);
    }
  );
};

const sendMessage = (req, res) => {
  const {number, message} = req.body;

  const from = "MC Dental";
  const to = "639994535251";
  const text = message;

  vonage.sms
    .send({to, from, text})
    .then((resp) => {
      console.log("Message sent successfully");
      console.log(resp);
      res.json({message: "Updated successfully"});
    })
    .catch((err) => {
      console.log("There was an error sending the message.");
      console.error(err);
      res.status(500).json({error: "Failed to send acceptance message."});
    });
};

const login = (req, res) => {
  const {username, password} = req.body;

  if (!username || !password) {
    return res.status(401).json({error: "Please enter username and password"});
  }

  db.query("SELECT * FROM admins WHERE username = ?", username, (err, resp) => {
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
  });
};

const logout = (req, res) => {
  res.clearCookie("token", {
    path: "/",
    domain: "localhost",
  });

  res.send("Logged out successfully");
};

module.exports = {
  regAdmin,
  getPatient,
  getPatientRecords,
  getDentists,
  getDentist,
  updateDentist,
  login,
  logout,
  getAppointment,
  deleteDentist,
  sendMessage,
  getAllPatient,
  updatePatient,
};
