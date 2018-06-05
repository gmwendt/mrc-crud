var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  accountRefId: Number,
  capabilities: [Number],
  email: String,
  name: String,
  userName: String,
  passwordExpired: Boolean,
  passwordHash: String,
  passwordSalt: String,
});

module.exports = mongoose.model('User', UserSchema);