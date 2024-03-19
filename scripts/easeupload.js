var z = function(s, f, u) {
  return f === void 0 && (f = 0), u === void 0 && (u = 1), "".concat(s.slice(f, u).toUpperCase()).concat(s.slice(u));
};
function P(s, f) {
  return Object.is(s, f);
}
function U(s, f) {
  for (; Object.getPrototypeOf(s); )
    if (s = Object.getPrototypeOf(s), (s == null ? void 0 : s.constructor) === f)
      return !0;
  return !1;
}
function S(s) {
  return !!Number.isInteger(s);
}
function M(s, f) {
  if (!U(f, Array) || !S(s))
    return !1;
  var u = f[0], h = f[1];
  return u <= s && h >= s;
}
function N(s) {
  return !!s;
}
function j(s, f) {
  if (Object.is(s, f))
    return !0;
  if (typeof s != "object" || typeof f != "object" || (s == null ? void 0 : s.constructor) !== (f == null ? void 0 : f.constructor) || [s, f].includes(null))
    return !1;
  var u = Object.keys(s), h = Object.keys(f);
  return u.length !== h.length ? !1 : u.every(function(a) {
    return j(s[a], f[a]);
  });
}
function x(s, f) {
  return f.includes(s) ? !0 : f.findIndex(function(u) {
    return j(u, s);
  }) > -1;
}
function V(s) {
  return S(s) ? s > 0 : !1;
}
var $ = [null, void 0, !1, NaN];
function D(s) {
  return !$.includes(s);
}
const K = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  equal: P,
  inRange: M,
  int: S,
  ok: N,
  oneOf: x,
  positiveInt: V,
  shallowEq: j,
  truth: D,
  typeOf: U
}, Symbol.toStringTag, { value: "Module" }));
var R = /* @__PURE__ */ function() {
  var s = function(f, u) {
    return s = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(h, a) {
      h.__proto__ = a;
    } || function(h, a) {
      for (var c in a)
        Object.prototype.hasOwnProperty.call(a, c) && (h[c] = a[c]);
    }, s(f, u);
  };
  return function(f, u) {
    if (typeof u != "function" && u !== null)
      throw new TypeError("Class extends value " + String(u) + " is not a constructor or null");
    s(f, u);
    function h() {
      this.constructor = f;
    }
    f.prototype = u === null ? Object.create(u) : (h.prototype = u.prototype, new h());
  };
}(), C = (
  /** @class */
  function(s) {
    R(f, s);
    function f() {
      var u = s !== null && s.apply(this, arguments) || this;
      return u.name = "AssertTiny", u;
    }
    return f;
  }(Error)
), q = function() {
  return (
    /** @class */
    function() {
      function s() {
        var f = this;
        this.SLIENT = !1, this.NOT = !1, this.value = function(u) {
          return f.VALUE = u, f;
        };
      }
      return s.prototype.result = function(f, u, h) {
        if (!(f && !this.NOT) && !(!f && this.NOT)) {
          var a = u ? "".concat(u) : "".concat(h, " assert error");
          if (this.SLIENT && console.warn(new C(a)), !this.SLIENT)
            throw new C(a);
        }
      }, Object.defineProperty(s.prototype, "not", {
        get: function() {
          return this.NOT = !0, this;
        },
        enumerable: !1,
        configurable: !0
      }), Object.defineProperty(s.prototype, "slient", {
        get: function() {
          return this.SLIENT = !0, this;
        },
        enumerable: !1,
        configurable: !0
      }), s;
    }()
  );
}, G = function(s) {
  var f = q(), u = Object.getPrototypeOf(new f()), h = Object.assign(s || {}, K), a = Object.keys(h).reduce(function(c, l) {
    var p = "is".concat(z(l));
    return c[p] = function(d, _) {
      var g = this;
      s[l](g.VALUE, d) ? g.result(!0, _, p) : g.result(!1, _, p);
    }, c;
  }, {});
  return Object.assign(u, a), function(c) {
    return new f().value(c);
  };
};
const w = G({});
var W = (
  /** @class */
  /* @__PURE__ */ function() {
    function s() {
      var f = this;
      this.eventBus = {}, this.on = function(u, h) {
        w(u).isTypeOf(String, "eventName must be a string"), w(h).isTypeOf(Function, "callback must be a funtion");
        var a = f.eventBus;
        return Array.isArray(a[u]) ? a[u].push(h) : a[u] = [h], f;
      }, this.emit = function(u, h) {
        w(u).isTypeOf(String, "eventName must be a string");
        var a = f.eventBus;
        Array.isArray(a[u]) && a[u].forEach(function(c) {
          return c(h);
        });
      }, this.off = function(u, h) {
        w(u).isTypeOf(String, "eventName must be a string"), w(h).isTypeOf(Function, "callback must be a funtion");
        var a = f.eventBus;
        Array.isArray(a[u]) && (a[u] = a[u].filter(function(c) {
          return h !== c;
        }));
      }, this.once = function(u, h) {
        w(u).isTypeOf(String, "eventName must be a string"), w(h).isTypeOf(Function, "callback must be a funtion");
        var a = function() {
          for (var c = [], l = 0; l < arguments.length; l++)
            c[l] = arguments[l];
          h.apply(void 0, c), f.off(u, a);
        };
        f.on(u, a);
      };
    }
    return s;
  }()
);
const H = (s, f = 5) => {
  const u = f * 1024 * 1024, h = [];
  let a = 0, c = 0;
  const l = Math.ceil(s.size / u);
  for (; a < s.size; )
    h.push({
      file: s.slice(a, a + u),
      allSize: s.size,
      id: "",
      size: u,
      chunksNum: l,
      index: c,
      offset: a
    }), a += u, c++;
  return h;
};
function J(s) {
  return s && s.__esModule && Object.prototype.hasOwnProperty.call(s, "default") ? s.default : s;
}
var F = { exports: {} };
(function(s, f) {
  (function(u) {
    s.exports = u();
  })(function(u) {
    var h = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
    function a(o, i) {
      var e = o[0], t = o[1], n = o[2], r = o[3];
      e += (t & n | ~t & r) + i[0] - 680876936 | 0, e = (e << 7 | e >>> 25) + t | 0, r += (e & t | ~e & n) + i[1] - 389564586 | 0, r = (r << 12 | r >>> 20) + e | 0, n += (r & e | ~r & t) + i[2] + 606105819 | 0, n = (n << 17 | n >>> 15) + r | 0, t += (n & r | ~n & e) + i[3] - 1044525330 | 0, t = (t << 22 | t >>> 10) + n | 0, e += (t & n | ~t & r) + i[4] - 176418897 | 0, e = (e << 7 | e >>> 25) + t | 0, r += (e & t | ~e & n) + i[5] + 1200080426 | 0, r = (r << 12 | r >>> 20) + e | 0, n += (r & e | ~r & t) + i[6] - 1473231341 | 0, n = (n << 17 | n >>> 15) + r | 0, t += (n & r | ~n & e) + i[7] - 45705983 | 0, t = (t << 22 | t >>> 10) + n | 0, e += (t & n | ~t & r) + i[8] + 1770035416 | 0, e = (e << 7 | e >>> 25) + t | 0, r += (e & t | ~e & n) + i[9] - 1958414417 | 0, r = (r << 12 | r >>> 20) + e | 0, n += (r & e | ~r & t) + i[10] - 42063 | 0, n = (n << 17 | n >>> 15) + r | 0, t += (n & r | ~n & e) + i[11] - 1990404162 | 0, t = (t << 22 | t >>> 10) + n | 0, e += (t & n | ~t & r) + i[12] + 1804603682 | 0, e = (e << 7 | e >>> 25) + t | 0, r += (e & t | ~e & n) + i[13] - 40341101 | 0, r = (r << 12 | r >>> 20) + e | 0, n += (r & e | ~r & t) + i[14] - 1502002290 | 0, n = (n << 17 | n >>> 15) + r | 0, t += (n & r | ~n & e) + i[15] + 1236535329 | 0, t = (t << 22 | t >>> 10) + n | 0, e += (t & r | n & ~r) + i[1] - 165796510 | 0, e = (e << 5 | e >>> 27) + t | 0, r += (e & n | t & ~n) + i[6] - 1069501632 | 0, r = (r << 9 | r >>> 23) + e | 0, n += (r & t | e & ~t) + i[11] + 643717713 | 0, n = (n << 14 | n >>> 18) + r | 0, t += (n & e | r & ~e) + i[0] - 373897302 | 0, t = (t << 20 | t >>> 12) + n | 0, e += (t & r | n & ~r) + i[5] - 701558691 | 0, e = (e << 5 | e >>> 27) + t | 0, r += (e & n | t & ~n) + i[10] + 38016083 | 0, r = (r << 9 | r >>> 23) + e | 0, n += (r & t | e & ~t) + i[15] - 660478335 | 0, n = (n << 14 | n >>> 18) + r | 0, t += (n & e | r & ~e) + i[4] - 405537848 | 0, t = (t << 20 | t >>> 12) + n | 0, e += (t & r | n & ~r) + i[9] + 568446438 | 0, e = (e << 5 | e >>> 27) + t | 0, r += (e & n | t & ~n) + i[14] - 1019803690 | 0, r = (r << 9 | r >>> 23) + e | 0, n += (r & t | e & ~t) + i[3] - 187363961 | 0, n = (n << 14 | n >>> 18) + r | 0, t += (n & e | r & ~e) + i[8] + 1163531501 | 0, t = (t << 20 | t >>> 12) + n | 0, e += (t & r | n & ~r) + i[13] - 1444681467 | 0, e = (e << 5 | e >>> 27) + t | 0, r += (e & n | t & ~n) + i[2] - 51403784 | 0, r = (r << 9 | r >>> 23) + e | 0, n += (r & t | e & ~t) + i[7] + 1735328473 | 0, n = (n << 14 | n >>> 18) + r | 0, t += (n & e | r & ~e) + i[12] - 1926607734 | 0, t = (t << 20 | t >>> 12) + n | 0, e += (t ^ n ^ r) + i[5] - 378558 | 0, e = (e << 4 | e >>> 28) + t | 0, r += (e ^ t ^ n) + i[8] - 2022574463 | 0, r = (r << 11 | r >>> 21) + e | 0, n += (r ^ e ^ t) + i[11] + 1839030562 | 0, n = (n << 16 | n >>> 16) + r | 0, t += (n ^ r ^ e) + i[14] - 35309556 | 0, t = (t << 23 | t >>> 9) + n | 0, e += (t ^ n ^ r) + i[1] - 1530992060 | 0, e = (e << 4 | e >>> 28) + t | 0, r += (e ^ t ^ n) + i[4] + 1272893353 | 0, r = (r << 11 | r >>> 21) + e | 0, n += (r ^ e ^ t) + i[7] - 155497632 | 0, n = (n << 16 | n >>> 16) + r | 0, t += (n ^ r ^ e) + i[10] - 1094730640 | 0, t = (t << 23 | t >>> 9) + n | 0, e += (t ^ n ^ r) + i[13] + 681279174 | 0, e = (e << 4 | e >>> 28) + t | 0, r += (e ^ t ^ n) + i[0] - 358537222 | 0, r = (r << 11 | r >>> 21) + e | 0, n += (r ^ e ^ t) + i[3] - 722521979 | 0, n = (n << 16 | n >>> 16) + r | 0, t += (n ^ r ^ e) + i[6] + 76029189 | 0, t = (t << 23 | t >>> 9) + n | 0, e += (t ^ n ^ r) + i[9] - 640364487 | 0, e = (e << 4 | e >>> 28) + t | 0, r += (e ^ t ^ n) + i[12] - 421815835 | 0, r = (r << 11 | r >>> 21) + e | 0, n += (r ^ e ^ t) + i[15] + 530742520 | 0, n = (n << 16 | n >>> 16) + r | 0, t += (n ^ r ^ e) + i[2] - 995338651 | 0, t = (t << 23 | t >>> 9) + n | 0, e += (n ^ (t | ~r)) + i[0] - 198630844 | 0, e = (e << 6 | e >>> 26) + t | 0, r += (t ^ (e | ~n)) + i[7] + 1126891415 | 0, r = (r << 10 | r >>> 22) + e | 0, n += (e ^ (r | ~t)) + i[14] - 1416354905 | 0, n = (n << 15 | n >>> 17) + r | 0, t += (r ^ (n | ~e)) + i[5] - 57434055 | 0, t = (t << 21 | t >>> 11) + n | 0, e += (n ^ (t | ~r)) + i[12] + 1700485571 | 0, e = (e << 6 | e >>> 26) + t | 0, r += (t ^ (e | ~n)) + i[3] - 1894986606 | 0, r = (r << 10 | r >>> 22) + e | 0, n += (e ^ (r | ~t)) + i[10] - 1051523 | 0, n = (n << 15 | n >>> 17) + r | 0, t += (r ^ (n | ~e)) + i[1] - 2054922799 | 0, t = (t << 21 | t >>> 11) + n | 0, e += (n ^ (t | ~r)) + i[8] + 1873313359 | 0, e = (e << 6 | e >>> 26) + t | 0, r += (t ^ (e | ~n)) + i[15] - 30611744 | 0, r = (r << 10 | r >>> 22) + e | 0, n += (e ^ (r | ~t)) + i[6] - 1560198380 | 0, n = (n << 15 | n >>> 17) + r | 0, t += (r ^ (n | ~e)) + i[13] + 1309151649 | 0, t = (t << 21 | t >>> 11) + n | 0, e += (n ^ (t | ~r)) + i[4] - 145523070 | 0, e = (e << 6 | e >>> 26) + t | 0, r += (t ^ (e | ~n)) + i[11] - 1120210379 | 0, r = (r << 10 | r >>> 22) + e | 0, n += (e ^ (r | ~t)) + i[2] + 718787259 | 0, n = (n << 15 | n >>> 17) + r | 0, t += (r ^ (n | ~e)) + i[9] - 343485551 | 0, t = (t << 21 | t >>> 11) + n | 0, o[0] = e + o[0] | 0, o[1] = t + o[1] | 0, o[2] = n + o[2] | 0, o[3] = r + o[3] | 0;
    }
    function c(o) {
      var i = [], e;
      for (e = 0; e < 64; e += 4)
        i[e >> 2] = o.charCodeAt(e) + (o.charCodeAt(e + 1) << 8) + (o.charCodeAt(e + 2) << 16) + (o.charCodeAt(e + 3) << 24);
      return i;
    }
    function l(o) {
      var i = [], e;
      for (e = 0; e < 64; e += 4)
        i[e >> 2] = o[e] + (o[e + 1] << 8) + (o[e + 2] << 16) + (o[e + 3] << 24);
      return i;
    }
    function p(o) {
      var i = o.length, e = [1732584193, -271733879, -1732584194, 271733878], t, n, r, b, A, v;
      for (t = 64; t <= i; t += 64)
        a(e, c(o.substring(t - 64, t)));
      for (o = o.substring(t - 64), n = o.length, r = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], t = 0; t < n; t += 1)
        r[t >> 2] |= o.charCodeAt(t) << (t % 4 << 3);
      if (r[t >> 2] |= 128 << (t % 4 << 3), t > 55)
        for (a(e, r), t = 0; t < 16; t += 1)
          r[t] = 0;
      return b = i * 8, b = b.toString(16).match(/(.*?)(.{0,8})$/), A = parseInt(b[2], 16), v = parseInt(b[1], 16) || 0, r[14] = A, r[15] = v, a(e, r), e;
    }
    function d(o) {
      var i = o.length, e = [1732584193, -271733879, -1732584194, 271733878], t, n, r, b, A, v;
      for (t = 64; t <= i; t += 64)
        a(e, l(o.subarray(t - 64, t)));
      for (o = t - 64 < i ? o.subarray(t - 64) : new Uint8Array(0), n = o.length, r = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], t = 0; t < n; t += 1)
        r[t >> 2] |= o[t] << (t % 4 << 3);
      if (r[t >> 2] |= 128 << (t % 4 << 3), t > 55)
        for (a(e, r), t = 0; t < 16; t += 1)
          r[t] = 0;
      return b = i * 8, b = b.toString(16).match(/(.*?)(.{0,8})$/), A = parseInt(b[2], 16), v = parseInt(b[1], 16) || 0, r[14] = A, r[15] = v, a(e, r), e;
    }
    function _(o) {
      var i = "", e;
      for (e = 0; e < 4; e += 1)
        i += h[o >> e * 8 + 4 & 15] + h[o >> e * 8 & 15];
      return i;
    }
    function g(o) {
      var i;
      for (i = 0; i < o.length; i += 1)
        o[i] = _(o[i]);
      return o.join("");
    }
    g(p("hello")), typeof ArrayBuffer < "u" && !ArrayBuffer.prototype.slice && function() {
      function o(i, e) {
        return i = i | 0 || 0, i < 0 ? Math.max(i + e, 0) : Math.min(i, e);
      }
      ArrayBuffer.prototype.slice = function(i, e) {
        var t = this.byteLength, n = o(i, t), r = t, b, A, v, T;
        return e !== u && (r = o(e, t)), n > r ? new ArrayBuffer(0) : (b = r - n, A = new ArrayBuffer(b), v = new Uint8Array(A), T = new Uint8Array(this, n, b), v.set(T), A);
      };
    }();
    function m(o) {
      return /[\u0080-\uFFFF]/.test(o) && (o = unescape(encodeURIComponent(o))), o;
    }
    function E(o, i) {
      var e = o.length, t = new ArrayBuffer(e), n = new Uint8Array(t), r;
      for (r = 0; r < e; r += 1)
        n[r] = o.charCodeAt(r);
      return i ? n : t;
    }
    function I(o) {
      return String.fromCharCode.apply(null, new Uint8Array(o));
    }
    function L(o, i, e) {
      var t = new Uint8Array(o.byteLength + i.byteLength);
      return t.set(new Uint8Array(o)), t.set(new Uint8Array(i), o.byteLength), e ? t : t.buffer;
    }
    function O(o) {
      var i = [], e = o.length, t;
      for (t = 0; t < e - 1; t += 2)
        i.push(parseInt(o.substr(t, 2), 16));
      return String.fromCharCode.apply(String, i);
    }
    function y() {
      this.reset();
    }
    return y.prototype.append = function(o) {
      return this.appendBinary(m(o)), this;
    }, y.prototype.appendBinary = function(o) {
      this._buff += o, this._length += o.length;
      var i = this._buff.length, e;
      for (e = 64; e <= i; e += 64)
        a(this._hash, c(this._buff.substring(e - 64, e)));
      return this._buff = this._buff.substring(e - 64), this;
    }, y.prototype.end = function(o) {
      var i = this._buff, e = i.length, t, n = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], r;
      for (t = 0; t < e; t += 1)
        n[t >> 2] |= i.charCodeAt(t) << (t % 4 << 3);
      return this._finish(n, e), r = g(this._hash), o && (r = O(r)), this.reset(), r;
    }, y.prototype.reset = function() {
      return this._buff = "", this._length = 0, this._hash = [1732584193, -271733879, -1732584194, 271733878], this;
    }, y.prototype.getState = function() {
      return {
        buff: this._buff,
        length: this._length,
        hash: this._hash.slice()
      };
    }, y.prototype.setState = function(o) {
      return this._buff = o.buff, this._length = o.length, this._hash = o.hash, this;
    }, y.prototype.destroy = function() {
      delete this._hash, delete this._buff, delete this._length;
    }, y.prototype._finish = function(o, i) {
      var e = i, t, n, r;
      if (o[e >> 2] |= 128 << (e % 4 << 3), e > 55)
        for (a(this._hash, o), e = 0; e < 16; e += 1)
          o[e] = 0;
      t = this._length * 8, t = t.toString(16).match(/(.*?)(.{0,8})$/), n = parseInt(t[2], 16), r = parseInt(t[1], 16) || 0, o[14] = n, o[15] = r, a(this._hash, o);
    }, y.hash = function(o, i) {
      return y.hashBinary(m(o), i);
    }, y.hashBinary = function(o, i) {
      var e = p(o), t = g(e);
      return i ? O(t) : t;
    }, y.ArrayBuffer = function() {
      this.reset();
    }, y.ArrayBuffer.prototype.append = function(o) {
      var i = L(this._buff.buffer, o, !0), e = i.length, t;
      for (this._length += o.byteLength, t = 64; t <= e; t += 64)
        a(this._hash, l(i.subarray(t - 64, t)));
      return this._buff = t - 64 < e ? new Uint8Array(i.buffer.slice(t - 64)) : new Uint8Array(0), this;
    }, y.ArrayBuffer.prototype.end = function(o) {
      var i = this._buff, e = i.length, t = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], n, r;
      for (n = 0; n < e; n += 1)
        t[n >> 2] |= i[n] << (n % 4 << 3);
      return this._finish(t, e), r = g(this._hash), o && (r = O(r)), this.reset(), r;
    }, y.ArrayBuffer.prototype.reset = function() {
      return this._buff = new Uint8Array(0), this._length = 0, this._hash = [1732584193, -271733879, -1732584194, 271733878], this;
    }, y.ArrayBuffer.prototype.getState = function() {
      var o = y.prototype.getState.call(this);
      return o.buff = I(o.buff), o;
    }, y.ArrayBuffer.prototype.setState = function(o) {
      return o.buff = E(o.buff, !0), y.prototype.setState.call(this, o);
    }, y.ArrayBuffer.prototype.destroy = y.prototype.destroy, y.ArrayBuffer.prototype._finish = y.prototype._finish, y.ArrayBuffer.hash = function(o, i) {
      var e = d(new Uint8Array(o)), t = g(e);
      return i ? O(t) : t;
    }, y;
  });
})(F);
var Q = F.exports;
const X = /* @__PURE__ */ J(Q), Y = (s) => new Promise((f) => {
  const u = [];
  for (const l in s)
    if (l === "0" || l === s.length - 1 + "")
      u.push(s[l]);
    else {
      const p = s[l].file;
      u.push({ ...s[l], file: p.slice(0, 2) }), u.push({ ...s[l], file: p.slice(p.size / 2, p.size / 2 + 2) }), u.push({ ...s[l], file: p.slice(p.size, p.size + 2) });
    }
  const h = new X(), a = (/* @__PURE__ */ new Date()).valueOf(), c = (l) => {
    if (l >= u.length) {
      const _ = h.end(!1);
      console.log("用时：", ((/* @__PURE__ */ new Date()).valueOf() - a) / 1e3), f(_);
      return;
    }
    const p = u[l].file, d = new FileReader();
    d.onload = (_) => {
      const g = _.target.result;
      g && h.append(g), c(l + 1);
    }, d.readAsText(p);
  };
  c(0);
}), Z = (s, f, u = 6) => {
  const h = [...s], a = h.length;
  let c = 0;
  const l = Math.min(h.length, u);
  let p = 0;
  const d = () => {
    const m = h.shift();
    m && g(m);
  }, _ = () => {
    p < l && h.length !== 0 && d();
  }, g = async (m) => {
    p++, await m(), p--, c++, f.emit("progress", (c / a * 100).toFixed(2)), _();
  };
  for (; p < l; )
    d();
}, k = (s) => {
  const f = document.createElement("input");
  return f.type = "file", s && (f.accept = s == null ? void 0 : s.join()), f.style.display = "none", document.getElementsByTagName("body")[0].appendChild(f), f;
}, tt = (s) => s < 1024 * 1024 ? (s / 1024).toFixed(2) + " KB" : s < 1024 * 1024 * 1024 ? (s / 1024 / 1024).toFixed(2) + " MB" : s < 1024 * 1024 * 1024 * 1024 ? (s / 1024 / 1024 / 1024).toFixed(2) + " GB" : "";
let B = [];
const et = (s) => {
  const f = new W(), u = k(s.fileType);
  let h = [];
  const a = () => u.click();
  return u.onchange = () => {
    const p = u.files[0];
    new Promise((d) => {
      f.emit("change", null), h = H(p, s.chunkSize), Y(h).then((_) => {
        h = h.map((g, m) => ({ ...g, id: `${_}-${m}` })), f.emit("changeFinish", { file: p, fileSize: tt(p.size), resolve: d });
      });
    }).then((d) => {
      B = d ? d(h) : [];
    });
  }, { show: a, addListener: (p, d) => {
    f.on(p, d);
  }, start: () => {
    console.log("开始传输！"), B.length !== 0 && Z(B, f, s.concurrent);
  } };
};
export {
  et as default
};
