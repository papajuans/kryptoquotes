'use strict';

var mongojs = require('mongojs');
var db = mongojs('krypto');

module.exports = function(){
  return db;
}
