const express = require('express');
const router = express.Router();
const User = require('../models/User');

// In the routes we write the keys and their type and here we
// handle getting the data from the dabase and posting it to it

router.get('/users', (req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/users', (req, res) => {
  const newUser = new User(req.body);
  
  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
