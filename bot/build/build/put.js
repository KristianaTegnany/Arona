'use strict';

var figgyPudding = require('figgy-pudding');

var index = require('./lib/entry-index');

var memo = require('./lib/memoization');

var write = require('./lib/content/write');

var to = require('mississippi').to;

var PutOpts = figgyPudding({
  algorithms: {
    "default": ['sha512']
  },
  integrity: {},
  memoize: {},
  metadata: {},
  pickAlgorithm: {},
  size: {},
  tmpPrefix: {},
  single: {},
  sep: {},
  error: {},
  strict: {}
});
module.exports = putData;

function putData(cache, key, data, opts) {
  opts = PutOpts(opts);
  return write(cache, data, opts).then(function (res) {
    return index.insert(cache, key, res.integrity, opts.concat({
      size: res.size
    })).then(function (entry) {
      if (opts.memoize) {
        memo.put(cache, entry, data, opts);
      }

      return res.integrity;
    });
  });
}

module.exports.stream = putStream;

function putStream(cache, key, opts) {
  opts = PutOpts(opts);
  var integrity;
  var size;
  var contentStream = write.stream(cache, opts).on('integrity', function (_int) {
    integrity = _int;
  }).on('size', function (s) {
    size = s;
  });
  var memoData;
  var memoTotal = 0;
  var stream = to(function (chunk, enc, cb) {
    contentStream.write(chunk, enc, function () {
      if (opts.memoize) {
        if (!memoData) {
          memoData = [];
        }

        memoData.push(chunk);
        memoTotal += chunk.length;
      }

      cb();
    });
  }, function (cb) {
    contentStream.end(function () {
      index.insert(cache, key, integrity, opts.concat({
        size: size
      })).then(function (entry) {
        if (opts.memoize) {
          memo.put(cache, entry, Buffer.concat(memoData, memoTotal), opts);
        }

        stream.emit('integrity', integrity);
        cb();
      });
    });
  });
  var erred = false;
  stream.once('error', function (err) {
    if (erred) {
      return;
    }

    erred = true;
    contentStream.emit('error', err);
  });
  contentStream.once('error', function (err) {
    if (erred) {
      return;
    }

    erred = true;
    stream.emit('error', err);
  });
  return stream;
}
//# sourceMappingURL=put.js.map