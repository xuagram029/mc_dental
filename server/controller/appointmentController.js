const db = require("../database/db");
const moment = require("moment");
const {Vonage} = require("@vonage/server-sdk");

const vonage = new Vonage({
  apiKey: "5a66a2ad",
  apiSecret: "cZ2IytlT4jEevb1T",
});

const getPatients = (req, res) => {
  db.query("SELECT * FROM appointments", (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
};

const getPatient = (req, res) => {
  const {id} = req.params;
  db.query("SELECT * FROM appointments WHERE id = ?", id, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
};

const disabledDates = (req, res) => {
  db.query("SELECT COUNT (*) AS disabled FROM appointments", (err, data) => {
    if (err) return res.status(500).json(err);
    const dates = data[0].disabled;
    return res.json(dates);
  });
};

// const { dentist, name, date, service, number, id } = req.body;
// console.log(dentist, name, date, service, number, id)
const makeAppointment = (req, res) => {
  const {time, name, date, service, number, id} = req.body;
  const appointmentDate = moment(date).utcOffset("+08:00");
  const formattedDate = appointmentDate.format("YYYY-MM-DD");

  if (!time || !name || !date || !service || !number || !id) {
    return res.status(401).json({message: "Please input all fields"});
  }

  db.query(
    "SELECT * FROM appointments WHERE time = ? AND date = ?",
    [time, formattedDate],
    (err, resp) => {
      if (err)
        return res
          .status(500)
          .json({message: "Error checking appointment availability"});
      if (resp.length > 0) {
        return res
          .status(401)
          .json({
            message:
              "The time you choose is not available, please book another time",
          });
      }
      db.query(
        "INSERT INTO appointments (time, name, date, service, number, patient_id) VALUES (?, ?, ?, ?, ?, ?)",
        [time, name, formattedDate, service, number, id],
        (err, result) => {
          if (err)
            return res
              .status(500)
              .json({message: "Error creating appointment"});
          return res.json({message: "Appointment is booked"});
        }
      );
    }
  );
};

const getDisabledDates = (req, res) => {
  // Query the database to fetch the disabled dates with 5 or more appointments
  db.query("SELECT `limit` FROM `limit` WHERE id = 1", (err, resp) => {
    if (err) return res.status(500).json(err);
    const limit = resp[0]?.limit;
    db.query(
      "SELECT date FROM appointments GROUP BY date HAVING COUNT(*) >= ?",
      [limit],
      (err, results) => {
        if (err) {
          console.error("Error querying the database: " + err.stack);
          res.status(500).json({message: "An error occurred."});
          return;
        }
        const disabledDates = results.map((row) => row.date);
        res.json({disabledDates});
      }
    );
  });
};

// const getTimes = (req, res) => {
//   try {
//     const {date} = req.query;

//     // Fetch all appointments for the selected date
//     const query = "SELECT time FROM appointments WHERE date = ?";
//     db.query(query, [date], (error, results) => {
//       if (error) {
//         console.log(error);
//         res.status(500).json({message: "Error fetching available times."});
//       } else {
//         const bookedTimes = results.map((row) => row.time);
//         // Define your available times
//         const availableTimes = [
//           {id: 9, startTime: "9am", endTime: "11am"},
//           {id: 11, startTime: "11am", endTime: "1pm"},
//           {id: 1, startTime: "1pm", endTime: "3pm"},
//           {id: 3, startTime: "3pm", endTime: "5pm"},
//           {id: 5, startTime: "5pm", endTime: "7pm"},
//         ];

//         const filteredTimes = availableTimes.filter((time) => {
//           return !bookedTimes.some(
//             (bookedTime) => bookedTime === time.startTime
//           );
//         });

//         res.json({times: filteredTimes});
//       }
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({message: "Error fetching available times."});
//   }
// };

const getAppointments = (req, res) => {
  db.query(
    "SELECT * FROM appointments WHERE status = 'accepted'",
    (err, data) => {
      if (err) {
        console.error("Error retrieving appointments:", err);
        res.status(500).json({error: "Failed to retrieve appointments."});
      } else {
        res.json(data);
      }
    }
  );
};

const getAllAppointment = (req, res) => {
  db.query("SELECT * FROM appointments", (err, data) => {
    if (err) {
      console.error("Error retrieving appointments:", err);
      res.status(500).json({error: "Failed to retrieve appointments."});
    } else {
      res.json(data);
    }
  });
};

const getPendingAppointments = (req, res) => {
  db.query(
    "SELECT * FROM appointments WHERE status = 'pending'",
    (err, data) => {
      if (err) {
        console.error("Error retrieving pending appointments:", err);
        res
          .status(500)
          .json({error: "Failed to retrieve pending appointments."});
      } else {
        res.json(data);
      }
    }
  );
};

const rejectAppointment = (req, res) => {
  const {id} = req.params;
  db.query(
    "SELECT number FROM appointments WHERE id = ?",
    id,
    (err, result) => {
      if (err) {
        console.error("Error retrieving appointment:", err);
        res.status(500).json({error: "Failed to retrieve appointment."});
      }
      return res.json({message: "Appointment Cancelled"});
    }
  );
};

const acceptAppointment = (req, res) => {
  const {id} = req.params;
  db.query(
    "UPDATE appointments SET status = 'accepted' WHERE id = ?",
    id,
    (err, data) => {
      if (err) {
        console.error("Error updating appointment:", err);
        res.status(500).json({error: "Failed to update appointment."});
      }
      return res.json({message: "Appointment Accepted"});
    }
  );
};

const cancelAppointment = (req, res) => {
  const {id} = req.params;
  db.query("DELETE FROM appointments WHERE id = ?", id, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json({message: "Appointment Canceled Success"});
  });
};

const addRemark = (req, res) => {
  const {id} = req.params;
  const {remark} = req.body;
  db.query(
    "UPDATE appointments SET `remarks`= ? WHERE id = ?",
    [remark, id],
    (err, resp) => {
      if (err)
        return res.status(500).json({message: "Failed to insert remarks"});
      return res.json({message: "Remarks added"});
    }
  );
};

const updateMax = (req, res) => {
  const {max} = req.body;
  db.query("UPDATE `limit` SET `limit` = ?", [max], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json({message: "Appointment limit is updated"});
  });
};

const appointmentLimit = (req, res) => {
  db.query("SELECT * FROM `limit` WHERE id = 1", (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
};

const getTimes = (req, res) => {
  db.query("SELECT * FROM times WHERE status = 'available' ", (err, data) => {
    if (err) return res.status(500).json({message: "Error getting times"});
    return res.json(data);
  });
};

const makeAvailable = (req, res) => {
  const {id} = req.body;
  db.query(
    "UPDATE times SET status = 'available' WHERE id = ?",
    [id],
    (err, data) => {
      if (err) return res.status(500).json({message: "Error getting times"});
      return res.json({message: "Time is now available"});
    }
  );
};

const makeNotAvailable = (req, res) => {
  const {id} = req.params;
  db.query(
    "UPDATE times SET status = 'not available' WHERE id = ?",
    [id],
    (err, data) => {
      if (err) return res.status(500).json({message: "Error getting times"});
      return res.json({message: "Time now is not available"});
    }
  );
};

module.exports = {
  getPatients,
  getPatient,
  makeAppointment,
  getAppointments,
  getPendingAppointments,
  rejectAppointment,
  acceptAppointment,
  getDisabledDates,
  getTimes,
  cancelAppointment,
  getAllAppointment,
  addRemark,
  updateMax,
  appointmentLimit,
  makeAvailable,
  makeNotAvailable,
};
