var mongoose = require('mongoose');

var ConsultEventSchema = new mongoose.Schema({
  title: String,
  start: String,
  end: String,
  price: Number,
  serviceId: String,
  patientId:String
});

module.exports = mongoose.model('ConsultEvent', ConsultEventSchema);