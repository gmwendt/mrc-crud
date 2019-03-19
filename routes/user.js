var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/User.js');

/* GET ALL USERS */
router.get('/', function(req, res, next) {
  User.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET SINGLE USER BY ID */
router.get('/:id', function(req, res, next) {
  User.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* GET SINGLE USERS BY ACCOUNT ID */
router.get('/accountRefId/:accountId/userName/:userName', function(req, res, next) {
  var accountId = req.param("accountId");
  var userName = req.param("userName");
  User.find({$and: [
    {"accountRefId": accountId}, 
    {"userName": userName}
  ]}, function(e,docs){
    res.json(docs);
  });
});

// GET USER BY EMAIL
router.get('/email/:email', function(req, res, next) {
  var email = req.param("email");
  User.find({"email": email}, function(e, docs) {
    res.json(docs);
  });
});

/*GEL USERS LIST BY ACCOUNT ID*/
router.get('/accountRefId/:accountId', function(req, res, next) {
  var accountId = req.param("accountId");
  User.find({"accountRefId": accountId}, function(e,docs) {
    res.json(docs);
  });
});

/* SAVE USER */
router.post('/', function(req, res, next) {
  User.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE USER */
router.put('/:id', function(req, res, next) {
  User.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE USER */
router.delete('/:id', function(req, res, next) {
  User.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;