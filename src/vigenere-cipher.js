const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 *
 * @example
 *
 * const directMachine = new VigenereCipheringMachine();
 *
 * const reverseMachine = new VigenereCipheringMachine(false);
 *
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 *
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 *
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 *
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 *
 */
class VigenereCipheringMachine {
  constructor(isDirect = true) {
    this.isDirect = isDirect;
  }

  encrypt(message, key) {
    if (!message || !key) {
      throw new Error('Incorrect arguments!');
    }

    return this.process(message, key, 'encrypt');
  }

  decrypt(message, key) {
    if (!message || !key) {
      throw new Error('Incorrect arguments!');
    }

    return this.process(message, key, 'decrypt');
  }

  process(message, key, mode) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const messageUpper = message.toUpperCase();
    const keyUpper = key.toUpperCase();
    let result = '';
    let keyIndex = 0;

    for (let i = 0; i < messageUpper.length; i++) {
      const char = messageUpper[i];
      if (alphabet.includes(char)) {
        const messageIndex = alphabet.indexOf(char);
        const keyChar = keyUpper[keyIndex % keyUpper.length];
        const keyIndexShift = alphabet.indexOf(keyChar);

        let newChar;
        if (mode === 'encrypt') {
          newChar = alphabet[(messageIndex + keyIndexShift) % 26];
        } else {
          newChar = alphabet[(messageIndex - keyIndexShift + 26) % 26];
        }

        result += newChar;
        keyIndex++;
      } else {
        result += char;
      }
    }

    return this.isDirect ? result : result.split('').reverse().join('');
  }
}

module.exports = {
  VigenereCipheringMachine
};
