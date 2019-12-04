"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/*!
 * is-natural-number.js | MIT (c) Shinnosuke Watanabe
 * https://github.com/shinnn/is-natural-number.js
*/
var _default = function () {
  if (Number.isInteger) {
    return function isNaturalNumber(val, zero) {
      return val >= (zero ? 0 : 1) && Number.isInteger(val);
    };
  }

  return function isNaturalNumber(val, zero) {
    return val >= (zero ? 0 : 1) && val !== Infinity && Math.floor(val) === val;
  };
}();

exports["default"] = _default;
//# sourceMappingURL=index.jsnext.js.map