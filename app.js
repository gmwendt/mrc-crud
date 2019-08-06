var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//mongoose.connect('mongodb://localhost/mean-app')
mongoose.connect('mongodb+srv://sa:Abcd1234@cluster0-rewhk.mongodb.net/mean-app?retryWrites=true')
  .then(() =>  console.log('connection successful'))
  .catch((err) => console.error(err));

var user = require('./routes/user');
var account = require('./routes/account');
var professional = require('./routes/professional');
var sysInfo = require('./routes/systemInfo');
var clinic = require('./routes/clinic');
var patient = require('./routes/patient');
var food = require('./routes/food');
var userConfigs = require('./routes/userConfigurations');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(express.static(path.join(__dirname, 'dist')));

app.use('/user', user);
app.use('/account', account);
app.use('/professional', professional);
app.use('/sysInfo', sysInfo);
app.use('/clinic', clinic);
app.use('/patient', patient);
app.use('/food', food);
app.use('/userConfigurations', userConfigs);
app.use('/', express.static('dist', { redirect: false }));
app.get('*',  function(req, res, next) {
  res.sendFile(path.resolve('dist/index.html')); 
});

// catch 404 and forward to error handler
/*app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});*/

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send();
});

module.exports = app;