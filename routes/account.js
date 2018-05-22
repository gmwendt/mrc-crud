var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Account = require('../models/Account.js');

/* GET ALL Accounts */
router.get('/', function(req, res, next) {
  Account.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET SINGLE Account BY _ID */
router.get('/:id', function(req, res, next) {
  Account.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* GET SINGLE Account BY Id */
router.get('/id/:id', function(req, res, next) {
  var id = req.param("id");
  User.find({"id": id},function(e,docs){
    res.json(docs);
});
});

/* SAVE Account */
router.post('/', function(req, res, next) {
  Account.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE Account */
router.put('/:id', function(req, res, next) {
  Account.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE Account */
router.delete('/:id', function(req, res, next) {
  Account.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;