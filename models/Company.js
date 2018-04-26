var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  cnpj: number,
  name: String,
  nfes: any[],
  expireDate: Date,
});

module.exports = mongoose.model('Company', UserSchema);