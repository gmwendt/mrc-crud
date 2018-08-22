var mongoose = require('mongoose');

var ProfessionalSchema = new mongoose.Schema({
  active: Boolean,
  accountRefId: Number,
  professionalRegisterNum: String,
  professionalRegisterState: String,
  specialites: String,
  userRefId: String
});

module.exports = mongoose.model('Professional', ProfessionalSchema);