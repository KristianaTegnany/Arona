"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var hasExcape = /~/;
var escapeMatcher = /~[01]/g;

function escapeReplacer(m) {
  switch (m) {
    case '~1':
      return '/';

    case '~0':
      return '~';
  }

  throw new Error('Invalid tilde escape: ' + m);
}

function untilde(str) {
  if (!hasExcape.test(str)) return str;
  return str.replace(escapeMatcher, escapeReplacer);
}

function setter(obj, pointer, value) {
  var part;
  var hasNextPart;

  for (var p = 1, len = pointer.length; p < len;) {
    part = untilde(pointer[p++]);
    hasNextPart = len > p;

    if (typeof obj[part] === 'undefined') {
      // support setting of /-
      if (Array.isArray(obj) && part === '-') {
        part = obj.length;
      } // support nested objects/array when setting values


      if (hasNextPart) {
        if (pointer[p] !== '' && pointer[p] < Infinity || pointer[p] === '-') obj[part] = [];else obj[part] = {};
      }
    }

    if (!hasNextPart) break;
    obj = obj[part];
  }

  var oldValue = obj[part];
  if (value === undefined) delete obj[part];else obj[part] = value;
  return oldValue;
}

function compilePointer(pointer) {
  if (typeof pointer === 'string') {
    pointer = pointer.split('/');
    if (pointer[0] === '') return pointer;
    throw new Error('Invalid JSON pointer.');
  } else if (Array.isArray(pointer)) {
    return pointer;
  }

  throw new Error('Invalid JSON pointer.');
}

function _get(obj, pointer) {
  if (_typeof(obj) !== 'object') throw new Error('Invalid input object.');
  pointer = compilePointer(pointer);
  var len = pointer.length;
  if (len === 1) return obj;

  for (var p = 1; p < len;) {
    obj = obj[untilde(pointer[p++])];
    if (len === p) return obj;
    if (_typeof(obj) !== 'object') return undefined;
  }
}

function _set(obj, pointer, value) {
  if (_typeof(obj) !== 'object') throw new Error('Invalid input object.');
  pointer = compilePointer(pointer);
  if (pointer.length === 0) throw new Error('Invalid JSON pointer for set.');
  return setter(obj, pointer, value);
}

function compile(pointer) {
  var compiled = compilePointer(pointer);
  return {
    get: function get(object) {
      return _get(object, compiled);
    },
    set: function set(object, value) {
      return _set(object, compiled, value);
    }
  };
}

exports.get = _get;
exports.set = _set;
exports.compile = compile;
//# sourceMappingURL=jsonpointer.js.map