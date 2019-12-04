"use strict";

var _gulp = _interopRequireDefault(require("gulp"));

var _gulpMocha = _interopRequireDefault(require("gulp-mocha"));

var _gulpEslint = _interopRequireDefault(require("gulp-eslint"));

var _minimist = _interopRequireDefault(require("minimist"));

var _gulpGit = _interopRequireDefault(require("gulp-git"));

var _gulpBump = _interopRequireDefault(require("gulp-bump"));

var _gulpFilter = _interopRequireDefault(require("gulp-filter"));

var _gulpTagVersion = _interopRequireDefault(require("gulp-tag-version"));

require("babel-register");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Copyright (C) 2014 Yusuke Suzuki <utatane.tea@gmail.com>
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//
//   * Redistributions of source code must retain the above copyright
//     notice, this list of conditions and the following disclaimer.
//   * Redistributions in binary form must reproduce the above copyright
//     notice, this list of conditions and the following disclaimer in the
//     documentation and/or other materials provided with the distribution.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
// AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
// IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
// ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
// DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
// (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
// LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
// ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
// THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
var SOURCE = ['*.js'];
var ESLINT_OPTION = {
  parser: 'babel-eslint',
  parserOptions: {
    'sourceType': 'module'
  },
  rules: {
    'quotes': 0,
    'eqeqeq': 0,
    'no-use-before-define': 0,
    'no-shadow': 0,
    'no-new': 0,
    'no-underscore-dangle': 0,
    'no-multi-spaces': 0,
    'no-native-reassign': 0,
    'no-loop-func': 0
  },
  env: {
    'node': true
  }
};

_gulp["default"].task('test', function () {
  var options = (0, _minimist["default"])(process.argv.slice(2), {
    string: 'test',
    "default": {
      test: 'test/*.js'
    }
  });
  return _gulp["default"].src(options.test).pipe((0, _gulpMocha["default"])({
    reporter: 'spec'
  }));
});

_gulp["default"].task('lint', function () {
  return _gulp["default"].src(SOURCE).pipe((0, _gulpEslint["default"])(ESLINT_OPTION)).pipe(_gulpEslint["default"].formatEach('stylish', process.stderr)).pipe(_gulpEslint["default"].failOnError());
});

var inc = function inc(importance) {
  return _gulp["default"].src(['./package.json']).pipe((0, _gulpBump["default"])({
    type: importance
  })).pipe(_gulp["default"].dest('./')).pipe(_gulpGit["default"].commit('Bumps package version')).pipe((0, _gulpFilter["default"])('package.json')).pipe((0, _gulpTagVersion["default"])({
    prefix: ''
  }));
};

_gulp["default"].task('travis', ['lint', 'test']);

_gulp["default"].task('default', ['travis']);

_gulp["default"].task('patch', [], function () {
  return inc('patch');
});

_gulp["default"].task('minor', [], function () {
  return inc('minor');
});

_gulp["default"].task('major', [], function () {
  return inc('major');
});
//# sourceMappingURL=gulpfile.babel.js.map