"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _rollupPluginNodeResolve = _interopRequireDefault(require("rollup-plugin-node-resolve"));

var _rollupPluginBabel = _interopRequireDefault(require("rollup-plugin-babel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var packageJson = require('./package.json');

var _default = {
  entry: "dist/esnext/index.js",
  format: "umd",
  moduleName: "URI",
  plugins: [(0, _rollupPluginNodeResolve["default"])({
    module: true,
    jsnext: true,
    preferBuiltins: false
  }), (0, _rollupPluginBabel["default"])({
    "presets": [["latest", {
      "es2015": {
        "modules": false
      }
    }]],
    "plugins": ["external-helpers"],
    "externalHelpers": false
  })],
  dest: "dist/es5/uri.all.js",
  sourceMap: true,
  banner: "/** @license URI.js v" + packageJson.version + " (c) 2011 Gary Court. License: http://github.com/garycourt/uri-js */"
};
exports["default"] = _default;
//# sourceMappingURL=rollup.config.js.map