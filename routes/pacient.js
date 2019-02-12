var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Pacient = require('../models/Pacient.js');

/* GET ALL PACIENTS */
router.get('/', function(req, res, next) {
  Pacient.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET SINGLE PACIENT BY ID */
router.get('/:id', function(req, res, next) {
  Pacient.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/*GET PACIENTS LIST BY ACCOUNT ID*/
router.get('/accountRefId/:accountId', function(req, res, next) {
  var accountId = req.param("accountId");
  Pacient.find({"accountRefId": accountId}, function(e,docs) {
    res.json(docs);
  });
});

/* SAVE PACIENT */
router.post('/', function(req, res, next) {
  Pacient.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE PACIENT */
router.put('/:id', function(req, res, next) {
  Pacient.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE PACIENT */
router.delete('/:id', function(req, res, next) {
  Pacient.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;