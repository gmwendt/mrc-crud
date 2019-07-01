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
  const { email } = req.params;

  User.find({"email": email}, function(e, docs) {
    res.json(docs);
  });
});

// REQUEST LOGIN
router.get('/authenticate/:email/:pwd', (req, res, next) => {
  const { email } = req.params;
  const { pwd } = req.params;
  User.find({"email": email}, async (e, docs) => {
    if (docs && docs.length <= 0) {
      res.send(401);
      return;
    }
    
    var user = docs[0];
    
    if (user.passwordHash == pwd) {
      try {
        await mongoose.connection.close();
        await mongoose.connect('mongodb+srv://sa:Abcd1234@cluster0-rewhk.mongodb.net/' + user.accountRefId + '?retryWrites=true');
      }
      catch (err) {
        console.error(err); 
        res.send(500);
      }
      finally {
        console.log('connection to ' + user.accountRefId + ' successful');
        res.status(200).json({ ok: true });
      }
    }
    else 
      res.send(401);
  });
});

/*GEL USERS LIST BY ACCOUNT ID*/
router.get('/accountRefId/:accountId', function(req, res, next) {
  const { accountId } = req.params;
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

//LOGOUT
router.get('/logout/:id', async (req, res) => {
  if (mongoose.connection.name != 'mean-app') {
    try {
      await mongoose.connection.close();
      await mongoose.connect('mongodb+srv://sa:Abcd1234@cluster0-rewhk.mongodb.net/mean-app?retryWrites=true');
    }
    catch (err) {
      console.error(err); 
      res.send(500);
    }
    finally {
      console.log('connection to mean-app successful');
      res.status(200).json({ ok: true });
    }
  }
  else
    res.status(200).json({ ok: true });
});

module.exports = router;