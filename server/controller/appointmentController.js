const db = require('../database/db')
const { Vonage } = require('@vonage/server-sdk');

const vonage = new Vonage({
  apiKey: "5a66a2ad",
  apiSecret: "cZ2IytlT4jEevb1T"
});

const getPatients = (req, res) => {
    db.query("SELECT * FROM appointments", (err, data) => {
        if(err) return res.status(500).json(err)
        return res.json(data)
    })
}

const getPatient = (req, res) => {
    const { id } = req.params
    db.query("SELECT * FROM appointments WHERE id = ?", id, (err, data) => {
        if(err) return res.status(500).json(err)
        return res.json(data)
    })
}

const disabledDates = (req,res) => {
  db.query("SELECT COUNT (*) AS disabled FROM appointments", (err, data) => {
    if(err) return res.status(500).json(err)
    const dates = data[0].disabled
    return res.json(dates)
  })
}

// const { dentist, name, date, service, number, id } = req.body;
// console.log(dentist, name, date, service, number, id)
const makeAppointment = (req, res) => {
  const { time, name, date, service, number, id } = req.body;
  const appointmentDate = new Date(date).toISOString().split('T')[0];
  
  // Check if the appointment limit for the given date has been reached
  db.query('SELECT COUNT(*) AS appointmentCount FROM appointments WHERE date = ?', [appointmentDate], (err, results) => {
    if (err) {
      console.error('Error querying the database: ' + err.stack);
      res.status(500).json({ message: 'An error occurred.' });
      return;
    }
    
    const appointmentCount = results[0].appointmentCount;
    if (appointmentCount >= 5) {
      res.status(400).json({ message: 'Appointment limit reached for the selected date.' });
      return;
    }
    
    // Insert the appointment into the database
    db.query('INSERT INTO appointments (time, name, date, service, number, patient_id) VALUES (?, ?, ?, ?, ?, ?)', [time, name, appointmentDate, service, number, id], (err) => {
      if (err) {
        console.error('Error inserting the appointment: ' + err.stack);
        res.status(500).json({ message: 'An error occurred.' });
        return;
      }
      
      res.json({ message: 'Appointment created successfully.' });
    });
  });
};

const getDisabledDates = (req, res) => {
  // Query the database to fetch the disabled dates with 5 or more appointments
  db.query('SELECT date FROM appointments GROUP BY date HAVING COUNT(*) >= 5', (err, results) => {
    if (err) {
      console.error('Error querying the database: ' + err.stack);
      res.status(500).json({ message: 'An error occurred.' });
      return;
    }
    const disabledDates = results.map((row) => row.date);
    res.json({ disabledDates });
  });
};

const getTimes = (req, res) => {
  try {
    const { date } = req.query;

    // Fetch all appointments for the selected date
    const query = 'SELECT time FROM appointments WHERE date = ?';
    db.query(query, [date], (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({ message: 'Error fetching available times.' });
      } else {
        const bookedTimes = results.map((row) => row.time);
        // Define your available times
        const availableTimes = [
          { id: 9, startTime: '9am', endTime: '11am' },
          { id: 11, startTime: '11am', endTime: '1pm' },
          { id: 1, startTime: '1pm', endTime: '3pm' },
          { id: 3, startTime: '3pm', endTime: '5pm' },
          { id: 5, startTime: '5pm', endTime: '7pm' },
        ];

        const filteredTimes = availableTimes.filter((time) => {
          return !bookedTimes.some((bookedTime) => bookedTime === time.startTime);
        });

        res.json({ times: filteredTimes });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error fetching available times.' });
  }
};


const getAppointments = (req, res) => {
    db.query("SELECT * FROM appointments WHERE status = 'accepted'", (err, data) => {
      if (err) {
        console.error('Error retrieving appointments:', err);
        res.status(500).json({ error: 'Failed to retrieve appointments.' });
      } else {
        res.json(data);
      }
    });
  };
  
const getPendingAppointments = (req, res) => {
db.query("SELECT * FROM appointments WHERE status = 'pending'", (err, data) => {
    if (err) {
    console.error('Error retrieving pending appointments:', err);
    res.status(500).json({ error: 'Failed to retrieve pending appointments.' });
    } else {
    res.json(data);
    }
});
};

const rejectAppointment = (req, res) => {
    const { id } = req.params;
    db.query("SELECT number FROM appointments WHERE id = ?", id, (err, result) => {
        if (err) {
        console.error('Error retrieving appointment:', err);
        res.status(500).json({ error: 'Failed to retrieve appointment.' });
        } else if (result.length > 0) {
        const number = result[0].number;
        db.query("DELETE FROM appointments WHERE id = ?", id, (err, data) => {
            if (err) {
            console.error('Error deleting appointment:', err);
            res.status(500).json({ error: 'Failed to delete appointment.' });
            } else {
            const from = "MC Dental";
            const to = "639994535251";
            const text = 'Your appointment is rejected.';

            vonage.sms.send({ to, from, text })
                .then(resp => {
                console.log('Message sent successfully');
                console.log(resp);
                res.json({ message: 'Deleted successfully' });
                })
                .catch(err => {
                console.log('There was an error sending the message.');
                console.error(err);
                res.status(500).json({ error: 'Failed to send rejection message.' });
                });
            }
        });
        } else {
        res.status(404).json({ error: 'Appointment not found.' });
        }
    });
};

const acceptAppointment = (req, res) => {
const { id } = req.params;
db.query("UPDATE appointments SET status = 'accepted' WHERE id = ?", id, (err, data) => {
    if (err) {
    console.error('Error updating appointment:', err);
    res.status(500).json({ error: 'Failed to update appointment.' });
    } else {
    db.query("SELECT number FROM appointments WHERE id = ?", id, (err, result) => {
        if (err) {
        console.error('Error retrieving appointment:', err);
        res.status(500).json({ error: 'Failed to retrieve appointment.' });
        } else if (result.length > 0) {
        const number = result[0].number;
        const from = "Cara Cares";
        const to = "639994535251";
        const text = 'Your appointment has been accepted.';

        vonage.sms.send({ to, from, text })
            .then(resp => {
            console.log('Message sent successfully');
            console.log(resp);
            res.json({ message: 'Updated successfully' });
            })
            .catch(err => {
            console.log('There was an error sending the message.');
            console.error(err);
            res.status(500).json({ error: 'Failed to send acceptance message.' });
            });
        } else {
        console.log("No results found");
        res.status(404).json({ error: 'Appointment not found.' });
        }
    });
    }
});
};

module.exports = { getPatients, getPatient, makeAppointment, getAppointments, getPendingAppointments, rejectAppointment, acceptAppointment, getDisabledDates, getTimes }