'use strict';

var kryptofy = require('./krypto');
var Hapi = require('hapi');

var server = Hapi.createServer('localhost', 8000);

server.route({
  method: 'POST',
  path: '/kryptoquote',
  handler: function (request, reply) {
    var unencryptedQuote  = request.payload.message;
    var encryptedQuote = kryptofy(unencryptedQuote);        
    reply({ message: unencryptedQuote, 
      kryptoQuote: encryptedQuote
    });
  }
});

server.start();
