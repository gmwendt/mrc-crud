var mongoose = require('mongoose');

var ClinicSchema = new mongoose.Schema({
  accountRefId: Number,
  name: String,
  cnes: Number,
  address: String,
  email: String,
  phone1: String,
  phone2: String
});

module.exports = mongoose.model('Clinic', ClinicSchema);