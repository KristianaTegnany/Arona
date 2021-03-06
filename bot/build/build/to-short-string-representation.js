"use strict";

var safeToString = require("./safe-to-string");

var reNewLine = /[\n\r\u2028\u2029]/g;

module.exports = function (value) {
  var string = safeToString(value); // Trim if too long

  if (string.length > 100) string = string.slice(0, 99) + "…"; // Replace eventual new lines

  string = string.replace(reNewLine, function (_char) {
    return JSON.stringify(_char).slice(1, -1);
  });
  return string;
};
//# sourceMappingURL=to-short-string-representation.js.map