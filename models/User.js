var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  email: String,
  name: String,
  password: String,
  company: String,
  expireDate: Date,
  price: Number,
});

module.exports = mongoose.model('User', UserSchema);