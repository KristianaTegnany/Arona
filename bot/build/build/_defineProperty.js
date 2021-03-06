"use strict";

var getNative = require('./_getNative');

var defineProperty = function () {
  try {
    var func = getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}();

module.exports = defineProperty;
//# sourceMappingURL=_defineProperty.js.map