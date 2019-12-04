'use strict';

module.exports = inflight;
var Bluebird;

try {
  Bluebird = require('bluebird');
} catch (_) {
  Bluebird = Promise;
}

var active = {};
inflight.active = active;

function inflight(unique, doFly) {
  return Bluebird.all([unique, doFly]).then(function (args) {
    var unique = args[0];
    var doFly = args[1];

    if (Array.isArray(unique)) {
      return Bluebird.all(unique).then(function (uniqueArr) {
        return _inflight(uniqueArr.join(''), doFly);
      });
    } else {
      return _inflight(unique, doFly);
    }
  });

  function _inflight(unique, doFly) {
    if (!active[unique]) {
      var cleanup = function cleanup() {
        delete active[unique];
      };

      active[unique] = new Bluebird(function (resolve) {
        return resolve(doFly());
      });
      active[unique].then(cleanup, cleanup);
    }

    return active[unique];
  }
}
//# sourceMappingURL=inflight.js.map