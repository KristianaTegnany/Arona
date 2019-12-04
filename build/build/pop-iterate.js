"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var ArrayIterator = require("./array-iterator");

var ObjectIterator = require("./object-iterator");

module.exports = iterate;

function iterate(iterable, start, stop, step) {
  if (!iterable) {
    return empty;
  } else if (Array.isArray(iterable)) {
    return new ArrayIterator(iterable, start, stop, step);
  } else if (typeof iterable.next === "function") {
    return iterable;
  } else if (typeof iterable.iterate === "function") {
    return iterable.iterate(start, stop, step);
  } else if (_typeof(iterable) === "object") {
    return new ObjectIterator(iterable);
  } else {
    throw new TypeError("Can't iterate " + iterable);
  }
}
//# sourceMappingURL=pop-iterate.js.map