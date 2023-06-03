const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  email: String,
  password: String
});

module.exports = mongoose.model('User', UserSchema);

// As i understand it we make models and we feed them to the route