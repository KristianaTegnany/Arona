/*
 * Support for source maps in V8 stack traces
 * https://github.com/evanw/node-source-map-support
 */

/*
 The buffer module from node.js, for the browser.

 @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 license  MIT
*/
(this.define || function (G, J) {
  this.sourceMapSupport = J();
})("browser-source-map-support", function (G) {
  (function b(p, u, m) {
    function e(d, a) {
      if (!u[d]) {
        if (!p[d]) {
          var l = "function" == typeof require && require;
          if (!a && l) return l(d, !0);
          if (g) return g(d, !0);
          throw Error("Cannot find module '" + d + "'");
        }

        l = u[d] = {
          exports: {}
        };
        p[d][0].call(l.exports, function (a) {
          var b = p[d][1][a];
          return e(b ? b : a);
        }, l, l.exports, b, p, u, m);
      }

      return u[d].exports;
    }

    for (var g = "function" == typeof require && require, h = 0; h < m.length; h++) e(m[h]);

    return e;
  })({
    1: [function (p, u, m) {
      G = p("./source-map-support");
    }, {
      "./source-map-support": 21
    }],
    2: [function (p, u, m) {
      (function (b) {
        function e(b) {
          b = b.charCodeAt(0);
          if (43 === b) return 62;
          if (47 === b) return 63;
          if (48 > b) return -1;
          if (58 > b) return b - 48 + 52;
          if (91 > b) return b - 65;
          if (123 > b) return b - 97 + 26;
        }

        var g = "undefined" !== typeof Uint8Array ? Uint8Array : Array;

        b.toByteArray = function (b) {
          function d(a) {
            r[w++] = a;
          }

          if (0 < b.length % 4) throw Error("Invalid string. Length must be a multiple of 4");
          var a = b.length;
          var l = "=" === b.charAt(a - 2) ? 2 : "=" === b.charAt(a - 1) ? 1 : 0;
          var r = new g(3 * b.length / 4 - l);
          var q = 0 < l ? b.length - 4 : b.length;
          var w = 0;

          for (a = 0; a < q; a += 4) {
            var h = e(b.charAt(a)) << 18 | e(b.charAt(a + 1)) << 12 | e(b.charAt(a + 2)) << 6 | e(b.charAt(a + 3));
            d((h & 16711680) >> 16);
            d((h & 65280) >> 8);
            d(h & 255);
          }

          2 === l ? (h = e(b.charAt(a)) << 2 | e(b.charAt(a + 1)) >> 4, d(h & 255)) : 1 === l && (h = e(b.charAt(a)) << 10 | e(b.charAt(a + 1)) << 4 | e(b.charAt(a + 2)) >> 2, d(h >> 8 & 255), d(h & 255));
          return r;
        };

        b.fromByteArray = function (b) {
          var d = b.length % 3,
              a = "",
              l;
          var e = 0;

          for (l = b.length - d; e < l; e += 3) {
            var g = (b[e] << 16) + (b[e + 1] << 8) + b[e + 2];
            g = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(g >> 18 & 63) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(g >> 12 & 63) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(g >> 6 & 63) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(g & 63);
            a += g;
          }

          switch (d) {
            case 1:
              g = b[b.length - 1];
              a += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(g >> 2);
              a += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(g << 4 & 63);
              a += "==";
              break;

            case 2:
              g = (b[b.length - 2] << 8) + b[b.length - 1], a += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(g >> 10), a += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(g >> 4 & 63), a += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(g << 2 & 63), a += "=";
          }

          return a;
        };
      })("undefined" === typeof m ? this.base64js = {} : m);
    }, {}],
    3: [function (p, u, m) {}, {}],
    4: [function (p, u, m) {
      (function (b) {
        var e = Object.prototype.toString,
            g = "function" === typeof b.alloc && "function" === typeof b.allocUnsafe && "function" === typeof b.from;

        u.exports = function (h, d, a) {
          if ("number" === typeof h) throw new TypeError('"value" argument must not be a number');

          if ("ArrayBuffer" === e.call(h).slice(8, -1)) {
            d >>>= 0;
            var l = h.byteLength - d;
            if (0 > l) throw new RangeError("'offset' is out of bounds");
            if (void 0 === a) a = l;else if (a >>>= 0, a > l) throw new RangeError("'length' is out of bounds");
            return g ? b.from(h.slice(d, d + a)) : new b(new Uint8Array(h.slice(d, d + a)));
          }

          if ("string" === typeof h) {
            a = d;
            if ("string" !== typeof a || "" === a) a = "utf8";
            if (!b.isEncoding(a)) throw new TypeError('"encoding" must be a valid string encoding');
            return g ? b.from(h, a) : new b(h, a);
          }

          return g ? b.from(h) : new b(h);
        };
      }).call(this, p("buffer").Buffer);
    }, {
      buffer: 5
    }],
    5: [function (p, u, m) {
      function b(f, n, a) {
        if (!(this instanceof b)) return new b(f, n, a);
        var c = typeof f;
        if ("number" === c) var d = 0 < f ? f >>> 0 : 0;else if ("string" === c) {
          if ("base64" === n) for (f = (f.trim ? f.trim() : f.replace(/^\s+|\s+$/g, "")).replace(H, ""); 0 !== f.length % 4;) f += "=";
          d = b.byteLength(f, n);
        } else if ("object" === c && null !== f) "Buffer" === f.type && F(f.data) && (f = f.data), d = 0 < +f.length ? Math.floor(+f.length) : 0;else throw new TypeError("must start with number, buffer, array or string");
        if (this.length > D) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + D.toString(16) + " bytes");
        if (b.TYPED_ARRAY_SUPPORT) var k = b._augment(new Uint8Array(d));else k = this, k.length = d, k._isBuffer = !0;
        if (b.TYPED_ARRAY_SUPPORT && "number" === typeof f.byteLength) k._set(f);else {
          var C = f;
          if (F(C) || b.isBuffer(C) || C && "object" === typeof C && "number" === typeof C.length) {
            if (b.isBuffer(f)) for (n = 0; n < d; n++) k[n] = f.readUInt8(n);else for (n = 0; n < d; n++) k[n] = (f[n] % 256 + 256) % 256;
          } else if ("string" === c) k.write(f, 0, n);else if ("number" === c && !b.TYPED_ARRAY_SUPPORT && !a) for (n = 0; n < d; n++) k[n] = 0;
        }
        return k;
      }

      function e(f, n, b) {
        var a = "";

        for (b = Math.min(f.length, b); n < b; n++) a += String.fromCharCode(f[n]);

        return a;
      }

      function g(f, n, b) {
        if (0 !== f % 1 || 0 > f) throw new RangeError("offset is not uint");
        if (f + n > b) throw new RangeError("Trying to access beyond buffer length");
      }

      function h(f, n, a, c, d, k) {
        if (!b.isBuffer(f)) throw new TypeError("buffer must be a Buffer instance");
        if (n > d || n < k) throw new TypeError("value is out of bounds");
        if (a + c > f.length) throw new TypeError("index out of range");
      }

      function d(f, n, b, a) {
        0 > n && (n = 65535 + n + 1);

        for (var c = 0, d = Math.min(f.length - b, 2); c < d; c++) f[b + c] = (n & 255 << 8 * (a ? c : 1 - c)) >>> 8 * (a ? c : 1 - c);
      }

      function a(f, n, b, a) {
        0 > n && (n = 4294967295 + n + 1);

        for (var c = 0, d = Math.min(f.length - b, 4); c < d; c++) f[b + c] = n >>> 8 * (a ? c : 3 - c) & 255;
      }

      function l(f, n, b, a, c, d) {
        if (n > c || n < d) throw new TypeError("value is out of bounds");
        if (b + a > f.length) throw new TypeError("index out of range");
      }

      function r(f, n, b, a, c) {
        c || l(f, n, b, 4, 3.4028234663852886E38, -3.4028234663852886E38);
        z.write(f, n, b, a, 23, 4);
        return b + 4;
      }

      function q(f, n, b, a, c) {
        c || l(f, n, b, 8, 1.7976931348623157E308, -1.7976931348623157E308);
        z.write(f, n, b, a, 52, 8);
        return b + 8;
      }

      function w(f) {
        for (var n = [], b = 0; b < f.length; b++) {
          var a = f.charCodeAt(b);
          if (127 >= a) n.push(a);else {
            var c = b;
            55296 <= a && 57343 >= a && b++;
            a = encodeURIComponent(f.slice(c, b + 1)).substr(1).split("%");

            for (c = 0; c < a.length; c++) n.push(parseInt(a[c], 16));
          }
        }

        return n;
      }

      function v(f) {
        for (var b = [], a = 0; a < f.length; a++) b.push(f.charCodeAt(a) & 255);

        return b;
      }

      function c(f, b, a, c, d) {
        d && (c -= c % d);

        for (d = 0; d < c && !(d + a >= b.length || d >= f.length); d++) b[d + a] = f[d];

        return d;
      }

      function k(f) {
        try {
          return decodeURIComponent(f);
        } catch (n) {
          return String.fromCharCode(65533);
        }
      }

      var x = p("base64-js"),
          z = p("ieee754"),
          F = p("is-array");
      m.Buffer = b;
      m.SlowBuffer = b;
      m.INSPECT_MAX_BYTES = 50;
      b.poolSize = 8192;
      var D = 1073741823;

      b.TYPED_ARRAY_SUPPORT = function () {
        try {
          var f = new ArrayBuffer(0),
              b = new Uint8Array(f);

          b.foo = function () {
            return 42;
          };

          return 42 === b.foo() && "function" === typeof b.subarray && 0 === new Uint8Array(1).subarray(1, 1).byteLength;
        } catch (C) {
          return !1;
        }
      }();

      b.isBuffer = function (f) {
        return !(null == f || !f._isBuffer);
      };

      b.compare = function (f, a) {
        if (!b.isBuffer(f) || !b.isBuffer(a)) throw new TypeError("Arguments must be Buffers");

        for (var c = f.length, n = a.length, d = 0, k = Math.min(c, n); d < k && f[d] === a[d]; d++);

        d !== k && (c = f[d], n = a[d]);
        return c < n ? -1 : n < c ? 1 : 0;
      };

      b.isEncoding = function (f) {
        switch (String(f).toLowerCase()) {
          case "hex":
          case "utf8":
          case "utf-8":
          case "ascii":
          case "binary":
          case "base64":
          case "raw":
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return !0;

          default:
            return !1;
        }
      };

      b.concat = function (f, a) {
        if (!F(f)) throw new TypeError("Usage: Buffer.concat(list[, length])");
        if (0 === f.length) return new b(0);
        if (1 === f.length) return f[0];
        var c;
        if (void 0 === a) for (c = a = 0; c < f.length; c++) a += f[c].length;
        var n = new b(a),
            d = 0;

        for (c = 0; c < f.length; c++) {
          var k = f[c];
          k.copy(n, d);
          d += k.length;
        }

        return n;
      };

      b.byteLength = function (f, a) {
        f += "";

        switch (a || "utf8") {
          case "ascii":
          case "binary":
          case "raw":
            var b = f.length;
            break;

          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            b = 2 * f.length;
            break;

          case "hex":
            b = f.length >>> 1;
            break;

          case "utf8":
          case "utf-8":
            b = w(f).length;
            break;

          case "base64":
            b = x.toByteArray(f).length;
            break;

          default:
            b = f.length;
        }

        return b;
      };

      b.prototype.length = void 0;
      b.prototype.parent = void 0;

      b.prototype.toString = function (f, b, a) {
        var c = !1;
        b >>>= 0;
        a = void 0 === a || Infinity === a ? this.length : a >>> 0;
        f || (f = "utf8");
        0 > b && (b = 0);
        a > this.length && (a = this.length);
        if (a <= b) return "";

        for (;;) switch (f) {
          case "hex":
            f = b;
            b = a;
            a = this.length;
            if (!f || 0 > f) f = 0;
            if (!b || 0 > b || b > a) b = a;
            c = "";

            for (a = f; a < b; a++) f = c, c = this[a], c = 16 > c ? "0" + c.toString(16) : c.toString(16), c = f + c;

            return c;

          case "utf8":
          case "utf-8":
            c = f = "";

            for (a = Math.min(this.length, a); b < a; b++) 127 >= this[b] ? (f += k(c) + String.fromCharCode(this[b]), c = "") : c += "%" + this[b].toString(16);

            return f + k(c);

          case "ascii":
            return e(this, b, a);

          case "binary":
            return e(this, b, a);

          case "base64":
            return b = 0 === b && a === this.length ? x.fromByteArray(this) : x.fromByteArray(this.slice(b, a)), b;

          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            b = this.slice(b, a);
            a = "";

            for (f = 0; f < b.length; f += 2) a += String.fromCharCode(b[f] + 256 * b[f + 1]);

            return a;

          default:
            if (c) throw new TypeError("Unknown encoding: " + f);
            f = (f + "").toLowerCase();
            c = !0;
        }
      };

      b.prototype.equals = function (f) {
        if (!b.isBuffer(f)) throw new TypeError("Argument must be a Buffer");
        return 0 === b.compare(this, f);
      };

      b.prototype.inspect = function () {
        var f = "",
            b = m.INSPECT_MAX_BYTES;
        0 < this.length && (f = this.toString("hex", 0, b).match(/.{2}/g).join(" "), this.length > b && (f += " ... "));
        return "<Buffer " + f + ">";
      };

      b.prototype.compare = function (f) {
        if (!b.isBuffer(f)) throw new TypeError("Argument must be a Buffer");
        return b.compare(this, f);
      };

      b.prototype.get = function (f) {
        console.log(".get() is deprecated. Access using array indexes instead.");
        return this.readUInt8(f);
      };

      b.prototype.set = function (f, b) {
        console.log(".set() is deprecated. Access using array indexes instead.");
        return this.writeUInt8(f, b);
      };

      b.prototype.write = function (f, b, a, d) {
        if (isFinite(b)) isFinite(a) || (d = a, a = void 0);else {
          var n = d;
          d = b;
          b = a;
          a = n;
        }
        b = Number(b) || 0;
        n = this.length - b;
        a ? (a = Number(a), a > n && (a = n)) : a = n;
        d = String(d || "utf8").toLowerCase();

        switch (d) {
          case "hex":
            b = Number(b) || 0;
            d = this.length - b;
            a ? (a = Number(a), a > d && (a = d)) : a = d;
            d = f.length;
            if (0 !== d % 2) throw Error("Invalid hex string");
            a > d / 2 && (a = d / 2);

            for (d = 0; d < a; d++) {
              n = parseInt(f.substr(2 * d, 2), 16);
              if (isNaN(n)) throw Error("Invalid hex string");
              this[b + d] = n;
            }

            f = d;
            break;

          case "utf8":
          case "utf-8":
            f = c(w(f), this, b, a);
            break;

          case "ascii":
            f = c(v(f), this, b, a);
            break;

          case "binary":
            f = c(v(f), this, b, a);
            break;

          case "base64":
            f = c(x.toByteArray(f), this, b, a);
            break;

          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            n = [];

            for (var k = 0; k < f.length; k++) {
              var l = f.charCodeAt(k);
              d = l >> 8;
              l %= 256;
              n.push(l);
              n.push(d);
            }

            f = c(n, this, b, a, 2);
            break;

          default:
            throw new TypeError("Unknown encoding: " + d);
        }

        return f;
      };

      b.prototype.toJSON = function () {
        return {
          type: "Buffer",
          data: Array.prototype.slice.call(this._arr || this, 0)
        };
      };

      b.prototype.slice = function (f, a) {
        var c = this.length;
        f = ~~f;
        a = void 0 === a ? c : ~~a;
        0 > f ? (f += c, 0 > f && (f = 0)) : f > c && (f = c);
        0 > a ? (a += c, 0 > a && (a = 0)) : a > c && (a = c);
        a < f && (a = f);
        if (b.TYPED_ARRAY_SUPPORT) return b._augment(this.subarray(f, a));
        c = a - f;

        for (var d = new b(c, void 0, !0), n = 0; n < c; n++) d[n] = this[n + f];

        return d;
      };

      b.prototype.readUInt8 = function (f, a) {
        a || g(f, 1, this.length);
        return this[f];
      };

      b.prototype.readUInt16LE = function (f, a) {
        a || g(f, 2, this.length);
        return this[f] | this[f + 1] << 8;
      };

      b.prototype.readUInt16BE = function (f, a) {
        a || g(f, 2, this.length);
        return this[f] << 8 | this[f + 1];
      };

      b.prototype.readUInt32LE = function (f, a) {
        a || g(f, 4, this.length);
        return (this[f] | this[f + 1] << 8 | this[f + 2] << 16) + 16777216 * this[f + 3];
      };

      b.prototype.readUInt32BE = function (f, a) {
        a || g(f, 4, this.length);
        return 16777216 * this[f] + (this[f + 1] << 16 | this[f + 2] << 8 | this[f + 3]);
      };

      b.prototype.readInt8 = function (f, a) {
        a || g(f, 1, this.length);
        return this[f] & 128 ? -1 * (255 - this[f] + 1) : this[f];
      };

      b.prototype.readInt16LE = function (f, a) {
        a || g(f, 2, this.length);
        var b = this[f] | this[f + 1] << 8;
        return b & 32768 ? b | 4294901760 : b;
      };

      b.prototype.readInt16BE = function (f, a) {
        a || g(f, 2, this.length);
        var b = this[f + 1] | this[f] << 8;
        return b & 32768 ? b | 4294901760 : b;
      };

      b.prototype.readInt32LE = function (f, a) {
        a || g(f, 4, this.length);
        return this[f] | this[f + 1] << 8 | this[f + 2] << 16 | this[f + 3] << 24;
      };

      b.prototype.readInt32BE = function (a, b) {
        b || g(a, 4, this.length);
        return this[a] << 24 | this[a + 1] << 16 | this[a + 2] << 8 | this[a + 3];
      };

      b.prototype.readFloatLE = function (a, b) {
        b || g(a, 4, this.length);
        return z.read(this, a, !0, 23, 4);
      };

      b.prototype.readFloatBE = function (a, b) {
        b || g(a, 4, this.length);
        return z.read(this, a, !1, 23, 4);
      };

      b.prototype.readDoubleLE = function (a, b) {
        b || g(a, 8, this.length);
        return z.read(this, a, !0, 52, 8);
      };

      b.prototype.readDoubleBE = function (a, b) {
        b || g(a, 8, this.length);
        return z.read(this, a, !1, 52, 8);
      };

      b.prototype.writeUInt8 = function (a, c, d) {
        a = +a;
        c >>>= 0;
        d || h(this, a, c, 1, 255, 0);
        b.TYPED_ARRAY_SUPPORT || (a = Math.floor(a));
        this[c] = a;
        return c + 1;
      };

      b.prototype.writeUInt16LE = function (a, c, k) {
        a = +a;
        c >>>= 0;
        k || h(this, a, c, 2, 65535, 0);
        b.TYPED_ARRAY_SUPPORT ? (this[c] = a, this[c + 1] = a >>> 8) : d(this, a, c, !0);
        return c + 2;
      };

      b.prototype.writeUInt16BE = function (a, c, k) {
        a = +a;
        c >>>= 0;
        k || h(this, a, c, 2, 65535, 0);
        b.TYPED_ARRAY_SUPPORT ? (this[c] = a >>> 8, this[c + 1] = a) : d(this, a, c, !1);
        return c + 2;
      };

      b.prototype.writeUInt32LE = function (f, c, d) {
        f = +f;
        c >>>= 0;
        d || h(this, f, c, 4, 4294967295, 0);
        b.TYPED_ARRAY_SUPPORT ? (this[c + 3] = f >>> 24, this[c + 2] = f >>> 16, this[c + 1] = f >>> 8, this[c] = f) : a(this, f, c, !0);
        return c + 4;
      };

      b.prototype.writeUInt32BE = function (f, c, d) {
        f = +f;
        c >>>= 0;
        d || h(this, f, c, 4, 4294967295, 0);
        b.TYPED_ARRAY_SUPPORT ? (this[c] = f >>> 24, this[c + 1] = f >>> 16, this[c + 2] = f >>> 8, this[c + 3] = f) : a(this, f, c, !1);
        return c + 4;
      };

      b.prototype.writeInt8 = function (a, c, d) {
        a = +a;
        c >>>= 0;
        d || h(this, a, c, 1, 127, -128);
        b.TYPED_ARRAY_SUPPORT || (a = Math.floor(a));
        0 > a && (a = 255 + a + 1);
        this[c] = a;
        return c + 1;
      };

      b.prototype.writeInt16LE = function (a, c, k) {
        a = +a;
        c >>>= 0;
        k || h(this, a, c, 2, 32767, -32768);
        b.TYPED_ARRAY_SUPPORT ? (this[c] = a, this[c + 1] = a >>> 8) : d(this, a, c, !0);
        return c + 2;
      };

      b.prototype.writeInt16BE = function (a, c, k) {
        a = +a;
        c >>>= 0;
        k || h(this, a, c, 2, 32767, -32768);
        b.TYPED_ARRAY_SUPPORT ? (this[c] = a >>> 8, this[c + 1] = a) : d(this, a, c, !1);
        return c + 2;
      };

      b.prototype.writeInt32LE = function (c, d, k) {
        c = +c;
        d >>>= 0;
        k || h(this, c, d, 4, 2147483647, -2147483648);
        b.TYPED_ARRAY_SUPPORT ? (this[d] = c, this[d + 1] = c >>> 8, this[d + 2] = c >>> 16, this[d + 3] = c >>> 24) : a(this, c, d, !0);
        return d + 4;
      };

      b.prototype.writeInt32BE = function (c, d, k) {
        c = +c;
        d >>>= 0;
        k || h(this, c, d, 4, 2147483647, -2147483648);
        0 > c && (c = 4294967295 + c + 1);
        b.TYPED_ARRAY_SUPPORT ? (this[d] = c >>> 24, this[d + 1] = c >>> 16, this[d + 2] = c >>> 8, this[d + 3] = c) : a(this, c, d, !1);
        return d + 4;
      };

      b.prototype.writeFloatLE = function (a, c, b) {
        return r(this, a, c, !0, b);
      };

      b.prototype.writeFloatBE = function (a, c, b) {
        return r(this, a, c, !1, b);
      };

      b.prototype.writeDoubleLE = function (a, c, b) {
        return q(this, a, c, !0, b);
      };

      b.prototype.writeDoubleBE = function (a, c, b) {
        return q(this, a, c, !1, b);
      };

      b.prototype.copy = function (a, c, d, k) {
        d || (d = 0);
        k || 0 === k || (k = this.length);
        c || (c = 0);

        if (k !== d && 0 !== a.length && 0 !== this.length) {
          if (k < d) throw new TypeError("sourceEnd < sourceStart");
          if (0 > c || c >= a.length) throw new TypeError("targetStart out of bounds");
          if (0 > d || d >= this.length) throw new TypeError("sourceStart out of bounds");
          if (0 > k || k > this.length) throw new TypeError("sourceEnd out of bounds");
          k > this.length && (k = this.length);
          a.length - c < k - d && (k = a.length - c + d);
          k -= d;
          if (1E3 > k || !b.TYPED_ARRAY_SUPPORT) for (var f = 0; f < k; f++) a[f + c] = this[f + d];else a._set(this.subarray(d, d + k), c);
        }
      };

      b.prototype.fill = function (a, c, b) {
        a || (a = 0);
        c || (c = 0);
        b || (b = this.length);
        if (b < c) throw new TypeError("end < start");

        if (b !== c && 0 !== this.length) {
          if (0 > c || c >= this.length) throw new TypeError("start out of bounds");
          if (0 > b || b > this.length) throw new TypeError("end out of bounds");
          if ("number" === typeof a) for (; c < b; c++) this[c] = a;else {
            a = w(a.toString());

            for (var d = a.length; c < b; c++) this[c] = a[c % d];
          }
          return this;
        }
      };

      b.prototype.toArrayBuffer = function () {
        if ("undefined" !== typeof Uint8Array) {
          if (b.TYPED_ARRAY_SUPPORT) return new b(this).buffer;

          for (var a = new Uint8Array(this.length), c = 0, d = a.length; c < d; c += 1) a[c] = this[c];

          return a.buffer;
        }

        throw new TypeError("Buffer.toArrayBuffer not supported in this browser");
      };

      var t = b.prototype;

      b._augment = function (a) {
        a.constructor = b;
        a._isBuffer = !0;
        a._get = a.get;
        a._set = a.set;
        a.get = t.get;
        a.set = t.set;
        a.write = t.write;
        a.toString = t.toString;
        a.toLocaleString = t.toString;
        a.toJSON = t.toJSON;
        a.equals = t.equals;
        a.compare = t.compare;
        a.copy = t.copy;
        a.slice = t.slice;
        a.readUInt8 = t.readUInt8;
        a.readUInt16LE = t.readUInt16LE;
        a.readUInt16BE = t.readUInt16BE;
        a.readUInt32LE = t.readUInt32LE;
        a.readUInt32BE = t.readUInt32BE;
        a.readInt8 = t.readInt8;
        a.readInt16LE = t.readInt16LE;
        a.readInt16BE = t.readInt16BE;
        a.readInt32LE = t.readInt32LE;
        a.readInt32BE = t.readInt32BE;
        a.readFloatLE = t.readFloatLE;
        a.readFloatBE = t.readFloatBE;
        a.readDoubleLE = t.readDoubleLE;
        a.readDoubleBE = t.readDoubleBE;
        a.writeUInt8 = t.writeUInt8;
        a.writeUInt16LE = t.writeUInt16LE;
        a.writeUInt16BE = t.writeUInt16BE;
        a.writeUInt32LE = t.writeUInt32LE;
        a.writeUInt32BE = t.writeUInt32BE;
        a.writeInt8 = t.writeInt8;
        a.writeInt16LE = t.writeInt16LE;
        a.writeInt16BE = t.writeInt16BE;
        a.writeInt32LE = t.writeInt32LE;
        a.writeInt32BE = t.writeInt32BE;
        a.writeFloatLE = t.writeFloatLE;
        a.writeFloatBE = t.writeFloatBE;
        a.writeDoubleLE = t.writeDoubleLE;
        a.writeDoubleBE = t.writeDoubleBE;
        a.fill = t.fill;
        a.inspect = t.inspect;
        a.toArrayBuffer = t.toArrayBuffer;
        return a;
      };

      var H = /[^+\/0-9A-z]/g;
    }, {
      "base64-js": 2,
      ieee754: 6,
      "is-array": 7
    }],
    6: [function (p, u, m) {
      m.read = function (b, e, g, h, d) {
        var a = 8 * d - h - 1;
        var l = (1 << a) - 1,
            r = l >> 1,
            q = -7;
        d = g ? d - 1 : 0;
        var w = g ? -1 : 1,
            v = b[e + d];
        d += w;
        g = v & (1 << -q) - 1;
        v >>= -q;

        for (q += a; 0 < q; g = 256 * g + b[e + d], d += w, q -= 8);

        a = g & (1 << -q) - 1;
        g >>= -q;

        for (q += h; 0 < q; a = 256 * a + b[e + d], d += w, q -= 8);

        if (0 === g) g = 1 - r;else {
          if (g === l) return a ? NaN : Infinity * (v ? -1 : 1);
          a += Math.pow(2, h);
          g -= r;
        }
        return (v ? -1 : 1) * a * Math.pow(2, g - h);
      };

      m.write = function (b, e, g, h, d, a) {
        var l,
            r = 8 * a - d - 1,
            q = (1 << r) - 1,
            w = q >> 1,
            v = 23 === d ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
        a = h ? 0 : a - 1;
        var c = h ? 1 : -1,
            k = 0 > e || 0 === e && 0 > 1 / e ? 1 : 0;
        e = Math.abs(e);
        isNaN(e) || Infinity === e ? (e = isNaN(e) ? 1 : 0, h = q) : (h = Math.floor(Math.log(e) / Math.LN2), 1 > e * (l = Math.pow(2, -h)) && (h--, l *= 2), e = 1 <= h + w ? e + v / l : e + v * Math.pow(2, 1 - w), 2 <= e * l && (h++, l /= 2), h + w >= q ? (e = 0, h = q) : 1 <= h + w ? (e = (e * l - 1) * Math.pow(2, d), h += w) : (e = e * Math.pow(2, w - 1) * Math.pow(2, d), h = 0));

        for (; 8 <= d; b[g + a] = e & 255, a += c, e /= 256, d -= 8);

        h = h << d | e;

        for (r += d; 0 < r; b[g + a] = h & 255, a += c, h /= 256, r -= 8);

        b[g + a - c] |= 128 * k;
      };
    }, {}],
    7: [function (p, u, m) {
      var b = Object.prototype.toString;

      u.exports = Array.isArray || function (e) {
        return !!e && "[object Array]" == b.call(e);
      };
    }, {}],
    8: [function (p, u, m) {
      (function (b) {
        function e(a, b) {
          for (var d = 0, l = a.length - 1; 0 <= l; l--) {
            var w = a[l];
            "." === w ? a.splice(l, 1) : ".." === w ? (a.splice(l, 1), d++) : d && (a.splice(l, 1), d--);
          }

          if (b) for (; d--; d) a.unshift("..");
          return a;
        }

        function g(a, b) {
          if (a.filter) return a.filter(b);

          for (var d = [], l = 0; l < a.length; l++) b(a[l], l, a) && d.push(a[l]);

          return d;
        }

        var h = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;

        m.resolve = function () {
          for (var a = "", d = !1, h = arguments.length - 1; -1 <= h && !d; h--) {
            var q = 0 <= h ? arguments[h] : b.cwd();
            if ("string" !== typeof q) throw new TypeError("Arguments to path.resolve must be strings");
            q && (a = q + "/" + a, d = "/" === q.charAt(0));
          }

          a = e(g(a.split("/"), function (a) {
            return !!a;
          }), !d).join("/");
          return (d ? "/" : "") + a || ".";
        };

        m.normalize = function (a) {
          var b = m.isAbsolute(a),
              h = "/" === d(a, -1);
          (a = e(g(a.split("/"), function (a) {
            return !!a;
          }), !b).join("/")) || b || (a = ".");
          a && h && (a += "/");
          return (b ? "/" : "") + a;
        };

        m.isAbsolute = function (a) {
          return "/" === a.charAt(0);
        };

        m.join = function () {
          var a = Array.prototype.slice.call(arguments, 0);
          return m.normalize(g(a, function (a, b) {
            if ("string" !== typeof a) throw new TypeError("Arguments to path.join must be strings");
            return a;
          }).join("/"));
        };

        m.relative = function (a, b) {
          function d(a) {
            for (var c = 0; c < a.length && "" === a[c]; c++);

            for (var b = a.length - 1; 0 <= b && "" === a[b]; b--);

            return c > b ? [] : a.slice(c, b - c + 1);
          }

          a = m.resolve(a).substr(1);
          b = m.resolve(b).substr(1);

          for (var l = d(a.split("/")), w = d(b.split("/")), e = Math.min(l.length, w.length), c = e, k = 0; k < e; k++) if (l[k] !== w[k]) {
            c = k;
            break;
          }

          e = [];

          for (k = c; k < l.length; k++) e.push("..");

          e = e.concat(w.slice(c));
          return e.join("/");
        };

        m.sep = "/";
        m.delimiter = ":";

        m.dirname = function (a) {
          var b = h.exec(a).slice(1);
          a = b[0];
          b = b[1];
          if (!a && !b) return ".";
          b && (b = b.substr(0, b.length - 1));
          return a + b;
        };

        m.basename = function (a, b) {
          var d = h.exec(a).slice(1)[2];
          b && d.substr(-1 * b.length) === b && (d = d.substr(0, d.length - b.length));
          return d;
        };

        m.extname = function (a) {
          return h.exec(a).slice(1)[3];
        };

        var d = "b" === "ab".substr(-1) ? function (a, b, d) {
          return a.substr(b, d);
        } : function (a, b, d) {
          0 > b && (b = a.length + b);
          return a.substr(b, d);
        };
      }).call(this, p("g5I+bs"));
    }, {
      "g5I+bs": 9
    }],
    9: [function (p, u, m) {
      function b() {}

      p = u.exports = {};

      p.nextTick = function () {
        if ("undefined" !== typeof window && window.setImmediate) return function (b) {
          return window.setImmediate(b);
        };

        if ("undefined" !== typeof window && window.postMessage && window.addEventListener) {
          var b = [];
          window.addEventListener("message", function (e) {
            var g = e.source;
            g !== window && null !== g || "process-tick" !== e.data || (e.stopPropagation(), 0 < b.length && b.shift()());
          }, !0);
          return function (e) {
            b.push(e);
            window.postMessage("process-tick", "*");
          };
        }

        return function (b) {
          setTimeout(b, 0);
        };
      }();

      p.title = "browser";
      p.browser = !0;
      p.env = {};
      p.argv = [];
      p.on = b;
      p.addListener = b;
      p.once = b;
      p.off = b;
      p.removeListener = b;
      p.removeAllListeners = b;
      p.emit = b;

      p.binding = function (b) {
        throw Error("process.binding is not supported");
      };

      p.cwd = function () {
        return "/";
      };

      p.chdir = function (b) {
        throw Error("process.chdir is not supported");
      };
    }, {}],
    10: [function (p, u, m) {
      function b() {
        this._array = [];
        this._set = h ? new Map() : Object.create(null);
      }

      var e = p("./util"),
          g = Object.prototype.hasOwnProperty,
          h = "undefined" !== typeof Map;

      b.fromArray = function (d, a) {
        for (var e = new b(), g = 0, h = d.length; g < h; g++) e.add(d[g], a);

        return e;
      };

      b.prototype.size = function () {
        return h ? this._set.size : Object.getOwnPropertyNames(this._set).length;
      };

      b.prototype.add = function (b, a) {
        var d = h ? b : e.toSetString(b),
            r = h ? this.has(b) : g.call(this._set, d),
            q = this._array.length;
        r && !a || this._array.push(b);
        r || (h ? this._set.set(b, q) : this._set[d] = q);
      };

      b.prototype.has = function (b) {
        if (h) return this._set.has(b);
        b = e.toSetString(b);
        return g.call(this._set, b);
      };

      b.prototype.indexOf = function (b) {
        if (h) {
          var a = this._set.get(b);

          if (0 <= a) return a;
        } else if (a = e.toSetString(b), g.call(this._set, a)) return this._set[a];

        throw Error('"' + b + '" is not in the set.');
      };

      b.prototype.at = function (b) {
        if (0 <= b && b < this._array.length) return this._array[b];
        throw Error("No element indexed by " + b);
      };

      b.prototype.toArray = function () {
        return this._array.slice();
      };

      m.ArraySet = b;
    }, {
      "./util": 19
    }],
    11: [function (p, u, m) {
      var b = p("./base64");

      m.encode = function (e) {
        var g = "",
            h = 0 > e ? (-e << 1) + 1 : e << 1;

        do e = h & 31, h >>>= 5, 0 < h && (e |= 32), g += b.encode(e); while (0 < h);

        return g;
      };

      m.decode = function (e, g, h) {
        var d = e.length,
            a = 0,
            l = 0;

        do {
          if (g >= d) throw Error("Expected more digits in base 64 VLQ value.");
          var r = b.decode(e.charCodeAt(g++));
          if (-1 === r) throw Error("Invalid base64 digit: " + e.charAt(g - 1));
          var q = !!(r & 32);
          r &= 31;
          a += r << l;
          l += 5;
        } while (q);

        e = a >> 1;
        h.value = 1 === (a & 1) ? -e : e;
        h.rest = g;
      };
    }, {
      "./base64": 12
    }],
    12: [function (p, u, m) {
      var b = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");

      m.encode = function (e) {
        if (0 <= e && e < b.length) return b[e];
        throw new TypeError("Must be between 0 and 63: " + e);
      };

      m.decode = function (b) {
        return 65 <= b && 90 >= b ? b - 65 : 97 <= b && 122 >= b ? b - 97 + 26 : 48 <= b && 57 >= b ? b - 48 + 52 : 43 == b ? 62 : 47 == b ? 63 : -1;
      };
    }, {}],
    13: [function (p, u, m) {
      function b(e, g, h, d, a, l) {
        var r = Math.floor((g - e) / 2) + e,
            q = a(h, d[r], !0);
        return 0 === q ? r : 0 < q ? 1 < g - r ? b(r, g, h, d, a, l) : l == m.LEAST_UPPER_BOUND ? g < d.length ? g : -1 : r : 1 < r - e ? b(e, r, h, d, a, l) : l == m.LEAST_UPPER_BOUND ? r : 0 > e ? -1 : e;
      }

      m.GREATEST_LOWER_BOUND = 1;
      m.LEAST_UPPER_BOUND = 2;

      m.search = function (e, g, h, d) {
        if (0 === g.length) return -1;
        e = b(-1, g.length, e, g, h, d || m.GREATEST_LOWER_BOUND);
        if (0 > e) return -1;

        for (; 0 <= e - 1 && 0 === h(g[e], g[e - 1], !0);) --e;

        return e;
      };
    }, {}],
    14: [function (p, u, m) {
      function b() {
        this._array = [];
        this._sorted = !0;
        this._last = {
          generatedLine: -1,
          generatedColumn: 0
        };
      }

      var e = p("./util");

      b.prototype.unsortedForEach = function (b, e) {
        this._array.forEach(b, e);
      };

      b.prototype.add = function (b) {
        var g = this._last,
            d = g.generatedLine,
            a = b.generatedLine,
            l = g.generatedColumn,
            r = b.generatedColumn;
        a > d || a == d && r >= l || 0 >= e.compareByGeneratedPositionsInflated(g, b) ? this._last = b : this._sorted = !1;

        this._array.push(b);
      };

      b.prototype.toArray = function () {
        this._sorted || (this._array.sort(e.compareByGeneratedPositionsInflated), this._sorted = !0);
        return this._array;
      };

      m.MappingList = b;
    }, {
      "./util": 19
    }],
    15: [function (p, u, m) {
      function b(b, e, d) {
        var a = b[e];
        b[e] = b[d];
        b[d] = a;
      }

      function e(g, h, d, a) {
        if (d < a) {
          var l = d - 1;
          b(g, Math.round(d + Math.random() * (a - d)), a);

          for (var r = g[a], q = d; q < a; q++) 0 >= h(g[q], r) && (l += 1, b(g, l, q));

          b(g, l + 1, q);
          l += 1;
          e(g, h, d, l - 1);
          e(g, h, l + 1, a);
        }
      }

      m.quickSort = function (b, h) {
        e(b, h, 0, b.length - 1);
      };
    }, {}],
    16: [function (p, u, m) {
      function b(a, b) {
        var c = a;
        "string" === typeof a && (c = d.parseSourceMapInput(a));
        return null != c.sections ? new h(c, b) : new e(c, b);
      }

      function e(a, b) {
        var c = a;
        "string" === typeof a && (c = d.parseSourceMapInput(a));
        var k = d.getArg(c, "version"),
            e = d.getArg(c, "sources"),
            w = d.getArg(c, "names", []),
            g = d.getArg(c, "sourceRoot", null),
            h = d.getArg(c, "sourcesContent", null),
            q = d.getArg(c, "mappings");
        c = d.getArg(c, "file", null);
        if (k != this._version) throw Error("Unsupported version: " + k);
        g && (g = d.normalize(g));
        e = e.map(String).map(d.normalize).map(function (a) {
          return g && d.isAbsolute(g) && d.isAbsolute(a) ? d.relative(g, a) : a;
        });
        this._names = l.fromArray(w.map(String), !0);
        this._sources = l.fromArray(e, !0);
        this.sourceRoot = g;
        this.sourcesContent = h;
        this._mappings = q;
        this._sourceMapURL = b;
        this.file = c;
      }

      function g() {
        this.generatedColumn = this.generatedLine = 0;
        this.name = this.originalColumn = this.originalLine = this.source = null;
      }

      function h(a, e) {
        var c = a;
        "string" === typeof a && (c = d.parseSourceMapInput(a));
        var k = d.getArg(c, "version");
        c = d.getArg(c, "sections");
        if (k != this._version) throw Error("Unsupported version: " + k);
        this._sources = new l();
        this._names = new l();
        var w = {
          line: -1,
          column: 0
        };
        this._sections = c.map(function (a) {
          if (a.url) throw Error("Support for url field in sections not implemented.");
          var c = d.getArg(a, "offset"),
              k = d.getArg(c, "line"),
              g = d.getArg(c, "column");
          if (k < w.line || k === w.line && g < w.column) throw Error("Section offsets must be ordered and non-overlapping.");
          w = c;
          return {
            generatedOffset: {
              generatedLine: k + 1,
              generatedColumn: g + 1
            },
            consumer: new b(d.getArg(a, "map"), e)
          };
        });
      }

      var d = p("./util"),
          a = p("./binary-search"),
          l = p("./array-set").ArraySet,
          r = p("./base64-vlq"),
          q = p("./quick-sort").quickSort;

      b.fromSourceMap = function (a) {
        return e.fromSourceMap(a);
      };

      b.prototype._version = 3;
      b.prototype.__generatedMappings = null;
      Object.defineProperty(b.prototype, "_generatedMappings", {
        configurable: !0,
        enumerable: !0,
        get: function () {
          this.__generatedMappings || this._parseMappings(this._mappings, this.sourceRoot);
          return this.__generatedMappings;
        }
      });
      b.prototype.__originalMappings = null;
      Object.defineProperty(b.prototype, "_originalMappings", {
        configurable: !0,
        enumerable: !0,
        get: function () {
          this.__originalMappings || this._parseMappings(this._mappings, this.sourceRoot);
          return this.__originalMappings;
        }
      });

      b.prototype._charIsMappingSeparator = function (a, b) {
        var c = a.charAt(b);
        return ";" === c || "," === c;
      };

      b.prototype._parseMappings = function (a, b) {
        throw Error("Subclasses must implement _parseMappings");
      };

      b.GENERATED_ORDER = 1;
      b.ORIGINAL_ORDER = 2;
      b.GREATEST_LOWER_BOUND = 1;
      b.LEAST_UPPER_BOUND = 2;

      b.prototype.eachMapping = function (a, e, c) {
        e = e || null;

        switch (c || b.GENERATED_ORDER) {
          case b.GENERATED_ORDER:
            c = this._generatedMappings;
            break;

          case b.ORIGINAL_ORDER:
            c = this._originalMappings;
            break;

          default:
            throw Error("Unknown order of iteration.");
        }

        var k = this.sourceRoot;
        c.map(function (a) {
          var b = null === a.source ? null : this._sources.at(a.source);
          b = d.computeSourceURL(k, b, this._sourceMapURL);
          return {
            source: b,
            generatedLine: a.generatedLine,
            generatedColumn: a.generatedColumn,
            originalLine: a.originalLine,
            originalColumn: a.originalColumn,
            name: null === a.name ? null : this._names.at(a.name)
          };
        }, this).forEach(a, e);
      };

      b.prototype.allGeneratedPositionsFor = function (b) {
        var e = d.getArg(b, "line"),
            c = {
          source: d.getArg(b, "source"),
          originalLine: e,
          originalColumn: d.getArg(b, "column", 0)
        };
        null != this.sourceRoot && (c.source = d.relative(this.sourceRoot, c.source));
        if (!this._sources.has(c.source)) return [];
        c.source = this._sources.indexOf(c.source);
        var k = [];
        c = this._findMapping(c, this._originalMappings, "originalLine", "originalColumn", d.compareByOriginalPositions, a.LEAST_UPPER_BOUND);

        if (0 <= c) {
          var g = this._originalMappings[c];
          if (void 0 === b.column) for (e = g.originalLine; g && g.originalLine === e;) k.push({
            line: d.getArg(g, "generatedLine", null),
            column: d.getArg(g, "generatedColumn", null),
            lastColumn: d.getArg(g, "lastGeneratedColumn", null)
          }), g = this._originalMappings[++c];else for (b = g.originalColumn; g && g.originalLine === e && g.originalColumn == b;) k.push({
            line: d.getArg(g, "generatedLine", null),
            column: d.getArg(g, "generatedColumn", null),
            lastColumn: d.getArg(g, "lastGeneratedColumn", null)
          }), g = this._originalMappings[++c];
        }

        return k;
      };

      m.SourceMapConsumer = b;
      e.prototype = Object.create(b.prototype);
      e.prototype.consumer = b;

      e.fromSourceMap = function (a, b) {
        var c = Object.create(e.prototype),
            k = c._names = l.fromArray(a._names.toArray(), !0),
            w = c._sources = l.fromArray(a._sources.toArray(), !0);
        c.sourceRoot = a._sourceRoot;
        c.sourcesContent = a._generateSourcesContent(c._sources.toArray(), c.sourceRoot);
        c.file = a._file;
        c._sourceMapURL = b;

        for (var h = a._mappings.toArray().slice(), r = c.__generatedMappings = [], m = c.__originalMappings = [], v = 0, p = h.length; v < p; v++) {
          var f = h[v],
              n = new g();
          n.generatedLine = f.generatedLine;
          n.generatedColumn = f.generatedColumn;
          f.source && (n.source = w.indexOf(f.source), n.originalLine = f.originalLine, n.originalColumn = f.originalColumn, f.name && (n.name = k.indexOf(f.name)), m.push(n));
          r.push(n);
        }

        q(c.__originalMappings, d.compareByOriginalPositions);
        return c;
      };

      e.prototype._version = 3;
      Object.defineProperty(e.prototype, "sources", {
        get: function () {
          return this._sources.toArray().map(function (a) {
            return d.computeSourceURL(this.sourceRoot, a, this._sourceMapURL);
          }, this);
        }
      });

      e.prototype._parseMappings = function (a, b) {
        for (var c = 1, k = 0, e = 0, l = 0, w = 0, h = 0, m = a.length, v = 0, f = {}, n = {}, p = [], u = [], y, B, A, E, I; v < m;) if (";" === a.charAt(v)) c++, v++, k = 0;else if ("," === a.charAt(v)) v++;else {
          y = new g();
          y.generatedLine = c;

          for (E = v; E < m && !this._charIsMappingSeparator(a, E); E++);

          B = a.slice(v, E);
          if (A = f[B]) v += B.length;else {
            for (A = []; v < E;) r.decode(a, v, n), I = n.value, v = n.rest, A.push(I);

            if (2 === A.length) throw Error("Found a source, but no line and column");
            if (3 === A.length) throw Error("Found a source and line, but no column");
            f[B] = A;
          }
          y.generatedColumn = k + A[0];
          k = y.generatedColumn;
          1 < A.length && (y.source = w + A[1], w += A[1], y.originalLine = e + A[2], e = y.originalLine, y.originalLine += 1, y.originalColumn = l + A[3], l = y.originalColumn, 4 < A.length && (y.name = h + A[4], h += A[4]));
          u.push(y);
          "number" === typeof y.originalLine && p.push(y);
        }

        q(u, d.compareByGeneratedPositionsDeflated);
        this.__generatedMappings = u;
        q(p, d.compareByOriginalPositions);
        this.__originalMappings = p;
      };

      e.prototype._findMapping = function (b, d, c, k, e, g) {
        if (0 >= b[c]) throw new TypeError("Line must be greater than or equal to 1, got " + b[c]);
        if (0 > b[k]) throw new TypeError("Column must be greater than or equal to 0, got " + b[k]);
        return a.search(b, d, e, g);
      };

      e.prototype.computeColumnSpans = function () {
        for (var a = 0; a < this._generatedMappings.length; ++a) {
          var b = this._generatedMappings[a];

          if (a + 1 < this._generatedMappings.length) {
            var c = this._generatedMappings[a + 1];

            if (b.generatedLine === c.generatedLine) {
              b.lastGeneratedColumn = c.generatedColumn - 1;
              continue;
            }
          }

          b.lastGeneratedColumn = Infinity;
        }
      };

      e.prototype.originalPositionFor = function (a) {
        var e = {
          generatedLine: d.getArg(a, "line"),
          generatedColumn: d.getArg(a, "column")
        };
        a = this._findMapping(e, this._generatedMappings, "generatedLine", "generatedColumn", d.compareByGeneratedPositionsDeflated, d.getArg(a, "bias", b.GREATEST_LOWER_BOUND));

        if (0 <= a && (a = this._generatedMappings[a], a.generatedLine === e.generatedLine)) {
          e = d.getArg(a, "source", null);
          null !== e && (e = this._sources.at(e), e = d.computeSourceURL(this.sourceRoot, e, this._sourceMapURL));
          var c = d.getArg(a, "name", null);
          null !== c && (c = this._names.at(c));
          return {
            source: e,
            line: d.getArg(a, "originalLine", null),
            column: d.getArg(a, "originalColumn", null),
            name: c
          };
        }

        return {
          source: null,
          line: null,
          column: null,
          name: null
        };
      };

      e.prototype.hasContentsOfAllSources = function () {
        return this.sourcesContent ? this.sourcesContent.length >= this._sources.size() && !this.sourcesContent.some(function (a) {
          return null == a;
        }) : !1;
      };

      e.prototype.sourceContentFor = function (a, b) {
        if (!this.sourcesContent) return null;
        var c = a;
        null != this.sourceRoot && (c = d.relative(this.sourceRoot, c));
        if (this._sources.has(c)) return this.sourcesContent[this._sources.indexOf(c)];
        var k = this.sources,
            e;

        for (e = 0; e < k.length; ++e) if (k[e] == a) return this.sourcesContent[e];

        var g;

        if (null != this.sourceRoot && (g = d.urlParse(this.sourceRoot))) {
          k = c.replace(/^file:\/\//, "");
          if ("file" == g.scheme && this._sources.has(k)) return this.sourcesContent[this._sources.indexOf(k)];
          if ((!g.path || "/" == g.path) && this._sources.has("/" + c)) return this.sourcesContent[this._sources.indexOf("/" + c)];
        }

        if (b) return null;
        throw Error('"' + c + '" is not in the SourceMap.');
      };

      e.prototype.generatedPositionFor = function (a) {
        var e = d.getArg(a, "source");
        null != this.sourceRoot && (e = d.relative(this.sourceRoot, e));
        if (!this._sources.has(e)) return {
          line: null,
          column: null,
          lastColumn: null
        };
        e = this._sources.indexOf(e);
        e = {
          source: e,
          originalLine: d.getArg(a, "line"),
          originalColumn: d.getArg(a, "column")
        };
        a = this._findMapping(e, this._originalMappings, "originalLine", "originalColumn", d.compareByOriginalPositions, d.getArg(a, "bias", b.GREATEST_LOWER_BOUND));
        return 0 <= a && (a = this._originalMappings[a], a.source === e.source) ? {
          line: d.getArg(a, "generatedLine", null),
          column: d.getArg(a, "generatedColumn", null),
          lastColumn: d.getArg(a, "lastGeneratedColumn", null)
        } : {
          line: null,
          column: null,
          lastColumn: null
        };
      };

      m.BasicSourceMapConsumer = e;
      h.prototype = Object.create(b.prototype);
      h.prototype.constructor = b;
      h.prototype._version = 3;
      Object.defineProperty(h.prototype, "sources", {
        get: function () {
          for (var a = [], b = 0; b < this._sections.length; b++) for (var c = 0; c < this._sections[b].consumer.sources.length; c++) a.push(this._sections[b].consumer.sources[c]);

          return a;
        }
      });

      h.prototype.originalPositionFor = function (b) {
        var e = {
          generatedLine: d.getArg(b, "line"),
          generatedColumn: d.getArg(b, "column")
        },
            c = a.search(e, this._sections, function (a, b) {
          var c = a.generatedLine - b.generatedOffset.generatedLine;
          return c ? c : a.generatedColumn - b.generatedOffset.generatedColumn;
        });
        return (c = this._sections[c]) ? c.consumer.originalPositionFor({
          line: e.generatedLine - (c.generatedOffset.generatedLine - 1),
          column: e.generatedColumn - (c.generatedOffset.generatedLine === e.generatedLine ? c.generatedOffset.generatedColumn - 1 : 0),
          bias: b.bias
        }) : {
          source: null,
          line: null,
          column: null,
          name: null
        };
      };

      h.prototype.hasContentsOfAllSources = function () {
        return this._sections.every(function (a) {
          return a.consumer.hasContentsOfAllSources();
        });
      };

      h.prototype.sourceContentFor = function (a, b) {
        for (var c = 0; c < this._sections.length; c++) {
          var d = this._sections[c].consumer.sourceContentFor(a, !0);

          if (d) return d;
        }

        if (b) return null;
        throw Error('"' + a + '" is not in the SourceMap.');
      };

      h.prototype.generatedPositionFor = function (a) {
        for (var b = 0; b < this._sections.length; b++) {
          var c = this._sections[b];

          if (-1 !== c.consumer.sources.indexOf(d.getArg(a, "source"))) {
            var k = c.consumer.generatedPositionFor(a);
            if (k) return {
              line: k.line + (c.generatedOffset.generatedLine - 1),
              column: k.column + (c.generatedOffset.generatedLine === k.line ? c.generatedOffset.generatedColumn - 1 : 0)
            };
          }
        }

        return {
          line: null,
          column: null
        };
      };

      h.prototype._parseMappings = function (a, b) {
        this.__generatedMappings = [];
        this.__originalMappings = [];

        for (var c = 0; c < this._sections.length; c++) for (var k = this._sections[c], e = k.consumer._generatedMappings, g = 0; g < e.length; g++) {
          var l = e[g],
              h = k.consumer._sources.at(l.source);

          h = d.computeSourceURL(k.consumer.sourceRoot, h, this._sourceMapURL);

          this._sources.add(h);

          h = this._sources.indexOf(h);
          var r = null;
          l.name && (r = k.consumer._names.at(l.name), this._names.add(r), r = this._names.indexOf(r));
          l = {
            source: h,
            generatedLine: l.generatedLine + (k.generatedOffset.generatedLine - 1),
            generatedColumn: l.generatedColumn + (k.generatedOffset.generatedLine === l.generatedLine ? k.generatedOffset.generatedColumn - 1 : 0),
            originalLine: l.originalLine,
            originalColumn: l.originalColumn,
            name: r
          };

          this.__generatedMappings.push(l);

          "number" === typeof l.originalLine && this.__originalMappings.push(l);
        }

        q(this.__generatedMappings, d.compareByGeneratedPositionsDeflated);
        q(this.__originalMappings, d.compareByOriginalPositions);
      };

      m.IndexedSourceMapConsumer = h;
    }, {
      "./array-set": 10,
      "./base64-vlq": 11,
      "./binary-search": 13,
      "./quick-sort": 15,
      "./util": 19
    }],
    17: [function (p, u, m) {
      function b(a) {
        a || (a = {});
        this._file = g.getArg(a, "file", null);
        this._sourceRoot = g.getArg(a, "sourceRoot", null);
        this._skipValidation = g.getArg(a, "skipValidation", !1);
        this._sources = new h();
        this._names = new h();
        this._mappings = new d();
        this._sourcesContents = null;
      }

      var e = p("./base64-vlq"),
          g = p("./util"),
          h = p("./array-set").ArraySet,
          d = p("./mapping-list").MappingList;
      b.prototype._version = 3;

      b.fromSourceMap = function (a) {
        var d = a.sourceRoot,
            e = new b({
          file: a.file,
          sourceRoot: d
        });
        a.eachMapping(function (a) {
          var b = {
            generated: {
              line: a.generatedLine,
              column: a.generatedColumn
            }
          };
          null != a.source && (b.source = a.source, null != d && (b.source = g.relative(d, b.source)), b.original = {
            line: a.originalLine,
            column: a.originalColumn
          }, null != a.name && (b.name = a.name));
          e.addMapping(b);
        });
        a.sources.forEach(function (b) {
          var l = b;
          null !== d && (l = g.relative(d, b));
          e._sources.has(l) || e._sources.add(l);
          l = a.sourceContentFor(b);
          null != l && e.setSourceContent(b, l);
        });
        return e;
      };

      b.prototype.addMapping = function (a) {
        var b = g.getArg(a, "generated"),
            d = g.getArg(a, "original", null),
            e = g.getArg(a, "source", null);
        a = g.getArg(a, "name", null);
        this._skipValidation || this._validateMapping(b, d, e, a);
        null != e && (e = String(e), this._sources.has(e) || this._sources.add(e));
        null != a && (a = String(a), this._names.has(a) || this._names.add(a));

        this._mappings.add({
          generatedLine: b.line,
          generatedColumn: b.column,
          originalLine: null != d && d.line,
          originalColumn: null != d && d.column,
          source: e,
          name: a
        });
      };

      b.prototype.setSourceContent = function (a, b) {
        var d = a;
        null != this._sourceRoot && (d = g.relative(this._sourceRoot, d));
        null != b ? (this._sourcesContents || (this._sourcesContents = Object.create(null)), this._sourcesContents[g.toSetString(d)] = b) : this._sourcesContents && (delete this._sourcesContents[g.toSetString(d)], 0 === Object.keys(this._sourcesContents).length && (this._sourcesContents = null));
      };

      b.prototype.applySourceMap = function (a, b, d) {
        var e = b;

        if (null == b) {
          if (null == a.file) throw Error('SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, or the source map\'s "file" property. Both were omitted.');
          e = a.file;
        }

        var l = this._sourceRoot;
        null != l && (e = g.relative(l, e));
        var m = new h(),
            c = new h();

        this._mappings.unsortedForEach(function (b) {
          if (b.source === e && null != b.originalLine) {
            var k = a.originalPositionFor({
              line: b.originalLine,
              column: b.originalColumn
            });
            null != k.source && (b.source = k.source, null != d && (b.source = g.join(d, b.source)), null != l && (b.source = g.relative(l, b.source)), b.originalLine = k.line, b.originalColumn = k.column, null != k.name && (b.name = k.name));
          }

          k = b.source;
          null == k || m.has(k) || m.add(k);
          b = b.name;
          null == b || c.has(b) || c.add(b);
        }, this);

        this._sources = m;
        this._names = c;
        a.sources.forEach(function (b) {
          var c = a.sourceContentFor(b);
          null != c && (null != d && (b = g.join(d, b)), null != l && (b = g.relative(l, b)), this.setSourceContent(b, c));
        }, this);
      };

      b.prototype._validateMapping = function (a, b, d, e) {
        if (b && "number" !== typeof b.line && "number" !== typeof b.column) throw Error("original.line and original.column are not numbers -- you probably meant to omit the original mapping entirely and only map the generated position. If so, pass null for the original mapping instead of an object with empty or null values.");
        if (!(a && "line" in a && "column" in a && 0 < a.line && 0 <= a.column && !b && !d && !e || a && "line" in a && "column" in a && b && "line" in b && "column" in b && 0 < a.line && 0 <= a.column && 0 < b.line && 0 <= b.column && d)) throw Error("Invalid mapping: " + JSON.stringify({
          generated: a,
          source: d,
          original: b,
          name: e
        }));
      };

      b.prototype._serializeMappings = function () {
        for (var a = 0, b = 1, d = 0, h = 0, m = 0, p = 0, c = "", k, x, z, F = this._mappings.toArray(), D = 0, t = F.length; D < t; D++) {
          x = F[D];
          k = "";
          if (x.generatedLine !== b) for (a = 0; x.generatedLine !== b;) k += ";", b++;else if (0 < D) {
            if (!g.compareByGeneratedPositionsInflated(x, F[D - 1])) continue;
            k += ",";
          }
          k += e.encode(x.generatedColumn - a);
          a = x.generatedColumn;
          null != x.source && (z = this._sources.indexOf(x.source), k += e.encode(z - p), p = z, k += e.encode(x.originalLine - 1 - h), h = x.originalLine - 1, k += e.encode(x.originalColumn - d), d = x.originalColumn, null != x.name && (x = this._names.indexOf(x.name), k += e.encode(x - m), m = x));
          c += k;
        }

        return c;
      };

      b.prototype._generateSourcesContent = function (a, b) {
        return a.map(function (a) {
          if (!this._sourcesContents) return null;
          null != b && (a = g.relative(b, a));
          a = g.toSetString(a);
          return Object.prototype.hasOwnProperty.call(this._sourcesContents, a) ? this._sourcesContents[a] : null;
        }, this);
      };

      b.prototype.toJSON = function () {
        var a = {
          version: this._version,
          sources: this._sources.toArray(),
          names: this._names.toArray(),
          mappings: this._serializeMappings()
        };
        null != this._file && (a.file = this._file);
        null != this._sourceRoot && (a.sourceRoot = this._sourceRoot);
        this._sourcesContents && (a.sourcesContent = this._generateSourcesContent(a.sources, a.sourceRoot));
        return a;
      };

      b.prototype.toString = function () {
        return JSON.stringify(this.toJSON());
      };

      m.SourceMapGenerator = b;
    }, {
      "./array-set": 10,
      "./base64-vlq": 11,
      "./mapping-list": 14,
      "./util": 19
    }],
    18: [function (p, u, m) {
      function b(b, a, e, g, h) {
        this.children = [];
        this.sourceContents = {};
        this.line = null == b ? null : b;
        this.column = null == a ? null : a;
        this.source = null == e ? null : e;
        this.name = null == h ? null : h;
        this.$$$isSourceNode$$$ = !0;
        null != g && this.add(g);
      }

      var e = p("./source-map-generator").SourceMapGenerator,
          g = p("./util"),
          h = /(\r?\n)/;

      b.fromStringWithSourceMap = function (d, a, e) {
        function l(a, c) {
          if (null === a || void 0 === a.source) m.add(c);else {
            var d = e ? g.join(e, a.source) : a.source;
            m.add(new b(a.originalLine, a.originalColumn, d, c, a.name));
          }
        }

        var m = new b(),
            p = d.split(h),
            v = 0,
            c = function () {
          var a = v < p.length ? p[v++] : void 0,
              b = (v < p.length ? p[v++] : void 0) || "";
          return a + b;
        },
            k = 1,
            x = 0,
            z = null;

        a.eachMapping(function (a) {
          if (null !== z) if (k < a.generatedLine) l(z, c()), k++, x = 0;else {
            var b = p[v] || "",
                d = b.substr(0, a.generatedColumn - x);
            p[v] = b.substr(a.generatedColumn - x);
            x = a.generatedColumn;
            l(z, d);
            z = a;
            return;
          }

          for (; k < a.generatedLine;) m.add(c()), k++;

          x < a.generatedColumn && (b = p[v] || "", m.add(b.substr(0, a.generatedColumn)), p[v] = b.substr(a.generatedColumn), x = a.generatedColumn);
          z = a;
        }, this);
        v < p.length && (z && l(z, c()), m.add(p.splice(v).join("")));
        a.sources.forEach(function (b) {
          var c = a.sourceContentFor(b);
          null != c && (null != e && (b = g.join(e, b)), m.setSourceContent(b, c));
        });
        return m;
      };

      b.prototype.add = function (b) {
        if (Array.isArray(b)) b.forEach(function (a) {
          this.add(a);
        }, this);else if (b.$$$isSourceNode$$$ || "string" === typeof b) b && this.children.push(b);else throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + b);
        return this;
      };

      b.prototype.prepend = function (b) {
        if (Array.isArray(b)) for (var a = b.length - 1; 0 <= a; a--) this.prepend(b[a]);else if (b.$$$isSourceNode$$$ || "string" === typeof b) this.children.unshift(b);else throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + b);
        return this;
      };

      b.prototype.walk = function (b) {
        for (var a, d = 0, e = this.children.length; d < e; d++) a = this.children[d], a.$$$isSourceNode$$$ ? a.walk(b) : "" !== a && b(a, {
          source: this.source,
          line: this.line,
          column: this.column,
          name: this.name
        });
      };

      b.prototype.join = function (b) {
        var a,
            d = this.children.length;

        if (0 < d) {
          var e = [];

          for (a = 0; a < d - 1; a++) e.push(this.children[a]), e.push(b);

          e.push(this.children[a]);
          this.children = e;
        }

        return this;
      };

      b.prototype.replaceRight = function (b, a) {
        var d = this.children[this.children.length - 1];
        d.$$$isSourceNode$$$ ? d.replaceRight(b, a) : "string" === typeof d ? this.children[this.children.length - 1] = d.replace(b, a) : this.children.push("".replace(b, a));
        return this;
      };

      b.prototype.setSourceContent = function (b, a) {
        this.sourceContents[g.toSetString(b)] = a;
      };

      b.prototype.walkSourceContents = function (b) {
        for (var a = 0, d = this.children.length; a < d; a++) this.children[a].$$$isSourceNode$$$ && this.children[a].walkSourceContents(b);

        var e = Object.keys(this.sourceContents);
        a = 0;

        for (d = e.length; a < d; a++) b(g.fromSetString(e[a]), this.sourceContents[e[a]]);
      };

      b.prototype.toString = function () {
        var b = "";
        this.walk(function (a) {
          b += a;
        });
        return b;
      };

      b.prototype.toStringWithSourceMap = function (b) {
        var a = "",
            d = 1,
            g = 0,
            h = new e(b),
            m = !1,
            p = null,
            c = null,
            k = null,
            x = null;
        this.walk(function (b, e) {
          a += b;
          null !== e.source && null !== e.line && null !== e.column ? (p === e.source && c === e.line && k === e.column && x === e.name || h.addMapping({
            source: e.source,
            original: {
              line: e.line,
              column: e.column
            },
            generated: {
              line: d,
              column: g
            },
            name: e.name
          }), p = e.source, c = e.line, k = e.column, x = e.name, m = !0) : m && (h.addMapping({
            generated: {
              line: d,
              column: g
            }
          }), p = null, m = !1);

          for (var l = 0, z = b.length; l < z; l++) 10 === b.charCodeAt(l) ? (d++, g = 0, l + 1 === z ? (p = null, m = !1) : m && h.addMapping({
            source: e.source,
            original: {
              line: e.line,
              column: e.column
            },
            generated: {
              line: d,
              column: g
            },
            name: e.name
          })) : g++;
        });
        this.walkSourceContents(function (a, b) {
          h.setSourceContent(a, b);
        });
        return {
          code: a,
          map: h
        };
      };

      m.SourceNode = b;
    }, {
      "./source-map-generator": 17,
      "./util": 19
    }],
    19: [function (p, u, m) {
      function b(a) {
        return (a = a.match(w)) ? {
          scheme: a[1],
          auth: a[2],
          host: a[3],
          port: a[4],
          path: a[5]
        } : null;
      }

      function e(a) {
        var b = "";
        a.scheme && (b += a.scheme + ":");
        b += "//";
        a.auth && (b += a.auth + "@");
        a.host && (b += a.host);
        a.port && (b += ":" + a.port);
        a.path && (b += a.path);
        return b;
      }

      function g(a) {
        var c = a,
            d = b(a);

        if (d) {
          if (!d.path) return a;
          c = d.path;
        }

        a = m.isAbsolute(c);
        c = c.split(/\/+/);

        for (var g, h = 0, l = c.length - 1; 0 <= l; l--) g = c[l], "." === g ? c.splice(l, 1) : ".." === g ? h++ : 0 < h && ("" === g ? (c.splice(l + 1, h), h = 0) : (c.splice(l, 2), h--));

        c = c.join("/");
        "" === c && (c = a ? "/" : ".");
        return d ? (d.path = c, e(d)) : c;
      }

      function h(a, d) {
        "" === a && (a = ".");
        "" === d && (d = ".");
        var c = b(d),
            k = b(a);
        k && (a = k.path || "/");
        if (c && !c.scheme) return k && (c.scheme = k.scheme), e(c);
        if (c || d.match(v)) return d;
        if (k && !k.host && !k.path) return k.host = d, e(k);
        c = "/" === d.charAt(0) ? d : g(a.replace(/\/+$/, "") + "/" + d);
        return k ? (k.path = c, e(k)) : c;
      }

      function d(a) {
        return a;
      }

      function a(a) {
        return r(a) ? "$" + a : a;
      }

      function l(a) {
        return r(a) ? a.slice(1) : a;
      }

      function r(a) {
        if (!a) return !1;
        var b = a.length;
        if (9 > b || 95 !== a.charCodeAt(b - 1) || 95 !== a.charCodeAt(b - 2) || 111 !== a.charCodeAt(b - 3) || 116 !== a.charCodeAt(b - 4) || 111 !== a.charCodeAt(b - 5) || 114 !== a.charCodeAt(b - 6) || 112 !== a.charCodeAt(b - 7) || 95 !== a.charCodeAt(b - 8) || 95 !== a.charCodeAt(b - 9)) return !1;

        for (b -= 10; 0 <= b; b--) if (36 !== a.charCodeAt(b)) return !1;

        return !0;
      }

      function q(a, b) {
        return a === b ? 0 : null === a ? 1 : null === b ? -1 : a > b ? 1 : -1;
      }

      m.getArg = function (a, b, d) {
        if (b in a) return a[b];
        if (3 === arguments.length) return d;
        throw Error('"' + b + '" is a required argument.');
      };

      var w = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/,
          v = /^data:.+,.+$/;
      m.urlParse = b;
      m.urlGenerate = e;
      m.normalize = g;
      m.join = h;

      m.isAbsolute = function (a) {
        return "/" === a.charAt(0) || w.test(a);
      };

      m.relative = function (a, b) {
        "" === a && (a = ".");
        a = a.replace(/\/$/, "");

        for (var c = 0; 0 !== b.indexOf(a + "/");) {
          var d = a.lastIndexOf("/");
          if (0 > d) return b;
          a = a.slice(0, d);
          if (a.match(/^([^\/]+:\/)?\/*$/)) return b;
          ++c;
        }

        return Array(c + 1).join("../") + b.substr(a.length + 1);
      };

      p = !("__proto__" in Object.create(null));
      m.toSetString = p ? d : a;
      m.fromSetString = p ? d : l;

      m.compareByOriginalPositions = function (a, b, d) {
        var c = q(a.source, b.source);
        if (0 !== c) return c;
        c = a.originalLine - b.originalLine;
        if (0 !== c) return c;
        c = a.originalColumn - b.originalColumn;
        if (0 !== c || d) return c;
        c = a.generatedColumn - b.generatedColumn;
        if (0 !== c) return c;
        c = a.generatedLine - b.generatedLine;
        return 0 !== c ? c : q(a.name, b.name);
      };

      m.compareByGeneratedPositionsDeflated = function (a, b, d) {
        var c = a.generatedLine - b.generatedLine;
        if (0 !== c) return c;
        c = a.generatedColumn - b.generatedColumn;
        if (0 !== c || d) return c;
        c = q(a.source, b.source);
        if (0 !== c) return c;
        c = a.originalLine - b.originalLine;
        if (0 !== c) return c;
        c = a.originalColumn - b.originalColumn;
        return 0 !== c ? c : q(a.name, b.name);
      };

      m.compareByGeneratedPositionsInflated = function (a, b) {
        var c = a.generatedLine - b.generatedLine;
        if (0 !== c) return c;
        c = a.generatedColumn - b.generatedColumn;
        if (0 !== c) return c;
        c = q(a.source, b.source);
        if (0 !== c) return c;
        c = a.originalLine - b.originalLine;
        if (0 !== c) return c;
        c = a.originalColumn - b.originalColumn;
        return 0 !== c ? c : q(a.name, b.name);
      };

      m.parseSourceMapInput = function (a) {
        return JSON.parse(a.replace(/^\)]}'[^\n]*\n/, ""));
      };

      m.computeSourceURL = function (a, d, l) {
        d = d || "";
        a && ("/" !== a[a.length - 1] && "/" !== d[0] && (a += "/"), d = a + d);

        if (l) {
          a = b(l);
          if (!a) throw Error("sourceMapURL could not be parsed");
          a.path && (l = a.path.lastIndexOf("/"), 0 <= l && (a.path = a.path.substring(0, l + 1)));
          d = h(e(a), d);
        }

        return g(d);
      };
    }, {}],
    20: [function (p, u, m) {
      m.SourceMapGenerator = p("./lib/source-map-generator").SourceMapGenerator;
      m.SourceMapConsumer = p("./lib/source-map-consumer").SourceMapConsumer;
      m.SourceNode = p("./lib/source-node").SourceNode;
    }, {
      "./lib/source-map-consumer": 16,
      "./lib/source-map-generator": 17,
      "./lib/source-node": 18
    }],
    21: [function (p, u, m) {
      (function (b) {
        function e() {
          return "browser" === f ? !0 : "node" === f ? !1 : "undefined" !== typeof window && "function" === typeof XMLHttpRequest && !(window.require && window.module && window.process && "renderer" === window.process.type);
        }

        function g(a) {
          return function (b) {
            for (var c = 0; c < a.length; c++) {
              var d = a[c](b);
              if (d) return d;
            }

            return null;
          };
        }

        function h(a, b) {
          if (!a) return b;
          var c = x.dirname(a),
              d = /^\w+:\/\/[^\/]*/.exec(c);
          d = d ? d[0] : "";
          var e = c.slice(d.length);
          return d && /^\/\w:/.test(e) ? (d += "/", d + x.resolve(c.slice(d.length), b).replace(/\\/g, "/")) : d + x.resolve(c.slice(d.length), b);
        }

        function d(a) {
          var b = C[a.source];

          if (!b) {
            var c = E(a.source);
            c ? (b = C[a.source] = {
              url: c.url,
              map: new k(c.map)
            }, b.map.sourcesContent && b.map.sources.forEach(function (a, c) {
              var d = b.map.sourcesContent[c];

              if (d) {
                var e = h(b.url, a);
                n[e] = d;
              }
            })) : b = C[a.source] = {
              url: null,
              map: null
            };
          }

          return b && b.map && "function" === typeof b.map.originalPositionFor && (c = b.map.originalPositionFor(a), null !== c.source) ? (c.source = h(b.url, c.source), c) : a;
        }

        function a(b) {
          var c = /^eval at ([^(]+) \((.+):(\d+):(\d+)\)$/.exec(b);
          return c ? (b = d({
            source: c[2],
            line: +c[3],
            column: c[4] - 1
          }), "eval at " + c[1] + " (" + b.source + ":" + b.line + ":" + (b.column + 1) + ")") : (c = /^eval at ([^(]+) \((.+)\)$/.exec(b)) ? "eval at " + c[1] + " (" + a(c[2]) + ")" : b;
        }

        function l() {
          var a = "";
          if (this.isNative()) a = "native";else {
            var b = this.getScriptNameOrSourceURL();
            !b && this.isEval() && (a = this.getEvalOrigin(), a += ", ");
            a = b ? a + b : a + "<anonymous>";
            b = this.getLineNumber();
            null != b && (a += ":" + b, (b = this.getColumnNumber()) && (a += ":" + b));
          }
          b = "";
          var c = this.getFunctionName(),
              d = !0,
              e = this.isConstructor();
          if (this.isToplevel() || e) e ? b += "new " + (c || "<anonymous>") : c ? b += c : (b += a, d = !1);else {
            e = this.getTypeName();
            "[object Object]" === e && (e = "null");
            var f = this.getMethodName();
            c ? (e && 0 != c.indexOf(e) && (b += e + "."), b += c, f && c.indexOf("." + f) != c.length - f.length - 1 && (b += " [as " + f + "]")) : b += e + "." + (f || "<anonymous>");
          }
          d && (b += " (" + a + ")");
          return b;
        }

        function r(a) {
          var b = {};
          Object.getOwnPropertyNames(Object.getPrototypeOf(a)).forEach(function (c) {
            b[c] = /^(?:is|get)/.test(c) ? function () {
              return a[c].call(a);
            } : a[c];
          });
          b.toString = l;
          return b;
        }

        function q(c, f) {
          void 0 === f && (f = {
            nextPosition: null,
            curPosition: null
          });
          if (c.isNative()) return f.curPosition = null, c;
          var g = c.getFileName() || c.getScriptNameOrSourceURL();

          if (g) {
            var h = c.getLineNumber(),
                k = c.getColumnNumber() - 1,
                l = /^v(10\.1[6-9]|10\.[2-9][0-9]|10\.[0-9]{3,}|1[2-9]\d*|[2-9]\d|\d{3,}|11\.11)/.test(b.version) ? 0 : 62;
            1 === h && k > l && !e() && !c.isEval() && (k -= l);
            var m = d({
              source: g,
              line: h,
              column: k
            });
            f.curPosition = m;
            c = r(c);
            var p = c.getFunctionName;

            c.getFunctionName = function () {
              return null == f.nextPosition ? p() : f.nextPosition.name || p();
            };

            c.getFileName = function () {
              return m.source;
            };

            c.getLineNumber = function () {
              return m.line;
            };

            c.getColumnNumber = function () {
              return m.column + 1;
            };

            c.getScriptNameOrSourceURL = function () {
              return m.source;
            };

            return c;
          }

          var n = c.isEval() && c.getEvalOrigin();
          n && (n = a(n), c = r(c), c.getEvalOrigin = function () {
            return n;
          });
          return c;
        }

        function w(a, b) {
          H && (n = {}, C = {});

          for (var c = (a.name || "Error") + ": " + (a.message || ""), d = {
            nextPosition: null,
            curPosition: null
          }, e = [], f = b.length - 1; 0 <= f; f--) e.push("\n    at " + q(b[f], d)), d.nextPosition = d.curPosition;

          d.curPosition = d.nextPosition = null;
          return c + e.reverse().join("");
        }

        function v(a) {
          var b = /\n    at [^(]+ \((.*):(\d+):(\d+)\)/.exec(a.stack);

          if (b) {
            a = b[1];
            var c = +b[2];
            b = +b[3];
            var d = n[a];
            if (!d && u && u.existsSync(a)) try {
              d = u.readFileSync(a, "utf8");
            } catch (N) {
              d = "";
            }
            if (d && (d = d.split(/(?:\r\n|\r|\n)/)[c - 1])) return a + ":" + c + "\n" + d + "\n" + Array(b).join(" ") + "^";
          }

          return null;
        }

        function c() {
          var a = b.emit;

          b.emit = function (c) {
            if ("uncaughtException" === c) {
              var d = arguments[1] && arguments[1].stack,
                  e = 0 < this.listeners(c).length;

              if (d && !e) {
                d = arguments[1];
                e = v(d);
                b.stderr._handle && b.stderr._handle.setBlocking && b.stderr._handle.setBlocking(!0);
                e && (console.error(), console.error(e));
                console.error(d.stack);
                b.exit(1);
                return;
              }
            }

            return a.apply(this, arguments);
          };
        }

        var k = p("source-map").SourceMapConsumer,
            x = p("path");

        try {
          var u = p("fs");
          u.existsSync && u.readFileSync || (u = null);
        } catch (M) {}

        var F = p("buffer-from"),
            D = !1,
            t = !1,
            H = !1,
            f = "auto",
            n = {},
            C = {},
            G = /^data:application\/json[^,]+base64,/,
            y = [],
            B = [],
            A = g(y);
        y.push(function (a) {
          a = a.trim();
          /^file:/.test(a) && (a = a.replace(/file:\/\/\/(\w:)?/, function (a, b) {
            return b ? "" : "/";
          }));
          if (a in n) return n[a];
          var b = "";

          try {
            if (u) u.existsSync(a) && (b = u.readFileSync(a, "utf8"));else {
              var c = new XMLHttpRequest();
              c.open("GET", a, !1);
              c.send(null);
              4 === c.readyState && 200 === c.status && (b = c.responseText);
            }
          } catch (K) {}

          return n[a] = b;
        });
        var E = g(B);
        B.push(function (a) {
          a: {
            if (e()) try {
              var b = new XMLHttpRequest();
              b.open("GET", a, !1);
              b.send(null);
              var c = b.getResponseHeader("SourceMap") || b.getResponseHeader("X-SourceMap");

              if (c) {
                var d = c;
                break a;
              }
            } catch (O) {}
            d = A(a);
            b = /(?:\/\/[@#][\s]*sourceMappingURL=([^\s'"]+)[\s]*$)|(?:\/\*[@#][\s]*sourceMappingURL=([^\s*'"]+)[\s]*(?:\*\/)[\s]*$)/mg;

            for (var f; c = b.exec(d);) f = c;

            d = f ? f[1] : null;
          }

          if (!d) return null;
          G.test(d) ? (f = d.slice(d.indexOf(",") + 1), f = F(f, "base64").toString(), d = a) : (d = h(a, d), f = A(d));
          return f ? {
            url: d,
            map: f
          } : null;
        });
        var I = y.slice(0),
            L = B.slice(0);
        m.wrapCallSite = q;
        m.getErrorSource = v;
        m.mapSourcePosition = d;
        m.retrieveSourceMap = E;

        m.install = function (a) {
          a = a || {};
          if (a.environment && (f = a.environment, -1 === ["node", "browser", "auto"].indexOf(f))) throw Error("environment " + f + " was unknown. Available options are {auto, browser, node}");
          a.retrieveFile && (a.overrideRetrieveFile && (y.length = 0), y.unshift(a.retrieveFile));
          a.retrieveSourceMap && (a.overrideRetrieveSourceMap && (B.length = 0), B.unshift(a.retrieveSourceMap));

          if (a.hookRequire && !e()) {
            try {
              var d = p("module");
            } catch (K) {}

            var g = d.prototype._compile;
            g.__sourceMapSupport || (d.prototype._compile = function (a, b) {
              n[b] = a;
              C[b] = void 0;
              return g.call(this, a, b);
            }, d.prototype._compile.__sourceMapSupport = !0);
          }

          H || (H = "emptyCacheBetweenOperations" in a ? a.emptyCacheBetweenOperations : !1);
          D || (D = !0, Error.prepareStackTrace = w);
          !t && ("handleUncaughtExceptions" in a ? a.handleUncaughtExceptions : 1) && "object" === typeof b && null !== b && "function" === typeof b.on && (t = !0, c());
        };

        m.resetRetrieveHandlers = function () {
          y.length = 0;
          B.length = 0;
          y = I.slice(0);
          B = L.slice(0);
          E = g(B);
          A = g(y);
        };
      }).call(this, p("g5I+bs"));
    }, {
      "buffer-from": 4,
      fs: 3,
      "g5I+bs": 9,
      module: 3,
      path: 8,
      "source-map": 20
    }]
  }, {}, [1]);

  return G;
});
//# sourceMappingURL=browser-source-map-support.js.map