var mongoose = require('mongoose');

var ConsultEventSchema = new mongoose.Schema({
  title: String,
  startTime: String,
  endTime: String,
  price: Number,
  serviceId: String,
  patientId:String
});

module.exports = mongoose.model('ConsultEvent', ConsultEventSchema);