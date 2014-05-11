'use strict';

var kryptofy = require('./krypto');
var quotes = require('./quotes');
var Hapi = require('hapi');
var Joi = require('joi');

var server = Hapi.createServer('localhost', 8000);

server.route({
  method: 'POST',
  path: '/kryptoquote',
  config: {
    handler: function (request, reply) {
      var unencryptedQuote  = request.payload.message;
      var kQuote = kryptofy.generate(unencryptedQuote);

      quotes.createQuote(unencryptedQuote, kQuote.key);

      reply({ 
        kryptoquote: kQuote.cipherText 
      });
    },
    validate: {
      payload: {
        message: Joi.string().required()
      }
    }
  }
});

server.route({
  method: 'GET',
  path: '/kryptoquote/{id}',
  config: {
    handler: function (request, reply) {
      quotes.findQuote(request.params.id, function(err, doc) {
        if (err) {
          reply(Hapi.error.internal(err);
        }
        var encrypted = kryptofy.encrypt(doc.quote, doc.key);
        reply({kryptoquote: encrypted});
      });
    }
  }
});

server.route({
  method: 'GET',
  path: '/kryptoquote/random',
  config: {
    handler: function (request, reply) {
      var randomQuote = quotes.randomQuote();

      reply({
        message: randomQuote.unencrypted,
        kryptoQuote: randomQuote.encrypted
      });
    }
  }
});

server.start();
