'use strict';

var alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

// Returns a random number between min and max
function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function encrypt(plaintext, key) {
  var cipherText = [];
  var cipherHash = {};
  for (var i = 0; i < 26; i++) {
    cipherHash[alphabet[i]] = key[i];
  }

  for (var i = 0; i < plaintext.length; i++) {
    if (/\W/.test(plaintext[i])) {
      // You can't encrypt spaces or punctuation
      cipherText.push(plaintext[i]);
    } else {
      var o = plaintext[i].toLowerCase();
      cipherText.push(cipherHash[o]);
    }
  }
  return cipherText.join('');;
}

function generateCipher() { 

  // return a scrambled alphabet
  function scrambleAlphabet() {

    var letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
    var scrambled = [];

    while (letters.length > 0) {
      var i = getRandomArbitrary(0, letters.length - 1);
      scrambled.push(letters[i]);
      letters.splice(i,1);
    }

    // Check for letters that are in the correct
    // position
    for (var i = 0; i < 26; i++) {
      if (scrambled[i] == alphabet[i]) {
        // z is in the right spot, switch with position 0
        if (i == 25) {
          var temp = scrambled[i];
          scrambled[i] = scrambled[0];
          scrambled[0] = temp;
        } else {
          var temp = scrambled[i];
          scrambled[i] = scrambled[i+1];
          scrambled[i+1] = temp;
        }
      }
    }

    return scrambled;
  }

  var cipher = scrambleAlphabet();

  return function(plaintext) {
    var cipherText = encrypt(plaintext, cipher);
    return { key: cipher, cipherText: cipherText};
  }
}

exports.generate = function(plaintext) {
  var cipher = generateCipher();
  return cipher(plaintext);
};

exports.encrypt = encrypt;
