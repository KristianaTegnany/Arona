"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

module.exports = sigmund;

function sigmund(subject, maxSessions) {
  maxSessions = maxSessions || 10;
  var notes = [];
  var analysis = '';
  var RE = RegExp;

  function psychoAnalyze(subject, session) {
    if (session > maxSessions) return;

    if (typeof subject === 'function' || typeof subject === 'undefined') {
      return;
    }

    if (_typeof(subject) !== 'object' || !subject || subject instanceof RE) {
      analysis += subject;
      return;
    }

    if (notes.indexOf(subject) !== -1 || session === maxSessions) return;
    notes.push(subject);
    analysis += '{';
    Object.keys(subject).forEach(function (issue, _, __) {
      // pseudo-private values.  skip those.
      if (issue.charAt(0) === '_') return;

      var to = _typeof(subject[issue]);

      if (to === 'function' || to === 'undefined') return;
      analysis += issue;
      psychoAnalyze(subject[issue], session + 1);
    });
  }

  psychoAnalyze(subject, 0);
  return analysis;
} // vim: set softtabstop=4 shiftwidth=4:
//# sourceMappingURL=sigmund.js.map