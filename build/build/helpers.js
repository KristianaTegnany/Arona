'use strict';

var _require = require('semver'),
    semver = _require.coerce,
    cmp = _require.cmp;

var data = require('./data');

var modules = Object.keys(data);

function compare(a, operator, b) {
  return cmp(semver(a), operator, semver(b));
}

function normalizeModulesList(list, order) {
  var set = new Set(list);
  return (Array.isArray(order) ? order : modules).filter(function (name) {
    return set.has(name);
  });
}

module.exports = {
  compare: compare,
  normalizeModulesList: normalizeModulesList,
  semver: semver
};
//# sourceMappingURL=helpers.js.map