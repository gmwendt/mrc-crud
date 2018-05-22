var mongoose = require('mongoose');
var SysInfo = require('./SystemInfo');

var SysInfoSchema = new mongoose.Schema({
  nextAccountSequence: Number
});

module.exports = mongoose.model('SysInfo', SysInfoSchema);