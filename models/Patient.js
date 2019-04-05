var mongoose = require('mongoose');

var PatientSchema = new mongoose.Schema({
  accountRefId: Number,
  name: String,
  address: String,
  email: String,
  phone: String,
  cellphone: String,
  gender: Number,
  cpf: String,
  maritalState: String,
  birthDate: String,
  ocupation: String,
  anamneses: String,
  placeOfCare: String,
  measurements: String
});

module.exports = mongoose.model('Patient', PatientSchema);