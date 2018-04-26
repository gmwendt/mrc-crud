
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Company = require('../models/Company.js');

/* GET ALL COMPANIES */
router.get('/', function(req, res, next) {
  Company.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET SINGLE COMPANY BY ID */
router.get('/:id', function(req, res, next) {
  Company.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* GET SINGLE COMPANY BY CNPJ */
router.get('/cnpj/:cnpj', function(req, res, next) {
  var cnpj = req.param("cnpj");
  Company.find({"cnpj": cnpj},function(e,docs){
    res.json(docs);
});
});

/* SAVE COMPANY */
router.post('/', function(req, res, next) {
  Company.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE COMPANY */
router.put('/:id', function(req, res, next) {
  Company.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE COMPANY */
router.delete('/:id', function(req, res, next) {
  Company.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;