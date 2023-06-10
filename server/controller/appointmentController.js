const db = require("../database/db");
const moment = require('moment');
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
  const { time, name, date, service, number, id } = req.body;
  const appointmentDate = moment(date).utcOffset('+08:00');
  const formattedDate = appointmentDate.format('YYYY-MM-DD');

  if (!time || !name || !date || !service || !number || !id) {
    return res.status(401).json({ message: 'Please input all fields' });
  }

  db.query("SELECT * FROM appointments WHERE time = ? AND date = ?", [time, formattedDate], (err, resp) => {
    if(err) return res.status(500).json({message: "Error checking appointment availability"})
    if(resp.length > 0){
      return res.status(401).json({message: "The time you choose is not available, please book another time"})
    }
    db.query("INSERT INTO appointments (time, name, date, service, number, patient_id) VALUES (?, ?, ?, ?, ?, ?)", [time, name, formattedDate, service, number, id], (err, result) => {
      if(err) return res.status(500).json({ message: 'Error creating appointment' })
      return res.json({message: "Appointment is booked"})
    })
  })

};
// const makeAppointment = (req, res) => {
//   const { time, name, date, service, number, id } = req.body;
//   const appointmentDate = moment(date).utcOffset('+08:00');
//   const formattedDate = appointmentDate.format('YYYY-MM-DD');

//   if (!time || !name || !date || !service || !number || !id) {
//     return res.status(401).json({ message: 'Please input all fields' });
//   }

//   // Check if the selected time slot is available for the given date
//   const checkAvailabilityQuery = 'SELECT COUNT(*) AS appointmentCount FROM appointments WHERE date = ? AND time = ?';
//   db.query(checkAvailabilityQuery, [formattedDate, time], (err, results) => {
//     if (err) {
//       console.error('Error querying the database: ' + err.stack);
//       res.status(500).json({ message: 'An error occurred.' });
//       return;
//     }

//     const appointmentCount = results[0].appointmentCount;
//     if (appointmentCount >= 5) {
//       res.status(400).json({ message: 'Appointment limit reached for the selected time slot.' });
//       return;
//     }

//     // Insert the appointment into the database
//     const createAppointmentQuery = 'INSERT INTO appointments (time, name, date, service, number, patient_id) VALUES (?, ?, ?, ?, ?, ?)';
//     db.query(
//       createAppointmentQuery,
//       [time, name, formattedDate, service, number, id],
//       (err) => {
//         if (err) {
//           console.error('Error inserting the appointment: ' + err.stack);
//           res.status(500).json({ message: 'An error occurred.' });
//           return;
//         }

//         res.json({ message: 'Appointment created successfully.' });
//       }
//     );
//   });
// };


const getDisabledDates = (req, res) => {
  // Query the database to fetch the disabled dates with 5 or more appointments
  db.query(
    "SELECT date FROM appointments GROUP BY date HAVING COUNT(*) >= 5",
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
};

const getTimes = (req, res) => {
  try {
    const {date} = req.query;

    // Fetch all appointments for the selected date
    const query = "SELECT time FROM appointments WHERE date = ?";
    db.query(query, [date], (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({message: "Error fetching available times."});
      } else {
        const bookedTimes = results.map((row) => row.time);
        // Define your available times
        const availableTimes = [
          {id: 9, startTime: "9am", endTime: "11am"},
          {id: 11, startTime: "11am", endTime: "1pm"},
          {id: 1, startTime: "1pm", endTime: "3pm"},
          {id: 3, startTime: "3pm", endTime: "5pm"},
          {id: 5, startTime: "5pm", endTime: "7pm"},
        ];

        const filteredTimes = availableTimes.filter((time) => {
          return !bookedTimes.some(
            (bookedTime) => bookedTime === time.startTime
          );
        });

        res.json({times: filteredTimes});
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "Error fetching available times."});
  }
};

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
};
