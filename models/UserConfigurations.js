var mongoose = require('mongoose');

var UserConfigurationsSchema = new mongoose.Schema({
  accountRefId: Number,
  services: String
});

module.exports = mongoose.model('UserConfigurations', UserConfigurationsSchema);
