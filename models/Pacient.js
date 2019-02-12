var mongoose = require('mongoose');

var PacientSchema = new mongoose.Schema({
  accountRefId: Number,
  name: String,
  address: String,
  email: String,
  phone: String,
  cellphone: String,
  gender: String,
  cpf: String,
  maritalState: String,
  birthDate: String,
  ocupation: String
});

module.exports = mongoose.model('Clinic', ClinicSchema);