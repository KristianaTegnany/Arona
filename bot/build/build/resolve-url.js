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
    root.resolveUrl = factory();
  }
}(void 0, function () {
  function resolveUrl()
  /* ...urls */
  {
    var numUrls = arguments.length;

    if (numUrls === 0) {
      throw new Error("resolveUrl requires at least one argument; got none.");
    }

    var base = document.createElement("base");
    base.href = arguments[0];

    if (numUrls === 1) {
      return base.href;
    }

    var head = document.getElementsByTagName("head")[0];
    head.insertBefore(base, head.firstChild);
    var a = document.createElement("a");
    var resolved;

    for (var index = 1; index < numUrls; index++) {
      a.href = arguments[index];
      resolved = a.href;
      base.href = resolved;
    }

    head.removeChild(base);
    return resolved;
  }

  return resolveUrl;
});
//# sourceMappingURL=resolve-url.js.map