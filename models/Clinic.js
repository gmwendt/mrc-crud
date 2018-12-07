var mongoose = require('mongoose');
var User = require('./User');

var ClinicSchema = new mongoose.Schema({
  accountRefId: Number,
  name: String,
  cnes: Number,
  zipcode: String,
  address: String,
  addressNum: String,
  addressComp: String,
  neighborhood: String,
  city: String,
  state: String,
  email: String,
  phone1: String,
  phone2: String
});

module.exports = mongoose.model('Clinic', ClinicSchema);