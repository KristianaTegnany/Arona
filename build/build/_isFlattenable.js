"use strict";

var _Symbol = require('./_Symbol'),
    isArguments = require('./isArguments'),
    isArray = require('./isArray');
/** Built-in value references. */


var spreadableSymbol = _Symbol ? _Symbol.isConcatSpreadable : undefined;
/**
 * Checks if `value` is a flattenable `arguments` object or array.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
 */

function isFlattenable(value) {
  return isArray(value) || isArguments(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
}

module.exports = isFlattenable;
//# sourceMappingURL=_isFlattenable.js.map