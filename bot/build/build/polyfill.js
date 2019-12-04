'use strict';

var implementation = require('./implementation');

module.exports = function getPolyfill() {
  if (!String.prototype.trimRight) {
    return implementation;
  }

  var zeroWidthSpace = "\u200B";

  if (zeroWidthSpace.trimRight() !== zeroWidthSpace) {
    return implementation;
  }

  return String.prototype.trimRight;
};
//# sourceMappingURL=polyfill.js.map