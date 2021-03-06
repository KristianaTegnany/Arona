'use strict';

var BB = require('bluebird');

var index = require('./lib/entry-index');

var memo = require('./lib/memoization');

var path = require('path');

var rimraf = BB.promisify(require('rimraf'));

var rmContent = require('./lib/content/rm');

module.exports = entry;
module.exports.entry = entry;

function entry(cache, key) {
  memo.clearMemoized();
  return index["delete"](cache, key);
}

module.exports.content = content;

function content(cache, integrity) {
  memo.clearMemoized();
  return rmContent(cache, integrity);
}

module.exports.all = all;

function all(cache) {
  memo.clearMemoized();
  return rimraf(path.join(cache, '*(content-*|index-*)'));
}
//# sourceMappingURL=rm.js.map