"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var stream = require('stream');

function isStream(obj) {
  return obj instanceof stream.Stream;
}

function isReadable(obj) {
  return isStream(obj) && typeof obj._read == 'function' && _typeof(obj._readableState) == 'object';
}

function isWritable(obj) {
  return isStream(obj) && typeof obj._write == 'function' && _typeof(obj._writableState) == 'object';
}

function isDuplex(obj) {
  return isReadable(obj) && isWritable(obj);
}

module.exports = isStream;
module.exports.isReadable = isReadable;
module.exports.isWritable = isWritable;
module.exports.isDuplex = isDuplex;
//# sourceMappingURL=isstream.js.map