const { NotImplementedError } = require('../extensions/index.js');

const MODERN_ACTIVITY = 15;
const HALF_LIFE_PERIOD = 5730;

/**
 * Determine the age of archeological find by using
 * given MODERN_ACTIVITY and HALF_LIFE_PERIOD values
 *
 * @param {String} sampleActivity string representation of current activity
 * @return {Number | Boolean} calculated age in years or false
 * in case of incorrect sampleActivity
 *
 * @example
 *
 * dateSample('1') => 22387
 * dateSample('WOOT!') => false
 *
 */
function dateSample(sampleActivity ) {
  if (typeof sampleActivity!=='string' || !Number.isFinite(Number(sampleActivity)) || sampleActivity.trim() === '') {
    return false;
  }

  const currentActivity = Number(sampleActivity);

  if (currentActivity <= 0 || currentActivity > MODERN_ACTIVITY) {
    return false;
  }

  const halfLifeYears = Math.log(2) / HALF_LIFE_PERIOD;
  const currentAgeYears = MODERN_ACTIVITY / currentActivity;

  return Math.ceil(Math.log(currentAgeYears) / halfLifeYears);
}

module.exports = {
  dateSample
};
