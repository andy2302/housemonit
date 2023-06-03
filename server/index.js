const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const serverIP = process.env.REACT_APP_SERVER_IP;

// Routes
const users = require('./routes/users');
const settings = require('./routes/settings')

// Server and DB connection
const app = express();
const port = process.env.PORT || 5000;

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port: ${port}`);
});

// console.log(process.env);
console.log(`Server IP: ${serverIP}`);

mongoose.connect(`mongodb://${serverIP}:27017/HouseMonitDB`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB successfully connected'))
  .catch(err => console.error(err));


// API Connection to users
app.use(cors());
app.use(bodyParser.json());

app.use('/api', users);

// API Connection to settings
app.use('/api', settings);
