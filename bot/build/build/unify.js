'use strict';

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var forEach = require('es5-ext/object/for-each'),
    validValue = require('es5-ext/object/valid-object'),
    push = Array.prototype.apply,
    defineProperty = Object.defineProperty,
    create = Object.create,
    hasOwnProperty = Object.prototype.hasOwnProperty,
    d = {
  configurable: true,
  enumerable: false,
  writable: true
};

module.exports = function (e1, e2) {
  var data;
  validValue(e1) && validValue(e2);

  if (!hasOwnProperty.call(e1, '__ee__')) {
    if (!hasOwnProperty.call(e2, '__ee__')) {
      d.value = create(null);
      defineProperty(e1, '__ee__', d);
      defineProperty(e2, '__ee__', d);
      d.value = null;
      return;
    }

    d.value = e2.__ee__;
    defineProperty(e1, '__ee__', d);
    d.value = null;
    return;
  }

  data = d.value = e1.__ee__;

  if (!hasOwnProperty.call(e2, '__ee__')) {
    defineProperty(e2, '__ee__', d);
    d.value = null;
    return;
  }

  if (data === e2.__ee__) return;
  forEach(e2.__ee__, function (listener, name) {
    if (!data[name]) {
      data[name] = listener;
      return;
    }

    if (_typeof(data[name]) === 'object') {
      if (_typeof(listener) === 'object') push.apply(data[name], listener);else data[name].push(listener);
    } else if (_typeof(listener) === 'object') {
      listener.unshift(data[name]);
      data[name] = listener;
    } else {
      data[name] = [data[name], listener];
    }
  });
  defineProperty(e2, '__ee__', d);
  d.value = null;
};
//# sourceMappingURL=unify.js.map