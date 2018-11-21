var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Clinic = require('../models/Clinic.js');

/* GET ALL Clinics */
router.get('/', function(req, res, next) {
  Clinic.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET SINGLE Clinic BY _ID */
router.get('/:id', function(req, res, next) {
  Clinic.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/*GET Clinic LIST BY ACCOUNT ID*/
router.get('/accountRefId/:accountId', function(req, res, next) {
  var accountId = req.param("accountId");
  User.find({"accountRefId": accountId}, function(e,docs) {
    res.json(docs);
  });
});

/* SAVE Clinic */
router.post('/', function(req, res, next) {
  Clinic.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE Clinic */
router.put('/:id', function(req, res, next) {
  Clinic.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE Clinic */
router.delete('/:id', function(req, res, next) {
  Clinic.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;