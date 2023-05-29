const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');


const app = express();
const PORT = 8000;

// Middleware
require('dotenv').config()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

// Example route
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.use('/patient', require('./routes/patient'))

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
