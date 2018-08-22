var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  accountRefId: Number,
  birthDate: Date,
  capabilities: String,
  email: String,
  isProfessional: Boolean,
  name: String,
  userName: String,
  passwordExpired: Boolean,
  passwordHash: String,
  passwordSalt: String,
  resetPwdToken: String,
});

module.exports = mongoose.model('User', UserSchema);