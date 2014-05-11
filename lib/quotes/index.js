'use strict';

var db = require('../db');
var kryptofy = require('../krypto');
var mongojs = require('mongojs');

module.exports.createQuote = function(unencryptedQuote, key) {
  db().collection('public_quotes').insert({quote: unencryptedQuote, key: key, createdAt: new Date()});
};

module.exports.findQuote = function(id, cb) {
  db().collection('public_quotes').findOne({_id:mongojs.ObjectId(id)}, cb);
};

module.exports.randomQuote = function() {
  // TODO Crappy way to grab a random quote
  // db().collection('public_quotes').runCommand('count', function(err, res){
  //  var randomNumber = Math.floor(Math.random() * res.n);
  //  db().collection('public_quotes').find().limit(1).skip(randomNumber).toArray(function(err, docs){
  //  });
  //}); 

  var randomQuote = "Hello!";
  var quoteToReturn = new Object();
  quoteToReturn.unencrypted = randomQuote;
  quoteToReturn.encrypted = kryptofy(randomQuote);
  return quoteToReturn;
};
