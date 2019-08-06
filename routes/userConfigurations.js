var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var UserConfigurations = require('../models/UserConfigurations.js');

/* GET ALL User Configs */
router.get('/', function (req, res, next) {
  UserConfigurations.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET SINGLE User Configs BY ID */
router.get('/:id', function (req, res, next) {
  UserConfigurations.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE User Configs */
router.post('/', function (req, res, next) {
  UserConfigurations.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE User Configs */
router.put('/:id', function (req, res, next) {
  UserConfigurations.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE User Configs */
router.delete('/:id', function (req, res, next) {
  UserConfigurations.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;