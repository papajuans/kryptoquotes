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
      var encryptedQuote = kryptofy(unencryptedQuote);

      quotes.createQuote(unencryptedQuote);

      reply({ 
        message: unencryptedQuote, 
        kryptoQuote: encryptedQuote
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
