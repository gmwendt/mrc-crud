var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  accountRefId: Number,
  administrator: Boolean,
  email: String,
  name: String,
  userName: String,
  passwordHash: String,
  passwordSalt: String,
});

module.exports = mongoose.model('User', UserSchema);