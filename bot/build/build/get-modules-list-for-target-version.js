'use strict';

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var _require = require('./helpers'),
    compare = _require.compare,
    normalizeModulesList = _require.normalizeModulesList,
    semver = _require.semver;

var modulesByVersions = require('./modules-by-versions');

module.exports = function (raw) {
  var corejs = semver(raw);

  if (corejs.major !== 3) {
    throw RangeError('This version of `core-js-compat` works only with `core-js@3`.');
  }

  var result = [];

  for (var _i = 0, _Object$keys = Object.keys(modulesByVersions); _i < _Object$keys.length; _i++) {
    var version = _Object$keys[_i];

    if (compare(version, '<=', corejs)) {
      result.push.apply(result, _toConsumableArray(modulesByVersions[version]));
    }
  }

  return normalizeModulesList(result);
};
//# sourceMappingURL=get-modules-list-for-target-version.js.map