var mongoose = require('mongoose');
var User = require('./User');

var ClinicSchema = new mongoose.Schema({
  accountRefId: Number,
  name: String,
  cnes: Number,
  address: String
});

module.exports = mongoose.model('Clinic', ClinicSchema);