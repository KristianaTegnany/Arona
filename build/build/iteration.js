"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

module.exports = Iteration;

function Iteration(value, done, index) {
  this.value = value;
  this.done = done;
  this.index = index;
}

Iteration.prototype.equals = function (other) {
  return _typeof(other) == 'object' && other.value === this.value && other.done === this.done && other.index === this.index;
};
//# sourceMappingURL=iteration.js.map