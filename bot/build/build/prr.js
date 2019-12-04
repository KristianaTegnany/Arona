"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*!
  * prr
  * (c) 2013 Rod Vagg <rod@vagg.org>
  * https://github.com/rvagg/prr
  * License: MIT
  */
(function (name, context, definition) {
  if (typeof module != 'undefined' && module.exports) module.exports = definition();else context[name] = definition();
})('prr', void 0, function () {
  var setProperty = typeof Object.defineProperty == 'function' ? function (obj, key, options) {
    Object.defineProperty(obj, key, options);
    return obj;
  } : function (obj, key, options) {
    // < es5
    obj[key] = options.value;
    return obj;
  },
      makeOptions = function makeOptions(value, options) {
    var oo = _typeof(options) == 'object',
        os = !oo && typeof options == 'string',
        op = function op(p) {
      return oo ? !!options[p] : os ? options.indexOf(p[0]) > -1 : false;
    };

    return {
      enumerable: op('enumerable'),
      configurable: op('configurable'),
      writable: op('writable'),
      value: value
    };
  },
      prr = function prr(obj, key, value, options) {
    var k;
    options = makeOptions(value, options);

    if (_typeof(key) == 'object') {
      for (k in key) {
        if (Object.hasOwnProperty.call(key, k)) {
          options.value = key[k];
          setProperty(obj, k, options);
        }
      }

      return obj;
    }

    return setProperty(obj, key, options);
  };

  return prr;
});
//# sourceMappingURL=prr.js.map