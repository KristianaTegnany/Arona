/* @flow */
(function () {
  require('./lib/main').config(Object.assign({}, require('./lib/env-options'), require('./lib/cli-options')(process.argv)));
})();
//# sourceMappingURL=config.js.map