var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var ConsultEvents = require('../models/ConsultEvent.js');

/* GET ALL CONSULTS */
router.get('/', function (req, res, next) {
  ConsultEvents.find(function (err, consults) {
    if (err) return next(err);
    res.json(consults);
  });
});

/* GET SINGLE CONSULT BY ID */
router.get('/:id', function (req, res, next) {
  ConsultEvents.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE CONSULT */
router.post('/', function (req, res, next) {
  ConsultEvents.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE CONSULT */
router.put('/:id', function (req, res, next) {
  ConsultEvents.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE CONSULT */
router.delete('/:id', function (req, res, next) {
  ConsultEvents.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;