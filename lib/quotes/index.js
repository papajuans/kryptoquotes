'use strict';

var db = require('../db');
var kryptofy = require('../krypto');

module.exports.createQuote = function(unencryptedQuote) {
  db().collection('public_quotes').insert({quote: unencryptedQuote});
}

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
}
