/**
 * @license Angular v17.3.12
 * (c) 2010-2024 Google LLC. https://angular.io/
 * License: MIT
 */
function Um(e, t) {
  return Object.is(e, t);
}
let Se = null, pi = !1, sa = 1;
const ht = /* @__PURE__ */ Symbol("SIGNAL");
function $(e) {
  const t = Se;
  return Se = e, t;
}
function zm() {
  return Se;
}
function uw() {
  return pi;
}
const su = {
  version: 0,
  lastCleanEpoch: 0,
  dirty: !1,
  producerNode: void 0,
  producerLastReadVersion: void 0,
  producerIndexOfThis: void 0,
  nextProducerIndex: 0,
  liveConsumerNode: void 0,
  liveConsumerIndexOfThis: void 0,
  consumerAllowSignalWrites: !1,
  consumerIsAlwaysLive: !1,
  producerMustRecompute: () => !1,
  producerRecomputeValue: () => {
  },
  consumerMarkedDirty: () => {
  },
  consumerOnSignalRead: () => {
  }
};
function au(e) {
  if (pi)
    throw new Error(typeof ngDevMode < "u" && ngDevMode ? "Assertion error: signal read during notification phase" : "");
  if (Se === null)
    return;
  Se.consumerOnSignalRead(e);
  const t = Se.nextProducerIndex++;
  if (po(Se), t < Se.producerNode.length && Se.producerNode[t] !== e && Oi(Se)) {
    const n = Se.producerNode[t];
    uu(n, Se.producerIndexOfThis[t]);
  }
  Se.producerNode[t] !== e && (Se.producerNode[t] = e, Se.producerIndexOfThis[t] = Oi(Se) ? Ym(e, Se, t) : 0), Se.producerLastReadVersion[t] = e.version;
}
function cw() {
  sa++;
}
function Gm(e) {
  if (!(Oi(e) && !e.dirty) && !(!e.dirty && e.lastCleanEpoch === sa)) {
    if (!e.producerMustRecompute(e) && !Dd(e)) {
      e.dirty = !1, e.lastCleanEpoch = sa;
      return;
    }
    e.producerRecomputeValue(e), e.dirty = !1, e.lastCleanEpoch = sa;
  }
}
function Wm(e) {
  if (e.liveConsumerNode === void 0)
    return;
  const t = pi;
  pi = !0;
  try {
    for (const n of e.liveConsumerNode)
      n.dirty || Qm(n);
  } finally {
    pi = t;
  }
}
function qm() {
  return Se?.consumerAllowSignalWrites !== !1;
}
function Qm(e) {
  e.dirty = !0, Wm(e), e.consumerMarkedDirty?.(e);
}
function md(e) {
  return e && (e.nextProducerIndex = 0), $(e);
}
function yd(e, t) {
  if ($(t), !(!e || e.producerNode === void 0 || e.producerIndexOfThis === void 0 || e.producerLastReadVersion === void 0)) {
    if (Oi(e))
      for (let n = e.nextProducerIndex; n < e.producerNode.length; n++)
        uu(e.producerNode[n], e.producerIndexOfThis[n]);
    for (; e.producerNode.length > e.nextProducerIndex; )
      e.producerNode.pop(), e.producerLastReadVersion.pop(), e.producerIndexOfThis.pop();
  }
}
function Dd(e) {
  po(e);
  for (let t = 0; t < e.producerNode.length; t++) {
    const n = e.producerNode[t], r = e.producerLastReadVersion[t];
    if (r !== n.version || (Gm(n), r !== n.version))
      return !0;
  }
  return !1;
}
function Zm(e) {
  if (po(e), Oi(e))
    for (let t = 0; t < e.producerNode.length; t++)
      uu(e.producerNode[t], e.producerIndexOfThis[t]);
  e.producerNode.length = e.producerLastReadVersion.length = e.producerIndexOfThis.length = 0, e.liveConsumerNode && (e.liveConsumerNode.length = e.liveConsumerIndexOfThis.length = 0);
}
function Ym(e, t, n) {
  if (Km(e), po(e), e.liveConsumerNode.length === 0)
    for (let r = 0; r < e.producerNode.length; r++)
      e.producerIndexOfThis[r] = Ym(e.producerNode[r], e, r);
  return e.liveConsumerIndexOfThis.push(n), e.liveConsumerNode.push(t) - 1;
}
function uu(e, t) {
  if (Km(e), po(e), typeof ngDevMode < "u" && ngDevMode && t >= e.liveConsumerNode.length)
    throw new Error(`Assertion error: active consumer index ${t} is out of bounds of ${e.liveConsumerNode.length} consumers)`);
  if (e.liveConsumerNode.length === 1)
    for (let r = 0; r < e.producerNode.length; r++)
      uu(e.producerNode[r], e.producerIndexOfThis[r]);
  const n = e.liveConsumerNode.length - 1;
  if (e.liveConsumerNode[t] = e.liveConsumerNode[n], e.liveConsumerIndexOfThis[t] = e.liveConsumerIndexOfThis[n], e.liveConsumerNode.length--, e.liveConsumerIndexOfThis.length--, t < e.liveConsumerNode.length) {
    const r = e.liveConsumerIndexOfThis[t], o = e.liveConsumerNode[t];
    po(o), o.producerIndexOfThis[r] = t;
  }
}
function Oi(e) {
  return e.consumerIsAlwaysLive || (e?.liveConsumerNode?.length ?? 0) > 0;
}
function po(e) {
  e.producerNode ??= [], e.producerIndexOfThis ??= [], e.producerLastReadVersion ??= [];
}
function Km(e) {
  e.liveConsumerNode ??= [], e.liveConsumerIndexOfThis ??= [];
}
function Jm(e) {
  const t = Object.create(lw);
  t.computation = e;
  const n = () => {
    if (Gm(t), au(t), t.value === aa)
      throw t.error;
    return t.value;
  };
  return n[ht] = t, n;
}
const Ic = /* @__PURE__ */ Symbol("UNSET"), Cc = /* @__PURE__ */ Symbol("COMPUTING"), aa = /* @__PURE__ */ Symbol("ERRORED"), lw = {
  ...su,
  value: Ic,
  dirty: !0,
  error: null,
  equal: Um,
  producerMustRecompute(e) {
    return e.value === Ic || e.value === Cc;
  },
  producerRecomputeValue(e) {
    if (e.value === Cc)
      throw new Error("Detected cycle in computations.");
    const t = e.value;
    e.value = Cc;
    const n = md(e);
    let r;
    try {
      r = e.computation();
    } catch (o) {
      r = aa, e.error = o;
    } finally {
      yd(e, n);
    }
    if (t !== Ic && t !== aa && r !== aa && e.equal(t, r)) {
      e.value = t;
      return;
    }
    e.value = r, e.version++;
  }
};
function dw() {
  throw new Error();
}
let Xm = dw;
function ey() {
  Xm();
}
function fw(e) {
  Xm = e;
}
function hw(e) {
  const t = Object.create(ty);
  t.value = e;
  const n = () => (au(t), t.value);
  return n[ht] = t, n;
}
function cu(e, t) {
  qm() || ey(), e.equal(e.value, t) || (e.value = t, gw(e));
}
function pw(e, t) {
  qm() || ey(), cu(e, t(e.value));
}
const ty = {
  ...su,
  equal: Um,
  value: void 0
};
function gw(e) {
  e.version++, cw(), Wm(e);
}
function mw(e, t, n) {
  const r = Object.create(yw);
  n && (r.consumerAllowSignalWrites = !0), r.fn = e, r.schedule = t;
  const o = (u) => {
    r.cleanupFn = u;
  };
  function i(u) {
    return u.fn === null && u.schedule === null;
  }
  function s(u) {
    i(u) || (Zm(u), u.cleanupFn(), u.fn = null, u.schedule = null, u.cleanupFn = tl);
  }
  const a = () => {
    if (r.fn === null)
      return;
    if (uw())
      throw new Error("Schedulers cannot synchronously execute watches while scheduling.");
    if (r.dirty = !1, r.hasRun && !Dd(r))
      return;
    r.hasRun = !0;
    const u = md(r);
    try {
      r.cleanupFn(), r.cleanupFn = tl, r.fn(o);
    } finally {
      yd(r, u);
    }
  };
  return r.ref = {
    notify: () => Qm(r),
    run: a,
    cleanup: () => r.cleanupFn(),
    destroy: () => s(r),
    [ht]: r
  }, r.ref;
}
const tl = () => {
}, yw = {
  ...su,
  consumerIsAlwaysLive: !0,
  consumerAllowSignalWrites: !1,
  consumerMarkedDirty: (e) => {
    e.schedule !== null && e.schedule(e.ref);
  },
  hasRun: !1,
  cleanupFn: tl
};
var nl = function(e, t) {
  return nl = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n, r) {
    n.__proto__ = r;
  } || function(n, r) {
    for (var o in r) Object.prototype.hasOwnProperty.call(r, o) && (n[o] = r[o]);
  }, nl(e, t);
};
function No(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
  nl(e, t);
  function n() {
    this.constructor = e;
  }
  e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
}
function rl(e) {
  var t = typeof Symbol == "function" && Symbol.iterator, n = t && e[t], r = 0;
  if (n) return n.call(e);
  if (e && typeof e.length == "number") return {
    next: function() {
      return e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e };
    }
  };
  throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function ol(e, t) {
  var n = typeof Symbol == "function" && e[Symbol.iterator];
  if (!n) return e;
  var r = n.call(e), o, i = [], s;
  try {
    for (; (t === void 0 || t-- > 0) && !(o = r.next()).done; ) i.push(o.value);
  } catch (a) {
    s = { error: a };
  } finally {
    try {
      o && !o.done && (n = r.return) && n.call(r);
    } finally {
      if (s) throw s.error;
    }
  }
  return i;
}
function il(e, t, n) {
  if (n || arguments.length === 2) for (var r = 0, o = t.length, i; r < o; r++)
    (i || !(r in t)) && (i || (i = Array.prototype.slice.call(t, 0, r)), i[r] = t[r]);
  return e.concat(i || Array.prototype.slice.call(t));
}
function Qt(e) {
  return typeof e == "function";
}
function vd(e) {
  var t = function(r) {
    Error.call(r), r.stack = new Error().stack;
  }, n = e(t);
  return n.prototype = Object.create(Error.prototype), n.prototype.constructor = n, n;
}
var Ec = vd(function(e) {
  return function(n) {
    e(this), this.message = n ? n.length + ` errors occurred during unsubscription:
` + n.map(function(r, o) {
      return o + 1 + ") " + r.toString();
    }).join(`
  `) : "", this.name = "UnsubscriptionError", this.errors = n;
  };
});
function sl(e, t) {
  if (e) {
    var n = e.indexOf(t);
    0 <= n && e.splice(n, 1);
  }
}
var ko = function() {
  function e(t) {
    this.initialTeardown = t, this.closed = !1, this._parentage = null, this._finalizers = null;
  }
  return e.prototype.unsubscribe = function() {
    var t, n, r, o, i;
    if (!this.closed) {
      this.closed = !0;
      var s = this._parentage;
      if (s)
        if (this._parentage = null, Array.isArray(s))
          try {
            for (var a = rl(s), u = a.next(); !u.done; u = a.next()) {
              var c = u.value;
              c.remove(this);
            }
          } catch (g) {
            t = { error: g };
          } finally {
            try {
              u && !u.done && (n = a.return) && n.call(a);
            } finally {
              if (t) throw t.error;
            }
          }
        else
          s.remove(this);
      var l = this.initialTeardown;
      if (Qt(l))
        try {
          l();
        } catch (g) {
          i = g instanceof Ec ? g.errors : [g];
        }
      var d = this._finalizers;
      if (d) {
        this._finalizers = null;
        try {
          for (var f = rl(d), h = f.next(); !h.done; h = f.next()) {
            var p = h.value;
            try {
              Np(p);
            } catch (g) {
              i = i ?? [], g instanceof Ec ? i = il(il([], ol(i)), ol(g.errors)) : i.push(g);
            }
          }
        } catch (g) {
          r = { error: g };
        } finally {
          try {
            h && !h.done && (o = f.return) && o.call(f);
          } finally {
            if (r) throw r.error;
          }
        }
      }
      if (i)
        throw new Ec(i);
    }
  }, e.prototype.add = function(t) {
    var n;
    if (t && t !== this)
      if (this.closed)
        Np(t);
      else {
        if (t instanceof e) {
          if (t.closed || t._hasParent(this))
            return;
          t._addParent(this);
        }
        (this._finalizers = (n = this._finalizers) !== null && n !== void 0 ? n : []).push(t);
      }
  }, e.prototype._hasParent = function(t) {
    var n = this._parentage;
    return n === t || Array.isArray(n) && n.includes(t);
  }, e.prototype._addParent = function(t) {
    var n = this._parentage;
    this._parentage = Array.isArray(n) ? (n.push(t), n) : n ? [n, t] : t;
  }, e.prototype._removeParent = function(t) {
    var n = this._parentage;
    n === t ? this._parentage = null : Array.isArray(n) && sl(n, t);
  }, e.prototype.remove = function(t) {
    var n = this._finalizers;
    n && sl(n, t), t instanceof e && t._removeParent(this);
  }, e.EMPTY = function() {
    var t = new e();
    return t.closed = !0, t;
  }(), e;
}(), ny = ko.EMPTY;
function ry(e) {
  return e instanceof ko || e && "closed" in e && Qt(e.remove) && Qt(e.add) && Qt(e.unsubscribe);
}
function Np(e) {
  Qt(e) ? e() : e.unsubscribe();
}
var Dw = {
  Promise: void 0
}, vw = {
  setTimeout: function(e, t) {
    for (var n = [], r = 2; r < arguments.length; r++)
      n[r - 2] = arguments[r];
    return setTimeout.apply(void 0, il([e, t], ol(n)));
  },
  clearTimeout: function(e) {
    return clearTimeout(e);
  },
  delegate: void 0
};
function Iw(e) {
  vw.setTimeout(function() {
    throw e;
  });
}
function kp() {
}
function ua(e) {
  e();
}
var Id = function(e) {
  No(t, e);
  function t(n) {
    var r = e.call(this) || this;
    return r.isStopped = !1, n ? (r.destination = n, ry(n) && n.add(r)) : r.destination = bw, r;
  }
  return t.create = function(n, r, o) {
    return new al(n, r, o);
  }, t.prototype.next = function(n) {
    this.isStopped || this._next(n);
  }, t.prototype.error = function(n) {
    this.isStopped || (this.isStopped = !0, this._error(n));
  }, t.prototype.complete = function() {
    this.isStopped || (this.isStopped = !0, this._complete());
  }, t.prototype.unsubscribe = function() {
    this.closed || (this.isStopped = !0, e.prototype.unsubscribe.call(this), this.destination = null);
  }, t.prototype._next = function(n) {
    this.destination.next(n);
  }, t.prototype._error = function(n) {
    try {
      this.destination.error(n);
    } finally {
      this.unsubscribe();
    }
  }, t.prototype._complete = function() {
    try {
      this.destination.complete();
    } finally {
      this.unsubscribe();
    }
  }, t;
}(ko), Cw = function() {
  function e(t) {
    this.partialObserver = t;
  }
  return e.prototype.next = function(t) {
    var n = this.partialObserver;
    if (n.next)
      try {
        n.next(t);
      } catch (r) {
        Hs(r);
      }
  }, e.prototype.error = function(t) {
    var n = this.partialObserver;
    if (n.error)
      try {
        n.error(t);
      } catch (r) {
        Hs(r);
      }
    else
      Hs(t);
  }, e.prototype.complete = function() {
    var t = this.partialObserver;
    if (t.complete)
      try {
        t.complete();
      } catch (n) {
        Hs(n);
      }
  }, e;
}(), al = function(e) {
  No(t, e);
  function t(n, r, o) {
    var i = e.call(this) || this, s;
    return Qt(n) || !n ? s = {
      next: n ?? void 0,
      error: r ?? void 0,
      complete: o ?? void 0
    } : s = n, i.destination = new Cw(s), i;
  }
  return t;
}(Id);
function Hs(e) {
  Iw(e);
}
function Ew(e) {
  throw e;
}
var bw = {
  closed: !0,
  next: kp,
  error: Ew,
  complete: kp
}, ww = function() {
  return typeof Symbol == "function" && Symbol.observable || "@@observable";
}();
function oy(e) {
  return e;
}
function Mw(e) {
  return e.length === 0 ? oy : e.length === 1 ? e[0] : function(n) {
    return e.reduce(function(r, o) {
      return o(r);
    }, n);
  };
}
var ul = function() {
  function e(t) {
    t && (this._subscribe = t);
  }
  return e.prototype.lift = function(t) {
    var n = new e();
    return n.source = this, n.operator = t, n;
  }, e.prototype.subscribe = function(t, n, r) {
    var o = this, i = Sw(t) ? t : new al(t, n, r);
    return ua(function() {
      var s = o, a = s.operator, u = s.source;
      i.add(a ? a.call(i, u) : u ? o._subscribe(i) : o._trySubscribe(i));
    }), i;
  }, e.prototype._trySubscribe = function(t) {
    try {
      return this._subscribe(t);
    } catch (n) {
      t.error(n);
    }
  }, e.prototype.forEach = function(t, n) {
    var r = this;
    return n = Rp(n), new n(function(o, i) {
      var s = new al({
        next: function(a) {
          try {
            t(a);
          } catch (u) {
            i(u), s.unsubscribe();
          }
        },
        error: i,
        complete: o
      });
      r.subscribe(s);
    });
  }, e.prototype._subscribe = function(t) {
    var n;
    return (n = this.source) === null || n === void 0 ? void 0 : n.subscribe(t);
  }, e.prototype[ww] = function() {
    return this;
  }, e.prototype.pipe = function() {
    for (var t = [], n = 0; n < arguments.length; n++)
      t[n] = arguments[n];
    return Mw(t)(this);
  }, e.prototype.toPromise = function(t) {
    var n = this;
    return t = Rp(t), new t(function(r, o) {
      var i;
      n.subscribe(function(s) {
        return i = s;
      }, function(s) {
        return o(s);
      }, function() {
        return r(i);
      });
    });
  }, e.create = function(t) {
    return new e(t);
  }, e;
}();
function Rp(e) {
  var t;
  return (t = e ?? Dw.Promise) !== null && t !== void 0 ? t : Promise;
}
function _w(e) {
  return e && Qt(e.next) && Qt(e.error) && Qt(e.complete);
}
function Sw(e) {
  return e && e instanceof Id || _w(e) && ry(e);
}
function Tw(e) {
  return Qt(e?.lift);
}
function os(e) {
  return function(t) {
    if (Tw(t))
      return t.lift(function(n) {
        try {
          return e(n, this);
        } catch (r) {
          this.error(r);
        }
      });
    throw new TypeError("Unable to lift unknown Observable type");
  };
}
function is(e, t, n, r, o) {
  return new Aw(e, t, n, r, o);
}
var Aw = function(e) {
  No(t, e);
  function t(n, r, o, i, s, a) {
    var u = e.call(this, n) || this;
    return u.onFinalize = s, u.shouldUnsubscribe = a, u._next = r ? function(c) {
      try {
        r(c);
      } catch (l) {
        n.error(l);
      }
    } : e.prototype._next, u._error = i ? function(c) {
      try {
        i(c);
      } catch (l) {
        n.error(l);
      } finally {
        this.unsubscribe();
      }
    } : e.prototype._error, u._complete = o ? function() {
      try {
        o();
      } catch (c) {
        n.error(c);
      } finally {
        this.unsubscribe();
      }
    } : e.prototype._complete, u;
  }
  return t.prototype.unsubscribe = function() {
    var n;
    if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
      var r = this.closed;
      e.prototype.unsubscribe.call(this), !r && ((n = this.onFinalize) === null || n === void 0 || n.call(this));
    }
  }, t;
}(Id), Ow = vd(function(e) {
  return function() {
    e(this), this.name = "ObjectUnsubscribedError", this.message = "object unsubscribed";
  };
}), Fi = function(e) {
  No(t, e);
  function t() {
    var n = e.call(this) || this;
    return n.closed = !1, n.currentObservers = null, n.observers = [], n.isStopped = !1, n.hasError = !1, n.thrownError = null, n;
  }
  return t.prototype.lift = function(n) {
    var r = new xp(this, this);
    return r.operator = n, r;
  }, t.prototype._throwIfClosed = function() {
    if (this.closed)
      throw new Ow();
  }, t.prototype.next = function(n) {
    var r = this;
    ua(function() {
      var o, i;
      if (r._throwIfClosed(), !r.isStopped) {
        r.currentObservers || (r.currentObservers = Array.from(r.observers));
        try {
          for (var s = rl(r.currentObservers), a = s.next(); !a.done; a = s.next()) {
            var u = a.value;
            u.next(n);
          }
        } catch (c) {
          o = { error: c };
        } finally {
          try {
            a && !a.done && (i = s.return) && i.call(s);
          } finally {
            if (o) throw o.error;
          }
        }
      }
    });
  }, t.prototype.error = function(n) {
    var r = this;
    ua(function() {
      if (r._throwIfClosed(), !r.isStopped) {
        r.hasError = r.isStopped = !0, r.thrownError = n;
        for (var o = r.observers; o.length; )
          o.shift().error(n);
      }
    });
  }, t.prototype.complete = function() {
    var n = this;
    ua(function() {
      if (n._throwIfClosed(), !n.isStopped) {
        n.isStopped = !0;
        for (var r = n.observers; r.length; )
          r.shift().complete();
      }
    });
  }, t.prototype.unsubscribe = function() {
    this.isStopped = this.closed = !0, this.observers = this.currentObservers = null;
  }, Object.defineProperty(t.prototype, "observed", {
    get: function() {
      var n;
      return ((n = this.observers) === null || n === void 0 ? void 0 : n.length) > 0;
    },
    enumerable: !1,
    configurable: !0
  }), t.prototype._trySubscribe = function(n) {
    return this._throwIfClosed(), e.prototype._trySubscribe.call(this, n);
  }, t.prototype._subscribe = function(n) {
    return this._throwIfClosed(), this._checkFinalizedStatuses(n), this._innerSubscribe(n);
  }, t.prototype._innerSubscribe = function(n) {
    var r = this, o = this, i = o.hasError, s = o.isStopped, a = o.observers;
    return i || s ? ny : (this.currentObservers = null, a.push(n), new ko(function() {
      r.currentObservers = null, sl(a, n);
    }));
  }, t.prototype._checkFinalizedStatuses = function(n) {
    var r = this, o = r.hasError, i = r.thrownError, s = r.isStopped;
    o ? n.error(i) : s && n.complete();
  }, t.prototype.asObservable = function() {
    var n = new ul();
    return n.source = this, n;
  }, t.create = function(n, r) {
    return new xp(n, r);
  }, t;
}(ul), xp = function(e) {
  No(t, e);
  function t(n, r) {
    var o = e.call(this) || this;
    return o.destination = n, o.source = r, o;
  }
  return t.prototype.next = function(n) {
    var r, o;
    (o = (r = this.destination) === null || r === void 0 ? void 0 : r.next) === null || o === void 0 || o.call(r, n);
  }, t.prototype.error = function(n) {
    var r, o;
    (o = (r = this.destination) === null || r === void 0 ? void 0 : r.error) === null || o === void 0 || o.call(r, n);
  }, t.prototype.complete = function() {
    var n, r;
    (r = (n = this.destination) === null || n === void 0 ? void 0 : n.complete) === null || r === void 0 || r.call(n);
  }, t.prototype._subscribe = function(n) {
    var r, o;
    return (o = (r = this.source) === null || r === void 0 ? void 0 : r.subscribe(n)) !== null && o !== void 0 ? o : ny;
  }, t;
}(Fi), Fw = function(e) {
  No(t, e);
  function t(n) {
    var r = e.call(this) || this;
    return r._value = n, r;
  }
  return Object.defineProperty(t.prototype, "value", {
    get: function() {
      return this.getValue();
    },
    enumerable: !1,
    configurable: !0
  }), t.prototype._subscribe = function(n) {
    var r = e.prototype._subscribe.call(this, n);
    return !r.closed && n.next(this._value), r;
  }, t.prototype.getValue = function() {
    var n = this, r = n.hasError, o = n.thrownError, i = n._value;
    if (r)
      throw o;
    return this._throwIfClosed(), i;
  }, t.prototype.next = function(n) {
    e.prototype.next.call(this, this._value = n);
  }, t;
}(Fi), Nw = new ul(function(e) {
  return e.complete();
}), iy = vd(function(e) {
  return function() {
    e(this), this.name = "EmptyError", this.message = "no elements in sequence";
  };
});
function kw(e, t) {
  return os(function(n, r) {
    var o = 0;
    n.subscribe(is(r, function(i) {
      r.next(e.call(t, i, o++));
    }));
  });
}
function Rw(e, t) {
  return os(function(n, r) {
    var o = 0;
    n.subscribe(is(r, function(i) {
      return e.call(t, i, o++) && r.next(i);
    }));
  });
}
function xw(e) {
  return os(function(t, n) {
    var r = !1;
    t.subscribe(is(n, function(o) {
      r = !0, n.next(o);
    }, function() {
      r || n.next(e), n.complete();
    }));
  });
}
function Pw(e) {
  return e <= 0 ? function() {
    return Nw;
  } : os(function(t, n) {
    var r = 0;
    t.subscribe(is(n, function(o) {
      ++r <= e && (n.next(o), e <= r && n.complete());
    }));
  });
}
function Lw(e) {
  return e === void 0 && (e = jw), os(function(t, n) {
    var r = !1;
    t.subscribe(is(n, function(o) {
      r = !0, n.next(o);
    }, function() {
      return r ? n.complete() : n.error(e());
    }));
  });
}
function jw() {
  return new iy();
}
function $w(e, t) {
  var n = arguments.length >= 2;
  return function(r) {
    return r.pipe(e ? Rw(function(o, i) {
      return e(o, i, r);
    }) : oy, Pw(1), n ? xw(t) : Lw(function() {
      return new iy();
    }));
  };
}
/**
 * @license Angular v17.3.12
 * (c) 2010-2024 Google LLC. https://angular.io/
 * License: MIT
 */
const Bw = "https://angular.io/errors", Lr = "https://g.co/ng/security#xss";
class v extends Error {
  constructor(t, n) {
    super(me(t, n)), this.code = t;
  }
}
function me(e, t) {
  const n = `NG0${Math.abs(e)}`;
  let r = `${n}${t ? ": " + t : ""}`;
  if (ngDevMode && e < 0) {
    const i = !r.match(/[.,;!?\n]$/) ? "." : "";
    r = `${r}${i} Find more at ${Bw}/${n}`;
  }
  return r;
}
const lu = /* @__PURE__ */ Symbol("InputSignalNode#UNSET"), sy = {
  ...ty,
  transformFn: void 0,
  applyValueToInputSignal(e, t) {
    cu(e, t);
  }
}, Hw = /* @__PURE__ */ Symbol();
function ay(e, t) {
  const n = Object.create(sy);
  n.value = e, n.transformFn = t?.transform;
  function r() {
    if (au(n), n.value === lu)
      throw new v(-950, ngDevMode && "Input is required but no value is available yet.");
    return n.value;
  }
  return r[ht] = n, ngDevMode && (r.toString = () => `[Input Signal: ${r()}]`), r;
}
function en(e) {
  return { toString: e }.toString();
}
const Wr = "__annotations__", qr = "__parameters__", Qr = "__prop__metadata__";
function ss(e, t, n, r, o) {
  return en(() => {
    const i = Cd(t);
    function s(...a) {
      if (this instanceof s)
        return i.call(this, ...a), this;
      const u = new s(...a);
      return function(l) {
        return o && o(l, ...a), (l.hasOwnProperty(Wr) ? l[Wr] : Object.defineProperty(l, Wr, { value: [] })[Wr]).push(u), l;
      };
    }
    return n && (s.prototype = Object.create(n.prototype)), s.prototype.ngMetadataName = e, s.annotationCls = s, s;
  });
}
function Cd(e) {
  return function(...n) {
    if (e) {
      const r = e(...n);
      for (const o in r)
        this[o] = r[o];
    }
  };
}
function Ro(e, t, n) {
  return en(() => {
    const r = Cd(t);
    function o(...i) {
      if (this instanceof o)
        return r.apply(this, i), this;
      const s = new o(...i);
      return a.annotation = s, a;
      function a(u, c, l) {
        const d = u.hasOwnProperty(qr) ? u[qr] : Object.defineProperty(u, qr, { value: [] })[qr];
        for (; d.length <= l; )
          d.push(null);
        return (d[l] = d[l] || []).push(s), u;
      }
    }
    return o.prototype.ngMetadataName = e, o.annotationCls = o, o;
  });
}
function Xn(e, t, n, r) {
  return en(() => {
    const o = Cd(t);
    function i(...s) {
      if (this instanceof i)
        return o.apply(this, s), this;
      const a = new i(...s);
      function u(c, l) {
        if (c === void 0)
          throw new Error("Standard Angular field decorators are not supported in JIT mode.");
        const d = c.constructor, f = d.hasOwnProperty(Qr) ? d[Qr] : Object.defineProperty(d, Qr, { value: {} })[Qr];
        f[l] = f.hasOwnProperty(l) && f[l] || [], f[l].unshift(a);
      }
      return u;
    }
    return n && (i.prototype = Object.create(n.prototype)), i.prototype.ngMetadataName = e, i.annotationCls = i, i;
  });
}
const he = globalThis;
function Vw() {
  const e = typeof location < "u" ? location.toString() : "", t = {
    namedConstructors: e.indexOf("ngDevMode=namedConstructors") != -1,
    firstCreatePass: 0,
    tNode: 0,
    tView: 0,
    rendererCreateTextNode: 0,
    rendererSetText: 0,
    rendererCreateElement: 0,
    rendererAddEventListener: 0,
    rendererSetAttribute: 0,
    rendererRemoveAttribute: 0,
    rendererSetProperty: 0,
    rendererSetClassName: 0,
    rendererAddClass: 0,
    rendererRemoveClass: 0,
    rendererSetStyle: 0,
    rendererRemoveStyle: 0,
    rendererDestroy: 0,
    rendererDestroyNode: 0,
    rendererMoveNode: 0,
    rendererRemoveNode: 0,
    rendererAppendChild: 0,
    rendererInsertBefore: 0,
    rendererCreateComment: 0,
    hydratedNodes: 0,
    hydratedComponents: 0,
    dehydratedViewsRemoved: 0,
    dehydratedViewsCleanupRuns: 0,
    componentsSkippedHydration: 0
  };
  return e.indexOf("ngDevMode=false") === -1 ? (typeof he.ngDevMode != "object" && (he.ngDevMode = {}), Object.assign(he.ngDevMode, t)) : he.ngDevMode = !1, t;
}
function Ed() {
  return typeof ngDevMode > "u" || ngDevMode ? ((typeof ngDevMode != "object" || Object.keys(ngDevMode).length === 0) && Vw(), typeof ngDevMode < "u" && !!ngDevMode) : !1;
}
function ee(e) {
  for (let t in e)
    if (e[t] === ee)
      return t;
  throw Error("Could not find renamed property on target object.");
}
function Uw(e, t) {
  for (const n in t)
    t.hasOwnProperty(n) && !e.hasOwnProperty(n) && (e[n] = t[n]);
}
function Q(e) {
  if (typeof e == "string")
    return e;
  if (Array.isArray(e))
    return "[" + e.map(Q).join(", ") + "]";
  if (e == null)
    return "" + e;
  if (e.overriddenName)
    return `${e.overriddenName}`;
  if (e.name)
    return `${e.name}`;
  const t = e.toString();
  if (t == null)
    return "" + t;
  const n = t.indexOf(`
`);
  return n === -1 ? t : t.substring(0, n);
}
function cl(e, t) {
  return e == null || e === "" ? t === null ? "" : t : t == null || t === "" ? e : e + " " + t;
}
function zw(e, t = 100) {
  if (!e || t < 1 || e.length <= t)
    return e;
  if (t == 1)
    return e.substring(0, 1) + "...";
  const n = Math.round(t / 2);
  return e.substring(0, n) + "..." + e.substring(e.length - n);
}
const Gw = ee({ __forward_ref__: ee });
function du(e) {
  return e.__forward_ref__ = du, e.toString = function() {
    return Q(this());
  }, e;
}
function R(e) {
  return fu(e) ? e() : e;
}
function fu(e) {
  return typeof e == "function" && e.hasOwnProperty(Gw) && e.__forward_ref__ === du;
}
function J(e, t) {
  typeof e != "number" && S(t, typeof e, "number", "===");
}
function Ni(e, t, n) {
  J(e, "Expected a number"), ly(e, n, "Expected number to be less than or equal to"), bn(e, t, "Expected number to be greater than or equal to");
}
function xo(e, t) {
  typeof e != "string" && S(t, e === null ? "null" : typeof e, "string", "===");
}
function uy(e, t) {
  typeof e != "function" && S(t, e === null ? "null" : typeof e, "function", "===");
}
function A(e, t, n) {
  e != t && S(n, e, t, "==");
}
function jt(e, t, n) {
  e == t && S(n, e, t, "!=");
}
function cy(e, t, n) {
  e !== t && S(n, e, t, "===");
}
function jr(e, t, n) {
  e === t && S(n, e, t, "!==");
}
function Qn(e, t, n) {
  e < t || S(n, e, t, "<");
}
function ly(e, t, n) {
  e <= t || S(n, e, t, "<=");
}
function er(e, t, n) {
  e > t || S(n, e, t, ">");
}
function bn(e, t, n) {
  e >= t || S(n, e, t, ">=");
}
function E(e, t) {
  e == null && S(t, e, null, "!=");
}
function S(e, t, n, r) {
  throw new Error(`ASSERTION ERROR: ${e}` + (r == null ? "" : ` [Expected=> ${n} ${r} ${t} <=Actual]`));
}
function An(e) {
  e instanceof Node || S(`The provided value must be an instance of a DOM Node but got ${Q(e)}`);
}
function Ww(e) {
  e instanceof Element || S(`The provided value must be an element but got ${Q(e)}`);
}
function Ee(e, t) {
  E(e, "Array must be defined.");
  const n = e.length;
  (t < 0 || t >= n) && S(`Index expected to be less than ${n} but got ${t}`);
}
function qw(e, ...t) {
  if (t.indexOf(e) !== -1)
    return !0;
  S(`Expected value to be one of ${JSON.stringify(t)} but was ${JSON.stringify(e)}.`);
}
function bd(e) {
  zm() !== null && S(`${e}() should never be called in a reactive context.`);
}
function te(e) {
  return {
    token: e.token,
    providedIn: e.providedIn || null,
    factory: e.factory,
    value: void 0
  };
}
const Qw = te;
function hu(e) {
  return { providers: e.providers || [], imports: e.imports || [] };
}
function as(e) {
  return Pp(e, ki) || Pp(e, dy);
}
function Zw(e) {
  return as(e) !== null;
}
function Pp(e, t) {
  return e.hasOwnProperty(t) ? e[t] : null;
}
function Yw(e) {
  const t = e && (e[ki] || e[dy]);
  return t ? (ngDevMode && console.warn(`DEPRECATED: DI is instantiating a token "${e.name}" that inherits its @Injectable decorator but does not provide one itself.
This will become an error in a future version of Angular. Please add @Injectable() to the "${e.name}" class.`), t) : null;
}
function Ca(e) {
  return e && (e.hasOwnProperty(Ea) || e.hasOwnProperty(Kw)) ? e[Ea] : null;
}
const ki = ee({ ɵprov: ee }), Ea = ee({ ɵinj: ee }), dy = ee({ ngInjectableDef: ee }), Kw = ee({ ngInjectorDef: ee });
class j {
  /**
   * @param _desc   Description for the token,
   *                used only for debugging purposes,
   *                it should but does not need to be unique
   * @param options Options for the token's usage, as described above
   */
  constructor(t, n) {
    this._desc = t, this.ngMetadataName = "InjectionToken", this.ɵprov = void 0, typeof n == "number" ? ((typeof ngDevMode > "u" || ngDevMode) && Qn(n, 0, "Only negative numbers are supported here"), this.__NG_ELEMENT_ID__ = n) : n !== void 0 && (this.ɵprov = te({
      token: this,
      providedIn: n.providedIn || "root",
      factory: n.factory
    }));
  }
  /**
   * @internal
   */
  get multi() {
    return this;
  }
  toString() {
    return `InjectionToken ${this._desc}`;
  }
}
let ll;
function wd() {
  return !ngDevMode && S("getInjectorProfilerContext should never be called in production mode"), ll;
}
function Ge(e) {
  !ngDevMode && S("setInjectorProfilerContext should never be called in production mode");
  const t = ll;
  return ll = e, t;
}
let dl = null;
const Jw = (e) => {
  !ngDevMode && S("setInjectorProfiler should never be called in production mode"), dl = e;
};
function Md(e) {
  !ngDevMode && S("Injector profiler should never be called in production mode"), dl?.(e);
}
function fl(e, t = !1) {
  !ngDevMode && S("Injector profiler should never be called in production mode");
  let n;
  typeof e == "function" || e instanceof j ? n = e : n = R(e.provide);
  let r = e;
  e instanceof j && (r = e.ɵprov || e), Md({
    type: 2,
    context: wd(),
    providerRecord: { token: n, provider: r, isViewProvider: t }
  });
}
function ba(e) {
  !ngDevMode && S("Injector profiler should never be called in production mode"), Md({
    type: 1,
    context: wd(),
    instance: { value: e }
  });
}
function fy(e, t, n) {
  !ngDevMode && S("Injector profiler should never be called in production mode"), Md({
    type: 0,
    context: wd(),
    service: { token: e, value: t, flags: n }
  });
}
function gi(e, t, n) {
  !ngDevMode && S("runInInjectorProfilerContext should never be called in production mode");
  const r = Ge({ injector: e, token: t });
  try {
    n();
  } finally {
    Ge(r);
  }
}
function us(e) {
  return e && !!e.ɵproviders;
}
const Po = ee({ ɵcmp: ee }), pu = ee({ ɵdir: ee }), gu = ee({ ɵpipe: ee }), _d = ee({ ɵmod: ee }), gn = ee({ ɵfac: ee }), eo = ee({ __NG_ELEMENT_ID__: ee }), Lp = ee({ __NG_ENV_ID__: ee });
function L(e) {
  return typeof e == "string" ? e : e == null ? "" : String(e);
}
function U(e) {
  return typeof e == "function" ? e.name || e.toString() : typeof e == "object" && e != null && typeof e.type == "function" ? e.type.name || e.type.toString() : L(e);
}
function Xw(e) {
  let t = e[Po] || null;
  return t !== null && t.debugInfo ? eM(t.debugInfo) : U(e);
}
function eM(e) {
  return !e.filePath || !e.lineNumber ? e.className : `${e.className} (at ${e.filePath}:${e.lineNumber})`;
}
function Sd(e, t) {
  const n = t ? `. Dependency path: ${t.join(" > ")} > ${e}` : "";
  throw new v(-200, ngDevMode ? `Circular dependency in DI detected for ${e}${n}` : e);
}
function jp() {
  throw new Error("Cannot mix multi providers and regular providers");
}
function hl(e, t, n) {
  if (e && t) {
    const r = t.map((o) => o == n ? "?" + n + "?" : "...");
    throw new Error(`Invalid provider for the NgModule '${Q(e)}' - only instances of Provider and Type are allowed, got: [${r.join(", ")}]`);
  } else throw us(n) ? n.ɵfromNgModule ? new v(207, "Invalid providers from 'importProvidersFrom' present in a non-environment injector. 'importProvidersFrom' can't be used for component providers.") : new v(207, "Invalid providers present in a non-environment injector. 'EnvironmentProviders' can't be used for component providers.") : new Error("Invalid provider");
}
function Td(e, t) {
  const n = ngDevMode && `No provider for ${U(e)} found${t ? ` in ${t}` : ""}`;
  throw new v(-201, n);
}
var z;
(function(e) {
  e[e.Default = 0] = "Default", e[e.Host = 1] = "Host", e[e.Self = 2] = "Self", e[e.SkipSelf = 4] = "SkipSelf", e[e.Optional = 8] = "Optional";
})(z || (z = {}));
let wa;
function hy() {
  return wa;
}
function et(e) {
  const t = wa;
  return wa = e, t;
}
function py(e, t, n) {
  const r = as(e);
  if (r && r.providedIn == "root")
    return r.value === void 0 ? r.value = r.factory() : r.value;
  if (n & z.Optional)
    return null;
  if (t !== void 0)
    return t;
  Td(e, "Injector");
}
function tM(e) {
  ngDevMode && jt(wa, e, "Calling ɵɵinject would cause infinite recursion");
}
const nM = {}, Ri = nM, pl = "__NG_DI_FLAG__", Ma = "ngTempTokenPath", rM = "ngTokenPath", oM = /\n/gm, iM = "ɵ", $p = "__source";
let to;
function sM() {
  return to;
}
function ln(e) {
  const t = to;
  return to = e, t;
}
function aM(e, t = z.Default) {
  if (to === void 0)
    throw new v(-203, ngDevMode && "inject() must be called from an injection context such as a constructor, a factory function, a field initializer, or a function used with `runInInjectionContext`.");
  if (to === null)
    return py(e, void 0, t);
  {
    const n = to.get(e, t & z.Optional ? null : void 0, t);
    return ngDevMode && fy(e, n, t), n;
  }
}
function Ne(e, t = z.Default) {
  return (hy() || aM)(R(e), t);
}
function Ad(e) {
  throw new v(202, ngDevMode && `This constructor is not compatible with Angular Dependency Injection because its dependency at index ${e} of the parameter list is invalid.
This can happen if the dependency type is a primitive like a string or if an ancestor of this class is missing an Angular decorator.

Please check that 1) the type for the parameter at index ${e} is correct and 2) the correct Angular decorators are defined for this class and its ancestors.`);
}
function w(e, t = z.Default) {
  return Ne(e, cs(t));
}
function cs(e) {
  return typeof e > "u" || typeof e == "number" ? e : 0 | // comment to force a line break in the formatter
  (e.optional && 8) | (e.host && 1) | (e.self && 2) | (e.skipSelf && 4);
}
function gl(e) {
  const t = [];
  for (let n = 0; n < e.length; n++) {
    const r = R(e[n]);
    if (Array.isArray(r)) {
      if (r.length === 0)
        throw new v(900, ngDevMode && "Arguments array must have arguments.");
      let o, i = z.Default;
      for (let s = 0; s < r.length; s++) {
        const a = r[s], u = uM(a);
        typeof u == "number" ? u === -1 ? o = a.token : i |= u : o = a;
      }
      t.push(Ne(o, i));
    } else
      t.push(Ne(r));
  }
  return t;
}
function ls(e, t) {
  return e[pl] = t, e.prototype[pl] = t, e;
}
function uM(e) {
  return e[pl];
}
function cM(e, t, n, r) {
  const o = e[Ma];
  throw t[$p] && o.unshift(t[$p]), e.message = lM(`
` + e.message, o, n, r), e[rM] = o, e[Ma] = null, e;
}
function lM(e, t, n, r = null) {
  e = e && e.charAt(0) === `
` && e.charAt(1) == iM ? e.slice(2) : e;
  let o = Q(t);
  if (Array.isArray(t))
    o = t.map(Q).join(" -> ");
  else if (typeof t == "object") {
    let i = [];
    for (let s in t)
      if (t.hasOwnProperty(s)) {
        let a = t[s];
        i.push(s + ":" + (typeof a == "string" ? JSON.stringify(a) : Q(a)));
      }
    o = `{${i.join(", ")}}`;
  }
  return `${n}${r ? "(" + r + ")" : ""}[${o}]: ${e.replace(oM, `
  `)}`;
}
const ft = ls(
  // Disable tslint because `DecoratorFlags` is a const enum which gets inlined.
  // tslint:disable-next-line: no-toplevel-property-access
  Ro("Inject", (e) => ({ token: e })),
  -1
  /* DecoratorFlags.Inject */
), Yt = (
  // Disable tslint because `InternalInjectFlags` is a const enum which gets inlined.
  // tslint:disable-next-line: no-toplevel-property-access
  ls(
    Ro("Optional"),
    8
    /* InternalInjectFlags.Optional */
  )
), gy = (
  // Disable tslint because `InternalInjectFlags` is a const enum which gets inlined.
  // tslint:disable-next-line: no-toplevel-property-access
  ls(
    Ro("Self"),
    2
    /* InternalInjectFlags.Self */
  )
), mu = (
  // Disable tslint because `InternalInjectFlags` is a const enum which gets inlined.
  // tslint:disable-next-line: no-toplevel-property-access
  ls(
    Ro("SkipSelf"),
    4
    /* InternalInjectFlags.SkipSelf */
  )
), ds = (
  // Disable tslint because `InternalInjectFlags` is a const enum which gets inlined.
  // tslint:disable-next-line: no-toplevel-property-access
  ls(
    Ro("Host"),
    1
    /* InternalInjectFlags.Host */
  )
);
function cr(e, t) {
  const n = e.hasOwnProperty(gn);
  if (!n && t === !0 && ngDevMode)
    throw new Error(`Type ${Q(e)} does not have 'ɵfac' property.`);
  return n ? e[gn] : null;
}
function dM(e, t, n) {
  if (e.length !== t.length)
    return !1;
  for (let r = 0; r < e.length; r++) {
    let o = e[r], i = t[r];
    if (n && (o = n(o), i = n(i)), i !== o)
      return !1;
  }
  return !0;
}
function tt(e) {
  return e.flat(Number.POSITIVE_INFINITY);
}
function go(e, t) {
  e.forEach((n) => Array.isArray(n) ? go(n, t) : t(n));
}
function my(e, t, n) {
  t >= e.length ? e.push(n) : e.splice(t, 0, n);
}
function _a(e, t) {
  return t >= e.length - 1 ? e.pop() : e.splice(t, 1)[0];
}
function mi(e, t) {
  const n = [];
  for (let r = 0; r < e; r++)
    n.push(t);
  return n;
}
function Bp(e, t, n) {
  const r = e.length - n;
  for (; t < r; )
    e[t] = e[t + n], t++;
  for (; n--; )
    e.pop();
}
function yy(e, t, n, r) {
  ngDevMode && ly(t, e.length, "Can't insert past array end.");
  let o = e.length;
  if (o == t)
    e.push(n, r);
  else if (o === 1)
    e.push(r, e[0]), e[0] = n;
  else {
    for (o--, e.push(e[o - 1], e[o]); o > t; ) {
      const i = o - 2;
      e[o] = e[i], o--;
    }
    e[t] = n, e[t + 1] = r;
  }
}
function yt(e, t, n) {
  let r = fs(e, t);
  return r >= 0 ? e[r | 1] = n : (r = ~r, yy(e, r, t, n)), r;
}
function bc(e, t) {
  const n = fs(e, t);
  if (n >= 0)
    return e[n | 1];
}
function fs(e, t) {
  return fM(e, t, 1);
}
function fM(e, t, n) {
  ngDevMode && A(Array.isArray(e), !0, "Expecting an array");
  let r = 0, o = e.length >> n;
  for (; o !== r; ) {
    const i = r + (o - r >> 1), s = e[i << n];
    if (t === s)
      return i << n;
    s > t ? o = i : r = i + 1;
  }
  return ~(o << n);
}
const xt = {}, q = [];
(typeof ngDevMode > "u" || ngDevMode) && Ed() && (Object.freeze(xt), Object.freeze(q));
const lr = new j(ngDevMode ? "ENVIRONMENT_INITIALIZER" : ""), Od = new j(
  ngDevMode ? "INJECTOR" : "",
  // Disable tslint because this is const enum which gets inlined not top level prop access.
  // tslint:disable-next-line: no-toplevel-property-access
  -1
  /* InjectorMarkers.Injector */
), Fd = new j(ngDevMode ? "INJECTOR_DEF_TYPES" : "");
class yu {
  get(t, n = Ri) {
    if (n === Ri) {
      const r = new Error(`NullInjectorError: No provider for ${Q(t)}!`);
      throw r.name = "NullInjectorError", r;
    }
    return n;
  }
}
var dr;
(function(e) {
  e[e.OnPush = 0] = "OnPush", e[e.Default = 1] = "Default";
})(dr || (dr = {}));
var mn;
(function(e) {
  e[e.Emulated = 0] = "Emulated", e[e.None = 2] = "None", e[e.ShadowDom = 3] = "ShadowDom";
})(mn || (mn = {}));
var yn;
(function(e) {
  e[e.None = 0] = "None", e[e.SignalBased = 1] = "SignalBased", e[e.HasDecoratorInputTransform = 2] = "HasDecoratorInputTransform";
})(yn || (yn = {}));
function hM(e, t, n) {
  ngDevMode && jt(t, "", 'can not look for "" string.');
  let r = e.length;
  for (; ; ) {
    const o = e.indexOf(t, n);
    if (o === -1)
      return o;
    if (o === 0 || e.charCodeAt(o - 1) <= 32) {
      const i = t.length;
      if (o + i === r || e.charCodeAt(o + i) <= 32)
        return o;
    }
    n = o + 1;
  }
}
function ml(e, t, n) {
  let r = 0;
  for (; r < n.length; ) {
    const o = n[r];
    if (typeof o == "number") {
      if (o !== 0)
        break;
      r++;
      const i = n[r++], s = n[r++], a = n[r++];
      ngDevMode && ngDevMode.rendererSetAttribute++, e.setAttribute(t, s, a, i);
    } else {
      const i = o, s = n[++r];
      ngDevMode && ngDevMode.rendererSetAttribute++, vy(i) ? e.setProperty(t, i, s) : e.setAttribute(t, i, s), r++;
    }
  }
  return r;
}
function Dy(e) {
  return e === 3 || e === 4 || e === 6;
}
function vy(e) {
  return e.charCodeAt(0) === 64;
}
function xi(e, t) {
  if (!(t === null || t.length === 0)) if (e === null || e.length === 0)
    e = t.slice();
  else {
    let n = -1;
    for (let r = 0; r < t.length; r++) {
      const o = t[r];
      typeof o == "number" ? n = o : n === 0 || (n === -1 || n === 2 ? Hp(e, n, o, null, t[++r]) : Hp(e, n, o, null, null));
    }
  }
  return e;
}
function Hp(e, t, n, r, o) {
  let i = 0, s = e.length;
  if (t === -1)
    s = -1;
  else
    for (; i < e.length; ) {
      const a = e[i++];
      if (typeof a == "number") {
        if (a === t) {
          s = -1;
          break;
        } else if (a > t) {
          s = i - 1;
          break;
        }
      }
    }
  for (; i < e.length; ) {
    const a = e[i];
    if (typeof a == "number")
      break;
    if (a === n) {
      o !== null && (e[i + 1] = o);
      return;
    }
    i++, o !== null && i++;
  }
  s !== -1 && (e.splice(s, 0, t), i = s + 1), e.splice(i++, 0, n), o !== null && e.splice(i++, 0, o);
}
const Iy = "ng-template";
function pM(e, t, n, r) {
  ngDevMode && A(n, n.toLowerCase(), "Class name expected to be lowercase.");
  let o = 0;
  if (r) {
    for (; o < t.length && typeof t[o] == "string"; o += 2)
      if (t[o] === "class" && hM(t[o + 1].toLowerCase(), n, 0) !== -1)
        return !0;
  } else if (Nd(e))
    return !1;
  if (o = t.indexOf(1, o), o > -1) {
    let i;
    for (; ++o < t.length && typeof (i = t[o]) == "string"; )
      if (i.toLowerCase() === n)
        return !0;
  }
  return !1;
}
function Nd(e) {
  return e.type === 4 && e.value !== Iy;
}
function gM(e, t, n) {
  const r = e.type === 4 && !n ? Iy : e.value;
  return t === r;
}
function mM(e, t, n) {
  ngDevMode && E(t[0], "Selector should have a tag name");
  let r = 4;
  const o = e.attrs, i = o !== null ? vM(o) : 0;
  let s = !1;
  for (let a = 0; a < t.length; a++) {
    const u = t[a];
    if (typeof u == "number") {
      if (!s && !St(r) && !St(u))
        return !1;
      if (s && St(u))
        continue;
      s = !1, r = u | r & 1;
      continue;
    }
    if (!s)
      if (r & 4) {
        if (r = 2 | r & 1, u !== "" && !gM(e, u, n) || u === "" && t.length === 1) {
          if (St(r))
            return !1;
          s = !0;
        }
      } else if (r & 8) {
        if (o === null || !pM(e, o, u, n)) {
          if (St(r))
            return !1;
          s = !0;
        }
      } else {
        const c = t[++a], l = yM(u, o, Nd(e), n);
        if (l === -1) {
          if (St(r))
            return !1;
          s = !0;
          continue;
        }
        if (c !== "") {
          let d;
          if (l > i ? d = "" : (ngDevMode && jt(o[l], 0, "We do not match directives on namespaced attributes"), d = o[l + 1].toLowerCase()), r & 2 && c !== d) {
            if (St(r))
              return !1;
            s = !0;
          }
        }
      }
  }
  return St(r) || s;
}
function St(e) {
  return (e & 1) === 0;
}
function yM(e, t, n, r) {
  if (t === null)
    return -1;
  let o = 0;
  if (r || !n) {
    let i = !1;
    for (; o < t.length; ) {
      const s = t[o];
      if (s === e)
        return o;
      if (s === 3 || s === 6)
        i = !0;
      else if (s === 1 || s === 2) {
        let a = t[++o];
        for (; typeof a == "string"; )
          a = t[++o];
        continue;
      } else {
        if (s === 4)
          break;
        if (s === 0) {
          o += 4;
          continue;
        }
      }
      o += i ? 1 : 2;
    }
    return -1;
  } else
    return IM(t, e);
}
function Cy(e, t, n = !1) {
  for (let r = 0; r < t.length; r++)
    if (mM(e, t[r], n))
      return !0;
  return !1;
}
function DM(e) {
  const t = e.attrs;
  if (t != null) {
    const n = t.indexOf(
      5
      /* AttributeMarker.ProjectAs */
    );
    if (!(n & 1))
      return t[n + 1];
  }
  return null;
}
function vM(e) {
  for (let t = 0; t < e.length; t++) {
    const n = e[t];
    if (Dy(n))
      return t;
  }
  return e.length;
}
function IM(e, t) {
  let n = e.indexOf(
    4
    /* AttributeMarker.Template */
  );
  if (n > -1)
    for (n++; n < e.length; ) {
      const r = e[n];
      if (typeof r == "number")
        return -1;
      if (r === t)
        return n;
      n++;
    }
  return -1;
}
function CM(e, t) {
  e: for (let n = 0; n < t.length; n++) {
    const r = t[n];
    if (e.length === r.length) {
      for (let o = 0; o < e.length; o++)
        if (e[o] !== r[o])
          continue e;
      return !0;
    }
  }
  return !1;
}
function Vp(e, t) {
  return e ? ":not(" + t.trim() + ")" : t;
}
function EM(e) {
  let t = e[0], n = 1, r = 2, o = "", i = !1;
  for (; n < e.length; ) {
    let s = e[n];
    if (typeof s == "string")
      if (r & 2) {
        const a = e[++n];
        o += "[" + s + (a.length > 0 ? '="' + a + '"' : "") + "]";
      } else r & 8 ? o += "." + s : r & 4 && (o += " " + s);
    else
      o !== "" && !St(s) && (t += Vp(i, o), o = ""), r = s, i = i || !St(r);
    n++;
  }
  return o !== "" && (t += Vp(i, o)), t;
}
function Ey(e) {
  return e.map(EM).join(",");
}
function bM(e) {
  const t = [], n = [];
  let r = 1, o = 2;
  for (; r < e.length; ) {
    let i = e[r];
    if (typeof i == "string")
      o === 2 ? i !== "" && t.push(i, e[++r]) : o === 8 && n.push(i);
    else {
      if (!St(o))
        break;
      o = i;
    }
    r++;
  }
  return { attrs: t, classes: n };
}
function by(e) {
  return en(() => {
    (typeof ngDevMode > "u" || ngDevMode) && Ed();
    const t = _y(e), n = {
      ...t,
      decls: e.decls,
      vars: e.vars,
      template: e.template,
      consts: e.consts || null,
      ngContentSelectors: e.ngContentSelectors,
      onPush: e.changeDetection === dr.OnPush,
      directiveDefs: null,
      // assigned in noSideEffects
      pipeDefs: null,
      // assigned in noSideEffects
      dependencies: t.standalone && e.dependencies || null,
      getStandaloneInjector: null,
      signals: e.signals ?? !1,
      data: e.data || {},
      encapsulation: e.encapsulation || mn.Emulated,
      styles: e.styles || q,
      _: null,
      schemas: e.schemas || null,
      tView: null,
      id: ""
    };
    Sy(n);
    const r = e.dependencies;
    return n.directiveDefs = Sa(
      r,
      /* pipeDef */
      !1
    ), n.pipeDefs = Sa(
      r,
      /* pipeDef */
      !0
    ), n.id = _M(n), n;
  });
}
function wM(e) {
  return V(e) || Fe(e);
}
function MM(e) {
  return e !== null;
}
function kd(e) {
  return en(() => ({
    type: e.type,
    bootstrap: e.bootstrap || q,
    declarations: e.declarations || q,
    imports: e.imports || q,
    exports: e.exports || q,
    transitiveCompileScopes: null,
    schemas: e.schemas || null,
    id: e.id || null
  }));
}
function Up(e, t) {
  if (e == null)
    return xt;
  const n = {};
  for (const r in e)
    if (e.hasOwnProperty(r)) {
      const o = e[r];
      let i, s, a = yn.None;
      Array.isArray(o) ? (a = o[0], i = o[1], s = o[2] ?? i) : (i = o, s = o), t ? (n[i] = a !== yn.None ? [r, a] : r, t[i] = s) : n[i] = r;
    }
  return n;
}
function wy(e) {
  return en(() => {
    const t = _y(e);
    return Sy(t), t;
  });
}
function My(e) {
  return {
    type: e.type,
    name: e.name,
    factory: null,
    pure: e.pure !== !1,
    standalone: e.standalone === !0,
    onDestroy: e.type.prototype.ngOnDestroy || null
  };
}
function V(e) {
  return e[Po] || null;
}
function Fe(e) {
  return e[pu] || null;
}
function dt(e) {
  return e[gu] || null;
}
function On(e) {
  const t = V(e) || Fe(e) || dt(e);
  return t !== null ? t.standalone : !1;
}
function pt(e, t) {
  const n = e[_d] || null;
  if (!n && t === !0)
    throw new Error(`Type ${Q(e)} does not have 'ɵmod' property.`);
  return n;
}
function _y(e) {
  const t = {};
  return {
    type: e.type,
    providersResolver: null,
    factory: null,
    hostBindings: e.hostBindings || null,
    hostVars: e.hostVars || 0,
    hostAttrs: e.hostAttrs || null,
    contentQueries: e.contentQueries || null,
    declaredInputs: t,
    inputTransforms: null,
    inputConfig: e.inputs || xt,
    exportAs: e.exportAs || null,
    standalone: e.standalone === !0,
    signals: e.signals === !0,
    selectors: e.selectors || q,
    viewQuery: e.viewQuery || null,
    features: e.features || null,
    setInput: null,
    findHostDirectiveDefs: null,
    hostDirectives: null,
    inputs: Up(e.inputs, t),
    outputs: Up(e.outputs),
    debugInfo: null
  };
}
function Sy(e) {
  e.features?.forEach((t) => t(e));
}
function Sa(e, t) {
  if (!e)
    return null;
  const n = t ? dt : wM;
  return () => (typeof e == "function" ? e() : e).map((r) => n(r)).filter(MM);
}
const ca = /* @__PURE__ */ new Map();
function _M(e) {
  let t = 0;
  const n = [
    e.selectors,
    e.ngContentSelectors,
    e.hostVars,
    e.hostAttrs,
    e.consts,
    e.vars,
    e.decls,
    e.encapsulation,
    e.standalone,
    e.signals,
    e.exportAs,
    JSON.stringify(e.inputs),
    JSON.stringify(e.outputs),
    // We cannot use 'componentDef.type.name' as the name of the symbol will change and will not
    // match in the server and browser bundles.
    Object.getOwnPropertyNames(e.type.prototype),
    !!e.contentQueries,
    !!e.viewQuery
  ].join("|");
  for (const o of n)
    t = Math.imul(31, t) + o.charCodeAt(0) << 0;
  t += 2147483648;
  const r = "c" + t;
  if (typeof ngDevMode > "u" || ngDevMode)
    if (ca.has(r)) {
      const o = ca.get(r);
      o !== e.type && console.warn(me(-912, `Component ID generation collision detected. Components '${o.name}' and '${e.type.name}' with selector '${Ey(e.selectors)}' generated the same component ID. To fix this, you can change the selector of one of those components or add an extra host attribute to force a different ID.`));
    } else
      ca.set(r, e.type);
  return r;
}
function hs(e) {
  return {
    ɵproviders: e
  };
}
function Ty(...e) {
  return {
    ɵproviders: Rd(!0, e),
    ɵfromNgModule: !0
  };
}
function Rd(e, ...t) {
  const n = [], r = /* @__PURE__ */ new Set();
  let o;
  const i = (s) => {
    n.push(s);
  };
  return go(t, (s) => {
    if ((typeof ngDevMode > "u" || ngDevMode) && e && V(s)?.standalone)
      throw new v(800, `Importing providers supports NgModule or ModuleWithProviders but got a standalone component "${U(s)}"`);
    const a = s;
    Ta(a, i, [], r) && (o ||= [], o.push(a));
  }), o !== void 0 && Ay(o, i), n;
}
function Ay(e, t) {
  for (let n = 0; n < e.length; n++) {
    const { ngModule: r, providers: o } = e[n];
    xd(o, (i) => {
      ngDevMode && Oy(i, o || q, r), t(i, r);
    });
  }
}
function Ta(e, t, n, r) {
  if (e = R(e), !e)
    return !1;
  let o = null, i = Ca(e);
  const s = !i && V(e);
  if (!i && !s) {
    const u = e.ngModule;
    if (i = Ca(u), i)
      o = u;
    else
      return !1;
  } else {
    if (s && !s.standalone)
      return !1;
    o = e;
  }
  if (ngDevMode && n.indexOf(o) !== -1) {
    const u = Q(o), c = n.map(Q);
    Sd(u, c);
  }
  const a = r.has(o);
  if (s) {
    if (a)
      return !1;
    if (r.add(o), s.dependencies) {
      const u = typeof s.dependencies == "function" ? s.dependencies() : s.dependencies;
      for (const c of u)
        Ta(c, t, n, r);
    }
  } else if (i) {
    if (i.imports != null && !a) {
      ngDevMode && n.push(o), r.add(o);
      let c;
      try {
        go(i.imports, (l) => {
          Ta(l, t, n, r) && (c ||= [], c.push(l));
        });
      } finally {
        ngDevMode && n.pop();
      }
      c !== void 0 && Ay(c, t);
    }
    if (!a) {
      const c = cr(o) || (() => new o());
      t({ provide: o, useFactory: c, deps: q }, o), t({ provide: Fd, useValue: o, multi: !0 }, o), t({ provide: lr, useValue: () => Ne(o), multi: !0 }, o);
    }
    const u = i.providers;
    if (u != null && !a) {
      const c = e;
      xd(u, (l) => {
        ngDevMode && Oy(l, u, c), t(l, c);
      });
    }
  } else
    return !1;
  return o !== e && e.providers !== void 0;
}
function Oy(e, t, n) {
  if (fr(e) || Du(e) || Ny(e) || Fy(e))
    return;
  R(e && (e.useClass || e.provide)) || hl(n, t, e);
}
function xd(e, t) {
  for (let n of e)
    us(n) && (n = n.ɵproviders), Array.isArray(n) ? xd(n, t) : t(n);
}
const SM = ee({ provide: String, useValue: ee });
function Du(e) {
  return e !== null && typeof e == "object" && SM in e;
}
function Fy(e) {
  return !!(e && e.useExisting);
}
function Ny(e) {
  return !!(e && e.useFactory);
}
function fr(e) {
  return typeof e == "function";
}
function TM(e) {
  return !!e.useClass;
}
const Pd = new j(ngDevMode ? "Set Injector scope." : ""), la = {}, zp = {};
let wc;
function vu() {
  return wc === void 0 && (wc = new yu()), wc;
}
class Pt {
}
class Lo extends Pt {
  /**
   * Flag indicating that this injector was previously destroyed.
   */
  get destroyed() {
    return this._destroyed;
  }
  constructor(t, n, r, o) {
    super(), this.parent = n, this.source = r, this.scopes = o, this.records = /* @__PURE__ */ new Map(), this._ngOnDestroyHooks = /* @__PURE__ */ new Set(), this._onDestroyHooks = [], this._destroyed = !1, Dl(t, (s) => this.processProvider(s)), this.records.set(Od, Zr(void 0, this)), o.has("environment") && this.records.set(Pt, Zr(void 0, this));
    const i = this.records.get(Pd);
    i != null && typeof i.value == "string" && this.scopes.add(i.value), this.injectorDefTypes = new Set(this.get(Fd, q, z.Self));
  }
  /**
   * Destroy the injector and release references to every instance or provider associated with it.
   *
   * Also calls the `OnDestroy` lifecycle hooks of every instance that was created for which a
   * hook was found.
   */
  destroy() {
    this.assertNotDestroyed(), this._destroyed = !0;
    const t = $(null);
    try {
      for (const r of this._ngOnDestroyHooks)
        r.ngOnDestroy();
      const n = this._onDestroyHooks;
      this._onDestroyHooks = [];
      for (const r of n)
        r();
    } finally {
      this.records.clear(), this._ngOnDestroyHooks.clear(), this.injectorDefTypes.clear(), $(t);
    }
  }
  onDestroy(t) {
    return this.assertNotDestroyed(), this._onDestroyHooks.push(t), () => this.removeOnDestroy(t);
  }
  runInContext(t) {
    this.assertNotDestroyed();
    const n = ln(this), r = et(void 0);
    let o;
    ngDevMode && (o = Ge({ injector: this, token: null }));
    try {
      return t();
    } finally {
      ln(n), et(r), ngDevMode && Ge(o);
    }
  }
  get(t, n = Ri, r = z.Default) {
    if (this.assertNotDestroyed(), t.hasOwnProperty(Lp))
      return t[Lp](this);
    r = cs(r);
    let o;
    ngDevMode && (o = Ge({ injector: this, token: t }));
    const i = ln(this), s = et(void 0);
    try {
      if (!(r & z.SkipSelf)) {
        let u = this.records.get(t);
        if (u === void 0) {
          const c = kM(t) && as(t);
          c && this.injectableDefInScope(c) ? (ngDevMode && gi(this, t, () => {
            fl(t);
          }), u = Zr(yl(t), la)) : u = null, this.records.set(t, u);
        }
        if (u != null)
          return this.hydrate(t, u);
      }
      const a = r & z.Self ? vu() : this.parent;
      return n = r & z.Optional && n === Ri ? null : n, a.get(t, n);
    } catch (a) {
      if (a.name === "NullInjectorError") {
        if ((a[Ma] = a[Ma] || []).unshift(Q(t)), i)
          throw a;
        return cM(a, t, "R3InjectorError", this.source);
      } else
        throw a;
    } finally {
      et(s), ln(i), ngDevMode && Ge(o);
    }
  }
  /** @internal */
  resolveInjectorInitializers() {
    const t = $(null), n = ln(this), r = et(void 0);
    let o;
    ngDevMode && (o = Ge({ injector: this, token: null }));
    try {
      const i = this.get(lr, q, z.Self);
      if (ngDevMode && !Array.isArray(i))
        throw new v(-209, `Unexpected type of the \`ENVIRONMENT_INITIALIZER\` token value (expected an array, but got ${typeof i}). Please check that the \`ENVIRONMENT_INITIALIZER\` token is configured as a \`multi: true\` provider.`);
      for (const s of i)
        s();
    } finally {
      ln(n), et(r), ngDevMode && Ge(o), $(t);
    }
  }
  toString() {
    const t = [], n = this.records;
    for (const r of n.keys())
      t.push(Q(r));
    return `R3Injector[${t.join(", ")}]`;
  }
  assertNotDestroyed() {
    if (this._destroyed)
      throw new v(205, ngDevMode && "Injector has already been destroyed.");
  }
  /**
   * Process a `SingleProvider` and add it.
   */
  processProvider(t) {
    t = R(t);
    let n = fr(t) ? t : R(t && t.provide);
    const r = OM(t);
    if (ngDevMode && gi(this, n, () => {
      Du(t) && ba(t.useValue), fl(t);
    }), !fr(t) && t.multi === !0) {
      let o = this.records.get(n);
      o ? ngDevMode && o.multi === void 0 && jp() : (o = Zr(void 0, la, !0), o.factory = () => gl(o.multi), this.records.set(n, o)), n = t, o.multi.push(t);
    } else if (ngDevMode) {
      const o = this.records.get(n);
      o && o.multi !== void 0 && jp();
    }
    this.records.set(n, r);
  }
  hydrate(t, n) {
    const r = $(null);
    try {
      return ngDevMode && n.value === zp ? Sd(Q(t)) : n.value === la && (n.value = zp, ngDevMode ? gi(this, t, () => {
        n.value = n.factory(), ba(n.value);
      }) : n.value = n.factory()), typeof n.value == "object" && n.value && NM(n.value) && this._ngOnDestroyHooks.add(n.value), n.value;
    } finally {
      $(r);
    }
  }
  injectableDefInScope(t) {
    if (!t.providedIn)
      return !1;
    const n = R(t.providedIn);
    return typeof n == "string" ? n === "any" || this.scopes.has(n) : this.injectorDefTypes.has(n);
  }
  removeOnDestroy(t) {
    const n = this._onDestroyHooks.indexOf(t);
    n !== -1 && this._onDestroyHooks.splice(n, 1);
  }
}
function yl(e) {
  const t = as(e), n = t !== null ? t.factory : cr(e);
  if (n !== null)
    return n;
  if (e instanceof j)
    throw new v(204, ngDevMode && `Token ${Q(e)} is missing a ɵprov definition.`);
  if (e instanceof Function)
    return AM(e);
  throw new v(204, ngDevMode && "unreachable");
}
function AM(e) {
  const t = e.length;
  if (t > 0)
    throw new v(204, ngDevMode && `Can't resolve all parameters for ${Q(e)}: (${mi(t, "?").join(", ")}).`);
  const n = Yw(e);
  return n !== null ? () => n.factory(e) : () => new e();
}
function OM(e) {
  if (Du(e))
    return Zr(void 0, e.useValue);
  {
    const t = ky(e);
    return Zr(t, la);
  }
}
function ky(e, t, n) {
  let r;
  if (ngDevMode && us(e) && hl(void 0, n, e), fr(e)) {
    const o = R(e);
    return cr(o) || yl(o);
  } else if (Du(e))
    r = () => R(e.useValue);
  else if (Ny(e))
    r = () => e.useFactory(...gl(e.deps || []));
  else if (Fy(e))
    r = () => Ne(R(e.useExisting));
  else {
    const o = R(e && (e.useClass || e.provide));
    if (ngDevMode && !o && hl(t, n, e), FM(e))
      r = () => new o(...gl(e.deps));
    else
      return cr(o) || yl(o);
  }
  return r;
}
function Zr(e, t, n = !1) {
  return {
    factory: e,
    value: t,
    multi: n ? [] : void 0
  };
}
function FM(e) {
  return !!e.deps;
}
function NM(e) {
  return e !== null && typeof e == "object" && typeof e.ngOnDestroy == "function";
}
function kM(e) {
  return typeof e == "function" || typeof e == "object" && e instanceof j;
}
function Dl(e, t) {
  for (const n of e)
    Array.isArray(n) ? Dl(n, t) : n && us(n) ? Dl(n.ɵproviders, t) : t(n);
}
function Ld(e, t) {
  e instanceof Lo && e.assertNotDestroyed();
  let n;
  ngDevMode && (n = Ge({ injector: e, token: null }));
  const r = ln(e), o = et(void 0);
  try {
    return t();
  } finally {
    ln(r), ngDevMode && Ge(n), et(o);
  }
}
function Ry() {
  return hy() !== void 0 || sM() != null;
}
function Ze(e) {
  if (!Ry())
    throw new v(-203, ngDevMode && e.name + "() can only be used within an injection context such as a constructor, a factory function, a field initializer, or a function used with `runInInjectionContext`");
}
var P;
(function(e) {
  e[e.Directive = 0] = "Directive", e[e.Component = 1] = "Component", e[e.Injectable = 2] = "Injectable", e[e.Pipe = 3] = "Pipe", e[e.NgModule = 4] = "NgModule";
})(P || (P = {}));
var Gp;
(function(e) {
  e[e.Directive = 0] = "Directive", e[e.Pipe = 1] = "Pipe", e[e.NgModule = 2] = "NgModule";
})(Gp || (Gp = {}));
var Wp;
(function(e) {
  e[e.Emulated = 0] = "Emulated", e[e.None = 2] = "None", e[e.ShadowDom = 3] = "ShadowDom";
})(Wp || (Wp = {}));
function Ae(e) {
  const t = he.ng;
  if (t && t.ɵcompilerFacade)
    return t.ɵcompilerFacade;
  if (typeof ngDevMode > "u" || ngDevMode) {
    console.error(`JIT compilation failed for ${e.kind}`, e.type);
    let n = `The ${e.kind} '${e.type.name}' needs to be compiled using the JIT compiler, but '@angular/compiler' is not available.

`;
    throw e.usage === 1 ? (n += `The ${e.kind} is part of a library that has been partially compiled.
`, n += `However, the Angular Linker has not processed the library such that JIT compilation is used as fallback.
`, n += `
`, n += `Ideally, the library is processed using the Angular Linker to become fully AOT compiled.
`) : n += `JIT compilation is discouraged for production use-cases! Consider using AOT mode instead.
`, n += `Alternatively, the JIT compiler should be loaded by bootstrapping using '@angular/platform-browser-dynamic' or '@angular/platform-server',
`, n += `or manually provide the compiler with 'import "@angular/compiler";' before bootstrapping.`, new Error(n);
  } else
    throw new Error("JIT compiler unavailable");
}
const qp = {
  ɵɵdefineInjectable: te,
  ɵɵdefineInjector: hu,
  ɵɵinject: Ne,
  ɵɵinvalidFactoryDep: Ad,
  resolveForwardRef: R
}, xy = Function;
function di(e) {
  return typeof e == "function";
}
const RM = /^function\s+\S+\(\)\s*{[\s\S]+\.apply\(this,\s*(arguments|(?:[^()]+\(\[\],)?[^()]+\(arguments\).*)\)/, xM = /^class\s+[A-Za-z\d$_]*\s*extends\s+[^{]+{/, PM = /^class\s+[A-Za-z\d$_]*\s*extends\s+[^{]+{[\s\S]*constructor\s*\(/, LM = /^class\s+[A-Za-z\d$_]*\s*extends\s+[^{]+{[\s\S]*constructor\s*\(\)\s*{[^}]*super\(\.\.\.arguments\)/;
function jM(e) {
  return RM.test(e) || LM.test(e) || xM.test(e) && !PM.test(e);
}
class Py {
  constructor(t) {
    this._reflect = t || he.Reflect;
  }
  factory(t) {
    return (...n) => new t(...n);
  }
  /** @internal */
  _zipTypesAndAnnotations(t, n) {
    let r;
    typeof t > "u" ? r = mi(n.length) : r = mi(t.length);
    for (let o = 0; o < r.length; o++)
      typeof t > "u" ? r[o] = [] : t[o] && t[o] != Object ? r[o] = [t[o]] : r[o] = [], n && n[o] != null && (r[o] = r[o].concat(n[o]));
    return r;
  }
  _ownParameters(t, n) {
    const r = t.toString();
    if (jM(r))
      return null;
    if (t.parameters && t.parameters !== n.parameters)
      return t.parameters;
    const o = t.ctorParameters;
    if (o && o !== n.ctorParameters) {
      const a = typeof o == "function" ? o() : o, u = a.map((l) => l && l.type), c = a.map((l) => l && Mc(l.decorators));
      return this._zipTypesAndAnnotations(u, c);
    }
    const i = t.hasOwnProperty(qr) && t[qr], s = this._reflect && this._reflect.getOwnMetadata && this._reflect.getOwnMetadata("design:paramtypes", t);
    return s || i ? this._zipTypesAndAnnotations(s, i) : mi(t.length);
  }
  parameters(t) {
    if (!di(t))
      return [];
    const n = Vs(t);
    let r = this._ownParameters(t, n);
    return !r && n !== Object && (r = this.parameters(n)), r || [];
  }
  _ownAnnotations(t, n) {
    if (t.annotations && t.annotations !== n.annotations) {
      let r = t.annotations;
      return typeof r == "function" && r.annotations && (r = r.annotations), r;
    }
    return t.decorators && t.decorators !== n.decorators ? Mc(t.decorators) : t.hasOwnProperty(Wr) ? t[Wr] : null;
  }
  annotations(t) {
    if (!di(t))
      return [];
    const n = Vs(t), r = this._ownAnnotations(t, n) || [];
    return (n !== Object ? this.annotations(n) : []).concat(r);
  }
  _ownPropMetadata(t, n) {
    if (t.propMetadata && t.propMetadata !== n.propMetadata) {
      let r = t.propMetadata;
      return typeof r == "function" && r.propMetadata && (r = r.propMetadata), r;
    }
    if (t.propDecorators && t.propDecorators !== n.propDecorators) {
      const r = t.propDecorators, o = {};
      return Object.keys(r).forEach((i) => {
        o[i] = Mc(r[i]);
      }), o;
    }
    return t.hasOwnProperty(Qr) ? t[Qr] : null;
  }
  propMetadata(t) {
    if (!di(t))
      return {};
    const n = Vs(t), r = {};
    if (n !== Object) {
      const i = this.propMetadata(n);
      Object.keys(i).forEach((s) => {
        r[s] = i[s];
      });
    }
    const o = this._ownPropMetadata(t, n);
    return o && Object.keys(o).forEach((i) => {
      const s = [];
      r.hasOwnProperty(i) && s.push(...r[i]), s.push(...o[i]), r[i] = s;
    }), r;
  }
  ownPropMetadata(t) {
    return di(t) ? this._ownPropMetadata(t, Vs(t)) || {} : {};
  }
  hasLifecycleHook(t, n) {
    return t instanceof xy && n in t.prototype;
  }
}
function Mc(e) {
  return e ? e.map((t) => {
    const r = t.type.annotationCls, o = t.args ? t.args : [];
    return new r(...o);
  }) : [];
}
function Vs(e) {
  const t = e.prototype ? Object.getPrototypeOf(e.prototype) : null;
  return (t ? t.constructor : null) || Object;
}
const de = 0, C = 1, _ = 2, Ce = 3, Nt = 4, $e = 5, gt = 6, mo = 7, ie = 8, _e = 9, Et = 10, F = 11, Pi = 12, Qp = 13, Zn = 14, De = 15, ps = 16, Yr = 17, kt = 18, hr = 19, Ly = 20, Fn = 21, da = 22, pr = 23, T = 25, jd = 1, Li = 6, Kt = 7, Aa = 8, gr = 9, ge = 10;
var Oa;
(function(e) {
  e[e.None = 0] = "None", e[e.HasTransplantedViews = 2] = "HasTransplantedViews";
})(Oa || (Oa = {}));
function Le(e) {
  return Array.isArray(e) && typeof e[jd] == "object";
}
function ke(e) {
  return Array.isArray(e) && e[jd] === !0;
}
function $d(e) {
  return (e.flags & 4) !== 0;
}
function tr(e) {
  return e.componentOffset > -1;
}
function Iu(e) {
  return (e.flags & 1) === 1;
}
function bt(e) {
  return !!e.template;
}
function Bd(e) {
  return (e[_] & 512) !== 0;
}
function $M(e) {
  return (e.type & 16) === 16;
}
function BM(e) {
  return (e[_] & 32) === 32;
}
function vl(e) {
  return (e[_] & 256) === 256;
}
function Ye(e, t) {
  jo(e, t[C]);
}
function jo(e, t) {
  yo(e);
  const n = t.data;
  for (let r = T; r < n.length; r++)
    if (n[r] === e)
      return;
  S("This TNode does not belong to this TView.");
}
function yo(e) {
  E(e, "TNode must be defined"), e && typeof e == "object" && e.hasOwnProperty("directiveStylingLast") || S("Not of type TNode, got: " + e);
}
function Hd(e) {
  E(e, "Expected TIcu to be defined"), typeof e.currentCaseLViewIndex != "number" && S("Object is not of TIcu type.");
}
function HM(e, t = "Type passed in is not ComponentType, it does not have 'ɵcmp' property.") {
  V(e) || S(t);
}
function VM(e, t = "Type passed in is not NgModuleType, it does not have 'ɵmod' property.") {
  pt(e) || S(t);
}
function jy(e) {
  E(e, "currentTNode should exist!"), E(e.parent, "currentTNode should have a parent");
}
function ot(e) {
  E(e, "LContainer must be defined"), A(ke(e), !0, "Expecting LContainer");
}
function $y(e) {
  e && A(Le(e), !0, "Expecting LView or undefined or null");
}
function tn(e) {
  E(e, "LView must be defined"), A(Le(e), !0, "Expecting LView");
}
function it(e, t) {
  A(e.firstCreatePass, !0, t || "Should only be called in first create pass.");
}
function Vd(e, t) {
  A(e.firstUpdatePass, !0, "Should only be called in first update pass.");
}
function UM(e) {
  (e.type === void 0 || e.selectors == null || e.inputs === void 0) && S("Expected a DirectiveDef/ComponentDef and this object does not seem to have the expected shape.");
}
function gs(e, t) {
  By(T, e.bindingStartIndex, t);
}
function Fa(e, t) {
  const n = e[1];
  By(n.expandoStartIndex, e.length, t);
}
function By(e, t, n) {
  e <= n && n < t || S(`Index out of range (expecting ${e} <= ${n} < ${t})`);
}
function zM(e, t) {
  E(e[De], "Component views should exist."), E(e[De][$e].projection, "Components with projection nodes (<ng-content>) must have projection slots defined.");
}
function Hy(e, t) {
  E(e, "Component views should always have a parent view (component's host view)");
}
function Vy(e) {
  if (e.length < 2)
    return;
  const t = /* @__PURE__ */ new Set();
  for (const n of e) {
    if (t.has(n))
      throw new v(309, `Directive ${n.type.name} matches multiple times on the same element. Directives can only match an element once.`);
    t.add(n);
  }
}
function Uy(e, t) {
  Fa(e, t), Fa(
    e,
    t + 8
    /* NodeInjectorOffset.PARENT */
  ), J(e[t + 0], "injectorIndex should point to a bloom filter"), J(e[t + 1], "injectorIndex should point to a bloom filter"), J(e[t + 2], "injectorIndex should point to a bloom filter"), J(e[t + 3], "injectorIndex should point to a bloom filter"), J(e[t + 4], "injectorIndex should point to a bloom filter"), J(e[t + 5], "injectorIndex should point to a bloom filter"), J(e[t + 6], "injectorIndex should point to a bloom filter"), J(e[t + 7], "injectorIndex should point to a bloom filter"), J(e[
    t + 8
    /* NodeInjectorOffset.PARENT */
  ], "injectorIndex should point to parent injector");
}
class zy {
  constructor(t, n, r) {
    this.previousValue = t, this.currentValue = n, this.firstChange = r;
  }
  /**
   * Check whether the new value is the first value assigned.
   */
  isFirstChange() {
    return this.firstChange;
  }
}
function Gy(e, t, n, r) {
  t !== null ? t.applyValueToInputSignal(t, r) : e[n] = r;
}
function Ud() {
  return Wy;
}
function Wy(e) {
  return e.type.prototype.ngOnChanges && (e.setInput = WM), GM;
}
Ud.ngInherit = !0;
function GM() {
  const e = Qy(this), t = e?.current;
  if (t) {
    const n = e.previous;
    if (n === xt)
      e.previous = t;
    else
      for (let r in t)
        n[r] = t[r];
    e.current = null, this.ngOnChanges(t);
  }
}
function WM(e, t, n, r, o) {
  const i = this.declaredInputs[r];
  ngDevMode && xo(i, "Name of input in ngOnChanges has to be a string");
  const s = Qy(e) || qM(e, { previous: xt, current: null }), a = s.current || (s.current = {}), u = s.previous, c = u[i];
  a[i] = new zy(c && c.currentValue, n, u === xt), Gy(e, t, o, n);
}
const qy = "__ngSimpleChanges__";
function Qy(e) {
  return e[qy] || null;
}
function qM(e, t) {
  return e[qy] = t;
}
let Il = null;
const QM = (e) => {
  Il = e;
}, zt = function(e, t, n) {
  Il?.(e, t, n);
}, Zy = "svg", Yy = "math";
let Ky = !1;
function Jy() {
  return Ky;
}
function ZM(e) {
  Ky = e;
}
function re(e) {
  for (; Array.isArray(e); )
    e = e[de];
  return e;
}
function zd(e) {
  for (; Array.isArray(e); ) {
    if (typeof e[jd] == "object")
      return e;
    e = e[de];
  }
  return null;
}
function ms(e, t) {
  return ngDevMode && Ee(t, e), ngDevMode && bn(e, T, "Expected to be past HEADER_OFFSET"), re(t[e]);
}
function Be(e, t) {
  return ngDevMode && Ye(e, t), ngDevMode && Ee(t, e.index), re(t[e.index]);
}
function YM(e, t) {
  const n = e === null ? -1 : e.index;
  return n !== -1 ? (ngDevMode && Ye(e, t), re(t[n])) : null;
}
function ys(e, t) {
  ngDevMode && er(t, -1, "wrong index for TNode"), ngDevMode && Qn(t, e.data.length, "wrong index for TNode");
  const n = e.data[t];
  return ngDevMode && n !== null && yo(n), n;
}
function $o(e, t) {
  return ngDevMode && Ee(e, t), e[t];
}
function mt(e, t) {
  ngDevMode && Ee(t, e);
  const n = t[e];
  return Le(n) ? n : n[de];
}
function Ds(e) {
  return (e[_] & 4) === 4;
}
function Gd(e) {
  return (e[_] & 128) === 128;
}
function KM(e) {
  return ke(e[Ce]);
}
function Jt(e, t) {
  return t == null ? null : (ngDevMode && Ee(e, t), e[t]);
}
function Xy(e) {
  e[Yr] = 0;
}
function JM(e) {
  e[_] & 1024 || (e[_] |= 1024, Gd(e) && ji(e));
}
function eD(e, t) {
  for (; e > 0; )
    ngDevMode && E(t[Zn], "Declaration view should be defined if nesting level is greater than 0."), t = t[Zn], e--;
  return t;
}
function Wd(e) {
  return !!(e[_] & 9216 || e[pr]?.dirty);
}
function Cl(e) {
  e[Et].changeDetectionScheduler?.notify(
    1
    /* NotificationType.AfterRenderHooks */
  ), Wd(e) ? ji(e) : e[_] & 64 && (Jy() ? (e[_] |= 1024, ji(e)) : e[Et].changeDetectionScheduler?.notify());
}
function ji(e) {
  e[Et].changeDetectionScheduler?.notify();
  let t = mr(e);
  for (; t !== null && !(t[_] & 8192 || (t[_] |= 8192, !Gd(t))); )
    t = mr(t);
}
function Cu(e, t) {
  if ((e[_] & 256) === 256)
    throw new v(911, ngDevMode && "View has already been destroyed.");
  e[Fn] === null && (e[Fn] = []), e[Fn].push(t);
}
function qd(e, t) {
  if (e[Fn] === null)
    return;
  const n = e[Fn].indexOf(t);
  n !== -1 && e[Fn].splice(n, 1);
}
function mr(e) {
  ngDevMode && tn(e);
  const t = e[Ce];
  return ke(t) ? t[Ce] : t;
}
const N = {
  lFrame: fD(null),
  bindingsEnabled: !0,
  skipHydrationRootTNode: null
};
let tD = !1;
function XM() {
  return N.lFrame.elementDepthCount;
}
function e_() {
  N.lFrame.elementDepthCount++;
}
function t_() {
  N.lFrame.elementDepthCount--;
}
function nD() {
  return N.bindingsEnabled;
}
function Bo() {
  return N.skipHydrationRootTNode !== null;
}
function n_(e) {
  return N.skipHydrationRootTNode === e;
}
function rD() {
  N.bindingsEnabled = !0;
}
function r_(e) {
  N.skipHydrationRootTNode = e;
}
function oD() {
  N.bindingsEnabled = !1;
}
function o_() {
  N.skipHydrationRootTNode = null;
}
function m() {
  return N.lFrame.lView;
}
function x() {
  return N.lFrame.tView;
}
function iD(e) {
  return N.lFrame.contextLView = e, e[ie];
}
function sD(e) {
  return N.lFrame.contextLView = null, e;
}
function K() {
  let e = aD();
  for (; e !== null && e.type === 64; )
    e = e.parent;
  return e;
}
function aD() {
  return N.lFrame.currentTNode;
}
function $i() {
  const e = N.lFrame, t = e.currentTNode;
  return e.isParent ? t : t.parent;
}
function Xt(e, t) {
  ngDevMode && e && jo(e, N.lFrame.tView);
  const n = N.lFrame;
  n.currentTNode = e, n.isParent = t;
}
function Qd() {
  return N.lFrame.isParent;
}
function Zd() {
  N.lFrame.isParent = !1;
}
function i_() {
  const e = N.lFrame.contextLView;
  return ngDevMode && E(e, "contextLView must be defined."), e;
}
function $r() {
  return !ngDevMode && S("Must never be called in production mode"), tD;
}
function Zp(e) {
  !ngDevMode && S("Must never be called in production mode"), tD = e;
}
function Ke() {
  const e = N.lFrame;
  let t = e.bindingRootIndex;
  return t === -1 && (t = e.bindingRootIndex = e.tView.bindingStartIndex), t;
}
function X() {
  return N.lFrame.bindingIndex;
}
function uD(e) {
  return N.lFrame.bindingIndex = e;
}
function $t() {
  return N.lFrame.bindingIndex++;
}
function wn(e) {
  const t = N.lFrame, n = t.bindingIndex;
  return t.bindingIndex = t.bindingIndex + e, n;
}
function s_() {
  return N.lFrame.inI18n;
}
function cD(e) {
  N.lFrame.inI18n = e;
}
function a_(e, t) {
  const n = N.lFrame;
  n.bindingIndex = n.bindingRootIndex = e, El(t);
}
function u_() {
  return N.lFrame.currentDirectiveIndex;
}
function El(e) {
  N.lFrame.currentDirectiveIndex = e;
}
function Yd(e) {
  const t = N.lFrame.currentDirectiveIndex;
  return t === -1 ? null : e[t];
}
function Kd() {
  return N.lFrame.currentQueryIndex;
}
function Eu(e) {
  N.lFrame.currentQueryIndex = e;
}
function c_(e) {
  const t = e[C];
  return t.type === 2 ? (ngDevMode && E(t.declTNode, "Embedded TNodes should have declaration parents."), t.declTNode) : t.type === 1 ? e[$e] : null;
}
function lD(e, t, n) {
  if (ngDevMode && $y(e), n & z.SkipSelf) {
    ngDevMode && jo(t, e[C]);
    let o = t, i = e;
    for (; ngDevMode && E(o, "Parent TNode should be defined"), o = o.parent, o === null && !(n & z.Host); )
      if (o = c_(i), o === null || (ngDevMode && E(i, "Parent LView should be defined"), i = i[Zn], o.type & 10))
        break;
    if (o === null)
      return !1;
    t = o, e = i;
  }
  ngDevMode && Ye(t, e);
  const r = N.lFrame = dD();
  return r.currentTNode = t, r.lView = e, !0;
}
function Jd(e) {
  ngDevMode && jt(e[0], e[1], "????"), ngDevMode && $y(e);
  const t = dD();
  ngDevMode && (A(t.isParent, !0, "Expected clean LFrame"), A(t.lView, null, "Expected clean LFrame"), A(t.tView, null, "Expected clean LFrame"), A(t.selectedIndex, -1, "Expected clean LFrame"), A(t.elementDepthCount, 0, "Expected clean LFrame"), A(t.currentDirectiveIndex, -1, "Expected clean LFrame"), A(t.currentNamespace, null, "Expected clean LFrame"), A(t.bindingRootIndex, -1, "Expected clean LFrame"), A(t.currentQueryIndex, 0, "Expected clean LFrame"));
  const n = e[C];
  N.lFrame = t, ngDevMode && n.firstChild && jo(n.firstChild, n), t.currentTNode = n.firstChild, t.lView = e, t.tView = n, t.contextLView = e, t.bindingIndex = n.bindingStartIndex, t.inI18n = !1;
}
function dD() {
  const e = N.lFrame, t = e === null ? null : e.child;
  return t === null ? fD(e) : t;
}
function fD(e) {
  const t = {
    currentTNode: null,
    isParent: !0,
    lView: null,
    tView: null,
    selectedIndex: -1,
    contextLView: null,
    elementDepthCount: 0,
    currentNamespace: null,
    currentDirectiveIndex: -1,
    bindingRootIndex: -1,
    bindingIndex: -1,
    currentQueryIndex: 0,
    parent: e,
    child: null,
    inI18n: !1
  };
  return e !== null && (e.child = t), t;
}
function hD() {
  const e = N.lFrame;
  return N.lFrame = e.parent, e.currentTNode = null, e.lView = null, e;
}
const pD = hD;
function Xd() {
  const e = hD();
  e.isParent = !0, e.tView = null, e.selectedIndex = -1, e.contextLView = null, e.elementDepthCount = 0, e.currentDirectiveIndex = -1, e.currentNamespace = null, e.bindingRootIndex = -1, e.bindingIndex = -1, e.currentQueryIndex = 0;
}
function l_(e) {
  return (N.lFrame.contextLView = eD(e, N.lFrame.contextLView))[ie];
}
function He() {
  return N.lFrame.selectedIndex;
}
function yr(e) {
  ngDevMode && e !== -1 && bn(e, T, "Index must be past HEADER_OFFSET (or -1)."), ngDevMode && Qn(e, N.lFrame.lView.length, "Can't set index passed end of LView"), N.lFrame.selectedIndex = e;
}
function ue() {
  const e = N.lFrame;
  return ys(e.tView, e.selectedIndex);
}
function gD() {
  N.lFrame.currentNamespace = Zy;
}
function mD() {
  N.lFrame.currentNamespace = Yy;
}
function yD() {
  d_();
}
function d_() {
  N.lFrame.currentNamespace = null;
}
function DD() {
  return N.lFrame.currentNamespace;
}
let vD = !0;
function vs() {
  return vD;
}
function nn(e) {
  vD = e;
}
function f_(e, t, n) {
  ngDevMode && it(n);
  const { ngOnChanges: r, ngOnInit: o, ngDoCheck: i } = t.type.prototype;
  if (r) {
    const s = Wy(t);
    (n.preOrderHooks ??= []).push(e, s), (n.preOrderCheckHooks ??= []).push(e, s);
  }
  o && (n.preOrderHooks ??= []).push(0 - e, o), i && ((n.preOrderHooks ??= []).push(e, i), (n.preOrderCheckHooks ??= []).push(e, i));
}
function bu(e, t) {
  ngDevMode && it(e);
  for (let n = t.directiveStart, r = t.directiveEnd; n < r; n++) {
    const o = e.data[n];
    ngDevMode && E(o, "Expecting DirectiveDef");
    const i = o.type.prototype, { ngAfterContentInit: s, ngAfterContentChecked: a, ngAfterViewInit: u, ngAfterViewChecked: c, ngOnDestroy: l } = i;
    s && (e.contentHooks ??= []).push(-n, s), a && ((e.contentHooks ??= []).push(n, a), (e.contentCheckHooks ??= []).push(n, a)), u && (e.viewHooks ??= []).push(-n, u), c && ((e.viewHooks ??= []).push(n, c), (e.viewCheckHooks ??= []).push(n, c)), l != null && (e.destroyHooks ??= []).push(n, l);
  }
}
function fa(e, t, n) {
  ID(e, t, 3, n);
}
function ha(e, t, n, r) {
  ngDevMode && jt(n, 3, "Init pre-order hooks should not be called more than once"), (e[_] & 3) === n && ID(e, t, n, r);
}
function _c(e, t) {
  ngDevMode && jt(t, 3, "Init hooks phase should not be incremented after all init hooks have been run.");
  let n = e[_];
  (n & 3) === t && (n &= 16383, n += 1, e[_] = n);
}
function ID(e, t, n, r) {
  ngDevMode && A($r(), !1, "Hooks should never be run when in check no changes mode.");
  const o = r !== void 0 ? e[Yr] & 65535 : 0, i = r ?? -1, s = t.length - 1;
  let a = 0;
  for (let u = o; u < s; u++)
    if (typeof t[u + 1] == "number") {
      if (a = t[u], r != null && a >= r)
        break;
    } else
      t[u] < 0 && (e[Yr] += 65536), (a < i || i == -1) && (h_(e, n, t, u), e[Yr] = (e[Yr] & 4294901760) + u + 2), u++;
}
function Yp(e, t) {
  zt(4, e, t);
  const n = $(null);
  try {
    t.call(e);
  } finally {
    $(n), zt(5, e, t);
  }
}
function h_(e, t, n, r) {
  const o = n[r] < 0, i = n[r + 1], s = o ? -n[r] : n[r], a = e[s];
  o ? e[_] >> 14 < e[Yr] >> 16 && (e[_] & 3) === t && (e[_] += 16384, Yp(a, i)) : Yp(a, i);
}
const no = -1;
class Is {
  constructor(t, n, r) {
    this.factory = t, this.resolving = !1, ngDevMode && E(t, "Factory not specified"), ngDevMode && A(typeof t, "function", "Expected factory function."), this.canSeeViewProviders = n, this.injectImpl = r;
  }
}
function p_(e) {
  return e instanceof Is;
}
function bl(e) {
  let t = "";
  return e & 1 && (t += "|Text"), e & 2 && (t += "|Element"), e & 4 && (t += "|Container"), e & 8 && (t += "|ElementContainer"), e & 16 && (t += "|Projection"), e & 32 && (t += "|IcuContainer"), e & 64 && (t += "|Placeholder"), t.length > 0 ? t.substring(1) : t;
}
function g_(e) {
  return e != null && typeof e == "object" && (e.insertBeforeIndex === null || typeof e.insertBeforeIndex == "number" || Array.isArray(e.insertBeforeIndex));
}
function m_(e) {
  return (e.flags & 8) !== 0;
}
function y_(e) {
  return (e.flags & 16) !== 0;
}
function je(e, t, n) {
  E(e, "should be called with a TNode"), e.type & t || S(n || `Expected [${bl(t)}] but got ${bl(e.type)}.`);
}
function D_(e) {
  e === 2 || //
  e === 1 || //
  e === 4 || //
  e === 8 || //
  e === 32 || //
  e === 16 || //
  e === 64 || S(`Expected TNodeType to have only a single type selected, but got ${bl(e)}.`);
}
function ef(e) {
  return e !== no;
}
function Bi(e) {
  if (ngDevMode) {
    J(e, "Number expected"), jt(e, -1, "Not a valid state.");
    const t = e & 32767;
    er(t, T, "Parent injector must be pointing past HEADER_OFFSET.");
  }
  return e & 32767;
}
function v_(e) {
  return e >> 16;
}
function Hi(e, t) {
  let n = v_(e), r = t;
  for (; n > 0; )
    r = r[Zn], n--;
  return r;
}
let wl = !0;
function Na(e) {
  const t = wl;
  return wl = e, t;
}
const I_ = 256, CD = I_ - 1, ED = 5;
let C_ = 0;
const Gt = {};
function E_(e, t, n) {
  ngDevMode && A(t.firstCreatePass, !0, "expected firstCreatePass to be true");
  let r;
  typeof n == "string" ? r = n.charCodeAt(0) || 0 : n.hasOwnProperty(eo) && (r = n[eo]), r == null && (r = n[eo] = C_++);
  const o = r & CD, i = 1 << o;
  t.data[e + (o >> ED)] |= i;
}
function ka(e, t) {
  const n = bD(e, t);
  if (n !== -1)
    return n;
  const r = t[C];
  r.firstCreatePass && (e.injectorIndex = t.length, Sc(r.data, e), Sc(t, null), Sc(r.blueprint, null));
  const o = wu(e, t), i = e.injectorIndex;
  if (ef(o)) {
    const s = Bi(o), a = Hi(o, t), u = a[C].data;
    for (let c = 0; c < 8; c++)
      t[i + c] = a[s + c] | u[s + c];
  }
  return t[
    i + 8
    /* NodeInjectorOffset.PARENT */
  ] = o, i;
}
function Sc(e, t) {
  e.push(0, 0, 0, 0, 0, 0, 0, 0, t);
}
function bD(e, t) {
  return e.injectorIndex === -1 || // If the injector index is the same as its parent's injector index, then the index has been
  // copied down from the parent node. No injector has been created yet on this node.
  e.parent && e.parent.injectorIndex === e.injectorIndex || // After the first template pass, the injector index might exist but the parent values
  // might not have been calculated yet for this instance
  t[
    e.injectorIndex + 8
    /* NodeInjectorOffset.PARENT */
  ] === null ? -1 : (ngDevMode && Ee(t, e.injectorIndex), e.injectorIndex);
}
function wu(e, t) {
  if (e.parent && e.parent.injectorIndex !== -1)
    return e.parent.injectorIndex;
  let n = 0, r = null, o = t;
  for (; o !== null; ) {
    if (r = AD(o), r === null)
      return no;
    if (ngDevMode && r && Ye(r, o[Zn]), n++, o = o[Zn], r.injectorIndex !== -1)
      return r.injectorIndex | n << 16;
  }
  return no;
}
function Ml(e, t, n) {
  E_(e, t, n);
}
function b_(e, t) {
  if (ngDevMode && je(
    e,
    15
    /* TNodeType.AnyRNode */
  ), ngDevMode && E(e, "expecting tNode"), t === "class")
    return e.classes;
  if (t === "style")
    return e.styles;
  const n = e.attrs;
  if (n) {
    const r = n.length;
    let o = 0;
    for (; o < r; ) {
      const i = n[o];
      if (Dy(i))
        break;
      if (i === 0)
        o = o + 2;
      else if (typeof i == "number")
        for (o++; o < r && typeof n[o] == "string"; )
          o++;
      else {
        if (i === t)
          return n[o + 1];
        o = o + 2;
      }
    }
  }
  return null;
}
function wD(e, t, n) {
  if (n & z.Optional || e !== void 0)
    return e;
  Td(t, "NodeInjector");
}
function MD(e, t, n, r) {
  if (n & z.Optional && r === void 0 && (r = null), !(n & (z.Self | z.Host))) {
    const o = e[_e], i = et(void 0);
    try {
      return o ? o.get(t, r, n & z.Optional) : py(t, r, n & z.Optional);
    } finally {
      et(i);
    }
  }
  return wD(r, t, n);
}
function _D(e, t, n, r = z.Default, o) {
  if (e !== null) {
    if (t[_] & 2048 && // The token must be present on the current node injector when the `Self`
    // flag is set, so the lookup on embedded view injector(s) can be skipped.
    !(r & z.Self)) {
      const s = S_(e, t, n, r, Gt);
      if (s !== Gt)
        return s;
    }
    const i = SD(e, t, n, r, Gt);
    if (i !== Gt)
      return i;
  }
  return MD(t, n, r, o);
}
function SD(e, t, n, r, o) {
  const i = M_(n);
  if (typeof i == "function") {
    if (!lD(t, e, r))
      return r & z.Host ? wD(o, n, r) : MD(t, n, r, o);
    try {
      let s;
      if (ngDevMode ? gi(new ye(K(), m()), n, () => {
        s = i(r), s != null && ba(s);
      }) : s = i(r), s == null && !(r & z.Optional))
        Td(n);
      else
        return s;
    } finally {
      pD();
    }
  } else if (typeof i == "number") {
    let s = null, a = bD(e, t), u = no, c = r & z.Host ? t[De][$e] : null;
    for ((a === -1 || r & z.SkipSelf) && (u = a === -1 ? wu(e, t) : t[
      a + 8
      /* NodeInjectorOffset.PARENT */
    ], u === no || !Jp(r, !1) ? a = -1 : (s = t[C], a = Bi(u), t = Hi(u, t))); a !== -1; ) {
      ngDevMode && Uy(t, a);
      const l = t[C];
      if (ngDevMode && Ye(l.data[
        a + 8
        /* NodeInjectorOffset.TNODE */
      ], t), Kp(i, a, l.data)) {
        const d = w_(a, t, n, s, r, c);
        if (d !== Gt)
          return d;
      }
      u = t[
        a + 8
        /* NodeInjectorOffset.PARENT */
      ], u !== no && Jp(r, t[C].data[
        a + 8
        /* NodeInjectorOffset.TNODE */
      ] === c) && Kp(i, a, t) ? (s = l, a = Bi(u), t = Hi(u, t)) : a = -1;
    }
  }
  return o;
}
function w_(e, t, n, r, o, i) {
  const s = t[C], a = s.data[
    e + 8
    /* NodeInjectorOffset.TNODE */
  ], u = r == null ? (
    // 1) This is the first invocation `previousTView == null` which means that we are at the
    // `TNode` of where injector is starting to look. In such a case the only time we are allowed
    // to look into the ViewProviders is if:
    // - we are on a component
    // - AND the injector set `includeViewProviders` to true (implying that the token can see
    // ViewProviders because it is the Component or a Service which itself was declared in
    // ViewProviders)
    tr(a) && wl
  ) : (
    // 2) `previousTView != null` which means that we are now walking across the parent nodes.
    // In such a case we are only allowed to look into the ViewProviders if:
    // - We just crossed from child View to Parent View `previousTView != currentTView`
    // - AND the parent TNode is an Element.
    // This means that we just came from the Component's View and therefore are allowed to see
    // into the ViewProviders.
    r != s && (a.type & 3) !== 0
  ), c = o & z.Host && i === a, l = pa(a, s, n, u, c);
  return l !== null ? Dr(t, s, l, a) : Gt;
}
function pa(e, t, n, r, o) {
  const i = e.providerIndexes, s = t.data, a = i & 1048575, u = e.directiveStart, c = e.directiveEnd, l = i >> 20, d = r ? a : a + l, f = o ? a + l : c;
  for (let h = d; h < f; h++) {
    const p = s[h];
    if (h < u && n === p || h >= u && p.type === n)
      return h;
  }
  if (o) {
    const h = s[u];
    if (h && bt(h) && h.type === n)
      return u;
  }
  return null;
}
function Dr(e, t, n, r) {
  let o = e[n];
  const i = t.data;
  if (p_(o)) {
    const s = o;
    s.resolving && Sd(U(i[n]));
    const a = Na(s.canSeeViewProviders);
    s.resolving = !0;
    let u;
    if (ngDevMode) {
      const d = i[n].type || i[n], f = new ye(r, e);
      u = Ge({ injector: f, token: d });
    }
    const c = s.injectImpl ? et(s.injectImpl) : null, l = lD(e, r, z.Default);
    ngDevMode && A(l, !0, "Because flags do not contain `SkipSelf' we expect this to always succeed.");
    try {
      o = e[n] = s.factory(void 0, i, e, r), ngDevMode && ba(o), t.firstCreatePass && n >= r.directiveStart && (ngDevMode && UM(i[n]), f_(n, i[n], t));
    } finally {
      ngDevMode && Ge(u), c !== null && et(c), Na(a), s.resolving = !1, pD();
    }
  }
  return o;
}
function M_(e) {
  if (ngDevMode && E(e, "token must be defined"), typeof e == "string")
    return e.charCodeAt(0) || 0;
  const t = (
    // First check with `hasOwnProperty` so we don't get an inherited ID.
    e.hasOwnProperty(eo) ? e[eo] : void 0
  );
  return typeof t == "number" ? t >= 0 ? t & CD : (ngDevMode && A(t, -1, "Expecting to get Special Injector Id"), __) : t;
}
function Kp(e, t, n) {
  const r = 1 << e;
  return !!(n[t + (e >> ED)] & r);
}
function Jp(e, t) {
  return !(e & z.Self) && !(e & z.Host && t);
}
function Ho(e) {
  return e._lView;
}
function Vo(e) {
  return e._tNode;
}
class ye {
  constructor(t, n) {
    this._tNode = t, this._lView = n;
  }
  get(t, n, r) {
    return _D(this._tNode, this._lView, t, cs(r), n);
  }
}
function __() {
  return new ye(K(), m());
}
function TD(e) {
  return en(() => {
    const t = e.prototype.constructor, n = t[gn] || _l(t), r = Object.prototype;
    let o = Object.getPrototypeOf(e.prototype).constructor;
    for (; o && o !== r; ) {
      const i = o[gn] || _l(o);
      if (i && i !== n)
        return i;
      o = Object.getPrototypeOf(o);
    }
    return (i) => new i();
  });
}
function _l(e) {
  return fu(e) ? () => {
    const t = _l(R(e));
    return t && t();
  } : cr(e);
}
function S_(e, t, n, r, o) {
  let i = e, s = t;
  for (; i !== null && s !== null && s[_] & 2048 && !(s[_] & 512); ) {
    ngDevMode && Ye(i, s);
    const a = SD(i, s, n, r | z.Self, Gt);
    if (a !== Gt)
      return a;
    let u = i.parent;
    if (!u) {
      const c = s[Ly];
      if (c) {
        const l = c.get(n, Gt, r);
        if (l !== Gt)
          return l;
      }
      u = AD(s), s = s[Zn];
    }
    i = u;
  }
  return o;
}
function AD(e) {
  const t = e[C], n = t.type;
  return n === 2 ? (ngDevMode && E(t.declTNode, "Embedded TNodes should have declaration parents."), t.declTNode) : n === 1 ? e[$e] : null;
}
function Mu(e) {
  return b_(K(), e);
}
const tf = Ro("Attribute", (e) => ({ attributeName: e, __NG_ELEMENT_ID__: () => Mu(e) }));
let Xp = null;
function nf() {
  return Xp = Xp || new Py();
}
function _u(e) {
  return OD(nf().parameters(e));
}
function OD(e) {
  return e.map((t) => T_(t));
}
function T_(e) {
  const t = {
    token: null,
    attribute: null,
    host: !1,
    optional: !1,
    self: !1,
    skipSelf: !1
  };
  if (Array.isArray(e) && e.length > 0)
    for (let n = 0; n < e.length; n++) {
      const r = e[n];
      if (r === void 0)
        continue;
      const o = Object.getPrototypeOf(r);
      if (r instanceof Yt || o.ngMetadataName === "Optional")
        t.optional = !0;
      else if (r instanceof mu || o.ngMetadataName === "SkipSelf")
        t.skipSelf = !0;
      else if (r instanceof gy || o.ngMetadataName === "Self")
        t.self = !0;
      else if (r instanceof ds || o.ngMetadataName === "Host")
        t.host = !0;
      else if (r instanceof ft)
        t.token = r.token;
      else if (r instanceof tf) {
        if (r.attributeName === void 0)
          throw new v(204, ngDevMode && "Attribute name must be defined.");
        t.attribute = r.attributeName;
      } else
        t.token = r;
    }
  else e === void 0 || Array.isArray(e) && e.length === 0 ? t.token = null : t.token = e;
  return t;
}
function A_(e, t) {
  let n = null, r = null;
  e.hasOwnProperty(ki) || Object.defineProperty(e, ki, {
    get: () => (n === null && (n = Ae({ usage: 0, kind: "injectable", type: e }).compileInjectable(qp, `ng:///${e.name}/ɵprov.js`, k_(e, t))), n)
  }), e.hasOwnProperty(gn) || Object.defineProperty(e, gn, {
    get: () => {
      if (r === null) {
        const o = Ae({ usage: 0, kind: "injectable", type: e });
        r = o.compileFactory(qp, `ng:///${e.name}/ɵfac.js`, {
          name: e.name,
          type: e,
          typeArgumentCount: 0,
          // In JIT mode types are not available nor used.
          deps: _u(e),
          target: o.FactoryTarget.Injectable
        });
      }
      return r;
    },
    // Leave this configurable so that the factories from directives or pipes can take precedence.
    configurable: !0
  });
}
const O_ = ee({ provide: String, useValue: ee });
function eg(e) {
  return e.useClass !== void 0;
}
function F_(e) {
  return O_ in e;
}
function tg(e) {
  return e.useFactory !== void 0;
}
function N_(e) {
  return e.useExisting !== void 0;
}
function k_(e, t) {
  const n = t || { providedIn: null }, r = {
    name: e.name,
    type: e,
    typeArgumentCount: 0,
    providedIn: n.providedIn
  };
  return (eg(n) || tg(n)) && n.deps !== void 0 && (r.deps = OD(n.deps)), eg(n) ? r.useClass = n.useClass : F_(n) ? r.useValue = n.useValue : tg(n) ? r.useFactory = n.useFactory : N_(n) && (r.useExisting = n.useExisting), r;
}
const fe = ss("Injectable", void 0, void 0, void 0, (e, t) => A_(e, t));
function Sl(e, t = null, n = null, r) {
  const o = FD(e, t, n, r);
  return o.resolveInjectorInitializers(), o;
}
function FD(e, t = null, n = null, r, o = /* @__PURE__ */ new Set()) {
  const i = [
    n || q,
    Ty(e)
  ];
  return r = r || (typeof e == "object" ? void 0 : Q(e)), new Lo(i, t || vu(), r || null, o);
}
class Re {
  static {
    this.THROW_IF_NOT_FOUND = Ri;
  }
  static {
    this.NULL = /* @__PURE__ */ new yu();
  }
  static create(t, n) {
    if (Array.isArray(t))
      return Sl({ name: "" }, n, t, "");
    {
      const r = t.name ?? "";
      return Sl({ name: r }, t.parent, t.providers, r);
    }
  }
  static {
    this.ɵprov = te({
      token: Re,
      providedIn: "any",
      factory: () => Ne(Od)
    });
  }
  static {
    this.__NG_ELEMENT_ID__ = -1;
  }
}
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
class R_ {
  constructor(t) {
    this.attributeName = t, this.__NG_ELEMENT_ID__ = () => Mu(this.attributeName);
  }
  toString() {
    return `HostAttributeToken ${this.attributeName}`;
  }
}
const x_ = "ngOriginalError";
function Tc(e) {
  return e[x_];
}
class Mn {
  constructor() {
    this._console = console;
  }
  handleError(t) {
    const n = this._findOriginalError(t);
    this._console.error("ERROR", t), n && this._console.error("ORIGINAL ERROR", n);
  }
  /** @internal */
  _findOriginalError(t) {
    let n = t && Tc(t);
    for (; n && Tc(n); )
      n = Tc(n);
    return n || null;
  }
}
const ND = new j(typeof ngDevMode > "u" || ngDevMode ? "internal error handler" : "", {
  providedIn: "root",
  factory: () => w(Mn).handleError.bind(void 0)
});
class Br {
  static {
    this.__NG_ELEMENT_ID__ = L_;
  }
  static {
    this.__NG_ENV_ID__ = (t) => t;
  }
}
class P_ extends Br {
  constructor(t) {
    super(), this._lView = t;
  }
  onDestroy(t) {
    return Cu(this._lView, t), () => qd(this._lView, t);
  }
}
function L_() {
  return new P_(m());
}
class rf {
  constructor() {
    this.destroyed = !1, this.listeners = null, this.errorHandler = w(Mn, { optional: !0 }), this.destroyRef = w(Br), this.destroyRef.onDestroy(() => {
      this.destroyed = !0, this.listeners = null;
    });
  }
  subscribe(t) {
    if (this.destroyed)
      throw new v(953, ngDevMode && "Unexpected subscription to destroyed `OutputRef`. The owning directive/component is destroyed.");
    return (this.listeners ??= []).push(t), {
      unsubscribe: () => {
        const n = this.listeners?.indexOf(t);
        n !== void 0 && n !== -1 && this.listeners?.splice(n, 1);
      }
    };
  }
  /** Emits a new value to the output. */
  emit(t) {
    if (this.destroyed)
      throw new v(953, ngDevMode && "Unexpected emit for destroyed `OutputRef`. The owning directive/component is destroyed.");
    if (this.listeners === null)
      return;
    const n = $(null);
    try {
      for (const r of this.listeners)
        try {
          r(t);
        } catch (o) {
          this.errorHandler?.handleError(o);
        }
    } finally {
      $(n);
    }
  }
}
function j_(e) {
  return e.destroyRef;
}
function kD(e) {
  return ngDevMode && Ze(kD), new rf();
}
function ng(e, t) {
  return ngDevMode && Ze(of), ay(e, t);
}
function $_(e) {
  return ngDevMode && Ze(of), ay(lu, e);
}
const of = (ng.required = $_, ng);
function B_() {
  return Uo(K(), m());
}
function Uo(e, t) {
  return new rn(Be(e, t));
}
class rn {
  constructor(t) {
    this.nativeElement = t;
  }
  static {
    this.__NG_ELEMENT_ID__ = B_;
  }
}
function RD(e) {
  return e instanceof rn ? e.nativeElement : e;
}
class H_ extends Fi {
  constructor(t = !1) {
    super(), this.destroyRef = void 0, this.__isAsync = t, Ry() && (this.destroyRef = w(Br, { optional: !0 }) ?? void 0);
  }
  emit(t) {
    const n = $(null);
    try {
      super.next(t);
    } finally {
      $(n);
    }
  }
  subscribe(t, n, r) {
    let o = t, i = n || (() => null), s = r;
    if (t && typeof t == "object") {
      const u = t;
      o = u.next?.bind(u), i = u.error?.bind(u), s = u.complete?.bind(u);
    }
    this.__isAsync && (i = Ac(i), o && (o = Ac(o)), s && (s = Ac(s)));
    const a = super.subscribe({ next: o, error: i, complete: s });
    return t instanceof ko && t.add(a), a;
  }
}
function Ac(e) {
  return (t) => {
    setTimeout(e, void 0, t);
  };
}
const Ot = H_;
function V_() {
  return this._results[Symbol.iterator]();
}
class Su {
  /**
   * Returns `Observable` of `QueryList` notifying the subscriber of changes.
   */
  get changes() {
    return this._changes ??= new Ot();
  }
  /**
   * @param emitDistinctChangesOnly Whether `QueryList.changes` should fire only when actual change
   *     has occurred. Or if it should fire when query is recomputed. (recomputing could resolve in
   *     the same result)
   */
  constructor(t = !1) {
    this._emitDistinctChangesOnly = t, this.dirty = !0, this._onDirty = void 0, this._results = [], this._changesDetected = !1, this._changes = void 0, this.length = 0, this.first = void 0, this.last = void 0;
    const n = Su.prototype;
    n[Symbol.iterator] || (n[Symbol.iterator] = V_);
  }
  /**
   * Returns the QueryList entry at `index`.
   */
  get(t) {
    return this._results[t];
  }
  /**
   * See
   * [Array.map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
   */
  map(t) {
    return this._results.map(t);
  }
  filter(t) {
    return this._results.filter(t);
  }
  /**
   * See
   * [Array.find](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)
   */
  find(t) {
    return this._results.find(t);
  }
  /**
   * See
   * [Array.reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)
   */
  reduce(t, n) {
    return this._results.reduce(t, n);
  }
  /**
   * See
   * [Array.forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
   */
  forEach(t) {
    this._results.forEach(t);
  }
  /**
   * See
   * [Array.some](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some)
   */
  some(t) {
    return this._results.some(t);
  }
  /**
   * Returns a copy of the internal results list as an Array.
   */
  toArray() {
    return this._results.slice();
  }
  toString() {
    return this._results.toString();
  }
  /**
   * Updates the stored data of the query list, and resets the `dirty` flag to `false`, so that
   * on change detection, it will not notify of changes to the queries, unless a new change
   * occurs.
   *
   * @param resultsTree The query results to store
   * @param identityAccessor Optional function for extracting stable object identity from a value
   *    in the array. This function is executed for each element of the query result list while
   *    comparing current query list with the new one (provided as a first argument of the `reset`
   *    function) to detect if the lists are different. If the function is not provided, elements
   *    are compared as is (without any pre-processing).
   */
  reset(t, n) {
    this.dirty = !1;
    const r = tt(t);
    (this._changesDetected = !dM(this._results, r, n)) && (this._results = r, this.length = r.length, this.last = r[this.length - 1], this.first = r[0]);
  }
  /**
   * Triggers a change event by emitting on the `changes` {@link EventEmitter}.
   */
  notifyOnChanges() {
    this._changes !== void 0 && (this._changesDetected || !this._emitDistinctChangesOnly) && this._changes.emit(this);
  }
  /** @internal */
  onDirty(t) {
    this._onDirty = t;
  }
  /** internal */
  setDirty() {
    this.dirty = !0, this._onDirty?.();
  }
  /** internal */
  destroy() {
    this._changes !== void 0 && (this._changes.complete(), this._changes.unsubscribe());
  }
}
const Vi = "ngSkipHydration", U_ = "ngskiphydration";
function xD(e) {
  const t = e.mergedAttrs;
  if (t === null)
    return !1;
  for (let n = 0; n < t.length; n += 2) {
    const r = t[n];
    if (typeof r == "number")
      return !1;
    if (typeof r == "string" && r.toLowerCase() === U_)
      return !0;
  }
  return !1;
}
function PD(e) {
  return e.hasAttribute(Vi);
}
function Ra(e) {
  return (e.flags & 128) === 128;
}
function xa(e) {
  if (Ra(e))
    return !0;
  let t = e.parent;
  for (; t; ) {
    if (Ra(e) || xD(t))
      return !0;
    t = t.parent;
  }
  return !1;
}
const sf = /* @__PURE__ */ new Map();
let z_ = 0;
function G_() {
  return z_++;
}
function W_(e) {
  ngDevMode && J(e[hr], "LView must have an ID in order to be registered"), sf.set(e[hr], e);
}
function LD(e) {
  return ngDevMode && J(e, "ID used for LView lookup must be a number"), sf.get(e) || null;
}
function q_(e) {
  ngDevMode && J(e[hr], "Cannot stop tracking an LView that does not have an ID"), sf.delete(e[hr]);
}
class jD {
  /** Component's parent view data. */
  get lView() {
    return LD(this.lViewId);
  }
  constructor(t, n, r) {
    this.lViewId = t, this.nodeIndex = n, this.native = r;
  }
}
function nt(e) {
  let t = yi(e);
  if (t) {
    if (Le(t)) {
      const n = t;
      let r, o, i;
      if (HD(e)) {
        if (r = VD(n, e), r == -1)
          throw new Error("The provided component was not found in the application");
        o = e;
      } else if (Q_(e)) {
        if (r = Y_(n, e), r == -1)
          throw new Error("The provided directive was not found in the application");
        i = UD(r, n);
      } else if (r = rg(n, e), r == -1)
        return null;
      const s = re(n[r]), a = yi(s), u = a && !Array.isArray(a) ? a : Tl(n, r, s);
      if (o && u.component === void 0 && (u.component = o, Pe(u.component, u)), i && u.directives === void 0) {
        u.directives = i;
        for (let c = 0; c < i.length; c++)
          Pe(i[c], u);
      }
      Pe(u.native, u), t = u;
    }
  } else {
    const n = e;
    ngDevMode && An(n);
    let r = n;
    for (; r = r.parentNode; ) {
      const o = yi(r);
      if (o) {
        const i = Array.isArray(o) ? o : o.lView;
        if (!i)
          return null;
        const s = rg(i, n);
        if (s >= 0) {
          const a = re(i[s]), u = Tl(i, s, a);
          Pe(a, u), t = u;
          break;
        }
      }
    }
  }
  return t || null;
}
function Tl(e, t, n) {
  return new jD(e[hr], t, n);
}
function $D(e) {
  let t = yi(e), n;
  if (Le(t)) {
    const r = t, o = VD(r, e);
    n = mt(o, r);
    const i = Tl(r, o, n[de]);
    i.component = e, Pe(e, i), Pe(i.native, i);
  } else {
    const r = t, o = r.lView;
    ngDevMode && tn(o), n = mt(r.nodeIndex, o);
  }
  return n;
}
const Al = "__ngContext__";
function Pe(e, t) {
  ngDevMode && E(e, "Target expected"), Le(t) ? (e[Al] = t[hr], W_(t)) : e[Al] = t;
}
function yi(e) {
  ngDevMode && E(e, "Target expected");
  const t = e[Al];
  return typeof t == "number" ? LD(t) : t || null;
}
function BD(e) {
  const t = yi(e);
  return t ? Le(t) ? t : t.lView : null;
}
function HD(e) {
  return e && e.constructor && e.constructor.ɵcmp;
}
function Q_(e) {
  return e && e.constructor && e.constructor.ɵdir;
}
function rg(e, t) {
  const n = e[C];
  for (let r = T; r < n.bindingStartIndex; r++)
    if (re(e[r]) === t)
      return r;
  return -1;
}
function Z_(e) {
  if (e.child)
    return e.child;
  if (e.next)
    return e.next;
  for (; e.parent && !e.parent.next; )
    e = e.parent;
  return e.parent && e.parent.next;
}
function VD(e, t) {
  const n = e[C].components;
  if (n)
    for (let r = 0; r < n.length; r++) {
      const o = n[r];
      if (mt(o, e)[ie] === t)
        return o;
    }
  else if (mt(T, e)[ie] === t)
    return T;
  return -1;
}
function Y_(e, t) {
  let n = e[C].firstChild;
  for (; n; ) {
    const r = n.directiveStart, o = n.directiveEnd;
    for (let i = r; i < o; i++)
      if (e[i] === t)
        return n.index;
    n = Z_(n);
  }
  return -1;
}
function UD(e, t) {
  const n = t[C].data[e];
  if (n.directiveStart === 0)
    return q;
  const r = [];
  for (let o = n.directiveStart; o < n.directiveEnd; o++) {
    const i = t[o];
    HD(i) || r.push(i);
  }
  return r;
}
function K_(e, t) {
  const n = t[C].data[e], { directiveStart: r, componentOffset: o } = n;
  return o > -1 ? t[r + o] : null;
}
function J_(e, t) {
  const n = e[C].data[t];
  if (n && n.localNames) {
    const r = {};
    let o = n.index + 1;
    for (let i = 0; i < n.localNames.length; i += 2)
      r[n.localNames[i]] = e[o], o++;
    return r;
  }
  return null;
}
function X_(e) {
  ngDevMode && E(e, "component");
  let t = Le(e) ? e : BD(e);
  for (; t && !(t[_] & 512); )
    t = mr(t);
  return ngDevMode && tn(t), t;
}
function eS(e) {
  const t = X_(e);
  return ngDevMode && E(t[ie], "Root view has no context. Perhaps it is disconnected?"), t[ie];
}
function zD(e) {
  return WD(e[Pi]);
}
function GD(e) {
  return WD(e[Nt]);
}
function WD(e) {
  for (; e !== null && !ke(e); )
    e = e[Nt];
  return e;
}
function Pa(e) {
  ngDevMode && af(e);
  const t = nt(e);
  if (t === null)
    return null;
  if (t.component === void 0) {
    const n = t.lView;
    if (n === null)
      return null;
    t.component = K_(t.nodeIndex, n);
  }
  return t.component;
}
function qD(e) {
  af(e);
  const t = nt(e), n = t ? t.lView : null;
  return n === null ? null : n[ie];
}
function QD(e) {
  const t = nt(e);
  let n = t ? t.lView : null;
  if (n === null)
    return null;
  let r;
  for (; n[C].type === 2 && (r = mr(n)); )
    n = r;
  return n[_] & 512 ? null : n[ie];
}
function ZD(e) {
  const t = BD(e);
  return t !== null ? [eS(t)] : [];
}
function YD(e) {
  const t = nt(e), n = t ? t.lView : null;
  if (n === null)
    return Re.NULL;
  const r = n[C].data[t.nodeIndex];
  return new ye(r, n);
}
function tS(e) {
  const t = nt(e), n = t ? t.lView : null;
  if (n === null)
    return [];
  const r = n[C], o = r.data[t.nodeIndex], i = [], s = o.providerIndexes & 1048575, a = o.directiveEnd;
  for (let u = s; u < a; u++) {
    let c = r.data[u];
    iS(c) && (c = c.type), i.push(c);
  }
  return i;
}
function KD(e) {
  if (e instanceof Text)
    return [];
  const t = nt(e), n = t ? t.lView : null;
  if (n === null)
    return [];
  const r = n[C], o = t.nodeIndex;
  return r?.data[o] ? (t.directives === void 0 && (t.directives = UD(o, n)), t.directives === null ? [] : [...t.directives]) : [];
}
function nS(e) {
  const { constructor: t } = e;
  if (!t)
    throw new Error("Unable to find the instance constructor");
  const n = V(t);
  if (n)
    return {
      inputs: og(n.inputs),
      outputs: n.outputs,
      encapsulation: n.encapsulation,
      changeDetection: n.onPush ? dr.OnPush : dr.Default
    };
  const r = Fe(t);
  return r ? { inputs: og(r.inputs), outputs: r.outputs } : null;
}
function rS(e) {
  const t = nt(e);
  if (t === null)
    return {};
  if (t.localRefs === void 0) {
    const n = t.lView;
    if (n === null)
      return {};
    t.localRefs = J_(n, t.nodeIndex);
  }
  return t.localRefs || {};
}
function JD(e) {
  return nt(e).native;
}
function XD(e) {
  ngDevMode && af(e);
  const t = nt(e), n = t === null ? null : t.lView;
  if (n === null)
    return [];
  const r = n[C], o = n[mo], i = r.cleanup, s = [];
  if (i && o)
    for (let a = 0; a < i.length; ) {
      const u = i[a++], c = i[a++];
      if (typeof u == "string") {
        const l = u, d = re(n[c]), f = o[i[a++]], h = i[a++], p = typeof h == "boolean" || h >= 0 ? "dom" : "output", g = typeof h == "boolean" ? h : !1;
        e == d && s.push({ element: e, name: l, callback: f, useCapture: g, type: p });
      }
    }
  return s.sort(oS), s;
}
function oS(e, t) {
  return e.name == t.name ? 0 : e.name < t.name ? -1 : 1;
}
function iS(e) {
  return e.type !== void 0 && e.declaredInputs !== void 0 && e.findHostDirectiveDefs !== void 0;
}
function af(e) {
  if (typeof Element < "u" && !(e instanceof Element))
    throw new Error("Expecting instance of DOM Element");
}
function og(e) {
  const t = {};
  for (const n in e) {
    if (!e.hasOwnProperty(n))
      continue;
    const r = e[n];
    if (r === void 0)
      continue;
    let o;
    Array.isArray(r) ? o = r[0] : o = r, t[n] = o;
  }
  return t;
}
let Ol;
function sS(e) {
  Ol = e;
}
function Yn() {
  if (Ol !== void 0)
    return Ol;
  if (typeof document < "u")
    return document;
  throw new v(210, (typeof ngDevMode > "u" || ngDevMode) && "The document object is not available in this context. Make sure the DOCUMENT injection token is provided.");
}
const ev = new j(ngDevMode ? "AppId" : "", {
  providedIn: "root",
  factory: () => aS
}), aS = "ng", tv = new j(ngDevMode ? "Platform Initializer" : ""), Cs = new j(ngDevMode ? "Platform ID" : "", {
  providedIn: "platform",
  factory: () => "unknown"
  // set a default platform name, when none set explicitly
}), uS = new j(ngDevMode ? "Application Packages Root URL" : ""), cS = new j(ngDevMode ? "AnimationModuleType" : ""), lS = new j(ngDevMode ? "CSP nonce" : "", {
  providedIn: "root",
  factory: () => Yn().body?.querySelector("[ngCspNonce]")?.getAttribute("ngCspNonce") || null
}), uf = {
  breakpoints: [16, 32, 48, 64, 96, 128, 256, 384, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  placeholderResolution: 30,
  disableImageSizeWarning: !1,
  disableImageLazyLoadWarning: !1
}, cf = new j(ngDevMode ? "ImageConfig" : "", { providedIn: "root", factory: () => uf });
function dS(e) {
  return e;
}
function fS() {
  const e = new Hr();
  return w(Cs) === "browser" && (e.store = hS(Yn(), w(ev))), e;
}
class Hr {
  constructor() {
    this.store = {}, this.onSerializeCallbacks = {};
  }
  static {
    this.ɵprov = /** @pureOrBreakMyCode */
    te({
      token: Hr,
      providedIn: "root",
      factory: fS
    });
  }
  /**
   * Get the value corresponding to a key. Return `defaultValue` if key is not found.
   */
  get(t, n) {
    return this.store[t] !== void 0 ? this.store[t] : n;
  }
  /**
   * Set the value corresponding to a key.
   */
  set(t, n) {
    this.store[t] = n;
  }
  /**
   * Remove a key from the store.
   */
  remove(t) {
    delete this.store[t];
  }
  /**
   * Test whether a key exists in the store.
   */
  hasKey(t) {
    return this.store.hasOwnProperty(t);
  }
  /**
   * Indicates whether the state is empty.
   */
  get isEmpty() {
    return Object.keys(this.store).length === 0;
  }
  /**
   * Register a callback to provide the value for a key when `toJson` is called.
   */
  onSerialize(t, n) {
    this.onSerializeCallbacks[t] = n;
  }
  /**
   * Serialize the current state of the store to JSON.
   */
  toJson() {
    for (const t in this.onSerializeCallbacks)
      if (this.onSerializeCallbacks.hasOwnProperty(t))
        try {
          this.store[t] = this.onSerializeCallbacks[t]();
        } catch (n) {
          console.warn("Exception in onSerialize callback: ", n);
        }
    return JSON.stringify(this.store).replace(/</g, "\\u003C");
  }
}
function hS(e, t) {
  const n = e.getElementById(t + "-state");
  if (n?.textContent)
    try {
      return JSON.parse(n.textContent);
    } catch (r) {
      console.warn("Exception while restoring TransferState for app " + t, r);
    }
  return {};
}
const lf = "h", df = "b";
var vr;
(function(e) {
  e.FirstChild = "f", e.NextSibling = "n";
})(vr || (vr = {}));
const Fl = "e", Nl = "t", Ui = "c", La = "x", Do = "r", kl = "i", Rl = "n", ga = "d", pS = "__nghData__", ff = pS, Di = "ngh", nv = "nghm";
let rv = () => null;
function gS(e, t, n = !1) {
  let r = e.getAttribute(Di);
  if (r == null)
    return null;
  const [o, i] = r.split("|");
  if (r = n ? i : o, !r)
    return null;
  const s = i ? `|${i}` : "", a = n ? o : s;
  let u = {};
  if (r !== "") {
    const l = t.get(Hr, null, { optional: !0 });
    l !== null && (u = l.get(ff, [])[Number(r)], ngDevMode && E(u, "Unable to retrieve hydration info from the TransferState."));
  }
  const c = {
    data: u,
    firstChild: e.firstChild ?? null
  };
  return n && (c.firstChild = e, Tu(c, 0, e.nextSibling)), a ? e.setAttribute(Di, a) : e.removeAttribute(Di), ngDevMode && zo(
    e,
    /* checkIfAlreadyClaimed */
    !1
  ), ngDevMode && ngDevMode.hydratedComponents++, c;
}
function mS() {
  rv = gS;
}
function hf(e, t, n = !1) {
  return rv(e, t, n);
}
function ov(e) {
  let t = e._lView;
  return t[C].type === 2 ? null : (Bd(t) && (t = t[T]), t);
}
function yS(e) {
  return e.textContent?.replace(/\s/gm, "");
}
function DS(e) {
  const t = Yn(), n = t.createNodeIterator(e, NodeFilter.SHOW_COMMENT, {
    acceptNode(i) {
      const s = yS(i);
      return s === "ngetn" || s === "ngtns" ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    }
  });
  let r;
  const o = [];
  for (; r = n.nextNode(); )
    o.push(r);
  for (const i of o)
    i.textContent === "ngetn" ? i.replaceWith(t.createTextNode("")) : i.remove();
}
var vo;
(function(e) {
  e.Hydrated = "hydrated", e.Skipped = "skipped", e.Mismatched = "mismatched";
})(vo || (vo = {}));
const iv = "__ngDebugHydrationInfo__";
function pf(e, t) {
  e[iv] = t;
}
function sv(e) {
  return e[iv] ?? null;
}
function zo(e, t = !0) {
  if (!ngDevMode)
    throw new Error("Calling `markRNodeAsClaimedByHydration` in prod mode is not supported and likely a mistake.");
  if (t && IS(e))
    throw new Error("Trying to claim a node, which was claimed already.");
  pf(e, { status: vo.Hydrated }), ngDevMode.hydratedNodes++;
}
function vS(e) {
  if (!ngDevMode)
    throw new Error("Calling `markRNodeAsSkippedByHydration` in prod mode is not supported and likely a mistake.");
  pf(e, { status: vo.Skipped }), ngDevMode.componentsSkippedHydration++;
}
function zi(e, t = null, n = null) {
  if (!ngDevMode)
    throw new Error("Calling `markRNodeAsMismatchedByHydration` in prod mode is not supported and likely a mistake.");
  for (; e && !Pa(e); )
    e = e?.parentNode;
  e && pf(e, {
    status: vo.Mismatched,
    expectedNodeDetails: t,
    actualNodeDetails: n
  });
}
function IS(e) {
  return sv(e)?.status === vo.Hydrated;
}
function Tu(e, t, n) {
  e.segmentHeads ??= {}, e.segmentHeads[t] = n;
}
function xl(e, t) {
  return e.segmentHeads?.[t] ?? null;
}
function CS(e, t) {
  const n = e.data;
  let r = n[Fl]?.[t] ?? null;
  return r === null && n[Ui]?.[t] && (r = gf(e, t)), r;
}
function av(e, t) {
  return e.data[Ui]?.[t] ?? null;
}
function gf(e, t) {
  const n = av(e, t) ?? [];
  let r = 0;
  for (let o of n)
    r += o[Do] * (o[La] ?? 1);
  return r;
}
function Au(e, t) {
  if (typeof e.disconnectedNodes > "u") {
    const n = e.data[ga];
    e.disconnectedNodes = n ? new Set(n) : null;
  }
  return !!e.disconnectedNodes?.has(t);
}
const fi = new j(typeof ngDevMode > "u" || ngDevMode ? "IS_HYDRATION_DOM_REUSE_ENABLED" : ""), uv = !1, cv = new j(typeof ngDevMode > "u" || ngDevMode ? "PRESERVE_HOST_CONTENT" : "", {
  providedIn: "root",
  factory: () => uv
}), lv = new j(typeof ngDevMode > "u" || ngDevMode ? "IS_I18N_HYDRATION_ENABLED" : "");
let Us;
function dv() {
  if (Us === void 0 && (Us = null, he.trustedTypes))
    try {
      Us = he.trustedTypes.createPolicy("angular", {
        createHTML: (e) => e,
        createScript: (e) => e,
        createScriptURL: (e) => e
      });
    } catch {
    }
  return Us;
}
function Go(e) {
  return dv()?.createHTML(e) || e;
}
function ES(e) {
  return dv()?.createScriptURL(e) || e;
}
let zs;
function mf() {
  if (zs === void 0 && (zs = null, he.trustedTypes))
    try {
      zs = he.trustedTypes.createPolicy("angular#unsafe-bypass", {
        createHTML: (e) => e,
        createScript: (e) => e,
        createScriptURL: (e) => e
      });
    } catch {
    }
  return zs;
}
function ig(e) {
  return mf()?.createHTML(e) || e;
}
function sg(e) {
  return mf()?.createScript(e) || e;
}
function ag(e) {
  return mf()?.createScriptURL(e) || e;
}
class Vr {
  constructor(t) {
    this.changingThisBreaksApplicationSecurity = t;
  }
  toString() {
    return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${Lr})`;
  }
}
class bS extends Vr {
  getTypeName() {
    return "HTML";
  }
}
class wS extends Vr {
  getTypeName() {
    return "Style";
  }
}
class MS extends Vr {
  getTypeName() {
    return "Script";
  }
}
class _S extends Vr {
  getTypeName() {
    return "URL";
  }
}
class SS extends Vr {
  getTypeName() {
    return "ResourceURL";
  }
}
function on(e) {
  return e instanceof Vr ? e.changingThisBreaksApplicationSecurity : e;
}
function Wo(e, t) {
  const n = fv(e);
  if (n != null && n !== t) {
    if (n === "ResourceURL" && t === "URL")
      return !0;
    throw new Error(`Required a safe ${t}, got a ${n} (see ${Lr})`);
  }
  return n === t;
}
function fv(e) {
  return e instanceof Vr && e.getTypeName() || null;
}
function TS(e) {
  return new bS(e);
}
function AS(e) {
  return new wS(e);
}
function OS(e) {
  return new MS(e);
}
function FS(e) {
  return new _S(e);
}
function NS(e) {
  return new SS(e);
}
function hv(e) {
  const t = new RS(e);
  return xS() ? new kS(t) : t;
}
class kS {
  constructor(t) {
    this.inertDocumentHelper = t;
  }
  getInertBodyElement(t) {
    t = "<body><remove></remove>" + t;
    try {
      const n = new window.DOMParser().parseFromString(Go(t), "text/html").body;
      return n === null ? this.inertDocumentHelper.getInertBodyElement(t) : (n.removeChild(n.firstChild), n);
    } catch {
      return null;
    }
  }
}
class RS {
  constructor(t) {
    this.defaultDoc = t, this.inertDocument = this.defaultDoc.implementation.createHTMLDocument("sanitization-inert");
  }
  getInertBodyElement(t) {
    const n = this.inertDocument.createElement("template");
    return n.innerHTML = Go(t), n;
  }
}
function xS() {
  try {
    return !!new window.DOMParser().parseFromString(Go(""), "text/html");
  } catch {
    return !1;
  }
}
const PS = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;
function Ou(e) {
  return e = String(e), e.match(PS) ? e : ((typeof ngDevMode > "u" || ngDevMode) && console.warn(`WARNING: sanitizing unsafe URL value ${e} (see ${Lr})`), "unsafe:" + e);
}
function _n(e) {
  const t = {};
  for (const n of e.split(","))
    t[n] = !0;
  return t;
}
function Es(...e) {
  const t = {};
  for (const n of e)
    for (const r in n)
      n.hasOwnProperty(r) && (t[r] = !0);
  return t;
}
const pv = _n("area,br,col,hr,img,wbr"), gv = _n("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"), mv = _n("rp,rt"), LS = Es(mv, gv), jS = Es(gv, _n("address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul")), $S = Es(mv, _n("a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video")), Pl = Es(pv, jS, $S, LS), yf = _n("background,cite,href,itemtype,longdesc,poster,src,xlink:href"), BS = _n("abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,srcset,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width"), HS = _n("aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext"), yv = Es(yf, BS, HS), VS = _n("script,style,template");
class US {
  constructor() {
    this.sanitizedSomething = !1, this.buf = [];
  }
  sanitizeChildren(t) {
    let n = t.firstChild, r = !0, o = [];
    for (; n; ) {
      if (n.nodeType === Node.ELEMENT_NODE ? r = this.startElement(n) : n.nodeType === Node.TEXT_NODE ? this.chars(n.nodeValue) : this.sanitizedSomething = !0, r && n.firstChild) {
        o.push(n), n = WS(n);
        continue;
      }
      for (; n; ) {
        n.nodeType === Node.ELEMENT_NODE && this.endElement(n);
        let i = GS(n);
        if (i) {
          n = i;
          break;
        }
        n = o.pop();
      }
    }
    return this.buf.join("");
  }
  /**
   * Sanitizes an opening element tag (if valid) and returns whether the element's contents should
   * be traversed. Element content must always be traversed (even if the element itself is not
   * valid/safe), unless the element is one of `SKIP_TRAVERSING_CONTENT_IF_INVALID_ELEMENTS`.
   *
   * @param element The element to sanitize.
   * @return True if the element's contents should be traversed.
   */
  startElement(t) {
    const n = ug(t).toLowerCase();
    if (!Pl.hasOwnProperty(n))
      return this.sanitizedSomething = !0, !VS.hasOwnProperty(n);
    this.buf.push("<"), this.buf.push(n);
    const r = t.attributes;
    for (let o = 0; o < r.length; o++) {
      const i = r.item(o), s = i.name, a = s.toLowerCase();
      if (!yv.hasOwnProperty(a)) {
        this.sanitizedSomething = !0;
        continue;
      }
      let u = i.value;
      yf[a] && (u = Ou(u)), this.buf.push(" ", s, '="', cg(u), '"');
    }
    return this.buf.push(">"), !0;
  }
  endElement(t) {
    const n = ug(t).toLowerCase();
    Pl.hasOwnProperty(n) && !pv.hasOwnProperty(n) && (this.buf.push("</"), this.buf.push(n), this.buf.push(">"));
  }
  chars(t) {
    this.buf.push(cg(t));
  }
}
function zS(e, t) {
  return (e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_CONTAINED_BY) !== Node.DOCUMENT_POSITION_CONTAINED_BY;
}
function GS(e) {
  const t = e.nextSibling;
  if (t && e !== t.previousSibling)
    throw Dv(t);
  return t;
}
function WS(e) {
  const t = e.firstChild;
  if (t && zS(e, t))
    throw Dv(t);
  return t;
}
function ug(e) {
  const t = e.nodeName;
  return typeof t == "string" ? t : "FORM";
}
function Dv(e) {
  return new Error(`Failed to sanitize html because the element is clobbered: ${e.outerHTML}`);
}
const qS = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g, QS = /([^\#-~ |!])/g;
function cg(e) {
  return e.replace(/&/g, "&amp;").replace(qS, function(t) {
    const n = t.charCodeAt(0), r = t.charCodeAt(1);
    return "&#" + ((n - 55296) * 1024 + (r - 56320) + 65536) + ";";
  }).replace(QS, function(t) {
    return "&#" + t.charCodeAt(0) + ";";
  }).replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
let Gs;
function vv(e, t) {
  let n = null;
  try {
    Gs = Gs || hv(e);
    let r = t ? String(t) : "";
    n = Gs.getInertBodyElement(r);
    let o = 5, i = r;
    do {
      if (o === 0)
        throw new Error("Failed to sanitize html because the input is unstable");
      o--, r = i, i = n.innerHTML, n = Gs.getInertBodyElement(r);
    } while (r !== i);
    const s = new US(), a = s.sanitizeChildren(Ll(n) || n);
    return (typeof ngDevMode > "u" || ngDevMode) && s.sanitizedSomething && console.warn(`WARNING: sanitizing HTML stripped some content, see ${Lr}`), Go(a);
  } finally {
    if (n) {
      const r = Ll(n) || n;
      for (; r.firstChild; )
        r.removeChild(r.firstChild);
    }
  }
}
function Ll(e) {
  return "content" in e && ZS(e) ? e.content : null;
}
function ZS(e) {
  return e.nodeType === Node.ELEMENT_NODE && e.nodeName === "TEMPLATE";
}
var Kn;
(function(e) {
  e[e.NONE = 0] = "NONE", e[e.HTML = 1] = "HTML", e[e.STYLE = 2] = "STYLE", e[e.SCRIPT = 3] = "SCRIPT", e[e.URL = 4] = "URL", e[e.RESOURCE_URL = 5] = "RESOURCE_URL";
})(Kn || (Kn = {}));
function Iv(e) {
  const t = bs();
  return t ? ig(t.sanitize(Kn.HTML, e) || "") : Wo(
    e,
    "HTML"
    /* BypassType.Html */
  ) ? ig(on(e)) : vv(Yn(), L(e));
}
function Cv(e) {
  const t = bs();
  return t ? t.sanitize(Kn.STYLE, e) || "" : Wo(
    e,
    "Style"
    /* BypassType.Style */
  ) ? on(e) : L(e);
}
function Df(e) {
  const t = bs();
  return t ? t.sanitize(Kn.URL, e) || "" : Wo(
    e,
    "URL"
    /* BypassType.Url */
  ) ? on(e) : Ou(L(e));
}
function vf(e) {
  const t = bs();
  if (t)
    return ag(t.sanitize(Kn.RESOURCE_URL, e) || "");
  if (Wo(
    e,
    "ResourceURL"
    /* BypassType.ResourceUrl */
  ))
    return ag(on(e));
  throw new v(904, ngDevMode && `unsafe value used in a resource URL context (see ${Lr})`);
}
function Ev(e) {
  const t = bs();
  if (t)
    return sg(t.sanitize(Kn.SCRIPT, e) || "");
  if (Wo(
    e,
    "Script"
    /* BypassType.Script */
  ))
    return sg(on(e));
  throw new v(905, ngDevMode && "unsafe value used in a script context");
}
function bv(e) {
  if (ngDevMode && (!Array.isArray(e) || !Array.isArray(e.raw) || e.length !== 1))
    throw new Error(`Unexpected interpolation in trusted HTML constant: ${e.join("?")}`);
  return Go(e[0]);
}
function wv(e) {
  if (ngDevMode && (!Array.isArray(e) || !Array.isArray(e.raw) || e.length !== 1))
    throw new Error(`Unexpected interpolation in trusted URL constant: ${e.join("?")}`);
  return ES(e[0]);
}
function YS(e, t) {
  return t === "src" && (e === "embed" || e === "frame" || e === "iframe" || e === "media" || e === "script") || t === "href" && (e === "base" || e === "link") ? vf : Df;
}
function Mv(e, t, n) {
  return YS(t, n)(e);
}
function KS(e) {
  if (e.toLowerCase().startsWith("on")) {
    const t = `Binding to event property '${e}' is disallowed for security reasons, please use (${e.slice(2)})=...
If '${e}' is a directive input, make sure the directive is imported by the current module.`;
    throw new v(306, t);
  }
}
function JS(e) {
  if (e.toLowerCase().startsWith("on")) {
    const t = `Binding to event attribute '${e}' is disallowed for security reasons, please use (${e.slice(2)})=...`;
    throw new v(306, t);
  }
}
function bs() {
  const e = m();
  return e && e[Et].sanitizer;
}
const XS = /^>|^->|<!--|-->|--!>|<!-$/g, eT = /(<|>)/g, tT = "​$1​";
function _v(e) {
  return e.replace(XS, (t) => t.replace(eT, tT));
}
function nT(e) {
  return e = oT(e.replace(/[$@]/g, "_")), `ng-reflect-${e}`;
}
const rT = /([A-Z])/g;
function oT(e) {
  return e.replace(rT, (...t) => "-" + t[1].toLowerCase());
}
function iT(e) {
  try {
    return e != null ? e.toString().slice(0, 30) : e;
  } catch {
    return "[ERROR] Exception while trying to serialize the value";
  }
}
const Sv = {
  name: "custom-elements"
}, Tv = {
  name: "no-errors-schema"
};
let If = !1;
function sT(e) {
  If = e;
}
function aT() {
  return If;
}
let Cf = !1;
function uT(e) {
  Cf = e;
}
function cT() {
  return Cf;
}
function lT(e, t, n, r, o) {
  if (r !== null && !o && n !== null && // Note that we can't check for `typeof HTMLUnknownElement === 'function'` because
  // Domino doesn't expose HTMLUnknownElement globally.
  (typeof HTMLUnknownElement < "u" && HTMLUnknownElement && e instanceof HTMLUnknownElement || typeof customElements < "u" && n.indexOf("-") > -1 && !customElements.get(n)) && !Ef(r, n)) {
    const s = Nu(t), a = ku(t), u = `'${s ? "@Component" : "@NgModule"}.schemas'`;
    let c = `'${n}' is not a known element${a}:
`;
    if (c += `1. If '${n}' is an Angular component, then verify that it is ${s ? "included in the '@Component.imports' of this component" : "a part of an @NgModule where this component is declared"}.
`, n && n.indexOf("-") > -1 ? c += `2. If '${n}' is a Web Component then add 'CUSTOM_ELEMENTS_SCHEMA' to the ${u} of this component to suppress this message.` : c += `2. To allow any element add 'NO_ERRORS_SCHEMA' to the ${u} of this component.`, If)
      throw new v(304, c);
    console.error(me(304, c));
  }
}
function dT(e, t, n, r) {
  return r === null || Ef(r, n) || t in e || vy(t) ? !0 : typeof Node > "u" || Node === null || !(e instanceof Node);
}
function lg(e, t, n, r) {
  !t && n === 4 && (t = "ng-template");
  const o = Nu(r), i = ku(r);
  let s = `Can't bind to '${e}' since it isn't a known property of '${t}'${i}.`;
  const a = `'${o ? "@Component" : "@NgModule"}.schemas'`, u = o ? "included in the '@Component.imports' of this component" : "a part of an @NgModule where this component is declared";
  if (dg.has(e)) {
    const c = dg.get(e);
    s += `
If the '${e}' is an Angular control flow directive, please make sure that either the '${c}' directive or the 'CommonModule' is ${u}.`;
  } else
    s += `
1. If '${t}' is an Angular component and it has the '${e}' input, then verify that it is ${u}.`, t && t.indexOf("-") > -1 ? (s += `
2. If '${t}' is a Web Component then add 'CUSTOM_ELEMENTS_SCHEMA' to the ${a} of this component to suppress this message.`, s += `
3. To allow any property add 'NO_ERRORS_SCHEMA' to the ${a} of this component.`) : s += `
2. To allow any property add 'NO_ERRORS_SCHEMA' to the ${a} of this component.`;
  Av(s);
}
function Av(e) {
  if (Cf)
    throw new v(303, e);
  console.error(me(303, e));
}
function Fu(e) {
  !ngDevMode && S("Must never be called in production mode");
  const n = e[De][ie];
  return n && n.constructor ? V(n.constructor) : null;
}
function Nu(e) {
  return !ngDevMode && S("Must never be called in production mode"), !!Fu(e)?.standalone;
}
function ku(e) {
  !ngDevMode && S("Must never be called in production mode");
  const n = Fu(e)?.type?.name;
  return n ? ` (used in the '${n}' component template)` : "";
}
const dg = /* @__PURE__ */ new Map([
  ["ngIf", "NgIf"],
  ["ngFor", "NgFor"],
  ["ngSwitchCase", "NgSwitchCase"],
  ["ngSwitchDefault", "NgSwitchDefault"]
]);
function Ef(e, t) {
  if (e !== null)
    for (let n = 0; n < e.length; n++) {
      const r = e[n];
      if (r === Tv || r === Sv && t && t.indexOf("-") > -1)
        return !0;
    }
  return !1;
}
function Ov(e) {
  return e.ownerDocument.defaultView;
}
function Fv(e) {
  return e.ownerDocument;
}
function bf(e) {
  return e.ownerDocument.body;
}
const Io = "�";
function Wt(e) {
  return e instanceof Function ? e() : e;
}
function Ft(e) {
  return (e ?? w(Re)).get(Cs) === "browser";
}
const fg = 200;
function fT(e) {
  if (Nv(e), !V(e).standalone)
    throw new v(907, `The ${U(e)} component is not marked as standalone, but Angular expects to have a standalone component here. Please make sure the ${U(e)} component has the \`standalone: true\` flag in the decorator.`);
}
function Nv(e) {
  if (!V(e))
    throw new v(906, `The ${U(e)} is not an Angular component, make sure it has the \`@Component\` decorator.`);
}
function hT(e, t, n) {
  throw new v(-300, `Multiple components match node with tagname ${e.value}: ${U(t)} and ${U(n)}`);
}
function pT(e, t, n, r, o) {
  const s = Fu(o)?.type?.name;
  let u = `ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked. Previous value${r ? ` for '${r}'` : ""}: '${hg(t)}'. Current value: '${hg(n)}'.${s ? ` Expression location: ${s} component` : ""}`;
  throw e && (u += " It seems like the view has been created after its parent and its children have been dirty checked. Has it been created in a change detection hook?"), new v(-100, u);
}
function hg(e) {
  let t = String(e);
  try {
    (Array.isArray(e) || t === "[object Object]") && (t = JSON.stringify(e));
  } catch {
  }
  return t.length > fg ? t.substring(0, fg) + "…" : t;
}
function pg(e, t, n, r, o) {
  const [i, s, ...a] = r.split(Io);
  let u = s, c = s;
  for (let l = 0; l < a.length; l++) {
    const d = t + l;
    u += `${e[d]}${a[l]}`, c += `${d === n ? o : e[d]}${a[l]}`;
  }
  return { propName: i, oldValue: u, newValue: c };
}
function gT(e, t, n, r) {
  const o = e[C].data, i = o[t];
  if (typeof i == "string")
    return i.indexOf(Io) > -1 ? pg(e, t, t, i, r) : { propName: i, oldValue: n, newValue: r };
  if (i === null) {
    let s = t - 1;
    for (; typeof o[s] != "string" && o[s + 1] === null; )
      s--;
    const a = o[s];
    if (typeof a == "string") {
      const u = a.match(new RegExp(Io, "g"));
      if (u && u.length - 1 > t - s)
        return pg(e, s, t, a, r);
    }
  }
  return { propName: void 0, oldValue: n, newValue: r };
}
var Co;
(function(e) {
  e[e.Important = 1] = "Important", e[e.DashCase = 2] = "DashCase";
})(Co || (Co = {}));
let jl;
function wf(e, t) {
  return jl(e, t);
}
function mT(e) {
  jl === void 0 && (jl = e());
}
function Kr(e, t, n, r, o) {
  if (r != null) {
    let i, s = !1;
    ke(r) ? i = r : Le(r) && (s = !0, ngDevMode && E(r[de], "HOST must be defined for a component LView"), r = r[de]);
    const a = re(r);
    e === 0 && n !== null ? o == null ? $v(t, n, a) : Ir(t, n, a, o || null, !0) : e === 1 && n !== null ? Ir(t, n, a, o || null, !0) : e === 2 ? ws(t, a, s) : e === 3 && (ngDevMode && ngDevMode.rendererDestroyNode++, t.destroyNode(a)), i != null && MT(t, e, i, n, o);
  }
}
function Mf(e, t) {
  return ngDevMode && ngDevMode.rendererCreateTextNode++, ngDevMode && ngDevMode.rendererSetText++, e.createText(t);
}
function kv(e, t, n) {
  ngDevMode && ngDevMode.rendererSetText++, e.setValue(t, n);
}
function _f(e, t) {
  return ngDevMode && ngDevMode.rendererCreateComment++, e.createComment(_v(t));
}
function Ru(e, t, n) {
  return ngDevMode && ngDevMode.rendererCreateElement++, e.createElement(t, n);
}
function yT(e, t) {
  Rv(e, t), t[de] = null, t[$e] = null;
}
function DT(e, t, n, r, o, i) {
  r[de] = o, r[$e] = t, ju(e, r, n, 1, o, i);
}
function Rv(e, t) {
  t[Et].changeDetectionScheduler?.notify(
    1
    /* NotificationType.AfterRenderHooks */
  ), ju(e, t, t[F], 2, null, null);
}
function vT(e) {
  let t = e[Pi];
  if (!t)
    return Oc(e[C], e);
  for (; t; ) {
    let n = null;
    if (Le(t))
      n = t[Pi];
    else {
      ngDevMode && ot(t);
      const r = t[ge];
      r && (n = r);
    }
    if (!n) {
      for (; t && !t[Nt] && t !== e; )
        Le(t) && Oc(t[C], t), t = t[Ce];
      t === null && (t = e), Le(t) && Oc(t[C], t), n = t && t[Nt];
    }
    t = n;
  }
}
function IT(e, t, n, r) {
  ngDevMode && tn(t), ngDevMode && ot(n);
  const o = ge + r, i = n.length;
  r > 0 && (n[o - 1][Nt] = t), r < i - ge ? (t[Nt] = n[o], my(n, ge + r, t)) : (n.push(t), t[Nt] = null), t[Ce] = n;
  const s = t[ps];
  s !== null && n !== s && CT(s, t);
  const a = t[kt];
  a !== null && a.insertView(e), Cl(t), t[_] |= 128;
}
function CT(e, t) {
  ngDevMode && E(t, "LView required"), ngDevMode && ot(e);
  const n = e[gr], r = t[Ce];
  ngDevMode && ot(r);
  const o = r[Ce][De];
  ngDevMode && E(o, "Missing insertedComponentLView");
  const i = t[De];
  ngDevMode && E(i, "Missing declaredComponentLView"), i !== o && (e[_] |= Oa.HasTransplantedViews), n === null ? e[gr] = [t] : n.push(t);
}
function xv(e, t) {
  ngDevMode && ot(e), ngDevMode && E(e[gr], "A projected view should belong to a non-empty projected views collection");
  const n = e[gr], r = n.indexOf(t);
  ngDevMode && ot(t[Ce]), n.splice(r, 1);
}
function Gi(e, t) {
  if (e.length <= ge)
    return;
  const n = ge + t, r = e[n];
  if (r) {
    const o = r[ps];
    o !== null && o !== e && xv(o, r), t > 0 && (e[n - 1][Nt] = r[Nt]);
    const i = _a(e, ge + t);
    yT(r[C], r);
    const s = i[kt];
    s !== null && s.detachView(i[C]), r[Ce] = null, r[Nt] = null, r[_] &= -129;
  }
  return r;
}
function xu(e, t) {
  if (!(t[_] & 256)) {
    const n = t[F];
    n.destroyNode && ju(e, t, n, 3, null, null), vT(t);
  }
}
function Oc(e, t) {
  if (t[_] & 256)
    return;
  const n = $(null);
  try {
    t[_] &= -129, t[_] |= 256, t[pr] && Zm(t[pr]), Lv(e, t), Pv(e, t), t[C].type === 1 && (ngDevMode && ngDevMode.rendererDestroy++, t[F].destroy());
    const r = t[ps];
    if (r !== null && ke(t[Ce])) {
      r !== t[Ce] && xv(r, t);
      const o = t[kt];
      o !== null && o.detachView(e);
    }
    q_(t);
  } finally {
    $(n);
  }
}
function Pv(e, t) {
  ngDevMode && bd(Pv.name);
  const n = e.cleanup, r = t[mo];
  if (n !== null)
    for (let i = 0; i < n.length - 1; i += 2)
      if (typeof n[i] == "string") {
        const s = n[i + 3];
        ngDevMode && J(s, "cleanup target must be a number"), s >= 0 ? r[s]() : r[-s].unsubscribe(), i += 2;
      } else {
        const s = r[n[i + 1]];
        n[i].call(s);
      }
  r !== null && (t[mo] = null);
  const o = t[Fn];
  if (o !== null) {
    t[Fn] = null;
    for (let i = 0; i < o.length; i++) {
      const s = o[i];
      ngDevMode && uy(s, "Expecting destroy hook to be a function."), s();
    }
  }
}
function Lv(e, t) {
  ngDevMode && bd(Lv.name);
  let n;
  if (e != null && (n = e.destroyHooks) != null)
    for (let r = 0; r < n.length; r += 2) {
      const o = t[n[r]];
      if (!(o instanceof Is)) {
        const i = n[r + 1];
        if (Array.isArray(i))
          for (let s = 0; s < i.length; s += 2) {
            const a = o[i[s]], u = i[s + 1];
            zt(4, a, u);
            try {
              u.call(a);
            } finally {
              zt(5, a, u);
            }
          }
        else {
          zt(4, o, i);
          try {
            i.call(o);
          } finally {
            zt(5, o, i);
          }
        }
      }
    }
}
function Sf(e, t, n) {
  return jv(e, t.parent, n);
}
function jv(e, t, n) {
  let r = t;
  for (; r !== null && r.type & 40; )
    t = r, r = t.parent;
  if (r === null)
    return n[de];
  {
    ngDevMode && je(
      r,
      7
      /* TNodeType.Container */
    );
    const { componentOffset: o } = r;
    if (o > -1) {
      ngDevMode && Ye(r, n);
      const { encapsulation: i } = e.data[r.directiveStart + o];
      if (i === mn.None || i === mn.Emulated)
        return null;
    }
    return Be(r, n);
  }
}
function Ir(e, t, n, r, o) {
  ngDevMode && ngDevMode.rendererInsertBefore++, e.insertBefore(t, n, r, o);
}
function $v(e, t, n) {
  ngDevMode && ngDevMode.rendererAppendChild++, ngDevMode && E(t, "parent node must be defined"), e.appendChild(t, n);
}
function gg(e, t, n, r, o) {
  r !== null ? Ir(e, t, n, r, o) : $v(e, t, n);
}
function ET(e, t, n, r) {
  e.removeChild(t, n, r);
}
function Pu(e, t) {
  return e.parentNode(t);
}
function bT(e, t) {
  return e.nextSibling(t);
}
function Bv(e, t, n) {
  return Vv(e, t, n);
}
function Hv(e, t, n) {
  return e.type & 40 ? Be(e, n) : null;
}
let Vv = Hv, $l;
function Uv(e, t) {
  Vv = e, $l = t;
}
function Lu(e, t, n, r) {
  const o = Sf(e, r, t), i = t[F], s = r.parent || t[$e], a = Bv(s, r, t);
  if (o != null)
    if (Array.isArray(n))
      for (let u = 0; u < n.length; u++)
        gg(i, o, n[u], a, !1);
    else
      gg(i, o, n, a, !1);
  $l !== void 0 && $l(i, r, t, n, o);
}
function vi(e, t) {
  if (t !== null) {
    ngDevMode && je(
      t,
      63
      /* TNodeType.Projection */
    );
    const n = t.type;
    if (n & 3)
      return Be(t, e);
    if (n & 4)
      return Bl(-1, e[t.index]);
    if (n & 8) {
      const r = t.child;
      if (r !== null)
        return vi(e, r);
      {
        const o = e[t.index];
        return ke(o) ? Bl(-1, o) : re(o);
      }
    } else {
      if (n & 32)
        return wf(t, e)() || re(e[t.index]);
      {
        const r = zv(e, t);
        if (r !== null) {
          if (Array.isArray(r))
            return r[0];
          const o = mr(e[De]);
          return ngDevMode && Hy(o), vi(o, r);
        } else
          return vi(e, t.next);
      }
    }
  }
  return null;
}
function zv(e, t) {
  if (t !== null) {
    const r = e[De][$e], o = t.projection;
    return ngDevMode && zM(e), r.projection[o];
  }
  return null;
}
function Bl(e, t) {
  const n = ge + e + 1;
  if (n < t.length) {
    const r = t[n], o = r[C].firstChild;
    if (o !== null)
      return vi(r, o);
  }
  return t[Kt];
}
function ws(e, t, n) {
  ngDevMode && ngDevMode.rendererRemoveNode++;
  const r = Pu(e, t);
  r && ET(e, r, t, n);
}
function Gv(e) {
  e.textContent = "";
}
function Tf(e, t, n, r, o, i, s) {
  for (; n != null; ) {
    ngDevMode && Ye(n, r), ngDevMode && je(
      n,
      63
      /* TNodeType.Icu */
    );
    const a = r[n.index], u = n.type;
    if (s && t === 0 && (a && Pe(re(a), r), n.flags |= 2), (n.flags & 32) !== 32)
      if (u & 8)
        Tf(e, t, n.child, r, o, i, !1), Kr(t, e, o, a, i);
      else if (u & 32) {
        const c = wf(n, r);
        let l;
        for (; l = c(); )
          Kr(t, e, o, l, i);
        Kr(t, e, o, a, i);
      } else u & 16 ? Wv(e, t, r, n, o, i) : (ngDevMode && je(
        n,
        7
        /* TNodeType.Container */
      ), Kr(t, e, o, a, i));
    n = s ? n.projectionNext : n.next;
  }
}
function ju(e, t, n, r, o, i) {
  Tf(n, r, e.firstChild, t, o, i, !1);
}
function wT(e, t, n) {
  const r = t[F], o = Sf(e, n, t), i = n.parent || t[$e];
  let s = Bv(i, n, t);
  Wv(r, 0, t, n, o, s);
}
function Wv(e, t, n, r, o, i) {
  const s = n[De], a = s[$e];
  ngDevMode && A(typeof r.projection, "number", "expecting projection index");
  const u = a.projection[r.projection];
  if (Array.isArray(u))
    for (let c = 0; c < u.length; c++) {
      const l = u[c];
      Kr(t, e, o, l, i);
    }
  else {
    let c = u;
    const l = s[Ce];
    Ra(r) && (c.flags |= 128), Tf(e, t, c, l, o, i, !0);
  }
}
function MT(e, t, n, r, o) {
  ngDevMode && ot(n);
  const i = n[Kt], s = re(n);
  i !== s && Kr(t, e, r, i, o);
  for (let a = ge; a < n.length; a++) {
    const u = n[a];
    ju(u[C], u, e, t, r, i);
  }
}
function _T(e, t, n, r, o) {
  if (t)
    o ? (ngDevMode && ngDevMode.rendererAddClass++, e.addClass(n, r)) : (ngDevMode && ngDevMode.rendererRemoveClass++, e.removeClass(n, r));
  else {
    let i = r.indexOf("-") === -1 ? void 0 : Co.DashCase;
    o == null ? (ngDevMode && ngDevMode.rendererRemoveStyle++, e.removeStyle(n, r, i)) : (typeof o == "string" && o.endsWith("!important") && (o = o.slice(0, -10), i |= Co.Important), ngDevMode && ngDevMode.rendererSetStyle++, e.setStyle(n, r, o, i));
  }
}
function ST(e, t, n) {
  ngDevMode && xo(n, "'newValue' should be a string"), e.setAttribute(t, "style", n), ngDevMode && ngDevMode.rendererSetStyle++;
}
function qv(e, t, n) {
  ngDevMode && xo(n, "'newValue' should be a string"), n === "" ? e.removeAttribute(t, "class") : e.setAttribute(t, "class", n), ngDevMode && ngDevMode.rendererSetClassName++;
}
function Qv(e, t, n) {
  const { mergedAttrs: r, classes: o, styles: i } = n;
  r !== null && ml(e, t, r), o !== null && qv(e, t, o), i !== null && ST(e, t, i);
}
const O = typeof ngDevMode > "u" || ngDevMode ? { __brand__: "NO_CHANGE" } : {};
function Zv(e = 1) {
  ngDevMode && er(e, 0, "Can only advance forward"), Yv(x(), m(), He() + e, !!ngDevMode && $r());
}
function Yv(e, t, n, r) {
  if (ngDevMode && gs(t[C], n), !r)
    if ((t[_] & 3) === 3) {
      const i = e.preOrderCheckHooks;
      i !== null && fa(t, i, n);
    } else {
      const i = e.preOrderHooks;
      i !== null && ha(t, i, 0, n);
    }
  yr(n);
}
function Ur(e, t = z.Default) {
  const n = m();
  if (n === null)
    return ngDevMode && tM(Ur), Ne(e, t);
  const r = K(), o = _D(r, n, R(e), t);
  return ngDevMode && fy(e, o, t), o;
}
function Kv() {
  const e = ngDevMode ? "This constructor was not compatible with Dependency Injection." : "invalid";
  throw new Error(e);
}
function Jv(e, t, n, r, o, i) {
  const s = $(null);
  try {
    let a = null;
    o & yn.SignalBased && (a = t[r][ht]), a !== null && a.transformFn !== void 0 && (i = a.transformFn(i)), o & yn.HasDecoratorInputTransform && (i = e.inputTransforms[r].call(t, i)), e.setInput !== null ? e.setInput(t, a, i, n, r) : Gy(t, a, r, i);
  } finally {
    $(s);
  }
}
function TT(e, t) {
  const n = e.hostBindingOpCodes;
  if (n !== null)
    try {
      for (let r = 0; r < n.length; r++) {
        const o = n[r];
        if (o < 0)
          yr(~o);
        else {
          const i = o, s = n[++r], a = n[++r];
          a_(s, i);
          const u = t[i];
          a(2, u);
        }
      }
    } finally {
      yr(-1);
    }
}
function $u(e, t, n, r, o, i, s, a, u, c, l) {
  const d = t.blueprint.slice();
  return d[de] = o, d[_] = r | 4 | 128 | 8 | 64, (c !== null || e && e[_] & 2048) && (d[_] |= 2048), Xy(d), ngDevMode && t.declTNode && e && Ye(t.declTNode, e), d[Ce] = d[Zn] = e, d[ie] = n, d[Et] = s || e && e[Et], ngDevMode && E(d[Et], "LViewEnvironment is required"), d[F] = a || e && e[F], ngDevMode && E(d[F], "Renderer is required"), d[_e] = u || e && e[_e] || null, d[$e] = i, d[hr] = G_(), d[gt] = l, d[Ly] = c, ngDevMode && A(t.type == 2 ? e !== null : !0, !0, "Embedded views must have parentLView"), d[De] = t.type == 2 ? e[De] : d, d;
}
function qo(e, t, n, r, o) {
  ngDevMode && t !== 0 && // 0 are bogus nodes and they are OK. See `createContainerRef` in
  // `view_engine_compatibility` for additional context.
  bn(t, T, "TNodes can't be in the LView header."), ngDevMode && D_(n);
  let i = e.data[t];
  if (i === null)
    i = Af(e, t, n, r, o), s_() && (i.flags |= 32);
  else if (i.type & 64) {
    i.type = n, i.value = r, i.attrs = o;
    const s = $i();
    i.injectorIndex = s === null ? -1 : s.injectorIndex, ngDevMode && jo(i, e), ngDevMode && A(t, i.index, "Expecting same index");
  }
  return Xt(i, !0), i;
}
function Af(e, t, n, r, o) {
  const i = aD(), s = Qd(), a = s ? i : i && i.parent, u = e.data[t] = xT(e, a, n, t, r, o);
  return e.firstChild === null && (e.firstChild = u), i !== null && (s ? i.child == null && u.parent !== null && (i.child = u) : i.next === null && (i.next = u, u.prev = i)), u;
}
function Ms(e, t, n, r) {
  if (n === 0)
    return -1;
  ngDevMode && (it(e), cy(e, t[C], "`LView` must be associated with `TView`!"), A(e.data.length, t.length, "Expecting LView to be same size as TView"), A(e.data.length, e.blueprint.length, "Expecting Blueprint to be same size as TView"), Vd(e));
  const o = t.length;
  for (let i = 0; i < n; i++)
    t.push(r), e.blueprint.push(r), e.data.push(null);
  return o;
}
function Xv(e, t, n, r, o) {
  const i = He(), s = r & 2;
  try {
    yr(-1), s && t.length > T && Yv(e, t, T, !!ngDevMode && $r()), zt(s ? 2 : 0, o), n(r, o);
  } finally {
    yr(i), zt(s ? 3 : 1, o);
  }
}
function Of(e, t, n) {
  if ($d(t)) {
    const r = $(null);
    try {
      const o = t.directiveStart, i = t.directiveEnd;
      for (let s = o; s < i; s++) {
        const a = e.data[s];
        if (a.contentQueries) {
          const u = n[s];
          ngDevMode && E(s, "Incorrect reference to a directive defining a content query"), a.contentQueries(1, u, s);
        }
      }
    } finally {
      $(r);
    }
  }
}
function Ff(e, t, n) {
  nD() && (VT(e, t, n, Be(n, t)), (n.flags & 64) === 64 && oI(e, t, n));
}
function Nf(e, t, n = Be) {
  const r = t.localNames;
  if (r !== null) {
    let o = t.index + 1;
    for (let i = 0; i < r.length; i += 2) {
      const s = r[i + 1], a = s === -1 ? n(t, e) : e[s];
      e[o++] = a;
    }
  }
}
function eI(e) {
  const t = e.tView;
  return t === null || t.incompleteFirstPass ? e.tView = kf(1, null, e.template, e.decls, e.vars, e.directiveDefs, e.pipeDefs, e.viewQuery, e.schemas, e.consts, e.id) : t;
}
function kf(e, t, n, r, o, i, s, a, u, c, l) {
  ngDevMode && ngDevMode.tView++;
  const d = T + r, f = d + o, h = AT(d, f), p = typeof c == "function" ? c() : c, g = h[C] = {
    type: e,
    blueprint: h,
    template: n,
    queries: null,
    viewQuery: a,
    declTNode: t,
    data: h.slice().fill(null, d),
    bindingStartIndex: d,
    expandoStartIndex: f,
    hostBindingOpCodes: null,
    firstCreatePass: !0,
    firstUpdatePass: !0,
    staticViewQueries: !1,
    staticContentQueries: !1,
    preOrderHooks: null,
    preOrderCheckHooks: null,
    contentHooks: null,
    contentCheckHooks: null,
    viewHooks: null,
    viewCheckHooks: null,
    destroyHooks: null,
    cleanup: null,
    contentQueries: null,
    components: null,
    directiveRegistry: typeof i == "function" ? i() : i,
    pipeRegistry: typeof s == "function" ? s() : s,
    firstChild: null,
    schemas: u,
    consts: p,
    incompleteFirstPass: !1,
    ssrId: l
  };
  return ngDevMode && Object.seal(g), g;
}
function AT(e, t) {
  const n = [];
  for (let r = 0; r < t; r++)
    n.push(r < e ? null : O);
  return n;
}
function OT(e, t, n, r) {
  const i = r.get(cv, uv) || n === mn.ShadowDom, s = e.selectRootElement(t, i);
  return FT(s), s;
}
function FT(e) {
  tI(e);
}
let tI = () => null;
function NT(e) {
  PD(e) ? Gv(e) : DS(e);
}
function kT() {
  tI = NT;
}
function RT(e, t, n, r) {
  const o = aI(t);
  ngDevMode && E(n, "Cleanup context is mandatory when registering framework-level destroy hooks"), o.push(n), e.firstCreatePass ? Ul(e).push(r, o.length - 1) : ngDevMode && Object.freeze(Ul(e));
}
function xT(e, t, n, r, o, i) {
  ngDevMode && r !== 0 && // 0 are bogus nodes and they are OK. See `createContainerRef` in
  // `view_engine_compatibility` for additional context.
  bn(r, T, "TNodes can't be in the LView header."), ngDevMode && jr(i, void 0, "'undefined' is not valid value for 'attrs'"), ngDevMode && ngDevMode.tNode++, ngDevMode && t && jo(t, e);
  let s = t ? t.injectorIndex : -1, a = 0;
  Bo() && (a |= 128);
  const u = {
    type: n,
    index: r,
    insertBeforeIndex: null,
    injectorIndex: s,
    directiveStart: -1,
    directiveEnd: -1,
    directiveStylingLast: -1,
    componentOffset: -1,
    propertyBindings: null,
    flags: a,
    providerIndexes: 0,
    value: o,
    attrs: i,
    mergedAttrs: null,
    localNames: null,
    initialInputs: void 0,
    inputs: null,
    outputs: null,
    tView: null,
    next: null,
    prev: null,
    projectionNext: null,
    child: null,
    parent: t,
    projection: null,
    styles: null,
    stylesWithoutHost: null,
    residualStyles: void 0,
    classes: null,
    classesWithoutHost: null,
    residualClasses: void 0,
    classBindings: 0,
    styleBindings: 0
  };
  return ngDevMode && Object.seal(u), u;
}
function mg(e, t, n, r, o) {
  for (let i in t) {
    if (!t.hasOwnProperty(i))
      continue;
    const s = t[i];
    if (s === void 0)
      continue;
    r ??= {};
    let a, u = yn.None;
    Array.isArray(s) ? (a = s[0], u = s[1]) : a = s;
    let c = i;
    if (o !== null) {
      if (!o.hasOwnProperty(i))
        continue;
      c = o[i];
    }
    e === 0 ? yg(r, n, c, a, u) : yg(r, n, c, a);
  }
  return r;
}
function yg(e, t, n, r, o) {
  let i;
  e.hasOwnProperty(n) ? (i = e[n]).push(t, r) : i = e[n] = [t, r], o !== void 0 && i.push(o);
}
function PT(e, t, n) {
  ngDevMode && it(e);
  const r = t.directiveStart, o = t.directiveEnd, i = e.data, s = t.attrs, a = [];
  let u = null, c = null;
  for (let l = r; l < o; l++) {
    const d = i[l], f = n ? n.get(d) : null, h = f ? f.inputs : null, p = f ? f.outputs : null;
    u = mg(0, d.inputs, l, u, h), c = mg(1, d.outputs, l, c, p);
    const g = u !== null && s !== null && !Nd(t) ? KT(u, l, s) : null;
    a.push(g);
  }
  u !== null && (u.hasOwnProperty("class") && (t.flags |= 8), u.hasOwnProperty("style") && (t.flags |= 16)), t.initialInputs = a, t.inputs = u, t.outputs = c;
}
function LT(e) {
  return e === "class" ? "className" : e === "for" ? "htmlFor" : e === "formaction" ? "formAction" : e === "innerHtml" ? "innerHTML" : e === "readonly" ? "readOnly" : e === "tabindex" ? "tabIndex" : e;
}
function st(e, t, n, r, o, i, s, a) {
  ngDevMode && jr(o, O, "Incoming value should never be NO_CHANGE.");
  const u = Be(t, n);
  let c = t.inputs, l;
  !a && c != null && (l = c[r]) ? (Pf(e, n, l, r, o), tr(t) && jT(n, t.index), ngDevMode && $T(n, u, t.type, l, o)) : t.type & 3 ? (r = LT(r), ngDevMode && (KS(r), dT(u, r, t.value, e.schemas) || lg(r, t.value, t.type, n), ngDevMode.rendererSetProperty++), o = s != null ? s(o, t.value || "", r) : o, i.setProperty(u, r, o)) : t.type & 12 && ngDevMode && !Ef(e.schemas, t.value) && lg(r, t.value, t.type, n);
}
function jT(e, t) {
  ngDevMode && tn(e);
  const n = mt(t, e);
  n[_] & 16 || (n[_] |= 64);
}
function nI(e, t, n, r, o) {
  const i = e[F];
  r = nT(r);
  const s = iT(o);
  if (n & 3)
    o == null ? i.removeAttribute(t, r) : i.setAttribute(t, r, s);
  else {
    const a = _v(`bindings=${JSON.stringify({ [r]: s }, null, 2)}`);
    i.setValue(t, a);
  }
}
function $T(e, t, n, r, o) {
  if (n & 7)
    for (let i = 0; i < r.length; i += 3)
      nI(e, t, n, r[i + 1], o);
}
function Rf(e, t, n, r) {
  if (ngDevMode && it(e), nD()) {
    const o = r === null ? null : { "": -1 }, i = zT(e, n);
    let s, a;
    i === null ? s = a = null : [s, a] = i, s !== null && rI(e, t, n, s, o, a), o && GT(n, r, o);
  }
  n.mergedAttrs = xi(n.mergedAttrs, n.attrs);
}
function rI(e, t, n, r, o, i) {
  ngDevMode && it(e);
  for (let c = 0; c < r.length; c++)
    Ml(ka(n, t), e, r[c].type);
  qT(n, e.data.length, r.length);
  for (let c = 0; c < r.length; c++) {
    const l = r[c];
    l.providersResolver && l.providersResolver(l);
  }
  let s = !1, a = !1, u = Ms(e, t, r.length, null);
  ngDevMode && cy(u, n.directiveStart, "TNode.directiveStart should point to just allocated space");
  for (let c = 0; c < r.length; c++) {
    const l = r[c];
    n.mergedAttrs = xi(n.mergedAttrs, l.hostAttrs), QT(e, n, t, u, l), WT(u, l, o), l.contentQueries !== null && (n.flags |= 4), (l.hostBindings !== null || l.hostAttrs !== null || l.hostVars !== 0) && (n.flags |= 64);
    const d = l.type.prototype;
    !s && (d.ngOnChanges || d.ngOnInit || d.ngDoCheck) && ((e.preOrderHooks ??= []).push(n.index), s = !0), !a && (d.ngOnChanges || d.ngDoCheck) && ((e.preOrderCheckHooks ??= []).push(n.index), a = !0), u++;
  }
  PT(e, n, i);
}
function BT(e, t, n, r, o) {
  ngDevMode && it(e);
  const i = o.hostBindings;
  if (i) {
    let s = e.hostBindingOpCodes;
    s === null && (s = e.hostBindingOpCodes = []);
    const a = ~t.index;
    HT(s) != a && s.push(a), s.push(n, r, i);
  }
}
function HT(e) {
  let t = e.length;
  for (; t > 0; ) {
    const n = e[--t];
    if (typeof n == "number" && n < 0)
      return n;
  }
  return 0;
}
function VT(e, t, n, r) {
  const o = n.directiveStart, i = n.directiveEnd;
  tr(n) && (ngDevMode && je(
    n,
    3
    /* TNodeType.AnyRNode */
  ), ZT(t, n, e.data[o + n.componentOffset])), e.firstCreatePass || ka(n, t), Pe(r, t);
  const s = n.initialInputs;
  for (let a = o; a < i; a++) {
    const u = e.data[a], c = Dr(t, e, a, n);
    if (Pe(c, t), s !== null && YT(t, a - o, c, u, n, s), bt(u)) {
      const l = mt(n.index, t);
      l[ie] = Dr(t, e, a, n);
    }
  }
}
function oI(e, t, n) {
  const r = n.directiveStart, o = n.directiveEnd, i = n.index, s = u_();
  try {
    yr(i);
    for (let a = r; a < o; a++) {
      const u = e.data[a], c = t[a];
      El(a), (u.hostBindings !== null || u.hostVars !== 0 || u.hostAttrs !== null) && UT(u, c);
    }
  } finally {
    yr(-1), El(s);
  }
}
function UT(e, t) {
  e.hostBindings !== null && e.hostBindings(1, t);
}
function zT(e, t) {
  ngDevMode && it(e), ngDevMode && je(
    t,
    15
    /* TNodeType.AnyContainer */
  );
  const n = e.directiveRegistry;
  let r = null, o = null;
  if (n)
    for (let i = 0; i < n.length; i++) {
      const s = n[i];
      if (Cy(
        t,
        s.selectors,
        /* isProjectionMode */
        !1
      ))
        if (r || (r = []), bt(s))
          if (ngDevMode && (je(t, 2, `"${t.value}" tags cannot be used as component hosts. Please use a different tag to activate the ${Q(s.type)} component.`), tr(t) && hT(t, r.find(bt).type, s.type)), s.findHostDirectiveDefs !== null) {
            const a = [];
            o = o || /* @__PURE__ */ new Map(), s.findHostDirectiveDefs(s, a, o), r.unshift(...a, s);
            const u = a.length;
            Hl(e, t, u);
          } else
            r.unshift(s), Hl(e, t, 0);
        else
          o = o || /* @__PURE__ */ new Map(), s.findHostDirectiveDefs?.(s, r, o), r.push(s);
    }
  return ngDevMode && r !== null && Vy(r), r === null ? null : [r, o];
}
function Hl(e, t, n) {
  ngDevMode && it(e), ngDevMode && er(n, -1, "componentOffset must be great than -1"), t.componentOffset = n, (e.components ??= []).push(t.index);
}
function GT(e, t, n) {
  if (t) {
    const r = e.localNames = [];
    for (let o = 0; o < t.length; o += 2) {
      const i = n[t[o + 1]];
      if (i == null)
        throw new v(-301, ngDevMode && `Export of name '${t[o + 1]}' not found!`);
      r.push(t[o], i);
    }
  }
}
function WT(e, t, n) {
  if (n) {
    if (t.exportAs)
      for (let r = 0; r < t.exportAs.length; r++)
        n[t.exportAs[r]] = e;
    bt(t) && (n[""] = e);
  }
}
function qT(e, t, n) {
  ngDevMode && jt(n, e.directiveEnd - e.directiveStart, "Reached the max number of directives"), e.flags |= 1, e.directiveStart = t, e.directiveEnd = t + n, e.providerIndexes = t;
}
function QT(e, t, n, r, o) {
  ngDevMode && bn(r, T, "Must be in Expando section"), e.data[r] = o;
  const i = o.factory || (o.factory = cr(o.type, !0)), s = new Is(i, bt(o), Ur);
  e.blueprint[r] = s, n[r] = s, BT(e, t, r, Ms(e, n, o.hostVars, O), o);
}
function ZT(e, t, n) {
  const r = Be(t, e), o = eI(n), i = e[Et].rendererFactory;
  let s = 16;
  n.signals ? s = 4096 : n.onPush && (s = 64);
  const a = Bu(e, $u(e, o, null, s, r, t, null, i.createRenderer(r, n), null, null, null));
  e[t.index] = a;
}
function sn(e, t, n, r, o, i) {
  ngDevMode && (jr(r, O, "Incoming value should never be NO_CHANGE."), JS(n), je(e, 2, `Attempted to set attribute \`${n}\` on a container node. Host bindings are not valid on ng-container or ng-template.`));
  const s = Be(e, t);
  xf(t[F], s, i, e.value, n, r, o);
}
function xf(e, t, n, r, o, i, s) {
  if (i == null)
    ngDevMode && ngDevMode.rendererRemoveAttribute++, e.removeAttribute(t, o, n);
  else {
    ngDevMode && ngDevMode.rendererSetAttribute++;
    const a = s == null ? L(i) : s(i, r || "", o);
    e.setAttribute(t, o, a, n);
  }
}
function YT(e, t, n, r, o, i) {
  const s = i[t];
  if (s !== null)
    for (let a = 0; a < s.length; ) {
      const u = s[a++], c = s[a++], l = s[a++], d = s[a++];
      if (Jv(r, n, u, c, l, d), ngDevMode) {
        const f = Be(o, e);
        nI(e, f, o.type, c, d);
      }
    }
}
function KT(e, t, n) {
  let r = null, o = 0;
  for (; o < n.length; ) {
    const i = n[o];
    if (i === 0) {
      o += 4;
      continue;
    } else if (i === 5) {
      o += 2;
      continue;
    }
    if (typeof i == "number")
      break;
    if (e.hasOwnProperty(i)) {
      r === null && (r = []);
      const s = e[i];
      for (let a = 0; a < s.length; a += 3)
        if (s[a] === t) {
          r.push(i, s[a + 1], s[a + 2], n[o + 1]);
          break;
        }
    }
    o += 2;
  }
  return r;
}
function iI(e, t, n, r) {
  ngDevMode && tn(t);
  const o = [
    e,
    // host native
    !0,
    // Boolean `true` in this position signifies that this is an `LContainer`
    0,
    // flags
    t,
    // parent
    null,
    // next
    r,
    // t_host
    null,
    // dehydrated views
    n,
    // native,
    null,
    // view refs
    null
    // moved views
  ];
  return ngDevMode && A(o.length, ge, "Should allocate correct number of slots for LContainer header."), o;
}
function sI(e, t) {
  const n = e.contentQueries;
  if (n !== null) {
    const r = $(null);
    try {
      for (let o = 0; o < n.length; o += 2) {
        const i = n[o], s = n[o + 1];
        if (s !== -1) {
          const a = e.data[s];
          ngDevMode && E(a, "DirectiveDef not found."), ngDevMode && E(a.contentQueries, "contentQueries function should be defined"), Eu(i), a.contentQueries(2, t[s], s);
        }
      }
    } finally {
      $(r);
    }
  }
}
function Bu(e, t) {
  return e[Pi] ? e[Qp][Nt] = t : e[Pi] = t, e[Qp] = t, t;
}
function Vl(e, t, n) {
  ngDevMode && E(t, "View queries function to execute must be defined."), Eu(0);
  const r = $(null);
  try {
    t(e, n);
  } finally {
    $(r);
  }
}
function ve(e, t, n, r, ...o) {
  if (e[r] === null && (t.inputs == null || !t.inputs[n])) {
    (t.propertyBindings || (t.propertyBindings = [])).push(r);
    let s = n;
    o.length > 0 && (s += Io + o.join(Io)), e[r] = s;
  }
}
function aI(e) {
  return e[mo] || (e[mo] = []);
}
function Ul(e) {
  return e.cleanup || (e.cleanup = []);
}
function uI(e, t, n) {
  return (e === null || bt(e)) && (n = zd(n[t.index])), n[F];
}
function Hu(e, t) {
  const n = e[_e], r = n ? n.get(Mn, null) : null;
  r && r.handleError(t);
}
function Pf(e, t, n, r, o) {
  for (let i = 0; i < n.length; ) {
    const s = n[i++], a = n[i++], u = n[i++], c = t[s];
    ngDevMode && Ee(t, s);
    const l = e.data[s];
    Jv(l, c, r, a, u, o);
  }
}
function Sn(e, t, n) {
  ngDevMode && xo(n, "Value should be a string"), ngDevMode && jr(n, O, "value should not be NO_CHANGE"), ngDevMode && Ee(e, t);
  const r = ms(t, e);
  ngDevMode && E(r, "native element should exist"), kv(e[F], r, n);
}
function JT(e, t) {
  ngDevMode && A(Ds(e), !0, "Should be run in creation mode");
  const n = mt(t, e), r = n[C];
  XT(r, n);
  const o = n[de];
  o !== null && n[gt] === null && (n[gt] = hf(o, n[_e])), Vu(r, n, n[ie]);
}
function XT(e, t) {
  for (let n = t.length; n < e.blueprint.length; n++)
    t.push(e.blueprint[n]);
}
function Vu(e, t, n) {
  ngDevMode && A(Ds(t), !0, "Should be run in creation mode"), ngDevMode && bd(Vu.name), Jd(t);
  try {
    const r = e.viewQuery;
    r !== null && Vl(1, r, n);
    const o = e.template;
    o !== null && Xv(e, t, o, 1, n), e.firstCreatePass && (e.firstCreatePass = !1), t[kt]?.finishViewCreation(e), e.staticContentQueries && sI(e, t), e.staticViewQueries && Vl(2, e.viewQuery, n);
    const i = e.components;
    i !== null && eA(t, i);
  } catch (r) {
    throw e.firstCreatePass && (e.incompleteFirstPass = !0, e.firstCreatePass = !1), r;
  } finally {
    t[_] &= -5, Xd();
  }
}
function eA(e, t) {
  for (let n = 0; n < t.length; n++)
    JT(e, t[n]);
}
function _s(e, t, n, r) {
  const o = $(null);
  try {
    const i = t.tView;
    ngDevMode && E(i, "TView must be defined for a template node."), ngDevMode && Ye(t, e);
    const a = e[_] & 4096 ? 4096 : 16, u = $u(e, i, n, a, null, t, null, null, r?.injector ?? null, r?.embeddedViewInjector ?? null, r?.dehydratedView ?? null), c = e[t.index];
    ngDevMode && ot(c), u[ps] = c;
    const l = e[kt];
    return l !== null && (u[kt] = l.createEmbeddedView(i)), Vu(i, u, n), u;
  } finally {
    $(o);
  }
}
function cI(e, t) {
  const n = ge + t;
  if (n < e.length) {
    const r = e[n];
    return ngDevMode && tn(r), r;
  }
}
function Eo(e, t) {
  return !t || t.firstChild === null || Ra(e);
}
function Ss(e, t, n, r = !0) {
  const o = t[C];
  if (IT(o, t, e, n), r) {
    const s = Bl(n, e), a = t[F], u = Pu(a, e[Kt]);
    u !== null && DT(o, e[$e], a, t, u, s);
  }
  const i = t[gt];
  i !== null && i.firstChild !== null && (i.firstChild = null);
}
function Lf(e, t) {
  const n = Gi(e, t);
  return n !== void 0 && xu(n[C], n), n;
}
function Wi(e, t, n, r, o = !1) {
  for (; n !== null; ) {
    ngDevMode && je(
      n,
      63
      /* TNodeType.Icu */
    );
    const i = t[n.index];
    i !== null && r.push(re(i)), ke(i) && lI(i, r);
    const s = n.type;
    if (s & 8)
      Wi(e, t, n.child, r);
    else if (s & 32) {
      const a = wf(n, t);
      let u;
      for (; u = a(); )
        r.push(u);
    } else if (s & 16) {
      const a = zv(t, n);
      if (Array.isArray(a))
        r.push(...a);
      else {
        const u = mr(t[De]);
        ngDevMode && Hy(u), Wi(u[C], u, a, r, !0);
      }
    }
    n = o ? n.projectionNext : n.next;
  }
  return r;
}
function lI(e, t) {
  for (let n = ge; n < e.length; n++) {
    const r = e[n], o = r[C].firstChild;
    o !== null && Wi(r[C], r, o, t);
  }
  e[Kt] !== e[de] && t.push(e[Kt]);
}
let dI = [];
function tA(e) {
  return e[pr] ?? nA(e);
}
function nA(e) {
  const t = dI.pop() ?? Object.create(oA);
  return t.lView = e, t;
}
function rA(e) {
  e.lView[pr] !== e && (e.lView = null, dI.push(e));
}
const oA = {
  ...su,
  consumerIsAlwaysLive: !0,
  consumerMarkedDirty: (e) => {
    ji(e.lView);
  },
  consumerOnSignalRead() {
    this.lView[pr] = this;
  }
}, fI = 100;
function Uu(e, t = !0, n = 0) {
  const r = e[Et], o = r.rendererFactory, i = !!ngDevMode && $r();
  i || o.begin?.();
  try {
    iA(e, n);
  } catch (s) {
    throw t && Hu(e, s), s;
  } finally {
    i || (o.end?.(), r.inlineEffectRunner?.flush());
  }
}
function iA(e, t) {
  zl(e, t);
  let n = 0;
  for (; Wd(e); ) {
    if (n === fI)
      throw new v(103, ngDevMode && "Infinite change detection while trying to refresh views. There may be components which each cause the other to require a refresh, causing an infinite loop.");
    n++, zl(
      e,
      1
      /* ChangeDetectionMode.Targeted */
    );
  }
}
function sA(e, t = !0) {
  Zp(!0);
  try {
    Uu(e, t);
  } finally {
    Zp(!1);
  }
}
function aA(e, t, n, r) {
  ngDevMode && A(Ds(t), !1, "Should be run in update mode");
  const o = t[_];
  if ((o & 256) === 256)
    return;
  const i = ngDevMode && $r();
  !i && t[Et].inlineEffectRunner?.flush(), Jd(t);
  let s = null, a = null;
  !i && uA(e) && (a = tA(t), s = md(a));
  try {
    Xy(t), uD(e.bindingStartIndex), n !== null && Xv(e, t, n, 2, r);
    const u = (o & 3) === 3;
    if (!i)
      if (u) {
        const d = e.preOrderCheckHooks;
        d !== null && fa(t, d, null);
      } else {
        const d = e.preOrderHooks;
        d !== null && ha(t, d, 0, null), _c(
          t,
          0
          /* InitPhaseState.OnInitHooksToBeRun */
        );
      }
    if (cA(t), hI(
      t,
      0
      /* ChangeDetectionMode.Global */
    ), e.contentQueries !== null && sI(e, t), !i)
      if (u) {
        const d = e.contentCheckHooks;
        d !== null && fa(t, d);
      } else {
        const d = e.contentHooks;
        d !== null && ha(
          t,
          d,
          1
          /* InitPhaseState.AfterContentInitHooksToBeRun */
        ), _c(
          t,
          1
          /* InitPhaseState.AfterContentInitHooksToBeRun */
        );
      }
    TT(e, t);
    const c = e.components;
    c !== null && gI(
      t,
      c,
      0
      /* ChangeDetectionMode.Global */
    );
    const l = e.viewQuery;
    if (l !== null && Vl(2, l, r), !i)
      if (u) {
        const d = e.viewCheckHooks;
        d !== null && fa(t, d);
      } else {
        const d = e.viewHooks;
        d !== null && ha(
          t,
          d,
          2
          /* InitPhaseState.AfterViewInitHooksToBeRun */
        ), _c(
          t,
          2
          /* InitPhaseState.AfterViewInitHooksToBeRun */
        );
      }
    if (e.firstUpdatePass === !0 && (e.firstUpdatePass = !1), t[da]) {
      for (const d of t[da])
        d();
      t[da] = null;
    }
    i || (t[_] &= -73);
  } catch (u) {
    throw ji(t), u;
  } finally {
    a !== null && (yd(a, s), rA(a)), Xd();
  }
}
function uA(e) {
  return e.type !== 2;
}
function hI(e, t) {
  for (let n = zD(e); n !== null; n = GD(n))
    for (let r = ge; r < n.length; r++) {
      const o = n[r];
      pI(o, t);
    }
}
function cA(e) {
  for (let t = zD(e); t !== null; t = GD(t)) {
    if (!(t[_] & Oa.HasTransplantedViews))
      continue;
    const n = t[gr];
    ngDevMode && E(n, "Transplanted View flags set but missing MOVED_VIEWS");
    for (let r = 0; r < n.length; r++) {
      const o = n[r], i = o[Ce];
      ngDevMode && ot(i), JM(o);
    }
  }
}
function lA(e, t, n) {
  ngDevMode && A(Ds(e), !1, "Should be run in update mode");
  const r = mt(t, e);
  pI(r, n);
}
function pI(e, t) {
  Gd(e) && zl(e, t);
}
function zl(e, t) {
  const n = ngDevMode && $r(), r = e[C], o = e[_], i = e[pr];
  let s = !!(t === 0 && o & 16);
  if (s ||= !!(o & 64 && t === 0 && !n), s ||= !!(o & 1024), s ||= !!(i?.dirty && Dd(i)), i && (i.dirty = !1), e[_] &= -9217, s)
    aA(r, e, r.template, e[ie]);
  else if (o & 8192) {
    hI(
      e,
      1
      /* ChangeDetectionMode.Targeted */
    );
    const a = r.components;
    a !== null && gI(
      e,
      a,
      1
      /* ChangeDetectionMode.Targeted */
    );
  }
}
function gI(e, t, n) {
  for (let r = 0; r < t.length; r++)
    lA(e, t[r], n);
}
function Ts(e) {
  for (e[Et].changeDetectionScheduler?.notify(); e; ) {
    e[_] |= 64;
    const t = mr(e);
    if (Bd(e) && !t)
      return e;
    e = t;
  }
  return null;
}
class bo {
  get rootNodes() {
    const t = this._lView, n = t[C];
    return Wi(n, t, n.firstChild, []);
  }
  constructor(t, n, r = !0) {
    this._lView = t, this._cdRefInjectingView = n, this.notifyErrorHandler = r, this._appRef = null, this._attachedToViewContainer = !1;
  }
  get context() {
    return this._lView[ie];
  }
  /**
   * @deprecated Replacing the full context object is not supported. Modify the context
   *   directly, or consider using a `Proxy` if you need to replace the full object.
   * // TODO(devversion): Remove this.
   */
  set context(t) {
    ngDevMode && console.warn("Angular: Replacing the `context` object of an `EmbeddedViewRef` is deprecated."), this._lView[ie] = t;
  }
  get destroyed() {
    return (this._lView[_] & 256) === 256;
  }
  destroy() {
    if (this._appRef)
      this._appRef.detachView(this);
    else if (this._attachedToViewContainer) {
      const t = this._lView[Ce];
      if (ke(t)) {
        const n = t[Aa], r = n ? n.indexOf(this) : -1;
        r > -1 && (ngDevMode && A(r, t.indexOf(this._lView) - ge, "An attached view should be in the same position within its container as its ViewRef in the VIEW_REFS array."), Gi(t, r), _a(n, r));
      }
      this._attachedToViewContainer = !1;
    }
    xu(this._lView[C], this._lView);
  }
  onDestroy(t) {
    Cu(this._lView, t);
  }
  /**
   * Marks a view and all of its ancestors dirty.
   *
   * This can be used to ensure an {@link ChangeDetectionStrategy#OnPush} component is
   * checked when it needs to be re-rendered but the two normal triggers haven't marked it
   * dirty (i.e. inputs haven't changed and events haven't fired in the view).
   *
   * <!-- TODO: Add a link to a chapter on OnPush components -->
   *
   * @usageNotes
   * ### Example
   *
   * ```typescript
   * @Component({
   *   selector: 'app-root',
   *   template: `Number of ticks: {{numberOfTicks}}`
   *   changeDetection: ChangeDetectionStrategy.OnPush,
   * })
   * class AppComponent {
   *   numberOfTicks = 0;
   *
   *   constructor(private ref: ChangeDetectorRef) {
   *     setInterval(() => {
   *       this.numberOfTicks++;
   *       // the following is required, otherwise the view will not be updated
   *       this.ref.markForCheck();
   *     }, 1000);
   *   }
   * }
   * ```
   */
  markForCheck() {
    Ts(this._cdRefInjectingView || this._lView);
  }
  /**
   * Detaches the view from the change detection tree.
   *
   * Detached views will not be checked during change detection runs until they are
   * re-attached, even if they are dirty. `detach` can be used in combination with
   * {@link ChangeDetectorRef#detectChanges} to implement local change
   * detection checks.
   *
   * <!-- TODO: Add a link to a chapter on detach/reattach/local digest -->
   * <!-- TODO: Add a live demo once ref.detectChanges is merged into master -->
   *
   * @usageNotes
   * ### Example
   *
   * The following example defines a component with a large list of readonly data.
   * Imagine the data changes constantly, many times per second. For performance reasons,
   * we want to check and update the list every five seconds. We can do that by detaching
   * the component's change detector and doing a local check every five seconds.
   *
   * ```typescript
   * class DataProvider {
   *   // in a real application the returned data will be different every time
   *   get data() {
   *     return [1,2,3,4,5];
   *   }
   * }
   *
   * @Component({
   *   selector: 'giant-list',
   *   template: `
   *     <li *ngFor="let d of dataProvider.data">Data {{d}}</li>
   *   `,
   * })
   * class GiantList {
   *   constructor(private ref: ChangeDetectorRef, private dataProvider: DataProvider) {
   *     ref.detach();
   *     setInterval(() => {
   *       this.ref.detectChanges();
   *     }, 5000);
   *   }
   * }
   *
   * @Component({
   *   selector: 'app',
   *   providers: [DataProvider],
   *   template: `
   *     <giant-list><giant-list>
   *   `,
   * })
   * class App {
   * }
   * ```
   */
  detach() {
    this._lView[_] &= -129;
  }
  /**
   * Re-attaches a view to the change detection tree.
   *
   * This can be used to re-attach views that were previously detached from the tree
   * using {@link ChangeDetectorRef#detach}. Views are attached to the tree by default.
   *
   * <!-- TODO: Add a link to a chapter on detach/reattach/local digest -->
   *
   * @usageNotes
   * ### Example
   *
   * The following example creates a component displaying `live` data. The component will detach
   * its change detector from the main change detector tree when the component's live property
   * is set to false.
   *
   * ```typescript
   * class DataProvider {
   *   data = 1;
   *
   *   constructor() {
   *     setInterval(() => {
   *       this.data = this.data * 2;
   *     }, 500);
   *   }
   * }
   *
   * @Component({
   *   selector: 'live-data',
   *   inputs: ['live'],
   *   template: 'Data: {{dataProvider.data}}'
   * })
   * class LiveData {
   *   constructor(private ref: ChangeDetectorRef, private dataProvider: DataProvider) {}
   *
   *   set live(value) {
   *     if (value) {
   *       this.ref.reattach();
   *     } else {
   *       this.ref.detach();
   *     }
   *   }
   * }
   *
   * @Component({
   *   selector: 'app-root',
   *   providers: [DataProvider],
   *   template: `
   *     Live Update: <input type="checkbox" [(ngModel)]="live">
   *     <live-data [live]="live"><live-data>
   *   `,
   * })
   * class AppComponent {
   *   live = true;
   * }
   * ```
   */
  reattach() {
    Cl(this._lView), this._lView[_] |= 128;
  }
  /**
   * Checks the view and its children.
   *
   * This can also be used in combination with {@link ChangeDetectorRef#detach} to implement
   * local change detection checks.
   *
   * <!-- TODO: Add a link to a chapter on detach/reattach/local digest -->
   * <!-- TODO: Add a live demo once ref.detectChanges is merged into master -->
   *
   * @usageNotes
   * ### Example
   *
   * The following example defines a component with a large list of readonly data.
   * Imagine, the data changes constantly, many times per second. For performance reasons,
   * we want to check and update the list every five seconds.
   *
   * We can do that by detaching the component's change detector and doing a local change detection
   * check every five seconds.
   *
   * See {@link ChangeDetectorRef#detach} for more information.
   */
  detectChanges() {
    this._lView[_] |= 1024, Uu(this._lView, this.notifyErrorHandler);
  }
  /**
   * Checks the change detector and its children, and throws if any changes are detected.
   *
   * This is used in development mode to verify that running change detection doesn't
   * introduce other changes.
   */
  checkNoChanges() {
    ngDevMode && sA(this._lView, this.notifyErrorHandler);
  }
  attachToViewContainerRef() {
    if (this._appRef)
      throw new v(902, ngDevMode && "This view is already attached directly to the ApplicationRef!");
    this._attachedToViewContainer = !0;
  }
  detachFromAppRef() {
    this._appRef = null, Rv(this._lView[C], this._lView);
  }
  attachToAppRef(t) {
    if (this._attachedToViewContainer)
      throw new v(902, ngDevMode && "This view is already attached to a ViewContainer!");
    this._appRef = t, Cl(this._lView);
  }
}
class Qe {
  static {
    this.__NG_ELEMENT_ID__ = hA;
  }
}
const dA = Qe, fA = class extends dA {
  constructor(t, n, r) {
    super(), this._declarationLView = t, this._declarationTContainer = n, this.elementRef = r;
  }
  /**
   * Returns an `ssrId` associated with a TView, which was used to
   * create this instance of the `TemplateRef`.
   *
   * @internal
   */
  get ssrId() {
    return this._declarationTContainer.tView?.ssrId || null;
  }
  createEmbeddedView(t, n) {
    return this.createEmbeddedViewImpl(t, n);
  }
  /**
   * @internal
   */
  createEmbeddedViewImpl(t, n, r) {
    const o = _s(this._declarationLView, this._declarationTContainer, t, { embeddedViewInjector: n, dehydratedView: r });
    return new bo(o);
  }
};
function hA() {
  return zu(K(), m());
}
function zu(e, t) {
  return e.type & 4 ? (ngDevMode && E(e.tView, "TView must be allocated"), new fA(t, e, Uo(e, t))) : null;
}
const Gl = "<-- AT THIS LOCATION";
function pA(e) {
  switch (e) {
    case 4:
      return "view container";
    case 2:
      return "element";
    case 8:
      return "ng-container";
    case 32:
      return "icu";
    case 64:
      return "i18n";
    case 16:
      return "projection";
    case 1:
      return "text";
    default:
      return "<unknown>";
  }
}
function As(e, t, n, r, o, i = !1) {
  if (!e || e.nodeType !== t || e.nodeType === Node.ELEMENT_NODE && e.tagName.toLowerCase() !== n?.toLowerCase()) {
    let a = `During hydration Angular expected ${vg(t, n, null)} but `;
    const c = Fu(r)?.type?.name, l = jf(r, o, i), d = `Angular expected this DOM:

${l}

`;
    let f = "";
    const h = re(r[de]);
    if (!e)
      a += `the node was not found.

`, zi(h, l);
    else {
      const D = vg(e.nodeType, e.tagName ?? null, e.textContent ?? null);
      a += `found ${D}.

`;
      const I = Wu(e);
      f = `Actual DOM is:

${I}

`, zi(h, l, I);
    }
    const p = Os(c), g = a + d + f + yI() + p;
    throw new v(-500, g);
  }
}
function mI(e) {
  if (Gu(e), !e.nextSibling) {
    const t = `During hydration Angular expected more sibling nodes to be present.

`, n = `Actual DOM is:

${Wu(e)}

`, r = Os(), o = t + n + r;
    throw zi(e, "", n), new v(-501, o);
  }
}
function Gu(e, t = null, n = null) {
  if (!e) {
    const r = `During hydration, Angular expected an element to be present at this location.

`;
    let o = "", i = "";
    throw t !== null && n !== null && (o = jf(t, n, !1), i = Os(), zi(re(t[de]), o, "")), new v(-502, `${r}${o}

${i}`);
  }
}
function gA(e, t) {
  const n = `During serialization, Angular was unable to find an element in the DOM:

`, r = `${jf(e, t, !1)}

`, o = Os();
  throw new v(-502, n + r + o);
}
function Dg(e, t) {
  const n = `During hydration Angular was unable to locate a node using the "${t}" path, starting from the ${Ii(e)} node.

`, r = Os();
  throw zi(e), new v(-502, n + r);
}
function mA(e) {
  const t = "During serialization, Angular detected DOM nodes that were created outside of Angular context and provided as projectable nodes (likely via `ViewContainerRef.createComponent` or `createComponent` APIs). Hydration is not supported for such cases, consider refactoring the code to avoid this pattern or using `ngSkipHydration` on the host element of the component.\n\n", n = `${Wu(e)}

`, r = t + n + yI();
  return new v(-503, r);
}
function yA(e) {
  const t = "The `ngSkipHydration` flag is applied on a node that doesn't act as a component host. Hydration can be skipped only on per-component basis.\n\n", n = `${Wu(e)}

`, o = t + n + "Please move the `ngSkipHydration` attribute to the component host element.\n\n";
  return new v(-504, o);
}
function DA(e) {
  const t = [];
  if (e.attrs)
    for (let n = 0; n < e.attrs.length; ) {
      const r = e.attrs[n++];
      if (typeof r == "number")
        break;
      const o = e.attrs[n++];
      t.push(`${r}="${qi(o)}"`);
    }
  return t.join(" ");
}
const vA = /* @__PURE__ */ new Set(["ngh", "ng-version", "ng-server-context"]);
function IA(e) {
  const t = [];
  for (let n = 0; n < e.attributes.length; n++) {
    const r = e.attributes[n];
    vA.has(r.name) || t.push(`${r.name}="${qi(r.value)}"`);
  }
  return t.join(" ");
}
function Fc(e, t = "…") {
  switch (e.type) {
    case 1:
      return `#text${e.value ? `(${e.value})` : ""}`;
    case 2:
      const r = DA(e), o = e.value.toLowerCase();
      return `<${o}${r ? " " + r : ""}>${t}</${o}>`;
    case 8:
      return "<!-- ng-container -->";
    case 4:
      return "<!-- container -->";
    default:
      return `#node(${pA(e.type)})`;
  }
}
function Ii(e, t = "…") {
  const n = e;
  switch (n.nodeType) {
    case Node.ELEMENT_NODE:
      const r = n.tagName.toLowerCase(), o = IA(n);
      return `<${r}${o ? " " + o : ""}>${t}</${r}>`;
    case Node.TEXT_NODE:
      const i = n.textContent ? qi(n.textContent) : "";
      return `#text${i ? `(${i})` : ""}`;
    case Node.COMMENT_NODE:
      return `<!-- ${qi(n.textContent ?? "")} -->`;
    default:
      return `#node(${n.nodeType})`;
  }
}
function jf(e, t, n) {
  const r = "  ";
  let o = "";
  t.prev ? (o += r + `…
`, o += r + Fc(t.prev) + `
`) : t.type && t.type & 12 && (o += r + `…
`), n ? (o += r + Fc(t) + `
`, o += r + `<!-- container -->  ${Gl}
`) : o += r + Fc(t) + `  ${Gl}
`, o += r + `…
`;
  const i = t.type ? Sf(e[C], t, e) : null;
  return i && (o = Ii(i, `
` + o)), o;
}
function Wu(e) {
  const t = "  ";
  let n = "";
  const r = e;
  return r.previousSibling && (n += t + `…
`, n += t + Ii(r.previousSibling) + `
`), n += t + Ii(r) + `  ${Gl}
`, e.nextSibling && (n += t + `…
`), e.parentNode && (n = Ii(r.parentNode, `
` + n)), n;
}
function vg(e, t, n) {
  switch (e) {
    case Node.ELEMENT_NODE:
      return `<${t.toLowerCase()}>`;
    case Node.TEXT_NODE:
      return `a text node${n ? ` (with the "${qi(n)}" content)` : ""}`;
    case Node.COMMENT_NODE:
      return "a comment node";
    default:
      return `#node(nodeType=${e})`;
  }
}
function Os(e) {
  return `To fix this problem:
  * check ${e ? `the "${e}"` : "corresponding"} component for hydration-related issues
  * check to see if your template has valid HTML structure
  * or skip hydration by adding the \`ngSkipHydration\` attribute to its host node in a template

`;
}
function yI() {
  return `Note: attributes are only displayed to better represent the DOM but have no effect on hydration mismatches.

`;
}
function CA(e) {
  return e.replace(/\s+/gm, "");
}
function qi(e, t = 50) {
  return e ? (e = CA(e), e.length > t ? `${e.substring(0, t - 1)}…` : e) : "";
}
function DI(e) {
  const t = e[Li] ?? [], r = e[Ce][F];
  for (const o of t)
    EA(o, r), ngDevMode && ngDevMode.dehydratedViewsRemoved++;
  e[Li] = q;
}
function EA(e, t) {
  let n = 0, r = e.firstChild;
  if (r) {
    const o = e.data[Do];
    for (; n < o; ) {
      ngDevMode && mI(r);
      const i = r.nextSibling;
      ws(t, r, !1), r = i, n++;
    }
  }
}
function vI(e) {
  DI(e);
  for (let t = ge; t < e.length; t++)
    ja(e[t]);
}
function bA(e) {
  const t = e[gt]?.i18nNodes;
  if (t) {
    const n = e[F];
    for (const r of t.values())
      ws(n, r, !1);
    e[gt].i18nNodes = void 0;
  }
}
function ja(e) {
  bA(e);
  const t = e[C];
  for (let n = T; n < t.bindingStartIndex; n++)
    if (ke(e[n])) {
      const r = e[n];
      vI(r);
    } else Le(e[n]) && ja(e[n]);
}
function wA(e) {
  const t = e._views;
  for (const n of t) {
    const r = ov(n);
    if (r !== null && r[de] !== null) {
      if (Le(r))
        ja(r);
      else {
        const o = r[de];
        ja(o), vI(r);
      }
      ngDevMode && ngDevMode.dehydratedViewsCleanupRuns++;
    }
  }
}
const MA = new RegExp(`^(\\d+)*(${df}|${lf})*(.*)`);
function _A(e, t) {
  const n = [e];
  for (const r of t) {
    const o = n.length - 1;
    if (o > 0 && n[o - 1] === r) {
      const i = n[o] || 1;
      n[o] = i + 1;
    } else
      n.push(r, "");
  }
  return n.join("");
}
function SA(e) {
  const t = e.match(MA), [n, r, o, i] = t, s = r ? parseInt(r, 10) : o, a = [];
  for (const [u, c, l] of i.matchAll(/(f|n)(\d*)/g)) {
    const d = parseInt(l, 10) || 1;
    a.push(c, d);
  }
  return [s, ...a];
}
function TA(e) {
  return !e.prev && e.parent?.type === 8;
}
function Nc(e) {
  return e.index - T;
}
function Qi(e, t) {
  return !(e.type & 16) && !!t[e.index] && !re(t[e.index])?.isConnected;
}
function AA(e, t) {
  const n = e.i18nNodes;
  if (n) {
    const r = n.get(t);
    return r && n.delete(t), r;
  }
  return null;
}
function qu(e, t, n, r) {
  const o = Nc(r);
  let i = AA(e, o);
  if (!i) {
    const s = e.data[Rl];
    if (s?.[o])
      i = FA(s[o], n);
    else if (t.firstChild === r)
      i = e.firstChild;
    else {
      const a = r.prev === null, u = r.prev ?? r.parent;
      if (ngDevMode && E(u, "Unexpected state: current TNode does not have a connection to the previous node or a parent node."), TA(r)) {
        const c = Nc(r.parent);
        i = xl(e, c);
      } else {
        let c = Be(u, n);
        if (a)
          i = c.firstChild;
        else {
          const l = Nc(u), d = xl(e, l);
          if (u.type === 2 && d) {
            const h = gf(e, l) + 1;
            i = Qu(h, d);
          } else
            i = c.nextSibling;
        }
      }
    }
  }
  return i;
}
function Qu(e, t) {
  let n = t;
  for (let r = 0; r < e; r++)
    ngDevMode && mI(n), n = n.nextSibling;
  return n;
}
function Ig(e) {
  const t = [];
  for (let n = 0; n < e.length; n += 2) {
    const r = e[n], o = e[n + 1];
    for (let i = 0; i < o; i++)
      t.push(r === vr.FirstChild ? "firstChild" : "nextSibling");
  }
  return t.join(".");
}
function OA(e, t) {
  let n = e;
  for (let r = 0; r < t.length; r += 2) {
    const o = t[r], i = t[r + 1];
    for (let s = 0; s < i; s++) {
      if (ngDevMode && !n)
        throw Dg(e, Ig(t));
      switch (o) {
        case vr.FirstChild:
          n = n.firstChild;
          break;
        case vr.NextSibling:
          n = n.nextSibling;
          break;
      }
    }
  }
  if (ngDevMode && !n)
    throw Dg(e, Ig(t));
  return n;
}
function FA(e, t) {
  const [n, ...r] = SA(e);
  let o;
  if (n === lf)
    o = t[De][de];
  else if (n === df)
    o = bf(t[De][de]);
  else {
    const i = Number(n);
    o = re(t[i + T]);
  }
  return OA(o, r);
}
function Wl(e, t) {
  if (e === t)
    return [];
  if (e.parentElement == null || t.parentElement == null)
    return null;
  if (e.parentElement === t.parentElement)
    return NA(e, t);
  {
    const n = t.parentElement, r = Wl(e, n), o = Wl(n.firstChild, t);
    return !r || !o ? null : [
      // First navigate to `finish`'s parent
      ...r,
      // Then to its first child.
      vr.FirstChild,
      // And finally from that node to `finish` (maybe a no-op if we're already there).
      ...o
    ];
  }
}
function NA(e, t) {
  const n = [];
  let r = null;
  for (r = e; r != null && r !== t; r = r.nextSibling)
    n.push(vr.NextSibling);
  return r == null ? null : n;
}
function Cg(e, t, n) {
  const r = Wl(e, t);
  return r === null ? null : _A(n, r);
}
function kA(e, t) {
  let n = e.parent, r, o, i;
  for (; n !== null && Qi(n, t); )
    n = n.parent;
  n === null || !(n.type & 3) ? (r = i = lf, o = t[De][de]) : (r = n.index, o = re(t[r]), i = L(r - T));
  let s = re(t[e.index]);
  if (e.type & 12) {
    const u = vi(t, e);
    u && (s = u);
  }
  let a = Cg(o, s, i);
  if (a === null && o !== s) {
    const u = o.ownerDocument.body;
    if (a = Cg(u, s, df), a === null)
      throw gA(t, e);
  }
  return a;
}
function RA(e, t) {
  const n = [];
  for (const r of t)
    for (let o = 0; o < (r[La] ?? 1); o++) {
      const i = {
        data: r,
        firstChild: null
      };
      r[Do] > 0 && (i.firstChild = e, e = Qu(r[Do], e)), n.push(i);
    }
  return [e, n];
}
let II = () => null;
function xA(e, t) {
  const n = e[Li];
  return !t || n === null || n.length === 0 ? null : n[0].data[kl] === t ? n.shift() : (DI(e), null);
}
function PA() {
  II = xA;
}
function wo(e, t) {
  return II(e, t);
}
class Zu {
}
class CI {
}
class $a {
}
function LA(e) {
  const t = Error(`No component factory found for ${Q(e)}.`);
  return t[jA] = e, t;
}
const jA = "ngComponent";
class $A {
  resolveComponentFactory(t) {
    throw LA(t);
  }
}
class Fs {
  static {
    this.NULL = /* @__PURE__ */ new $A();
  }
}
class EI {
}
class Qo {
  constructor() {
    this.destroyNode = null;
  }
  static {
    this.__NG_ELEMENT_ID__ = () => BA();
  }
}
function BA() {
  const e = m(), t = K(), n = mt(t.index, e);
  return (Le(n) ? n : e)[F];
}
class Yu {
  static {
    this.ɵprov = te({
      token: Yu,
      providedIn: "root",
      factory: () => null
    });
  }
}
const ma = {};
function $f(e, t) {
  if (zm() !== null)
    throw new v(-602, ngDevMode && `${e.name}() cannot be called from within a reactive context.${t ? ` ${t}` : ""}`);
}
const Eg = /* @__PURE__ */ new Set();
function _t(e) {
  Eg.has(e) || (Eg.add(e), performance?.mark?.("mark_feature_usage", { detail: { feature: e } }));
}
function bg(...e) {
}
function HA() {
  const e = typeof he.requestAnimationFrame == "function";
  let t = he[e ? "requestAnimationFrame" : "setTimeout"], n = he[e ? "cancelAnimationFrame" : "clearTimeout"];
  if (typeof Zone < "u" && t && n) {
    const r = t[Zone.__symbol__("OriginalDelegate")];
    r && (t = r);
    const o = n[Zone.__symbol__("OriginalDelegate")];
    o && (n = o);
  }
  return { nativeRequestAnimationFrame: t, nativeCancelAnimationFrame: n };
}
class VA {
  constructor(t, n = console) {
    this.name = "asyncStackTagging for " + t, this.createTask = n?.createTask ?? (() => null);
  }
  onScheduleTask(t, n, r, o) {
    return o.consoleTask = this.createTask(`Zone - ${o.source || o.type}`), t.scheduleTask(r, o);
  }
  onInvokeTask(t, n, r, o, i, s) {
    let a;
    return o.consoleTask ? a = o.consoleTask.run(() => t.invokeTask(r, o, i, s)) : a = t.invokeTask(r, o, i, s), a;
  }
}
class le {
  constructor({ enableLongStackTrace: t = !1, shouldCoalesceEventChangeDetection: n = !1, shouldCoalesceRunChangeDetection: r = !1 }) {
    if (this.hasPendingMacrotasks = !1, this.hasPendingMicrotasks = !1, this.isStable = !0, this.onUnstable = new Ot(!1), this.onMicrotaskEmpty = new Ot(!1), this.onStable = new Ot(!1), this.onError = new Ot(!1), typeof Zone > "u")
      throw new v(908, ngDevMode && "In this configuration Angular requires Zone.js");
    Zone.assertZonePatched();
    const o = this;
    o._nesting = 0, o._outer = o._inner = Zone.current, ngDevMode && (o._inner = o._inner.fork(new VA("Angular"))), Zone.TaskTrackingZoneSpec && (o._inner = o._inner.fork(new Zone.TaskTrackingZoneSpec())), t && Zone.longStackTraceZoneSpec && (o._inner = o._inner.fork(Zone.longStackTraceZoneSpec)), o.shouldCoalesceEventChangeDetection = !r && n, o.shouldCoalesceRunChangeDetection = r, o.lastRequestAnimationFrameId = -1, o.nativeRequestAnimationFrame = HA().nativeRequestAnimationFrame, GA(o);
  }
  /**
    This method checks whether the method call happens within an Angular Zone instance.
  */
  static isInAngularZone() {
    return typeof Zone < "u" && Zone.current.get("isAngularZone") === !0;
  }
  /**
    Assures that the method is called within the Angular Zone, otherwise throws an error.
  */
  static assertInAngularZone() {
    if (!le.isInAngularZone())
      throw new v(909, ngDevMode && "Expected to be in Angular Zone, but it is not!");
  }
  /**
    Assures that the method is called outside of the Angular Zone, otherwise throws an error.
  */
  static assertNotInAngularZone() {
    if (le.isInAngularZone())
      throw new v(909, ngDevMode && "Expected to not be in Angular Zone, but it is!");
  }
  /**
   * Executes the `fn` function synchronously within the Angular zone and returns value returned by
   * the function.
   *
   * Running functions via `run` allows you to reenter Angular zone from a task that was executed
   * outside of the Angular zone (typically started via {@link #runOutsideAngular}).
   *
   * Any future tasks or microtasks scheduled from within this function will continue executing from
   * within the Angular zone.
   *
   * If a synchronous error happens it will be rethrown and not reported via `onError`.
   */
  run(t, n, r) {
    return this._inner.run(t, n, r);
  }
  /**
   * Executes the `fn` function synchronously within the Angular zone as a task and returns value
   * returned by the function.
   *
   * Running functions via `run` allows you to reenter Angular zone from a task that was executed
   * outside of the Angular zone (typically started via {@link #runOutsideAngular}).
   *
   * Any future tasks or microtasks scheduled from within this function will continue executing from
   * within the Angular zone.
   *
   * If a synchronous error happens it will be rethrown and not reported via `onError`.
   */
  runTask(t, n, r, o) {
    const i = this._inner, s = i.scheduleEventTask("NgZoneEvent: " + o, t, UA, bg, bg);
    try {
      return i.runTask(s, n, r);
    } finally {
      i.cancelTask(s);
    }
  }
  /**
   * Same as `run`, except that synchronous errors are caught and forwarded via `onError` and not
   * rethrown.
   */
  runGuarded(t, n, r) {
    return this._inner.runGuarded(t, n, r);
  }
  /**
   * Executes the `fn` function synchronously in Angular's parent zone and returns value returned by
   * the function.
   *
   * Running functions via {@link #runOutsideAngular} allows you to escape Angular's zone and do
   * work that
   * doesn't trigger Angular change-detection or is subject to Angular's error handling.
   *
   * Any future tasks or microtasks scheduled from within this function will continue executing from
   * outside of the Angular zone.
   *
   * Use {@link #run} to reenter the Angular zone and do work that updates the application model.
   */
  runOutsideAngular(t) {
    return this._outer.run(t);
  }
}
const UA = {};
function Bf(e) {
  if (e._nesting == 0 && !e.hasPendingMicrotasks && !e.isStable)
    try {
      e._nesting++, e.onMicrotaskEmpty.emit(null);
    } finally {
      if (e._nesting--, !e.hasPendingMicrotasks)
        try {
          e.runOutsideAngular(() => e.onStable.emit(null));
        } finally {
          e.isStable = !0;
        }
    }
}
function zA(e) {
  e.isCheckStableRunning || e.lastRequestAnimationFrameId !== -1 || (e.lastRequestAnimationFrameId = e.nativeRequestAnimationFrame.call(he, () => {
    e.fakeTopEventTask || (e.fakeTopEventTask = Zone.root.scheduleEventTask("fakeTopEventTask", () => {
      e.lastRequestAnimationFrameId = -1, ql(e), e.isCheckStableRunning = !0, Bf(e), e.isCheckStableRunning = !1;
    }, void 0, () => {
    }, () => {
    })), e.fakeTopEventTask.invoke();
  }), ql(e));
}
function GA(e) {
  const t = () => {
    zA(e);
  };
  e._inner = e._inner.fork({
    name: "angular",
    properties: { isAngularZone: !0 },
    onInvokeTask: (n, r, o, i, s, a) => {
      if (WA(a))
        return n.invokeTask(o, i, s, a);
      try {
        return wg(e), n.invokeTask(o, i, s, a);
      } finally {
        (e.shouldCoalesceEventChangeDetection && i.type === "eventTask" || e.shouldCoalesceRunChangeDetection) && t(), Mg(e);
      }
    },
    onInvoke: (n, r, o, i, s, a, u) => {
      try {
        return wg(e), n.invoke(o, i, s, a, u);
      } finally {
        e.shouldCoalesceRunChangeDetection && t(), Mg(e);
      }
    },
    onHasTask: (n, r, o, i) => {
      n.hasTask(o, i), r === o && (i.change == "microTask" ? (e._hasPendingMicrotasks = i.microTask, ql(e), Bf(e)) : i.change == "macroTask" && (e.hasPendingMacrotasks = i.macroTask));
    },
    onHandleError: (n, r, o, i) => (n.handleError(o, i), e.runOutsideAngular(() => e.onError.emit(i)), !1)
  });
}
function ql(e) {
  e._hasPendingMicrotasks || (e.shouldCoalesceEventChangeDetection || e.shouldCoalesceRunChangeDetection) && e.lastRequestAnimationFrameId !== -1 ? e.hasPendingMicrotasks = !0 : e.hasPendingMicrotasks = !1;
}
function wg(e) {
  e._nesting++, e.isStable && (e.isStable = !1, e.onUnstable.emit(null));
}
function Mg(e) {
  e._nesting--, Bf(e);
}
class Hf {
  constructor() {
    this.hasPendingMicrotasks = !1, this.hasPendingMacrotasks = !1, this.isStable = !0, this.onUnstable = new Ot(), this.onMicrotaskEmpty = new Ot(), this.onStable = new Ot(), this.onError = new Ot();
  }
  run(t, n, r) {
    return t.apply(n, r);
  }
  runGuarded(t, n, r) {
    return t.apply(n, r);
  }
  runOutsideAngular(t) {
    return t();
  }
  runTask(t, n, r, o) {
    return t.apply(n, r);
  }
}
function WA(e) {
  return !Array.isArray(e) || e.length !== 1 ? !1 : e[0].data?.__ignore_ng_zone__ === !0;
}
function qA(e = "zone.js", t) {
  return e === "noop" ? new Hf() : e === "zone.js" ? new le(t) : e;
}
var dn;
(function(e) {
  e[e.EarlyRead = 0] = "EarlyRead", e[e.Write = 1] = "Write", e[e.MixedReadWrite = 2] = "MixedReadWrite", e[e.Read = 3] = "Read";
})(dn || (dn = {}));
const bI = {
  destroy() {
  }
};
function Ba(e, t) {
  const n = t?.injector ?? w(Re);
  if (!t?.runOnServer && !Ft(n))
    return;
  n.get(Dn).internalCallbacks.push(e);
}
function Ql(e, t) {
  ngDevMode && $f(Ql, "Call `afterRender` outside of a reactive context. For example, schedule the render callback inside the component constructor`."), !t && Ze(Ql);
  const n = t?.injector ?? w(Re);
  if (!Ft(n))
    return bI;
  _t("NgAfterRender");
  const r = n.get(Dn), o = r.handler ??= new _I(), i = t?.phase ?? dn.MixedReadWrite, s = () => {
    o.unregister(u), a();
  }, a = n.get(Br).onDestroy(s), u = Ld(n, () => new MI(i, e));
  return o.register(u), { destroy: s };
}
function wI(e, t) {
  !t && Ze(wI);
  const n = t?.injector ?? w(Re);
  if (!Ft(n))
    return bI;
  _t("NgAfterNextRender");
  const r = n.get(Dn), o = r.handler ??= new _I(), i = t?.phase ?? dn.MixedReadWrite, s = () => {
    o.unregister(u), a();
  }, a = n.get(Br).onDestroy(s), u = Ld(n, () => new MI(i, () => {
    s(), e();
  }));
  return o.register(u), { destroy: s };
}
class MI {
  constructor(t, n) {
    this.phase = t, this.callbackFn = n, this.zone = w(le), this.errorHandler = w(Mn, { optional: !0 }), w(Zu, { optional: !0 })?.notify(
      1
      /* NotificationType.AfterRenderHooks */
    );
  }
  invoke() {
    try {
      this.zone.runOutsideAngular(this.callbackFn);
    } catch (t) {
      this.errorHandler?.handleError(t);
    }
  }
}
class _I {
  constructor() {
    this.executingCallbacks = !1, this.buckets = {
      // Note: the order of these keys controls the order the phases are run.
      [dn.EarlyRead]: /* @__PURE__ */ new Set(),
      [dn.Write]: /* @__PURE__ */ new Set(),
      [dn.MixedReadWrite]: /* @__PURE__ */ new Set(),
      [dn.Read]: /* @__PURE__ */ new Set()
    }, this.deferredCallbacks = /* @__PURE__ */ new Set();
  }
  register(t) {
    (this.executingCallbacks ? this.deferredCallbacks : this.buckets[t.phase]).add(t);
  }
  unregister(t) {
    this.buckets[t.phase].delete(t), this.deferredCallbacks.delete(t);
  }
  execute() {
    this.executingCallbacks = !0;
    for (const t of Object.values(this.buckets))
      for (const n of t)
        n.invoke();
    this.executingCallbacks = !1;
    for (const t of this.deferredCallbacks)
      this.buckets[t.phase].add(t);
    this.deferredCallbacks.clear();
  }
  destroy() {
    for (const t of Object.values(this.buckets))
      t.clear();
    this.deferredCallbacks.clear();
  }
}
class Dn {
  constructor() {
    this.handler = null, this.internalCallbacks = [];
  }
  /**
   * Executes internal and user-provided callbacks.
   */
  execute() {
    this.executeInternalCallbacks(), this.handler?.execute();
  }
  executeInternalCallbacks() {
    const t = [...this.internalCallbacks];
    this.internalCallbacks.length = 0;
    for (const n of t)
      n();
  }
  ngOnDestroy() {
    this.handler?.destroy(), this.handler = null, this.internalCallbacks.length = 0;
  }
  static {
    this.ɵprov = te({
      token: Dn,
      providedIn: "root",
      factory: () => new Dn()
    });
  }
}
function Vf(e) {
  return e.ngModule !== void 0;
}
function ir(e) {
  return !!pt(e);
}
function Ws(e) {
  return !!dt(e);
}
function _g(e) {
  return !!Fe(e);
}
function Ci(e) {
  return !!V(e);
}
function QA(e) {
  return V(e) ? "component" : Fe(e) ? "directive" : dt(e) ? "pipe" : "type";
}
function Zl(e, t) {
  if (fu(e) && (e = R(e), !e))
    throw new Error(`Expected forwardRef function, imported from "${U(t)}", to return a standalone entity or NgModule but got "${U(e) || e}".`);
  if (pt(e) == null) {
    const n = V(e) || Fe(e) || dt(e);
    if (n != null) {
      if (!n.standalone)
        throw new Error(`The "${U(e)}" ${QA(e)}, imported from "${U(t)}", is not standalone. Did you forget to add the standalone: true flag?`);
    } else
      throw Vf(e) ? new Error(`A module with providers was imported from "${U(t)}". Modules with providers are not supported in standalone components imports.`) : new Error(`The "${U(e)}" type, imported from "${U(t)}", must be a standalone component / directive / pipe or an NgModule. Did you forget to add the required @Component / @Directive / @Pipe or @NgModule annotation?`);
  }
}
const ZA = !0;
class YA {
  constructor() {
    this.ownerNgModule = /* @__PURE__ */ new Map(), this.ngModulesWithSomeUnresolvedDecls = /* @__PURE__ */ new Set(), this.ngModulesScopeCache = /* @__PURE__ */ new Map(), this.standaloneComponentsScopeCache = /* @__PURE__ */ new Map();
  }
  /**
   * Attempts to resolve ng module's forward ref declarations as much as possible and add them to
   * the `ownerNgModule` map. This method normally should be called after the initial parsing when
   * all the forward refs are resolved (e.g., when trying to render a component)
   */
  resolveNgModulesDecls() {
    if (this.ngModulesWithSomeUnresolvedDecls.size !== 0) {
      for (const t of this.ngModulesWithSomeUnresolvedDecls) {
        const n = pt(t);
        if (n?.declarations)
          for (const r of Wt(n.declarations))
            Ci(r) && this.ownerNgModule.set(r, t);
      }
      this.ngModulesWithSomeUnresolvedDecls.clear();
    }
  }
  /** @override */
  getComponentDependencies(t, n) {
    this.resolveNgModulesDecls();
    const r = V(t);
    if (r === null)
      throw new Error(`Attempting to get component dependencies for a type that is not a component: ${t}`);
    if (r.standalone) {
      const o = this.getStandaloneComponentScope(t, n);
      return o.compilation.isPoisoned ? { dependencies: [] } : {
        dependencies: [
          ...o.compilation.directives,
          ...o.compilation.pipes,
          ...o.compilation.ngModules
        ]
      };
    } else {
      if (!this.ownerNgModule.has(t))
        return { dependencies: [] };
      const o = this.getNgModuleScope(this.ownerNgModule.get(t));
      return o.compilation.isPoisoned ? { dependencies: [] } : {
        dependencies: [
          ...o.compilation.directives,
          ...o.compilation.pipes
        ]
      };
    }
  }
  /**
   * @override
   * This implementation does not make use of param scopeInfo since it assumes the scope info is
   * already added to the type itself through methods like {@link ɵɵsetNgModuleScope}
   */
  registerNgModule(t, n) {
    if (!ir(t))
      throw new Error(`Attempting to register a Type which is not NgModule as NgModule: ${t}`);
    this.ngModulesWithSomeUnresolvedDecls.add(t);
  }
  /** @override */
  clearScopeCacheFor(t) {
    this.ngModulesScopeCache.delete(t), this.standaloneComponentsScopeCache.delete(t);
  }
  /** @override */
  getNgModuleScope(t) {
    if (this.ngModulesScopeCache.has(t))
      return this.ngModulesScopeCache.get(t);
    const n = this.computeNgModuleScope(t);
    return this.ngModulesScopeCache.set(t, n), n;
  }
  /** Compute NgModule scope afresh. */
  computeNgModuleScope(t) {
    const n = pt(t, !0), r = {
      exported: { directives: /* @__PURE__ */ new Set(), pipes: /* @__PURE__ */ new Set() },
      compilation: { directives: /* @__PURE__ */ new Set(), pipes: /* @__PURE__ */ new Set() }
    };
    for (const o of Wt(n.imports))
      if (ir(o)) {
        const i = this.getNgModuleScope(o);
        Tn(i.exported.directives, r.compilation.directives), Tn(i.exported.pipes, r.compilation.pipes);
      } else if (On(o))
        if (_g(o) || Ci(o))
          r.compilation.directives.add(o);
        else if (Ws(o))
          r.compilation.pipes.add(o);
        else
          throw new v(1e3, "The standalone imported type is neither a component nor a directive nor a pipe");
      else {
        r.compilation.isPoisoned = !0;
        break;
      }
    if (!r.compilation.isPoisoned)
      for (const o of Wt(n.declarations)) {
        if (ir(o) || On(o)) {
          r.compilation.isPoisoned = !0;
          break;
        }
        Ws(o) ? r.compilation.pipes.add(o) : r.compilation.directives.add(o);
      }
    for (const o of Wt(n.exports))
      if (ir(o)) {
        const i = this.getNgModuleScope(o);
        Tn(i.exported.directives, r.exported.directives), Tn(i.exported.pipes, r.exported.pipes), Tn(i.exported.directives, r.compilation.directives), Tn(i.exported.pipes, r.compilation.pipes);
      } else Ws(o) ? r.exported.pipes.add(o) : r.exported.directives.add(o);
    return r;
  }
  /** @override */
  getStandaloneComponentScope(t, n) {
    if (this.standaloneComponentsScopeCache.has(t))
      return this.standaloneComponentsScopeCache.get(t);
    const r = this.computeStandaloneComponentScope(t, n);
    return this.standaloneComponentsScopeCache.set(t, r), r;
  }
  computeStandaloneComponentScope(t, n) {
    const r = {
      compilation: {
        // Standalone components are always able to self-reference.
        directives: /* @__PURE__ */ new Set([t]),
        pipes: /* @__PURE__ */ new Set(),
        ngModules: /* @__PURE__ */ new Set()
      }
    };
    for (const o of tt(n ?? [])) {
      const i = R(o);
      try {
        Zl(i, t);
      } catch {
        return r.compilation.isPoisoned = !0, r;
      }
      if (ir(i)) {
        r.compilation.ngModules.add(i);
        const s = this.getNgModuleScope(i);
        if (s.exported.isPoisoned)
          return r.compilation.isPoisoned = !0, r;
        Tn(s.exported.directives, r.compilation.directives), Tn(s.exported.pipes, r.compilation.pipes);
      } else if (Ws(i))
        r.compilation.pipes.add(i);
      else if (_g(i) || Ci(i))
        r.compilation.directives.add(i);
      else
        return r.compilation.isPoisoned = !0, r;
    }
    return r;
  }
  /** @override */
  isOrphanComponent(t) {
    const n = V(t);
    return !n || n.standalone ? !1 : (this.resolveNgModulesDecls(), !this.ownerNgModule.has(t));
  }
}
function Tn(e, t) {
  for (const n of e)
    t.add(n);
}
const Cr = new YA();
function Ha(e, t, n) {
  ngDevMode && it(x(), "Expecting to be called in first template pass only");
  let r = n ? e.styles : null, o = n ? e.classes : null, i = 0;
  if (t !== null)
    for (let s = 0; s < t.length; s++) {
      const a = t[s];
      if (typeof a == "number")
        i = a;
      else if (i == 1)
        o = cl(o, a);
      else if (i == 2) {
        const u = a, c = t[++s];
        r = cl(r, u + ": " + c + ";");
      }
    }
  n ? e.styles = r : e.stylesWithoutHost = r, n ? e.classes = o : e.classesWithoutHost = o;
}
class SI extends Fs {
  /**
   * @param ngModule The NgModuleRef to which all resolved factories are bound.
   */
  constructor(t) {
    super(), this.ngModule = t;
  }
  resolveComponentFactory(t) {
    ngDevMode && HM(t);
    const n = V(t);
    return new Zo(n, this.ngModule);
  }
}
function Sg(e) {
  const t = [];
  for (const n in e) {
    if (!e.hasOwnProperty(n))
      continue;
    const r = e[n];
    r !== void 0 && t.push({
      propName: Array.isArray(r) ? r[0] : r,
      templateName: n
    });
  }
  return t;
}
function KA(e) {
  const t = e.toLowerCase();
  return t === "svg" ? Zy : t === "math" ? Yy : null;
}
class Ku {
  constructor(t, n) {
    this.injector = t, this.parentInjector = n;
  }
  get(t, n, r) {
    r = cs(r);
    const o = this.injector.get(t, ma, r);
    return o !== ma || n === ma ? o : this.parentInjector.get(t, n, r);
  }
}
class Zo extends $a {
  get inputs() {
    const t = this.componentDef, n = t.inputTransforms, r = Sg(t.inputs);
    if (n !== null)
      for (const o of r)
        n.hasOwnProperty(o.propName) && (o.transform = n[o.propName]);
    return r;
  }
  get outputs() {
    return Sg(this.componentDef.outputs);
  }
  /**
   * @param componentDef The component definition.
   * @param ngModule The NgModuleRef to which the factory is bound.
   */
  constructor(t, n) {
    super(), this.componentDef = t, this.ngModule = n, this.componentType = t.type, this.selector = Ey(t.selectors), this.ngContentSelectors = t.ngContentSelectors ? t.ngContentSelectors : [], this.isBoundToModule = !!n;
  }
  create(t, n, r, o) {
    const i = $(null);
    try {
      if (ngDevMode && (typeof ngJitMode > "u" || ngJitMode) && this.componentDef.debugInfo?.forbidOrphanRendering && Cr.isOrphanComponent(this.componentType))
        throw new v(1001, `Orphan component found! Trying to render the component ${Xw(this.componentType)} without first loading the NgModule that declares it. It is recommended to make this component standalone in order to avoid this error. If this is not possible now, import the component's NgModule in the appropriate NgModule, or the standalone component in which you are trying to render this component. If this is a lazy import, load the NgModule lazily as well and use its module injector.`);
      o = o || this.ngModule;
      let s = o instanceof Pt ? o : o?.injector;
      s && this.componentDef.getStandaloneInjector !== null && (s = this.componentDef.getStandaloneInjector(s) || s);
      const a = s ? new Ku(t, s) : t, u = a.get(EI, null);
      if (u === null)
        throw new v(407, ngDevMode && "Angular was not able to inject a renderer (RendererFactory2). Likely this is due to a broken DI hierarchy. Make sure that any injector used to create this component has a correct parent.");
      const c = a.get(Yu, null), l = a.get(Dn, null), d = a.get(Zu, null), f = {
        rendererFactory: u,
        sanitizer: c,
        // We don't use inline effects (yet).
        inlineEffectRunner: null,
        afterRenderEventManager: l,
        changeDetectionScheduler: d
      }, h = u.createRenderer(null, this.componentDef), p = this.componentDef.selectors[0][0] || "div", g = r ? OT(h, r, this.componentDef.encapsulation, a) : Ru(h, p, KA(p));
      let D = 512;
      this.componentDef.signals ? D |= 4096 : this.componentDef.onPush || (D |= 16);
      let I = null;
      g !== null && (I = hf(
        g,
        a,
        !0
        /* isRootView */
      ));
      const y = kf(0, null, null, 1, 0, null, null, null, null, null, null), M = $u(null, y, null, D, null, null, f, h, a, null, I);
      Jd(M);
      let k, G;
      try {
        const ce = this.componentDef;
        let ze, rr = null;
        ce.findHostDirectiveDefs ? (ze = [], rr = /* @__PURE__ */ new Map(), ce.findHostDirectiveDefs(ce, ze, rr), ze.push(ce), ngDevMode && Vy(ze)) : ze = [ce];
        const Fp = JA(M, g), aw = XA(Fp, g, ce, ze, M, f, h);
        G = ys(y, T), g && n1(h, ce, g, r), n !== void 0 && r1(G, this.ngContentSelectors, n), k = t1(aw, ce, ze, rr, M, [AI]), Vu(y, M, null);
      } finally {
        Xd();
      }
      return new TI(this.componentType, k, Uo(G, M), M, G);
    } finally {
      $(i);
    }
  }
}
class TI extends CI {
  constructor(t, n, r, o, i) {
    super(), this.location = r, this._rootLView = o, this._tNode = i, this.previousInputValues = null, this.instance = n, this.hostView = this.changeDetectorRef = new bo(
      o,
      void 0,
      /* _cdRefInjectingView */
      !1
    ), this.componentType = t;
  }
  setInput(t, n) {
    const r = this._tNode.inputs;
    let o;
    if (r !== null && (o = r[t])) {
      if (this.previousInputValues ??= /* @__PURE__ */ new Map(), this.previousInputValues.has(t) && Object.is(this.previousInputValues.get(t), n))
        return;
      const i = this._rootLView;
      Pf(i[C], i, o, t, n), this.previousInputValues.set(t, n);
      const s = mt(this._tNode.index, i);
      Ts(s);
    } else if (ngDevMode) {
      const i = U(this.componentType);
      let s = `Can't set value of the '${t}' input on the '${i}' component. `;
      s += `Make sure that the '${t}' property is annotated with @Input() or a mapped @Input('${t}') exists.`, Av(s);
    }
  }
  get injector() {
    return new ye(this._tNode, this._rootLView);
  }
  destroy() {
    this.hostView.destroy();
  }
  onDestroy(t) {
    this.hostView.onDestroy(t);
  }
}
function JA(e, t) {
  const n = e[C], r = T;
  return ngDevMode && Ee(e, r), e[r] = t, qo(n, r, 2, "#host", null);
}
function XA(e, t, n, r, o, i, s) {
  const a = o[C];
  e1(r, e, t, s);
  let u = null;
  t !== null && (u = hf(t, o[_e]));
  const c = i.rendererFactory.createRenderer(t, n);
  let l = 16;
  n.signals ? l = 4096 : n.onPush && (l = 64);
  const d = $u(o, eI(n), null, l, o[e.index], e, i, c, null, null, u);
  return a.firstCreatePass && Hl(a, e, r.length - 1), Bu(o, d), o[e.index] = d;
}
function e1(e, t, n, r) {
  for (const o of e)
    t.mergedAttrs = xi(t.mergedAttrs, o.hostAttrs);
  t.mergedAttrs !== null && (Ha(t, t.mergedAttrs, !0), n !== null && Qv(r, n, t));
}
function t1(e, t, n, r, o, i) {
  const s = K();
  ngDevMode && E(s, "tNode should have been already created");
  const a = o[C], u = Be(s, o);
  rI(a, o, s, n, null, r);
  for (let l = 0; l < n.length; l++) {
    const d = s.directiveStart + l, f = Dr(o, a, d, s);
    Pe(f, o);
  }
  oI(a, o, s), u && Pe(u, o), ngDevMode && er(s.componentOffset, -1, "componentOffset must be great than -1");
  const c = Dr(o, a, s.directiveStart + s.componentOffset, s);
  if (e[ie] = o[ie] = c, i !== null)
    for (const l of i)
      l(c, t);
  return Of(a, s, o), c;
}
function n1(e, t, n, r) {
  if (r)
    ml(e, n, ["ng-version", "17.3.12"]);
  else {
    const { attrs: o, classes: i } = bM(t.selectors[0]);
    o && ml(e, n, o), i && i.length > 0 && qv(e, n, i.join(" "));
  }
}
function r1(e, t, n) {
  const r = e.projection = [];
  for (let o = 0; o < t.length; o++) {
    const i = n[o];
    r.push(i != null ? Array.from(i) : null);
  }
}
function AI() {
  const e = K();
  ngDevMode && E(e, "TNode is required"), bu(m()[C], e);
}
class Oe {
  static {
    this.__NG_ELEMENT_ID__ = o1;
  }
}
function o1() {
  const e = K();
  return FI(e, m());
}
const i1 = Oe, OI = class extends i1 {
  constructor(t, n, r) {
    super(), this._lContainer = t, this._hostTNode = n, this._hostLView = r;
  }
  get element() {
    return Uo(this._hostTNode, this._hostLView);
  }
  get injector() {
    return new ye(this._hostTNode, this._hostLView);
  }
  /** @deprecated No replacement */
  get parentInjector() {
    const t = wu(this._hostTNode, this._hostLView);
    if (ef(t)) {
      const n = Hi(t, this._hostLView), r = Bi(t);
      ngDevMode && Uy(n, r);
      const o = n[C].data[
        r + 8
        /* NodeInjectorOffset.TNODE */
      ];
      return new ye(o, n);
    } else
      return new ye(null, this._hostLView);
  }
  clear() {
    for (; this.length > 0; )
      this.remove(this.length - 1);
  }
  get(t) {
    const n = Tg(this._lContainer);
    return n !== null && n[t] || null;
  }
  get length() {
    return this._lContainer.length - ge;
  }
  createEmbeddedView(t, n, r) {
    let o, i;
    typeof r == "number" ? o = r : r != null && (o = r.index, i = r.injector);
    const s = wo(this._lContainer, t.ssrId), a = t.createEmbeddedViewImpl(n || {}, i, s);
    return this.insertImpl(a, o, Eo(this._hostTNode, s)), a;
  }
  createComponent(t, n, r, o, i) {
    const s = t && !di(t);
    let a;
    if (s)
      ngDevMode && A(typeof n != "object", !0, "It looks like Component factory was provided as the first argument and an options object as the second argument. This combination of arguments is incompatible. You can either change the first argument to provide Component type or change the second argument to be a number (representing an index at which to insert the new component's host view into this container)"), a = n;
    else {
      ngDevMode && (E(V(t), "Provided Component class doesn't contain Component definition. Please check whether provided class has @Component decorator."), A(typeof n != "number", !0, "It looks like Component type was provided as the first argument and a number (representing an index at which to insert the new component's host view into this container as the second argument. This combination of arguments is incompatible. Please use an object as the second argument instead."));
      const p = n || {};
      ngDevMode && p.environmentInjector && p.ngModuleRef && S("Cannot pass both environmentInjector and ngModuleRef options to createComponent()."), a = p.index, r = p.injector, o = p.projectableNodes, i = p.environmentInjector || p.ngModuleRef;
    }
    const u = s ? t : new Zo(V(t)), c = r || this.parentInjector;
    if (!i && u.ngModule == null) {
      const g = (s ? c : this.parentInjector).get(Pt, null);
      g && (i = g);
    }
    const l = V(u.componentType ?? {}), d = wo(this._lContainer, l?.id ?? null), f = d?.firstChild ?? null, h = u.create(c, o, f, i);
    return this.insertImpl(h.hostView, a, Eo(this._hostTNode, d)), h;
  }
  insert(t, n) {
    return this.insertImpl(t, n, !0);
  }
  insertImpl(t, n, r) {
    const o = t._lView;
    if (ngDevMode && t.destroyed)
      throw new Error("Cannot insert a destroyed View in a ViewContainer!");
    if (KM(o)) {
      const a = this.indexOf(t);
      if (a !== -1)
        this.detach(a);
      else {
        const u = o[Ce];
        ngDevMode && A(ke(u), !0, "An attached view should have its PARENT point to a container.");
        const c = new OI(u, u[$e], u[Ce]);
        c.detach(c.indexOf(t));
      }
    }
    const i = this._adjustIndex(n), s = this._lContainer;
    return Ss(s, o, i, r), t.attachToViewContainerRef(), my(kc(s), i, t), t;
  }
  move(t, n) {
    if (ngDevMode && t.destroyed)
      throw new Error("Cannot move a destroyed View in a ViewContainer!");
    return this.insert(t, n);
  }
  indexOf(t) {
    const n = Tg(this._lContainer);
    return n !== null ? n.indexOf(t) : -1;
  }
  remove(t) {
    const n = this._adjustIndex(t, -1), r = Gi(this._lContainer, n);
    r && (_a(kc(this._lContainer), n), xu(r[C], r));
  }
  detach(t) {
    const n = this._adjustIndex(t, -1), r = Gi(this._lContainer, n);
    return r && _a(kc(this._lContainer), n) != null ? new bo(r) : null;
  }
  _adjustIndex(t, n = 0) {
    return t == null ? this.length + n : (ngDevMode && (er(t, -1, `ViewRef index must be positive, got ${t}`), Qn(t, this.length + 1 + n, "index")), t);
  }
};
function Tg(e) {
  return e[Aa];
}
function kc(e) {
  return e[Aa] || (e[Aa] = []);
}
function FI(e, t) {
  ngDevMode && je(
    e,
    15
    /* TNodeType.AnyRNode */
  );
  let n;
  const r = t[e.index];
  return ke(r) ? n = r : (n = iI(r, t, null, e), t[e.index] = n, Bu(t, n)), NI(n, t, e, r), new OI(n, e, t);
}
function s1(e, t) {
  const n = e[F];
  ngDevMode && ngDevMode.rendererCreateComment++;
  const r = n.createComment(ngDevMode ? "container" : ""), o = Be(t, e), i = Pu(n, o);
  return Ir(n, i, r, bT(n, o), !1), r;
}
let NI = RI, Uf = () => !1;
function kI(e, t, n) {
  return Uf(e, t, n);
}
function RI(e, t, n, r) {
  if (e[Kt])
    return;
  let o;
  n.type & 8 ? o = re(r) : o = s1(t, n), e[Kt] = o;
}
function a1(e, t, n) {
  if (e[Kt] && e[Li])
    return !0;
  const r = n[gt], o = t.index - T;
  if (!r || xa(t) || Au(r, o))
    return !1;
  const s = xl(r, o), a = r.data[Ui]?.[o];
  ngDevMode && E(a, "Unexpected state: no hydration info available for a given TNode, which represents a view container.");
  const [u, c] = RA(s, a);
  return ngDevMode && (As(u, Node.COMMENT_NODE, null, n, t, !0), zo(u, !1)), e[Kt] = u, e[Li] = c, !0;
}
function u1(e, t, n, r) {
  Uf(e, n, t) || RI(e, t, n, r);
}
function c1() {
  NI = u1, Uf = a1;
}
class zf {
  constructor(t) {
    this.queryList = t, this.matches = null;
  }
  clone() {
    return new zf(this.queryList);
  }
  setDirty() {
    this.queryList.setDirty();
  }
}
class Gf {
  constructor(t = []) {
    this.queries = t;
  }
  createEmbeddedView(t) {
    const n = t.queries;
    if (n !== null) {
      const r = t.contentQueries !== null ? t.contentQueries[0] : n.length, o = [];
      for (let i = 0; i < r; i++) {
        const s = n.getByIndex(i), a = this.queries[s.indexInDeclarationView];
        o.push(a.clone());
      }
      return new Gf(o);
    }
    return null;
  }
  insertView(t) {
    this.dirtyQueriesWithMatches(t);
  }
  detachView(t) {
    this.dirtyQueriesWithMatches(t);
  }
  finishViewCreation(t) {
    this.dirtyQueriesWithMatches(t);
  }
  dirtyQueriesWithMatches(t) {
    for (let n = 0; n < this.queries.length; n++)
      Zf(t, n).matches !== null && this.queries[n].setDirty();
  }
}
class xI {
  constructor(t, n, r = null) {
    this.flags = n, this.read = r, typeof t == "string" ? this.predicate = p1(t) : this.predicate = t;
  }
}
class Wf {
  constructor(t = []) {
    this.queries = t;
  }
  elementStart(t, n) {
    ngDevMode && it(t, "Queries should collect results on the first template pass only");
    for (let r = 0; r < this.queries.length; r++)
      this.queries[r].elementStart(t, n);
  }
  elementEnd(t) {
    for (let n = 0; n < this.queries.length; n++)
      this.queries[n].elementEnd(t);
  }
  embeddedTView(t) {
    let n = null;
    for (let r = 0; r < this.length; r++) {
      const o = n !== null ? n.length : 0, i = this.getByIndex(r).embeddedTView(t, o);
      i && (i.indexInDeclarationView = r, n !== null ? n.push(i) : n = [i]);
    }
    return n !== null ? new Wf(n) : null;
  }
  template(t, n) {
    ngDevMode && it(t, "Queries should collect results on the first template pass only");
    for (let r = 0; r < this.queries.length; r++)
      this.queries[r].template(t, n);
  }
  getByIndex(t) {
    return ngDevMode && Ee(this.queries, t), this.queries[t];
  }
  get length() {
    return this.queries.length;
  }
  track(t) {
    this.queries.push(t);
  }
}
class qf {
  constructor(t, n = -1) {
    this.metadata = t, this.matches = null, this.indexInDeclarationView = -1, this.crossesNgTemplate = !1, this._appliesToNextNode = !0, this._declarationNodeIndex = n;
  }
  elementStart(t, n) {
    this.isApplyingToNode(n) && this.matchTNode(t, n);
  }
  elementEnd(t) {
    this._declarationNodeIndex === t.index && (this._appliesToNextNode = !1);
  }
  template(t, n) {
    this.elementStart(t, n);
  }
  embeddedTView(t, n) {
    return this.isApplyingToNode(t) ? (this.crossesNgTemplate = !0, this.addMatch(-t.index, n), new qf(this.metadata)) : null;
  }
  isApplyingToNode(t) {
    if (this._appliesToNextNode && (this.metadata.flags & 1) !== 1) {
      const n = this._declarationNodeIndex;
      let r = t.parent;
      for (; r !== null && r.type & 8 && r.index !== n; )
        r = r.parent;
      return n === (r !== null ? r.index : -1);
    }
    return this._appliesToNextNode;
  }
  matchTNode(t, n) {
    const r = this.metadata.predicate;
    if (Array.isArray(r))
      for (let o = 0; o < r.length; o++) {
        const i = r[o];
        this.matchTNodeWithReadOption(t, n, l1(n, i)), this.matchTNodeWithReadOption(t, n, pa(n, t, i, !1, !1));
      }
    else
      r === Qe ? n.type & 4 && this.matchTNodeWithReadOption(t, n, -1) : this.matchTNodeWithReadOption(t, n, pa(n, t, r, !1, !1));
  }
  matchTNodeWithReadOption(t, n, r) {
    if (r !== null) {
      const o = this.metadata.read;
      if (o !== null)
        if (o === rn || o === Oe || o === Qe && n.type & 4)
          this.addMatch(n.index, -2);
        else {
          const i = pa(n, t, o, !1, !1);
          i !== null && this.addMatch(n.index, i);
        }
      else
        this.addMatch(n.index, r);
    }
  }
  addMatch(t, n) {
    this.matches === null ? this.matches = [t, n] : this.matches.push(t, n);
  }
}
function l1(e, t) {
  const n = e.localNames;
  if (n !== null) {
    for (let r = 0; r < n.length; r += 2)
      if (n[r] === t)
        return n[r + 1];
  }
  return null;
}
function d1(e, t) {
  return e.type & 11 ? Uo(e, t) : e.type & 4 ? zu(e, t) : null;
}
function f1(e, t, n, r) {
  return n === -1 ? d1(t, e) : n === -2 ? h1(e, t, r) : Dr(e, e[C], n, t);
}
function h1(e, t, n) {
  if (n === rn)
    return Uo(t, e);
  if (n === Qe)
    return zu(t, e);
  if (n === Oe)
    return ngDevMode && je(
      t,
      15
      /* TNodeType.AnyContainer */
    ), FI(t, e);
  ngDevMode && S(`Special token to read should be one of ElementRef, TemplateRef or ViewContainerRef but got ${Q(n)}.`);
}
function PI(e, t, n, r) {
  const o = t[kt].queries[r];
  if (o.matches === null) {
    const i = e.data, s = n.matches, a = [];
    for (let u = 0; s !== null && u < s.length; u += 2) {
      const c = s[u];
      if (c < 0)
        a.push(null);
      else {
        ngDevMode && Ee(i, c);
        const l = i[c];
        a.push(f1(t, l, s[u + 1], n.metadata.read));
      }
    }
    o.matches = a;
  }
  return o.matches;
}
function Yl(e, t, n, r) {
  const o = e.queries.getByIndex(n), i = o.matches;
  if (i !== null) {
    const s = PI(e, t, o, n);
    for (let a = 0; a < i.length; a += 2) {
      const u = i[a];
      if (u > 0)
        r.push(s[a / 2]);
      else {
        const c = i[a + 1], l = t[-u];
        ngDevMode && ot(l);
        for (let d = ge; d < l.length; d++) {
          const f = l[d];
          f[ps] === f[Ce] && Yl(f[C], f, c, r);
        }
        if (l[gr] !== null) {
          const d = l[gr];
          for (let f = 0; f < d.length; f++) {
            const h = d[f];
            Yl(h[C], h, c, r);
          }
        }
      }
    }
  }
  return r;
}
function Qf(e, t) {
  return ngDevMode && E(e[kt], "LQueries should be defined when trying to load a query"), ngDevMode && Ee(e[kt].queries, t), e[kt].queries[t].queryList;
}
function LI(e, t, n) {
  const r = new Su(
    (n & 4) === 4
    /* QueryFlags.emitDistinctChangesOnly */
  );
  return RT(e, t, r, r.destroy), (t[kt] ??= new Gf()).queries.push(new zf(r)) - 1;
}
function jI(e, t, n) {
  ngDevMode && J(t, "Expecting flags");
  const r = x();
  return r.firstCreatePass && (BI(r, new xI(e, t, n), -1), (t & 2) === 2 && (r.staticViewQueries = !0)), LI(r, m(), t);
}
function $I(e, t, n, r) {
  ngDevMode && J(n, "Expecting flags");
  const o = x();
  if (o.firstCreatePass) {
    const i = K();
    BI(o, new xI(t, n, r), i.index), g1(o, e), (n & 2) === 2 && (o.staticContentQueries = !0);
  }
  return LI(o, m(), n);
}
function p1(e) {
  return e.split(",").map((t) => t.trim());
}
function BI(e, t, n) {
  e.queries === null && (e.queries = new Wf()), e.queries.track(new qf(t, n));
}
function g1(e, t) {
  const n = e.contentQueries || (e.contentQueries = []), r = n.length ? n[n.length - 1] : -1;
  t !== r && n.push(e.queries.length - 1, t);
}
function Zf(e, t) {
  return ngDevMode && E(e.queries, "TQueries must be defined to retrieve a TQuery"), e.queries.getByIndex(t);
}
function HI(e, t) {
  const n = e[C], r = Zf(n, t);
  return r.crossesNgTemplate ? Yl(n, e, t, []) : PI(n, e, r, t);
}
function Yf(e) {
  return typeof e == "function" && e[ht] !== void 0;
}
function m1(e) {
  return null;
}
function VI(e, t) {
  _t("NgSignals");
  const n = hw(e), r = n[ht];
  return t?.equal && (r.equal = t.equal), n.set = (o) => cu(r, o), n.update = (o) => pw(r, o), n.asReadonly = UI.bind(n), ngDevMode && (n.toString = () => `[Signal: ${n()}]`), n;
}
function UI() {
  const e = this[ht];
  if (e.readonlyFn === void 0) {
    const t = () => this();
    t[ht] = e, e.readonlyFn = t;
  }
  return e.readonlyFn;
}
function zI(e) {
  return Yf(e) && typeof e.set == "function";
}
function Kf(e, t) {
  let n;
  const r = Jm(() => {
    n._dirtyCounter();
    const o = y1(n, e);
    if (t && o === void 0)
      throw new v(-951, ngDevMode && "Child query result is required but no value is available.");
    return o;
  });
  return n = r[ht], n._dirtyCounter = VI(0), n._flatValue = void 0, ngDevMode && (r.toString = () => "[Query Signal]"), r;
}
function GI() {
  return Kf(
    /* firstOnly */
    !0,
    /* required */
    !1
  );
}
function WI() {
  return Kf(
    /* firstOnly */
    !0,
    /* required */
    !0
  );
}
function qI() {
  return Kf(
    /* firstOnly */
    !1,
    /* required */
    !1
  );
}
function QI(e, t) {
  const n = e[ht];
  n._lView = m(), n._queryIndex = t, n._queryList = Qf(n._lView, t), n._queryList.onDirty(() => n._dirtyCounter.update((r) => r + 1));
}
function y1(e, t) {
  const n = e._lView, r = e._queryIndex;
  if (n === void 0 || r === void 0 || n[_] & 4)
    return t ? void 0 : q;
  const o = Qf(n, r), i = HI(n, r);
  return o.reset(i, RD), t ? o.first : o._changesDetected || e._flatValue === void 0 ? e._flatValue = o.toArray() : e._flatValue;
}
function Ag(e, t) {
  return ngDevMode && Ze(Jf), GI();
}
function D1(e, t) {
  return ngDevMode && Ze(Jf), WI();
}
const Jf = (Ag.required = D1, Ag);
function ZI(e, t) {
  return ngDevMode && Ze(ZI), qI();
}
function Og(e, t) {
  return ngDevMode && Ze(YI), GI();
}
function v1(e, t) {
  return ngDevMode && Ze(KI), WI();
}
const YI = (Og.required = v1, Og);
function KI(e, t) {
  return qI();
}
function JI(e) {
  const t = Object.create(sy), n = new rf();
  t.value = e;
  function r() {
    return au(t), Fg(t.value), t.value;
  }
  return r[ht] = t, r.asReadonly = UI.bind(r), r.set = (o) => {
    t.equal(t.value, o) || (cu(t, o), n.emit(o));
  }, r.update = (o) => {
    Fg(t.value), r.set(o(t.value));
  }, r.subscribe = n.subscribe.bind(n), r.destroyRef = n.destroyRef, ngDevMode && (r.toString = () => `[Model Signal: ${r()}]`), r;
}
function Fg(e) {
  if (e === lu)
    throw new v(-952, ngDevMode && "Model is required but no value is available yet.");
}
function Ng(e) {
  return ngDevMode && Ze(Xf), JI(e);
}
function I1() {
  return ngDevMode && Ze(Xf), JI(lu);
}
const Xf = (Ng.required = I1, Ng), XI = !0;
class Ns {
}
const C1 = Xn("ContentChildren", (e, t = {}) => ({
  selector: e,
  first: !1,
  isViewQuery: !1,
  descendants: !1,
  emitDistinctChangesOnly: XI,
  ...t
}), Ns), E1 = Xn("ContentChild", (e, t = {}) => ({ selector: e, first: !0, isViewQuery: !1, descendants: !0, ...t }), Ns), b1 = Xn("ViewChildren", (e, t = {}) => ({
  selector: e,
  first: !1,
  isViewQuery: !0,
  descendants: !0,
  emitDistinctChangesOnly: XI,
  ...t
}), Ns), w1 = Xn("ViewChild", (e, t) => ({ selector: e, first: !0, isViewQuery: !0, descendants: !0, ...t }), Ns);
function eC(e) {
  const t = [], n = /* @__PURE__ */ new Map();
  function r(o) {
    let i = n.get(o);
    if (!i) {
      const s = e(o);
      n.set(o, i = s.then(A1));
    }
    return i;
  }
  return Mo.forEach((o, i) => {
    const s = [];
    o.templateUrl && s.push(r(o.templateUrl).then((c) => {
      o.template = c;
    }));
    const a = typeof o.styles == "string" ? [o.styles] : o.styles || [];
    if (o.styles = a, o.styleUrl && o.styleUrls?.length)
      throw new Error("@Component cannot define both `styleUrl` and `styleUrls`. Use `styleUrl` if the component has one stylesheet, or `styleUrls` if it has multiple");
    if (o.styleUrls?.length) {
      const c = o.styles.length, l = o.styleUrls;
      o.styleUrls.forEach((d, f) => {
        a.push(""), s.push(r(d).then((h) => {
          a[c + f] = h, l.splice(l.indexOf(d), 1), l.length == 0 && (o.styleUrls = void 0);
        }));
      });
    } else o.styleUrl && s.push(r(o.styleUrl).then((c) => {
      a.push(c), o.styleUrl = void 0;
    }));
    const u = Promise.all(s).then(() => O1(i));
    t.push(u);
  }), nC(), Promise.all(t).then(() => {
  });
}
let Mo = /* @__PURE__ */ new Map();
const Zi = /* @__PURE__ */ new Set();
function M1(e, t) {
  tC(t) && (Mo.set(e, t), Zi.add(e));
}
function _1(e) {
  return Zi.has(e);
}
function tC(e) {
  return !!(e.templateUrl && !e.hasOwnProperty("template") || e.styleUrls && e.styleUrls.length || e.styleUrl);
}
function nC() {
  const e = Mo;
  return Mo = /* @__PURE__ */ new Map(), e;
}
function S1(e) {
  Zi.clear(), e.forEach((t, n) => Zi.add(n)), Mo = e;
}
function T1() {
  return Mo.size === 0;
}
function A1(e) {
  return typeof e == "string" ? e : e.text();
}
function O1(e) {
  Zi.delete(e);
}
const Kl = /* @__PURE__ */ new Map();
let rC = !0;
function F1(e, t, n) {
  if (t && t !== n && rC)
    throw new Error(`Duplicate module registered for ${e} - ${Q(t)} vs ${Q(t.name)}`);
}
function eh(e, t) {
  const n = Kl.get(t) || null;
  F1(t, n, e), Kl.set(t, e);
}
function oC(e) {
  return Kl.get(e);
}
function N1(e) {
  rC = !e;
}
function iC(e, t, n) {
  const r = m(), o = ue(), i = Be(o, r);
  if (o.type === 2 && t.toLowerCase() === "iframe") {
    const s = i;
    s.src = "", s.srcdoc = Go(""), ws(r[F], s);
    const a = ngDevMode && `Angular has detected that the \`${n}\` was applied as a binding to an <iframe>${ku(r)}. For security reasons, the \`${n}\` can be set on an <iframe> as a static attribute only. 
To fix this, switch the \`${n}\` binding to a static attribute in a template or in host bindings section.`;
    throw new v(-910, a);
  }
  return e;
}
function sC(e) {
  return Object.getPrototypeOf(e.prototype).constructor;
}
function th(e) {
  let t = sC(e.type), n = !0;
  const r = [e];
  for (; t; ) {
    let o;
    if (bt(e))
      o = t.ɵcmp || t.ɵdir;
    else {
      if (t.ɵcmp)
        throw new v(903, ngDevMode && `Directives cannot inherit Components. Directive ${U(e.type)} is attempting to extend component ${U(t)}`);
      o = t.ɵdir;
    }
    if (o) {
      if (n) {
        r.push(o);
        const s = e;
        s.inputs = qs(e.inputs), s.inputTransforms = qs(e.inputTransforms), s.declaredInputs = qs(e.declaredInputs), s.outputs = qs(e.outputs);
        const a = o.hostBindings;
        a && L1(e, a);
        const u = o.viewQuery, c = o.contentQueries;
        if (u && x1(e, u), c && P1(e, c), k1(e, o), Uw(e.outputs, o.outputs), bt(o) && o.data.animation) {
          const l = e.data;
          l.animation = (l.animation || []).concat(o.data.animation);
        }
      }
      const i = o.features;
      if (i)
        for (let s = 0; s < i.length; s++) {
          const a = i[s];
          a && a.ngInherit && a(e), a === th && (n = !1);
        }
    }
    t = Object.getPrototypeOf(t);
  }
  R1(r);
}
function k1(e, t) {
  for (const n in t.inputs) {
    if (!t.inputs.hasOwnProperty(n) || e.inputs.hasOwnProperty(n))
      continue;
    const r = t.inputs[n];
    if (r !== void 0 && (e.inputs[n] = r, e.declaredInputs[n] = t.declaredInputs[n], t.inputTransforms !== null)) {
      const o = Array.isArray(r) ? r[0] : r;
      if (!t.inputTransforms.hasOwnProperty(o))
        continue;
      e.inputTransforms ??= {}, e.inputTransforms[o] = t.inputTransforms[o];
    }
  }
}
function R1(e) {
  let t = 0, n = null;
  for (let r = e.length - 1; r >= 0; r--) {
    const o = e[r];
    o.hostVars = t += o.hostVars, o.hostAttrs = xi(o.hostAttrs, n = xi(n, o.hostAttrs));
  }
}
function qs(e) {
  return e === xt ? {} : e === q ? [] : e;
}
function x1(e, t) {
  const n = e.viewQuery;
  n ? e.viewQuery = (r, o) => {
    t(r, o), n(r, o);
  } : e.viewQuery = t;
}
function P1(e, t) {
  const n = e.contentQueries;
  n ? e.contentQueries = (r, o, i) => {
    t(r, o, i), n(r, o, i);
  } : e.contentQueries = t;
}
function L1(e, t) {
  const n = e.hostBindings;
  n ? e.hostBindings = (r, o) => {
    t(r, o), n(r, o);
  } : e.hostBindings = t;
}
const j1 = [
  // The child class should use the providers of its parent.
  "providersResolver"
  // Not listed here are any fields which are handled by the `ɵɵInheritDefinitionFeature`, such
  // as inputs, outputs, and host binding functions.
], $1 = [
  // The child class should use the template function of its parent, including all template
  // semantics.
  "template",
  "decls",
  "consts",
  "vars",
  "onPush",
  "ngContentSelectors",
  // The child class should use the CSS styles of its parent, including all styling semantics.
  "styles",
  "encapsulation",
  // The child class should be checked by the runtime in the same way as its parent.
  "schemas"
];
function aC(e) {
  let t = sC(e.type), n;
  bt(e) ? n = t.ɵcmp : n = t.ɵdir;
  const r = e;
  for (const o of j1)
    r[o] = n[o];
  if (bt(n))
    for (const o of $1)
      r[o] = n[o];
}
function uC(e) {
  const t = (n) => {
    const r = (Array.isArray(e) ? e : e()).map((o) => typeof o == "function" ? { directive: R(o), inputs: xt, outputs: xt } : {
      directive: R(o.directive),
      inputs: kg(o.inputs),
      outputs: kg(o.outputs)
    });
    n.hostDirectives === null ? (n.findHostDirectiveDefs = cC, n.hostDirectives = r) : n.hostDirectives.unshift(...r);
  };
  return t.ngInherit = !0, t;
}
function cC(e, t, n) {
  if (e.hostDirectives !== null)
    for (const r of e.hostDirectives) {
      const o = Fe(r.directive);
      (typeof ngDevMode > "u" || ngDevMode) && H1(r, o), B1(o.declaredInputs, r.inputs), cC(o, t, n), n.set(o, r), t.push(o);
    }
}
function kg(e) {
  if (e === void 0 || e.length === 0)
    return xt;
  const t = {};
  for (let n = 0; n < e.length; n += 2)
    t[e[n]] = e[n + 1];
  return t;
}
function B1(e, t) {
  for (const n in t)
    if (t.hasOwnProperty(n)) {
      const r = t[n], o = e[n];
      (typeof ngDevMode > "u" || ngDevMode) && e.hasOwnProperty(r) && A(e[r], e[n], `Conflicting host directive input alias ${n}.`), e[r] = o;
    }
}
function H1(e, t) {
  const n = e.directive;
  if (t === null)
    throw V(n) !== null ? new v(310, `Host directive ${n.name} cannot be a component.`) : new v(307, `Could not resolve metadata for host directive ${n.name}. Make sure that the ${n.name} class is annotated with an @Directive decorator.`);
  if (!t.standalone)
    throw new v(308, `Host directive ${t.type.name} must be standalone.`);
  Rg("input", t, e.inputs), Rg("output", t, e.outputs);
}
function Rg(e, t, n) {
  const r = t.type.name, o = e === "input" ? t.inputs : t.outputs;
  for (const i in n)
    if (n.hasOwnProperty(i)) {
      if (!o.hasOwnProperty(i))
        throw new v(311, `Directive ${r} does not have an ${e} with a public name of ${i}.`);
      const s = n[i];
      if (o.hasOwnProperty(s) && s !== i)
        throw new v(312, `Cannot alias ${e} ${i} of host directive ${r} to ${s}, because it already has a different ${e} with the same public name.`);
    }
}
function lC(e) {
  const t = e.inputConfig, n = {};
  for (const r in t)
    if (t.hasOwnProperty(r)) {
      const o = t[r];
      Array.isArray(o) && o[3] && (n[r] = o[3]);
    }
  e.inputTransforms = n;
}
class Jn {
}
class dC {
}
function nh(e, t) {
  return new Ju(e, t ?? null, []);
}
const V1 = nh;
class Ju extends Jn {
  constructor(t, n, r) {
    super(), this._parent = n, this._bootstrapComponents = [], this.destroyCbs = [], this.componentFactoryResolver = new SI(this);
    const o = pt(t);
    ngDevMode && E(o, `NgModule '${Q(t)}' is not a subtype of 'NgModuleType'.`), this._bootstrapComponents = Wt(o.bootstrap), this._r3Injector = FD(t, n, [
      { provide: Jn, useValue: this },
      {
        provide: Fs,
        useValue: this.componentFactoryResolver
      },
      ...r
    ], Q(t), /* @__PURE__ */ new Set(["environment"])), this._r3Injector.resolveInjectorInitializers(), this.instance = this._r3Injector.get(t);
  }
  get injector() {
    return this._r3Injector;
  }
  destroy() {
    ngDevMode && E(this.destroyCbs, "NgModule already destroyed");
    const t = this._r3Injector;
    !t.destroyed && t.destroy(), this.destroyCbs.forEach((n) => n()), this.destroyCbs = null;
  }
  onDestroy(t) {
    ngDevMode && E(this.destroyCbs, "NgModule already destroyed"), this.destroyCbs.push(t);
  }
}
class Xu extends dC {
  constructor(t) {
    super(), this.moduleType = t;
  }
  create(t) {
    return new Ju(this.moduleType, t, []);
  }
}
function U1(e, t, n) {
  return new Ju(e, t, n);
}
class fC extends Jn {
  constructor(t) {
    super(), this.componentFactoryResolver = new SI(this), this.instance = null;
    const n = new Lo([
      ...t.providers,
      { provide: Jn, useValue: this },
      { provide: Fs, useValue: this.componentFactoryResolver }
    ], t.parent || vu(), t.debugName, /* @__PURE__ */ new Set(["environment"]));
    this.injector = n, t.runEnvironmentInitializers && n.resolveInjectorInitializers();
  }
  destroy() {
    this.injector.destroy();
  }
  onDestroy(t) {
    this.injector.onDestroy(t);
  }
}
function rh(e, t, n = null) {
  return new fC({ providers: e, parent: t, debugName: n, runEnvironmentInitializers: !0 }).injector;
}
class Va {
  constructor() {
    this.cachedInjectors = /* @__PURE__ */ new Map();
  }
  getOrCreateInjector(t, n, r, o) {
    if (!this.cachedInjectors.has(t)) {
      const i = r.length > 0 ? rh(r, n, o) : null;
      this.cachedInjectors.set(t, i);
    }
    return this.cachedInjectors.get(t);
  }
  ngOnDestroy() {
    try {
      for (const t of this.cachedInjectors.values())
        t !== null && t.destroy();
    } finally {
      this.cachedInjectors.clear();
    }
  }
  static {
    this.ɵprov = te({
      token: Va,
      providedIn: "environment",
      factory: () => new Va()
    });
  }
}
const ya = "__ngAsyncComponentMetadataFn__";
function z1(e) {
  return e[ya] ?? null;
}
function G1(e, t, n) {
  const r = e;
  return r[ya] = () => Promise.all(t()).then((o) => (n(...o), r[ya] = null, o)), r[ya];
}
function Je(e, t, n, r) {
  return en(() => {
    const o = e;
    t !== null && (o.hasOwnProperty("decorators") && o.decorators !== void 0 ? o.decorators.push(...t) : o.decorators = t), n !== null && (o.ctorParameters = n), r !== null && (o.hasOwnProperty("propDecorators") && o.propDecorators !== void 0 ? o.propDecorators = { ...o.propDecorators, ...r } : o.propDecorators = r);
  });
}
class Rt {
  constructor() {
    this.taskId = 0, this.pendingTasks = /* @__PURE__ */ new Set(), this.hasPendingTasks = new Fw(!1);
  }
  get _hasPendingTasks() {
    return this.hasPendingTasks.value;
  }
  add() {
    this._hasPendingTasks || this.hasPendingTasks.next(!0);
    const t = this.taskId++;
    return this.pendingTasks.add(t), t;
  }
  remove(t) {
    this.pendingTasks.delete(t), this.pendingTasks.size === 0 && this._hasPendingTasks && this.hasPendingTasks.next(!1);
  }
  ngOnDestroy() {
    this.pendingTasks.clear(), this._hasPendingTasks && this.hasPendingTasks.next(!1);
  }
  static {
    this.ɵfac = function(n) {
      return new (n || Rt)();
    };
  }
  static {
    this.ɵprov = /* @__PURE__ */ te({ token: Rt, factory: Rt.ɵfac, providedIn: "root" });
  }
}
(typeof ngDevMode > "u" || ngDevMode) && Je(Rt, [{
  type: fe,
  args: [{ providedIn: "root" }]
}], null, null);
function Ua(e) {
  return oh(e) ? Array.isArray(e) || !(e instanceof Map) && // JS Map are iterables but return entries as [k, v]
  Symbol.iterator in e : !1;
}
function W1(e, t, n) {
  const r = e[Symbol.iterator](), o = t[Symbol.iterator]();
  for (; ; ) {
    const i = r.next(), s = o.next();
    if (i.done && s.done)
      return !0;
    if (i.done || s.done || !n(i.value, s.value))
      return !1;
  }
}
function q1(e, t) {
  if (Array.isArray(e))
    for (let n = 0; n < e.length; n++)
      t(e[n]);
  else {
    const n = e[Symbol.iterator]();
    let r;
    for (; !(r = n.next()).done; )
      t(r.value);
  }
}
function oh(e) {
  return e !== null && (typeof e == "function" || typeof e == "object");
}
function ih(e, t) {
  const n = Ua(e), r = Ua(t);
  return n && r ? W1(e, t, ih) : !n && (e && (typeof e == "object" || typeof e == "function")) && !r && (t && (typeof t == "object" || typeof t == "function")) ? !0 : Object.is(e, t);
}
function an(e, t, n) {
  return e[t] = n;
}
function ks(e, t) {
  return ngDevMode && Ee(e, t), ngDevMode && jr(e[t], O, "Stored value should never be NO_CHANGE."), e[t];
}
function be(e, t, n) {
  ngDevMode && jr(n, O, "Incoming value should never be NO_CHANGE."), ngDevMode && Qn(t, e.length, "Slot should have been initialized to NO_CHANGE");
  const r = e[t];
  if (Object.is(r, n))
    return !1;
  if (ngDevMode && $r()) {
    const o = r !== O ? r : void 0;
    if (!ih(o, n)) {
      const i = gT(e, t, o, n);
      pT(r === O, i.oldValue, i.newValue, i.propName, e);
    }
    return !1;
  }
  return e[t] = n, !0;
}
function Er(e, t, n, r) {
  const o = be(e, t, n);
  return be(e, t + 1, r) || o;
}
function ec(e, t, n, r, o) {
  const i = Er(e, t, n, r);
  return be(e, t + 2, o) || i;
}
function wt(e, t, n, r, o, i) {
  const s = Er(e, t, n, r);
  return Er(e, t + 2, o, i) || s;
}
function Rs(e) {
  return (e.flags & 32) === 32;
}
function Q1(e, t, n, r, o, i, s, a, u) {
  ngDevMode && it(t), ngDevMode && ngDevMode.firstCreatePass++;
  const c = t.consts, l = qo(t, e, 4, s || null, Jt(c, a));
  Rf(t, n, l, Jt(c, u)), bu(t, l);
  const d = l.tView = kf(
    2,
    l,
    r,
    o,
    i,
    t.directiveRegistry,
    t.pipeRegistry,
    null,
    t.schemas,
    c,
    null
    /* ssrId */
  );
  return t.queries !== null && (t.queries.template(t, l), d.queries = t.queries.embeddedTView(l)), l;
}
function _o(e, t, n, r, o, i, s, a) {
  const u = m(), c = x(), l = e + T, d = c.firstCreatePass ? Q1(l, c, u, t, n, r, o, i, s) : c.data[l];
  Xt(d, !1);
  const f = hC(c, u, d, e);
  vs() && Lu(c, u, f, d), Pe(f, u);
  const h = iI(f, u, f, d);
  return u[l] = h, Bu(u, h), kI(h, d, u), Iu(d) && Ff(c, u, d), s != null && Nf(u, d, a), _o;
}
let hC = pC;
function pC(e, t, n, r) {
  return nn(!0), t[F].createComment(ngDevMode ? "container" : "");
}
function Z1(e, t, n, r) {
  const o = t[gt], i = !o || Bo() || Rs(n) || Au(o, r);
  if (nn(i), i)
    return pC(e, t);
  const s = o.data[Nl]?.[r] ?? null;
  s !== null && n.tView !== null && (n.tView.ssrId === null ? n.tView.ssrId = s : ngDevMode && A(n.tView.ssrId, s, "Unexpected value of the `ssrId` for this TView"));
  const a = qu(o, e, t, n);
  ngDevMode && Gu(a, t, n), Tu(o, r, a);
  const u = gf(o, r), c = Qu(u, a);
  return ngDevMode && (As(c, Node.COMMENT_NODE, null, t, n), zo(c)), c;
}
function Y1() {
  hC = Z1;
}
var Ie;
(function(e) {
  e[e.NOT_STARTED = 0] = "NOT_STARTED", e[e.IN_PROGRESS = 1] = "IN_PROGRESS", e[e.COMPLETE = 2] = "COMPLETE", e[e.FAILED = 3] = "FAILED";
})(Ie || (Ie = {}));
const xg = 0, K1 = 1;
var pe;
(function(e) {
  e[e.Placeholder = 0] = "Placeholder", e[e.Loading = 1] = "Loading", e[e.Complete = 2] = "Complete", e[e.Error = 3] = "Error";
})(pe || (pe = {}));
var So;
(function(e) {
  e[e.Initial = -1] = "Initial";
})(So || (So = {}));
const ro = 0, xs = 1, hi = 2, Qs = 3, gC = 4, mC = 5;
var za;
(function(e) {
  e[e.Manual = 0] = "Manual", e[e.Playthrough = 1] = "Playthrough";
})(za || (za = {}));
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function tc(e, t, n) {
  const r = e === 1 ? mC : gC;
  t[r] === null && (t[r] = []), t[r].push(n);
}
function Jl(e, t) {
  const n = e === 1 ? mC : gC, r = t[n];
  if (r !== null) {
    for (const o of r)
      o();
    t[n] = null;
  }
}
function yC(e) {
  Jl(1, e), Jl(0, e);
}
function nc(e) {
  return e + 1;
}
function nr(e, t) {
  const n = e[C], r = nc(t.index);
  return ngDevMode && gs(n, r), e[r];
}
function J1(e, t, n) {
  const r = e[C], o = nc(t);
  ngDevMode && gs(r, o), e[o] = n;
}
function Dt(e, t) {
  const n = nc(t.index);
  return ngDevMode && gs(e, n), e.data[n];
}
function X1(e, t, n) {
  const r = nc(t);
  ngDevMode && gs(e, r), e.data[r] = n;
}
function eO(e, t, n) {
  const r = t[C], o = Dt(r, n);
  switch (e) {
    case pe.Complete:
      return o.primaryTmplIndex;
    case pe.Loading:
      return o.loadingTmplIndex;
    case pe.Error:
      return o.errorTmplIndex;
    case pe.Placeholder:
      return o.placeholderTmplIndex;
    default:
      return ngDevMode && S(`Unexpected defer block state: ${e}`), null;
  }
}
function Xl(e, t) {
  return t === pe.Placeholder ? e.placeholderBlockConfig?.[xg] ?? null : t === pe.Loading ? e.loadingBlockConfig?.[xg] ?? null : null;
}
function DC(e) {
  return e.loadingBlockConfig?.[K1] ?? null;
}
function Pg(e, t) {
  if (!e || e.length === 0)
    return t;
  const n = new Set(e);
  for (const r of t)
    n.add(r);
  return e.length === n.size ? e : Array.from(n);
}
function tO(e, t) {
  const n = t.primaryTmplIndex + T;
  return ys(e, n);
}
function vC(e) {
  A(e.loadingState, Ie.COMPLETE, "Expecting all deferred dependencies to be loaded.");
}
function nO(e) {
  return e !== null && typeof e == "object" && typeof e.primaryTmplIndex == "number";
}
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const Ga = {
  passive: !0,
  capture: !0
}, Rc = /* @__PURE__ */ new WeakMap(), xc = /* @__PURE__ */ new WeakMap(), zr = /* @__PURE__ */ new WeakMap(), Lg = ["click", "keydown"], jg = ["mouseenter", "focusin"];
let Gr = null, Pc = 0;
class sh {
  constructor() {
    this.callbacks = /* @__PURE__ */ new Set(), this.listener = () => {
      for (const t of this.callbacks)
        t();
    };
  }
}
function IC(e, t) {
  let n = xc.get(e);
  if (!n) {
    n = new sh(), xc.set(e, n);
    for (const r of Lg)
      e.addEventListener(r, n.listener, Ga);
  }
  return n.callbacks.add(t), () => {
    const { callbacks: r, listener: o } = n;
    if (r.delete(t), r.size === 0) {
      xc.delete(e);
      for (const i of Lg)
        e.removeEventListener(i, o, Ga);
    }
  };
}
function CC(e, t) {
  let n = Rc.get(e);
  if (!n) {
    n = new sh(), Rc.set(e, n);
    for (const r of jg)
      e.addEventListener(r, n.listener, Ga);
  }
  return n.callbacks.add(t), () => {
    const { callbacks: r, listener: o } = n;
    if (r.delete(t), r.size === 0) {
      for (const i of jg)
        e.removeEventListener(i, o, Ga);
      Rc.delete(e);
    }
  };
}
function EC(e, t, n) {
  const r = n.get(le);
  let o = zr.get(e);
  return Gr = Gr || r.runOutsideAngular(() => new IntersectionObserver((i) => {
    for (const s of i)
      s.isIntersecting && zr.has(s.target) && r.run(zr.get(s.target).listener);
  })), o || (o = new sh(), r.runOutsideAngular(() => Gr.observe(e)), zr.set(e, o), Pc++), o.callbacks.add(t), () => {
    zr.has(e) && (o.callbacks.delete(t), o.callbacks.size === 0 && (Gr?.unobserve(e), zr.delete(e), Pc--), Pc === 0 && (Gr?.disconnect(), Gr = null));
  };
}
function rO(e, t, n) {
  if (n == null)
    return e;
  if (n >= 0)
    return eD(n, e);
  const r = e[t.index];
  ngDevMode && ot(r);
  const o = r[ge] ?? null;
  if (ngDevMode && o !== null) {
    const s = nr(e, t)[xs];
    A(s, pe.Placeholder, "Expected a placeholder to be rendered in this defer block."), tn(o);
  }
  return o;
}
function oO(e, t) {
  const n = ms(T + t, e);
  return ngDevMode && Ww(n), n;
}
function Yo(e, t, n, r, o, i, s) {
  const a = e[_e];
  function u() {
    if (vl(e))
      return;
    const c = nr(e, t), l = c[xs];
    if (l !== So.Initial && l !== pe.Placeholder)
      return;
    const d = rO(e, t, r);
    if (!d) {
      Ba(u, { injector: a });
      return;
    }
    if (vl(d))
      return;
    const f = oO(d, n), h = o(f, () => {
      e !== d && qd(d, h), i();
    }, a);
    e !== d && Cu(d, h), tc(s, c, h);
  }
  Ba(u, { injector: a });
}
function bC(e, t) {
  const r = t[_e].get(Wa), o = () => r.remove(e);
  return r.add(e), o;
}
const iO = () => typeof requestIdleCallback < "u" ? requestIdleCallback : setTimeout, sO = () => typeof requestIdleCallback < "u" ? cancelIdleCallback : clearTimeout;
class Wa {
  constructor() {
    this.executingCallbacks = !1, this.idleId = null, this.current = /* @__PURE__ */ new Set(), this.deferred = /* @__PURE__ */ new Set(), this.ngZone = w(le), this.requestIdleCallbackFn = iO().bind(globalThis), this.cancelIdleCallbackFn = sO().bind(globalThis);
  }
  add(t) {
    (this.executingCallbacks ? this.deferred : this.current).add(t), this.idleId === null && this.scheduleIdleCallback();
  }
  remove(t) {
    const { current: n, deferred: r } = this;
    n.delete(t), r.delete(t), n.size === 0 && r.size === 0 && this.cancelIdleCallback();
  }
  scheduleIdleCallback() {
    const t = () => {
      this.cancelIdleCallback(), this.executingCallbacks = !0;
      for (const n of this.current)
        n();
      if (this.current.clear(), this.executingCallbacks = !1, this.deferred.size > 0) {
        for (const n of this.deferred)
          this.current.add(n);
        this.deferred.clear(), this.scheduleIdleCallback();
      }
    };
    this.idleId = this.requestIdleCallbackFn(() => this.ngZone.run(t));
  }
  cancelIdleCallback() {
    this.idleId !== null && (this.cancelIdleCallbackFn(this.idleId), this.idleId = null);
  }
  ngOnDestroy() {
    this.cancelIdleCallback(), this.current.clear(), this.deferred.clear();
  }
  static {
    this.ɵprov = te({
      token: Wa,
      providedIn: "root",
      factory: () => new Wa()
    });
  }
}
function wC(e) {
  return (t, n) => MC(e, t, n);
}
function MC(e, t, n) {
  const o = n[_e].get(qa), i = () => o.remove(t);
  return o.add(e, t), i;
}
class qa {
  constructor() {
    this.executingCallbacks = !1, this.timeoutId = null, this.invokeTimerAt = null, this.current = [], this.deferred = [];
  }
  add(t, n) {
    const r = this.executingCallbacks ? this.deferred : this.current;
    this.addToQueue(r, Date.now() + t, n), this.scheduleTimer();
  }
  remove(t) {
    const { current: n, deferred: r } = this;
    this.removeFromQueue(n, t) === -1 && this.removeFromQueue(r, t), n.length === 0 && r.length === 0 && this.clearTimeout();
  }
  addToQueue(t, n, r) {
    let o = t.length;
    for (let i = 0; i < t.length; i += 2)
      if (t[i] > n) {
        o = i;
        break;
      }
    yy(t, o, n, r);
  }
  removeFromQueue(t, n) {
    let r = -1;
    for (let o = 0; o < t.length; o += 2)
      if (t[o + 1] === n) {
        r = o;
        break;
      }
    return r > -1 && Bp(t, r, 2), r;
  }
  scheduleTimer() {
    const t = () => {
      this.clearTimeout(), this.executingCallbacks = !0;
      const r = [...this.current], o = Date.now();
      for (let s = 0; s < r.length; s += 2) {
        const a = r[s], u = r[s + 1];
        if (a <= o)
          u();
        else
          break;
      }
      let i = -1;
      for (let s = 0; s < this.current.length && this.current[s] <= o; s += 2)
        i = s + 1;
      if (i >= 0 && Bp(this.current, 0, i + 1), this.executingCallbacks = !1, this.deferred.length > 0) {
        for (let s = 0; s < this.deferred.length; s += 2) {
          const a = this.deferred[s], u = this.deferred[s + 1];
          this.addToQueue(this.current, a, u);
        }
        this.deferred.length = 0;
      }
      this.scheduleTimer();
    };
    if (this.current.length > 0) {
      const r = Date.now(), o = this.current[0];
      if (this.timeoutId === null || // Reschedule a timer in case a queue contains an item with
      // an earlier timestamp and the delta is more than an average
      // frame duration.
      this.invokeTimerAt && this.invokeTimerAt - o > 16) {
        this.clearTimeout();
        const i = Math.max(o - r, 16);
        this.invokeTimerAt = o, this.timeoutId = setTimeout(t, i);
      }
    }
  }
  clearTimeout() {
    this.timeoutId !== null && (clearTimeout(this.timeoutId), this.timeoutId = null);
  }
  ngOnDestroy() {
    this.clearTimeout(), this.current.length = 0, this.deferred.length = 0;
  }
  static {
    this.ɵprov = te({
      token: qa,
      providedIn: "root",
      factory: () => new qa()
    });
  }
}
const _C = new j("DEFER_BLOCK_DEPENDENCY_INTERCEPTOR"), SC = new j(ngDevMode ? "DEFER_BLOCK_CONFIG" : "");
function ah(e) {
  return e.get(SC, null, { optional: !0 })?.behavior === za.Manual ? !1 : Ft(e);
}
let Qa = null;
function TC(e, t, n, r) {
  const o = e.consts;
  n != null && (t.placeholderBlockConfig = Jt(o, n)), r != null && (t.loadingBlockConfig = Jt(o, r)), Qa === null && (Qa = cO);
}
function AC(e, t, n, r, o, i, s, a, u) {
  const c = m(), l = x(), d = e + T;
  if (_o(e, null, 0, 0), l.firstCreatePass) {
    _t("NgDefer");
    const D = {
      primaryTmplIndex: t,
      loadingTmplIndex: r ?? null,
      placeholderTmplIndex: o ?? null,
      errorTmplIndex: i ?? null,
      placeholderBlockConfig: null,
      loadingBlockConfig: null,
      dependencyResolverFn: n ?? null,
      loadingState: Ie.NOT_STARTED,
      loadingPromise: null,
      providers: null
    };
    u?.(l, D, a, s), X1(l, d, D);
  }
  const f = K(), h = c[d];
  kI(h, f, c);
  const p = [
    null,
    // NEXT_DEFER_BLOCK_STATE
    So.Initial,
    // DEFER_BLOCK_STATE
    null,
    // STATE_IS_FROZEN_UNTIL
    null,
    // LOADING_AFTER_CLEANUP_FN
    null,
    // TRIGGER_CLEANUP_FNS
    null
    // PREFETCH_TRIGGER_CLEANUP_FNS
  ];
  J1(c, d, p);
  const g = () => yC(p);
  tc(0, p, () => qd(c, g)), Cu(c, g);
}
function OC(e) {
  const t = m(), n = $t();
  if (be(t, n, e)) {
    const r = $(null);
    try {
      const o = !!e, i = ue(), a = nr(t, i)[xs];
      o === !1 && a === So.Initial ? Ko(t, i) : o === !0 && (a === So.Initial || a === pe.Placeholder) && Jo(t, i);
    } finally {
      $(r);
    }
  }
}
function FC(e) {
  const t = m(), n = $t();
  if (be(t, n, e)) {
    const r = $(null);
    try {
      const o = !!e, i = t[C], s = ue(), a = Dt(i, s);
      o === !0 && a.loadingState === Ie.NOT_STARTED && Ps(a, t, s);
    } finally {
      $(r);
    }
  }
}
function NC() {
  zC(bC);
}
function kC() {
  GC(bC);
}
function RC() {
  const e = m(), t = K(), n = e[C], r = e[_e], o = Dt(n, t);
  (!ah(r) || o.loadingTmplIndex === null) && Ko(e, t), Jo(e, t);
}
function xC() {
  const e = m(), t = K(), n = e[C], r = Dt(n, t);
  r.loadingState === Ie.NOT_STARTED && rc(r, e, t);
}
function PC(e) {
  zC(wC(e));
}
function LC(e) {
  GC(wC(e));
}
function jC(e, t) {
  const n = m(), r = K();
  Ko(n, r), Yo(
    n,
    r,
    e,
    t,
    CC,
    () => Jo(n, r),
    0
    /* TriggerType.Regular */
  );
}
function $C(e, t) {
  const n = m(), r = K(), o = n[C], i = Dt(o, r);
  i.loadingState === Ie.NOT_STARTED && Yo(
    n,
    r,
    e,
    t,
    CC,
    () => Ps(i, n, r),
    1
    /* TriggerType.Prefetch */
  );
}
function BC(e, t) {
  const n = m(), r = K();
  Ko(n, r), Yo(
    n,
    r,
    e,
    t,
    IC,
    () => Jo(n, r),
    0
    /* TriggerType.Regular */
  );
}
function HC(e, t) {
  const n = m(), r = K(), o = n[C], i = Dt(o, r);
  i.loadingState === Ie.NOT_STARTED && Yo(
    n,
    r,
    e,
    t,
    IC,
    () => Ps(i, n, r),
    1
    /* TriggerType.Prefetch */
  );
}
function VC(e, t) {
  const n = m(), r = K();
  Ko(n, r), Yo(
    n,
    r,
    e,
    t,
    EC,
    () => Jo(n, r),
    0
    /* TriggerType.Regular */
  );
}
function UC(e, t) {
  const n = m(), r = K(), o = n[C], i = Dt(o, r);
  i.loadingState === Ie.NOT_STARTED && Yo(
    n,
    r,
    e,
    t,
    EC,
    () => Ps(i, n, r),
    1
    /* TriggerType.Prefetch */
  );
}
function zC(e) {
  const t = m(), n = K();
  if (Ko(t, n), Ft(t[_e])) {
    const r = e(() => Jo(t, n), t), o = nr(t, n);
    tc(0, o, r);
  }
}
function GC(e) {
  const t = m();
  if (Ft(t[_e])) {
    const n = K(), r = t[C], o = Dt(r, n);
    if (o.loadingState === Ie.NOT_STARTED) {
      const i = nr(t, n), a = e(() => Ps(o, t, n), t);
      tc(1, i, a);
    }
  }
}
function fn(e, t, n, r = !1) {
  const o = n[Ce], i = o[C];
  if (vl(o))
    return;
  ngDevMode && Ye(t, o);
  const s = nr(o, t);
  ngDevMode && E(s, "Expected a defer block state defined");
  const a = s[xs];
  if (Bg(a, e) && Bg(s[ro] ?? -1, e)) {
    const u = o[_e], c = Dt(i, t), l = !r && Ft(u) && (DC(c) !== null || Xl(c, pe.Loading) !== null || Xl(c, pe.Placeholder));
    ngDevMode && l && E(Qa, "Expected scheduling function to be defined");
    const d = l ? Qa : WC;
    try {
      d(e, s, n, t, o);
    } catch (f) {
      Hu(o, f);
    }
  }
}
function aO(e) {
  return e instanceof Ku && typeof e.injector.__ngOutletInjector == "function";
}
function uO(e, t) {
  return e.injector.__ngOutletInjector(t);
}
function WC(e, t, n, r, o) {
  const i = eO(e, o, r);
  if (i !== null) {
    t[xs] = e;
    const s = o[C], a = i + T, u = ys(s, a), c = 0;
    Lf(n, c);
    let l;
    if (e === pe.Complete) {
      const h = Dt(s, r), p = h.providers;
      if (p && p.length > 0) {
        const g = o[_e], D = aO(g), I = D ? g : g.get(Pt);
        l = I.get(Va).getOrCreateInjector(h, I, p, ngDevMode ? "DeferBlock Injector" : ""), D && (l = uO(g, l));
      }
    }
    const d = wo(n, u.tView.ssrId), f = _s(o, u, null, { dehydratedView: d, injector: l });
    Ss(n, f, c, Eo(u, d)), Ts(f);
  }
}
function cO(e, t, n, r, o) {
  const i = Date.now(), s = o[C], a = Dt(s, r);
  if (t[hi] === null || t[hi] <= i) {
    t[hi] = null;
    const u = DC(a), c = t[Qs] !== null;
    if (e === pe.Loading && u !== null && !c) {
      t[ro] = e;
      const l = $g(u, t, r, n, o);
      t[Qs] = l;
    } else {
      e > pe.Loading && c && (t[Qs](), t[Qs] = null, t[ro] = null), WC(e, t, n, r, o);
      const l = Xl(a, e);
      l !== null && (t[hi] = i + l, $g(l, t, r, n, o));
    }
  } else
    t[ro] = e;
}
function $g(e, t, n, r, o) {
  return MC(e, () => {
    const s = t[ro];
    t[hi] = null, t[ro] = null, s !== null && fn(s, n, r);
  }, o);
}
function Bg(e, t) {
  return e < t;
}
function Ps(e, t, n) {
  t[_e] && ah(t[_e]) && rc(e, t, n);
}
function rc(e, t, n) {
  const r = t[_e], o = t[C];
  if (e.loadingState !== Ie.NOT_STARTED)
    return e.loadingPromise ?? Promise.resolve();
  const i = nr(t, n), s = tO(o, e);
  e.loadingState = Ie.IN_PROGRESS, Jl(1, i);
  let a = e.dependencyResolverFn;
  if (ngDevMode) {
    const l = r.get(_C, null, { optional: !0 });
    l && (a = l.intercept(a));
  }
  const u = r.get(Rt), c = u.add();
  return a ? (e.loadingPromise = Promise.allSettled(a()).then((l) => {
    let d = !1;
    const f = [], h = [];
    for (const p of l)
      if (p.status === "fulfilled") {
        const g = p.value, D = V(g) || Fe(g);
        if (D)
          f.push(D);
        else {
          const I = dt(g);
          I && h.push(I);
        }
      } else {
        d = !0;
        break;
      }
    if (e.loadingPromise = null, u.remove(c), d) {
      if (e.loadingState = Ie.FAILED, e.errorTmplIndex === null) {
        const p = ku(t), g = new v(750, ngDevMode && `Loading dependencies for \`@defer\` block failed, but no \`@error\` block was configured${p}. Consider using the \`@error\` block to render an error state.`);
        Hu(t, g);
      }
    } else {
      e.loadingState = Ie.COMPLETE;
      const p = s.tView;
      if (f.length > 0) {
        p.directiveRegistry = Pg(p.directiveRegistry, f);
        const g = f.map((I) => I.type), D = Rd(!1, ...g);
        e.providers = D;
      }
      h.length > 0 && (p.pipeRegistry = Pg(p.pipeRegistry, h));
    }
  }), e.loadingPromise) : (e.loadingPromise = Promise.resolve().then(() => {
    e.loadingPromise = null, e.loadingState = Ie.COMPLETE, u.remove(c);
  }), e.loadingPromise);
}
function Ko(e, t) {
  const n = e[t.index];
  ngDevMode && ot(n), fn(pe.Placeholder, t, n);
}
function Hg(e, t, n) {
  ngDevMode && E(e.loadingPromise, "Expected loading Promise to exist on this defer block"), e.loadingPromise.then(() => {
    e.loadingState === Ie.COMPLETE ? (ngDevMode && vC(e), fn(pe.Complete, t, n)) : e.loadingState === Ie.FAILED && fn(pe.Error, t, n);
  });
}
function Jo(e, t) {
  const n = e[C], r = e[t.index], o = e[_e];
  if (ngDevMode && ot(r), !ah(o))
    return;
  const i = nr(e, t), s = Dt(n, t);
  switch (yC(i), s.loadingState) {
    case Ie.NOT_STARTED:
      fn(pe.Loading, t, r), rc(s, e, t), s.loadingState === Ie.IN_PROGRESS && Hg(s, t, r);
      break;
    case Ie.IN_PROGRESS:
      fn(pe.Loading, t, r), Hg(s, t, r);
      break;
    case Ie.COMPLETE:
      ngDevMode && vC(s), fn(pe.Complete, t, r);
      break;
    case Ie.FAILED:
      fn(pe.Error, t, r);
      break;
    default:
      ngDevMode && S("Unknown defer block state");
  }
}
function uh(e, t, n, r) {
  const o = m(), i = $t();
  if (be(o, i, t)) {
    const s = x(), a = ue();
    sn(a, o, e, t, n, r), ngDevMode && ve(s.data, a, "attr." + e, i);
  }
  return uh;
}
function Xo(e, t) {
  ngDevMode && Qn(2, t.length, "should have at least 3 values"), ngDevMode && A(t.length % 2, 1, "should have an odd number of values");
  let n = !1, r = X();
  for (let i = 1; i < t.length; i += 2)
    n = be(e, r++, t[i]) || n;
  if (uD(r), !n)
    return O;
  let o = t[0];
  for (let i = 1; i < t.length; i += 2)
    o += L(t[i]) + t[i + 1];
  return o;
}
function ei(e, t, n, r) {
  return be(e, $t(), n) ? t + L(n) + r : O;
}
function ti(e, t, n, r, o, i) {
  const s = X(), a = Er(e, s, n, o);
  return wn(2), a ? t + L(n) + r + L(o) + i : O;
}
function ni(e, t, n, r, o, i, s, a) {
  const u = X(), c = ec(e, u, n, o, s);
  return wn(3), c ? t + L(n) + r + L(o) + i + L(s) + a : O;
}
function ri(e, t, n, r, o, i, s, a, u, c) {
  const l = X(), d = wt(e, l, n, o, s, u);
  return wn(4), d ? t + L(n) + r + L(o) + i + L(s) + a + L(u) + c : O;
}
function oi(e, t, n, r, o, i, s, a, u, c, l, d) {
  const f = X();
  let h = wt(e, f, n, o, s, u);
  return h = be(e, f + 4, l) || h, wn(5), h ? t + L(n) + r + L(o) + i + L(s) + a + L(u) + c + L(l) + d : O;
}
function ii(e, t, n, r, o, i, s, a, u, c, l, d, f, h) {
  const p = X();
  let g = wt(e, p, n, o, s, u);
  return g = Er(e, p + 4, l, f) || g, wn(6), g ? t + L(n) + r + L(o) + i + L(s) + a + L(u) + c + L(l) + d + L(f) + h : O;
}
function si(e, t, n, r, o, i, s, a, u, c, l, d, f, h, p, g) {
  const D = X();
  let I = wt(e, D, n, o, s, u);
  return I = ec(e, D + 4, l, f, p) || I, wn(7), I ? t + L(n) + r + L(o) + i + L(s) + a + L(u) + c + L(l) + d + L(f) + h + L(p) + g : O;
}
function ai(e, t, n, r, o, i, s, a, u, c, l, d, f, h, p, g, D, I) {
  const y = X();
  let M = wt(e, y, n, o, s, u);
  return M = wt(e, y + 4, l, f, p, D) || M, wn(8), M ? t + L(n) + r + L(o) + i + L(s) + a + L(u) + c + L(l) + d + L(f) + h + L(p) + g + L(D) + I : O;
}
function ch(e, t, n, r, o, i) {
  const s = m(), a = ei(s, t, n, r);
  if (a !== O) {
    const u = ue();
    sn(u, s, e, a, o, i), ngDevMode && ve(x().data, u, "attr." + e, X() - 1, t, r);
  }
  return ch;
}
function lh(e, t, n, r, o, i, s, a) {
  const u = m(), c = ti(u, t, n, r, o, i);
  if (c !== O) {
    const l = ue();
    sn(l, u, e, c, s, a), ngDevMode && ve(x().data, l, "attr." + e, X() - 2, t, r, i);
  }
  return lh;
}
function dh(e, t, n, r, o, i, s, a, u, c) {
  const l = m(), d = ni(l, t, n, r, o, i, s, a);
  if (d !== O) {
    const f = ue();
    sn(f, l, e, d, u, c), ngDevMode && ve(x().data, f, "attr." + e, X() - 3, t, r, i, a);
  }
  return dh;
}
function fh(e, t, n, r, o, i, s, a, u, c, l, d) {
  const f = m(), h = ri(f, t, n, r, o, i, s, a, u, c);
  if (h !== O) {
    const p = ue();
    sn(p, f, e, h, l, d), ngDevMode && ve(x().data, p, "attr." + e, X() - 4, t, r, i, a, c);
  }
  return fh;
}
function hh(e, t, n, r, o, i, s, a, u, c, l, d, f, h) {
  const p = m(), g = oi(p, t, n, r, o, i, s, a, u, c, l, d);
  if (g !== O) {
    const D = ue();
    sn(D, p, e, g, f, h), ngDevMode && ve(x().data, D, "attr." + e, X() - 5, t, r, i, a, c, d);
  }
  return hh;
}
function ph(e, t, n, r, o, i, s, a, u, c, l, d, f, h, p, g) {
  const D = m(), I = ii(D, t, n, r, o, i, s, a, u, c, l, d, f, h);
  if (I !== O) {
    const y = ue();
    sn(y, D, e, I, p, g), ngDevMode && ve(x().data, y, "attr." + e, X() - 6, t, r, i, a, c, d, h);
  }
  return ph;
}
function gh(e, t, n, r, o, i, s, a, u, c, l, d, f, h, p, g, D, I) {
  const y = m(), M = si(y, t, n, r, o, i, s, a, u, c, l, d, f, h, p, g);
  if (M !== O) {
    const k = ue();
    sn(k, y, e, M, D, I), ngDevMode && ve(x().data, k, "attr." + e, X() - 7, t, r, i, a, c, d, h, g);
  }
  return gh;
}
function mh(e, t, n, r, o, i, s, a, u, c, l, d, f, h, p, g, D, I, y, M) {
  const k = m(), G = ai(k, t, n, r, o, i, s, a, u, c, l, d, f, h, p, g, D, I);
  if (G !== O) {
    const ce = ue();
    sn(ce, k, e, G, y, M), ngDevMode && ve(x().data, ce, "attr." + e, X() - 8, t, r, i, a, c, d, h, g, I);
  }
  return mh;
}
function yh(e, t, n, r) {
  const o = m(), i = Xo(o, t);
  if (i !== O) {
    const s = ue();
    if (sn(s, o, e, i, n, r), ngDevMode) {
      const a = [t[0]];
      for (let u = 2; u < t.length; u += 2)
        a.push(t[u]);
      ve(x().data, s, "attr." + e, X() - a.length + 1, ...a);
    }
  }
  return yh;
}
function Zs(e, t) {
  return ngDevMode && Ni(
    e,
    0,
    32767
    /* StylingRange.UNSIGNED_MASK */
  ), ngDevMode && Ni(
    t,
    0,
    32767
    /* StylingRange.UNSIGNED_MASK */
  ), e << 17 | t << 2;
}
function br(e) {
  return ngDevMode && J(e, "expected number"), e >> 17 & 32767;
}
function lO(e) {
  return ngDevMode && J(e, "expected number"), (e & 2) == 2;
}
function dO(e, t) {
  return ngDevMode && J(e, "expected number"), ngDevMode && Ni(
    t,
    0,
    32767
    /* StylingRange.UNSIGNED_MASK */
  ), e & 131071 | t << 17;
}
function ed(e) {
  return ngDevMode && J(e, "expected number"), e | 2;
}
function wr(e) {
  return ngDevMode && J(e, "expected number"), (e & 131068) >> 2;
}
function Lc(e, t) {
  return ngDevMode && J(e, "expected number"), ngDevMode && Ni(
    t,
    0,
    32767
    /* StylingRange.UNSIGNED_MASK */
  ), e & -131069 | //
  t << 2;
}
function fO(e) {
  return ngDevMode && J(e, "expected number"), (e & 1) === 1;
}
function td(e) {
  return ngDevMode && J(e, "expected number"), e | 1;
}
function hO(e, t, n, r, o, i) {
  ngDevMode && Vd(x());
  let s = i ? t.classBindings : t.styleBindings, a = br(s), u = wr(s);
  e[r] = n;
  let c = !1, l;
  if (Array.isArray(n)) {
    const d = n;
    l = d[1], (l === null || fs(d, l) > 0) && (c = !0);
  } else
    l = n;
  if (o)
    if (u !== 0) {
      const f = br(e[a + 1]);
      e[r + 1] = Zs(f, a), f !== 0 && (e[f + 1] = Lc(e[f + 1], r)), e[a + 1] = dO(e[a + 1], r);
    } else
      e[r + 1] = Zs(a, 0), a !== 0 && (e[a + 1] = Lc(e[a + 1], r)), a = r;
  else
    e[r + 1] = Zs(u, 0), ngDevMode && A(a !== 0 && u === 0, !1, "Adding template bindings after hostBindings is not allowed."), a === 0 ? a = r : e[u + 1] = Lc(e[u + 1], r), u = r;
  c && (e[r + 1] = ed(e[r + 1])), Vg(e, l, r, !0), Vg(e, l, r, !1), pO(t, l, e, r, i), s = Zs(a, u), i ? t.classBindings = s : t.styleBindings = s;
}
function pO(e, t, n, r, o) {
  const i = o ? e.residualClasses : e.residualStyles;
  i != null && typeof t == "string" && fs(i, t) >= 0 && (n[r + 1] = td(n[r + 1]));
}
function Vg(e, t, n, r) {
  const o = e[n + 1], i = t === null;
  let s = r ? br(o) : wr(o), a = !1;
  for (; s !== 0 && (a === !1 || i); ) {
    ngDevMode && Ee(e, s);
    const u = e[s], c = e[s + 1];
    gO(u, t) && (a = !0, e[s + 1] = r ? td(c) : ed(c)), s = r ? br(c) : wr(c);
  }
  a && (e[n + 1] = r ? ed(o) : td(o));
}
function gO(e, t) {
  return ngDevMode && jt(Array.isArray(t), !0, "Expected that 'tStylingKey' has been unwrapped"), e === null || // If the cursor is `null` it means that we have map at that
  // location so we must assume that we have a match.
  t == null || // If `tStylingKey` is `null` then it is a map therefor assume that it
  // contains a match.
  (Array.isArray(e) ? e[1] : e) === t ? !0 : Array.isArray(e) && typeof t == "string" ? fs(e, t) >= 0 : !1;
}
const Te = {
  textEnd: 0,
  key: 0,
  keyEnd: 0,
  value: 0,
  valueEnd: 0
};
function qC(e) {
  return e.substring(Te.key, Te.keyEnd);
}
function mO(e) {
  return e.substring(Te.value, Te.valueEnd);
}
function yO(e) {
  return YC(e), QC(e, To(e, 0, Te.textEnd));
}
function QC(e, t) {
  const n = Te.textEnd;
  return n === t ? -1 : (t = Te.keyEnd = vO(e, Te.key = t, n), To(e, t, n));
}
function DO(e) {
  return YC(e), ZC(e, To(e, 0, Te.textEnd));
}
function ZC(e, t) {
  const n = Te.textEnd;
  let r = Te.key = To(e, t, n);
  return n === r ? -1 : (r = Te.keyEnd = IO(e, r, n), r = Ug(
    e,
    r,
    n,
    58
    /* CharCode.COLON */
  ), r = Te.value = To(e, r, n), r = Te.valueEnd = CO(e, r, n), Ug(
    e,
    r,
    n,
    59
    /* CharCode.SEMI_COLON */
  ));
}
function YC(e) {
  Te.key = 0, Te.keyEnd = 0, Te.value = 0, Te.valueEnd = 0, Te.textEnd = e.length;
}
function To(e, t, n) {
  for (; t < n && e.charCodeAt(t) <= 32; )
    t++;
  return t;
}
function vO(e, t, n) {
  for (; t < n && e.charCodeAt(t) > 32; )
    t++;
  return t;
}
function IO(e, t, n) {
  let r;
  for (; t < n && ((r = e.charCodeAt(t)) === 45 || r === 95 || (r & -33) >= 65 && (r & -33) <= 90 || r >= 48 && r <= 57); )
    t++;
  return t;
}
function Ug(e, t, n, r) {
  return t = To(e, t, n), t < n && (ngDevMode && e.charCodeAt(t) !== r && KC(e, String.fromCharCode(r), t), t++), t;
}
function CO(e, t, n) {
  let r = -1, o = -1, i = -1, s = t, a = s;
  for (; s < n; ) {
    const u = e.charCodeAt(s++);
    if (u === 59)
      return a;
    u === 34 || u === 39 ? a = s = zg(e, u, s, n) : t === s - 4 && // We have seen only 4 characters so far "URL(" (Ignore "foo_URL()")
    i === 85 && o === 82 && r === 76 && u === 40 ? a = s = zg(e, 41, s, n) : u > 32 && (a = s), i = o, o = r, r = u & -33;
  }
  return a;
}
function zg(e, t, n, r) {
  let o = -1, i = n;
  for (; i < r; ) {
    const s = e.charCodeAt(i++);
    if (s == t && o !== 92)
      return i;
    s == 92 && o === 92 ? o = 0 : o = s;
  }
  throw ngDevMode ? KC(e, String.fromCharCode(t), r) : new Error();
}
function KC(e, t, n) {
  throw ngDevMode && A(typeof e == "string", !0, "String expected here"), S(`Malformed style at location ${n} in string '` + e.substring(0, n) + "[>>" + e.substring(n, n + 1) + "<<]" + e.slice(n + 1) + `'. Expecting '${t}'.`);
}
function Dh(e, t, n) {
  const r = m(), o = $t();
  if (be(r, o, t)) {
    const i = x(), s = ue();
    st(i, s, r, e, t, r[F], n, !1), ngDevMode && ve(i.data, s, e, o);
  }
  return Dh;
}
function nd(e, t, n, r, o) {
  const i = t.inputs, s = o ? "class" : "style";
  Pf(e, n, i[s], s, r);
}
function vh(e, t, n) {
  return Ht(e, t, n, !1), vh;
}
function Ih(e, t) {
  return Ht(e, t, null, !0), Ih;
}
function Bt(e) {
  Vt(tE, EO, e, !1);
}
function EO(e, t) {
  for (let n = DO(t); n >= 0; n = ZC(t, n))
    tE(e, qC(t), mO(t));
}
function JC(e) {
  Vt(TO, un, e, !0);
}
function un(e, t) {
  for (let n = yO(t); n >= 0; n = QC(t, n))
    yt(e, qC(t), !0);
}
function Ht(e, t, n, r) {
  const o = m(), i = x(), s = wn(2);
  if (i.firstUpdatePass && eE(i, e, s, r), t !== O && be(o, s, t)) {
    const a = i.data[He()];
    nE(i, a, o, o[F], e, o[s + 1] = OO(t, n), r, s);
  }
}
function Vt(e, t, n, r) {
  const o = x(), i = wn(2);
  o.firstUpdatePass && eE(o, null, i, r);
  const s = m();
  if (n !== O && be(s, i, n)) {
    const a = o.data[He()];
    if (rE(a, r) && !XC(o, i)) {
      if (ngDevMode) {
        const c = o.data[i];
        A(Array.isArray(c) ? c[1] : c, !1, "Styling linked list shadow input should be marked as 'false'");
      }
      let u = r ? a.classesWithoutHost : a.stylesWithoutHost;
      ngDevMode && r === !1 && u !== null && A(u.endsWith(";"), !0, "Expecting static portion to end with ';'"), u !== null && (n = cl(u, n || "")), nd(o, a, s, n, r);
    } else
      AO(o, a, s, s[F], s[i + 1], s[i + 1] = SO(e, t, n), r, i);
  }
}
function XC(e, t) {
  return t >= e.expandoStartIndex;
}
function eE(e, t, n, r) {
  ngDevMode && Vd(e);
  const o = e.data;
  if (o[n + 1] === null) {
    const i = o[He()];
    ngDevMode && E(i, "TNode expected");
    const s = XC(e, n);
    rE(i, r) && t === null && !s && (t = !1), t = bO(o, i, t, r), hO(o, i, t, n, s, r);
  }
}
function bO(e, t, n, r) {
  const o = Yd(e);
  let i = r ? t.residualClasses : t.residualStyles;
  if (o === null)
    (r ? t.classBindings : t.styleBindings) === 0 && (n = jc(null, e, t, n, r), n = Yi(n, t.attrs, r), i = null);
  else {
    const s = t.directiveStylingLast;
    if (s === -1 || e[s] !== o)
      if (n = jc(o, e, t, n, r), i === null) {
        let u = wO(e, t, r);
        u !== void 0 && Array.isArray(u) && (u = jc(null, e, t, u[1], r), u = Yi(u, t.attrs, r), MO(e, t, r, u));
      } else
        i = _O(e, t, r);
  }
  return i !== void 0 && (r ? t.residualClasses = i : t.residualStyles = i), n;
}
function wO(e, t, n) {
  const r = n ? t.classBindings : t.styleBindings;
  if (wr(r) !== 0)
    return e[br(r)];
}
function MO(e, t, n, r) {
  const o = n ? t.classBindings : t.styleBindings;
  ngDevMode && jt(wr(o), 0, "Expecting to have at least one template styling binding."), e[br(o)] = r;
}
function _O(e, t, n) {
  let r;
  const o = t.directiveEnd;
  ngDevMode && jt(t.directiveStylingLast, -1, "By the time this function gets called at least one hostBindings-node styling instruction must have executed.");
  for (let i = 1 + t.directiveStylingLast; i < o; i++) {
    const s = e[i].hostAttrs;
    r = Yi(r, s, n);
  }
  return Yi(r, t.attrs, n);
}
function jc(e, t, n, r, o) {
  let i = null;
  const s = n.directiveEnd;
  let a = n.directiveStylingLast;
  for (a === -1 ? a = n.directiveStart : a++; a < s && (i = t[a], ngDevMode && E(i, "expected to be defined"), r = Yi(r, i.hostAttrs, o), i !== e); )
    a++;
  return e !== null && (n.directiveStylingLast = a), r;
}
function Yi(e, t, n) {
  const r = n ? 1 : 2;
  let o = -1;
  if (t !== null)
    for (let i = 0; i < t.length; i++) {
      const s = t[i];
      typeof s == "number" ? o = s : o === r && (Array.isArray(e) || (e = e === void 0 ? [] : ["", e]), yt(e, s, n ? !0 : t[++i]));
    }
  return e === void 0 ? null : e;
}
function SO(e, t, n) {
  if (n == null || n === "")
    return q;
  const r = [], o = on(n);
  if (Array.isArray(o))
    for (let i = 0; i < o.length; i++)
      e(r, o[i], !0);
  else if (typeof o == "object")
    for (const i in o)
      o.hasOwnProperty(i) && e(r, i, o[i]);
  else typeof o == "string" ? t(r, o) : ngDevMode && S("Unsupported styling type " + typeof o + ": " + o);
  return r;
}
function tE(e, t, n) {
  yt(e, t, on(n));
}
function TO(e, t, n) {
  const r = String(t);
  r !== "" && !r.includes(" ") && yt(e, r, n);
}
function AO(e, t, n, r, o, i, s, a) {
  o === O && (o = q);
  let u = 0, c = 0, l = 0 < o.length ? o[0] : null, d = 0 < i.length ? i[0] : null;
  for (; l !== null || d !== null; ) {
    ngDevMode && Qn(u, 999, "Are we stuck in infinite loop?"), ngDevMode && Qn(c, 999, "Are we stuck in infinite loop?");
    const f = u < o.length ? o[u + 1] : void 0, h = c < i.length ? i[c + 1] : void 0;
    let p = null, g;
    l === d ? (u += 2, c += 2, f !== h && (p = d, g = h)) : d === null || l !== null && l < d ? (u += 2, p = l) : (ngDevMode && E(d, "Expecting to have a valid key"), c += 2, p = d, g = h), p !== null && nE(e, t, n, r, p, g, s, a), l = u < o.length ? o[u] : null, d = c < i.length ? i[c] : null;
  }
}
function nE(e, t, n, r, o, i, s, a) {
  if (!(t.type & 3))
    return;
  const u = e.data, c = u[a + 1], l = fO(c) ? Gg(u, t, n, o, wr(c), s) : void 0;
  if (!Za(l)) {
    Za(i) || lO(c) && (i = Gg(u, null, n, o, a, s));
    const d = ms(He(), n);
    _T(r, s, d, o, i);
  }
}
function Gg(e, t, n, r, o, i) {
  const s = t === null;
  let a;
  for (; o > 0; ) {
    const u = e[o], c = Array.isArray(u), l = c ? u[1] : u, d = l === null;
    let f = n[o + 1];
    f === O && (f = d ? q : void 0);
    let h = d ? bc(f, r) : l === r ? f : void 0;
    if (c && !Za(h) && (h = bc(u, r)), Za(h) && (a = h, s))
      return a;
    const p = e[o + 1];
    o = s ? br(p) : wr(p);
  }
  if (t !== null) {
    let u = i ? t.residualClasses : t.residualStyles;
    u != null && (a = bc(u, r));
  }
  return a;
}
function Za(e) {
  return e !== void 0;
}
function OO(e, t) {
  return e == null || e === "" || (typeof t == "string" ? e = e + t : typeof e == "object" && (e = Q(on(e)))), e;
}
function rE(e, t) {
  return (e.flags & (t ? 8 : 16)) !== 0;
}
function oE(e, t, n) {
  const r = m(), o = ei(r, e, t, n);
  Vt(yt, un, o, !0);
}
function iE(e, t, n, r, o) {
  const i = m(), s = ti(i, e, t, n, r, o);
  Vt(yt, un, s, !0);
}
function sE(e, t, n, r, o, i, s) {
  const a = m(), u = ni(a, e, t, n, r, o, i, s);
  Vt(yt, un, u, !0);
}
function aE(e, t, n, r, o, i, s, a, u) {
  const c = m(), l = ri(c, e, t, n, r, o, i, s, a, u);
  Vt(yt, un, l, !0);
}
function uE(e, t, n, r, o, i, s, a, u, c, l) {
  const d = m(), f = oi(d, e, t, n, r, o, i, s, a, u, c, l);
  Vt(yt, un, f, !0);
}
function cE(e, t, n, r, o, i, s, a, u, c, l, d, f) {
  const h = m(), p = ii(h, e, t, n, r, o, i, s, a, u, c, l, d, f);
  Vt(yt, un, p, !0);
}
function lE(e, t, n, r, o, i, s, a, u, c, l, d, f, h, p) {
  const g = m(), D = si(g, e, t, n, r, o, i, s, a, u, c, l, d, f, h, p);
  Vt(yt, un, D, !0);
}
function dE(e, t, n, r, o, i, s, a, u, c, l, d, f, h, p, g, D) {
  const I = m(), y = ai(I, e, t, n, r, o, i, s, a, u, c, l, d, f, h, p, g, D);
  Vt(yt, un, y, !0);
}
function fE(e) {
  const t = m(), n = Xo(t, e);
  Vt(yt, un, n, !0);
}
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function hE() {
  const e = m()[De][ie];
  return ngDevMode && E(e, "Expected component instance to be defined"), e;
}
class FO {
  destroy(t) {
  }
  updateValue(t, n) {
  }
  // operations below could be implemented on top of the operations defined so far, but having
  // them explicitly allow clear expression of intent and potentially more performant
  // implementations
  swap(t, n) {
    const r = Math.min(t, n), o = Math.max(t, n), i = this.detach(o);
    if (o - r > 1) {
      const s = this.detach(r);
      this.attach(r, i), this.attach(o, s);
    } else
      this.attach(r, i);
  }
  move(t, n) {
    this.attach(n, this.detach(t));
  }
}
function $c(e, t, n, r, o) {
  return e === n && Object.is(t, r) ? 1 : Object.is(o(e, t), o(n, r)) ? -1 : 0;
}
function NO(e, t, n) {
  let r, o, i = 0, s = e.length - 1;
  if (Array.isArray(t)) {
    let a = t.length - 1;
    for (; i <= s && i <= a; ) {
      const u = e.at(i), c = t[i], l = $c(i, u, i, c, n);
      if (l !== 0) {
        l < 0 && e.updateValue(i, c), i++;
        continue;
      }
      const d = e.at(s), f = t[a], h = $c(s, d, a, f, n);
      if (h !== 0) {
        h < 0 && e.updateValue(s, f), s--, a--;
        continue;
      }
      const p = n(i, u), g = n(s, d), D = n(i, c);
      if (Object.is(D, g)) {
        const I = n(a, f);
        Object.is(I, p) ? (e.swap(i, s), e.updateValue(s, f), a--, s--) : e.move(s, i), e.updateValue(i, c), i++;
        continue;
      }
      if (r ??= new Qg(), o ??= qg(e, i, s, n), rd(e, r, i, D))
        e.updateValue(i, c), i++, s++;
      else if (o.has(D))
        r.set(p, e.detach(i)), s--;
      else {
        const I = e.create(i, t[i]);
        e.attach(i, I), i++, s++;
      }
    }
    for (; i <= a; )
      Wg(e, r, n, i, t[i]), i++;
  } else if (t != null) {
    const a = t[Symbol.iterator]();
    let u = a.next();
    for (; !u.done && i <= s; ) {
      const c = e.at(i), l = u.value, d = $c(i, c, i, l, n);
      if (d !== 0)
        d < 0 && e.updateValue(i, l), i++, u = a.next();
      else {
        r ??= new Qg(), o ??= qg(e, i, s, n);
        const f = n(i, l);
        if (rd(e, r, i, f))
          e.updateValue(i, l), i++, s++, u = a.next();
        else if (!o.has(f))
          e.attach(i, e.create(i, l)), i++, s++, u = a.next();
        else {
          const h = n(i, c);
          r.set(h, e.detach(i)), s--;
        }
      }
    }
    for (; !u.done; )
      Wg(e, r, n, e.length, u.value), u = a.next();
  }
  for (; i <= s; )
    e.destroy(e.detach(s--));
  r?.forEach((a) => {
    e.destroy(a);
  });
}
function rd(e, t, n, r) {
  return t !== void 0 && t.has(r) ? (e.attach(n, t.get(r)), t.delete(r), !0) : !1;
}
function Wg(e, t, n, r, o) {
  if (rd(e, t, r, n(r, o)))
    e.updateValue(r, o);
  else {
    const i = e.create(r, o);
    e.attach(r, i);
  }
}
function qg(e, t, n, r) {
  const o = /* @__PURE__ */ new Set();
  for (let i = t; i <= n; i++)
    o.add(r(i, e.at(i)));
  return o;
}
class Qg {
  constructor() {
    this.kvMap = /* @__PURE__ */ new Map(), this._vMap = void 0;
  }
  has(t) {
    return this.kvMap.has(t);
  }
  delete(t) {
    if (!this.has(t))
      return !1;
    const n = this.kvMap.get(t);
    return this._vMap !== void 0 && this._vMap.has(n) ? (this.kvMap.set(t, this._vMap.get(n)), this._vMap.delete(n)) : this.kvMap.delete(t), !0;
  }
  get(t) {
    return this.kvMap.get(t);
  }
  set(t, n) {
    if (this.kvMap.has(t)) {
      let r = this.kvMap.get(t);
      ngDevMode && jr(r, n, `Detected a duplicated value ${n} for the key ${t}`), this._vMap === void 0 && (this._vMap = /* @__PURE__ */ new Map());
      const o = this._vMap;
      for (; o.has(r); )
        r = o.get(r);
      o.set(r, n);
    } else
      this.kvMap.set(t, n);
  }
  forEach(t) {
    for (let [n, r] of this.kvMap)
      if (t(r, n), this._vMap !== void 0) {
        const o = this._vMap;
        for (; o.has(r); )
          r = o.get(r), t(r, n);
      }
  }
}
function pE(e, t, n) {
  _t("NgControlFlow");
  const r = m(), o = $t(), i = od(r, T + e), s = 0;
  if (be(r, o, t)) {
    const a = $(null);
    try {
      if (Lf(i, s), t !== -1) {
        const u = id(r[C], T + t), c = wo(i, u.tView.ssrId), l = _s(r, u, n, { dehydratedView: c });
        Ss(i, l, s, Eo(u, c));
      }
    } finally {
      $(a);
    }
  } else {
    const a = cI(i, s);
    a !== void 0 && (a[ie] = n);
  }
}
class kO {
  constructor(t, n, r) {
    this.lContainer = t, this.$implicit = n, this.$index = r;
  }
  get $count() {
    return this.lContainer.length - ge;
  }
}
function gE(e) {
  return e;
}
function mE(e, t) {
  return t;
}
class RO {
  constructor(t, n, r) {
    this.hasEmptyBlock = t, this.trackByFn = n, this.liveCollection = r;
  }
}
function yE(e, t, n, r, o, i, s, a, u, c, l, d, f) {
  _t("NgControlFlow"), ngDevMode && uy(s, `A track expression must be a function, was ${typeof s} instead.`);
  const h = u !== void 0, p = m(), g = a ? (
    // We only want to bind when necessary, because it produces a
    // new function. For pure functions it's not necessary.
    s.bind(p[De][ie])
  ) : s, D = new RO(h, g);
  p[T + e] = D, _o(e + 1, t, n, r, o, i), h && (ngDevMode && E(c, "Missing number of declarations for the empty repeater block."), ngDevMode && E(l, "Missing number of bindings for the empty repeater block."), _o(e + 2, u, c, l, d, f));
}
class xO extends FO {
  constructor(t, n, r) {
    super(), this.lContainer = t, this.hostLView = n, this.templateTNode = r, this.needsIndexUpdate = !1;
  }
  get length() {
    return this.lContainer.length - ge;
  }
  at(t) {
    return this.getLView(t)[ie].$implicit;
  }
  attach(t, n) {
    const r = n[gt];
    this.needsIndexUpdate ||= t !== this.length, Ss(this.lContainer, n, t, Eo(this.templateTNode, r));
  }
  detach(t) {
    return this.needsIndexUpdate ||= t !== this.length - 1, PO(this.lContainer, t);
  }
  create(t, n) {
    const r = wo(this.lContainer, this.templateTNode.tView.ssrId);
    return _s(this.hostLView, this.templateTNode, new kO(this.lContainer, n, t), { dehydratedView: r });
  }
  destroy(t) {
    xu(t[C], t);
  }
  updateValue(t, n) {
    this.getLView(t)[ie].$implicit = n;
  }
  reset() {
    this.needsIndexUpdate = !1;
  }
  updateIndexes() {
    if (this.needsIndexUpdate)
      for (let t = 0; t < this.length; t++)
        this.getLView(t)[ie].$index = t;
  }
  getLView(t) {
    return LO(this.lContainer, t);
  }
}
function DE(e) {
  const t = $(null), n = He();
  try {
    const r = m(), o = r[C], i = r[n];
    if (i.liveCollection === void 0) {
      const a = n + 1, u = od(r, a), c = id(o, a);
      i.liveCollection = new xO(u, r, c);
    } else
      i.liveCollection.reset();
    const s = i.liveCollection;
    if (NO(s, e, i.trackByFn), s.updateIndexes(), i.hasEmptyBlock) {
      const a = $t(), u = s.length === 0;
      if (be(r, a, u)) {
        const c = n + 2, l = od(r, c);
        if (u) {
          const d = id(o, c), f = wo(l, d.tView.ssrId), h = _s(r, d, void 0, { dehydratedView: f });
          Ss(l, h, 0, Eo(d, f));
        } else
          Lf(l, 0);
      }
    }
  } finally {
    $(t);
  }
}
function od(e, t) {
  const n = e[t];
  return ngDevMode && ot(n), n;
}
function PO(e, t) {
  const n = Gi(e, t);
  return ngDevMode && tn(n), n;
}
function LO(e, t) {
  const n = cI(e, t);
  return ngDevMode && tn(n), n;
}
function id(e, t) {
  const n = ys(e, t);
  return ngDevMode && yo(n), n;
}
function jO(e, t, n, r, o, i) {
  ngDevMode && it(t), ngDevMode && ngDevMode.firstCreatePass++;
  const s = t.consts, a = Jt(s, o), u = qo(t, e, 2, r, a);
  return Rf(t, n, u, Jt(s, i)), u.attrs !== null && Ha(u, u.attrs, !1), u.mergedAttrs !== null && Ha(u, u.mergedAttrs, !0), t.queries !== null && t.queries.elementStart(t, u), u;
}
function oc(e, t, n, r) {
  const o = m(), i = x(), s = T + e;
  ngDevMode && A(X(), i.bindingStartIndex, "elements should be created before any bindings"), ngDevMode && Ee(o, s);
  const a = o[F], u = i.firstCreatePass ? jO(s, i, o, t, n, r) : i.data[s], c = vE(i, o, u, a, t, e);
  o[s] = c;
  const l = Iu(u);
  return ngDevMode && i.firstCreatePass && lT(c, o, u.value, i.schemas, l), Xt(u, !0), Qv(a, c, u), !Rs(u) && vs() && Lu(i, o, c, u), XM() === 0 && Pe(c, o), e_(), l && (Ff(i, o, u), Of(i, u, o)), r !== null && Nf(o, u), oc;
}
function ic() {
  let e = K();
  ngDevMode && E(e, "No parent node to close."), Qd() ? Zd() : (ngDevMode && jy(K()), e = e.parent, Xt(e, !1));
  const t = e;
  ngDevMode && je(
    t,
    3
    /* TNodeType.AnyRNode */
  ), n_(t) && o_(), t_();
  const n = x();
  return n.firstCreatePass && (bu(n, e), $d(e) && n.queries.elementEnd(e)), t.classesWithoutHost != null && m_(t) && nd(n, t, m(), t.classesWithoutHost, !0), t.stylesWithoutHost != null && y_(t) && nd(n, t, m(), t.stylesWithoutHost, !1), ic;
}
function Ch(e, t, n, r) {
  return oc(e, t, n, r), ic(), Ch;
}
let vE = (e, t, n, r, o, i) => (nn(!0), Ru(r, o, DD()));
function $O(e, t, n, r, o, i) {
  const s = t[gt], a = !s || Bo() || Rs(n) || Au(s, i);
  if (nn(a), a)
    return Ru(r, o, DD());
  const u = qu(s, e, t, n);
  if (ngDevMode && As(u, Node.ELEMENT_NODE, o, t, n), ngDevMode && zo(u), av(s, i) && (ngDevMode && Gu(u.nextSibling, t, n), Tu(s, i, u.nextSibling)), s && (xD(n) || PD(u))) {
    if (tr(n))
      r_(n), Gv(u), ngDevMode && vS(u);
    else if (ngDevMode)
      throw yA(u);
  }
  return u;
}
function BO() {
  vE = $O;
}
function HO(e, t, n, r, o) {
  ngDevMode && ngDevMode.firstCreatePass++;
  const i = t.consts, s = Jt(i, r), a = qo(t, e, 8, "ng-container", s);
  s !== null && Ha(a, s, !0);
  const u = Jt(i, o);
  return Rf(t, n, a, u), t.queries !== null && t.queries.elementStart(t, a), a;
}
function sc(e, t, n) {
  const r = m(), o = x(), i = e + T;
  ngDevMode && Ee(r, i), ngDevMode && A(X(), o.bindingStartIndex, "element containers should be created before any bindings");
  const s = o.firstCreatePass ? HO(i, o, r, t, n) : o.data[i];
  Xt(s, !0);
  const a = IE(o, r, s, e);
  return r[i] = a, vs() && Lu(o, r, a, s), Pe(a, r), Iu(s) && (Ff(o, r, s), Of(o, s, r)), n != null && Nf(r, s), sc;
}
function ac() {
  let e = K();
  const t = x();
  return Qd() ? Zd() : (ngDevMode && jy(e), e = e.parent, Xt(e, !1)), ngDevMode && je(
    e,
    8
    /* TNodeType.ElementContainer */
  ), t.firstCreatePass && (bu(t, e), $d(e) && t.queries.elementEnd(e)), ac;
}
function Eh(e, t, n) {
  return sc(e, t, n), ac(), Eh;
}
let IE = (e, t, n, r) => (nn(!0), _f(t[F], ngDevMode ? "ng-container" : ""));
function VO(e, t, n, r) {
  let o;
  const i = t[gt], s = !i || Bo() || Rs(n);
  if (nn(s), s)
    return _f(t[F], ngDevMode ? "ng-container" : "");
  const a = qu(i, e, t, n);
  ngDevMode && Gu(a, t, n);
  const u = CS(i, r);
  return ngDevMode && J(u, "Unexpected state: hydrating an <ng-container>, but no hydration info is available."), Tu(i, r, a), o = Qu(u, a), ngDevMode && (As(o, Node.COMMENT_NODE, null, t, n), zo(o)), o;
}
function UO() {
  IE = VO;
}
function CE() {
  return m();
}
function bh(e, t, n) {
  const r = m(), o = $t();
  if (be(r, o, t)) {
    const i = x(), s = ue();
    st(i, s, r, e, t, r[F], n, !0), ngDevMode && ve(i.data, s, e, o);
  }
  return bh;
}
function wh(e, t, n) {
  const r = m(), o = $t();
  if (be(r, o, t)) {
    const i = x(), s = ue(), a = Yd(i.data), u = uI(a, s, r);
    st(i, s, r, e, t, u, n, !0), ngDevMode && ve(i.data, s, e, o);
  }
  return wh;
}
typeof ngI18nClosureMode > "u" && function() {
  he.ngI18nClosureMode = // TODO(FW-1250): validate that this actually, you know, works.
  // tslint:disable-next-line:no-toplevel-property-access
  typeof goog < "u" && typeof goog.getMsg == "function";
}();
const or = void 0;
function zO(e) {
  const t = Math.floor(Math.abs(e)), n = e.toString().replace(/^[^.]*\.?/, "").length;
  return t === 1 && n === 0 ? 1 : 5;
}
var GO = ["en", [["a", "p"], ["AM", "PM"], or], [["AM", "PM"], or, or], [["S", "M", "T", "W", "T", "F", "S"], ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]], or, [["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"], ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]], or, [["B", "A"], ["BC", "AD"], ["Before Christ", "Anno Domini"]], 0, [6, 0], ["M/d/yy", "MMM d, y", "MMMM d, y", "EEEE, MMMM d, y"], ["h:mm a", "h:mm:ss a", "h:mm:ss a z", "h:mm:ss a zzzz"], ["{1}, {0}", or, "{1} 'at' {0}", or], [".", ",", ";", "%", "+", "-", "E", "×", "‰", "∞", "NaN", ":"], ["#,##0.###", "#,##0%", "¤#,##0.00", "#E0"], "USD", "$", "US Dollar", {}, "ltr", zO];
let oo = {};
function WO(e, t, n) {
  typeof t != "string" && (n = t, t = e[oe.LocaleId]), t = t.toLowerCase().replace(/_/g, "-"), oo[t] = e, n && (oo[t][oe.ExtraData] = n);
}
function Ve(e) {
  const t = ZO(e);
  let n = Zg(t);
  if (n)
    return n;
  const r = t.split("-")[0];
  if (n = Zg(r), n)
    return n;
  if (r === "en")
    return GO;
  throw new v(701, ngDevMode && `Missing locale data for the locale "${e}".`);
}
function qO(e) {
  return Ve(e)[oe.CurrencyCode] || null;
}
function Mh(e) {
  return Ve(e)[oe.PluralCase];
}
function Zg(e) {
  return e in oo || (oo[e] = he.ng && he.ng.common && he.ng.common.locales && he.ng.common.locales[e]), oo[e];
}
function QO() {
  oo = {};
}
var oe;
(function(e) {
  e[e.LocaleId = 0] = "LocaleId", e[e.DayPeriodsFormat = 1] = "DayPeriodsFormat", e[e.DayPeriodsStandalone = 2] = "DayPeriodsStandalone", e[e.DaysFormat = 3] = "DaysFormat", e[e.DaysStandalone = 4] = "DaysStandalone", e[e.MonthsFormat = 5] = "MonthsFormat", e[e.MonthsStandalone = 6] = "MonthsStandalone", e[e.Eras = 7] = "Eras", e[e.FirstDayOfWeek = 8] = "FirstDayOfWeek", e[e.WeekendRange = 9] = "WeekendRange", e[e.DateFormat = 10] = "DateFormat", e[e.TimeFormat = 11] = "TimeFormat", e[e.DateTimeFormat = 12] = "DateTimeFormat", e[e.NumberSymbols = 13] = "NumberSymbols", e[e.NumberFormats = 14] = "NumberFormats", e[e.CurrencyCode = 15] = "CurrencyCode", e[e.CurrencySymbol = 16] = "CurrencySymbol", e[e.CurrencyName = 17] = "CurrencyName", e[e.Currencies = 18] = "Currencies", e[e.Directionality = 19] = "Directionality", e[e.PluralCase = 20] = "PluralCase", e[e.ExtraData = 21] = "ExtraData";
})(oe || (oe = {}));
function ZO(e) {
  return e.toLowerCase().replace(/_/g, "-");
}
const YO = ["zero", "one", "two", "few", "many"];
function KO(e, t) {
  const n = Mh(t)(parseInt(e, 10)), r = YO[n];
  return r !== void 0 ? r : "other";
}
const Mr = "en-US", JO = "USD", uc = {
  marker: "element"
}, cc = {
  marker: "ICU"
};
var We;
(function(e) {
  e[e.SHIFT = 2] = "SHIFT", e[e.APPEND_EAGERLY = 1] = "APPEND_EAGERLY", e[e.COMMENT = 2] = "COMMENT";
})(We || (We = {}));
let EE = Mr;
function _h(e) {
  ngDevMode && E(e, "Expected localeId to be defined"), typeof e == "string" && (EE = e.toLowerCase().replace(/_/g, "-"));
}
function XO() {
  return EE;
}
function bE(e, t, n) {
  const r = t.insertBeforeIndex, o = Array.isArray(r) ? r[0] : r;
  return o === null ? Hv(e, t, n) : (ngDevMode && Ee(n, o), re(n[o]));
}
function wE(e, t, n, r, o) {
  const i = t.insertBeforeIndex;
  if (Array.isArray(i)) {
    ngDevMode && An(r);
    let s = r, a = null;
    if (t.type & 3 || (a = s, s = o), s !== null && t.componentOffset === -1)
      for (let u = 1; u < i.length; u++) {
        const c = n[i[u]];
        Ir(e, s, c, a, !1);
      }
  }
}
function ME(e, t) {
  if (ngDevMode && A(t.insertBeforeIndex, null, "We expect that insertBeforeIndex is not set"), e.push(t), e.length > 1)
    for (let n = e.length - 2; n >= 0; n--) {
      const r = e[n];
      _E(r) || eF(r, t) && tF(r) === null && nF(r, t.index);
    }
}
function _E(e) {
  return !(e.type & 64);
}
function eF(e, t) {
  return _E(t) || e.index > t.index;
}
function tF(e) {
  const t = e.insertBeforeIndex;
  return Array.isArray(t) ? t[0] : t;
}
function nF(e, t) {
  const n = e.insertBeforeIndex;
  Array.isArray(n) ? n[0] = t : (Uv(bE, wE), e.insertBeforeIndex = t);
}
function Ei(e, t) {
  const n = e.data[t];
  if (n === null || typeof n == "string")
    return null;
  ngDevMode && !(n.hasOwnProperty("tView") || n.hasOwnProperty("currentCaseLViewIndex")) && S("We expect to get 'null'|'TIcu'|'TIcuContainer', but got: " + n);
  const r = n.hasOwnProperty("currentCaseLViewIndex") ? n : n.value;
  return ngDevMode && Hd(r), r;
}
function rF(e, t, n) {
  const r = e.data[t];
  ngDevMode && A(r === null || r.hasOwnProperty("tView"), !0, "We expect to get 'null'|'TIcuContainer'"), r === null ? e.data[t] = n : (ngDevMode && je(
    r,
    32
    /* TNodeType.Icu */
  ), r.value = n);
}
function oF(e, t) {
  ngDevMode && yo(e);
  let n = e.insertBeforeIndex;
  n === null ? (Uv(bE, wE), n = e.insertBeforeIndex = [null, t]) : (A(Array.isArray(n), !0, "Expecting array here"), n.push(t));
}
function iF(e, t, n) {
  const r = Af(e, n, 64, null, null);
  return ME(t, r), r;
}
function lc(e, t) {
  const n = t[e.currentCaseLViewIndex];
  return n === null ? n : n < 0 ? ~n : n;
}
function SE(e) {
  return e >>> 17;
}
function TE(e) {
  return (e & 131070) >>> 1;
}
function Yg(e) {
  return e & 1;
}
function sF(e, t, n) {
  return ngDevMode && bn(t, 0, "Missing parent index"), ngDevMode && er(n, 0, "Missing ref index"), e | t << 17 | n << 1;
}
let Ki = 0, bi = 0;
function aF(e) {
  e && (Ki = Ki | 1 << Math.min(bi, 31)), bi++;
}
function uF(e, t, n) {
  if (bi > 0) {
    ngDevMode && E(e, "tView should be defined");
    const r = e.data[n], o = Array.isArray(r) ? r : r.update, i = X() - bi - 1;
    FE(e, t, o, i, Ki);
  }
  Ki = 0, bi = 0;
}
function AE(e, t, n) {
  const r = e[F];
  switch (n) {
    case Node.COMMENT_NODE:
      return _f(r, t);
    case Node.TEXT_NODE:
      return Mf(r, t);
    case Node.ELEMENT_NODE:
      return Ru(r, t, null);
  }
}
let wi = (e, t, n, r) => (nn(!0), AE(e, n, r));
function cF(e, t, n, r) {
  return nn(!0), AE(e, n, r);
}
function lF() {
  wi = cF;
}
function dF(e, t, n, r) {
  const o = e[F];
  for (let i = 0; i < t.length; i++) {
    const s = t[i++], a = t[i], u = (s & We.COMMENT) === We.COMMENT, c = (s & We.APPEND_EAGERLY) === We.APPEND_EAGERLY, l = s >>> We.SHIFT;
    let d = e[l], f = !1;
    d === null && (d = e[l] = wi(e, l, a, u ? Node.COMMENT_NODE : Node.TEXT_NODE), f = vs()), c && n !== null && f && Ir(o, n, d, r, !1);
  }
}
function OE(e, t, n, r) {
  ngDevMode && An(r);
  const o = n[F];
  let i = null, s;
  for (let a = 0; a < t.length; a++) {
    const u = t[a];
    if (typeof u == "string") {
      const c = t[++a];
      n[c] === null && (ngDevMode && ngDevMode.rendererCreateTextNode++, ngDevMode && Ee(n, c), n[c] = wi(n, c, u, Node.TEXT_NODE));
    } else if (typeof u == "number")
      switch (u & 1) {
        case 0:
          const c = SE(u);
          i === null && (i = c, s = Pu(o, r));
          let l, d;
          if (c === i ? (l = r, d = s) : (l = null, d = re(n[c])), d !== null) {
            ngDevMode && An(d);
            const g = TE(u);
            ngDevMode && er(g, T, "Missing ref");
            const D = n[g];
            ngDevMode && An(D), Ir(o, d, D, l, !1);
            const I = Ei(e, g);
            if (I !== null && typeof I == "object") {
              ngDevMode && Hd(I);
              const y = lc(I, n);
              y !== null && OE(e, I.create[y], n, n[I.anchorIdx]);
            }
          }
          break;
        case 1:
          const f = u >>> 1, h = t[++a], p = t[++a];
          xf(o, ms(f, n), null, null, h, p, null);
          break;
        default:
          if (ngDevMode)
            throw new v(700, `Unable to determine the type of mutate operation for "${u}"`);
      }
    else
      switch (u) {
        case cc:
          const c = t[++a], l = t[++a];
          if (n[l] === null) {
            ngDevMode && A(typeof c, "string", `Expected "${c}" to be a comment node value`), ngDevMode && ngDevMode.rendererCreateComment++, ngDevMode && Fa(n, l);
            const h = n[l] = wi(n, l, c, Node.COMMENT_NODE);
            Pe(h, n);
          }
          break;
        case uc:
          const d = t[++a], f = t[++a];
          if (n[f] === null) {
            ngDevMode && A(typeof d, "string", `Expected "${d}" to be an element node tag name`), ngDevMode && ngDevMode.rendererCreateElement++, ngDevMode && Fa(n, f);
            const h = n[f] = wi(n, f, d, Node.ELEMENT_NODE);
            Pe(h, n);
          }
          break;
        default:
          ngDevMode && S(`Unable to determine the type of mutate operation for "${u}"`);
      }
  }
}
function FE(e, t, n, r, o) {
  for (let i = 0; i < n.length; i++) {
    const s = n[i], a = n[++i];
    if (s & o) {
      let u = "";
      for (let c = i + 1; c <= i + a; c++) {
        const l = n[c];
        if (typeof l == "string")
          u += l;
        else if (typeof l == "number")
          if (l < 0)
            u += L(t[r - l]);
          else {
            const d = l >>> 2;
            switch (l & 3) {
              case 1:
                const f = n[++c], h = n[++c], p = e.data[d];
                ngDevMode && E(p, "Experting TNode or string"), typeof p == "string" ? xf(t[F], t[d], null, p, f, u, h) : st(e, p, t, f, u, t[F], h, !1);
                break;
              case 0:
                const g = t[d];
                g !== null && kv(t[F], g, u);
                break;
              case 2:
                fF(e, Ei(e, d), t, u);
                break;
              case 3:
                Kg(e, Ei(e, d), r, t);
                break;
            }
          }
      }
    } else {
      const u = n[i + 1];
      if (u > 0 && (u & 3) === 3) {
        const c = u >>> 2, l = Ei(e, c);
        t[l.currentCaseLViewIndex] < 0 && Kg(e, l, r, t);
      }
    }
    i += a;
  }
}
function Kg(e, t, n, r) {
  ngDevMode && Ee(r, t.currentCaseLViewIndex);
  let o = r[t.currentCaseLViewIndex];
  if (o !== null) {
    let i = Ki;
    o < 0 && (o = r[t.currentCaseLViewIndex] = ~o, i = -1), FE(e, r, t.update[o], n, i);
  }
}
function fF(e, t, n, r) {
  const o = hF(t, r);
  if (lc(t, n) !== o && (NE(e, t, n), n[t.currentCaseLViewIndex] = o === null ? null : ~o, o !== null)) {
    const s = n[t.anchorIdx];
    s && (ngDevMode && An(s), OE(e, t.create[o], n, s));
  }
}
function NE(e, t, n) {
  let r = lc(t, n);
  if (r !== null) {
    const o = t.remove[r];
    for (let i = 0; i < o.length; i++) {
      const s = o[i];
      if (s > 0) {
        const a = ms(s, n);
        a !== null && ws(n[F], a);
      } else
        NE(e, Ei(e, ~s), n);
    }
  }
}
function hF(e, t) {
  let n = e.cases.indexOf(t);
  if (n === -1)
    switch (e.type) {
      case 1: {
        const r = KO(t, XO());
        n = e.cases.indexOf(r), n === -1 && r !== "other" && (n = e.cases.indexOf("other"));
        break;
      }
      case 0: {
        n = e.cases.indexOf("other");
        break;
      }
    }
  return n === -1 ? null : n;
}
function pF() {
  const e = [];
  let t = -1, n, r;
  function o(a, u) {
    for (n = u; e.length; )
      e.pop();
    return ngDevMode && Ye(a, u), i(a.value, u), s;
  }
  function i(a, u) {
    t = 0;
    const c = lc(a, u);
    c !== null ? (ngDevMode && Ni(c, 0, a.cases.length - 1), r = a.remove[c]) : r = q;
  }
  function s() {
    if (t < r.length) {
      const a = r[t++];
      if (ngDevMode && J(a, "Expecting OpCode number"), a > 0) {
        const u = n[a];
        return ngDevMode && An(u), u;
      } else {
        e.push(t, r);
        const u = ~a, c = n[C].data[u];
        return ngDevMode && Hd(c), i(c, n), s();
      }
    } else
      return e.length === 0 ? null : (r = e.pop(), t = e.pop(), s());
  }
  return o;
}
function gF(e) {
  const t = e || (Array.isArray(this) ? this : []);
  let n = [];
  for (let r = 0; r < t.length; r++) {
    const o = t[r++], i = t[r], s = (o & We.COMMENT) === We.COMMENT, a = (o & We.APPEND_EAGERLY) === We.APPEND_EAGERLY, u = o >>> We.SHIFT;
    n.push(`lView[${u}] = document.${s ? "createComment" : "createText"}(${JSON.stringify(i)});`), a && n.push(`parent.appendChild(lView[${u}]);`);
  }
  return n;
}
function dc(e) {
  const t = new kE(e || (Array.isArray(this) ? this : []));
  let n = [];
  function r(o) {
    const i = o >>> 2;
    switch (o & 3) {
      case 0:
        return `(lView[${i}] as Text).textContent = $$$`;
      case 1:
        const a = t.consumeString(), u = t.consumeFunction(), c = u ? `(${u})($$$)` : "$$$";
        return `(lView[${i}] as Element).setAttribute('${a}', ${c})`;
      case 2:
        return `icuSwitchCase(${i}, $$$)`;
      case 3:
        return `icuUpdateCase(${i})`;
    }
    throw new Error("unexpected OpCode");
  }
  for (; t.hasMore(); ) {
    let o = t.consumeNumber(), i = t.consumeNumber();
    const s = t.i + i, a = [];
    let u = "";
    for (; t.i < s; ) {
      let c = t.consumeNumberOrString();
      if (typeof c == "string")
        u += c;
      else if (c < 0)
        u += "${lView[i" + c + "]}";
      else {
        const l = r(c);
        a.push(l.replace("$$$", "`" + u + "`") + ";"), u = "";
      }
    }
    n.push(`if (mask & 0b${o.toString(2)}) { ${a.join(" ")} }`);
  }
  return n;
}
function mF(e) {
  const t = new kE(e || (Array.isArray(this) ? this : []));
  let n = [];
  function r(i) {
    const s = SE(i), a = TE(i);
    switch (Yg(i)) {
      case 0:
        return `(lView[${s}] as Element).appendChild(lView[${o}])`;
      case 1:
        return `(lView[${a}] as Element).setAttribute("${t.consumeString()}", "${t.consumeString()}")`;
    }
    throw new Error("Unexpected OpCode: " + Yg(i));
  }
  let o = -1;
  for (; t.hasMore(); ) {
    let i = t.consumeNumberStringOrMarker();
    if (i === cc) {
      const s = t.consumeString();
      o = t.consumeNumber(), n.push(`lView[${o}] = document.createComment("${s}")`);
    } else if (i === uc) {
      const s = t.consumeString();
      o = t.consumeNumber(), n.push(`lView[${o}] = document.createElement("${s}")`);
    } else if (typeof i == "string")
      o = t.consumeNumber(), n.push(`lView[${o}] = document.createTextNode("${i}")`);
    else if (typeof i == "number") {
      const s = r(i);
      s && n.push(s);
    } else
      throw new Error("Unexpected value");
  }
  return n;
}
function yF(e) {
  const t = e || (Array.isArray(this) ? this : []);
  let n = [];
  for (let r = 0; r < t.length; r++) {
    const o = t[r];
    o > 0 ? n.push(`remove(lView[${o}])`) : n.push(`removeNestedICU(${~o})`);
  }
  return n;
}
class kE {
  constructor(t) {
    this.i = 0, this.codes = t;
  }
  hasMore() {
    return this.i < this.codes.length;
  }
  consumeNumber() {
    let t = this.codes[this.i++];
    return J(t, "expecting number in OpCode"), t;
  }
  consumeString() {
    let t = this.codes[this.i++];
    return xo(t, "expecting string in OpCode"), t;
  }
  consumeFunction() {
    let t = this.codes[this.i++];
    if (t === null || typeof t == "function")
      return t;
    throw new Error("expecting function in OpCode");
  }
  consumeNumberOrString() {
    let t = this.codes[this.i++];
    return typeof t == "string" || J(t, "expecting number or string in OpCode"), t;
  }
  consumeNumberStringOrMarker() {
    let t = this.codes[this.i++];
    return typeof t == "string" || typeof t == "number" || t == cc || t == uc || J(t, "expecting number, string, ICU_MARKER or ELEMENT_MARKER in OpCode"), t;
  }
}
const Ya = /�(\d+):?\d*�/gi, DF = /({\s*�\d+:?\d*�\s*,\s*\S{6}\s*,[\s\S]*})/gi, vF = /�(\d+)�/, RE = /^\s*(�\d+:?\d*�)\s*,\s*(select|plural)\s*,/, Mi = "�", IF = /�\/?\*(\d+:\d+)�/gi, CF = /�(\/?[#*]\d+):?\d*�/gi, EF = /\uE500/g;
function bF(e) {
  return e.replace(EF, " ");
}
function ur(e, t) {
  if (ngDevMode)
    Object.defineProperty(e, "debug", { get: t, enumerable: !1 });
  else
    throw new Error("This method should be guarded with `ngDevMode` so that it can be tree shaken in production!");
}
function wF(e, t, n, r, o, i) {
  const s = $i(), a = [], u = [], c = [[]], l = [[]];
  ngDevMode && (ur(a, gF), ur(u, dc)), o = AF(o, i);
  const d = bF(o).split(CF);
  for (let f = 0; f < d.length; f++) {
    let h = d[f];
    if (f & 1) {
      const p = h.charCodeAt(0) === 47, g = h.charCodeAt(p ? 1 : 0);
      ngDevMode && qw(
        g,
        42,
        35
        /* CharCode.HASH */
      );
      const D = T + Number.parseInt(h.substring(p ? 2 : 1));
      if (p)
        c.shift(), l.shift(), Xt($i(), !1);
      else {
        const I = iF(e, c[0], D);
        c.unshift([]), Xt(I, !0);
        const y = {
          kind: 2,
          index: D,
          children: [],
          type: g === 35 ? 0 : 1
        };
        l[0].push(y), l.unshift(y.children);
      }
    } else {
      const p = sd(h);
      for (let g = 0; g < p.length; g++) {
        let D = p[g];
        if (g & 1) {
          const I = D;
          if (typeof I != "object")
            throw new Error(`Unable to parse ICU expression in "${o}" message.`);
          const M = xE(e, s, c[0], n, a, ngDevMode ? `ICU ${r}:${I.mainBinding}` : "", !0).index;
          ngDevMode && bn(M, T, "Index must be in absolute LView offset"), LE(l[0], e, n, u, t, I, M);
        } else {
          const I = D;
          ngDevMode && xo(I, "Parsed ICU part should be string"), I !== "" && MF(l[0], e, s, c[0], a, u, n, I);
        }
      }
    }
  }
  e.data[r] = {
    create: a,
    update: u,
    ast: l[0]
  };
}
function xE(e, t, n, r, o, i, s) {
  const a = Ms(e, r, 1, null);
  let u = a << We.SHIFT, c = $i();
  t === c && (c = null), c === null && (u |= We.APPEND_EAGERLY), s && (u |= We.COMMENT, mT(pF)), o.push(u, i === null ? "" : i);
  const l = Af(e, a, s ? 32 : 1, i === null ? ngDevMode ? "{{?}}" : "" : i, null);
  ME(n, l);
  const d = l.index;
  return Xt(
    l,
    !1
    /* Text nodes are self closing */
  ), c !== null && t !== c && oF(c, d), l;
}
function MF(e, t, n, r, o, i, s, a) {
  const u = a.match(Ya), l = xE(t, n, r, s, o, u ? null : a, !1).index;
  u && _i(i, a, l, null, 0, null), e.push({ kind: 0, index: l });
}
function _F(e, t, n) {
  const o = K().index, i = [];
  if (ngDevMode && ur(i, dc), e.firstCreatePass && e.data[t] === null) {
    for (let s = 0; s < n.length; s += 2) {
      const a = n[s], u = n[s + 1];
      if (u !== "") {
        if (DF.test(u))
          throw new Error(`ICU expressions are not supported in attributes. Message: "${u}".`);
        _i(i, u, o, a, SF(i), null);
      }
    }
    e.data[t] = i;
  }
}
function _i(e, t, n, r, o, i) {
  ngDevMode && bn(n, T, "Index must be in absolute LView offset");
  const s = e.length, a = s + 1;
  e.push(null, null);
  const u = s + 2;
  ngDevMode && ur(e, dc);
  const c = t.split(Ya);
  let l = 0;
  for (let d = 0; d < c.length; d++) {
    const f = c[d];
    if (d & 1) {
      const h = o + parseInt(f, 10);
      e.push(-1 - h), l = l | PE(h);
    } else f !== "" && e.push(f);
  }
  return e.push(n << 2 | (r ? 1 : 0)), r && e.push(r, i), e[s] = l, e[a] = e.length - u, l;
}
function SF(e) {
  let t = 0;
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    typeof r == "number" && r < 0 && t++;
  }
  return t;
}
function PE(e) {
  return 1 << Math.min(e, 31);
}
function TF(e) {
  return e === -1;
}
function Jg(e) {
  let t, n = "", r = 0, o = !1, i;
  for (; (t = IF.exec(e)) !== null; )
    o ? t[0] === `${Mi}/*${i}${Mi}` && (r = t.index, o = !1) : (n += e.substring(r, t.index + t[0].length), i = t[1], o = !0);
  return ngDevMode && A(o, !1, `Tag mismatch: unable to find the end of the sub-template in the translation "${e}"`), n += e.slice(r), n;
}
function AF(e, t) {
  if (TF(t))
    return Jg(e);
  {
    const n = e.indexOf(`:${t}${Mi}`) + 2 + t.toString().length, r = e.search(new RegExp(`${Mi}\\/\\*\\d+:${t}${Mi}`));
    return Jg(e.substring(n, r));
  }
}
function LE(e, t, n, r, o, i, s) {
  ngDevMode && E(i, "ICU expression must be defined");
  let a = 0;
  const u = {
    type: i.type,
    currentCaseLViewIndex: Ms(t, n, 1, null),
    anchorIdx: s,
    cases: [],
    create: [],
    remove: [],
    update: []
  };
  kF(r, i, s), rF(t, s, u);
  const c = i.values, l = [];
  for (let d = 0; d < c.length; d++) {
    const f = c[d], h = [];
    for (let g = 0; g < f.length; g++) {
      const D = f[g];
      if (typeof D != "string") {
        const I = h.push(D) - 1;
        f[g] = `<!--�${I}�-->`;
      }
    }
    const p = [];
    l.push(p), a = FF(p, t, u, n, r, o, i.cases[d], f.join(""), h) | a;
  }
  a && RF(r, a, s), e.push({
    kind: 3,
    index: s,
    cases: l,
    currentCaseLViewIndex: u.currentCaseLViewIndex
  });
}
function OF(e) {
  const t = [], n = [];
  let r = 1, o = 0;
  e = e.replace(RE, function(s, a, u) {
    return u === "select" ? r = 0 : r = 1, o = parseInt(a.slice(1), 10), "";
  });
  const i = sd(e);
  for (let s = 0; s < i.length; ) {
    let a = i[s++].trim();
    r === 1 && (a = a.replace(/\s*(?:=)?(\w+)\s*/, "$1")), a.length && t.push(a);
    const u = sd(i[s++]);
    t.length > n.length && n.push(u);
  }
  return { type: r, mainBinding: o, cases: t, values: n };
}
function sd(e) {
  if (!e)
    return [];
  let t = 0;
  const n = [], r = [], o = /[{}]/g;
  o.lastIndex = 0;
  let i;
  for (; i = o.exec(e); ) {
    const a = i.index;
    if (i[0] == "}") {
      if (n.pop(), n.length == 0) {
        const u = e.substring(t, a);
        RE.test(u) ? r.push(OF(u)) : r.push(u), t = a + 1;
      }
    } else {
      if (n.length == 0) {
        const u = e.substring(t, a);
        r.push(u), t = a + 1;
      }
      n.push("{");
    }
  }
  const s = e.substring(t);
  return r.push(s), r;
}
function FF(e, t, n, r, o, i, s, a, u) {
  const c = [], l = [], d = [];
  ngDevMode && (ur(c, mF), ur(l, yF), ur(d, dc)), n.cases.push(s), n.create.push(c), n.remove.push(l), n.update.push(d);
  const h = hv(Yn()).getInertBodyElement(a);
  ngDevMode && E(h, "Unable to generate inert body element");
  const p = Ll(h) || h;
  return p ? jE(e, t, n, r, o, c, l, d, p, i, u, 0) : 0;
}
function jE(e, t, n, r, o, i, s, a, u, c, l, d) {
  let f = 0, h = u.firstChild;
  for (; h; ) {
    const p = Ms(t, r, 1, null);
    switch (h.nodeType) {
      case Node.ELEMENT_NODE:
        const g = h, D = g.tagName.toLowerCase();
        if (Pl.hasOwnProperty(D)) {
          Bc(i, uc, D, c, p), t.data[p] = D;
          const k = g.attributes;
          for (let ce = 0; ce < k.length; ce++) {
            const ze = k.item(ce), rr = ze.name.toLowerCase();
            !!ze.value.match(Ya) ? yv.hasOwnProperty(rr) ? yf[rr] ? _i(a, ze.value, p, ze.name, 0, Ou) : _i(a, ze.value, p, ze.name, 0, null) : ngDevMode && console.warn(`WARNING: ignoring unsafe attribute value ${rr} on element ${D} (see ${Lr})`) : xF(i, p, ze);
          }
          const G = {
            kind: 1,
            index: p,
            children: []
          };
          e.push(G), f = jE(G.children, t, n, r, o, i, s, a, h, p, l, d + 1) | f, Xg(s, p, d);
        }
        break;
      case Node.TEXT_NODE:
        const I = h.textContent || "", y = I.match(Ya);
        Bc(i, null, y ? "" : I, c, p), Xg(s, p, d), y && (f = _i(a, I, p, null, 0, null) | f), e.push({
          kind: 0,
          index: p
        });
        break;
      case Node.COMMENT_NODE:
        const M = vF.exec(h.textContent || "");
        if (M) {
          const k = parseInt(M[1], 10), G = l[k];
          Bc(i, cc, ngDevMode ? `nested ICU ${k}` : "", c, p), LE(e, t, r, o, c, G, p), NF(s, p, d);
        }
        break;
    }
    h = h.nextSibling;
  }
  return f;
}
function Xg(e, t, n) {
  n === 0 && e.push(t);
}
function NF(e, t, n) {
  n === 0 && (e.push(~t), e.push(t));
}
function kF(e, t, n) {
  e.push(
    PE(t.mainBinding),
    2,
    -1 - t.mainBinding,
    n << 2 | 2
    /* I18nUpdateOpCode.IcuSwitch */
  );
}
function RF(e, t, n) {
  e.push(
    t,
    1,
    n << 2 | 3
    /* I18nUpdateOpCode.IcuUpdate */
  );
}
function Bc(e, t, n, r, o) {
  t !== null && e.push(t), e.push(n, o, sF(0, r, o));
}
function xF(e, t, n) {
  e.push(t << 1 | 1, n.name, n.value);
}
const em = 0, PF = /\[(�.+?�?)\]/, LF = /\[(�.+?�?)\]|(�\/?\*\d+:\d+�)/g, jF = /({\s*)(VAR_(PLURAL|SELECT)(_\d+)?)(\s*,)/g, $F = /{([A-Z0-9_]+)}/g, BF = /�I18N_EXP_(ICU(_\d+)?)�/g, HF = /\/\*/, VF = /\d+\:(\d+)/;
function UF(e, t = {}) {
  let n = e;
  if (PF.test(e)) {
    const r = {}, o = [em];
    n = n.replace(LF, (i, s, a) => {
      const u = s || a, c = r[u] || [];
      if (c.length || (u.split("|").forEach((g) => {
        const D = g.match(VF), I = D ? parseInt(D[1], 10) : em, y = HF.test(g);
        c.push([I, y, g]);
      }), r[u] = c), !c.length)
        throw new Error(`i18n postprocess: unmatched placeholder - ${u}`);
      const l = o[o.length - 1];
      let d = 0;
      for (let g = 0; g < c.length; g++)
        if (c[g][0] === l) {
          d = g;
          break;
        }
      const [f, h, p] = c[d];
      return h ? o.pop() : l !== f && o.push(f), c.splice(d, 1), p;
    });
  }
  return Object.keys(t).length && (n = n.replace(jF, (r, o, i, s, a, u) => t.hasOwnProperty(i) ? `${o}${t[i]}${u}` : r), n = n.replace($F, (r, o) => t.hasOwnProperty(o) ? t[o] : r), n = n.replace(BF, (r, o) => {
    if (t.hasOwnProperty(o)) {
      const i = t[o];
      if (!i.length)
        throw new Error(`i18n postprocess: unmatched ICU - ${r} with key: ${o}`);
      return i.shift();
    }
    return r;
  })), n;
}
function Sh(e, t, n = -1) {
  const r = x(), o = m(), i = T + e;
  ngDevMode && E(r, "tView should be defined");
  const s = Jt(r.consts, t), a = $i();
  if (r.firstCreatePass && wF(r, a === null ? 0 : a.index, o, i, s, n), r.type === 2) {
    const f = o[De];
    f[_] |= 32;
  } else
    o[_] |= 32;
  const u = r.data[i], c = a === o[$e] ? null : a, l = jv(r, c, o), d = a && a.type & 8 ? o[a.index] : null;
  dF(o, u.create, l, d), cD(!0);
}
function Th() {
  cD(!1);
}
function $E(e, t, n) {
  Sh(e, t, n), Th();
}
function BE(e, t) {
  const n = x();
  ngDevMode && E(n, "tView should be defined");
  const r = Jt(n.consts, t);
  _F(n, e + T, r);
}
function Ah(e) {
  const t = m();
  return aF(be(t, $t(), e)), Ah;
}
function HE(e) {
  uF(x(), m(), e + T);
}
function VE(e, t = {}) {
  return UF(e, t);
}
function Oh(e, t, n, r) {
  const o = m(), i = x(), s = K();
  return Nh(i, o, o[F], s, e, t, r), Oh;
}
function Fh(e, t) {
  const n = K(), r = m(), o = x(), i = Yd(o.data), s = uI(i, n, r);
  return Nh(o, r, s, n, e, t), Fh;
}
function zF(e, t, n, r) {
  const o = e.cleanup;
  if (o != null)
    for (let i = 0; i < o.length - 1; i += 2) {
      const s = o[i];
      if (s === n && o[i + 1] === r) {
        const a = t[mo], u = o[i + 2];
        return a.length > u ? a[u] : null;
      }
      typeof s == "string" && (i += 2);
    }
  return null;
}
function Nh(e, t, n, r, o, i, s) {
  const a = Iu(r), c = e.firstCreatePass && Ul(e), l = t[ie], d = aI(t);
  ngDevMode && je(
    r,
    15
    /* TNodeType.AnyContainer */
  );
  let f = !0;
  if (r.type & 3 || s) {
    const g = Be(r, t), D = s ? s(g) : g, I = d.length, y = s ? (k) => s(re(k[r.index])) : r.index;
    let M = null;
    if (!s && a && (M = zF(e, t, o, r.index)), M !== null) {
      const k = M.__ngLastListenerFn__ || M;
      k.__ngNextListenerFn__ = i, M.__ngLastListenerFn__ = i, f = !1;
    } else {
      i = nm(r, t, l, i);
      const k = n.listen(D, o, i);
      ngDevMode && ngDevMode.rendererAddEventListener++, d.push(i, k), c && c.push(o, y, I, I + 1);
    }
  } else
    i = nm(r, t, l, i);
  const h = r.outputs;
  let p;
  if (f && h !== null && (p = h[o])) {
    const g = p.length;
    if (g)
      for (let D = 0; D < g; D += 2) {
        const I = p[D];
        ngDevMode && Ee(t, I);
        const y = p[D + 1], M = t[I], k = M[y];
        if (ngDevMode && !GF(k))
          throw new Error(`@Output ${y} not initialized in '${M.constructor.name}'.`);
        const G = k.subscribe(i), ce = d.length;
        d.push(i, G), c && c.push(o, r.index, ce, -(ce + 1));
      }
  }
}
function tm(e, t, n, r) {
  const o = $(null);
  try {
    return zt(6, t, n), n(r) !== !1;
  } catch (i) {
    return Hu(e, i), !1;
  } finally {
    zt(7, t, n), $(o);
  }
}
function nm(e, t, n, r, o) {
  return function i(s) {
    if (s === Function)
      return r;
    const a = e.componentOffset > -1 ? mt(e.index, t) : t;
    Ts(a);
    let u = tm(t, n, r, s), c = i.__ngNextListenerFn__;
    for (; c; )
      u = tm(t, n, c, s) && u, c = c.__ngNextListenerFn__;
    return u;
  };
}
function GF(e) {
  return e != null && typeof e.subscribe == "function";
}
function UE(e = 1) {
  return l_(e);
}
function WF(e, t) {
  let n = null;
  const r = DM(e);
  for (let o = 0; o < t.length; o++) {
    const i = t[o];
    if (i === "*") {
      n = o;
      continue;
    }
    if (r === null ? Cy(
      e,
      i,
      /* isProjectionMode */
      !0
    ) : CM(r, i))
      return o;
  }
  return n;
}
function zE(e) {
  const t = m()[De][$e];
  if (!t.projection) {
    const n = e ? e.length : 1, r = t.projection = mi(n, null), o = r.slice();
    let i = t.child;
    for (; i !== null; ) {
      const s = e ? WF(i, e) : 0;
      s !== null && (o[s] ? o[s].projectionNext = i : r[s] = i, o[s] = i), i = i.next;
    }
  }
}
function GE(e, t = 0, n) {
  const r = m(), o = x(), i = qo(o, T + e, 16, null, n || null);
  i.projection === null && (i.projection = t), Zd(), (!r[gt] || Bo()) && (i.flags & 32) !== 32 && wT(o, r, i);
}
function kh(e, t, n) {
  return fc(e, "", t, "", n), kh;
}
function fc(e, t, n, r, o) {
  const i = m(), s = ei(i, t, n, r);
  if (s !== O) {
    const a = x(), u = ue();
    st(a, u, i, e, s, i[F], o, !1), ngDevMode && ve(a.data, u, e, X() - 1, t, r);
  }
  return fc;
}
function Rh(e, t, n, r, o, i, s) {
  const a = m(), u = ti(a, t, n, r, o, i);
  if (u !== O) {
    const c = x(), l = ue();
    st(c, l, a, e, u, a[F], s, !1), ngDevMode && ve(c.data, l, e, X() - 2, t, r, i);
  }
  return Rh;
}
function xh(e, t, n, r, o, i, s, a, u) {
  const c = m(), l = ni(c, t, n, r, o, i, s, a);
  if (l !== O) {
    const d = x(), f = ue();
    st(d, f, c, e, l, c[F], u, !1), ngDevMode && ve(d.data, f, e, X() - 3, t, r, i, a);
  }
  return xh;
}
function Ph(e, t, n, r, o, i, s, a, u, c, l) {
  const d = m(), f = ri(d, t, n, r, o, i, s, a, u, c);
  if (f !== O) {
    const h = x(), p = ue();
    st(h, p, d, e, f, d[F], l, !1), ngDevMode && ve(h.data, p, e, X() - 4, t, r, i, a, c);
  }
  return Ph;
}
function Lh(e, t, n, r, o, i, s, a, u, c, l, d, f) {
  const h = m(), p = oi(h, t, n, r, o, i, s, a, u, c, l, d);
  if (p !== O) {
    const g = x(), D = ue();
    st(g, D, h, e, p, h[F], f, !1), ngDevMode && ve(g.data, D, e, X() - 5, t, r, i, a, c, d);
  }
  return Lh;
}
function jh(e, t, n, r, o, i, s, a, u, c, l, d, f, h, p) {
  const g = m(), D = ii(g, t, n, r, o, i, s, a, u, c, l, d, f, h);
  if (D !== O) {
    const I = x(), y = ue();
    st(I, y, g, e, D, g[F], p, !1), ngDevMode && ve(I.data, y, e, X() - 6, t, r, i, a, c, d, h);
  }
  return jh;
}
function $h(e, t, n, r, o, i, s, a, u, c, l, d, f, h, p, g, D) {
  const I = m(), y = si(I, t, n, r, o, i, s, a, u, c, l, d, f, h, p, g);
  if (y !== O) {
    const M = x(), k = ue();
    st(M, k, I, e, y, I[F], D, !1), ngDevMode && ve(M.data, k, e, X() - 7, t, r, i, a, c, d, h, g);
  }
  return $h;
}
function Bh(e, t, n, r, o, i, s, a, u, c, l, d, f, h, p, g, D, I, y) {
  const M = m(), k = ai(M, t, n, r, o, i, s, a, u, c, l, d, f, h, p, g, D, I);
  if (k !== O) {
    const G = x(), ce = ue();
    st(G, ce, M, e, k, M[F], y, !1), ngDevMode && ve(G.data, ce, e, X() - 8, t, r, i, a, c, d, h, g, I);
  }
  return Bh;
}
function Hh(e, t, n) {
  const r = m(), o = Xo(r, t);
  if (o !== O) {
    const i = x(), s = ue();
    if (st(i, s, r, e, o, r[F], n, !1), ngDevMode) {
      const a = [t[0]];
      for (let u = 2; u < t.length; u += 2)
        a.push(t[u]);
      ve(i.data, s, e, X() - a.length + 1, ...a);
    }
  }
  return Hh;
}
function WE(e, t, n, r) {
  $I(e, t, n, r);
}
function qE(e, t, n) {
  jI(e, t, n);
}
function QE(e) {
  const t = m(), n = x(), r = Kd();
  Eu(r + 1);
  const o = Zf(n, r);
  if (e.dirty && Ds(t) === ((o.metadata.flags & 2) === 2)) {
    if (o.matches === null)
      e.reset([]);
    else {
      const i = HI(t, r);
      e.reset(i, RD), e.notifyOnChanges();
    }
    return !0;
  }
  return !1;
}
function ZE() {
  return Qf(m(), Kd());
}
function YE(e, t, n, r, o) {
  QI(t, $I(e, n, r, o));
}
function KE(e, t, n, r) {
  QI(e, jI(t, n, r));
}
function JE(e = 1) {
  Eu(Kd() + e);
}
function XE(e, t, n, r) {
  n >= e.data.length && (e.data[n] = null, e.blueprint[n] = null), t[n] = r;
}
function e0(e) {
  const t = i_();
  return $o(t, T + e);
}
function t0(e, t, n) {
  const r = m(), o = ei(r, e, t, n);
  Bt(o);
}
function n0(e, t, n, r, o) {
  const i = m(), s = ti(i, e, t, n, r, o);
  Bt(s);
}
function r0(e, t, n, r, o, i, s) {
  const a = m(), u = ni(a, e, t, n, r, o, i, s);
  Bt(u);
}
function o0(e, t, n, r, o, i, s, a, u) {
  const c = m(), l = ri(c, e, t, n, r, o, i, s, a, u);
  Bt(l);
}
function i0(e, t, n, r, o, i, s, a, u, c, l) {
  const d = m(), f = oi(d, e, t, n, r, o, i, s, a, u, c, l);
  Bt(f);
}
function s0(e, t, n, r, o, i, s, a, u, c, l, d, f) {
  const h = m(), p = ii(h, e, t, n, r, o, i, s, a, u, c, l, d, f);
  Bt(p);
}
function a0(e, t, n, r, o, i, s, a, u, c, l, d, f, h, p) {
  const g = m(), D = si(g, e, t, n, r, o, i, s, a, u, c, l, d, f, h, p);
  Bt(D);
}
function u0(e, t, n, r, o, i, s, a, u, c, l, d, f, h, p, g, D) {
  const I = m(), y = ai(I, e, t, n, r, o, i, s, a, u, c, l, d, f, h, p, g, D);
  Bt(y);
}
function c0(e) {
  const t = m(), n = Xo(t, e);
  Bt(n);
}
function Vh(e, t, n, r, o) {
  const i = m(), s = ei(i, t, n, r);
  return Ht(e, s, o, !1), Vh;
}
function Uh(e, t, n, r, o, i, s) {
  const a = m(), u = ti(a, t, n, r, o, i);
  return Ht(e, u, s, !1), Uh;
}
function zh(e, t, n, r, o, i, s, a, u) {
  const c = m(), l = ni(c, t, n, r, o, i, s, a);
  return Ht(e, l, u, !1), zh;
}
function Gh(e, t, n, r, o, i, s, a, u, c, l) {
  const d = m(), f = ri(d, t, n, r, o, i, s, a, u, c);
  return Ht(e, f, l, !1), Gh;
}
function Wh(e, t, n, r, o, i, s, a, u, c, l, d, f) {
  const h = m(), p = oi(h, t, n, r, o, i, s, a, u, c, l, d);
  return Ht(e, p, f, !1), Wh;
}
function qh(e, t, n, r, o, i, s, a, u, c, l, d, f, h, p) {
  const g = m(), D = ii(g, t, n, r, o, i, s, a, u, c, l, d, f, h);
  return Ht(e, D, p, !1), qh;
}
function Qh(e, t, n, r, o, i, s, a, u, c, l, d, f, h, p, g, D) {
  const I = m(), y = si(I, t, n, r, o, i, s, a, u, c, l, d, f, h, p, g);
  return Ht(e, y, D, !1), Qh;
}
function Zh(e, t, n, r, o, i, s, a, u, c, l, d, f, h, p, g, D, I, y) {
  const M = m(), k = ai(M, t, n, r, o, i, s, a, u, c, l, d, f, h, p, g, D, I);
  return Ht(e, k, y, !1), Zh;
}
function Yh(e, t, n) {
  const r = m(), o = Xo(r, t);
  return Ht(e, o, n, !1), Yh;
}
function l0(e, t = "") {
  const n = m(), r = x(), o = e + T;
  ngDevMode && A(X(), r.bindingStartIndex, "text nodes should be created before any bindings"), ngDevMode && Ee(n, o);
  const i = r.firstCreatePass ? qo(r, o, 1, t, null) : r.data[o], s = d0(r, n, i, t, e);
  n[o] = s, vs() && Lu(r, n, s, i), Xt(i, !1);
}
let d0 = (e, t, n, r, o) => (nn(!0), Mf(t[F], r));
function qF(e, t, n, r, o) {
  const i = t[gt], s = !i || Bo() || Rs(n) || Au(i, o);
  if (nn(s), s)
    return Mf(t[F], r);
  const a = qu(i, e, t, n);
  return ngDevMode && As(a, Node.TEXT_NODE, null, t, n), ngDevMode && zo(a), a;
}
function QF() {
  d0 = qF;
}
function Kh(e) {
  return hc("", e, ""), Kh;
}
function hc(e, t, n) {
  const r = m(), o = ei(r, e, t, n);
  return o !== O && Sn(r, He(), o), hc;
}
function Jh(e, t, n, r, o) {
  const i = m(), s = ti(i, e, t, n, r, o);
  return s !== O && Sn(i, He(), s), Jh;
}
function Xh(e, t, n, r, o, i, s) {
  const a = m(), u = ni(a, e, t, n, r, o, i, s);
  return u !== O && Sn(a, He(), u), Xh;
}
function ep(e, t, n, r, o, i, s, a, u) {
  const c = m(), l = ri(c, e, t, n, r, o, i, s, a, u);
  return l !== O && Sn(c, He(), l), ep;
}
function tp(e, t, n, r, o, i, s, a, u, c, l) {
  const d = m(), f = oi(d, e, t, n, r, o, i, s, a, u, c, l);
  return f !== O && Sn(d, He(), f), tp;
}
function np(e, t, n, r, o, i, s, a, u, c, l, d, f) {
  const h = m(), p = ii(h, e, t, n, r, o, i, s, a, u, c, l, d, f);
  return p !== O && Sn(h, He(), p), np;
}
function rp(e, t, n, r, o, i, s, a, u, c, l, d, f, h, p) {
  const g = m(), D = si(g, e, t, n, r, o, i, s, a, u, c, l, d, f, h, p);
  return D !== O && Sn(g, He(), D), rp;
}
function op(e, t, n, r, o, i, s, a, u, c, l, d, f, h, p, g, D) {
  const I = m(), y = ai(I, e, t, n, r, o, i, s, a, u, c, l, d, f, h, p, g, D);
  return y !== O && Sn(I, He(), y), op;
}
function ip(e) {
  const t = m(), n = Xo(t, e);
  return n !== O && Sn(t, He(), n), ip;
}
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function sp(e, t, n) {
  zI(t) && (t = t());
  const r = m(), o = $t();
  if (be(r, o, t)) {
    const i = x(), s = ue();
    st(i, s, r, e, t, r[F], n, !1), ngDevMode && ve(i.data, s, e, o);
  }
  return sp;
}
function f0(e, t) {
  const n = zI(e);
  return n && e.set(t), n;
}
function ap(e, t) {
  const n = m(), r = x(), o = K();
  return Nh(r, n, n[F], o, e, t), ap;
}
function ZF(e, t, n) {
  const r = x();
  if (r.firstCreatePass) {
    const o = bt(e);
    ad(n, r.data, r.blueprint, o, !0), ad(t, r.data, r.blueprint, o, !1);
  }
}
function ad(e, t, n, r, o) {
  if (e = R(e), Array.isArray(e))
    for (let i = 0; i < e.length; i++)
      ad(e[i], t, n, r, o);
  else {
    const i = x(), s = m(), a = K();
    let u = fr(e) ? e : R(e.provide);
    const c = ky(e);
    if (ngDevMode) {
      const h = new ye(a, s);
      gi(h, u, () => {
        fl(e, o);
      });
    }
    const l = a.providerIndexes & 1048575, d = a.directiveStart, f = a.providerIndexes >> 20;
    if (fr(e) || !e.multi) {
      const h = new Is(c, o, Ur), p = Vc(u, t, o ? l : l + f, d);
      p === -1 ? (Ml(ka(a, s), i, u), Hc(i, e, t.length), t.push(u), a.directiveStart++, a.directiveEnd++, o && (a.providerIndexes += 1048576), n.push(h), s.push(h)) : (n[p] = h, s[p] = h);
    } else {
      const h = Vc(u, t, l + f, d), p = Vc(u, t, l, l + f), g = h >= 0 && n[h], D = p >= 0 && n[p];
      if (o && !D || !o && !g) {
        Ml(ka(a, s), i, u);
        const I = JF(o ? KF : YF, n.length, o, r, c);
        !o && D && (n[p].providerFactory = I), Hc(i, e, t.length, 0), t.push(u), a.directiveStart++, a.directiveEnd++, o && (a.providerIndexes += 1048576), n.push(I), s.push(I);
      } else {
        const I = h0(n[o ? p : h], c, !o && r);
        Hc(i, e, h > -1 ? h : p, I);
      }
      !o && r && D && n[p].componentProviders++;
    }
  }
}
function Hc(e, t, n, r) {
  const o = fr(t), i = TM(t);
  if (o || i) {
    const u = (i ? R(t.useClass) : t).prototype.ngOnDestroy;
    if (u) {
      const c = e.destroyHooks || (e.destroyHooks = []);
      if (!o && t.multi) {
        ngDevMode && E(r, "indexInFactory when registering multi factory destroy hook");
        const l = c.indexOf(n);
        l === -1 ? c.push(n, [r, u]) : c[l + 1].push(r, u);
      } else
        c.push(n, u);
    }
  }
}
function h0(e, t, n) {
  return n && e.componentProviders++, e.multi.push(t) - 1;
}
function Vc(e, t, n, r) {
  for (let o = n; o < r; o++)
    if (t[o] === e)
      return o;
  return -1;
}
function YF(e, t, n, r) {
  return ud(this.multi, []);
}
function KF(e, t, n, r) {
  const o = this.multi;
  let i;
  if (this.providerFactory) {
    const s = this.providerFactory.componentProviders, a = Dr(n, n[C], this.providerFactory.index, r);
    i = a.slice(0, s), ud(o, i);
    for (let u = s; u < a.length; u++)
      i.push(a[u]);
  } else
    i = [], ud(o, i);
  return i;
}
function ud(e, t) {
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    t.push(r());
  }
  return t;
}
function JF(e, t, n, r, o) {
  const i = new Is(e, n, Ur);
  return i.multi = [], i.index = t, i.componentProviders = 0, h0(i, o, r && !n), i;
}
function p0(e, t = []) {
  return (n) => {
    n.providersResolver = (r, o) => ZF(
      r,
      //
      o ? o(e) : e,
      //
      t
    );
  };
}
class Ka {
  constructor(t) {
    this._injector = t, this.cachedInjectors = /* @__PURE__ */ new Map();
  }
  getOrCreateStandaloneInjector(t) {
    if (!t.standalone)
      return null;
    if (!this.cachedInjectors.has(t)) {
      const n = Rd(!1, t.type), r = n.length > 0 ? rh([n], this._injector, `Standalone[${t.type.name}]`) : null;
      this.cachedInjectors.set(t, r);
    }
    return this.cachedInjectors.get(t);
  }
  ngOnDestroy() {
    try {
      for (const t of this.cachedInjectors.values())
        t !== null && t.destroy();
    } finally {
      this.cachedInjectors.clear();
    }
  }
  static {
    this.ɵprov = te({
      token: Ka,
      providedIn: "environment",
      factory: () => new Ka(Ne(Pt))
    });
  }
}
function g0(e) {
  _t("NgStandalone"), e.getStandaloneInjector = (t) => t.get(Ka).getOrCreateStandaloneInjector(e);
}
function m0(e, t, n) {
  const r = e.ɵcmp;
  r.directiveDefs = Sa(
    t,
    /* pipeDef */
    !1
  ), r.pipeDefs = Sa(
    n,
    /* pipeDef */
    !0
  );
}
function y0(e, t) {
  return en(() => {
    const n = pt(e, !0);
    n.declarations = Ys(t.declarations || q), n.imports = Ys(t.imports || q), n.exports = Ys(t.exports || q), t.bootstrap && (n.bootstrap = Ys(t.bootstrap)), Cr.registerNgModule(e, t);
  });
}
function Ys(e) {
  if (typeof e == "function")
    return e;
  const t = tt(e);
  return t.some(fu) ? () => t.map(R).map(rm) : t.map(rm);
}
function rm(e) {
  return Vf(e) ? e.ngModule : e;
}
function D0(e, t, n) {
  const r = Ke() + e, o = m();
  return o[r] === O ? an(o, r, n ? t.call(n) : t()) : ks(o, r);
}
function v0(e, t, n, r) {
  return T0(m(), Ke(), e, t, n, r);
}
function I0(e, t, n, r, o) {
  return A0(m(), Ke(), e, t, n, r, o);
}
function C0(e, t, n, r, o, i) {
  return O0(m(), Ke(), e, t, n, r, o, i);
}
function E0(e, t, n, r, o, i, s) {
  return F0(m(), Ke(), e, t, n, r, o, i, s);
}
function b0(e, t, n, r, o, i, s, a) {
  const u = Ke() + e, c = m(), l = wt(c, u, n, r, o, i);
  return be(c, u + 4, s) || l ? an(c, u + 5, a ? t.call(a, n, r, o, i, s) : t(n, r, o, i, s)) : ks(c, u + 5);
}
function w0(e, t, n, r, o, i, s, a, u) {
  const c = Ke() + e, l = m(), d = wt(l, c, n, r, o, i);
  return Er(l, c + 4, s, a) || d ? an(l, c + 6, u ? t.call(u, n, r, o, i, s, a) : t(n, r, o, i, s, a)) : ks(l, c + 6);
}
function M0(e, t, n, r, o, i, s, a, u, c) {
  const l = Ke() + e, d = m();
  let f = wt(d, l, n, r, o, i);
  return ec(d, l + 4, s, a, u) || f ? an(d, l + 7, c ? t.call(c, n, r, o, i, s, a, u) : t(n, r, o, i, s, a, u)) : ks(d, l + 7);
}
function _0(e, t, n, r, o, i, s, a, u, c, l) {
  const d = Ke() + e, f = m(), h = wt(f, d, n, r, o, i);
  return wt(f, d + 4, s, a, u, c) || h ? an(f, d + 8, l ? t.call(l, n, r, o, i, s, a, u, c) : t(n, r, o, i, s, a, u, c)) : ks(f, d + 8);
}
function S0(e, t, n, r) {
  return N0(m(), Ke(), e, t, n, r);
}
function Ls(e, t) {
  ngDevMode && Ee(e, t);
  const n = e[t];
  return n === O ? void 0 : n;
}
function T0(e, t, n, r, o, i) {
  const s = t + n;
  return be(e, s, o) ? an(e, s + 1, i ? r.call(i, o) : r(o)) : Ls(e, s + 1);
}
function A0(e, t, n, r, o, i, s) {
  const a = t + n;
  return Er(e, a, o, i) ? an(e, a + 2, s ? r.call(s, o, i) : r(o, i)) : Ls(e, a + 2);
}
function O0(e, t, n, r, o, i, s, a) {
  const u = t + n;
  return ec(e, u, o, i, s) ? an(e, u + 3, a ? r.call(a, o, i, s) : r(o, i, s)) : Ls(e, u + 3);
}
function F0(e, t, n, r, o, i, s, a, u) {
  const c = t + n;
  return wt(e, c, o, i, s, a) ? an(e, c + 4, u ? r.call(u, o, i, s, a) : r(o, i, s, a)) : Ls(e, c + 4);
}
function N0(e, t, n, r, o, i) {
  let s = t + n, a = !1;
  for (let u = 0; u < o.length; u++)
    be(e, s++, o[u]) && (a = !0);
  return a ? an(e, s, r.apply(i, o)) : Ls(e, s);
}
function k0(e, t) {
  const n = x();
  let r;
  const o = e + T;
  n.firstCreatePass ? (r = XF(t, n.pipeRegistry), n.data[o] = r, r.onDestroy && (n.destroyHooks ??= []).push(o, r.onDestroy)) : r = n.data[o];
  const i = r.factory || (r.factory = cr(r.type, !0));
  let s;
  ngDevMode && (s = Ge({
    injector: new ye(K(), m()),
    token: r.type
  }));
  const a = et(Ur);
  try {
    const u = Na(!1), c = i();
    return Na(u), XE(n, m(), o, c), c;
  } finally {
    et(a), ngDevMode && Ge(s);
  }
}
function XF(e, t) {
  if (t) {
    ngDevMode && t.filter((r) => r.name === e).length > 1 && console.warn(me(313, eN(e)));
    for (let n = t.length - 1; n >= 0; n--) {
      const r = t[n];
      if (e === r.name)
        return r;
    }
  }
  if (ngDevMode)
    throw new v(-302, tN(e));
}
function eN(e) {
  const t = m(), r = t[De][ie], o = Nu(t), i = r ? ` in the '${r.constructor.name}' component` : "";
  return `Multiple pipes match the name \`${e}\`${i}. ${`check ${o ? "'@Component.imports' of this component" : "the imports of this module"}`}`;
}
function tN(e) {
  const t = m(), r = t[De][ie], o = Nu(t), i = r ? ` in the '${r.constructor.name}' component` : "";
  return `The pipe '${e}' could not be found${i}. ${`Verify that it is ${o ? "included in the '@Component.imports' of this component" : "declared or imported in this module"}`}`;
}
function R0(e, t, n) {
  const r = e + T, o = m(), i = $o(o, r);
  return js(o, r) ? T0(o, Ke(), t, i.transform, n, i) : i.transform(n);
}
function x0(e, t, n, r) {
  const o = e + T, i = m(), s = $o(i, o);
  return js(i, o) ? A0(i, Ke(), t, s.transform, n, r, s) : s.transform(n, r);
}
function P0(e, t, n, r, o) {
  const i = e + T, s = m(), a = $o(s, i);
  return js(s, i) ? O0(s, Ke(), t, a.transform, n, r, o, a) : a.transform(n, r, o);
}
function L0(e, t, n, r, o, i) {
  const s = e + T, a = m(), u = $o(a, s);
  return js(a, s) ? F0(a, Ke(), t, u.transform, n, r, o, i, u) : u.transform(n, r, o, i);
}
function j0(e, t, n) {
  const r = e + T, o = m(), i = $o(o, r);
  return js(o, r) ? N0(o, Ke(), t, i.transform, n, i) : i.transform.apply(i, n);
}
function js(e, t) {
  return e[C].data[t].pure;
}
function $0(e, t) {
  return zu(e, t);
}
function B0(e, t) {
  return () => {
    try {
      return Cr.getComponentDependencies(e, t).dependencies;
    } catch (n) {
      throw console.error(`Computing dependencies in local compilation mode for the component "${e.name}" failed with the exception:`, n), n;
    }
  };
}
function H0(e, t) {
  const n = V(e);
  n !== null && (n.debugInfo = t);
}
const qe = {
  ɵɵattribute: uh,
  ɵɵattributeInterpolate1: ch,
  ɵɵattributeInterpolate2: lh,
  ɵɵattributeInterpolate3: dh,
  ɵɵattributeInterpolate4: fh,
  ɵɵattributeInterpolate5: hh,
  ɵɵattributeInterpolate6: ph,
  ɵɵattributeInterpolate7: gh,
  ɵɵattributeInterpolate8: mh,
  ɵɵattributeInterpolateV: yh,
  ɵɵdefineComponent: by,
  ɵɵdefineDirective: wy,
  ɵɵdefineInjectable: te,
  ɵɵdefineInjector: hu,
  ɵɵdefineNgModule: kd,
  ɵɵdefinePipe: My,
  ɵɵdirectiveInject: Ur,
  ɵɵgetInheritedFactory: TD,
  ɵɵinject: Ne,
  ɵɵinjectAttribute: Mu,
  ɵɵinvalidFactory: Kv,
  ɵɵinvalidFactoryDep: Ad,
  ɵɵtemplateRefExtractor: $0,
  ɵɵresetView: sD,
  ɵɵHostDirectivesFeature: uC,
  ɵɵNgOnChangesFeature: Ud,
  ɵɵProvidersFeature: p0,
  ɵɵCopyDefinitionFeature: aC,
  ɵɵInheritDefinitionFeature: th,
  ɵɵInputTransformsFeature: lC,
  ɵɵStandaloneFeature: g0,
  ɵɵnextContext: UE,
  ɵɵnamespaceHTML: yD,
  ɵɵnamespaceMathML: mD,
  ɵɵnamespaceSVG: gD,
  ɵɵenableBindings: rD,
  ɵɵdisableBindings: oD,
  ɵɵelementStart: oc,
  ɵɵelementEnd: ic,
  ɵɵelement: Ch,
  ɵɵelementContainerStart: sc,
  ɵɵelementContainerEnd: ac,
  ɵɵelementContainer: Eh,
  ɵɵpureFunction0: D0,
  ɵɵpureFunction1: v0,
  ɵɵpureFunction2: I0,
  ɵɵpureFunction3: C0,
  ɵɵpureFunction4: E0,
  ɵɵpureFunction5: b0,
  ɵɵpureFunction6: w0,
  ɵɵpureFunction7: M0,
  ɵɵpureFunction8: _0,
  ɵɵpureFunctionV: S0,
  ɵɵgetCurrentView: CE,
  ɵɵrestoreView: iD,
  ɵɵlistener: Oh,
  ɵɵprojection: GE,
  ɵɵsyntheticHostProperty: wh,
  ɵɵsyntheticHostListener: Fh,
  ɵɵpipeBind1: R0,
  ɵɵpipeBind2: x0,
  ɵɵpipeBind3: P0,
  ɵɵpipeBind4: L0,
  ɵɵpipeBindV: j0,
  ɵɵprojectionDef: zE,
  ɵɵhostProperty: bh,
  ɵɵproperty: Dh,
  ɵɵpropertyInterpolate: kh,
  ɵɵpropertyInterpolate1: fc,
  ɵɵpropertyInterpolate2: Rh,
  ɵɵpropertyInterpolate3: xh,
  ɵɵpropertyInterpolate4: Ph,
  ɵɵpropertyInterpolate5: Lh,
  ɵɵpropertyInterpolate6: jh,
  ɵɵpropertyInterpolate7: $h,
  ɵɵpropertyInterpolate8: Bh,
  ɵɵpropertyInterpolateV: Hh,
  ɵɵpipe: k0,
  ɵɵqueryRefresh: QE,
  ɵɵqueryAdvance: JE,
  ɵɵviewQuery: qE,
  ɵɵviewQuerySignal: KE,
  ɵɵloadQuery: ZE,
  ɵɵcontentQuery: WE,
  ɵɵcontentQuerySignal: YE,
  ɵɵreference: e0,
  ɵɵclassMap: JC,
  ɵɵclassMapInterpolate1: oE,
  ɵɵclassMapInterpolate2: iE,
  ɵɵclassMapInterpolate3: sE,
  ɵɵclassMapInterpolate4: aE,
  ɵɵclassMapInterpolate5: uE,
  ɵɵclassMapInterpolate6: cE,
  ɵɵclassMapInterpolate7: lE,
  ɵɵclassMapInterpolate8: dE,
  ɵɵclassMapInterpolateV: fE,
  ɵɵstyleMap: Bt,
  ɵɵstyleMapInterpolate1: t0,
  ɵɵstyleMapInterpolate2: n0,
  ɵɵstyleMapInterpolate3: r0,
  ɵɵstyleMapInterpolate4: o0,
  ɵɵstyleMapInterpolate5: i0,
  ɵɵstyleMapInterpolate6: s0,
  ɵɵstyleMapInterpolate7: a0,
  ɵɵstyleMapInterpolate8: u0,
  ɵɵstyleMapInterpolateV: c0,
  ɵɵstyleProp: vh,
  ɵɵstylePropInterpolate1: Vh,
  ɵɵstylePropInterpolate2: Uh,
  ɵɵstylePropInterpolate3: zh,
  ɵɵstylePropInterpolate4: Gh,
  ɵɵstylePropInterpolate5: Wh,
  ɵɵstylePropInterpolate6: qh,
  ɵɵstylePropInterpolate7: Qh,
  ɵɵstylePropInterpolate8: Zh,
  ɵɵstylePropInterpolateV: Yh,
  ɵɵclassProp: Ih,
  ɵɵadvance: Zv,
  ɵɵtemplate: _o,
  ɵɵconditional: pE,
  ɵɵdefer: AC,
  ɵɵdeferWhen: OC,
  ɵɵdeferOnIdle: NC,
  ɵɵdeferOnImmediate: RC,
  ɵɵdeferOnTimer: PC,
  ɵɵdeferOnHover: jC,
  ɵɵdeferOnInteraction: BC,
  ɵɵdeferOnViewport: VC,
  ɵɵdeferPrefetchWhen: FC,
  ɵɵdeferPrefetchOnIdle: kC,
  ɵɵdeferPrefetchOnImmediate: xC,
  ɵɵdeferPrefetchOnTimer: LC,
  ɵɵdeferPrefetchOnHover: $C,
  ɵɵdeferPrefetchOnInteraction: HC,
  ɵɵdeferPrefetchOnViewport: UC,
  ɵɵdeferEnableTimerScheduling: TC,
  ɵɵrepeater: DE,
  ɵɵrepeaterCreate: yE,
  ɵɵrepeaterTrackByIndex: gE,
  ɵɵrepeaterTrackByIdentity: mE,
  ɵɵcomponentInstance: hE,
  ɵɵtext: l0,
  ɵɵtextInterpolate: Kh,
  ɵɵtextInterpolate1: hc,
  ɵɵtextInterpolate2: Jh,
  ɵɵtextInterpolate3: Xh,
  ɵɵtextInterpolate4: ep,
  ɵɵtextInterpolate5: tp,
  ɵɵtextInterpolate6: np,
  ɵɵtextInterpolate7: rp,
  ɵɵtextInterpolate8: op,
  ɵɵtextInterpolateV: ip,
  ɵɵi18n: $E,
  ɵɵi18nAttributes: BE,
  ɵɵi18nExp: Ah,
  ɵɵi18nStart: Sh,
  ɵɵi18nEnd: Th,
  ɵɵi18nApply: HE,
  ɵɵi18nPostprocess: VE,
  ɵɵresolveWindow: Ov,
  ɵɵresolveDocument: Fv,
  ɵɵresolveBody: bf,
  ɵɵsetComponentScope: m0,
  ɵɵsetNgModuleScope: y0,
  ɵɵregisterNgModuleType: eh,
  ɵɵgetComponentDepsFactory: B0,
  ɵsetClassDebugInfo: H0,
  ɵɵsanitizeHtml: Iv,
  ɵɵsanitizeStyle: Cv,
  ɵɵsanitizeResourceUrl: vf,
  ɵɵsanitizeScript: Ev,
  ɵɵsanitizeUrl: Df,
  ɵɵsanitizeUrlOrResourceUrl: Mv,
  ɵɵtrustConstantHtml: bv,
  ɵɵtrustConstantResourceUrl: wv,
  ɵɵvalidateIframeAttribute: iC,
  forwardRef: du,
  resolveForwardRef: R,
  ɵɵtwoWayProperty: sp,
  ɵɵtwoWayBindingSet: f0,
  ɵɵtwoWayListener: ap,
  ɵɵInputFlags: yn
};
let Jr = null;
function nN(e) {
  if (Jr !== null) {
    if (e.defaultEncapsulation !== Jr.defaultEncapsulation) {
      ngDevMode && console.error("Provided value for `defaultEncapsulation` can not be changed once it has been set.");
      return;
    }
    if (e.preserveWhitespaces !== Jr.preserveWhitespaces) {
      ngDevMode && console.error("Provided value for `preserveWhitespaces` can not be changed once it has been set.");
      return;
    }
  }
  Jr = e;
}
function rN() {
  return Jr;
}
function oN() {
  Jr = null;
}
const Si = [];
function iN(e, t) {
  Si.push({ moduleType: e, ngModule: t });
}
let Uc = !1;
function V0() {
  if (!Uc) {
    Uc = !0;
    try {
      for (let e = Si.length - 1; e >= 0; e--) {
        const { moduleType: t, ngModule: n } = Si[e];
        n.declarations && n.declarations.every(U0) && (Si.splice(e, 1), uN(t, n));
      }
    } finally {
      Uc = !1;
    }
  }
}
function U0(e) {
  return Array.isArray(e) ? e.every(U0) : !!R(e);
}
function z0(e, t = {}) {
  G0(e, t), t.id !== void 0 && eh(e, t.id), iN(e, t);
}
function G0(e, t, n = !1) {
  ngDevMode && E(e, "Required value moduleType"), ngDevMode && E(t, "Required value ngModule");
  const r = tt(t.declarations || q);
  let o = null;
  Object.defineProperty(e, _d, {
    configurable: !0,
    get: () => {
      if (o === null) {
        if (ngDevMode && t.imports && t.imports.indexOf(e) > -1)
          throw new Error(`'${U(e)}' module can't import itself`);
        o = Ae({ usage: 0, kind: "NgModule", type: e }).compileNgModule(qe, `ng:///${e.name}/ɵmod.js`, {
          type: e,
          bootstrap: tt(t.bootstrap || q).map(R),
          declarations: r.map(R),
          imports: tt(t.imports || q).map(R).map(im),
          exports: tt(t.exports || q).map(R).map(im),
          schemas: t.schemas ? tt(t.schemas) : null,
          id: t.id || null
        }), o.schemas || (o.schemas = []);
      }
      return o;
    }
  });
  let i = null;
  Object.defineProperty(e, gn, {
    get: () => {
      if (i === null) {
        const a = Ae({ usage: 0, kind: "NgModule", type: e });
        i = a.compileFactory(qe, `ng:///${e.name}/ɵfac.js`, {
          name: e.name,
          type: e,
          deps: _u(e),
          target: a.FactoryTarget.NgModule,
          typeArgumentCount: 0
        });
      }
      return i;
    },
    // Make the property configurable in dev mode to allow overriding in tests
    configurable: !!ngDevMode
  });
  let s = null;
  Object.defineProperty(e, Ea, {
    get: () => {
      if (s === null) {
        ngDevMode && Ja(e, n);
        const a = {
          name: e.name,
          type: e,
          providers: t.providers || q,
          imports: [
            (t.imports || q).map(R),
            (t.exports || q).map(R)
          ]
        };
        s = Ae({ usage: 0, kind: "NgModule", type: e }).compileInjector(qe, `ng:///${e.name}/ɵinj.js`, a);
      }
      return s;
    },
    // Make the property configurable in dev mode to allow overriding in tests
    configurable: !!ngDevMode
  });
}
function W0(e, t) {
  const n = `Unexpected "${U(e)}" found in the "declarations" array of the`, r = `"${U(e)}" is marked as standalone and can't be declared in any NgModule - did you intend to import it instead (by adding it to the "imports" array)?`;
  return `${n} ${t}, ${r}`;
}
function Ja(e, t, n) {
  if (cd.get(e) || On(e))
    return;
  cd.set(e, !0), e = R(e);
  let r;
  if (n) {
    if (r = pt(e), !r)
      throw new Error(`Unexpected value '${e.name}' imported by the module '${n.name}'. Please add an @NgModule annotation.`);
  } else
    r = pt(e, !0);
  const o = [], i = Wt(r.declarations), s = Wt(r.imports);
  tt(s).map(om).forEach((y) => {
    I(y, e), Ja(y, !1, e);
  });
  const a = Wt(r.exports);
  i.forEach(l), i.forEach(d), i.forEach((y) => f(y, e));
  const u = [
    ...i.map(R),
    ...tt(s.map(q0)).map(R)
  ];
  a.forEach(h), i.forEach((y) => p(y, t));
  const c = sN(e, "NgModule");
  if (c && (c.imports && tt(c.imports).map(om).forEach((y) => {
    I(y, e), Ja(y, !1, e);
  }), c.bootstrap && go(c.bootstrap, D), c.bootstrap && go(c.bootstrap, g)), o.length)
    throw new Error(o.join(`
`));
  function l(y) {
    y = R(y), V(y) || Fe(y) || dt(y) || o.push(`Unexpected value '${U(y)}' declared by the module '${U(e)}'. Please add a @Pipe/@Directive/@Component annotation.`);
  }
  function d(y) {
    y = R(y);
    const M = Fe(y);
    !V(y) && M && M.selectors.length == 0 && o.push(`Directive ${U(y)} has no selector, please add it!`);
  }
  function f(y, M) {
    if (y = R(y), (V(y) || Fe(y) || dt(y))?.standalone) {
      const G = `"${U(M)}" NgModule`;
      o.push(W0(y, G));
    }
  }
  function h(y) {
    y = R(y);
    const M = V(y) && "component" || Fe(y) && "directive" || dt(y) && "pipe";
    M && u.lastIndexOf(y) === -1 && o.push(`Can't export ${M} ${U(y)} from ${U(e)} as it was neither declared nor imported!`);
  }
  function p(y, M) {
    y = R(y);
    const k = Da.get(y);
    if (k && k !== e) {
      if (!M) {
        const G = [k, e].map(U).sort();
        o.push(`Type ${U(y)} is part of the declarations of 2 modules: ${G[0]} and ${G[1]}! Please consider moving ${U(y)} to a higher module that imports ${G[0]} and ${G[1]}. You can also create a new NgModule that exports and includes ${U(y)} then import that NgModule in ${G[0]} and ${G[1]}.`);
      }
    } else
      Da.set(y, e);
  }
  function g(y) {
    y = R(y), !Da.get(y) && !On(y) && o.push(`Component ${U(y)} is not part of any NgModule or the module has not been imported into your module.`);
  }
  function D(y) {
    y = R(y), V(y) || o.push(`${U(y)} cannot be used as an entry component.`), On(y) && o.push(`The \`${U(y)}\` class is a standalone component, which can not be used in the \`@NgModule.bootstrap\` array. Use the \`bootstrapApplication\` function for bootstrap instead.`);
  }
  function I(y, M) {
    y = R(y);
    const k = V(y) || Fe(y);
    if (k !== null && !k.standalone)
      throw new Error(`Unexpected directive '${y.name}' imported by the module '${M.name}'. Please add an @NgModule annotation.`);
    const G = dt(y);
    if (G !== null && !G.standalone)
      throw new Error(`Unexpected pipe '${y.name}' imported by the module '${M.name}'. Please add an @NgModule annotation.`);
  }
}
function om(e) {
  return e = R(e), e.ngModule || e;
}
function sN(e, t) {
  let n = null;
  return r(e.__annotations__), r(e.decorators), n;
  function r(i) {
    i && i.forEach(o);
  }
  function o(i) {
    n || (Object.getPrototypeOf(i).ngMetadataName == t ? n = i : i.type && Object.getPrototypeOf(i.type).ngMetadataName == t && (n = i.args[0]));
  }
}
let Da = /* @__PURE__ */ new WeakMap(), cd = /* @__PURE__ */ new WeakMap();
function aN() {
  Da = /* @__PURE__ */ new WeakMap(), cd = /* @__PURE__ */ new WeakMap(), Si.length = 0, ca.clear();
}
function q0(e) {
  e = R(e);
  const t = pt(e);
  return t === null ? [e] : tt(Wt(t.exports).map((n) => pt(n) ? (Ja(n, !1), q0(n)) : n));
}
function uN(e, t) {
  const n = tt(t.declarations || q), r = cp(e);
  n.forEach((o) => {
    if (o = R(o), o.hasOwnProperty(Po)) {
      const s = V(o);
      up(s, r);
    } else !o.hasOwnProperty(pu) && !o.hasOwnProperty(gu) && (o.ngSelectorScope = e);
  });
}
function up(e, t) {
  e.directiveDefs = () => Array.from(t.compilation.directives).map((n) => n.hasOwnProperty(Po) ? V(n) : Fe(n)).filter((n) => !!n), e.pipeDefs = () => Array.from(t.compilation.pipes).map((n) => dt(n)), e.schemas = t.schemas, e.tView = null;
}
function cp(e) {
  if (ir(e)) {
    const t = Cr.getNgModuleScope(e);
    return {
      schemas: pt(e, !0).schemas || null,
      ...t
    };
  } else if (On(e)) {
    if ((V(e) || Fe(e)) !== null)
      return {
        schemas: null,
        compilation: {
          directives: /* @__PURE__ */ new Set(),
          pipes: /* @__PURE__ */ new Set()
        },
        exported: {
          directives: /* @__PURE__ */ new Set([e]),
          pipes: /* @__PURE__ */ new Set()
        }
      };
    if (dt(e) !== null)
      return {
        schemas: null,
        compilation: {
          directives: /* @__PURE__ */ new Set(),
          pipes: /* @__PURE__ */ new Set()
        },
        exported: {
          directives: /* @__PURE__ */ new Set(),
          pipes: /* @__PURE__ */ new Set([e])
        }
      };
  }
  throw new Error(`${e.name} does not have a module def (ɵmod property)`);
}
function im(e) {
  return Vf(e) ? e.ngModule : e;
}
let zc = 0;
function Q0(e, t) {
  (typeof ngDevMode > "u" || ngDevMode) && Ed();
  let n = null;
  M1(e, t), Y0(e, t), Object.defineProperty(e, Po, {
    get: () => {
      if (n === null) {
        const r = Ae({ usage: 0, kind: "component", type: e });
        if (tC(t)) {
          const c = [`Component '${e.name}' is not resolved:`];
          throw t.templateUrl && c.push(` - templateUrl: ${t.templateUrl}`), t.styleUrls && t.styleUrls.length && c.push(` - styleUrls: ${JSON.stringify(t.styleUrls)}`), t.styleUrl && c.push(` - styleUrl: ${t.styleUrl}`), c.push("Did you run and wait for 'resolveComponentResources()'?"), new Error(c.join(`
`));
        }
        const o = rN();
        let i = t.preserveWhitespaces;
        i === void 0 && (o !== null && o.preserveWhitespaces !== void 0 ? i = o.preserveWhitespaces : i = !1);
        let s = t.encapsulation;
        s === void 0 && (o !== null && o.defaultEncapsulation !== void 0 ? s = o.defaultEncapsulation : s = mn.Emulated);
        const a = t.templateUrl || `ng:///${e.name}/template.html`, u = {
          ...K0(e, t),
          typeSourceSpan: r.createParseSourceSpan("Component", e.name, a),
          template: t.template || "",
          preserveWhitespaces: i,
          styles: typeof t.styles == "string" ? [t.styles] : t.styles || q,
          animations: t.animations,
          // JIT components are always compiled against an empty set of `declarations`. Instead, the
          // `directiveDefs` and `pipeDefs` are updated at a later point:
          //  * for NgModule-based components, they're set when the NgModule which declares the
          //    component resolves in the module scoping queue
          //  * for standalone components, they're set just below, after `compileComponent`.
          declarations: [],
          changeDetection: t.changeDetection,
          encapsulation: s,
          interpolation: t.interpolation,
          viewProviders: t.viewProviders || null
        };
        zc++;
        try {
          if (u.usesInheritance && J0(e), n = r.compileComponent(qe, a, u), t.standalone) {
            const c = tt(t.imports || q), { directiveDefs: l, pipeDefs: d } = cN(e, c);
            n.directiveDefs = l, n.pipeDefs = d, n.dependencies = () => c.map(R);
          }
        } finally {
          zc--;
        }
        if (zc === 0 && V0(), lN(e)) {
          const c = cp(e.ngSelectorScope);
          up(n, c);
        }
        if (t.schemas)
          if (t.standalone)
            n.schemas = t.schemas;
          else
            throw new Error(`The 'schemas' was specified for the ${U(e)} but is only valid on a component that is standalone.`);
        else t.standalone && (n.schemas = []);
      }
      return n;
    },
    // Make the property configurable in dev mode to allow overriding in tests
    configurable: !!ngDevMode
  });
}
function cN(e, t) {
  return {
    directiveDefs: () => {
      {
        if (ngDevMode)
          for (const i of t)
            Zl(i, e);
        return Ci(e) ? [...Cr.getStandaloneComponentScope(e, t).compilation.directives].map((i) => V(i) || Fe(i)).filter((i) => i !== null) : [];
      }
    },
    pipeDefs: () => {
      {
        if (ngDevMode)
          for (const i of t)
            Zl(i, e);
        return Ci(e) ? [...Cr.getStandaloneComponentScope(e, t).compilation.pipes].map((i) => dt(i)).filter((i) => i !== null) : [];
      }
    }
  };
}
function lN(e) {
  return e.ngSelectorScope !== void 0;
}
function lp(e, t) {
  let n = null;
  Y0(e, t || {}), Object.defineProperty(e, pu, {
    get: () => {
      if (n === null) {
        const r = Z0(e, t || {});
        n = Ae({ usage: 0, kind: "directive", type: e }).compileDirective(qe, r.sourceMapUrl, r.metadata);
      }
      return n;
    },
    // Make the property configurable in dev mode to allow overriding in tests
    configurable: !!ngDevMode
  });
}
function Z0(e, t) {
  const n = e && e.name, r = `ng:///${n}/ɵdir.js`, o = Ae({ usage: 0, kind: "directive", type: e }), i = K0(e, t);
  return i.typeSourceSpan = o.createParseSourceSpan("Directive", n, r), i.usesInheritance && J0(e), { metadata: i, sourceMapUrl: r };
}
function Y0(e, t) {
  let n = null;
  Object.defineProperty(e, gn, {
    get: () => {
      if (n === null) {
        const r = Z0(e, t), o = Ae({ usage: 0, kind: "directive", type: e });
        n = o.compileFactory(qe, `ng:///${e.name}/ɵfac.js`, {
          name: r.metadata.name,
          type: r.metadata.type,
          typeArgumentCount: 0,
          deps: _u(e),
          target: o.FactoryTarget.Directive
        });
      }
      return n;
    },
    // Make the property configurable in dev mode to allow overriding in tests
    configurable: !!ngDevMode
  });
}
function dN(e) {
  return Object.getPrototypeOf(e.prototype) === Object.prototype;
}
function K0(e, t) {
  const n = nf(), r = n.ownPropMetadata(e);
  return {
    name: e.name,
    type: e,
    selector: t.selector !== void 0 ? t.selector : null,
    host: t.host || xt,
    propMetadata: r,
    inputs: t.inputs || q,
    outputs: t.outputs || q,
    queries: sm(e, r, X0),
    lifecycle: { usesOnChanges: n.hasLifecycleHook(e, "ngOnChanges") },
    typeSourceSpan: null,
    usesInheritance: !dN(e),
    exportAs: pN(t.exportAs),
    providers: t.providers || null,
    viewQueries: sm(e, r, eb),
    isStandalone: !!t.standalone,
    isSignal: !!t.signals,
    hostDirectives: t.hostDirectives?.map((o) => typeof o == "function" ? { directive: o } : o) || null
  };
}
function J0(e) {
  const t = Object.prototype;
  let n = Object.getPrototypeOf(e.prototype).constructor;
  for (; n && n !== t; )
    !Fe(n) && !V(n) && mN(n) && lp(n, null), n = Object.getPrototypeOf(n);
}
function fN(e) {
  return typeof e == "string" ? nb(e) : R(e);
}
function hN(e, t) {
  return {
    propertyName: e,
    predicate: fN(t.selector),
    descendants: t.descendants,
    first: t.first,
    read: t.read ? t.read : null,
    static: !!t.static,
    emitDistinctChangesOnly: !!t.emitDistinctChangesOnly,
    isSignal: !!t.isSignal
  };
}
function sm(e, t, n) {
  const r = [];
  for (const o in t)
    if (t.hasOwnProperty(o)) {
      const i = t[o];
      i.forEach((s) => {
        if (n(s)) {
          if (!s.selector)
            throw new Error(`Can't construct a query for the property "${o}" of "${U(e)}" since the query selector wasn't defined.`);
          if (i.some(tb))
            throw new Error("Cannot combine @Input decorators with query decorators");
          r.push(hN(o, s));
        }
      });
    }
  return r;
}
function pN(e) {
  return e === void 0 ? null : nb(e);
}
function X0(e) {
  const t = e.ngMetadataName;
  return t === "ContentChild" || t === "ContentChildren";
}
function eb(e) {
  const t = e.ngMetadataName;
  return t === "ViewChild" || t === "ViewChildren";
}
function tb(e) {
  return e.ngMetadataName === "Input";
}
function nb(e) {
  return e.split(",").map((t) => t.trim());
}
const gN = [
  "ngOnChanges",
  "ngOnInit",
  "ngOnDestroy",
  "ngDoCheck",
  "ngAfterViewInit",
  "ngAfterViewChecked",
  "ngAfterContentInit",
  "ngAfterContentChecked"
];
function mN(e) {
  const t = nf();
  if (gN.some((r) => t.hasLifecycleHook(e, r)))
    return !0;
  const n = t.propMetadata(e);
  for (const r in n) {
    const o = n[r];
    for (let i = 0; i < o.length; i++) {
      const s = o[i], a = s.ngMetadataName;
      if (tb(s) || X0(s) || eb(s) || a === "Output" || a === "HostBinding" || a === "HostListener")
        return !0;
    }
  }
  return !1;
}
function rb(e, t) {
  let n = null, r = null;
  Object.defineProperty(e, gn, {
    get: () => {
      if (r === null) {
        const o = am(e, t), i = Ae({ usage: 0, kind: "pipe", type: o.type });
        r = i.compileFactory(qe, `ng:///${o.name}/ɵfac.js`, {
          name: o.name,
          type: o.type,
          typeArgumentCount: 0,
          deps: _u(e),
          target: i.FactoryTarget.Pipe
        });
      }
      return r;
    },
    // Make the property configurable in dev mode to allow overriding in tests
    configurable: !!ngDevMode
  }), Object.defineProperty(e, gu, {
    get: () => {
      if (n === null) {
        const o = am(e, t);
        n = Ae({ usage: 0, kind: "pipe", type: o.type }).compilePipe(qe, `ng:///${o.name}/ɵpipe.js`, o);
      }
      return n;
    },
    // Make the property configurable in dev mode to allow overriding in tests
    configurable: !!ngDevMode
  });
}
function am(e, t) {
  return {
    type: e,
    name: e.name,
    pipeName: t.name,
    pure: t.pure !== void 0 ? t.pure : !0,
    isStandalone: !!t.standalone
  };
}
const at = ss("Directive", (e = {}) => e, void 0, void 0, (e, t) => lp(e, t)), ob = ss("Component", (e = {}) => ({ changeDetection: dr.Default, ...e }), at, void 0, (e, t) => Q0(e, t)), ut = ss("Pipe", (e) => ({ pure: !0, ...e }), void 0, void 0, (e, t) => rb(e, t)), W = Xn("Input", (e) => e ? typeof e == "string" ? { alias: e } : e : {}), yN = Xn("Output", (e) => ({ alias: e })), DN = Xn("HostBinding", (e) => ({ hostPropertyName: e })), vN = Xn("HostListener", (e, t) => ({ eventName: e, args: t })), dp = ss(
  "NgModule",
  (e) => e,
  void 0,
  void 0,
  /**
   * Decorator that marks the following class as an NgModule, and supplies
   * configuration metadata for it.
   *
   * * The `declarations` option configures the compiler
   * with information about what belongs to the NgModule.
   * * The `providers` options configures the NgModule's injector to provide
   * dependencies the NgModule members.
   * * The `imports` and `exports` options bring in members from other modules, and make
   * this module's members available to others.
   */
  (e, t) => z0(e, t)
);
class fp {
  constructor(t) {
    this.full = t;
    const n = t.split(".");
    this.major = n[0], this.minor = n[1], this.patch = n.slice(2).join(".");
  }
}
const IN = new fp("17.3.12");
class Zt {
  log(t) {
    console.log(t);
  }
  // Note: for reporting errors use `DOM.logError()` as it is platform specific
  warn(t) {
    console.warn(t);
  }
  static {
    this.ɵfac = function(n) {
      return new (n || Zt)();
    };
  }
  static {
    this.ɵprov = /* @__PURE__ */ te({ token: Zt, factory: Zt.ɵfac, providedIn: "platform" });
  }
}
(typeof ngDevMode > "u" || ngDevMode) && Je(Zt, [{
  type: fe,
  args: [{ providedIn: "platform" }]
}], null, null);
class CN {
  constructor() {
    this.resolverToTokenToDependencies = /* @__PURE__ */ new WeakMap(), this.resolverToProviders = /* @__PURE__ */ new WeakMap(), this.standaloneInjectorToComponent = /* @__PURE__ */ new WeakMap();
  }
  reset() {
    this.resolverToTokenToDependencies = /* @__PURE__ */ new WeakMap(), this.resolverToProviders = /* @__PURE__ */ new WeakMap(), this.standaloneInjectorToComponent = /* @__PURE__ */ new WeakMap();
  }
}
let $s = new CN();
function pc() {
  return $s;
}
function EN() {
  $s.reset(), Jw((e) => bN(e));
}
function bN(e) {
  const { context: t, type: n } = e;
  n === 0 ? wN(t, e.service) : n === 1 ? _N(t, e.instance) : n === 2 && TN(t, e.providerRecord);
}
function wN(e, t) {
  const n = ib(e.injector);
  n === null && S("An Inject event must be run within an injection context.");
  const r = $s.resolverToTokenToDependencies;
  if (r.has(n) || r.set(n, /* @__PURE__ */ new WeakMap()), !AN(e.token))
    return;
  const o = r.get(n);
  o.has(e.token) || o.set(e.token, []);
  const { token: i, value: s, flags: a } = t;
  E(e.token, "Injector profiler context token is undefined.");
  const u = o.get(e.token);
  E(u, "Could not resolve dependencies for token."), e.injector instanceof ye ? u.push({ token: i, value: s, flags: a, injectedIn: MN(e.injector) }) : u.push({ token: i, value: s, flags: a });
}
function MN(e) {
  e instanceof ye || S("getNodeInjectorContext must be called with a NodeInjector");
  const t = Ho(e), n = Vo(e);
  if (n !== null)
    return Ye(n, t), { lView: t, tNode: n };
}
function _N(e, t) {
  const { value: n } = t;
  ib(e.injector) === null && S("An InjectorCreatedInstance event must be run within an injection context.");
  let r;
  if (typeof n == "object" && (r = n?.constructor), r === void 0 || !SN(r))
    return;
  const o = e.injector.get(Pt, null, { optional: !0 });
  if (o === null)
    return;
  const { standaloneInjectorToComponent: i } = $s;
  i.has(o) || i.set(o, r);
}
function SN(e) {
  return !!V(e)?.standalone;
}
function TN(e, t) {
  const { resolverToProviders: n } = $s;
  let r;
  e?.injector instanceof ye ? r = Vo(e.injector) : r = e.injector, r === null && S("A ProviderConfigured event must be run within an injection context."), n.has(r) || n.set(r, []), n.get(r).push(t);
}
function ib(e) {
  let t = null;
  return e === void 0 || (e instanceof ye ? t = Ho(e) : t = e), t;
}
function AN(e) {
  return e !== null && (typeof e == "object" || typeof e == "function" || typeof e == "symbol");
}
function ON(e) {
  ngDevMode && E(e, "component"), Ts($D(e)), ZD(e).forEach((t) => FN(t));
}
function FN(e) {
  const t = $D(e);
  t[_] |= 1024, Uu(t);
}
function NN(e, t) {
  const n = e.get(t, null, { self: !0, optional: !0 });
  if (n === null)
    throw new Error(`Unable to determine instance of ${t} in given injector`);
  const r = kN(t, e), o = sb(e), i = r.map((s) => {
    const a = {
      value: s.value
    }, u = s.flags;
    a.flags = {
      optional: (8 & u) === 8,
      host: (1 & u) === 1,
      self: (2 & u) === 2,
      skipSelf: (4 & u) === 4
    };
    for (let c = 0; c < o.length; c++) {
      const l = o[c];
      if (c === 0 && a.flags.skipSelf)
        continue;
      if (a.flags.host && l instanceof Pt)
        break;
      if (l.get(s.token, null, { self: !0, optional: !0 }) !== null) {
        if (a.flags.host) {
          o[0].get(s.token, null, { ...a.flags, optional: !0 }) !== null && (a.providedIn = l);
          break;
        }
        a.providedIn = l;
        break;
      }
      if (c === 0 && a.flags.self)
        break;
    }
    return s.token && (a.token = s.token), a;
  });
  return { instance: n, dependencies: i };
}
function kN(e, t) {
  const { resolverToTokenToDependencies: n } = pc();
  if (!(t instanceof ye))
    return n.get(t)?.get?.(e) ?? [];
  const r = Ho(t);
  return (n.get(r)?.get(e) ?? []).filter((s) => {
    const a = s.injectedIn?.tNode;
    if (a === void 0)
      return !1;
    const u = Vo(t);
    return yo(a), yo(u), a === u;
  });
}
function RN(e) {
  const { standaloneInjectorToComponent: t } = pc();
  if (t.has(e))
    return t.get(e);
  const n = e.get(Jn, null, { self: !0, optional: !0 });
  return n === null || n.instance === null ? null : n.instance.constructor;
}
function xN(e) {
  const t = Vo(e), { resolverToProviders: n } = pc();
  return n.get(t) ?? [];
}
function PN(e) {
  const t = /* @__PURE__ */ new Map(), r = LN(t, /* @__PURE__ */ new Set());
  return Ta(e, r, [], /* @__PURE__ */ new Set()), t;
}
function LN(e, t) {
  return (n, r) => {
    if (e.has(n) || e.set(n, [r]), !t.has(r))
      for (const o of e.keys()) {
        const i = e.get(o);
        let s = Ca(r);
        if (!s) {
          const c = r.ngModule;
          s = Ca(c);
        }
        if (!s)
          return;
        const a = i[0];
        let u = !1;
        go(s.imports, (c) => {
          u || (u = c.ngModule === a || c === a, u && e.get(o)?.unshift(r));
        });
      }
    t.add(r);
  };
}
function jN(e) {
  const t = pc().resolverToProviders.get(e) ?? [];
  if ($N(e))
    return t;
  const n = RN(e);
  if (n === null)
    return t;
  const r = PN(n), o = [];
  for (const i of t) {
    const s = i.provider, a = s.provide;
    if (a === lr || a === Fd)
      continue;
    let u = r.get(s) ?? [];
    !!V(n)?.standalone && (u = [n, ...u]), o.push({ ...i, importPath: u });
  }
  return o;
}
function $N(e) {
  return e instanceof Lo && e.scopes.has("platform");
}
function BN(e) {
  if (e instanceof ye)
    return xN(e);
  if (e instanceof Pt)
    return jN(e);
  S("getInjectorProviders only supports NodeInjector and EnvironmentInjector");
}
function HN(e) {
  if (e instanceof ye) {
    const t = Ho(e), n = Vo(e);
    return Ye(n, t), { type: "element", source: Be(n, t) };
  }
  return e instanceof Lo ? { type: "environment", source: e.source ?? null } : e instanceof yu ? { type: "null", source: null } : null;
}
function sb(e) {
  const t = [e];
  return ld(e, t), t;
}
function ld(e, t) {
  const n = VN(e);
  if (n === null) {
    if (e instanceof ye) {
      const r = t[0];
      if (r instanceof ye) {
        const o = UN(r);
        o === null && S("NodeInjector must have some connection to the module injector tree"), t.push(o), ld(o, t);
      }
      return t;
    }
  } else
    t.push(n), ld(n, t);
  return t;
}
function VN(e) {
  if (e instanceof Lo)
    return e.parent;
  let t, n;
  if (e instanceof ye)
    t = Vo(e), n = Ho(e);
  else {
    if (e instanceof yu)
      return null;
    if (e instanceof Ku)
      return e.parentInjector;
    S("getInjectorParent only support injectors of type R3Injector, NodeInjector, NullInjector, ChainedInjector");
  }
  const r = wu(t, n);
  if (ef(r)) {
    const o = Bi(r), i = Hi(r, n), a = i[C].data[
      o + 8
      /* NodeInjectorOffset.TNODE */
    ];
    return new ye(a, i);
  } else {
    const i = n[_e].injector?.parent;
    if (i instanceof ye)
      return i;
  }
  return null;
}
function UN(e) {
  let t;
  e instanceof ye ? t = Ho(e) : S("getModuleInjectorOfNodeInjector must be called with a NodeInjector");
  const n = t[_e], r = n instanceof Ku ? n.parentInjector : n.parent;
  return r || S("NodeInjector must have some connection to the module injector tree"), r;
}
const um = "ng", zN = {
  /**
   * Warning: functions that start with `ɵ` are considered *INTERNAL* and should not be relied upon
   * in application's code. The contract of those functions might be changed in any release and/or a
   * function can be removed completely.
   */
  ɵgetDependenciesFromInjectable: NN,
  ɵgetInjectorProviders: BN,
  ɵgetInjectorResolutionPath: sb,
  ɵgetInjectorMetadata: HN,
  ɵsetProfiler: QM,
  getDirectiveMetadata: nS,
  getComponent: Pa,
  getContext: qD,
  getListeners: XD,
  getOwningComponent: QD,
  getHostElement: JD,
  getInjector: YD,
  getRootComponents: ZD,
  getDirectives: KD,
  applyChanges: ON,
  isSignal: Yf
};
let cm = !1;
function GN() {
  if (!cm) {
    cm = !0, typeof window < "u" && EN();
    for (const [e, t] of Object.entries(zN))
      WN(e, t);
  }
}
function WN(e, t) {
  if (typeof COMPILED > "u" || !COMPILED) {
    const n = he;
    ngDevMode && E(t, "function not defined"), n[um] ??= {}, n[um][e] = t;
  }
}
const ab = new j(""), hp = new j("");
class io {
  constructor(t, n, r) {
    this._ngZone = t, this.registry = n, this._pendingCount = 0, this._isZoneStable = !0, this._callbacks = [], this.taskTrackingZone = null, pp || (ub(r), r.addToWindow(n)), this._watchAngularEvents(), t.run(() => {
      this.taskTrackingZone = typeof Zone > "u" ? null : Zone.current.get("TaskTrackingZone");
    });
  }
  _watchAngularEvents() {
    this._ngZone.onUnstable.subscribe({
      next: () => {
        this._isZoneStable = !1;
      }
    }), this._ngZone.runOutsideAngular(() => {
      this._ngZone.onStable.subscribe({
        next: () => {
          le.assertNotInAngularZone(), queueMicrotask(() => {
            this._isZoneStable = !0, this._runCallbacksIfReady();
          });
        }
      });
    });
  }
  /**
   * Increases the number of pending request
   * @deprecated pending requests are now tracked with zones.
   */
  increasePendingRequestCount() {
    return this._pendingCount += 1, this._pendingCount;
  }
  /**
   * Decreases the number of pending request
   * @deprecated pending requests are now tracked with zones
   */
  decreasePendingRequestCount() {
    if (this._pendingCount -= 1, this._pendingCount < 0)
      throw new Error("pending async requests below zero");
    return this._runCallbacksIfReady(), this._pendingCount;
  }
  /**
   * Whether an associated application is stable
   */
  isStable() {
    return this._isZoneStable && this._pendingCount === 0 && !this._ngZone.hasPendingMacrotasks;
  }
  _runCallbacksIfReady() {
    if (this.isStable())
      queueMicrotask(() => {
        for (; this._callbacks.length !== 0; ) {
          let t = this._callbacks.pop();
          clearTimeout(t.timeoutId), t.doneCb();
        }
      });
    else {
      let t = this.getPendingTasks();
      this._callbacks = this._callbacks.filter((n) => n.updateCb && n.updateCb(t) ? (clearTimeout(n.timeoutId), !1) : !0);
    }
  }
  getPendingTasks() {
    return this.taskTrackingZone ? this.taskTrackingZone.macroTasks.map((t) => ({
      source: t.source,
      // From TaskTrackingZone:
      // https://github.com/angular/zone.js/blob/master/lib/zone-spec/task-tracking.ts#L40
      creationLocation: t.creationLocation,
      data: t.data
    })) : [];
  }
  addCallback(t, n, r) {
    let o = -1;
    n && n > 0 && (o = setTimeout(() => {
      this._callbacks = this._callbacks.filter((i) => i.timeoutId !== o), t();
    }, n)), this._callbacks.push({ doneCb: t, timeoutId: o, updateCb: r });
  }
  /**
   * Wait for the application to be stable with a timeout. If the timeout is reached before that
   * happens, the callback receives a list of the macro tasks that were pending, otherwise null.
   *
   * @param doneCb The callback to invoke when Angular is stable or the timeout expires
   *    whichever comes first.
   * @param timeout Optional. The maximum time to wait for Angular to become stable. If not
   *    specified, whenStable() will wait forever.
   * @param updateCb Optional. If specified, this callback will be invoked whenever the set of
   *    pending macrotasks changes. If this callback returns true doneCb will not be invoked
   *    and no further updates will be issued.
   */
  whenStable(t, n, r) {
    if (r && !this.taskTrackingZone)
      throw new Error('Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?');
    this.addCallback(t, n, r), this._runCallbacksIfReady();
  }
  /**
   * Get the number of pending requests
   * @deprecated pending requests are now tracked with zones
   */
  getPendingRequestCount() {
    return this._pendingCount;
  }
  /**
   * Registers an application with a testability hook so that it can be tracked.
   * @param token token of application, root element
   *
   * @internal
   */
  registerApplication(t) {
    this.registry.registerApplication(t, this);
  }
  /**
   * Unregisters an application.
   * @param token token of application, root element
   *
   * @internal
   */
  unregisterApplication(t) {
    this.registry.unregisterApplication(t);
  }
  /**
   * Find providers by name
   * @param using The root element to search from
   * @param provider The name of binding variable
   * @param exactMatch Whether using exactMatch
   */
  findProviders(t, n, r) {
    return [];
  }
  static {
    this.ɵfac = function(n) {
      return new (n || io)(Ne(le), Ne(Nn), Ne(hp));
    };
  }
  static {
    this.ɵprov = /* @__PURE__ */ te({ token: io, factory: io.ɵfac });
  }
}
(typeof ngDevMode > "u" || ngDevMode) && Je(io, [{
  type: fe
}], () => [{ type: le }, { type: Nn }, { type: void 0, decorators: [{
  type: ft,
  args: [hp]
}] }], null);
class Nn {
  constructor() {
    this._applications = /* @__PURE__ */ new Map();
  }
  /**
   * Registers an application with a testability hook so that it can be tracked
   * @param token token of application, root element
   * @param testability Testability hook
   */
  registerApplication(t, n) {
    this._applications.set(t, n);
  }
  /**
   * Unregisters an application.
   * @param token token of application, root element
   */
  unregisterApplication(t) {
    this._applications.delete(t);
  }
  /**
   * Unregisters all applications
   */
  unregisterAllApplications() {
    this._applications.clear();
  }
  /**
   * Get a testability hook associated with the application
   * @param elem root element
   */
  getTestability(t) {
    return this._applications.get(t) || null;
  }
  /**
   * Get all registered testabilities
   */
  getAllTestabilities() {
    return Array.from(this._applications.values());
  }
  /**
   * Get all registered applications(root elements)
   */
  getAllRootElements() {
    return Array.from(this._applications.keys());
  }
  /**
   * Find testability of a node in the Tree
   * @param elem node
   * @param findInAncestors whether finding testability in ancestors if testability was not found in
   * current node
   */
  findTestabilityInTree(t, n = !0) {
    return pp?.findTestabilityInTree(this, t, n) ?? null;
  }
  static {
    this.ɵfac = function(n) {
      return new (n || Nn)();
    };
  }
  static {
    this.ɵprov = /* @__PURE__ */ te({ token: Nn, factory: Nn.ɵfac, providedIn: "platform" });
  }
}
(typeof ngDevMode > "u" || ngDevMode) && Je(Nn, [{
  type: fe,
  args: [{ providedIn: "platform" }]
}], null, null);
function ub(e) {
  pp = e;
}
let pp;
function gc(e) {
  return !!e && typeof e.then == "function";
}
function gp(e) {
  return !!e && typeof e.subscribe == "function";
}
const cb = new j(ngDevMode ? "Application Initializer" : "");
class pn {
  constructor() {
    if (this.initialized = !1, this.done = !1, this.donePromise = new Promise((t, n) => {
      this.resolve = t, this.reject = n;
    }), this.appInits = w(cb, { optional: !0 }) ?? [], (typeof ngDevMode > "u" || ngDevMode) && !Array.isArray(this.appInits))
      throw new v(-209, `Unexpected type of the \`APP_INITIALIZER\` token value (expected an array, but got ${typeof this.appInits}). Please check that the \`APP_INITIALIZER\` token is configured as a \`multi: true\` provider.`);
  }
  /** @internal */
  runInitializers() {
    if (this.initialized)
      return;
    const t = [];
    for (const r of this.appInits) {
      const o = r();
      if (gc(o))
        t.push(o);
      else if (gp(o)) {
        const i = new Promise((s, a) => {
          o.subscribe({ complete: s, error: a });
        });
        t.push(i);
      }
    }
    const n = () => {
      this.done = !0, this.resolve();
    };
    Promise.all(t).then(() => {
      n();
    }).catch((r) => {
      this.reject(r);
    }), t.length === 0 && n(), this.initialized = !0;
  }
  static {
    this.ɵfac = function(n) {
      return new (n || pn)();
    };
  }
  static {
    this.ɵprov = /* @__PURE__ */ te({ token: pn, factory: pn.ɵfac, providedIn: "root" });
  }
}
(typeof ngDevMode > "u" || ngDevMode) && Je(pn, [{
  type: fe,
  args: [{ providedIn: "root" }]
}], () => [], null);
const mp = new j(ngDevMode ? "appBootstrapListener" : "");
function lb() {
  ngDevMode && GN();
}
function db() {
  fw(() => {
    throw new v(600, ngDevMode && "Writing to signals is not allowed in a `computed` or an `effect` by default. Use `allowSignalWrites` in the `CreateEffectOptions` to enable this inside effects.");
  });
}
function fb(e) {
  return e.isBoundToModule;
}
class qN {
  constructor(t, n) {
    this.name = t, this.token = n;
  }
}
function hb(e, t, n) {
  try {
    const r = n();
    return gc(r) ? r.catch((o) => {
      throw t.runOutsideAngular(() => e.handleError(o)), o;
    }) : r;
  } catch (r) {
    throw t.runOutsideAngular(() => e.handleError(r)), r;
  }
}
function pb(e, t) {
  return Array.isArray(t) ? t.reduce(pb, e) : { ...e, ...t };
}
class rt {
  constructor() {
    this._bootstrapListeners = [], this._runningTick = !1, this._destroyed = !1, this._destroyListeners = [], this._views = [], this.internalErrorHandler = w(ND), this.afterRenderEffectManager = w(Dn), this.externalTestViews = /* @__PURE__ */ new Set(), this.beforeRender = new Fi(), this.afterTick = new Fi(), this.componentTypes = [], this.components = [], this.isStable = w(Rt).hasPendingTasks.pipe(kw((t) => !t)), this._injector = w(Pt);
  }
  /**
   * Indicates whether this instance was destroyed.
   */
  get destroyed() {
    return this._destroyed;
  }
  /**
   * The `EnvironmentInjector` used to create this application.
   */
  get injector() {
    return this._injector;
  }
  /**
   * Bootstrap a component onto the element identified by its selector or, optionally, to a
   * specified element.
   *
   * @usageNotes
   * ### Bootstrap process
   *
   * When bootstrapping a component, Angular mounts it onto a target DOM element
   * and kicks off automatic change detection. The target DOM element can be
   * provided using the `rootSelectorOrNode` argument.
   *
   * If the target DOM element is not provided, Angular tries to find one on a page
   * using the `selector` of the component that is being bootstrapped
   * (first matched element is used).
   *
   * ### Example
   *
   * Generally, we define the component to bootstrap in the `bootstrap` array of `NgModule`,
   * but it requires us to know the component while writing the application code.
   *
   * Imagine a situation where we have to wait for an API call to decide about the component to
   * bootstrap. We can use the `ngDoBootstrap` hook of the `NgModule` and call this method to
   * dynamically bootstrap a component.
   *
   * {@example core/ts/platform/platform.ts region='componentSelector'}
   *
   * Optionally, a component can be mounted onto a DOM element that does not match the
   * selector of the bootstrapped component.
   *
   * In the following example, we are providing a CSS selector to match the target element.
   *
   * {@example core/ts/platform/platform.ts region='cssSelector'}
   *
   * While in this example, we are providing reference to a DOM node.
   *
   * {@example core/ts/platform/platform.ts region='domNode'}
   */
  bootstrap(t, n) {
    (typeof ngDevMode > "u" || ngDevMode) && this.warnIfDestroyed();
    const r = t instanceof $a;
    if (!this._injector.get(pn).done) {
      const d = !r && On(t), f = (typeof ngDevMode > "u" || ngDevMode) && "Cannot bootstrap as there are still asynchronous initializers running." + (d ? "" : " Bootstrap components in the `ngDoBootstrap` method of the root module.");
      throw new v(405, f);
    }
    let i;
    r ? i = t : i = this._injector.get(Fs).resolveComponentFactory(t), this.componentTypes.push(i.componentType);
    const s = fb(i) ? void 0 : this._injector.get(Jn), a = n || i.selector, u = i.create(Re.NULL, [], a, s), c = u.location.nativeElement, l = u.injector.get(ab, null);
    return l?.registerApplication(c), u.onDestroy(() => {
      this.detachView(u.hostView), va(this.components, u), l?.unregisterApplication(c);
    }), this._loadComponent(u), (typeof ngDevMode > "u" || ngDevMode) && this._injector.get(Zt).log("Angular is running in development mode."), u;
  }
  /**
   * Invoke this method to explicitly process change detection and its side-effects.
   *
   * In development mode, `tick()` also performs a second change detection cycle to ensure that no
   * further changes are detected. If additional changes are picked up during this second cycle,
   * bindings in the app have side-effects that cannot be resolved in a single change detection
   * pass.
   * In this case, Angular throws an error, since an Angular application can only have one change
   * detection pass during which all change detection must complete.
   */
  tick() {
    this._tick(!0);
  }
  /** @internal */
  _tick(t) {
    if ((typeof ngDevMode > "u" || ngDevMode) && this.warnIfDestroyed(), this._runningTick)
      throw new v(101, ngDevMode && "ApplicationRef.tick is called recursively");
    const n = $(null);
    try {
      if (this._runningTick = !0, this.detectChangesInAttachedViews(t), typeof ngDevMode > "u" || ngDevMode)
        for (let r of this._views)
          r.checkNoChanges();
    } catch (r) {
      this.internalErrorHandler(r);
    } finally {
      this.afterTick.next(), this._runningTick = !1, $(n);
    }
  }
  detectChangesInAttachedViews(t) {
    let n = 0;
    const r = this.afterRenderEffectManager;
    for (; ; ) {
      if (n === fI)
        throw new v(103, ngDevMode && "Infinite change detection while refreshing application views. Ensure afterRender or queueStateUpdate hooks are not continuously causing updates.");
      if (t) {
        const o = n === 0;
        this.beforeRender.next(o);
        for (let { _lView: i, notifyErrorHandler: s } of this._views)
          mb(i, o, s);
      }
      if (n++, r.executeInternalCallbacks(), ![...this.externalTestViews.keys(), ...this._views].some(({ _lView: o }) => dd(o)) && (r.execute(), ![...this.externalTestViews.keys(), ...this._views].some(({ _lView: o }) => dd(o))))
        break;
    }
  }
  /**
   * Attaches a view so that it will be dirty checked.
   * The view will be automatically detached when it is destroyed.
   * This will throw if the view is already attached to a ViewContainer.
   */
  attachView(t) {
    (typeof ngDevMode > "u" || ngDevMode) && this.warnIfDestroyed();
    const n = t;
    this._views.push(n), n.attachToAppRef(this);
  }
  /**
   * Detaches a view from dirty checking again.
   */
  detachView(t) {
    (typeof ngDevMode > "u" || ngDevMode) && this.warnIfDestroyed();
    const n = t;
    va(this._views, n), n.detachFromAppRef();
  }
  _loadComponent(t) {
    this.attachView(t.hostView), this.tick(), this.components.push(t);
    const n = this._injector.get(mp, []);
    if (ngDevMode && !Array.isArray(n))
      throw new v(-209, `Unexpected type of the \`APP_BOOTSTRAP_LISTENER\` token value (expected an array, but got ${typeof n}). Please check that the \`APP_BOOTSTRAP_LISTENER\` token is configured as a \`multi: true\` provider.`);
    [...this._bootstrapListeners, ...n].forEach((r) => r(t));
  }
  /** @internal */
  ngOnDestroy() {
    if (!this._destroyed)
      try {
        this._destroyListeners.forEach((t) => t()), this._views.slice().forEach((t) => t.destroy());
      } finally {
        this._destroyed = !0, this._views = [], this._bootstrapListeners = [], this._destroyListeners = [];
      }
  }
  /**
   * Registers a listener to be called when an instance is destroyed.
   *
   * @param callback A callback function to add as a listener.
   * @returns A function which unregisters a listener.
   */
  onDestroy(t) {
    return (typeof ngDevMode > "u" || ngDevMode) && this.warnIfDestroyed(), this._destroyListeners.push(t), () => va(this._destroyListeners, t);
  }
  /**
   * Destroys an Angular application represented by this `ApplicationRef`. Calling this function
   * will destroy the associated environment injectors as well as all the bootstrapped components
   * with their views.
   */
  destroy() {
    if (this._destroyed)
      throw new v(406, ngDevMode && "This instance of the `ApplicationRef` has already been destroyed.");
    const t = this._injector;
    t.destroy && !t.destroyed && t.destroy();
  }
  /**
   * Returns the number of attached views.
   */
  get viewCount() {
    return this._views.length;
  }
  warnIfDestroyed() {
    (typeof ngDevMode > "u" || ngDevMode) && this._destroyed && console.warn(me(406, "This instance of the `ApplicationRef` has already been destroyed."));
  }
  static {
    this.ɵfac = function(n) {
      return new (n || rt)();
    };
  }
  static {
    this.ɵprov = /* @__PURE__ */ te({ token: rt, factory: rt.ɵfac, providedIn: "root" });
  }
}
(typeof ngDevMode > "u" || ngDevMode) && Je(rt, [{
  type: fe,
  args: [{ providedIn: "root" }]
}], null, null);
function va(e, t) {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}
let Ks;
function gb(e) {
  Ks ??= /* @__PURE__ */ new WeakMap();
  const t = Ks.get(e);
  if (t)
    return t;
  const n = e.isStable.pipe($w((r) => r)).toPromise().then(() => {
  });
  return Ks.set(e, n), e.onDestroy(() => Ks?.delete(e)), n;
}
function mb(e, t, n) {
  !t && !dd(e) || QN(e, n, t);
}
function dd(e) {
  return Wd(e);
}
function QN(e, t, n) {
  let r;
  n ? (r = 0, e[_] |= 1024) : e[_] & 64 ? r = 0 : r = 1, Uu(e, t, r);
}
class yb {
  constructor(t, n) {
    this.ngModuleFactory = t, this.componentFactories = n;
  }
}
class so {
  /**
   * Compiles the given NgModule and all of its components. All templates of the components
   * have to be inlined.
   */
  compileModuleSync(t) {
    return new Xu(t);
  }
  /**
   * Compiles the given NgModule and all of its components
   */
  compileModuleAsync(t) {
    return Promise.resolve(this.compileModuleSync(t));
  }
  /**
   * Same as {@link #compileModuleSync} but also creates ComponentFactories for all components.
   */
  compileModuleAndAllComponentsSync(t) {
    const n = this.compileModuleSync(t), r = pt(t), o = Wt(r.declarations).reduce((i, s) => {
      const a = V(s);
      return a && i.push(new Zo(a)), i;
    }, []);
    return new yb(n, o);
  }
  /**
   * Same as {@link #compileModuleAsync} but also creates ComponentFactories for all components.
   */
  compileModuleAndAllComponentsAsync(t) {
    return Promise.resolve(this.compileModuleAndAllComponentsSync(t));
  }
  /**
   * Clears all caches.
   */
  clearCache() {
  }
  /**
   * Clears the cache for the given component/ngModule.
   */
  clearCacheFor(t) {
  }
  /**
   * Returns the id for a given NgModule, if one is defined and known to the compiler.
   */
  getModuleId(t) {
  }
  static {
    this.ɵfac = function(n) {
      return new (n || so)();
    };
  }
  static {
    this.ɵprov = /* @__PURE__ */ te({ token: so, factory: so.ɵfac, providedIn: "root" });
  }
}
(typeof ngDevMode > "u" || ngDevMode) && Je(so, [{
  type: fe,
  args: [{ providedIn: "root" }]
}], null, null);
const Db = new j(ngDevMode ? "compilerOptions" : "");
class ZN {
}
function vb(e, t, n) {
  ngDevMode && VM(n);
  const r = new Xu(n);
  if (typeof ngJitMode < "u" && !ngJitMode)
    return Promise.resolve(r);
  const o = e.get(Db, []).concat(t);
  if (nN({
    defaultEncapsulation: lm(o.map((c) => c.defaultEncapsulation)),
    preserveWhitespaces: lm(o.map((c) => c.preserveWhitespaces))
  }), T1())
    return Promise.resolve(r);
  const i = o.flatMap((c) => c.providers ?? []);
  if (i.length === 0)
    return Promise.resolve(r);
  const s = Ae({
    usage: 0,
    kind: "NgModule",
    type: n
  }), u = Re.create({ providers: i }).get(s.ResourceLoader);
  return eC((c) => Promise.resolve(u.get(c))).then(() => r);
}
function lm(e) {
  for (let t = e.length - 1; t >= 0; t--)
    if (e[t] !== void 0)
      return e[t];
}
class ao {
  constructor() {
    this.zone = w(le), this.applicationRef = w(rt);
  }
  initialize() {
    this._onMicrotaskEmptySubscription || (this._onMicrotaskEmptySubscription = this.zone.onMicrotaskEmpty.subscribe({
      next: () => {
        this.zone.run(() => {
          this.applicationRef.tick();
        });
      }
    }));
  }
  ngOnDestroy() {
    this._onMicrotaskEmptySubscription?.unsubscribe();
  }
  static {
    this.ɵfac = function(n) {
      return new (n || ao)();
    };
  }
  static {
    this.ɵprov = /* @__PURE__ */ te({ token: ao, factory: ao.ɵfac, providedIn: "root" });
  }
}
(typeof ngDevMode > "u" || ngDevMode) && Je(ao, [{
  type: fe,
  args: [{ providedIn: "root" }]
}], null, null);
const Ib = new j(typeof ngDevMode > "u" || ngDevMode ? "provideZoneChangeDetection token" : "");
function Cb(e) {
  return [
    { provide: le, useFactory: e },
    {
      provide: lr,
      multi: !0,
      useFactory: () => {
        const t = w(ao, { optional: !0 });
        if ((typeof ngDevMode > "u" || ngDevMode) && t === null)
          throw new v(402, "A required Injectable was not found in the dependency injection tree. If you are bootstrapping an NgModule, make sure that the `BrowserModule` is imported.");
        return () => t.initialize();
      }
    },
    {
      provide: lr,
      multi: !0,
      useFactory: () => {
        const t = w(uo);
        return () => {
          t.initialize();
        };
      }
    },
    { provide: ND, useFactory: YN }
  ];
}
function YN() {
  const e = w(le), t = w(Mn);
  return (n) => e.runOutsideAngular(() => t.handleError(n));
}
function Eb(e) {
  const t = Cb(() => new le(bb(e)));
  return hs([
    typeof ngDevMode > "u" || ngDevMode ? { provide: Ib, useValue: !0 } : [],
    t
  ]);
}
function bb(e) {
  return {
    enableLongStackTrace: typeof ngDevMode > "u" ? !1 : !!ngDevMode,
    shouldCoalesceEventChangeDetection: e?.eventCoalescing ?? !1,
    shouldCoalesceRunChangeDetection: e?.runCoalescing ?? !1
  };
}
class uo {
  constructor() {
    this.subscription = new ko(), this.initialized = !1, this.zone = w(le), this.pendingTasks = w(Rt);
  }
  initialize() {
    if (this.initialized)
      return;
    this.initialized = !0;
    let t = null;
    !this.zone.isStable && !this.zone.hasPendingMacrotasks && !this.zone.hasPendingMicrotasks && (t = this.pendingTasks.add()), this.zone.runOutsideAngular(() => {
      this.subscription.add(this.zone.onStable.subscribe(() => {
        le.assertNotInAngularZone(), queueMicrotask(() => {
          t !== null && !this.zone.hasPendingMacrotasks && !this.zone.hasPendingMicrotasks && (this.pendingTasks.remove(t), t = null);
        });
      }));
    }), this.subscription.add(this.zone.onUnstable.subscribe(() => {
      le.assertInAngularZone(), t ??= this.pendingTasks.add();
    }));
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  static {
    this.ɵfac = function(n) {
      return new (n || uo)();
    };
  }
  static {
    this.ɵprov = /* @__PURE__ */ te({ token: uo, factory: uo.ɵfac, providedIn: "root" });
  }
}
(typeof ngDevMode > "u" || ngDevMode) && Je(uo, [{
  type: fe,
  args: [{ providedIn: "root" }]
}], null, null);
function KN() {
  return typeof ngI18nClosureMode < "u" && ngI18nClosureMode && typeof goog < "u" && goog.LOCALE !== "en" ? goog.LOCALE : typeof $localize < "u" && $localize.locale || Mr;
}
const Ue = new j(ngDevMode ? "LocaleId" : "", {
  providedIn: "root",
  factory: () => w(Ue, z.Optional | z.SkipSelf) || KN()
}), yp = new j(ngDevMode ? "DefaultCurrencyCode" : "", {
  providedIn: "root",
  factory: () => JO
}), JN = new j(ngDevMode ? "Translations" : ""), XN = new j(ngDevMode ? "TranslationsFormat" : "");
var fd;
(function(e) {
  e[e.Error = 0] = "Error", e[e.Warning = 1] = "Warning", e[e.Ignore = 2] = "Ignore";
})(fd || (fd = {}));
const Dp = new j(ngDevMode ? "PlatformDestroyListeners" : "");
class kn {
  /** @internal */
  constructor(t) {
    this._injector = t, this._modules = [], this._destroyListeners = [], this._destroyed = !1;
  }
  /**
   * Creates an instance of an `@NgModule` for the given platform.
   *
   * @deprecated Passing NgModule factories as the `PlatformRef.bootstrapModuleFactory` function
   *     argument is deprecated. Use the `PlatformRef.bootstrapModule` API instead.
   */
  bootstrapModuleFactory(t, n) {
    const r = qA(n?.ngZone, bb({
      eventCoalescing: n?.ngZoneEventCoalescing,
      runCoalescing: n?.ngZoneRunCoalescing
    }));
    return r.run(() => {
      const o = U1(t.moduleType, this.injector, Cb(() => r));
      if ((typeof ngDevMode > "u" || ngDevMode) && o.injector.get(Ib, null) !== null)
        throw new v(207, "`bootstrapModule` does not support `provideZoneChangeDetection`. Use `BootstrapOptions` instead.");
      const i = o.injector.get(Mn, null);
      if ((typeof ngDevMode > "u" || ngDevMode) && i === null)
        throw new v(402, "No ErrorHandler. Is platform module (BrowserModule) included?");
      return r.runOutsideAngular(() => {
        const s = r.onError.subscribe({
          next: (a) => {
            i.handleError(a);
          }
        });
        o.onDestroy(() => {
          va(this._modules, o), s.unsubscribe();
        });
      }), hb(i, r, () => {
        const s = o.injector.get(pn);
        return s.runInitializers(), s.donePromise.then(() => {
          const a = o.injector.get(Ue, Mr);
          return _h(a || Mr), this._moduleDoBootstrap(o), o;
        });
      });
    });
  }
  /**
   * Creates an instance of an `@NgModule` for a given platform.
   *
   * @usageNotes
   * ### Simple Example
   *
   * ```typescript
   * @NgModule({
   *   imports: [BrowserModule]
   * })
   * class MyModule {}
   *
   * let moduleRef = platformBrowser().bootstrapModule(MyModule);
   * ```
   *
   */
  bootstrapModule(t, n = []) {
    const r = pb({}, n);
    return vb(this.injector, r, t).then((o) => this.bootstrapModuleFactory(o, r));
  }
  _moduleDoBootstrap(t) {
    const n = t.injector.get(rt);
    if (t._bootstrapComponents.length > 0)
      t._bootstrapComponents.forEach((r) => n.bootstrap(r));
    else if (t.instance.ngDoBootstrap)
      t.instance.ngDoBootstrap(n);
    else
      throw new v(-403, ngDevMode && `The module ${Q(t.instance.constructor)} was bootstrapped, but it does not declare "@NgModule.bootstrap" components nor a "ngDoBootstrap" method. Please define one of these.`);
    this._modules.push(t);
  }
  /**
   * Registers a listener to be called when the platform is destroyed.
   */
  onDestroy(t) {
    this._destroyListeners.push(t);
  }
  /**
   * Retrieves the platform {@link Injector}, which is the parent injector for
   * every Angular application on the page and provides singleton providers.
   */
  get injector() {
    return this._injector;
  }
  /**
   * Destroys the current Angular platform and all Angular applications on the page.
   * Destroys all modules and listeners registered with the platform.
   */
  destroy() {
    if (this._destroyed)
      throw new v(404, ngDevMode && "The platform has already been destroyed!");
    this._modules.slice().forEach((n) => n.destroy()), this._destroyListeners.forEach((n) => n());
    const t = this._injector.get(Dp, null);
    t && (t.forEach((n) => n()), t.clear()), this._destroyed = !0;
  }
  /**
   * Indicates whether this instance was destroyed.
   */
  get destroyed() {
    return this._destroyed;
  }
  static {
    this.ɵfac = function(n) {
      return new (n || kn)(Ne(Re));
    };
  }
  static {
    this.ɵprov = /* @__PURE__ */ te({ token: kn, factory: kn.ɵfac, providedIn: "platform" });
  }
}
(typeof ngDevMode > "u" || ngDevMode) && Je(kn, [{
  type: fe,
  args: [{ providedIn: "platform" }]
}], () => [{ type: Re }], null);
let Rn = null;
const vp = new j(ngDevMode ? "AllowMultipleToken" : "");
function wb(e) {
  if (Rn && !Rn.get(vp, !1))
    throw new v(400, ngDevMode && "There can be only one platform. Destroy the previous one to create a new one.");
  lb(), db(), Rn = e;
  const t = e.get(kn);
  return Tb(e), t;
}
function Mb(e, t, n = []) {
  const r = `Platform: ${t}`, o = new j(r);
  return (i = []) => {
    let s = mc();
    if (!s || s.injector.get(vp, !1)) {
      const a = [...n, ...i, { provide: o, useValue: !0 }];
      e ? e(a) : wb(_b(a, r));
    }
    return Sb(o);
  };
}
function _b(e = [], t) {
  return Re.create({
    name: t,
    providers: [
      { provide: Pd, useValue: "platform" },
      { provide: Dp, useValue: /* @__PURE__ */ new Set([() => Rn = null]) },
      ...e
    ]
  });
}
function Sb(e) {
  const t = mc();
  if (!t)
    throw new v(401, ngDevMode && "No platform exists!");
  if ((typeof ngDevMode > "u" || ngDevMode) && !t.injector.get(e, null))
    throw new v(400, "A platform with a different configuration has been created. Please destroy it first.");
  return t;
}
function mc() {
  return Rn?.get(kn) ?? null;
}
function ek() {
  mc()?.destroy();
}
function tk(e = []) {
  if (Rn)
    return Rn;
  lb();
  const t = _b(e);
  return Rn = t, db(), Tb(t), t;
}
function Tb(e) {
  e.get(tv, null)?.forEach((n) => n());
}
function nk() {
  return typeof ngDevMode > "u" || !!ngDevMode;
}
function rk() {
  (typeof ngDevMode > "u" || ngDevMode) && (he.ngDevMode = !1);
}
function ok(e) {
  const t = oC(e);
  if (!t)
    throw Ab(e);
  return new Xu(t);
}
function ik(e) {
  const t = oC(e);
  if (!t)
    throw Ab(e);
  return t;
}
function Ab(e) {
  return new Error(`No module with ID ${e} loaded`);
}
class ui {
  static {
    this.__NG_ELEMENT_ID__ = Ob;
  }
}
function Ob(e) {
  return sk(
    K(),
    m(),
    (e & 16) === 16
    /* InternalInjectFlags.ForPipe */
  );
}
function sk(e, t, n) {
  if (tr(e) && !n) {
    const r = mt(e.index, t);
    return new bo(r, r);
  } else if (e.type & 47) {
    const r = t[De];
    return new bo(r, t);
  }
  return null;
}
class Fb extends ui {
}
class ak extends Fb {
}
class uk {
  constructor(t, n) {
    this.name = t, this.callback = n;
  }
}
function ck(e) {
  return e.map((t) => t.nativeElement);
}
class Ip {
  constructor(t) {
    this.nativeNode = t;
  }
  /**
   * The `DebugElement` parent. Will be `null` if this is the root element.
   */
  get parent() {
    const t = this.nativeNode.parentNode;
    return t ? new Bs(t) : null;
  }
  /**
   * The host dependency injector. For example, the root element's component instance injector.
   */
  get injector() {
    return YD(this.nativeNode);
  }
  /**
   * The element's own component instance, if it has one.
   */
  get componentInstance() {
    const t = this.nativeNode;
    return t && (Pa(t) || QD(t));
  }
  /**
   * An object that provides parent context for this element. Often an ancestor component instance
   * that governs this element.
   *
   * When an element is repeated within *ngFor, the context is an `NgForOf` whose `$implicit`
   * property is the value of the row instance value. For example, the `hero` in `*ngFor="let hero
   * of heroes"`.
   */
  get context() {
    return Pa(this.nativeNode) || qD(this.nativeNode);
  }
  /**
   * The callbacks attached to the component's @Output properties and/or the element's event
   * properties.
   */
  get listeners() {
    return XD(this.nativeNode).filter((t) => t.type === "dom");
  }
  /**
   * Dictionary of objects associated with template local variables (e.g. #foo), keyed by the local
   * variable name.
   */
  get references() {
    return rS(this.nativeNode);
  }
  /**
   * This component's injector lookup tokens. Includes the component itself plus the tokens that the
   * component lists in its providers metadata.
   */
  get providerTokens() {
    return tS(this.nativeNode);
  }
}
class Bs extends Ip {
  constructor(t) {
    ngDevMode && An(t), super(t);
  }
  /**
   * The underlying DOM element at the root of the component.
   */
  get nativeElement() {
    return this.nativeNode.nodeType == Node.ELEMENT_NODE ? this.nativeNode : null;
  }
  /**
   * The element tag name, if it is an element.
   */
  get name() {
    const t = nt(this.nativeNode), n = t ? t.lView : null;
    return n !== null ? n[C].data[t.nodeIndex].value : this.nativeNode.nodeName;
  }
  /**
   *  Gets a map of property names to property values for an element.
   *
   *  This map includes:
   *  - Regular property bindings (e.g. `[id]="id"`)
   *  - Host property bindings (e.g. `host: { '[id]': "id" }`)
   *  - Interpolated property bindings (e.g. `id="{{ value }}")
   *
   *  It does not include:
   *  - input property bindings (e.g. `[myCustomInput]="value"`)
   *  - attribute bindings (e.g. `[attr.role]="menu"`)
   */
  get properties() {
    const t = nt(this.nativeNode), n = t ? t.lView : null;
    if (n === null)
      return {};
    const r = n[C].data, o = r[t.nodeIndex], i = {};
    return lk(this.nativeElement, i), fk(i, o, n, r), i;
  }
  /**
   *  A map of attribute names to attribute values for an element.
   */
  // TODO: replace null by undefined in the return type
  get attributes() {
    const t = {}, n = this.nativeElement;
    if (!n)
      return t;
    const r = nt(n), o = r ? r.lView : null;
    if (o === null)
      return {};
    const i = o[C].data[r.nodeIndex].attrs, s = [];
    if (i) {
      let a = 0;
      for (; a < i.length; ) {
        const u = i[a];
        if (typeof u != "string")
          break;
        const c = i[a + 1];
        t[u] = c, s.push(u.toLowerCase()), a += 2;
      }
    }
    for (const a of n.attributes)
      s.includes(a.name) || (t[a.name] = a.value);
    return t;
  }
  /**
   * The inline styles of the DOM element.
   */
  // TODO: replace null by undefined in the return type
  get styles() {
    return this.nativeElement?.style ?? {};
  }
  /**
   * A map containing the class names on the element as keys.
   *
   * This map is derived from the `className` property of the DOM element.
   *
   * Note: The values of this object will always be `true`. The class key will not appear in the KV
   * object if it does not exist on the element.
   *
   * @see [Element.className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className)
   */
  get classes() {
    const t = {}, r = this.nativeElement.className;
    return (typeof r != "string" ? r.baseVal.split(" ") : r.split(" ")).forEach((i) => t[i] = !0), t;
  }
  /**
   * The `childNodes` of the DOM element as a `DebugNode` array.
   *
   * @see [Node.childNodes](https://developer.mozilla.org/en-US/docs/Web/API/Node/childNodes)
   */
  get childNodes() {
    const t = this.nativeNode.childNodes, n = [];
    for (let r = 0; r < t.length; r++) {
      const o = t[r];
      n.push(Ao(o));
    }
    return n;
  }
  /**
   * The immediate `DebugElement` children. Walk the tree by descending through `children`.
   */
  get children() {
    const t = this.nativeElement;
    if (!t)
      return [];
    const n = t.children, r = [];
    for (let o = 0; o < n.length; o++) {
      const i = n[o];
      r.push(Ao(i));
    }
    return r;
  }
  /**
   * @returns the first `DebugElement` that matches the predicate at any depth in the subtree.
   */
  query(t) {
    return this.queryAll(t)[0] || null;
  }
  /**
   * @returns All `DebugElement` matches for the predicate at any depth in the subtree.
   */
  queryAll(t) {
    const n = [];
    return dm(this, t, n, !0), n;
  }
  /**
   * @returns All `DebugNode` matches for the predicate at any depth in the subtree.
   */
  queryAllNodes(t) {
    const n = [];
    return dm(this, t, n, !1), n;
  }
  /**
   * Triggers the event by its name if there is a corresponding listener in the element's
   * `listeners` collection.
   *
   * If the event lacks a listener or there's some other problem, consider
   * calling `nativeElement.dispatchEvent(eventObject)`.
   *
   * @param eventName The name of the event to trigger
   * @param eventObj The _event object_ expected by the handler
   *
   * @see [Testing components scenarios](guide/testing-components-scenarios#trigger-event-handler)
   */
  triggerEventHandler(t, n) {
    const r = this.nativeNode, o = [];
    this.listeners.forEach((i) => {
      if (i.name === t) {
        const s = i.callback;
        s.call(r, n), o.push(s);
      }
    }), typeof r.eventListeners == "function" && r.eventListeners(t).forEach((i) => {
      if (i.toString().indexOf("__ngUnwrap__") !== -1) {
        const s = i("__ngUnwrap__");
        return o.indexOf(s) === -1 && s.call(r, n);
      }
    });
  }
}
function lk(e, t) {
  if (e) {
    let n = Object.getPrototypeOf(e);
    const r = Node.prototype;
    for (; n !== null && n !== r; ) {
      const o = Object.getOwnPropertyDescriptors(n);
      for (let i in o)
        if (!i.startsWith("__") && !i.startsWith("on")) {
          const s = e[i];
          dk(s) && (t[i] = s);
        }
      n = Object.getPrototypeOf(n);
    }
  }
}
function dk(e) {
  return typeof e == "string" || typeof e == "boolean" || typeof e == "number" || e === null;
}
function dm(e, t, n, r) {
  const o = nt(e.nativeNode), i = o ? o.lView : null;
  if (i !== null) {
    const s = i[C].data[o.nodeIndex];
    sr(s, i, t, n, r, e.nativeNode);
  } else
    Cp(e.nativeNode, t, n, r);
}
function sr(e, t, n, r, o, i) {
  ngDevMode && Ye(e, t);
  const s = YM(e, t);
  if (e.type & 11) {
    if (Gc(s, n, r, o, i), tr(e)) {
      const u = mt(e.index, t);
      u && u[C].firstChild && sr(u[C].firstChild, u, n, r, o, i);
    } else
      e.child && sr(e.child, t, n, r, o, i), s && Cp(s, n, r, o);
    const a = t[e.index];
    ke(a) && fm(a, n, r, o, i);
  } else if (e.type & 4) {
    const a = t[e.index];
    Gc(a[Kt], n, r, o, i), fm(a, n, r, o, i);
  } else if (e.type & 16) {
    const a = t[De], c = a[$e].projection[e.projection];
    if (Array.isArray(c))
      for (let l of c)
        Gc(l, n, r, o, i);
    else if (c) {
      const l = a[Ce], d = l[C].data[c.index];
      sr(d, l, n, r, o, i);
    }
  } else e.child && sr(e.child, t, n, r, o, i);
  if (i !== s) {
    const a = e.flags & 2 ? e.projectionNext : e.next;
    a && sr(a, t, n, r, o, i);
  }
}
function fm(e, t, n, r, o) {
  for (let i = ge; i < e.length; i++) {
    const s = e[i], a = s[C].firstChild;
    a && sr(a, s, t, n, r, o);
  }
}
function Gc(e, t, n, r, o) {
  if (o !== e) {
    const i = Ao(e);
    if (!i)
      return;
    (r && i instanceof Bs && t(i) && n.indexOf(i) === -1 || !r && t(i) && n.indexOf(i) === -1) && n.push(i);
  }
}
function Cp(e, t, n, r) {
  const o = e.childNodes, i = o.length;
  for (let s = 0; s < i; s++) {
    const a = o[s], u = Ao(a);
    u && ((r && u instanceof Bs && t(u) && n.indexOf(u) === -1 || !r && t(u) && n.indexOf(u) === -1) && n.push(u), Cp(a, t, n, r));
  }
}
function fk(e, t, n, r) {
  let o = t.propertyBindings;
  if (o !== null)
    for (let i = 0; i < o.length; i++) {
      const s = o[i], u = r[s].split(Io), c = u[0];
      if (u.length > 1) {
        let l = u[1];
        for (let d = 1; d < u.length - 1; d++)
          l += L(n[s + d - 1]) + u[d + 1];
        e[c] = l;
      } else
        e[c] = n[s];
    }
}
const Wc = "__ng_debug__";
function Ao(e) {
  return e instanceof Node ? (e.hasOwnProperty(Wc) || (e[Wc] = e.nodeType == Node.ELEMENT_NODE ? new Bs(e) : new Ip(e)), e[Wc]) : null;
}
class Nb {
  constructor() {
  }
  supports(t) {
    return Ua(t);
  }
  create(t) {
    return new kb(t);
  }
}
const hk = (e, t) => t;
class kb {
  constructor(t) {
    this.length = 0, this._linkedRecords = null, this._unlinkedRecords = null, this._previousItHead = null, this._itHead = null, this._itTail = null, this._additionsHead = null, this._additionsTail = null, this._movesHead = null, this._movesTail = null, this._removalsHead = null, this._removalsTail = null, this._identityChangesHead = null, this._identityChangesTail = null, this._trackByFn = t || hk;
  }
  forEachItem(t) {
    let n;
    for (n = this._itHead; n !== null; n = n._next)
      t(n);
  }
  forEachOperation(t) {
    let n = this._itHead, r = this._removalsHead, o = 0, i = null;
    for (; n || r; ) {
      const s = !r || n && n.currentIndex < pm(r, o, i) ? n : r, a = pm(s, o, i), u = s.currentIndex;
      if (s === r)
        o--, r = r._nextRemoved;
      else if (n = n._next, s.previousIndex == null)
        o++;
      else {
        i || (i = []);
        const c = a - o, l = u - o;
        if (c != l) {
          for (let f = 0; f < c; f++) {
            const h = f < i.length ? i[f] : i[f] = 0, p = h + f;
            l <= p && p < c && (i[f] = h + 1);
          }
          const d = s.previousIndex;
          i[d] = l - c;
        }
      }
      a !== u && t(s, a, u);
    }
  }
  forEachPreviousItem(t) {
    let n;
    for (n = this._previousItHead; n !== null; n = n._nextPrevious)
      t(n);
  }
  forEachAddedItem(t) {
    let n;
    for (n = this._additionsHead; n !== null; n = n._nextAdded)
      t(n);
  }
  forEachMovedItem(t) {
    let n;
    for (n = this._movesHead; n !== null; n = n._nextMoved)
      t(n);
  }
  forEachRemovedItem(t) {
    let n;
    for (n = this._removalsHead; n !== null; n = n._nextRemoved)
      t(n);
  }
  forEachIdentityChange(t) {
    let n;
    for (n = this._identityChangesHead; n !== null; n = n._nextIdentityChange)
      t(n);
  }
  diff(t) {
    if (t == null && (t = []), !Ua(t))
      throw new v(900, ngDevMode && `Error trying to diff '${Q(t)}'. Only arrays and iterables are allowed`);
    return this.check(t) ? this : null;
  }
  onDestroy() {
  }
  check(t) {
    this._reset();
    let n = this._itHead, r = !1, o, i, s;
    if (Array.isArray(t)) {
      this.length = t.length;
      for (let a = 0; a < this.length; a++)
        i = t[a], s = this._trackByFn(a, i), n === null || !Object.is(n.trackById, s) ? (n = this._mismatch(n, i, s, a), r = !0) : (r && (n = this._verifyReinsertion(n, i, s, a)), Object.is(n.item, i) || this._addIdentityChange(n, i)), n = n._next;
    } else
      o = 0, q1(t, (a) => {
        s = this._trackByFn(o, a), n === null || !Object.is(n.trackById, s) ? (n = this._mismatch(n, a, s, o), r = !0) : (r && (n = this._verifyReinsertion(n, a, s, o)), Object.is(n.item, a) || this._addIdentityChange(n, a)), n = n._next, o++;
      }), this.length = o;
    return this._truncate(n), this.collection = t, this.isDirty;
  }
  /* CollectionChanges is considered dirty if it has any additions, moves, removals, or identity
   * changes.
   */
  get isDirty() {
    return this._additionsHead !== null || this._movesHead !== null || this._removalsHead !== null || this._identityChangesHead !== null;
  }
  /**
   * Reset the state of the change objects to show no changes. This means set previousKey to
   * currentKey, and clear all of the queues (additions, moves, removals).
   * Set the previousIndexes of moved and added items to their currentIndexes
   * Reset the list of additions, moves and removals
   *
   * @internal
   */
  _reset() {
    if (this.isDirty) {
      let t;
      for (t = this._previousItHead = this._itHead; t !== null; t = t._next)
        t._nextPrevious = t._next;
      for (t = this._additionsHead; t !== null; t = t._nextAdded)
        t.previousIndex = t.currentIndex;
      for (this._additionsHead = this._additionsTail = null, t = this._movesHead; t !== null; t = t._nextMoved)
        t.previousIndex = t.currentIndex;
      this._movesHead = this._movesTail = null, this._removalsHead = this._removalsTail = null, this._identityChangesHead = this._identityChangesTail = null;
    }
  }
  /**
   * This is the core function which handles differences between collections.
   *
   * - `record` is the record which we saw at this position last time. If null then it is a new
   *   item.
   * - `item` is the current item in the collection
   * - `index` is the position of the item in the collection
   *
   * @internal
   */
  _mismatch(t, n, r, o) {
    let i;
    return t === null ? i = this._itTail : (i = t._prev, this._remove(t)), t = this._unlinkedRecords === null ? null : this._unlinkedRecords.get(r, null), t !== null ? (Object.is(t.item, n) || this._addIdentityChange(t, n), this._reinsertAfter(t, i, o)) : (t = this._linkedRecords === null ? null : this._linkedRecords.get(r, o), t !== null ? (Object.is(t.item, n) || this._addIdentityChange(t, n), this._moveAfter(t, i, o)) : t = this._addAfter(new pk(n, r), i, o)), t;
  }
  /**
   * This check is only needed if an array contains duplicates. (Short circuit of nothing dirty)
   *
   * Use case: `[a, a]` => `[b, a, a]`
   *
   * If we did not have this check then the insertion of `b` would:
   *   1) evict first `a`
   *   2) insert `b` at `0` index.
   *   3) leave `a` at index `1` as is. <-- this is wrong!
   *   3) reinsert `a` at index 2. <-- this is wrong!
   *
   * The correct behavior is:
   *   1) evict first `a`
   *   2) insert `b` at `0` index.
   *   3) reinsert `a` at index 1.
   *   3) move `a` at from `1` to `2`.
   *
   *
   * Double check that we have not evicted a duplicate item. We need to check if the item type may
   * have already been removed:
   * The insertion of b will evict the first 'a'. If we don't reinsert it now it will be reinserted
   * at the end. Which will show up as the two 'a's switching position. This is incorrect, since a
   * better way to think of it is as insert of 'b' rather then switch 'a' with 'b' and then add 'a'
   * at the end.
   *
   * @internal
   */
  _verifyReinsertion(t, n, r, o) {
    let i = this._unlinkedRecords === null ? null : this._unlinkedRecords.get(r, null);
    return i !== null ? t = this._reinsertAfter(i, t._prev, o) : t.currentIndex != o && (t.currentIndex = o, this._addToMoves(t, o)), t;
  }
  /**
   * Get rid of any excess {@link IterableChangeRecord_}s from the previous collection
   *
   * - `record` The first excess {@link IterableChangeRecord_}.
   *
   * @internal
   */
  _truncate(t) {
    for (; t !== null; ) {
      const n = t._next;
      this._addToRemovals(this._unlink(t)), t = n;
    }
    this._unlinkedRecords !== null && this._unlinkedRecords.clear(), this._additionsTail !== null && (this._additionsTail._nextAdded = null), this._movesTail !== null && (this._movesTail._nextMoved = null), this._itTail !== null && (this._itTail._next = null), this._removalsTail !== null && (this._removalsTail._nextRemoved = null), this._identityChangesTail !== null && (this._identityChangesTail._nextIdentityChange = null);
  }
  /** @internal */
  _reinsertAfter(t, n, r) {
    this._unlinkedRecords !== null && this._unlinkedRecords.remove(t);
    const o = t._prevRemoved, i = t._nextRemoved;
    return o === null ? this._removalsHead = i : o._nextRemoved = i, i === null ? this._removalsTail = o : i._prevRemoved = o, this._insertAfter(t, n, r), this._addToMoves(t, r), t;
  }
  /** @internal */
  _moveAfter(t, n, r) {
    return this._unlink(t), this._insertAfter(t, n, r), this._addToMoves(t, r), t;
  }
  /** @internal */
  _addAfter(t, n, r) {
    return this._insertAfter(t, n, r), this._additionsTail === null ? this._additionsTail = this._additionsHead = t : this._additionsTail = this._additionsTail._nextAdded = t, t;
  }
  /** @internal */
  _insertAfter(t, n, r) {
    const o = n === null ? this._itHead : n._next;
    return t._next = o, t._prev = n, o === null ? this._itTail = t : o._prev = t, n === null ? this._itHead = t : n._next = t, this._linkedRecords === null && (this._linkedRecords = new hm()), this._linkedRecords.put(t), t.currentIndex = r, t;
  }
  /** @internal */
  _remove(t) {
    return this._addToRemovals(this._unlink(t));
  }
  /** @internal */
  _unlink(t) {
    this._linkedRecords !== null && this._linkedRecords.remove(t);
    const n = t._prev, r = t._next;
    return n === null ? this._itHead = r : n._next = r, r === null ? this._itTail = n : r._prev = n, t;
  }
  /** @internal */
  _addToMoves(t, n) {
    return t.previousIndex === n || (this._movesTail === null ? this._movesTail = this._movesHead = t : this._movesTail = this._movesTail._nextMoved = t), t;
  }
  _addToRemovals(t) {
    return this._unlinkedRecords === null && (this._unlinkedRecords = new hm()), this._unlinkedRecords.put(t), t.currentIndex = null, t._nextRemoved = null, this._removalsTail === null ? (this._removalsTail = this._removalsHead = t, t._prevRemoved = null) : (t._prevRemoved = this._removalsTail, this._removalsTail = this._removalsTail._nextRemoved = t), t;
  }
  /** @internal */
  _addIdentityChange(t, n) {
    return t.item = n, this._identityChangesTail === null ? this._identityChangesTail = this._identityChangesHead = t : this._identityChangesTail = this._identityChangesTail._nextIdentityChange = t, t;
  }
}
class pk {
  constructor(t, n) {
    this.item = t, this.trackById = n, this.currentIndex = null, this.previousIndex = null, this._nextPrevious = null, this._prev = null, this._next = null, this._prevDup = null, this._nextDup = null, this._prevRemoved = null, this._nextRemoved = null, this._nextAdded = null, this._nextMoved = null, this._nextIdentityChange = null;
  }
}
class gk {
  constructor() {
    this._head = null, this._tail = null;
  }
  /**
   * Append the record to the list of duplicates.
   *
   * Note: by design all records in the list of duplicates hold the same value in record.item.
   */
  add(t) {
    this._head === null ? (this._head = this._tail = t, t._nextDup = null, t._prevDup = null) : (this._tail._nextDup = t, t._prevDup = this._tail, t._nextDup = null, this._tail = t);
  }
  // Returns a IterableChangeRecord_ having IterableChangeRecord_.trackById == trackById and
  // IterableChangeRecord_.currentIndex >= atOrAfterIndex
  get(t, n) {
    let r;
    for (r = this._head; r !== null; r = r._nextDup)
      if ((n === null || n <= r.currentIndex) && Object.is(r.trackById, t))
        return r;
    return null;
  }
  /**
   * Remove one {@link IterableChangeRecord_} from the list of duplicates.
   *
   * Returns whether the list of duplicates is empty.
   */
  remove(t) {
    const n = t._prevDup, r = t._nextDup;
    return n === null ? this._head = r : n._nextDup = r, r === null ? this._tail = n : r._prevDup = n, this._head === null;
  }
}
class hm {
  constructor() {
    this.map = /* @__PURE__ */ new Map();
  }
  put(t) {
    const n = t.trackById;
    let r = this.map.get(n);
    r || (r = new gk(), this.map.set(n, r)), r.add(t);
  }
  /**
   * Retrieve the `value` using key. Because the IterableChangeRecord_ value may be one which we
   * have already iterated over, we use the `atOrAfterIndex` to pretend it is not there.
   *
   * Use case: `[a, b, c, a, a]` if we are at index `3` which is the second `a` then asking if we
   * have any more `a`s needs to return the second `a`.
   */
  get(t, n) {
    const r = t, o = this.map.get(r);
    return o ? o.get(t, n) : null;
  }
  /**
   * Removes a {@link IterableChangeRecord_} from the list of duplicates.
   *
   * The list of duplicates also is removed from the map if it gets empty.
   */
  remove(t) {
    const n = t.trackById;
    return this.map.get(n).remove(t) && this.map.delete(n), t;
  }
  get isEmpty() {
    return this.map.size === 0;
  }
  clear() {
    this.map.clear();
  }
}
function pm(e, t, n) {
  const r = e.previousIndex;
  if (r === null)
    return r;
  let o = 0;
  return n && r < n.length && (o = n[r]), r + t + o;
}
class Rb {
  constructor() {
  }
  supports(t) {
    return t instanceof Map || oh(t);
  }
  create() {
    return new mk();
  }
}
class mk {
  constructor() {
    this._records = /* @__PURE__ */ new Map(), this._mapHead = null, this._appendAfter = null, this._previousMapHead = null, this._changesHead = null, this._changesTail = null, this._additionsHead = null, this._additionsTail = null, this._removalsHead = null, this._removalsTail = null;
  }
  get isDirty() {
    return this._additionsHead !== null || this._changesHead !== null || this._removalsHead !== null;
  }
  forEachItem(t) {
    let n;
    for (n = this._mapHead; n !== null; n = n._next)
      t(n);
  }
  forEachPreviousItem(t) {
    let n;
    for (n = this._previousMapHead; n !== null; n = n._nextPrevious)
      t(n);
  }
  forEachChangedItem(t) {
    let n;
    for (n = this._changesHead; n !== null; n = n._nextChanged)
      t(n);
  }
  forEachAddedItem(t) {
    let n;
    for (n = this._additionsHead; n !== null; n = n._nextAdded)
      t(n);
  }
  forEachRemovedItem(t) {
    let n;
    for (n = this._removalsHead; n !== null; n = n._nextRemoved)
      t(n);
  }
  diff(t) {
    if (!t)
      t = /* @__PURE__ */ new Map();
    else if (!(t instanceof Map || oh(t)))
      throw new v(900, ngDevMode && `Error trying to diff '${Q(t)}'. Only maps and objects are allowed`);
    return this.check(t) ? this : null;
  }
  onDestroy() {
  }
  /**
   * Check the current state of the map vs the previous.
   * The algorithm is optimised for when the keys do no change.
   */
  check(t) {
    this._reset();
    let n = this._mapHead;
    if (this._appendAfter = null, this._forEach(t, (r, o) => {
      if (n && n.key === o)
        this._maybeAddToChanges(n, r), this._appendAfter = n, n = n._next;
      else {
        const i = this._getOrCreateRecordForKey(o, r);
        n = this._insertBeforeOrAppend(n, i);
      }
    }), n) {
      n._prev && (n._prev._next = null), this._removalsHead = n;
      for (let r = n; r !== null; r = r._nextRemoved)
        r === this._mapHead && (this._mapHead = null), this._records.delete(r.key), r._nextRemoved = r._next, r.previousValue = r.currentValue, r.currentValue = null, r._prev = null, r._next = null;
    }
    return this._changesTail && (this._changesTail._nextChanged = null), this._additionsTail && (this._additionsTail._nextAdded = null), this.isDirty;
  }
  /**
   * Inserts a record before `before` or append at the end of the list when `before` is null.
   *
   * Notes:
   * - This method appends at `this._appendAfter`,
   * - This method updates `this._appendAfter`,
   * - The return value is the new value for the insertion pointer.
   */
  _insertBeforeOrAppend(t, n) {
    if (t) {
      const r = t._prev;
      return n._next = t, n._prev = r, t._prev = n, r && (r._next = n), t === this._mapHead && (this._mapHead = n), this._appendAfter = t, t;
    }
    return this._appendAfter ? (this._appendAfter._next = n, n._prev = this._appendAfter) : this._mapHead = n, this._appendAfter = n, null;
  }
  _getOrCreateRecordForKey(t, n) {
    if (this._records.has(t)) {
      const o = this._records.get(t);
      this._maybeAddToChanges(o, n);
      const i = o._prev, s = o._next;
      return i && (i._next = s), s && (s._prev = i), o._next = null, o._prev = null, o;
    }
    const r = new yk(t);
    return this._records.set(t, r), r.currentValue = n, this._addToAdditions(r), r;
  }
  /** @internal */
  _reset() {
    if (this.isDirty) {
      let t;
      for (this._previousMapHead = this._mapHead, t = this._previousMapHead; t !== null; t = t._next)
        t._nextPrevious = t._next;
      for (t = this._changesHead; t !== null; t = t._nextChanged)
        t.previousValue = t.currentValue;
      for (t = this._additionsHead; t != null; t = t._nextAdded)
        t.previousValue = t.currentValue;
      this._changesHead = this._changesTail = null, this._additionsHead = this._additionsTail = null, this._removalsHead = null;
    }
  }
  // Add the record or a given key to the list of changes only when the value has actually changed
  _maybeAddToChanges(t, n) {
    Object.is(n, t.currentValue) || (t.previousValue = t.currentValue, t.currentValue = n, this._addToChanges(t));
  }
  _addToAdditions(t) {
    this._additionsHead === null ? this._additionsHead = this._additionsTail = t : (this._additionsTail._nextAdded = t, this._additionsTail = t);
  }
  _addToChanges(t) {
    this._changesHead === null ? this._changesHead = this._changesTail = t : (this._changesTail._nextChanged = t, this._changesTail = t);
  }
  /** @internal */
  _forEach(t, n) {
    t instanceof Map ? t.forEach(n) : Object.keys(t).forEach((r) => n(t[r], r));
  }
}
class yk {
  constructor(t) {
    this.key = t, this.previousValue = null, this.currentValue = null, this._nextPrevious = null, this._next = null, this._prev = null, this._nextAdded = null, this._nextRemoved = null, this._nextChanged = null;
  }
}
function gm() {
  return new At([new Nb()]);
}
class At {
  static {
    this.ɵprov = te({ token: At, providedIn: "root", factory: gm });
  }
  constructor(t) {
    this.factories = t;
  }
  static create(t, n) {
    if (n != null) {
      const r = n.factories.slice();
      t = t.concat(r);
    }
    return new At(t);
  }
  /**
   * Takes an array of {@link IterableDifferFactory} and returns a provider used to extend the
   * inherited {@link IterableDiffers} instance with the provided factories and return a new
   * {@link IterableDiffers} instance.
   *
   * @usageNotes
   * ### Example
   *
   * The following example shows how to extend an existing list of factories,
   * which will only be applied to the injector for this component and its children.
   * This step is all that's required to make a new {@link IterableDiffer} available.
   *
   * ```
   * @Component({
   *   viewProviders: [
   *     IterableDiffers.extend([new ImmutableListDiffer()])
   *   ]
   * })
   * ```
   */
  static extend(t) {
    return {
      provide: At,
      useFactory: (n) => At.create(t, n || gm()),
      // Dependency technically isn't optional, but we can provide a better error message this way.
      deps: [[At, new mu(), new Yt()]]
    };
  }
  find(t) {
    const n = this.factories.find((r) => r.supports(t));
    if (n != null)
      return n;
    throw new v(901, ngDevMode && `Cannot find a differ supporting object '${t}' of type '${Dk(t)}'`);
  }
}
function Dk(e) {
  return e.name || typeof e;
}
function mm() {
  return new lt([new Rb()]);
}
class lt {
  static {
    this.ɵprov = te({ token: lt, providedIn: "root", factory: mm });
  }
  constructor(t) {
    this.factories = t;
  }
  static create(t, n) {
    if (n) {
      const r = n.factories.slice();
      t = t.concat(r);
    }
    return new lt(t);
  }
  /**
   * Takes an array of {@link KeyValueDifferFactory} and returns a provider used to extend the
   * inherited {@link KeyValueDiffers} instance with the provided factories and return a new
   * {@link KeyValueDiffers} instance.
   *
   * @usageNotes
   * ### Example
   *
   * The following example shows how to extend an existing list of factories,
   * which will only be applied to the injector for this component and its children.
   * This step is all that's required to make a new {@link KeyValueDiffer} available.
   *
   * ```
   * @Component({
   *   viewProviders: [
   *     KeyValueDiffers.extend([new ImmutableMapDiffer()])
   *   ]
   * })
   * ```
   */
  static extend(t) {
    return {
      provide: lt,
      useFactory: (n) => lt.create(t, n || mm()),
      // Dependency technically isn't optional, but we can provide a better error message this way.
      deps: [[lt, new mu(), new Yt()]]
    };
  }
  find(t) {
    const n = this.factories.find((r) => r.supports(t));
    if (n)
      return n;
    throw new v(901, ngDevMode && `Cannot find a differ supporting object '${t}'`);
  }
}
const vk = [new Rb()], Ik = [new Nb()], Ck = new At(Ik), Ek = new lt(vk), bk = Mb(null, "core", []);
class Ji {
  // Inject ApplicationRef to make it eager...
  constructor(t) {
  }
  static {
    this.ɵfac = function(n) {
      return new (n || Ji)(Ne(rt));
    };
  }
  static {
    this.ɵmod = /* @__PURE__ */ kd({ type: Ji });
  }
  static {
    this.ɵinj = /* @__PURE__ */ hu({});
  }
}
(typeof ngDevMode > "u" || ngDevMode) && Je(Ji, [{
  type: dp
}], () => [{ type: rt }], null);
function wk(e) {
}
const Mk = 200, ym = 1200;
class co {
  constructor() {
    this.window = null, this.observer = null, this.options = w(cf), this.ngZone = w(le);
  }
  start() {
    if (typeof PerformanceObserver > "u" || this.options?.disableImageSizeWarning && this.options?.disableImageLazyLoadWarning)
      return;
    this.observer = this.initPerformanceObserver();
    const t = Yn(), n = t.defaultView;
    if (typeof n < "u") {
      this.window = n;
      const r = () => {
        setTimeout(this.scanImages.bind(this), Mk);
      };
      this.ngZone.runOutsideAngular(() => {
        t.readyState === "complete" ? r() : this.window?.addEventListener("load", r, { once: !0 });
      });
    }
  }
  ngOnDestroy() {
    this.observer?.disconnect();
  }
  initPerformanceObserver() {
    if (typeof PerformanceObserver > "u")
      return null;
    const t = new PerformanceObserver((n) => {
      const r = n.getEntries();
      if (r.length === 0)
        return;
      const i = r[r.length - 1].element?.src ?? "";
      i.startsWith("data:") || i.startsWith("blob:") || (this.lcpImageUrl = i);
    });
    return t.observe({ type: "largest-contentful-paint", buffered: !0 }), t;
  }
  scanImages() {
    const t = Yn().querySelectorAll("img");
    let n, r = !1;
    t.forEach((o) => {
      if (!this.options?.disableImageSizeWarning)
        for (const i of t)
          !i.getAttribute("ng-img") && this.isOversized(i) && Sk(i.src);
      !this.options?.disableImageLazyLoadWarning && this.lcpImageUrl && o.src === this.lcpImageUrl && (n = !0, (o.loading !== "lazy" || o.getAttribute("ng-img")) && (r = !0));
    }), n && !r && this.lcpImageUrl && !this.options?.disableImageLazyLoadWarning && _k(this.lcpImageUrl);
  }
  isOversized(t) {
    if (!this.window)
      return !1;
    const n = this.window.getComputedStyle(t);
    let r = parseFloat(n.getPropertyValue("width")), o = parseFloat(n.getPropertyValue("height"));
    const i = n.getPropertyValue("box-sizing");
    if (n.getPropertyValue("object-fit") === "cover")
      return !1;
    if (i === "border-box") {
      const h = n.getPropertyValue("padding-top"), p = n.getPropertyValue("padding-right"), g = n.getPropertyValue("padding-bottom"), D = n.getPropertyValue("padding-left");
      r -= parseFloat(p) + parseFloat(D), o -= parseFloat(h) + parseFloat(g);
    }
    const a = t.naturalWidth, u = t.naturalHeight, c = this.window.devicePixelRatio * r, l = this.window.devicePixelRatio * o, d = a - c >= ym, f = u - l >= ym;
    return d || f;
  }
  static {
    this.ɵfac = function(n) {
      return new (n || co)();
    };
  }
  static {
    this.ɵprov = /* @__PURE__ */ te({ token: co, factory: co.ɵfac, providedIn: "root" });
  }
}
(typeof ngDevMode > "u" || ngDevMode) && Je(co, [{
  type: fe,
  args: [{ providedIn: "root" }]
}], null, null);
function _k(e) {
  console.warn(me(-913, `An image with src ${e} is the Largest Contentful Paint (LCP) element but was given a "loading" value of "lazy", which can negatively impact application loading performance. This warning can be addressed by changing the loading value of the LCP image to "eager", or by using the NgOptimizedImage directive's prioritization utilities. For more information about addressing or disabling this warning, see https://angular.io/errors/NG0913`));
}
function Sk(e) {
  console.warn(me(-913, `An image with src ${e} has intrinsic file dimensions much larger than its rendered size. This can negatively impact application loading performance. For more information about addressing or disabling this warning, see https://angular.io/errors/NG0913`));
}
function Tk(e) {
  try {
    const { rootComponent: t, appProviders: n, platformProviders: r } = e;
    (typeof ngDevMode > "u" || ngDevMode) && t !== void 0 && fT(t);
    const o = tk(r), i = [
      Eb(),
      ...n || []
    ], a = new fC({
      providers: i,
      parent: o,
      debugName: typeof ngDevMode > "u" || ngDevMode ? "Environment Injector" : "",
      // We skip environment initializers because we need to run them inside the NgZone, which
      // happens after we get the NgZone instance from the Injector.
      runEnvironmentInitializers: !1
    }).injector, u = a.get(le);
    return u.run(() => {
      a.resolveInjectorInitializers();
      const c = a.get(Mn, null);
      if ((typeof ngDevMode > "u" || ngDevMode) && !c)
        throw new v(402, "No `ErrorHandler` found in the Dependency Injection tree.");
      let l;
      u.runOutsideAngular(() => {
        l = u.onError.subscribe({
          next: (h) => {
            c.handleError(h);
          }
        });
      });
      const d = () => a.destroy(), f = o.get(Dp);
      return f.add(d), a.onDestroy(() => {
        l.unsubscribe(), f.delete(d);
      }), hb(c, u, () => {
        const h = a.get(pn);
        return h.runInitializers(), h.donePromise.then(() => {
          const p = a.get(Ue, Mr);
          _h(p || Mr);
          const g = a.get(rt);
          return t !== void 0 && g.bootstrap(t), (typeof ngDevMode > "u" || ngDevMode) && a.get(co).start(), g;
        });
      });
    });
  } catch (t) {
    return Promise.reject(t);
  }
}
class lo {
  constructor() {
    this.appRef = w(rt), this.taskService = w(Rt), this.pendingRenderTaskId = null, this.shouldRefreshViews = !1;
  }
  notify(t = 0) {
    this.shouldRefreshViews ||= t === 0, this.pendingRenderTaskId === null && (this.pendingRenderTaskId = this.taskService.add(), this.raceTimeoutAndRequestAnimationFrame());
  }
  /**
   * Run change detection after the first of setTimeout and requestAnimationFrame resolves.
   *
   * - `requestAnimationFrame` ensures that change detection runs ahead of a browser repaint.
   * This ensures that the create and update passes of a change detection always happen
   * in the same frame.
   * - When the browser is resource-starved, `rAF` can execute _before_ a `setTimeout` because
   * rendering is a very high priority process. This means that `setTimeout` cannot guarantee
   * same-frame create and update pass, when `setTimeout` is used to schedule the update phase.
   * - While `rAF` gives us the desirable same-frame updates, it has two limitations that
   * prevent it from being used alone. First, it does not run in background tabs, which would
   * prevent Angular from initializing an application when opened in a new tab (for example).
   * Second, repeated calls to requestAnimationFrame will execute at the refresh rate of the
   * hardware (~16ms for a 60Hz display). This would cause significant slowdown of tests that
   * are written with several updates and asserts in the form of "update; await stable; assert;".
   * - Both `setTimeout` and `rAF` are able to "coalesce" several events from a single user
   * interaction into a single change detection. Importantly, this reduces view tree traversals when
   * compared to an alternative timing mechanism like `queueMicrotask`, where change detection would
   * then be interleaves between each event.
   *
   * By running change detection after the first of `setTimeout` and `rAF` to execute, we get the
   * best of both worlds.
   */
  async raceTimeoutAndRequestAnimationFrame() {
    const t = new Promise((r) => setTimeout(r)), n = typeof he.requestAnimationFrame == "function" ? new Promise((r) => requestAnimationFrame(() => r())) : null;
    await Promise.race([t, n]), this.tick();
  }
  tick() {
    try {
      this.appRef.destroyed || this.appRef._tick(this.shouldRefreshViews);
    } finally {
      this.shouldRefreshViews = !1;
      const t = this.pendingRenderTaskId;
      this.pendingRenderTaskId = null, this.taskService.remove(t);
    }
  }
  static {
    this.ɵfac = function(n) {
      return new (n || lo)();
    };
  }
  static {
    this.ɵprov = /* @__PURE__ */ te({ token: lo, factory: lo.ɵfac, providedIn: "root" });
  }
}
(typeof ngDevMode > "u" || ngDevMode) && Je(lo, [{
  type: fe,
  args: [{ providedIn: "root" }]
}], null, null);
function Ak() {
  return hs([
    { provide: Zu, useExisting: lo },
    { provide: le, useClass: Hf }
  ]);
}
function hd(e, t) {
  const n = e[C];
  for (let r = T; r < n.bindingStartIndex; r++)
    if (ke(e[r])) {
      const o = e[r];
      if (!(r === n.bindingStartIndex - 1)) {
        const s = n.data[r], a = Dt(n, s);
        if (nO(a)) {
          t.push({ lContainer: o, lView: e, tNode: s, tDetails: a });
          continue;
        }
      }
      for (let s = ge; s < o.length; s++)
        hd(o[s], t);
    } else Le(e[r]) && hd(e[r], t);
}
let Dm = !1, xb = !1;
const Ok = 1e4;
function Fk() {
  Dm || (Dm = !0, mS(), BO(), QF(), UO(), Y1(), c1(), PA(), kT(), lF());
}
function Nk(e) {
  const t = e.get(Zt), n = `Angular hydrated ${ngDevMode.hydratedComponents} component(s) and ${ngDevMode.hydratedNodes} node(s), ${ngDevMode.componentsSkippedHydration} component(s) were skipped. Learn more at https://angular.io/guide/hydration.`;
  t.log(n);
}
function kk(e, t) {
  const n = gb(e);
  if (typeof ngDevMode < "u" && ngDevMode) {
    const r = Ok, o = t.get(Zt), s = t.get(le).runOutsideAngular(() => setTimeout(() => Lk(r, o), r));
    n.finally(() => clearTimeout(s));
  }
  return n;
}
function Rk() {
  return hs([
    {
      provide: fi,
      useFactory: () => {
        let e = !0;
        if (Ft() && (e = !!w(Hr, { optional: !0 })?.get(ff, null), !e && typeof ngDevMode < "u" && ngDevMode)) {
          const n = w(Zt), r = me(-505, "Angular hydration was requested on the client, but there was no serialized information present in the server response, thus hydration was not enabled. Make sure the `provideClientHydration()` is included into the list of providers in the server part of the application configuration.");
          n.warn(r);
        }
        return e && _t("NgHydration"), e;
      }
    },
    {
      provide: lr,
      useValue: () => {
        xb = !!w(lv, { optional: !0 }), Ft() && w(fi) && (jk(), Fk());
      },
      multi: !0
    },
    {
      provide: cv,
      useFactory: () => Ft() && w(fi)
    },
    {
      provide: mp,
      useFactory: () => {
        if (Ft() && w(fi)) {
          const e = w(rt), t = w(Re);
          return () => {
            kk(e, t).then(() => {
              wA(e), typeof ngDevMode < "u" && ngDevMode && Nk(t);
            });
          };
        }
        return () => {
        };
      },
      multi: !0
    }
  ]);
}
function xk() {
  return hs([
    {
      provide: lv,
      useValue: !0
    }
  ]);
}
function Pk() {
  return xb;
}
function Lk(e, t) {
  const n = `Angular hydration expected the ApplicationRef.isStable() to emit \`true\`, but it didn't happen within ${e}ms. Angular hydration logic depends on the application becoming stable as a signal to complete hydration process.`;
  t.warn(me(-506, n));
}
function jk() {
  const e = Yn();
  let t;
  for (const n of e.body.childNodes)
    if (n.nodeType === Node.COMMENT_NODE && n.textContent?.trim() === nv) {
      t = n;
      break;
    }
  if (!t)
    throw new v(-507, typeof ngDevMode < "u" && ngDevMode && "Angular hydration logic detected that HTML content of this page was modified after it was produced during server side rendering. Make sure that there are no optimizations that remove comment nodes from HTML enabled on your CDN. Angular hydration relies on HTML produced by the server, including whitespaces and comment nodes.");
}
class $k {
  constructor() {
    this.views = [], this.indexByContent = /* @__PURE__ */ new Map();
  }
  add(t) {
    const n = JSON.stringify(t);
    if (!this.indexByContent.has(n)) {
      const r = this.views.length;
      return this.views.push(t), this.indexByContent.set(n, r), r;
    }
    return this.indexByContent.get(n);
  }
  getAll() {
    return this.views;
  }
}
let Bk = 0;
function Pb(e) {
  return e.ssrId || (e.ssrId = `t${Bk++}`), e.ssrId;
}
function Lb(e, t, n) {
  const r = [];
  return Wi(e, t, n, r), r.length;
}
function Hk(e) {
  const t = [];
  return lI(e, t), t.length;
}
function jb(e, t) {
  const n = e[de];
  return n && !n.hasAttribute(Vi) ? eu(n, e, t) : null;
}
function $b(e, t) {
  const n = zd(e[de]), r = jb(n, t), o = re(n[de]), i = e[Ce], s = eu(o, i, t), a = n[F], u = `${r}|${s}`;
  a.setAttribute(o, Di, u);
}
function Vk(e, t) {
  const n = new $k(), r = /* @__PURE__ */ new Map(), o = e._views;
  for (const a of o) {
    const u = ov(a);
    if (u !== null) {
      const c = {
        serializedViewCollection: n,
        corruptedTextNodes: r
      };
      ke(u) ? $b(u, c) : jb(u, c), Wk(r, t);
    }
  }
  const i = n.getAll();
  e.injector.get(Hr).set(ff, i);
}
function Uk(e, t) {
  const n = [];
  let r = "";
  for (let o = ge; o < e.length; o++) {
    let i = e[o], s, a, u;
    if (Bd(i) && (i = i[T], ke(i))) {
      a = Hk(i) + 1, $b(i, t);
      const l = zd(i[de]);
      u = {
        [kl]: l[C].ssrId,
        [Do]: a
      };
    }
    if (!u) {
      const l = i[C];
      l.type === 1 ? (s = l.ssrId, a = 1) : (s = Pb(l), a = Lb(l, i, l.firstChild)), u = {
        [kl]: s,
        [Do]: a,
        ...Bb(e[o], t)
      };
    }
    const c = JSON.stringify(u);
    if (n.length > 0 && c === r) {
      const l = n[n.length - 1];
      l[La] ??= 1, l[La]++;
    } else
      r = c, n.push(u);
  }
  return n;
}
function Xa(e, t, n) {
  const r = t.index - T;
  e[Rl] ??= {}, e[Rl][r] = kA(t, n);
}
function vm(e, t) {
  const n = t.index - T;
  e[ga] ??= [], e[ga].includes(n) || e[ga].push(n);
}
function Bb(e, t) {
  const n = {}, r = e[C];
  for (let o = T; o < r.bindingStartIndex; o++) {
    const i = r.data[o], s = o - T;
    if (g_(i)) {
      if (Qi(i, e) && qk(i)) {
        vm(n, i);
        continue;
      }
      if (Array.isArray(i.projection)) {
        for (const a of i.projection)
          if (a)
            if (!Array.isArray(a))
              !$M(a) && !xa(a) && (Qi(a, e) ? vm(n, a) : Xa(n, a, e));
            else
              throw mA(re(e[o]));
      }
      if (zk(n, i, e), ke(e[o])) {
        const a = i.tView;
        a !== null && (n[Nl] ??= {}, n[Nl][s] = Pb(a));
        const u = e[o][de];
        if (Array.isArray(u)) {
          const c = re(u);
          c.hasAttribute(Vi) || eu(c, u, t);
        }
        n[Ui] ??= {}, n[Ui][s] = Uk(e[o], t);
      } else if (Array.isArray(e[o])) {
        const a = re(e[o][de]);
        a.hasAttribute(Vi) || eu(a, e[o], t);
      } else if (i.type & 8)
        n[Fl] ??= {}, n[Fl][s] = Lb(r, e, i.child);
      else if (i.type & 16) {
        let a = i.next;
        for (; a !== null && a.type & 16; )
          a = a.next;
        a && !xa(a) && Xa(n, a, e);
      } else if (i.type & 1) {
        const a = re(e[o]);
        a.textContent === "" ? t.corruptedTextNodes.set(
          a,
          "ngetn"
          /* TextNodeMarker.EmptyNode */
        ) : a.nextSibling?.nodeType === Node.TEXT_NODE && t.corruptedTextNodes.set(
          a,
          "ngtns"
          /* TextNodeMarker.Separator */
        );
      }
    }
  }
  return n;
}
function zk(e, t, n) {
  t.projectionNext && t.projectionNext !== t.next && !xa(t.projectionNext) && Xa(e, t.projectionNext, n), t.prev === null && t.parent !== null && Qi(t.parent, n) && !Qi(t, n) && Xa(e, t, n);
}
function Gk(e) {
  const t = e[ie];
  return t?.constructor ? V(t.constructor)?.encapsulation === mn.ShadowDom : !1;
}
function eu(e, t, n) {
  const r = t[F];
  if (BM(t) && !Pk() || Gk(t))
    return r.setAttribute(e, Vi, ""), null;
  {
    const o = Bb(t, n), i = n.serializedViewCollection.add(o);
    return r.setAttribute(e, Di, i.toString()), i;
  }
}
function Wk(e, t) {
  for (const [n, r] of e)
    n.after(t.createComment(r));
}
function qk(e) {
  let t = e;
  for (; t != null; ) {
    if (tr(t))
      return !0;
    t = t.parent;
  }
  return !1;
}
function Hb(e, t) {
  !t && Ze(Hb);
  const n = t?.injector ?? w(Re), r = n.get(rt);
  let o = !1;
  const i = () => {
    o || r.destroyed || (o = !0, e());
  };
  Ba(i, { injector: n, runOnServer: !0 }), queueMicrotask(i);
}
function xn(e) {
  return typeof e == "boolean" ? e : e != null && e !== "false";
}
function Xi(e, t = NaN) {
  return !isNaN(parseFloat(e)) && !isNaN(Number(e)) ? Number(e) : t;
}
function vt(e) {
  return Ae({ usage: 1, kind: "directive", type: e.type }).compileDirectiveDeclaration(qe, `ng:///${e.type.name}/ɵfac.js`, e);
}
function B(e) {
  Je(e.type, e.decorators, e.ctorParameters ?? null, e.propDecorators ?? null);
}
function Qk(e) {
  return Ae({ usage: 1, kind: "component", type: e.type }).compileComponentDeclaration(qe, `ng:///${e.type.name}/ɵcmp.js`, e);
}
function H(e) {
  return Ae({
    usage: 1,
    kind: Zk(e.target),
    type: e.type
  }).compileFactoryDeclaration(qe, `ng:///${e.type.name}/ɵfac.js`, e);
}
function Zk(e) {
  switch (e) {
    case P.Directive:
      return "directive";
    case P.Component:
      return "component";
    case P.Injectable:
      return "injectable";
    case P.Pipe:
      return "pipe";
    case P.NgModule:
      return "NgModule";
  }
}
function It(e) {
  return Ae({ usage: 1, kind: "injectable", type: e.type }).compileInjectableDeclaration(qe, `ng:///${e.type.name}/ɵprov.js`, e);
}
function Vb(e) {
  return Ae({ usage: 1, kind: "NgModule", type: e.type }).compileInjectorDeclaration(qe, `ng:///${e.type.name}/ɵinj.js`, e);
}
function Ub(e) {
  return Ae({ usage: 1, kind: "NgModule", type: e.type }).compileNgModuleDeclaration(qe, `ng:///${e.type.name}/ɵmod.js`, e);
}
function ct(e) {
  return Ae({ usage: 1, kind: "pipe", type: e.type }).compilePipeDeclaration(qe, `ng:///${e.type.name}/ɵpipe.js`, e);
}
function Yk(e, t) {
  _t("NgSignals");
  const n = Jm(e);
  return t?.equal && (n[ht].equal = t.equal), ngDevMode && (n.toString = () => `[Computed: ${n()}]`), n;
}
function pd(e) {
  const t = $(null);
  try {
    return e();
  } finally {
    $(t);
  }
}
const Kk = new j("", {
  providedIn: "root",
  factory: () => w(yc)
});
class yc {
  static {
    this.ɵprov = te({
      token: yc,
      providedIn: "root",
      factory: () => new Jk()
    });
  }
}
class Jk {
  constructor() {
    this.queuedEffectCount = 0, this.queues = /* @__PURE__ */ new Map(), this.pendingTasks = w(Rt), this.taskId = null;
  }
  scheduleEffect(t) {
    if (this.enqueue(t), this.taskId === null) {
      const n = this.taskId = this.pendingTasks.add();
      queueMicrotask(() => {
        this.flush(), this.pendingTasks.remove(n), this.taskId = null;
      });
    }
  }
  enqueue(t) {
    const n = t.creationZone;
    this.queues.has(n) || this.queues.set(n, /* @__PURE__ */ new Set());
    const r = this.queues.get(n);
    r.has(t) || (this.queuedEffectCount++, r.add(t));
  }
  /**
   * Run all scheduled effects.
   *
   * Execution order of effects within the same zone is guaranteed to be FIFO, but there is no
   * ordering guarantee between effects scheduled in different zones.
   */
  flush() {
    for (; this.queuedEffectCount > 0; )
      for (const [t, n] of this.queues)
        t === null ? this.flushQueue(n) : t.run(() => this.flushQueue(n));
  }
  flushQueue(t) {
    for (const n of t)
      t.delete(n), this.queuedEffectCount--, n.run();
  }
}
class Xk {
  constructor(t, n, r, o, i, s) {
    this.scheduler = t, this.effectFn = n, this.creationZone = r, this.injector = i, this.watcher = mw((a) => this.runEffect(a), () => this.schedule(), s), this.unregisterOnDestroy = o?.onDestroy(() => this.destroy());
  }
  runEffect(t) {
    try {
      this.effectFn(t);
    } catch (n) {
      this.injector.get(Mn, null, { optional: !0 })?.handleError(n);
    }
  }
  run() {
    this.watcher.run();
  }
  schedule() {
    this.scheduler.scheduleEffect(this);
  }
  destroy() {
    this.watcher.destroy(), this.unregisterOnDestroy?.();
  }
}
function gd(e, t) {
  _t("NgSignals"), ngDevMode && $f(gd, "Call `effect` outside of a reactive context. For example, schedule the effect inside the component constructor."), !t?.injector && Ze(gd);
  const n = t?.injector ?? w(Re), r = t?.manualCleanup !== !0 ? n.get(Br) : null, o = new Xk(n.get(Kk), e, typeof Zone > "u" ? null : Zone.current, r, n, t?.allowSignalWrites ?? !1), i = n.get(ui, null, { optional: !0 });
  return !i || !(i._lView[_] & 8) ? o.watcher.notify() : (i._lView[da] ??= []).push(o.watcher.notify), o;
}
function eR(e, t) {
  ngDevMode && Nv(e);
  const n = V(e), r = t.elementInjector || vu();
  return new Zo(n).create(r, t.projectableNodes, t.hostElement, t.environmentInjector);
}
function tR(e) {
  const t = V(e);
  if (!t)
    return null;
  const n = new Zo(t);
  return {
    get selector() {
      return n.selector;
    },
    get type() {
      return n.componentType;
    },
    get inputs() {
      return n.inputs;
    },
    get outputs() {
      return n.outputs;
    },
    get ngContentSelectors() {
      return n.ngContentSelectors;
    },
    get isStandalone() {
      return t.standalone;
    },
    get isSignal() {
      return t.signals;
    }
  };
}
function nR(...e) {
  return e.reduce((t, n) => Object.assign(t, n, { providers: [...t.providers, ...n.providers] }), { providers: [] });
}
typeof ngDevMode < "u" && ngDevMode && (he.$localize ??= function() {
  throw new Error("It looks like your application or one of its dependencies is using i18n.\nAngular 9 introduced a global `$localize()` function that needs to be loaded.\nPlease run `ng add @angular/localize` from the Angular CLI.\n(For non-CLI projects, add `import '@angular/localize/init';` to your `polyfills.ts` file.\nFor server-side rendering applications add the import to your `main.server.ts` file.)");
});
const b = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ANIMATION_MODULE_TYPE: cS,
  APP_BOOTSTRAP_LISTENER: mp,
  APP_ID: ev,
  APP_INITIALIZER: cb,
  get AfterRenderPhase() {
    return dn;
  },
  ApplicationInitStatus: pn,
  ApplicationModule: Ji,
  ApplicationRef: rt,
  Attribute: tf,
  COMPILER_OPTIONS: Db,
  CSP_NONCE: lS,
  CUSTOM_ELEMENTS_SCHEMA: Sv,
  get ChangeDetectionStrategy() {
    return dr;
  },
  ChangeDetectorRef: ui,
  Compiler: so,
  CompilerFactory: ZN,
  Component: ob,
  ComponentFactory: $a,
  ComponentFactoryResolver: Fs,
  ComponentRef: CI,
  ContentChild: E1,
  ContentChildren: C1,
  DEFAULT_CURRENCY_CODE: yp,
  DebugElement: Bs,
  DebugEventListener: uk,
  DebugNode: Ip,
  DefaultIterableDiffer: kb,
  DestroyRef: Br,
  Directive: at,
  ENVIRONMENT_INITIALIZER: lr,
  ElementRef: rn,
  EmbeddedViewRef: ak,
  EnvironmentInjector: Pt,
  ErrorHandler: Mn,
  EventEmitter: Ot,
  Host: ds,
  HostAttributeToken: R_,
  HostBinding: DN,
  HostListener: vN,
  INJECTOR: Od,
  Inject: ft,
  get InjectFlags() {
    return z;
  },
  Injectable: fe,
  InjectionToken: j,
  Injector: Re,
  Input: W,
  IterableDiffers: At,
  KeyValueDiffers: lt,
  LOCALE_ID: Ue,
  get MissingTranslationStrategy() {
    return fd;
  },
  ModuleWithComponentFactories: yb,
  NO_ERRORS_SCHEMA: Tv,
  NgModule: dp,
  NgModuleFactory: dC,
  NgModuleRef: Jn,
  NgProbeToken: qN,
  NgZone: le,
  Optional: Yt,
  Output: yN,
  OutputEmitterRef: rf,
  PACKAGE_ROOT_URL: uS,
  PLATFORM_ID: Cs,
  PLATFORM_INITIALIZER: tv,
  Pipe: ut,
  PlatformRef: kn,
  Query: Ns,
  QueryList: Su,
  Renderer2: Qo,
  RendererFactory2: EI,
  get RendererStyleFlags2() {
    return Co;
  },
  Sanitizer: Yu,
  get SecurityContext() {
    return Kn;
  },
  Self: gy,
  SimpleChange: zy,
  SkipSelf: mu,
  TRANSLATIONS: JN,
  TRANSLATIONS_FORMAT: XN,
  TemplateRef: Qe,
  Testability: io,
  TestabilityRegistry: Nn,
  TransferState: Hr,
  Type: xy,
  VERSION: IN,
  Version: fp,
  ViewChild: w1,
  ViewChildren: b1,
  ViewContainerRef: Oe,
  get ViewEncapsulation() {
    return mn;
  },
  ViewRef: Fb,
  afterNextRender: wI,
  afterRender: Ql,
  asNativeElements: ck,
  assertInInjectionContext: Ze,
  assertNotInReactiveContext: $f,
  assertPlatform: Sb,
  booleanAttribute: xn,
  computed: Yk,
  contentChild: YI,
  contentChildren: KI,
  createComponent: eR,
  createEnvironmentInjector: rh,
  createNgModule: nh,
  createNgModuleRef: V1,
  createPlatform: wb,
  createPlatformFactory: Mb,
  defineInjectable: Qw,
  destroyPlatform: ek,
  effect: gd,
  enableProdMode: rk,
  forwardRef: du,
  getDebugNode: Ao,
  getModuleFactory: ok,
  getNgModuleById: ik,
  getPlatform: mc,
  importProvidersFrom: Ty,
  inject: w,
  input: of,
  isDevMode: nk,
  isSignal: Yf,
  isStandalone: On,
  makeEnvironmentProviders: hs,
  makeStateKey: dS,
  mergeApplicationConfig: nR,
  model: Xf,
  numberAttribute: Xi,
  output: kD,
  platformCore: bk,
  provideZoneChangeDetection: Eb,
  reflectComponentType: tR,
  resolveForwardRef: R,
  runInInjectionContext: Ld,
  setTestabilityGetter: ub,
  signal: VI,
  untracked: pd,
  viewChild: Jf,
  viewChildren: ZI,
  ɵALLOW_MULTIPLE_PLATFORMS: vp,
  ɵAfterRenderEventManager: Dn,
  ɵCONTAINER_HEADER_OFFSET: ge,
  ɵChangeDetectionScheduler: Zu,
  ɵComponentFactory: $a,
  ɵConsole: Zt,
  ɵDEFAULT_LOCALE_ID: Mr,
  ɵDEFER_BLOCK_CONFIG: SC,
  ɵDEFER_BLOCK_DEPENDENCY_INTERCEPTOR: _C,
  get ɵDeferBlockBehavior() {
    return za;
  },
  get ɵDeferBlockState() {
    return pe;
  },
  ɵEffectScheduler: yc,
  ɵIMAGE_CONFIG: cf,
  ɵIMAGE_CONFIG_DEFAULTS: uf,
  ɵINJECTOR_SCOPE: Pd,
  ɵINPUT_SIGNAL_BRAND_WRITE_TYPE: Hw,
  ɵIS_HYDRATION_DOM_REUSE_ENABLED: fi,
  ɵLContext: jD,
  ɵLifecycleHooksFeature: AI,
  get ɵLocaleDataIndex() {
    return oe;
  },
  ɵNG_COMP_DEF: Po,
  ɵNG_DIR_DEF: pu,
  ɵNG_ELEMENT_ID: eo,
  ɵNG_INJ_DEF: Ea,
  ɵNG_MOD_DEF: _d,
  ɵNG_PIPE_DEF: gu,
  ɵNG_PROV_DEF: ki,
  ɵNOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR: ma,
  ɵNO_CHANGE: O,
  ɵNgModuleFactory: Xu,
  ɵNoopNgZone: Hf,
  ɵPendingTasks: Rt,
  ɵReflectionCapabilities: Py,
  ɵRender3ComponentFactory: Zo,
  ɵRender3ComponentRef: TI,
  ɵRender3NgModuleRef: Ju,
  ɵRuntimeError: v,
  ɵSSR_CONTENT_INTEGRITY_MARKER: nv,
  ɵTESTABILITY: ab,
  ɵTESTABILITY_GETTER: hp,
  ɵUSE_RUNTIME_DEPS_TRACKER_FOR_JIT: ZA,
  ɵViewRef: bo,
  ɵXSS_SECURITY_URL: Lr,
  ɵ_sanitizeHtml: vv,
  ɵ_sanitizeUrl: Ou,
  ɵallowSanitizationBypassAndThrow: Wo,
  ɵannotateForHydration: Vk,
  ɵbypassSanitizationTrustHtml: TS,
  ɵbypassSanitizationTrustResourceUrl: NS,
  ɵbypassSanitizationTrustScript: OS,
  ɵbypassSanitizationTrustStyle: AS,
  ɵbypassSanitizationTrustUrl: FS,
  ɵclearResolutionOfComponentResourcesQueue: nC,
  ɵcompileComponent: Q0,
  ɵcompileDirective: lp,
  ɵcompileNgModule: z0,
  ɵcompileNgModuleDefs: G0,
  ɵcompileNgModuleFactory: vb,
  ɵcompilePipe: rb,
  ɵconvertToBitFlags: cs,
  ɵcreateInjector: Sl,
  ɵdefaultIterableDiffers: Ck,
  ɵdefaultKeyValueDiffers: Ek,
  ɵdepsTracker: Cr,
  ɵdetectChangesInViewIfRequired: mb,
  ɵdevModeEqual: ih,
  ɵfindLocaleData: Ve,
  ɵflushModuleScopingQueueAsMuchAsPossible: V0,
  ɵformatRuntimeError: me,
  ɵgenerateStandaloneInDeclarationsError: W0,
  ɵgetAsyncClassMetadataFn: z1,
  ɵgetDebugNode: Ao,
  ɵgetDeferBlocks: hd,
  ɵgetDirectives: KD,
  ɵgetEnsureDirtyViewsAreAlwaysReachable: Jy,
  ɵgetHostElement: JD,
  ɵgetInjectableDef: as,
  ɵgetLContext: nt,
  ɵgetLocaleCurrencyCode: qO,
  ɵgetLocalePluralCase: Mh,
  ɵgetOutputDestroyRef: j_,
  ɵgetSanitizationBypassType: fv,
  ɵgetUnknownElementStrictMode: aT,
  ɵgetUnknownPropertyStrictMode: cT,
  ɵglobal: he,
  ɵinjectChangeDetectorRef: Ob,
  ɵinternalAfterNextRender: Ba,
  ɵinternalCreateApplication: Tk,
  ɵisBoundToModule: fb,
  ɵisComponentDefPendingResolution: _1,
  ɵisEnvironmentProviders: us,
  ɵisInjectable: Zw,
  ɵisNgModule: ir,
  ɵisPromise: gc,
  ɵisSubscribable: gp,
  ɵnoSideEffects: en,
  ɵpatchComponentDefWithScope: up,
  ɵperformanceMarkFeature: _t,
  ɵprovideZonelessChangeDetection: Ak,
  ɵqueueStateUpdate: Hb,
  ɵreadHydrationInfo: sv,
  ɵregisterLocaleData: WO,
  ɵrenderDeferBlockState: fn,
  ɵresetCompiledComponents: aN,
  ɵresetJitOptions: oN,
  ɵresolveComponentResources: eC,
  ɵrestoreComponentResolutionQueue: S1,
  ɵsetAllowDuplicateNgModuleIdsForTest: N1,
  ɵsetAlternateWeakRefImpl: wk,
  ɵsetClassDebugInfo: H0,
  ɵsetClassMetadata: Je,
  ɵsetClassMetadataAsync: G1,
  ɵsetCurrentInjector: ln,
  ɵsetDocument: sS,
  ɵsetEnsureDirtyViewsAreAlwaysReachable: ZM,
  ɵsetInjectorProfilerContext: Ge,
  ɵsetLocaleId: _h,
  ɵsetUnknownElementStrictMode: sT,
  ɵsetUnknownPropertyStrictMode: uT,
  ɵstore: XE,
  ɵstringify: Q,
  ɵtransitiveScopesFor: cp,
  ɵtriggerResourceLoading: rc,
  ɵtruncateMiddle: zw,
  ɵunregisterLocaleData: QO,
  ɵunwrapSafeValue: on,
  ɵunwrapWritableSignal: m1,
  ɵwhenStable: gb,
  ɵwithDomHydration: Rk,
  ɵwithI18nHydration: xk,
  ɵɵCopyDefinitionFeature: aC,
  get ɵɵFactoryTarget() {
    return P;
  },
  ɵɵHostDirectivesFeature: uC,
  ɵɵInheritDefinitionFeature: th,
  get ɵɵInputFlags() {
    return yn;
  },
  ɵɵInputTransformsFeature: lC,
  ɵɵNgOnChangesFeature: Ud,
  ɵɵProvidersFeature: p0,
  ɵɵStandaloneFeature: g0,
  ɵɵadvance: Zv,
  ɵɵattribute: uh,
  ɵɵattributeInterpolate1: ch,
  ɵɵattributeInterpolate2: lh,
  ɵɵattributeInterpolate3: dh,
  ɵɵattributeInterpolate4: fh,
  ɵɵattributeInterpolate5: hh,
  ɵɵattributeInterpolate6: ph,
  ɵɵattributeInterpolate7: gh,
  ɵɵattributeInterpolate8: mh,
  ɵɵattributeInterpolateV: yh,
  ɵɵclassMap: JC,
  ɵɵclassMapInterpolate1: oE,
  ɵɵclassMapInterpolate2: iE,
  ɵɵclassMapInterpolate3: sE,
  ɵɵclassMapInterpolate4: aE,
  ɵɵclassMapInterpolate5: uE,
  ɵɵclassMapInterpolate6: cE,
  ɵɵclassMapInterpolate7: lE,
  ɵɵclassMapInterpolate8: dE,
  ɵɵclassMapInterpolateV: fE,
  ɵɵclassProp: Ih,
  ɵɵcomponentInstance: hE,
  ɵɵconditional: pE,
  ɵɵcontentQuery: WE,
  ɵɵcontentQuerySignal: YE,
  ɵɵdefer: AC,
  ɵɵdeferEnableTimerScheduling: TC,
  ɵɵdeferOnHover: jC,
  ɵɵdeferOnIdle: NC,
  ɵɵdeferOnImmediate: RC,
  ɵɵdeferOnInteraction: BC,
  ɵɵdeferOnTimer: PC,
  ɵɵdeferOnViewport: VC,
  ɵɵdeferPrefetchOnHover: $C,
  ɵɵdeferPrefetchOnIdle: kC,
  ɵɵdeferPrefetchOnImmediate: xC,
  ɵɵdeferPrefetchOnInteraction: HC,
  ɵɵdeferPrefetchOnTimer: LC,
  ɵɵdeferPrefetchOnViewport: UC,
  ɵɵdeferPrefetchWhen: FC,
  ɵɵdeferWhen: OC,
  ɵɵdefineComponent: by,
  ɵɵdefineDirective: wy,
  ɵɵdefineInjectable: te,
  ɵɵdefineInjector: hu,
  ɵɵdefineNgModule: kd,
  ɵɵdefinePipe: My,
  ɵɵdirectiveInject: Ur,
  ɵɵdisableBindings: oD,
  ɵɵelement: Ch,
  ɵɵelementContainer: Eh,
  ɵɵelementContainerEnd: ac,
  ɵɵelementContainerStart: sc,
  ɵɵelementEnd: ic,
  ɵɵelementStart: oc,
  ɵɵenableBindings: rD,
  ɵɵgetComponentDepsFactory: B0,
  ɵɵgetCurrentView: CE,
  ɵɵgetInheritedFactory: TD,
  ɵɵhostProperty: bh,
  ɵɵi18n: $E,
  ɵɵi18nApply: HE,
  ɵɵi18nAttributes: BE,
  ɵɵi18nEnd: Th,
  ɵɵi18nExp: Ah,
  ɵɵi18nPostprocess: VE,
  ɵɵi18nStart: Sh,
  ɵɵinject: Ne,
  ɵɵinjectAttribute: Mu,
  ɵɵinvalidFactory: Kv,
  ɵɵinvalidFactoryDep: Ad,
  ɵɵlistener: Oh,
  ɵɵloadQuery: ZE,
  ɵɵnamespaceHTML: yD,
  ɵɵnamespaceMathML: mD,
  ɵɵnamespaceSVG: gD,
  ɵɵnextContext: UE,
  ɵɵngDeclareClassMetadata: B,
  ɵɵngDeclareComponent: Qk,
  ɵɵngDeclareDirective: vt,
  ɵɵngDeclareFactory: H,
  ɵɵngDeclareInjectable: It,
  ɵɵngDeclareInjector: Vb,
  ɵɵngDeclareNgModule: Ub,
  ɵɵngDeclarePipe: ct,
  ɵɵpipe: k0,
  ɵɵpipeBind1: R0,
  ɵɵpipeBind2: x0,
  ɵɵpipeBind3: P0,
  ɵɵpipeBind4: L0,
  ɵɵpipeBindV: j0,
  ɵɵprojection: GE,
  ɵɵprojectionDef: zE,
  ɵɵproperty: Dh,
  ɵɵpropertyInterpolate: kh,
  ɵɵpropertyInterpolate1: fc,
  ɵɵpropertyInterpolate2: Rh,
  ɵɵpropertyInterpolate3: xh,
  ɵɵpropertyInterpolate4: Ph,
  ɵɵpropertyInterpolate5: Lh,
  ɵɵpropertyInterpolate6: jh,
  ɵɵpropertyInterpolate7: $h,
  ɵɵpropertyInterpolate8: Bh,
  ɵɵpropertyInterpolateV: Hh,
  ɵɵpureFunction0: D0,
  ɵɵpureFunction1: v0,
  ɵɵpureFunction2: I0,
  ɵɵpureFunction3: C0,
  ɵɵpureFunction4: E0,
  ɵɵpureFunction5: b0,
  ɵɵpureFunction6: w0,
  ɵɵpureFunction7: M0,
  ɵɵpureFunction8: _0,
  ɵɵpureFunctionV: S0,
  ɵɵqueryAdvance: JE,
  ɵɵqueryRefresh: QE,
  ɵɵreference: e0,
  ɵɵregisterNgModuleType: eh,
  ɵɵrepeater: DE,
  ɵɵrepeaterCreate: yE,
  ɵɵrepeaterTrackByIdentity: mE,
  ɵɵrepeaterTrackByIndex: gE,
  ɵɵresetView: sD,
  ɵɵresolveBody: bf,
  ɵɵresolveDocument: Fv,
  ɵɵresolveWindow: Ov,
  ɵɵrestoreView: iD,
  ɵɵsanitizeHtml: Iv,
  ɵɵsanitizeResourceUrl: vf,
  ɵɵsanitizeScript: Ev,
  ɵɵsanitizeStyle: Cv,
  ɵɵsanitizeUrl: Df,
  ɵɵsanitizeUrlOrResourceUrl: Mv,
  ɵɵsetComponentScope: m0,
  ɵɵsetNgModuleScope: y0,
  ɵɵstyleMap: Bt,
  ɵɵstyleMapInterpolate1: t0,
  ɵɵstyleMapInterpolate2: n0,
  ɵɵstyleMapInterpolate3: r0,
  ɵɵstyleMapInterpolate4: o0,
  ɵɵstyleMapInterpolate5: i0,
  ɵɵstyleMapInterpolate6: s0,
  ɵɵstyleMapInterpolate7: a0,
  ɵɵstyleMapInterpolate8: u0,
  ɵɵstyleMapInterpolateV: c0,
  ɵɵstyleProp: vh,
  ɵɵstylePropInterpolate1: Vh,
  ɵɵstylePropInterpolate2: Uh,
  ɵɵstylePropInterpolate3: zh,
  ɵɵstylePropInterpolate4: Gh,
  ɵɵstylePropInterpolate5: Wh,
  ɵɵstylePropInterpolate6: qh,
  ɵɵstylePropInterpolate7: Qh,
  ɵɵstylePropInterpolate8: Zh,
  ɵɵstylePropInterpolateV: Yh,
  ɵɵsyntheticHostListener: Fh,
  ɵɵsyntheticHostProperty: wh,
  ɵɵtemplate: _o,
  ɵɵtemplateRefExtractor: $0,
  ɵɵtext: l0,
  ɵɵtextInterpolate: Kh,
  ɵɵtextInterpolate1: hc,
  ɵɵtextInterpolate2: Jh,
  ɵɵtextInterpolate3: Xh,
  ɵɵtextInterpolate4: ep,
  ɵɵtextInterpolate5: tp,
  ɵɵtextInterpolate6: np,
  ɵɵtextInterpolate7: rp,
  ɵɵtextInterpolate8: op,
  ɵɵtextInterpolateV: ip,
  ɵɵtrustConstantHtml: bv,
  ɵɵtrustConstantResourceUrl: wv,
  ɵɵtwoWayBindingSet: f0,
  ɵɵtwoWayListener: ap,
  ɵɵtwoWayProperty: sp,
  ɵɵvalidateIframeAttribute: iC,
  ɵɵviewQuery: qE,
  ɵɵviewQuerySignal: KE
}, Symbol.toStringTag, { value: "Module" }));
/**
 * @license Angular v17.3.12
 * (c) 2010-2024 Google LLC. https://angular.io/
 * License: MIT
 */
let rR = null;
function qc() {
  return rR;
}
class tu {
  static {
    this.ɵfac = H({ minVersion: "12.0.0", version: "17.3.12", ngImport: b, type: tu, deps: [], target: P.Injectable });
  }
  static {
    this.ɵprov = It({ minVersion: "12.0.0", version: "17.3.12", ngImport: b, type: tu, providedIn: "platform", useFactory: () => window.navigation });
  }
}
B({ type: tu, decorators: [{
  type: fe,
  args: [{ providedIn: "platform", useFactory: () => window.navigation }]
}] });
const ci = new j(ngDevMode ? "DocumentToken" : "");
class vn {
  historyGo(t) {
    throw new Error(ngDevMode ? "Not implemented" : "");
  }
  static {
    this.ɵfac = H({ minVersion: "12.0.0", version: "17.3.12", ngImport: b, type: vn, deps: [], target: P.Injectable });
  }
  static {
    this.ɵprov = It({ minVersion: "12.0.0", version: "17.3.12", ngImport: b, type: vn, providedIn: "platform", useFactory: () => w(Pn) });
  }
}
B({ type: vn, decorators: [{
  type: fe,
  args: [{ providedIn: "platform", useFactory: () => w(Pn) }]
}] });
new j(ngDevMode ? "Location Initialized" : "");
class Pn extends vn {
  constructor() {
    super(), this._doc = w(ci), this._location = window.location, this._history = window.history;
  }
  getBaseHrefFromDOM() {
    return qc().getBaseHref(this._doc);
  }
  onPopState(t) {
    const n = qc().getGlobalEventTarget(this._doc, "window");
    return n.addEventListener("popstate", t, !1), () => n.removeEventListener("popstate", t);
  }
  onHashChange(t) {
    const n = qc().getGlobalEventTarget(this._doc, "window");
    return n.addEventListener("hashchange", t, !1), () => n.removeEventListener("hashchange", t);
  }
  get href() {
    return this._location.href;
  }
  get protocol() {
    return this._location.protocol;
  }
  get hostname() {
    return this._location.hostname;
  }
  get port() {
    return this._location.port;
  }
  get pathname() {
    return this._location.pathname;
  }
  get search() {
    return this._location.search;
  }
  get hash() {
    return this._location.hash;
  }
  set pathname(t) {
    this._location.pathname = t;
  }
  pushState(t, n, r) {
    this._history.pushState(t, n, r);
  }
  replaceState(t, n, r) {
    this._history.replaceState(t, n, r);
  }
  forward() {
    this._history.forward();
  }
  back() {
    this._history.back();
  }
  historyGo(t = 0) {
    this._history.go(t);
  }
  getState() {
    return this._history.state;
  }
  static {
    this.ɵfac = H({ minVersion: "12.0.0", version: "17.3.12", ngImport: b, type: Pn, deps: [], target: P.Injectable });
  }
  static {
    this.ɵprov = It({ minVersion: "12.0.0", version: "17.3.12", ngImport: b, type: Pn, providedIn: "platform", useFactory: () => new Pn() });
  }
}
B({ type: Pn, decorators: [{
  type: fe,
  args: [{
    providedIn: "platform",
    useFactory: () => new Pn()
  }]
}], ctorParameters: () => [] });
function Ep(e, t) {
  if (e.length == 0)
    return t;
  if (t.length == 0)
    return e;
  let n = 0;
  return e.endsWith("/") && n++, t.startsWith("/") && n++, n == 2 ? e + t.substring(1) : n == 1 ? e + t : e + "/" + t;
}
function Im(e) {
  const t = e.match(/#|\?|$/), n = t && t.index || e.length, r = n - (e[n - 1] === "/" ? 1 : 0);
  return e.slice(0, r) + e.slice(n);
}
function hn(e) {
  return e && e[0] !== "?" ? "?" + e : e;
}
class In {
  historyGo(t) {
    throw new Error(ngDevMode ? "Not implemented" : "");
  }
  static {
    this.ɵfac = H({ minVersion: "12.0.0", version: "17.3.12", ngImport: b, type: In, deps: [], target: P.Injectable });
  }
  static {
    this.ɵprov = It({ minVersion: "12.0.0", version: "17.3.12", ngImport: b, type: In, providedIn: "root", useFactory: () => w(Oo) });
  }
}
B({ type: In, decorators: [{
  type: fe,
  args: [{ providedIn: "root", useFactory: () => w(Oo) }]
}] });
const Dc = new j(ngDevMode ? "appBaseHref" : "");
class Oo extends In {
  constructor(t, n) {
    super(), this._platformLocation = t, this._removeListenerFns = [], this._baseHref = n ?? this._platformLocation.getBaseHrefFromDOM() ?? w(ci).location?.origin ?? "";
  }
  /** @nodoc */
  ngOnDestroy() {
    for (; this._removeListenerFns.length; )
      this._removeListenerFns.pop()();
  }
  onPopState(t) {
    this._removeListenerFns.push(this._platformLocation.onPopState(t), this._platformLocation.onHashChange(t));
  }
  getBaseHref() {
    return this._baseHref;
  }
  prepareExternalUrl(t) {
    return Ep(this._baseHref, t);
  }
  path(t = !1) {
    const n = this._platformLocation.pathname + hn(this._platformLocation.search), r = this._platformLocation.hash;
    return r && t ? `${n}${r}` : n;
  }
  pushState(t, n, r, o) {
    const i = this.prepareExternalUrl(r + hn(o));
    this._platformLocation.pushState(t, n, i);
  }
  replaceState(t, n, r, o) {
    const i = this.prepareExternalUrl(r + hn(o));
    this._platformLocation.replaceState(t, n, i);
  }
  forward() {
    this._platformLocation.forward();
  }
  back() {
    this._platformLocation.back();
  }
  getState() {
    return this._platformLocation.getState();
  }
  historyGo(t = 0) {
    this._platformLocation.historyGo?.(t);
  }
  static {
    this.ɵfac = H({ minVersion: "12.0.0", version: "17.3.12", ngImport: b, type: Oo, deps: [{ token: vn }, { token: Dc, optional: !0 }], target: P.Injectable });
  }
  static {
    this.ɵprov = It({ minVersion: "12.0.0", version: "17.3.12", ngImport: b, type: Oo, providedIn: "root" });
  }
}
B({ type: Oo, decorators: [{
  type: fe,
  args: [{ providedIn: "root" }]
}], ctorParameters: () => [{ type: vn }, { type: void 0, decorators: [{
  type: Yt
}, {
  type: ft,
  args: [Dc]
}] }] });
class nu extends In {
  constructor(t, n) {
    super(), this._platformLocation = t, this._baseHref = "", this._removeListenerFns = [], n != null && (this._baseHref = n);
  }
  /** @nodoc */
  ngOnDestroy() {
    for (; this._removeListenerFns.length; )
      this._removeListenerFns.pop()();
  }
  onPopState(t) {
    this._removeListenerFns.push(this._platformLocation.onPopState(t), this._platformLocation.onHashChange(t));
  }
  getBaseHref() {
    return this._baseHref;
  }
  path(t = !1) {
    const n = this._platformLocation.hash ?? "#";
    return n.length > 0 ? n.substring(1) : n;
  }
  prepareExternalUrl(t) {
    const n = Ep(this._baseHref, t);
    return n.length > 0 ? "#" + n : n;
  }
  pushState(t, n, r, o) {
    let i = this.prepareExternalUrl(r + hn(o));
    i.length == 0 && (i = this._platformLocation.pathname), this._platformLocation.pushState(t, n, i);
  }
  replaceState(t, n, r, o) {
    let i = this.prepareExternalUrl(r + hn(o));
    i.length == 0 && (i = this._platformLocation.pathname), this._platformLocation.replaceState(t, n, i);
  }
  forward() {
    this._platformLocation.forward();
  }
  back() {
    this._platformLocation.back();
  }
  getState() {
    return this._platformLocation.getState();
  }
  historyGo(t = 0) {
    this._platformLocation.historyGo?.(t);
  }
  static {
    this.ɵfac = H({ minVersion: "12.0.0", version: "17.3.12", ngImport: b, type: nu, deps: [{ token: vn }, { token: Dc, optional: !0 }], target: P.Injectable });
  }
  static {
    this.ɵprov = It({ minVersion: "12.0.0", version: "17.3.12", ngImport: b, type: nu });
  }
}
B({ type: nu, decorators: [{
  type: fe
}], ctorParameters: () => [{ type: vn }, { type: void 0, decorators: [{
  type: Yt
}, {
  type: ft,
  args: [Dc]
}] }] });
class fo {
  constructor(t) {
    this._subject = new Ot(), this._urlChangeListeners = [], this._urlChangeSubscription = null, this._locationStrategy = t;
    const n = this._locationStrategy.getBaseHref();
    this._basePath = iR(Im(Cm(n))), this._locationStrategy.onPopState((r) => {
      this._subject.emit({
        url: this.path(!0),
        pop: !0,
        state: r.state,
        type: r.type
      });
    });
  }
  /** @nodoc */
  ngOnDestroy() {
    this._urlChangeSubscription?.unsubscribe(), this._urlChangeListeners = [];
  }
  /**
   * Normalizes the URL path for this location.
   *
   * @param includeHash True to include an anchor fragment in the path.
   *
   * @returns The normalized URL path.
   */
  // TODO: vsavkin. Remove the boolean flag and always include hash once the deprecated router is
  // removed.
  path(t = !1) {
    return this.normalize(this._locationStrategy.path(t));
  }
  /**
   * Reports the current state of the location history.
   * @returns The current value of the `history.state` object.
   */
  getState() {
    return this._locationStrategy.getState();
  }
  /**
   * Normalizes the given path and compares to the current normalized path.
   *
   * @param path The given URL path.
   * @param query Query parameters.
   *
   * @returns True if the given URL path is equal to the current normalized path, false
   * otherwise.
   */
  isCurrentPathEqualTo(t, n = "") {
    return this.path() == this.normalize(t + hn(n));
  }
  /**
   * Normalizes a URL path by stripping any trailing slashes.
   *
   * @param url String representing a URL.
   *
   * @returns The normalized URL string.
   */
  normalize(t) {
    return fo.stripTrailingSlash(oR(this._basePath, Cm(t)));
  }
  /**
   * Normalizes an external URL path.
   * If the given URL doesn't begin with a leading slash (`'/'`), adds one
   * before normalizing. Adds a hash if `HashLocationStrategy` is
   * in use, or the `APP_BASE_HREF` if the `PathLocationStrategy` is in use.
   *
   * @param url String representing a URL.
   *
   * @returns  A normalized platform-specific URL.
   */
  prepareExternalUrl(t) {
    return t && t[0] !== "/" && (t = "/" + t), this._locationStrategy.prepareExternalUrl(t);
  }
  // TODO: rename this method to pushState
  /**
   * Changes the browser's URL to a normalized version of a given URL, and pushes a
   * new item onto the platform's history.
   *
   * @param path  URL path to normalize.
   * @param query Query parameters.
   * @param state Location history state.
   *
   */
  go(t, n = "", r = null) {
    this._locationStrategy.pushState(r, "", t, n), this._notifyUrlChangeListeners(this.prepareExternalUrl(t + hn(n)), r);
  }
  /**
   * Changes the browser's URL to a normalized version of the given URL, and replaces
   * the top item on the platform's history stack.
   *
   * @param path  URL path to normalize.
   * @param query Query parameters.
   * @param state Location history state.
   */
  replaceState(t, n = "", r = null) {
    this._locationStrategy.replaceState(r, "", t, n), this._notifyUrlChangeListeners(this.prepareExternalUrl(t + hn(n)), r);
  }
  /**
   * Navigates forward in the platform's history.
   */
  forward() {
    this._locationStrategy.forward();
  }
  /**
   * Navigates back in the platform's history.
   */
  back() {
    this._locationStrategy.back();
  }
  /**
   * Navigate to a specific page from session history, identified by its relative position to the
   * current page.
   *
   * @param relativePosition  Position of the target page in the history relative to the current
   *     page.
   * A negative value moves backwards, a positive value moves forwards, e.g. `location.historyGo(2)`
   * moves forward two pages and `location.historyGo(-2)` moves back two pages. When we try to go
   * beyond what's stored in the history session, we stay in the current page. Same behaviour occurs
   * when `relativePosition` equals 0.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/History_API#Moving_to_a_specific_point_in_history
   */
  historyGo(t = 0) {
    this._locationStrategy.historyGo?.(t);
  }
  /**
   * Registers a URL change listener. Use to catch updates performed by the Angular
   * framework that are not detectible through "popstate" or "hashchange" events.
   *
   * @param fn The change handler function, which take a URL and a location history state.
   * @returns A function that, when executed, unregisters a URL change listener.
   */
  onUrlChange(t) {
    return this._urlChangeListeners.push(t), this._urlChangeSubscription ??= this.subscribe((n) => {
      this._notifyUrlChangeListeners(n.url, n.state);
    }), () => {
      const n = this._urlChangeListeners.indexOf(t);
      this._urlChangeListeners.splice(n, 1), this._urlChangeListeners.length === 0 && (this._urlChangeSubscription?.unsubscribe(), this._urlChangeSubscription = null);
    };
  }
  /** @internal */
  _notifyUrlChangeListeners(t = "", n) {
    this._urlChangeListeners.forEach((r) => r(t, n));
  }
  /**
   * Subscribes to the platform's `popState` events.
   *
   * Note: `Location.go()` does not trigger the `popState` event in the browser. Use
   * `Location.onUrlChange()` to subscribe to URL changes instead.
   *
   * @param value Event that is triggered when the state history changes.
   * @param exception The exception to throw.
   *
   * @see [onpopstate](https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onpopstate)
   *
   * @returns Subscribed events.
   */
  subscribe(t, n, r) {
    return this._subject.subscribe({ next: t, error: n, complete: r });
  }
  static {
    this.normalizeQueryParams = hn;
  }
  static {
    this.joinWithSlash = Ep;
  }
  static {
    this.stripTrailingSlash = Im;
  }
  static {
    this.ɵfac = H({ minVersion: "12.0.0", version: "17.3.12", ngImport: b, type: fo, deps: [{ token: In }], target: P.Injectable });
  }
  static {
    this.ɵprov = It({ minVersion: "12.0.0", version: "17.3.12", ngImport: b, type: fo, providedIn: "root", useFactory: zb });
  }
}
B({ type: fo, decorators: [{
  type: fe,
  args: [{
    providedIn: "root",
    // See #23917
    useFactory: zb
  }]
}], ctorParameters: () => [{ type: In }] });
function zb() {
  return new fo(Ne(In));
}
function oR(e, t) {
  if (!e || !t.startsWith(e))
    return t;
  const n = t.substring(e.length);
  return n === "" || ["/", ";", "?", "#"].includes(n[0]) ? n : t;
}
function Cm(e) {
  return e.replace(/\/index.html$/, "");
}
function iR(e) {
  if (new RegExp("^(https?:)?//").test(e)) {
    const [, n] = e.split(/\/\/[^\/]+/);
    return n;
  }
  return e;
}
const Gb = { ADP: [void 0, void 0, 0], AFN: [void 0, "؋", 0], ALL: [void 0, void 0, 0], AMD: [void 0, "֏", 2], AOA: [void 0, "Kz"], ARS: [void 0, "$"], AUD: ["A$", "$"], AZN: [void 0, "₼"], BAM: [void 0, "KM"], BBD: [void 0, "$"], BDT: [void 0, "৳"], BHD: [void 0, void 0, 3], BIF: [void 0, void 0, 0], BMD: [void 0, "$"], BND: [void 0, "$"], BOB: [void 0, "Bs"], BRL: ["R$"], BSD: [void 0, "$"], BWP: [void 0, "P"], BYN: [void 0, void 0, 2], BYR: [void 0, void 0, 0], BZD: [void 0, "$"], CAD: ["CA$", "$", 2], CHF: [void 0, void 0, 2], CLF: [void 0, void 0, 4], CLP: [void 0, "$", 0], CNY: ["CN¥", "¥"], COP: [void 0, "$", 2], CRC: [void 0, "₡", 2], CUC: [void 0, "$"], CUP: [void 0, "$"], CZK: [void 0, "Kč", 2], DJF: [void 0, void 0, 0], DKK: [void 0, "kr", 2], DOP: [void 0, "$"], EGP: [void 0, "E£"], ESP: [void 0, "₧", 0], EUR: ["€"], FJD: [void 0, "$"], FKP: [void 0, "£"], GBP: ["£"], GEL: [void 0, "₾"], GHS: [void 0, "GH₵"], GIP: [void 0, "£"], GNF: [void 0, "FG", 0], GTQ: [void 0, "Q"], GYD: [void 0, "$", 2], HKD: ["HK$", "$"], HNL: [void 0, "L"], HRK: [void 0, "kn"], HUF: [void 0, "Ft", 2], IDR: [void 0, "Rp", 2], ILS: ["₪"], INR: ["₹"], IQD: [void 0, void 0, 0], IRR: [void 0, void 0, 0], ISK: [void 0, "kr", 0], ITL: [void 0, void 0, 0], JMD: [void 0, "$"], JOD: [void 0, void 0, 3], JPY: ["¥", void 0, 0], KHR: [void 0, "៛"], KMF: [void 0, "CF", 0], KPW: [void 0, "₩", 0], KRW: ["₩", void 0, 0], KWD: [void 0, void 0, 3], KYD: [void 0, "$"], KZT: [void 0, "₸"], LAK: [void 0, "₭", 0], LBP: [void 0, "L£", 0], LKR: [void 0, "Rs"], LRD: [void 0, "$"], LTL: [void 0, "Lt"], LUF: [void 0, void 0, 0], LVL: [void 0, "Ls"], LYD: [void 0, void 0, 3], MGA: [void 0, "Ar", 0], MGF: [void 0, void 0, 0], MMK: [void 0, "K", 0], MNT: [void 0, "₮", 2], MRO: [void 0, void 0, 0], MUR: [void 0, "Rs", 2], MXN: ["MX$", "$"], MYR: [void 0, "RM"], NAD: [void 0, "$"], NGN: [void 0, "₦"], NIO: [void 0, "C$"], NOK: [void 0, "kr", 2], NPR: [void 0, "Rs"], NZD: ["NZ$", "$"], OMR: [void 0, void 0, 3], PHP: ["₱"], PKR: [void 0, "Rs", 2], PLN: [void 0, "zł"], PYG: [void 0, "₲", 0], RON: [void 0, "lei"], RSD: [void 0, void 0, 0], RUB: [void 0, "₽"], RWF: [void 0, "RF", 0], SBD: [void 0, "$"], SEK: [void 0, "kr", 2], SGD: [void 0, "$"], SHP: [void 0, "£"], SLE: [void 0, void 0, 2], SLL: [void 0, void 0, 0], SOS: [void 0, void 0, 0], SRD: [void 0, "$"], SSP: [void 0, "£"], STD: [void 0, void 0, 0], STN: [void 0, "Db"], SYP: [void 0, "£", 0], THB: [void 0, "฿"], TMM: [void 0, void 0, 0], TND: [void 0, void 0, 3], TOP: [void 0, "T$"], TRL: [void 0, void 0, 0], TRY: [void 0, "₺"], TTD: [void 0, "$"], TWD: ["NT$", "$", 2], TZS: [void 0, void 0, 2], UAH: [void 0, "₴"], UGX: [void 0, void 0, 0], USD: ["$"], UYI: [void 0, void 0, 0], UYU: [void 0, "$"], UYW: [void 0, void 0, 4], UZS: [void 0, void 0, 2], VEF: [void 0, "Bs", 2], VND: ["₫", void 0, 0], VUV: [void 0, void 0, 0], XAF: ["FCFA", void 0, 0], XCD: ["EC$", "$"], XOF: ["F CFA", void 0, 0], XPF: ["CFPF", void 0, 0], XXX: ["¤"], YER: [void 0, void 0, 0], ZAR: [void 0, "R"], ZMK: [void 0, void 0, 0], ZMW: [void 0, "ZK"], ZWD: [void 0, void 0, 0] };
var es;
(function(e) {
  e[e.Decimal = 0] = "Decimal", e[e.Percent = 1] = "Percent", e[e.Currency = 2] = "Currency", e[e.Scientific = 3] = "Scientific";
})(es || (es = {}));
var ar;
(function(e) {
  e[e.Zero = 0] = "Zero", e[e.One = 1] = "One", e[e.Two = 2] = "Two", e[e.Few = 3] = "Few", e[e.Many = 4] = "Many", e[e.Other = 5] = "Other";
})(ar || (ar = {}));
var xe;
(function(e) {
  e[e.Format = 0] = "Format", e[e.Standalone = 1] = "Standalone";
})(xe || (xe = {}));
var ne;
(function(e) {
  e[e.Narrow = 0] = "Narrow", e[e.Abbreviated = 1] = "Abbreviated", e[e.Wide = 2] = "Wide", e[e.Short = 3] = "Short";
})(ne || (ne = {}));
var Xe;
(function(e) {
  e[e.Short = 0] = "Short", e[e.Medium = 1] = "Medium", e[e.Long = 2] = "Long", e[e.Full = 3] = "Full";
})(Xe || (Xe = {}));
const Me = {
  /**
   * Decimal separator.
   * For `en-US`, the dot character.
   * Example: 2,345`.`67
   */
  Decimal: 0,
  /**
   * Grouping separator, typically for thousands.
   * For `en-US`, the comma character.
   * Example: 2`,`345.67
   */
  Group: 1,
  /**
   * Sign for percentage (out of 100).
   * Example: 23.4%
   */
  PercentSign: 3,
  /**
   * Sign for negative numbers.
   * Example: -23
   */
  MinusSign: 5,
  /**
   * Computer notation for exponential value (n times a power of 10).
   * Example: 1.2E3
   */
  Exponential: 6,
  /**
   * Infinity, can be used with plus and minus.
   * Example: ∞, +∞, -∞
   */
  Infinity: 9,
  /**
   * Decimal separator for currency values (fallback to `Decimal`).
   * Example: $2,345.67
   */
  CurrencyDecimal: 12,
  /**
   * Group separator for currency values (fallback to `Group`).
   * Example: $2,345.67
   */
  CurrencyGroup: 13
};
var Em;
(function(e) {
  e[e.Sunday = 0] = "Sunday", e[e.Monday = 1] = "Monday", e[e.Tuesday = 2] = "Tuesday", e[e.Wednesday = 3] = "Wednesday", e[e.Thursday = 4] = "Thursday", e[e.Friday = 5] = "Friday", e[e.Saturday = 6] = "Saturday";
})(Em || (Em = {}));
function sR(e) {
  return Ve(e)[oe.LocaleId];
}
function aR(e, t, n) {
  const r = Ve(e), o = [
    r[oe.DayPeriodsFormat],
    r[oe.DayPeriodsStandalone]
  ], i = Mt(o, t);
  return Mt(i, n);
}
function uR(e, t, n) {
  const r = Ve(e), o = [
    r[oe.DaysFormat],
    r[oe.DaysStandalone]
  ], i = Mt(o, t);
  return Mt(i, n);
}
function cR(e, t, n) {
  const r = Ve(e), o = [
    r[oe.MonthsFormat],
    r[oe.MonthsStandalone]
  ], i = Mt(o, t);
  return Mt(i, n);
}
function lR(e, t) {
  const r = Ve(e)[oe.Eras];
  return Mt(r, t);
}
function Js(e, t) {
  const n = Ve(e);
  return Mt(n[oe.DateFormat], t);
}
function Xs(e, t) {
  const n = Ve(e);
  return Mt(n[oe.TimeFormat], t);
}
function ea(e, t) {
  const r = Ve(e)[oe.DateTimeFormat];
  return Mt(r, t);
}
function Ct(e, t) {
  const n = Ve(e), r = n[oe.NumberSymbols][t];
  if (typeof r > "u") {
    if (t === Me.CurrencyDecimal)
      return n[oe.NumberSymbols][Me.Decimal];
    if (t === Me.CurrencyGroup)
      return n[oe.NumberSymbols][Me.Group];
  }
  return r;
}
function bp(e, t) {
  return Ve(e)[oe.NumberFormats][t];
}
function dR(e) {
  return Ve(e)[oe.Currencies];
}
const fR = Mh;
function Wb(e) {
  if (!e[oe.ExtraData])
    throw new Error(`Missing extra locale data for the locale "${e[oe.LocaleId]}". Use "registerLocaleData" to load new data. See the "I18n guide" on angular.io to know more.`);
}
function hR(e) {
  const t = Ve(e);
  return Wb(t), (t[oe.ExtraData][
    2
    /* ɵExtraLocaleDataIndex.ExtraDayPeriodsRules */
  ] || []).map((r) => typeof r == "string" ? Qc(r) : [Qc(r[0]), Qc(r[1])]);
}
function pR(e, t, n) {
  const r = Ve(e);
  Wb(r);
  const o = [
    r[oe.ExtraData][
      0
      /* ɵExtraLocaleDataIndex.ExtraDayPeriodFormats */
    ],
    r[oe.ExtraData][
      1
      /* ɵExtraLocaleDataIndex.ExtraDayPeriodStandalone */
    ]
  ], i = Mt(o, t) || [];
  return Mt(i, n) || [];
}
function Mt(e, t) {
  for (let n = t; n > -1; n--)
    if (typeof e[n] < "u")
      return e[n];
  throw new Error("Locale data API: locale data undefined");
}
function Qc(e) {
  const [t, n] = e.split(":");
  return { hours: +t, minutes: +n };
}
function gR(e, t, n = "en") {
  const r = dR(n)[e] || Gb[e] || [], o = r[
    1
    /* ɵCurrencyIndex.SymbolNarrow */
  ];
  return t === "narrow" && typeof o == "string" ? o : r[
    0
    /* ɵCurrencyIndex.Symbol */
  ] || e;
}
const mR = 2;
function yR(e) {
  let t;
  const n = Gb[e];
  return n && (t = n[
    2
    /* ɵCurrencyIndex.NbOfDigits */
  ]), typeof t == "number" ? t : mR;
}
const DR = /^(\d{4,})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/, ta = {}, vR = /((?:[^BEGHLMOSWYZabcdhmswyz']+)|(?:'(?:[^']|'')*')|(?:G{1,5}|y{1,4}|Y{1,4}|M{1,5}|L{1,5}|w{1,2}|W{1}|d{1,2}|E{1,6}|c{1,6}|a{1,5}|b{1,5}|B{1,5}|h{1,2}|H{1,2}|m{1,2}|s{1,2}|S{1,3}|z{1,4}|Z{1,5}|O{1,4}))([\s\S]*)/;
var qt;
(function(e) {
  e[e.Short = 0] = "Short", e[e.ShortGMT = 1] = "ShortGMT", e[e.Long = 2] = "Long", e[e.Extended = 3] = "Extended";
})(qt || (qt = {}));
var Y;
(function(e) {
  e[e.FullYear = 0] = "FullYear", e[e.Month = 1] = "Month", e[e.Date = 2] = "Date", e[e.Hours = 3] = "Hours", e[e.Minutes = 4] = "Minutes", e[e.Seconds = 5] = "Seconds", e[e.FractionalSeconds = 6] = "FractionalSeconds", e[e.Day = 7] = "Day";
})(Y || (Y = {}));
var Z;
(function(e) {
  e[e.DayPeriods = 0] = "DayPeriods", e[e.Days = 1] = "Days", e[e.Months = 2] = "Months", e[e.Eras = 3] = "Eras";
})(Z || (Z = {}));
function IR(e, t, n, r) {
  let o = AR(e);
  t = cn(n, t) || t;
  let s = [], a;
  for (; t; )
    if (a = vR.exec(t), a) {
      s = s.concat(a.slice(1));
      const l = s.pop();
      if (!l)
        break;
      t = l;
    } else {
      s.push(t);
      break;
    }
  let u = o.getTimezoneOffset();
  r && (u = Qb(r, u), o = TR(o, r));
  let c = "";
  return s.forEach((l) => {
    const d = _R(l);
    c += d ? d(o, n, u) : l === "''" ? "'" : l.replace(/(^'|'$)/g, "").replace(/''/g, "'");
  }), c;
}
function ru(e, t, n) {
  const r = /* @__PURE__ */ new Date(0);
  return r.setFullYear(e, t, n), r.setHours(0, 0, 0), r;
}
function cn(e, t) {
  const n = sR(e);
  if (ta[n] ??= {}, ta[n][t])
    return ta[n][t];
  let r = "";
  switch (t) {
    case "shortDate":
      r = Js(e, Xe.Short);
      break;
    case "mediumDate":
      r = Js(e, Xe.Medium);
      break;
    case "longDate":
      r = Js(e, Xe.Long);
      break;
    case "fullDate":
      r = Js(e, Xe.Full);
      break;
    case "shortTime":
      r = Xs(e, Xe.Short);
      break;
    case "mediumTime":
      r = Xs(e, Xe.Medium);
      break;
    case "longTime":
      r = Xs(e, Xe.Long);
      break;
    case "fullTime":
      r = Xs(e, Xe.Full);
      break;
    case "short":
      const o = cn(e, "shortTime"), i = cn(e, "shortDate");
      r = na(ea(e, Xe.Short), [
        o,
        i
      ]);
      break;
    case "medium":
      const s = cn(e, "mediumTime"), a = cn(e, "mediumDate");
      r = na(ea(e, Xe.Medium), [
        s,
        a
      ]);
      break;
    case "long":
      const u = cn(e, "longTime"), c = cn(e, "longDate");
      r = na(ea(e, Xe.Long), [
        u,
        c
      ]);
      break;
    case "full":
      const l = cn(e, "fullTime"), d = cn(e, "fullDate");
      r = na(ea(e, Xe.Full), [
        l,
        d
      ]);
      break;
  }
  return r && (ta[n][t] = r), r;
}
function na(e, t) {
  return t && (e = e.replace(/\{([^}]+)}/g, function(n, r) {
    return t != null && r in t ? t[r] : n;
  })), e;
}
function Tt(e, t, n = "-", r, o) {
  let i = "";
  (e < 0 || o && e <= 0) && (o ? e = -e + 1 : (e = -e, i = n));
  let s = String(e);
  for (; s.length < t; )
    s = "0" + s;
  return r && (s = s.slice(s.length - t)), i + s;
}
function CR(e, t) {
  return Tt(e, 3).substring(0, t);
}
function we(e, t, n = 0, r = !1, o = !1) {
  return function(i, s) {
    let a = ER(e, i);
    if ((n > 0 || a > -n) && (a += n), e === Y.Hours)
      a === 0 && n === -12 && (a = 12);
    else if (e === Y.FractionalSeconds)
      return CR(a, t);
    const u = Ct(s, Me.MinusSign);
    return Tt(a, t, u, r, o);
  };
}
function ER(e, t) {
  switch (e) {
    case Y.FullYear:
      return t.getFullYear();
    case Y.Month:
      return t.getMonth();
    case Y.Date:
      return t.getDate();
    case Y.Hours:
      return t.getHours();
    case Y.Minutes:
      return t.getMinutes();
    case Y.Seconds:
      return t.getSeconds();
    case Y.FractionalSeconds:
      return t.getMilliseconds();
    case Y.Day:
      return t.getDay();
    default:
      throw new Error(`Unknown DateType value "${e}".`);
  }
}
function ae(e, t, n = xe.Format, r = !1) {
  return function(o, i) {
    return bR(o, i, e, t, n, r);
  };
}
function bR(e, t, n, r, o, i) {
  switch (n) {
    case Z.Months:
      return cR(t, o, r)[e.getMonth()];
    case Z.Days:
      return uR(t, o, r)[e.getDay()];
    case Z.DayPeriods:
      const s = e.getHours(), a = e.getMinutes();
      if (i) {
        const c = hR(t), l = pR(t, o, r), d = c.findIndex((f) => {
          if (Array.isArray(f)) {
            const [h, p] = f, g = s >= h.hours && a >= h.minutes, D = s < p.hours || s === p.hours && a < p.minutes;
            if (h.hours < p.hours) {
              if (g && D)
                return !0;
            } else if (g || D)
              return !0;
          } else if (f.hours === s && f.minutes === a)
            return !0;
          return !1;
        });
        if (d !== -1)
          return l[d];
      }
      return aR(t, o, r)[s < 12 ? 0 : 1];
    case Z.Eras:
      return lR(t, r)[e.getFullYear() <= 0 ? 0 : 1];
    default:
      const u = n;
      throw new Error(`unexpected translation type ${u}`);
  }
}
function ra(e) {
  return function(t, n, r) {
    const o = -1 * r, i = Ct(n, Me.MinusSign), s = o > 0 ? Math.floor(o / 60) : Math.ceil(o / 60);
    switch (e) {
      case qt.Short:
        return (o >= 0 ? "+" : "") + Tt(s, 2, i) + Tt(Math.abs(o % 60), 2, i);
      case qt.ShortGMT:
        return "GMT" + (o >= 0 ? "+" : "") + Tt(s, 1, i);
      case qt.Long:
        return "GMT" + (o >= 0 ? "+" : "") + Tt(s, 2, i) + ":" + Tt(Math.abs(o % 60), 2, i);
      case qt.Extended:
        return r === 0 ? "Z" : (o >= 0 ? "+" : "") + Tt(s, 2, i) + ":" + Tt(Math.abs(o % 60), 2, i);
      default:
        throw new Error(`Unknown zone width "${e}"`);
    }
  };
}
const wR = 0, Ia = 4;
function MR(e) {
  const t = ru(e, wR, 1).getDay();
  return ru(e, 0, 1 + (t <= Ia ? Ia : Ia + 7) - t);
}
function qb(e) {
  const t = e.getDay(), n = t === 0 ? -3 : Ia - t;
  return ru(e.getFullYear(), e.getMonth(), e.getDate() + n);
}
function Zc(e, t = !1) {
  return function(n, r) {
    let o;
    if (t) {
      const i = new Date(n.getFullYear(), n.getMonth(), 1).getDay() - 1, s = n.getDate();
      o = 1 + Math.floor((s + i) / 7);
    } else {
      const i = qb(n), s = MR(i.getFullYear()), a = i.getTime() - s.getTime();
      o = 1 + Math.round(a / 6048e5);
    }
    return Tt(o, e, Ct(r, Me.MinusSign));
  };
}
function oa(e, t = !1) {
  return function(n, r) {
    const i = qb(n).getFullYear();
    return Tt(i, e, Ct(r, Me.MinusSign), t);
  };
}
const Yc = {};
function _R(e) {
  if (Yc[e])
    return Yc[e];
  let t;
  switch (e) {
    case "G":
    case "GG":
    case "GGG":
      t = ae(Z.Eras, ne.Abbreviated);
      break;
    case "GGGG":
      t = ae(Z.Eras, ne.Wide);
      break;
    case "GGGGG":
      t = ae(Z.Eras, ne.Narrow);
      break;
    case "y":
      t = we(Y.FullYear, 1, 0, !1, !0);
      break;
    case "yy":
      t = we(Y.FullYear, 2, 0, !0, !0);
      break;
    case "yyy":
      t = we(Y.FullYear, 3, 0, !1, !0);
      break;
    case "yyyy":
      t = we(Y.FullYear, 4, 0, !1, !0);
      break;
    case "Y":
      t = oa(1);
      break;
    case "YY":
      t = oa(2, !0);
      break;
    case "YYY":
      t = oa(3);
      break;
    case "YYYY":
      t = oa(4);
      break;
    case "M":
    case "L":
      t = we(Y.Month, 1, 1);
      break;
    case "MM":
    case "LL":
      t = we(Y.Month, 2, 1);
      break;
    case "MMM":
      t = ae(Z.Months, ne.Abbreviated);
      break;
    case "MMMM":
      t = ae(Z.Months, ne.Wide);
      break;
    case "MMMMM":
      t = ae(Z.Months, ne.Narrow);
      break;
    case "LLL":
      t = ae(Z.Months, ne.Abbreviated, xe.Standalone);
      break;
    case "LLLL":
      t = ae(Z.Months, ne.Wide, xe.Standalone);
      break;
    case "LLLLL":
      t = ae(Z.Months, ne.Narrow, xe.Standalone);
      break;
    case "w":
      t = Zc(1);
      break;
    case "ww":
      t = Zc(2);
      break;
    case "W":
      t = Zc(1, !0);
      break;
    case "d":
      t = we(Y.Date, 1);
      break;
    case "dd":
      t = we(Y.Date, 2);
      break;
    case "c":
    case "cc":
      t = we(Y.Day, 1);
      break;
    case "ccc":
      t = ae(Z.Days, ne.Abbreviated, xe.Standalone);
      break;
    case "cccc":
      t = ae(Z.Days, ne.Wide, xe.Standalone);
      break;
    case "ccccc":
      t = ae(Z.Days, ne.Narrow, xe.Standalone);
      break;
    case "cccccc":
      t = ae(Z.Days, ne.Short, xe.Standalone);
      break;
    case "E":
    case "EE":
    case "EEE":
      t = ae(Z.Days, ne.Abbreviated);
      break;
    case "EEEE":
      t = ae(Z.Days, ne.Wide);
      break;
    case "EEEEE":
      t = ae(Z.Days, ne.Narrow);
      break;
    case "EEEEEE":
      t = ae(Z.Days, ne.Short);
      break;
    case "a":
    case "aa":
    case "aaa":
      t = ae(Z.DayPeriods, ne.Abbreviated);
      break;
    case "aaaa":
      t = ae(Z.DayPeriods, ne.Wide);
      break;
    case "aaaaa":
      t = ae(Z.DayPeriods, ne.Narrow);
      break;
    case "b":
    case "bb":
    case "bbb":
      t = ae(Z.DayPeriods, ne.Abbreviated, xe.Standalone, !0);
      break;
    case "bbbb":
      t = ae(Z.DayPeriods, ne.Wide, xe.Standalone, !0);
      break;
    case "bbbbb":
      t = ae(Z.DayPeriods, ne.Narrow, xe.Standalone, !0);
      break;
    case "B":
    case "BB":
    case "BBB":
      t = ae(Z.DayPeriods, ne.Abbreviated, xe.Format, !0);
      break;
    case "BBBB":
      t = ae(Z.DayPeriods, ne.Wide, xe.Format, !0);
      break;
    case "BBBBB":
      t = ae(Z.DayPeriods, ne.Narrow, xe.Format, !0);
      break;
    case "h":
      t = we(Y.Hours, 1, -12);
      break;
    case "hh":
      t = we(Y.Hours, 2, -12);
      break;
    case "H":
      t = we(Y.Hours, 1);
      break;
    case "HH":
      t = we(Y.Hours, 2);
      break;
    case "m":
      t = we(Y.Minutes, 1);
      break;
    case "mm":
      t = we(Y.Minutes, 2);
      break;
    case "s":
      t = we(Y.Seconds, 1);
      break;
    case "ss":
      t = we(Y.Seconds, 2);
      break;
    case "S":
      t = we(Y.FractionalSeconds, 1);
      break;
    case "SS":
      t = we(Y.FractionalSeconds, 2);
      break;
    case "SSS":
      t = we(Y.FractionalSeconds, 3);
      break;
    case "Z":
    case "ZZ":
    case "ZZZ":
      t = ra(qt.Short);
      break;
    case "ZZZZZ":
      t = ra(qt.Extended);
      break;
    case "O":
    case "OO":
    case "OOO":
    case "z":
    case "zz":
    case "zzz":
      t = ra(qt.ShortGMT);
      break;
    case "OOOO":
    case "ZZZZ":
    case "zzzz":
      t = ra(qt.Long);
      break;
    default:
      return null;
  }
  return Yc[e] = t, t;
}
function Qb(e, t) {
  e = e.replace(/:/g, "");
  const n = Date.parse("Jan 01, 1970 00:00:00 " + e) / 6e4;
  return isNaN(n) ? t : n;
}
function SR(e, t) {
  return e = new Date(e.getTime()), e.setMinutes(e.getMinutes() + t), e;
}
function TR(e, t, n) {
  const o = e.getTimezoneOffset(), i = Qb(t, o);
  return SR(e, -1 * (i - o));
}
function AR(e) {
  if (bm(e))
    return e;
  if (typeof e == "number" && !isNaN(e))
    return new Date(e);
  if (typeof e == "string") {
    if (e = e.trim(), /^(\d{4}(-\d{1,2}(-\d{1,2})?)?)$/.test(e)) {
      const [o, i = 1, s = 1] = e.split("-").map((a) => +a);
      return ru(o, i - 1, s);
    }
    const n = parseFloat(e);
    if (!isNaN(e - n))
      return new Date(n);
    let r;
    if (r = e.match(DR))
      return OR(r);
  }
  const t = new Date(e);
  if (!bm(t))
    throw new Error(`Unable to convert "${e}" into a date`);
  return t;
}
function OR(e) {
  const t = /* @__PURE__ */ new Date(0);
  let n = 0, r = 0;
  const o = e[8] ? t.setUTCFullYear : t.setFullYear, i = e[8] ? t.setUTCHours : t.setHours;
  e[9] && (n = Number(e[9] + e[10]), r = Number(e[9] + e[11])), o.call(t, Number(e[1]), Number(e[2]) - 1, Number(e[3]));
  const s = Number(e[4] || 0) - n, a = Number(e[5] || 0) - r, u = Number(e[6] || 0), c = Math.floor(parseFloat("0." + (e[7] || 0)) * 1e3);
  return i.call(t, s, a, u, c), t;
}
function bm(e) {
  return e instanceof Date && !isNaN(e.valueOf());
}
const FR = /^(\d+)?\.((\d+)(-(\d+))?)?$/, wm = 22, ou = ".", Ti = "0", NR = ";", kR = ",", Kc = "#", Mm = "¤", RR = "%";
function wp(e, t, n, r, o, i, s = !1) {
  let a = "", u = !1;
  if (!isFinite(e))
    a = Ct(n, Me.Infinity);
  else {
    let c = $R(e);
    s && (c = jR(c));
    let l = t.minInt, d = t.minFrac, f = t.maxFrac;
    if (i) {
      const y = i.match(FR);
      if (y === null)
        throw new Error(`${i} is not a valid digit info`);
      const M = y[1], k = y[3], G = y[5];
      M != null && (l = Jc(M)), k != null && (d = Jc(k)), G != null ? f = Jc(G) : k != null && d > f && (f = d);
    }
    BR(c, d, f);
    let h = c.digits, p = c.integerLen;
    const g = c.exponent;
    let D = [];
    for (u = h.every((y) => !y); p < l; p++)
      h.unshift(0);
    for (; p < 0; p++)
      h.unshift(0);
    p > 0 ? D = h.splice(p, h.length) : (D = h, h = [0]);
    const I = [];
    for (h.length >= t.lgSize && I.unshift(h.splice(-t.lgSize, h.length).join("")); h.length > t.gSize; )
      I.unshift(h.splice(-t.gSize, h.length).join(""));
    h.length && I.unshift(h.join("")), a = I.join(Ct(n, r)), D.length && (a += Ct(n, o) + D.join("")), g && (a += Ct(n, Me.Exponential) + "+" + g);
  }
  return e < 0 && !u ? a = t.negPre + a + t.negSuf : a = t.posPre + a + t.posSuf, a;
}
function xR(e, t, n, r, o) {
  const i = bp(t, es.Currency), s = Mp(i, Ct(t, Me.MinusSign));
  return s.minFrac = yR(r), s.maxFrac = s.minFrac, wp(e, s, t, Me.CurrencyGroup, Me.CurrencyDecimal, o).replace(Mm, n).replace(Mm, "").trim();
}
function PR(e, t, n) {
  const r = bp(t, es.Percent), o = Mp(r, Ct(t, Me.MinusSign));
  return wp(e, o, t, Me.Group, Me.Decimal, n, !0).replace(new RegExp(RR, "g"), Ct(t, Me.PercentSign));
}
function LR(e, t, n) {
  const r = bp(t, es.Decimal), o = Mp(r, Ct(t, Me.MinusSign));
  return wp(e, o, t, Me.Group, Me.Decimal, n);
}
function Mp(e, t = "-") {
  const n = {
    minInt: 1,
    minFrac: 0,
    maxFrac: 0,
    posPre: "",
    posSuf: "",
    negPre: "",
    negSuf: "",
    gSize: 0,
    lgSize: 0
  }, r = e.split(NR), o = r[0], i = r[1], s = o.indexOf(ou) !== -1 ? o.split(ou) : [
    o.substring(0, o.lastIndexOf(Ti) + 1),
    o.substring(o.lastIndexOf(Ti) + 1)
  ], a = s[0], u = s[1] || "";
  n.posPre = a.substring(0, a.indexOf(Kc));
  for (let l = 0; l < u.length; l++) {
    const d = u.charAt(l);
    d === Ti ? n.minFrac = n.maxFrac = l + 1 : d === Kc ? n.maxFrac = l + 1 : n.posSuf += d;
  }
  const c = a.split(kR);
  if (n.gSize = c[1] ? c[1].length : 0, n.lgSize = c[2] || c[1] ? (c[2] || c[1]).length : 0, i) {
    const l = o.length - n.posPre.length - n.posSuf.length, d = i.indexOf(Kc);
    n.negPre = i.substring(0, d).replace(/'/g, ""), n.negSuf = i.slice(d + l).replace(/'/g, "");
  } else
    n.negPre = t + n.posPre, n.negSuf = n.posSuf;
  return n;
}
function jR(e) {
  if (e.digits[0] === 0)
    return e;
  const t = e.digits.length - e.integerLen;
  return e.exponent ? e.exponent += 2 : (t === 0 ? e.digits.push(0, 0) : t === 1 && e.digits.push(0), e.integerLen += 2), e;
}
function $R(e) {
  let t = Math.abs(e) + "", n = 0, r, o, i, s, a;
  for ((o = t.indexOf(ou)) > -1 && (t = t.replace(ou, "")), (i = t.search(/e/i)) > 0 ? (o < 0 && (o = i), o += +t.slice(i + 1), t = t.substring(0, i)) : o < 0 && (o = t.length), i = 0; t.charAt(i) === Ti; i++)
    ;
  if (i === (a = t.length))
    r = [0], o = 1;
  else {
    for (a--; t.charAt(a) === Ti; )
      a--;
    for (o -= i, r = [], s = 0; i <= a; i++, s++)
      r[s] = Number(t.charAt(i));
  }
  return o > wm && (r = r.splice(0, wm - 1), n = o - 1, o = 1), { digits: r, exponent: n, integerLen: o };
}
function BR(e, t, n) {
  if (t > n)
    throw new Error(`The minimum number of digits after fraction (${t}) is higher than the maximum (${n}).`);
  let r = e.digits, o = r.length - e.integerLen;
  const i = Math.min(Math.max(t, o), n);
  let s = i + e.integerLen, a = r[s];
  if (s > 0) {
    r.splice(Math.max(e.integerLen, s));
    for (let d = s; d < r.length; d++)
      r[d] = 0;
  } else {
    o = Math.max(0, o), e.integerLen = 1, r.length = Math.max(1, s = i + 1), r[0] = 0;
    for (let d = 1; d < s; d++)
      r[d] = 0;
  }
  if (a >= 5)
    if (s - 1 < 0) {
      for (let d = 0; d > s; d--)
        r.unshift(0), e.integerLen++;
      r.unshift(1), e.integerLen++;
    } else
      r[s - 1]++;
  for (; o < Math.max(0, i); o++)
    r.push(0);
  let u = i !== 0;
  const c = t + e.integerLen, l = r.reduceRight(function(d, f, h, p) {
    return f = f + d, p[h] = f < 10 ? f : f - 10, u && (p[h] === 0 && h >= c ? p.pop() : u = !1), f >= 10 ? 1 : 0;
  }, 0);
  l && (r.unshift(l), e.integerLen++);
}
function Jc(e) {
  const t = parseInt(e);
  if (isNaN(t))
    throw new Error("Invalid integer literal when parsing " + e);
  return t;
}
class Cn {
  static {
    this.ɵfac = H({ minVersion: "12.0.0", version: "17.3.12", ngImport: b, type: Cn, deps: [], target: P.Injectable });
  }
  static {
    this.ɵprov = It({ minVersion: "12.0.0", version: "17.3.12", ngImport: b, type: Cn, providedIn: "root", useFactory: (t) => new Fo(t), deps: [{ token: Ue }] });
  }
}
B({ type: Cn, decorators: [{
  type: fe,
  args: [{
    providedIn: "root",
    useFactory: (e) => new Fo(e),
    deps: [Ue]
  }]
}] });
function Zb(e, t, n, r) {
  let o = `=${e}`;
  if (t.indexOf(o) > -1 || (o = n.getPluralCategory(e, r), t.indexOf(o) > -1))
    return o;
  if (t.indexOf("other") > -1)
    return "other";
  throw new Error(`No plural message found for value "${e}"`);
}
class Fo extends Cn {
  constructor(t) {
    super(), this.locale = t;
  }
  getPluralCategory(t, n) {
    switch (fR(n || this.locale)(t)) {
      case ar.Zero:
        return "zero";
      case ar.One:
        return "one";
      case ar.Two:
        return "two";
      case ar.Few:
        return "few";
      case ar.Many:
        return "many";
      default:
        return "other";
    }
  }
  static {
    this.ɵfac = H({ minVersion: "12.0.0", version: "17.3.12", ngImport: b, type: Fo, deps: [{ token: Ue }], target: P.Injectable });
  }
  static {
    this.ɵprov = It({ minVersion: "12.0.0", version: "17.3.12", ngImport: b, type: Fo });
  }
}
B({ type: Fo, decorators: [{
  type: fe
}], ctorParameters: () => [{ type: void 0, decorators: [{
  type: ft,
  args: [Ue]
}] }] });
const Xc = /\s+/, _m = [];
class _r {
  constructor(t, n) {
    this._ngEl = t, this._renderer = n, this.initialClasses = _m, this.stateMap = /* @__PURE__ */ new Map();
  }
  set klass(t) {
    this.initialClasses = t != null ? t.trim().split(Xc) : _m;
  }
  set ngClass(t) {
    this.rawClass = typeof t == "string" ? t.trim().split(Xc) : t;
  }
  /*
    The NgClass directive uses the custom change detection algorithm for its inputs. The custom
    algorithm is necessary since inputs are represented as complex object or arrays that need to be
    deeply-compared.
  
    This algorithm is perf-sensitive since NgClass is used very frequently and its poor performance
    might negatively impact runtime performance of the entire change detection cycle. The design of
    this algorithm is making sure that:
    - there is no unnecessary DOM manipulation (CSS classes are added / removed from the DOM only when
    needed), even if references to bound objects change;
    - there is no memory allocation if nothing changes (even relatively modest memory allocation
    during the change detection cycle can result in GC pauses for some of the CD cycles).
  
    The algorithm works by iterating over the set of bound classes, staring with [class] binding and
    then going over [ngClass] binding. For each CSS class name:
    - check if it was seen before (this information is tracked in the state map) and if its value
    changed;
    - mark it as "touched" - names that are not marked are not present in the latest set of binding
    and we can remove such class name from the internal data structures;
  
    After iteration over all the CSS class names we've got data structure with all the information
    necessary to synchronize changes to the DOM - it is enough to iterate over the state map, flush
    changes to the DOM and reset internal data structures so those are ready for the next change
    detection cycle.
     */
  ngDoCheck() {
    for (const n of this.initialClasses)
      this._updateState(n, !0);
    const t = this.rawClass;
    if (Array.isArray(t) || t instanceof Set)
      for (const n of t)
        this._updateState(n, !0);
    else if (t != null)
      for (const n of Object.keys(t))
        this._updateState(n, !!t[n]);
    this._applyStateDiff();
  }
  _updateState(t, n) {
    const r = this.stateMap.get(t);
    r !== void 0 ? (r.enabled !== n && (r.changed = !0, r.enabled = n), r.touched = !0) : this.stateMap.set(t, { enabled: n, changed: !0, touched: !0 });
  }
  _applyStateDiff() {
    for (const t of this.stateMap) {
      const n = t[0], r = t[1];
      r.changed ? (this._toggleClass(n, r.enabled), r.changed = !1) : r.touched || (r.enabled && this._toggleClass(n, !1), this.stateMap.delete(n)), r.touched = !1;
    }
  }
  _toggleClass(t, n) {
    if (ngDevMode && typeof t != "string")
      throw new Error(`NgClass can only toggle CSS classes expressed as strings, got ${Q(t)}`);
    t = t.trim(), t.length > 0 && t.split(Xc).forEach((r) => {
      n ? this._renderer.addClass(this._ngEl.nativeElement, r) : this._renderer.removeClass(this._ngEl.nativeElement, r);
    });
  }
  static {
    this.ɵfac = H({ minVersion: "12.0.0", version: "17.3.12", ngImport: b, type: _r, deps: [{ token: rn }, { token: Qo }], target: P.Directive });
  }
  static {
    this.ɵdir = vt({ minVersion: "14.0.0", version: "17.3.12", type: _r, isStandalone: !0, selector: "[ngClass]", inputs: { klass: ["class", "klass"], ngClass: "ngClass" }, ngImport: b });
  }
}
B({ type: _r, decorators: [{
  type: at,
  args: [{
    selector: "[ngClass]",
    standalone: !0
  }]
}], ctorParameters: () => [{ type: rn }, { type: Qo }], propDecorators: { klass: [{
  type: W,
  args: ["class"]
}], ngClass: [{
  type: W,
  args: ["ngClass"]
}] } });
class Sr {
  constructor(t) {
    this._viewContainerRef = t, this.ngComponentOutlet = null, this._inputsUsed = /* @__PURE__ */ new Map();
  }
  _needToReCreateNgModuleInstance(t) {
    return t.ngComponentOutletNgModule !== void 0 || t.ngComponentOutletNgModuleFactory !== void 0;
  }
  _needToReCreateComponentInstance(t) {
    return t.ngComponentOutlet !== void 0 || t.ngComponentOutletContent !== void 0 || t.ngComponentOutletInjector !== void 0 || this._needToReCreateNgModuleInstance(t);
  }
  /** @nodoc */
  ngOnChanges(t) {
    if (this._needToReCreateComponentInstance(t) && (this._viewContainerRef.clear(), this._inputsUsed.clear(), this._componentRef = void 0, this.ngComponentOutlet)) {
      const n = this.ngComponentOutletInjector || this._viewContainerRef.parentInjector;
      this._needToReCreateNgModuleInstance(t) && (this._moduleRef?.destroy(), this.ngComponentOutletNgModule ? this._moduleRef = nh(this.ngComponentOutletNgModule, Sm(n)) : this.ngComponentOutletNgModuleFactory ? this._moduleRef = this.ngComponentOutletNgModuleFactory.create(Sm(n)) : this._moduleRef = void 0), this._componentRef = this._viewContainerRef.createComponent(this.ngComponentOutlet, {
        injector: n,
        ngModuleRef: this._moduleRef,
        projectableNodes: this.ngComponentOutletContent
      });
    }
  }
  /** @nodoc */
  ngDoCheck() {
    if (this._componentRef) {
      if (this.ngComponentOutletInputs)
        for (const t of Object.keys(this.ngComponentOutletInputs))
          this._inputsUsed.set(t, !0);
      this._applyInputStateDiff(this._componentRef);
    }
  }
  /** @nodoc */
  ngOnDestroy() {
    this._moduleRef?.destroy();
  }
  _applyInputStateDiff(t) {
    for (const [n, r] of this._inputsUsed)
      r ? (t.setInput(n, this.ngComponentOutletInputs[n]), this._inputsUsed.set(n, !1)) : (t.setInput(n, void 0), this._inputsUsed.delete(n));
  }
  static {
    this.ɵfac = H({ minVersion: "12.0.0", version: "17.3.12", ngImport: b, type: Sr, deps: [{ token: Oe }], target: P.Directive });
  }
  static {
    this.ɵdir = vt({ minVersion: "14.0.0", version: "17.3.12", type: Sr, isStandalone: !0, selector: "[ngComponentOutlet]", inputs: { ngComponentOutlet: "ngComponentOutlet", ngComponentOutletInputs: "ngComponentOutletInputs", ngComponentOutletInjector: "ngComponentOutletInjector", ngComponentOutletContent: "ngComponentOutletContent", ngComponentOutletNgModule: "ngComponentOutletNgModule", ngComponentOutletNgModuleFactory: "ngComponentOutletNgModuleFactory" }, usesOnChanges: !0, ngImport: b });
  }
}
B({ type: Sr, decorators: [{
  type: at,
  args: [{
    selector: "[ngComponentOutlet]",
    standalone: !0
  }]
}], ctorParameters: () => [{ type: Oe }], propDecorators: { ngComponentOutlet: [{
  type: W
}], ngComponentOutletInputs: [{
  type: W
}], ngComponentOutletInjector: [{
  type: W
}], ngComponentOutletContent: [{
  type: W
}], ngComponentOutletNgModule: [{
  type: W
}], ngComponentOutletNgModuleFactory: [{
  type: W
}] } });
function Sm(e) {
  return e.get(Jn).injector;
}
class HR {
  constructor(t, n, r, o) {
    this.$implicit = t, this.ngForOf = n, this.index = r, this.count = o;
  }
  get first() {
    return this.index === 0;
  }
  get last() {
    return this.index === this.count - 1;
  }
  get even() {
    return this.index % 2 === 0;
  }
  get odd() {
    return !this.even;
  }
}
class Tr {
  /**
   * The value of the iterable expression, which can be used as a
   * [template input variable](guide/structural-directives#shorthand).
   */
  set ngForOf(t) {
    this._ngForOf = t, this._ngForOfDirty = !0;
  }
  /**
   * Specifies a custom `TrackByFunction` to compute the identity of items in an iterable.
   *
   * If a custom `TrackByFunction` is not provided, `NgForOf` will use the item's [object
   * identity](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is)
   * as the key.
   *
   * `NgForOf` uses the computed key to associate items in an iterable with DOM elements
   * it produces for these items.
   *
   * A custom `TrackByFunction` is useful to provide good user experience in cases when items in an
   * iterable rendered using `NgForOf` have a natural identifier (for example, custom ID or a
   * primary key), and this iterable could be updated with new object instances that still
   * represent the same underlying entity (for example, when data is re-fetched from the server,
   * and the iterable is recreated and re-rendered, but most of the data is still the same).
   *
   * @see {@link TrackByFunction}
   */
  set ngForTrackBy(t) {
    (typeof ngDevMode > "u" || ngDevMode) && t != null && typeof t != "function" && console.warn(`trackBy must be a function, but received ${JSON.stringify(t)}. See https://angular.io/api/common/NgForOf#change-propagation for more information.`), this._trackByFn = t;
  }
  get ngForTrackBy() {
    return this._trackByFn;
  }
  constructor(t, n, r) {
    this._viewContainer = t, this._template = n, this._differs = r, this._ngForOf = null, this._ngForOfDirty = !0, this._differ = null;
  }
  /**
   * A reference to the template that is stamped out for each item in the iterable.
   * @see [template reference variable](guide/template-reference-variables)
   */
  set ngForTemplate(t) {
    t && (this._template = t);
  }
  /**
   * Applies the changes when needed.
   * @nodoc
   */
  ngDoCheck() {
    if (this._ngForOfDirty) {
      this._ngForOfDirty = !1;
      const t = this._ngForOf;
      if (!this._differ && t)
        if (typeof ngDevMode > "u" || ngDevMode)
          try {
            this._differ = this._differs.find(t).create(this.ngForTrackBy);
          } catch {
            let n = `Cannot find a differ supporting object '${t}' of type '${VR(t)}'. NgFor only supports binding to Iterables, such as Arrays.`;
            throw typeof t == "object" && (n += " Did you mean to use the keyvalue pipe?"), new v(-2200, n);
          }
        else
          this._differ = this._differs.find(t).create(this.ngForTrackBy);
    }
    if (this._differ) {
      const t = this._differ.diff(this._ngForOf);
      t && this._applyChanges(t);
    }
  }
  _applyChanges(t) {
    const n = this._viewContainer;
    t.forEachOperation((r, o, i) => {
      if (r.previousIndex == null)
        n.createEmbeddedView(this._template, new HR(r.item, this._ngForOf, -1, -1), i === null ? void 0 : i);
      else if (i == null)
        n.remove(o === null ? void 0 : o);
      else if (o !== null) {
        const s = n.get(o);
        n.move(s, i), Tm(s, r);
      }
    });
    for (let r = 0, o = n.length; r < o; r++) {
      const s = n.get(r).context;
      s.index = r, s.count = o, s.ngForOf = this._ngForOf;
    }
    t.forEachIdentityChange((r) => {
      const o = n.get(r.currentIndex);
      Tm(o, r);
    });
  }
  /**
   * Asserts the correct type of the context for the template that `NgForOf` will render.
   *
   * The presence of this method is a signal to the Ivy template type-check compiler that the
   * `NgForOf` structural directive renders its template with a specific context type.
   */
  static ngTemplateContextGuard(t, n) {
    return !0;
  }
  static {
    this.ɵfac = H({ minVersion: "12.0.0", version: "17.3.12", ngImport: b, type: Tr, deps: [{ token: Oe }, { token: Qe }, { token: At }], target: P.Directive });
  }
  static {
    this.ɵdir = vt({ minVersion: "14.0.0", version: "17.3.12", type: Tr, isStandalone: !0, selector: "[ngFor][ngForOf]", inputs: { ngForOf: "ngForOf", ngForTrackBy: "ngForTrackBy", ngForTemplate: "ngForTemplate" }, ngImport: b });
  }
}
B({ type: Tr, decorators: [{
  type: at,
  args: [{
    selector: "[ngFor][ngForOf]",
    standalone: !0
  }]
}], ctorParameters: () => [{ type: Oe }, { type: Qe }, { type: At }], propDecorators: { ngForOf: [{
  type: W
}], ngForTrackBy: [{
  type: W
}], ngForTemplate: [{
  type: W
}] } });
function Tm(e, t) {
  e.context.$implicit = t.item;
}
function VR(e) {
  return e.name || typeof e;
}
class Ar {
  constructor(t, n) {
    this._viewContainer = t, this._context = new UR(), this._thenTemplateRef = null, this._elseTemplateRef = null, this._thenViewRef = null, this._elseViewRef = null, this._thenTemplateRef = n;
  }
  /**
   * The Boolean expression to evaluate as the condition for showing a template.
   */
  set ngIf(t) {
    this._context.$implicit = this._context.ngIf = t, this._updateView();
  }
  /**
   * A template to show if the condition expression evaluates to true.
   */
  set ngIfThen(t) {
    Am("ngIfThen", t), this._thenTemplateRef = t, this._thenViewRef = null, this._updateView();
  }
  /**
   * A template to show if the condition expression evaluates to false.
   */
  set ngIfElse(t) {
    Am("ngIfElse", t), this._elseTemplateRef = t, this._elseViewRef = null, this._updateView();
  }
  _updateView() {
    this._context.$implicit ? this._thenViewRef || (this._viewContainer.clear(), this._elseViewRef = null, this._thenTemplateRef && (this._thenViewRef = this._viewContainer.createEmbeddedView(this._thenTemplateRef, this._context))) : this._elseViewRef || (this._viewContainer.clear(), this._thenViewRef = null, this._elseTemplateRef && (this._elseViewRef = this._viewContainer.createEmbeddedView(this._elseTemplateRef, this._context)));
  }
  /**
   * Asserts the correct type of the context for the template that `NgIf` will render.
   *
   * The presence of this method is a signal to the Ivy template type-check compiler that the
   * `NgIf` structural directive renders its template with a specific context type.
   */
  static ngTemplateContextGuard(t, n) {
    return !0;
  }
  static {
    this.ɵfac = H({ minVersion: "12.0.0", version: "17.3.12", ngImport: b, type: Ar, deps: [{ token: Oe }, { token: Qe }], target: P.Directive });
  }
  static {
    this.ɵdir = vt({ minVersion: "14.0.0", version: "17.3.12", type: Ar, isStandalone: !0, selector: "[ngIf]", inputs: { ngIf: "ngIf", ngIfThen: "ngIfThen", ngIfElse: "ngIfElse" }, ngImport: b });
  }
}
B({ type: Ar, decorators: [{
  type: at,
  args: [{
    selector: "[ngIf]",
    standalone: !0
  }]
}], ctorParameters: () => [{ type: Oe }, { type: Qe }], propDecorators: { ngIf: [{
  type: W
}], ngIfThen: [{
  type: W
}], ngIfElse: [{
  type: W
}] } });
class UR {
  constructor() {
    this.$implicit = null, this.ngIf = null;
  }
}
function Am(e, t) {
  if (!!!(!t || t.createEmbeddedView))
    throw new Error(`${e} must be a TemplateRef, but received '${Q(t)}'.`);
}
class _p {
  constructor(t, n) {
    this._viewContainerRef = t, this._templateRef = n, this._created = !1;
  }
  create() {
    this._created = !0, this._viewContainerRef.createEmbeddedView(this._templateRef);
  }
  destroy() {
    this._created = !1, this._viewContainerRef.clear();
  }
  enforceState(t) {
    t && !this._created ? this.create() : !t && this._created && this.destroy();
  }
}
class Lt {
  constructor() {
    this._defaultViews = [], this._defaultUsed = !1, this._caseCount = 0, this._lastCaseCheckIndex = 0, this._lastCasesMatched = !1;
  }
  set ngSwitch(t) {
    this._ngSwitch = t, this._caseCount === 0 && this._updateDefaultCases(!0);
  }
  /** @internal */
  _addCase() {
    return this._caseCount++;
  }
  /** @internal */
  _addDefault(t) {
    this._defaultViews.push(t);
  }
  /** @internal */
  _matchCase(t) {
    const n = t === this._ngSwitch;
    return (typeof ngDevMode > "u" || ngDevMode) && n !== (t == this._ngSwitch) && console.warn(me(2001, `As of Angular v17 the NgSwitch directive uses strict equality comparison === instead of == to match different cases. Previously the case value "${Om(t)}" matched switch expression value "${Om(this._ngSwitch)}", but this is no longer the case with the stricter equality check. Your comparison results return different results using === vs. == and you should adjust your ngSwitch expression and / or values to conform with the strict equality requirements.`)), this._lastCasesMatched ||= n, this._lastCaseCheckIndex++, this._lastCaseCheckIndex === this._caseCount && (this._updateDefaultCases(!this._lastCasesMatched), this._lastCaseCheckIndex = 0, this._lastCasesMatched = !1), n;
  }
  _updateDefaultCases(t) {
    if (this._defaultViews.length > 0 && t !== this._defaultUsed) {
      this._defaultUsed = t;
      for (const n of this._defaultViews)
        n.enforceState(t);
    }
  }
  static {
    this.ɵfac = H({ minVersion: "12.0.0", version: "17.3.12", ngImport: b, type: Lt, deps: [], target: P.Directive });
  }
  static {
    this.ɵdir = vt({ minVersion: "14.0.0", version: "17.3.12", type: Lt, isStandalone: !0, selector: "[ngSwitch]", inputs: { ngSwitch: "ngSwitch" }, ngImport: b });
  }
}
B({ type: Lt, decorators: [{
  type: at,
  args: [{
    selector: "[ngSwitch]",
    standalone: !0
  }]
}], propDecorators: { ngSwitch: [{
  type: W
}] } });
class Or {
  constructor(t, n, r) {
    this.ngSwitch = r, (typeof ngDevMode > "u" || ngDevMode) && !r && Yb("ngSwitchCase", "NgSwitchCase"), r._addCase(), this._view = new _p(t, n);
  }
  /**
   * Performs case matching. For internal use only.
   * @nodoc
   */
  ngDoCheck() {
    this._view.enforceState(this.ngSwitch._matchCase(this.ngSwitchCase));
  }
  static {
    this.ɵfac = H({ minVersion: "12.0.0", version: "17.3.12", ngImport: b, type: Or, deps: [{ token: Oe }, { token: Qe }, { token: Lt, host: !0, optional: !0 }], target: P.Directive });
  }
  static {
    this.ɵdir = vt({ minVersion: "14.0.0", version: "17.3.12", type: Or, isStandalone: !0, selector: "[ngSwitchCase]", inputs: { ngSwitchCase: "ngSwitchCase" }, ngImport: b });
  }
}
B({ type: Or, decorators: [{
  type: at,
  args: [{
    selector: "[ngSwitchCase]",
    standalone: !0
  }]
}], ctorParameters: () => [{ type: Oe }, { type: Qe }, { type: Lt, decorators: [{
  type: Yt
}, {
  type: ds
}] }], propDecorators: { ngSwitchCase: [{
  type: W
}] } });
class Fr {
  constructor(t, n, r) {
    (typeof ngDevMode > "u" || ngDevMode) && !r && Yb("ngSwitchDefault", "NgSwitchDefault"), r._addDefault(new _p(t, n));
  }
  static {
    this.ɵfac = H({ minVersion: "12.0.0", version: "17.3.12", ngImport: b, type: Fr, deps: [{ token: Oe }, { token: Qe }, { token: Lt, host: !0, optional: !0 }], target: P.Directive });
  }
  static {
    this.ɵdir = vt({ minVersion: "14.0.0", version: "17.3.12", type: Fr, isStandalone: !0, selector: "[ngSwitchDefault]", ngImport: b });
  }
}
B({ type: Fr, decorators: [{
  type: at,
  args: [{
    selector: "[ngSwitchDefault]",
    standalone: !0
  }]
}], ctorParameters: () => [{ type: Oe }, { type: Qe }, { type: Lt, decorators: [{
  type: Yt
}, {
  type: ds
}] }] });
function Yb(e, t) {
  throw new v(2e3, `An element with the "${e}" attribute (matching the "${t}" directive) must be located inside an element with the "ngSwitch" attribute (matching "NgSwitch" directive)`);
}
function Om(e) {
  return typeof e == "string" ? `'${e}'` : String(e);
}
class En {
  constructor(t) {
    this._localization = t, this._caseViews = {};
  }
  set ngPlural(t) {
    this._updateView(t);
  }
  addCase(t, n) {
    this._caseViews[t] = n;
  }
  _updateView(t) {
    this._clearViews();
    const n = Object.keys(this._caseViews), r = Zb(t, n, this._localization);
    this._activateView(this._caseViews[r]);
  }
  _clearViews() {
    this._activeView && this._activeView.destroy();
  }
  _activateView(t) {
    t && (this._activeView = t, this._activeView.create());
  }
  static {
    this.ɵfac = H({ minVersion: "12.0.0", version: "17.3.12", ngImport: b, type: En, deps: [{ token: Cn }], target: P.Directive });
  }
  static {
    this.ɵdir = vt({ minVersion: "14.0.0", version: "17.3.12", type: En, isStandalone: !0, selector: "[ngPlural]", inputs: { ngPlural: "ngPlural" }, ngImport: b });
  }
}
B({ type: En, decorators: [{
  type: at,
  args: [{
    selector: "[ngPlural]",
    standalone: !0
  }]
}], ctorParameters: () => [{ type: Cn }], propDecorators: { ngPlural: [{
  type: W
}] } });
class Nr {
  constructor(t, n, r, o) {
    this.value = t;
    const i = !isNaN(Number(t));
    o.addCase(i ? `=${t}` : t, new _p(r, n));
  }
  static {
    this.ɵfac = H({ minVersion: "12.0.0", version: "17.3.12", ngImport: b, type: Nr, deps: [{ token: "ngPluralCase", attribute: !0 }, { token: Qe }, { token: Oe }, { token: En, host: !0 }], target: P.Directive });
  }
  static {
    this.ɵdir = vt({ minVersion: "14.0.0", version: "17.3.12", type: Nr, isStandalone: !0, selector: "[ngPluralCase]", ngImport: b });
  }
}
B({ type: Nr, decorators: [{
  type: at,
  args: [{
    selector: "[ngPluralCase]",
    standalone: !0
  }]
}], ctorParameters: () => [{ type: void 0, decorators: [{
  type: tf,
  args: ["ngPluralCase"]
}] }, { type: Qe }, { type: Oe }, { type: En, decorators: [{
  type: ds
}] }] });
class kr {
  constructor(t, n, r) {
    this._ngEl = t, this._differs = n, this._renderer = r, this._ngStyle = null, this._differ = null;
  }
  set ngStyle(t) {
    this._ngStyle = t, !this._differ && t && (this._differ = this._differs.find(t).create());
  }
  ngDoCheck() {
    if (this._differ) {
      const t = this._differ.diff(this._ngStyle);
      t && this._applyChanges(t);
    }
  }
  _setStyle(t, n) {
    const [r, o] = t.split("."), i = r.indexOf("-") === -1 ? void 0 : Co.DashCase;
    n != null ? this._renderer.setStyle(this._ngEl.nativeElement, r, o ? `${n}${o}` : n, i) : this._renderer.removeStyle(this._ngEl.nativeElement, r, i);
  }
  _applyChanges(t) {
    t.forEachRemovedItem((n) => this._setStyle(n.key, null)), t.forEachAddedItem((n) => this._setStyle(n.key, n.currentValue)), t.forEachChangedItem((n) => this._setStyle(n.key, n.currentValue));
  }
  static {
    this.ɵfac = H({ minVersion: "12.0.0", version: "17.3.12", ngImport: b, type: kr, deps: [{ token: rn }, { token: lt }, { token: Qo }], target: P.Directive });
  }
  static {
    this.ɵdir = vt({ minVersion: "14.0.0", version: "17.3.12", type: kr, isStandalone: !0, selector: "[ngStyle]", inputs: { ngStyle: "ngStyle" }, ngImport: b });
  }
}
B({ type: kr, decorators: [{
  type: at,
  args: [{
    selector: "[ngStyle]",
    standalone: !0
  }]
}], ctorParameters: () => [{ type: rn }, { type: lt }, { type: Qo }], propDecorators: { ngStyle: [{
  type: W,
  args: ["ngStyle"]
}] } });
class Rr {
  constructor(t) {
    this._viewContainerRef = t, this._viewRef = null, this.ngTemplateOutletContext = null, this.ngTemplateOutlet = null, this.ngTemplateOutletInjector = null;
  }
  ngOnChanges(t) {
    if (this._shouldRecreateView(t)) {
      const n = this._viewContainerRef;
      if (this._viewRef && n.remove(n.indexOf(this._viewRef)), !this.ngTemplateOutlet) {
        this._viewRef = null;
        return;
      }
      const r = this._createContextForwardProxy();
      this._viewRef = n.createEmbeddedView(this.ngTemplateOutlet, r, {
        injector: this.ngTemplateOutletInjector ?? void 0
      });
    }
  }
  /**
   * We need to re-create existing embedded view if either is true:
   * - the outlet changed.
   * - the injector changed.
   */
  _shouldRecreateView(t) {
    return !!t.ngTemplateOutlet || !!t.ngTemplateOutletInjector;
  }
  /**
   * For a given outlet instance, we create a proxy object that delegates
   * to the user-specified context. This allows changing, or swapping out
   * the context object completely without having to destroy/re-create the view.
   */
  _createContextForwardProxy() {
    return new Proxy({}, {
      set: (t, n, r) => this.ngTemplateOutletContext ? Reflect.set(this.ngTemplateOutletContext, n, r) : !1,
      get: (t, n, r) => {
        if (this.ngTemplateOutletContext)
          return Reflect.get(this.ngTemplateOutletContext, n, r);
      }
    });
  }
  static {
    this.ɵfac = H({ minVersion: "12.0.0", version: "17.3.12", ngImport: b, type: Rr, deps: [{ token: Oe }], target: P.Directive });
  }
  static {
    this.ɵdir = vt({ minVersion: "14.0.0", version: "17.3.12", type: Rr, isStandalone: !0, selector: "[ngTemplateOutlet]", inputs: { ngTemplateOutletContext: "ngTemplateOutletContext", ngTemplateOutlet: "ngTemplateOutlet", ngTemplateOutletInjector: "ngTemplateOutletInjector" }, usesOnChanges: !0, ngImport: b });
  }
}
B({ type: Rr, decorators: [{
  type: at,
  args: [{
    selector: "[ngTemplateOutlet]",
    standalone: !0
  }]
}], ctorParameters: () => [{ type: Oe }], propDecorators: { ngTemplateOutletContext: [{
  type: W
}], ngTemplateOutlet: [{
  type: W
}], ngTemplateOutletInjector: [{
  type: W
}] } });
const Fm = [
  _r,
  Sr,
  Tr,
  Ar,
  Rr,
  kr,
  Lt,
  Or,
  Fr,
  En,
  Nr
];
function Ut(e, t) {
  return new v(2100, ngDevMode && `InvalidPipeArgument: '${t}' for pipe '${Q(e)}'`);
}
class zR {
  createSubscription(t, n) {
    return pd(() => t.subscribe({
      next: n,
      error: (r) => {
        throw r;
      }
    }));
  }
  dispose(t) {
    pd(() => t.unsubscribe());
  }
}
class GR {
  createSubscription(t, n) {
    return t.then(n, (r) => {
      throw r;
    });
  }
  dispose(t) {
  }
}
const WR = new GR(), qR = new zR();
class Ln {
  constructor(t) {
    this._latestValue = null, this.markForCheckOnValueUpdate = !0, this._subscription = null, this._obj = null, this._strategy = null, this._ref = t;
  }
  ngOnDestroy() {
    this._subscription && this._dispose(), this._ref = null;
  }
  transform(t) {
    if (!this._obj) {
      if (t)
        try {
          this.markForCheckOnValueUpdate = !1, this._subscribe(t);
        } finally {
          this.markForCheckOnValueUpdate = !0;
        }
      return this._latestValue;
    }
    return t !== this._obj ? (this._dispose(), this.transform(t)) : this._latestValue;
  }
  _subscribe(t) {
    this._obj = t, this._strategy = this._selectStrategy(t), this._subscription = this._strategy.createSubscription(t, (n) => this._updateLatestValue(t, n));
  }
  _selectStrategy(t) {
    if (gc(t))
      return WR;
    if (gp(t))
      return qR;
    throw Ut(Ln, t);
  }
  _dispose() {
    this._strategy.dispose(this._subscription), this._latestValue = null, this._subscription = null, this._obj = null;
  }
  _updateLatestValue(t, n) {
    t === this._obj && (this._latestValue = n, this.markForCheckOnValueUpdate && this._ref?.markForCheck());
  }
  static {
    this.ɵfac = H({ minVersion: "12.0.0", version: "17.3.12", ngImport: b, type: Ln, deps: [{ token: ui }], target: P.Pipe });
  }
  static {
    this.ɵpipe = ct({ minVersion: "14.0.0", version: "17.3.12", ngImport: b, type: Ln, isStandalone: !0, name: "async", pure: !1 });
  }
}
B({ type: Ln, decorators: [{
  type: ut,
  args: [{
    name: "async",
    pure: !1,
    standalone: !0
  }]
}], ctorParameters: () => [{ type: ui }] });
class jn {
  transform(t) {
    if (t == null)
      return null;
    if (typeof t != "string")
      throw Ut(jn, t);
    return t.toLowerCase();
  }
  static {
    this.ɵfac = H({ minVersion: "12.0.0", version: "17.3.12", ngImport: b, type: jn, deps: [], target: P.Pipe });
  }
  static {
    this.ɵpipe = ct({ minVersion: "14.0.0", version: "17.3.12", ngImport: b, type: jn, isStandalone: !0, name: "lowercase" });
  }
}
B({ type: jn, decorators: [{
  type: ut,
  args: [{
    name: "lowercase",
    standalone: !0
  }]
}] });
const QR = /(?:[0-9A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CA\uA7D0\uA7D1\uA7D3\uA7D5-\uA7D9\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD23\uDE80-\uDEA9\uDEB0\uDEB1\uDF00-\uDF1C\uDF27\uDF30-\uDF45\uDF70-\uDF81\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDEB8\uDF00-\uDF1A\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCDF\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE70-\uDEBE\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE7F\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD50-\uDD52\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD837[\uDF00-\uDF1E]|\uD838[\uDD00-\uDD2C\uDD37-\uDD3D\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB]|\uD839[\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43\uDD4B]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF38\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A])\S*/g;
class $n {
  transform(t) {
    if (t == null)
      return null;
    if (typeof t != "string")
      throw Ut($n, t);
    return t.replace(QR, (n) => n[0].toUpperCase() + n.slice(1).toLowerCase());
  }
  static {
    this.ɵfac = H({ minVersion: "12.0.0", version: "17.3.12", ngImport: b, type: $n, deps: [], target: P.Pipe });
  }
  static {
    this.ɵpipe = ct({ minVersion: "14.0.0", version: "17.3.12", ngImport: b, type: $n, isStandalone: !0, name: "titlecase" });
  }
}
B({ type: $n, decorators: [{
  type: ut,
  args: [{
    name: "titlecase",
    standalone: !0
  }]
}] });
class Bn {
  transform(t) {
    if (t == null)
      return null;
    if (typeof t != "string")
      throw Ut(Bn, t);
    return t.toUpperCase();
  }
  static {
    this.ɵfac = H({ minVersion: "12.0.0", version: "17.3.12", ngImport: b, type: Bn, deps: [], target: P.Pipe });
  }
  static {
    this.ɵpipe = ct({ minVersion: "14.0.0", version: "17.3.12", ngImport: b, type: Bn, isStandalone: !0, name: "uppercase" });
  }
}
B({ type: Bn, decorators: [{
  type: ut,
  args: [{
    name: "uppercase",
    standalone: !0
  }]
}] });
const ZR = "mediumDate", Kb = new j(ngDevMode ? "DATE_PIPE_DEFAULT_TIMEZONE" : ""), Jb = new j(ngDevMode ? "DATE_PIPE_DEFAULT_OPTIONS" : "");
class Hn {
  constructor(t, n, r) {
    this.locale = t, this.defaultTimezone = n, this.defaultOptions = r;
  }
  transform(t, n, r, o) {
    if (t == null || t === "" || t !== t)
      return null;
    try {
      const i = n ?? this.defaultOptions?.dateFormat ?? ZR, s = r ?? this.defaultOptions?.timezone ?? this.defaultTimezone ?? void 0;
      return IR(t, i, o || this.locale, s);
    } catch (i) {
      throw Ut(Hn, i.message);
    }
  }
  static {
    this.ɵfac = H({ minVersion: "12.0.0", version: "17.3.12", ngImport: b, type: Hn, deps: [{ token: Ue }, { token: Kb, optional: !0 }, { token: Jb, optional: !0 }], target: P.Pipe });
  }
  static {
    this.ɵpipe = ct({ minVersion: "14.0.0", version: "17.3.12", ngImport: b, type: Hn, isStandalone: !0, name: "date" });
  }
}
B({ type: Hn, decorators: [{
  type: ut,
  args: [{
    name: "date",
    standalone: !0
  }]
}], ctorParameters: () => [{ type: void 0, decorators: [{
  type: ft,
  args: [Ue]
}] }, { type: void 0, decorators: [{
  type: ft,
  args: [Kb]
}, {
  type: Yt
}] }, { type: void 0, decorators: [{
  type: ft,
  args: [Jb]
}, {
  type: Yt
}] }] });
const YR = /#/g;
class Vn {
  constructor(t) {
    this._localization = t;
  }
  /**
   * @param value the number to be formatted
   * @param pluralMap an object that mimics the ICU format, see
   * https://unicode-org.github.io/icu/userguide/format_parse/messages/.
   * @param locale a `string` defining the locale to use (uses the current {@link LOCALE_ID} by
   * default).
   */
  transform(t, n, r) {
    if (t == null)
      return "";
    if (typeof n != "object" || n === null)
      throw Ut(Vn, n);
    const o = Zb(t, Object.keys(n), this._localization, r);
    return n[o].replace(YR, t.toString());
  }
  static {
    this.ɵfac = H({ minVersion: "12.0.0", version: "17.3.12", ngImport: b, type: Vn, deps: [{ token: Cn }], target: P.Pipe });
  }
  static {
    this.ɵpipe = ct({ minVersion: "14.0.0", version: "17.3.12", ngImport: b, type: Vn, isStandalone: !0, name: "i18nPlural" });
  }
}
B({ type: Vn, decorators: [{
  type: ut,
  args: [{
    name: "i18nPlural",
    standalone: !0
  }]
}], ctorParameters: () => [{ type: Cn }] });
class Un {
  /**
   * @param value a string to be internationalized.
   * @param mapping an object that indicates the text that should be displayed
   * for different values of the provided `value`.
   */
  transform(t, n) {
    if (t == null)
      return "";
    if (typeof n != "object" || typeof t != "string")
      throw Ut(Un, n);
    return n.hasOwnProperty(t) ? n[t] : n.hasOwnProperty("other") ? n.other : "";
  }
  static {
    this.ɵfac = H({ minVersion: "12.0.0", version: "17.3.12", ngImport: b, type: Un, deps: [], target: P.Pipe });
  }
  static {
    this.ɵpipe = ct({ minVersion: "14.0.0", version: "17.3.12", ngImport: b, type: Un, isStandalone: !0, name: "i18nSelect" });
  }
}
B({ type: Un, decorators: [{
  type: ut,
  args: [{
    name: "i18nSelect",
    standalone: !0
  }]
}] });
class xr {
  /**
   * @param value A value of any type to convert into a JSON-format string.
   */
  transform(t) {
    return JSON.stringify(t, null, 2);
  }
  static {
    this.ɵfac = H({ minVersion: "12.0.0", version: "17.3.12", ngImport: b, type: xr, deps: [], target: P.Pipe });
  }
  static {
    this.ɵpipe = ct({ minVersion: "14.0.0", version: "17.3.12", ngImport: b, type: xr, isStandalone: !0, name: "json", pure: !1 });
  }
}
B({ type: xr, decorators: [{
  type: ut,
  args: [{
    name: "json",
    pure: !1,
    standalone: !0
  }]
}] });
function KR(e, t) {
  return { key: e, value: t };
}
class Pr {
  constructor(t) {
    this.differs = t, this.keyValues = [], this.compareFn = Nm;
  }
  transform(t, n = Nm) {
    if (!t || !(t instanceof Map) && typeof t != "object")
      return null;
    this.differ ??= this.differs.find(t).create();
    const r = this.differ.diff(t), o = n !== this.compareFn;
    return r && (this.keyValues = [], r.forEachItem((i) => {
      this.keyValues.push(KR(i.key, i.currentValue));
    })), (r || o) && (this.keyValues.sort(n), this.compareFn = n), this.keyValues;
  }
  static {
    this.ɵfac = H({ minVersion: "12.0.0", version: "17.3.12", ngImport: b, type: Pr, deps: [{ token: lt }], target: P.Pipe });
  }
  static {
    this.ɵpipe = ct({ minVersion: "14.0.0", version: "17.3.12", ngImport: b, type: Pr, isStandalone: !0, name: "keyvalue", pure: !1 });
  }
}
B({ type: Pr, decorators: [{
  type: ut,
  args: [{
    name: "keyvalue",
    pure: !1,
    standalone: !0
  }]
}], ctorParameters: () => [{ type: lt }] });
function Nm(e, t) {
  const n = e.key, r = t.key;
  if (n === r)
    return 0;
  if (n === void 0)
    return 1;
  if (r === void 0)
    return -1;
  if (n === null)
    return 1;
  if (r === null)
    return -1;
  if (typeof n == "string" && typeof r == "string")
    return n < r ? -1 : 1;
  if (typeof n == "number" && typeof r == "number")
    return n - r;
  if (typeof n == "boolean" && typeof r == "boolean")
    return n < r ? -1 : 1;
  const o = String(n), i = String(r);
  return o == i ? 0 : o < i ? -1 : 1;
}
class zn {
  constructor(t) {
    this._locale = t;
  }
  /**
   * @param value The value to be formatted.
   * @param digitsInfo Sets digit and decimal representation.
   * [See more](#digitsinfo).
   * @param locale Specifies what locale format rules to use.
   * [See more](#locale).
   */
  transform(t, n, r) {
    if (!Sp(t))
      return null;
    r ||= this._locale;
    try {
      const o = Tp(t);
      return LR(o, r, n);
    } catch (o) {
      throw Ut(zn, o.message);
    }
  }
  static {
    this.ɵfac = H({ minVersion: "12.0.0", version: "17.3.12", ngImport: b, type: zn, deps: [{ token: Ue }], target: P.Pipe });
  }
  static {
    this.ɵpipe = ct({ minVersion: "14.0.0", version: "17.3.12", ngImport: b, type: zn, isStandalone: !0, name: "number" });
  }
}
B({ type: zn, decorators: [{
  type: ut,
  args: [{
    name: "number",
    standalone: !0
  }]
}], ctorParameters: () => [{ type: void 0, decorators: [{
  type: ft,
  args: [Ue]
}] }] });
class Gn {
  constructor(t) {
    this._locale = t;
  }
  /**
   *
   * @param value The number to be formatted as a percentage.
   * @param digitsInfo Decimal representation options, specified by a string
   * in the following format:<br>
   * <code>{minIntegerDigits}.{minFractionDigits}-{maxFractionDigits}</code>.
   *   - `minIntegerDigits`: The minimum number of integer digits before the decimal point.
   * Default is `1`.
   *   - `minFractionDigits`: The minimum number of digits after the decimal point.
   * Default is `0`.
   *   - `maxFractionDigits`: The maximum number of digits after the decimal point.
   * Default is `0`.
   * @param locale A locale code for the locale format rules to use.
   * When not supplied, uses the value of `LOCALE_ID`, which is `en-US` by default.
   * See [Setting your app locale](guide/i18n-common-locale-id).
   */
  transform(t, n, r) {
    if (!Sp(t))
      return null;
    r ||= this._locale;
    try {
      const o = Tp(t);
      return PR(o, r, n);
    } catch (o) {
      throw Ut(Gn, o.message);
    }
  }
  static {
    this.ɵfac = H({ minVersion: "12.0.0", version: "17.3.12", ngImport: b, type: Gn, deps: [{ token: Ue }], target: P.Pipe });
  }
  static {
    this.ɵpipe = ct({ minVersion: "14.0.0", version: "17.3.12", ngImport: b, type: Gn, isStandalone: !0, name: "percent" });
  }
}
B({ type: Gn, decorators: [{
  type: ut,
  args: [{
    name: "percent",
    standalone: !0
  }]
}], ctorParameters: () => [{ type: void 0, decorators: [{
  type: ft,
  args: [Ue]
}] }] });
class Wn {
  constructor(t, n = "USD") {
    this._locale = t, this._defaultCurrencyCode = n;
  }
  /**
   *
   * @param value The number to be formatted as currency.
   * @param currencyCode The [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) currency code,
   * such as `USD` for the US dollar and `EUR` for the euro. The default currency code can be
   * configured using the `DEFAULT_CURRENCY_CODE` injection token.
   * @param display The format for the currency indicator. One of the following:
   *   - `code`: Show the code (such as `USD`).
   *   - `symbol`(default): Show the symbol (such as `$`).
   *   - `symbol-narrow`: Use the narrow symbol for locales that have two symbols for their
   * currency.
   * For example, the Canadian dollar CAD has the symbol `CA$` and the symbol-narrow `$`. If the
   * locale has no narrow symbol, uses the standard symbol for the locale.
   *   - String: Use the given string value instead of a code or a symbol.
   * For example, an empty string will suppress the currency & symbol.
   *   - Boolean (marked deprecated in v5): `true` for symbol and false for `code`.
   *
   * @param digitsInfo Decimal representation options, specified by a string
   * in the following format:<br>
   * <code>{minIntegerDigits}.{minFractionDigits}-{maxFractionDigits}</code>.
   *   - `minIntegerDigits`: The minimum number of integer digits before the decimal point.
   * Default is `1`.
   *   - `minFractionDigits`: The minimum number of digits after the decimal point.
   * Default is `2`.
   *   - `maxFractionDigits`: The maximum number of digits after the decimal point.
   * Default is `2`.
   * If not provided, the number will be formatted with the proper amount of digits,
   * depending on what the [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) specifies.
   * For example, the Canadian dollar has 2 digits, whereas the Chilean peso has none.
   * @param locale A locale code for the locale format rules to use.
   * When not supplied, uses the value of `LOCALE_ID`, which is `en-US` by default.
   * See [Setting your app locale](guide/i18n-common-locale-id).
   */
  transform(t, n = this._defaultCurrencyCode, r = "symbol", o, i) {
    if (!Sp(t))
      return null;
    i ||= this._locale, typeof r == "boolean" && ((typeof ngDevMode > "u" || ngDevMode) && console && console.warn && console.warn('Warning: the currency pipe has been changed in Angular v5. The symbolDisplay option (third parameter) is now a string instead of a boolean. The accepted values are "code", "symbol" or "symbol-narrow".'), r = r ? "symbol" : "code");
    let s = n || this._defaultCurrencyCode;
    r !== "code" && (r === "symbol" || r === "symbol-narrow" ? s = gR(s, r === "symbol" ? "wide" : "narrow", i) : s = r);
    try {
      const a = Tp(t);
      return xR(a, i, s, n, o);
    } catch (a) {
      throw Ut(Wn, a.message);
    }
  }
  static {
    this.ɵfac = H({ minVersion: "12.0.0", version: "17.3.12", ngImport: b, type: Wn, deps: [{ token: Ue }, { token: yp }], target: P.Pipe });
  }
  static {
    this.ɵpipe = ct({ minVersion: "14.0.0", version: "17.3.12", ngImport: b, type: Wn, isStandalone: !0, name: "currency" });
  }
}
B({ type: Wn, decorators: [{
  type: ut,
  args: [{
    name: "currency",
    standalone: !0
  }]
}], ctorParameters: () => [{ type: void 0, decorators: [{
  type: ft,
  args: [Ue]
}] }, { type: void 0, decorators: [{
  type: ft,
  args: [yp]
}] }] });
function Sp(e) {
  return !(e == null || e === "" || e !== e);
}
function Tp(e) {
  if (typeof e == "string" && !isNaN(Number(e) - parseFloat(e)))
    return Number(e);
  if (typeof e != "number")
    throw new Error(`${e} is not a number`);
  return e;
}
class qn {
  transform(t, n, r) {
    if (t == null)
      return null;
    if (!this.supports(t))
      throw Ut(qn, t);
    return t.slice(n, r);
  }
  supports(t) {
    return typeof t == "string" || Array.isArray(t);
  }
  static {
    this.ɵfac = H({ minVersion: "12.0.0", version: "17.3.12", ngImport: b, type: qn, deps: [], target: P.Pipe });
  }
  static {
    this.ɵpipe = ct({ minVersion: "14.0.0", version: "17.3.12", ngImport: b, type: qn, isStandalone: !0, name: "slice", pure: !1 });
  }
}
B({ type: qn, decorators: [{
  type: ut,
  args: [{
    name: "slice",
    pure: !1,
    standalone: !0
  }]
}] });
const km = [
  Ln,
  Bn,
  jn,
  xr,
  qn,
  zn,
  Gn,
  $n,
  Wn,
  Hn,
  Vn,
  Un,
  Pr
];
class ho {
  static {
    this.ɵfac = H({ minVersion: "12.0.0", version: "17.3.12", ngImport: b, type: ho, deps: [], target: P.NgModule });
  }
  static {
    this.ɵmod = Ub({ minVersion: "14.0.0", version: "17.3.12", ngImport: b, type: ho, imports: [_r, Sr, Tr, Ar, Rr, kr, Lt, Or, Fr, En, Nr, Ln, Bn, jn, xr, qn, zn, Gn, $n, Wn, Hn, Vn, Un, Pr], exports: [_r, Sr, Tr, Ar, Rr, kr, Lt, Or, Fr, En, Nr, Ln, Bn, jn, xr, qn, zn, Gn, $n, Wn, Hn, Vn, Un, Pr] });
  }
  static {
    this.ɵinj = Vb({ minVersion: "12.0.0", version: "17.3.12", ngImport: b, type: ho });
  }
}
B({ type: ho, decorators: [{
  type: dp,
  args: [{
    imports: [Fm, km],
    exports: [Fm, km]
  }]
}] });
const JR = "browser", XR = "server";
function ex(e) {
  return e === JR;
}
function tx(e) {
  return e === XR;
}
new fp("17.3.12");
class Xb {
  static {
    this.ɵprov = te({
      token: Xb,
      providedIn: "root",
      factory: () => ex(w(Cs)) ? new nx(w(ci), window) : new ox()
    });
  }
}
class nx {
  constructor(t, n) {
    this.document = t, this.window = n, this.offset = () => [0, 0];
  }
  /**
   * Configures the top offset used when scrolling to an anchor.
   * @param offset A position in screen coordinates (a tuple with x and y values)
   * or a function that returns the top offset position.
   *
   */
  setOffset(t) {
    Array.isArray(t) ? this.offset = () => t : this.offset = t;
  }
  /**
   * Retrieves the current scroll position.
   * @returns The position in screen coordinates.
   */
  getScrollPosition() {
    return [this.window.scrollX, this.window.scrollY];
  }
  /**
   * Sets the scroll position.
   * @param position The new position in screen coordinates.
   */
  scrollToPosition(t) {
    this.window.scrollTo(t[0], t[1]);
  }
  /**
   * Scrolls to an element and attempts to focus the element.
   *
   * Note that the function name here is misleading in that the target string may be an ID for a
   * non-anchor element.
   *
   * @param target The ID of an element or name of the anchor.
   *
   * @see https://html.spec.whatwg.org/#the-indicated-part-of-the-document
   * @see https://html.spec.whatwg.org/#scroll-to-fragid
   */
  scrollToAnchor(t) {
    const n = rx(this.document, t);
    n && (this.scrollToElement(n), n.focus());
  }
  /**
   * Disables automatic scroll restoration provided by the browser.
   */
  setHistoryScrollRestoration(t) {
    this.window.history.scrollRestoration = t;
  }
  /**
   * Scrolls to an element using the native offset and the specified offset set on this scroller.
   *
   * The offset can be used when we know that there is a floating header and scrolling naively to an
   * element (ex: `scrollIntoView`) leaves the element hidden behind the floating header.
   */
  scrollToElement(t) {
    const n = t.getBoundingClientRect(), r = n.left + this.window.pageXOffset, o = n.top + this.window.pageYOffset, i = this.offset();
    this.window.scrollTo(r - i[0], o - i[1]);
  }
}
function rx(e, t) {
  const n = e.getElementById(t) || e.getElementsByName(t)[0];
  if (n)
    return n;
  if (typeof e.createTreeWalker == "function" && e.body && typeof e.body.attachShadow == "function") {
    const r = e.createTreeWalker(e.body, NodeFilter.SHOW_ELEMENT);
    let o = r.currentNode;
    for (; o; ) {
      const i = o.shadowRoot;
      if (i) {
        const s = i.getElementById(t) || i.querySelector(`[name="${t}"]`);
        if (s)
          return s;
      }
      o = r.nextNode();
    }
  }
  return null;
}
class ox {
  /**
   * Empty implementation
   */
  setOffset(t) {
  }
  /**
   * Empty implementation
   */
  getScrollPosition() {
    return [0, 0];
  }
  /**
   * Empty implementation
   */
  scrollToPosition(t) {
  }
  /**
   * Empty implementation
   */
  scrollToAnchor(t) {
  }
  /**
   * Empty implementation
   */
  setHistoryScrollRestoration(t) {
  }
}
const Ap = "20";
function Xr(e, t) {
  return Op(e) ? new URL(e) : new URL(e, t.location.href);
}
function Op(e) {
  return /^https?:\/\//.test(e);
}
function Rm(e) {
  return Op(e) ? new URL(e).hostname : e;
}
function ix(e) {
  if (!(typeof e == "string") || e.trim() === "")
    return !1;
  try {
    const n = new URL(e);
    return !0;
  } catch {
    return !1;
  }
}
function sx(e) {
  return e.endsWith("/") ? e.slice(0, -1) : e;
}
function ax(e) {
  return e.startsWith("/") ? e.slice(1) : e;
}
const li = (e) => e.src, ew = new j(ngDevMode ? "ImageLoader" : "", {
  providedIn: "root",
  factory: () => li
});
function vc(e, t) {
  return function(r) {
    return ix(r) || ux(r, t || []), r = sx(r), [{ provide: ew, useValue: (s) => (Op(s.src) && cx(r, s.src), e(r, { ...s, src: ax(s.src) })) }];
  };
}
function ux(e, t) {
  throw new v(2959, ngDevMode && `Image loader has detected an invalid path (\`${e}\`). To fix this, supply a path using one of the following formats: ${t.join(" or ")}`);
}
function cx(e, t) {
  throw new v(2959, ngDevMode && `Image loader has detected a \`<img>\` tag with an invalid \`ngSrc\` attribute: ${t}. This image loader expects \`ngSrc\` to be a relative URL - however the provided value is an absolute URL. To fix this, provide \`ngSrc\` as a path relative to the base URL configured for this loader (\`${e}\`).`);
}
vc(lx, ngDevMode ? ["https://<ZONE>/cdn-cgi/image/<OPTIONS>/<SOURCE-IMAGE>"] : void 0);
function lx(e, t) {
  let n = "format=auto";
  return t.width && (n += `,width=${t.width}`), t.isPlaceholder && (n += `,quality=${Ap}`), `${e}/cdn-cgi/image/${n}/${t.src}`;
}
const dx = {
  name: "Cloudinary",
  testUrl: hx
}, fx = /https?\:\/\/[^\/]+\.cloudinary\.com\/.+/;
function hx(e) {
  return fx.test(e);
}
vc(px, ngDevMode ? [
  "https://res.cloudinary.com/mysite",
  "https://mysite.cloudinary.com",
  "https://subdomain.mysite.com"
] : void 0);
function px(e, t) {
  let r = `f_auto,${t.isPlaceholder ? "q_auto:low" : "q_auto"}`;
  return t.width && (r += `,w_${t.width}`), `${e}/image/upload/${r}/${t.src}`;
}
const gx = {
  name: "ImageKit",
  testUrl: yx
}, mx = /https?\:\/\/[^\/]+\.imagekit\.io\/.+/;
function yx(e) {
  return mx.test(e);
}
vc(Dx, ngDevMode ? ["https://ik.imagekit.io/mysite", "https://subdomain.mysite.com"] : void 0);
function Dx(e, t) {
  const { src: n, width: r } = t, o = [];
  r && o.push(`w-${r}`), t.isPlaceholder && o.push(`q-${Ap}`);
  const i = o.length ? [e, `tr:${o.join(",")}`, n] : [e, n];
  return new URL(i.join("/")).href;
}
const vx = {
  name: "Imgix",
  testUrl: Cx
}, Ix = /https?\:\/\/[^\/]+\.imgix\.net\/.+/;
function Cx(e) {
  return Ix.test(e);
}
vc(Ex, ngDevMode ? ["https://somepath.imgix.net/"] : void 0);
function Ex(e, t) {
  const n = new URL(`${e}/${t.src}`);
  return n.searchParams.set("auto", "format"), t.width && n.searchParams.set("w", t.width.toString()), t.isPlaceholder && n.searchParams.set("q", Ap), n.href;
}
const bx = {
  name: "Netlify",
  testUrl: Mx
}, wx = /https?\:\/\/[^\/]+\.netlify\.app\/.+/;
function Mx(e) {
  return wx.test(e);
}
function se(e, t = !0) {
  return `The NgOptimizedImage directive ${t ? `(activated on an <img> element with the \`ngSrc="${e}"\`) ` : ""}has detected that`;
}
function tw(e) {
  if (!ngDevMode)
    throw new v(2958, `Unexpected invocation of the ${e} in the prod mode. Please make sure that the prod mode is enabled for production builds.`);
}
class ts {
  constructor() {
    this.images = /* @__PURE__ */ new Map(), this.window = null, this.observer = null, tw("LCP checker");
    const t = w(ci).defaultView;
    typeof t < "u" && typeof PerformanceObserver < "u" && (this.window = t, this.observer = this.initPerformanceObserver());
  }
  /**
   * Inits PerformanceObserver and subscribes to LCP events.
   * Based on https://web.dev/lcp/#measure-lcp-in-javascript
   */
  initPerformanceObserver() {
    const t = new PerformanceObserver((n) => {
      const r = n.getEntries();
      if (r.length === 0)
        return;
      const i = r[r.length - 1].element?.src ?? "";
      if (i.startsWith("data:") || i.startsWith("blob:"))
        return;
      const s = this.images.get(i);
      s && (!s.priority && !s.alreadyWarnedPriority && (s.alreadyWarnedPriority = !0, _x(i)), s.modified && !s.alreadyWarnedModified && (s.alreadyWarnedModified = !0, Sx(i)));
    });
    return t.observe({ type: "largest-contentful-paint", buffered: !0 }), t;
  }
  registerImage(t, n, r) {
    if (!this.observer)
      return;
    const o = {
      priority: r,
      modified: !1,
      alreadyWarnedModified: !1,
      alreadyWarnedPriority: !1
    };
    this.images.set(Xr(t, this.window).href, o);
  }
  unregisterImage(t) {
    this.observer && this.images.delete(Xr(t, this.window).href);
  }
  updateImage(t, n) {
    const r = Xr(t, this.window).href, o = this.images.get(r);
    o && (o.modified = !0, this.images.set(Xr(n, this.window).href, o), this.images.delete(r));
  }
  ngOnDestroy() {
    this.observer && (this.observer.disconnect(), this.images.clear());
  }
  static {
    this.ɵfac = H({ minVersion: "12.0.0", version: "17.3.12", ngImport: b, type: ts, deps: [], target: P.Injectable });
  }
  static {
    this.ɵprov = It({ minVersion: "12.0.0", version: "17.3.12", ngImport: b, type: ts, providedIn: "root" });
  }
}
B({ type: ts, decorators: [{
  type: fe,
  args: [{ providedIn: "root" }]
}], ctorParameters: () => [] });
function _x(e) {
  const t = se(e);
  console.error(me(2955, `${t} this image is the Largest Contentful Paint (LCP) element but was not marked "priority". This image should be marked "priority" in order to prioritize its loading. To fix this, add the "priority" attribute.`));
}
function Sx(e) {
  const t = se(e);
  console.warn(me(2964, `${t} this image is the Largest Contentful Paint (LCP) element and has had its "ngSrc" attribute modified. This can cause slower loading performance. It is recommended not to modify the "ngSrc" property on any image which could be the LCP element.`));
}
const Tx = /* @__PURE__ */ new Set(["localhost", "127.0.0.1", "0.0.0.0"]), Ax = new j(ngDevMode ? "PRECONNECT_CHECK_BLOCKLIST" : "");
class ns {
  constructor() {
    this.document = w(ci), this.preconnectLinks = null, this.alreadySeen = /* @__PURE__ */ new Set(), this.window = null, this.blocklist = new Set(Tx), tw("preconnect link checker");
    const t = this.document.defaultView;
    typeof t < "u" && (this.window = t);
    const n = w(Ax, { optional: !0 });
    n && this.populateBlocklist(n);
  }
  populateBlocklist(t) {
    Array.isArray(t) ? nw(t, (n) => {
      this.blocklist.add(Rm(n));
    }) : this.blocklist.add(Rm(t));
  }
  /**
   * Checks that a preconnect resource hint exists in the head for the
   * given src.
   *
   * @param rewrittenSrc src formatted with loader
   * @param originalNgSrc ngSrc value
   */
  assertPreconnect(t, n) {
    if (!this.window)
      return;
    const r = Xr(t, this.window);
    this.blocklist.has(r.hostname) || this.alreadySeen.has(r.origin) || (this.alreadySeen.add(r.origin), this.preconnectLinks ??= this.queryPreconnectLinks(), this.preconnectLinks.has(r.origin) || console.warn(me(2956, `${se(n)} there is no preconnect tag present for this image. Preconnecting to the origin(s) that serve priority images ensures that these images are delivered as soon as possible. To fix this, please add the following element into the <head> of the document:
  <link rel="preconnect" href="${r.origin}">`)));
  }
  queryPreconnectLinks() {
    const t = /* @__PURE__ */ new Set(), r = Array.from(this.document.querySelectorAll("link[rel=preconnect]"));
    for (let o of r) {
      const i = Xr(o.href, this.window);
      t.add(i.origin);
    }
    return t;
  }
  ngOnDestroy() {
    this.preconnectLinks?.clear(), this.alreadySeen.clear();
  }
  static {
    this.ɵfac = H({ minVersion: "12.0.0", version: "17.3.12", ngImport: b, type: ns, deps: [], target: P.Injectable });
  }
  static {
    this.ɵprov = It({ minVersion: "12.0.0", version: "17.3.12", ngImport: b, type: ns, providedIn: "root" });
  }
}
B({ type: ns, decorators: [{
  type: fe,
  args: [{ providedIn: "root" }]
}], ctorParameters: () => [] });
function nw(e, t) {
  for (let n of e)
    Array.isArray(n) ? nw(n, t) : t(n);
}
const xm = 5, Ox = new j("NG_OPTIMIZED_PRELOADED_IMAGES", {
  providedIn: "root",
  factory: () => /* @__PURE__ */ new Set()
});
class rs {
  constructor() {
    this.preloadedImages = w(Ox), this.document = w(ci);
  }
  /**
   * @description Add a preload `<link>` to the `<head>` of the `index.html` that is served from the
   * server while using Angular Universal and SSR to kick off image loads for high priority images.
   *
   * The `sizes` (passed in from the user) and `srcset` (parsed and formatted from `ngSrcset`)
   * properties used to set the corresponding attributes, `imagesizes` and `imagesrcset`
   * respectively, on the preload `<link>` tag so that the correctly sized image is preloaded from
   * the CDN.
   *
   * {@link https://web.dev/preload-responsive-images/#imagesrcset-and-imagesizes}
   *
   * @param renderer The `Renderer2` passed in from the directive
   * @param src The original src of the image that is set on the `ngSrc` input.
   * @param srcset The parsed and formatted srcset created from the `ngSrcset` input
   * @param sizes The value of the `sizes` attribute passed in to the `<img>` tag
   */
  createPreloadLinkTag(t, n, r, o) {
    if (ngDevMode && this.preloadedImages.size >= xm)
      throw new v(2961, ngDevMode && `The \`NgOptimizedImage\` directive has detected that more than ${xm} images were marked as priority. This might negatively affect an overall performance of the page. To fix this, remove the "priority" attribute from images with less priority.`);
    if (this.preloadedImages.has(n))
      return;
    this.preloadedImages.add(n);
    const i = t.createElement("link");
    t.setAttribute(i, "as", "image"), t.setAttribute(i, "href", n), t.setAttribute(i, "rel", "preload"), t.setAttribute(i, "fetchpriority", "high"), o && t.setAttribute(i, "imageSizes", o), r && t.setAttribute(i, "imageSrcset", r), t.appendChild(this.document.head, i);
  }
  static {
    this.ɵfac = H({ minVersion: "12.0.0", version: "17.3.12", ngImport: b, type: rs, deps: [], target: P.Injectable });
  }
  static {
    this.ɵprov = It({ minVersion: "12.0.0", version: "17.3.12", ngImport: b, type: rs, providedIn: "root" });
  }
}
B({ type: rs, decorators: [{
  type: fe,
  args: [{ providedIn: "root" }]
}] });
const Pm = 50, rw = /^((\s*\d+w\s*(,|$)){1,})$/, Fx = /^((\s*\d+(\.\d+)?x\s*(,|$)){1,})$/, el = 3, Ai = 2, Nx = [1, 2], kx = 640, Lm = 0.1, jm = 1e3, Rx = 1920, xx = 1080, Px = 15, $m = 4e3, Bm = 1e4, Lx = [
  vx,
  gx,
  dx,
  bx
];
class iu {
  constructor() {
    this.imageLoader = w(ew), this.config = jx(w(cf)), this.renderer = w(Qo), this.imgElement = w(rn).nativeElement, this.injector = w(Re), this.isServer = tx(w(Cs)), this.preloadLinkCreator = w(rs), this.lcpObserver = ngDevMode ? this.injector.get(ts) : null, this._renderedSrc = null, this.priority = !1, this.disableOptimizedSrcset = !1, this.fill = !1;
  }
  /** @nodoc */
  ngOnInit() {
    if (_t("NgOptimizedImage"), ngDevMode) {
      const t = this.injector.get(le);
      ow(this, "ngSrc", this.ngSrc), Qx(this, this.ngSrcset), $x(this), this.ngSrcset && Bx(this), Hx(this), qx(this), this.fill ? (eP(this), t.runOutsideAngular(() => tP(this, this.imgElement, this.renderer))) : (Xx(this), this.height !== void 0 && Hm(this, this.height, "height"), this.width !== void 0 && Hm(this, this.width, "width"), t.runOutsideAngular(() => Jx(this, this.imgElement, this.renderer))), nP(this), this.ngSrcset || Vx(this), Ux(this, this.imageLoader), rP(this.ngSrc, this.imageLoader), oP(this, this.imageLoader), iP(this, this.imageLoader), this.lcpObserver !== null && this.injector.get(le).runOutsideAngular(() => {
        this.lcpObserver.registerImage(this.getRewrittenSrc(), this.ngSrc, this.priority);
      }), this.priority && this.injector.get(ns).assertPreconnect(this.getRewrittenSrc(), this.ngSrc);
    }
    this.placeholder && this.removePlaceholderOnLoad(this.imgElement), this.setHostAttributes();
  }
  setHostAttributes() {
    this.fill ? this.sizes ||= "100vw" : (this.setHostAttribute("width", this.width.toString()), this.setHostAttribute("height", this.height.toString())), this.setHostAttribute("loading", this.getLoadingBehavior()), this.setHostAttribute("fetchpriority", this.getFetchPriority()), this.setHostAttribute("ng-img", "true");
    const t = this.updateSrcAndSrcset();
    this.sizes && this.setHostAttribute("sizes", this.sizes), this.isServer && this.priority && this.preloadLinkCreator.createPreloadLinkTag(this.renderer, this.getRewrittenSrc(), t, this.sizes);
  }
  /** @nodoc */
  ngOnChanges(t) {
    if (ngDevMode && Kx(this, t, [
      "ngSrcset",
      "width",
      "height",
      "priority",
      "fill",
      "loading",
      "sizes",
      "loaderParams",
      "disableOptimizedSrcset"
    ]), t.ngSrc && !t.ngSrc.isFirstChange()) {
      const n = this._renderedSrc;
      this.updateSrcAndSrcset(!0);
      const r = this._renderedSrc;
      this.lcpObserver !== null && n && r && n !== r && this.injector.get(le).runOutsideAngular(() => {
        this.lcpObserver?.updateImage(n, r);
      });
    }
  }
  callImageLoader(t) {
    let n = t;
    return this.loaderParams && (n.loaderParams = this.loaderParams), this.imageLoader(n);
  }
  getLoadingBehavior() {
    return !this.priority && this.loading !== void 0 ? this.loading : this.priority ? "eager" : "lazy";
  }
  getFetchPriority() {
    return this.priority ? "high" : "auto";
  }
  getRewrittenSrc() {
    if (!this._renderedSrc) {
      const t = { src: this.ngSrc };
      this._renderedSrc = this.callImageLoader(t);
    }
    return this._renderedSrc;
  }
  getRewrittenSrcset() {
    const t = rw.test(this.ngSrcset);
    return this.ngSrcset.split(",").filter((r) => r !== "").map((r) => {
      r = r.trim();
      const o = t ? parseFloat(r) : parseFloat(r) * this.width;
      return `${this.callImageLoader({ src: this.ngSrc, width: o })} ${r}`;
    }).join(", ");
  }
  getAutomaticSrcset() {
    return this.sizes ? this.getResponsiveSrcset() : this.getFixedSrcset();
  }
  getResponsiveSrcset() {
    const { breakpoints: t } = this.config;
    let n = t;
    return this.sizes?.trim() === "100vw" && (n = t.filter((o) => o >= kx)), n.map((o) => `${this.callImageLoader({ src: this.ngSrc, width: o })} ${o}w`).join(", ");
  }
  updateSrcAndSrcset(t = !1) {
    t && (this._renderedSrc = null);
    const n = this.getRewrittenSrc();
    this.setHostAttribute("src", n);
    let r;
    return this.ngSrcset ? r = this.getRewrittenSrcset() : this.shouldGenerateAutomaticSrcset() && (r = this.getAutomaticSrcset()), r && this.setHostAttribute("srcset", r), r;
  }
  getFixedSrcset() {
    return Nx.map((n) => `${this.callImageLoader({
      src: this.ngSrc,
      width: this.width * n
    })} ${n}x`).join(", ");
  }
  shouldGenerateAutomaticSrcset() {
    let t = !1;
    return this.sizes || (t = this.width > Rx || this.height > xx), !this.disableOptimizedSrcset && !this.srcset && this.imageLoader !== li && !t;
  }
  /**
   * Returns an image url formatted for use with the CSS background-image property. Expects one of:
   * * A base64 encoded image, which is wrapped and passed through.
   * * A boolean. If true, calls the image loader to generate a small placeholder url.
   */
  generatePlaceholder(t) {
    const { placeholderResolution: n } = this.config;
    return t === !0 ? `url(${this.callImageLoader({
      src: this.ngSrc,
      width: n,
      isPlaceholder: !0
    })})` : typeof t == "string" && t.startsWith("data:") ? `url(${t})` : null;
  }
  /**
   * Determines if blur should be applied, based on an optional boolean
   * property `blur` within the optional configuration object `placeholderConfig`.
   */
  shouldBlurPlaceholder(t) {
    return !t || !t.hasOwnProperty("blur") ? !0 : !!t.blur;
  }
  removePlaceholderOnLoad(t) {
    const n = () => {
      const i = this.injector.get(ui);
      r(), o(), this.placeholder = !1, i.markForCheck();
    }, r = this.renderer.listen(t, "load", n), o = this.renderer.listen(t, "error", n);
  }
  /** @nodoc */
  ngOnDestroy() {
    ngDevMode && !this.priority && this._renderedSrc !== null && this.lcpObserver !== null && this.lcpObserver.unregisterImage(this._renderedSrc);
  }
  setHostAttribute(t, n) {
    this.renderer.setAttribute(this.imgElement, t, n);
  }
  static {
    this.ɵfac = H({ minVersion: "12.0.0", version: "17.3.12", ngImport: b, type: iu, deps: [], target: P.Directive });
  }
  static {
    this.ɵdir = vt({ minVersion: "16.1.0", version: "17.3.12", type: iu, isStandalone: !0, selector: "img[ngSrc]", inputs: { ngSrc: ["ngSrc", "ngSrc", iw], ngSrcset: "ngSrcset", sizes: "sizes", width: ["width", "width", Xi], height: ["height", "height", Xi], loading: "loading", priority: ["priority", "priority", xn], loaderParams: "loaderParams", disableOptimizedSrcset: ["disableOptimizedSrcset", "disableOptimizedSrcset", xn], fill: ["fill", "fill", xn], placeholder: ["placeholder", "placeholder", sw], placeholderConfig: "placeholderConfig", src: "src", srcset: "srcset" }, host: { properties: { "style.position": 'fill ? "absolute" : null', "style.width": 'fill ? "100%" : null', "style.height": 'fill ? "100%" : null', "style.inset": 'fill ? "0" : null', "style.background-size": 'placeholder ? "cover" : null', "style.background-position": 'placeholder ? "50% 50%" : null', "style.background-repeat": 'placeholder ? "no-repeat" : null', "style.background-image": "placeholder ? generatePlaceholder(placeholder) : null", "style.filter": 'placeholder && shouldBlurPlaceholder(placeholderConfig) ? "blur(15px)" : null' } }, usesOnChanges: !0, ngImport: b });
  }
}
B({ type: iu, decorators: [{
  type: at,
  args: [{
    standalone: !0,
    selector: "img[ngSrc]",
    host: {
      "[style.position]": 'fill ? "absolute" : null',
      "[style.width]": 'fill ? "100%" : null',
      "[style.height]": 'fill ? "100%" : null',
      "[style.inset]": 'fill ? "0" : null',
      "[style.background-size]": 'placeholder ? "cover" : null',
      "[style.background-position]": 'placeholder ? "50% 50%" : null',
      "[style.background-repeat]": 'placeholder ? "no-repeat" : null',
      "[style.background-image]": "placeholder ? generatePlaceholder(placeholder) : null",
      "[style.filter]": `placeholder && shouldBlurPlaceholder(placeholderConfig) ? "blur(${Px}px)" : null`
    }
  }]
}], propDecorators: { ngSrc: [{
  type: W,
  args: [{ required: !0, transform: iw }]
}], ngSrcset: [{
  type: W
}], sizes: [{
  type: W
}], width: [{
  type: W,
  args: [{ transform: Xi }]
}], height: [{
  type: W,
  args: [{ transform: Xi }]
}], loading: [{
  type: W
}], priority: [{
  type: W,
  args: [{ transform: xn }]
}], loaderParams: [{
  type: W
}], disableOptimizedSrcset: [{
  type: W,
  args: [{ transform: xn }]
}], fill: [{
  type: W,
  args: [{ transform: xn }]
}], placeholder: [{
  type: W,
  args: [{ transform: sw }]
}], placeholderConfig: [{
  type: W
}], src: [{
  type: W
}], srcset: [{
  type: W
}] } });
function jx(e) {
  let t = {};
  return e.breakpoints && (t.breakpoints = e.breakpoints.sort((n, r) => n - r)), Object.assign({}, uf, e, t);
}
function $x(e) {
  if (e.src)
    throw new v(2950, `${se(e.ngSrc)} both \`src\` and \`ngSrc\` have been set. Supplying both of these attributes breaks lazy loading. The NgOptimizedImage directive sets \`src\` itself based on the value of \`ngSrc\`. To fix this, please remove the \`src\` attribute.`);
}
function Bx(e) {
  if (e.srcset)
    throw new v(2951, `${se(e.ngSrc)} both \`srcset\` and \`ngSrcset\` have been set. Supplying both of these attributes breaks lazy loading. The NgOptimizedImage directive sets \`srcset\` itself based on the value of \`ngSrcset\`. To fix this, please remove the \`srcset\` attribute.`);
}
function Hx(e) {
  let t = e.ngSrc.trim();
  if (t.startsWith("data:"))
    throw t.length > Pm && (t = t.substring(0, Pm) + "..."), new v(2952, `${se(e.ngSrc, !1)} \`ngSrc\` is a Base64-encoded string (${t}). NgOptimizedImage does not support Base64-encoded strings. To fix this, disable the NgOptimizedImage directive for this element by removing \`ngSrc\` and using a standard \`src\` attribute instead.`);
}
function Vx(e) {
  if (e.sizes?.match(/((\)|,)\s|^)\d+px/))
    throw new v(2952, `${se(e.ngSrc, !1)} \`sizes\` was set to a string including pixel values. For automatic \`srcset\` generation, \`sizes\` must only include responsive values, such as \`sizes="50vw"\` or \`sizes="(min-width: 768px) 50vw, 100vw"\`. To fix this, modify the \`sizes\` attribute, or provide your own \`ngSrcset\` value directly.`);
}
function Ux(e, t) {
  zx(e), Gx(e, t), Wx(e);
}
function zx(e) {
  if (e.placeholderConfig && !e.placeholder)
    throw new v(2952, `${se(e.ngSrc, !1)} \`placeholderConfig\` options were provided for an image that does not use the \`placeholder\` attribute, and will have no effect.`);
}
function Gx(e, t) {
  if (e.placeholder === !0 && t === li)
    throw new v(2963, `${se(e.ngSrc)} the \`placeholder\` attribute is set to true but no image loader is configured (i.e. the default one is being used), which would result in the same image being used for the primary image and its placeholder. To fix this, provide a loader or remove the \`placeholder\` attribute from the image.`);
}
function Wx(e) {
  if (e.placeholder && typeof e.placeholder == "string" && e.placeholder.startsWith("data:")) {
    if (e.placeholder.length > Bm)
      throw new v(2965, `${se(e.ngSrc)} the \`placeholder\` attribute is set to a data URL which is longer than ${Bm} characters. This is strongly discouraged, as large inline placeholders directly increase the bundle size of Angular and hurt page load performance. To fix this, generate a smaller data URL placeholder.`);
    e.placeholder.length > $m && console.warn(me(2965, `${se(e.ngSrc)} the \`placeholder\` attribute is set to a data URL which is longer than ${$m} characters. This is discouraged, as large inline placeholders directly increase the bundle size of Angular and hurt page load performance. For better loading performance, generate a smaller data URL placeholder.`));
  }
}
function qx(e) {
  const t = e.ngSrc.trim();
  if (t.startsWith("blob:"))
    throw new v(2952, `${se(e.ngSrc)} \`ngSrc\` was set to a blob URL (${t}). Blob URLs are not supported by the NgOptimizedImage directive. To fix this, disable the NgOptimizedImage directive for this element by removing \`ngSrc\` and using a regular \`src\` attribute instead.`);
}
function ow(e, t, n) {
  const r = typeof n == "string", o = r && n.trim() === "";
  if (!r || o)
    throw new v(2952, `${se(e.ngSrc)} \`${t}\` has an invalid value (\`${n}\`). To fix this, change the value to a non-empty string.`);
}
function Qx(e, t) {
  if (t == null)
    return;
  ow(e, "ngSrcset", t);
  const n = t, r = rw.test(n), o = Fx.test(n);
  if (o && Zx(e, n), !(r || o))
    throw new v(2952, `${se(e.ngSrc)} \`ngSrcset\` has an invalid value (\`${t}\`). To fix this, supply \`ngSrcset\` using a comma-separated list of one or more width descriptors (e.g. "100w, 200w") or density descriptors (e.g. "1x, 2x").`);
}
function Zx(e, t) {
  if (!t.split(",").every((r) => r === "" || parseFloat(r) <= el))
    throw new v(2952, `${se(e.ngSrc)} the \`ngSrcset\` contains an unsupported image density:\`${t}\`. NgOptimizedImage generally recommends a max image density of ${Ai}x but supports image densities up to ${el}x. The human eye cannot distinguish between image densities greater than ${Ai}x - which makes them unnecessary for most use cases. Images that will be pinch-zoomed are typically the primary use case for ${el}x images. Please remove the high density descriptor and try again.`);
}
function Yx(e, t) {
  let n;
  return t === "width" || t === "height" ? n = `Changing \`${t}\` may result in different attribute value applied to the underlying image element and cause layout shifts on a page.` : n = `Changing the \`${t}\` would have no effect on the underlying image element, because the resource loading has already occurred.`, new v(2953, `${se(e.ngSrc)} \`${t}\` was updated after initialization. The NgOptimizedImage directive will not react to this input change. ${n} To fix this, either switch \`${t}\` to a static value or wrap the image element in an *ngIf that is gated on the necessary value.`);
}
function Kx(e, t, n) {
  n.forEach((r) => {
    if (t.hasOwnProperty(r) && !t[r].isFirstChange())
      throw r === "ngSrc" && (e = { ngSrc: t[r].previousValue }), Yx(e, r);
  });
}
function Hm(e, t, n) {
  const r = typeof t == "number" && t > 0, o = typeof t == "string" && /^\d+$/.test(t.trim()) && parseInt(t) > 0;
  if (!r && !o)
    throw new v(2952, `${se(e.ngSrc)} \`${n}\` has an invalid value. To fix this, provide \`${n}\` as a number greater than 0.`);
}
function Jx(e, t, n) {
  const r = n.listen(t, "load", () => {
    r(), o();
    const i = window.getComputedStyle(t);
    let s = parseFloat(i.getPropertyValue("width")), a = parseFloat(i.getPropertyValue("height"));
    if (i.getPropertyValue("box-sizing") === "border-box") {
      const M = i.getPropertyValue("padding-top"), k = i.getPropertyValue("padding-right"), G = i.getPropertyValue("padding-bottom"), ce = i.getPropertyValue("padding-left");
      s -= parseFloat(k) + parseFloat(ce), a -= parseFloat(M) + parseFloat(G);
    }
    const c = s / a, l = s !== 0 && a !== 0, d = t.naturalWidth, f = t.naturalHeight, h = d / f, p = e.width, g = e.height, D = p / g, I = Math.abs(D - h) > Lm, y = l && Math.abs(h - c) > Lm;
    if (I)
      console.warn(me(2952, `${se(e.ngSrc)} the aspect ratio of the image does not match the aspect ratio indicated by the width and height attributes. 
Intrinsic image size: ${d}w x ${f}h (aspect-ratio: ${ia(h)}). 
Supplied width and height attributes: ${p}w x ${g}h (aspect-ratio: ${ia(D)}). 
To fix this, update the width and height attributes.`));
    else if (y)
      console.warn(me(2952, `${se(e.ngSrc)} the aspect ratio of the rendered image does not match the image's intrinsic aspect ratio. 
Intrinsic image size: ${d}w x ${f}h (aspect-ratio: ${ia(h)}). 
Rendered image size: ${s}w x ${a}h (aspect-ratio: ${ia(c)}). 
This issue can occur if "width" and "height" attributes are added to an image without updating the corresponding image styling. To fix this, adjust image styling. In most cases, adding "height: auto" or "width: auto" to the image styling will fix this issue.`));
    else if (!e.ngSrcset && l) {
      const M = Ai * s, k = Ai * a, G = d - M >= jm, ce = f - k >= jm;
      (G || ce) && console.warn(me(2960, `${se(e.ngSrc)} the intrinsic image is significantly larger than necessary. 
Rendered image size: ${s}w x ${a}h. 
Intrinsic image size: ${d}w x ${f}h. 
Recommended intrinsic image size: ${M}w x ${k}h. 
Note: Recommended intrinsic image size is calculated assuming a maximum DPR of ${Ai}. To improve loading time, resize the image or consider using the "ngSrcset" and "sizes" attributes.`));
    }
  }), o = n.listen(t, "error", () => {
    r(), o();
  });
}
function Xx(e) {
  let t = [];
  if (e.width === void 0 && t.push("width"), e.height === void 0 && t.push("height"), t.length > 0)
    throw new v(2954, `${se(e.ngSrc)} these required attributes are missing: ${t.map((n) => `"${n}"`).join(", ")}. Including "width" and "height" attributes will prevent image-related layout shifts. To fix this, include "width" and "height" attributes on the image tag or turn on "fill" mode with the \`fill\` attribute.`);
}
function eP(e) {
  if (e.width || e.height)
    throw new v(2952, `${se(e.ngSrc)} the attributes \`height\` and/or \`width\` are present along with the \`fill\` attribute. Because \`fill\` mode causes an image to fill its containing element, the size attributes have no effect and should be removed.`);
}
function tP(e, t, n) {
  const r = n.listen(t, "load", () => {
    r(), o();
    const i = t.clientHeight;
    e.fill && i === 0 && console.warn(me(2952, `${se(e.ngSrc)} the height of the fill-mode image is zero. This is likely because the containing element does not have the CSS 'position' property set to one of the following: "relative", "fixed", or "absolute". To fix this problem, make sure the container element has the CSS 'position' property defined and the height of the element is not zero.`));
  }), o = n.listen(t, "error", () => {
    r(), o();
  });
}
function nP(e) {
  if (e.loading && e.priority)
    throw new v(2952, `${se(e.ngSrc)} the \`loading\` attribute was used on an image that was marked "priority". Setting \`loading\` on priority images is not allowed because these images will always be eagerly loaded. To fix this, remove the “loading” attribute from the priority image.`);
  const t = ["auto", "eager", "lazy"];
  if (typeof e.loading == "string" && !t.includes(e.loading))
    throw new v(2952, `${se(e.ngSrc)} the \`loading\` attribute has an invalid value (\`${e.loading}\`). To fix this, provide a valid value ("lazy", "eager", or "auto").`);
}
function rP(e, t) {
  if (t === li) {
    let n = "";
    for (const r of Lx)
      if (r.testUrl(e)) {
        n = r.name;
        break;
      }
    n && console.warn(me(2962, `NgOptimizedImage: It looks like your images may be hosted on the ${n} CDN, but your app is not using Angular's built-in loader for that CDN. We recommend switching to use the built-in by calling \`provide${n}Loader()\` in your \`providers\` and passing it your instance's base URL. If you don't want to use the built-in loader, define a custom loader function using IMAGE_LOADER to silence this warning.`));
  }
}
function oP(e, t) {
  e.ngSrcset && t === li && console.warn(me(2963, `${se(e.ngSrc)} the \`ngSrcset\` attribute is present but no image loader is configured (i.e. the default one is being used), which would result in the same image being used for all configured sizes. To fix this, provide a loader or remove the \`ngSrcset\` attribute from the image.`));
}
function iP(e, t) {
  e.loaderParams && t === li && console.warn(me(2963, `${se(e.ngSrc)} the \`loaderParams\` attribute is present but no image loader is configured (i.e. the default one is being used), which means that the loaderParams data will not be consumed and will not affect the URL. To fix this, provide a custom loader or remove the \`loaderParams\` attribute from the image.`));
}
function ia(e) {
  return Number.isInteger(e) ? e : e.toFixed(2);
}
function iw(e) {
  return typeof e == "string" ? e : on(e);
}
function sw(e) {
  return typeof e == "string" && e.startsWith("data:") ? e : xn(e);
}
var sP = Object.getOwnPropertyDescriptor, aP = (e, t, n, r) => {
  for (var o = r > 1 ? void 0 : r ? sP(t, n) : t, i = e.length - 1, s; i >= 0; i--)
    (s = e[i]) && (o = s(o) || o);
  return o;
};
let Vm = class {
  constructor() {
    this.counter = 0;
  }
};
Vm = aP([
  ob({
    selector: "hello-module",
    standalone: !0,
    imports: [ho],
    template: `
    <div class="hello-module-container">
      <h1>🎉 Hello from Hello Module!</h1>
      <p>This is a <strong>standalone component</strong> loaded dynamically at runtime!</p>
      <p>Module version: <code>2.0.0</code></p>
      <button (click)="counter = counter + 1">
        Clicked {{ counter }} times
      </button>
    </div>
  `,
    styles: [`
    .hello-module-container {
      padding: 2rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 12px;
      color: white;
      text-align: center;
      box-shadow: 0 10px 40px rgba(0,0,0,0.2);
    }
    
    .hello-module-container h1 {
      margin: 0 0 1rem 0;
      font-size: 2rem;
    }
    
    .hello-module-container p {
      margin: 0.5rem 0;
      font-size: 1.1rem;
    }
    
    .hello-module-container code {
      background: rgba(255,255,255,0.2);
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
      font-family: 'Courier New', monospace;
    }
    
    .hello-module-container button {
      margin-top: 1.5rem;
      padding: 0.8rem 2rem;
      font-size: 1.1rem;
      font-weight: 600;
      background: white;
      color: #667eea;
      border: none;
      border-radius: 25px;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    }
    
    .hello-module-container button:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(0,0,0,0.3);
    }
  `]
  })
], Vm);
export {
  Vm as default
};
//# sourceMappingURL=plugin.mjs.map
