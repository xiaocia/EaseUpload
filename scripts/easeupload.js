var L = function(s, u, f) {
  return u === void 0 && (u = 0), f === void 0 && (f = 1), "".concat(s.slice(u, f).toUpperCase()).concat(s.slice(f));
};
function P(s, u) {
  return Object.is(s, u);
}
function E(s, u) {
  for (; Object.getPrototypeOf(s); )
    if (s = Object.getPrototypeOf(s), (s == null ? void 0 : s.constructor) === u)
      return !0;
  return !1;
}
function T(s) {
  return !!Number.isInteger(s);
}
function M(s, u) {
  if (!E(u, Array) || !T(s))
    return !1;
  var f = u[0], h = u[1];
  return f <= s && h >= s;
}
function N(s) {
  return !!s;
}
function C(s, u) {
  if (Object.is(s, u))
    return !0;
  if (typeof s != "object" || typeof u != "object" || (s == null ? void 0 : s.constructor) !== (u == null ? void 0 : u.constructor) || [s, u].includes(null))
    return !1;
  var f = Object.keys(s), h = Object.keys(u);
  return f.length !== h.length ? !1 : f.every(function(a) {
    return C(s[a], u[a]);
  });
}
function x(s, u) {
  return u.includes(s) ? !0 : u.findIndex(function(f) {
    return C(f, s);
  }) > -1;
}
function V(s) {
  return T(s) ? s > 0 : !1;
}
var $ = [null, void 0, !1, NaN];
function D(s) {
  return !$.includes(s);
}
const K = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  equal: P,
  inRange: M,
  int: T,
  ok: N,
  oneOf: x,
  positiveInt: V,
  shallowEq: C,
  truth: D,
  typeOf: E
}, Symbol.toStringTag, { value: "Module" }));
var R = /* @__PURE__ */ function() {
  var s = function(u, f) {
    return s = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(h, a) {
      h.__proto__ = a;
    } || function(h, a) {
      for (var l in a)
        Object.prototype.hasOwnProperty.call(a, l) && (h[l] = a[l]);
    }, s(u, f);
  };
  return function(u, f) {
    if (typeof f != "function" && f !== null)
      throw new TypeError("Class extends value " + String(f) + " is not a constructor or null");
    s(u, f);
    function h() {
      this.constructor = u;
    }
    u.prototype = f === null ? Object.create(f) : (h.prototype = f.prototype, new h());
  };
}(), F = (
  /** @class */
  function(s) {
    R(u, s);
    function u() {
      var f = s !== null && s.apply(this, arguments) || this;
      return f.name = "AssertTiny", f;
    }
    return u;
  }(Error)
), q = function() {
  return (
    /** @class */
    function() {
      function s() {
        var u = this;
        this.SLIENT = !1, this.NOT = !1, this.value = function(f) {
          return u.VALUE = f, u;
        };
      }
      return s.prototype.result = function(u, f, h) {
        if (!(u && !this.NOT) && !(!u && this.NOT)) {
          var a = f ? "".concat(f) : "".concat(h, " assert error");
          if (this.SLIENT && console.warn(new F(a)), !this.SLIENT)
            throw new F(a);
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
  var u = q(), f = Object.getPrototypeOf(new u()), h = Object.assign(s || {}, K), a = Object.keys(h).reduce(function(l, c) {
    var p = "is".concat(L(c));
    return l[p] = function(_, m) {
      var d = this;
      s[c](d.VALUE, _) ? d.result(!0, m, p) : d.result(!1, m, p);
    }, l;
  }, {});
  return Object.assign(f, a), function(l) {
    return new u().value(l);
  };
};
const O = G({});
var W = (
  /** @class */
  /* @__PURE__ */ function() {
    function s() {
      var u = this;
      this.eventBus = {}, this.on = function(f, h) {
        O(f).isTypeOf(String, "eventName must be a string"), O(h).isTypeOf(Function, "callback must be a funtion");
        var a = u.eventBus;
        return Array.isArray(a[f]) ? a[f].push(h) : a[f] = [h], u;
      }, this.emit = function(f, h) {
        O(f).isTypeOf(String, "eventName must be a string");
        var a = u.eventBus;
        Array.isArray(a[f]) && a[f].forEach(function(l) {
          return l(h);
        });
      }, this.off = function(f, h) {
        O(f).isTypeOf(String, "eventName must be a string"), O(h).isTypeOf(Function, "callback must be a funtion");
        var a = u.eventBus;
        Array.isArray(a[f]) && (a[f] = a[f].filter(function(l) {
          return h !== l;
        }));
      }, this.once = function(f, h) {
        O(f).isTypeOf(String, "eventName must be a string"), O(h).isTypeOf(Function, "callback must be a funtion");
        var a = function() {
          for (var l = [], c = 0; c < arguments.length; c++)
            l[c] = arguments[c];
          h.apply(void 0, l), u.off(f, a);
        };
        u.on(f, a);
      };
    }
    return s;
  }()
);
const H = (s, u = 5) => {
  const f = u * 1024 * 1024, h = s.name;
  console.log(h);
  const a = [];
  let l = 0, c = 0;
  const p = Math.ceil(s.size / f);
  for (; l < s.size; )
    a.push({
      file: s.slice(l, l + f, h),
      allSize: s.size,
      id: "",
      size: f,
      chunksNum: p,
      index: c,
      offset: l
    }), l += f, c++;
  return a;
};
function J(s) {
  return s && s.__esModule && Object.prototype.hasOwnProperty.call(s, "default") ? s.default : s;
}
var I = { exports: {} };
(function(s, u) {
  (function(f) {
    s.exports = f();
  })(function(f) {
    var h = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
    function a(o, i) {
      var e = o[0], t = o[1], n = o[2], r = o[3];
      e += (t & n | ~t & r) + i[0] - 680876936 | 0, e = (e << 7 | e >>> 25) + t | 0, r += (e & t | ~e & n) + i[1] - 389564586 | 0, r = (r << 12 | r >>> 20) + e | 0, n += (r & e | ~r & t) + i[2] + 606105819 | 0, n = (n << 17 | n >>> 15) + r | 0, t += (n & r | ~n & e) + i[3] - 1044525330 | 0, t = (t << 22 | t >>> 10) + n | 0, e += (t & n | ~t & r) + i[4] - 176418897 | 0, e = (e << 7 | e >>> 25) + t | 0, r += (e & t | ~e & n) + i[5] + 1200080426 | 0, r = (r << 12 | r >>> 20) + e | 0, n += (r & e | ~r & t) + i[6] - 1473231341 | 0, n = (n << 17 | n >>> 15) + r | 0, t += (n & r | ~n & e) + i[7] - 45705983 | 0, t = (t << 22 | t >>> 10) + n | 0, e += (t & n | ~t & r) + i[8] + 1770035416 | 0, e = (e << 7 | e >>> 25) + t | 0, r += (e & t | ~e & n) + i[9] - 1958414417 | 0, r = (r << 12 | r >>> 20) + e | 0, n += (r & e | ~r & t) + i[10] - 42063 | 0, n = (n << 17 | n >>> 15) + r | 0, t += (n & r | ~n & e) + i[11] - 1990404162 | 0, t = (t << 22 | t >>> 10) + n | 0, e += (t & n | ~t & r) + i[12] + 1804603682 | 0, e = (e << 7 | e >>> 25) + t | 0, r += (e & t | ~e & n) + i[13] - 40341101 | 0, r = (r << 12 | r >>> 20) + e | 0, n += (r & e | ~r & t) + i[14] - 1502002290 | 0, n = (n << 17 | n >>> 15) + r | 0, t += (n & r | ~n & e) + i[15] + 1236535329 | 0, t = (t << 22 | t >>> 10) + n | 0, e += (t & r | n & ~r) + i[1] - 165796510 | 0, e = (e << 5 | e >>> 27) + t | 0, r += (e & n | t & ~n) + i[6] - 1069501632 | 0, r = (r << 9 | r >>> 23) + e | 0, n += (r & t | e & ~t) + i[11] + 643717713 | 0, n = (n << 14 | n >>> 18) + r | 0, t += (n & e | r & ~e) + i[0] - 373897302 | 0, t = (t << 20 | t >>> 12) + n | 0, e += (t & r | n & ~r) + i[5] - 701558691 | 0, e = (e << 5 | e >>> 27) + t | 0, r += (e & n | t & ~n) + i[10] + 38016083 | 0, r = (r << 9 | r >>> 23) + e | 0, n += (r & t | e & ~t) + i[15] - 660478335 | 0, n = (n << 14 | n >>> 18) + r | 0, t += (n & e | r & ~e) + i[4] - 405537848 | 0, t = (t << 20 | t >>> 12) + n | 0, e += (t & r | n & ~r) + i[9] + 568446438 | 0, e = (e << 5 | e >>> 27) + t | 0, r += (e & n | t & ~n) + i[14] - 1019803690 | 0, r = (r << 9 | r >>> 23) + e | 0, n += (r & t | e & ~t) + i[3] - 187363961 | 0, n = (n << 14 | n >>> 18) + r | 0, t += (n & e | r & ~e) + i[8] + 1163531501 | 0, t = (t << 20 | t >>> 12) + n | 0, e += (t & r | n & ~r) + i[13] - 1444681467 | 0, e = (e << 5 | e >>> 27) + t | 0, r += (e & n | t & ~n) + i[2] - 51403784 | 0, r = (r << 9 | r >>> 23) + e | 0, n += (r & t | e & ~t) + i[7] + 1735328473 | 0, n = (n << 14 | n >>> 18) + r | 0, t += (n & e | r & ~e) + i[12] - 1926607734 | 0, t = (t << 20 | t >>> 12) + n | 0, e += (t ^ n ^ r) + i[5] - 378558 | 0, e = (e << 4 | e >>> 28) + t | 0, r += (e ^ t ^ n) + i[8] - 2022574463 | 0, r = (r << 11 | r >>> 21) + e | 0, n += (r ^ e ^ t) + i[11] + 1839030562 | 0, n = (n << 16 | n >>> 16) + r | 0, t += (n ^ r ^ e) + i[14] - 35309556 | 0, t = (t << 23 | t >>> 9) + n | 0, e += (t ^ n ^ r) + i[1] - 1530992060 | 0, e = (e << 4 | e >>> 28) + t | 0, r += (e ^ t ^ n) + i[4] + 1272893353 | 0, r = (r << 11 | r >>> 21) + e | 0, n += (r ^ e ^ t) + i[7] - 155497632 | 0, n = (n << 16 | n >>> 16) + r | 0, t += (n ^ r ^ e) + i[10] - 1094730640 | 0, t = (t << 23 | t >>> 9) + n | 0, e += (t ^ n ^ r) + i[13] + 681279174 | 0, e = (e << 4 | e >>> 28) + t | 0, r += (e ^ t ^ n) + i[0] - 358537222 | 0, r = (r << 11 | r >>> 21) + e | 0, n += (r ^ e ^ t) + i[3] - 722521979 | 0, n = (n << 16 | n >>> 16) + r | 0, t += (n ^ r ^ e) + i[6] + 76029189 | 0, t = (t << 23 | t >>> 9) + n | 0, e += (t ^ n ^ r) + i[9] - 640364487 | 0, e = (e << 4 | e >>> 28) + t | 0, r += (e ^ t ^ n) + i[12] - 421815835 | 0, r = (r << 11 | r >>> 21) + e | 0, n += (r ^ e ^ t) + i[15] + 530742520 | 0, n = (n << 16 | n >>> 16) + r | 0, t += (n ^ r ^ e) + i[2] - 995338651 | 0, t = (t << 23 | t >>> 9) + n | 0, e += (n ^ (t | ~r)) + i[0] - 198630844 | 0, e = (e << 6 | e >>> 26) + t | 0, r += (t ^ (e | ~n)) + i[7] + 1126891415 | 0, r = (r << 10 | r >>> 22) + e | 0, n += (e ^ (r | ~t)) + i[14] - 1416354905 | 0, n = (n << 15 | n >>> 17) + r | 0, t += (r ^ (n | ~e)) + i[5] - 57434055 | 0, t = (t << 21 | t >>> 11) + n | 0, e += (n ^ (t | ~r)) + i[12] + 1700485571 | 0, e = (e << 6 | e >>> 26) + t | 0, r += (t ^ (e | ~n)) + i[3] - 1894986606 | 0, r = (r << 10 | r >>> 22) + e | 0, n += (e ^ (r | ~t)) + i[10] - 1051523 | 0, n = (n << 15 | n >>> 17) + r | 0, t += (r ^ (n | ~e)) + i[1] - 2054922799 | 0, t = (t << 21 | t >>> 11) + n | 0, e += (n ^ (t | ~r)) + i[8] + 1873313359 | 0, e = (e << 6 | e >>> 26) + t | 0, r += (t ^ (e | ~n)) + i[15] - 30611744 | 0, r = (r << 10 | r >>> 22) + e | 0, n += (e ^ (r | ~t)) + i[6] - 1560198380 | 0, n = (n << 15 | n >>> 17) + r | 0, t += (r ^ (n | ~e)) + i[13] + 1309151649 | 0, t = (t << 21 | t >>> 11) + n | 0, e += (n ^ (t | ~r)) + i[4] - 145523070 | 0, e = (e << 6 | e >>> 26) + t | 0, r += (t ^ (e | ~n)) + i[11] - 1120210379 | 0, r = (r << 10 | r >>> 22) + e | 0, n += (e ^ (r | ~t)) + i[2] + 718787259 | 0, n = (n << 15 | n >>> 17) + r | 0, t += (r ^ (n | ~e)) + i[9] - 343485551 | 0, t = (t << 21 | t >>> 11) + n | 0, o[0] = e + o[0] | 0, o[1] = t + o[1] | 0, o[2] = n + o[2] | 0, o[3] = r + o[3] | 0;
    }
    function l(o) {
      var i = [], e;
      for (e = 0; e < 64; e += 4)
        i[e >> 2] = o.charCodeAt(e) + (o.charCodeAt(e + 1) << 8) + (o.charCodeAt(e + 2) << 16) + (o.charCodeAt(e + 3) << 24);
      return i;
    }
    function c(o) {
      var i = [], e;
      for (e = 0; e < 64; e += 4)
        i[e >> 2] = o[e] + (o[e + 1] << 8) + (o[e + 2] << 16) + (o[e + 3] << 24);
      return i;
    }
    function p(o) {
      var i = o.length, e = [1732584193, -271733879, -1732584194, 271733878], t, n, r, b, v, w;
      for (t = 64; t <= i; t += 64)
        a(e, l(o.substring(t - 64, t)));
      for (o = o.substring(t - 64), n = o.length, r = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], t = 0; t < n; t += 1)
        r[t >> 2] |= o.charCodeAt(t) << (t % 4 << 3);
      if (r[t >> 2] |= 128 << (t % 4 << 3), t > 55)
        for (a(e, r), t = 0; t < 16; t += 1)
          r[t] = 0;
      return b = i * 8, b = b.toString(16).match(/(.*?)(.{0,8})$/), v = parseInt(b[2], 16), w = parseInt(b[1], 16) || 0, r[14] = v, r[15] = w, a(e, r), e;
    }
    function _(o) {
      var i = o.length, e = [1732584193, -271733879, -1732584194, 271733878], t, n, r, b, v, w;
      for (t = 64; t <= i; t += 64)
        a(e, c(o.subarray(t - 64, t)));
      for (o = t - 64 < i ? o.subarray(t - 64) : new Uint8Array(0), n = o.length, r = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], t = 0; t < n; t += 1)
        r[t >> 2] |= o[t] << (t % 4 << 3);
      if (r[t >> 2] |= 128 << (t % 4 << 3), t > 55)
        for (a(e, r), t = 0; t < 16; t += 1)
          r[t] = 0;
      return b = i * 8, b = b.toString(16).match(/(.*?)(.{0,8})$/), v = parseInt(b[2], 16), w = parseInt(b[1], 16) || 0, r[14] = v, r[15] = w, a(e, r), e;
    }
    function m(o) {
      var i = "", e;
      for (e = 0; e < 4; e += 1)
        i += h[o >> e * 8 + 4 & 15] + h[o >> e * 8 & 15];
      return i;
    }
    function d(o) {
      var i;
      for (i = 0; i < o.length; i += 1)
        o[i] = m(o[i]);
      return o.join("");
    }
    d(p("hello")), typeof ArrayBuffer < "u" && !ArrayBuffer.prototype.slice && function() {
      function o(i, e) {
        return i = i | 0 || 0, i < 0 ? Math.max(i + e, 0) : Math.min(i, e);
      }
      ArrayBuffer.prototype.slice = function(i, e) {
        var t = this.byteLength, n = o(i, t), r = t, b, v, w, U;
        return e !== f && (r = o(e, t)), n > r ? new ArrayBuffer(0) : (b = r - n, v = new ArrayBuffer(b), w = new Uint8Array(v), U = new Uint8Array(this, n, b), w.set(U), v);
      };
    }();
    function S(o) {
      return /[\u0080-\uFFFF]/.test(o) && (o = unescape(encodeURIComponent(o))), o;
    }
    function g(o, i) {
      var e = o.length, t = new ArrayBuffer(e), n = new Uint8Array(t), r;
      for (r = 0; r < e; r += 1)
        n[r] = o.charCodeAt(r);
      return i ? n : t;
    }
    function A(o) {
      return String.fromCharCode.apply(null, new Uint8Array(o));
    }
    function j(o, i, e) {
      var t = new Uint8Array(o.byteLength + i.byteLength);
      return t.set(new Uint8Array(o)), t.set(new Uint8Array(i), o.byteLength), e ? t : t.buffer;
    }
    function B(o) {
      var i = [], e = o.length, t;
      for (t = 0; t < e - 1; t += 2)
        i.push(parseInt(o.substr(t, 2), 16));
      return String.fromCharCode.apply(String, i);
    }
    function y() {
      this.reset();
    }
    return y.prototype.append = function(o) {
      return this.appendBinary(S(o)), this;
    }, y.prototype.appendBinary = function(o) {
      this._buff += o, this._length += o.length;
      var i = this._buff.length, e;
      for (e = 64; e <= i; e += 64)
        a(this._hash, l(this._buff.substring(e - 64, e)));
      return this._buff = this._buff.substring(e - 64), this;
    }, y.prototype.end = function(o) {
      var i = this._buff, e = i.length, t, n = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], r;
      for (t = 0; t < e; t += 1)
        n[t >> 2] |= i.charCodeAt(t) << (t % 4 << 3);
      return this._finish(n, e), r = d(this._hash), o && (r = B(r)), this.reset(), r;
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
      return y.hashBinary(S(o), i);
    }, y.hashBinary = function(o, i) {
      var e = p(o), t = d(e);
      return i ? B(t) : t;
    }, y.ArrayBuffer = function() {
      this.reset();
    }, y.ArrayBuffer.prototype.append = function(o) {
      var i = j(this._buff.buffer, o, !0), e = i.length, t;
      for (this._length += o.byteLength, t = 64; t <= e; t += 64)
        a(this._hash, c(i.subarray(t - 64, t)));
      return this._buff = t - 64 < e ? new Uint8Array(i.buffer.slice(t - 64)) : new Uint8Array(0), this;
    }, y.ArrayBuffer.prototype.end = function(o) {
      var i = this._buff, e = i.length, t = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], n, r;
      for (n = 0; n < e; n += 1)
        t[n >> 2] |= i[n] << (n % 4 << 3);
      return this._finish(t, e), r = d(this._hash), o && (r = B(r)), this.reset(), r;
    }, y.ArrayBuffer.prototype.reset = function() {
      return this._buff = new Uint8Array(0), this._length = 0, this._hash = [1732584193, -271733879, -1732584194, 271733878], this;
    }, y.ArrayBuffer.prototype.getState = function() {
      var o = y.prototype.getState.call(this);
      return o.buff = A(o.buff), o;
    }, y.ArrayBuffer.prototype.setState = function(o) {
      return o.buff = g(o.buff, !0), y.prototype.setState.call(this, o);
    }, y.ArrayBuffer.prototype.destroy = y.prototype.destroy, y.ArrayBuffer.prototype._finish = y.prototype._finish, y.ArrayBuffer.hash = function(o, i) {
      var e = _(new Uint8Array(o)), t = d(e);
      return i ? B(t) : t;
    }, y;
  });
})(I);
var Q = I.exports;
const X = /* @__PURE__ */ J(Q), Y = (s) => new Promise((u) => {
  const f = [];
  if ("length" in s)
    for (const c in s)
      if (c === "0" || c === s.length - 1 + "")
        f.push(s[c]);
      else {
        const p = s[c].file;
        f.push({ ...s[c], file: p.slice(0, 2) }), f.push({ ...s[c], file: p.slice(~~(p.size / 2), ~~(p.size / 2) + 2) }), f.push({ ...s[c], file: p.slice(p.size - 2, p.size) });
      }
  else if (s.size < 1024 * 1024 * 10)
    f.push(s);
  else {
    const c = s.file;
    f.push({ ...s, file: c.slice(0, 1024 * 1024 * 2) }), f.push({ ...s, file: c.slice(~~(c.size / 2), ~~(c.size / 2) + 1024 * 1024 * 2) }), f.push({ ...s, file: c.slice(c.size - 1024 * 1024 * 2, c.size) });
  }
  const h = new X(), a = (/* @__PURE__ */ new Date()).valueOf(), l = (c) => {
    if (c >= f.length) {
      const m = h.end(!1);
      console.log("计算hash用时:", ((/* @__PURE__ */ new Date()).valueOf() - a) / 1e3), u(m);
      return;
    }
    const p = f[c].file, _ = new FileReader();
    _.onload = (m) => {
      const d = m.target.result;
      d && h.append(d), l(c + 1);
    }, _.readAsText(p);
  };
  l(0);
}), Z = (s, u, f = 6) => {
  let h = [...s];
  const a = h.length;
  let l = 0;
  const c = Math.min(h.length, f);
  let p = 0, _ = !1;
  const m = () => {
    const g = h.shift();
    g && S(g);
  }, d = () => {
    p < c && h.length !== 0 && m();
  }, S = async (g) => {
    p++;
    const A = await g();
    u.emit("finishOne", A), !_ && u.emit("finished", A), p--, h.length === 0 && p === 0 && _ !== !0 && u.emit("finished", A), l++, u.emit("progress", (l / a * 100).toFixed(2)), d();
  };
  for (u.on("cancel", () => {
    h = [], _ = !0;
  }); p < c; )
    m();
}, k = (s) => {
  const u = document.createElement("input");
  return u.type = "file", s && (u.accept = s == null ? void 0 : s.join()), u.style.display = "none", document.getElementsByTagName("body")[0].appendChild(u), u;
}, tt = (s) => s < 1024 * 1024 ? (s / 1024).toFixed(2) + " KB" : s < 1024 * 1024 * 1024 ? (s / 1024 / 1024).toFixed(2) + " MB" : s < 1024 * 1024 * 1024 * 1024 ? (s / 1024 / 1024 / 1024).toFixed(2) + " GB" : "";
let z = [];
const et = (s) => {
  const u = new W(), { fileType: f, chunkSize: h, concurrent: a } = s, l = k(f);
  let c, p;
  const _ = () => l.click();
  return l.onchange = () => {
    p = l.files[0], new Promise((g) => {
      if (u.emit("change", null), typeof h == "number") {
        if (p.size < h * 1024 * 1024)
          return console.error("文件比切片小");
        c = H(p, s.chunkSize);
      } else
        c = { file: p, size: p.size, id: "" };
      Y(c).then((A) => {
        "length" in c ? c = c.map((j, B) => ({ ...j, id: `${A}-${B}` })) : c = { ...c, id: A }, u.emit("changeFinish", {
          file: p,
          fileSize: tt(p.size),
          resolve: g
        });
      });
    }).then((g) => {
      z = g ? g(c) : [];
    });
  }, { show: _, addListener: (g, A) => {
    u.on(g, A);
  }, start: () => new Promise((g) => {
    console.log("开始传输！"), z.length !== 0 && (Z(z, u, a ?? 1), u.on("finished", (A) => g(A)));
  }), cancel: () => {
    p = null, l.remove(), u.emit("cancel", null);
  } };
};
export {
  et as default
};
