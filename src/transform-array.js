const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create transformed array based on the control sequences that original
 * array contains
 *
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 *
 * @example
 *
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 *
 */
function transform(arr ) {
  if (!Array.isArray(arr)) {
    throw new Error('\'arr\' parameter must be an instance of the Array!');
  }

  const result = [];
  const commands = {
    '--discard-next': (i) => i + 1,
    '--discard-prev': (i, res) => {
      if (res.length > 0 && arr[i - 1] !== undefined) res.pop();
      return i;
    },
    '--double-next': (i, res) => {
      if (arr[i + 1] !== undefined) res.push(arr[i + 1]);
      return i;
    },
    '--double-prev': (i, res) => {
      if (arr[i - 1] !== undefined && arr[i - 2] !== '--discard-next') {
        res.push(arr[i - 1]);
      }
      return i;
    }
  };

  let skipNext = false;

  for (let i = 0; i < arr.length; i++) {
    if (skipNext) {
      skipNext = false;
      continue;
    }

    const command = commands[arr[i]];
    if (command) {
      const nextIndex = command(i, result);
      if (arr[i] === '--discard-next') skipNext = true;
      i = nextIndex;
    } else {
      result.push(arr[i]);
    }
  }

  return result;
}

module.exports = {
  transform
};
