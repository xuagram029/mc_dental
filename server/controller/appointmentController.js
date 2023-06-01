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

const makeAppointment = (req, res) => {
    const { dentist, name, date, service, number, id } = req.body
    db.query("INSERT INTO appointments(`dentist`, `name`, `date`, `service`, `number`, `patient_id`) VALUES (?, ?, ?, ?, ?, ?)", [dentist, name, date, service, number, id], (err, result) => {
        if(err) return res.status(500).json(err)
        return res.json({message: "Appointment Sent"})
    })
}

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

module.exports = { getPatients, getPatient, makeAppointment, getAppointments, getPendingAppointments, rejectAppointment, acceptAppointment }