'use strict';
const fns = require('../fns');

//increment until dates are the same
const climb = function(a, b, unit) {
  let i = 0;
  a = a.clone();
  while (a.isBefore(b)) {
    a.add(1, unit);
    i += 1;
  }
  if (!a.isSame(b, unit)) {
    i -= 1;
  }
  return i;
};

const diff = (a, b, unit) => {
  if (!b || fns.isObject(b) === false) {
    b = a.clone().set(b)
  }
  unit = fns.normalize(unit);
  if (a.isBefore(b)) {
    return climb(a, b, unit);
  } else {
    //reverse it
    return climb(b, a, unit) * -1;
  }
};
module.exports = diff;
