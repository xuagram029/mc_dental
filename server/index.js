const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 8000;

// Middleware
require('dotenv').config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

// Routes
app.use('/admin', require('./routes/admin'));
app.use('/patient', require('./routes/patient'));
app.use('/dentist', require('./routes/dentist'));
app.use('/appointment', require('./routes/appointment'));
app.use('/supplies', require('./routes/supplies'));

// Error Handler Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
