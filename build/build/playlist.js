"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var EventEmitter = require('events');
/**
 * Represents a video playlist.
 */


var Playlist =
/*#__PURE__*/
function (_EventEmitter) {
  _inherits(Playlist, _EventEmitter);

  function Playlist() {
    var _this;

    _classCallCheck(this, Playlist);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Playlist).call(this));
    /**
     * Items of the playlist
     */

    _this.items = [];
    /**
     * true when youtube-dl is still getting information on other videos
     * @type {boolean}
     */

    _this.partial = true;
    return _this;
  }
  /**
   * Cancels playlist fetching
   */


  _createClass(Playlist, [{
    key: "cancel",
    value: function cancel() {
      if (this.partial && this._cancel) {
        this._cancel();

        this.emit('cancelled');
      }
    }
  }]);

  return Playlist;
}(EventEmitter); // JSDoc Events

/**
 * Emitted when information about a video is available
 *
 * @event Playlist#video
 * @type {object}
 */

/**
 * Emitted when all videos are done
 *
 * @event Playlist#done
 */

/**
 * Emitted when youtube-dl reports an error
 *
 * @event Playlist#error
 */


module.exports = Playlist;
//# sourceMappingURL=playlist.js.map