"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// Copyright 2014 Simon Lydell
// X11 (“MIT”) Licensed. (See LICENSE.)
void function (root, factory) {
  if (typeof define === "function" && define.amd) {
    define(factory);
  } else if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object") {
    module.exports = factory();
  } else {
    root.sourceMappingURL = factory();
  }
}(void 0, function () {
  var innerRegex = /[#@] sourceMappingURL=([^\s'"]*)/;
  var regex = RegExp("(?:" + "/\\*" + "(?:\\s*\r?\n(?://)?)?" + "(?:" + innerRegex.source + ")" + "\\s*" + "\\*/" + "|" + "//(?:" + innerRegex.source + ")" + ")" + "\\s*");
  return {
    regex: regex,
    _innerRegex: innerRegex,
    getFrom: function getFrom(code) {
      var match = code.match(regex);
      return match ? match[1] || match[2] || "" : null;
    },
    existsIn: function existsIn(code) {
      return regex.test(code);
    },
    removeFrom: function removeFrom(code) {
      return code.replace(regex, "");
    },
    insertBefore: function insertBefore(code, string) {
      var match = code.match(regex);

      if (match) {
        return code.slice(0, match.index) + string + code.slice(match.index);
      } else {
        return code + string;
      }
    }
  };
});
//# sourceMappingURL=source-map-url.js.map