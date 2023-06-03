const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Routes
const users = require('./routes/users');

// Server and DB connection
const app = express();
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

mongoose.connect('mongodb://127.0.0.1:27017/HouseMonitDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB successfully connected'))
  .catch(err => console.error(err));


// API Connection
app.use(cors());
app.use(bodyParser.json());

app.use('/api', users);