"use strict";

module.exports = function (det, rec, confidence, name, lang) {
  this.confidence = confidence;
  this.name = name || rec.name(det);
  this.lang = lang;
};
//# sourceMappingURL=match.js.map