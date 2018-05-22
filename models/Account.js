var mongoose = require('mongoose');
var User = require('./User');

var AccountSchema = new mongoose.Schema({
  accountId: Number,
  expireDate: Date,
  users: String
});

module.exports = mongoose.model('Account', AccountSchema);