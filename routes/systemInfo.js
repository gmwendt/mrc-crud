var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var SysInfo = require('../models/SystemInfo');

/* GET ALL SysInfo */
router.get('/', function(req, res, next) {
  SysInfo.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET SINGLE SysInfo BY ID */
router.get('/:id', function(req, res, next) {
  SysInfo.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE SysInfo */
router.post('/', function(req, res, next) {
  SysInfo.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE SysInfo */
router.put('/:id', function(req, res, next) {
  SysInfo.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE SysInfo */
router.delete('/:id', function(req, res, next) {
  SysInfo.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;