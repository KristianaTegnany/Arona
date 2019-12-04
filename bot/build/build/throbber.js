'use strict';

var compose = require('es5-ext/function/#/compose'),
    callable = require('es5-ext/object/valid-callable'),
    d = require('d'),
    validTimeout = require('timers-ext/valid-timeout'),
    chars = '-\\|/',
    l = chars.length,
    ThrobberIterator;

ThrobberIterator = function ThrobberIterator() {};

Object.defineProperties(ThrobberIterator.prototype, {
  index: d(-1),
  running: d(false),
  next: d(function () {
    var str = this.running ? "\b" : '';
    if (!this.running) this.running = true;
    return str + chars[this.index = (this.index + 1) % l];
  }),
  reset: d(function () {
    if (!this.running) return '';
    this.index = -1;
    this.running = false;
    return "\b";
  })
});

module.exports = exports = function exports(write, interval
/*, format*/
) {
  var format = arguments[2],
      token,
      iterator = new ThrobberIterator();
  callable(write);
  interval = validTimeout(interval);
  if (format !== undefined) write = compose.call(write, callable(format));
  return {
    start: function start() {
      if (token) return;
      token = setInterval(function () {
        write(iterator.next());
      }, interval);
    },
    restart: function restart() {
      this.stop();
      this.start();
    },
    stop: function stop() {
      if (!token) return;
      clearInterval(token);
      token = null;
      write(iterator.reset());
    }
  };
};

Object.defineProperty(exports, 'Iterator', d(ThrobberIterator));
//# sourceMappingURL=throbber.js.map