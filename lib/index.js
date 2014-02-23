'use strict';

var kryptofy = require('./krypto');
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

server.start();
